# GLView

Uma biblioteca que fornece `GLView` que atua como um alvo de renderização OpenGL ES e fornece `GLContext`. Útil para renderizar gráficos 2D e 3D.

`expo-gl` fornece uma `View` que atua como um alvo de renderização OpenGL ES, útil para renderizar gráficos 2D e 3D. Ao montar, um contexto OpenGL ES é criado. Seu buffer de desenho é apresentado como o conteúdo da `View` a cada quadro.

## Instalação

Para instalar a API GLView, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-gl
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Uso Básico do GL

```javascript
import { View } from 'react-native';
import { GLView } from 'expo-gl';

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView style={{ width: 300, height: 300 }} onContextCreate={onContextCreate} />
    </View>
  );
}

function onContextCreate(gl) {
  gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
  gl.clearColor(0, 1, 1, 1);

  // Crie um shader de vértice
  const vert = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(
    vert,
    `
    void main(void) {
      gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
      gl_PointSize = 150.0;
    }
  `
  );
  gl.compileShader(vert);

  // Crie um shader de fragmento
  const frag = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(
    frag,
    `
    void main(void) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
  `
  );
  gl.compileShader(frag);

  // Crie um programa de shader
  const program = gl.createProgram();
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  gl.useProgram(program);

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINTS, 0, 1);

  gl.flush();
  gl.endFrameEXP();
}
```

## APIs de Alto Nível

Como a API WebGL é de nível bastante baixo, pode ser útil usar APIs gráficas de nível superior que renderizam através de uma `GLView` subjacente. As seguintes bibliotecas integram APIs gráficas populares:

*   [expo-three](https://github.com/expo/expo/tree/main/packages/expo-three) para [three.js](https://threejs.org/)
*   [expo-processing](https://github.com/expo/expo/tree/main/packages/expo-processing) para [processing.js](https://processingjs.org/)

Qualquer biblioteca que suporte WebGL e espere um `WebGLRenderingContext` pode ser usada. Às vezes, essas bibliotecas assumem um contexto JavaScript da web (como assumir `document`). Geralmente, isso é para carregamento de recursos ou manipulação de eventos, com a lógica de renderização principal ainda usando apenas WebGL puro. Portanto, essas bibliotecas geralmente ainda podem ser usadas com algumas soluções alternativas. As integrações específicas do Expo acima incluem soluções alternativas para algumas bibliotecas populares.

## Integração com worklets do Reanimated

Para usar esta API dentro de um worklet do Reanimated, você precisa passar o ID do contexto GL para o worklet e recriar o objeto GL como no exemplo abaixo.

### Uso de GL em worklet do Reanimated

```javascript
import { View } from 'react-native';
import { runOnUI } from 'react-native-reanimated';
import { GLView } from 'expo-gl';

function render(gl) {
  'worklet';
  // Seu código de renderização GL aqui
}

function onContextCreate(gl) {
  runOnUI((contextId) => {
    'worklet';
    const glWorklet = GLView.getWorkletContext(contextId);
    render(glWorklet);
  })(gl.contextId);
}

export default function App() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <GLView
        style={{ width: 300, height: 300 }}
        enableExperimentalWorkletSupport
        onContextCreate={onContextCreate}
      />
    </View>
  );
}
```

Para um exemplo mais aprofundado de como usar `expo-gl` com Reanimated e Gesture Handler, você pode verificar [este exemplo](https://github.com/expo/expo/tree/main/apps/native-component-list/src/screens/GL/ReanimatedExample.tsx).

### Limitações

O tempo de execução do Worklet impõe algumas limitações ao código que é executado nele, então se você tiver código WebGL existente, provavelmente exigirá algumas modificações para ser executado em um thread de worklet.

*   Bibliotecas de terceiros como Pixi.js ou Three.js não funcionarão dentro do worklet, você só pode usar funções que tenham `'worklet'` adicionado no início.
*   Se você precisar carregar alguns ativos para passar para o código WebGL, isso precisa ser feito no thread principal e passado por alguma referência para o worklet. Se você estiver usando `expo-assets`, você pode simplesmente passar o objeto de ativo retornado por `Asset.fromModule` ou do hook `useAssets` para a função `runOnUI`.
*   Para implementar um loop de renderização, você precisa usar `requestAnimationFrame`, APIs como `setTimeout` não são suportadas.
*   É suportado apenas no Android e iOS, não funciona na Web.

Verifique a [documentação do Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/worklets/) para saber mais.

## Depuração Remota e GLView

Esta API não funciona como pretendido com a depuração remota habilitada. O depurador do React Native executa JavaScript em seu computador, não no dispositivo móvel. O GLView requer chamadas nativas síncronas que não são suportadas no Chrome.

## API

```javascript
import { GLView } from 'expo-gl';
```

### Componente

#### `<GLView />`

Um componente React Native que atua como um alvo de renderização OpenGL ES. Ao montar, um contexto OpenGL ES é criado. Seu buffer de desenho é apresentado como o conteúdo da `View` a cada quadro.

### Métodos Estáticos

#### `GLView.createContextAsync()`

Cria um novo contexto GL de forma assíncrona. Retorna uma promessa que se resolve com o ID do contexto.

#### `GLView.destroyContextAsync(exgl)`

Destrói um contexto GL existente. Retorna uma promessa que se resolve quando a operação é concluída.

#### `GLView.takeSnapshotAsync(exgl, options)`

Tira um instantâneo do conteúdo do contexto GL. Retorna uma promessa que se resolve com um objeto `GLSnapshot` contendo o URI da imagem e outras informações.

### Métodos do Componente

#### `glViewRef.createCameraTextureAsync(cameraRef)`

Cria uma textura OpenGL a partir de uma referência de câmera. Útil para renderizar o feed da câmera em um contexto GL.

#### `glViewRef.destroyObjectAsync(glObject)`

Destrói um objeto GL. Útil para liberar recursos.

#### `glViewRef.startARSessionAsync(arSession)`

Inicia uma sessão AR (Realidade Aumentada) em um contexto GL. Requer `expo-ar`.

#### `glViewRef.takeSnapshotAsync(options)`

Tira um instantâneo do conteúdo do `GLView`. Retorna uma promessa que se resolve com um objeto `GLSnapshot`.

### Métodos

#### `GLView.getWorkletContext(contextId)`

Retorna o contexto GL para uso em worklets do Reanimated.

### Interfaces

#### `ExpoWebGLRenderingContext`

Uma interface que estende `WebGLRenderingContext` e adiciona métodos específicos do Expo, como `endFrameEXP()`.

### Tipos

#### `ComponentOrHandle`

Tipo: `number` ou `React.Component`

Representa um componente ou um handle de componente.

#### `GLSnapshot`

Tipo: `object`

Um objeto que representa um instantâneo de um contexto GL, contendo o URI da imagem, largura, altura e outras informações.

#### `SnapshotOptions`

Tipo: `object`

Opções para tirar um instantâneo, como `format` (formato da imagem), `compress` (qualidade de compressão) e `result` (tipo de resultado).

#### `SurfaceCreateEvent`

Tipo: `object`

Um objeto de evento que é disparado quando a superfície GL é criada.

#### `WebGLObject`

Tipo: `object`

Um objeto WebGL genérico.

### Enums

#### `GLLoggingOption`

Opções de log para GL.

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


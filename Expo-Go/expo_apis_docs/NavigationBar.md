# Barra de Navegação (NavigationBar)

Uma biblioteca que fornece acesso a várias interações com a barra de navegação nativa em dispositivos Android.

`expo-navigation-bar` permite modificar e observar a barra de navegação nativa em dispositivos Android. Devido a algumas restrições da plataforma Android, partes desta API se sobrepõem à API `expo-status-bar`.

As propriedades são nomeadas após as propriedades de estilo: visibilidade, posição, `backgroundColor`, `borderColor` e assim por diante.

As APIs neste pacote não têm impacto quando a "Navegação por Gestos" está habilitada no dispositivo Android. Atualmente, não há API nativa do Android para detectar se a "Navegação por Gestos" está habilitada ou não.

## Instalação

Para instalar a API NavigationBar, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-navigation-bar
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as NavigationBar from 'expo-navigation-bar';
```

### Hooks

#### `useVisibility()`

Um hook React que atualiza o estado com a visibilidade da barra de navegação do sistema.

Retorna: `NavigationBarVisibility` ou `null` (durante a inicialização assíncrona).

Exemplo:

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

export default function App() {
  const visibility = NavigationBar.useVisibility();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Visibilidade da Barra de Navegação: {visibility}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
```

### Métodos

#### `NavigationBar.getBackgroundColorAsync()`

Obtém a cor de fundo da barra de navegação.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Retorna a cor atual da barra de navegação em formato hexadecimal. Retorna `#00000000` (transparente) em plataformas não suportadas (iOS, web).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function getBackgroundColor() {
  const color = await NavigationBar.getBackgroundColorAsync();
  console.log('Cor de fundo da barra de navegação:', color);
}
```

#### `NavigationBar.getBehaviorAsync()`

Obtém o comportamento das barras de status e navegação quando o usuário desliza ou toca na tela.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Retorna o comportamento de interação da barra de navegação. Retorna `inset-touch` em plataformas não suportadas (iOS, web).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function getBehavior() {
  const behavior = await NavigationBar.getBehaviorAsync();
  console.log('Comportamento da barra de navegação:', behavior);
}
```

#### `NavigationBar.getBorderColorAsync()`

Obtém a cor da borda superior da barra de navegação, também conhecida como "cor do divisor".

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Retorna a cor da borda superior da barra de navegação em formato hexadecimal. Retorna `#00000000` (transparente) em plataformas não suportadas (iOS, web).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function getBorderColor() {
  const color = await NavigationBar.getBorderColorAsync();
  console.log('Cor da borda da barra de navegação:', color);
}
```

#### `NavigationBar.getButtonStyleAsync()`

Obtém os estilos de cor dos botões da barra de navegação.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Retorna as configurações de cor do elemento em primeiro plano da barra de navegação. Retorna `light` em plataformas não suportadas (iOS, web).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function getButtonStyle() {
  const style = await NavigationBar.getButtonStyleAsync();
  console.log('Estilo do botão da barra de navegação:', style);
}
```

#### `NavigationBar.getVisibilityAsync()`

Obtém a visibilidade da barra de navegação.

Retorna o status de visibilidade atual da barra de navegação. Retorna `hidden` em plataformas não suportadas (iOS, web).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function getVisibility() {
  const visibility = await NavigationBar.getVisibilityAsync();
  console.log('Visibilidade da barra de navegação:', visibility);
}
```

#### `NavigationBar.setBackgroundColorAsync(color)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `color` | `string` | Qualquer [cor CSS 3 (SVG)](https://www.w3.org/TR/SVG11/types.html#ColorKeywords) válida. |

Altera a cor de fundo da barra de navegação.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setBackgroundColor() {
  await NavigationBar.setBackgroundColorAsync("white");
  console.log('Cor de fundo da barra de navegação definida para branco.');
}
```

#### `NavigationBar.setBehaviorAsync(behavior)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `behavior` | `NavigationBarBehavior` | Ditado o comportamento de interação da barra de navegação. |

Define o comportamento da barra de status e da barra de navegação quando elas estão ocultas e o usuário deseja revelá-las.

Por exemplo, se a barra de navegação estiver oculta (`setVisibilityAsync(false)`) e o comportamento for `overlay-swipe`, o usuário pode deslizar da parte inferior da tela para revelar temporariamente a barra de navegação.

*   `overlay-swipe`: Revela temporariamente a UI do Sistema após um gesto de deslizar (inferior ou superior) sem inserir o conteúdo do seu aplicativo.
*   `inset-swipe`: Revela a UI do Sistema após um gesto de deslizar (inferior ou superior) e insere o conteúdo do seu aplicativo (Área Segura). A UI do Sistema fica visível até que você a oculte explicitamente novamente.
*   `inset-touch`: Revela a UI do Sistema após um toque em qualquer lugar da tela e insere o conteúdo do seu aplicativo (Área Segura). A UI do Sistema fica visível até que você a oculte explicitamente novamente.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setBehavior() {
  await NavigationBar.setBehaviorAsync('overlay-swipe');
  console.log('Comportamento da barra de navegação definido para overlay-swipe.');
}
```

#### `NavigationBar.setBorderColorAsync(color)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `color` | `string` | Qualquer [cor CSS 3 (SVG)](https://www.w3.org/TR/SVG11/types.html#ColorKeywords) válida. |

Altera a cor da borda da barra de navegação.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setBorderColor() {
  await NavigationBar.setBorderColorAsync("red");
  console.log('Cor da borda da barra de navegação definida para vermelho.');
}
```

#### `NavigationBar.setButtonStyleAsync(style)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `style` | `NavigationBarButtonStyle` | Ditado a cor do elemento em primeiro plano. |

Altera as cores dos botões da barra de navegação entre branco (`light`) e uma cor cinza escuro (`dark`).

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setButtonStyle() {
  await NavigationBar.setButtonStyleAsync("light");
  console.log('Estilo do botão da barra de navegação definido para light.');
}
```

#### `NavigationBar.setPositionAsync(position)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `position` | `NavigationBarPosition` | Baseado na propriedade de posição CSS. |

Define o método de posicionamento usado para a barra de navegação (e barra de status). Definir a posição `absolute` fará com que a barra de navegação flutue acima do conteúdo, enquanto a posição `relative` diminuirá a tela para alinhar a barra de navegação.

Ao desenhar atrás das barras de status e navegação, certifique-se de que as insets da área segura sejam ajustadas de acordo.

> Este método é suportado apenas quando o modo "edge-to-edge" está desabilitado.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setPosition() {
  await NavigationBar.setPositionAsync('absolute');
  await NavigationBar.setBackgroundColorAsync('#ffffff00'); // Transparente
  console.log('Posição da barra de navegação definida para absolute e fundo transparente.');
}
```

#### `NavigationBar.setStyle(style)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `style` | `NavigationBarStyle` | Define o estilo da barra de navegação. |

Define o estilo da barra de navegação.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setStyle() {
  await NavigationBar.setStyle('dark');
  console.log('Estilo da barra de navegação definido para dark.');
}
```

#### `NavigationBar.setVisibilityAsync(visibility)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `visibility` | `NavigationBarVisibility` | Ditado a visibilidade da barra de navegação. |

Altera a visibilidade da barra de navegação.

Exemplo:

```javascript
import * as NavigationBar from 'expo-navigation-bar';

async function setVisibility() {
  await NavigationBar.setVisibilityAsync('hidden');
  console.log('Visibilidade da barra de navegação definida para hidden.');
}
```

#### `NavigationBar.unstable_getPositionAsync()`

Obtém a posição da barra de navegação. Este método é instável e pode ser alterado no futuro.

### Assinaturas de Eventos

#### `NavigationBar.addVisibilityListener(listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `listener` | `(event: NavigationBarVisibilityEvent) => void` | Um callback que é invocado quando a visibilidade da barra de navegação muda. |

Adiciona um ouvinte para alterações na visibilidade da barra de navegação. Retorna uma `EventSubscription`.

### Tipos

#### `NavigationBarBehavior`

Tipo: `string`

Comportamento da barra de navegação. Valores possíveis: `overlay-swipe`, `inset-swipe`, `inset-touch`.

#### `NavigationBarButtonStyle`

Tipo: `string`

Estilo do botão da barra de navegação. Valores possíveis: `light`, `dark`.

#### `NavigationBarPosition`

Tipo: `string`

Posição da barra de navegação. Valores possíveis: `absolute`, `relative`.

#### `NavigationBarStyle`

Tipo: `string`

Estilo da barra de navegação. Valores possíveis: `light`, `dark`.

#### `NavigationBarVisibility`

Tipo: `string`

Visibilidade da barra de navegação. Valores possíveis: `visible`, `hidden`.

#### `NavigationBarVisibilityEvent`

Tipo: `object`

Um objeto de evento que representa uma alteração na visibilidade da barra de navegação, contendo `visibility`.

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025


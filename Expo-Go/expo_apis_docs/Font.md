# Fonte (Font)

Uma biblioteca que permite carregar fontes da web e usá-las em componentes React Native.

`expo-font` permite carregar fontes da web e usá-las em componentes React Native. Veja informações de uso mais detalhadas no [guia de Fontes](https://docs.expo.dev/develop/user-interface/fonts/).

## Instalação

Para instalar a API Font, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-font
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Existem duas maneiras de adicionar fontes ao seu aplicativo: usando o plugin de configuração `expo-font` (recomendado) ou carregando-as em tempo de execução.

O plugin permite incorporar arquivos de fonte em tempo de construção, o que é mais eficiente do que usar `useFonts` ou `loadAsync`. Depois de configurar o plugin e executar `prebuild`, você pode renderizar fontes personalizadas imediatamente. O plugin pode ser configurado de diferentes maneiras, consulte o [guia de Fontes](https://docs.expo.dev/develop/user-interface/fonts/) sobre como usá-lo.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-font",
        {
          "fonts": [
            "./assets/fonts/YourFont.ttf"
          ]
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `fonts` | `[]` | Um array de caminhos para os arquivos de fonte que você deseja incorporar ao seu aplicativo. |

## Uso

### Carregando fontes com `useFonts` (Recomendado para Expo Go)

```javascript
import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    'OpenSans-Bold': require('./assets/fonts/OpenSans-Bold.ttf'),
    'OpenSans-Regular': require('./assets/fonts/OpenSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Este é um texto em negrito.</Text>
      <Text style={styles.regularText}>Este é um texto regular.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 20,
  },
  regularText: {
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
});
```

### Carregando fontes com `Font.loadAsync`

```javascript
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Font from 'expo-font';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadMyFonts() {
      await Font.loadAsync({
        'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
      });
      setFontsLoaded(true);
    }

    loadMyFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Carregando fontes...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>Este é um texto em negrito (Roboto).</Text>
      <Text style={styles.regularText}>Este é um texto regular (Roboto).</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boldText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  regularText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
});
```

## API

```javascript
import * as Font from 'expo-font';
```

### Hooks

#### `useFonts(fontMap)`

Um hook React que carrega um mapa de fontes e retorna um array com um booleano indicando se as fontes foram carregadas e um objeto de erro, se houver. É a maneira recomendada de carregar fontes em aplicativos Expo Go.

### Métodos

#### `Font.getLoadedFonts()`

Retorna um objeto contendo as fontes que foram carregadas com sucesso.

#### `Font.isLoaded(fontFamily)`

Verifica se uma fonte específica foi carregada. Retorna um booleano.

#### `Font.isLoading(fontFamily)`

Verifica se uma fonte específica está sendo carregada. Retorna um booleano.

#### `Font.loadAsync(fontMap)`

Carrega um mapa de fontes de forma assíncrona. Retorna uma promessa que se resolve quando todas as fontes são carregadas.

#### `Font.renderToImageAsync(options)`

Renderiza texto usando uma fonte específica em uma imagem. Útil para gerar imagens de texto.

### Tipos

#### `FontResource`

Tipo: `object`

Um objeto que representa um recurso de fonte, incluindo o nome da família da fonte e a fonte em si.

#### `FontSource`

Tipo: `string` ou `number`

O caminho para o arquivo da fonte (string) ou o resultado de `require()` para um arquivo de fonte (number).

### Enums

#### `FontDisplay`

Define a estratégia de exibição da fonte para uma determinada tipografia. Os valores possíveis são:

*   **`FontDisplay.AUTO`**: (Padrão) A estratégia de exibição da fonte é definida pelo agente do usuário ou plataforma. Geralmente, o texto fica invisível até que a fonte seja carregada.
*   **`FontDisplay.BLOCK`**: O texto ficará invisível até que a fonte seja carregada. Se a fonte falhar ao carregar, nada aparecerá.
*   **`FontDisplay.FALLBACK`**: Divide o comportamento entre `SWAP` e `BLOCK`. Haverá um tempo limite de 100ms onde o texto com uma fonte personalizada é invisível, depois disso o texto trocará para o texto estilizado ou mostrará o texto sem estilo e continuará a carregar a fonte personalizada.
*   **`FontDisplay.OPTIONAL`**: Funciona quase identicamente a `FALLBACK`, a única diferença é que o navegador decidirá carregar a fonte com base na velocidade de conexão lenta ou demanda crítica de recursos.
*   **`FontDisplay.SWAP`**: O texto de fallback é renderizado imediatamente com uma fonte padrão enquanto a fonte desejada é carregada. Isso é bom para fazer o conteúdo parecer carregar instantaneamente e geralmente é preferido.

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


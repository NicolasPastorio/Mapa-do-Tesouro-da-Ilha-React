# Tela de Abertura (SplashScreen)

Uma biblioteca que fornece acesso ao controle do comportamento de visibilidade da tela de abertura nativa.

O módulo `SplashScreen` da biblioteca `expo-splash-screen` é usado para instruir a tela de abertura a permanecer visível até que seja explicitamente instruída a se ocultar. Isso é útil para realizar tarefas que acontecerão nos bastidores, como fazer chamadas de API, pré-carregar fontes, animar a tela de abertura e assim por diante.

> A partir do SDK 52, devido a mudanças que suportam a API de tela de abertura mais recente do Android, o Expo Go e as compilações de desenvolvimento não podem replicar totalmente a experiência da tela de abertura que seus usuários verão em seu [aplicativo autônomo](https://docs.expo.dev/workflow/building-your-app/). O Expo Go mostrará o ícone do seu aplicativo em vez da tela de abertura, e a tela de abertura nas compilações de desenvolvimento não refletirá todas as propriedades definidas no plugin de configuração. É altamente recomendável que você teste sua tela de abertura em uma compilação de lançamento para garantir que ela tenha a aparência esperada.

Além disso, consulte o guia sobre [como criar uma imagem de tela de abertura](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/) ou [gere rapidamente um ícone e uma tela de abertura usando seu navegador](https://www.canva.com/create/app-icons/).

## Instalação

Para instalar a API SplashScreen, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-splash-screen
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

Este exemplo mostra como manter a tela de abertura visível enquanto carrega os recursos do aplicativo e, em seguida, oculta a tela de abertura quando o aplicativo renderizou algum conteúdo inicial.

```javascript
import { useCallback, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

// Impede que a tela de abertura se oculte automaticamente
SplashScreen.preventAutoHideAsync();

// Define opções para a tela de abertura (opcional)
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pré-carrega fontes, faz chamadas de API, etc.
        await Font.loadAsync(Entypo.font);
        // Simula um atraso para demonstração
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Informa que o aplicativo está pronto
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (appIsReady) {
      // Oculta a tela de abertura quando o aplicativo está pronto
      SplashScreen.hide();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text>Demonstração da SplashScreen! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}
```

## Configuração

Você pode configurar `expo-splash-screen` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor. Se o seu aplicativo não usa o EAS Build, você precisará configurar o pacote manualmente.

Usar o plugin de configuração, conforme mostrado abaixo, é o método recomendado para configurar a tela de abertura. Os outros métodos agora são considerados legados e serão removidos no futuro.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#232323",
          "image": "./assets/splash-icon.png",
          "dark": {
            "image": "./assets/splash-icon-dark.png",
            "backgroundColor": "#000000"
          },
          "imageWidth": 200
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `backgroundColor` | `#ffffff` | Uma string de cor hexadecimal representando a cor de fundo da tela de abertura. |
| `image` | `undefined` | O caminho para o arquivo de imagem que será exibido na tela de abertura. Este deve ser o ícone ou logotipo do seu aplicativo. |
| `dark` (opcional) | `object` | Um objeto que contém as propriedades `image` e `backgroundColor` para o tema escuro. |
| `imageWidth` (opcional) | `number` | A largura da imagem em pixels. |
| `imageHeight` (opcional) | `number` | A altura da imagem em pixels. |
| `resizeMode` (opcional) | `string` | O modo de redimensionamento da imagem (por exemplo, `contain`, `cover`, `stretch`). |
| `enableFullScreenImage_legacy` | `false` | **Apenas para:** iOS. Habilitar esta propriedade... (legado) |

## API

```javascript
import * as SplashScreen from 'expo-splash-screen';
```

### Métodos

#### `SplashScreen.hide()`

Oculta a tela de abertura. Retorna `void`.

#### `SplashScreen.hideAsync()`

Oculta a tela de abertura. Retorna uma promessa que se resolve quando a operação é concluída.

#### `SplashScreen.preventAutoHideAsync()`

Impede que a tela de abertura se oculte automaticamente. Retorna uma promessa que se resolve quando a operação é concluída.

#### `SplashScreen.setOptions(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `SplashScreenOptions` | Um objeto `SplashScreenOptions`. |

Define opções para a tela de abertura. Retorna `void`.

### Tipos

#### `SplashScreenOptions`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `duration` (opcional) | `number` | A duração da animação de ocultação da tela de abertura em milissegundos. |
| `fade` (opcional) | `boolean` | Se a tela de abertura deve desaparecer ao ocultar. |

Um objeto que contém opções para a tela de abertura.

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025


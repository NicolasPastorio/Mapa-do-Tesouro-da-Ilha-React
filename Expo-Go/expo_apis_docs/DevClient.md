# Cliente de Desenvolvimento (DevClient)

Uma biblioteca que permite criar uma build de desenvolvimento e inclui ferramentas de desenvolvimento úteis.

`expo-dev-client` adiciona várias ferramentas de desenvolvimento úteis às suas builds de depuração:

*   Uma UI de inicialização configurável, para que você possa iniciar atualizações (como de [PR previews](https://docs.expo.dev/eas-update/expo-dev-client/#pr-previews)) e alternar entre servidores de desenvolvimento sem precisar recompilar o aplicativo nativo.
*   Ferramentas de depuração aprimoradas (como suporte para [inspeção de requisições de rede](https://docs.expo.dev/eas-update/expo-dev-client/#inspecting-network-requests)).
*   [Uma UI de menu de desenvolvedor poderosa e extensível](https://docs.expo.dev/eas-update/expo-dev-client/#a-powerful-and-extensible-developer-menu-ui).

A documentação do Expo se refere a builds de depuração que incluem `expo-dev-client` como [development builds](https://docs.expo.dev/eas-update/expo-dev-client/#development-builds).

## Instalação

Para instalar a API DevClient, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-dev-client
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), comece instalando o [`expo`](https://docs.expo.dev/versions/latest/sdk/expo/) em seu projeto. Em seguida, siga as instruções de [Instalar `expo-dev-client` em um projeto React Native existente](https://docs.expo.dev/eas-update/expo-dev-client/#install-expo-dev-client-in-an-existing-react-native-project).

## Configuração no `app.config`

Você pode configurar o cliente de desenvolvimento usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-dev-client",
        {
          "launchMode": "most-recent"
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `launchMode` | `"most-recent"` | Determina se deve iniciar o projeto mais recentemente aberto ou navegar para a tela de inicialização.
    *   `most-recent` - Tenta iniciar diretamente em um projeto aberto anteriormente e, se não conseguir conectar, retorna para a tela de inicialização.
    *   `launcher` - Abre a tela de inicialização. |
| `addGeneratedScheme` | `true` | Por padrão, `expo-dev-client` registrará um esquema de URL personalizado para abrir um projeto. Defina esta propriedade como `false` para desabilitar este esquema. |

## API

```javascript
import * as DevClient from 'expo-dev-client';
```

### Métodos

#### `DevClient.closeMenu()`

Um método que fecha o menu do cliente de desenvolvimento quando chamado.

#### `DevClient.hideMenu()`

Um método que oculta o menu do cliente de desenvolvimento quando chamado.

#### `DevClient.isDevelopmentBuild()`

Um método que retorna um booleano para indicar se o aplicativo atual é uma build de desenvolvimento.

#### `DevClient.openMenu()`

Um método que abre o menu do cliente de desenvolvimento quando chamado.

#### `DevClient.registerDevMenuItems(items)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `items` | `ExpoDevMenuItem[]` | Um array de objetos que representam os itens de menu personalizados. |

Um método que permite especificar entradas personalizadas no menu do cliente de desenvolvimento.

### Tipos

#### `ExpoDevMenuItem`

Um objeto que representa a entrada de menu personalizada do cliente de desenvolvimento.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `callback` | `() => void` | Callback a ser disparado quando o usuário seleciona um item. |
| `name` | `string` | Nome da entrada, será usado como rótulo. |
| `shouldCollapse` (opcional) | `boolean` | Um booleano especificando se o menu deve fechar após a interação do usuário. Padrão: `false`. |

---

**Autor:** Manus AI
**Data de Geração:** 14 de Junho de 2025


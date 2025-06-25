# Navegador Web (WebBrowser)

Uma biblioteca que fornece acesso ao navegador web do sistema e suporta o tratamento de redirecionamentos.

`expo-web-browser` fornece acesso ao navegador web do sistema e suporta o tratamento de redirecionamentos. No Android, ele usa `ChromeCustomTabs` e no iOS, ele usa `SFSafariViewController` ou `ASWebAuthenticationSession`, dependendo do método que você chama. A partir do iOS 11, `SFSafariViewController` não compartilha mais cookies com o Safari, então, se você estiver usando `WebBrowser` para autenticação, você desejará usar `WebBrowser.openAuthSessionAsync`, e se você quiser apenas abrir uma página web (como a política de privacidade do seu aplicativo), use `WebBrowser.openBrowserAsync`.

## Instalação

Para instalar a biblioteca `expo-web-browser`, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-web-browser
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-web-browser` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar uma propriedade que não pode ser definida em tempo de execução e exige a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-web-browser",
        {
          "android": {
            "customTabs": {
              "showTitle": true
            }
          }
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Propriedade | Tipo | Padrão | Descrição |
|---|---|---|---|
| `android.customTabs.showTitle` | `boolean` | `true` | Se o título da página deve ser exibido na barra de ferramentas do Custom Tab. |

## API

```javascript
import * as WebBrowser from "expo-web-browser";
```

## Métodos

### `WebBrowser.openBrowserAsync(url, options)`

Abre uma URL no navegador web do sistema. Retorna um objeto `WebBrowserResult`.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `url` | `string` | A URL a ser aberta. |
| `options` (opcional) | `WebBrowserOptions` | Opções para o navegador web. |

```javascript
import * as WebBrowser from "expo-web-browser";
import { Button, View } from "react-native";

function WebBrowserExample() {
  const openLink = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://www.google.com",
      {
        toolbarColor: "#6200EE",
        controlsColor: "#FFFFFF",
      }
    );
    console.log("Resultado do navegador:", result);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Abrir Google" onPress={openLink} />
    </View>
  );
}

export default WebBrowserExample;
```

### `WebBrowser.openAuthSessionAsync(url, redirectUrl, options)`

Abre uma URL para autenticação, projetada para fluxos OAuth. Retorna um objeto `WebBrowserAuthSessionResult`.

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `url` | `string` | A URL de autenticação a ser aberta. |
| `redirectUrl` | `string` | A URL para a qual o navegador deve redirecionar após a autenticação. |
| `options` (opcional) | `WebBrowserAuthSessionOptions` | Opções para a sessão de autenticação. |

```javascript
import * as WebBrowser from "expo-web-browser";
import { Button, View, Text } from "react-native";
import { useState } from "react";

function AuthSessionExample() {
  const [result, setResult] = useState(null);

  const openAuth = async () => {
    let authResult = await WebBrowser.openAuthSessionAsync(
      "https://example.com/auth", // Substitua pela sua URL de autenticação
      "exp://127.0.0.1:19000/--/auth", // Substitua pela sua URL de redirecionamento
      {
        preferEphemeralSession: true, // Para iOS, não armazena cookies
      }
    );
    setResult(authResult);
    console.log("Resultado da sessão de autenticação:", authResult);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Button title="Iniciar Sessão de Autenticação" onPress={openAuth} />
      {result && <Text>Tipo de Resultado: {result.type}</Text>}
      {result?.url && <Text>URL: {result.url}</Text>}
    </View>
  );
}

export default AuthSessionExample;
```

### `WebBrowser.dismissBrowser()`

Fecha o navegador web aberto por `openBrowserAsync()`.

```javascript
import * as WebBrowser from "expo-web-browser";

async function dismissBrowser() {
  await WebBrowser.dismissBrowser();
  console.log("Navegador web fechado.");
}

// dismissBrowser();
```

### `WebBrowser.dismissAuthSession()`

Fecha a sessão de autenticação aberta por `openAuthSessionAsync()`.

```javascript
import * as WebBrowser from "expo-web-browser";

async function dismissAuthSession() {
  await WebBrowser.dismissAuthSession();
  console.log("Sessão de autenticação fechada.");
}

// dismissAuthSession();
```

### `WebBrowser.warmUpAsync()`

Pré-carrega o navegador web para uma abertura mais rápida. (Apenas Android).

```javascript
import * as WebBrowser from "expo-web-browser";

async function warmUpWebBrowser() {
  await WebBrowser.warmUpAsync();
  console.log("Navegador web pré-carregado.");
}

// warmUpWebBrowser();
```

### `WebBrowser.coolDownAsync()`

Libera os recursos do navegador web pré-carregados. (Apenas Android).

```javascript
import * as WebBrowser from "expo-web-browser";

async function coolDownWebBrowser() {
  await WebBrowser.coolDownAsync();
  console.log("Recursos do navegador web liberados.");
}

// coolDownWebBrowser();
```

## Tipos

### `WebBrowserOptions`

### `WebBrowserAuthSessionOptions`

### `WebBrowserResult`

### `WebBrowserAuthSessionResult`

---

**Autor:** Manus AI
**Data de Geração:** 22 de Junho de 2025


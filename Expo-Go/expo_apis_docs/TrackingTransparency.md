# Transparência de Rastreamento (TrackingTransparency)

Uma biblioteca para solicitar permissão para rastrear o usuário ou seu dispositivo em dispositivos usando iOS 14 e superior.

Uma biblioteca para solicitar permissão para rastrear o usuário ou seu dispositivo. Exemplos de dados usados para rastreamento incluem endereço de e-mail, ID do dispositivo, ID de publicidade e muito mais. Esta permissão é necessária apenas no iOS 14 e superior; no iOS 13 e abaixo, esta permissão é sempre concedida. Se a configuração de nível de dispositivo "Permitir que os aplicativos solicitem rastreamento" estiver desativada, esta permissão será negada. Certifique-se de adicionar `NSUserTrackingUsageDescription` ao seu [info.plist](https://developer.apple.com/documentation/apptrackingtransparency/requesting_authorization) para explicar como o usuário será rastreado. Caso contrário, seu aplicativo será rejeitado pela Apple.

Para obter mais informações sobre a nova estrutura de Transparência de Rastreamento de Aplicativos da Apple, consulte a [documentação](https://developer.apple.com/documentation/apptrackingtransparency/).

## Instalação

Para instalar a API TrackingTransparency, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-tracking-transparency
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-tracking-transparency` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-tracking-transparency",
        {
          "userTrackingPermission": "Este aplicativo usa seus dados para fornecer uma experiência melhor."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `userTrackingPermission` | `string` | A mensagem que será exibida ao usuário ao solicitar a permissão de rastreamento. |

## API

```javascript
import * as TrackingTransparency from "expo-tracking-transparency";
```

## Hooks

### `useTrackingPermissions(options)`

Um hook para solicitar e gerenciar permissões de rastreamento.

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `PermissionHookOptions` | Opções para o hook de permissão. |

```javascript
import { useTrackingPermissions } from "expo-tracking-transparency";
import { useEffect } from "react";
import { Button, Text, View } from "react-native";

function TrackingPermissionComponent() {
  const [permission, requestPermission] = useTrackingPermissions();

  useEffect(() => {
    if (permission?.granted) {
      console.log("Permissão de rastreamento concedida.");
    }
  }, [permission]);

  return (
    <View>
      <Text>Status da Permissão de Rastreamento: {permission?.status}</Text>
      <Button title="Solicitar Permissão de Rastreamento" onPress={requestPermission} />
    </View>
  );
}

export default TrackingPermissionComponent;
```

## Métodos

### `TrackingTransparency.getAdvertisingIdAsync()`

Retorna o ID de publicidade do dispositivo. Este ID é usado para rastreamento de anúncios.

```javascript
import * as TrackingTransparency from "expo-tracking-transparency";

async function getAdvertisingId() {
  const id = await TrackingTransparency.getAdvertisingIdAsync();
  console.log("ID de Publicidade:", id);
}

getAdvertisingId();
```

### `TrackingTransparency.getTrackingPermissionsAsync()`

Retorna o status atual da permissão de rastreamento.

```javascript
import * as TrackingTransparency from "expo-tracking-transparency";

async function getTrackingPermissions() {
  const { status } = await TrackingTransparency.getTrackingPermissionsAsync();
  console.log("Status da Permissão de Rastreamento:", status);
}

getTrackingPermissions();
```

### `TrackingTransparency.isAvailableAsync()`

Determina se a API TrackingTransparency está disponível no dispositivo.

```javascript
import * as TrackingTransparency from "expo-tracking-transparency";

async function checkAvailability() {
  const isAvailable = await TrackingTransparency.isAvailableAsync();
  if (isAvailable) {
    console.log("API TrackingTransparency disponível.");
  } else {
    console.log("API TrackingTransparency não disponível.");
  }
}

checkAvailability();
```

### `TrackingTransparency.requestTrackingPermissionsAsync()`

Solicita permissão para rastrear o usuário ou seu dispositivo. Isso exibirá um prompt ao usuário no iOS 14+.

```javascript
import * as TrackingTransparency from "expo-tracking-transparency";

async function requestTrackingPermission() {
  const { status } = await TrackingTransparency.requestTrackingPermissionsAsync();
  if (status === "granted") {
    console.log("Permissão de rastreamento concedida.");
  } else {
    console.log("Permissão de rastreamento negada.");
  }
}

// Chame esta função em um momento apropriado, por exemplo, após o carregamento do aplicativo
// requestTrackingPermission();
```

## Tipos

### `PermissionExpiration`

### `PermissionHookOptions`

### `PermissionResponse`

### `PermissionStatus`

### `TrackingPermission`

### `AndroidTrackingPermission`

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025


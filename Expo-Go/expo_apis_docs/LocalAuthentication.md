# Autenticação Local (LocalAuthentication)

Uma biblioteca que fornece funcionalidade para implementar a API de Impressão Digital (Android) ou FaceID e TouchID (iOS) para autenticar o usuário com uma digital ou leitura facial.

`expo-local-authentication` permite que você use o Prompt Biométrico (Android) ou FaceID e TouchID (iOS) para autenticar o usuário com uma impressão digital ou leitura facial.

## Limitação Conhecida

### iOS

A autenticação FaceID para iOS não é suportada no Expo Go. Você precisará criar uma [compilação de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/) para testar o FaceID.

## Instalação

Para instalar a API LocalAuthentication, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-local-authentication
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.json`

Você pode configurar `expo-local-authentication` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Permitir que $(PRODUCT_NAME) use o Face ID."
        }
      ]
    ]
  }
}
```

### Propriedades Configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `faceIDPermission` | `"Permitir que $(PRODUCT_NAME) use o FaceID"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSFaceIDUsageDescription`. |

Você está usando esta biblioteca em um aplicativo React Native existente?

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/bare/continuous-native-generation/)) ou estiver usando um projeto iOS nativo manualmente, então você precisa adicionar a chave `NSFaceIDUsageDescription` ao seu `ios/[app]/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) use o FaceID</string>
```

## API

```javascript
import * as LocalAuthentication from 'expo-local-authentication';
```

### Métodos

#### `LocalAuthentication.authenticateAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `LocalAuthenticationOptions` | Opções para a autenticação. |

Tenta autenticar via Impressão Digital/TouchID (ou FaceID se disponível no dispositivo).

> **Nota:** A Apple exige que os aplicativos que usam FaceID forneçam uma descrição do motivo pelo qual usam esta API. Se você tentar usar o FaceID em um iPhone com FaceID sem fornecer `infoPlist.NSFaceIDUsageDescription` em `app.json`, o módulo autenticará usando a senha do dispositivo. Para obter mais informações sobre descrições de uso no iOS, consulte o [guia de permissões](https://docs.expo.dev/guides/permissions/).

Retorna uma promessa que se resolve com `LocalAuthenticationResult`.

#### `LocalAuthentication.cancelAuthenticate()`

Cancela o fluxo de autenticação.

#### `LocalAuthentication.getEnrolledLevelAsync()`

Determina que tipo de autenticação está registrada no dispositivo.

Retorna uma promessa que se resolve com `SecurityLevel`.

> **Nota:** Em dispositivos Android anteriores ao M, `SECRET` pode ser retornado se apenas o bloqueio do SIM tiver sido registrado, o que não é o método que `authenticateAsync` solicita.

#### `LocalAuthentication.hasHardwareAsync()`

Determina se um scanner de rosto ou impressão digital está disponível no dispositivo.

Retorna uma promessa que se resolve com um valor `boolean` indicando se um scanner de rosto ou impressão digital está disponível neste dispositivo.

#### `LocalAuthentication.isEnrolledAsync()`

Determina se o dispositivo salvou impressões digitais ou dados faciais para usar na autenticação.

Retorna uma promessa que se resolve com um valor `boolean` indicando se o dispositivo salvou impressões digitais ou dados faciais para autenticação.

#### `LocalAuthentication.supportedAuthenticationTypesAsync()`

Determina que tipos de autenticações estão disponíveis no dispositivo.

Retorna uma promessa que se resolve com um array contendo `AuthenticationType`s.

Dispositivos podem suportar vários métodos de autenticação - ou seja, `[1,2]` significa que o dispositivo suporta impressão digital e reconhecimento facial. Se nenhum for suportado, este método retorna um array vazio.

### Tipos

#### `BiometricsSecurityLevel`

Tipo: `string`

Nível de segurança da autenticação biométrica a ser permitida. Valores aceitáveis: `weak`, `strong`.

#### `LocalAuthenticationError`

Tipo: `string`

Um dos valores de erro retornados pelo objeto `LocalAuthenticationResult`. Valores aceitáveis: `not_enrolled`, `user_cancel`, `app_cancel`, `not_available`, `lockout`, `no_space`, `timeout`, `unable_to_process`, `unknown`, `system_cancel`, `user_fallback`, `invalid_context`, `passcode_not_set`, `authentication_failed`.

#### `LocalAuthenticationOptions`

Tipo: `object`

Opções para o método `authenticateAsync`.

#### `LocalAuthenticationResult`

Tipo: `object`

O resultado de uma tentativa de autenticação, contendo `success` (booleano) e `error` (string, se houver erro).

### Enums

#### `AuthenticationType`

Enum que representa os tipos de autenticação disponíveis (`FINGERPRINT`, `FACIAL_RECOGNITION`, `IRIS`).

#### `SecurityLevel`

Enum que representa o nível de segurança da autenticação (`NONE`, `SECRET`, `BIOMETRIC`).

### Permissões

#### Android

No Android, você precisa adicionar a seguinte permissão ao seu `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.USE_BIOMETRIC"/>
```

#### iOS

No iOS, você precisa adicionar a chave `NSFaceIDUsageDescription` ao seu `Info.plist` se for usar FaceID.

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025


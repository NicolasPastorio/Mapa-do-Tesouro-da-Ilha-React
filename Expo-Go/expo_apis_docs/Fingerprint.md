# Impressão Digital (Fingerprint) / Autenticação Local

Uma biblioteca que fornece funcionalidade para implementar a API de Impressão Digital (Android) ou FaceID e TouchID (iOS) para autenticar o usuário com uma varredura facial ou de impressão digital.

`expo-local-authentication` permite que você use o Prompt Biométrico (Android) ou FaceID e TouchID (iOS) para autenticar o usuário com uma varredura de impressão digital ou facial.

## Limitação Conhecida

### iOS

A autenticação FaceID para iOS não é suportada no Expo Go. Você precisará criar uma [build de desenvolvimento](https://docs.expo.dev/eas-update/expo-dev-client/#development-builds) para testar o FaceID.

## Instalação

Para instalar a API LocalAuthentication, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-local-authentication
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

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

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `faceIDPermission` | `"Permitir que $(PRODUCT_NAME) use o Face ID"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSFaceIDUsageDescription`. |

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) ou estiver usando um projeto iOS nativo manualmente, então você precisa adicionar a chave `NSFaceIDUsageDescription` ao seu `ios/[app]/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) use o FaceID</string>
```

## Uso

```javascript
import React from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    const supportedTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();

    Alert.alert(
      'Status da Biometria',
      `Hardware disponível: ${hasHardware}\nBiometria cadastrada: ${isEnrolled}\nTipos suportados: ${supportedTypes.join(', ')}`
    );
  };

  const authenticate = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autenticar para acessar o aplicativo',
        cancelLabel: 'Cancelar',
        disableDeviceFallback: true,
      });

      if (result.success) {
        Alert.alert('Sucesso', 'Autenticação bem-sucedida!');
      } else {
        Alert.alert('Falha', `Autenticação falhou: ${result.error}`);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Erro', 'Ocorreu um erro durante a autenticação.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Autenticação Local</Text>
      <Button title="Verificar Biometria" onPress={checkBiometrics} />
      <Button title="Autenticar" onPress={authenticate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});
```

## API

```javascript
import * as LocalAuthentication from 'expo-local-authentication';
```

### Métodos

#### `LocalAuthentication.authenticateAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `LocalAuthenticationOptions` | Opções para a autenticação, como a mensagem de prompt e o rótulo de cancelamento. |

Tenta autenticar via Impressão Digital/TouchID (ou FaceID, se disponível no dispositivo). Retorna uma promessa que se resolve com um objeto `LocalAuthenticationResult`.

> **Nota:** A Apple exige que aplicativos que usam FaceID forneçam uma descrição do motivo pelo qual usam esta API. Se você tentar usar o FaceID em um iPhone com FaceID sem fornecer `infoPlist.NSFaceIDUsageDescription` em `app.json`, o módulo autenticará usando o código de acesso do dispositivo. Para obter mais informações sobre descrições de uso no iOS, consulte o [guia de permissões](https://docs.expo.dev/guides/permissions/).

#### `LocalAuthentication.cancelAuthenticate()`

Cancela o fluxo de autenticação.

#### `LocalAuthentication.getEnrolledLevelAsync()`

Determina que tipo de autenticação está cadastrada no dispositivo. Retorna uma promessa que se resolve com um `SecurityLevel`.

> **Nota:** Em dispositivos Android anteriores ao M, `SECRET` pode ser retornado se apenas o bloqueio do SIM tiver sido cadastrado, o que não é o método que `authenticateAsync` solicita.

#### `LocalAuthentication.hasHardwareAsync()`

Determina se um scanner facial ou de impressão digital está disponível no dispositivo. Retorna uma promessa que se resolve com um valor booleano indicando se um scanner facial ou de impressão digital está disponível neste dispositivo.

#### `LocalAuthentication.isEnrolledAsync()`

Determina se o dispositivo tem impressões digitais ou dados faciais salvos para usar na autenticação. Retorna uma promessa que se resolve com um valor booleano indicando se o dispositivo tem impressões digitais ou dados faciais salvos para autenticação.

#### `LocalAuthentication.supportedAuthenticationTypesAsync()`

Determina quais tipos de autenticações estão disponíveis no dispositivo. Retorna uma promessa que se resolve com um array contendo `AuthenticationType`s.

Dispositivos podem suportar vários métodos de autenticação - ou seja, `[1,2]` significa que o dispositivo suporta autenticação por impressão digital e reconhecimento facial. Se nenhum for suportado, este método retorna um array vazio.

### Tipos

#### `BiometricsSecurityLevel`

Tipo: `string`

Nível de segurança da autenticação biométrica a ser permitido. Valores aceitáveis são: `weak` | `strong`.

#### `LocalAuthenticationError`

Tipo: `string`

Um dos valores de erro retornados pelo objeto `LocalAuthenticationResult`. Valores aceitáveis são: `not_enrolled` | `user_cancel` | `app_cancel` | `not_available` | `lockout` | `no_space` | `timeout` | `unable_to_process` | `unknown` | `system_cancel` | `user_fallback` | `invalid_context` | `passcode_not_set` | `authentication_failed`.

#### `LocalAuthenticationOptions`

Tipo: `object`

Opções para a autenticação local.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `promptMessage` | `string` | A mensagem a ser exibida ao usuário durante o prompt de autenticação. |
| `cancelLabel` | `string` | O rótulo do botão de cancelamento. |
| `disableDeviceFallback` | `boolean` | Se `true`, desabilita o fallback para o código de acesso do dispositivo se a biometria falhar. |
| `fallbackLabel` | `string` | O rótulo do botão de fallback para o código de acesso do dispositivo. |
| `biometricsSecurityLevel` (opcional) | `BiometricsSecurityLevel` | **Apenas para Android:** Define a classe de segurança da biometria. |

#### `LocalAuthenticationResult`

Tipo: `object`

O resultado de uma tentativa de autenticação. Contém as propriedades `success` (booleano) e `error` (string, se `success` for `false`).

### Enums

#### `AuthenticationType`

Enum que representa os tipos de autenticação suportados (`FINGERPRINT`, `FACIAL_RECOGNITION`, `IRIS`).

#### `SecurityLevel`

Enum que representa o nível de segurança da autenticação (`NONE`, `SECRET`, `BIOMETRIC`).

### Permissões

No Android, as permissões `android.permission.USE_BIOMETRIC` e `android.permission.USE_FINGERPRINT` podem ser necessárias. No iOS, a permissão `NSFaceIDUsageDescription` é necessária para o FaceID.

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


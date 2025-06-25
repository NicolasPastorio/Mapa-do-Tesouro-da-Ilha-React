# Armazenamento Seguro (SecureStore)

Uma biblioteca que fornece uma maneira de criptografar e armazenar com segurança pares de chave-valor localmente no dispositivo.

`expo-secure-store` fornece uma maneira de criptografar e armazenar com segurança pares de chave-valor localmente no dispositivo. Cada projeto Expo tem um sistema de armazenamento separado e não tem acesso ao armazenamento de outros projetos Expo.

O limite de tamanho para um valor é de 2048 bytes. Uma tentativa de armazenar valores maiores pode falhar. Atualmente, imprimimos um aviso quando o limite é atingido, no entanto, em uma futura versão do SDK, um erro pode ser lançado.

A opção `requireAuthentication` não é suportada no Expo Go quando a autenticação biométrica está disponível devido a uma chave `NSFaceIDUsageDescription` ausente.

> Esta API não é compatível com dispositivos que executam Android 5 ou inferior.

## Instalação

Para instalar a API SecureStore, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-secure-store
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-secure-store` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-secure-store",
        {
          "configureAndroidBackup": true,
          "faceIDPermission": "Permitir que $(PRODUCT_NAME) acesse seus dados biométricos do Face ID."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `configureAndroidBackup` | `true` | **Apenas para:** Android. Um booleano indicando se deve configurar o backup automático do Android para funcionar corretamente com `expo-secure-store`. [Saiba mais](https://docs.expo.dev/versions/latest/sdk/securestore/#android-auto-backup). |
| `faceIDPermission` | `"Allow $(PRODUCT_NAME) to access your Face ID biometric data."` | **Apenas para:** iOS. Uma string para definir a mensagem de permissão `NSFaceIDUsageDescription`. |

Se você estiver usando esta biblioteca em um aplicativo React Native existente, adicione a chave `NSFaceIDUsageDescription` ao Info.plist:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) acesse seus dados biométricos do Face ID.</string>
```

## Armazenamento de valor da plataforma

### Android

No Android, os valores são armazenados em [`SharedPreferences`](https://developer.android.com/reference/android/content/SharedPreferences), criptografados com o [sistema Keystore do Android](https://developer.android.com/training/articles/keystore).

### iOS

> Para aplicativos iOS autônomos, os dados armazenados com `expo-secure-store` podem persistir entre as instalações do aplicativo.

No iOS, os valores são armazenados usando os [serviços de keychain](https://developer.apple.com/documentation/security/keychain_services) como `kSecClassGenericPassword`. O iOS tem a opção adicional de poder definir o atributo `kSecAttrAccessible` do valor, que controla quando o valor está disponível para ser buscado.

## Persistência de dados

`expo-secure-store` foi projetado para fornecer uma solução de armazenamento de dados persistente entre reinícios e atualizações de aplicativos. No entanto, é importante não depender dele como uma única fonte de verdade para dados insubstituíveis e críticos. Os dados salvos usando `expo-secure-store` não serão preservados após a desinstalação do aplicativo. Além disso, quaisquer dados protegidos com a opção `requireAuthentication` definida como `true` se tornarão inacessíveis se houver alterações nas configurações biométricas do usuário, como a adição de uma nova impressão digital.

#### Isenção de prompt de criptografia

O Apple App Store Connect solicita que você selecione o tipo de algoritmo de criptografia que seu aplicativo implementa. Isso é conhecido como Informações de Conformidade de Exportação. É solicitado ao publicar o aplicativo ou enviar para o TestFlight.

Ao usar `expo-secure-store`, você pode definir a propriedade [`ios.config.usesNonExemptEncryption`](https://docs.expo.dev/versions/latest/config/app/#ios) como `false` na configuração do aplicativo:

```json
{
  "expo": {
    "ios": {
      "config": {
        "usesNonExemptEncryption": false
      }
      // ...
    }
  }
}
```

Definir esta propriedade lida automaticamente com o prompt de informações de conformidade.

## Backup Automático do Android

O [Backup Automático do Android para Aplicativos](https://developer.android.com/guide/topics/data/autobackup) faz backup automaticamente dos dados de um usuário de aplicativos que visam e executam no Android 6.0 (API nível 23) ou superior.

O sistema de Backup Automático deve ser configurado para excluir as entradas de preferências compartilhadas do `expo-secure-store`, pois é impossível descriptografá-las após restaurar o backup — as entradas do aplicativo são excluídas do Android Key Store quando o aplicativo é desinstalado.

Se o seu aplicativo não tiver nenhuma configuração de backup personalizada, o `expo-secure-store` configurará automaticamente o sistema de Backup Automático para ignorar os dados do `expo-secure-store`.

Se você estiver usando sua própria configuração de Backup Automático, você deve excluir o `SecureStore` sob o domínio `sharedpref` e definir `configureAndroidBackup` como `false` na [configuração do plugin de configuração](https://docs.expo.dev/versions/latest/sdk/securestore/#configurable-properties).

```xml
<data-extraction-rules>
  <cloud-backup>
    <include domain="sharedpref" path="."/>
    <exclude domain="sharedpref" path="SecureStore"/>
  </cloud-backup>
  <device-transfer>
    <include domain="sharedpref" path="."/>
    <exclude domain="sharedpref" path="SecureStore"/>
  </device-transfer>
</data-extraction-rules>
```

## API

```javascript
import * as SecureStore from 'expo-secure-store';
```

### Constantes

#### `SecureStore.AFTER_FIRST_UNLOCK`

Tipo: `string`

O item só pode ser acessado uma vez que o dispositivo tenha sido desbloqueado pelo menos uma vez após a inicialização. Este é o padrão.

#### `SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`

Tipo: `string`

O item só pode ser acessado uma vez que o dispositivo tenha sido desbloqueado pelo menos uma vez após a inicialização. O item não será migrado para um novo dispositivo.

#### `SecureStore.ALWAYS`

Tipo: `string`

O item pode ser acessado imediatamente após a inicialização do dispositivo. Este é o menos seguro.

#### `SecureStore.ALWAYS_THIS_DEVICE_ONLY`

Tipo: `string`

O item pode ser acessado imediatamente após a inicialização do dispositivo. O item não será migrado para um novo dispositivo.

#### `SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY`

Tipo: `string`

O item só pode ser acessado quando o dispositivo está desbloqueado. Se o dispositivo não tiver um código de acesso, o item não será acessível. O item não será migrado para um novo dispositivo.

#### `SecureStore.WHEN_UNLOCKED`

Tipo: `string`

O item só pode ser acessado quando o dispositivo está desbloqueado. Este é o mais seguro.

#### `SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY`

Tipo: `string`

O item só pode ser acessado quando o dispositivo está desbloqueado. O item não será migrado para um novo dispositivo.

### Métodos

#### `SecureStore.canUseBiometricAuthentication()`

Verifica se a autenticação biométrica está disponível no dispositivo. Retorna uma promessa que se resolve com um `boolean`.

#### `SecureStore.deleteItemAsync(key, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `key` | `string` | A chave do item a ser excluído. |
| `options` (opcional) | `SecureStoreOptions` | Opções para a exclusão do item. |

Exclui um item do armazenamento seguro. Retorna uma promessa que se resolve quando a operação é concluída.

#### `SecureStore.getItem(key, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `key` | `string` | A chave do item a ser recuperado. |
| `options` (opcional) | `SecureStoreOptions` | Opções para a recuperação do item. |

Recupera um item do armazenamento seguro. Retorna o valor do item ou `null` se o item não for encontrado.

#### `SecureStore.getItemAsync(key, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `key` | `string` | A chave do item a ser recuperado. |
| `options` (opcional) | `SecureStoreOptions` | Opções para a recuperação do item. |

Recupera um item do armazenamento seguro. Retorna uma promessa que se resolve com o valor do item ou `null` se o item não for encontrado.

#### `SecureStore.isAvailableAsync()`

Retorna se a API SecureStore está disponível no dispositivo. Retorna uma promessa que se resolve com um `boolean`.

#### `SecureStore.setItem(key, value, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `key` | `string` | A chave do item a ser armazenado. |
| `value` | `string` | O valor a ser armazenado. |
| `options` (opcional) | `SecureStoreOptions` | Opções para o armazenamento do item. |

Armazena um item no armazenamento seguro. Retorna `void`.

#### `SecureStore.setItemAsync(key, value, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `key` | `string` | A chave do item a ser armazenado. |
| `value` | `string` | O valor a ser armazenado. |
| `options` (opcional) | `SecureStoreOptions` | Opções para o armazenamento do item. |

Armazena um item no armazenamento seguro. Retorna uma promessa que se resolve quando a operação é concluída.

### Tipos

#### `KeychainAccessibilityConstant`

Tipo: `string`

Constante de acessibilidade do Keychain para iOS. Valores possíveis: `AFTER_FIRST_UNLOCK`, `AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`, `ALWAYS`, `ALWAYS_THIS_DEVICE_ONLY`, `WHEN_PASSCODE_SET_THIS_DEVICE_ONLY`, `WHEN_UNLOCKED`, `WHEN_UNLOCKED_THIS_DEVICE_ONLY`.

#### `SecureStoreOptions`

Tipo: `object`

Opções para as funções do SecureStore, incluindo `keychainAccessible` (iOS) e `requireAuthentication` (iOS).

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025


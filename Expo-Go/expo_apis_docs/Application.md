# Aplicação

Uma biblioteca universal que fornece informações úteis sobre o ID, nome do aplicativo e versão de compilação do aplicativo nativo em tempo de execução.

## Instalação

Para instalar a API Application, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-application
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as Application from 'expo-application';
```

### Constantes

#### `Application.applicationId`

Tipo: `string | null`

O ID do aplicativo. No Android, este é o ID do aplicativo. No iOS, este é o ID do pacote. Na web, este é `null`.

Exemplo:

`"com.cococasts.scribbles"`, `"com.apple.Pages"`

#### `Application.applicationName`

Tipo: `string | null`

O nome legível do aplicativo. No Android, este é o rótulo do aplicativo. No iOS, este é o nome de exibição do aplicativo. Na web, este é `null`.

Exemplo:

`"Scribbles"`, `"Pages"`

#### `Application.nativeApplicationVersion`

Tipo: `string | null`

A versão nativa do aplicativo. No Android, este é o `versionName` do `build.gradle`. No iOS, este é o `CFBundleShortVersionString` do `Info.plist`. Na web, este é `null`.

Exemplo:

`"1.0.0"`

#### `Application.nativeBuildVersion`

Tipo: `string | null`

A versão de compilação nativa. No Android, este é o `versionCode` do `build.gradle`. No iOS, este é o `CFBundleVersion` do `Info.plist`. Na web, este é `null`.

Exemplo:

`"1"`

### Métodos

#### `Application.getAndroidId()`

`Application.getAndroidId()`

Obtém o valor de [`Settings.Secure.ANDROID_ID`](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID). Este é um `string` hexadecimal exclusivo para cada combinação de chave de assinatura de aplicativo, usuário e dispositivo. O valor pode mudar se uma redefinição de fábrica for realizada no dispositivo ou se uma chave de assinatura de APK for alterada. Para mais informações sobre como a plataforma lida com `ANDROID_ID` no Android 8.0 (API nível 26) e superior, consulte [Android 8.0 Behavior Changes](https://developer.android.com/about/versions/oreo/android-8.0-changes#privacy-all). No iOS e na web, esta função não está disponível.

> Em versões da plataforma anteriores ao Android 8.0 (API nível 26), este valor permanece constante durante a vida útil do dispositivo do usuário. Consulte a documentação oficial do [ANDROID_ID](https://developer.android.com/reference/android/provider/Settings.Secure#ANDROID_ID) para mais informações.

Exemplo:

`"dd96dec43fb81c97"`

#### `Application.getInstallationTimeAsync()`

`Application.getInstallationTimeAsync()`

Retorna uma `Promise` que se resolve com um `number` especificando o timestamp de quando o aplicativo foi instalado no dispositivo. Na web, esta função não está disponível.

Exemplo:

```javascript
await Application.getInstallationTimeAsync();
```

#### `Application.getInstallReferrerAsync()`

`Application.getInstallReferrerAsync()`

Retorna uma `Promise` que se resolve com um `string` especificando a URL de referência da instalação do aplicativo. No iOS e na web, esta função não está disponível.

Exemplo:

```javascript
await Application.getInstallReferrerAsync();
```

#### `Application.getIosApplicationReleaseTypeAsync()`

`Application.getIosApplicationReleaseTypeAsync()`

Retorna uma `Promise` que se resolve com um valor `ApplicationReleaseType` indicando como o aplicativo foi instalado. No Android e na web, esta função não está disponível.

Exemplo:

```javascript
await Application.getIosApplicationReleaseTypeAsync();
```

#### `Application.getIosIdForVendorAsync()`

`Application.getIosIdForVendorAsync()`

Obtém o valor do "identificador para fornecedor" ([IDFV](https://developer.apple.com/documentation/uikit/uidevice/1620059-identifierforvendor)) do iOS, um ID de string que identifica exclusivamente um dispositivo para o fornecedor do aplicativo. Este método pode às vezes retornar `nil`, caso em que espere e chame o método novamente mais tarde. Isso pode acontecer quando o dispositivo foi reiniciado antes que o usuário tenha desbloqueado o dispositivo.

O sistema operacional mudará o identificador do fornecedor se todos os aplicativos do fornecedor atual do aplicativo tiverem sido desinstalados.

Uma `Promise` que se resolve com um `string` especificando o ID do fornecedor do aplicativo. Aplicativos do mesmo fornecedor retornarão o mesmo ID. Consulte a documentação da Apple para mais informações sobre a semântica do ID do fornecedor.

Exemplo:

```javascript
await Application.getIosIdForVendorAsync();
```

#### `Application.getIosPushNotificationServiceEnvironmentAsync()`

`Application.getIosPushNotificationServiceEnvironmentAsync()`

Retorna uma `Promise` que se resolve com um valor `PushNotificationServiceEnvironment` indicando o ambiente do serviço de notificação push. No Android e na web, esta função não está disponível.

Exemplo:

```javascript
await Application.getIosPushNotificationServiceEnvironmentAsync();
```

#### `Application.getLastUpdateTimeAsync()`

`Application.getLastUpdateTimeAsync()`

Retorna uma `Promise` que se resolve com um `number` especificando o timestamp de quando o aplicativo foi atualizado pela última vez. No iOS e na web, esta função não está disponível.

Exemplo:

```javascript
await Application.getLastUpdateTimeAsync();
```

### Tipos

#### `PushNotificationServiceEnvironment`

`'development'` | `'production'`

#### `ApplicationReleaseType`

`'SIMULATOR'` | `'STORE'` | `'AD_HOC'` | `'ENTERPRISE'` | `'DEVELOPMENT'`

### Códigos de Erro

#### `Application.ErrorCode`

`'E_APPLICATION_GET_ANDROID_ID_FAILED'` | `'E_APPLICATION_GET_INSTALLATION_TIME_FAILED'` | `'E_APPLICATION_GET_INSTALL_REFERRER_FAILED'` | `'E_APPLICATION_GET_IOS_APPLICATION_RELEASE_TYPE_FAILED'` | `'E_APPLICATION_GET_IOS_ID_FOR_VENDOR_FAILED'` | `'E_APPLICATION_GET_IOS_PUSH_NOTIFICATION_SERVICE_ENVIRONMENT_FAILED'` | `'E_APPLICATION_GET_LAST_UPDATE_TIME_FAILED'`

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


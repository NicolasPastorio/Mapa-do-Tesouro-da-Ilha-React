# Constantes (Constants)

Uma API que fornece informações do sistema que permanecem constantes durante a vida útil da instalação do seu aplicativo.

`expo-constants` fornece informações do sistema que permanecem constantes durante a vida útil da instalação do seu aplicativo.

## Instalação

Para instalar a API Constants, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-constants
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import Constants from 'expo-constants';
```

### Propriedades

O objeto `Constants` contém várias propriedades que fornecem informações sobre o ambiente de execução do aplicativo. Algumas das propriedades mais comuns incluem:

*   **`Constants.appOwnership`**: Uma string que indica como o aplicativo está sendo executado. Pode ser `expo` (no Expo Go), `standalone` (um aplicativo autônomo construído com EAS Build) ou `guest` (um aplicativo incorporado em outro aplicativo Expo).
*   **`Constants.debugMode`**: Um booleano que indica se o aplicativo está sendo executado no modo de depuração.
*   **`Constants.deviceName`**: O nome do dispositivo em que o aplicativo está sendo executado.
*   **`Constants.deviceYearClass`**: Um número que representa a classe de ano do dispositivo, útil para determinar o desempenho aproximado do dispositivo.
*   **`Constants.expoGoVersion`**: A versão do Expo Go em que o aplicativo está sendo executado, se aplicável.
*   **`Constants.installationId`**: Um ID exclusivo para a instalação do aplicativo no dispositivo.
*   **`Constants.isDevice`**: Um booleano que indica se o aplicativo está sendo executado em um dispositivo físico (true) ou em um simulador/emulador (false).
*   **`Constants.linkingUri`**: O URI de vinculação profunda do aplicativo.
*   **`Constants.manifest`**: O objeto de manifesto do aplicativo, que contém informações como nome, versão, ícone, etc.
*   **`Constants.nativeAppVersion`**: A versão nativa do aplicativo (por exemplo, `1.0.0`).
*   **`Constants.nativeBuildVersion`**: A versão de construção nativa do aplicativo (por exemplo, `1`).
*   **`Constants.platform`**: Um objeto que contém informações específicas da plataforma (iOS, Android, Web), como versão do sistema operacional, modelo do dispositivo, etc.
*   **`Constants.sessionId`**: Um ID exclusivo para a sessão atual do aplicativo.
*   **`Constants.statusBarHeight`**: A altura da barra de status do dispositivo em pixels.
*   **`Constants.systemFonts`**: Um array de strings que representa as fontes do sistema disponíveis no dispositivo.
*   **`Constants.totalMemory`**: A quantidade total de memória RAM no dispositivo em bytes.
*   **`Constants.platform.ios.model`**: O modelo do dispositivo iOS (por exemplo, `iPhone13,4`).
*   **`Constants.platform.ios.platform`**: O identificador interno do modelo Apple para este dispositivo (por exemplo, `iPhone1,1`).
*   **`Constants.platform.ios.systemVersion`**: A versão do iOS em execução neste dispositivo (por exemplo, `10.3`).
*   **`Constants.platform.android.versionCode`**: O código da versão definido por `android.versionCode` em `app.json`.

### Tipos

O `expo-constants` também define vários tipos e interfaces para as propriedades que ele expõe, como `AndroidManifest`, `ClientScopingConfig`, `EASConfig`, `ExpoGoConfig`, `IOSManifest`, `Manifest`, `PlatformManifest`, `WebManifest`, entre outros. Estes tipos ajudam a garantir a segurança e a clareza do código ao trabalhar com as constantes do aplicativo.

### Enums

*   **`AppOwnership`**: Enum que representa a propriedade do aplicativo (`expo`, `standalone`, `guest`).
*   **`ExecutionEnvironment`**: Enum que representa o ambiente de execução (`standalone`, `storeClient`, `bare`).
*   **`UserInterfaceIdiom`**: Enum que representa o idioma da interface do usuário (`handset`, `tablet`, `unsupported`).

## Considerações

*   As informações fornecidas por `expo-constants` são estáticas e não mudam durante a execução do aplicativo. Para informações dinâmicas (como status da bateria ou conectividade de rede), você deve usar outras APIs do Expo.
*   Algumas propriedades podem ser `null` ou indefinidas dependendo do ambiente de execução (Expo Go, standalone, etc.) ou da plataforma.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


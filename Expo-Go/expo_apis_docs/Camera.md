# Câmera (Camera)

Um componente React que renderiza uma pré-visualização da câmera frontal ou traseira do dispositivo.

`expo-camera` fornece um componente React que renderiza uma pré-visualização da câmera frontal ou traseira do dispositivo. Os parâmetros da câmera, como zoom, tocha e modo de flash, são ajustáveis. Usando `CameraView`, você pode tirar fotos e gravar vídeos que são salvos no cache do aplicativo. O componente também é capaz de detectar códigos de barras que aparecem na pré-visualização. Execute o [exemplo](https://docs.expo.dev/versions/latest/sdk/camera/#usage) em seu dispositivo para ver todos esses recursos funcionando juntos.

## Instalação

Para instalar a API Camera, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-camera
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `expo-camera` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-camera",
        {
          "cameraPermission": "Permitir que $(PRODUCT_NAME) acesse sua câmera",
          "microphonePermission": "Permitir que $(PRODUCT_NAME) acesse seu microfone",
          "recordAudioAndroid": true
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `cameraPermission` | `"Permitir que $(PRODUCT_NAME) acesse sua câmera"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSCameraUsageDescription`. |
| `microphonePermission` | `"Permitir que $(PRODUCT_NAME) acesse seu microfone"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSMicrophoneUsageDescription`. |
| `recordAudioAndroid` | `true` | **Apenas para Android:** Um booleano que determina se a permissão `RECORD_AUDIO` deve ser habilitada no Android. |

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) (você está usando projetos Android e iOS nativos manualmente), então você precisa configurar as seguintes permissões em seus projetos nativos:

#### Android

*   `expo-camera` adiciona automaticamente a permissão `android.permission.CAMERA` ao arquivo `android/app/src/main/AndroidManifest.xml` do seu projeto. Se você quiser gravar vídeos com áudio, inclua a permissão `RECORD_AUDIO`:

    ```xml
    <uses-permission android:name="android.permission.CAMERA" />
    <uses-permission android:name="android.permission.RECORD_AUDIO" />
    ```

*   Em seguida, ajuste o arquivo `android/build.gradle` para adicionar um novo bloco maven após todos os outros repositórios, conforme mostrado abaixo:

    ```gradle
    allprojects {
      repositories {
          maven {
              url "$rootDir/../node_modules/expo-camera/android/maven"
          }
      }
    }
    ```

#### iOS

*   Adicione as chaves `NSCameraUsageDescription` e `NSMicrophoneUsageDescription` ao seu `ios/[app]/Info.plist`:

    ```xml
    <key>NSCameraUsageDescription</key>
    <string>Permitir que $(PRODUCT_NAME) acesse sua câmera</string>
    <key>NSMicrophoneUsageDescription</key>
    <string>Permitir que $(PRODUCT_NAME) acesse seu microfone</string>
    ```

## Uso

> Apenas uma pré-visualização da Câmera pode estar ativa a qualquer momento. Se você tiver várias telas em seu aplicativo, você deve desmontar os componentes `Camera` sempre que uma tela estiver desfocada.

```javascript
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions();
  const cameraRef = useRef<CameraView>(null);

  if (!cameraPermission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!cameraPermission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>Precisamos da sua permissão para mostrar a câmera</Text>
        <Button onPress={requestCameraPermission} title="Conceder Permissão" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  async function takePicture() {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log(photo.uri);
    }
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Virar Câmera</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tirar Foto</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
```

## API

```javascript
import { CameraView } from 'expo-camera';
```

### Componente `CameraView`

Um componente React que renderiza uma pré-visualização da câmera. Ele aceita as seguintes props:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `facing` | `CameraType` | A câmera a ser usada (`'front'` ou `'back'`). |
| `flash` | `FlashMode` | O modo de flash (`'on'`, `'off'`, `'auto'`, `'torch'`). |
| `zoom` | `number` | O nível de zoom da câmera (entre `0` e `1`). |
| `onCameraReady` | `() => void` | Callback invocado quando a câmera está pronta para uso. |
| `onMountError` | `(error: CameraMountError) => void` | Callback invocado quando ocorre um erro ao montar a câmera. |
| `onBarcodeScanned` | `(scanningResult: BarcodeScanningResult) => void` | Callback invocado quando um código de barras é detectado. |
| `barcodeScannerSettings` | `BarcodeScannerSettings` | Configurações para o scanner de código de barras. |

### Métodos Estáticos

#### `Camera.isAvailableAsync()`

Retorna uma promessa que se resolve com um booleano indicando se a API da câmera está disponível no dispositivo.

#### `Camera.getAvailableVideoCodecsAsync()`

Retorna uma promessa que se resolve com uma lista de codecs de vídeo disponíveis para gravação.

#### `Camera.launchScanner(options)`

Inicia um scanner de código de barras em tela cheia. Retorna uma promessa que se resolve com o resultado da digitalização.

#### `Camera.dismissScanner()`

Fecha o scanner de código de barras iniciado por `launchScanner`.

### Métodos do Componente (`ref`)

Você pode acessar esses métodos usando uma `ref` no componente `CameraView`.

#### `cameraRef.current.takePictureAsync(options)`

Tira uma foto. Retorna uma promessa que se resolve com um objeto contendo informações sobre a foto tirada (URI, largura, altura, etc.).

#### `cameraRef.current.recordAsync(options)`

Inicia a gravação de um vídeo. Retorna uma promessa que se resolve com um objeto contendo informações sobre o vídeo gravado (URI, largura, altura, etc.).

#### `cameraRef.current.stopRecording()`

Para a gravação de vídeo.

#### `cameraRef.current.pausePreview()`

Pausa a pré-visualização da câmera.

#### `cameraRef.current.resumePreview()`

Retoma a pré-visualização da câmera.

#### `cameraRef.current.getAvailableLensesAsync()`

Retorna uma promessa que se resolve com uma lista de lentes disponíveis (`'front'`, `'back'`).

#### `cameraRef.current.getAvailablePictureSizesAsync(ratio)`

Retorna uma promessa que se resolve com uma lista de tamanhos de imagem disponíveis para uma determinada proporção.

#### `cameraRef.current.getSupportedFeatures()`

Retorna uma lista de recursos suportados pela câmera (por exemplo, `'flash'`, `'zoom'`).

### Hooks

#### `useCameraPermissions(options)`

Verifica ou solicita permissões para acessar a câmera. Retorna um array com o status da permissão e uma função para solicitar a permissão.

#### `useMicrophonePermissions(options)`

Verifica ou solicita permissões para acessar o microfone. Retorna um array com o status da permissão e uma função para solicitar a permissão.

### Tipos e Enums

*   **`CameraType`**: `'front'` ou `'back'`.
*   **`FlashMode`**: `'on'`, `'off'`, `'auto'`, `'torch'`.
*   **`BarcodeScanningResult`**: Objeto que contém o tipo e os dados do código de barras digitalizado.
*   **`BarcodeScannerSettings`**: Objeto para configurar o scanner de código de barras.
*   **`CameraMountError`**: Objeto de erro retornado quando a câmera não pode ser montada.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


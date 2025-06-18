# Seletor de Imagens (ImagePicker)

Uma biblioteca que fornece acesso à interface do usuário do sistema para selecionar imagens e vídeos da biblioteca do telefone ou tirar uma foto com a câmera.

`expo-image-picker` fornece acesso à interface do usuário do sistema para selecionar imagens e vídeos da biblioteca do telefone ou tirar uma foto com a câmera.

## Instalação

Para instalar a API ImagePicker, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-image-picker
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

#### Problemas Conhecidos

iOS

No iOS, quando uma imagem (geralmente de [resolução mais alta](https://github.com/expo/expo/issues/1009)) é selecionada do rolo da câmera, o resultado da imagem cortada fornece o valor errado para o retângulo cortado em alguns casos. Infelizmente, este problema é com o `UIImagePickerController` subjacente devido a um bug nas ferramentas de código fechado incorporadas ao iOS.

## Configuração no `app.config`

Você pode configurar `expo-image-picker` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para entrar em vigor.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "O aplicativo acessa suas fotos para permitir que você as compartilhe com seus amigos."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `photosPermission` | `"Permitir que $(PRODUCT_NAME) acesse suas fotos"` | Apenas para: iOS. Uma string para definir a mensagem de permissão `NSPhotoLibraryUsageDescription`. |
| `cameraPermission` | `"Permitir que $(PRODUCT_NAME) acesse sua câmera"` | Apenas para: iOS. Uma string para definir a mensagem de permissão `NSCameraUsageDescription`. |
| `microphonePermission` | `"Permitir que $(PRODUCT_NAME) use seu microfone"` | Apenas para: iOS. Uma string para definir a mensagem de permissão `NSMicrophoneUsageDescription`. |

Você está usando esta biblioteca em um aplicativo React Native existente?

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) ou estiver usando um projeto iOS nativo manualmente, então você precisa adicionar as chaves `NSPhotoLibraryUsageDescription`, `NSCameraUsageDescription` e `NSMicrophoneUsageDescription` ao seu `ios/[app]/Info.plist`:

```xml
<key>NSPhotoLibraryUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) salve fotos</string>
<key>NSCameraUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) acesse sua câmera</string>
<key>NSMicrophoneUsageDescription</key>
<string>Permitir que $(PRODUCT_NAME) use seu microfone</string>
```

## Uso

```javascript
import React, { useState, useEffect } from 'react';
import { Button, Image, View, StyleSheet, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [cameraPermissionInformation, requestCameraPermission] = ImagePicker.useCameraPermissions();
  const [mediaLibraryPermissionInformation, requestMediaLibraryPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    if (cameraPermissionInformation.status !== ImagePicker.PermissionStatus.GRANTED) {
      const permissionResponse = await requestCameraPermission();
      if (permissionResponse.status !== ImagePicker.PermissionStatus.GRANTED) {
        alert('Permissão para acessar a câmera é necessária!');
        return;
      }
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Escolher imagem da galeria" onPress={pickImage} />
      <Button title="Tirar foto" onPress={takePhoto} />
      {image && <Image source={{ uri: image }} style={styles.image} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});
```

## API

```javascript
import * as ImagePicker from 'expo-image-picker';
```

### Hooks

#### `useCameraPermissions(options)`

Um hook React que retorna o status da permissão da câmera e uma função para solicitar a permissão.

#### `useMediaLibraryPermissions(options)`

Um hook React que retorna o status da permissão da biblioteca de mídia e uma função para solicitar a permissão.

### Métodos

#### `ImagePicker.getCameraPermissionsAsync()`

Retorna uma promessa que se resolve com o status da permissão da câmera.

#### `ImagePicker.getMediaLibraryPermissionsAsync()`

Retorna uma promessa que se resolve com o status da permissão da biblioteca de mídia.

#### `ImagePicker.getPendingResultAsync()`

Retorna uma promessa que se resolve com o resultado de uma operação de seleção de imagem pendente (se houver).

#### `ImagePicker.launchCameraAsync(options)`

Inicia a câmera para tirar uma foto ou gravar um vídeo. Retorna uma promessa que se resolve com um objeto `ImagePickerResult`.

#### `ImagePicker.launchImageLibraryAsync(options)`

Inicia a interface do usuário do sistema para selecionar imagens e vídeos da biblioteca do telefone. Retorna uma promessa que se resolve com um objeto `ImagePickerResult`.

#### `ImagePicker.requestCameraPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar a câmera.

#### `ImagePicker.requestMediaLibraryPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar a biblioteca de mídia.

### Tipos

#### `CameraPermissionResponse`

Tipo: `object`

Um objeto que representa a resposta da permissão da câmera.

#### `DefaultTab`

Tipo: `enum`

Define a aba padrão a ser aberta no seletor de imagens (`All`, `Photos`, `Videos`).

#### `ImagePickerAsset`

Tipo: `object`

Um objeto que representa um ativo de imagem ou vídeo selecionado.

#### `ImagePickerCanceledResult`

Tipo: `object`

Um objeto que representa um resultado de seleção de imagem cancelado.

#### `ImagePickerErrorResult`

Tipo: `object`

Um objeto que representa um resultado de seleção de imagem com erro.

#### `ImagePickerOptions`

Tipo: `object`

Opções para o seletor de imagens, como `mediaTypes`, `allowsEditing`, `aspect` e `quality`.

#### `ImagePickerResult`

Tipo: `object`

Um objeto que representa o resultado de uma operação de seleção de imagem. Pode ser `ImagePickerSuccessResult` ou `ImagePickerCanceledResult`.

#### `ImagePickerSuccessResult`

Tipo: `object`

Um objeto que representa um resultado de seleção de imagem bem-sucedido.

#### `MediaLibraryPermissionResponse`

Tipo: `object`

Um objeto que representa a resposta da permissão da biblioteca de mídia.

#### `MediaType`

Tipo: `enum`

Define os tipos de mídia a serem selecionados (`All`, `Images`, `Videos`).

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


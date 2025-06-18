# Manipulador de Imagens (ImageManipulator)

Uma biblioteca que fornece uma API para manipulação de imagens no sistema de arquivos local.

`expo-image-manipulator` fornece uma API para modificar imagens armazenadas no sistema de arquivos local.

## Instalação

Para instalar a API ImageManipulator, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-image-manipulator
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

Este exemplo irá primeiro girar a imagem 90 graus no sentido horário, depois virar a imagem girada verticalmente e salvá-la como um PNG.

### Uso Básico do ImageManipulator

```javascript
import { useState } from 'react';
import { Button, Image, StyleSheet, View } from 'react-native';
import { Asset } from 'expo-asset';
import { FlipType, SaveFormat, manipulateAsync } from 'expo-image-manipulator';

const IMAGE = Asset.fromModule(require('./assets/snack-icon.png')); // Substitua pelo caminho da sua imagem

export default function App() {
  const [image, setImage] = useState(IMAGE);

  const rotate90andFlip = async () => {
    const manipResult = await manipulateAsync(
      image.localUri || image.uri,
      [
        { rotate: 90 },
        { flip: FlipType.Vertical },
      ],
      {
        compress: 1,
        format: SaveFormat.PNG,
      }
    );
    setImage(manipResult);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image.localUri || image.uri }} style={styles.image} />
      </View>
      <Button title="Girar e Virar" onPress={rotate90andFlip} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
```

## API

```javascript
import * as ImageManipulator from 'expo-image-manipulator';
```

### Métodos

#### `ImageManipulator.manipulateAsync(uri, actions, saveOptions)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `uri` | `string` | O URI da imagem a ser manipulada. |
| `actions` | `Action[]` | Um array de ações de manipulação a serem aplicadas à imagem. |
| `saveOptions` (opcional) | `SaveOptions` | Opções para salvar a imagem resultante, como formato e compressão. |

Manipula uma imagem no sistema de arquivos local. Retorna uma promessa que se resolve com um objeto `ImageResult` contendo o URI da imagem manipulada, largura, altura e outras informações.

### Hooks

#### `useImageManipulator(source)`

Um hook React que carrega uma imagem e cria um contexto de manipulação de imagem. Permite encadear operações de manipulação de imagem.

### Tipos

#### `Action`

Tipo: `object`

Um objeto que representa uma ação de manipulação de imagem. Pode ser `ActionCrop`, `ActionExtent`, `ActionFlip`, `ActionResize` ou `ActionRotate`.

#### `ActionCrop`

Tipo: `object`

Uma ação para cortar a imagem. Contém as propriedades `originX`, `originY`, `width` e `height` do retângulo de corte.

#### `ActionExtent`

Tipo: `object`

Uma ação para estender a imagem. Contém as propriedades `width`, `height`, `originX`, `originY` e `backgroundColor`.

#### `ActionFlip`

Tipo: `object`

Uma ação para virar a imagem. Contém a propriedade `flip` (`FlipType.Vertical` ou `FlipType.Horizontal`).

#### `ActionResize`

Tipo: `object`

Uma ação para redimensionar a imagem. Contém as propriedades `width` e `height` para as novas dimensões.

#### `ActionRotate`

Tipo: `object`

Uma ação para girar a imagem. Contém a propriedade `degrees` para a rotação em graus.

#### `ImageResult`

Tipo: `object`

Um objeto que representa o resultado de uma manipulação de imagem, contendo `uri`, `width`, `height` e `base64` (opcional).

#### `SaveOptions`

Tipo: `object`

Opções para salvar a imagem manipulada, incluindo `compress` (qualidade de compressão), `format` (formato de saída) e `base64` (se deve incluir a imagem em base64).

### Enums

#### `FlipType`

Enum que representa os tipos de virada (`Vertical`, `Horizontal`).

#### `SaveFormat`

Enum que representa os formatos de salvamento (`JPEG`, `PNG`, `WEBP`).

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


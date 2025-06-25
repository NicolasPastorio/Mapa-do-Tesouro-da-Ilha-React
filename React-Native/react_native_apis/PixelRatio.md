# PixelRatio

A API `PixelRatio` no React Native fornece acesso à densidade de pixels do dispositivo. Isso é útil para lidar com imagens e tamanhos de fonte de forma que eles apareçam nítidos e proporcionais em telas com diferentes densidades de pixels (DPI - Dots Per Inch).

## Métodos

### `get()`
Retorna a densidade de pixels do dispositivo. Por exemplo, um iPhone 6/7/8 tem um `PixelRatio` de 2, enquanto um iPhone X/XS/XR/11/12/13/14/15 tem um `PixelRatio` de 3. Tablets Android podem ter `PixelRatio`s variados.

```javascript
import { PixelRatio, Text, View, StyleSheet } from 'react-native';

const PixelRatioInfo = () => {
  const pixelRatio = PixelRatio.get();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Densidade de Pixels do Dispositivo: {pixelRatio}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default PixelRatioInfo;
```

### `getFontScale()`
Retorna a escala de fonte do dispositivo. Este valor é usado para dimensionar fontes com base nas configurações de acessibilidade do usuário (tamanho da fonte preferido).

```javascript
import { PixelRatio, Text, View, StyleSheet } from 'react-native';

const FontScaleInfo = () => {
  const fontScale = PixelRatio.getFontScale();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Escala de Fonte do Dispositivo: {fontScale.toFixed(2)}
      </Text>
      <Text style={{ fontSize: 16 * fontScale }}>
        Este texto se adapta à escala de fonte do sistema.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default FontScaleInfo;
```

### `roundToNearestPixel(layoutSize)`
Arredonda um tamanho de layout (em dp) para o pixel físico mais próximo. Isso é útil para garantir que os elementos da UI se alinhem perfeitamente com os pixels da tela, evitando artefatos visuais como bordas borradas.

```javascript
import { PixelRatio, Text, View, StyleSheet } from 'react-native';

const PixelRoundingExample = () => {
  const originalSize = 10.3;
  const roundedSize = PixelRatio.roundToNearestPixel(originalSize);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tamanho Original (dp): {originalSize}
      </Text>
      <Text style={styles.text}>
        Tamanho Arredondado para Pixel (dp): {roundedSize}
      </Text>
      <View style={[styles.box, { width: roundedSize, height: roundedSize }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  box: {
    backgroundColor: 'skyblue',
    borderWidth: 1,
    borderColor: 'blue',
  },
});

export default PixelRoundingExample;
```

### `getPixelSizeForLayoutSize(layoutSize)`
Converte um tamanho de layout (em dp) para o tamanho correspondente em pixels físicos, levando em conta a densidade de pixels do dispositivo. Isso é particularmente útil para especificar tamanhos de imagem para que elas sejam carregadas na resolução correta.

```javascript
import { PixelRatio, Text, View, StyleSheet } from 'react-native';

const ImageSizeExample = () => {
  const layoutSize = 100; // Tamanho em dp
  const pixelSize = PixelRatio.getPixelSizeForLayoutSize(layoutSize);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Tamanho de Layout (dp): {layoutSize}
      </Text>
      <Text style={styles.text}>
        Tamanho em Pixels Físicos: {pixelSize}
      </Text>
      {/* Você usaria pixelSize para carregar uma imagem com a resolução correta */}
      {/* <Image source={{ uri: `https://example.com/image@${pixelSize}x.png` }} style={{ width: layoutSize, height: layoutSize }} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default ImageSizeExample;
```

## Considerações

- **Imagens:** Ao usar imagens, é uma boa prática fornecer diferentes resoluções para diferentes `PixelRatio`s (por exemplo, `image.png`, `image@2x.png`, `image@3x.png`). O React Native selecionará automaticamente a imagem apropriada com base no `PixelRatio` do dispositivo.
- **Fontes:** A escala de fonte (`getFontScale()`) é importante para a acessibilidade. Certifique-se de que seus tamanhos de fonte se ajustem corretamente às preferências do usuário.
- **Layout:** Embora o React Native lide com a maioria dos aspectos de dimensionamento automaticamente usando dp (pixels independentes de densidade), `PixelRatio` pode ser útil para ajustes finos ou para interagir com APIs nativas que esperam tamanhos em pixels físicos.


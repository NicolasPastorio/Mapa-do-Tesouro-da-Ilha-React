# Dimensions

A API `Dimensions` no React Native fornece acesso às dimensões da tela do dispositivo e da janela do aplicativo. Isso é fundamental para criar layouts responsivos que se adaptam a diferentes tamanhos de tela e orientações (retrato/paisagem).

## Métodos

### `get(dim)`
Retorna um objeto contendo a largura (`width`), altura (`height`) e escala (`scale`) do dispositivo ou da janela. O parâmetro `dim` pode ser `screen` (para as dimensões totais da tela) ou `window` (para as dimensões da janela do aplicativo, que podem ser menores que a tela se houver barras de navegação ou status).

```javascript
import { Dimensions } from 'react-native';

// Obter dimensões da tela
const screenDimensions = Dimensions.get('screen');
console.log('Largura da Tela:', screenDimensions.width);
console.log('Altura da Tela:', screenDimensions.height);
console.log('Escala da Tela:', screenDimensions.scale); // Pixel ratio

// Obter dimensões da janela do aplicativo
const windowDimensions = Dimensions.get('window');
console.log('Largura da Janela:', windowDimensions.width);
console.log('Altura da Janela:', windowDimensions.height);
console.log('Escala da Janela:', windowDimensions.scale);
```

### `addEventListener(type, handler)`
Adiciona um ouvinte para mudanças nas dimensões da tela ou da janela. O `type` deve ser `change` e o `handler` é uma função que será chamada com um objeto contendo as novas dimensões (`screen` e `window`). Isso é particularmente útil para lidar com mudanças de orientação do dispositivo.

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const DimensionMonitor = () => {
  const [screenInfo, setScreenInfo] = useState(Dimensions.get('screen'));
  const [windowInfo, setWindowInfo] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window, screen }) => {
      setScreenInfo(screen);
      setWindowInfo(window);
      console.log('Dimensões da janela mudaram:', window);
      console.log('Dimensões da tela mudaram:', screen);
    };

    const subscription = Dimensions.addEventListener('change', onChange);

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dimensões da Janela:</Text>
      <Text style={styles.text}>Largura: {windowInfo.width.toFixed(2)}</Text>
      <Text style={styles.text}>Altura: {windowInfo.height.toFixed(2)}</Text>
      <Text style={styles.text}>Escala: {windowInfo.scale.toFixed(2)}</Text>
      <Text style={styles.text}>\nDimensões da Tela:</Text>
      <Text style={styles.text}>Largura: {screenInfo.width.toFixed(2)}</Text>
      <Text style={styles.text}>Altura: {screenInfo.height.toFixed(2)}</Text>
      <Text style={styles.text}>Escala: {screenInfo.scale.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
  },
});

export default DimensionMonitor;
```

## Considerações

- **Responsividade:** Use `Dimensions` para criar layouts que se ajustam dinamicamente ao tamanho da tela. Evite usar valores fixos de largura e altura sempre que possível.
- **Orientação:** A detecção de mudanças de orientação (retrato para paisagem e vice-versa) é um caso de uso comum para `Dimensions.addEventListener`.
- **`screen` vs. `window`:** É importante entender a diferença entre as dimensões da `screen` e da `window`. A `screen` representa as dimensões físicas totais da tela do dispositivo, enquanto a `window` representa a área visível do aplicativo, que pode ser afetada por barras de status, barras de navegação, etc.
- **Unidades:** As dimensões retornadas são em pixels independentes de densidade (dp), que são a unidade padrão de medida no React Native para garantir que os elementos da UI tenham o mesmo tamanho aparente em diferentes densidades de pixel.


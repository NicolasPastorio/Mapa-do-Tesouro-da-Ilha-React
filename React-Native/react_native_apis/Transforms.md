# Transforms

No React Native, as transformações permitem que você manipule a posição, rotação, escala e inclinação de um componente visualmente. Elas são aplicadas usando a propriedade `transform` nos estilos de um componente, que aceita um array de objetos de transformação. Isso é fundamental para criar animações complexas, efeitos visuais e layouts dinâmicos.

## Propriedade `transform`

A propriedade `transform` é um array de objetos, onde cada objeto representa uma transformação a ser aplicada. As transformações são aplicadas na ordem em que aparecem no array.

### Tipos de Transformações

#### Translação (Translation)
Move um componente ao longo dos eixos X, Y ou Z.

-   `translateX`: Move horizontalmente.
-   `translateY`: Move verticalmente.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const TranslateExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { transform: [{ translateX: 50 }, { translateY: 20 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
});

export default TranslateExample;
```

#### Escala (Scale)
Redimensiona um componente.

-   `scale`: Redimensiona uniformemente (X e Y).
-   `scaleX`: Redimensiona apenas horizontalmente.
-   `scaleY`: Redimensiona apenas verticalmente.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const ScaleExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { transform: [{ scale: 1.5 }] }]} />
      <View style={[styles.box, { transform: [{ scaleX: 2 }] }]} />
      <View style={[styles.box, { transform: [{ scaleY: 0.5 }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'lightgreen',
    margin: 10,
  },
});

export default ScaleExample;
```

#### Rotação (Rotation)
Gira um componente em torno de um ponto.

-   `rotate`: Gira em 2D (eixo Z).
-   `rotateX`: Gira em torno do eixo X (perspectiva).
-   `rotateY`: Gira em torno do eixo Y (perspectiva).

As unidades para rotação são strings que podem ser `deg` (graus) ou `rad` (radianos).

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const RotateExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { transform: [{ rotate: '45deg' }] }]} />
      <View style={[styles.box, { transform: [{ rotateX: '60deg' }] }]} />
      <View style={[styles.box, { transform: [{ rotateY: '60deg' }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    perspective: 1000, // Necessário para rotações 3D
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'lightcoral',
    margin: 10,
  },
});

export default RotateExample;
```

#### Inclinação (Skew)
Inclina um componente.

-   `skewX`: Inclina horizontalmente.
-   `skewY`: Inclina verticalmente.

As unidades para inclinação são `deg` (graus).

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const SkewExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { transform: [{ skewX: '20deg' }] }]} />
      <View style={[styles.box, { transform: [{ skewY: '20deg' }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'lightsalmon',
    margin: 10,
  },
});

export default SkewExample;
```

#### Perspectiva (Perspective)
Aplica uma transformação de perspectiva 3D. Geralmente usada em conjunto com rotações 3D para criar um efeito de profundidade.

-   `perspective`: Define a distância do plano Z.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const PerspectiveExample = () => {
  return (
    <View style={styles.container}>
      <View style={[styles.box, { transform: [{ perspective: 200 }, { rotateY: '45deg' }] }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 150,
    height: 150,
    backgroundColor: 'lightblue',
  },
});

export default PerspectiveExample;
```

## Combinação de Transformações

Você pode combinar múltiplas transformações em um único array. A ordem das transformações é importante, pois elas são aplicadas sequencialmente.

```javascript
import React from 'react';
import { View, StyleSheet } from 'react-native';

const CombinedTransforms = () => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.box,
        { transform: [
          { translateX: 50 },
          { rotate: '45deg' },
          { scale: 1.2 },
        ] }
      ]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'purple',
  },
});

export default CombinedTransforms;
```

## Considerações

-   **Performance:** As transformações são otimizadas para performance no React Native, pois são aplicadas diretamente na thread nativa, o que as torna ideais para animações fluidas.
-   **Ponto de Origem:** Por padrão, as transformações são aplicadas a partir do centro do componente. Você pode ajustar o ponto de origem da transformação usando a propriedade `transformOrigin` (disponível em algumas versões do React Native ou através de bibliotecas de animação).
-   **Animações:** As transformações são frequentemente usadas em conjunto com a API `Animated` para criar animações dinâmicas e interativas.


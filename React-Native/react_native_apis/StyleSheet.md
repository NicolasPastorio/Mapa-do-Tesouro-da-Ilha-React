# StyleSheet

A API `StyleSheet` no React Native fornece uma maneira otimizada e eficiente de criar e gerenciar estilos para seus componentes. Ela é inspirada nas folhas de estilo CSS da web, mas com algumas diferenças importantes, sendo a principal que os estilos são definidos em JavaScript e não em arquivos separados.

## Principais Características

- **Otimização de Performance:** Ao usar `StyleSheet.create()`, o React Native pode otimizar o carregamento e a aplicação dos estilos, pois eles são processados e serializados uma única vez, em vez de serem recriados a cada renderização.
- **Validação de Estilos:** O `StyleSheet` ajuda a validar as propriedades de estilo, alertando sobre propriedades inválidas ou valores incorretos, o que pode ajudar a evitar erros comuns.
- **Legibilidade e Manutenção:** Centralizar os estilos em um objeto `StyleSheet` pode melhorar a legibilidade e a manutenção do código, especialmente em componentes maiores.

## Métodos

### `create(styles)`
Cria um objeto de estilo otimizado a partir de um objeto JavaScript simples. É o método mais comum e recomendado para definir estilos no React Native.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MyStyledComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, React Native!</Text>
      <Text style={styles.subtitle}>Estilos com StyleSheet</Text>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666666',
  },
});

export default MyStyledComponent;
```

### `flatten(style)`
Achata um objeto de estilo ou um array de objetos de estilo em um único objeto. Isso é útil quando você tem estilos que são combinados de várias fontes (por exemplo, estilos padrão e estilos sobrescritos por props) e precisa inspecionar o estilo final ou passá-lo para uma API nativa que espera um único objeto de estilo.

```javascript
import { StyleSheet } from 'react-native';

const baseStyles = StyleSheet.create({
  commonText: {
    fontSize: 16,
    color: 'black',
  },
});

const specificStyles = {
  color: 'blue',
  fontWeight: 'bold',
};

const combinedStyles = [baseStyles.commonText, specificStyles];

const flattenedStyle = StyleSheet.flatten(combinedStyles);

console.log(flattenedStyle); // { fontSize: 16, color: 'blue', fontWeight: 'bold' }
```

### `absoluteFill`
Um atalho para um estilo que posiciona um componente para preencher completamente seu pai, usando `position: 'absolute'`, `left: 0`, `right: 0`, `top: 0`, `bottom: 0`.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AbsoluteFillExample = () => {
  return (
    <View style={styles.parentContainer}>
      <View style={StyleSheet.absoluteFill}>
        <Text style={styles.overlayText}>Conteúdo sobreposto</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -50 }, { translateY: -50 }],
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
});

export default AbsoluteFillExample;
```

### `absoluteFillObject`
Um objeto de estilo que pode ser usado para aplicar `position: 'absolute'`, `left: 0`, `right: 0`, `top: 0`, `bottom: 0`.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AbsoluteFillObjectExample = () => {
  return (
    <View style={styles.parentContainer}>
      <View style={[styles.customOverlay, StyleSheet.absoluteFillObject]}>
        <Text style={styles.overlayText}>Conteúdo sobreposto com objeto</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customOverlay: {
    backgroundColor: 'rgba(255,0,0,0.5)',
    // StyleSheet.absoluteFillObject já fornece left, right, top, bottom, position: 'absolute'
  },
  overlayText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default AbsoluteFillObjectExample;
```

## Considerações

- **Sintaxe:** A sintaxe dos estilos no React Native é baseada em JavaScript, usando camelCase para propriedades como `backgroundColor` em vez de `background-color`.
- **Unidades:** A maioria das propriedades de tamanho e espaçamento (como `width`, `height`, `margin`, `padding`) usa pixels independentes de densidade (dp) por padrão, então você não precisa especificar `px`.
- **Flexbox:** O React Native usa Flexbox para layout, o que é fundamental para criar interfaces responsivas.
- **Herança:** Ao contrário do CSS da web, os estilos no React Native não são herdados automaticamente pelos componentes filhos. Você precisa aplicar estilos explicitamente a cada componente.
- **Combinação de Estilos:** Você pode combinar múltiplos objetos de estilo passando-os como um array para a propriedade `style`. Os estilos posteriores no array sobrescreverão os anteriores em caso de conflito de propriedades.


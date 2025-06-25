# Animated.ValueXY

`Animated.ValueXY` é uma classe especializada na API `Animated` do React Native, projetada para gerenciar e animar valores 2D, como posições (X e Y) de um componente. É particularmente útil para interações baseadas em gestos, como arrastar e soltar, onde você precisa controlar as coordenadas horizontal e vertical simultaneamente.

## Construtor

### `new Animated.ValueXY(initialValue)`
Cria uma nova instância de `Animated.ValueXY`. O `initialValue` é um objeto com as propriedades `x` e `y`, que podem ser números ou outras instâncias de `Animated.Value`.

```javascript
import { Animated } from 'react-native';

const position = new Animated.ValueXY({ x: 0, y: 0 }); // Inicializa a posição em (0,0)
const pan = new Animated.ValueXY(); // Inicializa em (0,0) por padrão
```

## Propriedades

Uma instância de `Animated.ValueXY` possui duas propriedades `Animated.Value` internas:

-   `x`: Um `Animated.Value` que representa a coordenada X.
-   `y`: Um `Animated.Value` que representa a coordenada Y.

Você pode acessar e manipular `x` e `y` individualmente, se necessário.

```javascript
import { Animated } from 'react-native';

const position = new Animated.ValueXY({ x: 10, y: 20 });

console.log(position.x._value); // 10
console.log(position.y._value); // 20

position.x.setValue(50); // Altera apenas a coordenada X
```

## Métodos

### `setValue({ x: number, y: number })`
Define os valores X e Y do `Animated.ValueXY` imediatamente. Não anima os valores.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const SetValueXYExample = () => {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const resetPosition = () => {
    animatedPosition.setValue({ x: 0, y: 0 }); // Define a posição para (0,0) instantaneamente
  };

  const animateTo = () => {
    Animated.timing(animatedPosition, {
      toValue: { x: 100, y: 50 },
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: animatedPosition.getTranslateTransform() },
        ]}
      />
      <Button title="Resetar Posição" onPress={resetPosition} />
      <Button title="Animar para (100, 50)" onPress={animateTo} />
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
    backgroundColor: 'blue',
    marginBottom: 20,
  },
});

export default SetValueXYExample;
```

### `setOffset({ x: number, y: number })`
Define um valor de deslocamento para as coordenadas X e Y. O valor efetivo do `Animated.ValueXY` será `(value.x + offset.x, value.y + offset.y)`.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const SetOffsetXYExample = () => {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const applyOffset = () => {
    animatedPosition.setOffset({ x: 50, y: 50 }); // Adiciona um deslocamento de (50,50)
    animatedPosition.setValue({ x: 0, y: 0 }); // O valor efetivo será (50,50)
  };

  const clearOffset = () => {
    animatedPosition.setOffset({ x: 0, y: 0 }); // Limpa o deslocamento
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: animatedPosition.getTranslateTransform() },
        ]}
      />
      <Button title="Aplicar Offset" onPress={applyOffset} />
      <Button title="Limpar Offset" onPress={clearOffset} />
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
    backgroundColor: 'green',
    marginBottom: 20,
  },
});

export default SetOffsetXYExample;
```

### `flattenOffset()`
Combina os valores atuais e os deslocamentos em um único valor, e então redefine os deslocamentos para (0,0). Isso é comumente usado após uma interação de arrastar, para que a posição final do arrasto se torne o novo ponto de partida para futuras manipulações.

```javascript
import React, { useRef } from 'react';
import { View, Animated, StyleSheet, PanResponder } from 'react-native';

const FlattenOffsetXYExample = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // Captura o valor atual e o define como offset para que o movimento seja relativo
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 }); // Reseta o valor para 0 para que o movimento comece do ponto de toque
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // useNativeDriver: true não suporta Animated.ValueXY diretamente para movimento
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); // O valor atual (offset + valor) se torna o novo valor base
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: pan.getTranslateTransform() },
        ]}
        {...panResponder.panHandlers}
      />
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
    borderRadius: 50,
  },
});

export default FlattenOffsetXYExample;
```

### `getLayout()`
Retorna um objeto de estilo que pode ser usado para aplicar as coordenadas X e Y como transformações de layout (`left`, `top`).

```javascript
import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const GetLayoutXYExample = () => {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  React.useEffect(() => {
    Animated.timing(animatedPosition, {
      toValue: { x: 100, y: 100 },
      duration: 2000,
      useNativeDriver: false, // getLayout não funciona com useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          animatedPosition.getLayout(), // Aplica o valor como { left: animatedPosition.x, top: animatedPosition.y }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: 'flex-start',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    position: 'absolute',
  },
});

export default GetLayoutXYExample;
```

### `getTranslateTransform()`
Retorna um array de objetos de transformação que podem ser usados diretamente na propriedade `transform` de um componente. Isso é a maneira recomendada de aplicar `Animated.ValueXY` para movimento quando `useNativeDriver: true` é desejado, pois `transform` é uma propriedade que pode ser animada nativamente.

```javascript
import React, { useRef } from 'react';
import { View, Animated, StyleSheet, Button } from 'react-native';

const GetTranslateTransformExample = () => {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const animateTo = () => {
    Animated.timing(animatedPosition, {
      toValue: { x: 150, y: 75 },
      duration: 1500,
      useNativeDriver: true, // Recomendado para performance
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: animatedPosition.getTranslateTransform() }, // Usa a transformação de translação
        ]}
      />
      <Button title="Mover Box" onPress={animateTo} />
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
    backgroundColor: 'red',
    marginBottom: 20,
  },
});

export default GetTranslateTransformExample;
```

### `addListener(callback)` e `removeListener(id)`
Funcionam de forma semelhante a `Animated.Value`, permitindo que você ouça as mudanças nas coordenadas X e Y. O `callback` recebe um objeto `{ x: number, y: number }`.

```javascript
import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet, Button } from 'react-native';

const AddListenerXYExample = () => {
  const animatedPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  useEffect(() => {
    const listenerId = animatedPosition.addListener(({ x, y }) => {
      setCurrentX(parseFloat(x.toFixed(2)));
      setCurrentY(parseFloat(y.toFixed(2)));
    });

    return () => {
      animatedPosition.removeListener(listenerId);
    };
  }, [animatedPosition]);

  const startAnimation = () => {
    Animated.timing(animatedPosition, {
      toValue: { x: 100, y: 50 },
      duration: 2000,
      useNativeDriver: false, // Listeners não funcionam com useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Posição X: {currentX}</Text>
      <Text style={styles.text}>Posição Y: {currentY}</Text>
      <Animated.View
        style={[
          styles.box,
          { transform: animatedPosition.getTranslateTransform() },
        ]}
      />
      <Button title="Iniciar Animação" onPress={startAnimation} />
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
    width: 50,
    height: 50,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 5,
  },
});

export default AddListenerXYExample;
```

## Considerações

-   **Interações com Gestos:** `Animated.ValueXY` é a escolha ideal para gerenciar o estado de arrastar e soltar, permitindo que você conecte diretamente os valores de movimento do `PanResponder` aos seus valores animados.
-   **`useNativeDriver`:** Para animações de movimento com `Animated.ValueXY`, sempre prefira usar `getTranslateTransform()` na propriedade `transform` do estilo e defina `useNativeDriver: true` para obter o melhor desempenho. Evite usar `getLayout()` com `useNativeDriver: true`, pois não é suportado para propriedades de layout como `left` e `top`.
-   **Combinação com `PanResponder`:** A combinação de `Animated.ValueXY` com `PanResponder` é uma das ferramentas mais poderosas para criar interações de arrastar e soltar fluidas e responsivas no React Native.


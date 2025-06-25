# Animated.Value

`Animated.Value` é a classe fundamental na API `Animated` do React Native para criar e gerenciar valores que podem ser animados ao longo do tempo. Ele representa um único valor numérico que pode ser interpolado, mapeado e usado para controlar propriedades de estilo ou outras variáveis em seus componentes.

## Construtor

### `new Animated.Value(initialValue)`
Cria uma nova instância de `Animated.Value` com um `initialValue` numérico.

```javascript
import { Animated } from 'react-native';

const opacity = new Animated.Value(0); // Inicializa a opacidade em 0
const positionX = new Animated.Value(100); // Inicializa a posição X em 100
```

## Métodos

### `setValue(value)`
Define o valor do `Animated.Value` imediatamente. Isso não anima o valor, apenas o define para um novo estado. Útil para redefinir uma animação ou para definir um estado inicial.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const SetValueExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const resetValue = () => {
    animatedValue.setValue(0); // Define o valor para 0 instantaneamente
  };

  const animateTo1 = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { opacity: animatedValue }, // Controla a opacidade
        ]}
      />
      <Button title="Resetar Opacidade" onPress={resetValue} />
      <Button title="Animar para 1" onPress={animateTo1} />
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

export default SetValueExample;
```

### `setOffset(offset)`
Define um valor de deslocamento para o `Animated.Value`. O valor final do `Animated.Value` será `value + offset`. Isso é útil para arrastar e soltar interações, onde você pode querer que o objeto "salte" para uma nova posição.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const SetOffsetExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const applyOffset = () => {
    animatedValue.setOffset(50); // Adiciona um deslocamento de 50
    animatedValue.setValue(0); // O valor efetivo será 0 + 50 = 50
  };

  const clearOffset = () => {
    animatedValue.setOffset(0); // Limpa o deslocamento
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: [{ translateX: animatedValue }] },
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

export default SetOffsetExample;
```

### `flattenOffset()`
Combina o valor atual e o deslocamento (`offset`) em um único valor, e então redefine o deslocamento para 0. Isso é útil após uma interação de arrastar, onde você quer que a nova posição se torne o ponto de partida para futuras animações.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet, PanResponder } from 'react-native';

const FlattenOffsetExample = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value, y: pan.y._value });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // useNativeDriver: true não suporta Animated.ValueXY diretamente para movimento
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset(); // O valor atual se torna o novo ponto de partida
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

export default FlattenOffsetExample;
```

### `addListener(callback)`
Adiciona um ouvinte para receber atualizações do valor animado. O `callback` é chamado com um objeto `{ value: number }` sempre que o valor animado muda. Retorna um ID de ouvinte que pode ser usado com `removeListener`.

```javascript
import React, { useRef, useEffect } from 'react';
import { View, Text, Animated, StyleSheet, Button } from 'react-native';

const AddListenerExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const listenerId = animatedValue.addListener(({ value }) => {
      setCurrentValue(parseFloat(value.toFixed(2)));
    });

    return () => {
      animatedValue.removeListener(listenerId);
    };
  }, [animatedValue]);

  const startAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false, // Listeners não funcionam com useNativeDriver: true
    }).start();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Valor Animado: {currentValue}</Text>
      <Animated.View
        style={[
          styles.box,
          { transform: [{ translateX: animatedValue }] },
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
    backgroundColor: 'red',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default AddListenerExample;
```

### `removeListener(id)`
Remove um ouvinte previamente adicionado usando seu `id`.

```javascript
// Exemplo acima já demonstra o uso de removeListener no useEffect cleanup.
```

### `removeAllListeners()`
Remove todos os ouvintes de um `Animated.Value`.

```javascript
import { Animated } from 'react-native';

const animatedValue = new Animated.Value(0);
animatedValue.addListener(() => console.log("Listener 1"));
animatedValue.addListener(() => console.log("Listener 2"));

animatedValue.removeAllListeners();
console.log("Todos os listeners removidos.");
```

### `stopAnimation(callback)`
Pára qualquer animação em andamento no `Animated.Value`. O `callback` opcional é chamado com o valor final da animação quando ela é parada.

```javascript
import React, { useRef } from 'react';
import { View, Button, Animated, StyleSheet } from 'react-native';

const StopAnimationExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  let animationRef = useRef(null);

  const startAnimation = () => {
    animationRef.current = Animated.timing(animatedValue, {
      toValue: 100,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      animatedValue.stopAnimation((value) => {
        console.log("Animação parada no valor:", value);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: [{ translateX: animatedValue }] },
        ]}
      />
      <Button title="Iniciar Animação" onPress={startAnimation} />
      <Button title="Parar Animação" onPress={stopAnimation} />
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
    backgroundColor: 'orange',
    marginBottom: 20,
  },
});

export default StopAnimationExample;
```

### `getLayout()`
Retorna um objeto de estilo que pode ser usado para aplicar o valor do `Animated.Value` como uma transformação de layout (por exemplo, `left`, `top`).

```javascript
import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const GetLayoutExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  // Animação simples para mover o quadrado
  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 100,
      duration: 2000,
      useNativeDriver: false, // getLayout não funciona com useNativeDriver: true
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          animatedValue.getLayout(), // Aplica o valor como { left: animatedValue }
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
    backgroundColor: 'purple',
    position: 'absolute',
  },
});

export default GetLayoutExample;
```

### `interpolate(config)`
Mapeia o valor de entrada para um valor de saída dentro de um intervalo especificado. Essencial para criar animações complexas onde um valor animado controla múltiplas propriedades ou propriedades com diferentes intervalos.

```javascript
// Veja o exemplo detalhado na documentação da API Animated.
```

## Considerações

-   **Central para Animações:** `Animated.Value` é o bloco de construção fundamental para todas as animações baseadas em valor na API `Animated`.
-   **`useNativeDriver`:** Lembre-se das limitações de `useNativeDriver` ao usar `addListener` ou `getLayout`. Para animações que não afetam o layout (opacidade, transformações), `useNativeDriver: true` é altamente recomendado para melhor performance.
-   **Estado vs. Animação:** Não confunda `Animated.Value` com o estado regular do React (`useState`). `Animated.Value` é otimizado para mudanças rápidas e contínuas que ocorrem durante uma animação, enquanto o estado regular é para dados que acionam renderizações de componentes.
-   **Gerenciamento de Referências:** Ao usar `Animated.Value` dentro de componentes funcionais, é comum usar `useRef` para garantir que a instância do `Animated.Value` persista entre as renderizações e não seja recriada.


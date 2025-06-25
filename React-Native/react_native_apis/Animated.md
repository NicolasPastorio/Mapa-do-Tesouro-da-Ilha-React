# Animated

A API `Animated` no React Native é um sistema poderoso e flexível para criar animações fluidas e de alto desempenho. Diferente de outras abordagens de animação que podem depender do JavaScript thread para cada atualização de frame, `Animated` permite que as animações sejam executadas de forma nativa na UI thread, resultando em uma experiência de usuário mais suave e responsiva, mesmo sob carga pesada do JavaScript thread.

## Conceitos Fundamentais

### Valores Animados (`Animated.Value`, `Animated.ValueXY`)

O coração da API `Animated` são os valores animados. Estes são objetos especiais que podem ser interpolados ao longo do tempo. Em vez de definir diretamente propriedades de estilo como `opacity` ou `transform` com valores estáticos, você as vincula a um `Animated.Value`.

-   **`Animated.Value`**: Usado para animar um único valor numérico (por exemplo, opacidade, tamanho, rotação).
-   **`Animated.ValueXY`**: Usado para animar dois valores numéricos simultaneamente, tipicamente para posições 2D (por exemplo, `translateX`, `translateY`).

### Componentes Animados

Para que um componente possa ser animado, ele precisa ser um "componente animado". Você pode criar um componente animado usando `Animated.createAnimatedComponent()` ou usando os componentes pré-definidos `Animated.View`, `Animated.Text`, `Animated.Image`, `Animated.ScrollView`.

```javascript
import { Animated, View, Text } from 'react-native';

// Exemplo de componente animado
const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedText = Animated.createAnimatedComponent(Text);
```

### Animações

As animações são criadas encadeando métodos em um `Animated.Value`. Os tipos mais comuns de animações são:

-   **`Animated.timing()`**: Anima um valor ao longo do tempo usando uma função de easing. É o tipo mais comum para animações baseadas em tempo.
-   **`Animated.spring()`**: Anima um valor usando um modelo de mola, proporcionando um movimento mais natural e elástico.
-   **`Animated.decay()`**: Anima um valor desacelerando-o gradualmente até parar, útil para simular física como atrito.

### Composição de Animações

A API `Animated` permite combinar e sequenciar animações de várias maneiras:

-   **`Animated.sequence()`**: Executa animações em ordem, uma após a outra.
-   **`Animated.parallel()`**: Executa animações simultaneamente.
-   **`Animated.stagger()`**: Executa animações em paralelo, mas com um atraso escalonado entre elas.
-   **`Animated.delay()`**: Adiciona um atraso antes de iniciar a próxima animação em uma sequência.

## Métodos e Propriedades Principais

### `Animated.Value(initialValue)`
Cria um novo valor animado com um `initialValue`.

```javascript
import { Animated } from 'react-native';

const opacity = new Animated.Value(0);
const position = new Animated.Value(0);
```

### `Animated.ValueXY(initialX, initialY)`
Cria um novo valor animado para coordenadas 2D.

```javascript
import { Animated } from 'react-native';

const pan = new Animated.ValueXY({ x: 0, y: 0 });
```

### `Animated.timing(value, config)`
Anima um `Animated.Value` para um valor final ao longo de um `duration` usando uma função de `easing`.

-   `value`: O `Animated.Value` a ser animado.
-   `config`: Um objeto de configuração com:
    -   `toValue`: O valor final da animação.
    -   `duration`: Duração da animação em milissegundos (padrão: 500).
    -   `easing`: Uma função de easing (padrão: `Easing.inOut(Easing.ease)`).
    -   `delay`: Atraso antes de iniciar a animação em milissegundos (padrão: 0).
    -   `useNativeDriver`: Booleano para indicar se a animação deve ser executada na UI thread (padrão: `false`). **Altamente recomendado para performance.**

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const FadeInView = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: fadeAnim, // Bind opacity to animated value
        }}>
        <Text style={styles.text}>Olá, Mundo Animado!</Text>
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button title="Fade In" onPress={fadeIn} />
        <Button title="Fade Out" onPress={fadeOut} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '80%',
    justifyContent: 'space-around',
  },
});

export default FadeInView;
```

### `Animated.spring(value, config)`
Anima um `Animated.Value` para um valor final usando um modelo de mola.

-   `value`: O `Animated.Value` a ser animado.
-   `config`: Um objeto de configuração com:
    -   `toValue`: O valor final da animação.
    -   `friction`: Fricção da mola (padrão: 7).
    -   `tension`: Tensão da mola (padrão: 40).
    -   `speed`: Velocidade da animação (padrão: 12).
    -   `bounciness`: Quão elástica a mola é (padrão: 8).
    -   `useNativeDriver`: Booleano para indicar se a animação deve ser executada na UI thread (padrão: `false`).

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const SpringAnimation = () => {
  const springValue = useRef(new Animated.Value(0.3)).current;

  const spring = () => {
    Animated.spring(springValue, {
      toValue: 1,
      friction: 1,
      tension: 100,
      useNativeDriver: true,
    }).start(() => {
      // Resetar para o estado inicial após a animação
      springValue.setValue(0.3);
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'tomato',
          transform: [{ scale: springValue }],
        }}
      />
      <Button title="Spring!" onPress={spring} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SpringAnimation;
```

### `Animated.decay(value, config)`
Anima um `Animated.Value` desacelerando-o gradualmente até parar.

-   `value`: O `Animated.Value` a ser animado.
-   `config`: Um objeto de configuração com:
    -   `velocity`: A velocidade inicial da animação.
    -   `deceleration`: A taxa de desaceleração (padrão: 0.997).
    -   `useNativeDriver`: Booleano para indicar se a animação deve ser executada na UI thread (padrão: `false`).

```javascript
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder } from 'react-native';

const DecayAnimation = () => {
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false } // useNativeDriver: true não suporta Animated.ValueXY diretamente para movimento
      ),
      onPanResponderRelease: (e, gesture) => {
        Animated.decay(pan, { // decay config
          velocity: { x: gesture.vx, y: gesture.vy },
          deceleration: 0.997,
          useNativeDriver: false,
        }).start();
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

export default DecayAnimation;
```

### `Animated.sequence(animations)`
Executa um array de animações em ordem, uma após a outra.

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const SequenceAnimation = () => {
  const animValue = useRef(new Animated.Value(0)).current;

  const startSequence = () => {
    animValue.setValue(0); // Resetar valor
    Animated.sequence([
      Animated.timing(animValue, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.delay(500), // Pausa de 0.5 segundo
      Animated.timing(animValue, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'blue',
          opacity: animValue,
        }}
      />
      <Button title="Iniciar Sequência" onPress={startSequence} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SequenceAnimation;
```

### `Animated.parallel(animations, config)`
Executa um array de animações simultaneamente.

-   `animations`: Um array de animações.
-   `config`: Um objeto de configuração opcional com:
    -   `stopTogether`: Se `true`, todas as animações param se uma delas parar (padrão: `true`).

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const ParallelAnimation = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  const startParallel = () => {
    opacityAnim.setValue(0);
    scaleAnim.setValue(0.5);
    Animated.parallel([
      Animated.timing(opacityAnim, { toValue: 1, duration: 2000, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'green',
          opacity: opacityAnim,
          transform: [{ scale: scaleAnim }],
        }}
      />
      <Button title="Iniciar Paralelo" onPress={startParallel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ParallelAnimation;
```

### `Animated.stagger(delay, animations)`
Executa um array de animações em paralelo, mas com um atraso escalonado entre o início de cada uma.

-   `delay`: O atraso em milissegundos entre o início de cada animação.
-   `animations`: Um array de animações.

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const StaggerAnimation = () => {
  const animValues = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  const startStagger = () => {
    animValues.forEach(value => value.setValue(0)); // Resetar valores
    Animated.stagger(100, [
      Animated.timing(animValues[0], { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(animValues[1], { toValue: 1, duration: 500, useNativeDriver: true }),
      Animated.timing(animValues[2], { toValue: 1, duration: 500, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.box, { opacity: animValues[0] }]} />
      <Animated.View style={[styles.box, { opacity: animValues[1] }]} />
      <Animated.View style={[styles.box, { opacity: animValues[2] }]} />
      <Button title="Iniciar Stagger" onPress={startStagger} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  box: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    margin: 10,
  },
});

export default StaggerAnimation;
```

### `Animated.delay(time)`
Cria um atraso em milissegundos. Usado principalmente dentro de `Animated.sequence`.

```javascript
// Exemplo já mostrado em Animated.sequence
```

### `Animated.loop(animation, config)`
Cria uma animação que se repete indefinidamente ou um número especificado de vezes.

-   `animation`: A animação a ser repetida.
-   `config`: Um objeto de configuração opcional com:
    -   `iterations`: O número de vezes que a animação deve se repetir. `Infinity` para repetir indefinidamente (padrão: `1`).
    -   `reset`: Se `true`, o valor animado é resetado para seu valor inicial antes de cada iteração (padrão: `true`).

```javascript
import React, { useRef, useEffect } from 'react';
import { Animated, Text, View, StyleSheet } from 'react-native';

const LoopAnimation = () => {
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      { iterations: Infinity }
    ).start();
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          width: 100,
          height: 100,
          backgroundColor: 'red',
          transform: [{ rotate: spin }],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoopAnimation;
```

## Interpolação (`interpolate()`) e Mapeamento

O método `interpolate()` de um `Animated.Value` permite mapear um intervalo de entrada para um intervalo de saída. Isso é incrivelmente poderoso para criar efeitos visuais complexos, onde uma única animação pode controlar múltiplas propriedades de estilo.

```javascript
animatedValue.interpolate({
  inputRange: [0, 1],
  outputRange: [0, 100],
  extrapolate: 'clamp', // 'extend', 'clamp', 'identity'
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

-   `inputRange`: Um array de números que define os pontos de entrada do valor animado.
-   `outputRange`: Um array de números ou strings que define os valores de saída correspondentes.
-   `extrapolate`: Define como os valores devem se comportar fora do `inputRange`. `clamp` (padrão) limita os valores ao `outputRange`.

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button } from 'react-native';

const InterpolationExample = () => {
  const animation = useRef(new Animated.Value(0)).current;

  const startAnimation = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const boxOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 1, 0],
  });

  const boxTranslateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -100],
  });

  const boxColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255,0,0)', 'rgb(0,255,0)'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { opacity: boxOpacity },
          { transform: [{ translateY: boxTranslateY }] },
          { backgroundColor: boxColor },
        ]}
      />
      <Button title="Animate!" onPress={startAnimation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
    marginBottom: 20,
  },
});

export default InterpolationExample;
```

## `useNativeDriver`

O `useNativeDriver: true` é uma otimização crucial para a performance das animações. Quando ativado, o React Native envia a descrição da animação para a UI thread nativa antes de iniciar a animação. Isso significa que o JavaScript thread não precisa estar ativo para cada frame da animação, permitindo que as animações continuem fluidas mesmo se o JavaScript thread estiver ocupado.

**Limitações:**

-   Nem todas as propriedades podem ser animadas com o `useNativeDriver`. Geralmente, propriedades que não afetam o layout (como `opacity` e `transform`) são suportadas.
-   `Animated.ValueXY` para `left`/`top` (posicionamento absoluto) não é suportado com `useNativeDriver: true` diretamente para movimento. Para animar posições com `useNativeDriver`, use `transform: [{ translateX: valueX }, { translateY: valueY }]`.

## Considerações

-   **Performance:** Sempre que possível, use `useNativeDriver: true` para garantir animações suaves.
-   **Ciclo de Vida:** Gerencie o ciclo de vida das suas animações. Chame `.stop()` em animações quando o componente for desmontado ou quando a animação não for mais necessária para evitar vazamentos de memória.
-   **`Animated.event`:** Para animações baseadas em gestos (como rolagem ou arrastar), `Animated.event` é uma ferramenta poderosa que mapeia eventos nativos diretamente para `Animated.Value`s, permitindo que as animações sejam executadas na UI thread.
-   **Bibliotecas de Terceiros:** Para animações mais complexas ou com requisitos específicos, considere usar bibliotecas de animação de terceiros como `react-native-reanimated` ou `react-native-animatable`, que oferecem recursos adicionais e otimizações.


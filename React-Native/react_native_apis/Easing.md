# Easing

A API `Easing` no React Native fornece uma coleção de funções de easing (também conhecidas como funções de atenuação ou curvas de aceleração) que controlam a taxa de mudança de uma animação ao longo do tempo. Em vez de uma animação linear (que se move a uma velocidade constante), as funções de easing permitem que as animações tenham um movimento mais natural, como acelerar no início e desacelerar no final, ou ter um efeito de "salto".

As funções de easing são usadas principalmente com `Animated.timing()` para definir como o valor animado muda de seu valor inicial para o final.

## Funções de Easing Comuns

A `Easing` oferece uma variedade de funções, que podem ser categorizadas em:

-   **Linear:** Velocidade constante.
-   **Quadratic, Cubic, Quartic, Quintic:** Aceleração ou desaceleração com diferentes potências.
-   **Sinusoidal, Circular, Exponential:** Curvas mais complexas.
-   **Elastic, Back, Bounce:** Efeitos de "salto" ou "recuo".

Cada categoria geralmente tem variantes:

-   `easeIn`: Acelera no início.
-   `easeOut`: Desacelera no final.
-   `easeInOut`: Acelera no início e desacelera no final.

### Exemplos de Uso

```javascript
import React, { useRef } from 'react';
import { Animated, Text, View, StyleSheet, Button, Easing } from 'react-native';

const EasingExample = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const animate = (easing) => {
    animatedValue.setValue(0); // Resetar o valor
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 2000,
      easing, // A função de easing é passada aqui
      useNativeDriver: true,
    }).start();
  };

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: [{ translateX }] },
        ]}
      />
      <View style={styles.buttonContainer}>
        <Button title="Linear" onPress={() => animate(Easing.linear)} />
        <Button title="Ease" onPress={() => animate(Easing.ease)} />
        <Button title="Bounce" onPress={() => animate(Easing.bounce)} />
        <Button title="Elastic" onPress={() => animate(Easing.elastic(1))} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => animate(Easing.back(1))} />
        <Button title="Cubic" onPress={() => animate(Easing.cubic)} />
        <Button title="Sin" onPress={() => animate(Easing.sin)} />
      </View>
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
    marginBottom: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default EasingExample;
```

## Funções de Easing Detalhadas

### `Easing.step0(t)`
Retorna 0 para qualquer `t`.

### `Easing.step1(t)`
Retorna 1 para qualquer `t`.

### `Easing.linear(t)`
Uma função de easing linear, onde a velocidade é constante do início ao fim.

### `Easing.ease(t)`
Um atalho para `Easing.inOut(Easing.quad)`. Acelera no início e desacelera no final.

### `Easing.quad(t)`
Uma função de easing quadrática. `Easing.in(Easing.quad)` acelera, `Easing.out(Easing.quad)` desacelera.

### `Easing.cubic(t)`
Uma função de easing cúbica.

### `Easing.poly(n)`
Retorna uma função de easing polinomial de grau `n`. Por exemplo, `Easing.poly(4)` é equivalente a `Easing.quart`.

### `Easing.sin(t)`
Uma função de easing sinusoidal.

### `Easing.circle(t)`
Uma função de easing circular.

### `Easing.exp(t)`
Uma função de easing exponencial.

### `Easing.elastic(bounciness)`
Retorna uma função de easing elástica, que simula um efeito de mola. `bounciness` controla a intensidade do "salto" (padrão: 1).

### `Easing.back(s)`
Retorna uma função de easing que "recua" um pouco antes de avançar. `s` controla a intensidade do recuo (padrão: 1.70158).

### `Easing.bounce(t)`
Uma função de easing que simula um efeito de "quique" ou "salto" no final da animação.

### `Easing.bezier(x1, y1, x2, y2)`
Cria uma função de easing personalizada usando uma curva de Bézier cúbica. Os parâmetros são os pontos de controle da curva.

```javascript
// Exemplo de Easing.bezier
const customEasing = Easing.bezier(0.42, 0, 0.58, 1); // Equivalente a ease-in-out
// Animated.timing(value, { easing: customEasing, ... }).start();
```

### `Easing.in(easing)`
Retorna uma versão "ease-in" da função de easing fornecida. Acelera no início.

### `Easing.out(easing)`
Retorna uma versão "ease-out" da função de easing fornecida. Desacelera no final.

### `Easing.inOut(easing)`
Retorna uma versão "ease-in-out" da função de easing fornecida. Acelera no início e desacelera no final.

## Considerações

-   **Naturalidade:** Usar funções de easing apropriadas torna suas animações mais naturais e agradáveis aos olhos do usuário.
-   **Experimentação:** A melhor maneira de entender as diferentes funções de easing é experimentá-las e ver como elas afetam o movimento dos seus componentes.
-   **`Animated.timing`:** As funções de easing são usadas exclusivamente com `Animated.timing()`. `Animated.spring()` e `Animated.decay()` têm seus próprios parâmetros para controlar o movimento.
-   **Performance:** As funções de easing são calculadas na thread nativa quando `useNativeDriver: true` é usado, garantindo animações suaves.


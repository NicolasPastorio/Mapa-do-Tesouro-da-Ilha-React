# PanResponder

A API `PanResponder` no React Native é um sistema de reconhecimento de gestos que permite que você crie interações complexas de toque, como arrastar e soltar, redimensionar, deslizar e muito mais. Ele unifica o tratamento de eventos de toque em uma única API, facilitando a criação de componentes interativos que respondem a gestos do usuário.

## Como Funciona

`PanResponder` funciona como um sistema de "negociação" de gestos. Quando um toque ocorre, o `PanResponder` decide qual componente deve "responder" a esse gesto. Uma vez que um componente se torna o "responder", ele recebe todos os eventos de toque subsequentes relacionados a esse gesto até que o gesto termine.

Ele expõe um conjunto de funções de callback que são chamadas em diferentes estágios de um gesto de toque:

-   **`onStartShouldSetPanResponder`**: Deve o componente se tornar o responder a um toque inicial?
-   **`onMoveShouldSetPanResponder`**: Deve o componente se tornar o responder a um movimento de toque?
-   **`onPanResponderGrant`**: O componente se tornou o responder. Início do gesto.
-   **`onPanResponderMove`**: O usuário está movendo o dedo na tela.
-   **`onPanResponderRelease`**: O usuário levantou o dedo da tela. Fim do gesto.
-   **`onPanResponderTerminate`**: O gesto foi terminado por outra coisa (por exemplo, uma chamada telefônica).

## Propriedades do Objeto `gestureState`

Nos callbacks `onPanResponderMove`, `onPanResponderRelease` e `onPanResponderTerminate`, o segundo argumento é um objeto `gestureState` que contém informações sobre o gesto:

-   `stateID`: ID do toque que iniciou o gesto.
-   `moveX`, `moveY`: A posição atual do toque na tela.
-   `x0`, `y0`: A posição inicial do toque na tela.
-   `dx`, `dy`: O deslocamento acumulado do toque desde o início do gesto.
-   `vx`, `vy`: A velocidade atual do toque.
-   `numberActiveTouches`: O número de toques ativos no momento.

## Exemplo de Uso: Arrastar e Soltar

Este exemplo demonstra como usar `PanResponder` para criar um quadrado que pode ser arrastado pela tela.

```javascript
import React, { useRef } from 'react';
import { Animated, View, StyleSheet, PanResponder, Text } from 'react-native';

const DraggableBox = () => {
  // Animated.ValueXY para armazenar a posição do box
  const pan = useRef(new Animated.ValueXY()).current;

  // Cria o PanResponder
  const panResponder = useRef(
    PanResponder.create({
      // Devemos nos tornar o responder a um toque inicial?
      onStartShouldSetPanResponder: () => true,
      // Devemos nos tornar o responder a um movimento de toque?
      onMoveShouldSetPanResponder: () => true,

      // O componente se tornou o responder ao gesto
      onPanResponderGrant: () => {
        // Define o offset para a posição atual do box, para que o arrasto seja relativo
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        // Reseta o valor para 0, para que o movimento comece do ponto de toque
        pan.setValue({ x: 0, y: 0 });
      },

      // O usuário está movendo o dedo na tela
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }], // Mapeia dx e dy do gesto para pan.x e pan.y
        { useNativeDriver: false } // useNativeDriver: true não suporta Animated.ValueXY diretamente para movimento
      ),

      // O usuário levantou o dedo da tela
      onPanResponderRelease: () => {
        // Combina o valor atual e o offset em um único valor, e redefine o offset para 0
        pan.flattenOffset();
      },

      // O gesto foi terminado por outra coisa (ex: chamada telefônica)
      onPanResponderTerminate: () => {
        // Opcional: reverter ou lidar com o término inesperado
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.box,
          { transform: pan.getTranslateTransform() }, // Aplica a transformação de translação
        ]}
        {...panResponder.panHandlers} // Anexa os manipuladores de eventos do PanResponder
      >
        <Text style={styles.text}>Arrastar-me!</Text>
      </Animated.View>
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
    backgroundColor: 'dodgerblue',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DraggableBox;
```

## Considerações

-   **Combinação com `Animated`:** `PanResponder` é frequentemente usado em conjunto com a API `Animated` (especialmente `Animated.ValueXY`) para criar animações fluidas e baseadas em gestos. Ao mapear `dx` e `dy` diretamente para `Animated.ValueXY` usando `Animated.event`, você permite que o sistema de animação nativo lide com o movimento, resultando em melhor desempenho.
-   **`useNativeDriver`:** Ao usar `Animated.event` com `PanResponder`, a propriedade `useNativeDriver` deve ser `false` se você estiver animando propriedades de layout como `left` ou `top` diretamente. No entanto, se você estiver usando `transform` (como `translateX`, `translateY`), você pode (e deve) usar `useNativeDriver: true` para obter melhor desempenho, pois as transformações são otimizadas para serem executadas na UI thread.
-   **Conflitos de Gestos:** Em aplicativos complexos, você pode encontrar conflitos entre diferentes `PanResponder`s ou entre um `PanResponder` e um `ScrollView`. O `PanResponder` tem um sistema de prioridade e negociação para resolver esses conflitos. As funções `onStartShouldSetPanResponderCapture` e `onMoveShouldSetPanResponderCapture` podem ser usadas para "capturar" o gesto antes que os componentes filhos tenham a chance de responder.
-   **`setOffset` e `flattenOffset`:** Essas funções são cruciais para gerenciar a posição de um objeto arrastável. `setOffset` permite que você defina um ponto de referência para o arrasto, e `flattenOffset` "salva" a posição atual como o novo ponto de partida, garantindo que o objeto não "salte" de volta para sua posição inicial após o término do arrasto.


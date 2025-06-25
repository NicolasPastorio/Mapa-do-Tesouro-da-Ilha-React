# LayoutAnimation

A API `LayoutAnimation` no React Native fornece uma maneira simples e poderosa de animar automaticamente as mudanças de layout de seus componentes. Em vez de animar propriedades individuais (como `width`, `height`, `top`, `left`) usando a API `Animated`, `LayoutAnimation` permite que você declare uma mudança de layout e o sistema se encarregue de animar a transição de forma suave.

É uma API de uso único, o que significa que você a configura antes de fazer uma mudança de layout, e essa configuração se aplica à próxima mudança de layout que ocorrer. É ideal para animações de layout mais simples, como a adição/remoção de itens, expansão/contração de views, ou mudanças de tamanho e posição.

## Como Funciona

1.  **Configurar a Animação:** Chame `LayoutAnimation.configureNext()` ou `LayoutAnimation.easeInEaseOut()` (ou outras predefinições) para definir como a próxima mudança de layout deve ser animada.
2.  **Fazer a Mudança de Layout:** Altere o estado do seu componente de forma que o layout seja afetado (por exemplo, adicione/remova elementos, altere `width`/`height`, `flex`, `margin`, `padding`).
3.  **O React Native Anima:** O React Native detecta a mudança de layout e aplica a animação configurada.

## Métodos

### `configureNext(config, onAnimationDidEnd, onError)`
Configura a próxima animação de layout. Esta é a função mais flexível, permitindo que você defina configurações detalhadas para a animação.

-   `config`: Um objeto de configuração que define a animação. Ele pode ter as seguintes propriedades:
    -   `duration`: Duração da animação em milissegundos.
    -   `create`: Configuração para animações de criação de componentes.
    -   `update`: Configuração para animações de atualização de componentes.
    -   `delete`: Configuração para animações de exclusão de componentes.
    Cada uma dessas propriedades (`create`, `update`, `delete`) pode ter:
        -   `type`: O tipo de easing (por exemplo, `LayoutAnimation.Types.easeInEaseOut`, `LayoutAnimation.Types.linear`, `LayoutAnimation.Types.spring`).
        -   `property`: A propriedade a ser animada (por exemplo, `LayoutAnimation.Properties.opacity`, `LayoutAnimation.Properties.scaleXY`, `LayoutAnimation.Properties.scaleX`, `LayoutAnimation.Properties.scaleY`).
-   `onAnimationDidEnd`: Um callback opcional que é chamado quando a animação é concluída.
-   `onError`: Um callback opcional que é chamado se ocorrer um erro na animação.

### Predefinições de Animação

O `LayoutAnimation` também oferece algumas predefinições convenientes para uso rápido:

-   `LayoutAnimation.easeInEaseOut()`: Uma animação suave que acelera no início e desacelera no final.
-   `LayoutAnimation.linear()`: Uma animação linear (velocidade constante).
-   `LayoutAnimation.spring()`: Uma animação com efeito de mola.

Você pode chamar essas funções diretamente antes de uma mudança de layout.

## Exemplo de Uso

```javascript
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager } from 'react-native';

// Habilitar LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const LayoutAnimationExample = () => {
  const [boxHeight, setBoxHeight] = useState(100);
  const [showBox, setShowBox] = useState(true);
  const [items, setItems] = useState([1, 2, 3]);

  const toggleHeight = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setBoxHeight(boxHeight === 100 ? 200 : 100);
  };

  const toggleBoxVisibility = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowBox(!showBox);
  };

  const addItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setItems([...items, items.length + 1]);
  };

  const removeItem = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setItems(items.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleHeight} style={styles.button}>
        <Text style={styles.buttonText}>Alterar Altura</Text>
      </TouchableOpacity>
      <View style={[styles.box, { height: boxHeight }]} />

      <TouchableOpacity onPress={toggleBoxVisibility} style={styles.button}>
        <Text style={styles.buttonText}>Alternar Visibilidade</Text>
      </TouchableOpacity>
      {showBox && <View style={styles.boxVisible} />}

      <TouchableOpacity onPress={addItem} style={styles.button}>
        <Text style={styles.buttonText}>Adicionar Item</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={removeItem} style={styles.button}>
        <Text style={styles.buttonText}>Remover Item</Text>
      </TouchableOpacity>
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={item} style={styles.item}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  box: {
    width: 100,
    backgroundColor: 'skyblue',
    marginVertical: 10,
  },
  boxVisible: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    marginVertical: 10,
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  item: {
    width: 50,
    height: 50,
    backgroundColor: 'lightcoral',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LayoutAnimationExample;
```

## Considerações

-   **Habilitação no Android:** Para que `LayoutAnimation` funcione no Android, você precisa habilitá-lo experimentalmente no início do seu aplicativo (geralmente no `index.js` ou `App.js`) usando `UIManager.setLayoutAnimationEnabledExperimental(true);`. Isso não é necessário no iOS.
-   **Simplicidade vs. Controle:** `LayoutAnimation` é ótimo para animações de layout simples e declarativas. Para animações mais complexas, com interações personalizadas ou que exigem controle granular sobre cada etapa da animação, a API `Animated` é mais adequada.
-   **Performance:** `LayoutAnimation` é executado na thread nativa, o que o torna muito performático e suave, mesmo quando o JavaScript thread está ocupado.
-   **Animação de Criação/Exclusão:** Ao adicionar ou remover componentes de uma lista, `LayoutAnimation` pode animar a entrada e saída desses componentes, bem como o movimento dos componentes restantes para preencher o espaço ou se ajustar ao novo layout.
-   **Uso Único:** Lembre-se que a configuração de `LayoutAnimation` se aplica apenas à *próxima* mudança de layout. Se você quiser que todas as mudanças de layout sejam animadas, você precisará chamar `LayoutAnimation.configureNext()` (ou uma predefinição) antes de cada mudança de estado que afete o layout.


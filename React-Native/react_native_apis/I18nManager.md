# I18nManager

A API `I18nManager` no React Native fornece utilitários para lidar com layouts de direita para esquerda (RTL - Right-to-Left) em aplicativos. Isso é essencial para dar suporte a idiomas como árabe, hebraico e persa, que são lidos da direita para a esquerda, garantindo que a interface do usuário se adapte corretamente a essas direções de texto.

## Propriedades e Métodos

### `isRTL`
Uma propriedade booleana que indica se o layout atual do aplicativo é RTL. Esta propriedade é somente leitura e reflete a configuração de layout do dispositivo.

```javascript
import { I18nManager, Text, View, StyleSheet } from 'react-native';

const LayoutDirection = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        A direção do layout é: {I18nManager.isRTL ? 'RTL (Direita para Esquerda)' : 'LTR (Esquerda para Direita)'}
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

export default LayoutDirection;
```

### `allowRTL(bool)`
Permite que o aplicativo use layouts RTL. Este método deve ser chamado no início do seu aplicativo, antes de qualquer renderização de componente, geralmente no arquivo `index.js` ou `App.js`. Uma vez definido, o aplicativo precisará ser reiniciado para que a mudança tenha efeito.

```javascript
// No seu arquivo principal (ex: index.js)
import { I18nManager } from 'react-native';

// Permite layouts RTL
I18nManager.allowRTL(true);

// Para forçar LTR (útil para testes ou se você não quer RTL)
// I18nManager.allowRTL(false);
```

### `forceRTL(bool)`
Força o layout do aplicativo a ser RTL, independentemente das configurações do dispositivo. Assim como `allowRTL`, este método deve ser chamado no início do aplicativo e requer um reinício para que as mudanças sejam aplicadas. Use com cautela, pois pode ignorar as preferências do usuário.

```javascript
// No seu arquivo principal (ex: index.js)
import { I18nManager } from 'react-native';

// Força o layout para RTL
I18nManager.forceRTL(true);

// Para forçar LTR
// I18nManager.forceRTL(false);
```

### `swapLeftAndRightInRTL(bool)`
Controla se as propriedades de estilo `left` e `right` devem ser automaticamente trocadas em layouts RTL. Por padrão, o React Native tenta fazer isso automaticamente para componentes que usam `flexDirection: 'row'`. Se você tiver problemas com o layout em RTL, pode tentar desabilitar ou habilitar explicitamente essa troca.

```javascript
// No seu arquivo principal (ex: index.js)
import { I18nManager } from 'react-native';

// Desabilita a troca automática de left/right em RTL
I18nManager.swapLeftAndRightInRTL(false);

// Habilita a troca automática (padrão)
// I18nManager.swapLeftAndRightInRTL(true);
```

## Exemplo de Uso com Estilos

Ao trabalhar com RTL, é importante usar propriedades de estilo que se adaptam automaticamente, como `marginStart`, `marginEnd`, `paddingStart`, `paddingEnd`, `borderStartWidth`, `borderEndWidth`, etc., em vez de `marginLeft`, `marginRight`, `paddingLeft`, `paddingRight`.

```javascript
import React from 'react';
import { View, Text, StyleSheet, I18nManager } from 'react-native';

const RtlExample = () => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Item 1</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Item 2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', // Adapta a direção da linha
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10, // Usa marginHorizontal para ser neutro em relação à direção
    // Ou use marginStart/marginEnd para controle explícito em RTL/LTR
    // marginStart: 10,
    // marginEnd: 10,
  },
  text: {
    fontSize: 16,
  },
});

export default RtlExample;
```

## Considerações

- **Reinício do Aplicativo:** As mudanças nas configurações de `I18nManager` (como `allowRTL` e `forceRTL`) não são aplicadas imediatamente. O aplicativo precisa ser reiniciado para que as novas configurações de layout sejam efetivadas. Isso geralmente é feito programaticamente após a alteração da configuração, pedindo ao usuário para reiniciar o aplicativo ou usando uma solução de hot-reloading para desenvolvimento.
- **Estilos:** Ao desenvolver para RTL, sempre prefira as propriedades de estilo `*Start` e `*End` (ex: `paddingStart`, `marginEnd`) em vez de `*Left` e `*Right` para garantir que seus layouts se adaptem corretamente à direção do texto.
- **Imagens:** Imagens que contêm texto ou que têm uma direção implícita (como setas) podem precisar ser espelhadas horizontalmente em layouts RTL. Você pode usar a propriedade `transform: [{ scaleX: I18nManager.isRTL ? -1 : 1 }]` para espelhar imagens.
- **Testes:** É fundamental testar seu aplicativo em dispositivos configurados para idiomas RTL para garantir que a interface do usuário seja exibida corretamente e que a experiência do usuário seja consistente.


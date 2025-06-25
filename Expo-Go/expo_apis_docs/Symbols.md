# Símbolos (Symbols)

Uma biblioteca que permite o acesso a símbolos nativos. Esta biblioteca está atualmente em beta e sujeita a alterações que podem quebrar a compatibilidade.

`expo-symbols` fornece acesso à biblioteca [SF Symbols](https://developer.apple.com/sf-symbols/) no iOS.

## Instalação

Para instalar a API Symbols, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-symbols
```

## Uso

```javascript
import { SymbolView, SymbolViewProps, SFSymbol } from 'expo-symbols';
import { StyleSheet, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <SymbolView name="airpods.chargingcase" style={styles.symbol} type="hierarchical" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: {
    width: 35,
    height: 35,
    margin: 5,
  },
});
```

## API

```javascript
import { SymbolView } from 'expo-symbols';
```

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025


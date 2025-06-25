# Platform

A API `Platform` no React Native permite que você escreva código específico para cada plataforma (iOS, Android, Web, etc.) dentro de um único codebase. Isso é essencial para lidar com diferenças de UI, comportamento ou funcionalidades que são exclusivas de um sistema operacional específico, mantendo a maior parte do seu código compartilhável.

## Propriedades

### `OS`
Uma string que representa o sistema operacional em que o aplicativo está sendo executado. Os valores possíveis incluem:
- `ios`
- `android`
- `web`
- `windows` (para React Native for Windows)
- `macos` (para React Native for macOS)
- `native` (para código que é executado em qualquer plataforma nativa)

```javascript
import { Platform, Text, View, StyleSheet } from 'react-native';

const PlatformInfo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Você está executando em: {Platform.OS}
      </Text>
      {Platform.OS === 'ios' && (
        <Text style={styles.platformSpecificText}>Este texto é apenas para iOS.</Text>
      )}
      {Platform.OS === 'android' && (
        <Text style={styles.platformSpecificText}>Este texto é apenas para Android.</Text>
      )}
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  platformSpecificText: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
});

export default PlatformInfo;
```

### `Version`
Uma string ou número que representa a versão do sistema operacional. Em iOS, é a versão do iOS (ex: `'14.0'`). Em Android, é o nível da API (ex: `29`).

```javascript
import { Platform, Text, View } from 'react-native';

const OSVersion = () => {
  return (
    <View>
      <Text>
        Versão do OS: {Platform.Version}
      </Text>
      {Platform.OS === 'ios' && Platform.Version === '14.0' && (
        <Text>Você está no iOS 14.0!</Text>
      )}
      {Platform.OS === 'android' && Platform.Version >= 29 && (
        <Text>Você está no Android 10 (API 29) ou superior!</Text>
      )}
    </View>
  );
};

export default OSVersion;
```

### `isPad` (apenas iOS)
Um booleano que indica se o dispositivo é um iPad. Disponível apenas no iOS.

```javascript
import { Platform, Text, View } from 'react-native';

const DeviceType = () => {
  if (Platform.OS === 'ios') {
    return (
      <View>
        <Text>
          Este dispositivo é um iPad: {Platform.isPad ? 'Sim' : 'Não'}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Esta propriedade é apenas para iOS.</Text>
    </View>
  );
};

export default DeviceType;
```

### `isTV` (apenas iOS)
Um booleano que indica se o dispositivo é uma Apple TV. Disponível apenas no iOS.

```javascript
import { Platform, Text, View } from 'react-native';

const TVCheck = () => {
  if (Platform.OS === 'ios') {
    return (
      <View>
        <Text>
          Este dispositivo é uma Apple TV: {Platform.isTV ? 'Sim' : 'Não'}
        </Text>
      </View>
    );
  }
  return (
    <View>
      <Text>Esta propriedade é apenas para iOS.</Text>
    </View>
  );
};

export default TVCheck;
```

### `isTesting`
Um booleano que indica se o aplicativo está sendo executado em um ambiente de teste (por exemplo, Jest).

```javascript
import { Platform, Text, View } from 'react-native';

const TestingStatus = () => {
  return (
    <View>
      <Text>
        Em ambiente de teste: {Platform.isTesting ? 'Sim' : 'Não'}
      </Text>
    </View>
  );
};

export default TestingStatus;
```

### `select(obj)`
Um método que permite selecionar um valor específico com base na plataforma atual. Você passa um objeto onde as chaves são os nomes das plataformas (`ios`, `android`, `default`) e os valores são o que você deseja usar para aquela plataforma. Se a plataforma atual não for encontrada, ele tentará usar a chave `default`.

```javascript
import { Platform, Text, View, StyleSheet } from 'react-native';

const PlatformSpecificStyles = () => {
  const containerPadding = Platform.select({
    ios: 20,
    android: 10,
    default: 15, // Para outras plataformas ou como fallback
  });

  const buttonText = Platform.select({
    ios: 'Pressione no iOS',
    android: 'Toque no Android',
    default: 'Clique aqui',
  });

  const dynamicColor = Platform.select({
    ios: 'purple',
    android: 'green',
    web: 'orange',
    default: 'gray',
  });

  return (
    <View style={[styles.container, { padding: containerPadding }]}>
      <Text style={styles.text}>Texto do Botão: {buttonText}</Text>
      <Text style={[styles.text, { color: dynamicColor }]}>Cor Dinâmica</Text>
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

export default PlatformSpecificStyles;
```

## Considerações

- **Código Condicional:** Use `Platform.OS` para renderização condicional de componentes ou para executar lógica específica da plataforma.
- **Arquivos Específicos da Plataforma:** Para componentes ou módulos inteiros que são específicos de uma plataforma, você pode usar extensões de arquivo específicas da plataforma (ex: `MyComponent.ios.js`, `MyComponent.android.js`). O React Native automaticamente carregará o arquivo correto para a plataforma em questão.
- **`Platform.select`:** É uma maneira limpa e eficiente de gerenciar estilos, propriedades ou valores que variam por plataforma, evitando múltiplos `if/else` ou operadores ternários.
- **Manutenção:** Embora o `Platform` seja poderoso, use-o com moderação. Tentar abstrair demais as diferenças da plataforma pode levar a um código mais complexo e difícil de manter. Priorize soluções que funcionem bem em todas as plataformas sempre que possível.


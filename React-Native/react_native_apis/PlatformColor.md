# PlatformColor

A API `PlatformColor` no React Native permite que você use cores definidas pelo sistema operacional em seus estilos. Isso é particularmente útil para criar interfaces de usuário que se integram perfeitamente com a aparência nativa do dispositivo, respeitando as preferências de tema (claro/escuro) e acessibilidade do usuário.

## Uso

`PlatformColor` é uma função que recebe um ou mais nomes de cores de plataforma como argumentos e retorna um valor de cor que pode ser usado em `StyleSheet`.

### Cores do Sistema (iOS)

No iOS, você pode acessar as cores semânticas do sistema, que se adaptam automaticamente ao modo claro ou escuro. Alguns exemplos incluem:

- `systemRed`
- `systemGreen`
- `systemBlue`
- `systemOrange`
- `systemYellow`
- `systemPurple`
- `systemPink`
- `systemTeal`
- `systemIndigo`
- `systemGray` (e variações como `systemGray2`, `systemGray3`, etc.)
- `label` (cor do texto principal)
- `secondaryLabel` (cor do texto secundário)
- `tertiaryLabel`
- `quaternaryLabel`
- `systemBackground` (cor de fundo principal)
- `secondarySystemBackground`
- `tertiarySystemBackground`
- `separator`
- `link`

```javascript
import React from 'react';
import { View, Text, StyleSheet, PlatformColor } from 'react-native';

const iOSColorsExample = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: PlatformColor('systemRed') }]}>System Red</Text>
      <Text style={[styles.text, { color: PlatformColor('systemBlue') }]}>System Blue</Text>
      <Text style={[styles.text, { color: PlatformColor('label') }]}>Label Color</Text>
      <Text style={[styles.text, { color: PlatformColor('systemBackground') }]}>System Background</Text>
      <View style={[styles.box, { backgroundColor: PlatformColor('systemTeal') }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PlatformColor('systemBackground'), // Adapta o fundo ao tema do sistema
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default iOSColorsExample;
```

### Cores do Sistema (Android)

No Android, você pode acessar recursos de cores definidos no tema do Android. Estes são referenciados usando o formato `?attr/colorName` ou `@android:color/colorName`.

- `?attr/textColorPrimary`
- `?attr/colorAccent`
- `?attr/colorPrimary`
- `@android:color/holo_blue_light`
- `@android:color/background_dark`

```javascript
import React from 'react';
import { View, Text, StyleSheet, PlatformColor } from 'react-native';

const AndroidColorsExample = () => {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: PlatformColor('?attr/textColorPrimary') }]}>Primary Text Color</Text>
      <Text style={[styles.text, { color: PlatformColor('?attr/colorAccent') }]}>Accent Color</Text>
      <View style={[styles.box, { backgroundColor: PlatformColor('@android:color/holo_green_light') }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PlatformColor('?android:attr/windowBackground'), // Exemplo de cor de fundo do sistema Android
  },
  text: {
    fontSize: 20,
    marginBottom: 10,
  },
  box: {
    width: 100,
    height: 100,
    marginTop: 20,
  },
});

export default AndroidColorsExample;
```

### Uso Condicional por Plataforma

Você pode combinar `PlatformColor` com `Platform.select` para aplicar cores específicas da plataforma de forma elegante:

```javascript
import React from 'react';
import { View, Text, StyleSheet, PlatformColor, Platform } from 'react-native';

const DynamicColorExample = () => {
  const dynamicTextColor = Platform.select({
    ios: PlatformColor('systemRed'),
    android: PlatformColor('?attr/colorAccent'),
    default: 'black', // Fallback para outras plataformas ou se a cor não for encontrada
  });

  return (
    <View style={styles.container}>
      <Text style={[styles.text, { color: dynamicTextColor }]}>
        Cor Dinâmica da Plataforma
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
    fontSize: 20,
    marginBottom: 10,
  },
});

export default DynamicColorExample;
```

## Considerações

- **Integração Nativa:** O principal benefício de `PlatformColor` é a capacidade de fazer com que seu aplicativo React Native se pareça e se sinta mais nativo, adaptando-se automaticamente às diretrizes de design e temas do sistema operacional.
- **Modo Claro/Escuro:** As cores do sistema (especialmente no iOS) são projetadas para se ajustar automaticamente ao modo claro ou escuro do dispositivo, o que simplifica a implementação de temas no seu aplicativo.
- **Disponibilidade:** As cores disponíveis e seus nomes variam significativamente entre iOS e Android. Sempre consulte a documentação oficial da Apple (Human Interface Guidelines) e do Android (Material Design) para obter a lista completa de cores do sistema e seus usos recomendados.
- **Fallback:** É uma boa prática fornecer um valor de fallback (por exemplo, uma cor hexadecimal ou nome de cor CSS) para `PlatformColor` ou usar `Platform.select` com uma opção `default` para garantir que seu aplicativo se comporte bem em plataformas onde a cor específica do sistema pode não estar disponível ou não ser relevante.


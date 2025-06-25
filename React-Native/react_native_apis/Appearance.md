# Appearance

A API `Appearance` no React Native permite que você acesse as preferências de aparência do usuário, como o tema de cor (claro ou escuro) do sistema operacional. Isso é fundamental para criar aplicativos que se adaptam automaticamente ao modo de exibição preferido do usuário, proporcionando uma experiência mais integrada e agradável.

## Métodos e Propriedades

### `getColorScheme()`
Retorna o esquema de cores atual do sistema (`'light'`, `'dark'` ou `null` se não for detectado). Este método é síncrono e retorna o valor imediatamente.

```javascript
import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

if (colorScheme === 'dark') {
  console.log('O usuário está usando o tema escuro.');
} else if (colorScheme === 'light') {
  console.log('O usuário está usando o tema claro.');
} else {
  console.log('Não foi possível detectar o tema do sistema.');
}
```

### `addChangeListener(listener)`
Adiciona um ouvinte para mudanças no esquema de cores do sistema. O `listener` é uma função que será chamada sempre que o esquema de cores mudar. A função de ouvinte recebe um objeto com a propriedade `colorScheme` (que pode ser `'light'`, `'dark'` ou `null`).

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, Appearance, StyleSheet } from 'react-native';

const ThemeDetector = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setColorScheme(colorScheme);
    });

    return () => subscription.remove();
  }, []);

  const containerStyle = colorScheme === 'dark' ? styles.darkContainer : styles.lightContainer;
  const textStyle = colorScheme === 'dark' ? styles.darkText : styles.lightText;

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={textStyle}>
        Tema do Sistema: {colorScheme ? colorScheme.toUpperCase() : 'Não Detectado'}
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
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#333333',
  },
  lightText: {
    color: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
});

export default ThemeDetector;
```

## Considerações

- **Experiência do Usuário:** Utilizar a API `Appearance` melhora significativamente a experiência do usuário, pois o aplicativo se adapta às preferências do sistema, tornando-o mais familiar e confortável de usar.
- **Modo Escuro:** A implementação de um modo escuro é uma prática recomendada de design de interface do usuário, especialmente para reduzir o cansaço visual em ambientes com pouca luz e economizar bateria em telas OLED.
- **Testes:** Certifique-se de testar seu aplicativo em ambos os esquemas de cores (claro e escuro) para garantir que todos os elementos da interface do usuário sejam legíveis e visualmente agradáveis em todas as condições.


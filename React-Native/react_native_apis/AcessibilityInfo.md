# AcessibilityInfo

A API `AcessibilityInfo` no React Native fornece informações sobre o estado atual das configurações de acessibilidade do dispositivo, como se um leitor de tela está ativo ou se o modo de alto contraste está habilitado. Ela também permite que você ouça mudanças nessas configurações.

## Métodos e Propriedades

### `isScreenReaderEnabled()`
Retorna uma `Promise` que resolve para um valor booleano indicando se um leitor de tela está atualmente ativo.

```javascript
import { AcessibilityInfo } from 'react-native';

AcessibilityInfo.isScreenReaderEnabled().then(screenReaderEnabled => {
  if (screenReaderEnabled) {
    console.log('Leitor de tela está ativo');
  } else {
    console.log('Leitor de tela está inativo');
  }
});
```

### `addEventListener('change', handler)`
Adiciona um ouvinte para mudanças no estado do leitor de tela. O `handler` é chamado com um valor booleano indicando se o leitor de tela está ativo.

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, AcessibilityInfo } from 'react-native';

const ScreenReaderStatus = () => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState(false);

  useEffect(() => {
    AcessibilityInfo.isScreenReaderEnabled().then(setScreenReaderEnabled);

    const subscription = AcessibilityInfo.addEventListener(
      'change',
      setScreenReaderEnabled
    );

    return () => subscription.remove();
  }, []);

  return (
    <View>
      <Text>Leitor de Tela: {screenReaderEnabled ? 'Ativo' : 'Inativo'}</Text>
    </View>
  );
};

export default ScreenReaderStatus;
```

### `setAccessibilityFocus(reactTag)`
Move o foco de acessibilidade para o componente especificado por `reactTag`. Isso é útil para direcionar o foco do leitor de tela para um elemento específico após uma mudança na interface do usuário.

```javascript
import React, { useRef } from 'react';
import { View, Button, Text, AcessibilityInfo, findNodeHandle } from 'react-native';

const FocusExample = () => {
  const textRef = useRef(null);

  const handlePress = () => {
    if (textRef.current) {
      const reactTag = findNodeHandle(textRef.current);
      if (reactTag) {
        AcessibilityInfo.setAccessibilityFocus(reactTag);
      }
    }
  };

  return (
    <View>
      <Button title="Focar no Texto" onPress={handlePress} />
      <Text ref={textRef} accessible={true} accessibilityLabel="Este é o texto focado">
        Este é um texto importante.
      </Text>
    </View>
  );
};

export default FocusExample;
```

### `isReduceMotionEnabled()` (iOS e Android)
Retorna uma `Promise` que resolve para um valor booleano indicando se a configuração de "Reduzir Movimento" está ativada no dispositivo. Isso pode ser usado para desabilitar animações ou efeitos visuais para usuários sensíveis a movimento.

```javascript
import { AcessibilityInfo } from 'react-native';

AcessibilityInfo.isReduceMotionEnabled().then(reduceMotionEnabled => {
  if (reduceMotionEnabled) {
    console.log('Reduzir movimento está ativo');
  } else {
    console.log('Reduzir movimento está inativo');
  }
});
```

### `isBoldTextEnabled()` (iOS)
Retorna uma `Promise` que resolve para um valor booleano indicando se a configuração de "Texto em Negrito" está ativada no iOS.

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'ios') {
  AcessibilityInfo.isBoldTextEnabled().then(boldTextEnabled => {
    if (boldTextEnabled) {
      console.log('Texto em negrito está ativo');
    } else {
      console.log('Texto em negrito está inativo');
    }
  });
}
```

### `isGrayscaleEnabled()` (iOS)
Retorna uma `Promise` que resolve para um valor booleano indicando se a configuração de "Escala de Cinza" está ativada no iOS.

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'ios') {
  AcessibilityInfo.isGrayscaleEnabled().then(grayscaleEnabled => {
    if (grayscaleEnabled) {
      console.log('Escala de cinza está ativa');
    } else {
      console.log('Escala de cinza está inativa');
    }
  });
}
```

### `isInvertColorsEnabled()` (iOS)
Retorna uma `Promise` que resolve para um valor booleano indicando se a configuração de "Inverter Cores" está ativada no iOS.

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'ios') {
  AcessibilityInfo.isInvertColorsEnabled().then(invertColorsEnabled => {
    if (invertColorsEnabled) {
      console.log('Inverter cores está ativo');
    } else {
      console.log('Inverter cores está inativo');
    }
  });
}
```

### `isReduceTransparencyEnabled()` (iOS)
Retorna uma `Promise` que resolve para um valor booleano indicando se a configuração de "Reduzir Transparência" está ativada no iOS.

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'ios') {
  AcessibilityInfo.isReduceTransparencyEnabled().then(reduceTransparencyEnabled => {
    if (reduceTransparencyEnabled) {
      console.log('Reduzir transparência está ativo');
    } else {
      console.log('Reduzir transparência está inativo');
    }
  });
}
```

### `isVoiceOverEnabled()` (iOS)
Retorna uma `Promise` que resolve para um valor booleano indicando se o VoiceOver está ativado no iOS. (Similar a `isScreenReaderEnabled` para iOS).

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'ios') {
  AcessibilityInfo.isVoiceOverEnabled().then(voiceOverEnabled => {
    if (voiceOverEnabled) {
      console.log('VoiceOver está ativo');
    } else {
      console.log('VoiceOver está inativo');
    }
  });
}
```

### `isScreenReaderEnabled()` (Android)
Retorna uma `Promise` que resolve para um valor booleano indicando se um leitor de tela está atualmente ativo no Android. (Similar a `isScreenReaderEnabled` para Android).

```javascript
import { AcessibilityInfo, Platform } from 'react-native';

if (Platform.OS === 'android') {
  AcessibilityInfo.isScreenReaderEnabled().then(screenReaderEnabled => {
    if (screenReaderEnabled) {
      console.log('Leitor de tela está ativo no Android');
    } else {
      console.log('Leitor de tela está inativo no Android');
    }
  });
}
```

## Considerações

É crucial usar as APIs de acessibilidade para criar aplicativos inclusivos. Teste seu aplicativo com leitores de tela e outras configurações de acessibilidade para garantir uma boa experiência para todos os usuários.


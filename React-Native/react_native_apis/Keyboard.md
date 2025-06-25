# Keyboard

A API `Keyboard` no React Native fornece funcionalidades para interagir com o teclado virtual do dispositivo. Ela permite que você controle o comportamento do teclado, como ocultá-lo ou mostrá-lo, e também fornece eventos para detectar quando o teclado aparece, desaparece ou muda de tamanho. Isso é essencial para criar experiências de usuário fluidas e responsivas ao lidar com campos de entrada de texto.

## Métodos

### `dismiss()`
Oculta o teclado virtual. Isso é útil quando você quer fechar o teclado programaticamente, por exemplo, ao tocar fora de um campo de texto ou ao enviar um formulário.

```javascript
import React from 'react';
import { View, TextInput, Button, Keyboard, StyleSheet } from 'react-native';

const KeyboardDismissExample = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite algo aqui..."
        onSubmitEditing={Keyboard.dismiss} // Oculta o teclado ao pressionar Enter
      />
      <Button title="Ocultar Teclado" onPress={Keyboard.dismiss} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default KeyboardDismissExample;
```

### `addListener(eventName, callback)`
Adiciona um ouvinte para eventos do teclado. Os `eventName`s comuns incluem:

-   `keyboardDidShow`: Disparado quando o teclado aparece.
-   `keyboardDidHide`: Disparado quando o teclado desaparece.
-   `keyboardWillShow`: Disparado antes do teclado aparecer.
-   `keyboardWillHide`: Disparado antes do teclado desaparecer.
-   `keyboardDidChangeFrame`: Disparado quando o teclado muda de tamanho ou posição (por exemplo, ao girar o dispositivo).
-   `keyboardWillChangeFrame`: Disparado antes do teclado mudar de tamanho ou posição.

O `callback` para `keyboardDidShow`, `keyboardWillShow`, `keyboardDidChangeFrame` e `keyboardWillChangeFrame` recebe um objeto de evento com informações sobre o teclado, como `endCoordinates` (altura e posição do teclado).

```javascript
import React, { useEffect, useState } from 'react';
import { View, TextInput, Text, Keyboard, StyleSheet } from 'react-native';

const KeyboardEventsExample = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState('Fechado');

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardStatus('Aberto');
      console.log('Teclado apareceu. Altura:', e.endCoordinates.height);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setKeyboardStatus('Fechado');
      console.log('Teclado desapareceu.');
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Foque aqui para abrir o teclado"
      />
      <Text style={styles.statusText}>Status do Teclado: {keyboardStatus}</Text>
      {keyboardHeight > 0 && (
        <Text style={styles.statusText}>Altura do Teclado: {keyboardHeight.toFixed(2)}px</Text>
      )}
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '80%',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  statusText: {
    fontSize: 16,
    marginTop: 10,
  },
});

export default KeyboardEventsExample;
```

### `removeListener(eventName, callback)`
Remove um ouvinte de evento do teclado. É crucial remover os ouvintes quando o componente que os adicionou é desmontado para evitar vazamentos de memória.

```javascript
// Exemplo acima já demonstra o uso de removeListener no useEffect cleanup.
```

## Considerações

-   **Ajuste de Layout:** A API `Keyboard` é frequentemente usada em conjunto com `KeyboardAvoidingView` ou lógica personalizada para ajustar o layout da tela quando o teclado virtual aparece, garantindo que os campos de entrada de texto permaneçam visíveis e acessíveis.
-   **Experiência do Usuário:** Controlar o teclado de forma inteligente melhora significativamente a experiência do usuário, especialmente em formulários longos ou telas com muitos campos de entrada.
-   **Diferenças de Plataforma:** Embora a API seja unificada, o comportamento exato do teclado pode variar ligeiramente entre iOS e Android (por exemplo, como o teclado é descartado ou como ele interage com o layout).
-   **`endCoordinates`:** A propriedade `endCoordinates` no objeto de evento do teclado fornece a altura e a posição final do teclado, o que é útil para calcular o deslocamento necessário para manter um campo de entrada visível.


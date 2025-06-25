# Vibration

A API `Vibration` no React Native permite que você acesse o hardware de vibração do dispositivo para fornecer feedback tátil ao usuário. Isso pode ser útil para notificações, feedback de interação ou para chamar a atenção do usuário de forma não intrusiva.

## Métodos

### `vibrate(pattern)`
Inicia a vibração do dispositivo. Você pode passar um único número para vibrar por uma duração específica em milissegundos, ou um array de números para um padrão de vibração.

-   **Duração:** Se um número for fornecido, o dispositivo vibrará por essa duração em milissegundos.
-   **Padrão:** Se um array for fornecido, ele representa um padrão de vibração e pausa em milissegundos. Por exemplo, `[0, 500, 200, 500]` vibraria por 500ms, pausaria por 200ms e vibraria novamente por 500ms. O primeiro valor no array é o atraso antes da primeira vibração.

```javascript
import React from 'react';
import { View, Button, Vibration, Text, StyleSheet } from 'react-native';

const VibrationExample = () => {
  const ONE_SECOND_IN_MS = 1000;

  const vibrateOnce = () => {
    Vibration.vibrate(ONE_SECOND_IN_MS);
    console.log("Vibrando por 1 segundo...");
  };

  const vibratePattern = () => {
    // Vibrar por 1 segundo, pausar por 0.5 segundo, vibrar por 1 segundo
    const pattern = [1 * ONE_SECOND_IN_MS, 0.5 * ONE_SECOND_IN_MS, 1 * ONE_SECOND_IN_MS];
    Vibration.vibrate(pattern);
    console.log("Vibrando em padrão...");
  };

  const vibrateRepeatPattern = () => {
    // Vibrar por 0.5 segundo, pausar por 0.5 segundo, repetir
    const pattern = [0.5 * ONE_SECOND_IN_MS, 0.5 * ONE_SECOND_IN_MS];
    Vibration.vibrate(pattern, true); // O segundo argumento 'true' faz o padrão repetir
    console.log("Vibrando em padrão repetitivo...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API de Vibração</Text>
      <Button title="Vibrar uma vez (1s)" onPress={vibrateOnce} />
      <Button title="Vibrar em Padrão" onPress={vibratePattern} />
      <Button title="Vibrar em Padrão Repetitivo" onPress={vibrateRepeatPattern} />
      <Button title="Parar Vibração" onPress={() => Vibration.cancel()} />
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
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
  },
});

export default VibrationExample;
```

### `cancel()`
Cancela qualquer vibração em andamento.

```javascript
import { Vibration } from 'react-native';

// Para parar uma vibração em andamento
Vibration.cancel();
console.log("Vibração cancelada.");
```

## Permissões (Android)

No Android, para usar a API de Vibração, você precisa adicionar a permissão `VIBRATE` ao seu arquivo `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.VIBRATE" />
```

No iOS, nenhuma permissão especial é necessária para vibração.

## Considerações

-   **Feedback Tátil:** A vibração pode ser uma forma eficaz de fornecer feedback não visual ao usuário, especialmente em situações onde o feedback visual ou sonoro pode não ser apropriado ou suficiente.
-   **Uso Moderado:** Use a vibração com moderação. O uso excessivo ou inadequado pode ser irritante para o usuário e consumir bateria.
-   **Acessibilidade:** Considere as preferências de acessibilidade do usuário. Alguns usuários podem ter sensibilidade à vibração ou preferir desativá-la. Não dependa exclusivamente da vibração para transmitir informações críticas.
-   **Diferenças de Hardware:** A intensidade e a qualidade da vibração podem variar significativamente entre diferentes dispositivos. Teste seu aplicativo em uma variedade de dispositivos para garantir uma experiência consistente.
-   **Repetição:** Ao usar padrões de repetição (`Vibration.vibrate(pattern, true)`), certifique-se de fornecer uma maneira para o usuário parar a vibração, como um botão de "Parar Vibração", como mostrado no exemplo acima.


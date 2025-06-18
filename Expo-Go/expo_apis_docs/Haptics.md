# Hápticos (Haptics)

Uma biblioteca que fornece acesso aos efeitos de vibração do sistema no Android, ao motor háptico no iOS e à API de Vibração Web na web.

`expo-haptics` fornece feedback háptico (tátil) para:

*   Dispositivos Android usando o serviço de sistema Vibrator.
*   Dispositivos iOS 10+ usando o Taptic Engine.
*   Plataformas web usando a API de Vibração Web.

No iOS, o motor Taptic não fará nada se alguma das seguintes condições for verdadeira no dispositivo do usuário:

*   O Modo de Pouca Energia está ativado. Isso pode ser detectado com [`expo-battery`](https://docs.expo.dev/versions/latest/sdk/battery/).
*   O usuário desativou o Taptic Engine nas configurações.
*   A Câmera iOS está ativa (para evitar desestabilização).
*   A ditado iOS está ativo (para não perturbar a entrada do microfone).

Na web, a biblioteca usa a API de Vibração Web. Observe o seguinte:

*   A API deve ser suportada pelo navegador (verifique a [compatibilidade do navegador](https://developer.mozilla.org/en-US/docs/Web/API/Vibration_API#Browser_compatibility)).
*   O dispositivo deve ter hardware de vibração.
*   O usuário deve conceder permissão para usar a vibração (geralmente automática).
*   Alguns navegadores podem ignorar a vibração em certos contextos (por exemplo, abas em segundo plano).

## Instalação

Para instalar a API Haptics, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-haptics
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração

No Android, esta biblioteca requer permissão para controlar a vibração no dispositivo. A permissão `VIBRATE` é adicionada automaticamente.

## Uso

```javascript
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Haptics from 'expo-haptics';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Haptics.selectionAsync</Text>
      <View style={styles.buttonContainer}>
        <Button title="Seleção" onPress={() => Haptics.selectionAsync()} />
      </View>
      <Text style={styles.text}>Haptics.notificationAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Sucesso"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Success
              )
          }
        />
        <Button
          title="Erro"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Error
              )
          }
        />
        <Button
          title="Aviso"
          onPress={
            () =>
              Haptics.notificationAsync(
                Haptics.NotificationFeedbackType.Warning
              )
          }
        />
      </View>
      <Text style={styles.text}>Haptics.impactAsync</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Leve"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          }
        />
        <Button
          title="Médio"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
          }
        />
        <Button
          title="Pesado"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
          }
        />
        <Button
          title="Rígido"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
          }
        />
        <Button
          title="Suave"
          onPress={
            () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    margin: 5,
  },
});
```

## API

```javascript
import * as Haptics from 'expo-haptics';
```

### Métodos

#### `Haptics.impactAsync(style)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `style` | `ImpactFeedbackStyle` | O estilo de feedback de impacto a ser usado. |

Gera um feedback háptico de impacto. Útil para indicar que uma ação ocorreu.

#### `Haptics.notificationAsync(type)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `type` | `NotificationFeedbackType` | O tipo de feedback de notificação a ser usado. |

Gera um feedback háptico de notificação. Útil para indicar sucesso, falha ou aviso.

#### `Haptics.performAndroidHapticsAsync(hapticType)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `hapticType` | `AndroidHaptics` | O tipo de háptico Android a ser executado. |

Executa um tipo específico de háptico Android. **Apenas para Android.**

#### `Haptics.selectionAsync()`

Gera um feedback háptico de seleção. Útil para indicar que uma seleção mudou.

### Enums

#### `AndroidHaptics`

Enum que representa os tipos de hápticos Android (`CLOCK_TICK`, `CONTEXT_CLICK`, `KEYBOARD_PRESS`, `LONG_PRESS`, `TEXT_HANDLE_MOVE`, `VIRTUAL_KEY`, `VIRTUAL_KEY_RELEASE`).

#### `ImpactFeedbackStyle`

Enum que representa os estilos de feedback de impacto (`Light`, `Medium`, `Heavy`, `Rigid`, `Soft`).

#### `NotificationFeedbackType`

Enum que representa os tipos de feedback de notificação (`Success`, `Warning`, `Error`).

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


# Checkbox

Um componente React universal que fornece funcionalidade básica de caixa de seleção.

`expo-checkbox` fornece um elemento de entrada booleano básico para todas as plataformas.

## Instalação

Para instalar a API Checkbox, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-checkbox
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Uso básico do Checkbox

```javascript
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isChecked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} />
        <Text style={styles.paragraph}>Checkbox normal</Text>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={true} disabled={true} />
        <Text style={styles.paragraph}>Checkbox desabilitado</Text>
      </View>
      <View style={styles.section}>
        <Checkbox style={styles.checkbox} value={true} color="#4630EB" />
        <Text style={styles.paragraph}>Checkbox colorido</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    marginVertical: 32,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    margin: 8,
  },
});
```

## API

```javascript
import Checkbox from 'expo-checkbox';
```

### Componente `Checkbox`

Um componente React que renderiza uma caixa de seleção. Ele aceita as seguintes props:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `value` | `boolean` | Um booleano indicando se a caixa de seleção deve ser renderizada como marcada ou não. Padrão: `false`. |
| `onValueChange` | `(value: boolean) => void` | Callback invocado quando o usuário pressiona a caixa de seleção. O `value` é um booleano indicando o novo estado marcado da caixa de seleção. |
| `disabled` | `boolean` | Se a caixa de seleção estiver desabilitada, ela se torna opaca e não pode ser marcada. |
| `color` | `ColorValue` | A tonalidade ou cor da caixa de seleção. Isso substitui o estilo opaco desabilitado. |

#### Props Herdadas

*   [`ViewProps`](https://reactnative.dev/docs/view#props)

### Tipos

#### `CheckboxEvent`

Tipo: `object`

Um objeto que contém o novo estado da caixa de seleção.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


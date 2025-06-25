# Interface do Usuário (UI)

Um conjunto de componentes que permite construir UIs diretamente com SwiftUI e Jetpack Compose a partir do React.

`@expo/ui` é um conjunto de componentes de entrada nativos que permite construir interfaces totalmente nativas com SwiftUI e Jetpack Compose. Ele visa fornecer os recursos e componentes comumente usados que um aplicativo típico precisará.

> **Esta biblioteca está atualmente em alfa e frequentemente experimentará mudanças significativas.** Não está disponível no aplicativo Expo Go - use uma [build de desenvolvimento](https://docs.expo.dev/develop/development-builds/introduction/) para experimentá-la.

## Instalação

Para instalar a biblioteca `@expo/ui`, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install @expo/ui
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Exemplos de uso

Esta biblioteca fornece componentes nativos para iOS (SwiftUI) e Android (Jetpack Compose). Abaixo estão alguns exemplos de como você pode usar esses componentes.

### `BottomSheet` (iOS)

```javascript
import { BottomSheet } from "@expo/ui";
import { useState } from "react";
import { Button, Text, View } from "react-native";

function MyBottomSheet() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View>
      <Button title="Abrir Bottom Sheet" onPress={() => setIsVisible(true)} />
      <BottomSheet
        isVisible={isVisible}
        onDismiss={() => setIsVisible(false)}
      >
        <View style={{ padding: 20 }}>
          <Text>Conteúdo do Bottom Sheet</Text>
          <Button title="Fechar" onPress={() => setIsVisible(false)} />
        </View>
      </BottomSheet>
    </View>
  );
}

export default MyBottomSheet;
```

### `Button`

```javascript
import { Button } from "@expo/ui";
import { View } from "react-native";

function MyButtons() {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-around", padding: 20 }}>
      <Button title="Botão Primário" onPress={() => console.log("Botão Primário Pressionado")} />
      <Button title="Botão Secundário" variant="secondary" onPress={() => console.log("Botão Secundário Pressionado")} />
    </View>
  );
}

export default MyButtons;
```

### `CircularProgress`

```javascript
import { CircularProgress } from "@expo/ui";
import { View } from "react-native";

function MyCircularProgress() {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", padding: 20 }}>
      <CircularProgress value={0.75} />
    </View>
  );
}

export default MyCircularProgress;
```

### `ColorPicker`

```javascript
import { ColorPicker } from "@expo/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function MyColorPicker() {
  const [color, setColor] = useState("#FF0000");

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>Cor Selecionada: {color}</Text>
      <ColorPicker value={color} onChange={setColor} />
    </View>
  );
}

export default MyColorPicker;
```

### `ContextMenu`

```javascript
import { ContextMenu } from "@expo/ui";
import { Button, View } from "react-native";

function MyContextMenu() {
  return (
    <View style={{ padding: 20 }}>
      <ContextMenu
        actions={[
          { title: "Opção 1", onPress: () => console.log("Opção 1") },
          { title: "Opção 2", onPress: () => console.log("Opção 2") },
        ]}
      >
        <Button title="Abrir Menu de Contexto" />
      </ContextMenu>
    </View>
  );
}

export default MyContextMenu;
```

### `DateTimePicker`

```javascript
import { DateTimePicker } from "@expo/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function MyDateTimePicker() {
  const [date, setDate] = useState(new Date());

  return (
    <View style={{ alignItems: "center", padding: 20 }}>
      <Text>Data/Hora Selecionada: {date.toLocaleString()}</Text>
      <DateTimePicker value={date} onChange={setDate} />
    </View>
  );
}

export default MyDateTimePicker;
```

### `Gallery`

```javascript
import { Gallery } from "@expo/ui";
import { View } from "react-native";

const images = [
  "https://via.placeholder.com/150/FF0000",
  "https://via.placeholder.com/150/00FF00",
  "https://via.placeholder.com/150/0000FF",
];

function MyGallery() {
  return (
    <View style={{ height: 200, width: "100%" }}>
      <Gallery images={images} />
    </View>
  );
}

export default MyGallery;
```

### `LinearProgress`

```javascript
import { LinearProgress } from "@expo/ui";
import { View } from "react-native";

function MyLinearProgress() {
  return (
    <View style={{ padding: 20 }}>
      <LinearProgress value={0.5} />
    </View>
  );
}

export default MyLinearProgress;
```

### `Picker`

```javascript
import { Picker } from "@expo/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function MyPicker() {
  const [selectedValue, setSelectedValue] = useState("opcao1");
  const options = [
    { label: "Opção 1", value: "opcao1" },
    { label: "Opção 2", value: "opcao2" },
    { label: "Opção 3", value: "opcao3" },
  ];

  return (
    <View style={{ padding: 20 }}>
      <Text>Valor Selecionado: {selectedValue}</Text>
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        options={options}
      />
    </View>
  );
}

export default MyPicker;
```

### `Slider`

```javascript
import { Slider } from "@expo/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function MySlider() {
  const [value, setValue] = useState(0.5);

  return (
    <View style={{ padding: 20 }}>
      <Text>Valor do Slider: {value.toFixed(2)}</Text>
      <Slider value={value} onValueChange={setValue} />
    </View>
  );
}

export default MySlider;
```

### `Switch`

```javascript
import { Switch } from "@expo/ui";
import { useState } from "react";
import { View, Text } from "react-native";

function MySwitch() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <View style={{ flexDirection: "row", alignItems: "center", padding: 20 }}>
      <Text>Ativar/Desativar:</Text>
      <Switch value={isEnabled} onValueChange={setIsEnabled} />
    </View>
  );
}

export default MySwitch;
```

### `TextInput`

```javascript
import { TextInput } from "@expo/ui";
import { useState } from "react";
import { View } from "react-native";

function MyTextInput() {
  const [text, setText] = useState("");

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Digite algo..."
        value={text}
        onChangeText={setText}
      />
    </View>
  );
}

export default MyTextInput;
```

---

**Autor:** Manus AI
**Data de Geração:** 21 de Junho de 2025


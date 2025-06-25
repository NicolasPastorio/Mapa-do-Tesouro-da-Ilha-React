# Impressão (Print)

Uma biblioteca que fornece funcionalidade de impressão para Android e iOS (AirPrint).

`expo-print` fornece uma API para funcionalidade de impressão para Android e iOS (AirPrint).

## Instalação

Para instalar a API Print, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-print
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { useState } from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    </head>
    <body style="text-align: center;">
      <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;"> Hello Expo! </h1>
      <img src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png" style="width: 90vw;" />
    </body>
  </html>
`;

export default function App() {
  const [selectedPrinter, setSelectedPrinter] = useState();

  const print = async () => {
    await Print.printAsync({
      html,
      printerUrl: selectedPrinter?.url,
    });
  };

  const printToFile = async () => {
    const { uri } = await Print.printToFileAsync({ html });
    console.log("Arquivo salvo em:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync();
    setSelectedPrinter(printer);
  };

  return (
    <View style={styles.container}>
      <Button title="Imprimir" onPress={print} />
      <View style={styles.spacer} />
      <Button title="Imprimir para arquivo PDF" onPress={printToFile} />
      {Platform.OS === "ios" && (
        <>
          <View style={styles.spacer} />
          <Button title="Selecionar impressora" onPress={selectPrinter} />
          <View style={styles.spacer} />
          {selectedPrinter ? (
            <Text style={styles.printer}>{`Impressora selecionada: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    flexDirection: "column",
    padding: 8,
  },
  spacer: {
    height: 8,
  },
  printer: {
    textAlign: "center",
  },
});
```

## API

```javascript
import * as Print from 'expo-print';
```

### Constantes

#### `Print.Orientation`

Um enum que representa as orientações de impressão. Valores possíveis: `portrait`, `landscape`.

### Métodos

#### `Print.printAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `PrintOptions` | Opções para a impressão. |

Imprime o conteúdo fornecido. Retorna uma promessa que se resolve quando a impressão é concluída.

#### `Print.printToFileAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `FilePrintOptions` | Opções para a impressão em arquivo. |

Imprime o conteúdo fornecido para um arquivo PDF. Retorna uma promessa que se resolve com um objeto `FilePrintResult` contendo o URI do arquivo.

#### `Print.selectPrinterAsync()`

Permite ao usuário selecionar uma impressora. Retorna uma promessa que se resolve com um objeto `Printer` ou `null` se nenhuma impressora for selecionada.

### Interfaces

#### `OrientationType`

Tipo: `string`

Representa o tipo de orientação. Valores possíveis: `portrait`, `landscape`.

### Tipos

#### `FilePrintOptions`

Tipo: `object`

Opções para a função `printToFileAsync`, incluindo `html`, `uri`, `width`, `height`, `base64`, `margins`.

#### `FilePrintResult`

Tipo: `object`

O resultado da função `printToFileAsync`, contendo `uri`.

#### `PageMargins`

Tipo: `object`

Margens da página em pontos, contendo `top`, `bottom`, `left`, `right`.

#### `Printer`

Tipo: `object`

Um objeto que representa uma impressora, contendo `name`, `url`.

#### `PrintOptions`

Tipo: `object`

Opções para a função `printAsync`, incluindo `html`, `uri`, `printerUrl`, `margins`, `orientation`.

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

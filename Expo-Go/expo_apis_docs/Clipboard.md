# Área de Transferência (Clipboard)

Uma biblioteca universal que permite obter e definir o conteúdo da área de transferência.

`expo-clipboard` fornece uma interface para obter e definir o conteúdo da Área de Transferência no Android, iOS e Web.

## Instalação

Para instalar a API Clipboard, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-clipboard
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';

export default function App() {
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync('olá mundo');
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pressione o botão para copiar o texto para a área de transferência</Text>
      <Button title="Copiar para Área de Transferência" onPress={copyToClipboard} />
      <Text style={styles.text}>Pressione o botão para buscar o texto da área de transferência</Text>
      <Button title="Buscar da Área de Transferência" onPress={fetchCopiedText} />
      <Text style={styles.copiedText}>Texto Copiado: {copiedText}</Text>
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
    marginBottom: 20,
    textAlign: 'center',
  },
  copiedText: {
    fontSize: 16,
    marginTop: 20,
    color: 'blue',
  },
});
```

## API

```javascript
import * as Clipboard from 'expo-clipboard';
```

### Componente `ClipboardPasteButton`

Este componente exibe o botão `UIPasteControl` na sua tela. Isso permite colar da área de transferência sem solicitar permissão do usuário.

Você só deve tentar renderizar isso se `Clipboard.isPasteButtonAvailable` for `true`. Este componente não renderizará nada se não estiver disponível, e você receberá um aviso no modo de desenvolvimento (`__DEV__ === true`).

As propriedades deste componente se estendem de `View`; no entanto, você não deve tentar definir `backgroundColor`, `color` ou `borderRadius` com a propriedade `style`. A Apple restringe a personalização desta visualização. Em vez disso, você deve usar as propriedades `backgroundColor` e `foregroundColor` para definir as cores do botão, a propriedade `cornerStyle` para alterar o raio da borda e a propriedade `displayMode` para alterar a aparência do ícone e do rótulo. A palavra "Colar" não é editável, nem o ícone.

Certifique-se de anexar `height` e `width` através das props de estilo, pois sem esses estilos, o botão não aparecerá na tela.

> Veja: [Documentação da Apple](https://developer.apple.com/documentation/uikit/uipastecontrol) para mais detalhes.

### Constantes

#### `Clipboard.isPasteButtonAvailable`

Um booleano que indica se o botão de colar da área de transferência está disponível no dispositivo atual. Disponível apenas no iOS 16+.

### Métodos

#### `Clipboard.getImageAsync(options)`

Obtém uma imagem da área de transferência. Retorna uma promessa que se resolve com um objeto [`ClipboardImage`](https://docs.expo.dev/versions/latest/sdk/clipboard/#clipboardimage) ou `null` se não houver imagem na área de transferência.

#### `Clipboard.getStringAsync(options)`

Obtém uma string da área de transferência. Retorna uma promessa que se resolve com a string da área de transferência.

#### `Clipboard.getUrlAsync()`

Obtém uma URL da área de transferência. Retorna uma promessa que se resolve com a URL da área de transferência ou `null` se não houver URL.

#### `Clipboard.hasImageAsync()`

Retorna uma promessa que se resolve com um booleano indicando se a área de transferência contém uma imagem.

#### `Clipboard.hasStringAsync()`

Retorna uma promessa que se resolve com um booleano indicando se a área de transferência contém uma string.

#### `Clipboard.hasUrlAsync()`

Retorna uma promessa que se resolve com um booleano indicando se a área de transferência contém uma URL.

#### `Clipboard.setImageAsync(base64Image)`

Define uma imagem na área de transferência. A imagem deve ser uma string codificada em base64.

#### `Clipboard.setString(text)`

Define uma string na área de transferência. **(Obsoleto: Use `setStringAsync()` em vez disso.)**

#### `Clipboard.setStringAsync(text)`

Define uma string na área de transferência. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Clipboard.setUrlAsync(url)`

Define uma URL na área de transferência. Retorna uma promessa que se resolve quando a operação é concluída.

### Assinaturas de Eventos

#### `Clipboard.addClipboardListener(listener)`

Adiciona um ouvinte para receber eventos da área de transferência. O `listener` é uma função que recebe um objeto [`ClipboardEvent`](https://docs.expo.dev/versions/latest/sdk/clipboard/#clipboardevent) como argumento.

#### `Clipboard.removeClipboardListener(listener)`

Remove um ouvinte previamente adicionado.

### Interfaces

#### `Subscription`

Tipo: `object`

Um objeto de assinatura de evento que pode ser usado para remover o ouvinte.

### Tipos

#### `AcceptedContentType`

Tipo: `string`

Tipos de conteúdo aceitos para a área de transferência (`text`, `image`, `url`).

#### `ClipboardEvent`

Tipo: `object`

Um objeto que contém o tipo de conteúdo da área de transferência.

#### `ClipboardImage`

Tipo: `object`

Um objeto que contém os dados da imagem da área de transferência (URI, largura, altura, etc.).

#### `CornerStyleType`

Tipo: `string`

Estilo de canto para o botão de colar (`rounded`, `capsule`, `none`).

#### `DisplayModeType`

Tipo: `string`

Modo de exibição para o botão de colar (`iconAndLabel`, `iconOnly`, `labelOnly`).

#### `GetImageOptions`

Tipo: `object`

Opções para obter uma imagem da área de transferência.

#### `GetStringOptions`

Tipo: `object`

Opções para obter uma string da área de transferência.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


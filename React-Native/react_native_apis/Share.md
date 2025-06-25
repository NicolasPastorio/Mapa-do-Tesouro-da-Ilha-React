# Share

A API `Share` no React Native fornece uma maneira de interagir com a funcionalidade de compartilhamento nativa do dispositivo. Isso permite que seu aplicativo compartilhe texto, URLs, imagens ou outros tipos de conteúdo com outros aplicativos instalados no dispositivo do usuário (como aplicativos de mensagens, e-mail, redes sociais, etc.). É uma funcionalidade essencial para a integração com o ecossistema do sistema operacional e para facilitar a disseminação de conteúdo do seu aplicativo.

## Métodos

### `share(content, options?)`
Abre a caixa de diálogo de compartilhamento nativa do dispositivo, permitindo que o usuário selecione um aplicativo para compartilhar o `content` fornecido. Retorna uma `Promise` que resolve com um objeto indicando o resultado da ação de compartilhamento.

-   `content`: (Objeto, obrigatório) O conteúdo a ser compartilhado. Pode ter as seguintes propriedades:
    -   `message`: (String, opcional) O texto principal a ser compartilhado. Em iOS, se `url` também for fornecido, o `message` será o corpo do e-mail ou a mensagem de texto. Em Android, será o texto principal.
    -   `url`: (String, opcional) Uma URL a ser compartilhada. Em iOS, isso pode ser um link para um site ou um arquivo local. Em Android, será tratado como um link.
    -   `title`: (String, opcional, Android apenas) O título da caixa de diálogo de compartilhamento no Android.

-   `options`: (Objeto, opcional) Opções adicionais para a ação de compartilhamento. Pode ter as seguintes propriedades:
    -   `dialogTitle`: (String, opcional, Android apenas) Um título para a caixa de diálogo de compartilhamento no Android, que aparece acima da lista de aplicativos.
    -   `excludedActivityTypes`: (Array de strings, opcional, iOS apenas) Um array de tipos de atividade que devem ser excluídos da lista de opções de compartilhamento (por exemplo, `["com.apple.UIKit.activity.PostToFacebook"]`).
    -   `tintColor`: (String, opcional, iOS apenas) A cor de tonalidade para os ícones na folha de compartilhamento do iOS (por exemplo, `"#FF0000"`).

### Resultado da Promise

A `Promise` retornada por `share()` resolve com um objeto que pode ter as seguintes propriedades:

-   `action`: (String) Indica o resultado da ação de compartilhamento. Pode ser:
    -   `Share.sharedAction`: O compartilhamento foi bem-sucedido.
    -   `Share.dismissedAction`: O usuário descartou a caixa de diálogo de compartilhamento sem selecionar um aplicativo ou completar o compartilhamento.
-   `activityType`: (String, opcional, iOS apenas) O tipo de atividade que foi selecionado pelo usuário (por exemplo, `"com.apple.UIKit.activity.Mail"`). Disponível apenas se `action` for `Share.sharedAction`.

## Exemplos de Uso

### Compartilhar Texto Simples

```javascript
import React from 'react';
import { View, Button, Share, Alert, StyleSheet } from 'react-native';

const ShareTextExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Confira este aplicativo incrível! É muito útil.',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Compartilhado com tipo de atividade: ${result.activityType}`);
        } else {
          console.log('Conteúdo compartilhado com sucesso.');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Caixa de diálogo de compartilhamento descartada.');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={onShare} title="Compartilhar Texto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareTextExample;
```

### Compartilhar URL e Mensagem

```javascript
import React from 'react';
import { View, Button, Share, Alert, StyleSheet } from 'react-native';

const ShareUrlExample = () => {
  const onShare = async () => {
    try {
      const result = await Share.share(
        {
          message: 'Visite nosso site para mais informações!',
          url: 'https://www.example.com',
        },
        {
          dialogTitle: 'Compartilhar Link',
          excludedActivityTypes: [
            'com.apple.UIKit.activity.PostToTwitter',
            'com.apple.UIKit.activity.PostToFacebook',
          ], // Exclui Twitter e Facebook no iOS
        }
      );

      if (result.action === Share.sharedAction) {
        console.log('URL e mensagem compartilhadas com sucesso.');
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento de URL e mensagem cancelado.');
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={onShare} title="Compartilhar URL" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareUrlExample;
```

### Compartilhar Imagem (Exemplo Conceitual)

Para compartilhar imagens, você geralmente precisa fornecer o URI local da imagem. Em alguns casos, pode ser necessário usar bibliotecas de terceiros para lidar com o compartilhamento de arquivos complexos ou para acessar arquivos do sistema de arquivos do dispositivo.

```javascript
import React from 'react';
import { View, Button, Share, Alert, StyleSheet } from 'react-native';

const ShareImageExample = () => {
  const onShareImage = async () => {
    try {
      // URI de uma imagem local (exemplo: imagem salva no cache do app)
      const imageUrl = 'file:///data/user/0/com.yourapp/cache/my_image.jpg'; 
      
      const result = await Share.share({
        url: imageUrl,
        message: 'Confira esta imagem incrível!',
      });

      if (result.action === Share.sharedAction) {
        console.log('Imagem compartilhada com sucesso.');
      } else if (result.action === Share.dismissedAction) {
        console.log('Compartilhamento de imagem cancelado.');
      }
    } catch (error) {
      Alert.alert(`Erro ao compartilhar imagem: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={onShareImage} title="Compartilhar Imagem" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShareImageExample;
```

## Considerações

-   **Experiência Nativa:** A API `Share` utiliza as folhas de compartilhamento nativas do sistema operacional, proporcionando uma experiência de usuário familiar e consistente.
-   **Tipos de Conteúdo:** A capacidade de compartilhar diferentes tipos de conteúdo (texto, URLs, imagens) torna esta API muito versátil.
-   **Tratamento de Erros:** É importante incluir blocos `try-catch` ao chamar `Share.share()` para lidar com possíveis erros, como o usuário não ter nenhum aplicativo de compartilhamento compatível instalado ou o compartilhamento ser cancelado.
-   **Privacidade:** Esteja ciente das implicações de privacidade ao compartilhar dados do usuário. Certifique-se de que o usuário esteja ciente do que está sendo compartilhado.
-   **Diferenças de Plataforma:** Embora a API seja unificada, as opções e o comportamento da caixa de diálogo de compartilhamento podem variar ligeiramente entre iOS e Android. Por exemplo, `dialogTitle` e `excludedActivityTypes` são específicos de uma plataforma.
-   **Compartilhamento de Arquivos:** Para compartilhar arquivos que não são URLs (como PDFs, vídeos), você pode precisar de bibliotecas de terceiros que forneçam acesso mais robusto ao sistema de arquivos ou que convertam o arquivo para um formato compartilhável via URI.


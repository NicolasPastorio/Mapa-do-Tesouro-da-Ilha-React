# Compositor de E-mail (MailComposer)

Uma biblioteca que fornece funcionalidade para compor e enviar e-mails com a interface de usuário específica do sistema.

**Android, iOS (apenas dispositivo), Web**

`expo-mail-composer` permite que você componha e envie e-mails de forma rápida e fácil usando a interface do usuário do sistema operacional. Este módulo não pode ser usado em simuladores iOS, pois você não pode fazer login em uma conta de e-mail neles.

## Instalação

Para instalar a API MailComposer, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-mail-composer
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as MailComposer from 'expo-mail-composer';
```

### Métodos

#### `MailComposer.composeAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` | `MailComposerOptions` | Um mapa que define os dados para preencher o e-mail. |

Abre um modal de e-mail para iOS e uma intenção de aplicativo de e-mail para Android e preenche os campos com os dados fornecidos. No iOS, você precisará estar logado no aplicativo Mail.

Retorna uma promessa que é cumprida com um objeto contendo um campo `status` que especifica se um e-mail foi enviado, salvo ou cancelado. O Android não fornece essas informações, então o status é sempre definido como se o e-mail tivesse sido enviado.

#### `MailComposer.getClients()`

Recupera uma lista de clientes de e-mail disponíveis instalados no dispositivo. Isso pode ser usado para apresentar opções ao usuário para enviar e-mails através de seu cliente de e-mail preferido, ou para abrir um cliente de e-mail para que o usuário possa acessar sua caixa de correio — por exemplo, para abrir um e-mail de confirmação enviado pelo seu aplicativo.

Retorna um array de clientes de e-mail disponíveis.

#### `MailComposer.isAvailableAsync()`

Determina se a API `MailComposer` pode ser usada neste aplicativo.

Retorna uma promessa que se resolve com um booleano indicando se a API está disponível.

## Tipos

#### `MailClient`

Representa um cliente de e-mail disponível no dispositivo.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `label` | `string` | O nome de exibição do cliente de e-mail. |
| `packageName` (opcional) | `string` | **Apenas para Android:** O nome do pacote do aplicativo cliente de e-mail. Você pode usar este nome de pacote com as funções [`getApplicationIconAsync`](https://docs.expo.dev/versions/latest/sdk/intent-launcher/#intentlaunchergetapplicationiconasync) ou [`openApplication`](https://docs.expo.dev/versions/latest/sdk/intent-launcher/#intentlauncheropenapplicationasync) de [`expo-intent-launcher`](https://docs.expo.dev/versions/latest/sdk/intent-launcher/) para recuperar o ícone do aplicativo ou abrir o cliente de e-mail diretamente. |
| `url` (opcional) | `string` | **Apenas para iOS:** O esquema de URL do cliente de e-mail. Você pode usar este URL com a função [`openURL`](https://docs.expo.dev/versions/latest/sdk/linking/#linkingopenurlurl) de [`expo-linking`](https://docs.expo.dev/versions/latest/sdk/linking/) para abrir o cliente de e-mail. |

#### `MailComposerOptions`

Um mapa que define os dados para preencher o e-mail.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `attachments` (opcional) | `string[]` | Um array de URIs de arquivos internos do aplicativo para anexar. |
| `bccRecipients` (opcional) | `string[]` | Um array de endereços de e-mail dos destinatários com cópia oculta (BCC). |
| `body` (opcional) | `string` | Corpo do e-mail. |
| `ccRecipients` (opcional) | `string[]` | Um array de endereços de e-mail dos destinatários com cópia (CC). |
| `isHtml` (opcional) | `boolean` | Se o corpo contém tags HTML para que possa ser formatado corretamente. Não funciona perfeitamente no Android. |
| `recipients` (opcional) | `string[]` | Um array de endereços de e-mail dos destinatários. |
| `subject` (opcional) | `string` | Assunto do e-mail. |

#### `MailComposerResult`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `status` | `MailComposerStatus` | O status da operação de composição de e-mail. |

## Enums

#### `MailComposerStatus`

Enum que representa o status da operação de composição de e-mail.

*   `MailComposerStatus.CANCELLED` = `"cancelled"`
*   `MailComposerStatus.SAVED` = `"saved"`
*   `MailComposerStatus.SENT` = `"sent"`
*   `MailComposerStatus.UNDETERMINED` = `"undetermined"`

---

**Autor:** Manus AI
**Data de Geração:** 18 de Junho de 2025


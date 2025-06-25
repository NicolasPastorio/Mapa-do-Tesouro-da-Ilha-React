# SMS

Uma biblioteca que fornece acesso à UI/aplicativo do sistema para envio de mensagens SMS.

`expo-sms` fornece acesso à UI/aplicativo do sistema para envio de mensagens SMS com endereços e mensagens pré-preenchidos.

Retorna uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) que se resolve quando a ação de envio de SMS é invocada pelo usuário, com o resultado correspondente:

*   Se o usuário cancelou o processo de envio de SMS: `{ result: 'cancelled' }`.
*   Se o usuário enviou/agendou a mensagem para envio: `{ result: 'sent' }`.
*   Se o status da mensagem SMS não puder ser determinado: `{ result: 'unknown' }`.

O Android não fornece informações sobre o status da mensagem SMS, portanto, em dispositivos Android, a Promise sempre será resolvida com `{ result: 'unknown' }`.

> **Nota:** O único feedback coletado por este módulo é se alguma mensagem foi enviada. Isso significa que não verificamos o conteúdo real da mensagem nem a lista de destinatários.

## Exemplo

```javascript
import * as SMS from 'expo-sms';

async function sendSMS() {
  const isAvailable = await SMS.isAvailableAsync();
  if (isAvailable) {
    const { result } = await SMS.sendSMSAsync(
      ["0123456789", "9876543210"], // Números de telefone dos destinatários
      "Minha mensagem de exemplo HelloWorld", // Corpo da mensagem
      {
        attachments: {
          uri: "path/myfile.png", // URI do arquivo a ser anexado
          mimeType: "image/png", // Tipo MIME do anexo
          filename: "myfile.png", // Nome do arquivo do anexo
        },
      }
    );
    console.log("Resultado do envio de SMS:", result);
  } else {
    console.log("O serviço de SMS não está disponível neste dispositivo.");
  }
}

sendSMS();
```

## Instalação

Para instalar a API SMS, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sms
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## API

```javascript
import * as SMS from 'expo-sms';
```

### Métodos

#### `SMS.isAvailableAsync()`

Determina se o SMS está disponível neste aplicativo.

Retorna uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) que se resolve com um `boolean`, indicando se o SMS está disponível neste dispositivo.

> **Nota:** Sempre retorna `false` no simulador iOS e no navegador.

#### `SMS.sendSMSAsync(addresses, message, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `addresses` | `string[]` ou `string` | Um array de endereços (números de telefone) ou um único endereço passado como strings. Estes aparecerão como destinatários da mensagem preparada. |
| `message` | `string` | O corpo da mensagem a ser enviada. |
| `options` (opcional) | `SMSOptions` | Um mapa de opções de SMS. Padrão: `{}`. |

Abre a UI/aplicativo padrão para envio de mensagens SMS com endereços e mensagens pré-preenchidos. Retorna uma [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) que se resolve com um objeto `SMSResponse`.

### Tipos

#### `SMSAttachment`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `uri` | `string` | URI do arquivo a ser anexado. |
| `mimeType` | `string` | Tipo MIME do anexo (por exemplo, `image/png`, `application/pdf`). |
| `filename` | `string` | Nome do arquivo do anexo. |

Um objeto que representa um anexo de SMS.

#### `SMSOptions`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `attachments` (opcional) | `SMSAttachment` | Um objeto `SMSAttachment` para anexar um arquivo à mensagem. |

Um objeto que representa as opções para o envio de SMS.

#### `SMSResponse`

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `result` | `string` | O resultado da operação de envio de SMS. Pode ser `cancelled`, `sent` ou `unknown`. |

Um objeto que representa a resposta da operação de envio de SMS.

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025


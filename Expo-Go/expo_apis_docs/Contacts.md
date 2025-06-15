# Contatos (Contacts)

Uma biblioteca que fornece acesso aos contatos do sistema do telefone.

`expo-contacts` fornece acesso aos contatos do sistema do dispositivo, permitindo que você obtenha informações de contato, bem como adicione, edite ou remova contatos.

No iOS, os contatos têm um sistema de agrupamento em várias camadas que você também pode acessar por meio desta API.

## Instalação

Para instalar a API Contacts, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-contacts
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `expo-contacts` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito.

### Exemplo de `app.json` com plugin de configuração

```json
{
  "expo": {
    "plugins": [
      [
        "expo-contacts",
        {
          "contactsPermission": "Permitir que $(PRODUCT_NAME) acesse seus contatos."
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `contactsPermission` | `"Permitir que $(PRODUCT_NAME) acesse seus contatos"` | **Apenas para iOS:** Uma string para definir a mensagem de permissão `NSContactsUsageDescription`. |

Se você não estiver usando a Geração Nativa Contínua ([CNG](https://docs.expo.dev/workflow/continuous-native-generation/)) (você está usando projetos Android e iOS nativos manualmente), então você precisa configurar as seguintes permissões em seus projetos nativos:

*   Para Android, adicione as permissões `android.permission.READ_CONTACTS` e `android.permission.WRITE_CONTACTS` ao arquivo `android/app/src/main/AndroidManifest.xml` do seu projeto:

    ```xml
    <uses-permission android:name="android.permission.READ_CONTACTS" />
    <uses-permission android:name="android.permission.WRITE_CONTACTS" />
    ```

*   Para iOS, adicione a chave `NSContactsUsageDescription` ao seu `ios/[app]/Info.plist`:

    ```xml
    <key>NSContactsUsageDescription</key>
    <string>Permitir que $(PRODUCT_NAME) acesse seus contatos</string>
    ```

## Uso

```javascript
import { useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        if (data.length > 0) {
          const contact = data[0];
          console.log(contact);
        }
      }
    })();
  }, []);

  const addContact = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === 'granted') {
      const contact = {
        firstName: 'John',
        lastName: 'Doe',
        emails: [{
          email: 'john.doe@example.com',
          label: 'work',
        }],
        phoneNumbers: [{
          number: '123-456-7890',
          label: 'mobile',
        }],
      };
      const contactId = await Contacts.addContactAsync(contact);
      console.log('Contato adicionado com ID:', contactId);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Exemplo do Módulo de Contatos</Text>
      <Button title="Adicionar Contato" onPress={addContact} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

## API

```javascript
import * as Contacts from 'expo-contacts';
```

### Componente `ContactAccessButton`

Tipo: `React.PureComponent`

Cria um botão de acesso a contatos para adicionar contatos rapidamente sob autorização de acesso limitado.

Para mais detalhes, você pode ler a documentação da Apple sobre a visualização subjacente [`ContactAccessButton`](https://developer.apple.com/documentation/contactsui/cncontactaccessbutton) do SwiftUI.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `backgroundColor` (opcional) | `ColorValue` | Uma cor de fundo do botão. A cor fornecida não deve ser transparente, caso contrário, pode não satisfazer os requisitos da plataforma para legibilidade do botão. |
| `caption` (opcional) | `string` | Quando a consulta produz um único resultado, o botão de acesso ao contato mostra a legenda sob o nome do contato correspondente. Pode ser nada (padrão), endereço de e-mail ou número de telefone. Valores aceitáveis são: `default`, `email`, `phone`. |
| `excludedEmailAddresses` (opcional) | `string[]` | Um array de endereços de e-mail. A pesquisa omite contatos que correspondem à consulta e também correspondem a qualquer endereço de e-mail neste array. |
| `excludedPhoneNumbers` (opcional) | `string[]` | Um array de números de telefone. A pesquisa omite contatos que correspondem à consulta e também correspondem a qualquer número de telefone neste conjunto. |

### Métodos Estáticos

#### `Contacts.isAvailable()`

Retorna um booleano indicando se a API de contatos está disponível no dispositivo.

### Métodos

#### `Contacts.addContactAsync(contact)`

Adiciona um novo contato ao dispositivo. Retorna uma promessa que se resolve com o ID do contato recém-criado.

#### `Contacts.addExistingContactToGroupAsync(contactId, groupId)`

Adiciona um contato existente a um grupo. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Contacts.addExistingGroupToContainerAsync(groupId, containerId)`

Adiciona um grupo existente a um contêiner. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Contacts.createGroupAsync(groupName, containerId)`

Cria um novo grupo de contatos. Retorna uma promessa que se resolve com o ID do grupo recém-criado.

#### `Contacts.getContactByIdAsync(contactId, fields)`

Obtém um contato pelo seu ID. Retorna uma promessa que se resolve com o objeto do contato.

#### `Contacts.getContactsAsync(options)`

Obtém uma lista de contatos do dispositivo. Retorna uma promessa que se resolve com um objeto contendo os dados dos contatos.

#### `Contacts.getContainersAsync()`

Obtém uma lista de contêineres de contatos. Retorna uma promessa que se resolve com um array de objetos de contêiner.

#### `Contacts.getDefaultContainerIdAsync()`

Obtém o ID do contêiner padrão. Retorna uma promessa que se resolve com o ID do contêiner padrão.

#### `Contacts.getGroupsAsync(options)`

Obtém uma lista de grupos de contatos. Retorna uma promessa que se resolve com um array de objetos de grupo.

#### `Contacts.getPagedContactsAsync(options)`

Obtém uma lista paginada de contatos. Retorna uma promessa que se resolve com um objeto contendo os dados dos contatos e informações de paginação.

#### `Contacts.getPermissionsAsync()`

Verifica as permissões do usuário para acessar os contatos.

#### `Contacts.presentAccessPickerAsync(options)`

Abre um seletor de acesso a contatos para permitir que o usuário conceda acesso a contatos específicos.

#### `Contacts.presentContactPickerAsync(options)`

Abre um seletor de contatos para permitir que o usuário selecione um ou mais contatos.

#### `Contacts.presentFormAsync(contactId, formType, options)`

Abre um formulário para criar, editar ou visualizar um contato.

#### `Contacts.removeContactAsync(contactId)`

Remove um contato do dispositivo. Use com cautela.

#### `Contacts.removeContactFromGroupAsync(contactId, groupId)`

Remove um contato de um grupo. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Contacts.removeGroupAsync(groupId)`

Remove um grupo de contatos. Use com cautela.

#### `Contacts.requestPermissionsAsync()`

Solicita ao usuário que conceda permissões para acessar os contatos.

#### `Contacts.shareContactAsync(contactId, message)`

Compartilha um contato com outros aplicativos.

#### `Contacts.updateContactAsync(contact)`

Atualiza um contato existente. Retorna uma promessa que se resolve com o ID do contato atualizado.

#### `Contacts.updateGroupAsync(group)`

Atualiza um grupo existente. Retorna uma promessa que se resolve com o ID do grupo atualizado.

### Tipos e Interfaces

*   **`Contact`**: Objeto que representa um contato.
*   **`Group`**: Objeto que representa um grupo de contatos.
*   **`Container`**: Objeto que representa um contêiner de contatos (por exemplo, iCloud, Google).
*   **`Field`**: Enum que representa os campos de contato disponíveis (por exemplo, `Emails`, `PhoneNumbers`).
*   **`FormType`**: Enum que representa os tipos de formulário de contato (`New`, `Edit`, `View`).

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


# Seletor de Documentos (DocumentPicker)

Uma biblioteca que fornece acesso à UI do sistema para selecionar documentos dos provedores disponíveis no dispositivo do usuário.

`expo-document-picker` fornece acesso à UI do sistema para selecionar documentos dos provedores disponíveis no dispositivo do usuário.

## Instalação

Para instalar a API DocumentPicker, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-document-picker
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `expo-document-picker` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito. Se o seu aplicativo não usa o EAS Build, você precisará configurar o pacote manualmente.

### Exemplo de `app.json` com plugin de configuração

Se você deseja habilitar os [recursos de armazenamento do iCloud](https://docs.expo.dev/versions/latest/sdk/document-picker/#icloud-storage-features), defina a chave `expo.ios.usesIcloudStorage` como `true` no arquivo de [configuração do aplicativo](https://docs.expo.dev/versions/latest/config/app/) conforme especificado nas [propriedades de configuração](https://docs.expo.dev/versions/latest/sdk/document-picker/#configurable-properties).

Executar o [EAS Build](https://docs.expo.dev/build/introduction/) localmente usará a [assinatura de recursos do iOS](https://docs.expo.dev/build/ios-capabilities/) para habilitar os recursos necessários antes da construção.

```json
{
  "expo": {
    "plugins": [
      [
        "expo-document-picker",
        {
          "iCloudContainerEnvironment": "Production"
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `iCloudContainerEnvironment` | `undefined` | **Apenas para iOS:** Define o direito `com.apple.developer.icloud-container-environment` do iOS usado para builds AdHoc do iOS. Valores possíveis: `Development`, `Production`. [Saiba mais](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_icloud-container-environment). |
| `kvStoreIdentifier` | `undefined` | **Apenas para iOS:** Substitui o direito padrão `com.apple.developer.ubiquity-kvstore-identifier` do iOS, que usa seu ID de Equipe da Apple e identificador de pacote. Isso pode ser necessário se seu aplicativo foi transferido para outra Equipe da Apple após habilitar o armazenamento do iCloud. |

Se você estiver usando esta biblioteca em um aplicativo React Native existente:

Aplicativos que não usam o [EAS Build](https://docs.expo.dev/build/introduction/) e desejam [recursos de armazenamento do iCloud](https://docs.expo.dev/versions/latest/sdk/document-picker/#icloud-storage-features) devem [configurar manualmente](https://docs.expo.dev/build/ios-capabilities/#manual-configuration) o [serviço iCloud com suporte a CloudKit](https://developer.apple.com/documentation/cloudkit/setting_up_icloud_for_your_app) para seu identificador de pacote.

Se você habilitar o recurso iCloud através do [Apple Developer Console](https://developer.apple.com/account/resources/identifiers/list), certifique-se de adicionar os seguintes direitos em seu arquivo `ios/[app]/[app].entitlements` (onde `dev.expo.my-app` é o seu identificador de pacote):

```xml
<key>com.apple.developer.icloud-container-identifiers</key>
<array>
    <string>iCloud.dev.expo.my-app</string>
</array>
<key>com.apple.developer.icloud-services</key>
<array>
    <string>CloudDocuments</string>
</array>
<key>com.apple.developer.ubiquity-container-identifiers</key>
<array>
    <string>iCloud.dev.expo.my-app</string>
</array>
<key>com.apple.developer.ubiquity-kvstore-identifier</key>
<string>$(TeamIdentifierPrefix)dev.expo.my-app</string>
```

O Apple Developer Console também exige que um Contêiner iCloud seja criado. Ao registrar o novo contêiner, você é solicitado a fornecer uma descrição e um identificador para o contêiner. Você pode inserir qualquer nome na descrição. No identificador, adicione `iCloud.<seu_identificador_de_pacote>` (o mesmo valor usado para os direitos `com.apple.developer.icloud-container-identifiers` e `com.apple.developer.ubiquity-container-identifiers`).

## Usando com `expo-file-system`

Ao usar `expo-document-picker` com [`expo-file-system`](https://docs.expo.dev/versions/latest/sdk/file-system/), nem sempre é possível para o sistema de arquivos ler o arquivo imediatamente após o `expo-document-picker` selecioná-lo.

Para permitir que o `expo-file-system` leia o arquivo imediatamente após ser selecionado, você precisará garantir que a opção [`copyToCacheDirectory`](https://docs.expo.dev/versions/latest/sdk/document-picker/#documentpickeroptions) esteja definida como `true`.

## API

```javascript
import * as DocumentPicker from 'expo-document-picker';
```

### Métodos

#### `DocumentPicker.getDocumentAsync(options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `options` (opcional) | `DocumentPickerOptions` | Opções para o seletor de documentos. |

Exibe a UI do sistema para escolher um documento. Por padrão, o arquivo escolhido é copiado para o [diretório de cache interno do aplicativo](https://docs.expo.dev/versions/latest/sdk/file-system/#filesystemcachedirectory). Retorna uma promessa que se resolve com um objeto `DocumentPickerResult`.

> **Notas para Web:** A UI do sistema só pode ser exibida após a ativação do usuário (por exemplo, um clique em um `Button`). Portanto, chamar `getDocumentAsync` em um contexto que não seja de interação do usuário (como `useEffect` sem um evento de clique) pode não funcionar.

### Tipos

#### `DocumentPickerAsset`

Tipo: `object`

Um objeto que representa um ativo de documento selecionado, contendo informações como `uri`, `name`, `size` e `mimeType`.

#### `DocumentPickerCanceledResult`

Tipo: `object`

Um objeto que representa um resultado de seleção de documento cancelado, com a propriedade `canceled` definida como `true`.

#### `DocumentPickerOptions`

Tipo: `object`

Opções para o seletor de documentos, incluindo `type` (tipos de arquivo permitidos), `copyToCacheDirectory` (se o arquivo deve ser copiado para o cache do aplicativo) e `multiple` (se vários arquivos podem ser selecionados).

#### `DocumentPickerResult`

Tipo: `object`

Um tipo de união que pode ser `DocumentPickerSuccessResult` ou `DocumentPickerCanceledResult`.

#### `DocumentPickerSuccessResult`

Tipo: `object`

Um objeto que representa um resultado de seleção de documento bem-sucedido, com a propriedade `canceled` definida como `false` e uma propriedade `assets` contendo um array de objetos `DocumentPickerAsset`.

---

**Autor:** Manus AI
**Data de Geração:** 14 de Junho de 2025


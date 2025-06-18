# Sistema de Arquivos (FileSystem)

Uma biblioteca que fornece acesso ao sistema de arquivos local no dispositivo.

`expo-file-system` fornece acesso a um sistema de arquivos armazenado localmente no dispositivo. Ele também é capaz de fazer upload e download de arquivos de URLs de rede.

## Instalação

Para instalar a API FileSystem, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-file-system
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Download de arquivos

```javascript
import * as FileSystem from 'expo-file-system';

const downloadFile = async () => {
  const uri = 'http://techslides.com/demos/sample-videos/small.mp4';
  const fileUri = FileSystem.documentDirectory + 'small.mp4';

  const downloadResumable = FileSystem.createDownloadResumable(
    uri,
    fileUri,
    {},
    (downloadProgress) => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      console.log(`Progresso do download: ${progress * 100}%`);
    }
  );

  try {
    const { uri } = await downloadResumable.downloadAsync();
    console.log('Download concluído para ', uri);
  } catch (e) {
    console.error(e);
  }
};

// Chame a função para iniciar o download
downloadFile();
```

### Gerenciando Giphy's (Exemplo de uso com diretórios e arquivos)

```javascript
import * as FileSystem from 'expo-file-system';

const gifDir = FileSystem.cacheDirectory + 'giphy/';
const gifFileUri = (gifId) => gifDir + `gif_${gifId}_200.gif`;
const gifUrl = (gifId) => `https://media1.giphy.com/media/${gifId}/200.gif`;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(gifDir);
  if (!dirInfo.exists) {
    console.log("Diretório de Gifs não existe, criando...");
    await FileSystem.makeDirectoryAsync(gifDir, { intermediates: true });
  }
}

export async function addMultipleGifs(gifIds) {
  try {
    await ensureDirExists();

    console.log('Baixando', gifIds.length, 'arquivos gif...');
    await Promise.all(gifIds.map(id => FileSystem.downloadAsync(gifUrl(id), gifFileUri(id))));
    console.log('Downloads concluídos!');
  } catch (e) {
    console.error("Não foi possível baixar os arquivos gif:", e);
  }
}

export async function getSingleGif(gifId) {
  await ensureDirExists();

  const fileUri = gifFileUri(gifId);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log("Gif não está em cache localmente. Baixando...");
    await FileSystem.downloadAsync(gifUrl(gifId), fileUri);
  }

  return fileUri;
}

// Exemplo de uso
// addMultipleGifs(['l0HlK9C7q7w', 'l0HlK9C7q7w']);
// getSingleGif('l0HlK9C7q7w').then(uri => console.log('URI do Gif:', uri));
```

## API

```javascript
import * as FileSystem from 'expo-file-system';
```

### Diretórios

*   **`FileSystem.bundleDirectory`**: O URI do diretório do pacote do aplicativo. Somente leitura.
*   **`FileSystem.cacheDirectory`**: O URI do diretório de cache do aplicativo. Arquivos neste diretório podem ser excluídos pelo sistema operacional a qualquer momento.
*   **`FileSystem.documentDirectory`**: O URI do diretório de documentos do aplicativo. Arquivos neste diretório são persistentes e não são excluídos pelo sistema operacional.

### Métodos

#### `FileSystem.copyAsync(options)`

Copia um arquivo ou diretório de um local para outro. Retorna uma promessa que se resolve quando a operação é concluída.

#### `FileSystem.createDownloadResumable(uri, fileUri, options, callback, resumeData)`

Cria um objeto `DownloadResumable` que pode ser usado para baixar arquivos e retomar downloads interrompidos.

#### `FileSystem.createUploadTask(url, fileUri, options, callback)`

Cria um objeto `UploadTask` que pode ser usado para fazer upload de arquivos.

#### `FileSystem.deleteAsync(fileUri, options)`

Exclui um arquivo ou diretório. Retorna uma promessa que se resolve quando a operação é concluída.

#### `FileSystem.deleteLegacyDocumentDirectoryAndroid()`

Exclui o diretório de documentos legado no Android. Use com cautela.

#### `FileSystem.downloadAsync(uri, fileUri, options)`

Baixa um arquivo de uma URL para o sistema de arquivos local. Retorna uma promessa que se resolve com um objeto contendo o URI do arquivo baixado.

#### `FileSystem.getContentUriAsync(fileUri)`

Retorna um URI de conteúdo para um arquivo local, que pode ser usado para compartilhar o arquivo com outros aplicativos (apenas Android).

#### `FileSystem.getFreeDiskStorageAsync()`

Retorna uma promessa que se resolve com a quantidade de espaço livre em disco no dispositivo em bytes.

#### `FileSystem.getInfoAsync(fileUri, options)`

Retorna uma promessa que se resolve com informações sobre um arquivo ou diretório (por exemplo, `exists`, `isDirectory`, `size`, `uri`).

#### `FileSystem.getTotalDiskCapacityAsync()`

Retorna uma promessa que se resolve com a capacidade total do disco no dispositivo em bytes.

#### `FileSystem.makeDirectoryAsync(fileUri, options)`

Cria um novo diretório. Retorna uma promessa que se resolve quando a operação é concluída.

#### `FileSystem.moveAsync(options)`

Move um arquivo ou diretório de um local para outro. Retorna uma promessa que se resolve quando a operação é concluída.

#### `FileSystem.readAsStringAsync(fileUri, options)`

Lê o conteúdo de um arquivo como uma string. Retorna uma promessa que se resolve com o conteúdo do arquivo.

#### `FileSystem.readDirectoryAsync(fileUri)`

Lê o conteúdo de um diretório. Retorna uma promessa que se resolve com um array de nomes de arquivos e diretórios.

#### `FileSystem.uploadAsync(url, fileUri, options)`

Faz upload de um arquivo para uma URL. Retorna uma promessa que se resolve com a resposta do servidor.

#### `FileSystem.writeAsStringAsync(fileUri, contents, options)`

Escreve uma string em um arquivo. Retorna uma promessa que se resolve quando a operação é concluída.

### Classes

#### `DownloadResumable`

Uma classe que representa um download que pode ser pausado e retomado.

#### `FileSystemCancellableNetworkTask`

Uma classe base para tarefas de rede que podem ser canceladas.

#### `UploadTask`

Uma classe que representa uma tarefa de upload.

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


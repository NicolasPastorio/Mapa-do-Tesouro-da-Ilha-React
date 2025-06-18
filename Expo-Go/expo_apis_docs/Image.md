# Imagem (Image)

Um componente React multiplataforma e performático que carrega e renderiza imagens.

`expo-image` é um componente React multiplataforma que carrega e renderiza imagens.

Principais características:

*   Projetado para velocidade
*   Suporte para muitos formatos de imagem (incluindo animados)
*   Cache em disco e memória
*   Suporta [BlurHash](https://blurha.sh/) e [ThumbHash](https://github.com/evanw/thumbhash) - representações compactas de um placeholder para uma imagem
*   Transição entre imagens quando a fonte muda (sem mais cintilação!)
*   Implementa as propriedades CSS [`object-fit`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit) e [`object-position`](https://developer.mozilla.org/en-US/docs/Web/CSS/object-position) (veja as props `contentFit` e `contentPosition`)
*   Usa [`SDWebImage`](https://github.com/SDWebImage/SDWebImage) e [`Glide`](https://github.com/bumptech/glide) performáticos por baixo dos panos

#### Formatos de imagem suportados

| Formato | Android | iOS | Web |
| --- | --- | --- | --- |
| WebP | ✅ | ✅ | ✅ |
| PNG / APNG | ✅ | ✅ | ✅ |
| AVIF | ✅ | ✅ | ✅ |
| HEIC | ✅ | ✅ | [ainda não adotado](https://caniuse.com/heif) |
| JPEG | ✅ | ✅ | ✅ |
| GIF | ✅ | ✅ | ✅ |

## Instalação

Para instalar a API Image, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-image
```

## Uso

```javascript
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

const blurhash = 
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source="https://picsum.photos/seed/696/3000/2000"
        placeholder={blurhash}
        contentFit="cover"
        transition={1000}
      />
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
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#0553',
  },
});
```

## API

```javascript
import { Image, ImageBackground } from 'expo-image';
```

### Componentes

#### `<Image />`

Um componente React Native para exibir diferentes tipos de imagens, incluindo imagens de rede, recursos estáticos, imagens locais temporárias e imagens do disco local.

#### `<ImageBackground />`

Um componente que permite exibir uma imagem como plano de fundo de outros componentes.

### Métodos Estáticos

#### `Image.clearDiskCache()`

Limpa o cache de disco para imagens. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Image.clearMemoryCache()`

Limpa o cache de memória para imagens. Retorna uma promessa que se resolve quando a operação é concluída.

#### `Image.generateBlurhashAsync(uri, options)`

Gera um BlurHash para uma imagem. Retorna uma promessa que se resolve com a string BlurHash.

#### `Image.getCachePathAsync(cacheKey)`

Obtém o caminho do cache para uma chave de cache específica. Retorna uma promessa que se resolve com o caminho do cache ou `null` se não encontrado.

#### `Image.loadAsync(source)`

Carrega uma imagem de forma assíncrona. Retorna uma promessa que se resolve quando a imagem é carregada.

#### `Image.prefetch(urls)`

Pré-busca imagens de URLs especificadas. Útil para carregar imagens antes que elas sejam exibidas.

### Métodos do Componente

#### `imageRef.getAnimatableRef()`

Retorna uma referência animável para o componente de imagem.

#### `imageRef.lockResourceAsync()`

Bloqueia o recurso da imagem, impedindo que seja descarregado da memória. Retorna uma promessa que se resolve quando o recurso é bloqueado.

#### `imageRef.reloadAsync()`

Recarrega a imagem. Retorna uma promessa que se resolve quando a imagem é recarregada.

#### `imageRef.startAnimating()`

Inicia a animação de uma imagem animada (por exemplo, GIF).

#### `imageRef.stopAnimating()`

Para a animação de uma imagem animada.

#### `imageRef.unlockResourceAsync()`

Desbloqueia o recurso da imagem, permitindo que seja descarregado da memória. Retorna uma promessa que se resolve quando o recurso é desbloqueado.

### Hooks

#### `useImage(source)`

Um hook React que carrega uma imagem e retorna o status do carregamento e a imagem carregada.

### Classes

#### `ImageRef`

Uma classe que representa uma referência a um componente de imagem.

### Tipos

#### `ImageContentPosition`

Tipo: `string` ou `object`

Define a posição do conteúdo da imagem dentro do componente. Semelhante à propriedade CSS `object-position`.

#### `ImageContentPositionValue`

Tipo: `string` ou `number`

Um valor para a posição do conteúdo da imagem.

#### `ImageErrorEventData`

Tipo: `object`

Dados do evento de erro de carregamento da imagem.

#### `ImageLoadEventData`

Tipo: `object`

Dados do evento de carregamento bem-sucedido da imagem.

---

**Autor:** Manus AI
**Data de Geração:** 15 de Junho de 2025


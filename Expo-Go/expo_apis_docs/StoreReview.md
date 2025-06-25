# Revisão da Loja (StoreReview)

Uma biblioteca que fornece acesso a APIs nativas para avaliações no aplicativo.

`expo-store-review` é uma biblioteca que fornece acesso à API `ReviewManager` no Android 5+ e à API `SKStoreReviewController` no iOS. Ela permite que você peça ao usuário para avaliar seu aplicativo sem sair do próprio aplicativo.

## Instalação

Para instalar a API StoreReview, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-store-review
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

É importante que você siga as [Diretrizes de Interface Humana](https://developer.apple.com/design/human-interface-guidelines/ios/system-capabilities/ratings-and-reviews/) para iOS e as [Diretrizes](https://developer.android.com/guide/play/reviews/in-app-review) para Android ao usar esta API.

Especificamente:

*   Não chame `StoreReview.requestReview()` de um botão - em vez disso, tente chamá-lo depois que o usuário terminar alguma interação de assinatura no aplicativo.
*   Não envie spam ao usuário.
*   Não solicite uma avaliação quando o usuário estiver fazendo algo sensível ao tempo, como navegar.
*   Não faça perguntas ao usuário antes ou durante a apresentação do botão ou cartão de avaliação.

### Escrever avaliações

#### Android

Não há redirecionamento equivalente no Android, você ainda pode abrir a Play Store para as seções de avaliações usando o parâmetro de consulta `showAllReviews=true` assim:

```javascript
import * as Linking from 'expo-linking';

const androidPackageName = 'host.exp.exponent'; // Substitua pelo nome do pacote do seu aplicativo

// Abrir a Play Store para a seção de avaliações
Linking.openURL(
  `https://play.google.com/store/apps/details?id=${androidPackageName}&showAllReviews=true`
);

// Ou usar o esquema de URI do mercado
Linking.openURL(`market://details?id=${androidPackageName}&showAllReviews=true`);
```

#### iOS

Você pode redirecionar um usuário do aplicativo para a tela "Escrever uma Avaliação" para um aplicativo na App Store do iOS usando o parâmetro de consulta `action=write-review`. Por exemplo:

```javascript
import * as Linking from 'expo-linking';

const itunesItemId = 982107779; // Substitua pelo ID do seu aplicativo na iTunes Store

// Abrir a App Store para a seção de avaliações
Linking.openURL(`https://apps.apple.com/app/apple-store/id${itunesItemId}?action=write-review`);

// Ou usar o esquema de URI itms-apps
Linking.openURL(
  `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`
);
```

## API

```javascript
import * as StoreReview from 'expo-store-review';
```

## Métodos

### `StoreReview.hasAction()`

Retorna uma promessa que se resolve para `true` se `StoreReview.requestReview()` for capaz de direcionar o usuário para algum tipo de fluxo de revisão da loja. Se a configuração do aplicativo (`app.json`) não contiver URLs da loja e os recursos de revisão da loja nativa não estiverem disponíveis, a promessa será resolvida para `false`.

```javascript
import * as StoreReview from 'expo-store-review';

async function checkReviewAction() {
  if (await StoreReview.hasAction()) {
    console.log("A ação de revisão da loja está disponível.");
    // Você pode chamar StoreReview.requestReview() aqui ou em outro lugar apropriado
  } else {
    console.log("A ação de revisão da loja não está disponível.");
  }
}

checkReviewAction();
```

### `StoreReview.isAvailableAsync()`

Determina se a plataforma tem os recursos para usar `StoreReview.requestReview()`.

```javascript
import * as StoreReview from 'expo-store-review';

async function checkAvailability() {
  const isAvailable = await StoreReview.isAvailableAsync();
  if (isAvailable) {
    console.log("A API StoreReview está disponível neste dispositivo.");
  } else {
    console.log("A API StoreReview não está disponível neste dispositivo.");
  }
}

checkAvailability();
```

### `StoreReview.requestReview()`

Em circunstâncias ideais, isso abrirá um modal nativo e permitirá que o usuário selecione uma classificação por estrelas que será aplicada à App Store, sem sair do aplicativo. Se o dispositivo estiver executando uma versão do Android inferior a 5.0, isso tentará obter o URL da loja e vincular o usuário a ele.

Isso usa a API `Constants` para obter o `Constants.expoConfig.ios.appStoreUrl` no iOS, ou o `Constants.expoConfig.android.playStoreUrl` no Android.

Na Web, isso retornará `null`.

```javascript
import * as StoreReview from 'expo-store-review';

async function requestAppReview() {
  try {
    await StoreReview.requestReview();
    console.log("Solicitação de revisão enviada.");
  } catch (e) {
    console.error("Erro ao solicitar revisão:", e);
  }
}

// Chame esta função em um momento apropriado, por exemplo, após uma interação significativa do usuário
// requestAppReview();
```

### `StoreReview.storeUrl()`

Retorna o URL da loja de aplicativos para o aplicativo atual, se disponível. Na Web, isso retornará `null`.

```javascript
import * as StoreReview from 'expo-store-review';

async function getStoreUrl() {
  const url = await StoreReview.storeUrl();
  if (url) {
    console.log("URL da loja:", url);
  } else {
    console.log("URL da loja não disponível.");
  }
}

getStoreUrl();
```

## Códigos de Erro

### `ERR_STORE_REVIEW_FAILED`

Este erro ocorre quando a solicitação de revisão da loja não foi bem-sucedida.

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025


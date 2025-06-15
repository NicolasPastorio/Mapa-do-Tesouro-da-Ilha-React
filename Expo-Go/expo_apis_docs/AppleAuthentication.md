# Autenticação Apple

Uma biblioteca que fornece a capacidade de "Entrar com Apple" para iOS.

`expo-apple-authentication` fornece autenticação Apple para iOS. Ainda não oferece suporte a Android ou web.

Qualquer aplicativo que inclua opções de autenticação de terceiros deve fornecer a autenticação Apple como uma opção para cumprir as diretrizes de revisão da App Store. Para mais informações, consulte a autenticação Apple no site [Sign In with Apple](https://developer.apple.com/sign-in-with-apple/).

## Instalação

Para instalar a autenticação Apple, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-apple-authentication
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no `app.config`

Você pode configurar `expo-apple-authentication` usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário do aplicativo para ter efeito. Se o seu aplicativo não usar o EAS Build, você precisará configurar o pacote manualmente.

### Configuração do projeto iOS

Para habilitar a capacidade de "Entrar com Apple" em seu aplicativo, defina a propriedade [`ios.usesAppleSignIn`](https://docs.expo.dev/versions/latest/config/app/#iosusessignin) como `true` no `app.config` do seu projeto:

```json
{
  "expo": {
    "ios": {
      "usesAppleSignIn": true
    }
  }
}
```

### Exemplo de `app.json` com plugin de configuração

Executar o [EAS Build](https://docs.expo.dev/build/introduction/) localmente usará a [assinatura de capacidades iOS](https://docs.expo.dev/build/ios-capabilities/) para habilitar as capacidades necessárias antes da construção.

```json
{
  "expo": {
    "plugins": ["expo-apple-authentication"]
  }
}
```

Você está usando esta biblioteca em um aplicativo React Native existente?

Aplicativos que não usam o [EAS Build](https://docs.expo.dev/build/introduction/) devem [configurar manualmente](https://docs.expo.dev/guides/config-plugins/#manual-configuration) a capacidade de "Entrar com Apple" para seu identificador de pacote.

Se você habilitar a capacidade de "Entrar com Apple" através do [Apple Developer Console](https://developer.apple.com/account/resources/identifiers/list), certifique-se de adicionar os seguintes direitos em seu arquivo `ios/[app]/[app].entitlements`:

```xml
<key>com.apple.developer.applesignin</key>
<array>
  <string>Default</string>
</array>
```

Além disso, defina `CFBundleAllowMixedLocalizations` como `true` em seu `ios/[app]/Info.plist` para garantir que o botão de login use a localidade do dispositivo.

## Uso

Exemplo de uso da Autenticação Apple:

```javascript
import * as AppleAuthentication from 'expo-apple-authentication';
import { View, StyleSheet } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <AppleAuthentication.AppleAuthenticationButton
        buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
        buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
        cornerRadius={5}
        style={styles.button}
        onPress={async () => {
          try {
            const credential = await AppleAuthentication.signInAsync({
              requestedScopes: [
                AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                AppleAuthentication.AppleAuthenticationScope.EMAIL,
              ],
            });
            // ... faça algo com as credenciais
          } catch (e) {
            if (e.code === 'ERR_REQUEST_CANCELED') {
              // O usuário cancelou o login
            } else {
              // Outro erro ocorreu
              console.error(e);
            }
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 200,
    height: 44,
  },
});
```

## Desenvolvimento e Teste

Você pode testar esta biblioteca no Expo Go no iOS sem seguir nenhuma das instruções acima. No entanto, você precisará adicionar o plugin de configuração para usar esta biblioteca se estiver usando o EAS Build. Ao fazer login no Expo Go, os identificadores e valores que você recebe provavelmente serão diferentes do que você receberá em aplicativos autônomos.

Você pode fazer testes limitados desta biblioteca no Simulador iOS. No entanto, nem todos os métodos se comportarão da mesma forma que em um dispositivo, por isso, recomendamos fortemente testar em um dispositivo real sempre que possível durante o desenvolvimento.

## Verificando a Resposta da Apple

A resposta da Apple inclui um JWT assinado com informações sobre o usuário. Para garantir que a resposta veio da Apple, você pode verificar criptograficamente a assinatura com a chave pública da Apple, que é publicada em [https://appleid.apple.com/auth/keys](https://appleid.apple.com/auth/keys). Este processo não é específico do Expo.

## API

```javascript
import * as AppleAuthentication from 'expo-apple-authentication';
```

### Componente

#### `AppleAuthenticationButton`

Tipo: `React.Element<AppleAuthenticationButtonProps>`

Este componente exibe o botão proprietário "Entrar com Apple" / "Continuar com Apple" em sua tela. As Diretrizes da App Store exigem que você use este componente para iniciar o processo de autenticação em vez de um botão personalizado. A personalização limitada do botão está disponível através das propriedades fornecidas.

Você só deve tentar renderizar isso se `AppleAuthentication.isAvailableAsync()` resolver para `true`. Este componente não renderizará nada se não estiver disponível, e você receberá um aviso no modo de desenvolvimento (`__DEV__ === true`).

As propriedades deste componente se estendem de `View`; no entanto, você não deve tentar definir `backgroundColor` ou `borderRadius` com a propriedade `style`. Isso não funcionará e é contra as Diretrizes da App Store. Em vez disso, você deve usar a propriedade `buttonStyle` para escolher um dos estilos de cor predefinidos e a propriedade `cornerRadius` para alterar o raio da borda do botão.

Certifique-se de anexar altura e largura via as propriedades de estilo, pois sem esses estilos, o botão não aparecerá na tela.

> Veja: [Documentação da Apple](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidbutton) para mais detalhes.

**`AppleAuthenticationButtonProps`**

*   **`buttonStyle`**: O esquema de cores definido pela Apple para usar para exibir o botão. Valores aceitos: `AppleAuthenticationButtonStyle.BLACK`, `AppleAuthenticationButtonStyle.WHITE`, `AppleAuthenticationButtonStyle.WHITE_OUTLINE`.
*   **`buttonType`**: O tipo de texto do botão a ser exibido ("Entrar com Apple" vs. "Continuar com Apple"). Valores aceitos: `AppleAuthenticationButtonType.SIGN_IN`, `AppleAuthenticationButtonType.CONTINUE`.
*   **`cornerRadius`** (Opcional): O raio da borda a ser usado ao renderizar o botão. Isso funciona de forma semelhante a `style.borderRadius` em outras Views. Tipo: `number`.

### Métodos

*   **`formatFullName(fullName)`**: Formata um objeto `AppleAuthenticationFullName` em uma string legível.
*   **`getCredentialStateAsync(user)`**: Retorna o estado da credencial para um determinado ID de usuário Apple.
*   **`isAvailableAsync()`**: Retorna uma promessa que resolve para um booleano indicando se a autenticação Apple está disponível no dispositivo.
*   **`refreshAsync(options)`**: Atualiza as credenciais de autenticação Apple.
*   **`signInAsync(options)`**: Inicia o fluxo de autenticação Apple.
*   **`signOutAsync(options)`**: Encerra a sessão de autenticação Apple.

### Eventos

*   **`addRevokeListener(listener)`**: Adiciona um ouvinte para o evento de revogação de credenciais.

### Tipos e Interfaces

*   **`AppleAuthenticationCredential`**: Objeto que contém as credenciais retornadas após um login bem-sucedido.
*   **`AppleAuthenticationFullName`**: Objeto que representa o nome completo do usuário.
*   **`AppleAuthenticationFullNameFormatStyle`**: Estilo de formatação para o nome completo.
*   **`AppleAuthenticationRefreshOptions`**: Opções para o método `refreshAsync`.
*   **`AppleAuthenticationSignInOptions`**: Opções para o método `signInAsync`.
*   **`AppleAuthenticationSignOutOptions`**: Opções para o método `signOutAsync`.

---

**Autor:** Manus AI
**Data de Geração:** 13 de Junho de 2025


# Linking

A API `Linking` no React Native fornece uma interface para interagir com URLs, permitindo que seu aplicativo abra links externos (como páginas da web, e-mails, números de telefone) ou lide com links profundos (deep links) que apontam para conteúdo específico dentro do seu próprio aplicativo. Isso é fundamental para a integração com o ecossistema do dispositivo e para melhorar a experiência do usuário.

## Métodos

### `openURL(url)`
Tenta abrir a `url` fornecida usando o aplicativo apropriado no dispositivo. Por exemplo, uma URL `http://` abrirá o navegador, `mailto:` abrirá o cliente de e-mail, `tel:` abrirá o discador, etc. Retorna uma `Promise` que resolve se a URL foi aberta com sucesso e rejeita caso contrário.

```javascript
import React from 'react';
import { View, Button, Linking, StyleSheet, Alert } from 'react-native';

const OpenURLExample = () => {
  const openWebsite = async () => {
    const url = 'https://www.google.com';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Não foi possível abrir a URL: ${url}`);
      }
    } catch (error) {
      Alert.alert(`Erro ao abrir a URL: ${error.message}`);
    }
  };

  const callNumber = async () => {
    const url = 'tel:+1234567890';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Não foi possível fazer a ligação: ${url}`);
      }
    } catch (error) {
      Alert.alert(`Erro ao fazer a ligação: ${error.message}`);
    }
  };

  const sendEmail = async () => {
    const url = 'mailto:support@example.com?subject=Suporte&body=Olá, preciso de ajuda.';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Não foi possível enviar o e-mail: ${url}`);
      }
    } catch (error) {
      Alert.alert(`Erro ao enviar o e-mail: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Abrir Google" onPress={openWebsite} />
      <Button title="Ligar para (123) 456-7890" onPress={callNumber} />
      <Button title="Enviar E-mail" onPress={sendEmail} />
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

export default OpenURLExample;
```

### `canOpenURL(url)`
Verifica se o dispositivo é capaz de abrir a `url` fornecida. Retorna uma `Promise` que resolve para `true` se a URL pode ser aberta e `false` caso contrário. É uma boa prática usar `canOpenURL` antes de `openURL` para fornecer um feedback mais amigável ao usuário se a ação não for possível.

```javascript
// Exemplo de uso já incluído em openURL acima.
```

### `getInitialURL()`
Retorna uma `Promise` que resolve para a URL que iniciou o aplicativo (se houver). Isso é usado para lidar com deep links quando o aplicativo é aberto a partir de uma URL.

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, Linking, StyleSheet } from 'react-native';

const DeepLinkHandler = () => {
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    const getUrl = async () => {
      const url = await Linking.getInitialURL();
      if (url) {
        setInitialUrl(url);
        console.log('Aplicativo aberto com a URL:', url);
        // Aqui você pode parsear a URL e navegar para a tela apropriada
      }
    };

    getUrl();

    // Adiciona um ouvinte para URLs que abrem o aplicativo enquanto ele já está em execução
    const subscription = Linking.addEventListener('url', ({ url }) => {
      setInitialUrl(url);
      console.log('URL recebida enquanto o aplicativo estava ativo:', url);
      // Aqui você pode parsear a URL e navegar para a tela apropriada
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>URL Inicial: {initialUrl || 'Nenhuma'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DeepLinkHandler;
```

### `addEventListener(type, handler)`
Adiciona um ouvinte para eventos de URL. O `type` deve ser `'url'` e o `handler` é uma função que será chamada com um objeto contendo a URL recebida. Isso é usado para lidar com deep links quando o aplicativo já está em execução.

```javascript
// Exemplo de uso já incluído em getInitialURL acima.
```

### `removeEventListener(type, handler)`
Remove um ouvinte de evento de URL. É importante remover os ouvintes quando o componente que os adicionou é desmontado para evitar vazamentos de memória.

```javascript
// Exemplo de uso já incluído em getInitialURL acima.
```

## Configuração de Deep Linking

Para que seu aplicativo possa ser aberto por deep links, você precisa configurar seu projeto nativo:

### iOS

1.  **Info.plist:** Adicione um novo tipo de URL (URL Type) no seu `Info.plist`.
    ```xml
    <key>CFBundleURLTypes</key>
    <array>
      <dict>
        <key>CFBundleURLSchemes</key>
        <array>
          <string>your-app-scheme</string> <!-- Ex: myapp -->
        </array>
        <key>CFBundleURLName</key>
        <string>com.yourcompany.yourapp</string>
      </dict>
    </array>
    ```
2.  **AppDelegate.m (ou .mm):** Implemente os métodos `application:openURL:options:` e `application:continueUserActivity:restorationHandler:` para lidar com URLs recebidas.

### Android

1.  **AndroidManifest.xml:** Adicione um `intent-filter` à sua `Activity` principal para o esquema de URL desejado.
    ```xml
    <activity
        android:name=".MainActivity"
        android:launchMode="singleTask"
        android:exported="true">
        <intent-filter>
            <action android:name="android.intent.action.VIEW" />
            <category android:name="android.intent.category.DEFAULT" />
            <category android:name="android.intent.category.BROWSABLE" />
            <data android:scheme="your-app-scheme" android:host="" /> <!-- Ex: myapp -->
        </intent-filter>
    </activity>
    ```

## Considerações

-   **Segurança:** Ao lidar com URLs de fontes externas, sempre valide e sanitize os dados recebidos para evitar vulnerabilidades de segurança.
-   **Experiência do Usuário:** Use deep links para melhorar a navegação e a descoberta de conteúdo dentro do seu aplicativo. Por exemplo, um link em um e-mail pode levar o usuário diretamente para uma tela de produto específica.
-   **Universal Links (iOS) / App Links (Android):** Para uma experiência mais fluida, considere implementar Universal Links (iOS) e App Links (Android). Estes permitem que URLs HTTP/HTTPS abram seu aplicativo diretamente, em vez de abrir o navegador, se o aplicativo estiver instalado.
-   **Testes:** Teste exaustivamente seus deep links em diferentes cenários: aplicativo fechado, aplicativo em segundo plano, e com diferentes tipos de URLs.


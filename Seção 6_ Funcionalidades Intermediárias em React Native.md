## Seção 6: Funcionalidades Intermediárias em React Native

Com uma base sólida em componentes, estilização, layout, navegação e manipulação de dados, estamos prontos para explorar algumas funcionalidades intermediárias que elevam a qualidade e a complexidade dos aplicativos React Native. Nesta seção, abordaremos como interagir com APIs nativas do dispositivo (como câmera, geolocalização), introduziremos os conceitos básicos de animações para criar interfaces mais dinâmicas e engajadoras, e discutiremos estratégias mais avançadas para gerenciamento de estado, como a Context API e bibliotecas populares como Redux ou Zustand.

Dominar esses tópicos permitirá que você crie aplicativos mais ricos em recursos, com melhor performance e uma experiência de usuário mais polida, aproximando-se do que os usuários esperam de aplicativos nativos de alta qualidade.

### Acesso a APIs Nativas do Dispositivo

React Native permite que você acesse uma vasta gama de funcionalidades nativas do dispositivo. Algumas APIs são expostas diretamente pelo React Native, enquanto outras requerem a instalação de bibliotecas de terceiros, muitas vezes mantidas pela comunidade ou por projetos como o React Native Community ou Expo.

**Principais APIs Nativas e Como Acessá-las:**

1.  **Geolocalização (`react-native-geolocation-service` ou API do Expo):**
    Permite obter a localização atual do dispositivo.

    *   **Com Expo:** Use o módulo `expo-location`.
        ```bash
        expo install expo-location
        ```
        No `app.json`, adicione as permissões:
        ```json
        {
          "expo": {
            // ...
            "plugins": [
              [
                "expo-location",
                {
                  "locationAlwaysAndWhenInUsePermission": "Permitir que $(PRODUCT_NAME) use sua localização.",
                  "locationWhenInUsePermission": "Permitir que $(PRODUCT_NAME) use sua localização enquanto você usa o app."
                }
              ]
            ]
          }
        }
        ```

        ```javascript
        import React, { useState, useEffect } from 'react';
        import { View, Text, Button, StyleSheet, Alert } from 'react-native';
        import * as Location from 'expo-location';

        const ExemploGeolocalizacaoExpo = () => {
          const [localizacao, setLocalizacao] = useState(null);
          const [erroMsg, setErroMsg] = useState(null);

          const obterLocalizacao = async () => {
            setErroMsg(null);
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
              setErroMsg('Permissão para acessar localização foi negada');
              Alert.alert('Permissão Negada', 'Não é possível obter a localização sem permissão.');
              return;
            }

            try {
              let loc = await Location.getCurrentPositionAsync({}); // Pode passar opções de precisão
              setLocalizacao(loc);
            } catch (error) {
              setErroMsg('Erro ao obter localização: ' + error.message);
              Alert.alert('Erro', 'Não foi possível buscar a localização atual.');
            }
          };

          let texto = 'Aguardando permissão...';
          if (erroMsg) {
            texto = erroMsg;
          } else if (localizacao) {
            texto = `Latitude: ${localizacao.coords.latitude}, Longitude: ${localizacao.coords.longitude}`;
          }

          return (
            <View style={stylesGeo.container}>
              <Button title="Obter Localização Atual" onPress={obterLocalizacao} />
              <Text style={stylesGeo.textoLocalizacao}>{texto}</Text>
            </View>
          );
        };
        // ... estilos ...
        ```

    *   **Com React Native CLI (usando `react-native-geolocation-service`):**
        Esta biblioteca é uma alternativa mais robusta à API de geolocalização que já foi parte do core do React Native.
        ```bash
        npm install react-native-geolocation-service
        # ou
        yarn add react-native-geolocation-service
        ```
        Siga as instruções de configuração nativa (permissões no `AndroidManifest.xml` e `Info.plist`) na documentação da biblioteca.

        ```javascript
        import React, { useState } from 'react';
        import { View, Text, Button, PermissionsAndroid, Platform, StyleSheet, Alert } from 'react-native';
        import Geolocation from 'react-native-geolocation-service';

        const ExemploGeolocalizacaoCLI = () => {
          const [localizacao, setLocalizacao] = useState(null);
          const [erroMsg, setErroMsg] = useState(null);

          const requestLocationPermission = async () => {
            if (Platform.OS === 'ios') {
              const auth = await Geolocation.requestAuthorization("whenInUse");
              return auth === "granted";
            }
            if (Platform.OS === 'android') {
              try {
                const granted = await PermissionsAndroid.request(
                  PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                  {
                    title: 'Permissão de Localização',
                    message: 'Este aplicativo precisa de acesso à sua localização.',
                    buttonNeutral: 'Pergunte-me Depois',
                    buttonNegative: 'Cancelar',
                    buttonPositive: 'OK',
                  },
                );
                return granted === PermissionsAndroid.RESULTS.GRANTED;
              } catch (err) {
                console.warn(err);
                return false;
              }
            }
            return false;
          };

          const obterLocalizacao = async () => {
            setErroMsg(null);
            const temPermissao = await requestLocationPermission();
            if (!temPermissao) {
              setErroMsg('Permissão de localização negada.');
              Alert.alert('Permissão Negada');
              return;
            }

            Geolocation.getCurrentPosition(
              (position) => {
                setLocalizacao(position);
              },
              (error) => {
                setErroMsg(error.message);
                console.log(error.code, error.message);
                Alert.alert('Erro', `Não foi possível buscar a localização: ${error.message}`);
              },
              { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
          };
          // ... renderização similar ao exemplo Expo ...
          return (
            <View style={stylesGeo.container}>
              <Button title="Obter Localização (CLI)" onPress={obterLocalizacao} />
              {erroMsg && <Text style={{color: 'red'}}>{erroMsg}</Text>}
              {localizacao && <Text>Lat: {localizacao.coords.latitude}, Lon: {localizacao.coords.longitude}</Text>}
            </View>
          );
        };

        const stylesGeo = StyleSheet.create({
            container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
            textoLocalizacao: { marginTop: 15, fontSize: 16, textAlign: 'center' }
        });
        export default ExemploGeolocalizacaoExpo; // ou CLI
        ```

2.  **Câmera (`expo-camera` ou `react-native-camera`):**
    Permite tirar fotos e gravar vídeos.

    *   **Com Expo:** Use `expo-camera`.
        ```bash
        expo install expo-camera
        ```
        Adicione permissões para câmera e microfone (se for gravar vídeo com áudio) no `app.json`.

        ```javascript
        import React, { useState, useEffect, useRef } from 'react';
        import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';
        import { Camera } from 'expo-camera';

        const ExemploCameraExpo = () => {
          const [temPermissao, setTemPermissao] = useState(null);
          const [tipoCamera, setTipoCamera] = useState(Camera.Constants.Type.back);
          const [fotoCapturada, setFotoCapturada] = useState(null);
          const cameraRef = useRef(null);

          useEffect(() => {
            (async () => {
              const { status } = await Camera.requestCameraPermissionsAsync();
              setTemPermissao(status === 'granted');
            })();
          }, []);

          const tirarFoto = async () => {
            if (cameraRef.current) {
              const foto = await cameraRef.current.takePictureAsync();
              setFotoCapturada(foto.uri);
            }
          };

          if (temPermissao === null) return <View />;
          if (temPermissao === false) return <Text>Sem acesso à câmera</Text>;

          if (fotoCapturada) {
            return (
              <View style={stylesCam.containerPreview}>
                <Image source={{ uri: fotoCapturada }} style={stylesCam.previewImagem} />
                <Button title="Tirar Nova Foto" onPress={() => setFotoCapturada(null)} />
              </View>
            );
          }

          return (
            <View style={stylesCam.containerCamera}>
              <Camera style={stylesCam.cameraView} type={tipoCamera} ref={cameraRef}>
                <View style={stylesCam.botoesCameraContainer}>
                  <TouchableOpacity
                    style={stylesCam.botaoFlip}
                    onPress={() => {
                      setTipoCamera(
                        tipoCamera === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back
                      );
                    }}>
                    <Text style={stylesCam.textoBotaoCamera}> Inverter </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={stylesCam.botaoCaptura} onPress={tirarFoto} />
                </View>
              </Camera>
            </View>
          );
        };
        // ... estilos para a câmera ...
        ```

    *   **Com React Native CLI (usando `react-native-camera`):**
        É uma biblioteca mais completa, mas também mais complexa de configurar.
        ```bash
        npm install react-native-camera
        # ou
        yarn add react-native-camera
        ```
        Siga as extensas instruções de configuração nativa na documentação da biblioteca.

3.  **Sensores do Dispositivo (`expo-sensors`):**
    Acesso a acelerômetro, giroscópio, magnetômetro, etc.
    ```bash
    expo install expo-sensors
    ```
    Exemplo com Acelerômetro:
    ```javascript
    import React, { useState, useEffect } from 'react';
    import { StyleSheet, Text, View } from 'react-native';
    import { Accelerometer } from 'expo-sensors';

    const ExemploAcelerometro = () => {
      const [dados, setDados] = useState({ x: 0, y: 0, z: 0 });
      const [subscription, setSubscription] = useState(null);

      const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setDados));
        Accelerometer.setUpdateInterval(1000); // Atualiza a cada 1 segundo
      };

      const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
      };

      useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
      }, []);

      const { x, y, z } = dados;
      return (
        <View style={stylesSensores.container}>
          <Text style={stylesSensores.text}>Acelerômetro:</Text>
          <Text style={stylesSensores.text}>
            x: {Math.round(x * 100) / 100}
            y: {Math.round(y * 100) / 100}
            z: {Math.round(z * 100) / 100}
          </Text>
        </View>
      );
    };
    // ... estilos ...
    ```

4.  **Outras APIs Comuns:**
    *   **Contatos (`expo-contacts`):** Acessar e gerenciar contatos do dispositivo.
    *   **Sistema de Arquivos (`expo-file-system`):** Ler e escrever arquivos no sistema de arquivos do aplicativo.
    *   **Notificações Push (`expo-notifications`):** Enviar e receber notificações push.
    *   **Autenticação Biométrica (`expo-local-authentication`):** Usar Face ID, Touch ID, ou impressão digital.
    *   **Compartilhamento (`Share` API do React Native Core):** Compartilhar conteúdo com outros aplicativos.

**Gerenciamento de Permissões:**

   Acessar APIs nativas geralmente requer permissões do usuário. É crucial:
   *   Solicitar permissões apenas quando necessário.
   *   Explicar por que a permissão é necessária.
   *   Lidar graciosamente com casos em que a permissão é negada.
   *   O Expo simplifica muito o gerenciamento de permissões através de seus módulos e plugins no `app.json`. Para projetos Bare Workflow, você precisará configurar as permissões manualmente nos arquivos `AndroidManifest.xml` (Android) e `Info.plist` (iOS) e usar a API `PermissionsAndroid` do React Native ou as APIs de solicitação de permissão das bibliotecas específicas.

### Animações (`Animated` API, Lottie)

Animações podem tornar seu aplicativo mais interativo, visualmente atraente e melhorar a experiência do usuário ao fornecer feedback e transições suaves.

**1. `Animated` API:**

   O React Native fornece a API `Animated` para criar animações fluidas e performáticas. Ela é projetada para ser serializável, permitindo que as animações sejam executadas no thread nativo (usando o `useNativeDriver: true`), em vez do thread JavaScript, para melhor performance, especialmente para animações que não dependem de lógica complexa de JavaScript durante a animação.

   **Conceitos Chave da API `Animated`:**
   *   **Valores Animados (`Animated.Value`, `Animated.ValueXY`):** São valores especiais que podem ser animados. `Animated.Value` para um único valor (ex: opacidade, altura), `Animated.ValueXY` para um par de valores (ex: posição x, y).
   *   **Tipos de Animação:**
        *   `Animated.timing()`: Anima um valor ao longo do tempo usando uma curva de easing.
        *   `Animated.spring()`: Cria uma animação baseada em física de mola (spring).
        *   `Animated.decay()`: Anima um valor com um impulso inicial e desaceleração gradual.
   *   **Composição de Animações:**
        *   `Animated.sequence()`: Executa animações em sequência.
        *   `Animated.parallel()`: Executa animações simultaneamente.
        *   `Animated.stagger()`: Executa animações em paralelo com atrasos progressivos.
        *   `Animated.delay()`: Adiciona um atraso antes de iniciar uma animação.
   *   **Componentes Animados (`Animated.View`, `Animated.Text`, `Animated.Image`, `Animated.ScrollView`):** Para aplicar valores animados a propriedades de estilo, você precisa usar as versões animadas dos componentes básicos. Você também pode criar seus próprios componentes animados com `Animated.createAnimatedComponent()`.
   *   **Interpolação (`interpolate()`):** Permite mapear um intervalo de entrada de um valor animado para um intervalo de saída diferente (ex: animar a opacidade de 0 para 1 enquanto um valor animado vai de 0 para 100, ou mapear um valor de rolagem para uma rotação).
   *   **Eventos (`Animated.event()`):** Permite mapear eventos nativos (como gestos de rolagem ou de toque) diretamente para valores animados.
   *   **`useNativeDriver: true`:** Quando possível, use esta opção nas suas animações (`Animated.timing`, `Animated.spring`, etc.) para que a animação seja executada no thread de UI nativo. Isso melhora significativamente a performance, pois a animação não será bloqueada por trabalho no thread JavaScript. No entanto, `useNativeDriver` só funciona com propriedades de estilo não relacionadas ao layout (ex: `transform`, `opacity`). Propriedades como `width`, `height`, `top`, `left` não são suportadas pelo driver nativo.

   **Exemplo de Animação de Fade In/Out com `Animated.timing`:**

   ```javascript
   import React, { useRef, useState } from 'react';
   import { View, Button, Animated, StyleSheet, Easing } from 'react-native';

   const ExemploAnimacaoFade = () => {
     const fadeAnim = useRef(new Animated.Value(0)).current; // Valor inicial da opacidade: 0
     const [visivel, setVisivel] = useState(false);

     const fadeIn = () => {
       Animated.timing(fadeAnim, {
         toValue: 1, // Animar para opacidade 1
         duration: 1000, // Duração de 1 segundo
         easing: Easing.ease, // Curva de easing suave
         useNativeDriver: true, // Usar driver nativo para performance
       }).start(() => setVisivel(true));
     };

     const fadeOut = () => {
       Animated.timing(fadeAnim, {
         toValue: 0, // Animar para opacidade 0
         duration: 1000,
         easing: Easing.linear,
         useNativeDriver: true,
       }).start(() => setVisivel(false));
     };

     return (
       <View style={stylesAnim.container}>
         <Animated.View
           style={[
             stylesAnim.caixaAnimada,
             { opacity: fadeAnim }, // Aplicar o valor animado à opacidade
           ]}
         />
         <View style={stylesAnim.botoesContainerAnim}>
           <Button title={visivel ? "Esconder (Fade Out)" : "Mostrar (Fade In)"} onPress={visivel ? fadeOut : fadeIn} />
         </View>
       </View>
     );
   };

   const stylesAnim = StyleSheet.create({
     container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
     caixaAnimada: { width: 150, height: 150, backgroundColor: 'tomato', marginBottom: 20 },
     botoesContainerAnim: { flexDirection: 'row' },
   });

   export default ExemploAnimacaoFade;
   ```

**2. Lottie (`lottie-react-native`):**

   Lottie é uma biblioteca da Airbnb que renderiza animações do Adobe After Effects exportadas como JSON com o plugin Bodymovin. É excelente para animações vetoriais complexas, como ícones animados, telas de carregamento elaboradas ou ilustrações interativas.

   *   **Instalação:**
       ```bash
       npm install lottie-react-native
       # ou
       yarn add lottie-react-native
       ```
       Se estiver em um projeto Bare Workflow, pode precisar de link (`npx pod-install ios`). Para Expo, você pode usar `lottie-ios` e `lottie-android` que vêm com o SDK do Expo, ou `lottie-react-native` se estiver usando o Bare Workflow do Expo.

   *   **Uso:**
       Você precisará de um arquivo JSON de animação Lottie (pode encontrar muitos gratuitos em LottieFiles.com).

       ```javascript
       import React, { useRef, useEffect } from 'react';
       import { View, Button, StyleSheet } from 'react-native';
       import LottieView from 'lottie-react-native';

       const ExemploLottie = () => {
         const animationRef = useRef(null);

         useEffect(() => {
           // Você pode controlar a animação com o ref
           // animationRef.current?.play();
           // animationRef.current?.reset();
         }, []);

         return (
           <View style={stylesLottie.container}>
             <LottieView
               ref={animationRef}
               source={require('./assets/lottie-animation.json')} // Coloque seu arquivo JSON aqui
               style={stylesLottie.lottieAnim}
               autoPlay
               loop
               // speed={1}
               // progress={0.5} // Para controlar o progresso manualmente
             />
             <View style={stylesLottie.botoesLottie}>
                <Button title="Play" onPress={() => animationRef.current?.play()} />
                <Button title="Pause" onPress={() => animationRef.current?.pause()} />
                <Button title="Reset" onPress={() => animationRef.current?.reset()} />
             </View>
           </View>
         );
       };

       const stylesLottie = StyleSheet.create({
         container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
         lottieAnim: { width: 200, height: 200, backgroundColor: '#eee' },
         botoesLottie: { flexDirection: 'row', justifyContent: 'space-around', width: '80%', marginTop: 20 }
       });

       export default ExemploLottie;
       ```

**3. React Native Reanimated:**

   Para animações e interações baseadas em gestos ainda mais complexas e performáticas, `react-native-reanimated` (especialmente a v2+) é uma biblioteca poderosa. Ela permite que você execute animações e lógica de gestos inteiramente no thread de UI, evitando a ponte JavaScript e alcançando performance nativa. A curva de aprendizado é mais íngreme, mas é a escolha para interações de alta performance.

### Gerenciamento de Estado Avançado

À medida que seu aplicativo cresce, gerenciar o estado apenas com `useState` e passando `props` para baixo na árvore de componentes (prop drilling) pode se tornar complicado e ineficiente.

**1. Context API:**

   O React Context API é uma maneira de compartilhar dados que podem ser considerados "globais" para uma árvore de componentes React, como o usuário autenticado, o tema da UI, ou a localidade preferida, sem ter que passar props manualmente em cada nível.

   **Como usar:**
   *   **`React.createContext()`:** Cria um objeto Context. Quando o React renderiza um componente que se inscreve neste objeto Context, ele lerá o valor atual do Context do `Provider` mais próximo na árvore.
   *   **`Context.Provider`:** Um componente que permite que os componentes consumidores se inscrevam nas mudanças do Context. Ele aceita uma prop `value` para ser passada aos componentes consumidores que são descendentes deste Provider. Um Provider pode ser conectado a muitos consumidores. Providers podem ser aninhados para sobrescrever valores mais profundamente na árvore.
   *   **`Context.Consumer`:** Um componente que se inscreve nas mudanças do Context. Requer uma função como filho. A função recebe o valor atual do Context e retorna um nó React. (Menos comum com Hooks)
   *   **`useContext` Hook:** A maneira mais moderna e simples de consumir um valor de Context em um componente funcional. `const value = useContext(MyContext);`

   **Exemplo de Tema com Context API:**

   ```javascript
   // contexts/ThemeContext.js
   import React, { createContext, useState, useContext } from 'react';

   export const themes = {
     light: { foreground: '#000000', background: '#eeeeee', button: 'dodgerblue' },
     dark: { foreground: '#ffffff', background: '#222222', button: 'tomato' },
   };

   export const ThemeContext = createContext({
     theme: themes.light, // Valor padrão
     toggleTheme: () => {},
   });

   export const ThemeProvider = ({ children }) => {
     const [currentTheme, setCurrentTheme] = useState('light');

     const toggleTheme = () => {
       setCurrentTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
     };

     return (
       <ThemeContext.Provider value={{ theme: themes[currentTheme], toggleTheme }}>
         {children}
       </ThemeContext.Provider>
     );
   };

   export const useTheme = () => useContext(ThemeContext);

   // App.js (ou onde você quer prover o tema)
   // import { ThemeProvider } from './contexts/ThemeContext';
   // const App = () => (
   //   <ThemeProvider>
   //     <MeuAppConteudo />
   //   </ThemeProvider>
   // );

   // Em um componente consumidor:
   // import { useTheme } from './contexts/ThemeContext';
   // const ThemedButton = () => {
   //   const { theme, toggleTheme } = useTheme();
   //   return (
   //     <TouchableOpacity 
   //       style={{ backgroundColor: theme.button, padding: 10, borderRadius: 5 }}
   //       onPress={toggleTheme}
   //     >
   //       <Text style={{ color: theme.foreground }}>Alternar Tema</Text>
   //     </TouchableOpacity>
   //   );
   // };
   ```

   Context é ótimo para dados que não mudam com muita frequência. Para dados que mudam rapidamente e afetam muitas partes da UI, pode levar a re-renderizações desnecessárias se não for otimizado corretamente (usando `React.memo`, `useMemo`, `useCallback`).

**2. Bibliotecas de Gerenciamento de Estado (Redux, Zustand, Jotai, Recoil):**

   Para aplicações maiores e mais complexas com muitos dados de estado global que mudam frequentemente, bibliotecas dedicadas de gerenciamento de estado podem oferecer soluções mais robustas e escaláveis.

   *   **Redux (`@reduxjs/toolkit`):**
        *   Um contêiner de estado previsível para aplicações JavaScript. Segue os princípios do Flux.
        *   **Conceitos:** Store (onde o estado vive), Actions (objetos descrevendo o que aconteceu), Reducers (funções puras que especificam como o estado muda em resposta a actions), Dispatch (para enviar actions).
        *   `@reduxjs/toolkit` é a maneira oficial e recomendada de usar Redux, pois simplifica muito a configuração e reduz o boilerplate.
        *   **Vantagens:** Previsibilidade, ferramentas de desenvolvimento poderosas (Redux DevTools), grande ecossistema, bom para aplicações grandes e complexas.
        *   **Desvantagens:** Curva de aprendizado, pode ser verboso mesmo com Toolkit para casos simples.

   *   **Zustand:**
        *   Uma solução de gerenciamento de estado pequena, rápida e escalável, baseada em Hooks. Menos boilerplate que Redux.
        *   **Conceitos:** Cria-se um 

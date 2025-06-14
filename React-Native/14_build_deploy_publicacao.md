## Seção 8: Build, Deploy e Publicação

Depois de desenvolver e testar seu aplicativo React Native, a próxima etapa crucial é prepará-lo para distribuição aos usuários finais. Isso envolve a configuração de diferentes ambientes, a geração de builds de lançamento (release builds) para Android e iOS, e o processo de publicação nas respectivas lojas de aplicativos (Google Play Store e Apple App Store). Além disso, as atualizações Over-the-Air (OTA) oferecem uma maneira de enviar pequenas atualizações diretamente aos usuários sem passar pelo processo completo de revisão da loja.

### Configuração de Ambientes (Desenvolvimento, Staging, Produção)

É uma prática comum ter diferentes configurações para diferentes estágios do ciclo de vida do seu aplicativo:

*   **Desenvolvimento (Development):** Usado durante o desenvolvimento ativo. Geralmente aponta para APIs de backend de desenvolvimento, inclui ferramentas de debugging, e pode ter funcionalidades experimentais habilitadas.
*   **Staging (Homologação):** Um ambiente que espelha a produção o mais próximo possível. Usado para testes finais antes do lançamento, QA (Quality Assurance), e demonstrações para stakeholders. Aponta para APIs de backend de staging.
*   **Produção (Production):** O ambiente ao vivo que seus usuários finais acessam. Aponta para APIs de backend de produção e deve ter todas as otimizações de performance e segurança habilitadas.

**Gerenciando Configurações de Ambiente:**

   Você pode gerenciar essas configurações de várias maneiras:

   1.  **Arquivos de Configuração por Ambiente:**
      Crie arquivos de configuração separados para cada ambiente (ex: `config.dev.js`, `config.staging.js`, `config.prod.js`).
      ```javascript
      // config.dev.js
      export default {
        API_URL: "https://api.dev.meuapp.com",
        AMBIENTE: "desenvolvimento",
        // outras configs
      };

      // config.prod.js
      export default {
        API_URL: "https://api.meuapp.com",
        AMBIENTE: "producao",
      };
      ```
      Você pode ter um script de build ou uma variável de ambiente que determina qual arquivo de configuração é importado.
      ```javascript
      // config.js
      let config;
      if (process.env.NODE_ENV === "production") {
        config = require("./config.prod").default;
      } else if (process.env.REACT_NATIVE_ENV === "staging") { // Exemplo de variável customizada
        config = require("./config.staging").default;
      } else {
        config = require("./config.dev").default;
      }
      export default config;
      ```
      Para definir `REACT_NATIVE_ENV`, você pode usar scripts no `package.json`:
      `"start:staging": "REACT_NATIVE_ENV=staging react-native start"`
      Para builds, você precisará de uma maneira de injetar essa variável no processo de build nativo ou usar esquemas/build types diferentes.

   2.  **Variáveis de Ambiente Nativas (Build Types/Schemes):**
      *   **Android (Build Types e Product Flavors):**
         No `android/app/build.gradle`, você pode definir diferentes `buildTypes` (como `debug`, `release`) e `productFlavors` (ex: `dev`, `staging`, `prod`). Cada combinação pode ter suas próprias variáveis de ambiente definidas usando `buildConfigField`.
         ```gradle
         // android/app/build.gradle
         android {
           // ...
           buildTypes {
             debug {
               buildConfigField "String", "API_URL", "\"https://api.dev.meuapp.com\""
               buildConfigField "String", "AMBIENTE", "\"debug\""
             }
             release {
               minifyEnabled true
               proguardFiles getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro"
               buildConfigField "String", "API_URL", "\"https://api.meuapp.com\""
               buildConfigField "String", "AMBIENTE", "\"release\""
               // Configurações de assinatura aqui
             }
             // Pode criar um build type para staging, copiando de release
             staging {
                initWith release // Copia configurações de release
                applicationIdSuffix ".staging" // Muda o ID da aplicação para instalar lado a lado
                buildConfigField "String", "API_URL", "\"https://api.staging.meuapp.com\""
                buildConfigField "String", "AMBIENTE", "\"staging\""
                // Pode usar uma chave de assinatura diferente se necessário
             }
           }
           // ...
         }
         ```
         Essas variáveis ficam acessíveis no Java/Kotlin via `BuildConfig.API_URL` e podem ser expostas ao JS através de um módulo nativo.

      *   **iOS (Schemes e Build Configurations):**
         No Xcode, você pode criar diferentes "Schemes" (ex: `MeuAppDev`, `MeuAppStaging`, `MeuAppProd`). Cada scheme pode ser associado a uma "Build Configuration" (`Debug`, `Release`, ou customizadas como `StagingRelease`).
         Você pode definir variáveis de pré-processador (Preprocessor Macros) nas Build Settings para cada configuração (ex: `AMBIENTE_STAGING=1`).
         No código Objective-C/Swift, você pode usar `#if AMBIENTE_STAGING` e expor os valores para o JS através de um módulo nativo.
         Outra abordagem é usar arquivos `.xcconfig` para gerenciar configurações por ambiente e scheme.

   3.  **Bibliotecas de Gerenciamento de Configuração:**
      Bibliotecas como `react-native-config` permitem que você defina variáveis de ambiente em arquivos `.env` (ex: `.env.development`, `.env.production`) e as acesse no JS e no código nativo.
      `yarn add react-native-config`
      Siga as instruções de instalação da biblioteca para linkar nativamente.
      Crie arquivos como `.env.dev`, `.env.staging`, `.env.prod`:
      ```
      // .env.dev
      API_URL=https://api.dev.meuapp.com
      AMBIENTE=desenvolvimento
      ```
      No JS:
      ```javascript
      import Config from "react-native-config";
      console.log("API URL:", Config.API_URL);
      console.log("Ambiente:", Config.AMBIENTE);
      ```
      Você precisará configurar seus scripts de build para usar o arquivo `.env` correto para cada ambiente/scheme.

### Geração de Builds Assinados para Android (.apk, .aab)

Para publicar na Google Play Store ou distribuir seu aplicativo Android, você precisa gerar um build de lançamento assinado.

1.  **Gerar uma Chave de Upload (Upload Key):**
    Se você ainda não tem uma, gere uma chave privada para assinar seu aplicativo. Esta chave é crucial e deve ser mantida em segurança.
    ```bash
    keytool -genkeypair -v -keystore meu-app-upload-key.keystore -alias meu-app-alias -keyalg RSA -keysize 2048 -validity 10000
    ```
    Guarde o arquivo `.keystore` e lembre-se das senhas que você definiu.
    **Importante:** A Google Play agora usa o "App Signing by Google Play". Você gera uma chave de upload, assina seu app com ela, e envia para o Play Console. O Google então re-assina seu app com uma chave de assinatura de app que ele gerencia. A chave que você gerou (upload key) é para autenticar seus uploads para o Google.

2.  **Configurar as Credenciais da Chave no Gradle:**
    Adicione as informações da sua keystore ao arquivo `android/gradle.properties` (NÃO comite este arquivo com senhas em repositórios públicos! Use variáveis de ambiente no CI/CD ou armazene-o localmente de forma segura):
    ```properties
    # android/gradle.properties
    MYAPP_UPLOAD_STORE_FILE=meu-app-upload-key.keystore
    MYAPP_UPLOAD_KEY_ALIAS=meu-app-alias
    MYAPP_UPLOAD_STORE_PASSWORD=sua_senha_do_keystore
    MYAPP_UPLOAD_KEY_PASSWORD=sua_senha_da_alias
    ```
    Ou, melhor ainda, configure para ler de variáveis de ambiente.

    Agora, edite `android/app/build.gradle` para usar essas credenciais na sua configuração de `release` (ou `staging` se tiver uma):
    ```gradle
    // android/app/build.gradle
    android {
        // ...
        signingConfigs {
            release {
                if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                    storeFile file(MYAPP_UPLOAD_STORE_FILE)
                    storePassword MYAPP_UPLOAD_STORE_PASSWORD
                    keyAlias MYAPP_UPLOAD_KEY_ALIAS
                    keyPassword MYAPP_UPLOAD_KEY_PASSWORD
                } else {
                    // Fallback ou configuração para builds locais não assinados para release
                    // storeFile file("debug.keystore") // Exemplo, não use debug para release real
                    // storePassword "android"
                    // keyAlias "androiddebugkey"
                    // keyPassword "android"
                }
            }
        }
        buildTypes {
            release {
                // ... outras configs de release
                signingConfig signingConfigs.release
            }
            staging {
                initWith release
                signingConfig signingConfigs.release // Ou uma config de staging separada
                // ...
            }
        }
    }
    ```

3.  **Limpar Builds Anteriores (Opcional, mas recomendado):**
    ```bash
    cd android
    ./gradlew clean
    cd ..
    ```

4.  **Gerar o Android App Bundle (.aab) (Recomendado pela Google):**
    O AAB é o formato de publicação preferido. Ele permite que o Google Play otimize o APK entregue a cada dispositivo do usuário (Dynamic Delivery).
    ```bash
    cd android
    ./gradlew bundleRelease  # Ou bundleStaging, etc.
    cd ..
    ```
    O arquivo `.aab` será gerado em `android/app/build/outputs/bundle/release/app-release.aab`.

5.  **Gerar o APK Universal (Menos comum para publicação na Play Store agora):**
    Se você precisar de um APK para distribuição direta ou outras lojas.
    ```bash
    cd android
    ./gradlew assembleRelease # Ou assembleStaging, etc.
    cd ..
    ```
    O arquivo `.apk` será gerado em `android/app/build/outputs/apk/release/app-release.apk`.

### Arquivamento e Exportação de Builds para iOS (.ipa)

Para publicar na Apple App Store ou distribuir para testes (ex: via TestFlight), você precisa arquivar seu aplicativo e exportar um arquivo `.ipa`.

1.  **Configuração no Xcode:**
    *   Abra seu projeto iOS no Xcode (`ios/<SeuProjeto>.xcworkspace`).
    *   **Bundle Identifier:** Verifique se o Bundle Identifier está correto em `General > Identity`.
    *   **Signing & Capabilities:**
        *   Selecione seu time (Team).
        *   Certifique-se de que o Xcode possa gerenciar a assinatura automaticamente (`Automatically manage signing`) ou configure manualmente os certificados de distribuição e perfis de provisionamento.
        *   Você precisará de um Certificado de Distribuição da Apple (Apple Distribution Certificate) e um Perfil de Provisionamento da App Store (App Store Provisioning Profile) associados ao seu Bundle ID, criados no Apple Developer Portal.
    *   **Build Configuration:** Selecione o scheme de `Release` (ou seu scheme de produção/staging). Vá em `Product > Scheme > Edit Scheme...`. Na aba `Run`, certifique-se de que a `Build Configuration` está definida como `Release` (ou a configuração apropriada para o build que você quer gerar).
    *   **Versão e Build Number:** Atualize `Version` (ex: 1.0.0) e `Build` (ex: 1) em `General > Identity`.

2.  **Selecionar Dispositivo de Build:**
    No Xcode, selecione "Any iOS Device (arm64)" ou um dispositivo genérico na lista de destinos de build (próximo ao botão de play/stop).

3.  **Arquivar o Aplicativo:**
    Vá em `Product > Archive`. Isso compilará seu aplicativo usando a configuração de Release.
    Se a opção "Archive" estiver desabilitada, certifique-se de que um dispositivo genérico ou "Any iOS Device" está selecionado, e não um simulador.

4.  **Distribuir o Aplicativo (Exportar .ipa):**
    *   Após o arquivamento bem-sucedido, a janela "Organizer - Archives" aparecerá.
    *   Selecione o arquivo recém-criado e clique em "Distribute App".
    *   Escolha o método de distribuição:
        *   **App Store Connect:** Para enviar diretamente para a App Store Connect para publicação ou TestFlight.
        *   **Ad Hoc:** Para instalar em dispositivos específicos registrados (requer UDIDs no perfil de provisionamento).
        *   **Enterprise:** Para distribuição interna em empresas (requer conta Apple Developer Enterprise).
        *   **Development:** Para testes em dispositivos de desenvolvimento.
    *   Siga as instruções. Para a App Store, você geralmente escolherá "App Store Connect".
    *   O Xcode irá preparar o app, permitir que você configure opções de re-assinatura (geralmente o Xcode gerencia isso), e então fará o upload para a App Store Connect ou permitirá que você exporte um arquivo `.ipa` assinado.
    *   Se você exportar o `.ipa` localmente, ele estará pronto para ser enviado manualmente via Transporter app ou outras ferramentas.

### Processo de Publicação nas Lojas

**1. Google Play Store:**

   *   **Google Play Console:** Acesse o [Google Play Console](https://play.google.com/console).
   *   **Criar Aplicativo:** Crie um novo aplicativo, preenchendo os detalhes (nome, idioma padrão, etc.).
   *   **Ficha da Loja (Store Listing):** Preencha todas as informações necessárias: título, descrição curta, descrição completa, ícones, capturas de tela, vídeo promocional, categoria, classificação do conteúdo, informações de contato, política de privacidade.
   *   **Versões do App (App Releases):**
        *   Vá para a seção de `Produção` (ou `Teste Interno`, `Teste Fechado`, `Teste Aberto`).
        *   Crie uma nova versão.
        *   Faça o upload do seu arquivo `.aab` (ou `.apk`).
        *   O Google Play processará o bundle. Você pode adicionar notas de versão.
   *   **App Signing by Google Play:** Certifique-se de que está configurado (geralmente é o padrão para novos apps).
   *   **Classificação do Conteúdo:** Preencha o questionário de classificação.
   *   **Preço e Distribuição:** Defina se o app é gratuito ou pago, e em quais países estará disponível.
   *   **Revisão e Lançamento:** Após preencher tudo, envie o app para revisão. O tempo de revisão pode variar. Se aprovado, você pode lançar o app.

**2. Apple App Store:**

   *   **App Store Connect:** Acesse o [App Store Connect](https://appstoreconnect.apple.com/).
   *   **Meus Apps:** Crie um novo aplicativo (+).
   *   **Informações do App:** Preencha nome, idioma principal, ID do pacote (Bundle ID - deve corresponder ao do Xcode), SKU.
   *   **Ficha da App Store (App Store Listing):**
        *   Prepare os metadados: nome do app, subtítulo, texto promocional, descrição, palavras-chave, URLs de suporte e marketing, informações de contato.
        *   Faça upload de capturas de tela (para diferentes tamanhos de dispositivo), prévias do app (vídeos).
        *   Ícone do app (será pego do build).
   *   **Preço e Disponibilidade:** Defina o preço e em quais regiões o app estará disponível.
   *   **Informações da Versão:**
        *   Quando você envia um build do Xcode (ou via Transporter), ele aparece na seção "TestFlight" ou na página da versão do seu app.
        *   Selecione o build que você quer submeter.
        *   Preencha informações sobre o que há de novo nesta versão, informações de contato para revisão, e quaisquer notas para o revisor da Apple (ex: credenciais de login para uma conta de teste).
        *   Responda a perguntas sobre conformidade de exportação, uso de publicidade (IDFA), etc.
   *   **TestFlight (Opcional, mas altamente recomendado):**
        *   Use o TestFlight para distribuir builds para testadores internos e externos antes de enviar para revisão da App Store.
   *   **Enviar para Revisão:** Após preencher tudo e selecionar o build, envie o app para revisão. O tempo de revisão da Apple pode variar (geralmente de algumas horas a alguns dias).
   *   **Lançamento:** Se aprovado, você pode escolher lançar o app manualmente ou automaticamente.

### Atualizações Over-the-Air (OTA)

Atualizações OTA permitem que você envie atualizações de JavaScri
(Content truncated due to size limit. Use line ranges to read in chunks)
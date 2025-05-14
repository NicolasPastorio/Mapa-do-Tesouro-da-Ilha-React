## Seção 10: Segurança em Aplicativos React Native

A segurança é um aspecto crítico no desenvolvimento de qualquer aplicativo, e aplicativos React Native não são exceção. Embora o React Native em si seja uma estrutura robusta, as vulnerabilidades podem surgir da forma como o aplicativo é codificado, como os dados são manuseados, das bibliotecas de terceiros utilizadas e da configuração da infraestrutura de backend.

Esta seção abordará as principais considerações de segurança para aplicativos React Native, incluindo armazenamento seguro de dados, proteção contra vulnerabilidades comuns, comunicação de rede segura e outras boas práticas.

### Princípios Gerais de Segurança Mobile

Antes de focar no React Native, lembre-se dos princípios gerais de segurança mobile:

*   **Mínimo Privilégio:** O aplicativo só deve solicitar as permissões estritamente necessárias para seu funcionamento.
*   **Defesa em Profundidade:** Implemente múltiplas camadas de segurança. Não confie em uma única medida de proteção.
*   **Segurança por Design (Security by Design):** Considere a segurança desde o início do ciclo de desenvolvimento, não como uma reflexão tardia.
*   **Mantenha Tudo Atualizado:** Use as versões mais recentes do React Native, bibliotecas de terceiros, Node.js, SDKs nativos e ferramentas de build para se proteger contra vulnerabilidades conhecidas.
*   **Não Confie no Cliente:** Qualquer dado vindo do cliente (o aplicativo móvel) pode ser manipulado. Valide e sanitize todas as entradas no backend.
*   **Proteja os Dados em Trânsito e em Repouso:** Use HTTPS para comunicação e criptografe dados sensíveis armazenados no dispositivo.

### Armazenamento Seguro de Dados Sensíveis no Dispositivo

Dados sensíveis como tokens de autenticação (JWTs, tokens de API), chaves de API, informações de identificação pessoal (PII), ou dados financeiros nunca devem ser armazenados em locais inseguros como `AsyncStorage` (ou `localStorage` no contexto web) diretamente, pois ele não é criptografado e pode ser acessado por código malicioso se o dispositivo estiver comprometido (ex: jailbreak/root).

**Soluções para Armazenamento Seguro:**

1.  **Keychain Services (iOS) e Keystore/EncryptedSharedPreferences (Android):**
    *   São os mecanismos de armazenamento seguro fornecidos pelas plataformas nativas, projetados para guardar pequenas quantidades de dados sensíveis como senhas, chaves e tokens.
    *   Os dados são criptografados pelo sistema operacional e, em muitos casos, protegidos por hardware seguro (Secure Enclave no iOS, Trusted Execution Environment no Android).
    *   **Bibliotecas React Native:**
        *   **`react-native-keychain`:** Uma biblioteca popular que fornece uma API unificada para interagir com o Keychain do iOS e o Keystore/EncryptedSharedPreferences do Android.
          ```bash
          yarn add react-native-keychain
          cd ios && pod install # Para iOS
          ```
          Uso:
          ```javascript
          import * as Keychain from "react-native-keychain";

          // Armazenar credenciais
          async function storeCredentials(username, password) {
            try {
              await Keychain.setGenericPassword(username, password); // Opcionalmente, pode-se adicionar um service
              console.log("Credenciais armazenadas com sucesso!");
            } catch (error) {
              console.error("Erro ao armazenar credenciais:", error);
            }
          }

          // Recuperar credenciais
          async function getCredentials() {
            try {
              const credentials = await Keychain.getGenericPassword();
              if (credentials) {
                console.log("Credenciais recuperadas:", credentials.username, credentials.password);
                return credentials;
              } else {
                console.log("Nenhuma credencial encontrada.");
                return null;
              }
            } catch (error) {
              console.error("Erro ao recuperar credenciais:", error);
              return null;
            }
          }

          // Resetar/Remover credenciais
          async function resetCredentials() {
            try {
              await Keychain.resetGenericPassword();
              console.log("Credenciais removidas.");
            } catch (error) {
              console.error("Erro ao remover credenciais:", error);
            }
          }
          ```
          `react-native-keychain` permite especificar opções de acessibilidade (ex: `Keychain.ACCESSIBLE.WHEN_UNLOCKED_THIS_DEVICE_ONLY`) para controlar quando os dados podem ser acessados.

        *   **`expo-secure-store` (para projetos Expo e "bare" React Native):**
          Se você está no ecossistema Expo ou quer uma solução que funcione bem com ele, `expo-secure-store` é uma boa opção.
          ```bash
          expo install expo-secure-store
          ```
          Uso:
          ```javascript
          import * as SecureStore from "expo-secure-store";

          async function saveItem(key, value) {
            await SecureStore.setItemAsync(key, value);
          }

          async function getItem(key) {
            let result = await SecureStore.getItemAsync(key);
            if (result) {
              console.log("Valor recuperado para", key, ":", result);
              return result;
            } else {
              console.log("Nenhum valor encontrado para", key);
              return null;
            }
          }

          async function deleteItem(key) {
            await SecureStore.deleteItemAsync(key);
          }
          ```

2.  **Bancos de Dados Criptografados:**
    *   Se você precisa armazenar uma quantidade maior de dados estruturados de forma segura, considere usar um banco de dados local que suporte criptografia.
    *   **Realm:** Suporta criptografia AES-256 para seus bancos de dados locais. Requer configuração da chave de criptografia.
    *   **SQLite com SQLCipher:** SQLCipher é uma extensão do SQLite que fornece criptografia transparente de todo o banco de dados. Bibliotecas como `react-native-sqlcipher-storage` ou `react-native-sqlite-storage` (com SQLCipher habilitado) podem ser usadas.

**O que NÃO armazenar, mesmo em armazenamento seguro (se possível):**

*   Chaves de API de longa duração que concedem acesso excessivo. Prefira tokens de curta duração ou mecanismos que não exijam armazenar a chave no cliente.
*   Dados de PII altamente sensíveis, a menos que absolutamente necessário e com consentimento do usuário. Minimize a coleta de dados.

### Comunicação de Rede Segura

1.  **HTTPS Sempre:**
    *   Toda a comunicação entre seu aplicativo React Native e seus servidores de backend DEVE usar HTTPS (HTTP sobre TLS/SSL).
    *   Isso criptografa os dados em trânsito, protegendo contra ataques de interceptação (Man-in-the-Middle - MitM).
    *   No iOS, o App Transport Security (ATS) impõe o uso de HTTPS por padrão para a maioria das conexões. No Android, você também deve garantir que apenas conexões seguras sejam permitidas (ex: `android:usesCleartextTraffic="false"` no `AndroidManifest.xml` para API nível 28+).

2.  **Certificate Pinning (Fixação de Certificado):**
    *   Para uma camada adicional de segurança contra ataques MitM sofisticados (onde o invasor pode ter conseguido um certificado TLS de uma CA comprometida ou induzido o usuário a instalar uma CA raiz maliciosa), você pode implementar o certificate pinning.
    *   Certificate pinning significa que seu aplicativo só confiará em um certificado específico (ou um conjunto de certificados) emitido pelo seu servidor, em vez de confiar em qualquer certificado emitido por uma CA raiz confiável no dispositivo.
    *   **Como implementar:**
        *   Você pode fixar o certificado do servidor em si ou a chave pública do certificado.
        *   Bibliotecas como `react-native-ssl-pinning` ou `react-native-cert-pinner` podem ajudar. Algumas bibliotecas de requisição HTTP (como forks customizados do `fetch` ou `axios` com essa capacidade) também podem suportar isso.
        *   A implementação geralmente envolve empacotar o hash do certificado/chave pública com seu app e verificar as conexões de rede contra esse hash.
    *   **Desvantagens:**
        *   **Manutenção:** Se o certificado do seu servidor mudar (o que acontece regularmente), você precisará atualizar o app com o novo pino. Isso pode ser problemático se os usuários não atualizarem o app.
        *   **Flexibilidade:** Pode complicar o uso de CDNs ou proxies que usam seus próprios certificados.
    *   **Alternativas/Complementos:**
        *   **Certificate Transparency (CT):** Um sistema onde os certificados emitidos são registrados publicamente, ajudando a detectar certificados emitidos erroneamente ou maliciosamente.
        *   Use pinning com cautela e entenda as implicações de manutenção.

3.  **Validação de Entrada no Backend:**
    *   Nunca confie em dados enviados pelo aplicativo cliente. Sempre valide e sanitize todas as entradas no lado do servidor para proteger contra injeção de SQL, XSS (se o backend renderizar HTML), e outras vulnerabilidades de entrada.

4.  **Gerenciamento de Tokens de API/Sessão:**
    *   Use tokens de curta duração (ex: JWTs com expiração curta) e implemente um mecanismo de refresh token seguro.
    *   Armazene refresh tokens de forma segura (usando Keychain/Keystore).
    *   Invalide tokens no servidor durante o logout ou se um comprometimento for detectado.

### Proteção Contra Vulnerabilidades Comuns

1.  **Engenharia Reversa e Adulteração de Código (Tampering):**
    *   Aplicativos móveis podem ser descompilados e analisados.
    *   **Ofuscação de Código (JavaScript):** Ferramentas como `javascript-obfuscator` podem tornar seu bundle JS mais difícil de ler, mas não é uma proteção infalível. O Metro bundler do React Native tem algumas opções de minificação que ajudam um pouco.
    *   **Detecção de Root/Jailbreak:** Você pode tentar detectar se o dispositivo está rooteado (Android) ou com jailbreak (iOS) e alterar o comportamento do app (ex: desabilitar funcionalidades sensíveis, alertar o usuário ou o backend). Bibliotecas como `react-native-jail-monkey` podem ajudar.
        *   **Cuidado:** A detecção não é 100% confiável e pode ser contornada.
    *   **Proteção Anti-Tampering Nativa:** Ferramentas comerciais como DexGuard (Android) ou iXGuard (iOS) oferecem ofuscação e proteção anti-tampering mais robustas no nível do código nativo.
    *   **Verificação de Integridade do App:** Alguns SDKs de segurança podem verificar se o código do app foi modificado.

2.  **Insecure Deeplinks (Links Profundos Inseguros):**
    *   Se seu app usa deeplinks (ex: `meuapp://alguma/coisa`), valide cuidadosamente os dados recebidos através deles.
    *   Não execute ações sensíveis baseadas apenas em parâmetros de um deeplink sem autenticação e autorização adequadas.
    *   Prefira Universal Links (iOS) e App Links (Android) que usam URLs `https` e exigem verificação de propriedade do domínio, tornando-os mais seguros contra interceptação.

3.  **Vulnerabilidades em WebViews:**
    *   Se você usa `WebView` para carregar conteúdo web:
        *   Carregue apenas conteúdo de fontes confiáveis (HTTPS).
        *   Desabilite a execução de JavaScript de fontes não confiáveis (`javaScriptEnabled={false}` se o JS não for necessário, ou use `originWhitelist` para restringir quais origens podem executar JS).
        *   Tenha cuidado com a bridge entre o `WebView` e o código React Native (`onMessage`, `postMessage`, `injectedJavaScript`). Valide e sanitize dados passados em ambas as direções.
        *   Evite carregar URLs arbitrárias fornecidas pelo usuário ou de fontes não confiáveis.

4.  **Vulnerabilidades de Bibliotecas de Terceiros:**
    *   Mantenha suas dependências (Node modules, CocoaPods, dependências Gradle) atualizadas.
    *   Use ferramentas como `npm audit` ou `yarn audit` para verificar vulnerabilidades conhecidas nas suas dependências JS.
    *   Para código nativo, fique atento aos avisos de segurança das bibliotecas que você usa.
    *   Avalie a reputação e a manutenção de bibliotecas antes de adicioná-las ao seu projeto.

5.  **Exposição de Dados Sensíveis em Logs ou UI:**
    *   Não registre dados sensíveis (senhas, tokens, PII) em logs, mesmo em builds de desenvolvimento. Use ferramentas como `react-native-sensitive-info` para gerenciar isso ou limpe os logs antes de builds de release.
    *   Tenha cuidado para não expor dados sensíveis desnecessariamente na UI (ex: mascarar senhas, não mostrar tokens completos).
    *   Desabilite `console.log` em builds de produção. Você pode usar um plugin Babel como `babel-plugin-transform-remove-console`.

6.  **Segurança da Bridge do React Native:**
    *   A bridge é um ponto de comunicação entre JS e Nativo. Embora o React Native gerencie isso, se você estiver escrevendo módulos nativos, certifique-se de que os métodos expostos ao JS validem suas entradas e não exponham funcionalidades nativas perigosas diretamente.

### Segurança da Nova Arquitetura (JSI, Fabric, Turbo Modules)

*   A JSI, ao permitir chamadas síncronas e acesso direto a objetos C++, introduz novas considerações de segurança relacionadas ao gerenciamento de memória e à estabilidade se não for usada corretamente.
*   Turbo Modules e Fabric Native Components ainda exigem que os desenvolvedores sigam boas práticas de codificação segura tanto no lado JS quanto no lado nativo.

### Outras Boas Práticas de Segurança

*   **Permissões do Aplicativo:** Solicite apenas as permissões absolutamente necessárias. Explique claramente ao usuário por que cada permissão é necessária.
*   **Autenticação Biométrica:** Para proteger o acesso ao app ou a funcionalidades sensíveis, use autenticação biométrica (Touch ID, Face ID, Android BiometricPrompt) quando disponível e apropriado. Bibliotecas como `react-native-biometrics` ou `expo-local-authentication` podem ajudar.
*   **Logout Seguro:** Implemente um logout que invalide o token de sessão no servidor e limpe quaisquer dados de sessão armazenados de forma segura no dispositivo.
*   **Prevenção de Captura de Tela/Gravação (Opcional, para conteúdo sensível):**
    *   Em algumas telas com informações altamente sensíveis, você pode querer impedir a captura de tela.
    *   **Android:** `getWindow().setFlags(LayoutParams.FLAG_SECURE, LayoutParams.FLAG_SECURE);` em uma Activity nativa.
    *   **iOS:** Detectar `UIApplicationUserDidTakeScreenshotNotification` e talvez ocultar o conteúdo (a prevenção total é difícil).
    *   Bibliotecas como `react-native-screenguard` tentam fornecer essa funcionalidade.
*   **Testes de Segurança (Pentesting):**
    *   Para aplicativos com requisitos de segurança elevados, considere realizar testes de penetração por especialistas em segurança para identificar vulnerabilidades.
*   **Política de Privacidade Clara:** Tenha uma política de privacidade que informe aos usuários quais dados você coleta, como os usa e como os protege.
*   **Conformidade com Regulamentações:** Esteja ciente de regulamentações de proteção de dados como GDPR (Europa), CCPA (Califórnia), LGPD (Brasil), etc., e garanta que seu app esteja em conformidade se aplicável.

### Ferramentas e Recursos

*   **OWASP Mobile Application Security Verification Standard (MASVS):** Um padrão para segurança de aplicativos móveis, fornecendo um framework para design, desenvolvimento e teste. ([OWASP MASVS](https://owasp.org/www-project-mobile-app-security/))
*   **OWASP Mobile Security Testing Guide (MSTG):** Um guia abrangente para testar a segurança de aplicativos móveis.
*   **Linters de Segurança:** Ferramentas que analisam seu código em busca de padrões de codificação inseguros.

A segurança é um processo contínuo, não um destino. Requer vigilância constante, atualizações regulares e uma mentalidade de segurança em todas as fases do desenvolvimento. Ao seguir as práticas recomendadas e estar ciente das
(Content truncated due to size limit. Use line ranges to read in chunks)
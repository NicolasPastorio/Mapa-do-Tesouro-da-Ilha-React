## Seção 9: Integração Contínua e Entrega Contínua (CI/CD) para React Native

A Integração Contínua (CI) e a Entrega Contínua (CD) são práticas de DevOps que visam automatizar as fases de build, teste e lançamento de software, permitindo que as equipes entreguem valor aos usuários de forma mais rápida e confiável. Para aplicativos React Native, a implementação de um pipeline de CI/CD pode economizar tempo significativo, reduzir erros manuais e melhorar a qualidade geral do aplicativo.

### O que é CI/CD?

*   **Integração Contínua (CI - Continuous Integration):**
    *   É a prática de mesclar (integrar) as alterações de código de todos os desenvolvedores em um repositório central compartilhado várias vezes ao dia.
    *   Cada integração é verificada por um build automatizado e testes automatizados (unitários, de integração, etc.).
    *   O objetivo é detectar problemas de integração o mais cedo possível, facilitando a correção e evitando que se acumulem.

*   **Entrega Contínua (CD - Continuous Delivery):**
    *   É uma extensão da CI onde, após o build e os testes bem-sucedidos, o software é automaticamente preparado para ser lançado em produção (ou em um ambiente de staging).
    *   O lançamento em si ainda pode ser um passo manual (acionado por um botão, por exemplo), mas todo o processo de preparação do release é automatizado.

*   **Implantação Contínua (CD - Continuous Deployment):**
    *   Vai um passo além da Entrega Contínua. Cada alteração que passa por todos os estágios do pipeline de produção é automaticamente lançada para os usuários finais.
    *   Requer um alto grau de confiança nos testes automatizados e no processo de monitoramento.

Para aplicativos móveis, a "Entrega Contínua" geralmente significa automatizar o build, a assinatura, e o upload para serviços de distribuição como TestFlight (iOS) ou faixas de teste internas/fechadas do Google Play (Android), ou até mesmo a publicação de atualizações OTA.

### Benefícios do CI/CD para React Native

*   **Detecção Rápida de Erros:** Builds e testes automatizados em cada commit ajudam a identificar problemas rapidamente.
*   **Builds Consistentes:** Elimina o problema de "funciona na minha máquina" ao padronizar o ambiente de build.
*   **Ciclos de Feedback Mais Curtos:** Desenvolvedores recebem feedback sobre suas alterações mais rapidamente.
*   **Lançamentos Mais Confiáveis:** Processos automatizados reduzem o risco de erro humano durante o lançamento.
*   **Maior Velocidade de Entrega:** Permite lançar novas funcionalidades e correções de bugs com mais frequência.
*   **Foco no Desenvolvimento:** Libera os desenvolvedores de tarefas manuais de build e deploy.
*   **Melhoria da Qualidade do Código:** A execução constante de linters e testes incentiva melhores práticas.

### Componentes de um Pipeline de CI/CD para React Native

Um pipeline típico pode incluir as seguintes etapas:

1.  **Trigger (Gatilho):** Inicia o pipeline. Geralmente um `git push` para um branch específico (ex: `main`, `develop`, `release/*`) ou a criação de um Pull Request/Merge Request.
2.  **Checkout do Código:** Baixa a versão mais recente do código do repositório.
3.  **Configuração do Ambiente:**
    *   Instala a versão correta do Node.js, Yarn/npm.
    *   Instala as dependências do Java Development Kit (JDK) para Android.
    *   Configura o ambiente Xcode (com a versão correta do macOS e Xcode) para iOS.
    *   Instala Ruby e Bundler para gerenciar CocoaPods e Fastlane (iOS).
4.  **Instalação de Dependências:**
    *   `yarn install` ou `npm install` para dependências JavaScript.
    *   `cd ios && pod install` para dependências do CocoaPods (iOS).
5.  **Linting e Análise Estática:**
    *   Executa ESLint, Prettier, TypeScript Compiler (tsc) para verificar a qualidade e o estilo do código.
6.  **Testes Automatizados:**
    *   Testes unitários e de componentes: `yarn test` (geralmente com Jest e React Native Testing Library).
    *   Testes E2E (opcional, pode ser uma etapa separada ou executada em paralelo em emuladores/dispositivos na nuvem).
7.  **Build do Aplicativo:**
    *   **Android:** Gera o `.aab` ou `.apk` assinado.
        *   `cd android && ./gradlew bundleRelease` (ou `assembleRelease`).
    *   **iOS:** Gera o `.ipa` arquivado e assinado.
        *   Geralmente usando ferramentas como Fastlane.
8.  **Assinatura de Código:**
    *   Gerencia de forma segura as chaves de assinatura (Android Keystore, Certificados de Distribuição e Perfis de Provisionamento iOS).
9.  **Distribuição/Deploy:**
    *   **Testes Internos/Staging:**
        *   Upload para Google Play Internal Testing ou Closed Testing.
        *   Upload para TestFlight (iOS).
        *   Deploy para um serviço de distribuição de apps ad-hoc (ex: Firebase App Distribution, App Center Distribute).
    *   **Produção (Pode ser manual ou automático após aprovação):**
        *   Upload para Google Play Production.
        *   Submissão para revisão na App Store Connect.
        *   Publicação de atualizações OTA (CodePush, Expo Updates).
10. **Notificações:** Informa a equipe sobre o status do build (sucesso, falha) via Slack, email, etc.

### Ferramentas Populares de CI/CD para React Native

Existem muitas ferramentas e serviços que podem ser usados para construir pipelines de CI/CD para React Native. Alguns são genéricos, enquanto outros são mais focados em mobile.

1.  **GitHub Actions:**
    *   Integrado diretamente com o GitHub.
    *   Permite criar workflows customizados usando arquivos YAML.
    *   Oferece runners hospedados para Linux, Windows e macOS (essencial para builds iOS).
    *   Ampla comunidade e marketplace com actions prontas.
    *   **Prós:** Excelente integração com GitHub, boa oferta no plano gratuito para projetos open source e privados.
    *   **Contras:** Gerenciar runners macOS pode ter limitações de tempo no plano gratuito; configuração pode ser verbosa.

2.  **GitLab CI/CD:**
    *   Integrado com o GitLab.
    *   Configuração via arquivo `.gitlab-ci.yml`.
    *   Permite usar seus próprios runners ou runners compartilhados do GitLab (incluindo macOS, com algumas ressalvas de disponibilidade/custo).
    *   **Prós:** Poderoso e flexível, bem integrado ao ecossistema GitLab.
    *   **Contras:** Runners macOS podem ser um desafio ou custo adicional se não auto-hospedados.

3.  **Bitrise:**
    *   Plataforma de CI/CD focada em mobile.
    *   Interface visual para construir workflows, com steps pré-configurados para tarefas comuns de mobile (build React Native, assinatura, deploy para lojas).
    *   Excelente suporte para macOS e Xcode.
    *   **Prós:** Muito amigável para mobile, steps específicos para React Native, bom gerenciamento de code signing.
    *   **Contras:** Pode ser mais caro para equipes maiores ou muitos builds.

4.  **App Center (Microsoft):**
    *   Oferece um conjunto de serviços para apps, incluindo Build, Test (em dispositivos reais na nuvem), Distribute (para testadores e lojas), Analytics, Diagnostics e CodePush (para OTA).
    *   **App Center Build:** Conecta ao seu repositório (GitHub, Bitbucket, Azure DevOps) e automatiza builds.
    *   **Prós:** Solução integrada, bom para quem já usa outros serviços Azure/Microsoft, CodePush é uma grande vantagem.
    *   **Contras:** Menos flexível que GitHub Actions ou GitLab CI para workflows complexos; o serviço de Test pode ser caro.

5.  **Codemagic:**
    *   Outra plataforma de CI/CD focada em mobile, com bom suporte para Flutter e React Native.
    *   Configuração via interface web ou arquivo YAML (`codemagic.yaml`).
    *   Acesso a máquinas macOS com diferentes versões do Xcode.
    *   **Prós:** Interface amigável, bom suporte para mobile, gerenciamento de code signing.
    *   **Contras:** Similar ao Bitrise em termos de precificação.

6.  **Jenkins:**
    *   Servidor de automação open-source altamente configurável.
    *   Requer auto-hospedagem e configuração manual extensiva.
    *   **Prós:** Gratuito, extremamente flexível, vasta quantidade de plugins.
    *   **Contras:** Curva de aprendizado íngreme, requer manutenção da infraestrutura do servidor Jenkins e dos agentes de build (incluindo máquinas macOS).

7.  **Expo Application Services (EAS) Build:**
    *   Se você usa Expo (mesmo no workflow "bare" com `expo-updates`), o EAS Build é um serviço de build na nuvem que simplifica a criação de binários para Android e iOS.
    *   Integrado com `eas submit` para enviar para as lojas.
    *   **Prós:** Muito simples de usar para projetos Expo ou que usam o ecossistema Expo, lida com complexidades de build nativo.
    *   **Contras:** Mais focado no ecossistema Expo; pode ter menos flexibilidade para customizações de build muito específicas fora do que o EAS oferece.

### Gerenciamento de Assinaturas de Código (Code Signing)

Esta é uma das partes mais desafiadoras do CI/CD para mobile:

*   **Android:**
    *   O arquivo Keystore (`.keystore`) e suas senhas precisam estar disponíveis para o servidor de CI.
    *   **Soluções:**
        *   Armazenar o keystore e as senhas como segredos criptografados no seu serviço de CI (ex: GitHub Secrets, GitLab CI Variables, Bitrise Secrets).
        *   Alguns serviços (Bitrise, Codemagic) têm gerenciamento de code signing integrado onde você faz upload do keystore de forma segura.

*   **iOS:**
    *   Requer Certificados de Desenvolvimento/Distribuição (`.p12` com senha) e Perfis de Provisionamento (`.mobileprovision`).
    *   **Soluções:**
        *   **Fastlane Match:** Uma ferramenta popular do Fastlane que armazena seus certificados e perfis em um repositório Git privado e criptografado. O servidor de CI clona este repositório e usa o Match para instalar os arquivos necessários.
        *   Serviços de CI como Bitrise, Codemagic, App Center geralmente têm mecanismos para fazer upload seguro desses arquivos.
        *   Para GitHub Actions/GitLab CI, você pode precisar converter os arquivos para base64, armazená-los como segredos, e decodificá-los no script de CI para instalá-los no keychain do runner macOS.

### Fastlane para Automação Mobile

[Fastlane](https://fastlane.tools/) é um conjunto de ferramentas open-source escrito em Ruby que automatiza muitas tarefas tediosas de desenvolvimento e lançamento mobile (iOS e Android).

*   **Funcionalidades:**
    *   `scan`: Executa testes.
    *   `gym`: Constrói e empacota o app iOS.
    *   `gradle` (via action): Executa tarefas Gradle para Android.
    *   `supply`: Faz upload de metadados, screenshots e binários para o Google Play.
    *   `deliver`: Faz upload de metadados, screenshots e binários para a App Store Connect.
    *   `pilot`: Gerencia testadores e builds do TestFlight.
    *   `match`: Gerencia certificados e perfis de provisionamento iOS.
    *   E muitas outras actions.

*   **Uso com CI/CD:**
    Você define suas automações em um `Fastfile` no seu projeto. O servidor de CI então executa as "lanes" (pistas/tarefas) do Fastlane.
    Exemplo de `Fastfile` (iOS lane para build e upload para TestFlight):
    ```ruby
    # ios/fastlane/Fastfile
    default_platform(:ios)

    platform :ios do
      desc "Build and upload to TestFlight"
      lane :beta do
        match(type: "appstore") # Gerencia code signing
        gym(scheme: "MeuApp", export_method: "app-store") # Constrói o .ipa
        pilot(skip_waiting_for_build_processing: true) # Upload para TestFlight

        # Opcional: notificar no Slack
        # slack(
        #   message: "Nova versão Beta enviada para TestFlight!",
        #   success: true
        # )
      end
    end
    ```
    No seu script de CI (ex: GitHub Actions workflow):
    ```yaml
    # .github/workflows/ios_beta_release.yml
    # ... (configuração do job, checkout, setup ruby, node, etc.)
    - name: Install CocoaPods dependencies
      run: cd ios && pod install
    
    - name: Setup Fastlane
      run: cd ios && bundle install

    - name: Run Fastlane Beta Lane
      run: cd ios && bundle exec fastlane beta
      env:
        FASTLANE_USER: ${{ secrets.APPLE_ID_EMAIL }}
        FASTLANE_PASSWORD: ${{ secrets.APPLE_APP_SPECIFIC_PASSWORD }}
        MATCH_PASSWORD: ${{ secrets.MATCH_PASSWORD }} # Senha para o repo de certificados
        # Outras variáveis de ambiente necessárias para o Fastlane
    ```

### Exemplo Simplificado de Workflow com GitHub Actions

**Workflow para Android (Build AAB e upload como artefato):**

```yaml
# .github/workflows/android_build.yml
name: Android Build

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3

    - name: Set up JDK 11
      uses: actions/setup-java@v3
      with:
        distribution: 'temurin'
        java-version: '11'

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18' # Ou a versão que seu projeto usa
        cache: 'yarn'

    - name: Install dependencies
      run: yarn install --frozen-lockfile

    # Opcional: Decodificar e configurar keystore a partir de segredos
    # - name: Decode Keystore
    #   run: echo "${{ secrets.ANDROID_KEYSTORE_BASE64 }}" | base64 --decode > android/app/upload-key.keystore

    - name: Build Android App Bundle
      run: cd android && ./gradlew bundleRelease
      # env:
      #   MYAPP_UPLOAD_STORE_FILE: upload-key.keystore
      #   MYAPP_UPLOAD_KEY_ALIAS: ${{ secrets.ANDROID_KEY_ALIAS }}
      #   MYAPP_UPLOAD_STORE_PASSWORD: ${{ secrets.ANDROID_STORE_PASSWORD }}
      #   MYAPP_UPLOAD_KEY_PASSWORD: ${{ secrets.ANDROID_KEY_PASSWORD }}

    - name: Upload AAB Artifact
      uses: actions/upload-artifact@v3
      with:
        name: app-release-aab
        path: android/app/build/outputs/bundle/release/app-release.aab
```
**Nota:** O gerenciamento de segredos (keystore, senhas, certificados Apple) é crucial e deve ser feito usando os mecanismos de segredos da sua plataforma de CI.

### Melhores Práticas para CI/CD em React Native

*   **Comece Simples:** Automatize uma etapa de cada vez (ex: testes, depois build Android, depois build iOS).
*   **Versionamento Consistente:** Use versionamento semântico (SemVer) e tags Git para marcar releases.
*   **Gerenciamento de Segredos:** Nunca comite chaves, senhas ou certificados no seu repositório. Use os sistemas de gerenciamento de segredos da sua plataforma de CI.
*   **Ambientes de Build Limpos:** Certifique-se de que cada build comece de um ambiente limpo para evitar inconsistências.
*   **Cache de Dependências:** Use caching para acelerar a instalação de dependências (Node modules, CocoaPods, Gradle dependencies).
*   **Builds Paralelos:** Se possível, execute builds Android e iOS em paralelo para economizar tempo.
*   **Monitoramento e Alertas:** Configure notificações para falhas de build e sucessos de deploy.
*   **Testes Abrangentes:** Quanto mais confiança você tiver nos seus testes automatizados, mais seguro será o processo de CD.
*   **Iteração:** Seu pipeline de CI/CD é um produto vivo. Melhore-o e adapte-o continuamente às necessidades do seu projeto.

Implementar CI/CD para React Native requer um investimento inicial de tempo e configuração, mas os benefícios a longo prazo em termos de eficiência, qualidade e velocidade de entrega são imensos.


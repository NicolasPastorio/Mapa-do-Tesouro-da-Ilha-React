# Guia Completo de React Native: Do Básico ao Intermediário

## Seção 1: Introdução ao React Native e Configuração do Ambiente

Bem-vindo ao universo do desenvolvimento de aplicativos móveis com React Native! Se você busca uma maneira eficiente de criar aplicações nativas para iOS e Android utilizando seus conhecimentos em JavaScript e React, está no lugar certo. React Native emergiu como uma das tecnologias mais populares e poderosas para o desenvolvimento mobile multiplataforma, permitindo que equipes de desenvolvimento alcancem alta produtividade e entreguem experiências de usuário ricas e fluidas.

Nesta primeira seção, mergulharemos nos conceitos fundamentais do React Native. Exploraremos o que exatamente é essa framework, quais são suas principais vantagens que atraem tantos desenvolvedores e empresas, e também discutiremos algumas de suas desvantagens ou desafios que você pode encontrar pelo caminho. Entender esses aspectos é crucial para tomar decisões informadas sobre quando e como utilizar o React Native em seus projetos.

Além da conceituação, uma parte essencial para iniciar qualquer jornada de desenvolvimento é a preparação do ambiente. Detalharemos o processo de configuração do seu ambiente de desenvolvimento, abordando as duas principais abordagens: o Expo CLI, que oferece uma experiência mais simplificada e rápida para começar, ideal para iniciantes e para muitos tipos de projetos; e o React Native CLI, que proporciona maior flexibilidade e acesso a funcionalidades nativas mais profundas, sendo a escolha para projetos que exigem customizações mais complexas. Guiá-lo-emos passo a passo na criação do seu primeiro projeto React Native e, em seguida, desvendaremos a estrutura típica de pastas e arquivos de um projeto, para que você se familiarize com onde cada peça do quebra-cabeça se encaixa. Ao final desta seção, você terá uma base sólida para começar a construir suas próprias aplicações.

### O que é React Native?

React Native é uma framework de desenvolvimento de aplicações móveis de código aberto, criada pelo Facebook (atual Meta). Lançada em 2015, ela permite que desenvolvedores construam aplicativos móveis com aparência e sensação nativas utilizando JavaScript e a biblioteca React. A principal proposta do React Native é "Learn once, write anywhere" (Aprenda uma vez, escreva em qualquer lugar), o que significa que, com o conhecimento de React, é possível desenvolver para múltiplas plataformas (primariamente iOS e Android) sem a necessidade de aprender linguagens específicas de cada plataforma, como Swift/Objective-C para iOS ou Java/Kotlin para Android, para a maior parte do desenvolvimento.

A mágica por trás do React Native reside na sua capacidade de traduzir os componentes React em elementos de interface de usuário (UI) nativos reais. Diferentemente de outras abordagens que utilizam WebViews para renderizar o conteúdo (como o Cordova ou Ionic em seus modos mais antigos), o React Native interage diretamente com as APIs nativas de renderização. Isso resulta em interfaces de usuário que não são apenas simulações, mas sim componentes nativos genuínos, proporcionando uma performance e experiência de usuário muito próximas às de um aplicativo desenvolvido nativamente.

O desenvolvimento em React Native é baseado em componentes, uma filosofia herdada do React. A UI é construída como uma árvore de componentes, onde cada componente encapsula sua própria lógica e aparência. Esses componentes podem ser reutilizados e combinados para criar interfaces complexas. O React Native já vem com um conjunto de componentes essenciais, como `View`, `Text`, `Image`, `ScrollView`, `TextInput`, entre outros, que são mapeados para seus equivalentes nativos em cada plataforma.

Além disso, o React Native permite a integração com código nativo escrito em Swift, Objective-C, Java ou Kotlin. Isso é particularmente útil quando se precisa acessar APIs específicas da plataforma que ainda não possuem uma abstração em JavaScript, ou quando se busca otimizar partes críticas da aplicação para máxima performance. Essa capacidade de "ejetar" ou integrar módulos nativos confere ao React Native uma grande flexibilidade e poder.

### Vantagens do React Native

O React Native conquistou uma popularidade expressiva no ecossistema de desenvolvimento mobile, e isso se deve a uma série de vantagens significativas que oferece tanto para desenvolvedores individuais quanto para grandes empresas. A capacidade de criar aplicativos para múltiplas plataformas com uma única base de código JavaScript é, sem dúvida, um dos maiores atrativos, mas os benefícios vão além.

Uma das principais vantagens é a **economia de tempo e custo**. Ao invés de manter duas equipes separadas (uma para iOS e outra para Android) e dois códigos-fonte distintos, as empresas podem ter uma única equipe de desenvolvedores JavaScript trabalhando em uma base de código unificada. Isso não apenas acelera o processo de desenvolvimento, mas também reduz os custos associados à contratação e manutenção de equipes especializadas em diferentes tecnologias nativas. A reutilização de código entre plataformas pode chegar a percentuais muito altos, dependendo da complexidade e das especificidades de cada aplicativo.

Outro ponto forte é a **experiência de desenvolvimento aprimorada**. O React Native herda muitas das características que tornam o desenvolvimento com React tão agradável, como o Hot Reloading (ou Fast Refresh). Essa funcionalidade permite que os desenvolvedores vejam as alterações no código refletidas quase instantaneamente no aplicativo em execução, sem a necessidade de recompilar todo o projeto. Isso agiliza drasticamente o ciclo de iteração e depuração, tornando o processo mais fluido e produtivo.

A **performance próxima à nativa** é uma vantagem crucial. Como mencionado anteriormente, o React Native renderiza componentes de UI nativos, o que resulta em aplicativos com alta performance e responsividade, diferentemente de soluções baseadas em WebView que podem sofrer com gargalos de desempenho. Embora possa haver cenários onde a performance de um aplicativo totalmente nativo seja superior, para a grande maioria das aplicações, o React Native oferece um desempenho mais do que satisfatório.

A **grande comunidade e ecossistema** em torno do React Native também são um benefício considerável. Por ser uma tecnologia de código aberto e amplamente adotada, existe uma vasta quantidade de bibliotecas, ferramentas, tutoriais e fóruns de discussão disponíveis. Isso significa que é mais fácil encontrar soluções para problemas comuns, aprender novas técnicas e integrar funcionalidades de terceiros em seus aplicativos. A comunidade ativa contribui constantemente com novos módulos e melhorias para a framework.

Além disso, a **transição suave para desenvolvedores web** que já conhecem React é uma grande vantagem. A curva de aprendizado para quem já domina React é significativamente menor, pois os conceitos fundamentais como componentes, estado, props e JSX são os mesmos. Isso permite que equipes de desenvolvimento web expandam suas habilidades para o desenvolvimento mobile com relativa facilidade.

Finalmente, a **possibilidade de integração com código nativo** garante que o React Native não seja uma caixa preta limitada. Se uma funcionalidade específica da plataforma ou uma otimização de performance crítica for necessária, os desenvolvedores têm a liberdade de escrever módulos nativos e integrá-los perfeitamente com a base de código JavaScript, oferecendo o melhor dos dois mundos.

### Desvantagens e Desafios do React Native

Apesar de suas inúmeras vantagens, o React Native não é uma solução universal e apresenta algumas desvantagens e desafios que os desenvolvedores e equipes devem considerar antes de adotá-lo. Estar ciente dessas limitações é fundamental para tomar decisões arquiteturais sólidas e gerenciar as expectativas do projeto.

Um dos desafios pode ser a **performance em casos de uso muito intensivos**. Embora o React Native ofereça uma performance próxima à nativa para a maioria das aplicações, em cenários que exigem computação gráfica muito complexa, animações pesadas ou processamento intensivo em tempo real, ele pode não ser tão eficiente quanto um aplicativo totalmente nativo. A comunicação entre a thread JavaScript e as threads nativas (a chamada "bridge") pode, em algumas situações, se tornar um gargalo, embora melhorias contínuas na arquitetura do React Native, como a introdução da Fabric UI layer e do TurboModules, visem mitigar esses problemas.

A **necessidade de conhecimento nativo para funcionalidades complexas** é outra consideração. Embora o objetivo seja escrever a maior parte do código em JavaScript, ocasionalmente será preciso interagir com APIs nativas específicas que não possuem um módulo React Native pronto, ou otimizar partes críticas da aplicação escrevendo código nativo. Nesses casos, ter algum conhecimento de Swift/Objective-C (para iOS) ou Java/Kotlin (para Android), ou contar com desenvolvedores nativos na equipe, pode ser indispensável.

O **tamanho do aplicativo** gerado pode ser, em alguns casos, maior do que o de um aplicativo puramente nativo. Isso ocorre porque o React Native precisa empacotar o runtime do JavaScript e as bibliotecas necessárias junto com o código da aplicação. Embora existam técnicas para otimizar o tamanho do bundle, essa é uma característica a ser considerada, especialmente para usuários com conexões de internet lentas ou dispositivos com pouco espaço de armazenamento.

**Atualizações e compatibilidade** podem, por vezes, apresentar desafios. O React Native é uma framework em constante evolução, com novas versões sendo lançadas regularmente. Manter o projeto atualizado com as últimas versões pode exigir esforço e, ocasionalmente, podem surgir problemas de compatibilidade com bibliotecas de terceiros que ainda não foram atualizadas para suportar as mudanças mais recentes na framework. A depuração de certos problemas também pode ser mais complexa, pois envolve a interação entre o mundo JavaScript e o mundo nativo.

Outro ponto é que, embora o React Native busque fornecer uma experiência de UI consistente, **algumas diferenças de comportamento e aparência entre iOS e Android** podem exigir ajustes específicos para cada plataforma. Nem todos os componentes nativos se comportam ou se parecem exatamente da mesma forma nas duas plataformas, e os desenvolvedores podem precisar escrever código condicional ou estilos específicos para garantir uma experiência de usuário ideal em ambos os sistemas operacionais.

Por fim, a **abstração nem sempre é perfeita**. Embora o React Native faça um excelente trabalho ao abstrair as complexidades do desenvolvimento nativo, essa abstração pode, às vezes, vazar. Entender como o React Native funciona por baixo dos panos, incluindo a bridge e o ciclo de vida dos componentes nativos, pode ser necessário para depurar problemas mais complexos ou para otimizar a performance de forma eficaz.

### Configuração do Ambiente de Desenvolvimento

Para começar a desenvolver aplicativos com React Native, o primeiro passo é configurar o ambiente de desenvolvimento em sua máquina. Existem duas abordagens principais para isso: utilizando o **Expo CLI** ou o **React Native CLI (tambiente conhecido como Bare Workflow)**. A escolha entre eles depende das necessidades do seu projeto e do seu nível de familiaridade com o desenvolvimento mobile nativo.

**1. Expo CLI: A Abordagem Simplificada**

O Expo é um conjunto de ferramentas e serviços construídos em torno do React Native que visa simplificar o desenvolvimento e a implantação de aplicativos. Com o Expo CLI, você pode iniciar um projeto rapidamente sem precisar instalar ou configurar o Xcode (para iOS) ou o Android Studio (para Android) diretamente em sua máquina para o desenvolvimento inicial. Ele gerencia grande parte da complexidade da build nativa para você.

**Vantagens do Expo CLI:**
*   **Configuração Rápida:** Começar um novo projeto é muito simples e rápido.
*   **Desenvolvimento Simplificado:** Você pode testar seu aplicativo diretamente no seu dispositivo físico usando o aplicativo Expo Go (disponível para iOS e Android) apenas escaneando um QR Code, ou em emuladores/simuladores.
*   **APIs Pré-construídas:** O Expo SDK fornece acesso a muitas APIs nativas (como câmera, localização, notificações, sensores) de forma unificada e fácil de usar em JavaScript.
*   **Builds na Nuvem:** O Expo oferece serviços de build na nuvem (EAS Build) que podem compilar seus arquivos `.ipa` (iOS) e `.apk`/`.aab` (Android) sem que você precise ter o ambiente nativo totalmente configurado localmente.
*   **Atualizações Over-the-Air (OTA):** Permite enviar pequenas atualizações de JavaScript diretamente para os usuários sem passar pelo processo de revisão das lojas de aplicativos.

**Como instalar e usar o Expo CLI:**

Primeiramente, você precisará do Node.js (versão LTS recomendada) instalado em seu sistema. O Node.js vem com o npm (Node Package Manager), que usaremos para instalar o Expo CLI.

Abra seu terminal ou prompt de comando e execute:
```bash
npm install -g expo-cli
```
Este comando instala o Expo CLI globalmente em sua máquina.

Para criar um novo projeto com Expo, navegue até o diretório onde deseja criar seu projeto e execute:
```bash
expo init MeuPrimeiroAppExpo
```
Substitua `MeuPrimeiroAppExpo` pelo nome que desejar para o seu projeto. O CLI oferecerá alguns templates para iniciar (como `blank` para um projeto mínimo, ou `tabs` para um projeto com navegação por abas). Escolha um template (o `blank` é um bom começo) e aguarde a instalação das dependências.

Após a criação do projeto, entre na pasta do projeto:
```bash
cd MeuPrimeiroAppExpo
```
E inicie o servidor de desenvolvimento:
```bash
npm start
# ou
expo start
```
Isso abrirá o Metro Bundler no seu navegador e exibirá um QR Code. Você pode escanear este QR Code com o aplicativo Expo Go no seu celular para rodar o aplicativo, ou usar as opções para abrir em um simulador iOS ou emulador Android (se você os tiver instalados e configurados).

**2. React Native CLI (Bare Workflow): A Abordagem Flexível**

O React Native CLI oferece um controle mais granular sobre o projeto, incluindo acesso direto aos arquivos e configurações nativas (iOS e Android). Essa abordagem é necessária se você precisa integrar módulos nativos que não são suportados pelo Expo Go, ou se precisa de total controle sobre o processo de build nativo.

**Vantagens do React Native CLI:**
*   **Flexibilidade Total:** Acesso completo aos projetos nativos, permitindo a integração de qualquer biblioteca nativa ou escrita de código nativo customizado.
*   **Controle sobre Dependências Nativas:** Você gerencia todas as dependências nativas diretamente.
*   **Ideal para Projetos Complexos:** Quando as limitações do ambiente gerenciado do Expo se tornam um impedimento.

**Como configurar o ambiente para o React Native CLI:**

A configuração para o React Native CLI é mais envolvida, pois requer a instalação das ferramentas de desenvolvimento nativo específicas de cada plataforma.

**Requisitos Comuns:**
*   **Node.js:** Versão LTS recomendada.
*   **Watchman:** Recomendado para macOS, para monitorar mudanças no sistema de arquivos.
*   **React Native Command Line Interface:** Instalado via npm.

Execute no terminal:
```bash
npm install -g react-native-cli
```

**Para desenvolvimento iOS (requer macOS):**
*   **Xcode:** Instale a versão mais recente pela Mac App Store. Ele inclui o SDK do iOS, simulador e ferramentas de linha de comando necessárias.
*   **CocoaPods:** Gerenciador de dependências para projetos Xcode. Instale com `sudo gem install cocoapods`.

**Para desenvolvimento Android (Windows, macOS ou Linux):**
*   **Java Development Kit (JDK):** Instale uma versão compatível (geralmente OpenJDK é recomendado).
*   **Android Studio:** Instale o Android Studio. Ele inclui o Android SDK, emuladores e ferramentas de build. Durante a instalação, certifique-se de instalar:
    *   Android SDK (geralmente a versão mais recente é boa).
    *   Android SDK Platform (API de nível correspondente ao que você pretende usar).
    *   Android Virtual Device (AVD) para criar emuladores.
*   **Configuração de Variáveis de Ambiente:** Configure as variáveis `ANDROID_HOME` (ou `ANDROID_SDK_ROOT`) e adicione as pastas `platform-tools` e `emulator` do SDK ao seu PATH.

A documentação oficial do React Native (`reactnative.dev/docs/environment-setup`) fornece um guia detalhado e atualizado para configurar o ambiente para cada sistema operacional e plataforma de destino. É altamente recomendável seguir o guia oficial, pois os requisitos podem mudar com novas versões.

Para criar um novo projeto com React Native CLI, execute:
```bash
npx react-native init MeuPrimeiroAppNativo
```
Substitua `MeuPrimeiroAppNativo` pelo nome desejado.

Após a criação, entre na pasta do projeto:
```bash
cd MeuPrimeiroAppNativo
```
Para rodar no iOS (em macOS, com Xcode e CocoaPods configurados):
```bash
npx react-native run-ios
```
Para rodar no Android (com Android Studio, SDK e emulador/dispositivo configurados):
Primeiro, inicie o Metro Bundler em um terminal separado:
```bash
npx react-native start
```
Em outro terminal, na pasta do projeto, execute:
```bash
npx react-native run-android
```

**Qual escolher? Expo CLI ou React Native CLI?**
*   **Para iniciantes ou projetos que não exigem módulos nativos customizados:** Começar com Expo CLI é geralmente mais fácil e rápido.
*   **Se você sabe que precisará de bibliotecas nativas específicas não suportadas pelo Expo Go, ou precisa de controle total sobre o build nativo:** O React Native CLI é a melhor escolha. Vale notar que projetos Expo podem ser "ejetados" para o Bare Workflow se necessário, embora esse processo possa adicionar complexidade.

### Criando o Primeiro Projeto

Vamos criar nosso primeiro projeto utilizando ambas as abordagens para ilustrar o processo inicial.

**Com Expo CLI:**

Como vimos, após instalar o `expo-cli` globalmente (`npm install -g expo-cli`), o comando para criar um novo projeto é:

```bash
expo init MeuAppExpo
```

O CLI perguntará qual template você deseja usar. Para um começo simples, escolha a opção "blank". Ele pode perguntar se prefere um template em JavaScript ou TypeScript; para este guia inicial, vamos assumir JavaScript, mas TypeScript é uma excelente escolha para projetos maiores.

```
? Choose a template: › - Use arrow keys. Return to submit.
    ----- Managed workflow -----
❯   blank                 Minimal app as clean as an empty canvas
    blank (TypeScript)    Minimal app as clean as an empty canvas with Typescript
    tabs (TypeScript)     Several example screens and tabs using react-navigation and Typescript
    tabs                  Several example screens and tabs using react-navigation
    ----- Bare workflow -----
    minimal               Bare and minimal, just the essentials to get you started
    minimal (TypeScript)  Bare and minimal, just the essentials to get you started with Typescript
```

Após a seleção, o Expo CLI fará o download do template e instalará as dependências. Uma vez concluído:

```bash
cd MeuAppExpo
npm start
```

Isso iniciará o Metro Bundler. Você verá um QR code no terminal e uma página web será aberta. Use o aplicativo Expo Go no seu smartphone para escanear o QR code, ou use as opções no terminal/página web para abrir em um simulador/emulador.

**Com React Native CLI:**

Certifique-se de ter o ambiente de desenvolvimento nativo configurado conforme as instruções da documentação oficial do React Native. Após instalar o `react-native-cli` globalmente (`npm install -g react-native-cli`), o comando para criar um novo projeto é:

```bash
npx react-native init MeuAppNativo
```

Este comando criará uma nova pasta `MeuAppNativo` com a estrutura do projeto, incluindo as pastas `android` e `ios` com os projetos nativos.

Após a conclusão:

```bash
cd MeuAppNativo
```

Para executar no iOS (em um Mac com Xcode configurado):
```bash
npx react-native run-ios
```
Isso compilará o projeto nativo iOS e o executará no Simulador iOS padrão, ou em um dispositivo conectado se configurado.

Para executar no Android (com Android Studio e SDK configurados, e um emulador rodando ou dispositivo conectado):
Primeiro, certifique-se de que o Metro Bundler está rodando. Se o comando `run-android` não o iniciar automaticamente, você pode iniciá-lo manualmente em um terminal separado dentro da pasta do projeto:
```bash
npx react-native start
```
Então, em outro terminal (na pasta do projeto):
```bash
npx react-native run-android
```
Isso compilará o projeto nativo Android e o instalará/executará no emulador ou dispositivo Android conectado.

Em ambos os casos, você deverá ver uma tela inicial padrão do React Native, indicando que seu projeto foi criado e está rodando com sucesso! A partir daqui, você pode começar a editar o arquivo principal (geralmente `App.js` ou `App.tsx`) para construir sua interface e lógica.

### Estrutura de um Projeto React Native

Ao criar um novo projeto React Native, seja com Expo CLI ou React Native CLI, uma estrutura de pastas e arquivos padrão é gerada. Compreender essa estrutura é fundamental para navegar e organizar seu código de forma eficaz.

**Estrutura Típica (pode variar ligeiramente entre Expo e Bare Workflow, e com templates):**

```
MeuProjeto/
├── android/          # (Apenas no Bare Workflow) Código nativo Android
├── ios/              # (Apenas no Bare Workflow) Código nativo iOS
├── node_modules/     # Dependências do projeto (JavaScript)
├── .expo/            # (Apenas com Expo) Arquivos de configuração e cache do Expo
├── assets/           # Recursos estáticos como imagens, fontes
├── src/              # (Opcional, boa prática) Onde seu código fonte JavaScript/TypeScript reside
│   ├── components/   # Componentes reutilizáveis da UI
│   ├── screens/      # Componentes que representam telas inteiras
│   ├── navigation/   # Configuração da navegação
│   ├── services/     # Lógica para interagir com APIs, etc.
│   ├── utils/        # Funções utilitárias
│   └── AppNavigator.js # Exemplo de arquivo de navegação
├── .buckconfig       # Configuração do sistema de build Buck (usado pelo Facebook)
├── .eslintrc.js      # Configuração do ESLint (ferramenta de linting de código)
├── .gitattributes    # Atributos do Git
├── .gitignore        # Arquivos e pastas a serem ignorados pelo Git
├── .prettierrc.js    # Configuração do Prettier (formatador de código)
├── App.js            # (ou App.tsx) Ponto de entrada principal da sua aplicação React Native
├── app.json          # (ou expo.json com Expo) Configurações do aplicativo (nome, ícone, splash screen, etc.)
├── babel.config.js   # Configuração do Babel (transpilador JavaScript)
├── index.js          # Ponto de entrada para o registro do componente raiz da aplicação
├── metro.config.js   # Configuração do Metro Bundler
├── package.json      # Metadados do projeto, scripts e lista de dependências npm
├── package-lock.json # (ou yarn.lock) Registra as versões exatas das dependências
└── README.md         # Informações sobre o projeto
```

**Principais Arquivos e Pastas:**

*   **`App.js` (ou `App.tsx`):** Este é geralmente o componente raiz da sua aplicação. É aqui que você começa a construir sua interface de usuário e a definir a lógica inicial. Em projetos com navegação, este arquivo pode configurar o navegador principal.

*   **`index.js`:** Este é o ponto de entrada real para a aplicação React Native. Ele usa `AppRegistry.registerComponent()` para registrar seu componente `App` como o componente raiz da aplicação. Normalmente, você não precisará modificar este arquivo com frequência.

*   **`app.json` (ou `expo.json` para projetos Expo):** Contém metadados e configurações globais para sua aplicação, como o nome de exibição, ícone, tela de splash, versão, orientação suportada, permissões para projetos Expo, e configurações de build. É um arquivo crucial para configurar como seu app se apresenta e se comporta no dispositivo.

*   **`package.json`:** Padrão em projetos Node.js, este arquivo lista todas as dependências do projeto (bibliotecas JavaScript) e define scripts úteis (como `npm start`, `npm run android`, `npm run ios`). Quando você instala uma nova biblioteca com `npm install nome-da-biblioteca` ou `yarn add nome-da-biblioteca`, ela é adicionada aqui.

*   **`node_modules/`:** Esta pasta contém todas as bibliotecas JavaScript (dependências) que seu projeto utiliza. Ela é gerenciada pelo npm ou Yarn e não deve ser versionada no Git (está no `.gitignore`).

*   **`assets/`:** Um local comum para armazenar recursos estáticos como imagens (PNG, JPG), fontes personalizadas, e outros arquivos que seu aplicativo possa precisar. Você pode organizar subpastas aqui (ex: `assets/images`, `assets/fonts`).

*   **`android/` e `ios/` (Apenas no Bare Workflow - React Native CLI):** Estas pastas contêm os projetos nativos completos para Android (Gradle) e iOS (Xcode), respectivamente. Você precisará interagir com estas pastas se precisar adicionar módulos nativos customizados, configurar permissões específicas da plataforma diretamente nos manifestos, ou ajustar configurações de build nativo. Para desenvolvedores que vêm do mundo web, essas pastas podem parecer intimidantes no início, mas para a maior parte do desenvolvimento React Native, você passará a maior parte do tempo trabalhando com código JavaScript fora delas.

*   **`src/` (Opcional, mas recomendado):** Muitos desenvolvedores criam uma pasta `src` (de "source") para organizar melhor o código da aplicação, separando-o dos arquivos de configuração na raiz do projeto. Dentro de `src`, é comum criar subpastas como `components` (para componentes de UI reutilizáveis), `screens` (para componentes que representam telas inteiras da aplicação), `navigation` (para configurar a navegação entre telas), `services` (para lógica de negócios, chamadas de API), `hooks`, `contexts`, `utils`, etc. Esta organização ajuda a manter o projeto escalável e fácil de manter.

*   **Arquivos de Configuração (`.eslintrc.js`, `.prettierrc.js`, `babel.config.js`, `metro.config.js`):**
    *   `ESLint` e `Prettier` são ferramentas para manter a qualidade e consistência do código. ESLint analisa o código em busca de erros e problemas de estilo, enquanto Prettier formata o código automaticamente.
    *   `Babel` é um transpilador JavaScript que permite usar as funcionalidades mais recentes do JavaScript (ES6+) convertendo-as para uma versão que os ambientes de execução (como o motor JavaScript do React Native) entendem.
    *   `Metro` é o bundler JavaScript usado pelo React Native. Ele agrupa todo o seu código JavaScript e dependências em um único arquivo (ou alguns arquivos) que pode ser executado no dispositivo, e também habilita funcionalidades como o Fast Refresh.

Familiarizar-se com essa estrutura é o primeiro passo para se sentir confortável no ambiente de desenvolvimento React Native. À medida que seu aplicativo cresce, uma boa organização de pastas e arquivos se tornará cada vez mais importante.

Com esta introdução e a configuração do ambiente prontas, você está preparado para começar a explorar os blocos de construção fundamentais do React Native: os Componentes. Na próxima seção, mergulharemos nos componentes básicos, props, state e no JSX, que são essenciais para criar interfaces de usuário dinâmicas e interativas.

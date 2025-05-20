# Guia Completo de React Native: Do Básico ao Intermediário

## Sumário

1.  [Seção 1: Introdução ao React Native e Configuração do Ambiente](#seção-1-introdução-ao-react-native-e-configuração-do-ambiente)
    *   [O que é React Native?](#o-que-é-react-native)
    *   [Vantagens do React Native](#vantagens-do-react-native)
    *   [Desvantagens e Desafios do React Native](#desvantagens-e-desafios-do-react-native)
    *   [Configuração do Ambiente de Desenvolvimento](#configuração-do-ambiente-de-desenvolvimento)
    *   [Criando o Primeiro Projeto](#criando-o-primeiro-projeto)
    *   [Estrutura de um Projeto React Native](#estrutura-de-um-projeto-react-native)
2.  [Seção 2: Componentes Fundamentais do React Native](#seção-2-componentes-fundamentais-do-react-native)
    *   [Introdução aos Componentes](#introdução-aos-componentes)
    *   [Componentes Funcionais vs. Componentes de Classe (Foco em Funcionais com Hooks)](#componentes-funcionais-vs-componentes-de-classe-foco-em-funcionais-com-hooks)
    *   [JSX em Detalhes](#jsx-em-detalhes)
    *   [Props (Propriedades)](#props-propriedades)
    *   [State (Estado)](#state-estado)
    *   [Principais Componentes Básicos e Exemplos](#principais-componentes-básicos-e-exemplos)
3.  [Seção 3: Estilização e Layout em React Native](#seção-3-estilização-e-layout-em-react-native)
    *   [Introdução ao `StyleSheet`](#introdução-ao-stylesheet)
    *   [Estilização Inline vs. `StyleSheet`](#estilização-inline-vs-stylesheet)
    *   [Unidades de Medida e Cores](#unidades-de-medida-e-cores)
    *   [Layout com Flexbox](#layout-com-flexbox)
    *   [Posicionamento (Absolute e Relative)](#posicionamento-absolute-e-relative)
    *   [Dimensões (Width, Height, Percentages)](#dimensões-width-height-percentages)
    *   [Exemplos Práticos de Layouts Comuns](#exemplos-práticos-de-layouts-comuns)
4.  [Seção 4: Navegação em Aplicativos React Native](#seção-4-navegação-em-aplicativos-react-native)
    *   [Introdução à Navegação em Aplicativos Móveis](#introdução-à-navegação-em-aplicativos-móveis)
    *   [React Navigation: A Solução Padrão da Comunidade](#react-navigation-a-solução-padrão-da-comunidade)
    *   [Stack Navigator (`@react-navigation/stack`)](#stack-navigator-react-navigationstack)
    *   [Tab Navigator (`@react-navigation/bottom-tabs` ou `@react-navigation/material-top-tabs`)](#tab-navigator-react-navigationbottom-tabs-ou-react-navigationmaterial-top-tabs)
    *   [Drawer Navigator (`@react-navigation/drawer`)](#drawer-navigator-react-navigationdrawer)
    *   [Combinando Navegadores](#combinando-navegadores)
    *   [Exemplos Práticos de Fluxos de Navegação](#exemplos-práticos-de-fluxos-de-navegação)
5.  [Seção 5: Trabalhando com APIs Externas e Dados Locais](#seção-5-trabalhando-com-apis-externas-e-dados-locais)
    *   [Introdução a Requisições HTTP (fetch API, Axios)](#introdução-a-requisições-http-fetch-api-axios)
    *   [Lidando com Respostas (JSON)](#lidando-com-respostas-json)
    *   [Exibindo Dados de APIs em Listas](#exibindo-dados-de-apis-em-listas)
    *   [Tratamento de Erros e Estados de Carregamento](#tratamento-de-erros-e-estados-de-carregamento)
    *   [Armazenamento Local (`AsyncStorage`)](#armazenamento-local-asyncstorage)
6.  [Seção 6: Funcionalidades Intermediárias do React Native](#seção-6-funcionalidades-intermediárias-do-react-native)
    *   [Gerenciamento de Estado Avançado](#gerenciamento-de-estado-avançado)
    *   [Ciclo de Vida de Componentes (com Hook `useEffect`)](#ciclo-de-vida-de-componentes-com-hook-useeffect)
    *   [Formulários e Validação](#formulários-e-validação)
    *   [Acesso a APIs Nativas (Câmera, Geolocalização, etc.)](#acesso-a-apis-nativas-câmera-geolocalização-etc)
    *   [Gestos e Animações Básicas](#gestos-e-animações-básicas)
    *   [Debugging e Ferramentas de Desenvolvedor](#debugging-e-ferramentas-de-desenvolvedor)
    *   [Boas Práticas e Otimização de Performance](#boas-práticas-e-otimização-de-performance)

---



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
*   **Android Studio:** Instale o Android Studio. Ele inclui o Android SDK, emuladores e ferramentas de build. Durante a instalação do Android Studio, certifique-se de instalar os seguintes componentes através do SDK Manager:
    *   Android SDK Platform (geralmente a mais recente)
    *   Intel x86 Atom_64 System Image ou Google APIs Intel x86 Atom System Image (para emuladores)
    *   Android SDK Build-Tools
    *   Android SDK Command-line Tools
    *   CMake
    *   NDK (Native Development Kit)
*   **Configurar Variáveis de Ambiente:** Adicione `ANDROID_HOME` (ou `ANDROID_SDK_ROOT`) ao seu path, bem como as pastas `platform-tools` e `emulator` do SDK.

**Criando um novo projeto com React Native CLI:**

Após configurar o ambiente nativo, você pode criar um projeto com:
```bash
npx react-native init MeuPrimeiroAppBare
```
Substitua `MeuPrimeiroAppBare` pelo nome do seu projeto.

Entre na pasta do projeto:
```bash
cd MeuPrimeiroAppBare
```
Para rodar no iOS (com Xcode e simulador abertos):
```bash
npx react-native run-ios
```
Para rodar no Android (com um emulador rodando ou dispositivo conectado):
```bash
npx react-native run-android
```

**Escolhendo entre Expo CLI e React Native CLI:**
*   **Comece com Expo CLI se:** Você é novo no React Native, quer um início rápido, não precisa de módulos nativos muito específicos imediatamente, ou valoriza a simplicidade do build e deploy.
*   **Use React Native CLI se:** Você precisa de um módulo nativo específico não suportado pelo Expo, precisa de controle total sobre o projeto nativo, ou está construindo uma aplicação com requisitos de performance ou hardware muito específicos.

É importante notar que você pode começar um projeto com Expo e, se necessário, "ejetar" para o Bare Workflow mais tarde usando `expo eject`. No entanto, a abordagem mais moderna é usar o EAS Build do Expo, que permite usar bibliotecas nativas customizadas mesmo em projetos gerenciados pelo Expo, tornando o `expo eject` menos necessário.

### Estrutura de um Projeto React Native

Ao criar um novo projeto React Native (seja com Expo ou React Native CLI), uma estrutura de pastas e arquivos padrão será gerada. Entender essa estrutura é fundamental para navegar e organizar seu código.

**Estrutura Típica (pode variar ligeiramente):**

```
MeuPrimeiroApp/
├── android/             # Pasta específica do Android (em projetos Bare Workflow ou após eject)
├── ios/                 # Pasta específica do iOS (em projetos Bare Workflow ou após eject)
├── node_modules/        # Dependências do projeto (JavaScript)
├── .expo/               # Arquivos de configuração e cache do Expo (em projetos Expo)
├── .expo-shared/        # Configurações compartilhadas do Expo
├── assets/              # Para arquivos estáticos como imagens, fontes
│   ├── icon.png
│   └── splash.png
├── App.js               # Componente raiz da sua aplicação (ou App.tsx se usando TypeScript)
├── app.json             # Configurações do aplicativo (nome, ícone, splash screen, etc.)
├── babel.config.js      # Configuração do Babel (transpilador JavaScript)
├── index.js             # Ponto de entrada da aplicação (registra o App.js)
├── metro.config.js      # Configuração do Metro Bundler
├── package.json         # Informações do projeto, scripts e dependências
├── package-lock.json    # ou yarn.lock - Gerencia versões exatas das dependências
└── README.md            # Informações sobre o projeto
```

**Principais Arquivos e Pastas:**

*   **`App.js` (ou `App.tsx`):** Este é geralmente o primeiro arquivo que você editará. É o componente React raiz da sua aplicação, onde você começará a construir sua interface de usuário.
*   **`index.js`:** É o ponto de entrada da aplicação. Ele usa `AppRegistry.registerComponent` para registrar o componente raiz (`App.js`) com o sistema nativo.
*   **`app.json` (ou `expo.name` e `expo.slug` em `package.json` para Expo mais antigo):** Contém metadados e configurações específicas do seu aplicativo, como nome de exibição, ícone, tela de splash, versão, orientação, permissões (para Expo), e outras configurações que afetam o build nativo.
*   **`package.json`:** Define as dependências do projeto (bibliotecas React Native, React, e outras bibliotecas JavaScript), scripts para executar comandos comuns (como `start`, `android`, `ios`), e informações gerais do projeto.
*   **`node_modules/`:** Diretório onde todas as dependências JavaScript listadas no `package.json` são instaladas.
*   **`assets/`:** Um local comum para armazenar ativos estáticos como imagens, fontes customizadas, etc. Você pode criar outras pastas para organizar seus próprios componentes, telas, serviços, etc.
*   **`android/` e `ios/`:** (Principalmente em projetos React Native CLI ou Expo após `eject`) Estas pastas contêm os projetos nativos Android (Gradle) e iOS (Xcode), respectivamente. Você precisará interagir com essas pastas se precisar adicionar módulos nativos, configurar permissões manualmente, ou ajustar configurações de build específicas da plataforma.
*   **`babel.config.js`:** Configura o Babel, que é usado para transpilar seu código JavaScript moderno (ES6+) e JSX para uma versão que os motores JavaScript dos dispositivos entendam.
*   **`metro.config.js`:** Configura o Metro, o bundler JavaScript usado pelo React Native. Ele agrupa todo o seu código JavaScript e dependências em um único arquivo e também lida com o Fast Refresh.

À medida que seu aplicativo cresce, é uma boa prática criar suas próprias pastas para organizar o código, como:
*   `src/` (source)
    *   `components/` (para componentes reutilizáveis)
    *   `screens/` (para componentes que representam telas inteiras)
    *   `navigation/` (para configuração de navegação)
    *   `services/` (para lógica de API, etc.)
    *   `hooks/` (para hooks customizados)
    *   `contexts/` (para contextos da Context API)
    *   `store/` (para configuração do Redux/Zustand)
    *   `utils/` (para funções utilitárias)
    *   `constants/` (para valores constantes)

Com o ambiente configurado e uma compreensão básica da estrutura do projeto, você está pronto para começar a explorar os componentes e a construir as interfaces do seu aplicativo React Native.

---


## Seção 2: Componentes Fundamentais do React Native

Após prepararmos nosso ambiente e termos uma compreensão inicial do que é o React Native, é hora de mergulhar nos blocos de construção essenciais de qualquer aplicativo React Native: os Componentes. Se você já teve contato com React para desenvolvimento web, muitos conceitos aqui serão familiares, pois o React Native adota a mesma filosofia de componentização. Nesta seção, exploraremos em profundidade o que são componentes, a sintaxe JSX que usamos para descrevê-los, como eles gerenciam dados através de `props` e `state`, e apresentaremos os componentes básicos mais utilizados no dia a dia do desenvolvimento mobile.

Dominar os componentes é crucial, pois toda a interface de usuário (UI) em React Native é uma árvore de componentes. Cada pequena parte da tela, desde um simples texto ou botão até uma lista complexa de itens, é um componente. Entender como criá-los, estilizá-los e fazê-los interagir é o cerne do desenvolvimento com esta framework.

### Introdução aos Componentes

No React e, por extensão, no React Native, um componente é uma peça de UI reutilizável e independente que encapsula sua própria lógica e aparência. Pense neles como blocos de Lego: você pode pegar vários blocos diferentes (componentes) e combiná-los para construir algo maior e mais complexo (sua tela ou aplicativo). Essa abordagem modular torna o código mais organizado, mais fácil de entender, de testar e de manter.

Existem duas formas principais de definir componentes em React Native:

1.  **Componentes Funcionais (Functional Components):** São funções JavaScript simples que recebem um objeto de `props` (propriedades) como argumento e retornam um elemento React (geralmente escrito em JSX) que descreve o que deve ser renderizado na tela. Com a introdução dos Hooks (como `useState`, `useEffect`, etc.), os componentes funcionais se tornaram a maneira predominante e recomendada de escrever componentes, pois permitem o uso de estado e outros recursos do React que antes eram exclusivos dos componentes de classe, mas com uma sintaxe mais concisa e moderna.

2.  **Componentes de Classe (Class Components):** São classes ES6 que estendem `React.Component`. Eles também recebem `props` e devem implementar um método `render()` que retorna um elemento React. Componentes de classe possuem acesso a funcionalidades como estado local (através de `this.state`) e métodos de ciclo de vida (como `componentDidMount` e `componentWillUnmount`). Embora ainda sejam suportados e você possa encontrá-los em códigos mais antigos, a tendência da comunidade e da documentação oficial é favorecer os componentes funcionais com Hooks.

Neste guia, focaremos primariamente em **Componentes Funcionais com Hooks**, pois representam a prática moderna e são mais fáceis de aprender e usar para a maioria dos casos.

Um componente pode ser tão simples quanto exibir um texto estático ou tão complexo quanto um formulário interativo com validação e lógica de submissão. A beleza da componentização é que você pode quebrar UIs complexas em pedaços menores e mais gerenciáveis.

### Componentes Funcionais vs. Componentes de Classe (Foco em Funcionais com Hooks)

Como mencionado, os componentes funcionais se tornaram a forma padrão de escrever componentes em React e React Native, principalmente após a introdução dos Hooks na versão 16.8 do React. Vamos entender brevemente as diferenças e por que os componentes funcionais são preferidos.

**Componentes Funcionais (com Hooks):**

São definidos como funções JavaScript. Antes dos Hooks, eram chamados de "componentes stateless" porque não podiam ter seu próprio estado interno nem acessar métodos de ciclo de vida. Os Hooks mudaram isso.

```javascript
// Exemplo de Componente Funcional Simples
import React from 'react';
import { Text, View } from 'react-native';

const Saudacao = (props) => {
  return (
    <View>
      <Text>Olá, {props.nome}!</Text>
    </View>
  );
};

export default Saudacao;
```

Com Hooks, podemos adicionar estado e outros comportamentos:

```javascript
// Exemplo de Componente Funcional com Hook useState
import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';

const Contador = () => {
  const [contagem, setContagem] = useState(0); // Hook useState para gerenciar o estado 'contagem'

  return (
    <View>
      <Text>Você clicou {contagem} vezes</Text>
      <Button title="Clique aqui" onPress={() => setContagem(contagem + 1)} />
    </View>
  );
};

export default Contador;
```

**Vantagens dos Componentes Funcionais com Hooks:**
*   **Sintaxe mais limpa e concisa:** Menos boilerplate em comparação com classes.
*   **Mais fácil de ler e entender:** A lógica relacionada a um determinado recurso (como estado ou efeitos colaterais) pode ser agrupada, em vez de espalhada por diferentes métodos de ciclo de vida.
*   **Reutilização de lógica com Hooks customizados:** Hooks permitem extrair lógica de estado e efeitos colaterais para funções reutilizáveis.
*   **Melhor performance em alguns casos:** O React pode otimizar componentes funcionais de forma mais eficaz.
*   **Evita a complexidade do `this`:** Em classes JavaScript, o comportamento do `this` pode ser confuso. Funções não têm essa preocupação da mesma forma.

**Componentes de Classe:**

Definidos usando a sintaxe de classe ES6, estendendo `React.Component`.

```javascript
// Exemplo de Componente de Classe
import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';

class ContadorClasse extends Component {
  constructor(props) {
    super(props);
    this.state = { // Estado é um objeto em componentes de classe
      contagem: 0,
    };
  }

  incrementarContagem = () => {
    this.setState({ contagem: this.state.contagem + 1 });
  }

  render() {
    return (
      <View>
        <Text>Você clicou {this.state.contagem} vezes (Classe)</Text>
        <Button title="Clique aqui (Classe)" onPress={this.incrementarContagem} />
      </View>
    );
  }
}

export default ContadorClasse;
```

Embora os componentes de classe ainda funcionem e sejam importantes para entender (especialmente ao trabalhar com bases de código legadas), **a recomendação atual é usar componentes funcionais com Hooks para novos desenvolvimentos em React Native.** Eles oferecem uma maneira mais moderna, flexível e, muitas vezes, mais simples de construir UIs.

### JSX em Detalhes

JSX (JavaScript XML) é uma extensão de sintaxe para JavaScript que se parece muito com HTML ou XML. Ele é usado com o React (e React Native) para descrever como a interface do usuário deve se parecer. Embora não seja obrigatório usar JSX (você poderia usar chamadas diretas a `React.createElement()`), ele torna o código muito mais legível e fácil de escrever, especialmente para quem tem familiaridade com HTML.

Quando você escreve JSX, ele é transpilado (convertido) pelo Babel em chamadas `React.createElement()` закулисно. Por exemplo, este código JSX:

```jsx
const elemento = <Text style={{ color: 'blue' }}>Olá, Mundo!</Text>;
```

É convertido para algo como:

```javascript
const elemento = React.createElement(Text, { style: { color: 'blue' } }, 'Olá, Mundo!');
```

**Principais Características do JSX em React Native:**

1.  **Uso de Componentes Nativos:** Em vez de tags HTML como `<div>` ou `<span>`, no React Native você usa componentes fornecidos pela framework, como `<View>`, `<Text>`, `<Image>`, etc., ou componentes que você mesmo cria.
    ```jsx
    <View>
      <Text>Este é um texto dentro de uma View.</Text>
      <Image source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} style={{ width: 50, height: 50 }} />
    </View>
    ```

2.  **Expressões JavaScript Embutidas:** Você pode embutir qualquer expressão JavaScript válida dentro de chaves `{}` no JSX. Isso é usado para exibir dados dinâmicos, chamar funções, ou usar operadores lógicos.
    ```jsx
    const nome = 'Usuário';
    const mostrarSaudacao = true;
    const elemento = (
      <View>
        {mostrarSaudacao && <Text>Bem-vindo, {nome.toUpperCase()}!</Text>}
        <Text>2 + 2 = {2 + 2}</Text>
      </View>
    );
    ```

3.  **Atributos (Props):** Assim como no HTML, você pode passar atributos para os componentes. No JSX, esses atributos são chamados de `props`. Se o valor da prop for uma string literal, use aspas. Se for uma expressão JavaScript (como um número, booleano, objeto, ou variável), use chaves.
    ```jsx
    <Image source={{ uri: 'url_da_imagem' }} style={{ width: 100, height: 100 }} />
    <MeuComponente customProp="um valor string" numeroProp={42} objetoProp={{ cor: 'vermelho' }} />
    ```
    Nomes de props geralmente seguem a convenção `camelCase` (ex: `minhaPropriedade`).

4.  **Estilização:** Estilos em React Native são geralmente definidos usando JavaScript. A prop `style` aceita um objeto de estilo ou um array de objetos de estilo. Os nomes das propriedades de estilo também são `camelCase` (ex: `backgroundColor` em vez de `background-color` do CSS).
    ```jsx
    <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'green' }}>Texto Estilizado</Text>
    ```
    Veremos mais sobre estilização na próxima seção.

5.  **Comentários:** Comentários dentro do JSX também usam chaves e a sintaxe de comentário de bloco do JavaScript.
    ```jsx
    <View>
      {/* Este é um comentário dentro do JSX */}
      <Text>Conteúdo</Text>
    </View>
    ```

6.  **Elementos Filhos:** Componentes podem ter outros componentes como filhos, formando uma hierarquia ou árvore de componentes.
    ```jsx
    <View>
      <Text>Título</Text>
      <MinhaLista>
        <ItemDaLista texto="Item 1" />
        <ItemDaLista texto="Item 2" />
      </MinhaLista>
    </View>
    ```

7.  **Um Único Elemento Raiz:** Uma função ou método `render()` de um componente deve retornar um único elemento JSX raiz. Se você precisar retornar múltiplos elementos adjacentes, você pode envolvê-los em um componente `View` ou usar um Fragmento (`<React.Fragment>...</React.Fragment>` ou a sintaxe curta `<>...</>`).
    ```jsx
    // Correto
    const MultiplosElementos = () => (
      <View>
        <Text>Elemento 1</Text>
        <Text>Elemento 2</Text>
      </View>
    );

    // Correto com Fragmento
    const MultiplosElementosComFragmento = () => (
      <>
        <Text>Elemento 1</Text>
        <Text>Elemento 2</Text>
      </>
    );
    ```

8.  **Nomes de Componentes com Letra Maiúscula:** Componentes customizados que você cria devem começar com uma letra maiúscula (ex: `<MeuComponente />`). Isso ajuda o JSX a diferenciá-los de tags HTML (no React web) ou de componentes nativos intrínsecos (que também começam com maiúscula no React Native, como `<View>`).

O JSX é uma ferramenta poderosa que torna a declaração de UIs em React Native intuitiva e expressiva. Embora possa parecer um pouco estranho no início se você nunca o viu, a maioria dos desenvolvedores se acostuma rapidamente e aprecia sua clareza.

### Props (Propriedades)

`Props` (abreviação de "properties" ou propriedades) são a maneira como os componentes recebem dados de seus componentes pais. Elas são somente leitura, o que significa que um componente não deve modificar suas próprias `props` diretamente. Pense nas `props` como argumentos de uma função: o componente pai passa dados para o componente filho através das `props`, e o filho usa esses dados para renderizar sua UI ou determinar seu comportamento.

**Como usar Props:**

1.  **Passando Props:** No componente pai, você passa `props` para um componente filho como se fossem atributos HTML.

    ```javascript
    // ComponentePai.js
    import React from 'react';
    import { View } from 'react-native';
    import CartaoDePerfil from './CartaoDePerfil'; // Supondo que CartaoDePerfil é um componente filho

    const TelaDePerfil = () => {
      return (
        <View>
          <CartaoDePerfil 
            nome="João Silva"
            idade={30} 
            profissao="Engenheiro de Software"
            imagemUri="https://exemplo.com/joao.jpg"
            ativo={true}
          />
          <CartaoDePerfil 
            nome="Maria Souza"
            idade={25} 
            profissao="Designer UX"
            imagemUri="https://exemplo.com/maria.jpg"
            ativo={false}
          />
        </View>
      );
    };

    export default TelaDePerfil;
    ```

2.  **Acessando Props:** No componente filho (se for um componente funcional), as `props` são recebidas como o primeiro argumento da função. É um objeto contendo todas as propriedades passadas pelo pai.

    ```javascript
    // CartaoDePerfil.js
    import React from 'react';
    import { View, Text, Image, StyleSheet } from 'react-native';

    const CartaoDePerfil = (props) => {
      return (
        <View style={styles.cartao}>
          <Image source={{ uri: props.imagemUri }} style={styles.imagem} />
          <Text style={styles.nome}>{props.nome}</Text>
          <Text>Idade: {props.idade}</Text>
          <Text>Profissão: {props.profissao}</Text>
          <Text>Status: {props.ativo ? 'Ativo' : 'Inativo'}</Text>
        </View>
      );
    };

    // Você também pode desestruturar as props diretamente nos argumentos da função:
    // const CartaoDePerfil = ({ nome, idade, profissao, imagemUri, ativo }) => { ... }

    const styles = StyleSheet.create({
      cartao: { padding: 10, margin: 10, borderWidth: 1, borderColor: '#ccc', alignItems: 'center' },
      imagem: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
      nome: { fontSize: 18, fontWeight: 'bold' },
    });

    export default CartaoDePerfil;
    ```

**Características Importantes das Props:**

*   **Somente Leitura:** Um componente nunca deve modificar suas `props`. Elas fluem em uma única direção: de pai para filho. Se um componente precisa modificar um valor que recebeu via `props`, o componente pai é quem deve gerenciar esse valor (provavelmente como parte de seu `state`) e passar a nova versão via `props`.
*   **`props.children`:** Existe uma `prop` especial chamada `children`. Ela contém qualquer conteúdo que é passado entre as tags de abertura e fechamento de um componente.

    ```javascript
    // ComponentePai.js
    import MeuContainer from './MeuContainer';
    // ...
    <MeuContainer titulo="Conteúdo Principal">
      <Text>Este é o conteúdo filho.</Text>
      <Button title="Clique-me" />
    </MeuContainer>

    // MeuContainer.js
    const MeuContainer = (props) => {
      return (
        <View style={{ borderWidth: 1, padding: 10 }}>
          <Text style={{ fontSize: 20 }}>{props.titulo}</Text>
          {props.children} {/* Renderiza o conteúdo filho aqui */}
        </View>
      );
    };
    ```

*   **Valores Padrão para Props (Default Props):** Você pode definir valores padrão para `props` caso o componente pai não as forneça. Em componentes funcionais, isso pode ser feito usando parâmetros padrão de função JavaScript ou a propriedade estática `defaultProps`.

    ```javascript
    // Usando parâmetros padrão
    const BotaoCustomizado = ({ titulo = "Padrão", cor = "blue" }) => {
      return <Button title={titulo} color={cor} onPress={() => {}} />;
    };

    // Usando defaultProps (mais comum em componentes de classe, mas funciona em funcionais)
    // const BotaoCustomizado = (props) => { ... };
    // BotaoCustomizado.defaultProps = {
    //   titulo: "Padrão",
    //   cor: "blue"
    // };
    ```

*   **PropTypes (ou TypeScript):** Para garantir que os componentes recebam `props` do tipo correto e que `props` obrigatórias sejam passadas, você pode usar a biblioteca `prop-types` (para JavaScript) ou, de forma mais robusta, usar TypeScript para tipagem estática. Isso ajuda a pegar erros mais cedo no desenvolvimento.

    ```javascript
    // Com prop-types
    import PropTypes from 'prop-types';

    const CartaoDePerfil = (props) => { /* ... */ };

    CartaoDePerfil.propTypes = {
      nome: PropTypes.string.isRequired,
      idade: PropTypes.number.isRequired,
      profissao: PropTypes.string,
      imagemUri: PropTypes.string.isRequired,
      ativo: PropTypes.bool,
    };

    CartaoDePerfil.defaultProps = {
      profissao: 'Não informado',
      ativo: false,
    };
    ```
    Com TypeScript, a verificação de tipos é feita em tempo de compilação, o que é ainda mais poderoso.

As `props` são fundamentais para criar componentes reutilizáveis e para o fluxo de dados em aplicações React Native.

### State (Estado)

Enquanto as `props` são usadas para passar dados de pai para filho, o `state` (estado) é usado para gerenciar dados que são internos a um componente e que podem mudar ao longo do tempo em resposta a interações do usuário, respostas de rede, ou outras lógicas do aplicativo. Quando o `state` de um componente muda, o React Native automaticamente re-renderiza o componente (e seus filhos, se necessário) para refletir essas mudanças na UI.

Em componentes funcionais, o `state` é gerenciado usando o Hook `useState`.

**Usando o Hook `useState`:**

O Hook `useState` retorna um par de valores: o valor atual do estado e uma função para atualizá-lo.

`const [valorDoEstado, setValorDoEstado] = useState(valorInicial);`

*   `valorDoEstado`: A variável que contém o valor atual do estado.
*   `setValorDoEstado`: A função que você chama para atualizar `valorDoEstado`. Quando esta função é chamada com um novo valor, o componente é re-renderizado.
*   `valorInicial`: O valor inicial do estado. Pode ser um número, string, booleano, array, objeto, etc.

**Exemplo de `useState`:**

```javascript
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet } from 'react-native';

const ExemploDeEstado = () => {
  // Estado para um contador
  const [contagem, setContagem] = useState(0);

  // Estado para um campo de texto
  const [textoInput, setTextoInput] = useState('');

  // Estado para um booleano (ex: alternar visibilidade)
  const [visivel, setVisivel] = useState(true);

  const incrementar = () => {
    setContagem(contagemAnterior => contagemAnterior + 1); // Forma segura de atualizar baseado no estado anterior
  };

  const alternarVisibilidade = () => {
    setVisivel(!visivel);
  };

  return (
    <View style={styles.containerEstado}>
      <Text>Contador: {contagem}</Text>
      <Button title="Incrementar" onPress={incrementar} />

      <TextInput
        style={styles.inputEstado}
        placeholder="Digite algo..."
        value={textoInput}
        onChangeText={novoTexto => setTextoInput(novoTexto)} // Atualiza o estado a cada mudança no texto
      />
      <Text>Você digitou: {textoInput}</Text>

      <Button title={visivel ? "Esconder Mensagem" : "Mostrar Mensagem"} onPress={alternarVisibilidade} />
      {visivel && <Text style={styles.mensagemVisivel}>Esta mensagem pode ser escondida!</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  containerEstado: { padding: 20, alignItems: 'center' },
  inputEstado: { height: 40, borderColor: 'gray', borderWidth: 1, marginVertical: 10, paddingHorizontal: 8, width: '80%' },
  mensagemVisivel: { marginTop: 10, color: 'green', fontSize: 16 },
});

export default ExemploDeEstado;
```

**Características Importantes do State:**

*   **Local ao Componente:** O `state` é privado e controlado pelo componente que o define. Ele não é acessível diretamente por componentes pais ou filhos (a menos que seja passado como `prop`).
*   **Assíncrono:** As atualizações de `state` podem ser assíncronas. O React pode agrupar múltiplas chamadas a `setState` (ou a função de atualização do `useState`) em uma única re-renderização para otimizar a performance. Portanto, não confie no valor do `state` imediatamente após chamar a função de atualização se precisar do valor novo para outra operação na mesma função. Se você precisa atualizar o estado baseado no estado anterior, use a forma funcional da função de atualização (ex: `setContagem(contagemAnterior => contagemAnterior + 1)`).
*   **Imutabilidade:** Ao atualizar o `state`, especialmente se for um objeto ou array, é uma boa prática tratar o estado como imutável. Em vez de modificar o objeto/array original diretamente, crie uma nova cópia com as alterações. Isso ajuda o React a detectar mudanças de forma eficiente e evita efeitos colaterais inesperados.

    ```javascript
    // Exemplo com estado de objeto
    const [usuario, setUsuario] = useState({ nome: 'Ana', idade: 28 });

    const atualizarIdade = () => {
      // Correto: criar um novo objeto
      setUsuario(usuarioAnterior => ({
        ...usuarioAnterior, // Copia todas as propriedades do objeto anterior
        idade: usuarioAnterior.idade + 1 // Atualiza a propriedade desejada
      }));

      // Incorreto: modificar o estado diretamente (NÃO FAÇA ISSO)
      // usuario.idade = 29;
      // setUsuario(usuario);
    };
    ```

O `state` é o que torna seus componentes dinâmicos e interativos. Entender como gerenciá-lo corretamente é fundamental para construir aplicações React Native funcionais.

### Principais Componentes Básicos e Exemplos

React Native vem com um conjunto de componentes essenciais que você usará constantemente para construir suas interfaces. Eles são projetados para serem multiplataforma, mapeando para os elementos de UI nativos correspondentes em iOS e Android.

Vamos explorar alguns dos mais importantes:

**1. `<View>`:**

*   O bloco de construção mais fundamental para UIs. É um container que suporta layout com Flexbox, estilos, alguns manipuladores de toque e acessibilidade.
*   Pode ser aninhado para criar hierarquias de layout complexas.
*   Similar a uma `<div>` no desenvolvimento web.

```jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploView = () => {
  return (
    <View style={stylesView.container}>
      <View style={stylesView.box1}>
        <Text style={stylesView.textoBox}>Caixa 1</Text>
      </View>
      <View style={stylesView.box2}>
        <Text style={stylesView.textoBox}>Caixa 2</Text>
      </View>
      <View style={stylesView.box3}>
        <Text style={stylesView.textoBox}>Caixa 3</Text>
      </View>
    </View>
  );
};

const stylesView = StyleSheet.create({
  container: { flex: 1, flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#f0f0f0', paddingTop: 20 },
  box1: { width: 100, height: 100, backgroundColor: 'skyblue', justifyContent: 'center', alignItems: 'center' },
  box2: { width: 120, height: 80, backgroundColor: 'steelblue', justifyContent: 'center', alignItems: 'center' },
  box3: { width: 80, height: 120, backgroundColor: 'powderblue', justifyContent: 'center', alignItems: 'center' },
  textoBox: { color: 'white', fontWeight: 'bold' },
});

export default ExemploView;
```

**2. `<Text>`:**

*   Usado para exibir texto. Suporta aninhamento, estilização e manipuladores de toque.
*   Todo texto em React Native deve estar dentro de um componente `<Text>`. Você não pode ter texto solto dentro de uma `<View>`.

```jsx
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const ExemploText = () => {
  return (
    <View style={stylesText.container}>
      <Text style={stylesText.titulo}>Título Principal</Text>
      <Text style={stylesText.paragrafo}>
        Este é um parágrafo de exemplo. Você pode ter <Text style={stylesText.textoDestacado}>texto destacado</Text> dentro de outro texto.
      </Text>
      <Text onPress={() => alert('Texto clicado!')} style={stylesText.link}>
        Clique aqui (Texto clicável)
      </Text>
    </View>
  );
};

const stylesText = StyleSheet.create({
  container: { padding: 15 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  paragrafo: { fontSize: 16, lineHeight: 24, color: '#555', marginBottom: 10 },
  textoDestacado: { fontWeight: 'bold', color: 'tomato' },
  link: { color: 'blue', textDecorationLine: 'underline', marginTop: 5 },
});

export default ExemploText;
```

**3. `<Image>`:**

*   Usado para exibir diferentes tipos de imagens, incluindo imagens de rede, imagens estáticas do projeto, ou imagens temporárias locais (como da câmera).
*   Requer uma prop `source`. Para imagens de rede, `source={{ uri: 'url_da_imagem' }}`. Para imagens locais, `source={require('./caminho/para/imagem.png')}`.
*   É importante especificar as dimensões (`width` e `height`) para imagens de rede para que o React Native saiba quanto espaço reservar para elas.

```jsx
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

// Suponha que você tenha uma imagem local em assets/logo.png
// const logoLocal = require('./assets/logo.png'); // Descomente se tiver a imagem

const ExemploImage = () => {
  return (
    <View style={stylesImage.container}>
      <Text style={stylesImage.legenda}>Imagem da Rede:</Text>
      <Image 
        style={stylesImage.imagemRede}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
        // resizeMode controla como a imagem se ajusta ao frame (cover, contain, stretch, repeat, center)
        resizeMode="contain" 
      />
      
      {/* <Text style={stylesImage.legenda}>Imagem Local:</Text> */}
      {/* <Image style={stylesImage.imagemLocal} source={logoLocal} /> */}
      {/* Para usar imagem local, crie uma pasta 'assets' na raiz do projeto, coloque 'logo.png' lá, e ajuste o require. */}
    </View>
  );
};

const stylesImage = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10 },
  legenda: { fontSize: 16, marginVertical: 10, fontWeight: 'bold' },
  imagemRede: { width: 150, height: 150, borderWidth: 1, borderColor: 'grey', marginBottom: 20 },
  imagemLocal: { width: 100, height: 100 },
});

export default ExemploImage;
```

**4. `<TextInput>`:**

*   Um componente de entrada de texto que permite ao usuário digitar texto.
*   Props comuns: `onChangeText` (função chamada quando o texto muda), `value` (para controlar o valor do input), `placeholder`, `keyboardType` (ex: `'numeric'`, `'email-address'`), `secureTextEntry` (para senhas), `multiline`.

```jsx
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const ExemploTextInput = () => {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={stylesInput.container}>
      <Text style={stylesInput.label}>Nome:</Text>
      <TextInput
        style={stylesInput.input}
        placeholder="Digite seu nome"
        value={nome}
        onChangeText={setNome} // setNome é a função do useState para atualizar o estado 'nome'
      />
      <Text>Olá, {nome || 'visitante'}!</Text>

      <Text style={stylesInput.label}>Senha:</Text>
      <TextInput
        style={stylesInput.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true} // Esconde o texto digitado
      />
    </View>
  );
};

const stylesInput = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5, marginBottom: 10 },
});

export default ExemploTextInput;
```

**5. `<Button>`:**

*   Um componente de botão básico que renderiza um botão específico da plataforma.
*   Props principais: `title` (texto do botão) e `onPress` (função a ser chamada quando o botão é pressionado).
*   A customização de estilo do `<Button>` é limitada. Para botões mais customizáveis, use `<TouchableOpacity>` ou `<TouchableHighlight>`.

```jsx
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const ExemploButton = () => {
  const handlePress = () => {
    Alert.alert('Botão Pressionado!', 'Você clicou no botão.');
  };

  return (
    <View style={stylesButton.container}>
      <Button 
        title="Clique Aqui"
        onPress={handlePress} 
        color="#841584" // Cor do botão (Android) ou do texto (iOS)
      />
      <View style={stylesButton.espaco} />
      <Button 
        title="Botão Desabilitado"
        onPress={handlePress} 
        disabled={true} // Desabilita o botão
      />
    </View>
  );
};

const stylesButton = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 10 },
  espaco: { marginVertical: 10 }, // Apenas para dar um espaço entre os botões
});

export default ExemploButton;
```

**6. `<TouchableOpacity>` e `<TouchableHighlight>` (Componentes de Toque):**

*   São wrappers que tornam seus componentes filhos (como `<View>` ou `<Text>`) responsivos ao toque, fornecendo feedback visual.
*   `TouchableOpacity`: Diminui a opacidade do filho quando pressionado.
*   `TouchableHighlight`: Escurece ou clareia o fundo do filho quando pressionado (requer que o filho tenha um fundo definido).
*   Ambos usam a prop `onPress`.

```jsx
import React from 'react';
import { View, Text, TouchableOpacity, TouchableHighlight, StyleSheet, Alert } from 'react-native';

const ExemploTouchables = () => {
  return (
    <View style={stylesTouch.container}>
      <TouchableOpacity 
        style={stylesTouch.touchableOpacityButton}
        onPress={() => Alert.alert('TouchableOpacity Pressionado')}
        activeOpacity={0.7} // Controla a opacidade quando ativo (0 a 1)
      >
        <Text style={stylesTouch.buttonText}>TouchableOpacity</Text>
      </TouchableOpacity>

      <TouchableHighlight
        style={stylesTouch.touchableHighlightButton}
        onPress={() => Alert.alert('TouchableHighlight Pressionado')}
        underlayColor="#DDDDDD" // Cor do feedback quando pressionado
      >
        <Text style={stylesTouch.buttonText}>TouchableHighlight</Text>
      </TouchableHighlight>
    </View>
  );
};

const stylesTouch = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  touchableOpacityButton: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 20,
  },
  touchableHighlightButton: {
    backgroundColor: 'mediumseagreen',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExemploTouchables;
```

**7. `<ScrollView>`:**

*   Um container genérico de rolagem que pode hospedar múltiplos componentes e visualizações.
*   Útil quando o conteúdo excede o tamanho da tela.
*   Renderiza todos os seus filhos de uma vez, o que pode ser um problema de performance para listas muito longas. Para listas longas, prefira `FlatList` ou `SectionList`.

```jsx
import React from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

const ExemploScrollView = () => {
  const items = Array.from({ length: 20 }, (_, i) => `Item ${i + 1}`);

  return (
    <ScrollView style={stylesScroll.scrollViewContainer}>
      <Text style={stylesScroll.tituloScroll}>Conteúdo Rolável</Text>
      {items.map((item, index) => (
        <View key={index} style={stylesScroll.itemScroll}>
          <Text style={stylesScroll.textoItemScroll}>{item}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const stylesScroll = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight || 0, // Para evitar sobreposição com a barra de status no Android
    backgroundColor: '#f5f5f5',
  },
  tituloScroll: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  itemScroll: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textoItemScroll: {
    fontSize: 18,
  },
});

export default ExemploScrollView;
```

**8. `<FlatList>`:**

*   Um componente de lista performático para renderizar listas simples e rolaveis.
*   Renderiza os itens de forma preguiçosa (lazy loading), apenas quando eles estão prestes a aparecer na tela, o que é ótimo para performance com listas longas.
*   Requer duas props principais: `data` (um array de dados) e `renderItem` (uma função que retorna o componente para cada item da lista).
*   Outras props úteis: `keyExtractor` (para fornecer chaves únicas para os itens), `ListHeaderComponent`, `ListFooterComponent`, `ListEmptyComponent`, `onEndReached` (para carregamento infinito), `refreshing` e `onRefresh` (para pull-to-refresh).

```jsx
import React, { useState } from 'react';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';

const DADOS_INICIAIS = [
  { id: '1', titulo: 'Primeiro Item da Lista' },
  { id: '2', titulo: 'Segundo Item Super Legal' },
  { id: '3', titulo: 'Terceiro e Último Item por Enquanto' },
  { id: '4', titulo: 'Quarto Item Adicional' },
  { id: '5', titulo: 'Quinto Elemento da Lista' },
];

const ItemDaLista = ({ item, onPress }) => (
  <TouchableOpacity onPress={() => onPress(item.id)} style={stylesFlatList.itemContainer}>
    <Text style={stylesFlatList.itemTitulo}>{item.titulo}</Text>
  </TouchableOpacity>
);

const ExemploFlatList = () => {
  const [selecionadoId, setSelecionadoId] = useState(null);
  const [dados, setDados] = useState(DADOS_INICIAIS);
  const [carregandoMais, setCarregandoMais] = useState(false);

  const renderizarItem = ({ item }) => {
    return (
      <ItemDaLista
        item={item}
        onPress={(id) => {
          setSelecionadoId(id);
          alert(`Item selecionado: ${item.titulo} (ID: ${id})`);
        }}
      />
    );
  };

  const carregarMaisItens = () => {
    if (carregandoMais || dados.length > 15) return; // Simula um limite
    setCarregandoMais(true);
    setTimeout(() => { // Simula uma chamada de API
      const novosItens = [];
      for (let i = 0; i < 5; i++) {
        novosItens.push({ id: `${Date.now()}_${i}`, titulo: `Novo Item ${dados.length + i + 1}` });
      }
      setDados(dadosAnteriores => [...dadosAnteriores, ...novosItens]);
      setCarregandoMais(false);
    }, 1500);
  };

  return (
    <FlatList
      data={dados}
      renderItem={renderizarItem}
      keyExtractor={item => item.id}
      extraData={selecionadoId} // Garante re-renderização se o estado externo mudar
      ListHeaderComponent={<Text style={stylesFlatList.headerFooter}>Cabeçalho da Lista</Text>}
      ListFooterComponent={carregandoMais ? <ActivityIndicator size="large" color="#0000ff" style={{marginVertical: 10}} /> : <Text style={stylesFlatList.headerFooter}>Fim da Lista</Text>}
      ListEmptyComponent={<Text style={stylesFlatList.listaVazia}>Nenhum item encontrado.</Text>}
      onEndReached={carregarMaisItens}
      onEndReachedThreshold={0.5} // Chama onEndReached quando o final estiver a 50% da altura visível
      // Para pull-to-refresh (exemplo básico):
      // refreshing={false} // Controlado por um estado de refresh
      // onRefresh={() => console.log('Atualizando lista...')}
    />
  );
};

const stylesFlatList = StyleSheet.create({
  itemContainer: { backgroundColor: '#f9c2ff', padding: 20, marginVertical: 8, marginHorizontal: 16, borderRadius: 5 },
  itemTitulo: { fontSize: 18, color: '#333' },
  headerFooter: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginVertical: 15, color: 'grey' },
  listaVazia: { textAlign: 'center', fontSize: 16, marginTop: 50, color: 'grey' },
});

export default ExemploFlatList;
```

**9. `<SectionList>`:**

*   Similar à `FlatList`, mas para renderizar listas divididas em seções lógicas, com cabeçalhos de seção opcionais.
*   Útil para listas agrupadas, como uma lista de contatos dividida por letras do alfabeto.
*   Requer uma prop `sections` (um array de objetos, onde cada objeto representa uma seção e tem uma propriedade `title` e uma propriedade `data` com os itens da seção) e `renderItem`. Também usa `renderSectionHeader`.

Estes são apenas alguns dos componentes fundamentais. O React Native oferece outros, e a comunidade contribui com muitos mais. A documentação oficial do React Native é um excelente recurso para explorar todos os componentes disponíveis e suas props.

Compreender como usar e combinar esses componentes, juntamente com o gerenciamento de `props` e `state`, forma a base para construir qualquer interface de usuário em React Native. Na próxima seção, aprenderemos como estilizar esses componentes para criar aparências visualmente atraentes e layouts responsivos.

---


## Seção 3: Estilização e Layout em React Native

Com uma boa compreensão dos componentes básicos do React Native, o próximo passo crucial é aprender como estilizá-los e organizá-los na tela para criar interfaces de usuário visualmente atraentes e funcionais. Nesta seção, vamos mergulhar no sistema de estilização do React Native, que, embora inspirado no CSS da web, possui suas particularidades. Abordaremos o `StyleSheet` para criar estilos otimizados, discutiremos a estilização inline, exploraremos as unidades de medida e cores, e, mais importante, desvendaremos o poder do Flexbox para construir layouts responsivos e adaptáveis a diferentes tamanhos de tela. Além disso, cobriremos conceitos de posicionamento e dimensionamento de elementos.

Uma interface bem projetada não é apenas sobre aparência; é sobre usabilidade e experiência do usuário. Dominar as técnicas de estilização e layout em React Native permitirá que você traduza designs complexos em aplicativos móveis polidos e profissionais.

### Introdução ao `StyleSheet`

No React Native, os estilos não são escritos em arquivos CSS separados como na web. Em vez disso, você define os estilos usando JavaScript, geralmente através do módulo `StyleSheet` fornecido pela framework. O `StyleSheet.create()` é usado para definir um conjunto de estilos de forma otimizada.

Usar `StyleSheet.create` em vez de objetos JavaScript simples para estilos tem algumas vantagens:

1.  **Performance:** Os estilos criados com `StyleSheet.create` são enviados pela bridge nativa apenas uma vez e referenciados por um ID. Isso pode levar a um melhor desempenho, especialmente para estilos complexos ou usados em muitos lugares, pois evita a recriação e a passagem repetida de objetos de estilo.
2.  **Validação:** `StyleSheet` pode validar os estilos que você está definindo, ajudando a pegar erros (como propriedades de estilo inválidas ou valores incorretos) mais cedo no desenvolvimento.
3.  **Organização:** Agrupa todos os seus estilos em um local claro e definido, tornando o código mais legível e fácil de manter.

**Como usar `StyleSheet.create`:**

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploStyleSheet = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Olá, StyleSheet!</Text>
      <Text style={[styles.paragrafo, styles.textoDestacado]}>Este é um parágrafo com múltiplos estilos.</Text>
      <View style={styles.caixaColorida} />
    </View>
  );
};

// Definindo os estilos usando StyleSheet.create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'dodgerblue',
    marginBottom: 10,
  },
  paragrafo: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  textoDestacado: {
    color: 'tomato',
    fontStyle: 'italic',
  },
  caixaColorida: {
    width: 100,
    height: 100,
    backgroundColor: 'lightgreen',
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'darkgreen',
    borderRadius: 10,
  },
});

export default ExemploStyleSheet;
```

No exemplo acima:
*   Importamos `StyleSheet` de `react-native`.
*   Chamamos `StyleSheet.create()` passando um objeto onde cada chave (`container`, `titulo`, etc.) é um nome para um conjunto de estilos, e o valor é um objeto com as declarações de estilo (propriedade: valor).
*   No componente, aplicamos os estilos usando a prop `style`. Por exemplo, `style={styles.container}`.
*   É possível aplicar múltiplos estilos a um componente passando um array de objetos de estilo para a prop `style`, como em `style={[styles.paragrafo, styles.textoDestacado]}`. Os estilos no array são aplicados da esquerda para a direita, então estilos posteriores no array podem sobrescrever estilos anteriores se houver conflito de propriedades.

As propriedades de estilo em React Native são nomeadas usando `camelCase` (ex: `backgroundColor`, `fontSize`, `fontWeight`) em vez de `kebab-case` (ex: `background-color`) como no CSS tradicional.

### Estilização Inline vs. `StyleSheet`

Além de usar `StyleSheet.create`, você também pode aplicar estilos diretamente a um componente usando um objeto JavaScript inline na prop `style`. Isso é conhecido como **estilização inline**.

```javascript
import React from 'react';
import { View, Text } from 'react-native';

const ExemploEstiloInline = () => {
  const corDoTextoVariavel = 'purple';

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text 
        style={{
          fontSize: 20,
          color: corDoTextoVariavel, // Usando uma variável no estilo inline
          fontWeight: 'bold',
          padding: 10,
          borderWidth: 1,
          borderColor: 'grey',
          borderRadius: 5,
        }}
      >
        Texto com Estilo Inline
      </Text>
    </View>
  );
};

export default ExemploEstiloInline;
```

**Quando usar qual?**

*   **`StyleSheet.create` (Preferível na maioria dos casos):**
    *   **Melhor performance:** Como mencionado, os estilos são otimizados.
    *   **Código mais limpo e organizado:** Separa os estilos da lógica do componente, tornando o JSX menos verboso.
    *   **Reutilização:** Fácil de reutilizar os mesmos estilos em múltiplos componentes ou em diferentes partes do mesmo componente.
    *   **Validação:** Ajuda a pegar erros de digitação ou propriedades inválidas.

*   **Estilização Inline:**
    *   **Estilos Dinâmicos:** Útil para estilos que mudam com base no estado ou props do componente, onde criar todas as variações no `StyleSheet` seria impraticável. No exemplo acima, `corDoTextoVariavel` é um bom caso para inline se essa cor mudar frequentemente.
    *   **Pequenos Ajustes ou Prototipação Rápida:** Para um ajuste muito específico e pequeno em um único componente, ou durante a prototipação, pode ser mais rápido usar inline.
    *   **Componentes Únicos:** Se um estilo é verdadeiramente único para uma instância de um componente e não será reutilizado.

**Combinação:** É comum usar `StyleSheet` para a maioria dos estilos e complementar com estilos inline para ajustes dinâmicos. Você pode combinar estilos de `StyleSheet` com estilos inline em um array:

```javascript
// ... (styles definidos com StyleSheet.create)
const MeuComponente = ({ isActive }) => {
  return (
    <View style={[styles.base, isActive ? styles.active : styles.inactive]}>
      <Text style={[styles.textoBase, { color: isActive ? 'green' : 'red' }]}>
        Status: {isActive ? 'Ativo' : 'Inativo'}
      </Text>
    </View>
  );
};
```
Neste caso, `styles.base`, `styles.active`, `styles.inactive`, e `styles.textoBase` viriam de um `StyleSheet.create`, enquanto `{ color: isActive ? 'green' : 'red' }` é um estilo inline dinâmico.

Em geral, a recomendação é favorecer `StyleSheet.create` pela organização e performance, e usar estilos inline criteriosamente para casos dinâmicos ou muito específicos.

### Unidades de Medida e Cores

**Unidades de Medida:**

No React Native, a maioria das dimensões e posições são especificadas como **números adimensionais**, que correspondem a **pixels independentes de densidade (dp ou dip)**. Isso significa que o React Native tenta fazer com que os elementos tenham aproximadamente o mesmo tamanho físico em telas com diferentes densidades de pixels.

*   **Números:** `width: 100`, `height: 50`, `fontSize: 16`, `margin: 10`, `padding: 5`, `borderWidth: 1`.
    Estes são os mais comuns e recomendados.

*   **Porcentagens:** Você também pode usar strings de porcentagem para `width`, `height`, `minWidth`, `minHeight`, `maxWidth`, `maxHeight`, `flexBasis`. A porcentagem é relativa ao elemento pai.
    `width: '50%'` (ocupa 50% da largura do pai).
    O suporte a porcentagens pode ter algumas nuances dependendo da propriedade e do contexto do layout, especialmente com Flexbox.

Unidades como `em`, `rem`, `vw`, `vh` do CSS web não são diretamente suportadas da mesma forma. Para responsividade baseada no tamanho da tela, você pode usar o módulo `Dimensions` para obter as dimensões da tela e calcular os tamanhos dinamicamente, ou usar bibliotecas de terceiros que ajudam com isso.

```javascript
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    width: windowWidth * 0.8, // 80% da largura da janela
    height: windowHeight / 2,  // Metade da altura da janela
  },
  imagemResponsiva: {
    width: '100%', // 100% da largura do container pai
    aspectRatio: 16 / 9, // Mantém a proporção 16:9, altura será calculada
  }
});
```

**Cores:**

React Native suporta várias formas de definir cores, similar ao CSS:

1.  **Nomes de Cores (Named Colors):** Um subconjunto dos nomes de cores do CSS é suportado (ex: `'red'`, `'blue'`, `'green'`, `'black'`, `'white'`, `'transparent'`).
    `color: 'tomato'`
    `backgroundColor: 'skyblue'`

2.  **Hexadecimal (RGB e RGBA):**
    *   `'#RRGGBB'` (ex: `'#FF0000'` para vermelho)
    *   `'#RGB'` (forma curta, ex: `'#F00'` para vermelho)
    *   `'#RRGGBBAA'` (com canal alfa para transparência, ex: `'#FF000080'` para vermelho com 50% de opacidade)
    *   `'#RGBA'` (forma curta com alfa, ex: `'#F008'` para vermelho com 50% de opacidade)
    `color: '#333333'`
    `backgroundColor: '#00FF007F'` (verde com aproximadamente 50% de opacidade)

3.  **Funções `rgb()` e `rgba()`:**
    *   `'rgb(R, G, B)'` (valores de 0 a 255, ex: `'rgb(255, 0, 0)'`)
    *   `'rgba(R, G, B, A)'` (A é de 0.0 a 1.0 para opacidade, ex: `'rgba(0, 0, 255, 0.5)'` para azul com 50% de opacidade)
    `color: 'rgb(123, 104, 238)'`
    `backgroundColor: 'rgba(255, 165, 0, 0.75)'` (laranja com 75% de opacidade)

4.  **Funções `hsl()` e `hsla()` (Hue, Saturation, Lightness, Alpha):**
    *   `'hsl(H, S%, L%)'` (H de 0 a 360, S e L de 0% a 100%)
    *   `'hsla(H, S%, L%, A)'` (A de 0.0 a 1.0)
    `color: 'hsl(120, 100%, 50%)'` (verde puro)
    `backgroundColor: 'hsla(240, 100%, 50%, 0.3)'` (azul com 30% de opacidade)

5.  **`currentColor` (Experimental/Limitado):** Em alguns contextos, pode herdar a cor do pai.

6.  **`PlatformColor` e `DynamicColorIOS`:** Para usar cores definidas nativamente pela plataforma (ex: cores do sistema que se adaptam ao modo claro/escuro). Requer configuração mais específica e pode ser mais avançado.

É uma boa prática definir suas cores principais em um arquivo de constantes ou tema para fácil reutilização e manutenção, especialmente em aplicativos maiores.

```javascript
// utils/colors.js (exemplo)
export const COLORS = {
  primary: 'dodgerblue',
  secondary: 'tomato',
  text: '#333',
  background: '#fff',
  lightGrey: '#ccc',
  transparent: 'transparent',
};

// No seu componente:
// import { COLORS } from './utils/colors';
// ...
// titulo: { color: COLORS.primary }
```

### Layout com Flexbox

Flexbox é o principal mecanismo de layout em React Native. Se você já usou Flexbox no CSS para web, muitos conceitos serão familiares, embora existam algumas diferenças e padrões específicos no React Native.

Por padrão, todos os componentes `View` em React Native usam Flexbox para layout. A propriedade `flexDirection` por padrão é `column` (diferente do padrão `row` na web). Isso significa que os itens dentro de uma `View` são empilhados verticalmente.

**Principais Propriedades do Flexbox (Aplicadas ao Container Pai):**

1.  **`flexDirection`**: Define o eixo principal do layout. Os itens filhos serão dispostos ao longo deste eixo.
    *   `'column'` (padrão): Itens empilhados verticalmente (de cima para baixo).
    *   `'row'`: Itens dispostos horizontalmente (da esquerda para a direita).
    *   `'column-reverse'`: Itens empilhados verticalmente (de baixo para cima).
    *   `'row-reverse'`: Itens dispostos horizontalmente (da direita para a esquerda).

2.  **`justifyContent`**: Alinha os filhos ao longo do eixo principal (definido por `flexDirection`).
    *   `'flex-start'` (padrão): Alinha os itens no início do eixo principal.
    *   `'flex-end'`: Alinha os itens no final do eixo principal.
    *   `'center'`: Alinha os itens no centro do eixo principal.
    *   `'space-between'`: Distribui os itens uniformemente no eixo principal; o primeiro item no início, o último no final, com espaço igual entre os demais.
    *   `'space-around'`: Distribui os itens uniformemente com espaço igual ao redor deles (incluindo antes do primeiro e depois do último, resultando em metade do espaço nas extremidades em comparação com o espaço entre os itens).
    *   `'space-evenly'`: Distribui os itens uniformemente com espaço igual entre eles e nas extremidades.

3.  **`alignItems`**: Alinha os filhos ao longo do eixo transversal (perpendicular ao eixo principal).
    *   `'stretch'` (padrão): Estica os itens para preencher a altura (se `flexDirection: 'row'`) ou largura (se `flexDirection: 'column'`) do container, respeitando `min/max-width/height`.
    *   `'flex-start'`: Alinha os itens no início do eixo transversal.
    *   `'flex-end'`: Alinha os itens no final do eixo transversal.
    *   `'center'`: Alinha os itens no centro do eixo transversal.
    *   `'baseline'`: Alinha os itens de acordo com suas linhas de base de texto (mais relevante para componentes `Text`).

4.  **`flexWrap`**: Controla se os itens devem quebrar para a próxima linha quando não couberem no eixo principal.
    *   `'nowrap'` (padrão): Os itens tentarão caber em uma única linha (podendo transbordar).
    *   `'wrap'`: Os itens quebram para a próxima linha se necessário.
    *   `'wrap-reverse'`: Os itens quebram para a próxima linha na direção oposta.

5.  **`alignContent`**: Similar ao `justifyContent`, mas alinha as linhas de um container multi-linha (quando `flexWrap` é `wrap` ou `wrap-reverse`) ao longo do eixo transversal. Não tem efeito se houver apenas uma linha de itens.
    *   Valores: `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'` (padrão), `'space-between'`, `'space-around'`.

**Principais Propriedades do Flexbox (Aplicadas aos Itens Filhos):**

1.  **`flex`**: Define a capacidade de um item filho de crescer ou encolher para preencher o espaço disponível ao longo do eixo principal. É um número adimensional.
    *   `flex: <número positivo>`: O item crescerá proporcionalmente ao seu valor de `flex` em relação aos outros itens flexíveis. Por exemplo, se um item tem `flex: 2` e outro `flex: 1`, o primeiro ocupará o dobro do espaço do segundo.
    *   `flex: 0`: O item não crescerá nem encolherá, usando seu tamanho base (definido por `width`/`height` ou conteúdo).
    *   `flex: -1`: O item encolherá se necessário, mas não mais do que seu tamanho base.
    *   **Importante:** `flex: 1` em um componente filho fará com que ele ocupe todo o espaço disponível no container pai ao longo do eixo principal, após os outros itens terem sido dimensionados.

2.  **`alignSelf`**: Permite que um item filho individual sobrescreva o `alignItems` definido pelo container pai.
    *   Valores: `'auto'` (padrão, herda de `alignItems`), `'flex-start'`, `'flex-end'`, `'center'`, `'stretch'`, `'baseline'`.

3.  **`flexGrow`**: Especifica o fator de crescimento de um item flexível. Similar a `flex: <número>` quando o número é positivo.

4.  **`flexShrink`**: Especifica o fator de encolhimento de um item flexível. Controla o quanto um item pode encolher se não houver espaço suficiente.

5.  **`flexBasis`**: Define o tamanho inicial de um item flexível ao longo do eixo principal antes que o espaço restante seja distribuído. Pode ser um número (dp) ou uma porcentagem.

**Exemplo Prático de Layout com Flexbox:**

```javascript
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const ExemploFlexbox = () => {
  return (
    <View style={stylesFlex.containerPrincipal}>
      <View style={[stylesFlex.box, stylesFlex.box1]}>
        <Text style={stylesFlex.boxText}>Caixa 1 (flex: 1)</Text>
      </View>
      <View style={[stylesFlex.box, stylesFlex.box2, { alignSelf: 'flex-end' /* Exemplo de alignSelf */ }]}>
        <Text style={stylesFlex.boxText}>Caixa 2 (flex: 2, alignSelf: flex-end)</Text>
      </View>
      <View style={[stylesFlex.box, stylesFlex.box3]}>
        <Text style={stylesFlex.boxText}>Caixa 3 (flex: 1)</Text>
      </View>
      <View style={stylesFlex.containerRow}>
        <View style={[stylesFlex.boxPequeno, { backgroundColor: 'coral' }]} />
        <View style={[stylesFlex.boxPequeno, { backgroundColor: 'lightseagreen' }]} />
        <View style={[stylesFlex.boxPequeno, { backgroundColor: 'mediumpurple' }]} />
      </View>
    </View>
  );
};

const stylesFlex = StyleSheet.create({
  containerPrincipal: {
    flex: 1, // Ocupa toda a tela
    flexDirection: 'column', // Padrão, mas explícito aqui
    justifyContent: 'space-around', // Espaço entre os filhos principais
    alignItems: 'stretch', // Padrão, estica os filhos na largura
    backgroundColor: '#eee',
    paddingTop: 30, // Para não sobrepor a status bar
  },
  box: {
    // width: 100, // Se não tiver flex, precisa de tamanho ou será baseado no conteúdo
    // height: 80, // Se não tiver flex, precisa de tamanho
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
    margin: 5,
  },
  box1: {
    flex: 1, // Ocupa 1 parte do espaço disponível
    backgroundColor: 'powderblue',
  },
  box2: {
    flex: 2, // Ocupa 2 partes do espaço disponível (o dobro da box1 e box3)
    backgroundColor: 'skyblue',
    minHeight: 50, // Altura mínima mesmo se flexível
  },
  box3: {
    flex: 1,
    backgroundColor: 'steelblue',
  },
  boxText: {
    color: 'black',
    fontWeight: 'bold',
  },
  containerRow: {
    flexDirection: 'row', // Filhos em linha
    justifyContent: 'space-evenly', // Espaço igual entre e nas bordas
    alignItems: 'center', // Centraliza verticalmente na linha
    height: 100,
    backgroundColor: '#ddd',
    marginTop: 10,
  },
  boxPequeno: {
    width: 60,
    height: 60,
    // Não precisa de flex aqui se o pai tem tamanho fixo e justifyContent controla o espaço
  },
});

export default ExemploFlexbox;
```

Dominar o Flexbox é essencial para criar layouts que se adaptam bem a diferentes tamanhos e orientações de tela. Experimentar com as diferentes propriedades é a melhor maneira de internalizar seu funcionamento.

### Posicionamento (Absolute e Relative)

Além do Flexbox, o React Native suporta um subconjunto das propriedades de posicionamento do CSS para controle mais fino sobre a localização dos elementos.

*   **`position: 'relative'` (Padrão):**
    *   Os elementos são posicionados de acordo com o fluxo normal do layout (geralmente determinado pelo Flexbox).
    *   Você pode usar `top`, `bottom`, `left`, `right` para deslocar o elemento em relação à sua posição normal, sem afetar a posição dos outros elementos.

*   **`position: 'absolute'`:**
    *   O elemento é removido do fluxo normal do layout.
    *   Sua posição é definida em relação ao seu ancestral posicionado mais próximo (um ancestral com `position: 'relative'` ou `position: 'absolute'`) ou, se não houver, em relação ao container raiz.
    *   As propriedades `top`, `bottom`, `left`, `right` determinam a distância das bordas do container de referência.
    *   Elementos posicionados absolutamente podem sobrepor outros elementos.
    *   Use com cautela, pois pode tornar os layouts mais difíceis de gerenciar se usado excessivamente.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploPosicionamento = () => {
  return (
    <View style={stylesPos.container}>
      <View style={stylesPos.caixaRelativa}>
        <Text>Caixa Relativa</Text>
        <View style={stylesPos.caixaAbsoluta}>
          <Text style={stylesPos.textoAbsoluto}>Absoluta</Text>
        </View>
      </View>
      <View style={stylesPos.outraCaixa}>
        <Text>Outra Caixa no Fluxo</Text>
      </View>
      <View style={stylesPos.overlayAbsoluto}>
        <Text style={stylesPos.textoOverlay}>Overlay (Absoluto na Raiz)</Text>
      </View>
    </View>
  );
};

const stylesPos = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40, // Espaço para status bar
    borderWidth: 1,
    borderColor: 'black',
    // position: 'relative', // O container raiz já é um contexto de posicionamento
  },
  caixaRelativa: {
    position: 'relative', // Contexto para a caixa absoluta interna
    width: 250,
    height: 150,
    backgroundColor: 'lightcoral',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    // top: 10, left: 10 // Deslocaria esta caixa em relação à sua posição normal
  },
  caixaAbsoluta: {
    position: 'absolute',
    bottom: 10, // 10dp da borda inferior da caixaRelativa
    right: 10,  // 10dp da borda direita da caixaRelativa
    width: 80,
    height: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'grey',
  },
  textoAbsoluto: { fontSize: 12 },
  outraCaixa: {
    width: 200,
    height: 100,
    backgroundColor: 'lightseagreen',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  overlayAbsoluto: {
    position: 'absolute',
    top: '50%', // Tenta centralizar, mas pode precisar de ajustes com transform
    left: '40%',
    // Para centralizar de verdade com position absolute:
    // top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'
    // ou usando transform: [{ translateX: -largura/2 }, { translateY: -altura/2 }] junto com top: '50%', left: '50%'
    width: 150,
    height: 70,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  textoOverlay: { color: 'white', textAlign: 'center' },
});

export default ExemploPosicionamento;
```

O `zIndex` (número) também pode ser usado para controlar a ordem de empilhamento de elementos posicionados, onde um `zIndex` maior fica na frente de um `zIndex` menor. Funciona de forma mais consistente no iOS do que no Android em algumas versões mais antigas do React Native, mas geralmente é respeitado.

### Dimensões (Width, Height, Percentages)

Controlar as dimensões dos seus componentes é fundamental para o layout.

*   **`width` e `height`:** Podem ser definidos com números (dp) ou porcentagens (string, ex: `'50%'`).
    *   Se não especificados, o tamanho de um componente pode ser determinado pelo seu conteúdo (intrínseco) ou pelas propriedades do Flexbox (se for um item flexível).

*   **`minWidth`, `maxWidth`, `minHeight`, `maxHeight`:** Úteis para definir limites para as dimensões.

*   **`aspectRatio` (número):** Mantém a proporção de um elemento. Se você definir `width` e `aspectRatio`, a `height` será calculada automaticamente (e vice-versa). Por exemplo, `aspectRatio: 16/9`.

*   **Módulo `Dimensions`:** Para obter as dimensões da janela (área visível) ou da tela do dispositivo.
    ```javascript
    import { Dimensions } from 'react-native';

    const window = Dimensions.get('window'); // Dimensões da janela (pode mudar com rotação)
    const screen = Dimensions.get('screen'); // Dimensões da tela física (geralmente não muda)

    console.log(`Largura da Janela: ${window.width}, Altura da Janela: ${window.height}`);
    console.log(`Escala da Janela: ${window.scale}, Escala da Fonte: ${window.fontScale}`);
    ```
    Você pode usar `Dimensions.addEventListener('change', callback)` para ouvir mudanças nas dimensões (ex: rotação da tela).

### Exemplos Práticos de Layouts Comuns

Vamos ver como combinar Flexbox e outras propriedades para criar alguns layouts comuns:

**1. Cabeçalho Fixo, Conteúdo Rolável, Rodapé Fixo:**

```javascript
import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';

const LayoutTipico = () => {
  return (
    <View style={stylesLayout.containerTotal}>
      <View style={stylesLayout.header}>
        <Text style={stylesLayout.headerText}>Cabeçalho Fixo</Text>
      </View>
      
      <ScrollView style={stylesLayout.contentScrollable}>
        {/* Conteúdo longo aqui para habilitar a rolagem */}
        {Array.from({ length: 30 }).map((_, i) => (
          <Text key={i} style={stylesLayout.itemConteudo}>Item de Conteúdo {i + 1}</Text>
        ))}
      </ScrollView>
      
      <View style={stylesLayout.footer}>
        <Text style={stylesLayout.footerText}>Rodapé Fixo</Text>
      </View>
    </View>
  );
};

const stylesLayout = StyleSheet.create({
  containerTotal: {
    flex: 1, // Ocupa toda a tela
    flexDirection: 'column',
  },
  header: {
    height: 60,
    backgroundColor: 'skyblue',
    justifyContent: 'center',
    alignItems: 'center',
    // Para iOS, pode precisar de padding superior para a status bar se não usar SafeAreaView
  },
  headerText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  contentScrollable: {
    flex: 1, // Ocupa o espaço restante entre header e footer
    backgroundColor: '#f0f0f0',
  },
  itemConteudo: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  footer: {
    height: 50,
    backgroundColor: 'steelblue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: { color: 'white', fontSize: 16 },
});

export default LayoutTipico;
```
Neste exemplo, o `containerTotal` usa `flex: 1` para ocupar toda a tela. O `contentScrollable` também usa `flex: 1` para que ele se expanda e ocupe todo o espaço vertical disponível entre o cabeçalho e o rodapé, que têm alturas fixas.

**2. Cards em uma Grade (2 colunas):**

```javascript
import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions } from 'react-native';

const cardData = [
  { id: 'a', title: 'Card 1' }, { id: 'b', title: 'Card 2' },
  { id: 'c', title: 'Card 3' }, { id: 'd', title: 'Card 4' },
  { id: 'e', title: 'Card 5' }, { id: 'f', title: 'Card 6' },
];

const numColunas = 2;
const larguraTela = Dimensions.get('window').width;
const espacamento = 10;
const larguraCard = (larguraTela - (espacamento * (numColunas + 1))) / numColunas;

const LayoutGrade = () => {
  return (
    <ScrollView contentContainerStyle={stylesGrade.gridContainer}>
      {cardData.map(card => (
        <View key={card.id} style={stylesGrade.card}>
          <Text style={stylesGrade.cardTitle}>{card.title}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const stylesGrade = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row', // Itens em linha
    flexWrap: 'wrap',     // Quebra para a próxima linha
    justifyContent: 'flex-start', // Começa da esquerda
    padding: espacamento / 2, // Espaçamento nas bordas do container
  },
  card: {
    width: larguraCard,
    height: larguraCard * 1.2, // Exemplo de proporção
    backgroundColor: 'white',
    margin: espacamento / 2, // Espaçamento entre os cards
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
    // Sombra (exemplo para iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Sombra (exemplo para Android)
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LayoutGrade;
```
Aqui, usamos `flexDirection: 'row'` e `flexWrap: 'wrap'` no container da `ScrollView` (através de `contentContainerStyle`) para criar a grade. Calculamos a largura de cada card dinamicamente com base na largura da tela e no número de colunas desejado.

Estes são apenas exemplos básicos. A combinação de `StyleSheet`, Flexbox, posicionamento e dimensionamento oferece um controle vasto sobre a aparência e a organização dos seus aplicativos React Native. A prática e a experimentação são chave para se tornar proficiente.

Na próxima seção, abordaremos como implementar a navegação entre diferentes telas do seu aplicativo.

---


## Seção 4: Navegação em Aplicativos React Native

A maioria dos aplicativos móveis não se resume a uma única tela. Os usuários precisam se mover entre diferentes seções, visualizar detalhes, voltar à tela anterior e interagir com fluxos de trabalho que podem abranger múltiplas visualizações. Gerenciar essa transição entre telas é o papel da navegação. Nesta seção, exploraremos como implementar a navegação em seus aplicativos React Native, focando na biblioteca mais popular e recomendada para essa finalidade: o React Navigation.

Abordaremos os conceitos fundamentais da navegação em aplicativos móveis, como instalar e configurar o React Navigation, e mergulharemos nos três tipos de navegadores mais comuns: Stack Navigator (para um fluxo de empilhamento de telas), Tab Navigator (para navegação por abas) e Drawer Navigator (para menus laterais). Também veremos como passar parâmetros entre telas e como combinar diferentes tipos de navegadores para criar experiências de usuário ricas e intuitivas.

### Introdução à Navegação em Aplicativos Móveis

A navegação é um aspecto central da experiência do usuário em qualquer aplicativo. Em aplicativos móveis, os padrões de navegação comuns incluem:

*   **Navegação Hierárquica (Stack):** O usuário navega de uma tela de lista para uma tela de detalhes e pode voltar usando um botão "Voltar". As telas são empilhadas umas sobre as outras, e voltar remove a tela do topo da pilha.
*   **Navegação por Abas (Tabs):** Várias seções principais do aplicativo são acessíveis através de abas fixas, geralmente na parte inferior ou superior da tela. Cada aba geralmente representa um fluxo de navegação independente (que pode ser uma pilha).
*   **Navegação por Gaveta (Drawer):** Um menu lateral, muitas vezes oculto e acessível por um ícone de "hambúrguer" ou deslizando da borda da tela, que oferece acesso a várias seções ou funcionalidades do aplicativo.
*   **Navegação Modal:** Telas que aparecem sobre o conteúdo atual para tarefas específicas, como preencher um formulário, exibir um alerta importante ou apresentar opções. O usuário geralmente precisa dispensar o modal para retornar ao fluxo anterior.
*   **Fluxos Condicionais:** O usuário pode ser direcionado para diferentes telas com base em certas condições, como status de login (telas de autenticação vs. telas principais do app).

Uma boa solução de navegação deve ser fácil de implementar, flexível para lidar com diferentes padrões, performática e fornecer uma experiência de usuário consistente com as convenções de cada plataforma (iOS e Android).

### React Navigation: A Solução Padrão da Comunidade

Embora o React Native em si não venha com uma solução de navegação embutida no seu núcleo, a comunidade desenvolveu várias bibliotecas para essa finalidade. De longe, a mais utilizada, madura e recomendada é o **React Navigation**.

O React Navigation é uma biblioteca de navegação totalmente escrita em JavaScript, o que significa que é fácil de integrar e usar em projetos Expo e projetos React Native CLI (Bare Workflow). Ela oferece:

*   **Componentes para diferentes padrões de navegação:** Stack, Tabs, Drawer, e mais.
*   **Altamente customizável:** Permite ajustar a aparência e o comportamento dos navegadores.
*   **Integração com gestos nativos:** Suporta gestos comuns de navegação (como deslizar para voltar no iOS).
*   **Passagem de parâmetros entre telas.**
*   **Gerenciamento de estado de navegação.**
*   **Suporte a deep linking.**
*   **Boa documentação e uma grande comunidade.**

**Instalação e Configuração do React Navigation (v6, a versão atual no momento da escrita):**

A instalação do React Navigation envolve alguns pacotes. O pacote principal é `@react-navigation/native`, e então você instala os pacotes para os tipos de navegadores que pretende usar (ex: `@react-navigation/stack` para Stack Navigator).

**1. Instalar o pacote principal e dependências:**

Se você estiver usando um projeto **React Native CLI (Bare Workflow)**, precisará instalar algumas dependências nativas. Se estiver usando **Expo (Managed Workflow)**, muitas dessas dependências já vêm pré-instaladas ou são mais fáceis de configurar.

Primeiro, instale o pacote principal:

```bash
# Usando npm
npm install @react-navigation/native

# Usando Yarn
yarn add @react-navigation/native
```

Em seguida, instale as dependências que o React Navigation requer. Para projetos **Expo (Managed Workflow)**, a instalação é mais simples:

```bash
expo install react-native-screens react-native-safe-area-context
```

Para projetos **React Native CLI (Bare Workflow)**:

```bash
npm install react-native-screens react-native-safe-area-context
# ou
yarn add react-native-screens react-native-safe-area-context
```

Após instalar `react-native-screens` e `react-native-safe-area-context` em um projeto Bare Workflow, você precisa garantir que elas sejam vinculadas corretamente. Para iOS, execute `npx pod-install ios` (ou `cd ios && pod install && cd ..`). Para Android, geralmente são vinculadas automaticamente.

**Importante para Bare Workflow (React Native CLI):** Para que `react-native-screens` funcione corretamente no Android, você precisa fazer uma pequena modificação no seu arquivo `MainActivity.java` (ou `MainActivity.kt` se estiver usando Kotlin). Adicione o seguinte código no corpo da classe `MainActivity`:

```java
// MainActivity.java (localizado em android/app/src/main/java/<seu_pacote>/MainActivity.java)
package com.seunomeprojeto;

import android.os.Bundle; // Adicione esta linha
import com.facebook.react.ReactActivity;
// ... outras importações

public class MainActivity extends ReactActivity {
  // ... (método getMainComponentName)

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null); // MODIFIQUE ESTA LINHA para null ou savedInstanceState
                          // A documentação do React Navigation sugere null para evitar crashes em alguns casos
                          // ou manter savedInstanceState se você precisar dele para outros fins.
                          // Para a maioria dos casos com React Navigation, `null` é seguro.
  }
}
```
Consulte sempre a documentação oficial do React Navigation para as instruções de instalação mais recentes e detalhadas, pois elas podem mudar entre versões.

**2. Envolver seu aplicativo em `NavigationContainer`:**

Todo o seu aplicativo que usa navegação precisa ser envolvido pelo componente `NavigationContainer`. Geralmente, você faz isso no seu arquivo raiz, como `App.js`.

```javascript
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

// ... importe seus navegadores e telas aqui ...

const App = () => {
  return (
    <NavigationContainer>
      {/* Seus navegadores (Stack, Tabs, etc.) virão aqui */}
    </NavigationContainer>
  );
};

export default App;
```

Agora estamos prontos para adicionar os navegadores.

### Stack Navigator (`@react-navigation/stack`)

O Stack Navigator gerencia a navegação como uma pilha de telas. Quando você navega para uma nova tela, ela é colocada no topo da pilha. Quando você volta, a tela do topo é removida. É o padrão de navegação mais comum para fluxos hierárquicos.

**1. Instalar o Stack Navigator:**

```bash
# Usando npm
npm install @react-navigation/stack

# Usando Yarn
yarn add @react-navigation/stack
```

Se estiver em um projeto Bare Workflow, você também precisará instalar `react-native-gesture-handler` (se ainda não o tiver) e `react-native-masked-view` (este último pode ser uma dependência do stack ou de outros componentes visuais do header):

```bash
# Para Bare Workflow
npm install react-native-gesture-handler @react-native-masked-view/masked-view
# ou
yarn add react-native-gesture-handler @react-native-masked-view/masked-view
```

Para `react-native-gesture-handler` em Bare Workflow, adicione `import 'react-native-gesture-handler';` no topo do seu arquivo de entrada (como `index.js` ou `App.js`). Certifique-se de que seja a primeira linha.

**2. Criar um Stack Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Definição das Telas
const HomeScreen = ({ navigation }) => { // A prop 'navigation' é injetada automaticamente
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela Inicial (Home)</Text>
      <Button 
        title="Ir para Detalhes"
        onPress={() => navigation.navigate('Detalhes', { // Navega para a tela 'Detalhes'
          itemId: 86,
          outroParametro: 'Qualquer Coisa Aqui',
        })} 
      />
      <Button 
        title="Ir para Perfil"
        onPress={() => navigation.navigate('Perfil')} 
      />
    </View>
  );
};

const DetailsScreen = ({ route, navigation }) => { // 'route' contém os parâmetros passados
  const { itemId, outroParametro } = route.params; // Extraindo parâmetros
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Detalhes</Text>
      <Text style={styles.text}>ID do Item: {JSON.stringify(itemId)}</Text>
      <Text style={styles.text}>Outro Parâmetro: {JSON.stringify(outroParametro)}</Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Voltar (Pop)" onPress={() => navigation.goBack()} />
      <Button 
        title="Ir para Detalhes... de novo (Push)"
        onPress={() => navigation.push('Detalhes', { // 'push' adiciona uma nova instância à pilha
          itemId: Math.floor(Math.random() * 100),
        })} 
      />
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tela de Perfil</Text>
      <Button title="Voltar para Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

// Criar a instância do Stack Navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Home" // Define a tela inicial da pilha
      screenOptions={{ // Opções padrão para todas as telas no navigator
        headerStyle: {
          backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Visão Geral' }} // Título específico para esta tela no header
      />
      <Stack.Screen 
        name="Detalhes" 
        component={DetailsScreen} 
        options={({ route }) => ({ // Opções dinâmicas baseadas na rota
          title: `Detalhes do Item ${route.params.itemId}`,
        })}
        initialParams={{ itemId: 42 }} // Parâmetros iniciais se nenhum for passado
      />
      <Stack.Screen 
        name="Perfil" 
        component={ProfileScreen} 
        options={{
          title: 'Meu Perfil',
          headerRight: () => ( // Adiciona um componente à direita do header
            <Button onPress={() => alert('Isso é um botão!')} title="Info" color="#fff" />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  text: { fontSize: 18, marginVertical: 10 },
});

export default App;
```

**Explicação:**

*   **`createStackNavigator()`:** Cria um objeto que contém dois componentes: `Stack.Navigator` e `Stack.Screen`.
*   **`Stack.Navigator`:** É o componente que envolve suas definições de tela. Ele gerencia a pilha de navegação.
    *   `initialRouteName`: Define qual tela da pilha será carregada primeiro.
    *   `screenOptions`: Permite definir opções padrão para o cabeçalho (header) e outras configurações para todas as telas dentro deste navegador.
*   **`Stack.Screen`:** Define cada tela na pilha.
    *   `name`: Um nome único para a tela, usado para navegar até ela (ex: `navigation.navigate('NomeDaTela')`).
    *   `component`: O componente React que renderiza o conteúdo da tela.
    *   `options`: Permite customizar a aparência e o comportamento da tela específica, como o título do cabeçalho (`title`), adicionar botões ao cabeçalho (`headerRight`, `headerLeft`), ou até mesmo fornecer um cabeçalho customizado (`header`). As opções podem ser um objeto ou uma função que retorna um objeto (útil para opções dinâmicas baseadas em `route.params`).
*   **Prop `navigation`:** Cada tela dentro de um navegador recebe automaticamente uma prop `navigation`. Este objeto contém várias funções para interagir com a navegação:
    *   `navigation.navigate('NomeDaTela', { params })`: Navega para a tela especificada. Se a tela já estiver na pilha, ele pode voltar para ela. Se não, adiciona à pilha. Pode passar parâmetros.
    *   `navigation.push('NomeDaTela', { params })`: Sempre adiciona uma nova instância da tela à pilha, mesmo que uma tela com o mesmo nome já exista. Útil para cenários onde você quer múltiplas instâncias da mesma tela de detalhes, por exemplo.
    *   `navigation.goBack()`: Volta para a tela anterior na pilha.
    *   `navigation.popToTop()`: Volta para a primeira tela na pilha, removendo todas as outras.
    *   `navigation.setParams({ novosParams })`: Atualiza os parâmetros da rota atual.
    *   `navigation.setOptions({ novasOpcoes })`: Atualiza as opções da tela atual (ex: título do header) dinamicamente.
*   **Prop `route`:** Cada tela também recebe uma prop `route`. Este objeto contém informações sobre a rota atual, incluindo:
    *   `route.params`: Um objeto com os parâmetros que foram passados para esta tela durante a navegação.
    *   `route.name`: O nome da rota atual.
    *   `route.key`: Uma chave única para esta instância da rota.

**Passagem de Parâmetros:**

Como visto no exemplo, você passa parâmetros ao chamar `navigation.navigate` ou `navigation.push`:
`navigation.navigate('Detalhes', { itemId: 86, outroParametro: 'valor' });`

E acessa esses parâmetros na tela de destino usando `route.params`:
`const { itemId, outroParametro } = route.params;`

É uma boa prática definir `initialParams` em `Stack.Screen` se sua tela espera parâmetros e pode ser acessada sem eles (ex: por deep linking ou como tela inicial).

### Tab Navigator (`@react-navigation/bottom-tabs` ou `@react-navigation/material-top-tabs`)

Tab Navigators são usados para exibir várias telas principais que o usuário pode alternar facilmente. Existem dois tipos principais:

*   **Bottom Tab Navigator (`@react-navigation/bottom-tabs`):** Exibe abas na parte inferior da tela, comum em aplicativos iOS e Android.
*   **Material Top Tab Navigator (`@react-navigation/material-top-tabs`):** Exibe abas na parte superior da tela, seguindo as diretrizes do Material Design. Pode ser usado para alternar entre seções dentro de uma tela.

Vamos focar no Bottom Tab Navigator.

**1. Instalar o Bottom Tab Navigator:**

```bash
# Usando npm
npm install @react-navigation/bottom-tabs

# Usando Yarn
yarn add @react-navigation/bottom-tabs
```

**2. Criar um Bottom Tab Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Suponha que temos HomeScreen e SettingsScreen definidos como antes
// import { createStackNavigator } from '@react-navigation/stack'; // Para aninhar stacks

// Telas para as abas
const FeedScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Feed</Text></View>
);

const MessagesScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Mensagens</Text></View>
);

const NotificationsScreen = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Notificações</Text></View>
);

// Criar a instância do Tab Navigator
const Tab = createBottomTabNavigator();

const AppTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          // Você usaria uma biblioteca de ícones aqui (ex: react-native-vector-icons)
          if (route.name === 'Feed') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          } else if (route.name === 'Mensagens') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles-outline';
          } else if (route.name === 'Notificações') {
            iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          }
          // Componente de Ícone (exemplo simulado com Text)
          return <Text style={{ color: color, fontSize: size }}>{iconName ? iconName.substring(0,3).toUpperCase() : 'ICON'}</Text>;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#f0f0f0' },
        headerShown: true, // Para mostrar o header padrão do Stack (se aninhado) ou do Tab
      })}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen} 
        options={{ tabBarBadge: 3 }} // Mostra um badge na aba
      />
      <Tab.Screen name="Mensagens" component={MessagesScreen} />
      <Tab.Screen name="Notificações" component={NotificationsScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppTabNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default App;
```

**Explicação:**

*   **`createBottomTabNavigator()`:** Cria o navegador de abas.
*   **`Tab.Navigator`:** Envolve as telas das abas.
*   **`Tab.Screen`:** Define cada aba.
*   **`screenOptions`:** Pode ser uma função que recebe `{ route, navigation }` e retorna um objeto de opções. É comumente usado para configurar `tabBarIcon`.
    *   `tabBarIcon`: Uma função que recebe `{ focused, color, size }` e retorna um componente React para ser usado como ícone da aba. `focused` indica se a aba está ativa.
    *   `tabBarActiveTintColor`, `tabBarInactiveTintColor`: Cores para o ícone e o rótulo da aba ativa e inativa.
    *   `tabBarStyle`: Estilos para a barra de abas em si.
    *   `headerShown`: Controla se o cabeçalho padrão deve ser exibido para as telas da aba. Se cada aba for um Stack Navigator, você pode querer `headerShown: false` aqui e deixar o Stack Navigator da aba gerenciar seu próprio header.
*   **`options` em `Tab.Screen`:** Pode ser usado para configurações específicas da aba, como `tabBarLabel` (texto da aba), `tabBarBadge` (para mostrar um contador/notificação na aba).

### Drawer Navigator (`@react-navigation/drawer`)

O Drawer Navigator exibe um menu lateral (gaveta) que pode ser aberto deslizando da borda da tela ou tocando em um ícone.

**1. Instalar o Drawer Navigator:**

```bash
# Usando npm
npm install @react-navigation/drawer

# Usando Yarn
yarn add @react-navigation/drawer
```

O Drawer Navigator também depende de `react-native-gesture-handler` e `react-native-reanimated`. Se você estiver em um projeto Bare Workflow e ainda não os tiver, instale-os:

```bash
# Para Bare Workflow
npm install react-native-gesture-handler react-native-reanimated
# ou
yarn add react-native-gesture-handler react-native-reanimated
```

Para `react-native-reanimated` (v2 ou superior) em Bare Workflow, você precisa adicionar o plugin do Babel. Modifique seu `babel.config.js`:

```javascript
// babel.config.js
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // ... outros plugins
    'react-native-reanimated/plugin', // IMPORTANTE: Este deve ser o último plugin na lista.
  ],
};
```
Limpe o cache do Metro Bundler (`npm start -- --reset-cache` ou `yarn start --reset-cache`) após adicionar o plugin.

**2. Criar um Drawer Navigator:**

```javascript
// App.js (ou um arquivo de navegação separado)
import 'react-native-gesture-handler'; // Deve ser o primeiro import
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Telas para o Drawer
const HomeScreenDrawer = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Tela Inicial (Drawer)</Text>
    <Button onPress={() => navigation.openDrawer()} title="Abrir Gaveta" />
  </View>
);

const NotificationsScreenDrawer = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Notificações (Drawer)</Text></View>
);

const ProfileScreenDrawer = () => (
  <View style={styles.container}><Text style={styles.text}>Tela de Perfil (Drawer)</Text></View>
);

// Criar a instância do Drawer Navigator
const Drawer = createDrawerNavigator();

const AppDrawerNavigator = () => {
  return (
    <Drawer.Navigator 
      initialRouteName="HomeDrawer"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#c6cbef',
          width: 240,
        },
        drawerActiveTintColor: 'tomato',
        drawerInactiveTintColor: 'gray',
        // headerShown: false, // Se você quiser um header customizado ou nenhum header
      }}
      // drawerContent={(props) => <CustomDrawerContent {...props} />} // Para um conteúdo de gaveta totalmente customizado
    >
      <Drawer.Screen 
        name="HomeDrawer" 
        component={HomeScreenDrawer} 
        options={{ title: 'Início' }}
      />
      <Drawer.Screen 
        name="NotificationsDrawer" 
        component={NotificationsScreenDrawer} 
        options={{ title: 'Notificações' }}
      />
      <Drawer.Screen 
        name="ProfileDrawer" 
        component={ProfileScreenDrawer} 
        options={{ title: 'Meu Perfil' }}
      />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <AppDrawerNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 18 },
});

export default App;
```

**Explicação:**

*   **`createDrawerNavigator()`:** Cria o navegador de gaveta.
*   **`Drawer.Navigator` e `Drawer.Screen`:** Funcionam de forma similar aos outros navegadores.
*   **`navigation.openDrawer()` e `navigation.closeDrawer()`:** Funções para controlar a gaveta programaticamente.
*   **`screenOptions`:** Permite customizar a aparência da gaveta (`drawerStyle`, `drawerActiveTintColor`, etc.) e dos headers das telas.
*   **`drawerContent`:** Uma prop poderosa que permite fornecer um componente React customizado para renderizar todo o conteúdo da gaveta, oferecendo total flexibilidade sobre sua aparência e funcionalidade.

### Combinando Navegadores

A verdadeira força do React Navigation vem da capacidade de aninhar navegadores. Por exemplo, você pode ter um Tab Navigator onde cada aba é um Stack Navigator independente, ou um Drawer Navigator onde um dos itens do menu leva a um Tab Navigator.

**Exemplo: Tab Navigator com Stacks dentro de cada Aba**

```javascript
// ... (imports e definições de tela como FeedScreen, MessagesScreen)
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack para a aba de Feed
const FeedStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true /* ou false se quiser controlar no Tab */ }}>
      <Stack.Screen name="FeedPrincipal" component={FeedScreen} options={{ title: 'Meu Feed' }} />
      <Stack.Screen name="DetalhesDoPost" component={DetailsScreen} /> {/* Supondo que DetailsScreen exista */} 
    </Stack.Navigator>
  );
};

// Stack para a aba de Mensagens
const MessagesStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ListaDeMensagens" component={MessagesScreen} options={{ title: 'Minhas Mensagens' }} />
      <Stack.Screen name="Conversa" component={ConversationScreen} /> {/* Supondo que ConversationScreen exista */} 
    </Stack.Navigator>
  );
};

// Tab Navigator principal
const MainTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false /* Deixa os Stacks controlarem seus headers */ }}>
      <Tab.Screen name="FeedTab" component={FeedStack} options={{ title: 'Feed' /*, tabBarIcon: ... */ }} />
      <Tab.Screen name="MessagesTab" component={MessagesStack} options={{ title: 'Mensagens' /*, tabBarIcon: ... */ }} />
    </Tab.Navigator>
  );
};

// App.js
const App = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

// ... (definições de tela como FeedScreen, MessagesScreen, DetailsScreen, ConversationScreen e estilos)
```

Neste exemplo:
*   `FeedStack` é um Stack Navigator para as telas relacionadas ao feed.
*   `MessagesStack` é outro Stack Navigator para as telas de mensagens.
*   `MainTabNavigator` usa `FeedStack` e `MessagesStack` como componentes para suas abas.
*   Ao definir `headerShown: false` no `Tab.Navigator`, permitimos que cada `Stack.Navigator` aninhado gerencie seu próprio cabeçalho.

**Navegando para uma tela em um navegador aninhado:**

Se você está em uma tela do `FeedStack` e quer navegar para uma tela no `MessagesStack`, você pode fazer:
`navigation.navigate('MessagesTab', { screen: 'Conversa', params: { userId: 123 } });`

O primeiro argumento é o nome da rota no navegador pai (o `Tab.Screen` chamado `MessagesTab`), e o objeto `{ screen: '...' }` especifica a tela de destino dentro do navegador aninhado (`MessagesStack`).

### Exemplos Práticos de Fluxos de Navegação

1.  **Fluxo de Autenticação:**
    Muitos aplicativos têm um fluxo de login/cadastro separado do fluxo principal do aplicativo.

    ```javascript
    // ... (imports)
    const AuthStack = createStackNavigator();
    const AppStack = createStackNavigator(); // Ou seu Tab/Drawer principal
    
    const AuthNavigator = () => (
      <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={LoginScreen} />
        <AuthStack.Screen name="Cadastro" component={RegisterScreen} />
      </AuthStack.Navigator>
    );

    const App = () => {
      const [isUserLoggedIn, setIsUserLoggedIn] = useState(false); // Gerenciar estado de login

      // Lógica para verificar login (ex: AsyncStorage, Context API, Redux)
      // useEffect(() => { /* verificar status de login */ }, []);

      return (
        <NavigationContainer>
          {isUserLoggedIn ? <AppStack /> /* Ou MainTabNavigator, etc. */ : <AuthNavigator />}
        </NavigationContainer>
      );
    };
    ```
    Aqui, condicionalmente renderizamos o `AuthNavigator` ou o navegador principal do aplicativo com base no estado de login do usuário.

2.  **Modal sobre um Tab Navigator:**
    Você pode definir um Stack Navigator como raiz, onde uma das telas é o seu Tab Navigator principal, e outra tela é um Modal.

    ```javascript
    // ... (imports)
    const RootStack = createStackNavigator();
    // MainTabNavigator definido como antes

    const ModalScreen = ({ navigation }) => (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Este é um Modal!</Text>
        <Button onPress={() => navigation.goBack()} title="Fechar Modal" />
      </View>
    );

    const App = () => {
      return (
        <NavigationContainer>
          <RootStack.Navigator>
            <RootStack.Screen 
              name="MainApp" 
              component={MainTabNavigator} 
              options={{ headerShown: false }} 
            />
            <RootStack.Screen 
              name="MeuModal" 
              component={ModalScreen} 
              options={{ presentation: 'modal' }} // Estilo de apresentação modal
            />
          </RootStack.Navigator>
        </NavigationContainer>
      );
    };
    // Para abrir o modal de qualquer lugar dentro de MainTabNavigator:
    // navigation.navigate('MeuModal');
    ```
    A opção `presentation: 'modal'` (ou `mode: 'modal'` em versões mais antigas do stack) estiliza a transição da tela como um modal.

A navegação é uma parte fundamental e muitas vezes complexa do desenvolvimento de aplicativos. O React Navigation oferece um conjunto robusto de ferramentas para lidar com a maioria dos cenários. A chave é entender os diferentes tipos de navegadores, como eles funcionam individualmente e como podem ser combinados. A documentação oficial do React Navigation é um recurso indispensável e deve ser consultada frequentemente para explorar todas as opções de customização e funcionalidades avançadas.

Com a capacidade de criar componentes, estilizá-los, organizá-los em layouts e agora navegar entre eles, você tem os pilares para construir a estrutura de qualquer aplicativo React Native. Na próxima seção, veremos como buscar e exibir dados de APIs externas e como persistir dados localmente.

---


## Seção 5: Trabalhando com APIs Externas e Dados Locais

A maioria dos aplicativos móveis modernos precisa interagir com dados, seja buscando informações de um servidor remoto, enviando dados para uma API, ou armazenando informações localmente no dispositivo do usuário. Nesta seção, vamos explorar como seu aplicativo React Native pode se comunicar com APIs externas para buscar e enviar dados, e como gerenciar dados localmente usando o AsyncStorage.

Abordaremos as principais formas de fazer requisições HTTP, como a API `fetch` nativa do JavaScript e a popular biblioteca `Axios`. Discutiremos como lidar com respostas (especialmente no formato JSON), como exibir esses dados em listas de forma eficiente, e as melhores práticas para tratar erros de rede e gerenciar estados de carregamento para uma boa experiência do usuário. Por fim, introduziremos o `AsyncStorage` para persistência de dados simples no dispositivo.

### Introdução a Requisições HTTP (fetch API, Axios)

Para que seu aplicativo React Native se comunique com um servidor web (uma API REST, por exemplo), ele precisa fazer requisições HTTP. As operações mais comuns são:

*   **GET:** Para buscar dados de um recurso.
*   **POST:** Para enviar dados para criar um novo recurso.
*   **PUT:** Para enviar dados para atualizar um recurso existente completamente.
*   **PATCH:** Para enviar dados para atualizar parcialmente um recurso existente.
*   **DELETE:** Para remover um recurso.

React Native suporta a API `fetch` padrão do JavaScript, que é uma maneira moderna e baseada em Promises para fazer requisições de rede. Alternativamente, muitos desenvolvedores preferem usar bibliotecas de terceiros como `Axios`, que oferece uma API mais conveniente, interceptadores, cancelamento de requisições e melhor tratamento de erros em alguns casos.

**1. Usando a API `fetch`:**

A API `fetch` está disponível globalmente em ambientes React Native, então você não precisa instalar nada extra para usá-la.

**Exemplo de requisição GET com `fetch`:**

```javascript
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';

const ExemploFetchGet = () => {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    // URL de uma API pública de exemplo (JSONPlaceholder)
    fetch('https://jsonplaceholder.typicode.com/posts?_limit=10') // Busca os 10 primeiros posts
      .then(response => {
        if (!response.ok) { // Verifica se a resposta HTTP foi bem-sucedida (status 200-299)
          throw new Error(`Erro HTTP: ${response.status}`);
        }
        return response.json(); // Converte a resposta para JSON
      })
      .then(json => {
        setDados(json); // Atualiza o estado com os dados recebidos
        setCarregando(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados: ", error);
        setErro(error.message);
        setCarregando(false);
      });
  }, []); // Array de dependências vazio para executar apenas na montagem

  if (carregando) {
    return <View style={styles.containerCentralizado}><ActivityIndicator size="large" color="#0000ff" /></View>;
  }

  if (erro) {
    return <View style={styles.containerCentralizado}><Text style={styles.textoErro}>Erro: {erro}</Text></View>;
  }

  return (
    <View style={styles.containerLista}>
      <Text style={styles.tituloLista}>Posts da API (Fetch):</Text>
      <FlatList
        data={dados}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemListaApi}>
            <Text style={styles.itemTitulo}>{item.id}. {item.title}</Text>
            <Text style={styles.itemCorpo}>{item.body.substring(0, 100)}...</Text>
          </View>
        )}
      />
    </View>
  );
};

// ... (Estilos definidos abaixo)
```

**Exemplo de requisição POST com `fetch`:**

```javascript
const criarNovoPost = async (titulo, corpo) => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST', // Especifica o método HTTP
      body: JSON.stringify({ // Corpo da requisição, convertido para string JSON
        title: titulo,
        body: corpo,
        userId: 1, // Exemplo de outro dado necessário pela API
      }),
      headers: { // Cabeçalhos da requisição
        'Content-type': 'application/json; charset=UTF-8',
        // 'Authorization': 'Bearer SEU_TOKEN_AQUI', // Exemplo de header de autorização
      },
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const jsonResponse = await response.json();
    console.log('Post criado:', jsonResponse);
    alert('Post criado com sucesso! ID: ' + jsonResponse.id);
    return jsonResponse;
  } catch (error) {
    console.error('Erro ao criar post:', error);
    alert('Falha ao criar post: ' + error.message);
    throw error;
  }
};

// Para usar:
// criarNovoPost('Meu Título Incrível', 'Este é o conteúdo do meu novo post.');
```

**2. Usando `Axios`:**

Axios é uma biblioteca popular baseada em Promises para fazer requisições HTTP. Ela oferece algumas conveniências sobre `fetch`, como transformação automática de dados JSON, melhor tratamento de erros e interceptadores.

Primeiro, instale o Axios:
```bash
npm install axios
# ou
yarn add axios
```

**Exemplo de requisição GET com `Axios`:**

```javascript
import axios from 'axios';
// ... (resto do componente ExemploFetchGet, mas adaptado para Axios)

// Dentro do useEffect do ExemploFetchGet, substitua o bloco fetch por:
useEffect(() => {
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=10')
    .then(response => {
      // Axios coloca os dados da resposta diretamente em response.data
      setDados(response.data);
      setCarregando(false);
    })
    .catch(error => {
      console.error("Erro ao buscar dados com Axios: ", error);
      // Axios anexa mais informações ao objeto de erro
      if (error.response) {
        // A requisição foi feita e o servidor respondeu com um status fora da faixa 2xx
        setErro(`Erro do servidor: ${error.response.status} - ${error.response.data.message || 'Erro desconhecido'}`);
      } else if (error.request) {
        // A requisição foi feita mas nenhuma resposta foi recebida
        setErro('Nenhuma resposta do servidor. Verifique sua conexão.');
      } else {
        // Algo aconteceu ao configurar a requisição que acionou um Erro
        setErro(`Erro na configuração da requisição: ${error.message}`);
      }
      setCarregando(false);
    });
}, []);
```

**Exemplo de requisição POST com `Axios`:**

```javascript
const criarNovoPostComAxios = async (titulo, corpo) => {
  try {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
      // O segundo argumento do axios.post é o corpo da requisição (objeto JS)
      title: titulo,
      body: corpo,
      userId: 1,
    }, {
      // O terceiro argumento (opcional) são as configurações, incluindo headers
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'Bearer SEU_TOKEN_AQUI',
      }
    });
    console.log('Post criado com Axios:', response.data);
    alert('Post criado com sucesso (Axios)! ID: ' + response.data.id);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar post com Axios:', error);
    // Tratamento de erro mais detalhado como no exemplo GET com Axios
    alert('Falha ao criar post (Axios): ' + (error.response?.data?.message || error.message));
    throw error;
  }
};
```

**Fetch vs. Axios:**
*   **Fetch:** Embutido, sem dependências extras. API um pouco mais verbosa para JSON e tratamento de erros (erros HTTP como 404 ou 500 não rejeitam a Promise por padrão, você precisa checar `response.ok`).
*   **Axios:** API mais concisa para JSON, tratamento de erro mais robusto (rejeita a Promise para status de erro), suporta interceptadores (para modificar requisições/respostas globalmente, ex: adicionar tokens de autenticação), cancelamento de requisições.

A escolha entre eles muitas vezes é uma questão de preferência ou requisitos específicos do projeto. Para projetos simples, `fetch` pode ser suficiente. Para projetos maiores ou com necessidades mais complexas de rede, `Axios` é uma escolha popular.

### Lidando com Respostas (JSON)

A maioria das APIs modernas retorna dados no formato JSON (JavaScript Object Notation). Como vimos nos exemplos:

*   Com `fetch`, você precisa chamar `response.json()` para converter o corpo da resposta em um objeto JavaScript. Esta operação também retorna uma Promise.
*   Com `Axios`, a conversão de JSON para objeto JavaScript geralmente é feita automaticamente, e os dados ficam disponíveis em `response.data`.

É importante sempre verificar se a requisição foi bem-sucedida antes de tentar processar a resposta. Com `fetch`, isso é feito checando `response.ok` ou `response.status`. Com `Axios`, erros de status HTTP (4xx, 5xx) geralmente causam a rejeição da Promise, caindo no bloco `.catch()`.

### Exibindo Dados de APIs em Listas

Uma vez que você buscou os dados (geralmente um array de objetos) de uma API, o próximo passo é exibi-los ao usuário, frequentemente em uma lista. O componente `FlatList` é ideal para isso, pois é otimizado para renderizar listas longas de forma eficiente.

O exemplo `ExemploFetchGet` já demonstra isso:

```javascript
// ... (componente ExemploFetchGet)
  return (
    <View style={styles.containerLista}>
      <Text style={styles.tituloLista}>Posts da API (Fetch):</Text>
      <FlatList
        data={dados} // O array de posts buscados da API
        keyExtractor={item => item.id.toString()} // Usa o ID do post como chave única
        renderItem={({ item }) => ( // Função para renderizar cada item da lista
          <View style={styles.itemListaApi}>
            <Text style={styles.itemTitulo}>{item.id}. {item.title}</Text>
            <Text style={styles.itemCorpo}>{item.body.substring(0, 100)}...</Text>
          </View>
        )}
        // Outras props úteis do FlatList:
        // ListEmptyComponent={<Text>Nenhum item encontrado.</Text>} // Exibido se 'dados' estiver vazio
        // ListHeaderComponent={<Text>Cabeçalho da Lista</Text>}
        // ListFooterComponent={<ActivityIndicator />} // Para indicar carregamento de mais itens (paginação)
        // onEndReached={() => console.log('Chegou ao fim da lista!')} // Chamado ao rolar perto do fim
        // onEndReachedThreshold={0.5} // Quão perto do fim (0 a 1) para chamar onEndReached
        // refreshing={carregando} // Para pull-to-refresh
        // onRefresh={() => fetchDataFunction()} // Função para recarregar os dados
      />
    </View>
  );
// ...
```

**Estilos para o exemplo de lista:**
```javascript
const styles = StyleSheet.create({
  containerCentralizado: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  textoErro: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  containerLista: {
    flex: 1,
    paddingTop: 20,
  },
  tituloLista: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },
  itemListaApi: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  itemCorpo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
```

### Tratamento de Erros e Estados de Carregamento

Ao fazer requisições de rede, é crucial lidar com possíveis erros e informar ao usuário o que está acontecendo, especialmente durante o tempo de espera da resposta.

**1. Estados de Carregamento (`loading`):**

   Mantenha uma variável de estado (ex: `carregando` ou `isLoading`) que é `true` enquanto a requisição está em andamento e `false` quando ela termina (seja com sucesso ou erro). Use este estado para exibir um indicador de carregamento, como o componente `ActivityIndicator`.

   ```javascript
   const [carregando, setCarregando] = useState(true);
   // ...
   setCarregando(true); // Antes de iniciar a requisição
   fetch(...) // ou axios(...)
     .finally(() => {
       setCarregando(false); // Após a requisição terminar (sucesso ou erro)
     });
   
   if (carregando) {
     return <ActivityIndicator />;
   }
   ```

**2. Tratamento de Erros (`error`):**

   Mantenha uma variável de estado para armazenar mensagens de erro (ex: `erro` ou `error`). No bloco `.catch()` da sua Promise de requisição, atualize este estado com uma mensagem de erro apropriada.

   ```javascript
   const [erro, setErro] = useState(null);
   // ...
   fetch(...)
     .catch(error => {
       setErro(error.message || 'Ocorreu um erro desconhecido.');
       // ...
     });

   if (erro) {
     return <Text>Erro: {erro}</Text>;
   }
   ```
   É importante limpar o estado de erro antes de uma nova tentativa de requisição: `setErro(null);`

**Boas Práticas:**
*   **Feedback Claro:** Sempre forneça feedback visual para o usuário (indicadores de carregamento, mensagens de erro claras e amigáveis).
*   **Tentativas (Retries):** Para erros de rede intermitentes, você pode implementar uma lógica de nova tentativa (retry), possivelmente com um backoff exponencial.
*   **Timeout:** Configure timeouts para suas requisições para evitar que o aplicativo fique esperando indefinidamente por uma resposta que nunca virá.
*   **Tratamento Específico de Erros HTTP:** Diferencie erros de rede (sem conexão) de erros de servidor (status 4xx, 5xx) para fornecer mensagens mais precisas.

### Armazenamento Local (`AsyncStorage`)

Às vezes, você precisa armazenar dados simples no dispositivo do usuário para que persistam entre as sessões do aplicativo. Exemplos incluem preferências do usuário, tokens de autenticação, ou dados em cache.

Para isso, o React Native (através da comunidade) oferece o `AsyncStorage`. Ele é um sistema de armazenamento de chave-valor, assíncrono e não criptografado, persistente e global para o aplicativo.

**Importante:** `AsyncStorage` foi removido do núcleo do React Native e agora é mantido pela comunidade como um pacote separado: `@react-native-async-storage/async-storage`.

**1. Instalar `AsyncStorage`:**

```bash
npm install @react-native-async-storage/async-storage
# ou
yarn add @react-native-async-storage/async-storage
```

Se estiver em um projeto Bare Workflow, pode ser necessário fazer o link (geralmente `npx pod-install ios` para iOS).

**2. Usando `AsyncStorage`:**

As operações com `AsyncStorage` são assíncronas e retornam Promises.

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const KEY_NOME_USUARIO = '@MeuApp:nomeUsuario';

const ExemploAsyncStorage = () => {
  const [nomeInput, setNomeInput] = useState('');
  const [nomeSalvo, setNomeSalvo] = useState('');
  const [carregandoNome, setCarregandoNome] = useState(true);

  // Carregar o nome salvo ao montar o componente
  useEffect(() => {
    const carregarNome = async () => {
      try {
        const nome = await AsyncStorage.getItem(KEY_NOME_USUARIO);
        if (nome !== null) {
          setNomeSalvo(nome);
        }
      } catch (e) {
        console.error('Falha ao carregar o nome do AsyncStorage', e);
        Alert.alert('Erro', 'Não foi possível carregar o nome salvo.');
      } finally {
        setCarregandoNome(false);
      }
    };
    carregarNome();
  }, []);

  const salvarNome = async () => {
    if (!nomeInput.trim()) {
      Alert.alert('Atenção', 'Por favor, digite um nome para salvar.');
      return;
    }
    try {
      await AsyncStorage.setItem(KEY_NOME_USUARIO, nomeInput);
      setNomeSalvo(nomeInput);
      setNomeInput(''); // Limpa o input
      Alert.alert('Sucesso', 'Nome salvo no dispositivo!');
    } catch (e) {
      console.error('Falha ao salvar o nome no AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível salvar o nome.');
    }
  };

  const removerNome = async () => {
    try {
      await AsyncStorage.removeItem(KEY_NOME_USUARIO);
      setNomeSalvo('');
      Alert.alert('Sucesso', 'Nome removido do dispositivo!');
    } catch (e) {
      console.error('Falha ao remover o nome do AsyncStorage', e);
      Alert.alert('Erro', 'Não foi possível remover o nome.');
    }
  };

  if (carregandoNome) {
    return <View style={stylesAsync.container}><ActivityIndicator size="small" /></View>;
  }

  return (
    <View style={stylesAsync.container}>
      <Text style={stylesAsync.label}>Digite seu nome:</Text>
      <TextInput
        style={stylesAsync.input}
        value={nomeInput}
        onChangeText={setNomeInput}
        placeholder="Seu nome aqui"
      />
      <View style={stylesAsync.botoesContainer}>
        <Button title="Salvar Nome" onPress={salvarNome} color="green" />
        <View style={{width:10}}/>{/* Espaçador */}
        <Button title="Remover Nome" onPress={removerNome} color="red" />
      </View>
      {nomeSalvo ? (
        <Text style={stylesAsync.nomeSalvoTexto}>Nome salvo: {nomeSalvo}</Text>
      ) : (
        <Text style={stylesAsync.nomeSalvoTexto}>Nenhum nome salvo.</Text>
      )}
    </View>
  );
};

const stylesAsync = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  label: { fontSize: 16, marginBottom: 5 },
  input: { height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15, paddingHorizontal: 10, borderRadius: 5 },
  botoesContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  nomeSalvoTexto: { fontSize: 18, textAlign: 'center', marginTop: 20, color: 'dodgerblue' },
});

export default ExemploAsyncStorage;
```

**Principais Métodos do `AsyncStorage`:**

*   `AsyncStorage.setItem(key, value)`: Salva um valor (string) associado a uma chave.
*   `AsyncStorage.getItem(key)`: Recupera o valor associado a uma chave. Retorna `null` se a chave não existir.
*   `AsyncStorage.removeItem(key)`: Remove o par chave-valor.
*   `AsyncStorage.mergeItem(key, value)`: Mescla um valor JSON existente com um novo valor JSON.
*   `AsyncStorage.clear()`: Remove todos os dados do AsyncStorage para o aplicativo.
*   `AsyncStorage.getAllKeys()`: Retorna todas as chaves usadas pelo aplicativo.
*   `AsyncStorage.multiGet(keys)`: Recupera múltiplos itens de uma vez.
*   `AsyncStorage.multiSet(keyValuePairs)`: Salva múltiplos itens de uma vez.
*   `AsyncStorage.multiRemove(keys)`: Remove múltiplos itens de uma vez.

**Considerações sobre `AsyncStorage`:**
*   **Apenas Strings:** `AsyncStorage` só armazena strings. Se você precisar armazenar objetos ou arrays, use `JSON.stringify()` para converter em string antes de salvar e `JSON.parse()` para converter de volta ao ler.
*   **Assíncrono:** Todas as operações são assíncronas, então use `async/await` ou Promises.
*   **Não Criptografado:** Os dados são armazenados em texto plano. Não use `AsyncStorage` para dados sensíveis (como senhas ou informações financeiras) sem uma camada adicional de criptografia.
*   **Limites de Tamanho:** Embora geralmente generoso (vários megabytes), pode haver limites de tamanho dependendo da plataforma. Não é ideal para armazenar grandes quantidades de dados binários (como imagens ou vídeos).
*   **Alternativas para Dados Complexos:** Para necessidades de banco de dados mais complexas (relacionamentos, queries avançadas), considere usar soluções como SQLite (com bibliotecas como `react-native-sqlite-storage`) ou bancos de dados NoSQL mobile como WatermelonDB ou Realm.

Saber como interagir com APIs externas e como persistir dados localmente são habilidades essenciais para construir aplicativos React Native ricos em funcionalidades. Com `fetch`/`Axios` e `AsyncStorage`, você tem as ferramentas básicas para começar a gerenciar dados em seus projetos.

Na próxima seção, exploraremos algumas funcionalidades intermediárias do React Native, como o uso de APIs nativas do dispositivo, animações e gerenciamento de estado mais avançado.

---


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
        *   **Conceitos:** Cria-se um "store" (que é um Hook customizado) que contém o estado e as ações para modificá-lo. Os componentes podem se inscrever em partes do store.
        *   **Vantagens:** Simples de aprender e usar, flexível, boa performance, menos boilerplate.
        *   **Desvantagens:** Menos ferramentas de desenvolvimento dedicadas em comparação com Redux (embora possa ser usado com Redux DevTools).

   *   **Jotai / Recoil:**
        *   Abordagens mais atômicas para gerenciamento de estado, onde o estado é dividido em pequenas unidades (átomos). Os componentes se inscrevem apenas nos átomos que lhes interessam.
        *   **Vantagens:** Podem levar a menos re-renderizações desnecessárias, boa para estados derivados e assíncronos.
        *   **Desvantagens:** Ecossistemas menores em comparação com Redux, podem ter uma curva de aprendizado diferente.

   A escolha de uma biblioteca de gerenciamento de estado depende muito da complexidade do seu aplicativo, do tamanho da equipe e das preferências pessoais. Para muitos aplicativos de tamanho pequeno a médio, Context API ou Zustand podem ser suficientes. Para aplicações muito grandes e complexas, Redux (com Toolkit) ainda é uma escolha sólida.

### Ciclo de Vida de Componentes com Hooks (`useEffect`)

Em componentes funcionais, o Hook `useEffect` é usado para lidar com efeitos colaterais (side effects), que são operações que acontecem fora do fluxo normal de renderização, como:

*   Busca de dados.
*   Inscrições (subscriptions) a eventos ou fontes externas.
*   Modificações manuais no DOM (menos comum em React Native).

`useEffect` substitui os métodos de ciclo de vida de componentes de classe como `componentDidMount`, `componentDidUpdate`, e `componentWillUnmount`.

**Sintaxe:**
`useEffect(() => { /* efeito colateral */ return () => { /* limpeza (opcional) */ }; }, [/* dependências (opcional) */]);`

*   **Função de Efeito:** O primeiro argumento é a função que contém a lógica do efeito colateral.
*   **Função de Limpeza (Cleanup):** Opcionalmente, a função de efeito pode retornar outra função. Esta função de limpeza será executada antes que o componente seja removido da UI (desmontado) e antes de executar o efeito novamente devido a mudanças nas dependências. Útil para cancelar inscrições, timers, ou requisições de rede.
*   **Array de Dependências:** O segundo argumento (opcional) é um array de valores. O efeito só será re-executado se algum dos valores neste array mudar entre as renderizações.
    *   Se omitido: O efeito roda após cada renderização.
    *   Array vazio (`[]`): O efeito roda apenas uma vez após a montagem inicial (similar a `componentDidMount`) e a limpeza roda na desmontagem (similar a `componentWillUnmount`).
    *   Array com valores (`[propA, stateB]`): O efeito roda após a montagem inicial e sempre que `propA` ou `stateB` mudarem (similar a `componentDidUpdate` para essas dependências específicas).

**Exemplos:**

```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';

const ExemploUseEffect = ({ userId }) => {
  const [dadosUsuario, setDadosUsuario] = useState(null);
  const [contador, setContador] = useState(0);

  // 1. Roda apenas na montagem e desmontagem (array de dependências vazio)
  useEffect(() => {
    console.log('Componente montado!');
    const timerId = setInterval(() => {
      console.log('Timer tick');
    }, 2000);

    return () => {
      console.log('Componente desmontado! Limpando timer.');
      clearInterval(timerId);
    };
  }, []);

  // 2. Roda na montagem e sempre que `userId` mudar
  useEffect(() => {
    if (userId) {
      console.log(`Buscando dados para o usuário: ${userId}`);
      // Simula uma busca de dados
      setTimeout(() => {
        setDadosUsuario({ id: userId, nome: `Usuário ${userId}` });
      }, 1000);
    }
    // Função de limpeza para cancelar busca se userId mudar antes de completar
    return () => {
        console.log(`Limpando efeito para userId: ${userId}`);
        // Lógica para cancelar a busca de dados se necessário
    }
  }, [userId]);

  // 3. Roda após cada renderização (sem array de dependências - use com cautela)
  // useEffect(() => {
  //   console.log('Componente renderizado (contador ou dadosUsuario mudou)');
  // });

  return (
    <View style={{padding: 10}}>
      <Text>Contador: {contador}</Text>
      <Button title="Incrementar" onPress={() => setContador(c => c + 1)} />
      {dadosUsuario ? (
        <Text>Nome do Usuário ({dadosUsuario.id}): {dadosUsuario.nome}</Text>
      ) : (
        <Text>Carregando dados do usuário...</Text>
      )}
    </View>
  );
};
```

### Debugging e Ferramentas de Desenvolvedor

Saber como depurar seu código é crucial.

*   **Menu de Desenvolvedor:** Agite o dispositivo ou use atalhos (Cmd+D no iOS Simulator, Cmd+M ou Ctrl+M no Android Emulator/dispositivo) para abrir o menu de desenvolvedor. Ele oferece opções como:
    *   **Reload:** Recarrega o bundle JavaScript.
    *   **Debug:** Abre o depurador JavaScript no seu navegador (Chrome DevTools). Você pode definir breakpoints, inspecionar variáveis, etc.
    *   **Performance Monitor:** Mostra informações de performance (FPS, uso de RAM, etc.) na tela.
    *   **Element Inspector:** Permite inspecionar a hierarquia de componentes e seus estilos (similar ao inspetor de elementos do navegador).
*   **`console.log()` (e `warn`, `error`):** Seus logs aparecerão no terminal do Metro Bundler e no console do depurador do navegador.
*   **React Native Debugger:** Uma aplicação standalone que combina Redux DevTools, React DevTools e o depurador do Chrome em uma única interface. Muito útil.
*   **Flipper:** Uma plataforma de depuração extensível da Meta para iOS, Android e React Native. Oferece plugins para logs, layout, rede, crash reporter, e mais.
*   **VS Code Debugger:** Você pode configurar o VS Code para depurar seu aplicativo React Native diretamente no editor.

### Boas Práticas e Otimização de Performance

*   **Use `FlatList` ou `SectionList` para listas longas** em vez de `ScrollView` com `.map()`.
*   **Otimize o `renderItem` de listas:** Use `React.memo` em componentes de item de lista se eles forem puros (mesmas props resultam na mesma renderização). Forneça uma `keyExtractor` estável.
*   **Evite funções inline no JSX para props que não mudam:** Se uma função é passada como prop e recriada a cada renderização (ex: `onPress={() => fazAlgo()}`), pode causar re-renderizações desnecessárias em componentes filhos otimizados. Use `useCallback` ou defina a função fora do render.
*   **Use `useNativeDriver: true` para animações** sempre que possível.
*   **Remova `console.log` em produção:** Eles podem impactar a performance.
*   **Otimize imagens:** Use formatos adequados (PNG, WebP), comprima imagens e use tamanhos apropriados para diferentes densidades de tela. Considere lazy loading para imagens fora da tela.
*   **Minimize o trabalho no thread JavaScript:** Mova operações pesadas para threads nativos se possível (raramente necessário para a maioria das apps) ou use bibliotecas que fazem isso (como Reanimated).
*   **Cuidado com o `useEffect` sem array de dependências ou com dependências que mudam constantemente.**
*   **Monitore a performance:** Use o Performance Monitor, Flipper, ou o profiler do React DevTools para identificar gargalos.
*   **Mantenha as dependências atualizadas.**

Esta seção cobriu uma gama de tópicos intermediários. Cada um deles poderia ser um guia por si só. O objetivo foi introduzir os conceitos e fornecer um ponto de partida para exploração mais aprofundada. Com essas ferramentas e conhecimentos, você está bem equipado para construir aplicativos React Native mais sofisticados e robustos.

Lembre-se que a documentação oficial do React Native, do Expo, e das bibliotecas de terceiros são seus melhores amigos. A comunidade React Native é vasta e ativa, então muitos recursos, tutoriais e soluções para problemas comuns estão disponíveis online.

---

## Conclusão e Próximos Passos

Parabéns por chegar até aqui! Este guia cobriu uma jornada extensa pelo mundo do React Native, desde os conceitos mais básicos até funcionalidades intermediárias. Exploramos a configuração do ambiente, a criação de componentes, estilização e layout com Flexbox, navegação entre telas com React Navigation, interação com APIs externas, armazenamento local, acesso a recursos nativos do dispositivo, animações e estratégias de gerenciamento de estado.

O React Native é uma framework poderosa e versátil para o desenvolvimento de aplicativos móveis multiplataforma. Com a base que você adquiriu, você está pronto para:

*   **Construir seus próprios projetos:** A melhor maneira de solidificar o aprendizado é praticando. Comece com ideias simples e vá aumentando a complexidade.
*   **Aprofundar-se em tópicos específicos:** Cada seção deste guia pode ser expandida. Mergulhe na documentação de bibliotecas como React Navigation, Redux, Lottie, ou Reanimated.
*   **Explorar o ecossistema:** Descubra mais bibliotecas e ferramentas da comunidade que podem facilitar seu desenvolvimento.
*   **Contribuir para a comunidade:** Compartilhe seu conhecimento, ajude outros desenvolvedores, ou contribua para projetos open-source.
*   **Manter-se atualizado:** O mundo do desenvolvimento mobile e do React Native está sempre evoluindo. Acompanhe blogs, conferências e as novidades da framework.

**Desafios para praticar:**

1.  **Aplicativo de Lista de Tarefas (To-Do List):** Com armazenamento local (AsyncStorage), adição, remoção e marcação de tarefas como concluídas.
2.  **Aplicativo de Catálogo de Filmes:** Consumindo uma API pública de filmes (como a do The Movie Database - TMDB), exibindo listas de filmes, detalhes de cada filme, e busca.
3.  **Clone Simples de uma Rede Social:** Com posts, feed, perfis de usuário (mockados ou com uma API simples), e navegação entre eles.
4.  **Aplicativo de Previsão do Tempo:** Usando uma API de clima e geolocalização para mostrar a previsão para a localização atual do usuário.

Lembre-se que o aprendizado é um processo contínuo. Não tenha medo de experimentar, cometer erros e aprender com eles. A comunidade React Native é um ótimo recurso para buscar ajuda e inspiração.

Esperamos que este guia tenha sido útil e que você se sinta mais confiante para desenvolver aplicativos incríveis com React Native. Boa codificação!


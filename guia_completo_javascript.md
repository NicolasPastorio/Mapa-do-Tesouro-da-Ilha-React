# Guia Completo de JavaScript: Do Básico ao Avançado

## Parte 1: Fundamentos e JavaScript no Cliente (Browser)

### Introdução ao JavaScript

Bem-vindo ao mundo do JavaScript! Se você está começando sua jornada no desenvolvimento web ou buscando aprofundar seus conhecimentos, você veio ao lugar certo. JavaScript é, sem dúvida, uma das linguagens de programação mais importantes e onipresentes da atualidade. Originalmente concebida para adicionar interatividade às páginas web, ela evoluiu drasticamente, tornando-se uma ferramenta poderosa não apenas para o desenvolvimento front-end (o que você vê e interage no navegador), mas também para o back-end (a lógica que roda no servidor), desenvolvimento mobile, automação de tarefas e muito mais.

#### História e Evolução

A história do JavaScript começa em meados dos anos 90, uma época de rápida expansão da World Wide Web. A Netscape Communications Corporation, criadora do popular navegador Netscape Navigator, percebeu a necessidade de uma linguagem de script leve que pudesse ser executada diretamente no navegador para tornar as páginas web mais dinâmicas. Em 1995, Brendan Eich, um engenheiro da Netscape, recebeu a tarefa de criar essa linguagem. Em apenas dez dias (!), ele desenvolveu um protótipo chamado Mocha, que logo foi renomeado para LiveScript e, finalmente, para JavaScript. Essa última mudança de nome foi, em parte, uma jogada de marketing para capitalizar a popularidade crescente da linguagem Java da Sun Microsystems, embora as duas linguagens sejam fundamentalmente diferentes em design e propósito.

Vendo o potencial do JavaScript, a Microsoft logo lançou sua própria implementação, chamada JScript, para o Internet Explorer. Para evitar uma fragmentação prejudicial e garantir a interoperabilidade entre os navegadores, a Netscape submeteu o JavaScript à ECMA International, uma organização de padronização. Em 1997, foi publicado o primeiro padrão oficial da linguagem, conhecido como ECMAScript (ECMA-262). Desde então, ECMAScript se tornou o nome oficial da especificação da linguagem, enquanto JavaScript é o nome comercial e mais comum da implementação.

A linguagem passou por várias atualizações ao longo dos anos. Por um período, a evolução foi lenta, mas a partir de 2009 (com o ECMAScript 5, ou ES5) e especialmente com o lançamento do ECMAScript 2015 (ES6), a linguagem entrou em um ciclo de atualizações anuais, introduzindo novos recursos, sintaxe mais moderna e melhorias significativas que a tornaram mais robusta, expressiva e adequada para aplicações complexas.

#### O que é JavaScript e onde ele roda?

Em sua essência, JavaScript é uma linguagem de programação de alto nível, dinâmica, interpretada (ou compilada just-in-time) e multi-paradigma (suporta estilos de programação procedural, orientada a objetos e funcional). "Alto nível" significa que ela abstrai muitos detalhes complexos do hardware do computador, tornando-a mais fácil de aprender e usar. "Dinâmica" refere-se, principalmente, à tipagem dinâmica, onde o tipo de uma variável é verificado em tempo de execução, não em tempo de compilação. "Interpretada" significa que o código é executado linha por linha por um interpretador (o motor JavaScript), embora os motores modernos realizem otimizações complexas, incluindo compilação just-in-time (JIT) para melhorar o desempenho.

O ambiente mais tradicional para o JavaScript é o **navegador web** (client-side). Todo navegador moderno (Chrome, Firefox, Safari, Edge, etc.) possui um motor JavaScript embutido (como o V8 do Google, SpiderMonkey da Mozilla, JavaScriptCore da Apple) que executa o código JavaScript contido nas páginas web. Nesse contexto, o JavaScript é usado para:

*   Manipular o conteúdo HTML da página (adicionar, remover ou modificar elementos).
*   Alterar a estilização CSS dos elementos.
*   Reagir a eventos do usuário (cliques, movimentos do mouse, digitação no teclado).
*   Validar dados de formulários antes de enviá-los ao servidor.
*   Realizar requisições assíncronas para buscar ou enviar dados para um servidor sem recarregar a página (AJAX, Fetch API).
*   Criar animações e efeitos visuais complexos.
*   E muito mais...

No entanto, a grande virada na história do JavaScript ocorreu em 2009 com a criação do **Node.js** por Ryan Dahl. Node.js é um ambiente de execução (runtime) que permite rodar JavaScript **fora do navegador**, no lado do servidor (server-side). Ele utiliza o mesmo motor V8 do Google Chrome, mas adiciona módulos próprios para interagir com o sistema de arquivos, redes, bancos de dados e outras funcionalidades típicas de aplicações de servidor. Com o Node.js, JavaScript se tornou uma opção viável e popular para construir:

*   Aplicações web completas (back-end).
*   APIs (Application Programming Interfaces) RESTful.
*   Ferramentas de linha de comando.
*   Aplicações de tempo real (como chats).
*   Microserviços.

Além do navegador e do Node.js, JavaScript (ou suas variantes/superset como TypeScript) também pode ser encontrado em outros ambientes, como desenvolvimento mobile (React Native, NativeScript), desenvolvimento desktop (Electron), bancos de dados (MongoDB usa JavaScript para queries e scripts) e até mesmo em IoT (Internet of Things).

#### Diferenças: Client-Side vs Server-Side

Embora a linguagem seja a mesma, o contexto de execução (navegador vs. servidor) impõe diferenças importantes:

*   **Objetivo Principal:** No cliente, o foco é a interface do usuário (UI) e a experiência do usuário (UX), manipulação do DOM e interação com o usuário. No servidor, o foco é a lógica de negócios, acesso a dados, autenticação, gerenciamento de requisições e respostas.
*   **APIs Disponíveis:** No navegador, você tem acesso a APIs específicas do ambiente web, como `window`, `document` (DOM API), `localStorage`, `fetch`, `navigator`, etc. No servidor (Node.js), você não tem acesso direto ao DOM ou a objetos como `window`, mas possui APIs para interagir com o sistema operacional, como `fs` (File System), `http`, `path`, `process`, além de um vasto ecossistema de módulos via npm (Node Package Manager).
*   **Segurança:** O JavaScript no navegador roda em um ambiente restrito (sandbox) por razões de segurança, limitando seu acesso aos recursos do sistema do usuário. No servidor, o JavaScript tem acesso muito mais amplo aos recursos do servidor onde está rodando (com as devidas permissões do sistema operacional).
*   **Estado:** Aplicações client-side geralmente gerenciam o estado da interface do usuário. Aplicações server-side precisam gerenciar o estado da aplicação como um todo, muitas vezes envolvendo bancos de dados para persistência.

É fundamental entender essas diferenças ao desenvolver, pois o código escrito para um ambiente pode não funcionar ou não fazer sentido no outro sem adaptações.

#### Como o código JavaScript é executado?

Quando um navegador carrega uma página HTML que inclui scripts JavaScript (seja em tags `<script>` ou em arquivos `.js` externos referenciados), o motor JavaScript do navegador entra em ação:

1.  **Parsing:** O motor lê (faz o parse) do código JavaScript, verificando a sintaxe e convertendo-o em uma estrutura de dados interna chamada Árvore de Sintaxe Abstrata (AST - Abstract Syntax Tree).
2.  **Compilação (JIT):** Motores modernos como o V8 não são puramente interpretados. Eles compilam o código JavaScript para bytecode ou diretamente para código de máquina nativo em tempo de execução (Just-In-Time compilation). Isso otimiza significativamente a performance, especialmente para código que é executado repetidamente.
3.  **Execução:** O bytecode ou código de máquina compilado é então executado. O motor gerencia a alocação de memória, a coleta de lixo (garbage collection - liberar memória não utilizada) e a execução das instruções.

No Node.js, o processo é semelhante, mas ocorre no ambiente do servidor, sem a interface gráfica do navegador. O Node.js lê o arquivo `.js` especificado, o motor V8 faz o parsing, compilação JIT e execução, interagindo com as APIs do Node.js e do sistema operacional conforme necessário.

Um conceito crucial em ambos os ambientes (mas especialmente visível no Node.js e em interações assíncronas no navegador) é o **Event Loop**. JavaScript é, fundamentalmente, single-threaded (executa uma coisa de cada vez em uma única thread principal). No entanto, ele pode lidar com operações assíncronas (como requisições de rede, timers, leitura de arquivos) de forma eficiente graças ao Event Loop. Operações que podem demorar são delegadas a APIs do sistema ou do navegador. Quando essas operações terminam, elas colocam suas funções de callback (ou a resolução de Promises) em uma fila. O Event Loop constantemente verifica se a pilha de execução principal está vazia. Se estiver, ele pega a próxima função da fila e a move para a pilha para ser executada. Isso permite que o JavaScript lide com muitas operações concorrentes sem bloquear a thread principal, mantendo a aplicação responsiva.

Com esta introdução, esperamos que você tenha uma visão geral do que é o JavaScript, sua história, onde ele pode ser usado e como ele funciona por baixo dos panos. Nas próximas seções, mergulharemos nos detalhes práticos, começando pela configuração do ambiente e pelos fundamentos da linguagem.


### Configuração do Ambiente de Desenvolvimento

Antes de começarmos a escrever código JavaScript de fato, é essencial preparar nosso ambiente de desenvolvimento. Um bom ambiente nos fornecerá as ferramentas necessárias para escrever, testar e depurar nosso código de forma eficiente. Felizmente, para começar com JavaScript no lado do cliente, a configuração inicial é bastante simples, pois as ferramentas fundamentais já estão incorporadas nos navegadores modernos. No entanto, para uma experiência de desenvolvimento mais profissional e para preparar o terreno para o Node.js, vamos configurar algumas ferramentas adicionais.

#### Ferramentas do Desenvolvedor do Navegador (DevTools)

As Ferramentas do Desenvolvedor, ou DevTools, são um conjunto de utilitários integrados diretamente nos navegadores web (como Chrome, Firefox, Edge, Safari) que permitem inspecionar e depurar o código HTML, CSS e JavaScript de uma página web. Elas são absolutamente indispensáveis para qualquer desenvolvedor front-end.

Para acessá-las, geralmente basta clicar com o botão direito em qualquer elemento da página e selecionar "Inspecionar" ou "Inspecionar Elemento", ou usar um atalho de teclado (como F12 ou Ctrl+Shift+I / Cmd+Opt+I). As DevTools geralmente abrem em um painel na parte inferior ou lateral da janela do navegador e contêm várias abas, sendo as mais importantes para nós neste momento:

*   **Console:** Esta é talvez a ferramenta mais utilizada ao aprender JavaScript. O console permite:
    *   Visualizar mensagens de log, avisos e erros gerados pelo seu código JavaScript (usando `console.log()`, `console.warn()`, `console.error()`).
    *   Executar código JavaScript interativamente. Você pode digitar comandos JavaScript diretamente no console e ver o resultado imediatamente. Isso é ótimo para testar pequenos trechos de código ou verificar o valor de variáveis.
    *   Inspecionar objetos e variáveis.
*   **Elements (ou Inspector):** Permite visualizar a estrutura HTML da página (a árvore DOM) e o CSS aplicado a cada elemento. Você pode até mesmo editar o HTML e o CSS ao vivo para ver como as mudanças afetam a página, embora essas alterações sejam temporárias e perdidas ao recarregar a página.
*   **Sources (ou Debugger):** Permite visualizar os arquivos de código-fonte (HTML, CSS, JS) carregados pela página. Mais importante, permite definir *breakpoints* (pontos de interrupção) no seu código JavaScript. Quando a execução do código atinge um breakpoint, ela pausa, permitindo que você inspecione o valor das variáveis naquele ponto, execute o código linha por linha (step through) e entenda o fluxo de execução. Esta é uma ferramenta poderosa para encontrar e corrigir bugs (depuração).
*   **Network:** Mostra todas as requisições de rede feitas pela página (para carregar imagens, scripts, folhas de estilo, dados de APIs, etc.). É útil para analisar o tempo de carregamento e depurar problemas relacionados a requisições assíncronas.

**Exercício Prático:** Abra qualquer página web (pode ser esta mesma, se estiver lendo no navegador, ou google.com), abra as DevTools (F12), vá para a aba "Console" e digite o seguinte comando, pressionando Enter depois:

```javascript
console.log('Olá, DevTools!');
let a = 10;
let b = 20;
console.log('A soma de a + b é:', a + b);
```

Observe as mensagens que aparecem no console. Experimente digitar `a` e pressionar Enter para ver o valor da variável.

Familiarize-se com a abertura e navegação básica pelas DevTools no seu navegador preferido. Passaremos muito tempo usando o Console e o Debugger ao longo deste guia.

#### Escolhendo e Configurando um Editor de Código

Embora você possa tecnicamente escrever JavaScript em um editor de texto simples como o Bloco de Notas, usar um editor de código moderno tornará sua vida muito mais fácil. Esses editores oferecem recursos como:

*   **Realce de Sintaxe (Syntax Highlighting):** Colore diferentes partes do código (palavras-chave, variáveis, strings, comentários) para facilitar a leitura.
*   **Autocompletar (IntelliSense/Autocomplete):** Sugere código enquanto você digita, economizando tempo e reduzindo erros de digitação.
*   **Detecção de Erros (Linting/Error Checking):** Analisa seu código em tempo real e aponta possíveis erros de sintaxe ou estilo.
*   **Formatação de Código:** Ajuda a manter seu código organizado e com um estilo consistente automaticamente.
*   **Gerenciamento de Arquivos e Projetos:** Facilita a navegação entre diferentes arquivos em seu projeto.
*   **Integração com Controle de Versão (Git):** Permite gerenciar o histórico do seu código.
*   **Terminal Integrado:** Permite executar comandos de linha (como os do Node.js e npm) sem sair do editor.
*   **Extensibilidade:** Suporte a plugins e extensões para adicionar novas funcionalidades.

Existem muitas opções excelentes de editores de código, muitas delas gratuitas. Algumas das mais populares para desenvolvimento JavaScript incluem:

*   **Visual Studio Code (VS Code):** Desenvolvido pela Microsoft, é atualmente o editor mais popular na comunidade de desenvolvimento web. É gratuito, de código aberto, multiplataforma (Windows, macOS, Linux) e possui um vasto ecossistema de extensões. **Recomendamos fortemente o uso do VS Code para este guia.**
*   **Sublime Text:** Um editor leve, rápido e altamente personalizável. É pago, mas oferece um período de avaliação ilimitado.
*   **Atom:** Desenvolvido pelo GitHub, também é gratuito e de código aberto, com boa extensibilidade (embora seu desenvolvimento tenha sido descontinuado em favor do VS Code).
*   **WebStorm:** Um IDE (Ambiente de Desenvolvimento Integrado) completo e poderoso da JetBrains. É pago, mas oferece muitos recursos avançados específicos para JavaScript e desenvolvimento web.

**Instalação e Configuração Básica (VS Code):**

1.  **Download:** Vá para o site oficial do Visual Studio Code ([https://code.visualstudio.com/](https://code.visualstudio.com/)) e baixe o instalador para o seu sistema operacional.
2.  **Instalação:** Siga as instruções do instalador. É um processo simples.
3.  **Extensões Úteis (Opcional, mas recomendado):** Após abrir o VS Code, vá para a aba de Extensões (ícone de blocos no menu lateral esquerdo) e procure por estas extensões populares para desenvolvimento web:
    *   `Prettier - Code formatter`: Formata automaticamente seu código para manter um estilo consistente.
    *   `ESLint`: Analisa seu código JavaScript em busca de erros e problemas de estilo (requer alguma configuração adicional no projeto, que veremos mais tarde).
    *   `Live Server`: Permite iniciar um servidor de desenvolvimento local com recarregamento automático (live reload), muito útil para ver as alterações no navegador instantaneamente ao salvar um arquivo HTML/CSS/JS.
    *   `Portuguese (Brazil) Language Pack for Visual Studio Code`: Se preferir a interface em português.

**Exercício Prático:** Crie uma nova pasta em seu computador chamada `javascript_aprendizado`. Abra o VS Code e use a opção "File > Open Folder..." (ou "Arquivo > Abrir Pasta...") para abrir essa pasta. Crie um novo arquivo chamado `teste.js` dentro dela (`File > New File` ou Ctrl+N, depois salve como `teste.js`). Digite o mesmo código do exercício anterior no arquivo:

```javascript
console.log('Olá, VS Code!');
let a = 10;
let b = 20;
console.log('A soma de a + b é:', a + b);
```

Observe como o VS Code colore a sintaxe. Salve o arquivo (Ctrl+S / Cmd+S).

#### Instalando Node.js e npm (para ferramentas e server-side)

Mesmo que nosso foco inicial seja o JavaScript no navegador, é altamente recomendável instalar o Node.js desde já. Por quê?

1.  **Ferramentas de Desenvolvimento:** Muitas ferramentas modernas de desenvolvimento front-end (como bundlers, transpilers, linters, formatters e o próprio React) são construídas sobre Node.js e gerenciadas via npm.
2.  **Execução Local:** Permite executar arquivos JavaScript diretamente do terminal, sem precisar de um arquivo HTML e um navegador, o que é útil para testes rápidos.
3.  **Preparação para o Server-Side:** Já teremos o ambiente pronto quando chegarmos à parte de Node.js deste guia.

**npm (Node Package Manager)** é o gerenciador de pacotes padrão do Node.js. Ele vem junto com a instalação do Node.js e é usado para instalar e gerenciar bibliotecas e ferramentas de terceiros (pacotes) em seus projetos.

**Instalação do Node.js e npm:**

1.  **Download:** Vá para o site oficial do Node.js ([https://nodejs.org/](https://nodejs.org/)).
2.  **Escolha a Versão:** Você verá duas versões principais para download: LTS (Long Term Support) e Current. **Recomendamos fortemente baixar a versão LTS**, pois ela é mais estável e tem suporte de longo prazo, sendo ideal para a maioria dos usuários e para produção.
3.  **Instalação:** Baixe o instalador para o seu sistema operacional (Windows, macOS, Linux) e siga as instruções. A instalação é direta e incluirá tanto o Node.js quanto o npm.
4.  **Verificação:** Após a instalação, abra o terminal do seu sistema (Prompt de Comando ou PowerShell no Windows, Terminal no macOS/Linux) ou o terminal integrado do VS Code (`Terminal > New Terminal` ou Ctrl+`). Digite os seguintes comandos para verificar se a instalação foi bem-sucedida:

    ```bash
    node -v
    npm -v
    ```

    Esses comandos devem exibir as versões instaladas do Node.js e do npm, respectivamente.

**Exercício Prático:** No terminal (dentro da pasta `javascript_aprendizado` que você criou), execute o arquivo `teste.js` usando o Node.js:

```bash
nodemon teste.js
```

Você deverá ver a saída do `console.log` diretamente no terminal:

```
Olá, VS Code!
A soma de a + b é: 30
```

Pronto! Agora temos nosso ambiente de desenvolvimento minimamente configurado. Temos as DevTools do navegador para inspecionar e depurar o código no cliente, um editor de código (VS Code) para escrever nosso código de forma eficiente, e o Node.js/npm instalados para executar JavaScript localmente e gerenciar ferramentas e dependências. Estamos prontos para mergulhar nos fundamentos da linguagem JavaScript!


### Fundamentos Essenciais do JavaScript

Agora que nosso ambiente está pronto, podemos começar a explorar os blocos de construção fundamentais da linguagem JavaScript. Dominar esses conceitos é crucial, pois eles formam a base sobre a qual construiremos lógicas mais complexas e aplicações interativas.

#### Sintaxe Básica e Comentários

JavaScript, como qualquer linguagem de programação, possui regras de sintaxe que definem como o código deve ser escrito para ser compreendido pelo interpretador (o motor JavaScript).

*   **Instruções (Statements):** O código JavaScript é composto por instruções, que são comandos que realizam ações. Cada instrução geralmente termina com um ponto e vírgula (`;`). Embora o ponto e vírgula seja tecnicamente opcional em muitos casos devido a um recurso chamado ASI (Automatic Semicolon Insertion), é considerada uma **boa prática** sempre incluí-lo para evitar ambiguidades e erros inesperados. Exemplo:
    ```javascript
    let mensagem = "Olá, mundo!";
    console.log(mensagem);
    ```
*   **Case-Sensitivity:** JavaScript diferencia maiúsculas de minúsculas. Isso significa que `minhaVariavel`, `MinhaVariavel` e `minhavariavel` são consideradas três variáveis diferentes.
*   **Espaços em Branco:** Espaços, tabulações e novas linhas (espaços em branco) são geralmente ignorados pelo interpretador, exceto quando fazem parte de strings ou separam elementos da sintaxe. Eles são usados principalmente para melhorar a legibilidade do código.
*   **Blocos de Código:** Instruções podem ser agrupadas em blocos de código usando chaves `{}`. Blocos são usados em estruturas de controle (como `if`, `for`) e na definição de funções e objetos.
    ```javascript
    if (condicao) {
      // Bloco de código executado se a condição for verdadeira
      console.log("Dentro do bloco if.");
      let outraVariavel = true; // Variável com escopo de bloco
    }
    ```
*   **Comentários:** São trechos de texto no código que são ignorados pelo interpretador. Eles são usados para explicar o código, deixar notas ou desabilitar temporariamente partes do código.
    *   **Comentário de Linha Única:** Começa com `//`. Tudo após `//` na mesma linha é ignorado.
        ```javascript
        // Isto é um comentário de linha única
        let x = 5; // Atribui 5 à variável x
        ```
    *   **Comentário de Múltiplas Linhas:** Começa com `/*` e termina com `*/`. Todo o texto entre eles é ignorado, mesmo que abranja várias linhas.
        ```javascript
        /*
        Isto é um comentário
        que ocupa
        múltiplas linhas.
        */
        let y = 10;
        ```

#### Variáveis (var, let, const) e Escopo

Variáveis são como contêineres usados para armazenar dados que podem ser referenciados e manipulados posteriormente no código. Em JavaScript, declaramos variáveis usando as palavras-chave `var`, `let` ou `const`.

*   **`var`:** Era a única forma de declarar variáveis nas versões mais antigas do JavaScript (antes do ES6/2015). Variáveis declaradas com `var` têm **escopo de função** ou **escopo global**. Elas também sofrem de *hoisting*, o que significa que a declaração da variável é "movida" para o topo do seu escopo durante a fase de compilação, mas a inicialização não. O uso de `var` é geralmente **desencorajado** no código moderno devido a comportamentos que podem levar a erros sutis, como a redeclaração da mesma variável no mesmo escopo e o escopo de função em vez de bloco.
    ```javascript
    function exemploVar() {
      if (true) {
        var contador = 10;
      }
      console.log(contador); // Acessível aqui (10), pois var tem escopo de função
    }
    exemploVar();
    // console.log(contador); // Erro! contador não está definido globalmente
    ```
*   **`let`:** Introduzida no ES6, `let` permite declarar variáveis com **escopo de bloco** (`{}`). Isso significa que a variável só existe dentro do bloco de código onde foi declarada (por exemplo, dentro de um `if`, `for` ou mesmo um bloco avulso `{}`). Variáveis `let` também sofrem hoisting, mas não podem ser acessadas antes de sua declaração (isso é chamado de Temporal Dead Zone - TDZ). Elas podem ter seu valor reatribuído, mas não podem ser redeclaradas no mesmo escopo.
    ```javascript
    function exemploLet() {
      let a = 5;
      if (true) {
        let b = 15; // Escopo de bloco
        console.log(a); // Acessível (5)
        console.log(b); // Acessível (15)
        a = 6; // Reatribuição permitida
        // let a = 7; // Erro! Redeclaração não permitida no mesmo escopo
      }
      console.log(a); // Acessível (6)
      // console.log(b); // Erro! b não está definido neste escopo
    }
    exemploLet();
    ```
*   **`const`:** Também introduzida no ES6, `const` é usada para declarar variáveis cujo valor **não pode ser reatribuído** após a inicialização. Assim como `let`, `const` tem **escopo de bloco** e está sujeita à TDZ. É importante notar que `const` significa que a *referência* à variável é constante, não necessariamente o *valor* em si. Se a variável `const` armazena um objeto ou array, as propriedades do objeto ou os elementos do array ainda podem ser modificados.
    ```javascript
    const PI = 3.14159;
    // PI = 3.14; // Erro! Reatribuição não permitida para const

    const pessoa = {
      nome: "Ana",
      idade: 30
    };
    pessoa.idade = 31; // Permitido! Modificando propriedade do objeto
    console.log(pessoa);

    // const TAXA; // Erro! const deve ser inicializada na declaração
    ```

**Recomendação:** Use `const` por padrão para todas as suas variáveis. Se você sabe que precisará reatribuir o valor da variável mais tarde, use `let`. Evite usar `var` em código novo.

**Escopo (Scope):** O escopo determina a acessibilidade (visibilidade) das variáveis. JavaScript tem principalmente dois tipos de escopo no código moderno:

*   **Escopo Global:** Variáveis declaradas fora de qualquer função ou bloco têm escopo global. Elas são acessíveis de qualquer lugar no seu código JavaScript.
*   **Escopo Local:**
    *   **Escopo de Função:** Variáveis declaradas com `var` dentro de uma função são acessíveis apenas dentro dessa função.
    *   **Escopo de Bloco:** Variáveis declaradas com `let` ou `const` dentro de um bloco (`{}`) são acessíveis apenas dentro desse bloco.

Entender o escopo é fundamental para evitar conflitos de nomes e gerenciar o ciclo de vida das suas variáveis.

#### Tipos de Dados Primitivos e Objetos

JavaScript é uma linguagem de tipagem dinâmica, o que significa que você não precisa declarar o tipo de uma variável ao criá-la. O tipo é determinado automaticamente com base no valor atribuído. Os tipos de dados em JavaScript são divididos em duas categorias principais: Primitivos e Objetos.

**Tipos de Dados Primitivos:** São imutáveis (seus valores não podem ser alterados diretamente após a criação).

1.  **`string`:** Representa sequências de caracteres (texto). Strings são delimitadas por aspas simples (`' '`), aspas duplas (`" "`) ou crases (`` ` `` - template literals).
    ```javascript
    let nome = "João";
    let saudacao = 'Olá, mundo!';
    let frase = `Meu nome é ${nome}.`; // Template literal com interpolação
    ```
2.  **`number`:** Representa números, tanto inteiros quanto de ponto flutuante (decimais). Inclui também valores especiais como `Infinity`, `-Infinity` e `NaN` (Not a Number).
    ```javascript
    let idade = 25;
    let preco = 99.90;
    let resultado = 10 / 0; // Infinity
    let invalido = "texto" * 2; // NaN
    ```
3.  **`boolean`:** Representa um valor lógico: `true` (verdadeiro) ou `false` (falso). Usado extensivamente em operações condicionais.
    ```javascript
    let ativo = true;
    let maiorDeIdade = false;
    ```
4.  **`undefined`:** Representa uma variável que foi declarada, mas ainda não teve um valor atribuído. É também o valor retornado por funções que não retornam explicitamente nada.
    ```javascript
    let variavelNaoDefinida;
    console.log(variavelNaoDefinida); // undefined
    ```
5.  **`null`:** Representa a ausência intencional de qualquer valor de objeto. É um valor que você, como programador, atribui explicitamente para indicar "nenhum valor" ou "vazio".
    ```javascript
    let objetoVazio = null;
    ```
6.  **`symbol`:** (ES6) Representa um identificador único e imutável, frequentemente usado como chave de propriedade em objetos para evitar colisões de nomes.
    ```javascript
    const idUnico = Symbol('descricao');
    ```
7.  **`bigint`:** (ES2020) Representa números inteiros de precisão arbitrária, maiores do que o limite seguro para o tipo `number`.
    ```javascript
    const numeroMuitoGrande = 1234567890123456789012345678901234567890n; // Note o 'n' no final
    ```

**Tipo de Dado Objeto:**

*   **`object`:** Representa uma coleção de dados e/ou funcionalidades. Objetos são mutáveis e armazenam pares de chave-valor (propriedades). Quase tudo em JavaScript que não é um tipo primitivo é um objeto, incluindo:
    *   **Objetos Literais:** `{ chave: valor, outraChave: outroValor }`
    *   **Arrays:** `[1, 2, 3, "texto"]` (Arrays são um tipo especial de objeto)
    *   **Funções:** (Funções também são objetos em JavaScript)
    *   **Datas:** `new Date()`
    *   **Expressões Regulares:** `/padrão/`
    *   E muitos outros...

Você pode verificar o tipo de uma variável usando o operador `typeof`:

```javascript
console.log(typeof "Olá");      // "string"
console.log(typeof 100);       // "number"
console.log(typeof true);      // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null);      // "object" (Este é um bug histórico do JavaScript!)
console.log(typeof {a: 1});    // "object"
console.log(typeof [1, 2]);    // "object"
console.log(typeof function(){}); // "function" (Embora funções sejam objetos, typeof tem um retorno especial para elas)
console.log(typeof Symbol('id')); // "symbol"
console.log(typeof 100n);      // "bigint"
```

#### Operadores

Operadores são símbolos especiais usados para realizar operações em valores (operandos).

*   **Operadores Aritméticos:** Realizam operações matemáticas.
    *   `+` (Adição): `5 + 3` -> `8`. Também usado para concatenação de strings: `"Olá" + " " + "Mundo"` -> `"Olá Mundo"`.
    *   `-` (Subtração): `5 - 3` -> `2`.
    *   `*` (Multiplicação): `5 * 3` -> `15`.
    *   `/` (Divisão): `10 / 2` -> `5`.
    *   `%` (Módulo/Resto da Divisão): `10 % 3` -> `1`.
    *   `**` (Exponenciação - ES7): `2 ** 3` -> `8`.
    *   `++` (Incremento): `let i = 5; i++;` (i agora é 6). Pode ser pré-fixado (`++i`) ou pós-fixado (`i++`).
    *   `--` (Decremento): `let j = 5; j--;` (j agora é 4). Pode ser pré-fixado (`--j`) ou pós-fixado (`j--`).
*   **Operadores de Atribuição:** Atribuem valores a variáveis.
    *   `=` (Atribuição Simples): `let x = 10;`
    *   `+=`, `-=`, `*=`, `/=`, `%=`, `**=` (Atribuição Composta): `x += 5;` é o mesmo que `x = x + 5;`.
*   **Operadores de Comparação:** Comparam dois valores e retornam um booleano (`true` ou `false`).
    *   `==` (Igualdade Abstrata): Compara valores após tentar convertê-los para um tipo comum (coerção de tipo). **Evite usar!** `5 == "5"` -> `true`.
    *   `!=` (Diferença Abstrata): `5 != "5"` -> `false`.
    *   `===` (Igualdade Estrita): Compara valores **e** tipos, sem coerção. **Prefira este!** `5 === "5"` -> `false`; `5 === 5` -> `true`.
    *   `!==` (Diferença Estrita): `5 !== "5"` -> `true`; `5 !== 5` -> `false`.
    *   `>` (Maior que): `10 > 5` -> `true`.
    *   `<` (Menor que): `10 < 5` -> `false`.
    *   `>=` (Maior ou igual a): `10 >= 10` -> `true`.
    *   `<=` (Menor ou igual a): `10 <= 5` -> `false`.
*   **Operadores Lógicos:** Combinam expressões booleanas.
    *   `&&` (E Lógico - AND): Retorna `true` se **ambos** os operandos forem verdadeiros. `(5 > 3) && (10 < 20)` -> `true`.
    *   `||` (OU Lógico - OR): Retorna `true` se **pelo menos um** dos operandos for verdadeiro. `(5 < 3) || (10 < 20)` -> `true`.
    *   `!` (NÃO Lógico - NOT): Inverte o valor booleano do operando. `!(5 > 3)` -> `false`.
    *   **Avaliação de Curto-Circuito:** Operadores `&&` e `||` usam curto-circuito. Se o resultado puder ser determinado apenas pelo primeiro operando, o segundo não é avaliado. (Ex: em `false && expressao()`, `expressao()` nunca é chamada).
*   **Operador Ternário (Condicional):** Um atalho para uma instrução `if/else` simples.
    *   `condicao ? valorSeVerdadeiro : valorSeFalso`
    ```javascript
    let idade = 18;
    let status = (idade >= 18) ? "Adulto" : "Menor"; // status será "Adulto"
    ```
*   **Outros Operadores:** `typeof`, `instanceof`, `delete`, `in`, `new`, etc. (serão vistos em contextos específicos).

#### Conversão de Tipos (Type Coercion)

JavaScript frequentemente tenta converter valores de um tipo para outro automaticamente em certas operações. Isso é chamado de coerção de tipo (type coercion).

*   **Coerção Implícita:** Ocorre automaticamente pelo JavaScript.
    ```javascript
    console.log("5" + 3); // "53" (Número 3 é convertido para string e concatenado)
    console.log("5" - 3); // 2 (String "5" é convertida para número para a subtração)
    console.log("5" * 3); // 15 (String "5" é convertida para número)
    console.log(5 + null); // 5 (null é convertido para 0)
    console.log(5 + true); // 6 (true é convertido para 1)
    console.log(5 + false); // 5 (false é convertido para 0)
    console.log(5 + undefined); // NaN (undefined convertido para número resulta em NaN)

    if ("0") { // "0" é uma string não vazia, considerada "truthy"
      console.log("String '0' é truthy");
    }
    if (0) { // 0 é considerado "falsy"
      // Este bloco não executa
    } else {
      console.log("Número 0 é falsy");
    }
    ```
    Valores considerados **falsy** em contextos booleanos: `false`, `0`, `""` (string vazia), `null`, `undefined`, `NaN`. Todos os outros valores são **truthy**.
*   **Coerção Explícita:** Quando você converte manualmente um tipo para outro usando funções como `Number()`, `String()`, `Boolean()`.
    ```javascript
    let strNumero = "123";
    let numero = Number(strNumero); // numero agora é 123 (tipo number)

    let valor = 0;
    let booleano = Boolean(valor); // booleano agora é false

    let num = 42;
    let str = String(num); // str agora é "42" (tipo string)
    ```

Embora a coerção implícita possa parecer conveniente, ela pode levar a resultados inesperados. É geralmente melhor ser explícito sobre as conversões de tipo e usar operadores de comparação estrita (`===`, `!==`) para evitar problemas relacionados à coerção.

#### Estruturas de Controle: Condicionais (if/else, switch)

Estruturas condicionais permitem que seu programa tome decisões e execute diferentes blocos de código com base em condições específicas.

*   **`if`:** Executa um bloco de código se uma condição for verdadeira (`truthy`).
    ```javascript
    let temperatura = 25;
    if (temperatura > 30) {
      console.log("Está muito quente!");
    }
    ```
*   **`if...else`:** Executa um bloco se a condição for verdadeira, e outro bloco se for falsa (`falsy`).
    ```javascript
    let nota = 7.5;
    if (nota >= 7.0) {
      console.log("Aprovado!");
    } else {
      console.log("Reprovado.");
    }
    ```
*   **`if...else if...else`:** Permite testar múltiplas condições em sequência.
    ```javascript
    let hora = 14;
    if (hora < 12) {
      console.log("Bom dia!");
    } else if (hora < 18) {
      console.log("Boa tarde!");
    } else {
      console.log("Boa noite!");
    }
    ```
*   **`switch`:** Uma alternativa ao `if...else if...else` para comparar uma expressão com múltiplos valores constantes (cases).
    ```javascript
    let diaSemana = 3; // 1=Domingo, 2=Segunda, ...
    let nomeDia;

    switch (diaSemana) {
      case 1:
        nomeDia = "Domingo";
        break; // Importante! Sai do switch
      case 2:
        nomeDia = "Segunda-feira";
        break;
      case 3:
        nomeDia = "Terça-feira";
        break;
      case 4:
        nomeDia = "Quarta-feira";
        break;
      case 5:
        nomeDia = "Quinta-feira";
        break;
      case 6:
        nomeDia = "Sexta-feira";
        break;
      case 7:
        nomeDia = "Sábado";
        break;
      default: // Opcional: executado se nenhum case corresponder
        nomeDia = "Dia inválido";
    }
    console.log(`Hoje é ${nomeDia}.`); // Hoje é Terça-feira.
    ```
    **Atenção:** Sem a instrução `break` ao final de cada `case`, a execução continuará ("fall through") para os próximos `case`s, o que geralmente não é o desejado.

#### Estruturas de Controle: Laços de Repetição (for, while, do...while, for...in, for...of)

Laços (ou loops) permitem executar um bloco de código repetidamente enquanto uma condição for atendida ou para iterar sobre coleções de dados.

*   **`for`:** O laço mais comum, ideal quando você sabe quantas vezes quer repetir.
    *   Sintaxe: `for (inicializacao; condicao; expressaoFinal)`
    ```javascript
    // Imprime números de 0 a 4
    for (let i = 0; i < 5; i++) {
      console.log(`O valor de i é: ${i}`);
    }
    ```
    *   `inicializacao`: Executada uma vez antes do início do loop (geralmente inicializa um contador).
    *   `condicao`: Avaliada antes de cada iteração. Se for `true`, o bloco de código executa. Se for `false`, o loop termina.
    *   `expressaoFinal`: Executada ao final de cada iteração (geralmente incrementa/decrementa o contador).
*   **`while`:** Executa um bloco de código enquanto uma condição for verdadeira. A condição é verificada *antes* de cada iteração.
    ```javascript
    let contador = 0;
    while (contador < 3) {
      console.log(`Contador (while): ${contador}`);
      contador++;
    }
    ```
*   **`do...while`:** Similar ao `while`, mas a condição é verificada *depois* da execução do bloco. Isso garante que o bloco de código seja executado pelo menos uma vez, mesmo que a condição seja inicialmente falsa.
    ```javascript
    let tentativas = 0;
    do {
      console.log(`Tentativa ${tentativas + 1}`);
      // Simula uma operação que pode falhar
      tentativas++;
    } while (tentativas < 1 && Math.random() > 0.1); // Exemplo: tenta de novo se falhar e tentativas < 1
    ```
*   **`for...in`:** Itera sobre as **propriedades enumeráveis** de um objeto. Retorna as *chaves* (nomes das propriedades).
    ```javascript
    const carro = {
      marca: "Toyota",
      modelo: "Corolla",
      ano: 2022
    };

    for (let chave in carro) {
      console.log(`${chave}: ${carro[chave]}`); // Acessa o valor usando a chave
    }
    // Saída:
    // marca: Toyota
    // modelo: Corolla
    // ano: 2022
    ```
    **Cuidado:** Não é recomendado usar `for...in` para iterar sobre Arrays, pois ele pode iterar sobre propriedades inesperadas (incluindo as do protótipo) e a ordem não é garantida.
*   **`for...of`:** (ES6) Itera sobre os **valores** de objetos *iteráveis* (como Arrays, Strings, Maps, Sets, etc.). É a forma preferida para iterar sobre arrays e strings.
    ```javascript
    const cores = ["vermelho", "verde", "azul"];
    for (let cor of cores) {
      console.log(`Cor: ${cor}`);
    }
    // Saída:
    // Cor: vermelho
    // Cor: verde
    // Cor: azul

    const texto = "Olá";
    for (let caractere of texto) {
      console.log(`Caractere: ${caractere}`);
    }
    // Saída:
    // Caractere: O
    // Caractere: l
    // Caractere: á
    ```
*   **`break` e `continue`:**
    *   `break`: Interrompe imediatamente a execução do laço atual (for, while, do...while, switch).
    *   `continue`: Pula a iteração atual do laço e continua para a próxima iteração.
    ```javascript
    for (let i = 0; i < 10; i++) {
      if (i === 3) {
        continue; // Pula a iteração quando i é 3
      }
      if (i === 7) {
        break; // Sai do loop quando i é 7
      }
      console.log(`Número: ${i}`);
    }
    // Saída: 0, 1, 2, 4, 5, 6
    ```

#### Exercícios Práticos: Fundamentos

1.  **Calculadora Simples:** Declare duas variáveis `numero1` e `numero2` com valores numéricos. Calcule e imprima no console a soma, subtração, multiplicação e divisão desses números.
2.  **Verificador de Idade:** Declare uma variável `idade`. Use `if/else` para verificar se a idade é maior ou igual a 18. Imprima "Maior de idade" ou "Menor de idade" no console.
3.  **Tabuada:** Use um laço `for` para imprimir a tabuada de um número (por exemplo, 7) de 1 a 10 no formato "7 x 1 = 7", "7 x 2 = 14", etc.
4.  **Iterando sobre Array:** Crie um array `frutas` com alguns nomes de frutas. Use um laço `for...of` para imprimir cada fruta no console.
5.  **Propriedades de Objeto:** Crie um objeto `livro` com propriedades `titulo`, `autor` e `anoPublicacao`. Use um laço `for...in` para imprimir cada propriedade e seu valor no console.

Estes fundamentos são a espinha dorsal do JavaScript. Certifique-se de compreendê-los bem e pratique os exercícios. Nas próximas seções, construiremos sobre esta base para explorar funções, objetos, arrays e a interação com o navegador.


### Funções

Funções são um dos conceitos mais fundamentais e poderosos em JavaScript (e na programação em geral). Elas permitem agrupar um bloco de código que realiza uma tarefa específica e reutilizá-lo sempre que necessário, tornando o código mais organizado, legível e fácil de manter. Em JavaScript, as funções são consideradas "cidadãs de primeira classe", o que significa que podem ser tratadas como qualquer outro valor: podem ser atribuídas a variáveis, passadas como argumentos para outras funções e retornadas por outras funções.

#### Declaração vs Expressão de Função

Existem duas maneiras principais de criar funções em JavaScript:

1.  **Declaração de Função (Function Declaration / Function Statement):**
    Esta é a forma mais tradicional. Usa-se a palavra-chave `function`, seguida pelo nome da função, uma lista de parâmetros entre parênteses `()` e o bloco de código da função entre chaves `{}`.
    ```javascript
    // Declaração de função
    function saudar(nome) {
      console.log(`Olá, ${nome}!`);
    }

    // Chamando (invocando) a função
    saudar("Maria"); // Saída: Olá, Maria!
    ```
    Uma característica importante das declarações de função é o *hoisting*. Assim como as variáveis `var`, as declarações de função são "movidas" para o topo do seu escopo durante a compilação. Isso significa que você pode chamar uma função declarada *antes* de sua definição no código.
    ```javascript
    cumprimentar("Carlos"); // Funciona devido ao hoisting

    function cumprimentar(pessoa) {
      console.log(`Bom dia, ${pessoa}!`);
    }
    ```

2.  **Expressão de Função (Function Expression):**
    Nesta forma, uma função é criada e atribuída a uma variável. A função em si pode ser nomeada (expressão de função nomeada) ou, mais comumente, anônima (sem nome).
    ```javascript
    // Expressão de função (anônima)
    const calcularQuadrado = function(numero) {
      return numero * numero;
    };

    // Chamando a função através da variável
    let resultado = calcularQuadrado(5);
    console.log(resultado); // Saída: 25

    // Expressão de função (nomeada) - o nome 'soma' é útil para depuração
    const adicionar = function soma(a, b) {
      return a + b;
    };
    console.log(adicionar(3, 4)); // Saída: 7
    // console.log(soma(1, 2)); // Erro! O nome 'soma' geralmente só é acessível dentro da própria função
    ```
    Diferentemente das declarações, as expressões de função **não** sofrem hoisting da mesma forma. Se você usar `let` ou `const` (o recomendado), a variável que armazena a função sofre hoisting, mas fica na Temporal Dead Zone (TDZ) até a linha da atribuição. Se usar `var`, a variável é içada com valor `undefined`. Portanto, você **não pode** chamar uma função definida por expressão antes de sua definição no código.
    ```javascript
    // tentarChamar(); // Erro! Cannot access 'tentarChamar' before initialization (se usar let/const)
                     // ou TypeError: tentarChamar is not a function (se usar var)

    const tentarChamar = function() {
      console.log("Funcionou!");
    };

    tentarChamar(); // Funciona
    ```

**Qual usar?** Ambas as formas são válidas. Declarações são talvez mais simples para iniciantes e o hoisting pode ser conveniente (ou perigoso, dependendo do caso). Expressões de função, especialmente com `const`, oferecem um controle mais claro sobre o escopo e quando a função está disponível, além de serem a base para conceitos como Arrow Functions.

#### Arrow Functions (=>)

Introduzidas no ES6, as Arrow Functions oferecem uma sintaxe mais concisa para escrever expressões de função, especialmente útil para funções curtas e callbacks. Elas também têm um comportamento diferente em relação à palavra-chave `this`, que veremos mais adiante.

Sintaxe básica:

*   Com múltiplos parâmetros e múltiplas instruções:
    ```javascript
    const multiplicar = (a, b) => {
      console.log(`Multiplicando ${a} por ${b}`);
      return a * b;
    };
    console.log(multiplicar(4, 5)); // Saída: Multiplicando 4 por 5 
                                   //         20
    ```
*   Com um único parâmetro (parênteses opcionais):
    ```javascript
    const dobrar = numero => {
      return numero * 2;
    };
    // Ou: const dobrar = (numero) => { return numero * 2; };
    console.log(dobrar(10)); // Saída: 20
    ```
*   Sem parâmetros (parênteses obrigatórios):
    ```javascript
    const dizerOi = () => {
      console.log("Oi!");
    };
    dizerOi(); // Saída: Oi!
    ```
*   Com uma única expressão de retorno (retorno implícito, sem `{}` e `return`):
    ```javascript
    // Forma longa:
    // const somar = (x, y) => { return x + y; };

    // Forma curta com retorno implícito:
    const somar = (x, y) => x + y;
    console.log(somar(7, 8)); // Saída: 15

    // Retornando um objeto literal (precisa envolver em parênteses):
    const criarPessoa = (nome, idade) => ({ nome: nome, idade: idade });
    console.log(criarPessoa("Bia", 22)); // Saída: { nome: 'Bia', idade: 22 }
    ```

Arrow functions são sempre anônimas por natureza (elas não têm um nome próprio como nas declarações `function nome() {}`). Elas são atribuídas a variáveis ou usadas diretamente onde uma expressão de função é esperada (como em callbacks de métodos de array).

#### Parâmetros e Argumentos (Default, Rest)

*   **Parâmetros:** São os nomes listados na definição da função (entre parênteses). Eles atuam como variáveis locais dentro da função, recebendo os valores passados quando a função é chamada.
*   **Argumentos:** São os valores reais passados para a função quando ela é invocada (chamada).

```javascript
function exibirInfo(usuario, idade) { // usuario e idade são parâmetros
  console.log(`Usuário: ${usuario}, Idade: ${idade}`);
}

exibirInfo("Ana", 30); // "Ana" e 30 são argumentos
```

*   **Parâmetros Padrão (Default Parameters - ES6):** Permitem definir um valor padrão para um parâmetro caso nenhum argumento seja fornecido para ele ou se o argumento for `undefined`.
    ```javascript
    function registrar(nome, pais = "Brasil") { // pais tem valor padrão "Brasil"
      console.log(`${nome} registrado(a) no ${pais}.`);
    }

    registrar("Fernanda"); // Saída: Fernanda registrado(a) no Brasil.
    registrar("John", "EUA"); // Saída: John registrado(a) no EUA.
    registrar("Ricardo", undefined); // Saída: Ricardo registrado(a) no Brasil.
    registrar("Sofia", null); // Saída: Sofia registrado(a) no null. (null é um valor explícito, não usa o padrão)
    ```
*   **Parâmetros Rest (Rest Parameters - ES6):** Permitem representar um número indefinido de argumentos como um array. Usa-se a sintaxe de três pontos (`...`) antes do nome do último parâmetro.
    ```javascript
    function somarTodos(...numeros) { // numeros será um array com todos os argumentos passados
      let total = 0;
      for (let num of numeros) {
        total += num;
      }
      return total;
    }

    console.log(somarTodos(1, 2, 3)); // Saída: 6
    console.log(somarTodos(10, 20, 30, 40, 50)); // Saída: 150
    console.log(somarTodos(5)); // Saída: 5
    console.log(somarTodos()); // Saída: 0
    ```
    Uma função pode ter apenas um parâmetro rest, e ele deve ser o último parâmetro na lista.

#### Retorno de Funções

Funções podem (e frequentemente devem) produzir um resultado. A instrução `return` é usada para especificar o valor que a função deve retornar para o local onde foi chamada. Quando uma instrução `return` é executada, a função para imediatamente sua execução.

```javascript
function calcularAreaRetangulo(largura, altura) {
  if (largura <= 0 || altura <= 0) {
    return "Dimensões inválidas"; // Retorna uma string de erro
  }
  const area = largura * altura;
  return area; // Retorna o valor calculado
  // Qualquer código após o return não será executado
  // console.log("Isso não será impresso");
}

let areaCalculada = calcularAreaRetangulo(10, 5);
console.log(`A área é: ${areaCalculada}`); // Saída: A área é: 50

let areaInvalida = calcularAreaRetangulo(-5, 10);
console.log(areaInvalida); // Saída: Dimensões inválidas
```

Se uma função não tiver uma instrução `return` explícita, ou se tiver um `return;` sem um valor, ela retorna `undefined` por padrão.

```javascript
function semRetornoExplicito() {
  console.log("Executando...");
  // Nenhum return
}

let resultadoSemRetorno = semRetornoExplicito(); // Saída: Executando...
console.log(resultadoSemRetorno); // Saída: undefined
```

#### Escopo de Função e Closures

Já mencionamos o escopo ao falar de variáveis. Funções criam seu próprio escopo local. Variáveis declaradas dentro de uma função (com `let`, `const` ou `var`) não são acessíveis fora dela.

```javascript
function minhaFuncao() {
  const mensagemLocal = "Estou dentro da função";
  console.log(mensagemLocal);
}

minhaFuncao(); // Saída: Estou dentro da função
// console.log(mensagemLocal); // Erro! mensagemLocal is not defined
```

Funções aninhadas (funções dentro de outras funções) têm acesso às variáveis de suas funções externas (pai). Esse fenômeno, combinado com o fato de que a função interna "lembra" do ambiente (escopo) onde foi criada mesmo depois que a função externa terminou de executar, é chamado de **Closure**.

Closures são um conceito poderoso e fundamental em JavaScript, permitindo criar funções com estado privado e outras técnicas avançadas.

```javascript
function criarContador() {
  let contagem = 0; // Variável no escopo da função externa (pai)

  // A função interna 'incrementar' forma uma closure com o escopo de 'criarContador'
  function incrementar() {
    contagem++; // Acessa e modifica a variável 'contagem' do escopo externo
    console.log(`Contagem atual: ${contagem}`);
  }

  return incrementar; // Retorna a função interna
}

// contador1 e contador2 são funções independentes, cada uma com sua própria 'contagem'
const contador1 = criarContador();
const contador2 = criarContador();

contador1(); // Saída: Contagem atual: 1
contador1(); // Saída: Contagem atual: 2

contador2(); // Saída: Contagem atual: 1
contador1(); // Saída: Contagem atual: 3
```

No exemplo acima, `criarContador` retorna a função `incrementar`. Cada vez que `criarContador` é chamada, uma nova `contagem` e uma nova função `incrementar` são criadas. A função `incrementar` retornada "lembra" da sua própria variável `contagem` graças à closure.

#### Funções de Alta Ordem (Higher-Order Functions)

Como funções são cidadãs de primeira classe, podemos ter funções que operam sobre outras funções. Uma **Função de Alta Ordem** é definida como uma função que:

1.  Aceita uma ou mais funções como argumentos (callbacks).
    **E/OU**
2.  Retorna uma função como resultado.

Já vimos exemplos disso! `criarContador` é uma função de alta ordem porque retorna outra função. Métodos de array como `map`, `filter`, `reduce` (que veremos em breve) também são funções de alta ordem porque aceitam uma função (callback) como argumento para processar os elementos do array.

```javascript
// Exemplo: Função de alta ordem que aceita um callback
function processarArray(array, acao) { // 'acao' é um parâmetro que espera uma função (callback)
  const resultado = [];
  for (const item of array) {
    resultado.push(acao(item)); // Chama a função 'acao' para cada item
  }
  return resultado;
}

const numeros = [1, 2, 3, 4];

// Passando uma função (arrow function) como callback para dobrar os números
const dobrados = processarArray(numeros, numero => numero * 2);
console.log(dobrados); // Saída: [ 2, 4, 6, 8 ]

// Passando outra função como callback para transformar em string
const strings = processarArray(numeros, numero => `Num: ${numero}`);
console.log(strings); // Saída: [ 'Num: 1', 'Num: 2', 'Num: 3', 'Num: 4' ]
```

Funções de alta ordem são um pilar da programação funcional em JavaScript e permitem escrever código mais abstrato, reutilizável e expressivo.

#### Exercícios Práticos: Funções

1.  **Verificador de Par/Ímpar:** Escreva uma função chamada `verificarParImpar` que aceite um número como argumento. A função deve retornar a string "Par" se o número for par e "Ímpar" se for ímpar. Teste a função com diferentes números.
2.  **Calculadora com Arrow Function:** Crie uma arrow function chamada `calcular` que aceite três argumentos: `operacao` (string: "soma", "subtracao", "multiplicacao", "divisao") e dois números `num1`, `num2`. A função deve retornar o resultado da operação correspondente. Use `if/else` ou `switch` dentro da função.
3.  **Mensagem Personalizada:** Crie uma função `criarMensagem` que aceite um nome e retorne uma *nova função*. Essa nova função retornada deve aceitar uma saudação (ex: "Bom dia", "Boa noite") e retornar a string completa (ex: "Bom dia, [nome]!"). Teste criando mensagens para diferentes nomes e saudações (demonstrando closure).
4.  **Aplicar Callback:** Escreva uma função de alta ordem chamada `operarSobreNumeros` que aceite um array de números e uma função de callback. A função `operarSobreNumeros` deve aplicar a função de callback a cada número do array e retornar um novo array com os resultados. Teste-a passando um array e um callback que, por exemplo, calcule o cubo de cada número.

As funções são essenciais para estruturar seu código. Pratique criar e usar diferentes tipos de funções, entenda o escopo, o retorno e o poder das closures e funções de alta ordem. No próximo capítulo, exploraremos outra estrutura fundamental: Objetos e Arrays.


### Objetos e Arrays

Depois de dominar os fundamentos e as funções, o próximo passo essencial em JavaScript é entender como trabalhar com coleções de dados. As duas estruturas de dados mais fundamentais para isso são os Objetos e os Arrays.

**Objetos** são usados para agrupar dados relacionados e funcionalidades. Pense neles como entidades do mundo real (um carro, uma pessoa, um produto) que possuem características (propriedades) e podem realizar ações (métodos). Objetos em JavaScript são coleções dinâmicas de pares chave-valor.

**Arrays** são usados para armazenar listas ordenadas de valores. Pense neles como uma prateleira onde você pode guardar vários itens (números, strings, outros objetos, etc.) em sequência, acessando-os por sua posição (índice).

#### Criação e Manipulação de Objetos (Literais, Construtores)

Existem várias maneiras de criar objetos em JavaScript:

1.  **Objeto Literal:** Esta é a forma mais comum e concisa. Usa-se chaves `{}` para definir o objeto, com pares `chave: valor` separados por vírgulas. As chaves são geralmente strings (embora as aspas possam ser omitidas se a chave for um identificador JavaScript válido) e os valores podem ser de qualquer tipo de dado (primitivos, outros objetos, arrays, funções).
    ```javascript
    const pessoa = {
      nome: "Carlos Silva", // Chave 'nome', valor 'Carlos Silva' (string)
      idade: 35,           // Chave 'idade', valor 35 (number)
      profissao: "Engenheiro",
      ativo: true,         // Chave 'ativo', valor true (boolean)
      interesses: ["leitura", "ciclismo", "tecnologia"], // Valor é um array
      endereco: {          // Valor é outro objeto
        rua: "Rua das Flores",
        numero: 123,
        cidade: "São Paulo"
      },
      saudar: function() { // Chave 'saudar', valor é uma função (método)
        console.log(`Olá, meu nome é ${this.nome}!`); // 'this' se refere ao próprio objeto 'pessoa'
      },
      // Método com sintaxe curta (ES6)
      descrever() {
        console.log(`${this.nome} tem ${this.idade} anos e é ${this.profissao}.`);
      }
    };

    // Acessando propriedades (dot notation e bracket notation)
    console.log(pessoa.nome); // Saída: Carlos Silva (Dot notation - preferível quando a chave é válida)
    console.log(pessoa["idade"]); // Saída: 35 (Bracket notation - necessária para chaves com espaços, hífens ou variáveis)
    let chave = "profissao";
    console.log(pessoa[chave]); // Saída: Engenheiro (Usando variável na bracket notation)

    // Acessando elementos do array e propriedades do objeto aninhado
    console.log(pessoa.interesses[1]); // Saída: ciclismo
    console.log(pessoa.endereco.cidade); // Saída: São Paulo

    // Chamando métodos
    pessoa.saudar(); // Saída: Olá, meu nome é Carlos Silva!
    pessoa.descrever(); // Saída: Carlos Silva tem 35 anos e é Engenheiro.

    // Modificando propriedades
    pessoa.idade = 36;
    pessoa["ativo"] = false;
    console.log(pessoa.idade); // Saída: 36

    // Adicionando novas propriedades
    pessoa.email = "carlos.silva@email.com";
    pessoa["telefone-celular"] = "(11) 99999-8888"; // Bracket notation necessária aqui
    console.log(pessoa.email);

    // Removendo propriedades
    delete pessoa.ativo;
    console.log(pessoa.ativo); // Saída: undefined
    ```

2.  **Construtor `Object()`:** Menos comum para objetos simples, mas existe.
    ```javascript
    const carro = new Object();
    carro.marca = "Fiat";
    carro.modelo = "Uno";
    carro.ano = 2010;
    carro.ligar = function() { console.log("Carro ligado."); };
    console.log(carro.modelo); // Saída: Uno
    ```

3.  **Funções Construtoras (Constructor Functions):** Uma maneira de criar "modelos" ou "plantas" para objetos. Por convenção, nomes de funções construtoras começam com letra maiúscula. Usa-se o operador `new` para criar instâncias (objetos) a partir da função construtora.
    ```javascript
    function Produto(nome, preco, estoque) {
      // 'this' se refere à nova instância que está sendo criada
      this.nome = nome;
      this.preco = preco;
      this.estoque = estoque;
      this.temEstoque = function() {
        return this.estoque > 0;
      };
    }

    const produto1 = new Produto("Laptop", 4500, 15);
    const produto2 = new Produto("Mouse", 120, 0);

    console.log(produto1.nome); // Saída: Laptop
    console.log(produto2.temEstoque()); // Saída: false
    console.log(produto1 instanceof Produto); // Saída: true
    ```
    (Veremos mais sobre `class` do ES6, que é uma sintaxe mais moderna para funções construtoras e protótipos, na seção de Programação Orientada a Objetos).

#### Propriedades e Métodos

Como vimos, objetos contêm:

*   **Propriedades:** Pares chave-valor que representam os atributos ou características do objeto (ex: `nome`, `idade`, `cor`). Os valores podem ser de qualquer tipo.
*   **Métodos:** Propriedades cujo valor é uma função. Métodos representam as ações ou comportamentos que o objeto pode realizar (ex: `saudar()`, `calcularArea()`, `ligar()`).

Dentro de um método, a palavra-chave `this` geralmente se refere ao próprio objeto ao qual o método pertence, permitindo acessar outras propriedades e métodos do mesmo objeto.

#### `this` em JavaScript

A palavra-chave `this` é uma das partes mais confusas do JavaScript para iniciantes, pois seu valor é determinado por como a função é chamada (o contexto de invocação), não onde a função é definida.

Regras gerais (simplificadas):

1.  **Método de Objeto:** Quando uma função é chamada como um método de um objeto (`objeto.metodo()`), `this` dentro do método se refere ao objeto à esquerda do ponto (`objeto`).
    ```javascript
    const calculadora = {
      valor: 0,
      somar(num) {
        this.valor += num; // 'this' é 'calculadora'
        console.log(this.valor);
      }
    };
    calculadora.somar(5); // Saída: 5 ('this' é calculadora)
    ```
2.  **Função Simples (Strict Mode):** Em *strict mode* (`'use strict';`), `this` em uma chamada de função normal (não como método) é `undefined`.
3.  **Função Simples (Non-Strict Mode):** Fora do *strict mode*, `this` em uma chamada de função normal geralmente se refere ao objeto global (`window` no navegador, `global` no Node.js). **Evite depender disso!** Use sempre `'use strict';`.
4.  **Funções Construtoras (`new`):** Quando uma função é chamada com `new`, `this` se refere à nova instância do objeto que está sendo criada.
5.  **Manipuladores de Eventos (DOM):** Em um manipulador de evento no DOM, `this` geralmente se refere ao elemento HTML que disparou o evento.
6.  **Arrow Functions:** Arrow functions (`=>`) **não** têm seu próprio `this`. Elas herdam o `this` do escopo léxico onde foram definidas (o escopo da função ou bloco pai). Isso as torna muito úteis em callbacks e métodos onde você quer preservar o `this` do contexto externo.
    ```javascript
    const meuObjeto = {
      id: 42,
      iniciarTemporizador: function() {
        console.log("this no iniciarTemporizador:", this); // 'this' é meuObjeto
        // Usando arrow function para o callback do setTimeout
        setTimeout(() => {
          // 'this' aqui é herdado de iniciarTemporizador, ou seja, 'meuObjeto'
          console.log("this dentro do setTimeout (arrow):", this);
          console.log(`Temporizador finalizado para ID: ${this.id}`);
        }, 1000);

        // Comparação: Se usássemos uma function normal (sem strict mode)
        // setTimeout(function() {
        //   console.log("this dentro do setTimeout (function):", this); // 'this' seria 'window' ou 'global'
        //   console.log(`Temporizador finalizado para ID: ${this.id}`); // Erro! 'this.id' seria undefined
        // }, 2000);
      }
    };
    meuObjeto.iniciarTemporizador();
    ```

Existem também métodos como `call()`, `apply()`, e `bind()` que permitem definir explicitamente o valor de `this` ao chamar uma função, mas isso é um tópico mais avançado.

#### Criação e Manipulação de Arrays

Arrays são coleções ordenadas de itens. Os itens podem ser de tipos diferentes.

1.  **Array Literal:** A forma mais comum de criar arrays, usando colchetes `[]`.
    ```javascript
    const numeros = [10, 20, 30, 40, 50];
    const nomes = ["Ana", "Bia", "Carlos"];
    const misto = [1, "texto", true, null, { id: 1 }];
    const vazio = [];
    ```
2.  **Construtor `Array()`:** Menos comum.
    ```javascript
    const arr1 = new Array(1, 2, 3);
    const arr2 = new Array(5); // Cria um array com 5 posições vazias (cuidado!)
    ```

**Acessando Elementos:** Arrays são indexados a partir de 0.
```javascript
console.log(nomes[0]); // Saída: Ana
console.log(nomes[2]); // Saída: Carlos
console.log(nomes[3]); // Saída: undefined (índice fora dos limites)
```

**Modificando Elementos:**
```javascript
nomes[1] = "Beatriz";
console.log(nomes); // Saída: [ 'Ana', 'Beatriz', 'Carlos' ]
```

**Propriedade `length`:** Retorna o número de elementos no array.
```javascript
console.log(numeros.length); // Saída: 5
```
`length` também pode ser usada para adicionar elementos vazios ou truncar o array (cuidado!).

**Adicionando e Removendo Elementos:**

*   `push()`: Adiciona um ou mais elementos ao **final** do array. Retorna o novo `length`.
    ```javascript
    nomes.push("Daniel");
    console.log(nomes); // Saída: [ 'Ana', 'Beatriz', 'Carlos', 'Daniel' ]
    ```
*   `pop()`: Remove o **último** elemento do array. Retorna o elemento removido.
    ```javascript
    let ultimoNome = nomes.pop();
    console.log(ultimoNome); // Saída: Daniel
    console.log(nomes); // Saída: [ 'Ana', 'Beatriz', 'Carlos' ]
    ```
*   `unshift()`: Adiciona um ou mais elementos ao **início** do array. Retorna o novo `length`.
    ```javascript
    nomes.unshift("Zelia");
    console.log(nomes); // Saída: [ 'Zelia', 'Ana', 'Beatriz', 'Carlos' ]
    ```
*   `shift()`: Remove o **primeiro** elemento do array. Retorna o elemento removido.
    ```javascript
    let primeiroNome = nomes.shift();
    console.log(primeiroNome); // Saída: Zelia
    console.log(nomes); // Saída: [ 'Ana', 'Beatriz', 'Carlos' ]
    ```
*   `splice()`: Método poderoso para adicionar, remover ou substituir elementos em qualquer posição. `array.splice(indiceInicio, quantidadeRemover, item1, item2, ...)`
    ```javascript
    const letras = ["a", "b", "c", "d", "e"];
    // Remover 2 elementos a partir do índice 1 ('b', 'c')
    let removidos = letras.splice(1, 2);
    console.log(letras); // Saída: [ 'a', 'd', 'e' ]
    console.log(removidos); // Saída: [ 'b', 'c' ]

    // Remover 1 elemento a partir do índice 2 ('e') e adicionar 'X', 'Y'
    letras.splice(2, 1, "X", "Y");
    console.log(letras); // Saída: [ 'a', 'd', 'X', 'Y' ]

    // Adicionar 'B' no índice 1 sem remover nada
    letras.splice(1, 0, "B");
    console.log(letras); // Saída: [ 'a', 'B', 'd', 'X', 'Y' ]
    ```
*   `slice()`: Retorna uma **cópia superficial** de uma porção do array em um novo array. Não modifica o array original. `array.slice(inicio, fim)` (fim não inclusivo).
    ```javascript
    const numerosOriginais = [10, 20, 30, 40, 50];
    const subArray = numerosOriginais.slice(1, 4); // Pega do índice 1 até o 3
    console.log(subArray); // Saída: [ 20, 30, 40 ]
    console.log(numerosOriginais); // Saída: [ 10, 20, 30, 40, 50 ] (inalterado)
    const copiaCompleta = numerosOriginais.slice(); // Copia o array todo
    ```
*   `concat()`: Combina dois ou mais arrays, retornando um novo array. Não modifica os originais.
    ```javascript
    const arrA = [1, 2];
    const arrB = [3, 4];
    const arrC = [5, 6];
    const combinado = arrA.concat(arrB, arrC, 7);
    console.log(combinado); // Saída: [ 1, 2, 3, 4, 5, 6, 7 ]
    ```

#### Métodos Úteis de Arrays (Iteração e Transformação)

JavaScript oferece métodos poderosos (e muitos são funções de alta ordem) para iterar e transformar arrays de forma declarativa e concisa:

*   `forEach()`: Executa uma função (callback) uma vez para cada elemento do array. Não retorna nada (retorna `undefined`). Ideal para executar um efeito colateral para cada item (ex: imprimir no console).
    ```javascript
    const cores = ["vermelho", "verde", "azul"];
    cores.forEach((cor, indice, arrayOriginal) => {
      console.log(`Índice ${indice}: ${cor}`);
      // console.log(arrayOriginal); // Acesso ao array original se necessário
    });
    // Saída:
    // Índice 0: vermelho
    // Índice 1: verde
    // Índice 2: azul
    ```
*   `map()`: Cria um **novo array** com os resultados da chamada de uma função (callback) para cada elemento do array original. Essencial para transformar dados.
    ```javascript
    const numerosBase = [1, 2, 3, 4];
    const quadrados = numerosBase.map(numero => numero * numero);
    console.log(quadrados); // Saída: [ 1, 4, 9, 16 ]
    console.log(numerosBase); // Saída: [ 1, 2, 3, 4 ] (inalterado)
    ```
*   `filter()`: Cria um **novo array** com todos os elementos que passaram no teste implementado pela função (callback). A callback deve retornar `true` para incluir o elemento ou `false` para excluí-lo.
    ```javascript
    const idades = [15, 22, 18, 30, 12];
    const maioresDeIdade = idades.filter(idade => idade >= 18);
    console.log(maioresDeIdade); // Saída: [ 22, 18, 30 ]
    ```
*   `reduce()`: Executa uma função (callback "redutora") sobre cada elemento do array, resultando em um **único valor de retorno**. Útil para somar valores, encontrar máximos/mínimos, agrupar dados, etc.
    *   Sintaxe: `array.reduce((acumulador, valorAtual, indice, arrayOriginal) => { /* lógica */ }, valorInicialDoAcumulador)`
    ```javascript
    const valores = [10, 5, 20, 15];
    // Somar todos os valores
    const somaTotal = valores.reduce((somaParcial, valor) => {
      console.log(`Soma Parcial: ${somaParcial}, Valor Atual: ${valor}`);
      return somaParcial + valor;
    }, 0); // 0 é o valor inicial do acumulador (somaParcial)
    console.log(`Soma Total: ${somaTotal}`); // Saída: Soma Total: 50

    // Encontrar o maior valor
    const maiorValor = valores.reduce((maiorAteAgora, valor) => {
      return valor > maiorAteAgora ? valor : maiorAteAgora;
    }); // Se o valor inicial não for fornecido, o primeiro elemento é usado
    console.log(`Maior Valor: ${maiorValor}`); // Saída: Maior Valor: 20
    ```
*   `find()`: Retorna o **valor do primeiro elemento** no array que satisfaz a função de teste fornecida. Caso contrário, retorna `undefined`.
    ```javascript
    const alunos = [{id: 1, nome: "Ana"}, {id: 2, nome: "Bia"}, {id: 3, nome: "Ana"}];
    const alunoBia = alunos.find(aluno => aluno.nome === "Bia");
    console.log(alunoBia); // Saída: { id: 2, nome: 'Bia' }
    const alunoPedro = alunos.find(aluno => aluno.nome === "Pedro");
    console.log(alunoPedro); // Saída: undefined
    ```
*   `findIndex()`: Retorna o **índice do primeiro elemento** no array que satisfaz a função de teste. Caso contrário, retorna `-1`.
    ```javascript
    const indiceBia = alunos.findIndex(aluno => aluno.nome === "Bia");
    console.log(indiceBia); // Saída: 1
    ```
*   `some()`: Testa se **pelo menos um** elemento no array passa no teste implementado pela função. Retorna `true` ou `false`.
    ```javascript
    const temNumeroPar = [1, 3, 5, 6, 7].some(num => num % 2 === 0);
    console.log(temNumeroPar); // Saída: true
    ```
*   `every()`: Testa se **todos** os elementos no array passam no teste implementado pela função. Retorna `true` ou `false`.
    ```javascript
    const todosPositivos = [1, 5, 6, -2].every(num => num > 0);
    console.log(todosPositivos); // Saída: false
    ```
*   `includes()`: Determina se um array contém um determinado elemento, retornando `true` ou `false`.
    ```javascript
    const frutas = ["maçã", "banana", "uva"];
    console.log(frutas.includes("banana")); // Saída: true
    console.log(frutas.includes("laranja")); // Saída: false
    ```
*   `join()`: Junta todos os elementos de um array em uma string, separados por um separador especificado (ou vírgula por padrão).
    ```javascript
    const partes = ["Olá", "mundo", "JavaScript"];
    const fraseCompleta = partes.join(" "); // Separador é espaço
    console.log(fraseCompleta); // Saída: Olá mundo JavaScript
    ```

#### Destructuring Assignment (Objetos e Arrays - ES6)

Destructuring (desestruturação) é uma sintaxe que permite extrair valores de arrays ou propriedades de objetos e atribuí-los a variáveis distintas de forma mais concisa.

*   **Desestruturação de Array:**
    ```javascript
    const coordenadas = [10, 20, 30];

    // Forma antiga
    // const x = coordenadas[0];
    // const y = coordenadas[1];

    // Com desestruturação
    const [x, y, z] = coordenadas;
    console.log(x); // Saída: 10
    console.log(y); // Saída: 20
    console.log(z); // Saída: 30

    // Ignorando elementos
    const [primeiro, , terceiro] = coordenadas;
    console.log(primeiro); // Saída: 10
    console.log(terceiro); // Saída: 30

    // Usando rest operator para pegar o resto
    const [a, ...resto] = coordenadas;
    console.log(a); // Saída: 10
    console.log(resto); // Saída: [ 20, 30 ]

    // Valores padrão
    const [p = 0, q = 0, r = 0, s = 0] = coordenadas;
    console.log(s); // Saída: 0 (valor padrão usado)
    ```
*   **Desestruturação de Objeto:**
    ```javascript
    const usuario = {
      id: 123,
      nomeUsuario: "devUser",
      info: {
        email: "dev@example.com",
        telefone: "12345"
      }
    };

    // Extraindo propriedades para variáveis com o mesmo nome
    const { id, nomeUsuario } = usuario;
    console.log(id); // Saída: 123
    console.log(nomeUsuario); // Saída: devUser

    // Extraindo e renomeando variáveis
    const { id: userID, nomeUsuario: login } = usuario;
    console.log(userID); // Saída: 123
    console.log(login); // Saída: devUser

    // Valores padrão
    const { id: uId, status = "ativo" } = usuario;
    console.log(uId); // Saída: 123
    console.log(status); // Saída: ativo (valor padrão)

    // Desestruturação aninhada
    const { info: { email, telefone } } = usuario;
    console.log(email); // Saída: dev@example.com
    console.log(telefone); // Saída: 12345

    // Desestruturação em parâmetros de função
    function exibirEmail({ info: { email } }) {
      console.log(`O email é: ${email}`);
    }
    exibirEmail(usuario); // Saída: O email é: dev@example.com
    ```

#### Spread Syntax (... - ES6)

O operador Spread (`...`) permite que um iterável (como um array ou string) seja expandido em locais onde zero ou mais argumentos (para chamadas de função) ou elementos (para literais de array) são esperados. Ele também pode ser usado para expandir objetos em literais de objeto (ES2018).

*   **Em Literais de Array:** Para combinar arrays ou criar cópias.
    ```javascript
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    const combinado = [...arr1, 0, ...arr2, 7];
    console.log(combinado); // Saída: [ 1, 2, 3, 0, 4, 5, 6, 7 ]

    const copiaArr1 = [...arr1]; // Cria uma cópia superficial
    copiaArr1.push(4);
    console.log(arr1); // Saída: [ 1, 2, 3 ] (original inalterado)
    console.log(copiaArr1); // Saída: [ 1, 2, 3, 4 ]
    ```
*   **Em Chamadas de Função:** Para passar elementos de um array como argumentos individuais.
    ```javascript
    const numerosParaSomar = [5, 10, 15];
    function somaTresNumeros(a, b, c) {
      return a + b + c;
    }
    // const resultadoSoma = somaTresNumeros(numerosParaSomar[0], numerosParaSomar[1], numerosParaSomar[2]); // Forma antiga
    const resultadoSoma = somaTresNumeros(...numerosParaSomar); // Usando spread
    console.log(resultadoSoma); // Saída: 30
    ```
*   **Em Literais de Objeto:** Para combinar objetos ou criar cópias.
    ```javascript
    const objBase = { a: 1, b: 2 };
    const objExtra = { b: 3, c: 4 }; // Propriedade 'b' será sobrescrita

    const objCombinado = { ...objBase, ...objExtra, d: 5 };
    console.log(objCombinado); // Saída: { a: 1, b: 3, c: 4, d: 5 }

    const copiaObjBase = { ...objBase }; // Cria uma cópia superficial
    ```

**Spread vs Rest:** A sintaxe `...` é usada tanto para Spread quanto para Rest Parameters. A diferença está no local onde é usada:
*   **Spread:** Expande um iterável em elementos/argumentos individuais (ex: `[...arr]`, `func(...arr)`).
*   **Rest:** Coleta múltiplos elementos/argumentos em um único array (ex: `function(...args)`, `const [a, ...resto] = arr`).

#### Exercícios Práticos: Objetos e Arrays

1.  **Catálogo de Produtos:** Crie um array de objetos, onde cada objeto representa um produto com propriedades `id`, `nome`, `preco`. Escreva código para:
    *   Imprimir no console o nome e o preço de cada produto usando `forEach`.
    *   Criar um novo array contendo apenas os nomes dos produtos usando `map`.
    *   Criar um novo array contendo apenas os produtos com preço maior que um determinado valor (ex: 50) usando `filter`.
    *   Calcular o preço total de todos os produtos no catálogo usando `reduce`.
    *   Encontrar o primeiro produto com um `id` específico usando `find`.
2.  **Informações do Usuário:** Crie um objeto `usuario` com propriedades `nome`, `idade`, `email` e um array `hobbies`. Use desestruturação para extrair `nome` e `email` para variáveis separadas. Use desestruturação de array para extrair o primeiro hobby.
3.  **Mesclando Arrays:** Crie dois arrays de números. Use o operador Spread para criar um terceiro array que seja a combinação dos dois primeiros, com um número adicional inserido entre eles.
4.  **Cópia e Modificação de Objeto:** Crie um objeto `configuracoes`. Use o operador Spread para criar uma cópia superficial chamada `novasConfiguracoes`. Modifique uma propriedade em `novasConfiguracoes` e adicione uma nova. Verifique se o objeto `configuracoes` original não foi alterado.
5.  **Método de Objeto com `this`:** Crie um objeto `retangulo` com propriedades `largura` e `altura`. Adicione um método `calcularArea` que use `this` para acessar a largura e altura e retorne a área. Chame o método e imprima o resultado.

Objetos e arrays são estruturas de dados essenciais que você usará constantemente em JavaScript. Pratique a criação, manipulação e iteração usando os diversos métodos disponíveis. Entender `this`, desestruturação e spread syntax tornará seu código mais eficiente e legível. A seguir, veremos como usar JavaScript para interagir com páginas HTML através do DOM.


### Manipulação do DOM (Document Object Model)

Até agora, exploramos a linguagem JavaScript em si: sua sintaxe, tipos de dados, estruturas de controle, funções, objetos e arrays. Esses são os pilares da linguagem, mas para tornar as páginas web interativas e dinâmicas, precisamos de uma maneira para que o JavaScript interaja com a estrutura e o conteúdo da própria página HTML. É aqui que entra o DOM.

#### O que é o DOM?

O **DOM (Document Object Model)** é uma interface de programação (API) para documentos HTML e XML. Quando um navegador carrega uma página web, ele cria uma representação em memória da estrutura dessa página. Essa representação é o DOM. Ele modela o documento HTML como uma árvore de objetos, onde cada nó na árvore representa uma parte do documento (como elementos, atributos, texto, etc.).

Pense na sua página HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Minha Página</title>
</head>
<body>
  <h1>Título Principal</h1>
  <p id="paragrafo1">Um parágrafo com um <a href="#">link</a>.</p>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</body>
</html>
```

O navegador transforma isso em uma estrutura de árvore DOM, mais ou menos assim:

```
Document
└── html
    ├── head
    │   ├── #text (espaço em branco)
    │   ├── title
    │   │   └── #text ("Minha Página")
    │   └── #text (espaço em branco)
    └── body
        ├── #text (espaço em branco)
        ├── h1
        │   └── #text ("Título Principal")
        ├── #text (espaço em branco)
        ├── p (id="paragrafo1")
        │   ├── #text ("Um parágrafo com um ")
        │   └── a (href="#")
        │       └── #text ("link")
        │   └── #text (".")
        ├── #text (espaço em branco)
        ├── ul
        │   ├── #text (espaço em branco)
        │   ├── li
        │   │   └── #text ("Item 1")
        │   ├── #text (espaço em branco)
        │   ├── li
        │   │   └── #text ("Item 2")
        │   └── #text (espaço em branco)
        └── #text (espaço em branco)
```

O JavaScript pode acessar e manipular essa árvore DOM. Através do DOM, o JavaScript pode:

*   Encontrar (selecionar) elementos HTML na página.
*   Alterar o conteúdo de texto dos elementos.
*   Modificar atributos dos elementos (como `src` de uma imagem ou `href` de um link).
*   Alterar o estilo CSS dos elementos.
*   Adicionar novos elementos e atributos à página.
*   Remover elementos e atributos existentes.
*   Reagir a eventos que ocorrem na página (como cliques do mouse, pressionamentos de tecla, etc.).

Essencialmente, o DOM é a ponte que conecta o JavaScript ao HTML e CSS da página, permitindo a criação de interfaces de usuário dinâmicas e interativas.

O ponto de entrada principal para interagir com o DOM é o objeto global `document`.

#### Selecionando Elementos

Para manipular um elemento HTML, primeiro precisamos selecioná-lo no DOM. Existem vários métodos disponíveis no objeto `document` para fazer isso:

1.  **`getElementById(id)`:** Seleciona um único elemento pelo seu atributo `id`. Como os IDs devem ser únicos na página, este método retorna o elemento específico ou `null` se nenhum elemento com esse ID for encontrado. É um dos métodos mais rápidos.
    ```html
    <div id="principal">Conteúdo principal</div>
    ```
    ```javascript
    const divPrincipal = document.getElementById("principal");
    if (divPrincipal) {
      console.log("Elemento encontrado:", divPrincipal);
    } else {
      console.log("Elemento não encontrado.");
    }
    ```

2.  **`getElementsByTagName(tagName)`:** Seleciona todos os elementos com uma determinada tag HTML (como `p`, `li`, `div`). Retorna uma `HTMLCollection` (uma coleção semelhante a um array, mas *live*, ou seja, atualiza automaticamente se o DOM mudar) contendo todos os elementos encontrados. Se nenhum for encontrado, retorna uma coleção vazia.
    ```html
    <p>Parágrafo 1</p>
    <p>Parágrafo 2</p>
    ```
    ```javascript
    const todosOsParagrafos = document.getElementsByTagName("p");
    console.log(`Número de parágrafos: ${todosOsParagrafos.length}`); // Saída: Número de parágrafos: 2
    // Podemos iterar sobre a HTMLCollection (convertendo para array ou usando for loop)
    for (let i = 0; i < todosOsParagrafos.length; i++) {
      console.log(todosOsParagrafos[i].textContent);
    }
    ```

3.  **`getElementsByClassName(className)`:** Seleciona todos os elementos que possuem uma determinada classe CSS. Retorna uma `HTMLCollection` (também *live*).
    ```html
    <div class="alerta erro">Erro 1</div>
    <span class="alerta aviso">Aviso 1</span>
    <div class="alerta sucesso">Sucesso</div>
    ```
    ```javascript
    const todosOsAlertas = document.getElementsByClassName("alerta");
    console.log(`Número de alertas: ${todosOsAlertas.length}`); // Saída: 3
    const alertasDeErro = document.getElementsByClassName("erro"); // Pode usar múltiplas classes: getElementsByClassName("alerta erro")
    console.log(`Número de alertas de erro: ${alertasDeErro.length}`); // Saída: 1
    ```

4.  **`querySelector(selector)`:** Seleciona o **primeiro** elemento na página que corresponde a um seletor CSS especificado (qualquer seletor CSS válido: `#id`, `.classe`, `tag`, `tag[atributo]`, `ancestral descendente`, etc.). Retorna o elemento encontrado ou `null` se nenhum corresponder. Este é um método muito versátil e amplamente utilizado.
    ```html
    <div id="menu">
      <ul>
        <li class="item">Opção 1</li>
        <li class="item ativo">Opção 2</li>
      </ul>
    </div>
    ```
    ```javascript
    const menu = document.querySelector("#menu");
    const primeiroItem = document.querySelector(".item"); // Pega o primeiro li.item
    const itemAtivo = document.querySelector("li.ativo"); // Pega o li com classe ativo
    const primeiroItemDentroDoMenu = document.querySelector("#menu .item"); // Descendente

    console.log(primeiroItem.textContent); // Saída: Opção 1
    console.log(itemAtivo.textContent); // Saída: Opção 2
    ```

5.  **`querySelectorAll(selector)`:** Seleciona **todos** os elementos na página que correspondem ao seletor CSS especificado. Retorna uma `NodeList` (uma coleção semelhante a um array, mas geralmente *não live* - representa um snapshot do DOM no momento da chamada). Se nenhum for encontrado, retorna uma NodeList vazia.
    ```javascript
    const todosOsItens = document.querySelectorAll(".item");
    console.log(`Número de itens: ${todosOsItens.length}`); // Saída: 2

    // NodeList pode ser iterada com forEach diretamente
    todosOsItens.forEach((item, index) => {
      console.log(`Item ${index}: ${item.textContent}`);
    });
    // Saída:
    // Item 0: Opção 1
    // Item 1: Opção 2
    ```

**Recomendação:** `querySelector` e `querySelectorAll` são geralmente preferidos no código moderno devido à sua flexibilidade com seletores CSS. Use `getElementById` quando tiver o ID, pois é muito eficiente.

#### Modificando Elementos

Uma vez que um elemento é selecionado e armazenado em uma variável, podemos modificar suas propriedades:

*   **Conteúdo:**
    *   `textContent`: Define ou obtém o conteúdo de texto de um nó e seus descendentes, sem incluir tags HTML. É geralmente mais seguro e performático para manipular apenas texto.
        ```javascript
        const paragrafo = document.getElementById("paragrafo1");
        console.log(paragrafo.textContent); // Saída: Um parágrafo com um link.
        paragrafo.textContent = "Conteúdo de texto alterado!";
        ```
    *   `innerHTML`: Define ou obtém a sintaxe HTML completa (incluindo tags) dentro de um elemento. Use com **cuidado**, pois interpretar HTML de fontes não confiáveis pode levar a vulnerabilidades de segurança (Cross-Site Scripting - XSS). É útil quando você precisa inserir HTML formatado.
        ```javascript
        const caixa = document.getElementById("caixa-info");
        caixa.innerHTML = "<h2>Novo Título</h2><p>Com <strong>HTML</strong> inserido.</p>";
        ```
*   **Atributos:**
    *   Acesso direto para atributos comuns/padrão: Muitos atributos HTML padrão podem ser acessados diretamente como propriedades do objeto elemento (ex: `id`, `className`, `src`, `href`, `value`, `disabled`, `style`).
        ```javascript
        const imagem = document.querySelector("img");
        imagem.src = "nova-imagem.jpg";
        imagem.alt = "Descrição da nova imagem";

        const link = document.querySelector("a");
        link.href = "https://www.exemplo.com";

        const input = document.querySelector("input[type='text']");
        input.value = "Texto preenchido via JS";
        input.disabled = true;
        ```
    *   `getAttribute(nomeAtributo)`: Obtém o valor de qualquer atributo, incluindo atributos customizados.
    *   `setAttribute(nomeAtributo, valor)`: Define o valor de qualquer atributo. Se o atributo não existir, ele é criado.
    *   `removeAttribute(nomeAtributo)`: Remove um atributo.
        ```javascript
        const botao = document.querySelector("button");
        botao.setAttribute("data-id", "12345"); // Define um atributo data-*
        let status = botao.getAttribute("data-status");
        botao.removeAttribute("disabled");
        ```
*   **Classes CSS:**
    *   `className`: Obtém ou define o valor completo do atributo `class` como uma string. Se houver múltiplas classes, elas estarão separadas por espaços. Substituir `className` remove todas as classes anteriores.
        ```javascript
        const elemento = document.getElementById("meu-div");
        elemento.className = "principal destaque"; // Define as classes
        console.log(elemento.className); // Saída: principal destaque
        ```
    *   `classList`: (Preferível) Fornece métodos mais convenientes para manipular classes individuais sem afetar as outras. Retorna um objeto `DOMTokenList`.
        *   `add('classe1', 'classe2', ...)`: Adiciona uma ou mais classes.
        *   `remove('classe1', 'classe2', ...)`: Remove uma ou mais classes.
        *   `toggle('classe')`: Adiciona a classe se ela não existir, remove se existir. Retorna `true` se a classe foi adicionada, `false` se foi removida.
        *   `contains('classe')`: Verifica se o elemento possui a classe. Retorna `true` ou `false`.
        ```javascript
        elemento.classList.add("ativo");
        elemento.classList.remove("principal");
        elemento.classList.toggle("visivel");
        if (elemento.classList.contains("destaque")) {
          console.log("Elemento tem a classe destaque.");
        }
        console.log(elemento.className); // Exemplo: destaque ativo visivel
        ```
*   **Estilos CSS:**
    *   `style`: Permite acessar e modificar estilos CSS *inline* do elemento. As propriedades CSS são escritas em camelCase (ex: `backgroundColor`, `fontSize`, `marginLeft`).
        ```javascript
        const titulo = document.querySelector("h1");
        titulo.style.color = "blue";
        titulo.style.backgroundColor = "#f0f0f0"; // Cor de fundo
        titulo.style.fontSize = "24px";
        titulo.style.marginTop = "10px";
        // Para remover um estilo inline:
        // titulo.style.color = "";
        ```
    **Importante:** Modificar estilos diretamente via `element.style` aplica estilos inline, que têm alta especificidade e podem ser difíceis de gerenciar. É geralmente **melhor prática** definir estilos em seu arquivo CSS usando classes e usar JavaScript apenas para adicionar ou remover essas classes (`element.classList.add/remove/toggle`). Use `element.style` para alterações dinâmicas que não podem ser facilmente representadas por classes (ex: definir uma posição calculada).

#### Criando e Removendo Elementos

O JavaScript também permite criar novos elementos HTML do zero e adicioná-los ao DOM, ou remover elementos existentes.

*   **`document.createElement(tagName)`:** Cria um novo nó de elemento com a tag HTML especificada. O elemento é criado em memória, mas ainda não faz parte do DOM visível.
    ```javascript
    const novoParagrafo = document.createElement("p");
    const novoLink = document.createElement("a");
    ```
*   **`document.createTextNode(text)`:** Cria um novo nó de texto.
    ```javascript
    const textoDoParagrafo = document.createTextNode("Este é um parágrafo criado dinamicamente.");
    ```
*   **Adicionando Nós:** Para tornar os elementos criados visíveis, precisamos adicioná-los a um elemento que já esteja no DOM (um elemento pai).
    *   `elementoPai.appendChild(novoElemento)`: Adiciona `novoElemento` como o **último filho** de `elementoPai`.
        ```javascript
        // Adiciona o texto ao parágrafo
        novoParagrafo.appendChild(textoDoParagrafo);

        // Adiciona o parágrafo ao final do body
        document.body.appendChild(novoParagrafo);
        ```
    *   `elementoPai.insertBefore(novoElemento, elementoReferencia)`: Insere `novoElemento` antes de `elementoReferencia` dentro de `elementoPai`. Se `elementoReferencia` for `null`, funciona como `appendChild`.
        ```javascript
        const primeiroItemLista = document.querySelector("ul li");
        const novoItemLista = document.createElement("li");
        novoItemLista.textContent = "Item 0";
        const lista = document.querySelector("ul");
        lista.insertBefore(novoItemLista, primeiroItemLista);
        ```
    *   Métodos mais modernos (alternativas a `appendChild` e `insertBefore`):
        *   `elementoPai.append(no1, no2, ...)`: Adiciona nós (elementos ou texto) ao final de `elementoPai`.
        *   `elementoPai.prepend(no1, no2, ...)`: Adiciona nós ao início de `elementoPai`.
        *   `elementoReferencia.before(no1, no2, ...)`: Insere nós antes de `elementoReferencia`.
        *   `elementoReferencia.after(no1, no2, ...)`: Insere nós depois de `elementoReferencia`.
        ```javascript
        const container = document.getElementById("container");
        const div1 = document.createElement("div");
        div1.textContent = "Div 1 (append)";
        const div2 = document.createElement("div");
        div2.textContent = "Div 2 (prepend)";
        container.append(div1, "Texto adicionado com append");
        container.prepend(div2);
        ```
*   **Removendo Nós:**
    *   `elementoPai.removeChild(elementoFilho)`: Remove `elementoFilho` de `elementoPai`. O método retorna o nó removido.
        ```javascript
        const itemParaRemover = document.getElementById("item-obsoleto");
        if (itemParaRemover) {
          itemParaRemover.parentNode.removeChild(itemParaRemover); // Precisa acessar o pai para remover
        }
        ```
    *   `elemento.remove()`: (Mais moderno e simples) Remove o próprio `elemento` do DOM.
        ```javascript
        const itemParaRemoverDireto = document.getElementById("outro-item-obsoleto");
        if (itemParaRemoverDireto) {
          itemParaRemoverDireto.remove();
        }
        ```
*   **Substituindo Nós:**
    *   `elementoPai.replaceChild(novoElemento, elementoAntigo)`: Substitui `elementoAntigo` por `novoElemento` dentro de `elementoPai`.
    *   `elementoAntigo.replaceWith(novoElemento)`: (Mais moderno) Substitui `elementoAntigo` por `novoElemento`.

#### Eventos (click, mouseover, keydown, etc.)

Eventos são ações que ocorrem na página web, geralmente iniciadas pelo usuário (como clicar em um botão, mover o mouse, digitar em um campo) ou pelo navegador (como o carregamento completo da página).

JavaScript permite "escutar" esses eventos e executar código (uma função, chamada de *event handler* ou *event listener*) em resposta a eles. Isso é a base da interatividade na web.

Alguns eventos comuns:

*   **Eventos de Mouse:** `click`, `dblclick` (duplo clique), `mousedown` (botão pressionado), `mouseup` (botão solto), `mouseover` (mouse sobre o elemento), `mouseout` (mouse sai do elemento), `mousemove` (mouse se move sobre o elemento).
*   **Eventos de Teclado:** `keydown` (tecla pressionada), `keyup` (tecla solta), `keypress` (caractere inserido - obsoleto em favor de `keydown`).
*   **Eventos de Formulário:** `submit` (formulário enviado), `change` (valor de um campo `<input>`, `<select>`, `<textarea>` mudou e perdeu o foco), `input` (valor de `<input>` ou `<textarea>` mudou), `focus` (elemento recebeu foco), `blur` (elemento perdeu foco).
*   **Eventos de Janela/Documento:** `load` (página e todos os recursos terminaram de carregar), `DOMContentLoaded` (HTML da página foi completamente carregado e parseado, sem esperar por CSS, imagens), `resize` (janela do navegador redimensionada), `scroll` (página rolada).

#### Manipuladores de Eventos (Event Listeners) e Propagação

A maneira moderna e recomendada de registrar um manipulador de eventos é usando o método `addEventListener()`.

*   **`elemento.addEventListener(tipoEvento, funcaoListener, [useCapture])`:**
    *   `tipoEvento`: Uma string com o nome do evento (ex: "click", "mouseover", "keydown") **sem** o prefixo "on".
    *   `funcaoListener`: A função que será chamada quando o evento ocorrer. Essa função recebe automaticamente um objeto `event` como argumento, contendo informações sobre o evento (veremos mais sobre isso).
    *   `useCapture` (opcional): Um booleano que define a fase de propagação do evento (ver abaixo). O padrão é `false` (fase de bubbling).

```html
<button id="meuBotao">Clique Aqui</button>
<input type="text" id="meuInput">
<div id="resultado"></div>
```
```javascript
const botao = document.getElementById("meuBotao");
const input = document.getElementById("meuInput");
const divResultado = document.getElementById("resultado");

// Função listener para o clique do botão
function lidarComClique(event) {
  console.log("Botão clicado!");
  console.log("Tipo de evento:", event.type); // "click"
  console.log("Elemento alvo:", event.target); // O próprio botão
  divResultado.textContent = "O botão foi clicado às " + new Date().toLocaleTimeString();
}

// Função listener para o input
function lidarComInput(event) {
  // event.target se refere ao elemento que disparou o evento (o input)
  divResultado.textContent = `Você digitou: ${event.target.value}`;
}

// Adicionando os listeners
botao.addEventListener("click", lidarComClique);
input.addEventListener("input", lidarComInput);

// Adicionando outro listener ao botão com uma arrow function anônima
botao.addEventListener("mouseover", () => {
  console.log("Mouse sobre o botão!");
  botao.style.backgroundColor = "lightblue";
});

botao.addEventListener("mouseout", () => {
  console.log("Mouse fora do botão!");
  botao.style.backgroundColor = ""; // Remove o estilo inline
});

// Removendo um listener (precisa da referência exata da função)
// botao.removeEventListener("click", lidarComClique);
```

**O Objeto `event`:** A função listener recebe um objeto `event` que contém informações úteis:
*   `event.type`: O tipo de evento que ocorreu (ex: "click").
*   `event.target`: O elemento HTML onde o evento ocorreu originalmente.
*   `event.currentTarget`: O elemento ao qual o listener está anexado (útil na propagação).
*   `event.preventDefault()`: Impede o comportamento padrão do navegador para o evento (ex: impedir o envio de um formulário ao clicar no submit, impedir que um link navegue).
*   `event.stopPropagation()`: Impede que o evento continue se propagando pelas fases de bubbling ou capturing.
*   Para eventos de teclado: `event.key` (a tecla pressionada), `event.code` (o código físico da tecla), `event.altKey`, `event.ctrlKey`, `event.shiftKey` (booleanos indicando se essas teclas modificadoras estavam pressionadas).
*   Para eventos de mouse: `event.clientX`, `event.clientY` (coordenadas relativas à janela), `event.pageX`, `event.pageY` (coordenadas relativas ao documento).

**Propagação de Eventos (Bubbling e Capturing):**
Quando um evento ocorre em um elemento (ex: um clique em um botão dentro de uma div), ele não acontece apenas naquele elemento. O evento passa por duas fases principais de propagação através da hierarquia do DOM:

1.  **Fase de Capturing (Captura):** O evento "desce" pela árvore DOM, do `window` até o elemento alvo. Listeners anexados com `useCapture = true` são acionados nesta fase.
2.  **Fase de Target (Alvo):** O evento chega ao elemento onde ocorreu originalmente (`event.target`).
3.  **Fase de Bubbling (Borbulhamento):** O evento "sobe" de volta pela árvore DOM, do elemento alvo até o `window`. Listeners anexados com `useCapture = false` (o padrão) são acionados nesta fase.

Isso significa que se você clicar em um botão dentro de uma div, e ambos tiverem um listener para "click" (na fase de bubbling), o listener do botão será executado primeiro, e depois o listener da div.

```html
<div id="pai" style="padding: 20px; border: 1px solid red;">
  Pai
  <button id="filho" style="padding: 10px;">Filho</button>
</div>
```
```javascript
const pai = document.getElementById("pai");
const filho = document.getElementById("filho");

pai.addEventListener("click", (event) => {
  console.log("Listener do Pai (Bubbling)");
  console.log(" Target:", event.target.id);
  console.log(" CurrentTarget:", event.currentTarget.id);
}, false); // false é o padrão (Bubbling)

filho.addEventListener("click", (event) => {
  console.log("Listener do Filho (Bubbling)");
  console.log(" Target:", event.target.id);
  console.log(" CurrentTarget:", event.currentTarget.id);
  // event.stopPropagation(); // Descomente para impedir que o evento chegue ao pai
}, false);

// Exemplo de Capturing (menos comum)
pai.addEventListener("click", () => {
  console.log("Listener do Pai (Capturing)");
}, true); // true para Capturing

// Ao clicar no botão "Filho":
// Saída esperada (sem stopPropagation):
// Listener do Pai (Capturing)
// Listener do Filho (Bubbling)
//  Target: filho
//  CurrentTarget: filho
// Listener do Pai (Bubbling)
//  Target: filho
//  CurrentTarget: pai
```

A propagação de eventos permite um padrão poderoso chamado **delegação de eventos (event delegation)**. Em vez de adicionar um listener a cada um de muitos elementos filhos (ex: muitos botões em uma lista), você pode adicionar um único listener ao elemento pai. Dentro do listener do pai, você verifica `event.target` para saber qual filho foi realmente clicado e agir de acordo. Isso é mais eficiente, especialmente para listas dinâmicas onde itens são adicionados ou removidos.

#### Exercícios Práticos: DOM

Crie um arquivo HTML simples com alguns elementos (um título `h1`, um parágrafo `p` com um `id`, uma lista `ul` com alguns `li`, um botão `button` e uma `div` vazia com um `id="output"`). Crie um arquivo JavaScript separado e linke-o ao HTML.

1.  **Seleção e Modificação:**
    *   Selecione o `h1` e altere seu `textContent`.
    *   Selecione o parágrafo pelo `id` e altere sua `style.color` para vermelho.
    *   Selecione todos os `li` da lista usando `querySelectorAll`. Use `forEach` para adicionar a classe `list-item` a cada um deles.
2.  **Criação e Adição:**
    *   Crie um novo elemento `li`.
    *   Defina seu `textContent` para "Novo Item Adicionado".
    *   Selecione a `ul` e adicione o novo `li` ao final dela usando `appendChild` ou `append`.
3.  **Manipulação de Eventos:**
    *   Selecione o botão.
    *   Adicione um `addEventListener` para o evento `click`.
    *   Dentro da função listener do clique:
        *   Selecione a `div` com `id="output"`.
        *   Altere o `textContent` da `div` para mostrar uma mensagem como "Botão clicado em [hora atual]!".
4.  **Evento de Input (Extra):**
    *   Adicione um campo `<input type="text">` ao seu HTML.
    *   Adicione um `addEventListener` para o evento `input` neste campo.
    *   Dentro do listener, atualize o `textContent` da `div#output` para mostrar o valor atual do campo input (`event.target.value`).

Dominar a manipulação do DOM é crucial para o desenvolvimento front-end com JavaScript. Pratique selecionar, modificar, criar, remover elementos e, especialmente, trabalhar com eventos para tornar suas páginas interativas. A seguir, exploraremos como lidar com operações assíncronas em JavaScript, como buscar dados de um servidor.


### JavaScript Assíncrono no Cliente

Até agora, a maior parte do código JavaScript que vimos executa de forma **síncrona**. Isso significa que as instruções são executadas uma após a outra, em ordem. Se uma instrução demora para ser concluída (por exemplo, um cálculo complexo ou, mais relevantemente no contexto web, uma requisição de rede), todo o restante do código JavaScript (e potencialmente a interface do usuário no navegador) fica bloqueado esperando essa instrução terminar. Isso pode levar a uma experiência do usuário ruim, com páginas que travam ou não respondem.

Para lidar com operações que podem demorar (como buscar dados de um servidor, ler arquivos no Node.js, ou esperar por um timer), JavaScript utiliza um modelo **assíncrono**. Operações assíncronas permitem que o programa inicie uma tarefa demorada e continue executando outras instruções sem esperar que a tarefa demorada seja concluída. Quando a tarefa assíncrona termina, o programa é notificado e pode processar o resultado.

No ambiente do navegador, a assincronia é crucial para:

*   Buscar dados de APIs externas sem congelar a interface.
*   Responder a eventos do usuário de forma fluida.
*   Executar animações suaves.
*   Lidar com timers (`setTimeout`, `setInterval`).

Vamos explorar as principais formas de lidar com código assíncrono em JavaScript no lado do cliente.

#### Conceito de Sincronia vs Assincronia

Imagine que você está em uma fila de banco (síncrono):
1.  Você entra na fila.
2.  Espera sua vez.
3.  É atendido (operação demorada).
4.  Só depois de ser atendido, você pode sair e fazer outra coisa.
A fila inteira (e você) fica bloqueada enquanto cada pessoa é atendida.

Agora imagine pedir comida em um restaurante com pager (assíncrono):
1.  Você faz seu pedido (inicia a operação demorada).
2.  Recebe um pager e vai sentar ou fazer outra coisa (continua a execução).
3.  Quando o pedido fica pronto, o pager vibra (notificação de conclusão).
4.  Você busca seu pedido (processa o resultado).
Você não ficou bloqueado esperando a comida ficar pronta; pôde fazer outras coisas enquanto isso.

JavaScript, sendo single-threaded (executa em uma única thread principal), usa um mecanismo chamado **Event Loop** (que mencionamos brevemente na introdução) para gerenciar operações assíncronas de forma não bloqueante, similar ao exemplo do restaurante.

#### Callbacks

A forma mais antiga e fundamental de lidar com assincronia em JavaScript é através de **callbacks**. Um callback é simplesmente uma função que é passada como argumento para outra função, com a intenção de ser chamada (called back) posteriormente, geralmente quando uma operação assíncrona é concluída.

O exemplo clássico é o `setTimeout`, que executa uma função de callback após um determinado período de tempo:

```javascript
console.log("Início");

// setTimeout é assíncrono
setTimeout(() => {
  // Esta função é o callback
  console.log("Dentro do setTimeout (após 2 segundos)");
}, 2000); // 2000 milissegundos = 2 segundos

console.log("Meio");

setTimeout(() => {
  console.log("Dentro do segundo setTimeout (após 0 segundos?)");
}, 0); // Mesmo com 0ms, ainda é assíncrono e vai para a fila

console.log("Fim");

// Saída esperada:
// Início
// Meio
// Fim
// Dentro do segundo setTimeout (após 0 segundos?)
// Dentro do setTimeout (após 2 segundos)
```

Observe que "Fim" é impresso antes dos callbacks do `setTimeout`, mesmo o de 0ms. Isso ocorre porque `setTimeout` agenda a execução do callback; ele não bloqueia o código. O callback é colocado em uma fila e só será executado pelo Event Loop quando a pilha de execução principal estiver vazia.

Callbacks são usados extensivamente em APIs mais antigas e em manipuladores de eventos:

```javascript
const botao = document.getElementById("meuBotao");

// A função passada para addEventListener é um callback
botao.addEventListener("click", function(event) {
  console.log("Botão clicado! (Callback de evento)");
});
```

**Problema dos Callbacks: Callback Hell (Pyramid of Doom)**

Quando você tem múltiplas operações assíncronas que dependem umas das outras, o uso de callbacks aninhados pode levar a um código difícil de ler, manter e depurar, conhecido como "Callback Hell" ou "Pyramid of Doom":

```javascript
// Exemplo hipotético de Callback Hell
operacaoAssincrona1(parametro1, function(resultado1) {
  console.log("Resultado 1:", resultado1);
  operacaoAssincrona2(resultado1, function(resultado2) {
    console.log("Resultado 2:", resultado2);
    operacaoAssincrona3(resultado2, function(resultado3) {
      console.log("Resultado 3:", resultado3);
      // E assim por diante...
      operacaoAssincrona4(resultado3, function(resultado4) {
        console.log("Resultado 4:", resultado4);
        // Tratamento de erro fica complexo aqui dentro
      }, function(erro4) { /* trata erro 4 */ });
    }, function(erro3) { /* trata erro 3 */ });
  }, function(erro2) { /* trata erro 2 */ });
}, function(erro1) { /* trata erro 1 */ });
```

Essa estrutura aninhada dificulta o fluxo de controle e o tratamento de erros. Para resolver isso, foram introduzidas as Promises.

#### Promises

Promises (Promessas), introduzidas no ES6, oferecem uma maneira mais limpa e estruturada de lidar com operações assíncronas e seus resultados (sucesso ou falha).

Uma `Promise` é um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante.

Uma Promise pode estar em um destes três estados:

1.  **Pending (Pendente):** Estado inicial, a operação ainda não foi concluída.
2.  **Fulfilled (Realizada/Resolvida):** A operação foi concluída com sucesso, e a Promise tem um valor resultante.
3.  **Rejected (Rejeitada):** A operação falhou, e a Promise tem um motivo (geralmente um objeto de erro).

Uma vez que uma Promise é fulfilled ou rejected, ela se torna "settled" (estabelecida) e seu estado não muda mais.

**Consumindo Promises:**

Você geralmente não cria Promises diretamente (a menos que esteja criando sua própria função assíncrona), mas sim consome Promises retornadas por APIs modernas, como a `fetch` API.

Para consumir uma Promise, usamos os métodos `.then()` e `.catch()`:

*   **`.then(onFulfilled, onRejected)`:** Anexa callbacks para os casos de sucesso (fulfilled) e falha (rejected - opcional).
    *   `onFulfilled`: Uma função que será chamada se a Promise for resolvida. Ela recebe o valor resultante como argumento.
    *   `onRejected`: Uma função (opcional) que será chamada se a Promise for rejeitada. Ela recebe o motivo da rejeição (erro) como argumento.
*   **`.catch(onRejected)`:** É um atalho para `.then(undefined, onRejected)`. Usado especificamente para tratar erros (rejeições).
*   **`.finally(onFinally)`:** Anexa um callback que será executado quando a Promise for estabelecida (seja fulfilled ou rejected). Útil para limpeza de recursos, independentemente do resultado.

O grande poder das Promises vem do **encadeamento (chaining)**. Os métodos `.then()`, `.catch()`, e `.finally()` retornam *novas* Promises, permitindo encadear operações assíncronas de forma sequencial e mais legível:

```javascript
console.log("Iniciando busca de dados...");

// fetch retorna uma Promise
fetch("https://jsonplaceholder.typicode.com/posts/1") // URL de exemplo
  .then(response => {
    // O primeiro .then recebe o objeto Response
    console.log("Resposta recebida:", response.status, response.statusText);
    if (!response.ok) {
      // Se a resposta HTTP não for OK (ex: 404, 500), rejeitamos a Promise manualmente
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    // response.json() também retorna uma Promise que resolve com os dados JSON parseados
    return response.json();
  })
  .then(data => {
    // Este .then recebe os dados JSON parseados
    console.log("Dados recebidos:", data);
    // Podemos fazer outra operação assíncrona aqui, se necessário
    // return outraOperacaoAssincrona(data);
  })
  .catch(error => {
    // .catch lida com erros de rede OU erros lançados nos .then anteriores
    console.error("Falha na busca:", error);
  })
  .finally(() => {
    // .finally executa sempre, com sucesso ou falha
    console.log("Busca de dados finalizada (com sucesso ou falha).");
  });

console.log("Requisição fetch iniciada (código continua executando)...");
```

Este código é muito mais limpo e fácil de seguir do que o equivalente com callbacks aninhados. O tratamento de erros centralizado no `.catch()` é uma grande vantagem.

**`Promise.all(iterable)`:**

Útil quando você precisa executar várias Promises em paralelo e esperar que **todas** elas sejam resolvidas. Recebe um iterável (geralmente um array) de Promises.

*   Retorna uma nova Promise que resolve com um array contendo os resultados de todas as Promises originais (na mesma ordem), **somente se todas** as Promises originais resolverem.
*   Se **qualquer uma** das Promises originais for rejeitada, `Promise.all` rejeita imediatamente com o motivo da primeira Promise rejeitada.

```javascript
const promise1 = fetch("https://jsonplaceholder.typicode.com/posts/1").then(res => res.json());
const promise2 = fetch("https://jsonplaceholder.typicode.com/posts/2").then(res => res.json());
const promise3 = new Promise(resolve => setTimeout(() => resolve("Timer concluído"), 1500));

Promise.all([promise1, promise2, promise3])
  .then(resultados => {
    console.log("Resultados do Promise.all:");
    const [post1, post2, timerMsg] = resultados; // Desestruturação do array de resultados
    console.log("Post 1:", post1.title);
    console.log("Post 2:", post2.title);
    console.log("Timer:", timerMsg);
  })
  .catch(error => {
    console.error("Uma das Promises falhou no Promise.all:", error);
  });
```

**Outros métodos estáticos de Promise:**
*   `Promise.race(iterable)`: Retorna uma Promise que resolve ou rejeita assim que a *primeira* Promise no iterável resolver ou rejeitar.
*   `Promise.allSettled(iterable)`: Similar a `Promise.all`, mas espera que todas as Promises sejam estabelecidas (resolvidas ou rejeitadas) e retorna uma Promise que resolve com um array de objetos descrevendo o resultado de cada Promise original (com `status: 'fulfilled', value: ...` ou `status: 'rejected', reason: ...`).
*   `Promise.any(iterable)`: Retorna uma Promise que resolve assim que a *primeira* Promise no iterável resolver. Se todas forem rejeitadas, retorna uma Promise rejeitada com um `AggregateError`.
*   `Promise.resolve(value)`: Retorna uma Promise que já está resolvida com o valor fornecido.
*   `Promise.reject(reason)`: Retorna uma Promise que já está rejeitada com o motivo fornecido.

#### Async/Await

Introduzido no ES2017 (ES8), `async/await` é uma sintaxe especial construída sobre Promises que permite escrever código assíncrono que se parece e se comporta um pouco mais como código síncrono, tornando-o ainda mais fácil de ler e entender.

*   **`async`:** A palavra-chave `async` é usada antes de uma declaração de função (ou expressão de função, ou arrow function) para indicar que a função conterá operações assíncronas e que ela **sempre retornará uma Promise**. Se a função `async` retornar um valor explicitamente, a Promise retornada será resolvida com esse valor. Se a função `async` lançar um erro, a Promise retornada será rejeitada com esse erro.
*   **`await`:** A palavra-chave `await` só pode ser usada **dentro** de uma função `async`. Ela é colocada antes de uma expressão que retorna uma Promise. `await` pausa a execução da função `async` naquele ponto e espera que a Promise seja estabelecida (resolvida ou rejeitada). Se a Promise for resolvida, `await` retorna o valor resolvido. Se a Promise for rejeitada, `await` lança o erro da rejeição (que pode ser capturado por um `try...catch`).

Vamos reescrever o exemplo do `fetch` usando `async/await`:

```javascript
// Definimos uma função async para poder usar await
async function buscarDadosPost() {
  console.log("Iniciando busca com async/await...");
  try {
    // await pausa a execução até fetch retornar a Response
    const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
    console.log("Resposta recebida (await):");

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    // await pausa a execução até response.json() resolver
    const data = await response.json();
    console.log("Dados recebidos (await):", data);
    return data; // A Promise retornada por buscarDadosPost será resolvida com 'data'

  } catch (error) {
    // Erros (de rede ou lançados) são capturados pelo catch
    console.error("Falha na busca (await):", error);
    // Se ocorrer um erro, a Promise retornada por buscarDadosPost será rejeitada
    throw error; // Opcional: relançar o erro se quiser que o chamador trate
  } finally {
    console.log("Busca finalizada (await).");
  }
}

// Chamando a função async
console.log("Chamando buscarDadosPost...");
buscarDadosPost()
  .then(dadosDoPost => {
    if (dadosDoPost) {
      console.log("Sucesso ao chamar buscarDadosPost. Título:", dadosDoPost.title);
    }
  })
  .catch(erroFinal => {
    console.error("Erro final ao chamar buscarDadosPost:", erroFinal);
  });

console.log("Código após chamar buscarDadosPost continua...");
```

O fluxo do código dentro da função `async` fica muito mais linear e parecido com código síncrono, especialmente o tratamento de erros com `try...catch`, que é familiar.

`async/await` com `Promise.all`:

```javascript
async function buscarVariosPosts() {
  try {
    const [response1, response2] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/posts/3"),
      fetch("https://jsonplaceholder.typicode.com/posts/4")
    ]);

    if (!response1.ok || !response2.ok) {
      throw new Error("Erro ao buscar um dos posts");
    }

    const [post3, post4] = await Promise.all([
      response1.json(),
      response2.json()
    ]);

    console.log("Post 3 (await):". post3.title);
    console.log("Post 4 (await):". post4.title);

  } catch (error) {
    console.error("Erro ao buscar vários posts:", error);
  }
}

buscarVariosPosts();
```

`async/await` é a maneira moderna e preferida de lidar com Promises na maioria dos casos, devido à sua clareza e legibilidade.

#### Fetch API para Requisições HTTP

Já usamos a `fetch()` nos exemplos. A Fetch API é a interface moderna e baseada em Promises do navegador para fazer requisições de rede (HTTP), substituindo a antiga `XMLHttpRequest`.

Sintaxe básica:
`fetch(resource, [options])`

*   `resource`: A URL para a qual fazer a requisição.
*   `options` (opcional): Um objeto para configurar a requisição (método HTTP, cabeçalhos, corpo da requisição, etc.).

```javascript
// Requisição GET simples (padrão)
fetch("https://api.exemplo.com/usuarios")
  .then(response => response.json()) // Assume que a resposta é JSON
  .then(data => console.log("Usuários:", data))
  .catch(error => console.error("Erro GET:", error));

// Requisição POST com dados JSON
const novoUsuario = { nome: "Maria", email: "maria@example.com" };

fetch("https://api.exemplo.com/usuarios", {
  method: "POST", // Método HTTP
  headers: {
    "Content-Type": "application/json" // Indica que estamos enviando JSON
    // Outros cabeçalhos, como de autorização, podem ir aqui
    // "Authorization": "Bearer SEU_TOKEN_AQUI"
  },
  body: JSON.stringify(novoUsuario) // Converte o objeto JS para string JSON
})
.then(response => {
  if (!response.ok) {
    // Lidar com respostas de erro do servidor (ex: 400 Bad Request)
    return response.json().then(errData => { throw new Error(errData.message || `Erro ${response.status}`) });
  }
  // Se for um POST que retorna o objeto criado (ex: com ID)
  if (response.status === 201) { // 201 Created
    return response.json();
  }
  // Se não houver corpo na resposta de sucesso (ex: 204 No Content)
  return null;
})
.then(data => {
  if (data) {
    console.log("Usuário criado:", data);
  }
})
.catch(error => console.error("Erro POST:", error));
```

**Principais Opções (`options`) do Fetch:**
*   `method`: O método HTTP (`'GET'`, `'POST'`, `'PUT'`, `'DELETE'`, `'PATCH'`, etc.). Padrão é `'GET'`.
*   `headers`: Um objeto ou objeto `Headers` com os cabeçalhos da requisição.
*   `body`: O corpo da requisição (para `POST`, `PUT`, `PATCH`). Pode ser uma string, `FormData`, `Blob`, `ArrayBuffer`, etc. Se for enviar JSON, use `JSON.stringify()`.
*   `mode`: Controla se requisições cross-origin são permitidas (`'cors'`, `'no-cors'`, `'same-origin'`). Padrão é `'cors'`.
*   `cache`: Como a requisição interage com o cache HTTP do navegador.
*   `credentials`: Se cookies devem ser enviados/recebidos em requisições cross-origin (`'include'`, `'same-origin'`, `'omit'`).

#### Tratamento de Erros em Código Assíncrono

*   **Callbacks:** Geralmente usam a convenção "error-first", onde o primeiro argumento do callback é reservado para um objeto de erro (ou `null` se não houver erro).
    ```javascript
    funcaoAssincComCallback(params, (erro, resultado) => {
      if (erro) {
        console.error("Erro no callback:", erro);
        // Lidar com o erro
        return;
      }
      // Processar o resultado
      console.log("Sucesso:", resultado);
    });
    ```
*   **Promises:** Use o método `.catch()` no final da cadeia para capturar rejeições de qualquer Promise anterior na cadeia.
    ```javascript
    minhaPromise()
      .then(res => /* ... */)
      .then(res => /* ... */)
      .catch(erro => {
        console.error("Erro na cadeia de Promises:", erro);
        // Lidar com o erro
      });
    ```
*   **Async/Await:** Use blocos `try...catch` padrão para capturar erros lançados por `await` (quando a Promise é rejeitada) ou erros síncronos dentro da função `async`.
    ```javascript
    async function minhaFuncaoAsync() {
      try {
        const resultado1 = await operacao1();
        const resultado2 = await operacao2(resultado1);
      } catch (erro) {
        console.error("Erro dentro da função async:", erro);
        // Lidar com o erro
      }
    }
    ```

É crucial sempre incluir tratamento de erros em seu código assíncrono para lidar com falhas de rede, erros de servidor, ou outros problemas inesperados.

#### Exercícios Práticos: Assincronia

1.  **Simulando Atraso:** Crie uma função `esperarSegundos(segundos)` que retorna uma Promise. Essa Promise deve resolver após o número especificado de segundos usando `setTimeout`. Teste a função usando `.then()` para imprimir uma mensagem após a espera.
2.  **Buscando Dados com Fetch e Promises:** Use a API `fetch` para buscar dados de um usuário específico da API pública JSONPlaceholder (ex: `https://jsonplaceholder.typicode.com/users/1`). Use `.then()` para processar a resposta, converter para JSON e imprimir o nome e email do usuário no console. Adicione um `.catch()` para tratar possíveis erros.
3.  **Buscando Dados com Fetch e Async/Await:** Refaça o exercício anterior, mas desta vez crie uma função `async` chamada `buscarUsuario(id)`. Dentro dela, use `await` para fazer o `fetch`, verificar a resposta (`response.ok`) e parsear o JSON. Use `try...catch` para tratamento de erros. Chame a função e imprima o nome e email do usuário.
4.  **Múltiplas Requisições com Promise.all:** Use `Promise.all` e `fetch` para buscar dados de dois posts diferentes da JSONPlaceholder simultaneamente (ex: posts 5 e 6). Quando ambas as requisições terminarem, imprima os títulos dos dois posts.
5.  **Callback Hell para Promise:** (Teórico/Adaptação) Pegue o exemplo hipotético de "Callback Hell" apresentado anteriormente e tente reescrevê-lo usando encadeamento de Promises (`.then()`) para torná-lo mais legível.

Entender e saber como trabalhar com código assíncrono é essencial para o desenvolvimento JavaScript moderno, especialmente no front-end para interagir com APIs e manter a interface responsiva. Promises e, principalmente, `async/await` tornam esse trabalho muito mais gerenciável. A seguir, veremos como organizar nosso código JavaScript em módulos.


### Tópicos Avançados no Cliente

Após cobrir os fundamentos, a manipulação do DOM e a programação assíncrona, estamos prontos para explorar alguns tópicos mais avançados do JavaScript no ambiente do navegador. Estes conceitos nos ajudarão a construir aplicações web mais robustas, organizadas e ricas em funcionalidades.

#### Módulos JavaScript (Import/Export)

À medida que as aplicações JavaScript crescem, manter todo o código em um único arquivo torna-se impraticável. O código fica difícil de ler, manter e depurar. A solução para isso é a **modularização**: dividir o código em múltiplos arquivos menores e independentes, chamados **módulos**. Cada módulo encapsula uma funcionalidade específica e pode **exportar** (tornar disponíveis) variáveis, funções ou classes para que outros módulos possam **importá-las** e utilizá-las.

O JavaScript moderno (ES6+) possui um sistema de módulos nativo, conhecido como **ES Modules (ESM)**.

**Exportando de um Módulo:**

Existem duas formas principais de exportar:

1.  **Exportações Nomeadas (Named Exports):** Permitem exportar múltiplas variáveis, funções ou classes de um módulo. Usa-se a palavra-chave `export` antes da declaração ou em um bloco `export {}` no final.

    ```javascript
    // utils.js (Módulo que exporta funcionalidades)

    export const PI = 3.14159;

    export function somar(a, b) {
      return a + b;
    }

    export class Calculadora {
      constructor(valorInicial = 0) {
        this.valor = valorInicial;
      }
      adicionar(num) {
        this.valor += num;
        return this.valor;
      }
    }

    // Ou exportar no final:
    // const PI = 3.14159;
    // function somar(a, b) { ... }
    // class Calculadora { ... }
    // export { PI, somar, Calculadora };
    ```

2.  **Exportação Padrão (Default Export):** Permite exportar um *único* valor (variável, função, classe) como a exportação principal do módulo. Só pode haver uma exportação padrão por módulo.

    ```javascript
    // meuComponente.js (Módulo com exportação padrão)

    // Exportando uma classe como padrão
    export default class MeuComponente {
      constructor(nome) {
        this.nome = nome;
      }
      render() {
        console.log(`Renderizando ${this.nome}`);
      }
    }

    // Exportando uma função como padrão:
    // export default function minhaFuncaoPadrao() { ... }

    // Exportando um valor como padrão:
    // const configuracaoPadrao = { tema: 'dark' };
    // export default configuracaoPadrao;
    ```
    Um módulo pode ter tanto exportações nomeadas quanto uma exportação padrão.

**Importando em Outro Módulo:**

Para usar funcionalidades exportadas por outro módulo, usamos a palavra-chave `import`.

1.  **Importando Exportações Nomeadas:** Usa-se chaves `{}` para listar os itens específicos que se deseja importar. Pode-se usar `as` para renomear.

    ```javascript
    // main.js (Módulo que importa funcionalidades de utils.js)

    // Importando itens específicos
    import { PI, somar, Calculadora as Calc } from './utils.js';
    // O caminho './utils.js' é relativo ao arquivo main.js

    console.log("Valor de PI:", PI);
    console.log("Soma 5 + 3:", somar(5, 3));

    const minhaCalc = new Calc(10);
    console.log("Calculadora:", minhaCalc.adicionar(7));

    // Importando tudo como um objeto (namespace)
    import * as Utils from './utils.js';

    console.log("PI (namespace):", Utils.PI);
    console.log("Soma (namespace):", Utils.somar(10, 2));
    const outraCalc = new Utils.Calculadora();
    ```

2.  **Importando Exportação Padrão:** Não se usam chaves. Você escolhe qualquer nome para a importação.

    ```javascript
    // app.js (Módulo que importa de meuComponente.js)

    import ComponentePrincipal from './meuComponente.js';
    // O nome 'ComponentePrincipal' é escolhido aqui, poderia ser qualquer outro

    const comp = new ComponentePrincipal("App Principal");
    comp.render();
    ```

3.  **Importando Padrão e Nomeadas Juntas:**

    ```javascript
    // Se utils.js tivesse também uma exportação padrão:
    // export default function funcaoPadraoUtils() { ... }

    // Importando padrão e nomeadas:
    import funcaoPadrao, { PI, somar } from './utils.js';
    ```

**Como Usar Módulos no Navegador:**

Para que o navegador entenda e carregue os módulos ES, você precisa incluir seu script principal no HTML usando a tag `<script>` com o atributo `type="module"`.

```html
<!DOCTYPE html>
<html>
<head>
  <title>App com Módulos</title>
</head>
<body>
  <h1>Exemplo de Módulos ES</h1>

  <!-- Carrega o script principal como um módulo -->
  <script type="module" src="main.js"></script>
</body>
</html>
```

O navegador então automaticamente tratará as declarações `import` dentro de `main.js` (e subsequentemente dentro dos módulos importados) para carregar e executar todo o código necessário.

**Benefícios dos Módulos:**
*   **Organização:** Divide o código em partes menores e focadas.
*   **Reutilização:** Facilita o reuso de código em diferentes partes da aplicação ou em outros projetos.
*   **Manutenção:** Alterações em um módulo têm menos chance de afetar outros módulos inesperadamente.
*   **Escopo:** Variáveis e funções declaradas em um módulo são locais a esse módulo por padrão, evitando poluição do escopo global.

**Observação sobre Node.js:** Node.js historicamente usava um sistema de módulos diferente chamado CommonJS (`require` e `module.exports`). Embora as versões mais recentes do Node.js suportem ES Modules (geralmente usando a extensão `.mjs` ou configurando `"type": "module"` no `package.json`), é importante estar ciente das diferenças se você transitar entre os ambientes.

#### Armazenamento no Navegador (localStorage, sessionStorage, Cookies)

Frequentemente, aplicações web precisam armazenar pequenas quantidades de dados diretamente no navegador do usuário para persistir informações entre sessões ou páginas. Existem três mecanismos principais para isso:

1.  **`localStorage`:**
    *   Armazena dados como pares chave-valor (ambos strings) que **persistem** mesmo depois que o navegador é fechado e reaberto.
    *   Os dados são específicos para a **origem** (protocolo + domínio + porta) do site.
    *   Limite de armazenamento geralmente maior (cerca de 5-10MB por origem).
    *   API síncrona (pode bloquear a thread principal se usada excessivamente com dados grandes, embora geralmente seja rápido para dados pequenos).
    *   Ideal para armazenar preferências do usuário, dados offline básicos, tokens de autenticação (com cuidado).

    **API:**
    *   `localStorage.setItem(chave, valor)`: Armazena/atualiza um item.
    *   `localStorage.getItem(chave)`: Recupera o valor de um item (retorna `null` se a chave não existir).
    *   `localStorage.removeItem(chave)`: Remove um item.
    *   `localStorage.clear()`: Remove todos os itens da origem.
    *   `localStorage.length`: Número de itens armazenados.
    *   `localStorage.key(indice)`: Obtém a chave no índice especificado.

    ```javascript
    // Armazenando dados
    localStorage.setItem('usuarioNome', 'Alice');
    const preferencias = { tema: 'dark', notificacoes: true };
    localStorage.setItem('prefsUsuario', JSON.stringify(preferencias)); // Objetos precisam ser stringificados

    // Recuperando dados
    const nome = localStorage.getItem('usuarioNome');
    const prefsString = localStorage.getItem('prefsUsuario');
    const prefsRecuperadas = prefsString ? JSON.parse(prefsString) : {}; // Parse de volta para objeto

    console.log(`Nome: ${nome}`);
    console.log(`Tema Preferido: ${prefsRecuperadas.tema}`);

    // Removendo um item
    // localStorage.removeItem('usuarioNome');

    // Limpando tudo
    // localStorage.clear();
    ```

2.  **`sessionStorage`:**
    *   Funciona exatamente como `localStorage` (mesma API: `sessionStorage.setItem`, `sessionStorage.getItem`, etc.).
    *   A principal diferença é o ciclo de vida: os dados armazenados em `sessionStorage` são **limpos quando a sessão do navegador termina** (ou seja, quando a aba ou janela é fechada).
    *   Os dados também são específicos para a origem e isolados por aba/janela.
    *   Útil para armazenar dados temporários relacionados à sessão atual do usuário, como o estado de um formulário multi-etapas ou a aba ativa em uma interface.

    ```javascript
    // Exemplo: Armazenar um ID de sessão temporário
    if (!sessionStorage.getItem('sessaoID')) {
      sessionStorage.setItem('sessaoID', Math.random().toString(36).substring(2));
    }
    console.log(`ID da Sessão Atual: ${sessionStorage.getItem('sessaoID')}`);
    ```

3.  **Cookies:**
    *   Mecanismo mais antigo para armazenar dados no cliente.
    *   Também são pares chave-valor (strings).
    *   Principal característica: Cookies são **enviados automaticamente com cada requisição HTTP** para o servidor da mesma origem. Isso pode impactar a performance se os cookies forem grandes ou numerosos.
    *   Possuem atributos adicionais para controlar seu comportamento: `expires`/`max-age` (tempo de vida), `path` (caminho no qual o cookie é válido), `domain` (domínio para o qual é válido), `secure` (só enviar em HTTPS), `HttpOnly` (impede acesso via JavaScript - mais seguro contra XSS para cookies de sessão), `SameSite` (controle sobre envio em requisições cross-site - importante para segurança CSRF).
    *   Limite de armazenamento muito menor (cerca de 4KB por cookie, e limite no número de cookies por domínio).
    *   Manipulação via JavaScript (propriedade `document.cookie`) é mais complexa e menos amigável que `localStorage`/`sessionStorage`.
    *   Usados principalmente para gerenciamento de sessão no lado do servidor (onde o servidor define um cookie `HttpOnly` com o ID da sessão) e rastreamento/análise.

    ```javascript
    // Definindo um cookie simples via JS (geralmente feito pelo servidor)
    // document.cookie = "nomeUsuario=Bob; max-age=3600; path=/"; // Expira em 1 hora

    // Lendo cookies via JS (retorna uma string com todos os cookies; precisa parsear)
    console.log("Cookies:", document.cookie);

    // É recomendado usar bibliotecas para facilitar a manipulação de cookies via JS se necessário.
    ```

**Qual usar?**
*   Para preferências do usuário e dados que precisam persistir após fechar o navegador: `localStorage`.
*   Para dados temporários da sessão atual: `sessionStorage`.
*   Para dados que precisam ser enviados automaticamente ao servidor a cada requisição (principalmente gerenciamento de sessão pelo servidor): Cookies (idealmente definidos pelo servidor com `HttpOnly` e `Secure`).

**Segurança:** Nunca armazene dados sensíveis (senhas, informações de cartão de crédito) em `localStorage` ou `sessionStorage`, pois eles são vulneráveis a ataques XSS (Cross-Site Scripting). Cookies `HttpOnly` oferecem alguma proteção contra XSS para IDs de sessão.

#### APIs do Navegador (Geolocation, Canvas, Web Workers - introdução)

Os navegadores modernos expõem uma vasta gama de APIs JavaScript que permitem interagir com funcionalidades do dispositivo e do próprio navegador, indo muito além da manipulação do DOM.

1.  **Geolocation API:**
    *   Permite obter a localização geográfica do dispositivo do usuário (latitude e longitude), **com a permissão explícita do usuário**.
    *   Acessada através do objeto `navigator.geolocation`.
    *   Método principal: `getCurrentPosition(successCallback, errorCallback, options)`.

    ```javascript
    function obterLocalizacao() {
      if ('geolocation' in navigator) {
        console.log("Obtendo localização...");
        navigator.geolocation.getCurrentPosition(
          (posicao) => {
            // Callback de sucesso
            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;
            const precisao = posicao.coords.accuracy;
            console.log(`Localização: Lat ${latitude}, Lon ${longitude} (Precisão: ${precisao}m)`);
            // Usar as coordenadas (ex: mostrar no mapa)
          },
          (erro) => {
            // Callback de erro
            console.error("Erro ao obter localização:", erro.message);
            // Códigos de erro comuns: erro.PERMISSION_DENIED, erro.POSITION_UNAVAILABLE, erro.TIMEOUT
          },
          {
            // Opções (opcional)
            enableHighAccuracy: true, // Tentar obter localização mais precisa (pode consumir mais bateria)
            timeout: 10000, // Tempo máximo para obter a posição (ms)
            maximumAge: 0 // Não usar posição em cache
          }
        );
      } else {
        console.log("Geolocalização não suportada neste navegador.");
      }
    }

    // Chamar a função (ex: ao clicar em um botão)
    // obterLocalizacao();
    ```

2.  **Canvas API:**
    *   Permite desenhar gráficos, imagens e animações 2D (e também 3D com WebGL, que usa a API Canvas) programaticamente em um elemento `<canvas>` no HTML.
    *   Você obtém um "contexto" de desenho (geralmente 2D) do elemento canvas e usa seus métodos para desenhar formas, linhas, texto, imagens, aplicar cores, gradientes, transformações, etc.

    ```html
    <canvas id="meuCanvas" width="400" height="200" style="border: 1px solid black;"></canvas>
    ```
    ```javascript
    const canvas = document.getElementById("meuCanvas");
    if (canvas.getContext) {
      const ctx = canvas.getContext("2d"); // Obtém o contexto 2D

      // Desenhar um retângulo vermelho
      ctx.fillStyle = "red";
      ctx.fillRect(10, 10, 100, 50); // fillRect(x, y, largura, altura)

      // Desenhar um círculo azul
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(200, 75, 40, 0, Math.PI * 2); // arc(x, y, raio, anguloInicio, anguloFim)
      ctx.fill();

      // Desenhar texto
      ctx.font = "20px Arial";
      ctx.fillStyle = "black";
      ctx.fillText("Olá, Canvas!", 50, 150);
    } else {
      console.log("Canvas não suportado.");
    }
    ```
    A API Canvas é extensa e poderosa, permitindo desde gráficos simples até jogos e visualizações de dados complexas.

3.  **Web Workers API:**
    *   JavaScript no navegador roda, por padrão, na thread principal (UI thread). Se você executar tarefas computacionalmente intensivas (cálculos longos, processamento de grandes volumes de dados) nessa thread, a interface do usuário pode congelar.
    *   Web Workers permitem executar scripts JavaScript em **threads separadas**, em segundo plano, sem bloquear a thread principal.
    *   Ideal para tarefas pesadas que não precisam de acesso direto ao DOM ou a muitos objetos do `window`.
    *   A comunicação entre a thread principal e o worker é feita através da troca de mensagens (`postMessage()` e o evento `onmessage`).

    ```javascript
    // main.js (Thread Principal)
    if (window.Worker) {
      console.log("Criando Web Worker...");
      const meuWorker = new Worker("worker.js"); // Cria o worker a partir de um arquivo JS separado

      // Envia dados para o worker
      meuWorker.postMessage({ comando: 'calcular', dados: [1, 2, 3, 4, 5, /* ... muitos dados ... */] });
      console.log("Mensagem enviada para o worker.");

      // Recebe mensagens do worker
      meuWorker.onmessage = function(event) {
        console.log("Mensagem recebida do worker:", event.data);
        // Atualizar a UI com o resultado
      };

      // Trata erros do worker
      meuWorker.onerror = function(error) {
        console.error("Erro no Worker:", error.message, error.filename, error.lineno);
      };

      // Para terminar o worker a partir da thread principal (opcional)
      // meuWorker.terminate();

    } else {
      console.log("Web Workers não suportados.");
    }
    ```

    ```javascript
    // worker.js (Código que executa na thread do Worker)
    console.log("Worker iniciado.");

    // Escuta mensagens da thread principal
    self.onmessage = function(event) {
      console.log("Worker recebeu:", event.data);
      const { comando, dados } = event.data;

      if (comando === 'calcular') {
        // Simula um cálculo pesado
        let soma = 0;
        for (let i = 0; i < 1000000000; i++) { // Exemplo de loop longo
          soma += Math.random() > 0.5 ? 1 : 0; // Operação trivial, mas demorada
        }
        // Processa os dados recebidos (exemplo)
        const resultadoCalculo = dados.reduce((acc, val) => acc + val, 0) + soma;

        console.log("Worker calculou:", resultadoCalculo);
        // Envia o resultado de volta para a thread principal
        self.postMessage({ tipo: 'resultado', valor: resultadoCalculo });
      }
    };

    // Workers não têm acesso ao DOM ou 'window'
    // console.log(document); // Erro
    // alert("Olá do worker"); // Erro

    // Para terminar o worker a partir de dentro dele mesmo (opcional)
    // self.close();
    ```

Existem muitas outras APIs do navegador, como WebSockets (comunicação bidirecional em tempo real), WebRTC (comunicação P2P de áudio/vídeo), IndexedDB (banco de dados no cliente mais robusto que localStorage), Service Workers (proxies programáveis para offline, push notifications), etc.

#### Tratamento de Erros (try...catch...finally)

Já vimos o `try...catch` no contexto de `async/await`, mas ele é a estrutura fundamental para tratamento de erros **síncronos** em JavaScript.

*   **`try`:** Contém o bloco de código onde um erro pode ocorrer.
*   **`catch (error)`:** Contém o bloco de código que será executado **se** um erro ocorrer dentro do bloco `try`. O parâmetro `error` (ou qualquer outro nome que você der) receberá o objeto de erro que foi lançado.
*   **`finally`:** (Opcional) Contém um bloco de código que será executado **sempre**, independentemente de ter ocorrido um erro ou não no `try`. Útil para limpeza de recursos (ex: fechar conexões, remover listeners temporários).

```javascript
function dividir(a, b) {
  try {
    console.log("Tentando dividir...");
    if (b === 0) {
      // Lançando um erro explicitamente
      throw new Error("Divisão por zero não é permitida!");
    }
    const resultado = a / b;
    console.log("Divisão bem-sucedida.");
    return resultado;
  } catch (erro) {
    console.error("Ocorreu um erro durante a divisão:", erro.message);
    // Você pode tratar o erro aqui (ex: retornar um valor padrão, logar, etc.)
    return null; // Exemplo: retornar null em caso de erro
  } finally {
    // Este bloco executa sempre
    console.log("Bloco finally executado.");
  }
}

console.log("Resultado 10 / 2:", dividir(10, 2));
console.log("----------");
console.log("Resultado 10 / 0:", dividir(10, 0));
```

**O Objeto `Error`:**
Quando um erro ocorre (seja lançado pelo JavaScript ou por você usando `throw`), geralmente é um objeto `Error` (ou um de seus subtipos como `TypeError`, `SyntaxError`, `ReferenceError`). Ele possui propriedades úteis:
*   `name`: O tipo do erro (ex: "Error", "TypeError").
*   `message`: A mensagem descritiva do erro.
*   `stack` (não padrão, mas comum): O rastreamento da pilha (stack trace) mostrando onde o erro ocorreu no código.

Você pode criar seus próprios erros personalizados estendendo a classe `Error`.

#### Programação Orientada a Objetos (Prototypes, Classes ES6)

JavaScript suporta programação orientada a objetos (OOP), mas sua abordagem é um pouco diferente de linguagens baseadas em classes tradicionais como Java ou C++. O modelo de OOP do JavaScript é baseado em **protótipos (prototypes)**.

**Prototypes:**
*   Todo objeto em JavaScript tem uma propriedade interna oculta chamada `[[Prototype]]` (acessível via `Object.getPrototypeOf(obj)` ou o obsoleto `obj.__proto__`) que é uma referência a outro objeto ou `null`.
*   Quando você tenta acessar uma propriedade ou método em um objeto, se ele não for encontrado diretamente no próprio objeto, o JavaScript procura na cadeia de protótipos (o protótipo do objeto, o protótipo do protótipo, e assim por diante) até encontrar a propriedade/método ou atingir o final da cadeia (`null`).
*   Isso permite que objetos herdem propriedades e métodos de seus protótipos. É um mecanismo poderoso para compartilhamento de comportamento e economia de memória.
*   Funções construtoras (que vimos antes) têm uma propriedade chamada `prototype`. Quando você cria um objeto usando `new MinhaFuncaoConstrutora()`, o `[[Prototype]]` do novo objeto é automaticamente definido para apontar para `MinhaFuncaoConstrutora.prototype`.

```javascript
// Função Construtora
function Animal(nome) {
  this.nome = nome;
}

// Adicionando um método ao prototype de Animal
// Todos os objetos criados a partir de Animal herdarão este método
Animal.prototype.falar = function() {
  console.log(`${this.nome} faz um som.`);
};

const animalGenerico = new Animal("Bicho");
animalGenerico.falar(); // Saída: Bicho faz um som.

// Criando outra função construtora que herda de Animal
function Cachorro(nome, raca) {
  Animal.call(this, nome); // Chama o construtor pai para definir 'nome'
  this.raca = raca;
}

// Fazendo Cachorro herdar de Animal
// 1. Define o prototype de Cachorro como um objeto criado a partir do prototype de Animal
Cachorro.prototype = Object.create(Animal.prototype);
// 2. Corrige o construtor no prototype de Cachorro
Cachorro.prototype.constructor = Cachorro;

// Adicionando/Sobrescrevendo métodos específicos para Cachorro
Cachorro.prototype.falar = function() {
  console.log(`${this.nome} late! Au au!`);
};

Cachorro.prototype.buscar = function() {
  console.log(`${this.nome} está buscando a bolinha.`);
};

const meuCachorro = new Cachorro("Rex", "Labrador");
meuCachorro.falar(); // Saída: Rex late! Au au! (Método sobrescrito)
meuCachorro.buscar(); // Saída: Rex está buscando a bolinha.

console.log(meuCachorro instanceof Cachorro); // true
console.log(meuCachorro instanceof Animal); // true (Herda de Animal)
```

Trabalhar diretamente com protótipos pode ser um pouco verboso.

**Classes ES6 (`class`):**

O ES6 introduziu a sintaxe de `class`, que é em grande parte "açúcar sintático" sobre o sistema de protótipos existente. Ela fornece uma maneira mais clara e familiar (para quem vem de outras linguagens) de definir objetos e herança.

```javascript
// Definindo a classe base Animal
class Animal { // A palavra 'class'
  constructor(nome) { // Método especial para inicialização
    this.nome = nome;
  }

  // Métodos são definidos diretamente dentro da classe
  falar() {
    console.log(`${this.nome} faz um som.`);
  }

  // Métodos estáticos (pertencem à classe, não às instâncias)
  static informacao() {
    console.log("Animais são seres vivos.");
  }
}

// Definindo a classe Cachorro que herda de Animal
class Cachorro extends Animal { // A palavra 'extends' para herança
  constructor(nome, raca) {
    super(nome); // Chama o construtor da classe pai (Animal)
    this.raca = raca;
  }

  // Sobrescrevendo o método falar
  falar() {
    console.log(`${this.nome} late! Au au!`);
  }

  // Adicionando um método específico
  buscar() {
    console.log(`${this.nome} está buscando a bolinha.`);
  }
}

// Usando as classes
const animalGenerico = new Animal("Bicho");
animalGenerico.falar(); // Saída: Bicho faz um som.

const meuCachorro = new Cachorro("Rex", "Labrador");
meuCachorro.falar(); // Saída: Rex late! Au au!
meuCachorro.buscar(); // Saída: Rex está buscando a bolinha.

console.log(meuCachorro instanceof Cachorro); // true
console.log(meuCachorro instanceof Animal); // true

// Chamando método estático
Animal.informacao(); // Saída: Animais são seres vivos.
// meuCachorro.informacao(); // Erro! Método estático não existe na instância
```

Embora a sintaxe de `class` seja mais limpa, é fundamental lembrar que, por baixo dos panos, JavaScript ainda está usando protótipos.

Estes tópicos avançados fornecem ferramentas poderosas para organizar seu código, persistir dados, interagir com recursos do navegador e do dispositivo, lidar com erros de forma robusta e estruturar seus objetos usando OOP. Com esta base sólida no JavaScript do lado do cliente, estaremos prontos para explorar o lado do servidor com Node.js.


## Parte 2: JavaScript no Servidor (Node.js)

Bem-vindo à segunda parte do nosso guia! Após explorarmos o JavaScript no ambiente familiar do navegador, vamos agora mudar nosso foco para o lado do servidor com o **Node.js**. Se o JavaScript no cliente trata da interatividade e da interface com o usuário, o JavaScript no servidor com Node.js lida com a lógica de negócios, acesso a dados, APIs e a infraestrutura que sustenta as aplicações web modernas.

### Introdução ao Node.js

#### O que é Node.js?

Node.js **não é** uma nova linguagem de programação, nem um framework. Node.js é um **ambiente de execução (runtime environment)** de código aberto, multiplataforma, que permite executar código JavaScript **fora do navegador**. Ele foi criado por Ryan Dahl em 2009, utilizando o **motor V8 JavaScript do Google Chrome** (o mesmo que executa JavaScript no Chrome) e adicionando funcionalidades para interagir com o sistema operacional, como acesso ao sistema de arquivos, redes, processos, etc., que não estão disponíveis no ambiente restrito do navegador.

O objetivo principal do Node.js era fornecer uma maneira de construir aplicações de rede escaláveis e de alto desempenho, especialmente aquelas que lidam com muitas conexões simultâneas e operações de entrada/saída (I/O) intensivas, como servidores web, APIs, aplicações de chat em tempo real, microserviços, etc. Ele se tornou extremamente popular para desenvolvimento back-end, mas também é amplamente utilizado para construir ferramentas de linha de comando e automatizar tarefas de desenvolvimento.

#### Arquitetura (Event Loop, Non-blocking I/O)

O grande diferencial do Node.js e a chave para seu desempenho em aplicações de rede é sua arquitetura baseada em **eventos** e **operações de I/O não bloqueantes (non-blocking I/O)**.

*   **Single-Threaded:** Assim como o JavaScript no navegador, o Node.js executa seu código JavaScript em uma única thread principal. Isso simplifica o desenvolvimento, pois não precisamos nos preocupar diretamente com problemas complexos de concorrência entre múltiplas threads (como deadlocks).
*   **Event Loop:** Para lidar com operações que podem demorar (como ler um arquivo do disco, fazer uma consulta ao banco de dados, esperar por uma requisição de rede) sem bloquear a única thread principal, o Node.js utiliza o mesmo conceito de Event Loop que vimos no navegador. Quando uma operação de I/O assíncrona é iniciada, Node.js delega essa tarefa ao sistema operacional (que geralmente possui threads próprias para I/O). A thread principal do Node.js fica livre para continuar processando outros eventos. Quando a operação de I/O é concluída pelo sistema operacional, ele notifica o Node.js, que coloca a função de callback correspondente (ou a resolução da Promise) em uma fila de eventos. O Event Loop constantemente verifica se a pilha de execução principal está vazia e, se estiver, pega o próximo evento da fila e o executa.
*   **Non-Blocking I/O:** Essa abordagem de delegar operações demoradas e continuar processando outras coisas é chamada de I/O não bloqueante. Em contraste, em modelos tradicionais de I/O bloqueante (comuns em outras linguagens/plataformas de servidor), a thread ficaria parada esperando a operação de I/O terminar, consumindo recursos e limitando a capacidade de lidar com muitas conexões simultâneas.

Essa arquitetura torna o Node.js extremamente eficiente para aplicações que passam a maior parte do tempo esperando por operações de I/O (I/O-bound), que é o caso da maioria das aplicações web. Ele consegue lidar com um grande número de conexões simultâneas usando poucos recursos do sistema, pois a thread principal raramente fica ociosa esperando.

No entanto, é importante notar que tarefas que exigem uso intensivo da CPU (CPU-bound), como cálculos matemáticos complexos ou processamento de vídeo, *podem* bloquear a thread principal do Node.js se não forem tratadas adequadamente (por exemplo, dividindo a tarefa, usando Web Workers via módulos específicos, ou até mesmo delegando para outros serviços/processos).

#### Gerenciador de Pacotes npm (comandos essenciais)

Uma das maiores forças do ecossistema Node.js é o **npm (Node Package Manager)**. O npm é duas coisas:

1.  **Um repositório online:** Um vasto registro público (e também privado) de pacotes (bibliotecas, módulos, frameworks, ferramentas) de código aberto escritos em JavaScript.
2.  **Uma ferramenta de linha de comando (CLI):** Instalada automaticamente com o Node.js, usada para interagir com o repositório, instalar e gerenciar dependências (pacotes) em seus projetos Node.js.

O npm facilita enormemente o compartilhamento e a reutilização de código na comunidade JavaScript.

**Inicializando um Projeto Node.js:**

Antes de instalar pacotes, você geralmente inicializa seu projeto Node.js. Navegue até a pasta do seu projeto no terminal e execute:

```bash
npm init
```

Isso iniciará um processo interativo que fará algumas perguntas sobre seu projeto (nome, versão, descrição, ponto de entrada, etc.). Você pode pressionar Enter para aceitar os padrões ou preencher as informações. Para aceitar todos os padrões rapidamente, use:

```bash
npm init -y
```

Este comando cria um arquivo fundamental chamado `package.json` na raiz do seu projeto. Este arquivo contém metadados sobre o projeto e, crucialmente, lista as dependências (pacotes) que seu projeto utiliza.

**Instalando Pacotes:**

Para instalar um pacote do repositório npm e adicioná-lo como dependência do seu projeto, use o comando `npm install` (ou seu atalho `npm i`):

```bash
# Instala o pacote 'lodash' (uma biblioteca popular de utilitários)
npm install lodash

# Instala o pacote 'express' (um framework web popular)
npm i express
```

Quando você instala um pacote:
1.  O npm baixa o pacote do repositório.
2.  Ele o coloca em uma pasta chamada `node_modules` dentro do seu projeto (esta pasta contém todos os pacotes instalados e suas próprias dependências - pode ficar bem grande!).
3.  Ele adiciona automaticamente o pacote e sua versão à seção `dependencies` do seu arquivo `package.json`.
4.  Ele também cria ou atualiza um arquivo `package-lock.json`. Este arquivo registra as versões exatas de todos os pacotes instalados (incluindo dependências das dependências), garantindo que outras pessoas (ou você mesmo em outro ambiente) instalem exatamente as mesmas versões, tornando as builds mais consistentes e reproduzíveis.

**Tipos de Dependências:**

*   **Dependências de Produção (`dependencies`):** Pacotes necessários para que sua aplicação funcione em produção (ex: `express`, `lodash`, drivers de banco de dados). Instaladas com `npm install <nome-pacote>`.
*   **Dependências de Desenvolvimento (`devDependencies`):** Pacotes usados apenas durante o desenvolvimento e teste, não necessários em produção (ex: ferramentas de teste como `jest`, linters como `eslint`, bundlers como `webpack`, `nodemon` para reiniciar o servidor automaticamente). Instaladas com a flag `--save-dev` (ou `-D`).
    ```bash
    npm install --save-dev nodemon
    npm i -D jest
    ```
    Esses pacotes são listados na seção `devDependencies` do `package.json`.

**Outros Comandos npm Úteis:**

*   `npm install` (sem nome de pacote): Instala todas as dependências listadas no `package.json` (útil ao clonar um projeto ou configurar um novo ambiente).
*   `npm update`: Atualiza os pacotes para as versões mais recentes permitidas pelas regras de versionamento no `package.json` e atualiza o `package-lock.json`.
*   `npm uninstall <nome-pacote>` (ou `npm un`): Remove um pacote do `node_modules` e do `package.json`.
*   `npm list`: Lista os pacotes instalados.
*   `npm run <nome-script>`: Executa um script definido na seção `scripts` do `package.json`. É comum definir scripts para iniciar a aplicação, rodar testes, etc.
    ```json
    // Exemplo em package.json
    "scripts": {
      "start": "node index.js",
      "dev": "nodemon index.js",
      "test": "jest"
    }
    ```
    ```bash
    npm start       # Executa 'node index.js'
    npm run dev     # Executa 'nodemon index.js'
    npm test        # Executa 'jest' (atalho especial para 'test')
    ```
*   `npx <comando>`: Executa um pacote de linha de comando sem precisar instalá-lo globalmente ou localmente como dependência de desenvolvimento. O npx baixa temporariamente o pacote, executa o comando e o descarta. Útil para ferramentas que você usa ocasionalmente.
    ```bash
    npx create-react-app meu-app-react # Exemplo: usa o pacote 'create-react-app'
    ```

**`node_modules` e `.gitignore`:** A pasta `node_modules` pode ficar muito grande e contém código de terceiros que pode ser facilmente reinstalado usando `npm install` com base no `package.json` e `package-lock.json`. Portanto, você **nunca** deve versionar (commitar no Git) a pasta `node_modules`. Adicione `node_modules/` ao seu arquivo `.gitignore`.

#### Módulos em Node.js (CommonJS vs ES Modules)

Assim como no navegador, a modularização é essencial em Node.js. Historicamente, Node.js utilizava um sistema de módulos síncrono chamado **CommonJS (CJS)**.

**CommonJS (require / module.exports):**

*   **Exportando:** Você anexa propriedades (ou atribui um novo objeto/função/valor) ao objeto especial `module.exports` (ou seu atalho `exports`).
    ```javascript
    // matematica.js (CommonJS)
    const somar = (a, b) => a + b;
    const subtrair = (a, b) => a - b;
    const PI = 3.14;

    // Exportando múltiplos itens
    module.exports.somar = somar;
    module.exports.subtrair = subtrair;
    module.exports.PI = PI;

    // Ou (forma mais comum):
    // module.exports = {
    //   somar: somar,
    //   subtrair: subtrair,
    //   PI: PI
    // };

    // Exportando um único item (ex: uma classe ou função)
    // class MinhaClasse { ... }
    // module.exports = MinhaClasse;
    ```
*   **Importando:** Você usa a função `require()`, passando o caminho relativo ou o nome do módulo (para módulos nativos do Node ou pacotes instalados via npm). `require` retorna o que foi atribuído a `module.exports` no outro arquivo.
    ```javascript
    // app.js (CommonJS)

    // Importando o módulo local
    const matematica = require("./matematica.js");

    // Importando um módulo nativo do Node
    const fs = require("fs");

    // Importando um pacote instalado via npm
    const _ = require("lodash");

    console.log(matematica.PI);
    console.log(matematica.somar(2, 3));

    // Usando o módulo fs (exemplo)
    fs.readFile("arquivo.txt", "utf8", (err, data) => { /* ... */ });
    ```
    CommonJS é síncrono (o `require` bloqueia até o módulo ser carregado e executado) e foi o padrão no Node.js por muitos anos.

**ES Modules (import / export):**

Conforme vimos na seção de cliente, ES Modules (ESM) é o sistema de módulos padrão da linguagem JavaScript moderna. As versões mais recentes do Node.js têm suporte estável para ESM.

*   **Exportando:** Usa `export` e `export default` (exatamente como no cliente).
    ```javascript
    // utils.mjs (ES Module - note a extensão .mjs ou configuração no package.json)
    export const multiplicar = (a, b) => a * b;
    export default function dividir(a, b) {
      if (b === 0) throw new Error("Divisão por zero");
      return a / b;
    }
    ```
*   **Importando:** Usa `import` (exatamente como no cliente).
    ```javascript
    // main.mjs (ES Module)
    import dividirPadrao, { multiplicar } from "./utils.mjs";
    import fs from "fs/promises"; // Módulos nativos com suporte a Promise/ESM
    import _ from "lodash"; // Muitos pacotes npm modernos suportam ESM

    console.log(multiplicar(4, 5));
    console.log(dividirPadrao(10, 2));

    async function lerArquivo() {
      try {
        const data = await fs.readFile("outro_arquivo.txt", "utf8");
        console.log(data);
      } catch (err) { console.error(err); }
    }
    lerArquivo();
    ```

**Como Usar ES Modules no Node.js:**

Você tem duas opções principais:
1.  **Extensão `.mjs`:** Salve seus arquivos de módulo com a extensão `.mjs` em vez de `.js`. Node.js tratará esses arquivos como ES Modules.
2.  **`package.json`:** Adicione a seguinte linha ao seu `package.json`:
    ```json
    { 
      "type": "module",
      ...
    }
    ```
    Com isso, Node.js tratará todos os arquivos `.js` no projeto como ES Modules por padrão. Se você precisar usar CommonJS em algum arquivo específico nesse modo, pode renomeá-lo para `.cjs`.

**Qual usar?** ES Modules é o padrão moderno da linguagem JavaScript e oferece vantagens como análise estática (melhor para otimizações e ferramentas) e suporte a `await` no nível superior (top-level await) em versões recentes. Para novos projetos Node.js, é recomendado usar ES Modules. No entanto, você ainda encontrará muito código e muitos pacotes que usam CommonJS, então é essencial entender ambos os sistemas.

Com esta introdução, você tem uma visão geral do que é o Node.js, sua arquitetura orientada a eventos, como gerenciar pacotes com npm e os sistemas de módulos disponíveis. No próximo capítulo, exploraremos alguns dos módulos essenciais incorporados ao Node.js para interagir com o sistema de arquivos, rede e eventos.


### Módulos Essenciais do Node.js

Node.js vem com um conjunto de módulos incorporados (built-in) que fornecem funcionalidades fundamentais para interagir com o sistema operacional, a rede e outros aspectos do ambiente do servidor, sem a necessidade de instalar pacotes externos. Vamos explorar alguns dos mais importantes e frequentemente utilizados.

Para usar esses módulos em seu código (assumindo que você está usando ES Modules, conforme recomendado para novos projetos), você os importa usando a sintaxe `import`.

```javascript
// Exemplo de importação de módulos nativos (ESM)
import fs from 'fs'; // Para interagir com o sistema de arquivos
import path from 'path'; // Para trabalhar com caminhos de arquivos e diretórios
import http from 'http'; // Para criar servidores HTTP
import { EventEmitter } from 'events'; // Para trabalhar com eventos

// Para versões mais antigas ou CommonJS, seria:
// const fs = require('fs');
// const path = require('path');
// const http = require('http');
// const EventEmitter = require('events');
```

#### `fs` (File System): Leitura e Escrita de Arquivos

O módulo `fs` fornece uma API para interagir com o sistema de arquivos do servidor de uma maneira modelada segundo as funções POSIX padrão. Ele permite ler, escrever, atualizar, deletar e obter informações sobre arquivos e diretórios.

O módulo `fs` oferece duas abordagens principais para a maioria das operações:

1.  **Assíncrona:** Métodos não bloqueantes que usam callbacks (no estilo error-first) ou retornam Promises (usando `fs.promises`). Esta é a **abordagem recomendada** para aplicações Node.js, pois não bloqueia o Event Loop.
2.  **Síncrona:** Métodos que bloqueiam a execução até que a operação seja concluída (geralmente têm `Sync` no final do nome, como `readFileSync`). Devem ser **evitados** em servidores ou código que precise lidar com concorrência, mas podem ser úteis em scripts simples ou tarefas de inicialização.

**Usando `fs.promises` (Recomendado com Async/Await):**

```javascript
import fs from 'fs/promises'; // Importa a versão baseada em Promises
import path from 'path';

// __dirname não está disponível diretamente em ES Modules, uma alternativa:
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const caminhoArquivo = path.join(__dirname, 'meu_arquivo.txt');
const caminhoNovoArquivo = path.join(__dirname, 'novo_arquivo.txt');
const caminhoDiretorio = path.join(__dirname, 'meu_diretorio');

async function operacoesComArquivos() {
  try {
    // --- Escrita de Arquivo (sobrescreve se existir) ---
    console.log(`Escrevendo em: ${caminhoArquivo}`);
    await fs.writeFile(caminhoArquivo, 'Olá, Node.js FS Promises!\nLinha 2.', 'utf8');
    console.log('Arquivo escrito com sucesso.');

    // --- Leitura de Arquivo ---
    console.log(`Lendo de: ${caminhoArquivo}`);
    const conteudo = await fs.readFile(caminhoArquivo, 'utf8');
    console.log('Conteúdo do arquivo:', conteudo);

    // --- Adicionar conteúdo (Append) ---
    console.log(`Adicionando ao arquivo: ${caminhoArquivo}`);
    await fs.appendFile(caminhoArquivo, '\nLinha adicionada.', 'utf8');
    console.log('Conteúdo adicionado.');

    // --- Renomear/Mover Arquivo ---
    console.log(`Renomeando ${caminhoArquivo} para ${caminhoNovoArquivo}`);
    await fs.rename(caminhoArquivo, caminhoNovoArquivo);
    console.log('Arquivo renomeado.');

    // --- Criar Diretório ---
    console.log(`Criando diretório: ${caminhoDiretorio}`);
    await fs.mkdir(caminhoDiretorio, { recursive: true }); // recursive: true cria pais se necessário
    console.log('Diretório criado.');

    // --- Ler Diretório ---
    console.log(`Lendo diretório: ${__dirname}`);
    const arquivosNoDiretorio = await fs.readdir(__dirname);
    console.log('Arquivos/Pastas no diretório:', arquivosNoDiretorio);

    // --- Obter Informações (Stats) ---
    console.log(`Obtendo informações de: ${caminhoNovoArquivo}`);
    const stats = await fs.stat(caminhoNovoArquivo);
    console.log('É arquivo?', stats.isFile());
    console.log('É diretório?', stats.isDirectory());
    console.log('Tamanho:', stats.size, 'bytes');
    console.log('Data de criação:', stats.birthtime);

    // --- Remover Arquivo ---
    console.log(`Removendo arquivo: ${caminhoNovoArquivo}`);
    await fs.unlink(caminhoNovoArquivo);
    console.log('Arquivo removido.');

    // --- Remover Diretório (deve estar vazio) ---
    console.log(`Removendo diretório: ${caminhoDiretorio}`);
    await fs.rmdir(caminhoDiretorio);
    console.log('Diretório removido.');

    // Para remover diretórios não vazios (versões mais recentes do Node):
    // await fs.rm(caminhoDiretorio, { recursive: true, force: true });

  } catch (erro) {
    console.error('Ocorreu um erro no FS:', erro);
  }
}

operacoesComArquivos();
```

**Exemplo com Callbacks (Abordagem mais antiga):**

```javascript
import fsCallback from 'fs'; // Importa a versão baseada em Callbacks
import path from 'path';
import { fileURLToPath } from 'url';
const __filename_cb = fileURLToPath(import.meta.url);
const __dirname_cb = path.dirname(__filename_cb);
const caminhoArquivo_cb = path.join(__dirname_cb, 'arquivo_callback.txt');

console.log('Iniciando operações com callbacks...');

fsCallback.writeFile(caminhoArquivo_cb, 'Teste com callback.', 'utf8', (erroEscrita) => {
  if (erroEscrita) {
    console.error('Erro ao escrever (callback):', erroEscrita);
    return;
  }
  console.log('Arquivo escrito via callback.');

  fsCallback.readFile(caminhoArquivo_cb, 'utf8', (erroLeitura, conteudo) => {
    if (erroLeitura) {
      console.error('Erro ao ler (callback):', erroLeitura);
      return;
    }
    console.log('Conteúdo lido (callback):', conteudo);

    // ... outras operações aninhadas (potencial callback hell)
    fsCallback.unlink(caminhoArquivo_cb, (erroRemocao) => {
       if (erroRemocao) console.error('Erro ao remover (callback):', erroRemocao);
       else console.log('Arquivo removido (callback).');
    });
  });
});

console.log('Comandos FS com callback iniciados...');
```

**Exemplo Síncrono (Usar com Cautela):**

```javascript
import fsSync from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename_sync = fileURLToPath(import.meta.url);
const __dirname_sync = path.dirname(__filename_sync);
const caminhoArquivo_sync = path.join(__dirname_sync, 'arquivo_sync.txt');

try {
  console.log('Escrevendo arquivo síncrono...');
  fsSync.writeFileSync(caminhoArquivo_sync, 'Conteúdo síncrono.', 'utf8');
  console.log('Leitura síncrona...');
  const conteudoSync = fsSync.readFileSync(caminhoArquivo_sync, 'utf8');
  console.log('Conteúdo (sync):', conteudoSync);
  fsSync.unlinkSync(caminhoArquivo_sync);
  console.log('Arquivo síncrono removido.');
} catch (erro) {
  console.error('Erro síncrono:', erro);
}
console.log('Operações síncronas concluídas.');
```

#### `path`: Manipulação de Caminhos de Arquivos

Trabalhar com caminhos de arquivos e diretórios pode ser complicado devido às diferenças entre sistemas operacionais (Windows usa `\` como separador, enquanto Linux/macOS usam `/`). O módulo `path` fornece utilitários para lidar com caminhos de forma consistente e independente do sistema operacional.

```javascript
import path from 'path';

// --- Junção de Caminhos (Forma segura e multiplataforma) ---
const meuDiretorio = '/home/usuario/documentos';
const meuArquivo = 'relatorio.pdf';
const caminhoCompleto = path.join(meuDiretorio, 'subpasta', meuArquivo);
console.log('Caminho juntado:', caminhoCompleto); // Ex: /home/usuario/documentos/subpasta/relatorio.pdf (Linux/macOS)
                                                // Ex: \home\usuario\documentos\subpasta\relatorio.pdf (Windows - o path.join usa o separador correto)

// --- Resolução de Caminhos (Transforma caminhos relativos em absolutos) ---
const caminhoRelativo = '../imagens/logo.png';
const caminhoAbsoluto = path.resolve(caminhoRelativo);
console.log('Caminho resolvido:', caminhoAbsoluto); // Ex: /home/usuario/imagens/logo.png (depende do diretório atual)
const caminhoAbsolutoBase = path.resolve('/app/data', caminhoRelativo);
console.log('Caminho resolvido com base:', caminhoAbsolutoBase); // Ex: /app/imagens/logo.png

// --- Obter Nome do Diretório Pai ---
const diretorioPai = path.dirname(caminhoCompleto);
console.log('Diretório pai:', diretorioPai); // Ex: /home/usuario/documentos/subpasta

// --- Obter Nome do Arquivo/Pasta Final ---
const nomeBase = path.basename(caminhoCompleto);
console.log('Nome base:', nomeBase); // Ex: relatorio.pdf
const nomeBaseSemExt = path.basename(caminhoCompleto, '.pdf');
console.log('Nome base sem extensão:', nomeBaseSemExt); // Ex: relatorio

// --- Obter Extensão do Arquivo ---
const extensao = path.extname(caminhoCompleto);
console.log('Extensão:', extensao); // Ex: .pdf

// --- Objeto com Partes do Caminho ---
const partesCaminho = path.parse(caminhoCompleto);
console.log('Partes do caminho:', partesCaminho);
// Saída:
// {
//   root: '/',
//   dir: '/home/usuario/documentos/subpasta',
//   base: 'relatorio.pdf',
//   ext: '.pdf',
//   name: 'relatorio'
// }

// --- Separador Específico do SO ---
console.log('Separador do SO:', path.sep); // Ex: '/' (Linux/macOS), '\' (Windows)

// --- Normalizar Caminho (Resolve '.', '..', barras duplicadas) ---
const caminhoBaguncado = '/home/usuario/./documentos/../relatorios/final//relatorio.pdf';
const caminhoNormalizado = path.normalize(caminhoBaguncado);
console.log('Caminho normalizado:', caminhoNormalizado); // Ex: /home/usuario/relatorios/final/relatorio.pdf
```

Usar `path.join` e `path.resolve` é crucial para garantir que seu código funcione corretamente em diferentes sistemas operacionais.

#### `http`: Criação de Servidores HTTP Básicos

O módulo `http` permite criar servidores HTTP e fazer requisições HTTP (embora para requisições do cliente para outros servidores, a API `fetch` seja geralmente preferível em versões mais recentes do Node, ou bibliotecas como `axios`).

Vamos focar na criação de um servidor HTTP simples:

```javascript
import http from 'http';

const hostname = '127.0.0.1'; // Endereço local (localhost)
const port = 3000; // Porta onde o servidor vai escutar

// Cria o servidor. A função passada para createServer é um listener
// que será executado para CADA requisição recebida.
const server = http.createServer((req, res) => {
  // req: Objeto IncomingMessage (informações da requisição do cliente)
  // res: Objeto ServerResponse (para enviar a resposta ao cliente)

  console.log(`Requisição recebida: ${req.method} ${req.url}`);

  // --- Roteamento Básico ---
  if (req.url === '/') {
    // Define o status code da resposta (200 OK)
    res.statusCode = 200;
    // Define o tipo de conteúdo da resposta
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Escreve o corpo da resposta
    res.end('<h1>Página Inicial</h1><p>Bem-vindo ao servidor Node.js!</p>');

  } else if (req.url === '/sobre') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>Sobre Nós</h1>');

  } else if (req.url === '/api/dados') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const dados = { mensagem: 'Dados da API', timestamp: Date.now() };
    res.end(JSON.stringify(dados)); // Envia JSON como string

  } else {
    // --- Rota não encontrada (404) ---
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<h1>404 - Página Não Encontrada</h1>');
  }
});

// Inicia o servidor e o faz escutar na porta e hostname definidos
server.listen(port, hostname, () => {
  console.log(`Servidor rodando em http://${hostname}:${port}/`);
});

// --- Para parar o servidor (ex: após um tempo ou comando) ---
// setTimeout(() => {
//   server.close(() => {
//     console.log('Servidor encerrado.');
//   });
// }, 10000); // Fecha após 10 segundos
```

Para rodar este código:
1.  Salve-o como `servidor.js` (ou `.mjs`).
2.  Execute no terminal: `node servidor.js`
3.  Abra seu navegador e acesse `http://127.0.0.1:3000/`, `http://127.0.0.1:3000/sobre`, `http://127.0.0.1:3000/api/dados` e `http://127.0.0.1:3000/outra`. Observe a saída no terminal e no navegador.

O objeto `req` (requisição) contém informações como `req.url`, `req.method`, `req.headers`, e permite ler o corpo da requisição (para POST, PUT, etc., que é um pouco mais complexo com o módulo `http` puro).

O objeto `res` (resposta) permite definir o `res.statusCode`, `res.setHeader()`, e enviar o corpo da resposta com `res.write()` (para streaming) e/ou `res.end()` (finaliza a resposta).

Embora seja possível criar servidores complexos apenas com o módulo `http`, frameworks como o **Express.js** (que veremos a seguir) simplificam enormemente tarefas como roteamento, manipulação de requisições/respostas, middleware, etc.

#### `events`: Emissão e Escuta de Eventos

Node.js é fortemente baseado em eventos. Muitos objetos no Node.js (como servidores HTTP, streams de leitura/escrita) emitem eventos para sinalizar que algo aconteceu. O módulo `events` fornece a classe `EventEmitter`, que é a base para todos os objetos que emitem eventos.

Você pode usar `EventEmitter` para criar seus próprios sistemas de eventos personalizados.

```javascript
import { EventEmitter } from 'events';

// Criar uma classe que herda de EventEmitter ou usar uma instância diretamente
class MeuEmissor extends EventEmitter {}

const meuEmissor = new MeuEmissor();

// --- Registrar Listeners (Ouvintes) ---

// Listener para o evento 'dadosRecebidos'
function listenerDados1(dados) {
  console.log('[Listener 1] Dados recebidos:', dados);
}
meuEmissor.on('dadosRecebidos', listenerDados1);

// Outro listener para o mesmo evento
meuEmissor.on('dadosRecebidos', (dados) => {
  console.log(`[Listener 2] Recebeu dados: ${JSON.stringify(dados)}. Processando...`);
});

// Listener para o evento 'erro'
meuEmissor.on('erro', (err) => {
  console.error('Ocorreu um erro no emissor:', err.message);
});

// Listener que executa apenas uma vez
meuEmissor.once('conexao', () => {
  console.log('Conexão estabelecida (listener único)!');
});

// --- Emitir Eventos ---
console.log("Emitindo evento 'conexao'...");
meuEmissor.emit('conexao');
meuEmissor.emit('conexao'); // Este segundo emit 'conexao' não aciona o listener 'once'

console.log("Emitindo evento 'dadosRecebidos'...");
meuEmissor.emit('dadosRecebidos', { id: 1, valor: 'abc' });

console.log("Emitindo evento 'outroEvento' (sem listener)...");
meuEmissor.emit('outroEvento'); // Não acontece nada se não houver listener

console.log("Emitindo evento 'erro'...");
meuEmissor.emit('erro', new Error('Falha simulada'));

// --- Remover Listeners ---
console.log("Removendo Listener 1 de 'dadosRecebidos'...");
meuEmissor.removeListener('dadosRecebidos', listenerDados1);
// Ou: meuEmissor.off('dadosRecebidos', listenerDados1);

console.log("Emitindo 'dadosRecebidos' novamente...");
meuEmissor.emit('dadosRecebidos', { id: 2, valor: 'xyz' }); // Apenas o Listener 2 será chamado

// Remover todos os listeners de um evento
// meuEmissor.removeAllListeners('dadosRecebidos');

// Obter número de listeners para um evento
console.log(`Número de listeners para 'dadosRecebidos': ${meuEmissor.listenerCount('dadosRecebidos')}`);
```

O padrão `EventEmitter` é fundamental para entender como muitos módulos do Node.js funcionam internamente e para construir aplicações modulares e desacopladas.

#### Exercícios Práticos: Módulos Node.js

1.  **Manipulador de Arquivos Simples:**
    *   Crie um arquivo `notas.txt` com algum conteúdo inicial.
    *   Escreva um script Node.js (`gerenciador_notas.js`) usando `fs.promises` e `async/await` que:
        *   Leia o conteúdo de `notas.txt` e imprima no console.
        *   Adicione uma nova linha ao final de `notas.txt` com a data e hora atual.
        *   Leia o conteúdo atualizado e imprima novamente.
2.  **Listador de Arquivos de Diretório:**
    *   Crie um script `listar_arquivos.js` que use `fs.promises` e `path`.
    *   O script deve aceitar um caminho de diretório como argumento da linha de comando (use `process.argv[2]`). Se nenhum argumento for fornecido, use o diretório atual (`.`)
    *   Use `fs.readdir` para listar todos os arquivos e subdiretórios no caminho fornecido.
    *   Para cada item listado, use `fs.stat` para verificar se é um arquivo ou um diretório e imprima essa informação junto com o nome do item (ex: `[D] node_modules` ou `[F] package.json`). Use `path.join` para construir os caminhos para `fs.stat`.
3.  **Servidor HTTP Básico com Rotas:**
    *   Crie um script `meu_servidor.js` usando o módulo `http`.
    *   Faça o servidor escutar na porta 3001.
    *   Implemente as seguintes rotas:
        *   `/`: Responde com `<h1>Bem-vindo!</h1>` (Content-Type: text/html)
        *   `/hora`: Responde com a hora atual em formato JSON (ex: `{"horaAtual":"HH:MM:SS"}`) (Content-Type: application/json)
        *   Qualquer outra rota: Responde com `<h1>Erro 404</h1>` e status code 404.
    *   Teste as rotas no seu navegador.
4.  **Emissor de Eventos Personalizado:**
    *   Crie uma classe `Logger` que herda de `EventEmitter`.
    *   Adicione um método `log(mensagem)` à classe `Logger`. Este método deve:
        *   Imprimir a mensagem no console.
        *   Emitir um evento `'mensagemLogada'` com a mensagem como dado.
    *   Crie uma instância do `Logger`.
    *   Registre um listener para o evento `'mensagemLogada'` que imprima algo como `Evento 'mensagemLogada' recebido: [mensagem]`.
    *   Chame o método `logger.log()` algumas vezes com mensagens diferentes e observe a saída.

Estes módulos essenciais formam a base para muitas tarefas comuns no desenvolvimento back-end com Node.js. Compreendê-los bem abrirá caminho para a construção de aplicações mais complexas, especialmente quando combinados com frameworks como o Express.js, que veremos a seguir.


### Framework Express.js

Embora seja possível construir aplicações web e APIs usando apenas o módulo `http` nativo do Node.js, como vimos no exemplo anterior, rapidamente percebemos que tarefas comuns como roteamento complexo, gerenciamento de requisições e respostas, e organização da aplicação podem se tornar verbosas e repetitivas. É aqui que entram os frameworks web para Node.js, e o mais popular e influente deles é, sem dúvida, o **Express.js** (ou simplesmente Express).

Express é um framework minimalista e flexível para Node.js, projetado para facilitar a construção de aplicações web e APIs. Ele fornece um conjunto robusto de recursos sobre o módulo `http`, simplificando o desenvolvimento back-end sem impor uma estrutura rígida.

#### Introdução ao Express

Principais características e benefícios do Express:

*   **Roteamento:** Define de forma clara e organizada como a aplicação responde a requisições de clientes para diferentes URLs (endpoints) e métodos HTTP (GET, POST, PUT, DELETE, etc.).
*   **Middleware:** Um conceito central no Express. Middleware são funções que têm acesso aos objetos de requisição (`req`), resposta (`res`) e à próxima função de middleware no ciclo de requisição-resposta da aplicação. Eles podem executar código, fazer alterações nos objetos `req` e `res`, encerrar o ciclo ou chamar o próximo middleware. Isso permite modularizar funcionalidades como logging, autenticação, validação, compressão, etc.
*   **Manipulação de Requisição/Resposta:** Oferece métodos auxiliares convenientes nos objetos `req` e `res` para acessar dados da requisição (parâmetros de rota, query strings, corpo da requisição) e enviar respostas (HTML, JSON, arquivos, redirecionamentos).
*   **Integração com Template Engines:** Facilita a renderização de HTML dinâmico no servidor usando diversas template engines (como EJS, Handlebars, Pug).
*   **Foco em Performance:** Express é leve e não adiciona muita sobrecarga ao Node.js.
*   **Vasto Ecossistema:** Por ser tão popular, existe uma enorme quantidade de middleware e ferramentas de terceiros disponíveis via npm que se integram facilmente com o Express.

#### Instalação e Configuração Básica

Para usar o Express, primeiro precisamos instalá-lo como uma dependência do nosso projeto usando npm.

1.  **Certifique-se de ter um projeto Node.js inicializado** (com um arquivo `package.json`). Se não tiver, execute `npm init -y` na pasta do seu projeto.
2.  **Instale o Express:**
    ```bash
    npm install express
    ```
    Isso adicionará o `express` às `dependencies` no seu `package.json`.

Agora, vamos criar um servidor Express básico. Crie um arquivo (ex: `app.js` ou `server.js`):

```javascript
// app.js
import express from 'express'; // Importa o Express (ESM)
// const express = require('express'); // (CommonJS)

// Cria uma instância da aplicação Express
const app = express();

// Define a porta onde o servidor vai rodar
// É uma boa prática usar variáveis de ambiente para a porta, mas começaremos com um valor fixo.
const port = 3000;

// --- Define uma rota básica para o caminho raiz ('/') --- 
// app.METHOD(PATH, HANDLER)
// METHOD: Método HTTP (get, post, put, delete, etc.) em minúsculas.
// PATH: O caminho da URL.
// HANDLER: A função que será executada quando a rota for acessada.
//          Recebe os objetos de requisição (req) e resposta (res).
app.get('/', (req, res) => {
  // req: Contém informações sobre a requisição (headers, query params, etc.)
  // res: Usado para enviar a resposta de volta ao cliente

  // res.send() é um método útil do Express para enviar vários tipos de resposta.
  // Ele define automaticamente o Content-Type (aqui, text/html).
  res.send('<h1>Olá, Mundo com Express!</h1>');
});

app.get('/sobre', (req, res) => {
  res.send('<h2>Página Sobre</h2><p>Aplicação de exemplo com Express.</p>');
});

// --- Inicia o servidor e o faz escutar na porta especificada ---
app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}. Acesse http://localhost:${port}`);
});
```

Para rodar:
```bash
node app.js
```

Acesse `http://localhost:3000` e `http://localhost:3000/sobre` no navegador. Você verá que criar um servidor e definir rotas é significativamente mais simples do que com o módulo `http` puro.

#### Roteamento (GET, POST, PUT, DELETE)

O roteamento define como a aplicação responde a uma requisição do cliente para um endpoint específico (uma combinação de um caminho URI e um método HTTP).

Sintaxe geral: `app.METHOD(PATH, HANDLER)`

*   `app`: A instância da sua aplicação Express.
*   `METHOD`: Um método HTTP em minúsculas (`get`, `post`, `put`, `delete`, `patch`, etc.).
*   `PATH`: Uma string que define o caminho da rota. Pode conter parâmetros de rota.
*   `HANDLER`: Uma função (ou múltiplas funções de middleware) que é executada quando a rota corresponde. Recebe `req`, `res`, e opcionalmente `next` (para passar para o próximo middleware).

**Exemplos de Rotas:**

```javascript
import express from 'express';
const app = express();
const port = 3000;

// Rota GET para a raiz
app.get('/', (req, res) => {
  res.send('Página Inicial (GET)');
});

// Rota POST para /usuarios (ex: criar um novo usuário)
// Para receber dados no corpo de requisições POST/PUT, precisamos de um middleware.
// Express inclui middleware para parsear JSON e dados de formulário URL-encoded.
app.use(express.json()); // Middleware para parsear corpo de requisição JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear corpo URL-encoded

app.post('/usuarios', (req, res) => {
  console.log('Corpo da Requisição (POST /usuarios):', req.body); // req.body contém os dados parseados
  const novoUsuario = req.body;
  // Lógica para salvar o novo usuário no banco de dados...
  res.status(201).send(`Usuário ${novoUsuario.nome} criado com sucesso!`); // status(201) para Created
});

// Rota GET com Parâmetro de Rota (:id)
// O Express extrai o valor do parâmetro e o coloca em req.params
app.get('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  console.log('ID do Usuário solicitado:', userId);
  // Lógica para buscar o usuário com o ID especificado...
  res.send(`Detalhes do Usuário com ID: ${userId}`);
});

// Rota PUT para /usuarios/:id (ex: atualizar um usuário existente)
app.put('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  const dadosAtualizacao = req.body;
  console.log(`Atualizando usuário ID: ${userId} com dados:`, dadosAtualizacao);
  // Lógica para atualizar o usuário no banco de dados...
  res.send(`Usuário ${userId} atualizado.`);
});

// Rota DELETE para /usuarios/:id (ex: remover um usuário)
app.delete('/usuarios/:id', (req, res) => {
  const userId = req.params.id;
  console.log(`Removendo usuário ID: ${userId}`);
  // Lógica para remover o usuário do banco de dados...
  res.send(`Usuário ${userId} removido.`);
});

// Rota para lidar com Query Strings (ex: /pesquisa?termo=livro&pagina=1)
// Query strings estão disponíveis em req.query
app.get('/pesquisa', (req, res) => {
  const termo = req.query.termo;
  const pagina = req.query.pagina || 1; // Valor padrão se não fornecido
  console.log(`Pesquisando por: ${termo}, Página: ${pagina}`);
  res.send(`Resultados da pesquisa para "${termo}" na página ${pagina}`);
});

// Rota Curinga (Catch-all) para 404 - Deve ser a última rota
app.use((req, res) => {
  res.status(404).send('Erro 404 - Rota não encontrada');
});

app.listen(port, () => {
  console.log(`Servidor Express rodando na porta ${port}.`);
});
```

**Testando Rotas POST/PUT/DELETE:** Você não pode testar essas rotas diretamente no navegador (que só faz GET). Use ferramentas como `curl` na linha de comando, Postman, Insomnia, ou a extensão Thunder Client no VS Code.

Exemplo com `curl`:
```bash
# POST para criar usuário (envia JSON)
curl -X POST -H "Content-Type: application/json" -d '{"nome":"Carlos","email":"carlos@email.com"}' http://localhost:3000/usuarios

# GET para buscar usuário 123
curl http://localhost:3000/usuarios/123

# PUT para atualizar usuário 123
curl -X PUT -H "Content-Type: application/json" -d '{"email":"carlos.novo@email.com"}' http://localhost:3000/usuarios/123

# DELETE para remover usuário 123
curl -X DELETE http://localhost:3000/usuarios/123
```

#### Middleware (Conceito e Uso)

Middleware são funções que ficam no meio do ciclo de requisição-resposta do Express. Elas têm acesso aos objetos `req`, `res` e a uma função especial chamada `next`.

Funções de middleware podem:
*   Executar qualquer código.
*   Fazer alterações nos objetos `req` e `res` (ex: adicionar propriedades a `req`).
*   Encerrar o ciclo de requisição-resposta (enviando uma resposta com `res.send()`, `res.json()`, etc.).
*   Chamar a próxima função de middleware na pilha usando `next()`.

**Se um middleware não encerrar o ciclo nem chamar `next()`, a requisição ficará parada.**

**Tipos de Middleware:**

*   **Middleware de Nível de Aplicação:** Vinculado à instância `app` usando `app.use()` ou `app.METHOD()`.
*   **Middleware de Nível de Roteador:** Vinculado a uma instância de `express.Router()` (útil para modularizar rotas).
*   **Middleware de Tratamento de Erros:** Middleware especial com 4 argumentos (`err, req, res, next`) para tratar erros que ocorrem durante o processamento da requisição.
*   **Middleware Embutido:** Middleware que vem com o Express (ex: `express.json()`, `express.urlencoded()`, `express.static()`).
*   **Middleware de Terceiros:** Instalado via npm (ex: `cors`, `morgan`, `helmet`, `passport`).

**Exemplo de Middleware Simples:**

```javascript
import express from 'express';
const app = express();
const port = 3000;

// --- Middleware de Nível de Aplicação (executa para TODAS as requisições) ---

// Middleware de Logging Simples
app.use((req, res, next) => {
  const agora = new Date().toISOString();
  console.log(`[${agora}] Recebida: ${req.method} ${req.originalUrl}`);
  next(); // Chama o próximo middleware ou handler da rota
});

// Middleware que adiciona uma propriedade a 'req'
app.use((req, res, next) => {
  req.tempoRequisicao = Date.now();
  next();
});

// Middleware para parsear JSON (embutido)
app.use(express.json());

// --- Rotas ---
app.get('/', (req, res) => {
  const tempo = (Date.now() - req.tempoRequisicao) / 1000;
  res.send(`Página Inicial. Requisição processada em ${tempo} segundos.`);
});

app.post('/dados', (req, res) => {
  console.log('Dados recebidos no POST:', req.body);
  res.json({ status: 'sucesso', dadosRecebidos: req.body });
});

// --- Middleware de Tratamento de Erros (deve ter 4 argumentos) ---
// Este middleware só é chamado se ocorrer um erro em um middleware/rota anterior
// ou se 'next(err)' for chamado.
app.use((err, req, res, next) => {
  console.error('Ocorreu um erro:', err.stack); // Imprime o stack trace do erro
  res.status(500).send('Algo deu errado no servidor!');
});

app.listen(port, () => {
  console.log(`Servidor Express com middleware rodando na porta ${port}.`);
});
```

A ordem em que os middlewares são definidos com `app.use()` ou `app.METHOD()` é importante, pois eles são executados em sequência.

#### Tratamento de Requisições (req) e Respostas (res)

Express adiciona propriedades e métodos úteis aos objetos `req` e `res` nativos do Node.

**Objeto `req` (Requisição):**
*   `req.params`: Objeto contendo parâmetros de rota (ex: de `/usuarios/:id`).
*   `req.query`: Objeto contendo parâmetros de query string (ex: de `/pesquisa?termo=abc`).
*   `req.body`: Objeto contendo o corpo da requisição parseado (requer middleware como `express.json()` ou `express.urlencoded()`).
*   `req.method`: Método HTTP da requisição (`'GET'`, `'POST'`, etc.).
*   `req.url`: URL da requisição (sem o host).
*   `req.originalUrl`: URL original completa.
*   `req.headers`: Objeto com os cabeçalhos da requisição.
*   `req.ip`: Endereço IP do cliente.
*   `req.get(headerName)`: Método para obter um cabeçalho específico (case-insensitive).

**Objeto `res` (Resposta):**
*   `res.send([body])`: Envia a resposta HTTP. Pode enviar strings, HTML, Buffers, objetos/arrays (que serão convertidos para JSON). Define `Content-Type` automaticamente.
*   `res.json([body])`: Envia uma resposta JSON. Converte o objeto/array para JSON e define `Content-Type` para `application/json`.
*   `res.status(code)`: Define o status code HTTP da resposta. Pode ser encadeado (ex: `res.status(404).send(...)`).
*   `res.sendStatus(code)`: Define o status code e envia a descrição padrão como corpo (ex: `res.sendStatus(404)` envia "Not Found").
*   `res.render(viewName, [locals], callback)`: Renderiza um template de view (requer configuração de template engine).
*   `res.redirect([status,] path)`: Redireciona o cliente para outra URL.
*   `res.sendFile(path, [options], callback)`: Envia um arquivo como resposta.
*   `res.set(headerName, value)` ou `res.set({ header1: value1, ... })`: Define cabeçalhos na resposta.
*   `res.type(type)`: Define o `Content-Type` da resposta (ex: `res.type('html')`).
*   `res.end()`: Finaliza a resposta (usado raramente diretamente no Express, `res.send` ou `res.json` geralmente chamam `end` internamente).

#### Servindo Arquivos Estáticos

Para servir arquivos estáticos como HTML, CSS, JavaScript do lado do cliente, imagens, etc., o Express fornece o middleware `express.static()`.

```javascript
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

// Define a pasta 'public' como o diretório para servir arquivos estáticos
// Qualquer arquivo dentro de 'public' será acessível diretamente pela URL
const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));

// Exemplo: Se você tiver um arquivo public/css/style.css
// Ele será acessível em http://localhost:3000/css/style.css

// Exemplo: Se você tiver um arquivo public/index.html
// Ele será acessível em http://localhost:3000/ ou http://localhost:3000/index.html

// Rotas definidas DEPOIS do static ainda funcionarão
app.get('/api/info', (req, res) => {
  res.json({ versao: '1.0', framework: 'Express' });
});

// Se nenhuma rota ou arquivo estático corresponder, pode-se adicionar um 404
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html')); // Exemplo: servir um HTML 404 estático
});

app.listen(port, () => {
  console.log(`Servidor Express com arquivos estáticos rodando na porta ${port}.`);
});
```

Crie uma pasta chamada `public` no mesmo nível do seu `app.js`. Dentro de `public`, coloque um `index.html`, uma pasta `css` com um `style.css`, etc. Ao rodar o servidor, esses arquivos estarão acessíveis.

#### Template Engines (Introdução)

Para gerar HTML dinamicamente no servidor (Server-Side Rendering - SSR), o Express pode se integrar com várias *template engines*. Elas permitem escrever arquivos HTML com placeholders e lógica simples (loops, condicionais) que são processados no servidor para gerar o HTML final antes de enviá-lo ao cliente.

Exemplos populares: EJS, Handlebars (HBS), Pug (anteriormente Jade).

**Exemplo com EJS (Embedded JavaScript Templating):**

1.  Instale o EJS: `npm install ejs`
2.  Configure o Express para usar EJS:

    ```javascript
    import express from 'express';
    import path from 'path';
    import { fileURLToPath } from 'url';

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const app = express();
    const port = 3000;

    // 1. Define EJS como a view engine
    app.set('view engine', 'ejs');

    // 2. Define o diretório onde os arquivos de template (.ejs) estão localizados
    // Por padrão, o Express procura em uma pasta chamada 'views'
    app.set('views', path.join(__dirname, 'views'));

    // Rota que renderiza um template
    app.get('/perfil/:nome', (req, res) => {
      const nomeUsuario = req.params.nome;
      const dadosParaTemplate = {
        tituloPagina: `Perfil de ${nomeUsuario}`,
        usuario: {
          nome: nomeUsuario,
          idade: Math.floor(Math.random() * 30) + 20, // Idade aleatória
          interesses: ['Node.js', 'Express', 'EJS']
        },
        isAdmin: nomeUsuario === 'admin' // Exemplo de lógica condicional
      };

      // 3. Renderiza o template 'perfil.ejs', passando os dados
      res.render('perfil', dadosParaTemplate);
    });

    app.listen(port, () => {
      console.log(`Servidor Express com EJS rodando na porta ${port}.`);
    });
    ```
3.  Crie a pasta `views` e dentro dela o arquivo `perfil.ejs`:

    ```html
    <!-- views/perfil.ejs -->
    <!DOCTYPE html>
    <html>
    <head>
      <title><%= tituloPagina %></title> <%# Imprime o valor da variável tituloPagina %>
      <style>
        body { font-family: sans-serif; }
        .interesses { list-style: square; }
      </style>
    </head>
    <body>
      <h1>Perfil de <%= usuario.nome %></h1>
      <p>Idade: <%= usuario.idade %></p>

      <% if (usuario.interesses && usuario.interesses.length > 0) { %> <%# Bloco de código JS %>
        <h2>Interesses:</h2>
        <ul class="interesses">
          <% usuario.interesses.forEach(interesse => { %> <%# Loop %>
            <li><%= interesse %></li>
          <% }); %>
        </ul>
      <% } else { %>
        <p>Nenhum interesse listado.</p>
      <% } %>

      <% if (isAdmin) { %>
        <p style="color: red; font-weight: bold;">Este usuário é um administrador!</p>
      <% } %>

      <hr>
      <p><a href="/">Voltar (se houver rota)</a></p>

      <%# Incluir outros templates (partials) %>
      <%# <%- include('partials/footer') %> %>
    </body>
    </html>
    ```

    A sintaxe do EJS usa tags especiais:
    *   `<%= ... %>`: Imprime o valor da expressão (com escape HTML).
    *   `<%- ... %>`: Imprime o valor da expressão (sem escape HTML - cuidado com XSS).
    *   `<% ... %>`: Executa código JavaScript (loops, condicionais).
    *   `<%# ... %>`: Comentário.

Ao acessar `http://localhost:3000/perfil/Alice` ou `http://localhost:3000/perfil/admin`, o Express processará o template `perfil.ejs` com os dados fornecidos e enviará o HTML resultante para o navegador.

#### Exercícios Práticos: Express Básico

1.  **Servidor de Citações:**
    *   Crie um novo projeto Node.js e instale o Express.
    *   Crie um array de strings com algumas citações famosas.
    *   Crie um servidor Express que:
        *   Na rota GET `/`, envie uma mensagem de boas-vindas.
        *   Na rota GET `/citacao/aleatoria`, escolha uma citação aleatória do array e a envie como resposta (texto simples ou JSON).
        *   Na rota GET `/citacao/:indice`, envie a citação no índice especificado pelo parâmetro de rota `:indice`. Adicione tratamento para índice inválido (envie status 404).
2.  **Lista de Tarefas Simples (em memória):**
    *   Crie um servidor Express.
    *   Use um array em memória para armazenar objetos de tarefas (ex: `{ id: 1, descricao: "Lavar louça", concluida: false }`). Mantenha um contador para gerar IDs únicos.
    *   Implemente as seguintes rotas:
        *   `GET /tarefas`: Retorna a lista completa de tarefas em JSON.
        *   `POST /tarefas`: Recebe um objeto JSON no corpo da requisição (ex: `{ "descricao": "Comprar pão" }`), cria uma nova tarefa com um ID único e `concluida: false`, adiciona ao array e retorna a tarefa criada com status 201.
        *   `GET /tarefas/:id`: Retorna a tarefa com o ID especificado em JSON (ou 404 se não encontrada).
        *   `PUT /tarefas/:id`: Recebe um objeto JSON no corpo (ex: `{ "concluida": true }`), encontra a tarefa pelo ID, atualiza suas propriedades (apenas as fornecidas) e retorna a tarefa atualizada (ou 404).
        *   `DELETE /tarefas/:id`: Remove a tarefa com o ID especificado do array e retorna status 204 (No Content) ou 404.
    *   Use o Postman ou similar para testar todas as rotas.
3.  **Middleware de Autenticação Simples:**
    *   Crie um middleware chamado `verificarApiKey`.
    *   Este middleware deve verificar se a requisição possui um cabeçalho `X-API-Key` com um valor específico (ex: `senha-secreta`).
    *   Se a chave estiver correta, ele deve chamar `next()`.
    *   Se a chave estiver faltando ou incorreta, ele deve encerrar a requisição enviando um status 401 (Unauthorized) e uma mensagem de erro JSON.
    *   Aplique este middleware a uma rota específica (ex: `GET /protegido`) e teste o acesso com e sem a chave correta usando `curl` ou Postman.

Express simplifica drasticamente o desenvolvimento back-end com Node.js. Dominar o roteamento e o conceito de middleware é fundamental para construir aplicações web e APIs robustas e organizadas. A seguir, focaremos especificamente na construção de APIs RESTful usando Express.


### Construindo APIs RESTful com Node.js e Express

Uma das aplicações mais comuns do Node.js e Express no back-end é a construção de **APIs (Application Programming Interfaces)**, especialmente APIs que seguem o estilo arquitetural **REST (Representational State Transfer)**. APIs RESTful são a espinha dorsal de muitas aplicações web modernas, permitindo que diferentes partes de um sistema (como um front-end web, um aplicativo mobile e outros serviços de back-end) se comuniquem de forma padronizada e desacoplada, geralmente usando o protocolo HTTP e o formato JSON para troca de dados.

#### Princípios REST

REST não é um protocolo ou padrão rígido, mas sim um conjunto de princípios e restrições arquiteturais para projetar sistemas em rede. APIs que aderem a esses princípios são chamadas de RESTful.

Principais princípios/restrições do REST:

1.  **Arquitetura Cliente-Servidor:** Separação clara entre o cliente (que consome a API) e o servidor (que fornece a API). Eles evoluem independentemente.
2.  **Stateless (Sem Estado):** Cada requisição do cliente para o servidor deve conter toda a informação necessária para o servidor entendê-la e processá-la. O servidor não armazena nenhum estado do cliente entre as requisições. A responsabilidade de gerenciar o estado da sessão (se necessário) fica do lado do cliente.
3.  **Cacheable (Cacheável):** As respostas do servidor devem, implicitamente ou explicitamente, indicar se são cacheáveis ou não. Isso permite que clientes ou intermediários armazenem respostas em cache para melhorar a performance e reduzir a carga no servidor.
4.  **Interface Uniforme:** Esta é uma restrição chave que simplifica e desacopla a arquitetura. Ela envolve quatro sub-restrições:
    *   **Identificação de Recursos:** Recursos individuais (como um usuário, um produto, um pedido) são identificados por URIs (Uniform Resource Identifiers) estáveis (ex: `/usuarios/123`, `/produtos/abc`).
    *   **Manipulação de Recursos Através de Representações:** O cliente interage com os recursos através de suas representações (como JSON ou XML). A representação que o cliente recebe pode não ser a forma como o recurso é armazenado internamente no servidor.
    *   **Mensagens Auto-descritivas:** Cada mensagem (requisição/resposta) contém informação suficiente para descrever como processá-la (ex: `Content-Type` indicando o formato da representação, métodos HTTP indicando a ação desejada).
    *   **HATEOAS (Hypermedia as the Engine of Application State):** (O princípio mais maduro e menos frequentemente implementado na prática) As respostas do servidor devem conter links (hipermídia) que guiem o cliente sobre as próximas ações possíveis (ex: um pedido pode conter links para ver detalhes do cliente ou cancelar o pedido).
5.  **Sistema em Camadas (Layered System):** A arquitetura pode ser composta por múltiplas camadas (ex: load balancers, caches, gateways) entre o cliente e o servidor final, mas o cliente interage apenas com a camada imediatamente adjacente, sem conhecer a estrutura completa.
6.  **Código sob Demanda (Code on Demand - Opcional):** O servidor pode, opcionalmente, estender a funcionalidade do cliente enviando código executável (como scripts JavaScript). Este é o único princípio opcional.

Em resumo, APIs RESTful usam URIs para identificar recursos e métodos HTTP padrão para definir as operações a serem realizadas nesses recursos:

*   **GET:** Recuperar uma representação de um recurso (ex: `GET /usuarios` para listar usuários, `GET /usuarios/123` para obter o usuário 123). Operação segura (não deve ter efeitos colaterais) e idempotente (múltiplas chamadas idênticas têm o mesmo efeito).
*   **POST:** Criar um novo recurso subordinado (ex: `POST /usuarios` para criar um novo usuário). Não é seguro nem idempotente.
*   **PUT:** Substituir completamente um recurso existente com os dados fornecidos (ex: `PUT /usuarios/123` para atualizar todos os dados do usuário 123). É idempotente.
*   **PATCH:** Aplicar uma atualização parcial a um recurso existente (ex: `PATCH /usuarios/123` para atualizar apenas o email do usuário 123). Não é necessariamente idempotente (depende da implementação).
*   **DELETE:** Remover um recurso existente (ex: `DELETE /usuarios/123`). É idempotente.

As respostas geralmente usam status codes HTTP padrão (200 OK, 201 Created, 204 No Content, 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 500 Internal Server Error, etc.) para indicar o resultado da operação e JSON como formato para representar os dados.

#### Estrutura de uma API RESTful com Express

Ao construir uma API RESTful com Express, é comum organizar o código de forma modular.

1.  **Arquivo Principal (ex: `server.js` ou `app.js`):**
    *   Importa o Express e outros módulos/middlewares globais (cors, helmet, morgan).
    *   Cria a instância do `app` Express.
    *   Configura middlewares globais (parser de JSON, URL-encoded, logging, segurança).
    *   Define e monta os roteadores para diferentes recursos.
    *   Configura o middleware de tratamento de erros global.
    *   Inicia o servidor (`app.listen`).
2.  **Roteadores (ex: `routes/usuariosRoutes.js`, `routes/produtosRoutes.js`):**
    *   Usa `express.Router()` para criar um mini-aplicativo isolado para um recurso específico.
    *   Define as rotas (GET, POST, PUT, DELETE, PATCH) para aquele recurso.
    *   Importa e usa os controladores correspondentes para lidar com a lógica de cada rota.
3.  **Controladores (ex: `controllers/usuarioController.js`, `controllers/produtoController.js`):**
    *   Contêm a lógica de negócios para cada rota.
    *   Recebem `req` e `res`.
    *   Interagem com os serviços ou diretamente com o modelo de dados (banco de dados).
    *   Formatam e enviam a resposta (`res.json()`, `res.status()`, etc.).
4.  **Serviços (Opcional, ex: `services/authService.js`):**
    *   Camada opcional para encapsular lógica de negócios complexa ou reutilizável que pode ser usada por múltiplos controladores.
5.  **Modelos (ex: `models/Usuario.js`, `models/Produto.js`):**
    *   Representam a estrutura dos dados e fornecem métodos para interagir com o banco de dados (usando um ORM como Sequelize ou um ODM como Mongoose, ou queries diretas).
6.  **Middlewares Específicos (ex: `middlewares/authMiddleware.js`):**
    *   Middlewares que não são globais, mas aplicados a rotas específicas (ex: verificar autenticação antes de acessar certas rotas).

**Exemplo de Estrutura de Pastas:**

```
my-api/
├── node_modules/
├── public/             # (Opcional: para arquivos estáticos, se houver)
├── src/                # (Ou apenas na raiz, dependendo da preferência)
│   ├── controllers/    # Lógica das rotas
│   │   └── usuarioController.js
│   ├── middlewares/    # Middlewares customizados
│   │   └── authMiddleware.js
│   ├── models/         # Interação com banco de dados
│   │   └── Usuario.js
│   ├── routes/         # Definição das rotas
│   │   └── usuariosRoutes.js
│   ├── services/       # (Opcional) Lógica de negócios
│   ├── config/         # (Opcional) Arquivos de configuração
│   │   └── db.js
│   └── app.js          # Configuração principal do Express
├── .env                # Variáveis de ambiente
├── .gitignore
├── package.json
└── package-lock.json
```

#### Implementando Operações CRUD (Create, Read, Update, Delete)

Vamos ver um exemplo simplificado de um CRUD para um recurso "tarefas" (armazenado em memória por enquanto, mas a estrutura seria similar com um banco de dados).

**1. Roteador (`src/routes/tarefasRoutes.js`):**

```javascript
import express from 'express';
import {
  listarTarefas,
  criarTarefa,
  obterTarefaPorId,
  atualizarTarefa,
  deletarTarefa
} from '../controllers/tarefaController.js'; // Importa as funções do controlador

const router = express.Router();

// Define as rotas e associa aos métodos do controlador
router.get('/', listarTarefas);
router.post('/', criarTarefa);
router.get('/:id', obterTarefaPorId);
router.put('/:id', atualizarTarefa); // Usando PUT para substituição completa
router.delete('/:id', deletarTarefa);

// Poderia adicionar PATCH para atualização parcial:
// router.patch('/:id', atualizarParcialmenteTarefa);

export default router;
```

**2. Controlador (`src/controllers/tarefaController.js`):**

```javascript
// Simulação de um "banco de dados" em memória
let tarefas = [
  { id: 1, descricao: "Estudar Node.js", concluida: false },
  { id: 2, descricao: "Fazer compras", concluida: true }
];
let proximoId = 3;

// GET /tarefas
export const listarTarefas = (req, res) => {
  res.status(200).json(tarefas);
};

// POST /tarefas
export const criarTarefa = (req, res) => {
  const { descricao } = req.body; // Assume que o middleware express.json() está ativo

  if (!descricao) {
    return res.status(400).json({ erro: 'Descrição é obrigatória' });
  }

  const novaTarefa = {
    id: proximoId++,
    descricao: descricao,
    concluida: false
  };
  tarefas.push(novaTarefa);
  res.status(201).json(novaTarefa);
};

// Middleware auxiliar para encontrar tarefa por ID (evita repetição)
const encontrarTarefa = (id) => {
    const idNum = parseInt(id, 10);
    if (isNaN(idNum)) return null;
    return tarefas.find(t => t.id === idNum);
}

// GET /tarefas/:id
export const obterTarefaPorId = (req, res) => {
  const tarefa = encontrarTarefa(req.params.id);
  if (!tarefa) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }
  res.status(200).json(tarefa);
};

// PUT /tarefas/:id
export const atualizarTarefa = (req, res) => {
  const idNum = parseInt(req.params.id, 10);
  const { descricao, concluida } = req.body;

  if (isNaN(idNum)) {
      return res.status(400).json({ erro: 'ID inválido' });
  }
  if (typeof descricao !== 'string' || typeof concluida !== 'boolean') {
      return res.status(400).json({ erro: 'Campos \'descricao\' (string) e \'concluida\' (boolean) são obrigatórios para PUT' });
  }

  const indice = tarefas.findIndex(t => t.id === idNum);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  // PUT substitui o recurso inteiro
  tarefas[indice] = { id: idNum, descricao, concluida };
  res.status(200).json(tarefas[indice]);
};

// DELETE /tarefas/:id
export const deletarTarefa = (req, res) => {
  const idNum = parseInt(req.params.id, 10);
   if (isNaN(idNum)) {
      return res.status(400).json({ erro: 'ID inválido' });
  }

  const indice = tarefas.findIndex(t => t.id === idNum);

  if (indice === -1) {
    return res.status(404).json({ erro: 'Tarefa não encontrada' });
  }

  tarefas.splice(indice, 1); // Remove a tarefa do array
  res.status(204).send(); // 204 No Content (sem corpo na resposta)
};
```

**3. Arquivo Principal (`src/app.js`):**

```javascript
import express from 'express';
import tarefasRouter from './routes/tarefasRoutes.js'; // Importa o roteador

const app = express();
const port = 3000;

// Middlewares Globais
app.use(express.json()); // Essencial para req.body em POST/PUT/PATCH

// Middleware de Log Simples (exemplo)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Monta o roteador de tarefas no caminho /api/tarefas
// Todas as rotas definidas em tarefasRouter serão prefixadas com /api/tarefas
// Ex: GET / se torna GET /api/tarefas
// Ex: POST / se torna POST /api/tarefas
// Ex: GET /:id se torna GET /api/tarefas/:id
app.use('/api/tarefas', tarefasRouter);

// Rota raiz apenas para teste
app.get('/', (req, res) => {
  res.send('API de Tarefas está no ar! Acesse /api/tarefas');
});

// Middleware de Tratamento de Erros Genérico (deve ser o último)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Ocorreu um erro interno no servidor' });
});

app.listen(port, () => {
  console.log(`Servidor API RESTful rodando em http://localhost:${port}`);
});
```

Agora, ao rodar `node src/app.js`, você pode interagir com a API nos endpoints `/api/tarefas` e `/api/tarefas/:id` usando os métodos HTTP apropriados.

#### Validação de Dados de Entrada

É **crucial** validar os dados recebidos do cliente (em `req.body`, `req.params`, `req.query`) antes de processá-los ou salvá-los no banco de dados. Isso previne erros, inconsistências e vulnerabilidades de segurança.

Você pode fazer a validação manualmente (como no exemplo `criarTarefa` e `atualizarTarefa`), mas isso pode se tornar repetitivo. Bibliotecas como `express-validator` ou `joi` simplificam muito esse processo.

**Exemplo com `express-validator`:**

1.  Instale: `npm install express-validator`
2.  Use no roteador ou controlador:

    ```javascript
    // Em src/routes/tarefasRoutes.js (exemplo)
    import express from 'express';
    import { body, param, validationResult } from 'express-validator';
    import {
      listarTarefas,
      criarTarefa,
      obterTarefaPorId,
      atualizarTarefa,
      deletarTarefa
    } from '../controllers/tarefaController.js';

    const router = express.Router();

    // Middleware de validação para criação
    const validacaoCriar = [
      body('descricao')
        .trim()
        .notEmpty().withMessage('Descrição não pode ser vazia.')
        .isLength({ min: 3 }).withMessage('Descrição deve ter pelo menos 3 caracteres.')
    ];

    // Middleware de validação para ID (parâmetro)
    const validacaoId = [
        param('id').isInt({ min: 1 }).withMessage('ID deve ser um número inteiro positivo.')
    ];

    // Middleware para checar os resultados da validação
    const checarValidacao = (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ erros: errors.array() });
        }
        next();
    };

    router.get('/', listarTarefas);
    // Aplica validação antes de chamar o controlador
    router.post('/', validacaoCriar, checarValidacao, criarTarefa);
    router.get('/:id', validacaoId, checarValidacao, obterTarefaPorId);
    // Adicionar validações para PUT e DELETE também...
    router.put('/:id', validacaoId, /* validação do body para PUT */ checarValidacao, atualizarTarefa);
    router.delete('/:id', validacaoId, checarValidacao, deletarTarefa);

    export default router;
    ```
    No controlador (`criarTarefa`, `obterTarefaPorId`, etc.), você não precisaria mais fazer a validação básica, pois ela já foi feita pelo middleware do `express-validator`.

#### Tratamento de Erros em APIs

Como vimos, o Express permite definir middlewares de tratamento de erros (com 4 argumentos: `err, req, res, next`). É uma boa prática ter um middleware centralizado no final da sua pilha para capturar erros não tratados e enviar uma resposta padronizada ao cliente.

**Estratégias:**

*   **Erros Síncronos:** Erros lançados em código síncrono dentro de rotas ou middlewares são capturados automaticamente pelo Express e passados para o middleware de erro.
*   **Erros Assíncronos (Promises):** Se você estiver usando Promises (sem `async/await`), erros (rejeições) precisam ser explicitamente passados para `next()` dentro do `.catch()` para que o middleware de erro seja acionado.
    ```javascript
    app.get('/dados-promise', (req, res, next) => {
      buscarDadosComPromise()
        .then(dados => res.json(dados))
        .catch(err => next(err)); // Passa o erro para o middleware de erro
    });
    ```
*   **Erros Assíncronos (Async/Await):** Com `async/await`, você pode usar `try...catch`. Se um erro ocorrer dentro do `try` e você quiser que o middleware de erro global o trate, chame `next(err)` dentro do `catch`. Se você não usar `try...catch` em uma função de rota `async`, erros de Promises rejeitadas serão automaticamente capturados pelo Express (em versões mais recentes) e passados ao middleware de erro.
    ```javascript
    // Opção 1: try/catch e passar para next
    app.get('/dados-async-1', async (req, res, next) => {
      try {
        const dados = await buscarDadosComAwait();
        res.json(dados);
      } catch (err) {
        next(err);
      }
    });

    // Opção 2: Deixar o Express capturar (mais simples em muitos casos)
    app.get('/dados-async-2', async (req, res) => {
      // Se buscarDadosComAwait() rejeitar, o erro vai para o middleware global
      const dados = await buscarDadosComAwait();
      res.json(dados);
    });
    ```
*   **Middleware de Erro Global:**
    ```javascript
    // No final de app.js
    app.use((err, req, res, next) => {
      console.error("----");
      console.error("ERRO DETECTADO:", err.message);
      console.error(err.stack);
      console.error("----");

      // Definir um status code padrão ou baseado no erro
      const statusCode = err.statusCode || 500; // Pode-se criar erros customizados com statusCode

      // Enviar uma resposta JSON padronizada
      res.status(statusCode).json({
        status: 'erro',
        mensagem: err.message || 'Erro interno do servidor',
        // Em desenvolvimento, pode ser útil enviar o stack, mas NUNCA em produção
        // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
      });
    });
    ```

#### Exercícios Práticos: Construindo uma API

1.  **Refatorar Lista de Tarefas:** Pegue o exercício da Lista de Tarefas da seção anterior e refatore-o para usar a estrutura com Roteador (`routes/tarefasRoutes.js`) e Controlador (`controllers/tarefaController.js`) separadamente, montando o roteador no `app.js` com um prefixo como `/api/v1/tarefas`.
2.  **Adicionar Validação:** Instale `express-validator` e adicione validações robustas às rotas de criação (`POST`) e atualização (`PUT`) da API de Tarefas. Verifique se a descrição não está vazia e se `concluida` (no PUT) é um booleano. Retorne erros 400 com mensagens claras se a validação falhar.
3.  **API de Livros (CRUD Completo):** Crie uma nova API RESTful completa para gerenciar uma coleção de livros (em memória por enquanto). Cada livro deve ter `id`, `titulo`, `autor`, `anoPublicacao`.
    *   Implemente endpoints CRUD (`GET /livros`, `POST /livros`, `GET /livros/:id`, `PUT /livros/:id`, `DELETE /livros/:id`).
    *   Use a estrutura Roteador/Controlador.
    *   Adicione validação de entrada para `POST` e `PUT` (título e autor obrigatórios, ano como número).
    *   Implemente tratamento de erros (404 para livro não encontrado, 400 para dados inválidos).
    *   Teste exaustivamente com Postman ou similar.

Construir APIs RESTful é uma habilidade central no desenvolvimento back-end. Express fornece as ferramentas necessárias para criar APIs bem estruturadas, e seguir os princípios REST garante uma comunicação clara e padronizada entre cliente e servidor. O próximo passo crucial é conectar nossa API a um banco de dados real para persistir os dados.


### Integração com Bancos de Dados

Até agora, nossas APIs de exemplo armazenaram dados apenas em memória, o que significa que todos os dados são perdidos quando o servidor é reiniciado. Para construir aplicações reais e persistentes, precisamos integrar nossa aplicação Node.js com um **banco de dados**.

Node.js pode se conectar a uma vasta gama de bancos de dados, tanto relacionais (SQL) quanto NoSQL. A escolha do banco de dados depende dos requisitos específicos da sua aplicação (estrutura dos dados, escalabilidade, consistência, etc.). Neste guia, focaremos em dois dos bancos de dados mais populares solicitados: **MySQL** (relacional) e **MongoDB** (NoSQL/Documentos).

Para interagir com bancos de dados a partir do Node.js, geralmente usamos bibliotecas (drivers) específicas para cada banco de dados, ou abstrações de nível superior como ORMs (Object-Relational Mappers) para SQL e ODMs (Object-Document Mappers) para bancos de dados de documentos como MongoDB.

#### MySQL com Node.js

MySQL é um sistema de gerenciamento de banco de dados relacional (RDBMS) de código aberto extremamente popular, conhecido por sua confiabilidade e desempenho. Os dados são organizados em tabelas com linhas e colunas, e as relações entre tabelas são definidas usando chaves estrangeiras. A linguagem padrão para interagir com bancos de dados relacionais é o SQL (Structured Query Language).

**1. Conectando ao MySQL (usando `mysql2`)**

A biblioteca `mysql2` é um driver MySQL popular para Node.js, conhecido por ser mais rápido e ter suporte a Promises e Prepared Statements, sendo uma substituição comum para a biblioteca `mysql` original.

*   **Instalação:**
    ```bash
    npm install mysql2
    ```
*   **Conexão:** Você pode criar uma conexão única ou, mais recomendado para aplicações web, usar um *pool de conexões*. Um pool gerencia um conjunto de conexões abertas, reutilizando-as para diferentes requisições, o que melhora a performance e a escalabilidade.

    ```javascript
    // config/db_mysql.js (Exemplo de configuração de pool)
    import mysql from 'mysql2/promise'; // Importa a versão com suporte a Promise

    // Use variáveis de ambiente para dados sensíveis em produção!
    const pool = mysql.createPool({
      host: process.env.DB_MYSQL_HOST || 'localhost', // Endereço do servidor MySQL
      user: process.env.DB_MYSQL_USER || 'root', // Usuário do MySQL
      password: process.env.DB_MYSQL_PASSWORD || 'sua_senha_mysql', // Senha do MySQL
      database: process.env.DB_MYSQL_DATABASE || 'meu_banco_de_dados', // Nome do banco de dados
      waitForConnections: true,
      connectionLimit: 10, // Número máximo de conexões no pool
      queueLimit: 0
    });

    // Testa a conexão (opcional)
    pool.getConnection()
      .then(connection => {
        console.log('Conectado ao banco de dados MySQL com sucesso!');
        connection.release(); // Libera a conexão de volta para o pool
      })
      .catch(err => {
        console.error('Erro ao conectar ao MySQL:', err);
      });

    export default pool;
    ```
    *(Lembre-se de criar o banco de dados `meu_banco_de_dados` no seu servidor MySQL antes de executar)*.

**2. Executando Queries SQL**

Com o pool configurado, podemos executar queries SQL.

```javascript
// Exemplo em um controlador (ex: usuarioController.js)
import pool from '../config/db_mysql.js'; // Importa o pool configurado

export const listarUsuariosMySQL = async (req, res, next) => {
  try {
    // Obtém uma conexão do pool e executa a query
    // pool.query() é um atalho para getConnection -> query -> release
    const [rows, fields] = await pool.query('SELECT id, nome, email FROM usuarios');
    // rows: contém as linhas retornadas pela query
    // fields: contém informações sobre as colunas

    res.status(200).json(rows);
  } catch (error) {
    console.error('Erro ao listar usuários (MySQL):', error);
    next(error); // Passa o erro para o middleware de erro global
  }
};

export const criarUsuarioMySQL = async (req, res, next) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) {
    return res.status(400).json({ erro: 'Nome, email e senha são obrigatórios' });
  }

  try {
    // Usando Prepared Statements para segurança (evita SQL Injection)
    // Os valores (?) são substituídos pelos valores no array [nome, email, senhaHash]
    const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    // Idealmente, a senha seria hasheada antes de salvar (ex: com bcrypt)
    const senhaHash = senha; // Simplificação - NÃO FAÇA ISSO EM PRODUÇÃO

    const [result] = await pool.query(sql, [nome, email, senhaHash]);
    // result contém informações sobre a operação (affectedRows, insertId, etc.)

    res.status(201).json({ id: result.insertId, nome, email });
  } catch (error) {
    console.error('Erro ao criar usuário (MySQL):', error);
    // Verificar erros específicos (ex: email duplicado - ER_DUP_ENTRY)
    if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ erro: 'Email já cadastrado.' }); // 409 Conflict
    }
    next(error);
  }
};

// Implementar obterPorId, atualizar, deletar de forma similar...
// GET /usuarios/:id
export const obterUsuarioPorIdMySQL = async (req, res, next) => {
    const { id } = req.params;
    try {
        const sql = 'SELECT id, nome, email FROM usuarios WHERE id = ?';
        const [rows] = await pool.query(sql, [id]);
        if (rows.length === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(200).json(rows[0]);
    } catch (error) {
        console.error('Erro ao obter usuário (MySQL):', error);
        next(error);
    }
};

// DELETE /usuarios/:id
export const deletarUsuarioMySQL = async (req, res, next) => {
    const { id } = req.params;
    try {
        const sql = 'DELETE FROM usuarios WHERE id = ?';
        const [result] = await pool.query(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(204).send(); // No Content
    } catch (error) {
        console.error('Erro ao deletar usuário (MySQL):', error);
        next(error);
    }
};
```
*(Este exemplo assume que existe uma tabela `usuarios` com colunas `id` (auto-incremento, chave primária), `nome`, `email` (unique) e `senha`)*.

**3. ORM (Object-Relational Mapper) - Introdução ao Sequelize**

Escrever SQL manualmente pode ser repetitivo e propenso a erros, especialmente em aplicações complexas. Um ORM como o **Sequelize** mapeia modelos de objetos JavaScript (classes) para tabelas do banco de dados relacional, permitindo que você interaja com o banco usando métodos de objeto em vez de escrever SQL diretamente.

*   **Instalação:**
    ```bash
    npm install sequelize mysql2 # Sequelize usa mysql2 por baixo dos panos
    npm install --save-dev sequelize-cli # Ferramenta de linha de comando (opcional, mas útil)
    ```
*   **Configuração:** Geralmente envolve criar uma instância do Sequelize e definir modelos.

    ```javascript
    // config/db_sequelize.js (Exemplo)
    import { Sequelize } from 'sequelize';

    const sequelize = new Sequelize(
      process.env.DB_MYSQL_DATABASE || 'meu_banco_de_dados',
      process.env.DB_MYSQL_USER || 'root',
      process.env.DB_MYSQL_PASSWORD || 'sua_senha_mysql',
      {
        host: process.env.DB_MYSQL_HOST || 'localhost',
        dialect: 'mysql' // Especifica o dialeto do banco
        // Outras opções: logging, pool, etc.
      }
    );

    // Testar conexão
    sequelize.authenticate()
      .then(() => console.log('Conexão Sequelize com MySQL estabelecida.'))
      .catch(err => console.error('Erro ao conectar com Sequelize:', err));

    export default sequelize;
    ```
*   **Definindo Modelos:** Cada modelo representa uma tabela.

    ```javascript
    // models/UsuarioSequelize.js
    import { DataTypes, Model } from 'sequelize';
    import sequelize from '../config/db_sequelize.js'; // Importa a instância do Sequelize

    class Usuario extends Model {}

    Usuario.init({
      // Define os atributos (colunas)
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nome: {
        type: DataTypes.STRING,
        allowNull: false // Não permite nulo
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Garante unicidade
        validate: { // Adiciona validações
          isEmail: true
        }
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false
        // Hooks para hash de senha podem ser adicionados aqui
      }
    }, {
      // Opções do modelo
      sequelize, // Passa a instância da conexão
      modelName: 'Usuario', // Nome do modelo
      tableName: 'usuarios', // Nome da tabela no banco (opcional, por padrão seria 'Usuarios')
      timestamps: true // Adiciona colunas createdAt e updatedAt automaticamente
      // paranoid: true // Se true, usa "soft delete" (adiciona deletedAt)
    });

    // Sincronizar o modelo com o banco (cria a tabela se não existir)
    // Em produção, é melhor usar Migrations (com sequelize-cli)
    // sequelize.sync({ alter: true }); // Cuidado: alter: true pode perder dados

    export default Usuario;
    ```

**4. CRUD com Sequelize**

Os controladores agora usariam os métodos do modelo Sequelize.

```javascript
// Exemplo em um controlador (ex: usuarioControllerSequelize.js)
import Usuario from '../models/UsuarioSequelize.js'; // Importa o modelo

export const listarUsuariosSeq = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({ attributes: ['id', 'nome', 'email'] }); // Seleciona colunas específicas
    res.status(200).json(usuarios);
  } catch (error) {
    next(error);
  }
};

export const criarUsuarioSeq = async (req, res, next) => {
  try {
    const { nome, email, senha } = req.body;
    // Validações do Sequelize são acionadas aqui
    // Hash da senha deve ser feito aqui antes de criar
    const novoUsuario = await Usuario.create({ nome, email, senha });
    // Retorna o usuário criado (sem a senha, idealmente)
    res.status(201).json({ id: novoUsuario.id, nome: novoUsuario.nome, email: novoUsuario.email });
  } catch (error) {
     // Tratar erros de validação do Sequelize (error.name === 'SequelizeValidationError')
     // Tratar erros de unicidade (error.name === 'SequelizeUniqueConstraintError')
    next(error);
  }
};

export const obterUsuarioPorIdSeq = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, { attributes: ['id', 'nome', 'email'] });
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        next(error);
    }
};

export const deletarUsuarioSeq = async (req, res, next) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ erro: 'Usuário não encontrado' });
        }
        await usuario.destroy(); // Remove o usuário
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Atualizar (PUT/PATCH) também usaria métodos como usuario.update() ou usuario.save()
```

Sequelize (e outros ORMs) adiciona uma camada de abstração que pode acelerar o desenvolvimento e facilitar a manutenção, mas também introduz sua própria complexidade e pode, em alguns casos, gerar queries menos otimizadas que as escritas manualmente.

#### MongoDB com Node.js

MongoDB é um banco de dados NoSQL orientado a documentos, muito popular no ecossistema JavaScript. Em vez de tabelas e linhas, ele armazena dados em **documentos** flexíveis no formato BSON (Binary JSON), agrupados em **coleções**.

**Conceitos NoSQL e MongoDB:**
*   **Schema Flexível:** Documentos em uma mesma coleção não precisam ter exatamente a mesma estrutura (embora geralmente tenham uma estrutura similar).
*   **Documentos (BSON):** Estruturas semelhantes a JSON, mas com tipos de dados adicionais e otimização binária.
*   **Coleções:** Agrupamentos de documentos, análogos a tabelas em SQL.
*   **Não Relacional (Geralmente):** As relações entre documentos são menos formalizadas que em SQL (sem chaves estrangeiras impostas pelo banco). As relações podem ser modeladas por *embedding* (incorporar documentos relacionados dentro de outros) ou *referencing* (armazenar IDs de documentos relacionados).
*   **Escalabilidade Horizontal:** Projetado para escalar horizontalmente (adicionando mais servidores) mais facilmente que muitos bancos SQL tradicionais.

**1. Conectando ao MongoDB (usando `mongodb` driver ou Mongoose)**

*   **Driver Nativo (`mongodb`):** Fornece uma API de nível mais baixo para interagir com o MongoDB.
    *   Instalação: `npm install mongodb`
    *   Conexão:
        ```javascript
        // config/db_mongo_native.js
        import { MongoClient } from 'mongodb';

        const url = process.env.DB_MONGO_URL || 'mongodb://localhost:27017'; // URL de conexão MongoDB
        const dbName = process.env.DB_MONGO_DATABASE || 'minhaAppMongo';

        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

        let db;

        async function conectarMongo() {
          try {
            await client.connect();
            console.log('Conectado ao servidor MongoDB (Native Driver)');
            db = client.db(dbName);
          } catch (err) {
            console.error('Erro ao conectar ao MongoDB:', err);
            process.exit(1); // Sair se não conseguir conectar
          }
        }

        // Função para obter a instância do DB (singleton)
        export const getDb = () => {
            if (!db) {
                throw new Error('Banco de dados não inicializado!');
            }
            return db;
        }

        export default conectarMongo; // Exporta a função para conectar
        ```
        *(Você precisaria chamar `conectarMongo()` na inicialização da sua aplicação)*.

*   **ODM Mongoose:** Biblioteca mais popular para trabalhar com MongoDB no Node.js. Fornece uma camada de abstração sobre o driver nativo, facilitando a modelagem de dados (schemas), validação, casting de tipos, middleware e outras funcionalidades.
    *   Instalação: `npm install mongoose`
    *   Conexão:
        ```javascript
        // config/db_mongoose.js
        import mongoose from 'mongoose';

        const url = process.env.DB_MONGO_URL || 'mongodb://localhost:27017';
        const dbName = process.env.DB_MONGO_DATABASE || 'minhaAppMongo';

        const conectarMongoose = async () => {
          try {
            await mongoose.connect(`${url}/${dbName}`, {
              useNewUrlParser: true,
              useUnifiedTopology: true,
              // useCreateIndex: true, // Não mais necessário nas versões recentes
              // useFindAndModify: false // Não mais necessário nas versões recentes
            });
            console.log('Conectado ao MongoDB com Mongoose');
          } catch (err) {
            console.error('Erro ao conectar com Mongoose:', err);
            process.exit(1);
          }
        };

        export default conectarMongoose;
        ```
        *(Chamar `conectarMongoose()` na inicialização da app)*.

**Usaremos Mongoose nos exemplos a seguir devido à sua popularidade e conveniência.**

**2. Schemas e Models com Mongoose**

Mongoose usa **Schemas** para definir a estrutura esperada dos documentos em uma coleção, incluindo tipos de dados, valores padrão, validações, etc. Um **Model** é uma classe compilada a partir de um Schema, que fornece a interface para criar, consultar, atualizar e deletar documentos do tipo definido pelo Schema.

```javascript
// models/ProdutoMongoose.js
import mongoose from 'mongoose';

// 1. Define o Schema
const produtoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome do produto é obrigatório'], // Validação: obrigatório
    trim: true, // Remove espaços em branco extras
    minlength: 3
  },
  preco: {
    type: Number,
    required: true,
    min: [0, 'Preço não pode ser negativo'] // Validação: mínimo
  },
  descricao: {
    type: String,
    trim: true
  },
  emEstoque: {
    type: Boolean,
    default: true // Valor padrão
  },
  categorias: [String], // Array de strings
  dataCriacao: {
    type: Date,
    default: Date.now // Valor padrão é a data/hora atual
  }
  // Você pode ter campos aninhados também
  // fabricante: {
  //   nome: String,
  //   pais: String
  // }
}, {
  timestamps: true // Adiciona createdAt e updatedAt automaticamente pelo Mongoose
});

// Adicionar índices (opcional, para otimizar consultas)
// produtoSchema.index({ nome: 1 }); // Índice ascendente no nome

// 2. Cria o Model a partir do Schema
// Mongoose automaticamente procura/cria uma coleção com o nome do modelo em minúsculas e pluralizado
// (neste caso, 'produtos')
const Produto = mongoose.model('Produto', produtoSchema);

export default Produto;
```

**3. CRUD com Mongoose**

Os controladores usariam os métodos estáticos e de instância do Model Mongoose.

```javascript
// Exemplo em um controlador (ex: produtoControllerMongoose.js)
import Produto from '../models/ProdutoMongoose.js'; // Importa o modelo Mongoose

export const listarProdutosMongo = async (req, res, next) => {
  try {
    const produtos = await Produto.find(); // Encontra todos os documentos na coleção
    res.status(200).json(produtos);
  } catch (error) {
    next(error);
  }
};

export const criarProdutoMongo = async (req, res, next) => {
  try {
    // Os dados em req.body são validados contra o Schema
    const novoProduto = new Produto(req.body);
    await novoProduto.save(); // Salva o novo documento no banco
    res.status(201).json(novoProduto);
  } catch (error) {
    // Tratar erros de validação do Mongoose (error.name === 'ValidationError')
    if (error.name === 'ValidationError') {
        return res.status(400).json({ erro: 'Dados inválidos', detalhes: error.errors });
    }
    next(error);
  }
};

export const obterProdutoPorIdMongo = async (req, res, next) => {
    try {
        // Verifica se o ID é um ObjectId válido do MongoDB
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
             return res.status(400).json({ erro: 'ID inválido' });
        }
        const produto = await Produto.findById(req.params.id);
        if (!produto) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (error) {
        next(error);
    }
};

export const atualizarProdutoMongo = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
             return res.status(400).json({ erro: 'ID inválido' });
        }
        // Encontra pelo ID e atualiza. { new: true } retorna o documento atualizado.
        // { runValidators: true } garante que as validações do schema sejam aplicadas na atualização.
        const produtoAtualizado = await Produto.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!produtoAtualizado) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.status(200).json(produtoAtualizado);
    } catch (error) {
        if (error.name === 'ValidationError') {
            return res.status(400).json({ erro: 'Dados inválidos', detalhes: error.errors });
        }
        next(error);
    }
};

export const deletarProdutoMongo = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
             return res.status(400).json({ erro: 'ID inválido' });
        }
        const produtoDeletado = await Produto.findByIdAndDelete(req.params.id);
        if (!produtoDeletado) {
            return res.status(404).json({ erro: 'Produto não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};
```

Mongoose simplifica muito a interação com MongoDB, fornecendo uma estrutura clara através de Schemas e Models, além de validações e outras conveniências.

#### Exercícios Práticos: Bancos de Dados

*(Estes exercícios requerem que você tenha um servidor MySQL e/ou MongoDB rodando localmente ou acessível)*

1.  **API de Tarefas com MySQL e Sequelize:**
    *   Configure o Sequelize em seu projeto da API de Tarefas.
    *   Crie um modelo `Tarefa` com Sequelize (campos: `id`, `descricao`, `concluida`, `createdAt`, `updatedAt`).
    *   Modifique o `tarefaController.js` para usar os métodos do modelo Sequelize (`findAll`, `create`, `findByPk`, `update`, `destroy`) em vez do array em memória.
    *   Use o `sequelize.sync()` (ou migrations com `sequelize-cli`) para criar a tabela no banco.
    *   Teste todas as rotas CRUD da API, verificando se os dados persistem no MySQL.
2.  **API de Livros com MongoDB e Mongoose:**
    *   Configure o Mongoose em seu projeto da API de Livros.
    *   Crie um Schema e um Model `Livro` com Mongoose (campos: `titulo`, `autor`, `anoPublicacao`, `createdAt`, `updatedAt`). Adicione validações apropriadas.
    *   Modifique o `livroController.js` para usar os métodos do modelo Mongoose (`find`, `create`/`save`, `findById`, `findByIdAndUpdate`, `findByIdAndDelete`).
    *   Teste todas as rotas CRUD da API, verificando se os dados persistem no MongoDB.
3.  **Consulta Avançada (Qualquer Banco):**
    *   Na sua API (Tarefas ou Livros), adicione uma nova rota `GET` que permita filtrar os resultados com base em query parameters. Por exemplo:
        *   API Tarefas: `GET /api/v1/tarefas?concluida=true` (retorna apenas tarefas concluídas).
        *   API Livros: `GET /api/v1/livros?autor=NomeAutor` (retorna livros de um autor específico).
    *   Implemente a lógica no controlador para usar as funcionalidades de consulta do Sequelize (`where: { concluida: true }`) ou Mongoose (`find({ concluida: true })`) para filtrar os resultados.

A integração com bancos de dados é um passo fundamental para tornar suas aplicações Node.js úteis e persistentes. A escolha entre SQL (como MySQL com Sequelize) e NoSQL (como MongoDB com Mongoose) dependerá das necessidades do seu projeto, mas Node.js oferece excelentes ferramentas para trabalhar com ambos. A seguir, exploraremos tópicos avançados como autenticação, testes e WebSockets.


### Tópicos Avançados de Node.js

Com uma base sólida em Node.js, Express, APIs RESTful e integração com bancos de dados, podemos agora explorar alguns tópicos avançados que são cruciais para construir aplicações back-end completas, seguras e robustas.

#### Autenticação e Autorização (JWT - JSON Web Tokens)

Na maioria das APIs e aplicações web, nem todos os recursos devem ser acessíveis publicamente. Precisamos de mecanismos para:

*   **Autenticação:** Verificar a identidade de um usuário (quem ele é). Geralmente envolve um processo de login onde o usuário fornece credenciais (como email/senha).
*   **Autorização:** Determinar se um usuário autenticado tem permissão para acessar um recurso específico ou realizar uma determinada ação (o que ele pode fazer).

Uma abordagem moderna e popular para lidar com autenticação em APIs RESTful (que são stateless) é usar **JSON Web Tokens (JWT)**.

**Como funciona o JWT:**

1.  **Login:** O usuário envia suas credenciais (ex: email, senha) para um endpoint de login (ex: `POST /api/auth/login`).
2.  **Verificação:** O servidor verifica as credenciais no banco de dados.
3.  **Geração do Token:** Se as credenciais forem válidas, o servidor gera um JWT. O JWT é uma string codificada que contém três partes separadas por pontos (`.`):
    *   **Header:** Metadados sobre o token (tipo: JWT, algoritmo de assinatura: HS256, RS256, etc.).
    *   **Payload (Carga Útil):** Contém as *claims* (informações) sobre o usuário (ex: ID do usuário, nome, papéis/roles) e metadados do token (ex: `iat` - issued at, `exp` - expiration time). **Importante:** O payload é apenas codificado (Base64Url), não criptografado, então **não coloque informações sensíveis** nele.
    *   **Signature (Assinatura):** Gerada usando o header, o payload, uma chave secreta (conhecida apenas pelo servidor) e o algoritmo especificado no header. A assinatura garante a integridade do token (verifica se o header ou payload foram alterados) e autentica o emissor (se usar chaves assimétricas).
4.  **Envio do Token:** O servidor envia o JWT de volta para o cliente na resposta do login.
5.  **Armazenamento no Cliente:** O cliente armazena o JWT (geralmente em `localStorage` ou `sessionStorage` - embora haja debates sobre segurança, ou em memória).
6.  **Requisições Autenticadas:** Para cada requisição subsequente a endpoints protegidos, o cliente envia o JWT no cabeçalho `Authorization`, geralmente usando o esquema `Bearer`:
    `Authorization: Bearer <seu_jwt_aqui>`
7.  **Verificação no Servidor:** Para cada requisição a um endpoint protegido, um middleware no servidor:
    *   Extrai o token do cabeçalho `Authorization`.
    *   Verifica a assinatura do token usando a chave secreta. Se a assinatura for inválida (token adulterado ou chave errada), a requisição é rejeitada (401 Unauthorized).
    *   Verifica se o token não expirou (`exp` claim).
    *   Se o token for válido, o middleware extrai as informações do usuário do payload (ex: ID do usuário) e as anexa ao objeto `req` (ex: `req.usuario`).
    *   Chama `next()` para permitir que o handler da rota prossiga.
8.  **Autorização (Opcional):** O handler da rota (ou outro middleware) pode então usar as informações em `req.usuario` (ex: `req.usuario.id`, `req.usuario.role`) para verificar se aquele usuário específico tem permissão para realizar a ação solicitada.

**Implementação com `jsonwebtoken`:**

A biblioteca `jsonwebtoken` é a mais popular para trabalhar com JWT no Node.js.

*   **Instalação:** `npm install jsonwebtoken bcryptjs` (usaremos `bcryptjs` para hashear senhas)

*   **Exemplo (Simplificado):**

    ```javascript
    // authController.js (Exemplo)
    import jwt from 'jsonwebtoken';
    import bcrypt from 'bcryptjs';
    // Assumindo um modelo de usuário (Sequelize ou Mongoose)
    // import Usuario from '../models/Usuario.js';

    // Chave secreta para assinar/verificar tokens (GUARDAR EM VARIÁVEL DE AMBIENTE!) 
    const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-forte';
    const JWT_EXPIRES_IN = '1h'; // Token expira em 1 hora

    export const login = async (req, res, next) => {
      const { email, senha } = req.body;
      try {
        // 1. Encontrar usuário pelo email (exemplo com Mongoose)
        // const usuario = await Usuario.findOne({ email });
        // Simulação:
        const usuario = (email === 'teste@email.com') ? { id: 'user123', nome: 'Teste', senhaHash: await bcrypt.hash('senha123', 10) } : null;

        if (!usuario) {
          return res.status(401).json({ erro: 'Credenciais inválidas (email)' });
        }

        // 2. Comparar senha fornecida com hash armazenado
        const senhaValida = await bcrypt.compare(senha, usuario.senhaHash);
        if (!senhaValida) {
          return res.status(401).json({ erro: 'Credenciais inválidas (senha)' });
        }

        // 3. Gerar o JWT
        const payload = {
          id: usuario.id,
          nome: usuario.nome
          // Adicionar outros dados não sensíveis se necessário (ex: role)
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        // 4. Enviar o token
        res.status(200).json({ token });

      } catch (error) {
        next(error);
      }
    };

    // Exemplo de registro (onde a senha seria hasheada)
    export const registrar = async (req, res, next) => {
        const { nome, email, senha } = req.body;
        try {
            const salt = await bcrypt.genSalt(10);
            const senhaHash = await bcrypt.hash(senha, salt);
            // Lógica para criar o usuário no banco com senhaHash...
            // const novoUsuario = await Usuario.create({ nome, email, senha: senhaHash });
            res.status(201).json({ mensagem: 'Usuário registrado com sucesso' });
        } catch (error) {
            next(error);
        }
    }
    ```

    ```javascript
    // middlewares/authMiddleware.js (Exemplo)
    import jwt from 'jsonwebtoken';

    const JWT_SECRET = process.env.JWT_SECRET || 'sua-chave-secreta-muito-forte';

    export const protegerRota = (req, res, next) => {
      let token;
      // 1. Verificar se o cabeçalho Authorization existe e começa com Bearer
      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]; // Extrai o token
      }

      if (!token) {
        return res.status(401).json({ erro: 'Acesso não autorizado, token não fornecido.' });
      }

      try {
        // 2. Verificar o token (assinatura e expiração)
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Anexar dados do usuário (do payload do token) à requisição
        // Idealmente, buscaria o usuário atualizado no DB aqui para garantir que ainda existe/está ativo
        req.usuario = { id: decoded.id, nome: decoded.nome }; // Simplificação

        next(); // Permite o acesso à rota protegida
      } catch (error) {
        // Tratar erros específicos do JWT (TokenExpiredError, JsonWebTokenError)
        console.error('Erro na verificação do token:', error.name);
        return res.status(401).json({ erro: 'Acesso não autorizado, token inválido ou expirado.' });
      }
    };

    // Middleware de Autorização (Exemplo: verificar se é admin)
    export const autorizarAdmin = (req, res, next) => {
        // Assume que req.usuario foi populado pelo middleware protegerRota
        // e que o payload do token contém uma role
        // if (req.usuario && req.usuario.role === 'admin') {
        //    next();
        // } else {
        //    res.status(403).json({ erro: 'Acesso proibido. Requer privilégios de administrador.' });
        // }
        // Simulação simples:
        if (req.usuario && req.usuario.id === 'admin123') { // Exemplo
             next();
        } else {
             res.status(403).json({ erro: 'Acesso proibido.' });
        }
    }
    ```

    ```javascript
    // Em app.js ou no roteador apropriado
    import { protegerRota, autorizarAdmin } from './middlewares/authMiddleware.js';
    import { login, registrar } from './controllers/authController.js';

    // Rotas de autenticação (públicas)
    app.post('/api/auth/login', login);
    app.post('/api/auth/registrar', registrar);

    // Rota protegida (requer apenas autenticação)
    app.get('/api/perfil', protegerRota, (req, res) => {
      // Acesso aos dados do usuário anexados pelo middleware
      res.json({ mensagem: `Bem-vindo ao seu perfil, ${req.usuario.nome}!`, usuario: req.usuario });
    });

    // Rota protegida por Autorização (requer ser admin, por exemplo)
    app.get('/api/admin/dashboard', protegerRota, autorizarAdmin, (req, res) => {
        res.json({ mensagem: 'Bem-vindo ao dashboard do Admin!' });
    });
    ```

**Considerações de Segurança JWT:**
*   Use HTTPS sempre para proteger o token em trânsito.
*   Use chaves secretas fortes e mantenha-as seguras (use variáveis de ambiente).
*   Defina um tempo de expiração (`exp`) razoável para os tokens.
*   Considere mecanismos de invalidação de token (refresh tokens, blacklisting) para cenários mais complexos.
*   Esteja ciente dos riscos de armazenar JWT no `localStorage` (XSS). Alternativas incluem `sessionStorage` (menos persistente) ou cookies `HttpOnly` (mais seguros contra XSS, mas vulneráveis a CSRF se não protegidos com `SameSite`).

#### WebSockets (Introdução)

HTTP é um protocolo baseado em requisição-resposta: o cliente envia uma requisição, o servidor envia uma resposta e a conexão geralmente é fechada. Isso funciona bem para muitas interações, mas não é ideal para cenários que exigem comunicação **bidirecional em tempo real**, onde o servidor precisa enviar dados para o cliente sem que o cliente tenha feito uma nova requisição (ex: notificações, chats, jogos online, feeds de dados ao vivo).

**WebSockets** são um protocolo de comunicação diferente (iniciado sobre HTTP, mas depois atualizado) que fornece um canal de comunicação **full-duplex** (bidirecional) sobre uma única conexão TCP de longa duração entre o cliente e o servidor.

**Como funciona:**
1.  **Handshake:** O cliente inicia a conexão WebSocket enviando uma requisição HTTP especial para o servidor (com cabeçalhos como `Upgrade: websocket` e `Connection: Upgrade`).
2.  **Upgrade:** Se o servidor suportar WebSockets, ele responde com um status HTTP 101 (Switching Protocols) e a conexão é "atualizada" de HTTP para WebSocket.
3.  **Comunicação Bidirecional:** A partir daí, tanto o cliente quanto o servidor podem enviar mensagens um para o outro a qualquer momento através da mesma conexão, até que a conexão seja fechada por uma das partes.

**Implementação com `ws`:**

A biblioteca `ws` é a mais popular para trabalhar com WebSockets no Node.js.

*   **Instalação:** `npm install ws`
*   **Exemplo (Servidor Simples):**

    ```javascript
    // websocketServer.js
    import { WebSocketServer } from 'ws'; // Importa a classe do servidor

    const wss = new WebSocketServer({ port: 8080 }); // Cria o servidor na porta 8080

    console.log('Servidor WebSocket rodando na porta 8080');

    // Evento 'connection': disparado quando um novo cliente se conecta
    wss.on('connection', (ws) => { // ws representa a conexão com um cliente específico
      console.log('Novo cliente conectado!');

      // Envia uma mensagem de boas-vindas para o cliente recém-conectado
      ws.send('Bem-vindo ao servidor WebSocket!');

      // Evento 'message': disparado quando o servidor recebe uma mensagem deste cliente
      ws.on('message', (message) => {
        try {
          // As mensagens chegam como Buffer ou string
          const messageString = message.toString();
          console.log('Recebido do cliente:', messageString);

          // Exemplo: Echo - envia a mesma mensagem de volta para o cliente
          // ws.send(`Servidor recebeu: ${messageString}`);

          // Exemplo: Broadcast - envia a mensagem para TODOS os clientes conectados
          wss.clients.forEach((client) => {
            // Verifica se o cliente ainda está conectado e não é o remetente original (opcional)
            if (client.readyState === ws.OPEN) { // ws.OPEN é uma constante da biblioteca
              client.send(`Mensagem de outro cliente: ${messageString}`);
            }
          });

        } catch (e) {
            console.error('Erro ao processar mensagem:', e);
            ws.send('Erro ao processar sua mensagem.');
        }
      });

      // Evento 'close': disparado quando a conexão com este cliente é fechada
      ws.on('close', () => {
        console.log('Cliente desconectado.');
      });

      // Evento 'error': disparado se ocorrer um erro na conexão
      ws.on('error', (error) => {
        console.error('Erro no WebSocket do cliente:', error);
      });
    });

    // Evento 'error' do servidor principal (ex: erro ao iniciar na porta)
    wss.on('error', (error) => {
        console.error('Erro no servidor WebSocket:', error);
    });
    ```

*   **Exemplo (Cliente no Navegador):**

    ```html
    <!DOCTYPE html>
    <html>
    <head><title>Cliente WebSocket</title></head>
    <body>
      <h1>Cliente WebSocket</h1>
      <input type="text" id="mensagemInput" placeholder="Digite sua mensagem">
      <button id="enviarBtn">Enviar</button>
      <div id="mensagensRecebidas"></div>

      <script>
        const input = document.getElementById('mensagemInput');
        const btn = document.getElementById('enviarBtn');
        const output = document.getElementById('mensagensRecebidas');

        // Conecta ao servidor WebSocket (ws:// ou wss:// para seguro)
        const socket = new WebSocket('ws://localhost:8080');

        // Evento: Conexão aberta
        socket.addEventListener('open', (event) => {
          console.log('Conectado ao servidor WebSocket!');
          output.innerHTML += '<p><em>Conectado!</em></p>';
        });

        // Evento: Mensagem recebida do servidor
        socket.addEventListener('message', (event) => {
          console.log('Mensagem do servidor:', event.data);
          output.innerHTML += `<p>Servidor: ${event.data}</p>`;
        });

        // Evento: Conexão fechada
        socket.addEventListener('close', (event) => {
          console.log('Desconectado do servidor WebSocket.');
          output.innerHTML += '<p><em>Desconectado.</em></p>';
        });

        // Evento: Erro na conexão
        socket.addEventListener('error', (event) => {
          console.error('Erro no WebSocket:', event);
          output.innerHTML += '<p><em>Erro na conexão.</em></p>';
        });

        // Enviar mensagem ao clicar no botão
        btn.addEventListener('click', () => {
          const mensagem = input.value;
          if (mensagem && socket.readyState === WebSocket.OPEN) {
            socket.send(mensagem);
            output.innerHTML += `<p style="color:blue;">Eu: ${mensagem}</p>`;
            input.value = '';
          }
        });
      </script>
    </body>
    </html>
    ```

WebSockets abrem portas para aplicações altamente interativas e em tempo real. Bibliotecas como `Socket.IO` constroem sobre WebSockets (e usam fallbacks como long-polling) para fornecer funcionalidades adicionais como reconexão automática, salas (rooms), e uma API mais abstrata.

#### Testes em Node.js (Introdução a Frameworks como Jest)

Escrever testes automatizados é fundamental para garantir a qualidade, a corretude e a manutenibilidade do seu código, especialmente em aplicações back-end complexas.

Existem vários tipos de testes:
*   **Testes Unitários:** Testam pequenas unidades isoladas de código (geralmente funções ou métodos) para garantir que funcionem como esperado, sem depender de partes externas como banco de dados ou rede (que são "mockados" ou simulados).
*   **Testes de Integração:** Testam a interação entre diferentes unidades ou módulos do sistema (ex: testar se um controlador chama corretamente um serviço que interage com o banco de dados).
*   **Testes End-to-End (E2E):** Testam o fluxo completo da aplicação do ponto de vista do usuário, simulando requisições HTTP para a API e verificando as respostas.

**Jest** é um framework de teste JavaScript muito popular, desenvolvido pelo Facebook, conhecido por sua simplicidade, configuração mínima ("zero-config"), velocidade e recursos integrados (assertions, mocks, code coverage).

*   **Instalação:** `npm install --save-dev jest`
*   **Configuração (Opcional):** Jest geralmente funciona sem configuração, mas você pode criar um `jest.config.js` para personalizar.
*   **Adicionar Script de Teste ao `package.json`:**
    ```json
    "scripts": {
      "test": "jest"
      // "test:watch": "jest --watchAll" // Para rodar testes automaticamente ao salvar arquivos
      // "test:coverage": "jest --coverage" // Para gerar relatório de cobertura de código
    }
    ```
*   **Escrevendo Testes:** Crie arquivos de teste com nomes como `nomeDoArquivo.test.js` ou dentro de uma pasta `__tests__`.

    ```javascript
    // Exemplo: testando uma função simples (soma.js)
    // export const somar = (a, b) => a + b;

    // soma.test.js
    import { somar } from './soma'; // Importa a função a ser testada

    // describe agrupa testes relacionados
    describe('Função Somar', () => {
      // test ou it define um caso de teste individual
      test('deve somar dois números positivos corretamente', () => {
        // expect cria uma "asserção" (expectativa)
        // .toBe é um "matcher" (comparador)
        expect(somar(2, 3)).toBe(5);
      });

      test('deve somar um número positivo e um negativo', () => {
        expect(somar(5, -2)).toBe(3);
      });

      test('deve somar dois zeros', () => {
        expect(somar(0, 0)).toBe(0);
      });

      // Outros matchers úteis: .toEqual (para objetos/arrays), .toBeNull, .toBeUndefined,
      // .toBeTruthy, .toBeFalsy, .toContain, .toThrow, etc.
    });
    ```

    ```javascript
    // Exemplo: testando código assíncrono (buscarDados.js)
    // export const buscarUsuario = async (id) => { /* ... retorna Promise ... */ };

    // buscarDados.test.js
    import { buscarUsuario } from './buscarDados';

    describe('Função buscarUsuario', () => {
      test('deve retornar dados do usuário para um ID válido', async () => {
        // Para testar código assíncrono, use async/await com expect
        const usuario = await buscarUsuario(1);
        expect(usuario).toBeDefined(); // Verifica se não é undefined
        expect(usuario.id).toBe(1);
        expect(usuario.name).toEqual('Leanne Graham'); // Exemplo
      });

      test('deve lançar um erro para um ID inválido', async () => {
        // Para testar se uma Promise rejeita ou uma função lança erro
        await expect(buscarUsuario(9999)).rejects.toThrow('Usuário não encontrado'); // Exemplo
      });
    });
    ```
*   **Executando Testes:** `npm test`

**Mocking:** Para testes unitários, você frequentemente precisa simular dependências externas (módulos, chamadas de API, banco de dados). Jest fornece funções como `jest.fn()` (para criar funções mock), `jest.mock()` (para mockar módulos inteiros) e `jest.spyOn()` (para espionar ou mockar métodos de objetos existentes).

**Testes de API (Integração/E2E):** Para testar sua API Express, você pode usar bibliotecas como `supertest` em conjunto com Jest. `supertest` permite fazer requisições HTTP para sua aplicação Express diretamente nos testes, sem precisar iniciar um servidor real.

*   Instalação: `npm install --save-dev supertest`
*   Exemplo:
    ```javascript
    // tarefas.test.js (Teste de Integração para API de Tarefas)
    import request from 'supertest';
    import app from '../src/app'; // Importa sua instância do app Express

    describe('API de Tarefas', () => {
      test('GET /api/tarefas deve retornar status 200 e um array', async () => {
        const response = await request(app).get('/api/tarefas');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
      });

      test('POST /api/tarefas deve criar uma nova tarefa e retornar status 201', async () => {
        const novaTarefa = { descricao: 'Testar API' };
        const response = await request(app)
          .post('/api/tarefas')
          .send(novaTarefa);

        expect(response.statusCode).toBe(201);
        expect(response.body.descricao).toBe(novaTarefa.descricao);
        expect(response.body.concluida).toBe(false);
        expect(response.body).toHaveProperty('id');
      });

      // Adicionar testes para GET por ID, PUT, DELETE, validações, etc.
    });
    ```

Investir tempo em testes automatizados economiza muito tempo e esforço a longo prazo, prevenindo regressões e aumentando a confiança no seu código.

#### Variáveis de Ambiente (.env)

É uma péssima prática colocar dados sensíveis ou configurações que variam entre ambientes (desenvolvimento, teste, produção) diretamente no código-fonte (ex: chaves de API, senhas de banco de dados, segredos JWT, URLs de serviços externos).

A solução padrão é usar **variáveis de ambiente**.

*   **Definição:** Variáveis de ambiente são definidas fora da sua aplicação, no próprio sistema operacional ou ambiente de execução onde a aplicação roda.
*   **Acesso no Node.js:** Node.js fornece acesso às variáveis de ambiente através do objeto global `process.env`.
    ```javascript
    const dbPassword = process.env.DB_PASSWORD;
    const apiKey = process.env.API_KEY;
    const nodeEnv = process.env.NODE_ENV || 'development'; // Padrão para desenvolvimento se não definida
    ```
*   **Gerenciamento com `.env`:** Definir variáveis de ambiente manualmente pode ser tedioso, especialmente em desenvolvimento local. A biblioteca `dotenv` é amplamente usada para carregar variáveis de ambiente definidas em um arquivo `.env` na raiz do projeto para `process.env`.
    1.  Instale: `npm install dotenv`
    2.  Crie um arquivo `.env` na raiz do projeto ( **NÃO versione este arquivo no Git! Adicione `.env` ao seu `.gitignore`**):
        ```
        # .env
        NODE_ENV=development
        PORT=3001
        DB_MYSQL_HOST=localhost
        DB_MYSQL_USER=dev_user
        DB_MYSQL_PASSWORD=senha_dev_segura
        DB_MYSQL_DATABASE=minha_app_dev
        JWT_SECRET=segredo-para-desenvolvimento-local
        API_KEY_EXTERNA=abc123xyz
        ```
    3.  Carregue as variáveis no início do seu arquivo principal (`app.js` ou `server.js`), **antes** de qualquer código que precise delas:
        ```javascript
        import dotenv from 'dotenv';
        dotenv.config(); // Carrega variáveis do .env para process.env

        // Agora você pode usar process.env.PORT, process.env.JWT_SECRET, etc.
        import express from 'express';
        // ... resto do seu app.js

        const port = process.env.PORT || 3000; // Usa a porta do .env ou 3000 como padrão
        app.listen(port, () => { /* ... */ });
        ```

Em ambientes de produção (servidores, plataformas de nuvem como Heroku, Vercel, AWS), as variáveis de ambiente são configuradas diretamente nas configurações do ambiente de hospedagem, não através de um arquivo `.env`.

Usar variáveis de ambiente é essencial para segurança e para gerenciar configurações de forma flexível entre diferentes estágios de desenvolvimento e implantação.

Estes tópicos avançados - autenticação/autorização, WebSockets, testes automatizados e gerenciamento de configuração com variáveis de ambiente - são fundamentais para levar suas habilidades de desenvolvimento back-end com Node.js para o próximo nível, permitindo construir aplicações mais completas, seguras e profissionais.



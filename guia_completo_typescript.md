# Seção 1: Introdução ao TypeScript

Bem-vindo ao mundo do TypeScript! Se você está começando sua jornada na programação ou vindo do JavaScript e buscando mais robustez e organização para seus projetos, você está no lugar certo. TypeScript foi criado pela Microsoft e lançado em 2012 como uma resposta aos desafios de desenvolver aplicações JavaScript em larga escala. Ele não busca substituir o JavaScript, mas sim aprimorá-lo, adicionando um sistema de tipos estáticos opcionais que pode transformar sua experiência de desenvolvimento.

## O que é TypeScript?

TypeScript é frequentemente descrito como um "superset" (superconjunto) do JavaScript. Isso significa que todo código JavaScript válido é também um código TypeScript válido. A principal adição do TypeScript ao JavaScript é a **tipagem estática opcional**. Enquanto o JavaScript é uma linguagem de tipagem dinâmica (onde os tipos das variáveis são verificados em tempo de execução), o TypeScript permite que você defina os tipos das variáveis, parâmetros de funções e valores de retorno em tempo de desenvolvimento. O compilador TypeScript (tsc) verifica esses tipos antes mesmo de o código ser executado, ajudando a detectar erros comuns que poderiam passar despercebidos em JavaScript puro.

Além da tipagem estática, o TypeScript oferece acesso antecipado a novas funcionalidades do ECMAScript (o padrão que define o JavaScript), mesmo que elas ainda não sejam suportadas por todos os navegadores ou ambientes Node.js. O compilador TypeScript pode transpilar (converter) seu código TypeScript, incluindo essas funcionalidades modernas e as anotações de tipo, para uma versão de JavaScript compatível com os ambientes de destino que você especificar.

## Por que usar TypeScript?

A adoção do TypeScript tem crescido exponencialmente, e por boas razões. As principais vantagens incluem:

*   **Detecção Antecipada de Erros:** A verificação de tipos em tempo de compilação pega muitos erros comuns, como typos em nomes de propriedades, passagem de tipos incorretos para funções ou tentativa de usar métodos inexistentes, antes que eles causem problemas em produção. Isso economiza tempo de depuração e aumenta a confiabilidade do código.
*   **Melhor Legibilidade e Manutenibilidade:** As anotações de tipo servem como uma forma de documentação, tornando o código mais fácil de entender. Fica claro quais tipos de dados uma função espera e o que ela retorna. Isso é especialmente valioso em projetos grandes e colaborativos, onde a manutenção a longo prazo é crucial.
*   **Ferramentas Aprimoradas (IntelliSense):** Editores de código modernos, como o Visual Studio Code, utilizam as informações de tipo do TypeScript para oferecer autocompletar mais inteligente, refatoração segura e navegação de código mais precisa. Isso acelera o desenvolvimento e reduz a carga cognitiva.
*   **Escalabilidade:** TypeScript brilha em projetos grandes e complexos. O sistema de tipos ajuda a gerenciar a complexidade, facilitando a refatoração e a introdução de novas funcionalidades sem quebrar o código existente.
*   **Ecossistema Robusto:** Muitas bibliotecas e frameworks populares (como Angular, React, Vue, Node.js) têm excelente suporte a TypeScript, incluindo arquivos de declaração de tipos que facilitam a integração.

## Relação com JavaScript

É fundamental entender que TypeScript não é uma linguagem completamente separada do JavaScript. Ele se baseia no JavaScript e adiciona camadas sobre ele. Você pode introduzir TypeScript gradualmente em um projeto JavaScript existente. Como todo código JavaScript é TypeScript válido, você pode renomear seus arquivos `.js` para `.ts` e começar a adicionar tipos onde fizer mais sentido. O código final que roda no navegador ou no servidor ainda é JavaScript puro, gerado pelo compilador TypeScript.

## Configuração do Ambiente

Para começar a usar TypeScript, você precisa de duas coisas principais: Node.js (que inclui o npm, gerenciador de pacotes) e o compilador TypeScript (tsc).

### Instalação do Node.js e npm/yarn

Se você ainda não tem o Node.js instalado, visite o site oficial [nodejs.org](https://nodejs.org/) e baixe a versão LTS (Long Term Support), que é recomendada para a maioria dos usuários. A instalação do Node.js também instalará o npm (Node Package Manager).

Para verificar se a instalação foi bem-sucedida, abra seu terminal ou prompt de comando e execute:

```bash
node -v
npm -v
```

Você deverá ver as versões do Node.js e do npm instaladas.

(Opcional: Yarn é um gerenciador de pacotes alternativo. Se preferir usá-lo, você pode instalá-lo via npm: `npm install -g yarn` e verificar com `yarn -v`)

### Instalação do Compilador TypeScript (tsc)

Com o Node.js e o npm prontos, você pode instalar o compilador TypeScript globalmente em sua máquina usando o npm:

```bash
npm install -g typescript
```

A flag `-g` significa global, tornando o comando `tsc` disponível em qualquer lugar do seu sistema.

Para verificar a instalação do TypeScript, execute:

```bash
tsc -v
```

Isso deve exibir a versão do compilador TypeScript instalada.

### Compilando o Primeiro Arquivo `.ts`

Vamos criar nosso primeiro arquivo TypeScript. Crie uma pasta para seu projeto (por exemplo, `aprendendo-ts`) e, dentro dela, crie um arquivo chamado `saudacao.ts`. Adicione o seguinte código:

```typescript
function saudar(pessoa: string) {
  console.log(`Olá, ${pessoa}!`);
}

saudar("Mundo");
// Tente descomentar a linha abaixo e veja o erro no editor (se usar VS Code)
// saudar(42);
```

Neste exemplo, definimos que a função `saudar` espera um argumento `pessoa` do tipo `string`. Se você tentar passar um número (como na linha comentada), o TypeScript (e seu editor, provavelmente) apontará um erro antes mesmo da compilação.

Agora, no terminal, navegue até a pasta do seu projeto (`cd aprendendo-ts`) e compile o arquivo:

```bash
tsc saudacao.ts
```

Este comando criará um novo arquivo chamado `saudacao.js` na mesma pasta. Abra-o e veja o código JavaScript gerado:

```javascript
function saudar(pessoa) {
    console.log("Ol\u00E1, ".concat(pessoa, "!"));
}
saudar("Mundo");
// Tente descomentar a linha abaixo e veja o erro no editor (se usar VS Code)
// saudar(42);
```

Note que as anotações de tipo (`: string`) foram removidas, pois não existem no JavaScript padrão. O código foi ligeiramente ajustado para compatibilidade (neste caso, a concatenação de string).

Você pode executar o arquivo JavaScript gerado usando Node.js:

```bash
node saudacao.js
```

Você verá a saída "Olá, Mundo!" no console.

### Configurando `tsconfig.json`

Compilar arquivos individualmente funciona para exemplos simples, mas em projetos reais, usamos um arquivo de configuração chamado `tsconfig.json`. Este arquivo informa ao compilador TypeScript quais arquivos incluir na compilação e quais opções de compilação usar.

Na raiz da pasta do seu projeto (`aprendendo-ts`), execute o seguinte comando para gerar um arquivo `tsconfig.json` básico com opções comentadas:

```bash
tsc --init
```

Abra o `tsconfig.json` gerado. Ele contém muitas opções, mas algumas das mais importantes inicialmente são:

*   `target`: Especifica a versão do ECMAScript para a qual o código será compilado (ex: "ES2016", "ES5"). "ES2016" é um bom padrão moderno.
*   `module`: Define o sistema de módulos a ser usado no código gerado (ex: "CommonJS", "ES2015"). "CommonJS" é comum para Node.js, enquanto "ES2015" (ou mais recente) é usado para navegadores com bundlers.
*   `outDir`: Especifica a pasta onde os arquivos `.js` compilados serão colocados (ex: "./dist" ou "./build").
*   `rootDir`: Especifica a pasta raiz dos seus arquivos fonte `.ts` (ex: "./src").
*   `strict`: Habilita um conjunto de verificações de tipo mais rigorosas. É altamente recomendado habilitar (`true`) para aproveitar ao máximo o TypeScript.
*   `esModuleInterop`: Permite melhor interoperabilidade com módulos CommonJS. Geralmente é bom definir como `true`.
*   `forceConsistentCasingInFileNames`: Garante que as referências a arquivos usem o mesmo casing (maiúsculas/minúsculas) do nome real do arquivo, importante para sistemas de arquivos case-sensitive.

Vamos ajustar nosso `tsconfig.json` (remova os comentários para simplificar):

```json
{
  "compilerOptions": {
    "target": "ES2016",
    "module": "CommonJS",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"], // Inclui todos os arquivos dentro da pasta src
  "exclude": ["node_modules", "**/*.spec.ts"] // Exclui node_modules e arquivos de teste
}
```

Agora, crie uma pasta `src` e mova o arquivo `saudacao.ts` para dentro dela. No terminal, na raiz do projeto, execute apenas:

```bash
tsc
```

O compilador lerá o `tsconfig.json`, encontrará o arquivo `saudacao.ts` dentro de `src`, o compilará e colocará o `saudacao.js` resultante dentro de uma nova pasta `dist`.

Para compilar e observar mudanças nos arquivos automaticamente, use a flag `-w` (watch):

```bash
tsc -w
```

## Exercício: Configurar um Projeto Simples

1.  Crie uma nova pasta para este exercício (ex: `ts-exercicio-01`).
2.  Dentro dela, inicialize um projeto TypeScript criando um `tsconfig.json` (`tsc --init`).
3.  Configure o `tsconfig.json` para:
    *   Compilar para `ES2017`.
    *   Usar módulos `CommonJS`.
    *   Colocar os arquivos compilados em uma pasta `build`.
    *   Usar uma pasta `source` como raiz dos arquivos TypeScript.
    *   Habilitar o modo `strict`.
4.  Crie a pasta `source`.
5.  Dentro de `source`, crie um arquivo `calculadora.ts`.
6.  No arquivo `calculadora.ts`, crie uma função chamada `somar` que recebe dois parâmetros (`a` e `b`), ambos do tipo `number`, e retorna a soma deles (que também será do tipo `number`).
7.  Chame a função `somar` com dois números e imprima o resultado no console.
8.  Compile o projeto usando `tsc`.
9.  Verifique se a pasta `build` foi criada e contém o arquivo `calculadora.js`.
10. Execute o arquivo JavaScript gerado com `node build/calculadora.js` e veja o resultado.

Este exercício ajudará você a praticar a configuração básica de um projeto TypeScript e a compilação de código.

Na próxima seção, mergulharemos nos tipos básicos que o TypeScript oferece e como ele infere tipos automaticamente.
# Seção 2: Fundamentos - Tipos Básicos e Inferência

Agora que você já configurou seu ambiente e entendeu o propósito do TypeScript, vamos mergulhar em um dos seus conceitos centrais: os tipos. Compreender como o TypeScript lida com tipos é fundamental para escrever código mais seguro e legível.

## Tipagem Estática vs. Dinâmica

Como mencionado na introdução, JavaScript é uma linguagem de **tipagem dinâmica**. Isso significa que o tipo de uma variável é verificado (e pode mudar) durante a execução do código. Por exemplo:

```javascript
// JavaScript (Tipagem Dinâmica)
let minhaVariavel = "Olá"; // minhaVariavel é string
console.log(typeof minhaVariavel); // -> string

minhaVariavel = 100; // Agora minhaVariavel é number
console.log(typeof minhaVariavel); // -> number

minhaVariavel = true; // E agora é boolean
console.log(typeof minhaVariavel); // -> boolean
```

Embora flexível, essa característica pode levar a erros inesperados em tempo de execução, especialmente em aplicações maiores. Se uma função espera receber um número, mas acidentalmente recebe uma string, o erro só será descoberto quando essa função for chamada.

TypeScript introduz a **tipagem estática opcional**. Com ela, você *pode* declarar o tipo esperado para variáveis, parâmetros e retornos de função. O compilador TypeScript verifica esses tipos *antes* da execução (em tempo de compilação ou desenvolvimento), ajudando a pegar erros mais cedo.

```typescript
// TypeScript (Tipagem Estática Opcional)
let minhaVariavelTS: string = "Olá";
console.log(typeof minhaVariavelTS); // -> string

// Erro em tempo de compilação! O editor e o `tsc` avisarão.
// Type 'number' is not assignable to type 'string'.
// minhaVariavelTS = 100;
```

## Tipos Primitivos

TypeScript adota os tipos primitivos básicos do JavaScript. Ao declarar uma variável, você pode usar anotações de tipo para especificar qual tipo primitivo ela deve conter:

*   **`string`**: Para valores textuais. Usa aspas simples (`'`) ou duplas (`"`). Template literals (crases `` ` ``) também resultam em strings.
    ```typescript
    let nome: string = "Alice";
    let mensagem: string = `Bem-vinda, ${nome}!`;
    ```
*   **`number`**: Para valores numéricos, incluindo inteiros e pontos flutuantes (decimais). Não há tipos separados como `int` ou `float`.
    ```typescript
    let idade: number = 30;
    let preco: number = 99.95;
    let quantidade: number = -5;
    ```
*   **`boolean`**: Para valores verdadeiro (`true`) ou falso (`false`).
    ```typescript
    let ativo: boolean = true;
    let maiorDeIdade: boolean = false;
    ```
*   **`bigint`**: Para números inteiros arbitrariamente grandes, que excedem o limite seguro do tipo `number`. Criado adicionando `n` ao final de um literal inteiro.
    ```typescript
    // Requer target no tsconfig.json seja ES2020 ou superior
    let numeroGigante: bigint = 9007199254740991n;
    let outroGigante: bigint = BigInt("12345678901234567890");
    ```
*   **`symbol`**: Para criar identificadores únicos e imutáveis, frequentemente usados como chaves de propriedades de objetos.
    ```typescript
    // Requer target no tsconfig.json seja ES2015 ou superior
    let idUnico: symbol = Symbol("id");
    let outroId: symbol = Symbol("id");
    console.log(idUnico === outroId); // -> false (são únicos)
    ```

## Tipos Especiais

Além dos primitivos, TypeScript possui alguns tipos especiais com significados particulares:

*   **`any`**: Representa a ausência de verificação de tipo. Uma variável do tipo `any` pode receber qualquer valor, e você pode acessar quaisquer propriedades ou chamar quaisquer métodos nela sem verificação do compilador. **Deve ser evitado sempre que possível**, pois anula as vantagens da tipagem estática. É útil em cenários de migração de JavaScript ou ao lidar com bibliotecas de terceiros sem tipos definidos, mas use com cautela.
    ```typescript
    let coringa: any = 4;
    coringa = "agora sou string";
    coringa = true;
    console.log(coringa.toFixed(2)); // Sem erro em compilação, mas erro em execução se coringa não for number!
    ```
*   **`unknown`**: Similar ao `any`, pode receber qualquer valor. No entanto, é mais seguro: você não pode realizar operações arbitrárias em um valor `unknown` sem antes verificar seu tipo (usando `typeof`, `instanceof` ou type guards).
    ```typescript
    let desconhecido: unknown = "Isso pode ser qualquer coisa";
    desconhecido = 10;
    
    // Erro: Object is of type 'unknown'.
    // console.log(desconhecido.toFixed(2)); 
    
    if (typeof desconhecido === 'number') {
      console.log(desconhecido.toFixed(2)); // OK, dentro da verificação de tipo
    }
    ```
*   **`void`**: Usado principalmente como tipo de retorno de funções que não retornam nenhum valor explicitamente.
    ```typescript
    function exibirMensagem(msg: string): void {
      console.log(msg);
      // Nenhum return explícito
    }
    
    let resultado: void = exibirMensagem("Teste"); // resultado será 'undefined'
    ```
*   **`null` e `undefined`**: Representam a ausência de valor. Por padrão, `null` e `undefined` são subtipos de todos os outros tipos, o que significa que você pode atribuí-los a variáveis `string`, `number`, etc. No entanto, com a opção `strictNullChecks` habilitada no `tsconfig.json` (altamente recomendado!), `null` e `undefined` só podem ser atribuídos a variáveis do tipo `any`, `unknown` ou aos seus próprios tipos (`null` e `undefined`). Para permitir explicitamente `null` ou `undefined`, use tipos de união (veremos mais tarde): `string | null`.
    ```typescript
    // Com strictNullChecks: false (não recomendado)
    let nomeUsuario: string = null; // Permitido
    
    // Com strictNullChecks: true (recomendado)
    let nomeUsuarioStrict: string = null; // Erro!
    let nomeUsuarioOpcional: string | null = null; // OK
    let idadeUsuario: number | undefined = undefined; // OK
    ```
*   **`never`**: Representa o tipo de valores que nunca ocorrem. Usado como tipo de retorno de funções que sempre lançam uma exceção ou que entram em loop infinito.
    ```typescript
    function falha(mensagem: string): never {
      throw new Error(mensagem);
    }
    
    function loopInfinito(): never {
      while (true) {}
    }
    ```

## Arrays e Tuplas

*   **Arrays**: Para listas de valores do *mesmo* tipo. Você pode definir o tipo dos elementos seguido por `[]` ou usar a sintaxe genérica `Array<tipo>`.
    ```typescript
    let numeros: number[] = [1, 2, 3, 4, 5];
    let nomes: Array<string> = ["Carlos", "Bruna", "Ana"];
    
    numeros.push(6);
    // numeros.push("sete"); // Erro: Argument of type 'string' is not assignable to parameter of type 'number'.
    ```
*   **Tuplas (Tuples)**: Permitem definir um array com um número *fixo* de elementos, onde os tipos de cada elemento são *conhecidos* e podem ser *diferentes*. A ordem dos tipos importa.
    ```typescript
    let pessoa: [string, number]; // Uma tupla com string na posição 0 e number na posição 1
    pessoa = ["João", 35]; // OK
    // pessoa = [40, "Maria"]; // Erro: Type 'number' is not assignable to type 'string'. Type 'string' is not assignable to type 'number'.
    // pessoa = ["Pedro", 25, true]; // Erro: Tuple type '[string, number]' of length '2' has no element at index '2'.
    
    console.log(pessoa[0].substring(1)); // OK, TypeScript sabe que pessoa[0] é string
    console.log(pessoa[1].toFixed(0)); // OK, TypeScript sabe que pessoa[1] é number
    ```

## Enums (Enumerações)

Enums permitem definir um conjunto de constantes nomeadas, tornando o código mais legível ao usar nomes significativos em vez de números ou strings "mágicos".

*   **Enums Numéricos**: Por padrão, os membros recebem valores numéricos começando em 0, auto-incrementados.
    ```typescript
    enum Direcao {
      Norte, // 0
      Leste, // 1
      Sul,   // 2
      Oeste  // 3
    }
    
    let minhaDirecao: Direcao = Direcao.Norte;
    console.log(minhaDirecao); // -> 0
    console.log(Direcao[0]); // -> Norte (mapeamento reverso)
    ```
    Você pode definir o valor inicial ou valores específicos:
    ```typescript
    enum StatusCodigo {
      Ok = 200,
      BadRequest = 400,
      NotFound = 404,
      InternalError = 500
    }
    
    let resposta: StatusCodigo = StatusCodigo.Ok;
    console.log(resposta); // -> 200
    ```
*   **Enums de String**: Cada membro deve ser inicializado explicitamente com um valor de string literal.
    ```typescript
    enum Permissao {
      Leitura = "READ",
      Escrita = "WRITE",
      Execucao = "EXECUTE"
    }
    
    let acessoUsuario: Permissao = Permissao.Leitura;
    console.log(acessoUsuario); // -> "READ"
    // Enums de string não possuem mapeamento reverso.
    ```

## Inferência de Tipo (Type Inference)

Uma das grandes conveniências do TypeScript é a **inferência de tipo**. Na maioria das vezes, você não precisa declarar explicitamente o tipo de uma variável se ela for inicializada no momento da declaração. O TypeScript analisará o valor inicial e *inferirá* o tipo mais apropriado.

```typescript
let cidade = "Recife"; // TypeScript infere: string
let populacao = 1_661_017; // TypeScript infere: number
let ehCapital = true; // TypeScript infere: boolean

// cidade = 10; // Erro: Type 'number' is not assignable to type 'string'.
```

A inferência funciona bem para tipos primitivos e também para estruturas mais complexas como arrays e objetos. É considerado boa prática deixar o TypeScript inferir os tipos sempre que possível, tornando o código menos verboso, exceto em casos onde a clareza exige uma anotação explícita (como parâmetros de função, retornos ou quando a inferência não é óbvia).

## Anotações de Tipo (Type Annotations)

Quando a inferência não é suficiente ou quando você quer ser explícito (o que é necessário para parâmetros de função e recomendado para retornos de função), você usa **anotações de tipo**. A sintaxe é `: tipo` após o nome da variável ou parâmetro.

```typescript
// Anotação necessária para parâmetros
function calcularArea(base: number, altura: number): number { 
  // Anotação recomendada para o retorno
  return base * altura;
}

// Anotação útil quando a variável não é inicializada imediatamente
let resultadoCalculo: number;
resultadoCalculo = calcularArea(10, 5);

// Anotação para clareza ou para tipos mais complexos (como any ou unknown)
let dadosRecebidos: any;
dadosRecebidos = JSON.parse('{ "nome": "API Externa" }'); 
```

## Exemplos Práticos e Exercícios

**Exemplo 1: Informações de Produto**

```typescript
let nomeProduto: string = "Notebook Gamer XYZ";
let codigoProduto: number = 101112;
let precoProduto: number = 7999.90;
let disponivelEstoque: boolean = true;
let categorias: string[] = ["Eletrônicos", "Computadores", "Gamer"];
let especificacoes: [string, string, number] = ["Processador i9", "GPU RTX 4080", 32]; // [CPU, GPU, RAM GB]

enum StatusPedido {
  Pendente = "PENDING",
  Processando = "PROCESSING",
  Enviado = "SHIPPED",
  Entregue = "DELIVERED",
  Cancelado = "CANCELLED"
}

let statusAtual: StatusPedido = StatusPedido.Processando;

console.log(`Produto: ${nomeProduto} (Código: ${codigoProduto})`);
console.log(`Preço: R$ ${precoProduto.toFixed(2)}`);
console.log(`Disponível: ${disponivelEstoque ? 'Sim' : 'Não'}`);
console.log(`Categorias: ${categorias.join(', ')}`);
console.log(`Especificações: CPU=${especificacoes[0]}, GPU=${especificacoes[1]}, RAM=${especificacoes[2]}GB`);
console.log(`Status do Pedido: ${statusAtual}`);
```

**Exercício: Cadastro Simples**

1.  Declare variáveis para armazenar as seguintes informações de um usuário:
    *   `primeiroNome` (string)
    *   `ultimoNome` (string)
    *   `idade` (number)
    *   `dataNascimento` (string - por simplicidade, use formato "DD/MM/AAAA")
    *   `ehEstudante` (boolean)
    *   `habilidades` (um array de strings, ex: ["JavaScript", "HTML", "CSS"])
    *   `endereco` (uma tupla contendo: rua (string), número (number), cidade (string))
2.  Use a inferência de tipo sempre que possível, mas adicione anotações onde achar necessário para clareza ou se não inicializar a variável imediatamente.
3.  Crie um `enum` chamado `NivelExperiencia` com os valores `Iniciante`, `Intermediario`, `Avancado`.
4.  Declare uma variável `nivelAtual` e atribua a ela um valor do enum `NivelExperiencia`.
5.  Imprima todas as informações no console de forma organizada.

Este exercício reforçará seu entendimento sobre os tipos básicos, arrays, tuplas, enums e a diferença entre inferência e anotação.

Na próxima seção, exploraremos como definir estruturas de dados mais complexas usando Interfaces e Type Aliases.
# Seção 3: Estruturando Dados - Interfaces e Type Aliases

Nos fundamentos, vimos como usar tipos primitivos, arrays e tuplas para representar dados simples. No entanto, em aplicações reais, frequentemente lidamos com estruturas de dados mais complexas, como objetos que representam usuários, produtos, configurações, etc. TypeScript oferece duas ferramentas poderosas para definir a "forma" ou o "contrato" desses objetos: **Interfaces** e **Type Aliases**.

Compreender e utilizar essas ferramentas é crucial para modelar seus dados de forma clara, garantir a consistência e aproveitar ao máximo as verificações de tipo do TypeScript.

## Interfaces: Definindo Contratos para Objetos

Uma **interface** em TypeScript é uma forma de definir um contrato que um objeto deve seguir. Ela especifica quais propriedades um objeto deve ter e quais tipos essas propriedades devem possuir. Se um objeto é declarado como sendo de um determinado tipo de interface, o TypeScript garantirá que ele tenha todas as propriedades exigidas pela interface com os tipos corretos.

Vamos definir uma interface para representar um usuário:

```typescript
interface Usuario {
  id: number;
  nome: string;
  email: string;
  ativo: boolean;
}

// Agora podemos usar a interface como um tipo
let novoUsuario: Usuario;

novoUsuario = {
  id: 1,
  nome: "Carla Silva",
  email: "carla.silva@email.com",
  ativo: true
};

console.log(novoUsuario.nome); // Acesso seguro, TypeScript sabe que 'nome' existe e é string

// Erro: Property 'ativo' is missing in type 
// '{ id: number; nome: string; email: string; }' but required in type 'Usuario'.
/*
let usuarioIncompleto: Usuario = {
  id: 2,
  nome: "Pedro Costa",
  email: "pedro.costa@email.com"
};
*/

// Erro: Type 'string' is not assignable to type 'number'.
/*
let usuarioTipoErrado: Usuario = {
  id: "3", // id deveria ser number
  nome: "Ana Souza",
  email: "ana.souza@email.com",
  ativo: false
};
*/
```

Interfaces definem apenas a estrutura (os nomes e tipos das propriedades), não a implementação. Elas são puramente um construto de tempo de compilação e não geram código JavaScript.

### Propriedades Opcionais e Readonly

*   **Propriedades Opcionais**: Nem sempre todas as propriedades de um objeto são obrigatórias. Você pode marcar uma propriedade como opcional adicionando um `?` antes dos dois pontos (`:`).

    ```typescript
    interface Produto {
      codigo: string;
      nome: string;
      preco: number;
      descricao?: string; // descricao é opcional
    }
    
    let produto1: Produto = {
      codigo: "P123",
      nome: "Teclado Mecânico",
      preco: 350.00
      // descricao não é fornecida, e está OK
    };
    
    let produto2: Produto = {
      codigo: "P456",
      nome: "Mouse Gamer",
      preco: 180.50,
      descricao: "Mouse com 6 botões e RGB"
    };
    ```

*   **Propriedades Readonly**: Você pode especificar que uma propriedade não deve ser modificada após a criação inicial do objeto usando o modificador `readonly`.

    ```typescript
    interface Configuracao {
      readonly apiKey: string;
      readonly apiUrl: string;
      timeout: number;
    }
    
    let configApp: Configuracao = {
      apiKey: "abc123xyz",
      apiUrl: "https://api.exemplo.com",
      timeout: 5000
    };
    
    configApp.timeout = 10000; // OK, timeout não é readonly
    
    // Erro: Cannot assign to 'apiKey' because it is a read-only property.
    // configApp.apiKey = "novaChave"; 
    ```
    Note que `readonly` se aplica apenas à propriedade em si. Se a propriedade for um objeto, as propriedades *desse* objeto interno ainda podem ser modificadas (a menos que também sejam `readonly`).

Interfaces também podem definir a estrutura de funções e arrays, mas seu uso mais comum é para descrever a forma de objetos.

## Type Aliases: Criando Nomes para Tipos

**Type Aliases** (apelidos de tipo) permitem que você crie um novo nome (um apelido) para qualquer tipo existente, seja ele um tipo primitivo, um tipo de união, uma tupla, um tipo de função ou um tipo de objeto.

A sintaxe usa a palavra-chave `type`:

```typescript
// Apelido para um tipo primitivo
type Identificador = number | string;

// Apelido para um tipo de objeto (similar a uma interface)
type Ponto = {
  x: number;
  y: number;
};

// Apelido para um tipo de função
type FuncaoComparacao = (a: number, b: number) => boolean;

// Apelido para um tipo de união complexo
type ResultadoAPI = { sucesso: true; dados: any } | { sucesso: false; erro: string };

// Usando os apelidos
let userId: Identificador = "user-55";
let pontoInicial: Ponto = { x: 0, y: 0 };

function processarResultado(res: ResultadoAPI) {
  if (res.sucesso) {
    console.log("Dados:", res.dados);
  } else {
    console.error("Erro:", res.erro);
  }
}
```

Assim como interfaces, Type Aliases são apenas para o tempo de compilação e não geram código JavaScript.

## Diferenças e Quando Usar Interfaces vs. Type Aliases

Para definir a forma de objetos, interfaces e type aliases são muito semelhantes e, em muitos casos, intercambiáveis. No entanto, existem algumas diferenças importantes que podem guiar sua escolha:

1.  **Extensão/Implementação vs. Interseção**: 
    *   **Interfaces** podem ser estendidas por outras interfaces (`extends`) e implementadas por classes (`implements`). Isso se alinha bem com os princípios da programação orientada a objetos.
      ```typescript
      interface Animal {
        nome: string;
      }
      
      interface Cachorro extends Animal {
        latir(): void;
      }
      
      class Labrador implements Cachorro {
        nome: string = "Rex";
        latir() { console.log("Au au!"); }
      }
      ```
    *   **Type Aliases** podem alcançar um resultado similar usando tipos de interseção (`&`), mas a sintaxe pode ser menos intuitiva para herança.
      ```typescript
      type Veiculo = {
        rodas: number;
      };
      
      type Carro = Veiculo & {
        portas: number;
        ligar(): void;
      };
      
      let meuCarro: Carro = {
        rodas: 4,
        portas: 4,
        ligar: () => console.log("Vrum vrum!")
      };
      ```

2.  **Declaration Merging (Mesclagem de Declaração)**:
    *   **Interfaces** suportam mesclagem de declaração. Se você definir a mesma interface múltiplas vezes (mesmo em arquivos diferentes), o TypeScript as mesclará em uma única definição.
      ```typescript
      interface Caixa {
        altura: number;
      }
      
      interface Caixa {
        largura: number;
      }
      
      // TypeScript mescla as duas:
      // interface Caixa {
      //   altura: number;
      //   largura: number;
      // }
      
      let minhaCaixa: Caixa = { altura: 10, largura: 20 }; // OK
      ```
    *   **Type Aliases** não podem ser mesclados. Definir um type alias com o mesmo nome mais de uma vez resultará em erro.

3.  **Uso com Primitivos, Uniões, Tuplas**: 
    *   **Type Aliases** são mais flexíveis para dar nomes a tipos de união, interseção, tuplas ou tipos primitivos mapeados.
      ```typescript
      type IdOuNome = string | number; // Mais claro com type alias
      type Coordenada = [number, number]; // Mais claro com type alias
      ```
    *   **Interfaces** são primariamente focadas em descrever a forma de objetos.

**Recomendação Geral:**

*   Use **interfaces** quando estiver definindo a forma de objetos ou quando precisar da capacidade de extensão (`extends`) ou mesclagem de declaração. É a escolha mais comum para descrever a estrutura de objetos em APIs ou bibliotecas.
*   Use **type aliases** quando precisar nomear tipos de união, interseção, tuplas, ou para tipos mais complexos que não se encaixam bem no modelo de interface. Também são úteis para dar nomes mais significativos a tipos primitivos ou funções.

Em muitos casos, a escolha é uma questão de preferência pessoal ou convenção da equipe, especialmente ao definir formas simples de objetos.

## Exemplos Práticos e Exercícios

**Exemplo: Modelando um Pedido Online**

```typescript
// Interface para o item do pedido
interface ItemPedido {
  produtoId: string;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

// Type Alias para o status do pedido (usando união de literais)
type StatusPedidoLiteral = "pendente" | "processando" | "enviado" | "entregue" | "cancelado";

// Interface para o endereço de entrega
interface Endereco {
  rua: string;
  numero: string; // Pode ser "S/N"
  complemento?: string; // Opcional
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
}

// Interface principal do Pedido
interface Pedido {
  readonly id: number;
  data: Date;
  clienteId: number | string; // Pode ser ID numérico ou código de cliente
  itens: ItemPedido[];
  status: StatusPedidoLiteral;
  enderecoEntrega: Endereco;
  valorTotal: number;
}

// Criando um pedido de exemplo
const pedidoExemplo: Pedido = {
  id: 12345,
  data: new Date(),
  clienteId: "CLI-987",
  itens: [
    { produtoId: "PROD-A", nomeProduto: "Livro TypeScript", quantidade: 1, precoUnitario: 89.90 },
    { produtoId: "PROD-B", nomeProduto: "Caneca Código", quantidade: 2, precoUnitario: 25.00 }
  ],
  status: "processando",
  enderecoEntrega: {
    rua: "Rua das Flores",
    numero: "100",
    bairro: "Centro",
    cidade: "Cidade Exemplo",
    estado: "EX",
    cep: "12345-678"
  },
  valorTotal: (1 * 89.90) + (2 * 25.00)
};

// Função para exibir detalhes do pedido
function exibirDetalhesPedido(p: Pedido): void {
  console.log(`--- Pedido #${p.id} ---`);
  console.log(`Data: ${p.data.toLocaleDateString()}`);
  console.log(`Cliente: ${p.clienteId}`);
  console.log(`Status: ${p.status}`);
  console.log("Itens:");
  p.itens.forEach(item => {
    console.log(`  - ${item.quantidade}x ${item.nomeProduto} (R$ ${item.precoUnitario.toFixed(2)})`);
  });
  console.log(`Endereço: ${p.enderecoEntrega.rua}, ${p.enderecoEntrega.numero} - ${p.enderecoEntrega.cidade}`);
  console.log(`Valor Total: R$ ${p.valorTotal.toFixed(2)}`);
}

exibirDetalhesPedido(pedidoExemplo);

// Tentativa de modificar ID (readonly) - Gerará erro
// pedidoExemplo.id = 67890; 
```

**Exercício: Modelando Livros e Autores**

1.  Crie uma **interface** chamada `Autor` com as seguintes propriedades:
    *   `id` (number, readonly)
    *   `nome` (string)
    *   `nacionalidade` (string, opcional)
2.  Crie uma **interface** chamada `Livro` com as seguintes propriedades:
    *   `isbn` (string, readonly)
    *   `titulo` (string)
    *   `autor` (do tipo `Autor`)
    *   `anoPublicacao` (number)
    *   `genero` (string)
    *   `numeroPaginas` (number)
    *   `disponivel` (boolean)
3.  Crie um **type alias** chamado `FormatoLivro` que seja uma união dos literais: `"fisico" | "ebook" | "audiobook"`.
4.  Adicione uma propriedade `formato` do tipo `FormatoLivro` à interface `Livro`.
5.  Crie um objeto `autorExemplo` que siga a interface `Autor`.
6.  Crie um objeto `livroExemplo` que siga a interface `Livro`, utilizando o `autorExemplo` criado.
7.  Crie uma função chamada `descreverLivro` que recebe um parâmetro do tipo `Livro` e imprime no console uma descrição formatada do livro, incluindo o nome do autor.
8.  Chame a função `descreverLivro` passando o `livroExemplo`.

Este exercício ajudará você a praticar a criação e o uso de interfaces e type aliases para modelar dados relacionados e a entender quando usar cada um.

Na próxima seção, focaremos em como tipar funções de maneira eficaz em TypeScript.
# Seção 4: Funções em TypeScript

Funções são blocos de construção fundamentais em JavaScript e, consequentemente, em TypeScript. Elas encapsulam lógica reutilizável. TypeScript aprimora as funções JavaScript adicionando tipos explícitos para parâmetros e valores de retorno, o que aumenta a clareza e a segurança do código, ajudando a evitar erros comuns relacionados a tipos incorretos passados ou retornados.

## Tipagem de Parâmetros e Retorno

A sintaxe básica para adicionar tipos a uma função envolve anotar cada parâmetro com seu tipo e, opcionalmente, anotar o tipo do valor que a função retorna após a lista de parâmetros, usando dois pontos (`:`).

```typescript
// Anotação de tipos para parâmetros (nome: string, idade: number)
// Anotação de tipo para o retorno (: string)
function criarMensagemBoasVindas(nome: string, idade: number): string {
  return `Olá ${nome}, você tem ${idade} anos!`;
}

let mensagem: string = criarMensagemBoasVindas("Roberto", 42);
console.log(mensagem); // -> Olá Roberto, você tem 42 anos!

// Erro em compilação: Argument of type 'boolean' is not assignable to parameter of type 'string'.
// let erroTipoParametro = criarMensagemBoasVindas(true, 30);

// Erro em compilação: Expected 2 arguments, but got 1.
// let erroFaltaParametro = criarMensagemBoasVindas("Ana");
```

**Inferência do Tipo de Retorno:**

Assim como nas variáveis, o TypeScript geralmente consegue *inferir* o tipo de retorno de uma função com base nas declarações `return` dentro dela. Se a função tem apenas um `return` e retorna um valor de tipo claro (como `string` ou `number`), a anotação do tipo de retorno é opcional, embora seja considerada uma boa prática explicitá-la para clareza e para garantir que a função retorne o que você espera.

```typescript
// TypeScript infere que o retorno é number
function somar(a: number, b: number) {
  return a + b;
}

// Boa prática: Explicitar o retorno para clareza e segurança
function subtrair(a: number, b: number): number {
  return a - b;
}
```

**Funções que Não Retornam Valor (`void`)**

Se uma função não tem uma declaração `return` ou retorna `undefined` implicitamente, seu tipo de retorno inferido é `void`. É bom anotar explicitamente com `: void` para deixar claro que a função não se destina a retornar um valor útil.

```typescript
function logarErro(mensagem: string): void {
  console.error(`ERRO: ${mensagem}`);
  // Nenhum return explícito
}

logarErro("Falha ao conectar ao banco de dados.");
```

## Parâmetros Opcionais e Padrão

*   **Parâmetros Opcionais**: Em JavaScript, você pode chamar uma função com menos argumentos do que os definidos. Em TypeScript, por padrão, isso gera um erro. Para permitir que um parâmetro seja omitido na chamada, marque-o como opcional adicionando `?` antes da anotação de tipo. Parâmetros opcionais devem vir *depois* dos parâmetros obrigatórios.

    ```typescript
    function formatarNome(primeiroNome: string, ultimoNome?: string): string {
      if (ultimoNome) {
        return `${primeiroNome} ${ultimoNome}`;
      } else {
        return primeiroNome;
      }
    }
    
    console.log(formatarNome("Maria")); // -> Maria
    console.log(formatarNome("João", "Silva")); // -> João Silva
    ```
    Dentro da função, um parâmetro opcional não fornecido terá o valor `undefined`.

*   **Parâmetros Padrão**: Você pode fornecer um valor padrão para um parâmetro se nenhum valor for passado na chamada. Isso é feito atribuindo um valor diretamente na assinatura da função. Parâmetros com valores padrão são tratados como opcionais e também inferem seu tipo a partir do valor padrão (embora a anotação explícita ainda seja possível).

    ```typescript
    function calcularPotencia(base: number, expoente: number = 2): number {
      return Math.pow(base, expoente);
    }
    
    console.log(calcularPotencia(5)); // -> 25 (expoente usou o padrão 2)
    console.log(calcularPotencia(2, 8)); // -> 256 (expoente foi fornecido como 8)
    ```
    Parâmetros com valor padrão não precisam vir por último, mas se não vierem, você precisará passar `undefined` explicitamente para usar o valor padrão ao chamar a função.

## Parâmetros Rest (`...`)

Para funções que podem aceitar um número variável de argumentos do mesmo tipo, você pode usar parâmetros rest. Eles agrupam todos os argumentos restantes em um array. Só pode haver um parâmetro rest por função, e ele deve ser o último parâmetro.

```typescript
function somarTodos(...numeros: number[]): number {
  let total = 0;
  for (const num of numeros) {
    total += num;
  }
  return total;
}

console.log(somarTodos(1, 2, 3)); // -> 6
console.log(somarTodos(10, 20, 30, 40, 50)); // -> 150
console.log(somarTodos()); // -> 0
```

## Sobrecarga de Funções (Function Overloads)

Às vezes, uma função pode se comportar de maneiras diferentes ou aceitar/retornar tipos diferentes dependendo dos argumentos passados. TypeScript permite definir múltiplas *assinaturas* de função (as sobrecargas) para uma única implementação.

As sobrecargas definem as diferentes formas como a função pode ser chamada. A última assinatura é a da implementação real, que deve ter um corpo e ser compatível com todas as sobrecargas declaradas.

```typescript
// Sobrecargas (assinaturas)
function combinar(a: string, b: string): string;
function combinar(a: number, b: number): number;

// Implementação (deve abranger as sobrecargas)
function combinar(a: string | number, b: string | number): string | number {
  // Verificamos os tipos em tempo de execução para decidir o que fazer
  if (typeof a === 'string' && typeof b === 'string') {
    return a + b; // Concatenação de strings
  } else if (typeof a === 'number' && typeof b === 'number') {
    return a + b; // Soma de números
  }
  // Lançar um erro ou retornar um valor padrão se os tipos não corresponderem
  throw new Error("Tipos inválidos para combinar.");
}

let resultadoString: string = combinar("Olá, ", "Mundo!"); // OK, usa a primeira sobrecarga
let resultadoNumero: number = combinar(10, 20); // OK, usa a segunda sobrecarga

console.log(resultadoString); // -> Olá, Mundo!
console.log(resultadoNumero); // -> 30

// Erro em compilação: No overload matches this call.
// let erroCombinacao = combinar("Texto", 5);
```

O compilador TypeScript usa as sobrecargas para verificar as chamadas da função. A implementação real não é diretamente visível para quem chama a função. Use sobrecargas com moderação, pois podem tornar a assinatura da função mais complexa. Muitas vezes, tipos genéricos (que veremos mais tarde) podem ser uma alternativa melhor.

## Tipando `this` em Funções

O comportamento do `this` em JavaScript pode ser confuso. TypeScript permite que você declare explicitamente o tipo esperado para `this` dentro de uma função, adicionando um parâmetro chamado `this` como *primeiro* parâmetro da função. Isso não gera código JavaScript (o parâmetro `this` é removido na compilação), mas serve para a verificação estática do TypeScript.

Isso é particularmente útil em métodos de objetos ou ao usar funções de callback onde o contexto do `this` pode mudar.

```typescript
interface ElementoUI {
  id: string;
  adicionarClickListener(this: ElementoUI, onClick: (this: void, e: Event) => void): void;
}

let botao: ElementoUI = {
  id: "meuBotao",
  adicionarClickListener: function(this: ElementoUI, onClick: (this: void, e: Event) => void) {
    // Aqui dentro, 'this' é garantido como sendo do tipo ElementoUI
    const elemento = document.getElementById(this.id);
    if (elemento) {
      elemento.addEventListener('click', (e: Event) => {
        // Dentro da arrow function, 'this' ainda é ElementoUI (captura léxica)
        console.log(`Clicado: ${this.id}`);
        // Chamando o callback. Note que o 'this' do callback foi tipado como 'void'
        // para evitar confusão ou uso acidental do 'this' externo.
        onClick.call(undefined, e); // Usamos .call para garantir o 'this' correto (ou nenhum)
      });
    }
  }
};

botao.adicionarClickListener(function(this: void, evento: Event) {
  // Aqui, 'this' é 'void' (ou 'undefined' em modo não estrito), como definido na assinatura.
  console.log("Callback executado!");
  // console.log(this.id); // Erro: Property 'id' does not exist on type 'void'.
});

// Exemplo de erro: Tentar chamar o método com 'this' incorreto
const listenerIncorreto = botao.adicionarClickListener;
// listenerIncorreto(function(e){ console.log('erro'); }); // Erro: The 'this' context of type 'void' is not assignable to method's 'this' of type 'ElementoUI'.
```

Tipar o `this` ajuda a prevenir erros comuns ao trabalhar com métodos e callbacks, garantindo que o contexto seja o esperado.

## Exemplos Práticos e Exercícios

**Exemplo: Processamento de Pedidos**

```typescript
interface Item {
  nome: string;
  preco: number;
  quantidade: number;
}

type Status = "pendente" | "pago" | "enviado";

// Função com parâmetros opcionais e padrão
function calcularTotalPedido(itens: Item[], descontoPercentual: number = 0): number {
  let subtotal = itens.reduce((total, item) => total + (item.preco * item.quantidade), 0);
  let desconto = subtotal * (descontoPercentual / 100);
  return subtotal - desconto;
}

// Função com parâmetro rest
function atualizarStatusPedido(pedidoId: number, novoStatus: Status, ...notificarEmails: string[]): void {
  console.log(`Pedido ${pedidoId} atualizado para: ${novoStatus}`);
  if (notificarEmails.length > 0) {
    console.log(`Notificando: ${notificarEmails.join(', ')}`);
  }
  // Lógica para atualizar o status no banco de dados...
}

// Função com sobrecarga (exemplo simples)
function obterDetalhe(id: number): { id: number; tipo: 'numero' };
function obterDetalhe(nome: string): { nome: string; tipo: 'texto' };
function obterDetalhe(valor: number | string): { id?: number; nome?: string; tipo: 'numero' | 'texto' } {
  if (typeof valor === 'number') {
    console.log(`Buscando detalhe pelo ID numérico: ${valor}`);
    return { id: valor, tipo: 'numero' };
  } else {
    console.log(`Buscando detalhe pelo Nome: ${valor}`);
    return { nome: valor, tipo: 'texto' };
  }
}

const itensPedido: Item[] = [
  { nome: "Produto A", preco: 50, quantidade: 2 },
  { nome: "Produto B", preco: 120, quantidade: 1 }
];

const totalSemDesconto = calcularTotalPedido(itensPedido);
const totalComDesconto = calcularTotalPedido(itensPedido, 10); // 10% de desconto

console.log(`Total sem desconto: R$ ${totalSemDesconto.toFixed(2)}`);
console.log(`Total com 10% desconto: R$ ${totalComDesconto.toFixed(2)}`);

atualizarStatusPedido(101, "pago");
atualizarStatusPedido(102, "enviado", "cliente@email.com", "suporte@loja.com");

const detalheNum = obterDetalhe(123);
const detalheStr = obterDetalhe("Cliente VIP");

console.log(detalheNum);
console.log(detalheStr);
```

**Exercício: Utilitários de String**

1.  Crie uma função chamada `concatenar` que aceite um número variável de strings (parâmetro rest) e um parâmetro opcional `separador` (string, com valor padrão `" "`). A função deve retornar uma única string com todos os argumentos concatenados, usando o separador fornecido.
    *   Exemplo: `concatenar("a", "b", "c")` deve retornar `"a b c"`.
    *   Exemplo: `concatenar("maçã", "banana", "laranja", { separador: ", " })` deve retornar `"maçã, banana, laranja"`. ( *Atenção: como passar o separador se ele não é o último? Pense em como estruturar os parâmetros ou use um objeto de opções* ). -> **Reformulação**: O separador deve ser o *primeiro* parâmetro, com valor padrão.
2.  Crie uma função chamada `capitalizar` que recebe uma string e retorna a string com a primeira letra em maiúscula e o restante em minúscula. Adicione tipagem explícita para o parâmetro e o retorno.
3.  Crie uma função chamada `contarVogais` que recebe uma string e retorna o número de vogais (a, e, i, o, u, ignorando maiúsculas/minúsculas) na string. Adicione tipagem explícita.
4.  Crie sobrecargas para uma função `buscar`:
    *   Se receber um `id` (number), deve retornar um objeto `{ id: number; encontrado: boolean }`.
    *   Se receber um `termo` (string), deve retornar um array de strings `string[]` (simulando múltiplos resultados).
    *   Implemente a função `buscar` para lidar com ambos os casos, retornando os tipos corretos conforme as sobrecargas. Dentro da implementação, você pode simular a busca (ex: se for número, retorne `{ id: valor, encontrado: valor < 100 }`; se for string, retorne `[termo, "resultado1", "resultado2"]`).
5.  Teste todas as funções criadas com diferentes entradas.

Este exercício aborda parâmetros opcionais, padrão, rest, tipagem básica e sobrecargas, aplicando-os a cenários comuns de manipulação de strings e dados.

Na próxima seção, exploraremos a programação orientada a objetos em TypeScript usando Classes.
# Seção 5: Orientação a Objetos com Classes

TypeScript, sendo um superset do JavaScript, suporta totalmente a programação orientada a objetos (POO) usando a sintaxe de classes introduzida no ECMAScript 2015 (ES6) e a aprimora com recursos como modificadores de acesso e interfaces. Classes fornecem uma maneira de criar "plantas" (blueprints) para objetos, encapsulando dados (propriedades) e comportamento (métodos) relacionados.

Se você já tem experiência com POO em linguagens como Java ou C#, muitos conceitos serão familiares, mas TypeScript adiciona suas próprias nuances e integrações com o sistema de tipos.

## Conceitos Básicos: Classes, Instâncias, Construtores

*   **Classe**: É o modelo ou a planta para criar objetos. Define as propriedades e métodos que todos os objetos criados a partir dela terão.
*   **Instância**: É um objeto específico criado a partir de uma classe. Cada instância tem seu próprio conjunto de valores para as propriedades definidas na classe, mas compartilha os mesmos métodos.
*   **Construtor (`constructor`)**: É um método especial dentro de uma classe que é chamado automaticamente quando uma nova instância é criada (usando a palavra-chave `new`). É usado para inicializar as propriedades do objeto.

Vamos criar uma classe simples para representar um `Retangulo`:

```typescript
class Retangulo {
  // Propriedades (dados)
  largura: number;
  altura: number;

  // Construtor para inicializar as propriedades
  constructor(larguraInicial: number, alturaInicial: number) {
    console.log("Criando um novo retângulo...");
    this.largura = larguraInicial;
    this.altura = alturaInicial;
  }

  // Método (comportamento)
  calcularArea(): number {
    return this.largura * this.altura;
  }

  descrever(): string {
    return `Retângulo com largura ${this.largura} e altura ${this.altura}`;
  }
}

// Criando instâncias (objetos) da classe Retangulo
let retangulo1 = new Retangulo(10, 5);
let retangulo2 = new Retangulo(7, 3);

// Usando as instâncias
console.log(retangulo1.descrever()); // -> Retângulo com largura 10 e altura 5
console.log(`Área do retângulo 1: ${retangulo1.calcularArea()}`); // -> Área do retângulo 1: 50

console.log(retangulo2.descrever()); // -> Retângulo com largura 7 e altura 3
console.log(`Área do retângulo 2: ${retangulo2.calcularArea()}`); // -> Área do retângulo 2: 21

// Acessando propriedades diretamente
console.log(retangulo1.largura); // -> 10
retangulo1.largura = 12; // Modificando a propriedade
console.log(`Nova área do retângulo 1: ${retangulo1.calcularArea()}`); // -> Nova área do retângulo 1: 60
```

Dentro dos métodos da classe, a palavra-chave `this` se refere à instância específica do objeto em que o método está sendo chamado.

## Propriedades e Métodos

*   **Propriedades**: São as variáveis associadas a uma classe, representando o estado de um objeto. Elas são declaradas no corpo da classe com seus tipos.
*   **Métodos**: São as funções associadas a uma classe, definindo o comportamento de um objeto. Eles são declarados como funções normais dentro do corpo da classe.

**Parameter Properties (Propriedades de Parâmetro)**

TypeScript oferece um atalho útil para declarar e inicializar propriedades diretamente nos parâmetros do construtor. Ao adicionar um modificador de acesso (`public`, `private`, `protected`) ou `readonly` a um parâmetro do construtor, o TypeScript automaticamente:

1.  Declara uma propriedade com o mesmo nome e tipo na classe.
2.  Inicializa essa propriedade com o valor do argumento passado ao construtor.

Reescrevendo a classe `Retangulo` usando propriedades de parâmetro:

```typescript
class RetanguloSimplificado {
  // Declara e inicializa largura e altura diretamente no construtor
  constructor(public largura: number, public altura: number) {
    console.log("Criando retângulo simplificado...");
    // Não precisamos de this.largura = largura; aqui!
  }

  calcularArea(): number {
    return this.largura * this.altura;
  }

  descrever(): string {
    return `Retângulo com largura ${this.largura} e altura ${this.altura}`;
  }
}

let retangulo3 = new RetanguloSimplificado(8, 4);
console.log(retangulo3.descrever()); // -> Retângulo com largura 8 e altura 4
console.log(retangulo3.largura); // -> 8 (acessível porque é public)
```

Essa sintaxe é muito comum e torna o código mais conciso.

## Modificadores de Acesso

TypeScript introduz modificadores de acesso (inspirados em linguagens como Java/C#) para controlar a visibilidade de propriedades e métodos de uma classe. Eles ajudam a encapsular a lógica interna e expor apenas uma interface pública segura.

*   **`public` (Padrão)**: Membros declarados como `public` (ou sem nenhum modificador) são acessíveis de qualquer lugar: dentro da própria classe, por instâncias da classe e por classes filhas.
*   **`private`**: Membros declarados como `private` só podem ser acessados de *dentro* da própria classe onde foram definidos. Nem instâncias fora da classe nem classes filhas podem acessá-los diretamente.
*   **`protected`**: Membros declarados como `protected` podem ser acessados de *dentro* da própria classe e também por *classes filhas* (que herdam da classe base). Eles não são acessíveis por instâncias fora da classe.

```typescript
class ContaBancaria {
  public titular: string; // Acessível de qualquer lugar
  private saldo: number; // Acessível apenas dentro de ContaBancaria
  protected tipoConta: string; // Acessível dentro de ContaBancaria e classes filhas

  constructor(titular: string, saldoInicial: number, tipo: string = "Corrente") {
    this.titular = titular;
    this.saldo = saldoInicial;
    this.tipoConta = tipo;
  }

  public depositar(valor: number): void {
    if (valor > 0) {
      this.saldo += valor;
      console.log(`Depósito de R$${valor.toFixed(2)} realizado. Novo saldo: R$${this.saldo.toFixed(2)}`);
    } else {
      console.error("Valor de depósito inválido.");
    }
  }

  public sacar(valor: number): boolean {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      console.log(`Saque de R$${valor.toFixed(2)} realizado. Saldo restante: R$${this.saldo.toFixed(2)}`);
      return true;
    } else {
      console.error("Saque inválido ou saldo insuficiente.");
      return false;
    }
  }

  // Método público para acessar o saldo de forma controlada
  public getSaldo(): number {
    // Poderíamos adicionar lógica aqui, como permissões
    return this.saldo;
  }

  protected getDescricaoTipo(): string {
      return `Tipo da conta: ${this.tipoConta}`; 
  }
}

let minhaConta = new ContaBancaria("Ana Paula", 1000);

console.log(minhaConta.titular); // OK (public)
minhaConta.depositar(500);
minhaConta.sacar(200);
console.log(`Saldo atual (via getSaldo): R$${minhaConta.getSaldo().toFixed(2)}`);

// Erro: Property 'saldo' is private and only accessible within class 'ContaBancaria'.
// console.log(minhaConta.saldo); 

// Erro: Property 'tipoConta' is protected and only accessible within class 'ContaBancaria' and its subclasses.
// console.log(minhaConta.tipoConta);

// Erro: Property 'getDescricaoTipo' is protected...
// console.log(minhaConta.getDescricaoTipo());
```

## Propriedades Readonly

O modificador `readonly` pode ser usado em propriedades de classe para indicar que elas só podem ser atribuídas no momento da declaração ou dentro do construtor. Após a inicialização do objeto, elas não podem ser reatribuídas.

```typescript
class Mensagem {
  readonly id: number;
  readonly remetente: string;
  destinatario: string;
  texto: string;

  constructor(remetente: string, destinatario: string, texto: string) {
    this.id = Math.random(); // ID único gerado na criação
    this.remetente = remetente;
    this.destinatario = destinatario;
    this.texto = texto;
  }

  atualizarTexto(novoTexto: string): void {
      this.texto = novoTexto; // OK
  }
}

let msg1 = new Mensagem("joao@email.com", "maria@email.com", "Olá!");
console.log(msg1.id); // OK
msg1.atualizarTexto("Olá, tudo bem?"); // OK

// Erro: Cannot assign to 'id' because it is a read-only property.
// msg1.id = 123;

// Erro: Cannot assign to 'remetente' because it is a read-only property.
// msg1.remetente = "pedro@email.com"; 
```

## Herança (`extends`)

Herança é um pilar da POO que permite criar uma nova classe (classe filha ou subclasse) que herda propriedades e métodos de uma classe existente (classe pai ou superclasse). A classe filha pode adicionar novas propriedades e métodos ou sobrescrever (modificar) o comportamento herdado.

Usamos a palavra-chave `extends` para indicar herança.

```typescript
class Animal {
  constructor(public nome: string) {}

  mover(distanciaEmMetros: number = 0): void {
    console.log(`${this.nome} moveu ${distanciaEmMetros}m.`);
  }
}

class Cachorro extends Animal {
  // Construtor da classe filha
  constructor(nome: string) {
    // Chama o construtor da classe pai (Animal) OBRIGATORIAMENTE
    super(nome);
    console.log("Criando um cachorro...");
  }

  // Novo método específico para Cachorro
  latir(): void {
    console.log("Au au!");
  }

  // Sobrescrevendo o método mover da classe pai
  mover(distanciaEmMetros: number = 5): void {
    console.log("Correndo...");
    // Chama a implementação original do método mover da classe pai
    super.mover(distanciaEmMetros);
  }
}

let rex = new Cachorro("Rex");
rex.latir(); // -> Au au!
rex.mover(); // -> Correndo... 
             // -> Rex moveu 5m.
rex.mover(10); // -> Correndo...
               // -> Rex moveu 10m.
```

**Pontos importantes sobre herança:**

*   **`super()`**: No construtor da classe filha, você *deve* chamar `super()` para executar o construtor da classe pai antes de acessar `this` ou adicionar inicializações próprias.
*   **`super.metodo()`**: Você pode chamar a implementação de um método da classe pai de dentro de um método sobrescrito na classe filha usando `super.nomeDoMetodo()`.
*   Modificadores de acesso (`private`, `protected`) influenciam o que é herdado e acessível na classe filha.
Membros `private` da classe pai não são acessíveis na filha. Membros `protected` são.

## Classes Abstratas

Classes abstratas servem como modelos base para outras classes, mas não podem ser instanciadas diretamente. Elas podem conter métodos abstratos (declarados sem implementação) que *devem* ser implementados pelas classes filhas concretas.

Use a palavra-chave `abstract` para definir classes e métodos abstratos.

```typescript
abstract class FormaGeometrica {
  constructor(public nome: string) {}

  // Método concreto (com implementação)
  descrever(): void {
    console.log(`Esta é uma forma geométrica chamada ${this.nome}.`);
  }

  // Método abstrato (sem implementação, deve ser implementado pelas filhas)
  abstract calcularArea(): number;
}

class Circulo extends FormaGeometrica {
  constructor(public raio: number) {
    super("Círculo"); // Chama construtor da classe abstrata
  }

  // Implementação obrigatória do método abstrato
  calcularArea(): number {
    return Math.PI * this.raio * this.raio;
  }
}

class Quadrado extends FormaGeometrica {
    constructor(public lado: number) {
        super("Quadrado");
    }

    calcularArea(): number {
        return this.lado * this.lado;
    }
}

// Erro: Cannot create an instance of an abstract class.
// let forma = new FormaGeometrica("Genérica"); 

let meuCirculo = new Circulo(5);
let meuQuadrado = new Quadrado(4);

meuCirculo.descrever(); // -> Esta é uma forma geométrica chamada Círculo.
console.log(`Área do círculo: ${meuCirculo.calcularArea().toFixed(2)}`); // -> Área do círculo: 78.54

meuQuadrado.descrever(); // -> Esta é uma forma geométrica chamada Quadrado.
console.log(`Área do quadrado: ${meuQuadrado.calcularArea()}`); // -> Área do quadrado: 16
```

Classes abstratas são úteis para definir uma estrutura comum e forçar subclasses a implementar certos comportamentos.

## Membros Estáticos

Propriedades e métodos estáticos pertencem à *classe* em si, não a instâncias individuais. Eles são acessados diretamente na classe, sem precisar criar um objeto.

Use a palavra-chave `static`.

```typescript
class MatematicaUtil {
  static readonly PI: number = 3.14159;

  static somar(a: number, b: number): number {
    return a + b;
  }

  static multiplicar(a: number, b: number): number {
    return a * b;
  }
}

// Acessando membros estáticos diretamente na classe
console.log(MatematicaUtil.PI);
console.log(MatematicaUtil.somar(5, 3)); // -> 8
console.log(MatematicaUtil.multiplicar(4, 6)); // -> 24

// Não é possível acessar membros estáticos em instâncias
// let instanciaMat = new MatematicaUtil();
// console.log(instanciaMat.PI); // Erro
```

Membros estáticos são úteis para constantes, funções utilitárias ou gerenciamento de estado global relacionado à classe (como contadores de instâncias).

## Interfaces com Classes (`implements`)

Classes podem garantir que seguem a estrutura definida por uma ou mais interfaces usando a palavra-chave `implements`. A classe deve então fornecer implementações para todas as propriedades e métodos definidos nas interfaces.

Isso é útil para garantir que diferentes classes forneçam uma API comum.

```typescript
interface Logavel {
  log(mensagem: string): void;
}

interface Armazenavel {
    salvar(): boolean;
    carregar(id: string): any;
}

class BancoDeDados implements Logavel, Armazenavel {
  log(mensagem: string): void {
    console.log(`[LOG BD]: ${mensagem}`);
  }

  salvar(): boolean {
    this.log("Salvando dados...");
    // Lógica de salvamento...
    return true;
  }

  carregar(id: string): any {
    this.log(`Carregando dados para ID: ${id}`);
    // Lógica de carregamento...
    return { id: id, dados: "..." };
  }
}

class SistemaArquivos implements Logavel {
    log(mensagem: string): void {
        console.log(`[LOG FS]: ${mensagem}`);
    }

    escreverArquivo(caminho: string, conteudo: string): void {
        this.log(`Escrevendo no arquivo ${caminho}`);
        // ...
    }
}

function registrarAcao(componente: Logavel, acao: string) {
    componente.log(`Ação realizada: ${acao}`);
}

let meuBD = new BancoDeDados();
let meuFS = new SistemaArquivos();

meuBD.salvar();
meuFS.escreverArquivo("/tmp/log.txt", "teste");

registrarAcao(meuBD, "Consulta SQL"); // OK, BancoDeDados implementa Logavel
registrarAcao(meuFS, "Leitura de diretório"); // OK, SistemaArquivos implementa Logavel
```

Note que `implements` verifica apenas a *estrutura* em tempo de compilação. A classe ainda precisa declarar e implementar os membros. Interfaces não fornecem implementações.

## Exemplos Práticos e Exercícios

**Exemplo: Sistema de Veículos**

```typescript
abstract class Veiculo {
  static contadorVeiculos: number = 0;
  readonly id: number;

  constructor(public marca: string, public modelo: string, protected ano: number) {
    Veiculo.contadorVeiculos++;
    this.id = Veiculo.contadorVeiculos;
    console.log(`Veículo #${this.id} (${this.marca} ${this.modelo}) criado.`);
  }

  abstract exibirDetalhes(): void;

  public obterAno(): number {
      return this.ano;
  }

  static obterTotalVeiculos(): number {
      return Veiculo.contadorVeiculos;
  }
}

interface Eletrico {
    autonomiaBateria: number; // em km
    carregarBateria(): void;
}

class Carro extends Veiculo {
    constructor(marca: string, modelo: string, ano: number, public numeroPortas: number) {
        super(marca, modelo, ano);
    }

    exibirDetalhes(): void {
        console.log(`Carro: ${this.marca} ${this.modelo} (${this.ano}), ${this.numeroPortas} portas.`);
    }
}

class CarroEletrico extends Carro implements Eletrico {
    constructor(marca: string, modelo: string, ano: number, numeroPortas: number, public autonomiaBateria: number) {
        super(marca, modelo, ano, numeroPortas);
    }

    carregarBateria(): void {
        console.log(`Carregando bateria do ${this.marca} ${this.modelo}... Autonomia: ${this.autonomiaBateria}km.`);
    }

    // Sobrescrevendo para adicionar info da bateria
    exibirDetalhes(): void {
        super.exibirDetalhes(); // Chama a implementação da classe pai (Carro)
        console.log(`   Bateria: ${this.autonomiaBateria}km de autonomia.`);
    }
}

console.log(`Total de veículos inicial: ${Veiculo.obterTotalVeiculos()}`); // -> 0

let meuCarro = new Carro("Toyota", "Corolla", 2023, 4);
let meuEletrico = new CarroEletrico("Tesla", "Model 3", 2024, 4, 500);

console.log(`Total de veículos atual: ${Veiculo.obterTotalVeiculos()}`); // -> 2

meuCarro.exibirDetalhes();
meuEletrico.exibirDetalhes();
meuEletrico.carregarBateria();

// Acessando propriedade protegida através de método público
console.log(`Ano do carro elétrico: ${meuEletrico.obterAno()}`); 

// Erro: Property 'ano' is protected...
// console.log(meuEletrico.ano); 
```

**Exercício: Figuras Geométricas**

1.  Crie uma **interface** chamada `Calculavel` com um método `calcularPerimetro(): number`.
2.  Crie uma **classe abstrata** chamada `Figura` que implemente `Calculavel`. Ela deve ter:
    *   Uma propriedade `readonly nome: string` inicializada no construtor.
    *   Um método concreto `descrever(): void` que imprime "Figura: [nome]".
    *   Um método abstrato `calcularArea(): number`.
    *   O método `calcularPerimetro()` da interface (pode ser abstrato também, ou ter uma implementação padrão que retorna 0 se fizer sentido).
3.  Crie uma classe **`RetanguloFigura`** que herda de `Figura`:
    *   Deve ter propriedades `largura: number` e `altura: number` (use propriedades de parâmetro no construtor).
    *   O construtor deve chamar `super()` passando "Retângulo".
    *   Implemente `calcularArea()` e `calcularPerimetro()`.
4.  Crie uma classe **`CirculoFigura`** que herda de `Figura`:
    *   Deve ter uma propriedade `raio: number`.
    *   O construtor deve chamar `super()` passando "Círculo".
    *   Implemente `calcularArea()` e `calcularPerimetro()` (Perímetro = 2 * PI * raio).
5.  Crie uma **classe estática** (ou uma classe com apenas métodos estáticos) chamada `ComparadorFiguras` com um método estático `compararAreas(fig1: Figura, fig2: Figura): Figura` que retorna a figura com a maior área.
6.  Instancie um `RetanguloFigura` e um `CirculoFigura`.
7.  Chame os métodos `descrever()`, `calcularArea()` e `calcularPerimetro()` para cada instância.
8.  Use o `ComparadorFiguras.compararAreas()` para determinar qual figura tem a maior área e imprima o nome da figura maior.

Este exercício consolida o uso de classes abstratas, herança, interfaces, implementações de métodos e membros estáticos.

Na próxima seção, avançaremos para tópicos mais poderosos como Generics e Tipos Avançados.
# Seção 6: Tipos Avançados e Genéricos

Até agora, cobrimos os fundamentos dos tipos, interfaces, funções e classes em TypeScript. Para construir aplicações verdadeiramente robustas, flexíveis e reutilizáveis, precisamos explorar alguns dos recursos mais poderosos do sistema de tipos do TypeScript: **Generics** e **Tipos Avançados**.

Esses conceitos permitem criar componentes que podem trabalhar com uma variedade de tipos de forma segura, manipular tipos existentes para criar novos e expressar relações complexas entre tipos.

## Generics: Criando Componentes Reutilizáveis

Generics (ou tipos genéricos) permitem que você escreva código que pode operar sobre uma variedade de tipos, em vez de ficar restrito a um único tipo. Isso promove a reutilização de código sem sacrificar a segurança de tipo. Pense neles como variáveis para tipos.

Usamos variáveis de tipo (geralmente letras maiúsculas como `T`, `U`, `K`, `V`) entre colchetes angulares (`<>`) para introduzir um tipo genérico.

### Funções Genéricas

Imagine uma função que simplesmente retorna o primeiro argumento que recebe. Sem generics, teríamos que usar `any` (ruim) ou criar funções separadas para cada tipo.

```typescript
// Usando any (perde segurança de tipo)
function identidadeAny(arg: any): any {
  return arg;
}

// Usando Generics
function identidade<T>(arg: T): T {
  console.log(`Tipo do argumento: ${typeof arg}`);
  return arg;
}

// O tipo é inferido na chamada
let saidaString = identidade("minha string"); // T é inferido como string
let saidaNumero = identidade(123); // T é inferido como number
let saidaBooleano = identidade(true); // T é inferido como boolean

// Você também pode especificar o tipo explicitamente
let saidaObjeto = identidade<{ nome: string }>({ nome: "Objeto Genérico" });

console.log(saidaString.toUpperCase()); // OK, TypeScript sabe que é string
console.log(saidaNumero.toFixed(2)); // OK, TypeScript sabe que é number
```

A variável de tipo `T` captura o tipo do argumento `arg` e é usada para anotar o tipo de retorno. Isso garante que o tipo retornado seja o mesmo que o tipo passado, preservando a segurança de tipo.

### Interfaces Genéricas

Interfaces também podem ser genéricas, permitindo definir estruturas que podem conter diferentes tipos.

```typescript
interface Caixa<T> {
  conteudo: T;
  descricao: string;
}

let caixaDeString: Caixa<string> = {
  conteudo: "Texto secreto",
  descricao: "Uma caixa que guarda texto"
};

let caixaDeNumero: Caixa<number> = {
  conteudo: 100,
  descricao: "Uma caixa que guarda um número"
};

let caixaDeData: Caixa<Date> = {
    conteudo: new Date(),
    descricao: "Uma caixa que guarda uma data"
};

console.log(caixaDeString.conteudo.length); // OK
console.log(caixaDeNumero.conteudo.toFixed(0)); // OK
console.log(caixaDeData.conteudo.getFullYear()); // OK
```

### Classes Genéricas

Classes também podem ser genéricas, úteis para criar estruturas de dados ou coleções que funcionam com qualquer tipo.

```typescript
class Pilha<T> {
  private itens: T[] = [];

  empilhar(item: T): void {
    this.itens.push(item);
  }

  desempilhar(): T | undefined {
    return this.itens.pop();
  }

  verTopo(): T | undefined {
    return this.itens[this.itens.length - 1];
  }

  tamanho(): number {
      return this.itens.length;
  }
}

let pilhaDeNumeros = new Pilha<number>();
pilhaDeNumeros.empilhar(1);
pilhaDeNumeros.empilhar(2);
console.log(pilhaDeNumeros.verTopo()); // -> 2
console.log(pilhaDeNumeros.desempilhar()); // -> 2
console.log(pilhaDeNumeros.tamanho()); // -> 1

let pilhaDeStrings = new Pilha<string>();
pilhaDeStrings.empilhar("A");
pilhaDeStrings.empilhar("B");
console.log(pilhaDeStrings.desempilhar()?.toLowerCase()); // -> b
```

### Constraints (Restrições) em Generics

Às vezes, você quer que seu código genérico funcione apenas com tipos que tenham certas propriedades ou sigam uma determinada estrutura. Você pode usar *constraints* (restrições) para limitar os tipos que podem ser usados com seu generic.

Usamos a palavra-chave `extends` na declaração do tipo genérico para especificar a restrição.

```typescript
// Restrição: T deve ter uma propriedade 'length' do tipo number
interface Comprimentavel {
  length: number;
}

function logarComprimento<T extends Comprimentavel>(arg: T): void {
  console.log(`Comprimento: ${arg.length}`);
}

logarComprimento("Olá mundo"); // OK, string tem length
logarComprimento([1, 2, 3]); // OK, array tem length
logarComprimento({ length: 10, valor: "teste" }); // OK, objeto tem length

// Erro: Argument of type 'number' is not assignable to parameter of type 'Comprimentavel'.
// logarComprimento(123); 
```

## Tipos de União (`|`)

Tipos de união permitem que uma variável possa ser de um entre vários tipos possíveis. Usamos a barra vertical (`|`) para separar os tipos.

```typescript
function exibirId(id: string | number): void {
  console.log(`ID: ${id}`);
  // Para usar métodos específicos de string ou number, precisamos verificar o tipo
  if (typeof id === "string") {
    console.log(id.toUpperCase()); // OK dentro do if
  } else {
    console.log(id.toFixed(0)); // OK dentro do else (TypeScript sabe que é number)
  }
}

exibirId(101);
// -> ID: 101
// -> 101
exibirId("abc-987");
// -> ID: abc-987
// -> ABC-987

// Erro: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.
// exibirId(true);
```

Tipos de união são muito úteis para modelar situações onde um valor pode ter diferentes formas.

## Tipos de Interseção (`&`)

Tipos de interseção combinam múltiplos tipos em um único tipo que possui *todas* as propriedades de cada tipo combinado. Usamos o E comercial (`&`).

```typescript
interface EntidadeBase {
  id: number;
  dataCriacao: Date;
}

interface Usuario {
  nome: string;
  email: string;
}

interface Produto {
  codigo: string;
  preco: number;
}

// Combina EntidadeBase e Usuario
type UsuarioComTimestamp = EntidadeBase & Usuario;
// Combina EntidadeBase e Produto
type ProdutoComTimestamp = EntidadeBase & Produto;

let usuarioLogado: UsuarioComTimestamp = {
  id: 1,
  dataCriacao: new Date(),
  nome: "Fernanda",
  email: "fe@email.com"
};

let produtoEstoque: ProdutoComTimestamp = {
    id: 1001,
    dataCriacao: new Date(),
    codigo: "XYZ-001",
    preco: 55.75
};

console.log(usuarioLogado.nome); // OK
console.log(usuarioLogado.dataCriacao.toISOString()); // OK
console.log(produtoEstoque.codigo); // OK
console.log(produtoEstoque.id); // OK
```

Interseções são úteis para compor tipos a partir de partes menores e reutilizáveis.

## Tipos Literais

Tipos literais permitem especificar *exatamente* quais valores (strings, números ou booleanos) uma variável pode ter, em vez de apenas o tipo geral.

```typescript
type Resposta = "sim" | "nao" | "talvez";
type Alinhamento = "esquerda" | "centro" | "direita";
type NumeroSorte = 7 | 13 | 42;

let minhaResposta: Resposta = "sim";
// minhaResposta = "ok"; // Erro: Type '"ok"' is not assignable to type 'Resposta'.

function alinharTexto(texto: string, alinhamento: Alinhamento): void {
  console.log(`Alinhando '${texto}' para: ${alinhamento}`);
  // Lógica de alinhamento...
}

alinharTexto("Título Principal", "centro");
// alinharTexto("Subtítulo", "meio"); // Erro
```

Tipos literais combinados com uniões são excelentes para criar conjuntos restritos de opções, como status, tipos de eventos, etc., oferecendo mais segurança que enums de string em alguns casos.

## Tipos Mapeados (Mapped Types)

Tipos mapeados permitem criar novos tipos transformando as propriedades de um tipo existente. A sintaxe é similar a `for...in` para propriedades.

```typescript
interface Pessoa {
  nome: string;
  idade: number;
  email?: string; // Propriedade opcional
}

// Cria um tipo onde todas as propriedades de T são readonly
type SomenteLeitura<T> = {
  readonly [P in keyof T]: T[P];
};

// Cria um tipo onde todas as propriedades de T são opcionais
type Opcional<T> = {
  [P in keyof T]?: T[P];
};

// Cria um tipo onde todas as propriedades de T são não-nulas/não-undefined
type Requerido<T> = {
    [P in keyof T]-?: T[P]; // O '-?' remove a opcionalidade
};

let pessoaLeitura: SomenteLeitura<Pessoa> = {
  nome: "Carlos",
  idade: 40,
  email: "carlos@email.com"
};
// pessoaLeitura.nome = "José"; // Erro: Cannot assign to 'nome' because it is a read-only property.

let pessoaParcial: Opcional<Pessoa> = {
  nome: "Ana" // idade e email são opcionais agora
};

let pessoaCompleta: Requerido<Pessoa> = {
    nome: "Bruno",
    idade: 25,
    email: "bruno@email.com" // email agora é obrigatório
};
```

Tipos mapeados são poderosos para criar variações de tipos existentes (como torná-los todos opcionais, somente leitura, etc.) sem repetição.

## Tipos Condicionais (Conditional Types)

Tipos condicionais permitem escolher um tipo com base em uma condição verificada estaticamente. A sintaxe é similar ao operador ternário do JavaScript: `AlgumTipo extends OutroTipo ? TipoSeVerdadeiro : TipoSeFalso`.

```typescript
interface IdLabel {
  id: number;
}
interface NameLabel {
  name: string;
}

// Se T tiver 'id', o tipo é IdLabel, senão, se tiver 'name', é NameLabel, senão, é never.
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function criarLabel<T extends number | string>(valor: T): NameOrId<T> {
  if (typeof valor === "number") {
    // TypeScript sabe que T é number aqui, então NameOrId<T> é IdLabel
    return { id: valor } as NameOrId<T>; 
  } else {
    // TypeScript sabe que T é string aqui, então NameOrId<T> é NameLabel
    return { name: valor } as NameOrId<T>;
  }
}

let label1 = criarLabel(123); // Tipo de label1 é IdLabel
let label2 = criarLabel("produtoX"); // Tipo de label2 é NameLabel

console.log(label1.id);
console.log(label2.name);

// Exemplo: Extrair o tipo de retorno de uma função
type TipoRetorno<T> = T extends (...args: any[]) => infer R ? R : any;

type RetornoDaSoma = TipoRetorno<() => number>; // number
type RetornoDoLog = TipoRetorno<(msg: string) => void>; // void
```

Tipos condicionais, especialmente com a palavra-chave `infer`, são usados em cenários avançados para extrair ou transformar tipos com base em sua estrutura.

## Operadores `keyof` e `typeof`

*   **`keyof`**: O operador `keyof` pega um tipo de objeto e produz uma união de strings ou números literais representando suas chaves (nomes das propriedades).

    ```typescript
    interface Ponto2D {
      x: number;
      y: number;
    }
    
    type ChavesPonto = keyof Ponto2D; // O tipo é "x" | "y"
    
    let chave: ChavesPonto = "x";
    // chave = "z"; // Erro: Type '"z"' is not assignable to type 'keyof Ponto2D'.
    
    function obterPropriedade<T, K extends keyof T>(obj: T, key: K): T[K] {
        return obj[key];
    }
    
    let ponto = { x: 10, y: 20 };
    let valorX = obterPropriedade(ponto, "x"); // valorX é number
    let valorY = obterPropriedade(ponto, "y"); // valorY é number
    // let valorZ = obterPropriedade(ponto, "z"); // Erro: Argument of type '"z"' is not assignable to parameter of type '"x" | "y"'.
    ```
    `keyof` é muito útil com generics para trabalhar com propriedades de objetos de forma segura.

*   **`typeof`**: Em um contexto de *tipo*, `typeof` permite obter o tipo de uma *variável* ou *propriedade*.

    ```typescript
    let s = "hello";
    let n: typeof s; // n tem o tipo string
    
    type Predicate = (x: unknown) => boolean;
    type K = ReturnType<Predicate>; // K tem o tipo boolean (ReturnType é um tipo utilitário)
    
    function f() {
      return { a: 10, b: "world" };
    }
    
    type TipoRetornoF = ReturnType<typeof f>; // { a: number, b: string }
    let objF: TipoRetornoF = { a: 1, b: "teste" };
    ```

## Tipos Utilitários (Utility Types)

TypeScript vem com vários tipos utilitários pré-definidos (muitos implementados usando tipos mapeados, condicionais, `keyof`, etc.) para facilitar manipulações comuns de tipos. Já vimos alguns exemplos, mas aqui estão os mais usados:

*   **`Partial<T>`**: Torna todas as propriedades de `T` opcionais.
    ```typescript
    interface Tarefa {
      id: number;
      titulo: string;
      concluida: boolean;
    }
    
    function atualizarTarefa(id: number, atualizacoes: Partial<Tarefa>) {
      // ... busca tarefa com id
      // ... aplica atualizacoes (ex: atualizacoes.titulo, atualizacoes.concluida)
      console.log(`Atualizando tarefa ${id} com:`, atualizacoes);
    }
    
    atualizarTarefa(1, { concluida: true });
    atualizarTarefa(2, { titulo: "Novo Título", concluida: false });
    ```
*   **`Required<T>`**: Torna todas as propriedades de `T` obrigatórias (remove a opcionalidade).
*   **`Readonly<T>`**: Torna todas as propriedades de `T` somente leitura.
*   **`Record<K, T>`**: Cria um tipo de objeto cujas chaves são do tipo `K` (geralmente `string | number | symbol` ou uma união de literais) e os valores são do tipo `T`.
    ```typescript
    type NomesCidades = "SP" | "RJ" | "BH";
    type PopulacaoCidades = Record<NomesCidades, number>;
    
    const populacoes: PopulacaoCidades = {
      SP: 12_300_000,
      RJ: 6_700_000,
      BH: 2_500_000
      // MG: 21_000_000 // Erro: "MG" não está em NomesCidades
    };
    ```
*   **`Pick<T, K>`**: Cria um tipo selecionando apenas um conjunto de propriedades `K` (uma união de chaves literais) do tipo `T`.
    ```typescript
    interface Post {
      id: number;
      titulo: string;
      conteudo: string;
      autor: string;
      data: Date;
    }
    
    type PreviewPost = Pick<Post, "id" | "titulo" | "autor">;
    
    let preview: PreviewPost = {
      id: 10,
      titulo: "TypeScript Avançado",
      autor: "Maria"
      // conteudo: "..." // Erro: 'conteudo' não existe em PreviewPost
    };
    ```
*   **`Omit<T, K>`**: Cria um tipo removendo um conjunto de propriedades `K` do tipo `T` (o oposto de `Pick`).
    ```typescript
    type PostSemConteudo = Omit<Post, "conteudo" | "data">;
    
    let postInfo: PostSemConteudo = {
        id: 11,
        titulo: "Outro Post",
        autor: "João"
    };
    ```
*   **`Exclude<T, U>`**: Exclui de `T` todos os tipos que são atribuíveis a `U`.
*   **`Extract<T, U>`**: Extrai de `T` todos os tipos que são atribuíveis a `U`.
*   **`NonNullable<T>`**: Exclui `null` e `undefined` de `T`.
*   **`ReturnType<T>`**: Obtém o tipo de retorno de um tipo de função `T`.
*   **`Parameters<T>`**: Obtém os tipos dos parâmetros de um tipo de função `T` como uma tupla.
*   **`InstanceType<T>`**: Obtém o tipo da instância de um tipo de classe construtora `T`.

Explorar e usar esses tipos utilitários pode economizar muito tempo e tornar seu código mais expressivo e seguro.

## Exemplos Práticos e Exercícios

**Exemplo: API Genérica de Busca**

```typescript
interface EntidadeComId {
  id: number | string;
}

// Função genérica com constraint e tipo de retorno complexo
async function buscarPorId<T extends EntidadeComId>(
    endpoint: string, 
    id: T['id'] // Usa indexed access type para pegar o tipo de 'id' de T
): Promise<T | null> { // Retorna uma Promise com T ou null
    
  console.log(`Buscando em ${endpoint} pelo ID: ${id}`);
  // Simula uma chamada de API
  await new Promise(resolve => setTimeout(resolve, 500)); 
  
  // Simula encontrar ou não o recurso
  if (Math.random() > 0.3) { 
    // Em um caso real, aqui viria a lógica para construir o objeto T
    // com base na resposta da API. Vamos simular.
    const mockData: Partial<T> = { id: id }; 
    console.log("Recurso encontrado (simulado).");
    return mockData as T; // Usamos type assertion aqui para o exemplo
  } else {
    console.log("Recurso não encontrado.");
    return null;
  }
}

// Definindo nossas entidades
interface Cliente extends EntidadeComId {
    id: number;
    nome: string;
    limiteCredito: number;
}

interface Pedido extends EntidadeComId {
    id: string;
    data: Date;
    valor: number;
}

// Usando a função genérica
async function testarBusca() {
    const cliente = await buscarPorId<Cliente>("/api/clientes", 101);
    if (cliente) {
        console.log(`Cliente encontrado: ID=${cliente.id}`); // cliente é do tipo Cliente | null
        // console.log(cliente.nome); // OK se não for null
    }

    const pedido = await buscarPorId<Pedido>("/api/pedidos", "PED-XYZ");
    if (pedido) {
        console.log(`Pedido encontrado: ID=${pedido.id}`); // pedido é do tipo Pedido | null
        // console.log(pedido.data); // OK se não for null
    }
}

testarBusca();
```

**Exercício: Utilitários de Tipos e Mapeamento**

1.  Defina uma interface `ConfiguracaoUsuario` com as seguintes propriedades:
    *   `id` (number)
    *   `tema` ("claro" | "escuro")
    *   `notificacoesAtivas` (boolean)
    *   `idioma` (string, opcional)
    *   `ultimoLogin` (Date, readonly)
2.  Usando tipos utilitários, crie os seguintes tipos derivados:
    *   `ConfiguracaoEditavel`: Um tipo onde apenas `tema`, `notificacoesAtivas` e `idioma` podem ser definidos (use `Pick` ou `Omit`).
    *   `ConfiguracaoParcial`: Um tipo onde todas as propriedades da `ConfiguracaoUsuario` original são opcionais (use `Partial`).
    *   `ConfiguracaoSomenteLeitura`: Um tipo onde todas as propriedades da `ConfiguracaoUsuario` original são `readonly` (use `Readonly`).
3.  Crie uma função genérica `atualizarConfig<T, K extends keyof T>(config: T, chave: K, valor: T[K]): T`.
    *   Esta função deve receber um objeto de configuração `config`, uma `chave` (que deve ser uma chave válida de `config`) e um `valor` (que deve ter o tipo correspondente à chave em `config`).
    *   A função deve retornar um *novo* objeto de configuração com a propriedade especificada atualizada (para imutabilidade).
4.  Crie um objeto `configInicial` do tipo `ConfiguracaoUsuario`.
5.  Use a função `atualizarConfig` para criar uma nova configuração com o `tema` alterado para "escuro".
6.  Use a função `atualizarConfig` para tentar atualizar a propriedade `ultimoLogin` (deve funcionar, mas o tipo `ConfiguracaoSomenteLeitura` ajudaria a prevenir isso em outros contextos).
7.  Crie uma função `aplicarAtualizacoes(configBase: ConfiguracaoUsuario, atualizacoes: ConfiguracaoParcial): ConfiguracaoUsuario` que recebe a configuração base e um objeto de atualizações parciais, retornando uma nova configuração mesclada.

Este exercício reforça o uso de Generics com constraints, tipos utilitários (`Pick`, `Omit`, `Partial`, `Readonly`), `keyof` e a manipulação de tipos para criar funções seguras e reutilizáveis.

Na próxima seção, abordaremos como organizar seu código TypeScript usando Módulos e Namespaces.
# Seção 7: Módulos e Namespaces

À medida que as aplicações crescem, organizar o código em arquivos separados e gerenciáveis torna-se essencial. JavaScript, historicamente, teve diferentes abordagens para modularização, e TypeScript adota e aprimora o sistema de módulos padrão do ECMAScript (ES6), além de suportar um conceito mais antigo chamado Namespaces.

Compreender como usar módulos é fundamental para estruturar projetos TypeScript de forma eficaz, promovendo a reutilização, a manutenibilidade e evitando conflitos de nomes em escopos globais.

## Organizando o Código

Em projetos pequenos, pode ser tentador colocar todo o código em um único arquivo. No entanto, isso rapidamente se torna insustentável. Dividir o código em múltiplos arquivos, cada um com uma responsabilidade específica (como definir uma classe, um conjunto de funções utilitárias, ou a lógica de um componente), torna o projeto mais fácil de navegar, entender, testar e manter.

TypeScript incentiva fortemente o uso de módulos para essa organização.

## Módulos ES6 (`import`/`export`)

TypeScript adota o sistema de módulos padrão do ECMAScript (a partir do ES6/ES2015). Qualquer arquivo contendo uma declaração `import` ou `export` de nível superior é considerado um **módulo**. Módulos têm seu próprio escopo; variáveis, funções, classes, etc., declaradas em um módulo não são visíveis globalmente, a menos que sejam explicitamente **exportadas**.

Para usar algo definido em outro módulo, você precisa **importá-lo**.

**Exportando Membros (`export`)**

Você pode exportar declarações (variáveis, funções, classes, interfaces, type aliases, enums) de um módulo de duas maneiras principais:

1.  **Exportações Nomeadas (Named Exports)**: Exporte membros individualmente usando a palavra-chave `export` antes de sua declaração.

    ```typescript
    // --- arquivo: utilitariosMatematicos.ts ---
    export const PI: number = 3.14159;
    
    export function somar(a: number, b: number): number {
      return a + b;
    }
    
    export class Calculadora {
      multiplicar(a: number, b: number): number {
        return a * b;
      }
    }
    
    // Também pode exportar no final
    const EULER = 2.71828;
    export { EULER }; 
    ```

2.  **Exportação Padrão (Default Export)**: Cada módulo pode ter no máximo *uma* exportação padrão. É útil para exportar a principal funcionalidade do módulo (como uma classe ou função).

    ```typescript
    // --- arquivo: validadorEmail.ts ---
    export default function validarEmail(email: string): boolean {
      // Lógica de validação simples
      const re = /^\S+@\S+\.\S+$/;
      return re.test(email);
    }
    
    // Não pode ter outro export default no mesmo arquivo
    // export default class OutraCoisa { ... } // Erro
    ```

**Importando Membros (`import`)**

Para usar os membros exportados de outro módulo, você usa a declaração `import`.

1.  **Importando Exportações Nomeadas**: Use chaves `{}` para listar os membros que deseja importar pelo nome.

    ```typescript
    // --- arquivo: main.ts ---
    import { PI, somar, Calculadora, EULER } from "./utilitariosMatematicos";
    // O caminho "./utilitariosMatematicos" é relativo ao arquivo atual (main.ts)
    // A extensão .ts é geralmente omitida
    
    console.log(`Valor de PI: ${PI}`);
    console.log(`Soma: ${somar(5, 3)}`);
    
    let calc = new Calculadora();
    console.log(`Multiplicação: ${calc.multiplicar(4, 6)}`);
    console.log(`Euler: ${EULER}`);
    
    // Você pode renomear importações usando 'as'
    import { somar as adicionar } from "./utilitariosMatematicos";
    console.log(`Adição: ${adicionar(10, 5)}`);
    ```

2.  **Importando Exportação Padrão**: Importe a exportação padrão dando a ela um nome qualquer (sem chaves).

    ```typescript
    // --- arquivo: main.ts (continuação) ---
    import meuValidadorDeEmail from "./validadorEmail";
    // O nome 'meuValidadorDeEmail' é escolhido aqui, poderia ser qualquer outro
    
    console.log(`Email "teste@exemplo.com" é válido? ${meuValidadorDeEmail("teste@exemplo.com")}`); // -> true
    console.log(`Email "invalido@" é válido? ${meuValidadorDeEmail("invalido@")}`); // -> false
    ```

3.  **Importando Tudo (Namespace Import)**: Você pode importar todos os membros exportados (nomeados) de um módulo para dentro de um único objeto (namespace).

    ```typescript
    // --- arquivo: main.ts (continuação) ---
    import * as Matematica from "./utilitariosMatematicos";
    
    console.log(`PI (via namespace): ${Matematica.PI}`);
    console.log(`Soma (via namespace): ${Matematica.somar(100, 200)}`);
    let calcNs = new Matematica.Calculadora();
    console.log(`Multiplicação (via namespace): ${calcNs.multiplicar(7, 7)}`);
    ```
    Isso não importa a exportação padrão.

4.  **Importando Tipos**: Interfaces e Type Aliases podem ser importados/exportados da mesma forma. TypeScript é inteligente o suficiente para remover importações de tipos que são usados apenas em anotações de tipo durante a compilação para JavaScript (type-only imports/exports).

    ```typescript
    // --- arquivo: tipos.ts ---
    export interface OpcoesConfig {
      timeout: number;
      retentativas?: number;
    }
    export type Status = "ativo" | "inativo";
    
    // --- arquivo: configurador.ts ---
    import { OpcoesConfig, Status } from "./tipos";
    
    export function configurarSistema(opcoes: OpcoesConfig): Status {
      console.log(`Configurando com timeout: ${opcoes.timeout}`);
      // ... lógica
      return "ativo";
    }
    ```

## Namespaces (Legado e Casos de Uso)

Antes dos módulos ES6 se tornarem padrão, JavaScript (e TypeScript) usavam outras formas de organizar código e evitar poluição do escopo global. Uma dessas formas em TypeScript são os **Namespaces** (anteriormente chamados de "Módulos Internos").

Um namespace agrupa funcionalidades relacionadas sob um nome único. Membros dentro de um namespace precisam ser exportados para serem acessíveis de fora dele.

```typescript
// --- arquivo: validacoes.ts ---
namespace Validacao {
  // Interface não exportada (interna ao namespace)
  interface Validador {
    ehValido(s: string): boolean;
  }

  // Classe exportada (acessível como Validacao.ValidadorDeCEP)
  export class ValidadorDeCEP implements Validador {
    private cepRegex = /^\d{5}-?\d{3}$/;
    ehValido(s: string): boolean {
      return this.cepRegex.test(s);
    }
  }

  // Classe exportada
  export class ValidadorDeEmail implements Validador {
    private emailRegex = /^\S+@\S+\.\S+$/;
    ehValido(s: string): boolean {
      return this.emailRegex.test(s);
    }
  }
}

// --- arquivo: app.ts ---
// Para usar namespaces definidos em outros arquivos, você pode precisar
// referenciá-los (em projetos menores ou configurações específicas)
/// <reference path="validacoes.ts" />

let validadorCep = new Validacao.ValidadorDeCEP();
let validadorEmail = new Validacao.ValidadorDeEmail();

console.log(`CEP "12345-678" é válido? ${validadorCep.ehValido("12345-678")}`); // -> true
console.log(`Email "teste@email.com" é válido? ${validadorEmail.ehValido("teste@email.com")}`); // -> true
```

**Quando usar Namespaces?**

*   **Legado:** Você pode encontrá-los em código TypeScript mais antigo.
*   **Estruturação de Arquivos de Declaração (`.d.ts`):** São frequentemente usados para organizar tipos de bibliotecas JavaScript globais (que não usam módulos ES6), como as encontradas no repositório DefinitelyTyped (`@types`).
*   **Projetos Menores/Scripts Simples:** Em cenários muito simples onde a complexidade dos módulos ES6 pode parecer excessiva (embora módulos ainda sejam geralmente preferíveis).

**Compilando Namespaces:**

Se você usar namespaces em múltiplos arquivos referenciados com `/// <reference path="..." />`, você geralmente compila todos eles juntos em um único arquivo de saída usando a opção `--outFile` no `tsc` (isso funciona melhor com `module` definido como `amd` ou `system` no `tsconfig.json`, não `commonjs` ou `esnext`).

## Diferenças entre Módulos e Namespaces

| Característica        | Módulos (ES6 `import`/`export`)                     | Namespaces (`namespace`)                             |
| :-------------------- | :-------------------------------------------------- | :--------------------------------------------------- |
| **Escopo**            | Arquivo (cada arquivo é um módulo)                  | Definido pelo bloco `namespace {}`                   |
| **Dependências**      | Explícitas via `import`                             | Menos explícitas (ordem de carregamento/`reference`) |
| **Padrão Moderno**    | Sim (padrão ECMAScript)                             | Não (mais antigo, menos comum em código novo)        |
| **Carregamento**      | Geralmente assíncrono (loaders/bundlers)            | Geralmente síncrono (em arquivos únicos compilados) |
| **Recomendação**      | **Preferível** para a maioria dos projetos novos    | Usar com cautela, principalmente para legados/`.d.ts` |
| **Compilação**        | Arquivo por arquivo (geralmente)                    | Pode ser compilado em um único arquivo (`--outFile`) |
| **Conflito de Nomes** | Menos propenso (escopo de arquivo)                  | Ajuda a evitar conflito global, mas não entre arquivos |

**Em resumo:** Para novos projetos, **use módulos ES6 (`import`/`export`)**. Eles são o padrão moderno, oferecem melhor gerenciamento de dependências e se integram perfeitamente com o ecossistema JavaScript atual (Node.js, bundlers como Webpack/Vite, navegadores).

## Resolução de Módulos

Quando você escreve `import { algo } from "./meuModulo";` ou `import * as React from "react";`, como o TypeScript (e depois o JavaScript em tempo de execução) encontra o arquivo correspondente?

O processo é chamado de **resolução de módulos**. TypeScript suporta duas estratégias principais, configuradas pela opção `moduleResolution` no `tsconfig.json`:

1.  **`Node` (ou `Node16`, `NodeNext`)**: Esta é a estratégia **padrão e recomendada** para a maioria dos projetos, especialmente aqueles que rodam em Node.js ou usam bundlers. Ela imita o mecanismo de resolução do Node.js:
    *   **Módulos Relativos (`./`, `../`)**: Procura por arquivos `.ts`, `.tsx`, `.d.ts` (nessa ordem) no caminho relativo especificado. Se não encontrar, procura por uma pasta com esse nome contendo um `index.ts` (ou `.tsx`, `.d.ts`).
    *   **Módulos Não Relativos (ex: `"react"`, `"lodash"`)**: Procura dentro das pastas `node_modules` subindo na árvore de diretórios a partir do arquivo atual. Dentro de `node_modules/nome-do-pacote/`, procura por:
        1.  Um campo `types` ou `typings` no `package.json` do pacote, apontando para um arquivo `.d.ts`.
        2.  Um arquivo `index.d.ts` na raiz do pacote.
        3.  Se o pacote não inclui tipos, o TypeScript procura por um pacote `@types/nome-do-pacote` em `node_modules` (instalado via `npm install @types/nome-do-pacote`).

2.  **`Classic` (Legado)**: Uma estratégia mais antiga, raramente usada hoje. Procura apenas subindo a árvore de diretórios a partir do arquivo importador, sem a lógica complexa de `node_modules`.

**Recomendação:** Mantenha `"moduleResolution": "Node"` (ou `Node16`/`NodeNext` para projetos mais modernos que usam extensões `.js` em imports) no seu `tsconfig.json`.

## Exemplos Práticos e Exercícios

**Exemplo: Estruturando um Mini-Projeto**

Imagine a seguinte estrutura de pastas:

```
mini-projeto/
├── src/
│   ├── index.ts       (Arquivo principal)
│   ├── models/
│   │   └── usuario.ts   (Define a interface Usuario)
│   └── services/
│       └── authService.ts (Funções de autenticação)
├── tsconfig.json
└── package.json
```

*   **`src/models/usuario.ts`**
    ```typescript
    export interface Usuario {
      id: number;
      nome: string;
      email: string;
    }
    ```

*   **`src/services/authService.ts`**
    ```typescript
    import { Usuario } from "../models/usuario"; // Import relativo
    
    // Simula um banco de dados de usuários
    const usuariosDB: Usuario[] = [
      { id: 1, nome: "Alice", email: "alice@email.com" },
      { id: 2, nome: "Bob", email: "bob@email.com" }
    ];
    
    export function login(email: string): Usuario | null {
      console.log(`Tentando login para: ${email}`);
      const usuario = usuariosDB.find(u => u.email === email);
      return usuario || null;
    }
    
    export function obterUsuarioPorId(id: number): Usuario | null {
        console.log(`Buscando usuário por ID: ${id}`);
        const usuario = usuariosDB.find(u => u.id === id);
        return usuario || null;
    }
    ```

*   **`src/index.ts`**
    ```typescript
    import { Usuario } from "./models/usuario";
    import { login, obterUsuarioPorId } from "./services/authService";
    // Poderia ser: import * as AuthService from "./services/authService";
    
    console.log("--- Iniciando Mini-Projeto ---");
    
    const usuarioLogado: Usuario | null = login("alice@email.com");
    
    if (usuarioLogado) {
      console.log(`Login bem-sucedido! Bem-vinda, ${usuarioLogado.nome}!`);
      
      const usuarioEncontrado = obterUsuarioPorId(usuarioLogado.id);
      if (usuarioEncontrado) {
          console.log(`Usuário ${usuarioEncontrado.id} encontrado novamente.`);
      }
    } else {
      console.log("Falha no login.");
    }
    
    const tentativaFalha = login("charlie@email.com");
    if (!tentativaFalha) {
        console.log("Login para Charlie falhou como esperado.");
    }
    ```

Para rodar (após compilar com `tsc`):
`node dist/index.js`

**Exercício: Módulo de Geometria**

1.  Crie uma estrutura de pastas:
    ```
    geometria/
    ├── src/
    │   ├── index.ts
    │   ├── formas/
    │   │   ├── retangulo.ts
    │   │   └── circulo.ts
    │   └── interfaces/
    │       └── forma.ts
    └── tsconfig.json
    ```
2.  Em `src/interfaces/forma.ts`, defina e exporte uma interface `Forma` com dois métodos: `calcularArea(): number` e `calcularPerimetro(): number`.
3.  Em `src/formas/retangulo.ts`:
    *   Importe a interface `Forma`.
    *   Crie e exporte uma classe `Retangulo` que implemente `Forma`.
    *   A classe deve ter propriedades `largura` and `altura` (inicializadas no construtor).
    *   Implemente os métodos `calcularArea` e `calcularPerimetro`.
4.  Em `src/formas/circulo.ts`:
    *   Importe a interface `Forma`.
    *   Crie e exporte uma classe `Circulo` que implemente `Forma`.
    *   A classe deve ter uma propriedade `raio`.
    *   Implemente os métodos `calcularArea` (PI * raio^2) e `calcularPerimetro` (2 * PI * raio).
5.  Em `src/index.ts`:
    *   Importe as classes `Retangulo` e `Circulo`.
    *   Crie uma instância de cada uma.
    *   Crie uma função `imprimirDetalhesForma` que recebe um argumento do tipo `Forma` e imprime sua área e perímetro no console.
    *   Chame `imprimirDetalhesForma` para ambas as instâncias.
6.  Configure o `tsconfig.json` apropriadamente (target, module, outDir, rootDir, moduleResolution, etc.).
7.  Compile o projeto com `tsc` e execute o resultado (`node dist/index.js`).

Este exercício reforça a criação de módulos separados para interfaces e implementações, o uso de `import`/`export` e a aplicação de interfaces para garantir contratos entre módulos.

Na próxima seção, exploraremos Decorators, um recurso experimental, mas poderoso, para metaprogramação em TypeScript.
# Seção 8: Decorators (Experimental)

Decorators são uma proposta para futuras versões do JavaScript (atualmente no Stage 3 do processo TC39) que o TypeScript implementa como um recurso **experimental**. Eles fornecem uma sintaxe especial para anotar ou modificar classes e seus membros (métodos, propriedades, accessors, parâmetros) de forma declarativa, habilitando cenários de metaprogramação.

**Importante:** Por ser um recurso experimental, a sintaxe e o comportamento dos decorators podem mudar em versões futuras do TypeScript e do JavaScript. Use-os com cautela em produção e esteja ciente de que podem exigir configuração específica.

## O que são Decorators?

Um Decorator é essencialmente uma função especial que pode ser anexada a uma declaração de classe, método, accessor, propriedade ou parâmetro usando a sintaxe `@expressao`, onde `expressao` deve avaliar para uma função que será chamada em tempo de execução com informações sobre a declaração decorada.

Eles permitem adicionar metadados, alterar o comportamento ou substituir a definição original do elemento decorado de maneira limpa e reutilizável, separando preocupações transversais (como logging, validação, injeção de dependência) da lógica principal da classe.

## Habilitando Decorators

Para usar decorators em seu projeto TypeScript, você precisa habilitar a opção `experimentalDecorators` no seu arquivo `tsconfig.json`:

```json
// tsconfig.json
{
  "compilerOptions": {
    // ... outras opções
    "target": "ES5", // Decorators funcionam melhor com targets mais antigos ou com polyfills
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true // Opcional, mas útil para reflexão (ex: com Reflect Metadata)
  }
}
```

*   `experimentalDecorators`: Habilita o suporte à sintaxe `@decorator`.
*   `emitDecoratorMetadata`: (Opcional) Faz com que o compilador emita metadados sobre os tipos dos elementos decorados, que podem ser usados em conjunto com bibliotecas como `reflect-metadata` para cenários de reflexão mais avançados (comum em frameworks de injeção de dependência como NestJS ou TypeORM).

Se você usar `emitDecoratorMetadata`, geralmente precisará instalar a biblioteca `reflect-metadata`:

```bash
npm install reflect-metadata
# ou
yarn add reflect-metadata
```

E importar `reflect-metadata` uma vez no ponto de entrada da sua aplicação (geralmente no arquivo principal, como `index.ts` ou `main.ts`):

```typescript
// main.ts
import "reflect-metadata";
// ... resto do código da aplicação
```

## Tipos de Decorators

Decorators podem ser aplicados a diferentes tipos de declarações, e a assinatura da função decorator varia de acordo:

1.  **Decorator de Classe**: Aplicado à declaração da classe. Recebe o construtor da classe como argumento.
    *   Pode ser usado para observar, modificar ou substituir a definição da classe.

2.  **Decorator de Método**: Aplicado a um método dentro de uma classe. Recebe três argumentos: o `target` (protótipo da classe para métodos de instância, ou a função construtora para métodos estáticos), a `propertyKey` (nome do método como string ou symbol) e o `descriptor` (Property Descriptor do método).
    *   Pode ser usado para observar, modificar ou substituir a definição do método.

3.  **Decorator de Accessor (Getter/Setter)**: Aplicado a um accessor. Recebe os mesmos três argumentos que um decorator de método (`target`, `propertyKey`, `descriptor`).
    *   Pode ser usado para observar, modificar ou substituir a definição do accessor.

4.  **Decorator de Propriedade**: Aplicado a uma propriedade dentro de uma classe. Recebe dois argumentos: o `target` (protótipo da classe para propriedades de instância, ou a função construtora para propriedades estáticas) e a `propertyKey` (nome da propriedade).
    *   **Importante:** Decorators de propriedade *não* recebem um descritor e *não podem* modificar diretamente o valor inicial da propriedade de forma simples (eles rodam antes da inicialização). São usados principalmente para registrar metadados sobre a propriedade.

5.  **Decorator de Parâmetro**: Aplicado a um parâmetro dentro de um construtor ou método. Recebe três argumentos: o `target` (protótipo da classe ou função construtora), a `propertyKey` (nome do método/construtor onde o parâmetro está) e o `parameterIndex` (índice do parâmetro na lista de parâmetros da função).
    *   Usado principalmente para registrar metadados sobre o parâmetro (comum em injeção de dependência).

## Exemplos Práticos

Vamos ver exemplos de cada tipo.

**Exemplo 1: Decorator de Classe (Simples Logger)**

Este decorator adiciona uma propriedade à classe e loga quando ela é instanciada.

```typescript
// Decorator Factory (retorna a função decorator)
function LogClasse(mensagem: string) {
  console.log(`[Factory LogClasse]: ${mensagem}`);
  // Função Decorator real
  return function <T extends { new (...args: any[]): {} }>(construtorOriginal: T) {
    console.log(`[Decorator LogClasse]: Aplicado à classe ${construtorOriginal.name}`);
    
    // Pode retornar uma nova classe que herda da original para modificar
    return class extends construtorOriginal {
      __logMensagem = mensagem; // Adiciona uma propriedade
      
      constructor(...args: any[]) {
        super(...args);
        console.log(`[Instância ${construtorOriginal.name}]: Criada com mensagem: ${this.__logMensagem}`);
      }
    };
  }
}

@LogClasse("Informação da Classe Pessoa")
class Pessoa {
  constructor(public nome: string, public idade: number) {
    console.log("[Construtor Pessoa]: Inicializando...");
  }
}

console.log("--- Criando instância P1 ---");
let p1 = new Pessoa("Ana", 30);
console.log("--- Criando instância P2 ---");
let p2 = new Pessoa("Beto", 45);

// Acessando a propriedade adicionada pelo decorator (requer type assertion ou interface)
// console.log((p1 as any).__logMensagem); 
```

**Saída:**
```
[Factory LogClasse]: Informação da Classe Pessoa
[Decorator LogClasse]: Aplicado à classe Pessoa
--- Criando instância P1 ---
[Construtor Pessoa]: Inicializando...
[Instância Pessoa]: Criada com mensagem: Informação da Classe Pessoa
--- Criando instância P2 ---
[Construtor Pessoa]: Inicializando...
[Instância Pessoa]: Criada com mensagem: Informação da Classe Pessoa
```

**Exemplo 2: Decorator de Método (Medir Tempo de Execução)**

Este decorator envolve o método original para medir quanto tempo ele leva para executar.

```typescript
function MedirTempo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value; // Salva a função original

  // Substitui a função original no descritor
  descriptor.value = function (...args: any[]) {
    const inicio = performance.now();
    console.log(`[MedirTempo ${propertyKey}]: Iniciando execução...`);
    
    // Chama a função original com os argumentos e o contexto (this) corretos
    const resultado = metodoOriginal.apply(this, args);
    
    const fim = performance.now();
    console.log(`[MedirTempo ${propertyKey}]: Finalizado. Tempo: ${(fim - inicio).toFixed(2)}ms`);
    
    return resultado; // Retorna o resultado original
  };

  return descriptor;
}

class CalculosComplexos {
  @MedirTempo
  calcularAlgoDemorado(iteracoes: number): number {
    console.log(`   Executando cálculo com ${iteracoes} iterações...`);
    let soma = 0;
    for (let i = 0; i < iteracoes * 1000000; i++) {
      soma += Math.sqrt(i);
    }
    return soma;
  }
}

let calc = new CalculosComplexos();
console.log("--- Chamando método decorado ---");
const resultadoCalculo = calc.calcularAlgoDemorado(50);
console.log(`Resultado final: ${resultadoCalculo}`);
```

**Saída (o tempo exato varia):**
```
--- Chamando método decorado ---
[MedirTempo calcularAlgoDemorado]: Iniciando execução...
   Executando cálculo com 50 iterações...
[MedirTempo calcularAlgoDemorado]: Finalizado. Tempo: 150.30ms 
Resultado final: 4714045207.844177
```

**Exemplo 3: Decorator de Propriedade e Parâmetro (com `reflect-metadata`)**

Este exemplo simula validação básica usando metadados.

```typescript
import "reflect-metadata"; // Importar uma vez

// Decorator de Parâmetro para marcar como requerido
function Requerido(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`[Decorator Requerido]: Marcando parâmetro ${parameterIndex} do método ${String(propertyKey)} como requerido.`);
  // Obtém metadados existentes ou inicializa um array vazio
  let indicesRequeridos: number[] = Reflect.getOwnMetadata("indicesRequeridos", target, propertyKey) || [];
  indicesRequeridos.push(parameterIndex);
  // Define os metadados com os índices requeridos
  Reflect.defineMetadata("indicesRequeridos", indicesRequeridos, target, propertyKey);
}

// Decorator de Método para validar parâmetros marcados
function Validar(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const metodoOriginal = descriptor.value;
  
  descriptor.value = function (...args: any[]) {
    console.log(`[Decorator Validar ${propertyKey}]: Validando argumentos...`);
    // Obtém os índices dos parâmetros requeridos dos metadados
    let indicesRequeridos: number[] = Reflect.getOwnMetadata("indicesRequeridos", target, propertyKey);
    
    if (indicesRequeridos) {
      for (let indice of indicesRequeridos) {
        if (indice >= args.length || args[indice] === undefined || args[indice] === null || args[indice] === "") {
          throw new Error(`Erro de validação: Parâmetro na posição ${indice} do método ${propertyKey} é requerido.`);
        }
      }
    }
    console.log(`[Decorator Validar ${propertyKey}]: Validação OK.`);
    return metodoOriginal.apply(this, args);
  }
}

class ServicoUsuario {
  @Validar
  criarUsuario(nome: string, @Requerido email: string, idade?: number) {
    console.log(`   Criando usuário: Nome=${nome}, Email=${email}, Idade=${idade ?? 'N/A'}`);
    // ... lógica de criação
  }
}

let servico = new ServicoUsuario();

console.log("--- Chamada Válida ---");
servico.criarUsuario("Carlos", "carlos@email.com", 35);

console.log("\n--- Chamada Inválida (email faltando) ---");
try {
  servico.criarUsuario("Daniel", ""); // Email vazio
} catch (e: any) {
  console.error(e.message);
}

console.log("\n--- Chamada Inválida (email undefined) ---");
try {
  servico.criarUsuario("Eduardo", undefined as any); // Passando undefined
} catch (e: any) {
  console.error(e.message);
}
```

**Saída:**
```
[Decorator Requerido]: Marcando parâmetro 1 do método criarUsuario como requerido.
--- Chamada Válida ---
[Decorator Validar criarUsuario]: Validando argumentos...
[Decorator Validar criarUsuario]: Validação OK.
   Criando usuário: Nome=Carlos, Email=carlos@email.com, Idade=35

--- Chamada Inválida (email faltando) ---
[Decorator Validar criarUsuario]: Validando argumentos...
Erro de validação: Parâmetro na posição 1 do método criarUsuario é requerido.

--- Chamada Inválida (email undefined) ---
[Decorator Validar criarUsuario]: Validando argumentos...
Erro de validação: Parâmetro na posição 1 do método criarUsuario é requerido.
```

## Casos de Uso Comuns

*   **Logging/Monitoramento**: Registrar chamadas de métodos, tempos de execução, argumentos.
*   **Validação**: Validar argumentos de métodos ou propriedades de classes (como no exemplo com `reflect-metadata`).
*   **Injeção de Dependência (DI)**: Frameworks como Angular e NestJS usam decorators extensivamente para marcar classes e parâmetros para injeção automática de dependências.
*   **Definição de Metadados**: Associar informações extras a classes ou membros que podem ser lidas posteriormente (ex: configuração de rotas em APIs, mapeamento objeto-relacional em ORMs como TypeORM).
*   **Modificação de Comportamento**: Adicionar caching, tratamento de erros padronizado, controle de acesso a métodos.

## Considerações Finais

Decorators são uma ferramenta poderosa para metaprogramação em TypeScript, permitindo escrever código mais limpo e declarativo para certas tarefas transversais. No entanto, lembre-se:

*   São **experimentais** e a especificação final pode diferir.
*   Podem adicionar uma camada de complexidade se usados excessivamente.
*   Requerem habilitação explícita no `tsconfig.json`.
*   Cenários avançados com metadados geralmente dependem da biblioteca `reflect-metadata`.

Use-os onde eles trazem clareza e ajudam a separar responsabilidades, especialmente ao trabalhar com frameworks que os utilizam (Angular, NestJS, TypeORM).

**Exercício (Conceitual):**

Pense em como você poderia criar os seguintes decorators (não precisa implementar completamente, apenas descrever a ideia e qual tipo de decorator usaria):

1.  Um decorator `@Confirmar(mensagem: string)` que, quando aplicado a um método, exibe uma caixa de diálogo de confirmação (usando `window.confirm` no navegador, por exemplo) com a `mensagem` antes de executar o método original. Se o usuário cancelar, o método não é executado.
2.  Um decorator `@FormatoNumero(casasDecimais: number)` que, quando aplicado a uma propriedade numérica de uma classe, garante que qualquer valor atribuído a ela seja formatado com o número especificado de `casasDecimais` (isso é mais complexo de implementar diretamente com decorator de propriedade, talvez exigisse um accessor decorado).
3.  Um decorator `@RotaAPI(metodo: "GET" | "POST", caminho: string)` que, quando aplicado a um método de uma classe de Controller (em um framework de API hipotético), registra metadados associando aquele método ao `metodo` HTTP e `caminho` especificados, para que o framework possa configurar o roteamento automaticamente.

Refletir sobre esses cenários ajuda a entender o potencial e as aplicações dos decorators.

Na próxima seção, discutiremos como integrar código TypeScript com código JavaScript existente e como usar arquivos de declaração.
# Seção 9: Integração com JavaScript

Uma das maiores forças do TypeScript é sua interoperabilidade com o JavaScript. Como TypeScript é um superset do JavaScript, você pode:

1.  Usar bibliotecas JavaScript existentes em seus projetos TypeScript.
2.  Introduzir gradualmente o TypeScript em uma base de código JavaScript existente.
3.  Permitir que código TypeScript e JavaScript coexistam no mesmo projeto.

Para que o compilador TypeScript entenda as formas e os tipos das bibliotecas JavaScript (que não possuem informações de tipo intrínsecas), ele depende de **arquivos de declaração** (`.d.ts`).

## Usando Bibliotecas JavaScript em Projetos TypeScript

O ecossistema JavaScript é vasto, com inúmeras bibliotecas e frameworks úteis (como Lodash, jQuery, Express, React, etc.). Você pode instalar essas bibliotecas usando npm ou yarn, como faria em um projeto JavaScript normal:

```bash
npm install lodash
# ou
yarn add lodash
```

No entanto, se você tentar usar a biblioteca diretamente no seu código TypeScript, o compilador pode reclamar que não consegue encontrar o módulo ou seus tipos:

```typescript
// --- arquivo: app.ts ---
import _ from "lodash"; // Tenta importar lodash

// Erro (potencial): Cannot find module 'lodash' or its corresponding type declarations. ts(2307)
// Ou, se encontrar o módulo mas não os tipos, erros ao usar as funções:
// Ex: Property 'capitalize' does not exist on type 'typeof import("/path/to/node_modules/lodash/index")'.ts(2339)

// const textoCapitalizado = _.capitalize("exemplo"); 
```

Para resolver isso, precisamos fornecer ao TypeScript as informações de tipo para a biblioteca Lodash.

## Arquivos de Declaração (`.d.ts`)

Arquivos de declaração, com a extensão `.d.ts`, contêm apenas informações de tipo (assinaturas de funções, interfaces, classes, etc.) sem nenhuma implementação (código executável). Eles descrevem a "forma" de um módulo ou biblioteca JavaScript para o compilador TypeScript.

Existem duas fontes principais para esses arquivos:

1.  **Bundled (Empacotados):** Algumas bibliotecas JavaScript modernas são escritas em TypeScript ou incluem seus próprios arquivos `.d.ts` diretamente no pacote npm. Nesses casos, o TypeScript geralmente os encontra automaticamente após a instalação.
2.  **DefinitelyTyped (`@types`)**: Para a grande maioria das bibliotecas JavaScript populares que não incluem seus próprios tipos, existe um repositório centralizado mantido pela comunidade chamado **DefinitelyTyped**. Ele contém arquivos de declaração para milhares de bibliotecas. Você pode instalar os tipos de uma biblioteca a partir deste repositório usando npm/yarn, prefixando o nome do pacote com `@types/`.

## Encontrando e Instalando Tipos (`@types`)

Para o exemplo do Lodash, podemos instalar seus tipos do DefinitelyTyped:

```bash
npm install @types/lodash --save-dev
# ou
yarn add @types/lodash --dev
```

É recomendado instalar pacotes `@types` como dependências de desenvolvimento (`--save-dev` ou `--dev`) porque eles são necessários apenas durante o desenvolvimento e a compilação, não em tempo de execução (o código final é JavaScript puro).

Após instalar `@types/lodash`, o TypeScript conseguirá encontrar as declarações de tipo para Lodash, e o código anterior funcionará com segurança de tipo e autocompletar:

```typescript
// --- arquivo: app.ts (agora funciona) ---
import _ from "lodash";

const textoCapitalizado = _.capitalize("exemplo de texto");
console.log(textoCapitalizado); // -> Exemplo de texto

const numeros = [1, 5, 2, 8, 3];
const numerosOrdenados = _.orderBy(numeros, [], ["desc"]);
console.log(numerosOrdenados); // -> [ 8, 5, 3, 2, 1 ]
```

**Como saber se preciso instalar `@types`?**

*   Geralmente, o próprio erro do compilador TypeScript (`Cannot find module '...' or its corresponding type declarations.`) sugere tentar `npm i --save-dev @types/...`.
*   Você pode pesquisar no site do DefinitelyTyped ou usar ferramentas de busca como [TypeSearch](https://microsoft.github.io/TypeSearch/).
*   Verifique a documentação da biblioteca; muitas indicam se incluem tipos ou se você precisa instalar `@types`.

## Criando seus Próprios Arquivos de Declaração

E se você estiver usando uma biblioteca JavaScript menos conhecida que não tem tipos no DefinitelyTyped, ou se estiver trabalhando com seu próprio código JavaScript legado que deseja usar a partir do TypeScript?

Nesses casos, você pode escrever seus próprios arquivos de declaração `.d.ts`.

**Declaração de Módulo Simples:**

Suponha que você tenha um arquivo JavaScript simples `calculadoraLegada.js`:

```javascript
// --- arquivo: calculadoraLegada.js ---
function adicionar(x, y) {
  return x + y;
}

const VERSAO = "1.0";

module.exports = {
  adicionar,
  VERSAO
};
```

Você pode criar um arquivo `calculadoraLegada.d.ts` no mesmo diretório ou em um local centralizado (configurado no `tsconfig.json` via `typeRoots` ou `paths`) para descrever seus tipos:

```typescript
// --- arquivo: calculadoraLegada.d.ts ---

// Declara o módulo (com o mesmo nome que seria usado no import/require)
declare module "./calculadoraLegada" { 
  // Exporta as funções e variáveis com seus tipos
  export function adicionar(x: number, y: number): number;
  export const VERSAO: string;
}

// Alternativa (se o JS exporta um objeto único):
/*
declare module "./calculadoraLegada" {
    const calc: {
        adicionar(x: number, y: number): number;
        VERSAO: string;
    };
    export = calc; // Usa export = para módulos CommonJS que exportam um único objeto
}
*/
```

Agora você pode importar e usar `calculadoraLegada` com segurança de tipo:

```typescript
// --- arquivo: app.ts ---
import { adicionar, VERSAO } from "./calculadoraLegada";

console.log(`Versão da calculadora legada: ${VERSAO}`);
console.log(`Adição legada: ${adicionar(10, 5)}`);
```

**Declaração de Variáveis Globais ou Bibliotecas sem Módulos:**

Para bibliotecas que adicionam variáveis ao escopo global (como jQuery com `$`), você pode usar `declare var`, `declare function`, `declare class`, etc., em um arquivo `.d.ts` global.

```typescript
// --- arquivo: global.d.ts ---

// Declara a variável global $ do jQuery
declare var $: {
  (selector: string): any; // Simplificado, tipos reais do jQuery são mais complexos
  ajax(options: any): Promise<any>;
};

// Declara uma função global
declare function minhaFuncaoGlobal(config: object): void;
```

Escrever arquivos de declaração completos pode ser complexo, especialmente para bibliotecas grandes. A documentação oficial do TypeScript tem um [guia detalhado sobre Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html).

## Migrando Código JavaScript para TypeScript

TypeScript facilita a migração gradual de projetos JavaScript.

1.  **Adicione TypeScript ao Projeto:**
    *   Instale o TypeScript: `npm install typescript --save-dev`
    *   Crie um `tsconfig.json`: `npx tsc --init`
2.  **Configure o `tsconfig.json` para Interoperabilidade:**
    *   Habilite `"allowJs": true`: Permite que o compilador TypeScript inclua arquivos `.js` na compilação.
    *   Considere habilitar `"checkJs": true`: Pede ao TypeScript para tentar inferir tipos e reportar erros óbvios em arquivos `.js` (usando JSDoc para anotações, se houver).
    *   Configure `outDir` para separar os arquivos compilados `.js` dos fontes `.ts` e `.js`.
    *   Certifique-se de que `module` e `target` estão configurados adequadamente para seu ambiente.
3.  **Renomeie Arquivos Gradualmente:** Comece renomeando alguns arquivos `.js` para `.ts`. O TypeScript começará imediatamente a verificar esses arquivos.
4.  **Corrija Erros e Adicione Tipos:**
    *   O TypeScript provavelmente encontrará erros de tipo ou inferirá `any` em muitos lugares. Comece adicionando tipos explícitos para parâmetros e retornos de funções.
    *   Use interfaces e type aliases para definir a forma de objetos complexos.
    *   Instale pacotes `@types` para bibliotecas de terceiros.
    *   Corrija erros lógicos que a verificação de tipos pode revelar.
5.  **Refatore (Opcional):** Aproveite a segurança de tipo para refatorar o código, tornando-o mais robusto e legível.

**Dicas para Migração:**

*   **Comece Pequeno:** Migre um módulo ou uma seção do projeto por vez.
*   **Priorize:** Comece pelas partes mais críticas ou propensas a erros do código.
*   **Use `any` com Moderação:** Use `any` como uma solução temporária durante a migração, mas planeje substituí-lo por tipos mais específicos posteriormente.
*   **Habilite `strict`:** Assim que possível, habilite `"strict": true` (ou as flags individuais como `strictNullChecks`, `noImplicitAny`) no `tsconfig.json` para obter o máximo benefício do TypeScript.

## Exemplos Práticos e Exercícios

**Exemplo: Usando Axios (Biblioteca HTTP baseada em Promise)**

1.  Instale Axios e seus tipos:
    ```bash
    npm install axios @types/axios --save-dev
    ```
2.  Use Axios para fazer uma requisição GET:
    ```typescript
    // --- arquivo: apiClient.ts ---
    import axios, { AxiosResponse } from 'axios';
    
    // Interface para descrever a estrutura esperada da resposta da API
    interface Todo {
      userId: number;
      id: number;
      title: string;
      completed: boolean;
    }
    
    async function buscarTodo(id: number): Promise<Todo | null> {
      try {
        // Graças a @types/axios, axios.get é tipado e retorna Promise<AxiosResponse<any>>
        // Podemos especificar o tipo esperado na resposta com um generic
        const resposta: AxiosResponse<Todo> = await axios.get(`https://jsonplaceholder.typicode.com/todos/${id}`);
        
        console.log(`Status da resposta: ${resposta.status}`);
        // resposta.data agora é do tipo Todo
        return resposta.data;
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
            console.error(`Erro ao buscar TODO ${id}: ${error.message}`);
            if (error.response) {
                console.error(`   Status: ${error.response.status}`);
                console.error(`   Dados: ${JSON.stringify(error.response.data)}`);
            }
        } else {
            console.error(`Erro inesperado: ${error}`);
        }
        return null;
      }
    }
    
    // Testando
    async function testarBuscaTodo() {
        const todo1 = await buscarTodo(1);
        if (todo1) {
            console.log(`TODO 1: ${todo1.title} (Completo: ${todo1.completed})`);
        }
        
        const todoInexistente = await buscarTodo(99999);
        if (!todoInexistente) {
            console.log("TODO 99999 não encontrado, como esperado.");
        }
    }
    
    testarBuscaTodo();
    ```

**Exercício: Criar Declarações para uma Biblioteca Simples**

1.  Crie um arquivo JavaScript chamado `stringUtils.js` com o seguinte conteúdo:
    ```javascript
    // stringUtils.js
    exports.inverter = function(str) {
      if (typeof str !== 'string') return '';
      return str.split('').reverse().join('');
    };
    
    exports.ehPalindromo = function(str) {
      if (typeof str !== 'string') return false;
      const invertida = str.split('').reverse().join('');
      return str.toLowerCase() === invertida.toLowerCase();
    };
    
    exports.CONTADOR = 0; // Exemplo de variável exportada
    ```
2.  Crie um arquivo de declaração `stringUtils.d.ts` para descrever os tipos exportados por `stringUtils.js`.
    *   Declare o módulo `"./stringUtils"`.
    *   Declare a função `inverter` que recebe uma `string` e retorna uma `string`.
    *   Declare a função `ehPalindromo` que recebe uma `string` e retorna um `boolean`.
    *   Declare a constante `CONTADOR` como sendo do tipo `number`.
3.  Crie um arquivo `testeStringUtils.ts`.
4.  Neste arquivo, importe `inverter` e `ehPalindromo` de `"./stringUtils"`.
5.  Use as funções importadas com algumas strings (ex: "TypeScript", "ovo", "JavaScript") e imprima os resultados.
6.  Tente passar um número para `inverter` - o TypeScript deve gerar um erro graças ao seu arquivo `.d.ts`.
7.  Compile e execute o teste.

Este exercício prático ajuda a entender como descrever módulos JavaScript existentes para uso seguro em TypeScript.

Na próxima seção, focaremos especificamente no uso de TypeScript com desenvolvimento web frontend, incluindo manipulação do DOM e configuração de bundlers.
# Seção 10: TypeScript para Desenvolvimento Web (Frontend)

TypeScript brilha no desenvolvimento frontend, trazendo segurança de tipo e ferramentas aprimoradas para a criação de interfaces de usuário interativas e complexas no navegador. Seja manipulando o DOM diretamente, usando bibliotecas de UI ou frameworks modernos como React, Angular ou Vue, TypeScript ajuda a evitar erros comuns e a tornar o código mais manutenível.

Nesta seção, exploraremos como usar TypeScript para tarefas comuns de frontend, desde a interação básica com o DOM até a configuração de ferramentas de build.

## Manipulação do DOM com TypeScript

O Document Object Model (DOM) é a representação em árvore da estrutura HTML de uma página web, e o JavaScript (e, por extensão, o TypeScript) permite interagir com ele para modificar conteúdo, estilo e estrutura dinamicamente.

TypeScript fornece tipos integrados para as APIs do DOM, permitindo que você trabalhe com elementos HTML de forma segura.

**Selecionando Elementos:**

As funções `document.getElementById`, `document.querySelector`, `document.querySelectorAll`, etc., retornam tipos específicos como `HTMLElement`, `Element`, `NodeList`, ou `null` se o elemento não for encontrado.

```typescript
// Seleciona por ID - Retorna HTMLElement | null
const meuBotao = document.getElementById("botaoPrincipal");

// Seleciona o primeiro elemento que corresponde ao seletor CSS - Retorna Element | null
const primeiroInput = document.querySelector("input[type=\"text\"]");

// Seleciona todos os elementos que correspondem ao seletor - Retorna NodeListOf<Element>
const todosParagrafos = document.querySelectorAll("p.destaque");

// Verificando se o elemento existe antes de usar (importante!)
if (meuBotao) {
  console.log("Botão encontrado:", meuBotao.id);
  // meuBotao é HTMLElement aqui
} else {
  console.warn("Botão com ID 'botaoPrincipal' não encontrado.");
}

if (primeiroInput) {
  // primeiroInput é Element aqui. Para acessar propriedades específicas 
  // de input (como .value), precisamos de type assertion ou type guard.
}

todosParagrafos.forEach(paragrafo => {
  // paragrafo é Element aqui
  console.log("Parágrafo destaque:", paragrafo.textContent);
});
```

**Type Assertions e Type Guards para Elementos Específicos:**

Frequentemente, `querySelector` ou `getElementById` retornam tipos genéricos como `Element` ou `HTMLElement`. Se você sabe com certeza que um elemento é de um tipo mais específico (como `HTMLInputElement` para um campo de input ou `HTMLButtonElement` para um botão), você pode usar **Type Assertion** (usando `as`) ou **Type Guards** (verificações `instanceof`) para informar isso ao TypeScript e acessar propriedades/métodos específicos daquele tipo.

```typescript
const campoNome = document.getElementById("campoNomeUsuario") as HTMLInputElement | null;
const botaoEnviar = document.querySelector("#btnEnviar") as HTMLButtonElement | null;

// Usando Type Assertion (com verificação de null)
if (campoNome) {
  // Agora TypeScript sabe que campoNome é HTMLInputElement
  console.log(`Valor do campo nome: ${campoNome.value}`);
  campoNome.disabled = false;
}

// Usando Type Guard (instanceof)
const algumElemento = document.getElementById("elementoQualquer");
if (algumElemento instanceof HTMLImageElement) {
  // TypeScript sabe que é HTMLImageElement dentro deste bloco
  console.log(`Fonte da imagem: ${algumElemento.src}`);
  algumElemento.alt = "Nova descrição";
} else if (algumElemento instanceof HTMLAnchorElement) {
    // TypeScript sabe que é HTMLAnchorElement aqui
    console.log(`Link: ${algumElemento.href}`);
}

// Cuidado com Type Assertion: Use apenas quando tiver certeza do tipo,
// pois ele sobrescreve a verificação do compilador.
// const erroPotencial = document.getElementById("naoEhInput") as HTMLInputElement;
// console.log(erroPotencial.value); // Pode causar erro em execução se naoEhInput não for input
```

**Manipulando Eventos:**

Ao adicionar event listeners (`addEventListener`), TypeScript fornece tipos para os objetos de evento (`Event`, `MouseEvent`, `KeyboardEvent`, etc.), permitindo acessar propriedades específicas do evento com segurança.

```typescript
const botaoContador = document.getElementById("btnContador") as HTMLButtonElement | null;
const displayContador = document.getElementById("displayContador");
let contador = 0;

if (botaoContador && displayContador) {
  botaoContador.addEventListener("click", (evento: MouseEvent) => {
    contador++;
    displayContador.textContent = `Cliques: ${contador}`;
    
    console.log("Botão clicado!");
    // evento é MouseEvent, podemos acessar propriedades como clientX, clientY
    console.log(`Posição do clique: X=${evento.clientX}, Y=${evento.clientY}`);
    
    // 'this' dentro do listener pode variar. Se precisar do elemento,
    // use evento.currentTarget ou a variável externa (botaoContador).
    const targetButton = evento.currentTarget as HTMLButtonElement;
    targetButton.textContent = `Clicado ${contador} vezes`;
  });
}

const campoBusca = document.getElementById("campoBusca") as HTMLInputElement | null;
if (campoBusca) {
    campoBusca.addEventListener("input", (evento: Event) => {
        // evento.target se refere ao elemento que disparou o evento (o input)
        const inputElement = evento.target as HTMLInputElement;
        console.log(`Texto da busca: ${inputElement.value}`);
    });

    campoBusca.addEventListener("keydown", (evento: KeyboardEvent) => {
        // evento é KeyboardEvent, podemos acessar evento.key, evento.code, etc.
        console.log(`Tecla pressionada: ${evento.key} (Código: ${evento.code})`);
        if (evento.key === "Enter") {
            console.log("Busca iniciada!");
            // Lógica para iniciar a busca...
        }
    });
}
```

**Criando e Modificando Elementos:**

Você pode criar novos elementos com `document.createElement` e manipular suas propriedades e atributos.

```typescript
const listaItens = document.getElementById("listaDinamica");

function adicionarItemLista(texto: string): void {
  if (!listaItens) return;

  // Cria um novo elemento <li>
  const novoItem = document.createElement("li"); // Retorna HTMLElement
  
  // Define o conteúdo de texto
  novoItem.textContent = texto;
  
  // Adiciona uma classe CSS
  novoItem.classList.add("item-lista");
  
  // Define um atributo de dados
  novoItem.dataset.timestamp = Date.now().toString();
  
  // Adiciona um listener ao novo item
  novoItem.addEventListener("click", () => {
    alert(`Item clicado: ${novoItem.textContent} (Criado em: ${novoItem.dataset.timestamp})`);
    novoItem.classList.toggle("selecionado");
  });

  // Anexa o novo item à lista no DOM
  listaItens.appendChild(novoItem);
}

adicionarItemLista("Primeiro item dinâmico");
adicionarItemLista("Segundo item");
```

## Configuração de Bundlers (Webpack/Vite) com TypeScript

Em aplicações frontend modernas, raramente usamos arquivos TypeScript/JavaScript diretamente no navegador. Em vez disso, usamos **bundlers** (empacotadores) como **Webpack** ou **Vite** para processar nosso código fonte (`.ts`, `.js`, CSS, imagens, etc.), otimizá-lo e agrupá-lo em alguns poucos arquivos estáticos (`.js`, `.css`) que são eficientemente carregados pelo navegador.

Essas ferramentas precisam ser configuradas para entender e compilar arquivos TypeScript.

**Vite:**

Vite é um bundler moderno conhecido por sua velocidade de desenvolvimento extremamente rápida. Ele tem suporte a TypeScript integrado e geralmente requer configuração mínima.

1.  **Criar um Projeto Vite com Template TypeScript:**
    ```bash
    npm create vite@latest meu-projeto-vite --template vanilla-ts 
    # ou yarn create vite meu-projeto-vite --template vanilla-ts
    cd meu-projeto-vite
    npm install 
    # ou yarn install
    npm run dev
    # ou yarn dev
    ```
    Isso cria uma estrutura de projeto básica com TypeScript já configurado.

2.  **Configuração (`vite.config.ts`):** A configuração do Vite (se necessária) é feita em `vite.config.ts`. Para projetos TypeScript básicos, muitas vezes nenhuma configuração adicional é necessária para o TS em si.

**Webpack:**

Webpack é um bundler mais antigo e extremamente configurável, mas sua configuração pode ser mais complexa.

1.  **Instalar Dependências:**
    ```bash
    npm install webpack webpack-cli typescript ts-loader --save-dev
    # ou yarn add webpack webpack-cli typescript ts-loader --dev
    ```
    *   `webpack`, `webpack-cli`: O core do Webpack.
    *   `typescript`: O compilador TypeScript.
    *   `ts-loader`: Um "loader" que ensina o Webpack a processar arquivos `.ts` usando o compilador TypeScript.

2.  **Configurar `webpack.config.js`:** Crie um arquivo `webpack.config.js` na raiz do projeto.
    ```javascript
    // webpack.config.js
    const path = require("path");
    
    module.exports = {
      mode: "development", // ou "production"
      entry: "./src/index.ts", // Ponto de entrada da sua aplicação
      module: {
        rules: [
          {
            test: /\.tsx?$/, // Regex para encontrar arquivos .ts e .tsx
            use: "ts-loader", // Usa o ts-loader para esses arquivos
            exclude: /node_modules/, // Não processa node_modules
          },
        ],
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"], // Permite importar sem extensão
      },
      output: {
        filename: "bundle.js", // Nome do arquivo de saída
        path: path.resolve(__dirname, "dist"), // Pasta de saída
      },
      devServer: { // Configuração opcional para servidor de desenvolvimento
          static: path.join(__dirname, 'dist'),
          compress: true,
          port: 9000,
      },
    };
    ```

3.  **Configurar `tsconfig.json`:** Certifique-se de que seu `tsconfig.json` está configurado corretamente (especialmente `target`, `module`, `outDir` - embora `outDir` possa ser controlado pelo Webpack, `noEmit: true` pode ser útil se o Webpack cuida de toda a emissão).

4.  **Adicionar Scripts ao `package.json`:**
    ```json
    // package.json
    "scripts": {
      "build": "webpack",
      "start": "webpack serve --open" // Se usar webpack-dev-server
    }
    ```

Agora você pode rodar `npm run build` para gerar o bundle ou `npm start` para iniciar o servidor de desenvolvimento.

**Escolha:** Para novos projetos, **Vite** é frequentemente preferido pela sua simplicidade e velocidade. Webpack ainda é poderoso e amplamente utilizado, especialmente em projetos legados ou com necessidades de build muito específicas.

## Introdução ao Uso com Frameworks (Conceitos Gerais)

Frameworks como React, Angular e Vue têm excelente suporte a TypeScript e geralmente fornecem ferramentas de linha de comando (CLIs) que configuram projetos TypeScript prontos para uso.

*   **React:**
    *   `npx create-react-app meu-app --template typescript` (Create React App - mais antigo)
    *   `npm create vite@latest meu-app --template react-ts` (Vite - recomendado)
    *   TypeScript é usado para tipar props, state, hooks e eventos. (Veremos em detalhes na Seção 12).
*   **Angular:**
    *   Angular é escrito em TypeScript e o usa por padrão.
    *   `ng new meu-app-angular` (Usa Angular CLI)
    *   TypeScript é usado para componentes, serviços, módulos, injeção de dependência, etc.
*   **Vue:**
    *   `npm create vue@latest` (Permite escolher TypeScript durante a criação)
    *   `npm create vite@latest meu-app --template vue-ts` (Vite)
    *   TypeScript é usado com a Composition API ou Options API para tipar props, state, eventos, etc.

Usar TypeScript com esses frameworks traz benefícios significativos em termos de segurança de tipo para componentes, gerenciamento de estado e interações complexas.

## Exemplos Práticos e Exercícios

**Exemplo: Lista de Tarefas Simples (Manipulação do DOM)**

*   **HTML (`index.html`):**
    ```html
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Lista de Tarefas TS</title>
        <style>
            .concluida {
                text-decoration: line-through;
                color: grey;
            }
            ul { list-style: none; padding: 0; }
            li { margin: 5px 0; cursor: pointer; }
        </style>
    </head>
    <body>
        <h1>Minha Lista de Tarefas</h1>
        <input type="text" id="inputTarefa" placeholder="Nova tarefa...">
        <button id="btnAdicionar">Adicionar</button>
        <ul id="listaTarefas"></ul>
    
        <!-- Se não usar bundler, compile o TS para JS e inclua aqui -->
        <!-- <script src="dist/app.js"></script> --> 
        <!-- Se usar Vite/Webpack, eles injetarão o script -->
    </body>
    </html>
    ```

*   **TypeScript (`src/app.ts` - para usar com bundler ou compilar manualmente):**
    ```typescript
    const inputTarefa = document.getElementById("inputTarefa") as HTMLInputElement | null;
    const btnAdicionar = document.getElementById("btnAdicionar") as HTMLButtonElement | null;
    const listaTarefas = document.getElementById("listaTarefas") as HTMLUListElement | null;
    
    interface Tarefa {
        id: number;
        texto: string;
        concluida: boolean;
    }
    
    let tarefas: Tarefa[] = [];
    let proximoId = 1;
    
    function adicionarTarefa(): void {
        if (!inputTarefa || inputTarefa.value.trim() === "") {
            alert("Por favor, digite uma tarefa.");
            return;
        }
    
        const novaTarefa: Tarefa = {
            id: proximoId++,
            texto: inputTarefa.value.trim(),
            concluida: false
        };
    
        tarefas.push(novaTarefa);
        inputTarefa.value = ""; // Limpa o input
        renderizarTarefas();
    }
    
    function alternarStatusTarefa(id: number): void {
        tarefas = tarefas.map(tarefa => {
            if (tarefa.id === id) {
                return { ...tarefa, concluida: !tarefa.concluida };
            }
            return tarefa;
        });
        renderizarTarefas();
    }
    
    function removerTarefa(id: number): void {
        tarefas = tarefas.filter(tarefa => tarefa.id !== id);
        renderizarTarefas();
    }
    
    function renderizarTarefas(): void {
        if (!listaTarefas) return;
    
        listaTarefas.innerHTML = ""; // Limpa a lista atual
    
        tarefas.forEach(tarefa => {
            const itemLista = document.createElement("li");
            itemLista.textContent = tarefa.texto;
            itemLista.dataset.id = tarefa.id.toString();
    
            if (tarefa.concluida) {
                itemLista.classList.add("concluida");
            }
    
            // Span para o texto (para não riscar o botão remover)
            const spanTexto = document.createElement("span");
            spanTexto.textContent = tarefa.texto;
            spanTexto.style.marginRight = "10px";
            spanTexto.addEventListener("click", () => {
                alternarStatusTarefa(tarefa.id);
            });

            // Botão Remover
            const btnRemover = document.createElement("button");
            btnRemover.textContent = "Remover";
            btnRemover.style.marginLeft = "10px";
            btnRemover.addEventListener("click", (e) => {
                e.stopPropagation(); // Impede que o clique no botão alterne o status
                removerTarefa(tarefa.id);
            });

            itemLista.innerHTML = ''; // Limpa o texto inicial
            itemLista.appendChild(spanTexto);
            itemLista.appendChild(btnRemover);

            if (tarefa.concluida) {
                spanTexto.classList.add("concluida");
            }
    
            listaTarefas.appendChild(itemLista);
        });
    }
    
    // Adicionar listeners iniciais
    if (btnAdicionar) {
        btnAdicionar.addEventListener("click", adicionarTarefa);
    }
    if (inputTarefa) {
        inputTarefa.addEventListener("keypress", (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                adicionarTarefa();
            }
        });
    }
    
    // Renderização inicial (se houver tarefas salvas, por exemplo)
    renderizarTarefas();
    ```

**Exercício: Galeria de Imagens Simples**

1.  Crie um HTML básico com:
    *   Uma tag `<img>` principal com um ID (ex: `imagemPrincipal`).
    *   Uma `<div>` com um ID (ex: `miniaturas`) para conter imagens em miniatura.
    *   Algumas tags `<img>` dentro da `div` de miniaturas, cada uma com a classe `miniatura` e um atributo `src` apontando para URLs de imagens diferentes (podem ser placeholders ou URLs reais).
2.  No seu arquivo TypeScript:
    *   Selecione a imagem principal e a div de miniaturas.
    *   Selecione todas as imagens com a classe `miniatura` usando `querySelectorAll`.
    *   Adicione um event listener de `click` a *cada* imagem miniatura.
    *   Dentro do listener da miniatura:
        *   Obtenha o elemento `<img>` que foi clicado (`evento.target`).
        *   Use Type Assertion ou `instanceof` para garantir que é um `HTMLImageElement`.
        *   Obtenha o `src` da miniatura clicada.
        *   Atualize o atributo `src` da `imagemPrincipal` com o `src` da miniatura clicada.
3.  (Opcional) Adicione um estilo CSS para destacar a miniatura atualmente selecionada.
4.  Configure um bundler (Vite é mais simples) ou compile manualmente e teste a funcionalidade no navegador.

Este exercício pratica a seleção de múltiplos elementos, adição de listeners em loop, type assertion/guards e manipulação de atributos de elementos do DOM.

Na próxima seção, focaremos no desenvolvimento backend com Node.js e TypeScript.
# Seção 11: TypeScript para Desenvolvimento Web (Backend com Node.js)

TypeScript não se limita ao frontend. Sua capacidade de adicionar tipagem estática e recursos modernos do JavaScript o torna uma excelente escolha também para o desenvolvimento backend, especialmente com a plataforma Node.js. Usar TypeScript no backend pode levar a APIs mais robustas, código mais fácil de manter e refatorar, e melhor colaboração em equipe.

Nesta seção, veremos como configurar um projeto Node.js com TypeScript e como aplicar tipos em cenários comuns de backend, como a criação de APIs com Express.js e a interação com bancos de dados.

## Configurando um Projeto Node.js com TypeScript

Existem algumas maneiras de configurar e executar código TypeScript no Node.js:

1.  **Compilação Prévia:** Compilar todo o código `.ts` para `.js` usando `tsc` e depois executar os arquivos `.js` resultantes com `node`.
2.  **Execução Direta com `ts-node`:** Usar a ferramenta `ts-node`, que compila e executa o código TypeScript em tempo real (ótimo para desenvolvimento).

**Passos para Configuração Inicial:**

1.  **Inicializar o Projeto Node.js:**
    ```bash
    mkdir meu-projeto-node-ts
    cd meu-projeto-node-ts
    npm init -y 
    # ou yarn init -y
    ```

2.  **Instalar TypeScript:**
    ```bash
    npm install typescript --save-dev
    # ou yarn add typescript --dev
    ```

3.  **Criar `tsconfig.json`:**
    ```bash
    npx tsc --init
    # ou yarn tsc --init
    ```
    Ajuste o `tsconfig.json` para um ambiente Node.js. Configurações comuns:
    ```json
    {
      "compilerOptions": {
        "target": "ES2016", // Ou mais recente (ES2020, ESNext)
        "module": "CommonJS", // Padrão para Node.js
        "outDir": "./dist", // Pasta para arquivos JS compilados
        "rootDir": "./src", // Pasta com arquivos TS fontes
        "strict": true,
        "esModuleInterop": true, // Importante para interoperabilidade
        "skipLibCheck": true, // Pode acelerar a compilação
        "forceConsistentCasingInFileNames": true,
        // "moduleResolution": "Node" // Geralmente o padrão
        // "sourceMap": true // Útil para debugging
      },
      "include": ["src/**/*"], // Quais arquivos incluir
      "exclude": ["node_modules", "**/*.spec.ts"] // Quais excluir
    }
    ```

4.  **Criar Estrutura de Pastas:** Crie a pasta `src` e coloque seu código TypeScript lá (ex: `src/index.ts`).

5.  **Opção A: Compilação Prévia**
    *   Adicione scripts ao `package.json`:
        ```json
        "scripts": {
          "build": "tsc",
          "start": "node dist/index.js",
          "dev": "tsc -w & node --watch dist/index.js" // Compila e reinicia no watch
        }
        ```
    *   Para rodar: `npm run build` seguido de `npm start`. Para desenvolvimento: `npm run dev`.

6.  **Opção B: Usando `ts-node` (Desenvolvimento)**
    *   Instale `ts-node` e `@types/node`:
        ```bash
        npm install ts-node @types/node --save-dev
        # ou yarn add ts-node @types/node --dev
        ```
        (`@types/node` fornece as declarações de tipo para as APIs nativas do Node.js, como `fs`, `http`, `path`, etc.)
    *   Adicione scripts ao `package.json`:
        ```json
        "scripts": {
          "build": "tsc", // Ainda útil para build de produção
          "start": "node dist/index.js", // Para produção
          "dev": "ts-node src/index.ts", // Executa TS diretamente
          "dev:watch": "ts-node-dev --respawn --transpile-only src/index.ts" // Reinicia automaticamente com ts-node-dev (precisa instalar)
        }
        ```
        (`ts-node-dev` é uma ferramenta popular que reinicia o servidor `ts-node` automaticamente em mudanças de arquivo, mais rápido que `tsc -w` para desenvolvimento de servidor).
    *   Para rodar em desenvolvimento: `npm run dev` ou `npm run dev:watch` (após instalar `ts-node-dev`).

**Exemplo `src/index.ts`:**

```typescript
import * as path from 'path'; // Importando módulo nativo do Node

function saudacaoNode(nome: string): string {
  return `Olá do Node.js, ${nome}!`;
}

console.log(saudacaoNode("TypeScript"));

const caminhoArquivo = path.join(__dirname, 'dados.txt');
console.log(`Caminho do arquivo: ${caminhoArquivo}`);
```

## Tipagem em APIs Express.js

Express.js é o framework web mais popular para Node.js, usado para construir APIs REST e aplicações web. TypeScript pode ser facilmente integrado ao Express para tipar rotas, requisições, respostas e middlewares.

1.  **Instalar Express e Tipos:**
    ```bash
    npm install express
    npm install @types/express --save-dev
    # ou
    # yarn add express
    # yarn add @types/express --dev
    ```

2.  **Criar Servidor Express Básico com Tipos:**

    ```typescript
    // src/server.ts
    import express, { Request, Response, NextFunction, Application } from 'express';
    
    const app: Application = express();
    const port: number = 3000;
    
    // Middleware para parsear JSON no corpo da requisição
    app.use(express.json());
    
    // Middleware de Log Simples (tipando Request, Response, NextFunction)
    const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
      next(); // Chama o próximo middleware ou rota
    };
    app.use(logMiddleware);
    
    // Interface para o corpo da requisição POST /usuarios
    interface CriarUsuarioPayload {
        nome: string;
        email: string;
        idade?: number;
    }

    // Interface para a resposta
    interface UsuarioResponse {
        id: number;
        nome: string;
        email: string;
    }
    
    // Rota GET simples
    app.get('/', (req: Request, res: Response) => {
      res.send('Bem-vindo à API com TypeScript!');
    });
    
    // Rota GET com parâmetro de rota
    app.get('/usuarios/:id', (req: Request, res: Response) => {
      const userId = parseInt(req.params.id, 10); // req.params contém os parâmetros da URL
      
      if (isNaN(userId)) {
          return res.status(400).json({ erro: "ID inválido." });
      }
      
      console.log(`Buscando usuário com ID: ${userId}`);
      // Lógica para buscar usuário no banco...
      const usuarioSimulado: UsuarioResponse = { id: userId, nome: "Usuário Exemplo", email: "exemplo@email.com" };
      
      if (usuarioSimulado) { // Simula encontrar o usuário
          res.status(200).json(usuarioSimulado);
      } else {
          res.status(404).json({ erro: "Usuário não encontrado." });
      }
    });

    // Rota POST para criar usuário
    app.post('/usuarios', (req: Request<{}, UsuarioResponse, CriarUsuarioPayload>, res: Response<UsuarioResponse | { erro: string }>) => {
        // Tipando o corpo da requisição (req.body) com CriarUsuarioPayload
        const { nome, email, idade } = req.body;

        if (!nome || !email) {
            return res.status(400).json({ erro: "Nome e email são obrigatórios." });
        }

        console.log(`Criando usuário: Nome=${nome}, Email=${email}, Idade=${idade ?? 'N/A'}`);
        // Lógica para salvar no banco...
        const novoUsuario: UsuarioResponse = {
            id: Math.floor(Math.random() * 1000),
            nome: nome,
            email: email
        };

        res.status(201).json(novoUsuario);
    });

    // Middleware de Tratamento de Erros (deve ser o último middleware)
    const erroMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
        console.error("Ocorreu um erro:", err.stack);
        res.status(500).json({ erro: 'Ocorreu um erro interno no servidor.' });
    };
    app.use(erroMiddleware);
    
    // Iniciar o servidor
    app.listen(port, () => {
      console.log(`Servidor rodando em http://localhost:${port}`);
    });
    ```

**Pontos Chave:**

*   Importamos tipos como `Request`, `Response`, `NextFunction`, `Application` de `@types/express`.
*   Tipamos os parâmetros das funções de rota e middleware.
*   Usamos interfaces (`CriarUsuarioPayload`, `UsuarioResponse`) para definir a estrutura esperada do corpo da requisição (`req.body`) e da resposta JSON.
*   O tipo `Request` é genérico (`Request<P, ResBody, ReqBody, ReqQuery>`) permitindo especificar tipos para `params`, corpo da resposta, corpo da requisição e query string, respectivamente. Ex: `Request<{}, UsuarioResponse, CriarUsuarioPayload>` significa sem parâmetros de rota (`{}`), corpo da resposta é `UsuarioResponse`, corpo da requisição é `CriarUsuarioPayload`.

## Trabalhando com Bancos de Dados (Conceitos com TypeORM/Prisma)

Interagir com bancos de dados é uma tarefa central no backend. ORMs (Object-Relational Mappers) como **TypeORM** e **Prisma** são ferramentas populares que facilitam essa interação em projetos TypeScript, oferecendo forte integração com o sistema de tipos.

**Conceitos Gerais:**

*   **Definição de Entidades/Modelos:** Você define classes (TypeORM) ou esquemas (Prisma) que representam suas tabelas do banco de dados. TypeScript garante que as propriedades dessas entidades tenham os tipos corretos.
*   **Migrations:** Ferramentas para gerenciar alterações na estrutura do banco de dados de forma versionada.
*   **Consultas Seguras:** Os ORMs fornecem APIs para realizar operações CRUD (Create, Read, Update, Delete) que são tipadas. O TypeScript ajuda a garantir que você passe os tipos corretos de dados ao criar/atualizar e que os dados retornados do banco correspondam às suas entidades/modelos.

**Exemplo Conceitual com TypeORM:**

```typescript
// 1. Instalar dependências (typeorm, reflect-metadata, driver do banco, @types/node)
// npm install typeorm reflect-metadata pg --save 
// npm install @types/node --save-dev (pg é para PostgreSQL)

// 2. Definir a Entidade (src/entity/Produto.ts)
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity() // Decorator para marcar como entidade
export class Produto {
    @PrimaryGeneratedColumn() // Chave primária auto-incrementada
    id: number;

    @Column({ length: 100 }) // Coluna do tipo string com limite
    nome: string;

    @Column("decimal", { precision: 10, scale: 2 }) // Coluna decimal
    preco: number;

    @Column({ default: true }) // Coluna boolean com valor padrão
    ativo: boolean;
}

// 3. Configurar Conexão e Usar (src/index.ts)
import "reflect-metadata";
import { createConnection, Connection } from "typeorm";
import { Produto } from "./entity/Produto";

async function main() {
    let connection: Connection | null = null;
    try {
        connection = await createConnection({ // Configurações do ormconfig.json ou aqui
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "user",
            password: "password",
            database: "meu_db",
            entities: [Produto],
            synchronize: true, // Cuidado: recria o schema (bom para dev, ruim para prod)
            logging: false
        });
        console.log("Conectado ao banco de dados!");

        const produtoRepository = connection.getRepository(Produto);

        // Criar
        console.log("Inserindo novo produto...");
        const novoProduto = new Produto();
        novoProduto.nome = "Caderno Inteligente";
        novoProduto.preco = 75.50;
        await produtoRepository.save(novoProduto);
        console.log("Produto salvo com id: " + novoProduto.id);

        // Ler
        console.log("Carregando produtos do banco...");
        const produtos = await produtoRepository.find(); // Retorna Produto[]
        console.log("Produtos carregados: ", produtos);

        // Atualizar
        const produtoParaAtualizar = await produtoRepository.findOne(novoProduto.id);
        if (produtoParaAtualizar) {
            console.log(`Atualizando produto ${produtoParaAtualizar.id}...`);
            produtoParaAtualizar.preco = 80.00;
            await produtoRepository.save(produtoParaAtualizar);
        }

        // Remover
        // const produtoParaRemover = await produtoRepository.findOne(novoProduto.id);
        // if (produtoParaRemover) {
        //     console.log(`Removendo produto ${produtoParaRemover.id}...`);
        //     await produtoRepository.remove(produtoParaRemover);
        // }

    } catch (error) {
        console.error("Erro na operação com banco de dados:", error);
    } finally {
        if (connection) {
            await connection.close();
            console.log("Conexão com banco fechada.");
        }
    }
}

main();
```

**Prisma** oferece uma abordagem diferente com um arquivo de esquema (`schema.prisma`) e um cliente gerado (`PrismaClient`) que também fornece segurança de tipo completa para suas operações de banco de dados.

Usar ORMs com TypeScript melhora drasticamente a experiência de desenvolvimento backend ao lidar com bancos de dados.

## Programação Assíncrona (Promises, async/await) com Tipos

Operações de backend (chamadas de API, acesso a banco de dados, leitura de arquivos) são frequentemente assíncronas. TypeScript suporta totalmente `Promises` e a sintaxe `async/await`, permitindo tipar os valores resolvidos pelas Promises.

O tipo `Promise<T>` representa uma Promise que, quando resolvida, produzirá um valor do tipo `T`.

```typescript
// Função que retorna uma Promise de string
function buscarDadosUsuario(userId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    console.log(`Buscando dados para usuário ${userId}...`);
    setTimeout(() => {
      if (userId === 1) {
        resolve(`Dados do Usuário ${userId}: { nome: "Admin" }`);
      } else {
        reject(new Error("Usuário não encontrado"));
      }
    }, 1000);
  });
}

// Usando async/await com tipagem
async function processarUsuario(id: number): Promise<void> { // Função async retorna Promise<void>
  try {
    console.log(`Iniciando processamento para ID: ${id}`);
    const dados: string = await buscarDadosUsuario(id); // 'dados' é inferido como string
    console.log("Dados recebidos:", dados.toUpperCase());
    console.log("Processamento concluído.");
  } catch (error: any) {
    console.error(`Erro ao processar usuário ${id}:`, error.message);
  } finally {
      console.log(`Processamento finalizado para ID: ${id}`);
  }
}

async function executarTudo() {
    await processarUsuario(1);
    console.log("---");
    await processarUsuario(2);
}

executarTudo();
```

Tipar Promises garante que você saiba qual tipo de dado esperar quando a operação assíncrona for concluída, evitando erros ao tentar usar o resultado.

## Exemplos Práticos e Exercícios

**Exemplo: API REST Simples com Persistência em Memória**

(Combine os conceitos de Express e manipulação de dados, mas usando um array em memória em vez de um banco real para simplificar).

```typescript
// src/serverMemoria.ts
import express, { Request, Response, NextFunction, Application } from 'express';

interface Item {
    id: number;
    nome: string;
    quantidade: number;
}

let estoque: Item[] = [
    { id: 1, nome: "Caneta Azul", quantidade: 100 },
    { id: 2, nome: "Lápis HB", quantidade: 150 },
    { id: 3, nome: "Borracha Branca", quantidade: 80 }
];
let proximoItemId = 4;

const app: Application = express();
app.use(express.json());

// GET /itens - Listar todos
app.get('/itens', (req: Request, res: Response<Item[]>) => {
    res.json(estoque);
});

// GET /itens/:id - Obter um item
app.get('/itens/:id', (req: Request<{ id: string }>, res: Response<Item | { erro: string }>) => {
    const id = parseInt(req.params.id, 10);
    const item = estoque.find(i => i.id === id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ erro: "Item não encontrado." });
    }
});

// POST /itens - Adicionar novo item
app.post('/itens', (req: Request<{}, Item, Omit<Item, 'id'>>, res: Response<Item | { erro: string }>) => {
    const { nome, quantidade } = req.body;
    if (!nome || quantidade === undefined || quantidade < 0) {
        return res.status(400).json({ erro: "Nome e quantidade (>= 0) são obrigatórios." });
    }
    const novoItem: Item = {
        id: proximoItemId++,
        nome,
        quantidade
    };
    estoque.push(novoItem);
    res.status(201).json(novoItem);
});

// PUT /itens/:id - Atualizar item
app.put('/itens/:id', (req: Request<{ id: string }, Item | { erro: string }, Partial<Omit<Item, 'id'>>>, res: Response<Item | { erro: string }>) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = estoque.findIndex(i => i.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ erro: "Item não encontrado." });
    }
    const { nome, quantidade } = req.body;
    const itemAtualizado = { ...estoque[itemIndex] };
    if (nome !== undefined) itemAtualizado.nome = nome;
    if (quantidade !== undefined && quantidade >= 0) itemAtualizado.quantidade = quantidade;
    
    estoque[itemIndex] = itemAtualizado;
    res.json(itemAtualizado);
});

// DELETE /itens/:id - Remover item
app.delete('/itens/:id', (req: Request<{ id: string }>, res: Response<{ mensagem: string } | { erro: string }>) => {
    const id = parseInt(req.params.id, 10);
    const itemIndex = estoque.findIndex(i => i.id === id);
    if (itemIndex === -1) {
        return res.status(404).json({ erro: "Item não encontrado." });
    }
    estoque.splice(itemIndex, 1);
    res.json({ mensagem: "Item removido com sucesso." });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Servidor de estoque (memória) rodando em http://localhost:${PORT}`);
});
```

**Exercício: API de Blog Simples**

1.  Configure um novo projeto Node.js com TypeScript, Express e `ts-node-dev`.
2.  Defina uma interface `Post` com `id` (number), `titulo` (string), `conteudo` (string), `dataCriacao` (Date).
3.  Crie um array em memória para armazenar os posts.
4.  Implemente os seguintes endpoints da API REST:
    *   `GET /posts`: Retorna todos os posts.
    *   `GET /posts/:id`: Retorna um post específico pelo ID.
    *   `POST /posts`: Recebe `titulo` e `conteudo` no corpo da requisição, cria um novo post com um ID único e a data atual, e o retorna com status 201.
    *   `PUT /posts/:id`: Recebe `titulo` e/ou `conteudo` no corpo, atualiza o post correspondente e o retorna.
    *   `DELETE /posts/:id`: Remove o post com o ID especificado.
5.  Adicione tipagem explícita para `Request`, `Response`, corpo da requisição e respostas em todas as rotas.
6.  Adicione tratamento básico de erros (ex: post não encontrado, dados inválidos).
7.  Teste sua API usando uma ferramenta como `curl`, Postman ou Insomnia.

Este exercício consolida o uso de TypeScript com Express para criar uma API REST funcional, incluindo tipagem de requisições, respostas e manipulação de dados (mesmo que em memória).

Nas próximas seções, veremos como aplicar TypeScript especificamente aos frameworks frontend React e React Native.
# Seção 12: TypeScript com React

React é uma das bibliotecas JavaScript mais populares para construir interfaces de usuário, e sua combinação com TypeScript é extremamente poderosa. Adicionar tipos estáticos ao desenvolvimento React ajuda a pegar erros comuns em props, state e eventos em tempo de compilação, melhora o autocompletar e a refatoração, e torna os componentes mais fáceis de entender e manter, especialmente em aplicações grandes e colaborativas.

Nesta seção, exploraremos como usar TypeScript de forma eficaz com React, cobrindo a tipagem de componentes, props, state, hooks e eventos.

## Configurando um Projeto React com TypeScript

A maneira mais fácil de iniciar um novo projeto React com TypeScript é usando ferramentas de build modernas como Vite ou o clássico Create React App (CRA).

**Usando Vite (Recomendado):**

Vite oferece uma experiência de desenvolvimento muito rápida e configuração simplificada.

```bash
# Usando npm
npm create vite@latest meu-app-react-ts --template react-ts

# Usando yarn
yarn create vite meu-app-react-ts --template react-ts

cd meu-app-react-ts
npm install 
# ou yarn install
npm run dev
# ou yarn dev
```
Isso cria um projeto React com TypeScript e todas as configurações básicas prontas (incluindo `tsconfig.json` e configurações do Vite).

**Usando Create React App (CRA):**

CRA é a ferramenta oficial mais antiga, ainda amplamente utilizada.

```bash
npx create-react-app meu-app-cra-ts --template typescript

cd meu-app-cra-ts
npm start
# ou yarn start
```
CRA também configura um projeto React com TypeScript pronto para uso.

Ambas as ferramentas criam arquivos com a extensão `.tsx` (TypeScript XML/JSX) para componentes React que usam a sintaxe JSX.

## Componentes Funcionais com Tipos (Props, State)

Componentes funcionais com Hooks são a forma predominante de escrever componentes React atualmente.

**Tipando Props:**

Você pode definir os tipos das props que um componente espera receber usando uma `interface` ou `type alias`.

```typescript
// src/components/Botao.tsx
import React from 'react';

// 1. Definir a interface para as props
interface BotaoProps {
  texto: string;
  cor?: 'primaria' | 'secundaria'; // Prop opcional com tipo literal
  desabilitado?: boolean;
  onClick: (evento: React.MouseEvent<HTMLButtonElement>) => void; // Tipo para função de callback
}

// 2. Usar React.FC (Functional Component) e passar a interface como generic
// React.FC já inclui a prop 'children' por padrão (embora seu uso seja debatido)
const Botao: React.FC<BotaoProps> = ({ texto, cor = 'primaria', desabilitado = false, onClick, children }) => {
  const classesCSS = `botao ${cor} ${desabilitado ? 'desabilitado' : ''}`;

  return (
    <button className={classesCSS} onClick={onClick} disabled={desabilitado}>
      {texto}
      {children && <span>{children}</span>} {/* Exemplo de uso de children */}
    </button>
  );
};

export default Botao;

// --- Uso em outro componente ---
// import Botao from './components/Botao';
// 
// function App() {
//   const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
//     console.log('Botão clicado!', e.currentTarget);
//   };
// 
//   return (
//     <div>
//       <Botao texto="Clique Aqui" onClick={handleClick} />
//       <Botao texto="Secundário" cor="secundaria" onClick={() => alert('Secundário!')} />
//       <Botao texto="Desabilitado" desabilitado onClick={() => {}} />
//       {/* Erro: Property 'texto' is missing */}
//       {/* <Botao onClick={() => {}} /> */}
//       {/* Erro: Type 'number' is not assignable to type 'string' */}
//       {/* <Botao texto={123} onClick={() => {}} /> */}
//     </div>
//   );
// }
```

*   **`React.FC<PropsInterface>`**: É um tipo genérico que representa um componente funcional. Ele infere o tipo de retorno e adiciona automaticamente a prop `children` (embora você possa tipar `children` explicitamente se preferir, veja abaixo).
*   **Tipando Funções de Callback**: Use a assinatura de função apropriada (ex: `() => void`, `(arg: Tipo) => Retorno`). Para eventos, use os tipos de evento do React (ex: `React.MouseEvent`).
*   **Props Opcionais e Padrão**: Use `?` para props opcionais e valores padrão na desestruturação.

**Alternativa ao `React.FC` (Tipando `children` explicitamente):**

Alguns desenvolvedores preferem não usar `React.FC` para serem mais explícitos sobre `children`.

```typescript
import React, { ReactNode } from 'react'; // Importar ReactNode

interface CardProps {
  titulo: string;
  children: ReactNode; // Tipar children explicitamente
}

// Não usa React.FC
const Card = ({ titulo, children }: CardProps): JSX.Element => {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <div>{children}</div>
    </div>
  );
};

// Ou usando PropsWithChildren (utility type do React)
import React, { PropsWithChildren } from 'react';

interface OutroCardProps {
    titulo: string;
    borda?: boolean;
}

// PropsWithChildren<T> adiciona 'children?: ReactNode' a T
const OutroCard = ({ titulo, borda, children }: PropsWithChildren<OutroCardProps>): JSX.Element => {
    // ...
    return <div className={borda ? 'card-borda' : ''}><h2>{titulo}</h2>{children}</div>;
};
```

**Tipando State com `useState`:**

O hook `useState` pode inferir o tipo do estado a partir do valor inicial. Se a inferência for suficiente, nenhuma anotação explícita é necessária.

```typescript
import React, { useState } from 'react';

function Contador() {
  // TypeScript infere que 'contagem' é number e 'setContagem' é (value: number) => void
  const [contagem, setContagem] = useState(0);

  // TypeScript infere que 'nome' é string e 'setNome' é (value: string) => void
  const [nome, setNome] = useState("Visitante");

  return (
    <div>
      <p>Contagem: {contagem}</p>
      <button onClick={() => setContagem(contagem + 1)}>Incrementar</button>
      {/* setContagem("errado"); // Erro: Argument of type 'string' is not assignable to parameter of type 'SetStateAction<number>' */}
      
      <p>Nome: {nome}</p>
      <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
    </div>
  );
}
```

Se o estado inicial for `null` ou `undefined`, ou se o tipo puder ser uma união, você *deve* fornecer o tipo explicitamente usando a sintaxe genérica `useState<Tipo>()`.

```typescript
import React, { useState } from 'react';

interface User {
  id: number;
  username: string;
}

function PerfilUsuario() {
  // Estado pode ser User ou null (começa como null)
  const [usuario, setUsuario] = useState<User | null>(null);

  const handleLogin = () => {
    // Simula login
    setUsuario({ id: 1, username: "typescriptFan" });
  };

  const handleLogout = () => {
    setUsuario(null);
  };

  if (!usuario) {
    return <button onClick={handleLogin}>Entrar</button>;
  }

  return (
    <div>
      <p>Bem-vindo, {usuario.username} (ID: {usuario.id})!</p>
      <button onClick={handleLogout}>Sair</button>
    </div>
  );
}
```

## Hooks com Tipos

*   **`useEffect`**: Nenhuma tipagem especial é necessária para `useEffect` em si, mas você usará tipos dentro do callback e na função de limpeza (se houver).
    ```typescript
    useEffect(() => {
      console.log("Componente montado ou dependência mudou");
      const timerId: number = window.setInterval(() => {
          console.log("Tick");
      }, 1000);
      
      // Função de limpeza
      return () => {
        console.log("Componente desmontado ou antes do próximo efeito");
        window.clearInterval(timerId);
      };
    }, [/* dependências */]);
    ```
*   **`useContext`**: O hook `useContext` infere o tipo a partir do `Context` que você passa. É importante tipar o `Context` ao criá-lo com `createContext`.
    ```typescript
    import React, { createContext, useContext, useState, ReactNode } from 'react';

    interface TemaContextType {
      tema: 'claro' | 'escuro';
      alternarTema: () => void;
    }

    // Criar contexto com valor padrão e tipo
    const TemaContext = createContext<TemaContextType | undefined>(undefined);

    // Provedor do contexto
    export const TemaProvider = ({ children }: { children: ReactNode }) => {
      const [tema, setTema] = useState<'claro' | 'escuro'>('claro');
      const alternarTema = () => {
        setTema(t => (t === 'claro' ? 'escuro' : 'claro'));
      };
      return (
        <TemaContext.Provider value={{ tema, alternarTema }}>
          {children}
        </TemaContext.Provider>
      );
    };

    // Hook customizado para usar o contexto
    export const useTema = (): TemaContextType => {
      const contexto = useContext(TemaContext);
      if (contexto === undefined) {
        throw new Error('useTema deve ser usado dentro de um TemaProvider');
      }
      return contexto;
    };

    // --- Uso em um componente ---
    // import { useTema } from './TemaContext';
    // 
    // function MeuComponente() {
    //   const { tema, alternarTema } = useTema(); // Tipos inferidos corretamente
    //   return (
    //     <div style={{ background: tema === 'claro' ? '#fff' : '#333', color: tema === 'claro' ? '#000' : '#fff' }}>
    //       Tema atual: {tema}
    //       <button onClick={alternarTema}>Alternar Tema</button>
    //     </div>
    //   );
    // }
    ```
*   **`useReducer`**: Similar ao `useState`, o tipo do estado pode ser inferido. Você pode (e deve) tipar a `action` do reducer usando um tipo de união discriminada para segurança.
    ```typescript
    import React, { useReducer } from 'react';

    interface EstadoContador {
      contagem: number;
    }

    // União discriminada para as ações
    type AcaoContador =
      | { type: 'INCREMENTAR'; payload: number }
      | { type: 'DECREMENTAR' }
      | { type: 'RESETAR' };

    const estadoInicial: EstadoContador = { contagem: 0 };

    function reducer(estado: EstadoContador, acao: AcaoContador): EstadoContador {
      switch (acao.type) {
        case 'INCREMENTAR':
          // TypeScript sabe que acao.payload existe e é number aqui
          return { contagem: estado.contagem + acao.payload };
        case 'DECREMENTAR':
          return { contagem: estado.contagem - 1 };
        case 'RESETAR':
          return estadoInicial;
        default:
          // Garante que todas as ações foram tratadas
          const exhaustiveCheck: never = acao;
          return estado;
      }
    }

    function ContadorComReducer() {
      const [estado, dispatch] = useReducer(reducer, estadoInicial);

      return (
        <div>
          <p>Contagem (Reducer): {estado.contagem}</p>
          <button onClick={() => dispatch({ type: 'INCREMENTAR', payload: 5 })}>+5</button>
          <button onClick={() => dispatch({ type: 'DECREMENTAR' })}>-1</button>
          <button onClick={() => dispatch({ type: 'RESETAR' })}>Resetar</button>
          {/* dispatch({ type: 'INVALIDA' }); // Erro: tipo de ação inválido */}
        </div>
      );
    }
    ```
*   **`useRef`**: Para tipar `useRef`, passe o tipo do elemento ou valor que a ref irá conter como generic. Use `null` como valor inicial.
    ```typescript
    import React, { useRef, useEffect } from 'react';

    function CampoFocoAutomatico() {
      // Ref para um elemento input HTML
      const inputRef = useRef<HTMLInputElement>(null);

      useEffect(() => {
        // inputRef.current pode ser null inicialmente
        if (inputRef.current) {
          inputRef.current.focus(); // Acessa métodos do HTMLInputElement
        }
      }, []); // Roda apenas na montagem

      return <input ref={inputRef} type="text" placeholder="Foco automático" />;
    }
    ```

## Tipando Eventos (Event Handlers)

React fornece seus próprios tipos de eventos sintéticos que envolvem os eventos nativos do navegador. Use esses tipos ao definir handlers.

*   **Eventos de Mouse**: `React.MouseEvent<T>` (onde `T` é o tipo do elemento, ex: `HTMLButtonElement`)
*   **Eventos de Formulário/Input**: `React.ChangeEvent<T>` (ex: `HTMLInputElement`, `HTMLSelectElement`, `HTMLTextAreaElement`)
*   **Eventos de Teclado**: `React.KeyboardEvent<T>`
*   **Eventos de Foco**: `React.FocusEvent<T>`
*   **Eventos de Formulário**: `React.FormEvent<HTMLFormElement>` (geralmente no `onSubmit` do form)

```typescript
import React, { useState } from 'react';

function FormularioExemplo() {
  const [valorInput, setValorInput] = useState('');

  const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
    setValorInput(evento.target.value);
  };

  const handleSubmit = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault(); // Previne recarregamento da página
    alert(`Formulário enviado com valor: ${valorInput}`);
  };

  const handleDivClick = (evento: React.MouseEvent<HTMLDivElement>) => {
      console.log(`Div clicada! Coordenadas: ${evento.clientX}, ${evento.clientY}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div onClick={handleDivClick} style={{ padding: '10px', border: '1px solid red' }}>
          Clique nesta Div
      </div>
      <input type="text" value={valorInput} onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}
```

## Componentes de Classe (Props, State)

Embora menos comuns hoje, componentes de classe ainda são suportados. A tipagem é feita usando generics na declaração da classe: `React.Component<PropsInterface, StateInterface>`.

```typescript
import React from 'react';

interface ContadorClasseProps {
  valorInicial?: number;
}

interface ContadorClasseState {
  contagem: number;
}

class ContadorClasse extends React.Component<ContadorClasseProps, ContadorClasseState> {
  // Define o estado inicial
  state: ContadorClasseState = {
    contagem: this.props.valorInicial ?? 0 // Usa prop opcional ou 0
  };

  incrementar = () => {
    // Atualiza o estado usando setState
    this.setState({ contagem: this.state.contagem + 1 });
  };

  render() {
    return (
      <div>
        <p>Contagem (Classe): {this.state.contagem}</p>
        <button onClick={this.incrementar}>Incrementar (Classe)</button>
      </div>
    );
  }
}

export default ContadorClasse;
```

## Higher-Order Components (HOCs) e Render Props com Tipos

Tipar padrões mais avançados como HOCs e Render Props pode ser um pouco mais complexo, envolvendo generics e inferência de tipos para garantir que as props sejam passadas corretamente.

*   **HOCs**: Funções que recebem um componente e retornam um novo componente com props adicionais ou comportamento modificado.
*   **Render Props**: Componentes que recebem uma função como prop (`render` ou `children`) para delegar o que deve ser renderizado.

A tipagem exata pode variar dependendo da implementação, mas geralmente envolve generics para capturar e passar os tipos das props do componente original e das props adicionadas.

## Trabalhando com Bibliotecas de UI

Bibliotecas de componentes UI populares como Material UI (MUI), Chakra UI, Ant Design, etc., geralmente têm excelente suporte a TypeScript.

*   Elas exportam tipos para as props de seus componentes.
*   Você pode importar esses tipos e usá-los ao utilizar os componentes.
*   Muitas permitem estender ou sobrescrever temas usando tipos.

```typescript
// Exemplo conceitual com Material UI (MUI)
import React from 'react';
import Button, { ButtonProps } from '@mui/material/Button'; // Importa componente e suas props
import TextField, { TextFieldProps } from '@mui/material/TextField';

function FormularioMUI() {

  const handleButtonClick: ButtonProps['onClick'] = (event) => {
      console.log("Botão MUI clicado!", event);
  };

  const handleInputChange: TextFieldProps['onChange'] = (event) => {
      console.log("Input MUI mudou:", event.target.value);
  }

  return (
    <form>
      <TextField 
        label="Nome" 
        variant="outlined" 
        onChange={handleInputChange} 
        required 
      />
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleButtonClick}
        type="submit"
      >
        Enviar MUI
      </Button>
    </form>
  );
}
```

Consulte a documentação da biblioteca de UI específica para obter detalhes sobre como usar seus tipos.

## Exemplos Práticos e Exercícios

**Exemplo: Componente de Acordeão Simples**

```typescript
// src/components/Acordeao.tsx
import React, { useState, ReactNode } from 'react';

interface AcordeaoItemProps {
  titulo: string;
  children: ReactNode;
}

const AcordeaoItem: React.FC<AcordeaoItemProps> = ({ titulo, children }) => {
  const [aberto, setAberto] = useState(false);

  return (
    <div className="acordeao-item">
      <button onClick={() => setAberto(!aberto)} aria-expanded={aberto}>
        {titulo} {aberto ? '-' : '+'}
      </button>
      {aberto && <div className="conteudo">{children}</div>}
    </div>
  );
};

interface AcordeaoProps {
    // Permite múltiplos AcordeaoItem como filhos
    children: React.ReactElement<AcordeaoItemProps> | React.ReactElement<AcordeaoItemProps>[];
}

// Componente Acordeão principal (apenas agrupa os itens)
const Acordeao: React.FC<AcordeaoProps> = ({ children }) => {
    return <div className="acordeao">{children}</div>;
};

export { Acordeao, AcordeaoItem };

// --- Uso em App.tsx ---
// import { Acordeao, AcordeaoItem } from './components/Acordeao';
// 
// function App() {
//   return (
//     <div>
//       <h1>Acordeão Exemplo</h1>
//       <Acordeao>
//         <AcordeaoItem titulo="Seção 1">
//           <p>Conteúdo da seção 1...</p>
//         </AcordeaoItem>
//         <AcordeaoItem titulo="Seção 2">
//           <ul>
//             <li>Item A</li>
//             <li>Item B</li>
//           </ul>
//         </AcordeaoItem>
//         <AcordeaoItem titulo="Seção 3">
//           Outro conteúdo aqui.
//         </AcordeaoItem>
//       </Acordeao>
//     </div>
//   );
// }
```

**Exercício: Formulário de Contato Tipado**

1.  Crie um novo componente funcional chamado `FormularioContato.tsx`.
2.  Defina uma interface `FormData` para o estado do formulário, contendo: `nome` (string), `email` (string), `mensagem` (string).
3.  Use o hook `useState` para gerenciar o estado do formulário, inicializando com valores vazios e tipando explicitamente com `FormData`.
4.  Crie inputs controlados para nome, email e uma `textarea` para a mensagem. Use o estado para controlar seus valores.
5.  Crie um handler `handleChange` genérico que atualize a propriedade correta no estado com base no atributo `name` do input/textarea. Use `React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>` para o evento.
6.  Crie um handler `handleSubmit` para o evento `onSubmit` do formulário (`React.FormEvent<HTMLFormElement>`). Dentro dele:
    *   Previna o comportamento padrão do formulário.
    *   Simule o envio dos dados (ex: `console.log("Enviando dados:", formData)`).
    *   (Opcional) Limpe o formulário após o envio.
7.  Adicione validação básica (ex: verificar se os campos não estão vazios) antes de simular o envio no `handleSubmit`.
8.  Use o componente `FormularioContato` em seu `App.tsx`.

Este exercício reforça a tipagem de estado, eventos de formulário e inputs controlados em React com TypeScript.

Na próxima seção, veremos como aplicar conceitos similares ao desenvolvimento mobile com React Native e TypeScript.
# Seção 13: TypeScript com React Native

React Native permite construir aplicações móveis nativas para iOS e Android usando React. Assim como no React para web, usar TypeScript com React Native oferece benefícios significativos em termos de segurança de tipo, manutenibilidade e experiência do desenvolvedor ao lidar com componentes nativos, navegação, estilos e APIs específicas da plataforma.

Desde a versão 0.71, novos projetos React Native criados via CLI oficial já vêm com TypeScript configurado por padrão, tornando a integração ainda mais fácil.

## Configurando um Projeto React Native com TypeScript

A forma recomendada de iniciar um novo projeto React Native é usando a Command Line Interface (CLI) oficial:

```bash
npx react-native@latest init MeuAppReactNativeTS
```

Este comando criará um novo projeto chamado `MeuAppReactNativeTS` com TypeScript já configurado. A estrutura incluirá um `tsconfig.json` e os arquivos de exemplo (como `App.tsx`) usarão a sintaxe TypeScript.

Se você tiver um projeto React Native mais antigo baseado em JavaScript, pode adicionar TypeScript seguindo o guia oficial na documentação do React Native, que envolve instalar `typescript` e `@types/react-native`, criar um `tsconfig.json` e renomear seus arquivos `.js` para `.tsx` ou `.ts`.

## Tipando Componentes Nativos (Props, State)

A tipagem de componentes funcionais, props e state no React Native é muito similar à do React para web, usando interfaces ou type aliases para props e `useState` (com inferência ou tipo explícito) para state.

**Tipando Props:**

```typescript
// src/components/CartaoInfo.tsx
import React from 'react';
import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface CartaoInfoProps {
  titulo: string;
  valor: string | number;
  unidade?: string;
  estiloContainer?: StyleProp<ViewStyle>; // Tipo para estilos
}

const CartaoInfo: React.FC<CartaoInfoProps> = ({ titulo, valor, unidade, estiloContainer }) => {
  return (
    <View style={[styles.container, estiloContainer]}> 
      {/* Usando array para combinar estilos */} 
      <Text style={styles.titulo}>{titulo}</Text>
      <Text style={styles.valor}>
        {valor} {unidade}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
  },
  valor: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CartaoInfo;

// --- Uso em App.tsx ---
// import CartaoInfo from './src/components/CartaoInfo';
// import { View, SafeAreaView, StyleSheet } from 'react-native';
// 
// function App() {
//   return (
//     <SafeAreaView style={appStyles.safeArea}>
//       <View style={appStyles.container}>
//         <CartaoInfo titulo="Temperatura" valor={25} unidade="°C" />
//         <CartaoInfo 
//           titulo="Umidade" 
//           valor="60%" 
//           estiloContainer={{ backgroundColor: '#e0f7fa' }} // Passando estilo customizado
//         />
//         {/* <CartaoInfo titulo="Vento" /> // Erro: falta prop 'valor' */}
//       </View>
//     </SafeAreaView>
//   );
// }
// const appStyles = StyleSheet.create({ 
//     safeArea: { flex: 1 }, 
//     container: { padding: 20 } 
// });
```

*   Usamos tipos específicos do React Native como `StyleProp<ViewStyle>` para tipar props de estilo.
*   Interfaces e `React.FC` funcionam da mesma forma que no React web.

**Tipando State com `useState`:**

A tipagem do `useState` também é idêntica à do React web.

```typescript
// src/components/ContadorNativo.tsx
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ContadorNativo: React.FC = () => {
  // Tipo inferido como number
  const [contagem, setContagem] = useState(0);

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Contagem: {contagem}</Text>
      <Button title="Incrementar" onPress={() => setContagem(c => c + 1)} />
      <View style={{ marginTop: 10 }}> 
        {/* Necessário View para espaçamento no Button no Android */} 
        <Button title="Decrementar" onPress={() => setContagem(c => c - 1)} color="#f194ff"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: { marginVertical: 15, alignItems: 'center' },
    texto: { fontSize: 18, marginBottom: 10 }
});

export default ContadorNativo;
```

## Tipando Navegação (React Navigation)

React Navigation é a biblioteca de navegação mais popular para React Native. Ela tem um forte suporte a TypeScript, permitindo tipar as telas, parâmetros de rota e o objeto de navegação.

1.  **Instalar Dependências:** Siga as instruções de instalação do React Navigation e instale os tipos necessários (geralmente `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`, etc., e seus respectivos tipos, se não estiverem incluídos).

2.  **Definir Tipos de Parâmetros de Rota:** Crie um type alias ou interface para mapear os nomes das suas rotas aos parâmetros que cada rota espera receber. Use `undefined` se uma rota não espera parâmetros.

    ```typescript
    // src/navigation/types.ts
    import { StackScreenProps } from '@react-navigation/stack';
    import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
    import { CompositeScreenProps } from '@react-navigation/native';

    // Parâmetros para o Stack Navigator principal
    export type RootStackParamList = {
      HomeTabs: undefined; // Rota para as abas não recebe parâmetros diretos
      Detalhes: { itemId: number; outroParam?: string };
      Configuracoes: undefined;
    };

    // Parâmetros para o Bottom Tab Navigator
    export type HomeTabParamList = {
      Inicio: undefined;
      Perfil: { usuarioId: string };
    };

    // Tipos para as props de tela do Stack Navigator
    export type RootStackScreenProps<T extends keyof RootStackParamList> = 
        StackScreenProps<RootStackParamList, T>;

    // Tipos para as props de tela do Tab Navigator (combinando com Stack)
    // Útil se você precisar navegar do Tab para o Stack
    export type HomeTabScreenProps<T extends keyof HomeTabParamList> = 
        CompositeScreenProps<
            BottomTabScreenProps<HomeTabParamList, T>,
            RootStackScreenProps<keyof RootStackParamList> // Permite acesso à navegação do Stack
        >;
    ```

3.  **Tipar Componentes de Tela:** Use os tipos definidos (`RootStackScreenProps` ou `HomeTabScreenProps`) para tipar as props dos seus componentes de tela. Isso dará acesso tipado a `route.params` e `navigation`.

    ```typescript
    // src/screens/TelaDetalhes.tsx
    import React from 'react';
    import { View, Text, Button } from 'react-native';
    import { RootStackScreenProps } from '../navigation/types'; // Importa o tipo

    // Usa o tipo para tipar as props, especificando a rota "Detalhes"
    const TelaDetalhes: React.FC<RootStackScreenProps<'Detalhes'>> = ({ route, navigation }) => {
      // Acesso seguro aos parâmetros da rota
      const { itemId, outroParam } = route.params;

      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Tela de Detalhes</Text>
          <Text>ID do Item: {itemId}</Text>
          {outroParam && <Text>Outro Parâmetro: {outroParam}</Text>}
          <Button 
            title="Ir para Configurações"
            onPress={() => navigation.navigate('Configuracoes')} // Navegação tipada
          />
          <Button 
            title="Voltar"
            onPress={() => navigation.goBack()}
          />
           <Button 
            title="Ir para Início (Tab)"
            onPress={() => navigation.navigate('HomeTabs', { screen: 'Inicio' })} // Navega para tela dentro de outro navigator
          />
        </View>
      );
    };

    export default TelaDetalhes;
    ```

4.  **Tipar Navegadores:** Ao criar os navegadores (`createStackNavigator`, `createBottomTabNavigator`), passe os tipos de parâmetros como generics.

    ```typescript
    // src/navigation/AppNavigator.tsx
    import React from 'react';
    import { NavigationContainer } from '@react-navigation/native';
    import { createStackNavigator } from '@react-navigation/stack';
    import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

    import { RootStackParamList, HomeTabParamList } from './types'; // Importa os tipos

    // Importa as telas
    import TelaInicio from '../screens/TelaInicio';
    import TelaPerfil from '../screens/TelaPerfil';
    import TelaDetalhes from '../screens/TelaDetalhes';
    import TelaConfiguracoes from '../screens/TelaConfiguracoes';

    // Cria os navegadores com tipos
    const Stack = createStackNavigator<RootStackParamList>();
    const Tab = createBottomTabNavigator<HomeTabParamList>();

    // Componente para o Tab Navigator
    function HomeTabs() {
      return (
        <Tab.Navigator>
          <Tab.Screen name="Inicio" component={TelaInicio} />
          <Tab.Screen name="Perfil" component={TelaPerfil} initialParams={{ usuarioId: 'user-123' }}/>
        </Tab.Navigator>
      );
    }

    // Componente para o Stack Navigator principal
    function AppNavigator() {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="HomeTabs">
            <Stack.Screen 
                name="HomeTabs" 
                component={HomeTabs} 
                options={{ headerShown: false }} // Esconde header para as tabs
            />
            <Stack.Screen name="Detalhes" component={TelaDetalhes} />
            <Stack.Screen name="Configuracoes" component={TelaConfiguracoes} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    export default AppNavigator;
    ```

Seguir a documentação de tipagem do React Navigation é crucial para configurar corretamente.

## Tipando Estilização (StyleSheet)

O `StyleSheet.create` do React Native infere os tipos dos estilos que você define. No entanto, ao passar estilos como props ou combiná-los, é útil usar os tipos fornecidos pelo React Native:

*   `ViewStyle`: Estilos para componentes `<View>`.
*   `TextStyle`: Estilos para componentes `<Text>`.
*   `ImageStyle`: Estilos para componentes `<Image>`.
*   `StyleProp<T>`: Um tipo genérico para aceitar um único objeto de estilo, um array de estilos, ou valores `undefined`/`null`/`false`.

```typescript
import { StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';

interface EstilosBotao {
  container: ViewStyle;
  texto: TextStyle;
}

const estilos: EstilosBotao = StyleSheet.create<EstilosBotao>({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  texto: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

// Exemplo de componente recebendo estilo como prop
interface BotaoCustomizadoProps {
    titulo: string;
    estilo?: StyleProp<ViewStyle>; // Aceita diferentes formas de estilo
    onPress: () => void;
}

const BotaoCustomizado: React.FC<BotaoCustomizadoProps> = ({ titulo, estilo, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[estilos.container, estilo]}>
            <Text style={estilos.texto}>{titulo}</Text>
        </TouchableOpacity>
    );
}
```

## Trabalhando com APIs Nativas

React Native permite acessar APIs nativas do dispositivo (como câmera, localização, armazenamento, etc.) através de:

1.  **Módulos Nativos do React Native:** APIs incluídas no core (ex: `Alert`, `PermissionsAndroid`, `AppState`).
2.  **Bibliotecas de Terceiros:** Muitas bibliotecas da comunidade fornecem acesso a funcionalidades nativas (ex: `react-native-camera`, `react-native-geolocation-service`, `react-native-async-storage`).

Ao usar essas APIs, verifique se a biblioteca fornece tipos TypeScript (seja incluídos ou via `@types`). Isso garantirá que você chame as funções nativas com os argumentos corretos e trate os retornos (geralmente Promises) de forma segura.

```typescript
import { Alert, PermissionsAndroid, Platform } from 'react-native';

async function solicitarPermissaoCamera() {
  if (Platform.OS === 'android') {
    try {
      // PermissionsAndroid.request retorna um tipo PermissionsAndroid.PermissionStatus
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Permissão da Câmera",
          message: "Este app precisa de acesso à câmera.",
          buttonNeutral: "Perguntar Depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissão da câmera concedida");
        return true;
      } else {
        console.log("Permissão da câmera negada");
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  } else { // iOS (geralmente lida via Info.plist)
      console.log("Permissões no iOS geralmente configuradas no Info.plist");
      return true; // Simula permissão no iOS para exemplo
  }
}

async function usarCamera() {
    const temPermissao = await solicitarPermissaoCamera();
    if (temPermissao) {
        Alert.alert("Sucesso", "Permissão concedida. Abrindo câmera... (simulado)");
        // Aqui você usaria uma biblioteca como react-native-camera
    } else {
        Alert.alert("Falha", "Sem permissão para usar a câmera.");
    }
}

// Chamar usarCamera() a partir de um botão, por exemplo.
```

## Exemplos Práticos e Exercícios

**Exemplo: Tela de Lista Simples com Navegação**

(Este exemplo assume que você tem a estrutura de navegação configurada como mostrado anteriormente).

```typescript
// src/screens/TelaInicio.tsx
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { HomeTabScreenProps } from '../navigation/types'; // Tipo da tela de Tab

interface ListItem {
  id: number;
  nome: string;
}

const dadosIniciais: ListItem[] = [
  { id: 1, nome: 'Item Alfa' },
  { id: 2, nome: 'Item Beta' },
  { id: 3, nome: 'Item Gama' },
];

const TelaInicio: React.FC<HomeTabScreenProps<'Inicio'>> = ({ navigation }) => {
  
  const renderItem = ({ item }: { item: ListItem }) => (
    <TouchableOpacity 
      style={styles.itemContainer}
      onPress={() => navigation.navigate('Detalhes', { itemId: item.id, outroParam: item.nome })} // Navega para Detalhes
    >
      <Text style={styles.itemTexto}>{item.nome}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Tela Inicial</Text>
      <FlatList
        data={dadosIniciais}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Perfil', { usuarioId: 'usr-abc' })}>
          <Text style={styles.linkPerfil}>Ir para Perfil</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center'
  },
  itemContainer: {
    backgroundColor: '#e9e9e9',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemTexto: {
    fontSize: 18,
  },
  linkPerfil: {
      marginTop: 20,
      color: 'blue',
      textAlign: 'center',
      fontSize: 16
  }
});

export default TelaInicio;
```

**Exercício: Componente de Input com Validação**

1.  Crie um componente funcional `InputValidado.tsx`.
2.  Defina as props que ele deve receber:
    *   `label` (string)
    *   `valor` (string) - O valor atual do input (controlado pelo componente pai).
    *   `onChangeText` (função que recebe uma string e não retorna nada) - Callback para atualizar o valor no pai.
    *   `onValidate` (função opcional que recebe uma string e retorna uma string de erro ou `null` se válido).
    *   Outras props do `TextInput` que você queira passar (ex: `placeholder`, `secureTextEntry`). Use `TextInputProps` de `react-native` e `Omit` para evitar conflito com suas props.
3.  Dentro do componente, use `useState` para guardar a mensagem de erro atual (string ou null).
4.  Use o `TextInput` do React Native. Passe `valor` e `onChangeText` para ele.
5.  No `onChangeText` do `TextInput`, chame o `onChangeText` recebido via props *e* chame a função `onValidate` (se existir) com o novo texto. Atualize o estado de erro com o resultado da validação.
6.  Renderize o `label`, o `TextInput` e, condicionalmente, uma tag `<Text>` com a mensagem de erro (se o estado de erro não for `null`), estilizando o erro (ex: cor vermelha).
7.  No componente pai (ex: `App.tsx`):
    *   Use `useState` para guardar o valor do input.
    *   Crie uma função de validação simples (ex: verificar se o campo não está vazio).
    *   Use o componente `InputValidado`, passando as props necessárias, incluindo a função de validação.

Este exercício pratica a criação de componentes reutilizáveis, tipagem de props (incluindo funções e props nativas), state e lógica de validação simples no React Native com TypeScript.

Na próxima seção, exploraremos como usar TypeScript para automação de tarefas.
# Seção 14: TypeScript para Automação

Além do desenvolvimento web frontend e backend, TypeScript também é uma ferramenta valiosa para escrever scripts de automação. Tarefas como manipulação de arquivos, interação com APIs, processos de build/deploy, web scraping ou qualquer script que você normalmente escreveria em JavaScript podem se beneficiar da segurança de tipo e das ferramentas oferecidas pelo TypeScript.

Usar TypeScript para automação ajuda a criar scripts mais robustos, fáceis de entender e menos propensos a erros em tempo de execução, o que é crucial para tarefas que rodam sem supervisão direta.

## Criação de Scripts com TypeScript (`ts-node`)

A maneira mais direta de executar scripts TypeScript é usando `ts-node`, que já vimos na configuração de projetos Node.js. Ele permite executar arquivos `.ts` diretamente, sem a etapa explícita de compilação para `.js`.

1.  **Instalar Dependências:**
    ```bash
    # Em um novo projeto ou no projeto existente
    npm init -y
    npm install typescript @types/node ts-node --save-dev
    # ou
    # yarn init -y
    # yarn add typescript @types/node ts-node --dev
    ```

2.  **Criar o Script (`.ts`):**
    Escreva seu script de automação em um arquivo `.ts`, utilizando tipos para variáveis, funções e dados.

    ```typescript
    // scripts/limparPastaTemp.ts
    import * as fs from 'fs/promises'; // Usando API de Promises do fs
    import * as path from 'path';
    
    // Define o caminho para a pasta temporária (exemplo)
    const pastaTemporaria = path.join(__dirname, '..', 'temp'); // Pasta temp na raiz do projeto
    
    interface ResultadoLimpeza {
        arquivosRemovidos: string[];
        erros: string[];
    }
    
    async function limparPasta(caminhoPasta: string): Promise<ResultadoLimpeza> {
        console.log(`Iniciando limpeza da pasta: ${caminhoPasta}`);
        const resultado: ResultadoLimpeza = { arquivosRemovidos: [], erros: [] };
    
        try {
            // Verifica se a pasta existe
            await fs.access(caminhoPasta);
            console.log("Pasta encontrada. Lendo conteúdo...");
    
            const arquivos = await fs.readdir(caminhoPasta);
            console.log(`Arquivos encontrados: ${arquivos.length}`);
    
            if (arquivos.length === 0) {
                console.log("Pasta já está vazia.");
                return resultado;
            }
    
            // Itera sobre os arquivos e tenta remover cada um
            for (const arquivo of arquivos) {
                const caminhoCompleto = path.join(caminhoPasta, arquivo);
                try {
                    await fs.unlink(caminhoCompleto);
                    console.log(` - Removido: ${arquivo}`);
                    resultado.arquivosRemovidos.push(arquivo);
                } catch (erroRemocao: any) {
                    console.error(`   Erro ao remover ${arquivo}: ${erroRemocao.message}`);
                    resultado.erros.push(`Erro ao remover ${arquivo}: ${erroRemocao.message}`);
                }
            }
    
        } catch (erroAcesso: any) {
            if (erroAcesso.code === 'ENOENT') {
                console.log("Pasta temporária não existe. Nada a fazer.");
            } else {
                console.error(`Erro ao acessar a pasta ${caminhoPasta}: ${erroAcesso.message}`);
                resultado.erros.push(`Erro ao acessar a pasta: ${erroAcesso.message}`);
            }
        }
    
        console.log("Limpeza concluída.");
        return resultado;
    }
    
    // Executa a função principal do script
    async function executar() {
        const resultadoFinal = await limparPasta(pastaTemporaria);
        console.log("\n--- Resumo da Limpeza ---");
        console.log(`Arquivos Removidos (${resultadoFinal.arquivosRemovidos.length}):`);
        resultadoFinal.arquivosRemovidos.forEach(a => console.log(` - ${a}`));
        if (resultadoFinal.erros.length > 0) {
            console.error(`\nErros (${resultadoFinal.erros.length}):`);
            resultadoFinal.erros.forEach(e => console.error(` - ${e}`));
        }
        console.log("-------------------------");
    }
    
    executar();
    ```

3.  **Executar o Script:**
    Use `ts-node` para executar o arquivo `.ts` diretamente do terminal.
    ```bash
    npx ts-node scripts/limparPastaTemp.ts
    # ou
    # yarn ts-node scripts/limparPastaTemp.ts 
    ```
    Você também pode adicionar o comando a um script no `package.json` para facilitar a execução.

## Manipulação de Arquivos (Node.js `fs` com tipos)

O módulo `fs` (File System) nativo do Node.js é fundamental para scripts de automação que precisam ler, escrever, mover ou excluir arquivos e diretórios. Graças ao pacote `@types/node`, as funções do módulo `fs` são tipadas, incluindo suas versões síncronas, baseadas em callback e baseadas em Promise (`fs/promises`).

Usar a versão baseada em Promise (`fs/promises`) com `async/await` geralmente leva a um código mais limpo e legível.

```typescript
// scripts/processarDadosCsv.ts
import * as fs from 'fs/promises';
import * as path from 'path';

interface Registro {
    id: number;
    nome: string;
    valor: number;
}

const arquivoEntrada = path.join(__dirname, '..', 'dados', 'entrada.csv');
const arquivoSaida = path.join(__dirname, '..', 'dados', 'saida.json');

async function processarCsv(): Promise<void> {
    console.log(`Lendo arquivo CSV: ${arquivoEntrada}`);
    try {
        const conteudoCsv = await fs.readFile(arquivoEntrada, { encoding: 'utf-8' });
        const linhas = conteudoCsv.split('\n').filter(linha => linha.trim() !== '');

        if (linhas.length <= 1) {
            console.log("Arquivo CSV vazio ou contém apenas cabeçalho.");
            return;
        }

        // Remove cabeçalho (assumindo que a primeira linha é o cabeçalho)
        const linhasDeDados = linhas.slice(1);

        const registros: Registro[] = linhasDeDados.map((linha, index) => {
            const [idStr, nome, valorStr] = linha.split(',');
            if (!idStr || !nome || !valorStr) {
                throw new Error(`Formato inválido na linha ${index + 2}: ${linha}`);
            }
            return {
                id: parseInt(idStr.trim(), 10),
                nome: nome.trim(),
                valor: parseFloat(valorStr.trim())
            };
        });

        console.log(`Registros processados: ${registros.length}`);

        // Processamento adicional (exemplo: filtrar registros com valor > 50)
        const registrosFiltrados = registros.filter(r => r.valor > 50);
        console.log(`Registros com valor > 50: ${registrosFiltrados.length}`);

        // Escreve a saída em JSON
        console.log(`Escrevendo resultado em JSON: ${arquivoSaida}`);
        const conteudoJson = JSON.stringify(registrosFiltrados, null, 2); // Formata com indentação
        await fs.writeFile(arquivoSaida, conteudoJson, { encoding: 'utf-8' });

        console.log("Processamento concluído com sucesso!");

    } catch (error: any) {
        console.error(`Erro durante o processamento do CSV: ${error.message}`);
    }
}

processarCsv();
```

## Interagindo com APIs Externas (Fetch/Axios com tipos)

Scripts de automação frequentemente precisam interagir com APIs web para buscar dados, enviar informações ou acionar processos.

*   **Node.js `fetch` (Experimental):** Versões mais recentes do Node.js incluem uma implementação da API `fetch` similar à dos navegadores. `@types/node` fornece tipos para ela.
*   **Bibliotecas como `axios`:** Bibliotecas populares como `axios` (que já vimos) são amplamente usadas e têm excelente suporte a TypeScript (`@types/axios`), oferecendo uma API robusta para requisições HTTP.

```typescript
// scripts/verificarStatusApi.ts
import axios, { AxiosError } from 'axios';

interface StatusApi {
    servico: string;
    url: string;
    status: 'online' | 'offline' | 'erro';
    mensagem?: string;
    tempoRespostaMs?: number;
}

const apisParaVerificar: { nome: string; url: string }[] = [
    { nome: "API Pública Teste", url: "https://jsonplaceholder.typicode.com/todos/1" },
    { nome: "API Inexistente", url: "https://api.exemplo.invalid/status" },
    { nome: "Google", url: "https://www.google.com" },
];

async function verificarStatus(nome: string, url: string): Promise<StatusApi> {
    const inicio = Date.now();
    try {
        await axios.get(url, { timeout: 5000 }); // Timeout de 5 segundos
        const fim = Date.now();
        return {
            servico: nome,
            url: url,
            status: 'online',
            tempoRespostaMs: fim - inicio
        };
    } catch (error: any) {
        const fim = Date.now();
        let statusDetalhe: StatusApi = {
            servico: nome,
            url: url,
            status: 'erro',
            tempoRespostaMs: fim - inicio
        };

        if (axios.isAxiosError(error)) {
            statusDetalhe.mensagem = `Erro Axios: ${error.code} - ${error.message}`;
            if (error.response) {
                statusDetalhe.mensagem += ` (Status: ${error.response.status})`;
            }
            if (error.code === 'ECONNABORTED') {
                statusDetalhe.status = 'offline'; // Considera timeout como offline
                statusDetalhe.mensagem = 'Timeout da requisição';
            }
        } else {
            statusDetalhe.mensagem = `Erro desconhecido: ${error.message}`;
        }
        return statusDetalhe;
    }
}

async function verificarTodasApis() {
    console.log("Iniciando verificação de status das APIs...");
    const promessasStatus = apisParaVerificar.map(api => verificarStatus(api.nome, api.url));
    
    // Espera todas as verificações terminarem
    const resultados = await Promise.all(promessasStatus);

    console.log("\n--- Resultado da Verificação ---");
    resultados.forEach(res => {
        console.log(`Serviço: ${res.servico}`);
        console.log(`  URL: ${res.url}`);
        console.log(`  Status: ${res.status.toUpperCase()}`);
        if (res.tempoRespostaMs !== undefined) {
            console.log(`  Tempo: ${res.tempoRespostaMs}ms`);
        }
        if (res.mensagem) {
            console.log(`  Mensagem: ${res.mensagem}`);
        }
        console.log("  ----------");
    });
}

verificarTodasApis();
```

## Automação de Tarefas de Build/Deploy

TypeScript pode ser usado para criar scripts mais complexos e seguros para automatizar processos de build e deploy, indo além do que simples scripts de shell ou `package.json` podem fazer.

Você pode usar bibliotecas como:

*   `shelljs` (`@types/shelljs`): Para executar comandos shell de forma portável dentro do seu script Node.js.
*   `fs-extra` (`@types/fs-extra`): Uma versão aprimorada do módulo `fs` com mais funcionalidades (como cópia recursiva, criação de diretórios, etc.).
*   Bibliotecas específicas de provedores de nuvem (AWS SDK, Azure SDK, Google Cloud Client Libraries) que geralmente possuem suporte a TypeScript.

```typescript
// scripts/deploySimples.ts
import * as shell from 'shelljs';
import * as path from 'path';
import * as fs from 'fs-extra'; // Usando fs-extra

const pastaBuild = path.join(__dirname, '..', 'dist'); // Assumindo que o build está em /dist
const pastaDeploy = path.join('/var/www/meu-app'); // Exemplo de pasta de deploy no servidor
const branchPermitida = 'main';

function executarComando(comando: string, descricao: string): boolean {
    console.log(`Executando: ${descricao} (${comando})`);
    const resultado = shell.exec(comando, { silent: false }); // Mude para true para menos output
    if (resultado.code !== 0) {
        console.error(`Erro ao executar ${descricao}: ${resultado.stderr}`);
        return false;
    }
    console.log(`${descricao} concluído com sucesso.`);
    return true;
}

async function deploy(): Promise<void> {
    console.log("--- Iniciando Script de Deploy ---");

    // 1. Verificar Branch Git
    console.log("Verificando branch Git...");
    const branchAtual = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.trim();
    if (branchAtual !== branchPermitida) {
        console.error(`Erro: Deploy só é permitido a partir da branch '${branchPermitida}'. Branch atual: '${branchAtual}'.`);
        shell.exit(1);
    }
    console.log(`Branch atual: ${branchAtual} (OK)`);

    // 2. Executar Build (exemplo)
    if (!executarComando('npm run build', 'Build do Projeto')) {
        shell.exit(1);
    }

    // 3. Verificar se a pasta de build existe
    if (!await fs.pathExists(pastaBuild)) {
        console.error(`Erro: Pasta de build não encontrada em ${pastaBuild}`);
        shell.exit(1);
    }

    // 4. Limpar pasta de deploy anterior (com cuidado!)
    console.log(`Limpando pasta de deploy anterior: ${pastaDeploy}`);
    try {
        await fs.emptyDir(pastaDeploy);
        console.log("Pasta de deploy limpa.");
    } catch (err: any) {
        console.error(`Erro ao limpar pasta de deploy: ${err.message}`);
        shell.exit(1);
    }

    // 5. Copiar arquivos do build para deploy
    console.log(`Copiando arquivos de ${pastaBuild} para ${pastaDeploy}`);
    try {
        await fs.copy(pastaBuild, pastaDeploy);
        console.log("Arquivos copiados com sucesso.");
    } catch (err: any) {
        console.error(`Erro ao copiar arquivos: ${err.message}`);
        shell.exit(1);
    }

    // 6. (Opcional) Reiniciar serviço (exemplo)
    // if (!executarComando('sudo systemctl restart meu-app.service', 'Reiniciar Serviço')) {
    //     shell.exit(1);
    // }

    console.log("--- Deploy Concluído com Sucesso! ---");
}

deploy();
```

**Nota:** Scripts de deploy devem ser escritos com muito cuidado, especialmente ao lidar com exclusão de arquivos ou reinicialização de serviços.

## Exemplos Práticos e Exercícios

**Exemplo: Script para Renomear Arquivos em Lote**

```typescript
// scripts/renomearLote.ts
import * as fs from 'fs/promises';
import * as path from 'path';

const diretorioAlvo = path.join(__dirname, '..', 'imagens'); // Pasta com arquivos a renomear
const prefixoNovo = 'IMG_';
const extensaoAlvo = '.jpg'; // Renomear apenas arquivos .jpg

async function renomearArquivos() {
    console.log(`Iniciando renomeação na pasta: ${diretorioAlvo}`);
    let contador = 1;
    try {
        const arquivos = await fs.readdir(diretorioAlvo);
        for (const arquivo of arquivos) {
            const caminhoAntigo = path.join(diretorioAlvo, arquivo);
            const stat = await fs.stat(caminhoAntigo);

            // Verifica se é um arquivo e tem a extensão correta
            if (stat.isFile() && path.extname(arquivo).toLowerCase() === extensaoAlvo) {
                // Formata o novo nome com zero à esquerda
                const novoNome = `${prefixoNovo}${contador.toString().padStart(4, '0')}${extensaoAlvo}`;
                const caminhoNovo = path.join(diretorioAlvo, novoNome);

                if (caminhoAntigo !== caminhoNovo) { // Evita renomear para o mesmo nome
                    console.log(`Renomeando "${arquivo}" para "${novoNome}"...`);
                    await fs.rename(caminhoAntigo, caminhoNovo);
                    contador++;
                } else {
                    console.log(`Ignorando "${arquivo}", já está no formato correto.`);
                    contador++; // Incrementa mesmo se não renomear para manter sequência
                }
            }
        }
        console.log(`\nRenomeação concluída. ${contador - 1} arquivos processados.`);
    } catch (error: any) {
        if (error.code === 'ENOENT') {
            console.error(`Erro: Diretório alvo não encontrado: ${diretorioAlvo}`);
        } else {
            console.error(`Erro durante a renomeação: ${error.message}`);
        }
    }
}

renomearArquivos();
```

**Exercício: Web Scraper Simples**

1.  Instale `axios` e `cheerio` (e seus tipos `@types/cheerio`):
    ```bash
    npm install axios cheerio @types/cheerio --save-dev
    ```
    (Cheerio é uma biblioteca para fazer parsing e manipulação de HTML no servidor, similar ao jQuery).
2.  Crie um script `scraperNoticias.ts`.
3.  Defina uma URL de um site de notícias simples (ex: um blog, ou use um site de exemplo como `toscrape.com`).
4.  Use `axios` para buscar o conteúdo HTML da URL.
5.  Use `cheerio.load()` para carregar o HTML obtido.
6.  Use seletores CSS (como no jQuery) com a API do Cheerio (`$`) para encontrar os títulos e links das principais notícias na página.
7.  Defina uma interface `Noticia` com `titulo` (string) e `link` (string).
8.  Itere sobre os elementos encontrados, extraia o título e o link de cada um, e armazene-os em um array de `Noticia`.
9.  Imprima o array de notícias no console.
10. Adicione tratamento de erro básico para a requisição HTTP e para o parsing.
11. Execute o script com `ts-node`.

Este exercício combina interação com API externa (HTTP GET), manipulação de dados (HTML parsing com Cheerio) e tipagem de estruturas de dados, tarefas comuns em scripts de automação e web scraping.

Na próxima seção, abordaremos configurações mais avançadas do `tsconfig.json` e a integração com ferramentas como linters e formatters.
# Seção 15: Configurações Avançadas e Ferramentas

Para otimizar o desenvolvimento com TypeScript e garantir a qualidade e consistência do código, especialmente em projetos maiores ou em equipe, é essencial entender algumas configurações mais avançadas do `tsconfig.json` e integrar o TypeScript com ferramentas populares como linters (ESLint) e formatters (Prettier).

## Opções Avançadas do `tsconfig.json`

O arquivo `tsconfig.json` controla como o compilador TypeScript (`tsc`) se comporta. Já vimos opções básicas como `target`, `module`, `outDir`, `rootDir`, `strict` e `esModuleInterop`. Vamos explorar algumas outras opções importantes:

**Controle de Tipos e Verificação:**

*   **`strict` (Recomendado: `true`)**: Habilita um conjunto de verificações de tipo mais rigorosas. É altamente recomendado mantê-lo como `true` para aproveitar ao máximo os benefícios do TypeScript. Ele ativa flags como:
    *   `noImplicitAny`: Gera erro se o tipo não puder ser inferido e for implicitamente `any`.
    *   `strictNullChecks`: Trata `null` e `undefined` como tipos distintos, forçando verificações explícitas (ex: `if (variavel != null)`).
    *   `strictFunctionTypes`: Verificação mais rigorosa da covariância/contravariância de parâmetros de função.
    *   `strictBindCallApply`: Verificação mais rigorosa dos métodos `bind`, `call`, e `apply` em funções.
    *   `strictPropertyInitialization`: Garante que propriedades de classe declaradas sejam inicializadas no construtor ou com um inicializador de propriedade (a menos que marcadas com `!`).
    *   `noImplicitThis`: Gera erro em usos de `this` com tipo implícito `any`.
    *   `alwaysStrict`: Garante que o modo estrito do JavaScript (`'use strict';`) seja emitido nos arquivos compilados.
*   **`noUnusedLocals` (Recomendado: `true`)**: Reporta erro se houver variáveis locais declaradas mas não utilizadas.
*   **`noUnusedParameters` (Recomendado: `true`)**: Reporta erro se houver parâmetros de função declarados mas não utilizados (pode ser prefixado com `_` para indicar intencionalidade, ex: `_paramIgnorado`).
*   **`noImplicitReturns` (Recomendado: `true`)**: Garante que todos os caminhos de código em uma função retornem um valor, se a função tiver um tipo de retorno diferente de `void` ou `any`.
*   **`noFallthroughCasesInSwitch` (Recomendado: `true`)**: Reporta erro em casos de `switch` que "caem" para o próximo caso sem um `break` ou `return` explícito (a menos que intencional e comentado).

**Resolução de Módulos e Caminhos:**

*   **`moduleResolution`**: Define a estratégia de resolução de módulos (`Node`, `Node16`, `NodeNext`, `Classic`). `Node` (ou suas variantes mais recentes) é o padrão para a maioria dos projetos.
*   **`baseUrl`**: Define um diretório base para resolver importações não relativas. Útil em conjunto com `paths`.
    *   Exemplo: Se `baseUrl` for `./src`, uma importação `import { Componente } from "components/MeuComponente";` procurará por `src/components/MeuComponente`.
*   **`paths`**: Mapeia caminhos de importação para locais específicos no disco, relativo ao `baseUrl`. Útil para criar aliases de importação e evitar caminhos relativos longos (`../../..`).
    ```json
    // tsconfig.json
    {
      "compilerOptions": {
        "baseUrl": ".", // Base na raiz do projeto
        "paths": {
          "@components/*": ["src/components/*"],
          "@services/*": ["src/services/*"],
          "@utils": ["src/utils/index.ts"] // Mapeia para um arquivo específico
        }
      }
    }
    ```
    Com isso, você pode importar como: `import Botao from "@components/Botao";` ou `import { helper } from "@utils";`.
    **Nota:** O JavaScript resultante *não* entenderá esses aliases. Você precisará configurar seu bundler (Webpack, Vite) ou usar uma ferramenta como `tsc-alias` após a compilação para resolver esses caminhos no código final.
*   **`rootDirs`**: Permite tratar múltiplos diretórios como se fossem um único diretório raiz virtual durante a resolução de módulos. Útil em estruturas de monorepo ou ao combinar fontes de locais diferentes.
*   **`typeRoots`**: Especifica pastas onde procurar por arquivos de declaração (`.d.ts`), além de `node_modules/@types`.
*   **`types`**: Se especificado, apenas os pacotes de tipos listados aqui (e aqueles em `typeRoots`) serão incluídos na compilação global. Útil para resolver conflitos ou limitar os tipos globais.

**Saída da Compilação:**

*   **`sourceMap` (Recomendado: `true` para dev)**: Gera arquivos `.map` que mapeiam o código JavaScript compilado de volta para o código TypeScript original. Essencial para depuração no navegador ou Node.js.
*   **`declaration` (Útil para bibliotecas)**: Gera arquivos de declaração `.d.ts` correspondentes aos seus arquivos `.js` compilados. Necessário se você está publicando uma biblioteca TypeScript para ser consumida por outros projetos TypeScript.
*   **`declarationMap`**: Gera source maps para os arquivos de declaração (`.d.ts.map`), permitindo "ir para a definição" no editor e pular para o código fonte `.ts` original.
*   **`outDir`**: Redireciona a saída da compilação para um diretório específico.
*   **`removeComments`**: Remove comentários do código JavaScript de saída.
*   **`noEmit`**: Não gera arquivos de saída (`.js`, `.d.ts`). Útil quando outra ferramenta (como Babel ou um bundler) está cuidando da transpilação, e você usa `tsc` apenas para verificação de tipos.
*   **`isolatedModules`**: Garante que cada arquivo possa ser transpilado separadamente sem depender de informações de tipo de outros arquivos. Exigido por algumas ferramentas como Babel e esbuild. Impõe certas restrições (ex: `const enum` não é permitido).

**Interoperabilidade com JavaScript:**

*   **`allowJs`**: Permite que arquivos `.js` sejam incluídos na compilação.
*   **`checkJs`**: Pede ao TypeScript para tentar analisar e reportar erros em arquivos `.js` (funciona melhor com anotações JSDoc).
*   **`maxNodeModuleJsDepth`**: Profundidade máxima que o compilador procura por arquivos `.js` dentro de `node_modules` quando `allowJs` está ativo.

**Configuração de Projeto (`files`, `include`, `exclude`):**

*   **`files`**: Lista explícita de arquivos a serem incluídos na compilação.
*   **`include`**: Array de padrões glob (ex: `src/**/*`) para incluir arquivos.
*   **`exclude`**: Array de padrões glob para excluir arquivos (padrão inclui `node_modules`, `bower_components`, `jspm_packages`, e o `outDir`).
    *   `files` tem precedência sobre `exclude`. `include` e `exclude` trabalham juntos.

**Referências de Projeto (`references`):**

*   Usado para dividir um projeto grande em subprojetos menores (monorepos). Permite que `tsc --build` compile os projetos na ordem correta de dependência e otimize a recompilação.

Escolher as opções corretas no `tsconfig.json` é crucial para configurar o compilador de acordo com as necessidades do seu projeto, seja ele uma aplicação web, uma biblioteca, um script de automação ou um projeto backend.

## Integração com ESLint (Linting)

**Linting** é o processo de analisar o código estaticamente para encontrar problemas de estilo, possíveis erros lógicos e padrões de código problemáticos que não são necessariamente erros de sintaxe ou tipo.

**ESLint** é o linter mais popular para JavaScript e TypeScript. Ele pode ser configurado com regras específicas para TypeScript usando plugins.

**Configuração:**

1.  **Instalar Dependências:**
    ```bash
    npm install eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --save-dev
    # ou
    # yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
    ```
    *   `eslint`: O core do ESLint.
    *   `@typescript-eslint/parser`: Permite que o ESLint entenda a sintaxe do TypeScript.
    *   `@typescript-eslint/eslint-plugin`: Fornece regras específicas do ESLint para TypeScript.

2.  **Criar Arquivo de Configuração (`.eslintrc.js` ou `.eslintrc.json`):**
    ```javascript
    // .eslintrc.js
    module.exports = {
      parser: "@typescript-eslint/parser", // Especifica o parser TypeScript
      extends: [
        "eslint:recommended", // Regras recomendadas do ESLint
        "plugin:@typescript-eslint/recommended", // Regras recomendadas do @typescript-eslint
        // Opcional: Adicionar regras específicas de frameworks (ex: React)
        // "plugin:react/recommended",
        // "plugin:react-hooks/recommended",
        // Opcional: Adicionar Prettier para evitar conflitos (ver próxima seção)
        // "plugin:prettier/recommended", 
      ],
      parserOptions: {
        ecmaVersion: 2020, // Versão do ECMAScript
        sourceType: "module", // Permite uso de imports
        ecmaFeatures: {
          jsx: true, // Habilita parsing de JSX (se usar React/JSX)
        },
      },
      settings: {
        react: {
          version: "detect", // Detecta automaticamente a versão do React (se usar)
        },
      },
      env: {
        browser: true, // Variáveis globais do navegador
        node: true, // Variáveis globais do Node.js
        es2021: true, // Globais do ES2021
      },
      rules: {
        // Suas regras customizadas aqui. Exemplos:
        "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }], // Avisa sobre vars não usadas (ignora se começar com _)
        "@typescript-eslint/no-explicit-any": "warn", // Avisa sobre o uso de 'any'
        "no-console": "warn", // Avisa sobre uso de console.log
        // "react/prop-types": "off", // Desligar se usar TypeScript para props
        // ... outras regras
      },
      ignorePatterns: ["node_modules/", "dist/", "build/", "*.config.js"], // Arquivos/pastas a ignorar
    };
    ```

3.  **Adicionar Script ao `package.json`:**
    ```json
    "scripts": {
      "lint": "eslint \"src/**/*.{ts,tsx}\"", // Verifica arquivos .ts e .tsx na pasta src
      "lint:fix": "eslint \"src/**/*.{ts,tsx}\" --fix" // Tenta corrigir problemas automaticamente
    }
    ```

4.  **Executar:**
    *   `npm run lint` ou `yarn lint` para verificar.
    *   `npm run lint:fix` ou `yarn lint:fix` para tentar corrigir.

5.  **Integração com Editor:** Configure seu editor (VS Code, WebStorm, etc.) para usar o ESLint e mostrar os erros/avisos diretamente enquanto você digita.

Usar ESLint com TypeScript ajuda a manter um padrão de código consistente e a evitar muitos erros comuns que vão além da verificação de tipos.

## Integração com Prettier (Formatação)

**Formatting** cuida da aparência do código (espaçamento, quebras de linha, ponto e vírgula, etc.), garantindo um estilo visual uniforme em todo o projeto, independentemente de quem o escreveu.

**Prettier** é o formatador de código mais popular. Ele analisa seu código e o reescreve seguindo um conjunto de regras de estilo, garantindo consistência.

**Configuração:**

1.  **Instalar Dependências:**
    ```bash
    npm install prettier eslint-config-prettier eslint-plugin-prettier --save-dev
    # ou
    # yarn add prettier eslint-config-prettier eslint-plugin-prettier --dev
    ```
    *   `prettier`: O formatador Prettier.
    *   `eslint-config-prettier`: Desativa regras do ESLint que podem conflitar com o Prettier (já que o Prettier cuidará da formatação).
    *   `eslint-plugin-prettier`: Integra o Prettier como uma regra do ESLint, reportando diferenças de formatação como erros do ESLint e permitindo usar `eslint --fix` para formatar.

2.  **Atualizar Configuração do ESLint (`.eslintrc.js`):**
    Adicione `plugin:prettier/recommended` ao final da lista `extends`. Isso aplica a configuração `eslint-config-prettier` e ativa a regra `eslint-plugin-prettier`.
    ```javascript
    // .eslintrc.js
    module.exports = {
      // ... parser, parserOptions, settings, env ...
      extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        // "plugin:react/recommended", // Se usar React
        // "plugin:react-hooks/recommended", // Se usar React Hooks
        "plugin:prettier/recommended", // <<< ADICIONAR ESTA LINHA (deve ser a última)
      ],
      rules: {
        // ... suas regras ESLint (não relacionadas à formatação) ...
        "prettier/prettier": "warn", // Mostra erros do prettier como avisos (ou "error")
      },
      // ... ignorePatterns ...
    };
    ```

3.  **Criar Arquivo de Configuração do Prettier (`.prettierrc.js` ou `.prettierrc.json` - Opcional):**
    Prettier funciona bem sem configuração, mas você pode customizar algumas regras.
    ```javascript
    // .prettierrc.js
    module.exports = {
      semi: true, // Adicionar ponto e vírgula no final
      trailingComma: "es5", // Vírgula no final de objetos/arrays multi-linha (compatível com ES5)
      singleQuote: false, // Usar aspas duplas
      printWidth: 100, // Largura máxima da linha antes de quebrar
      tabWidth: 2, // Tamanho da tabulação
      endOfLine: "lf", // Estilo de final de linha (lf, crlf, cr, auto)
    };
    ```
    Crie também um arquivo `.prettierignore` (similar ao `.gitignore`) para listar arquivos/pastas que o Prettier não deve formatar (ex: `node_modules/`, `dist/`).

4.  **Adicionar Scripts ao `package.json`:**
    ```json
    "scripts": {
      "lint": "eslint \"src/**/*.{ts,tsx}\"",
      "lint:fix": "eslint \"src/**/*.{ts,tsx}\" --fix",
      "format:check": "prettier --check \"src/**/*.{ts,tsx,css,md,json}\"", // Verifica formatação
      "format:write": "prettier --write \"src/**/*.{ts,tsx,css,md,json}\"" // Formata os arquivos
    }
    ```
    Note que `lint:fix` agora também aplicará a formatação do Prettier devido à integração.

5.  **Integração com Editor:** Configure seu editor para formatar automaticamente ao salvar usando o Prettier. Isso garante que o código esteja sempre formatado corretamente.

Usar Prettier junto com ESLint e TypeScript cria um ambiente de desenvolvimento robusto, onde tipos são verificados, regras de código são aplicadas e a formatação é consistente automaticamente.

## Exercício: Configurar ESLint e Prettier

1.  Pegue um dos projetos anteriores que você criou (ex: a API de Blog Simples ou o Formulário de Contato React).
2.  Siga os passos descritos acima para instalar e configurar o ESLint com os plugins para TypeScript.
3.  Adicione algumas regras customizadas ao seu `.eslintrc.js` (ex: proibir `console.log`, exigir tipos de retorno explícitos em funções `@typescript-eslint/explicit-function-return-type`).
4.  Execute `npm run lint` (ou `yarn lint`) e veja se algum problema é reportado. Tente corrigir manualmente ou usando `lint:fix`.
5.  Instale e configure o Prettier, integrando-o com o ESLint.
6.  Crie um arquivo `.prettierrc.js` com algumas configurações diferentes do padrão (ex: `singleQuote: true`, `printWidth: 80`).
7.  Execute `npm run format:write` (ou `yarn format:write`) para formatar todo o código do projeto.
8.  Verifique se o `lint:fix` agora também aplica a formatação do Prettier.
9.  (Opcional) Configure seu editor para usar ESLint e Prettier automaticamente.

Este exercício prático ajuda a consolidar a configuração dessas ferramentas essenciais no fluxo de trabalho TypeScript.

Na próxima seção, discutiremos algumas melhores práticas gerais e armadilhas comuns ao trabalhar com TypeScript.
# Seção 16: Melhores Práticas e Armadilhas Comuns

Ao longo deste guia, exploramos os recursos fundamentais e avançados do TypeScript. Para aproveitar ao máximo a linguagem e evitar problemas comuns, é útil seguir algumas melhores práticas e estar ciente de certas armadilhas.

## Melhores Práticas

1.  **Habilite `strict` no `tsconfig.json`:** Esta é talvez a recomendação mais importante. Ativar o modo `strict` (ou suas flags individuais como `strictNullChecks`, `noImplicitAny`) força verificações mais rigorosas, pegando muitos erros potenciais em tempo de compilação e maximizando os benefícios da tipagem estática. Comece novos projetos com `strict: true` e tente habilitá-lo gradualmente em projetos existentes.

2.  **Evite `any` Sempre que Possível:** O tipo `any` desliga efetivamente a verificação de tipos para aquela variável ou expressão, anulando muitos dos benefícios do TypeScript. Use `any` apenas como último recurso ou durante migrações graduais de JavaScript. Prefira tipos mais específicos, `unknown` (que força verificações antes do uso), ou generics.

3.  **Use Tipos Específicos em Vez de Primitivos Genéricos:** Em vez de usar `string` para tudo que é texto, considere tipos literais (`type Status = "pendente" | "processando" | "concluido";`) ou `enum`s para representar conjuntos específicos de valores. Isso torna o código mais auto-documentado e previne erros de digitação ou valores inválidos.

4.  **Prefira `interface` para Definir Formas de Objetos Públicos, `type` para Outros Casos:** Embora `interface` e `type` possam ser usados de forma intercambiável em muitos casos, a convenção comum é:
    *   Usar `interface` para definir a forma de objetos ou classes que fazem parte da API pública de um módulo ou biblioteca (interfaces podem ser estendidas e implementadas).
    *   Usar `type` para definir tipos de união, tuplas, tipos mapeados, tipos condicionais, ou aliases para tipos primitivos ou funções.
    A consistência dentro do projeto é mais importante que a regra em si.

5.  **Use Tipos Utilitários (Utility Types):** TypeScript fornece tipos utilitários integrados como `Partial<T>`, `Required<T>`, `Readonly<T>`, `Pick<T, K>`, `Omit<T, K>`, `Record<K, T>`, etc. Eles são extremamente úteis para transformar ou criar novos tipos a partir de tipos existentes sem repetição. Aprenda a usá-los para manter seu código de tipos conciso.
    ```typescript
    interface Usuario {
        id: number;
        nome: string;
        email: string;
        ativo: boolean;
    }
    
    // Permite atualizar apenas algumas propriedades
    function atualizarUsuario(id: number, dados: Partial<Omit<Usuario, 'id'>>) {
        // Omit remove 'id', Partial torna nome, email, ativo opcionais
        console.log(`Atualizando usuário ${id} com:`, dados);
        // ... lógica de atualização
    }
    
    atualizarUsuario(1, { nome: "Novo Nome", ativo: false });
    // atualizarUsuario(1, { id: 2 }); // Erro: 'id' foi omitido
    ```

6.  **Tipos de União Discriminada (Discriminated Unions):** Para modelar estados ou objetos que podem ter diferentes formas baseadas em uma propriedade comum (o discriminante, geralmente uma string literal), use uniões discriminadas. Isso permite que o TypeScript restrinja o tipo corretamente dentro de blocos `if` ou `switch`.
    ```typescript
    type ResultadoOperacao =
      | { status: "sucesso"; dados: { id: string; valor: number } }
      | { status: "erro"; codigoErro: number; mensagem: string };
      
    function processarResultado(res: ResultadoOperacao) {
        if (res.status === "sucesso") {
            // TypeScript sabe que res.dados existe aqui
            console.log(`Sucesso! ID: ${res.dados.id}, Valor: ${res.dados.valor}`);
        } else {
            // TypeScript sabe que res.codigoErro e res.mensagem existem aqui
            console.error(`Erro ${res.codigoErro}: ${res.mensagem}`);
        }
    }
    ```

7.  **Mantenha Tipos Próximos ao Uso:** Defina interfaces e tipos o mais perto possível de onde eles são usados. Se um tipo é usado apenas dentro de um módulo, defina-o lá em vez de em um arquivo global de tipos (a menos que seja realmente compartilhado).

8.  **Use `readonly` para Imutabilidade:** Marque propriedades de interfaces/classes ou elementos de arrays/tuplas como `readonly` quando eles não devem ser modificados após a criação. Isso ajuda a prevenir mutações acidentais e a raciocinar sobre o fluxo de dados.
    ```typescript
    interface Config {
        readonly apiKey: string;
        readonly timeoutMs: number;
    }
    
    const config: Config = { apiKey: "abc", timeoutMs: 5000 };
    // config.apiKey = "xyz"; // Erro: Cannot assign to 'apiKey' because it is a read-only property.
    
    const numeros: ReadonlyArray<number> = [1, 2, 3];
    // numeros.push(4); // Erro: Property 'push' does not exist on type 'readonly number[]'.
    ```

9.  **Documente Tipos Complexos com JSDoc/TSDoc:** Para tipos, interfaces ou funções complexas, adicione comentários usando a sintaxe JSDoc/TSDoc (`/** ... */`). Esses comentários aparecem em dicas de ferramentas no editor e podem ser usados para gerar documentação.

10. **Configure ESLint e Prettier:** Como vimos na seção anterior, usar um linter (ESLint) e um formatador (Prettier) configurados para TypeScript garante consistência, pega erros adicionais e melhora a legibilidade do código.

## Armadilhas Comuns

1.  **Confiar Demais em Type Assertions (`as`):** Type assertions (`valor as Tipo`) dizem ao compilador: "Confie em mim, eu sei que este valor é deste tipo". Isso desliga a verificação de tipos para aquela expressão e pode levar a erros em tempo de execução se sua suposição estiver errada. Use type assertions com moderação e apenas quando tiver certeza absoluta do tipo (ex: após uma verificação manual ou ao lidar com APIs externas não tipadas). Prefira type guards (`typeof`, `instanceof`, `in`, funções de predicado de tipo) sempre que possível.
    ```typescript
    function processarEntrada(entrada: unknown) {
        // Ruim: pode causar erro se entrada não for string
        // const tamanho = (entrada as string).length; 
        
        // Bom: usa type guard
        if (typeof entrada === 'string') {
            const tamanho = entrada.length;
            console.log(`Tamanho da string: ${tamanho}`);
        } else {
            console.log("Entrada não é uma string.");
        }
    }
    ```

2.  **Abuso de Tipos Não Específicos (`object`, `{}`):** Evite usar tipos muito genéricos como `object` ou `{}` (que significa qualquer valor não `null`/`undefined`). Eles oferecem pouca segurança de tipo. Prefira interfaces, `Record<string, unknown>`, ou tipos mais específicos.

3.  **Modificar Tipos de Bibliotecas Globais Incorretamente:** Ao tentar adicionar ou modificar tipos para bibliotecas que afetam o escopo global (como `window` no navegador ou tipos nativos), use **augmentation de módulo** ou **declaração de namespace global** em um arquivo `.d.ts`, em vez de tentar redefinir o tipo diretamente.
    ```typescript
    // global.d.ts (Exemplo de augmentation)
    declare global {
        interface Window {
            minhaPropriedadeGlobal?: string;
        }
    }
    // Necessário export {} vazio para tornar este um módulo
    export {}; 
    
    // Agora você pode acessar window.minhaPropriedadeGlobal com segurança
    ```

4.  **Esquecer `await` em Funções `async`:** TypeScript não pode impedir que você esqueça de usar `await` ao chamar uma função que retorna uma `Promise`. Se você esquecer, a linha seguinte pode executar antes da Promise resolver, levando a comportamento inesperado. Regras de ESLint (`@typescript-eslint/no-floating-promises`) podem ajudar a detectar isso.

5.  **Problemas com `this` em Callbacks/Event Handlers:** Assim como em JavaScript, o valor de `this` pode ser complicado. Em classes, use arrow functions para métodos que serão usados como callbacks para garantir que `this` se refira à instância da classe. Em funções normais, esteja ciente do contexto de `this` ou use `bind`, `call`, `apply` explicitamente (com `strict: true` ajudando na tipagem).

6.  **Tipagem Excessivamente Complexa:** Embora os tipos avançados (condicionais, mapeados, inferência) sejam poderosos, usá-los em excesso pode tornar o código de tipos difícil de ler e entender. Busque um equilíbrio entre precisão de tipo e simplicidade. Às vezes, um tipo ligeiramente menos preciso, mas muito mais simples, é preferível.

7.  **Ignorar Erros de Tipo com `@ts-ignore` ou `@ts-expect-error`:** Essas diretivas instruem o compilador a ignorar o erro na linha seguinte. Use-as *muito* raramente e apenas como uma solução temporária ou se você tiver 100% de certeza de que o erro do compilador é um falso positivo (o que é raro). Sempre adicione um comentário explicando por que a diretiva foi usada. `@ts-expect-error` é ligeiramente melhor, pois o TypeScript reclamará se o erro que você esperava ignorar não ocorrer mais.

8.  **Não Configurar `paths` Corretamente para Runtime:** Se você usar aliases de caminho (`paths` no `tsconfig.json`), lembre-se que o Node.js ou o navegador não os entenderão por padrão. Você precisa configurar seu bundler (Webpack `resolve.alias`, Vite `resolve.alias`) ou usar uma ferramenta pós-compilação como `tsc-alias` para que as importações funcionem em tempo de execução.

9.  **Confundir Tipos e Valores:** Lembre-se que tipos (interfaces, type aliases, etc.) existem apenas em tempo de compilação e são apagados no JavaScript final. Você não pode usar `instanceof` com interfaces ou fazer `console.log(MinhaInterface)`. Use classes para coisas que precisam existir em tempo de execução e interfaces/tipos para descrever formas.

Estar ciente dessas práticas e armadilhas ajudará você a escrever código TypeScript mais robusto, legível e fácil de manter.

## Exercício: Refatoração com Melhores Práticas

1.  Pegue um dos exemplos anteriores (ou um trecho de código TypeScript seu) que use `any` ou tipos muito genéricos.
2.  Refatore o código para usar tipos mais específicos. Se necessário, use `unknown` e adicione type guards apropriados.
3.  Identifique locais onde tipos literais ou enums poderiam ser usados em vez de `string` ou `number` genéricos e faça a substituição.
4.  Verifique se há type assertions (`as`). Se houver, tente substituí-las por type guards ou refatorar para evitá-las.
5.  Adicione `readonly` a propriedades ou arrays que não devem ser modificados.
6.  Execute `tsc` com a flag `strict` habilitada (se ainda não estiver) e corrija quaisquer novos erros que aparecerem.
7.  Execute o linter (ESLint) e corrija os avisos/erros reportados.

Este exercício foca na aplicação das melhores práticas para melhorar a qualidade e a segurança de um código TypeScript existente.

Na seção final, faremos uma breve recapitulação e ofereceremos alguns próximos passos para continuar seu aprendizado em TypeScript.
# Seção 17: Recapitulação e Próximos Passos

Chegamos ao final deste guia detalhado sobre TypeScript! Percorremos um longo caminho, desde os conceitos mais básicos até aplicações avançadas e integração com ferramentas e frameworks populares.

## Recapitulação do Aprendizado

Ao longo das seções anteriores, você aprendeu sobre:

*   **O que é TypeScript:** Um superset do JavaScript que adiciona tipagem estática opcional.
*   **Benefícios:** Maior segurança, melhor manutenibilidade, refatoração mais fácil, autocompletar aprimorado e detecção precoce de erros.
*   **Configuração:** Como instalar o TypeScript, configurar o `tsconfig.json` e compilar código `.ts` para `.js`.
*   **Tipos Básicos:** `number`, `string`, `boolean`, `null`, `undefined`, `symbol`, `bigint`, `any`, `unknown`, `never`, `void`.
*   **Estruturas de Dados:** Tipagem de `Arrays`, `Tuples` e `Enums`.
*   **Interfaces e Type Aliases:** Como definir formas de objetos, contratos e tipos customizados.
*   **Funções:** Tipagem de parâmetros, tipos de retorno, funções opcionais/padrão, sobrecargas e `this`.
*   **Classes:** Conceitos de OOP com tipos, incluindo herança, modificadores de acesso (`public`, `private`, `protected`), propriedades `readonly`, membros `static`, classes abstratas e getters/setters.
*   **Tipos Avançados:** Tipos de União, Interseção, Literais, Mapeados, Condicionais e o poderoso sistema de `Generics` para criar componentes reutilizáveis e seguros.
*   **Módulos e Namespaces:** Organização de código usando `import`/`export` (ES6 Modules - preferencial) e `namespace` (legado/casos específicos).
*   **Decorators:** Metaprogramação experimental para anotar e modificar classes e seus membros.
*   **Integração com JavaScript:** Uso de bibliotecas JS existentes através de arquivos de declaração (`.d.ts`, `@types`) e estratégias para migração gradual.
*   **Desenvolvimento Frontend:** Manipulação segura do DOM, tipagem de eventos e configuração de bundlers (Webpack/Vite).
*   **Desenvolvimento Backend (Node.js):** Configuração de projetos Node.js com TS, tipagem de APIs (ex: Express.js) e interação com bancos de dados (conceitos com ORMs).
*   **React e React Native:** Tipagem de componentes (props, state), hooks (`useState`, `useEffect`, `useContext`, `useReducer`, `useRef`), eventos e navegação (React Navigation).
*   **Automação:** Criação de scripts robustos para manipulação de arquivos, interação com APIs e tarefas de build/deploy usando `ts-node`.
*   **Configurações Avançadas e Ferramentas:** Opções importantes do `tsconfig.json`, integração com linters (ESLint) e formatters (Prettier).
*   **Melhores Práticas e Armadilhas:** Dicas para escrever código TypeScript eficaz e evitar erros comuns (evitar `any`, usar `strict`, preferir type guards a assertions, etc.).

Você construiu uma base sólida para entender e aplicar TypeScript em diversos cenários de desenvolvimento.

## Próximos Passos e Aprofundamento

O aprendizado de qualquer tecnologia é um processo contínuo. Aqui estão algumas sugestões para continuar sua jornada com TypeScript:

1.  **Pratique, Pratique, Pratique:** A melhor maneira de solidificar seu conhecimento é aplicando-o. Comece pequenos projetos pessoais, contribua para projetos open-source que usam TypeScript, ou introduza TypeScript gradualmente em seus projetos JavaScript existentes.
2.  **Explore a Documentação Oficial:** O [site oficial do TypeScript](https://www.typescriptlang.org/docs/) é uma fonte rica e atualizada de informações. Explore o Handbook, os exemplos e as notas de release de novas versões.
3.  **Aprofunde-se em Tipos Avançados:** Dedique tempo para entender melhor os tipos mapeados, condicionais, inferência (`infer`), tipos recursivos e outras funcionalidades avançadas. Eles podem ser complexos, mas desbloqueiam padrões de tipagem muito poderosos.
4.  **TypeScript com seu Framework Preferido:** Se você usa React, Angular, Vue, Svelte, Node.js/Express, NestJS, etc., explore mais a fundo a integração específica do TypeScript com esse ecossistema. Consulte a documentação do framework e exemplos da comunidade.
5.  **Design Patterns com TypeScript:** Aprenda como implementar padrões de projeto (Design Patterns) comuns aproveitando os recursos de tipagem do TypeScript para torná-los mais seguros e expressivos.
6.  **Contribua para DefinitelyTyped:** Se você usa uma biblioteca JavaScript que não tem tipos ou cujos tipos estão desatualizados, considere contribuir para o repositório [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped). É uma ótima maneira de aprender e ajudar a comunidade.
7.  **Teste Unitário e de Integração:** Aprenda a escrever testes para seu código TypeScript usando frameworks como Jest, Vitest, Mocha, etc. Ferramentas como `ts-jest` ou a configuração nativa do Vitest facilitam a integração.
8.  **Explore Ferramentas de Build e Compiladores Alternativos:** Além do `tsc`, explore como ferramentas como esbuild, SWC e Babel podem ser usadas para transpilar TypeScript, muitas vezes com melhor performance para cenários específicos (especialmente em conjunto com bundlers).
9.  **Mantenha-se Atualizado:** TypeScript evolui rapidamente. Acompanhe o blog oficial, as notas de release e a comunidade (Twitter, Reddit, etc.) para ficar por dentro das novas funcionalidades e melhores práticas.

## Conclusão

TypeScript oferece uma camada valiosa sobre o JavaScript, trazendo ordem, segurança e escalabilidade ao desenvolvimento de aplicações modernas. Ao adicionar tipos estáticos, ele permite que você e sua equipe construam software mais robusto, detectem erros mais cedo no ciclo de desenvolvimento e colaborem de forma mais eficaz.

Embora a curva de aprendizado inicial possa parecer desafiadora, os benefícios a longo prazo em termos de qualidade de código, produtividade e manutenibilidade geralmente compensam o investimento.

Esperamos que este guia tenha fornecido o conhecimento e a confiança necessários para você começar a usar TypeScript em seus projetos. Continue explorando, experimentando e construindo!

**Boa codificação!**

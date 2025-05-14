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
      ativo: PropTypes.bool
    };

    CartaoDePerfil.defaultProps = {
      profissao: 'Não informado',
      ativo: false
    };
    ```
    Com TypeScript, a tipagem é feita diretamente na definição das props:
    ```typescript
    interface CartaoDePerfilProps {
      nome: string;
      idade: number;
      profissao?: string; // Opcional
      imagemUri: string;
      ativo?: boolean;
    }

    const CartaoDePerfil: React.FC<CartaoDePerfilProps> = ({ 
      nome, 
      idade, 
      profissao = 'Não informado', 
      imagemUri, 
      ativo = false 
    }) => {
      // ...
      return (/* ... */);
    };
    ```

As `props` são fundamentais para criar componentes reutilizáveis e para o fluxo de dados em aplicações React Native.

### State (Estado)

Enquanto `props` são usadas para passar dados de um componente pai para um filho, `state` (estado) é usado para gerenciar dados que são internos a um componente e que podem mudar ao longo do tempo, geralmente em resposta a interações do usuário, respostas de rede, ou outras lógicas internas. Quando o `state` de um componente muda, o React Native automaticamente re-renderiza o componente (e seus filhos, se necessário) para refletir essas mudanças na UI.

**Usando State com o Hook `useState`:**

Em componentes funcionais, o Hook `useState` é a maneira de adicionar estado.

1.  **Importar `useState`:** Primeiro, importe `useState` de `'react'`. 
    `import React, { useState } from 'react';`

2.  **Declarar uma Variável de Estado:** Chame `useState` dentro do seu componente funcional para declarar uma variável de estado. `useState` retorna um array com dois elementos:
    *   O valor atual do estado.
    *   Uma função para atualizar esse valor de estado.

    Você geralmente usa a desestruturação de array para obter esses dois valores:
    `const [nomeDoEstado, setNomeDoEstado] = useState(valorInicial);`

**Exemplo Prático:**

Vamos criar um componente simples que permite ao usuário alternar a visibilidade de um texto.

```javascript
// VisibilidadeControlada.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const VisibilidadeControlada = () => {
  // Declara uma nova variável de estado chamada 'visivel', inicializada como true
  const [visivel, setVisivel] = useState(true);

  const alternarVisibilidade = () => {
    setVisivel(!visivel); // Atualiza o estado 'visivel' para o seu oposto
  };

  return (
    <View style={styles.container}>
      <Button 
        title={visivel ? "Esconder Texto" : "Mostrar Texto"} 
        onPress={alternarVisibilidade} 
      />
      {visivel && (
        <Text style={styles.texto}>Este texto pode ser escondido ou mostrado!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginVertical: 20 },
  texto: { marginTop: 10, fontSize: 16, color: 'purple' },
});

export default VisibilidadeControlada;
```

Neste exemplo:
*   `useState(true)` inicializa a variável de estado `visivel` com o valor `true`.
*   `visivel` contém o valor atual do estado (se o texto está visível ou não).
*   `setVisivel` é a função que usamos para atualizar o estado `visivel`.
*   Quando o botão é pressionado, `alternarVisibilidade` é chamada, que por sua vez chama `setVisivel(!visivel)`. Isso inverte o valor booleano de `visivel`.
*   Quando `setVisivel` é chamada, o React Native agenda uma re-renderização do componente `VisibilidadeControlada`. Durante a re-renderização, o valor de `visivel` será o novo valor, e a UI será atualizada condicionalmente: o texto do botão muda, e o componente `<Text>` é renderizado ou não com base no novo valor de `visivel`.

**Regras do State:**

*   **Não Modifique o State Diretamente:** Assim como `props`, você nunca deve modificar o `state` diretamente (ex: `meuEstado.propriedade = novoValor` ou `visivel = false`). Sempre use a função de atualização fornecida pelo `useState` (ex: `setVisivel(novoValor)`). Modificar o `state` diretamente não acionará uma re-renderização e pode levar a comportamentos inconsistentes.
*   **Atualizações de State Podem Ser Assíncronas:** O React pode agrupar múltiplas chamadas a `setState` (ou a função de atualização do `useState`) em uma única atualização por questões de performance. Isso significa que você não deve confiar no valor do `state` imediatamente após chamar a função de atualização se precisar do novo valor para outra operação síncrona. Se você precisa atualizar o estado com base no estado anterior, use a forma funcional da função de atualização:
    ```javascript
    // Exemplo: incrementando um contador
    const [contador, setContador] = useState(0);

    const incrementar = () => {
      // Forma segura de atualizar o estado baseado no estado anterior
      setContador(prevContador => prevContador + 1);
    };
    ```
*   **O State é Local e Encapsulado:** O `state` de um componente é privado a esse componente. Outros componentes (exceto seus filhos, se o `state` for passado como `prop`) não podem acessá-lo ou modificá-lo diretamente. Se múltiplos componentes precisam compartilhar o mesmo estado, você geralmente "eleva o estado" (lifting state up) para o ancestral comum mais próximo e passa o estado e as funções de atualização para baixo via `props`.

O `state` é o que torna seus componentes dinâmicos e interativos. Compreender como gerenciá-lo efetivamente com `useState` é uma habilidade fundamental no desenvolvimento com React Native.

### Principais Componentes Básicos e Exemplos

React Native vem com um conjunto de componentes "Core" (núcleo) que são os blocos de construção para a maioria das UIs. Vamos explorar alguns dos mais importantes e ver exemplos práticos de como usá-los.

**1. `View`**

A `View` é o componente mais fundamental para construir UIs. É um container que suporta layout com Flexbox, estilos, alguns manipuladores de toque e acessibilidade. Pense nela como a `<div>` do React Native. Quase tudo que você renderiza estará dentro de uma `View` ou de um componente que, por sua vez, usa uma `View`.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploView = () => {
  return (
    // View principal como container
    <View style={styles.containerPrincipal}>
      <Text style={styles.titulo}>Exemplo de View</Text>
      
      {/* View aninhada para agrupar elementos */}
      <View style={styles.containerSecundario}>
        <Text style={styles.textoItem}>Item 1</Text>
        <Text style={styles.textoItem}>Item 2</Text>
      </View>

      {/* Outra View para layout */}
      <View style={styles.containerHorizontal}>
        <View style={[styles.box, { backgroundColor: 'skyblue' }]} />
        <View style={[styles.box, { backgroundColor: 'steelblue' }]} />
        <View style={[styles.box, { backgroundColor: 'powderblue' }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    flex: 1, // Ocupa todo o espaço disponível se for a View raiz
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  containerSecundario: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  textoItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  containerHorizontal: {
    flexDirection: 'row', // Organiza os filhos horizontalmente
    justifyContent: 'space-around', // Distribui espaço entre os filhos
    alignItems: 'center', // Alinha os filhos verticalmente ao centro
    height: 100,
    backgroundColor: 'lightgrey',
    padding: 10,
  },
  box: {
    width: 50,
    height: 50,
  },
});

export default ExemploView;
```
Neste exemplo, `View` é usada para:
*   Criar o container principal da tela.
*   Agrupar logicamente os componentes `Text`.
*   Aplicar estilos de layout (Flexbox) para organizar elementos horizontalmente.

**2. `Text`**

O componente `Text` é usado para exibir strings de texto. Todo texto em um aplicativo React Native deve estar dentro de um componente `Text` (ou um componente que o utilize internamente). Ele suporta aninhamento, estilização e manipuladores de toque.

```javascript
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ExemploText = () => {
  const nomeUsuario = "Alice";

  return (
    <View style={styles.container}>
      <Text style={styles.normal}>Este é um texto normal.</Text>
      <Text style={styles.titulo}>Bem-vinda, {nomeUsuario}!</Text>
      <Text style={styles.paragrafo}>
        Você pode aninhar componentes <Text style={styles.negrito}>Text</Text> para aplicar estilos diferentes a partes específicas do texto. 
        <Text style={styles.italico}>Isso é muito útil!</Text>
      </Text>
      <Text onPress={() => alert('Texto clicado!')} style={styles.link}>
        Este texto é clicável.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  normal: { fontSize: 16, marginBottom: 10 },
  titulo: { fontSize: 22, fontWeight: 'bold', color: 'purple', marginBottom: 10 },
  paragrafo: { fontSize: 16, lineHeight: 24, marginBottom: 10 },
  negrito: { fontWeight: 'bold' },
  italico: { fontStyle: 'italic', color: 'green' },
  link: { color: 'blue', textDecorationLine: 'underline', marginTop: 10 },
});

export default ExemploText;
```
Principais características do `Text`:
*   **Estilização:** Suporta propriedades como `fontSize`, `fontWeight`, `color`, `fontStyle`, `textAlign`, `lineHeight`, etc.
*   **Aninhamento:** Estilos de um `Text` pai são herdados por `Text` filhos, a menos que sobrescritos.
*   **Eventos:** Pode responder a eventos de toque como `onPress`.

**3. `Image`**

O componente `Image` é usado para exibir diferentes tipos de imagens, incluindo imagens de rede, imagens estáticas do projeto (locais) e imagens temporárias do disco local.

```javascript
import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';

// Para imagens locais, você precisa importá-las primeiro
// Suponha que você tenha uma imagem 'logo.png' na pasta './assets'
// const logoLocal = require('./assets/logo.png');

const ExemploImage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Imagem da Rede:</Text>
      <Image 
        style={styles.imagemPequena}
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />

      <Text style={styles.label}>Imagem da Rede com Placeholder (simulado):</Text>
      <Image 
        style={styles.imagemMedia}
        source={{ uri: 'https://reactnative.dev/img/header_logo.png' }}
        defaultSource={{ uri: 'https://via.placeholder.com/150/CCCCCC/FFFFFF?Text=Loading...' }} // Exemplo de placeholder
        resizeMode="contain" // 'cover', 'contain', 'stretch', 'repeat', 'center'
      />

      {/* <Text style={styles.label}>Imagem Local:</Text>
      <Image 
        style={styles.imagemGrande}
        source={logoLocal} 
        resizeMode="center"
      /> */}
      
      <Text style={styles.info}>Nota: Para imagens locais, descomente o import e o trecho acima, e certifique-se de ter a imagem no caminho correto.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginTop: 15, marginBottom: 5 },
  imagemPequena: { width: 50, height: 50, marginBottom: 10 },
  imagemMedia: { width: 150, height: 150, marginBottom: 10, borderWidth: 1, borderColor: 'grey' },
  imagemGrande: { width: 200, height: 100, marginBottom: 10, backgroundColor: '#eee' },
  info: { fontSize: 12, color: 'grey', marginTop: 20, textAlign: 'center' },
});

export default ExemploImage;
```
Principais `props` do `Image`:
*   **`source`:** A fonte da imagem. Pode ser um objeto `{ uri: 'url_da_imagem_remota' }` para imagens da rede, ou o resultado de uma chamada `require('./caminho/para/imagem.png')` para imagens locais.
*   **`style`:** Para definir dimensões (`width`, `height`) e outros estilos. É importante notar que para imagens de rede, você **deve** especificar as dimensões, caso contrário, a imagem pode não aparecer.
*   **`resizeMode`:** Controla como a imagem deve ser redimensionada para caber nas dimensões especificadas. Valores comuns: `cover` (preenche as dimensões, cortando se necessário), `contain` (mostra a imagem inteira, podendo deixar espaços vazios), `stretch` (estica a imagem para preencher as dimensões).
*   **`defaultSource` (Android):** Uma imagem a ser exibida enquanto a imagem principal está carregando.
*   **`loadingIndicatorSource` (iOS):** Similar ao `defaultSource`, mas para iOS.

**4. `TextInput`**

O componente `TextInput` permite que o usuário insira texto. É o equivalente ao `<input type="text">` ou `<textarea>` do HTML.

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const ExemploTextInput = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = () => {
    Alert.alert('Dados Enviados', `Nome: ${nome}\nEmail: ${email}`);
    // Aqui você normalmente enviaria os dados para um servidor ou os processaria
    setNome('');
    setEmail('');
    setSenha('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput 
        style={styles.input}
        placeholder="Digite seu nome completo"
        value={nome} // Controlado pelo estado
        onChangeText={texto => setNome(texto)} // Atualiza o estado a cada mudança
        // onChangeText={setNome} // Forma abreviada
        autoCapitalize="words"
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput 
        style={styles.input}
        placeholder="seuemail@exemplo.com"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address" // Define o tipo de teclado
        autoCapitalize="none"
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput 
        style={styles.input}
        placeholder="Digite sua senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true} // Esconde o texto digitado (para senhas)
        maxLength={20}
      />
      
      <Button title="Enviar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 5, marginTop: 10 },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default ExemploTextInput;
```
Principais `props` do `TextInput`:
*   **`value`:** O valor atual do campo de texto. Para criar um componente controlado, você o vincula a uma variável de estado.
*   **`onChangeText`:** Uma função callback que é chamada sempre que o texto no campo muda. Ela recebe o novo texto como argumento.
*   **`placeholder`:** Texto de exemplo exibido quando o campo está vazio.
*   **`keyboardType`:** Define o tipo de teclado a ser exibido (ex: `default`, `numeric`, `email-address`, `phone-pad`).
*   **`secureTextEntry`:** Se `true`, esconde o texto digitado (útil para senhas).
*   **`multiline`:** Se `true`, permite múltiplas linhas de texto (como um `<textarea>`).
*   **`maxLength`:** Número máximo de caracteres permitidos.
*   **`autoCapitalize`:** Controla a capitalização automática (ex: `none`, `sentences`, `words`, `characters`).
*   **`onSubmitEditing`:** Chamado quando o botão "enviar" do teclado é pressionado.

**5. `Button`**

Um componente de botão básico que renderiza de forma nativa em cada plataforma. É simples de usar para ações diretas.

```javascript
import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';

const ExemploButton = () => {
  const handlePressSimples = () => {
    Alert.alert('Botão Simples', 'Você pressionou o botão simples!');
  };

  return (
    <View style={styles.container}>
      <Button 
        title="Pressione-me! (Simples)"
        onPress={handlePressSimples}
        color="#841584" // Cor do texto no iOS, cor de fundo no Android
      />

      <View style={styles.espacador} />

      <Button 
        title="Botão Desabilitado"
        onPress={() => Alert.alert('Este não deveria ser clicável')}
        disabled={true}
      />

      <View style={styles.espacador} />
      
      {/* Para customização mais avançada, use TouchableOpacity ou Pressable */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  espacador: { marginVertical: 10 },
});

export default ExemploButton;
```
Principais `props` do `Button`:
*   **`title`:** O texto a ser exibido no botão.
*   **`onPress`:** Função callback chamada quando o botão é pressionado.
*   **`color`:** Define a cor do botão. O comportamento exato pode variar entre iOS e Android.
*   **`disabled`:** Se `true`, o botão fica desabilitado e não responde a toques.

O componente `Button` é limitado em termos de estilização. Para botões mais customizados, você geralmente usará componentes como `TouchableOpacity`, `TouchableHighlight`, `TouchableWithoutFeedback` ou o mais moderno `Pressable`, envolvendo outros componentes (como `View` e `Text`) para criar a aparência desejada.

**6. `TouchableOpacity` (e outros Touchables/Pressable)**

`TouchableOpacity` é um wrapper que torna seus filhos respondentes a toques, diminuindo a opacidade do filho quando pressionado. É muito usado para criar botões customizados ou áreas clicáveis.

```javascript
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const ExemploTouchableOpacity = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.botaoCustomizado}
        onPress={() => Alert.alert('Botão Customizado', 'Você clicou no botão customizado!')}
        activeOpacity={0.7} // Opacidade quando pressionado (0 a 1)
      >
        <Text style={styles.textoBotao}>Clique Aqui (Customizado)</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={() => Alert.alert('Imagem Clicável', 'Você clicou na imagem!')}
        style={styles.containerImagem}
      >
        {/* Supondo que você tenha um componente Image aqui ou um ícone */}
        <View style={styles.imagemPlaceholder} >
            <Text style={{color: 'white'}}>IMG</Text>
        </View>
        <Text>Clique na "imagem"</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  botaoCustomizado: {
    backgroundColor: 'dodgerblue',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 20,
    elevation: 3, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  textoBotao: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  containerImagem: {
    alignItems: 'center',
  },
  imagemPlaceholder: {
    width: 80,
    height: 80,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default ExemploTouchableOpacity;
```
Outros componentes para feedback de toque incluem:
*   **`TouchableHighlight`:** Similar ao `TouchableOpacity`, mas escurece o fundo do filho quando pressionado (você define a cor do `underlayColor`).
*   **`TouchableWithoutFeedback`:** Torna os filhos respondentes a toques sem fornecer nenhum feedback visual. Útil para casos específicos.
*   **`Pressable` (Recomendado):** Introduzido mais recentemente, `Pressable` é um componente mais flexível e extensível para lidar com interações de toque. Ele oferece mais controle sobre os estados de interação (como `pressed`, `hovered`, `focused`) e é a maneira recomendada de lidar com a maioria dos cenários de toque atualmente, especialmente para interações mais complexas ou para suportar múltiplas plataformas (incluindo web).

**7. `ScrollView`**

Quando o conteúdo excede a altura da tela, você precisa de uma maneira de rolar para vê-lo. O `ScrollView` é um container genérico que permite rolar seus componentes filhos. Ele pode rolar verticalmente (padrão) ou horizontalmente.

```javascript
import React from 'react';
import { ScrollView, View, Text, StyleSheet, StatusBar } from 'react-native';

const ExemploScrollView = () => {
  const itens = Array.from({ length: 20 }, (_, i) => `Item número ${i + 1}`);

  return (
    <ScrollView 
      style={styles.scrollViewContainer}
      // contentContainerStyle={styles.contentContainer} // Estilos para o container interno do conteúdo
      // horizontal={true} // Para rolagem horizontal
      // showsVerticalScrollIndicator={false} // Esconde a barra de rolagem vertical
    >
      <Text style={styles.titulo}>Lista de Itens Rolável</Text>
      {itens.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemTexto}>{item}</Text>
        </View>
      ))}
      <Text style={styles.rodape}>Fim da lista.</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    // marginTop: StatusBar.currentHeight || 0, // Para evitar sobreposição com a barra de status no Android
  },
  // contentContainer: {
  //   paddingBottom: 20, // Espaço no final do conteúdo
  //   alignItems: 'center', // Se quiser centralizar o conteúdo (cuidado com a largura total)
  // },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 2,
  },
  itemTexto: {
    fontSize: 18,
    color: '#555',
  },
  rodape: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: 'grey',
  },
});

export default ExemploScrollView;
```
**Considerações sobre `ScrollView`:**
*   Renderiza todos os seus filhos de uma vez, mesmo aqueles que não estão visíveis na tela. Isso pode levar a problemas de performance se você tiver uma lista muito longa de itens.
*   Para listas longas ou infinitas, componentes como `FlatList` ou `SectionList` são mais performáticos, pois eles virtualizam a renderização (renderizam apenas os itens que estão visíveis ou prestes a se tornar visíveis).

**8. `FlatList` e `SectionList`**

Para exibir listas longas de dados de forma eficiente, o React Native fornece `FlatList` (para listas simples) e `SectionList` (para listas agrupadas em seções).

**`FlatList`:**

```javascript
import React from 'react';
import { FlatList, View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

const DADOS = [
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba', titulo: 'Primeiro Item' },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63', titulo: 'Segundo Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d72', titulo: 'Terceiro Item' },
  { id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28bb', titulo: 'Quarto Item' },
  { id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64', titulo: 'Quinto Item' },
  { id: '58694a0f-3da1-471f-bd96-145571e29d73', titulo: 'Sexto Item' },
];

// Componente para renderizar cada item da lista
const Item = ({ titulo }) => (
  <View style={styles.itemFlatList}>
    <Text style={styles.tituloFlatList}>{titulo}</Text>
  </View>
);

const ExemploFlatList = () => {
  const renderItem = ({ item }) => (
    <Item titulo={item.titulo} />
  );

  return (
    <SafeAreaView style={styles.safeAreaContainerFlatList}>
      <Text style={styles.headerFlatList}>Exemplo de FlatList</Text>
      <FlatList
        data={DADOS} // Array de dados
        renderItem={renderItem} // Função para renderizar cada item
        keyExtractor={item => item.id} // Função para extrair uma chave única para cada item
        // ListHeaderComponent={<Text style={styles.listHeader}>Cabeçalho da Lista</Text>}
        // ListFooterComponent={<Text style={styles.listFooter}>Rodapé da Lista</Text>}
        // ItemSeparatorComponent={() => <View style={styles.separator} />}
        // horizontal={true}
        // numColumns={2} // Para layout em grade
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // ... (estilos anteriores podem ser reutilizados ou adaptados)
  safeAreaContainerFlatList: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
    backgroundColor: '#f0f0f0',
  },
  headerFlatList: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  itemFlatList: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    elevation: 1,
  },
  tituloFlatList: {
    fontSize: 18,
    color: '#444',
  },
  // listHeader: { fontSize: 18, fontWeight: 'bold', padding: 10, backgroundColor: '#ddd', textAlign: 'center' },
  // listFooter: { fontSize: 14, padding: 10, backgroundColor: '#ddd', textAlign: 'center' },
  // separator: { height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: '14%' },
});

export default ExemploFlatList;
```
Principais `props` do `FlatList`:
*   **`data`:** Um array de dados para a lista.
*   **`renderItem`:** Uma função que recebe um objeto `{ item, index, separators }` e retorna o componente React a ser renderizado para esse item.
*   **`keyExtractor`:** Uma função que recebe um item e seu índice e retorna uma string única para ser usada como chave (`key`) para o item. Isso é importante para o React otimizar a renderização.

`SectionList` é similar, mas usada para dados agrupados em seções, exigindo uma prop `sections` e `renderSectionHeader`.

Estes são apenas alguns dos componentes básicos mais comuns. Existem outros, como `ActivityIndicator` (para mostrar um spinner de carregamento), `Modal` (para exibir conteúdo sobre uma view existente), `Switch` (para um controle booleano on/off), `StatusBar` (para controlar a barra de status do app), entre outros. A documentação oficial do React Native é o melhor lugar para explorar todos os componentes disponíveis e suas APIs em detalhes.

Dominar esses componentes, juntamente com `props`, `state` e JSX, fornecerá uma base sólida para construir interfaces de usuário ricas e interativas em seus aplicativos React Native. Na próxima seção, focaremos em como estilizar esses componentes e criar layouts complexos usando Flexbox.

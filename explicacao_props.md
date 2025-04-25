# Props no React

Props (abreviação de "properties" ou propriedades) são um dos conceitos mais fundamentais no React. Elas são o mecanismo principal para passar dados de um componente pai para um componente filho, permitindo a criação de componentes reutilizáveis e dinâmicos.

## O que são Props?

Props são argumentos passados para componentes React, semelhantes aos atributos HTML. Elas permitem que você passe valores de um componente para outro, criando componentes dinâmicos e reutilizáveis.

As props são:
- **Somente leitura**: Um componente nunca deve modificar suas próprias props
- **Passadas de cima para baixo**: Dados fluem de componentes pais para componentes filhos
- **Imutáveis**: Quando um componente recebe novas props, o React re-renderiza o componente

## Sintaxe Básica

### Passando Props

Props são passadas para componentes como atributos HTML:

```jsx
// Passando props para um componente
<Saudacao nome="Maria" idade={25} estaAtivo={true} />
```

Observe que:
- Strings podem ser passadas entre aspas: `nome="Maria"`
- Expressões JavaScript (incluindo números, booleanos, objetos, arrays e funções) devem ser passadas entre chaves: `idade={25}`, `estaAtivo={true}`

### Recebendo Props em Componentes Funcionais

Em componentes funcionais, props são recebidas como o primeiro parâmetro da função:

```jsx
function Saudacao(props) {
  return <h1>Olá, {props.nome}!</h1>;
}
```

Você também pode usar a desestruturação para acessar props específicas diretamente:

```jsx
function Saudacao({ nome, idade, estaAtivo }) {
  return (
    <div>
      <h1>Olá, {nome}!</h1>
      <p>Você tem {idade} anos.</p>
      <p>Status: {estaAtivo ? 'Ativo' : 'Inativo'}</p>
    </div>
  );
}
```

### Recebendo Props em Componentes de Classe

Em componentes de classe, props são acessadas através de `this.props`:

```jsx
class Saudacao extends React.Component {
  render() {
    return (
      <div>
        <h1>Olá, {this.props.nome}!</h1>
        <p>Você tem {this.props.idade} anos.</p>
        <p>Status: {this.props.estaAtivo ? 'Ativo' : 'Inativo'}</p>
      </div>
    );
  }
}
```

## Tipos de Props

Props podem ser de qualquer tipo de dados JavaScript:

### Strings

```jsx
<Componente texto="Olá, mundo!" />
```

### Números

```jsx
<Componente contador={42} />
```

### Booleanos

```jsx
<Componente estaVisivel={true} />
```

Para props booleanas que são `true`, você pode usar a forma abreviada:

```jsx
// Estas duas linhas são equivalentes
<Componente estaVisivel={true} />
<Componente estaVisivel />
```

### Arrays

```jsx
<Componente itens={['maçã', 'banana', 'laranja']} />
```

### Objetos

```jsx
<Componente usuario={{ nome: 'Maria', idade: 25 }} />
```

### Funções

```jsx
<Botao onClick={() => console.log('Botão clicado!')} />
```

## Props Especiais

### children

A prop especial `children` contém o conteúdo entre as tags de abertura e fechamento de um componente:

```jsx
function Painel({ children, titulo }) {
  return (
    <div className="painel">
      <h2>{titulo}</h2>
      <div className="painel-conteudo">
        {children}
      </div>
    </div>
  );
}

// Uso:
<Painel titulo="Informações do Usuário">
  <p>Nome: Maria Silva</p>
  <p>Email: maria@exemplo.com</p>
</Painel>
```

Neste exemplo, `<p>Nome: Maria Silva</p>` e `<p>Email: maria@exemplo.com</p>` são passados como `children` para o componente `Painel`.

### className

Como `class` é uma palavra reservada em JavaScript, o React usa `className` para definir classes CSS:

```jsx
<div className="container principal">Conteúdo</div>
```

### style

A prop `style` aceita um objeto JavaScript com propriedades CSS em camelCase:

```jsx
<div style={{ 
  backgroundColor: 'blue',
  color: 'white',
  fontSize: '16px',
  padding: '10px'
}}>
  Texto estilizado
</div>
```

### key

A prop `key` é especial e usada principalmente ao renderizar listas de elementos:

```jsx
const itens = ['maçã', 'banana', 'laranja'];

function ListaDeItens() {
  return (
    <ul>
      {itens.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
```

## Props Padrão (Default Props)

Você pode definir valores padrão para props que não foram especificadas:

### Em Componentes Funcionais

```jsx
function Botao({ texto = 'Clique aqui', tipo = 'primario' }) {
  return (
    <button className={`botao-${tipo}`}>
      {texto}
    </button>
  );
}

// Uso:
<Botao /> // Renderiza "Clique aqui" com classe "botao-primario"
<Botao texto="Enviar" /> // Renderiza "Enviar" com classe "botao-primario"
<Botao tipo="secundario" /> // Renderiza "Clique aqui" com classe "botao-secundario"
```

Alternativamente, você pode definir a propriedade `defaultProps`:

```jsx
function Botao(props) {
  return (
    <button className={`botao-${props.tipo}`}>
      {props.texto}
    </button>
  );
}

Botao.defaultProps = {
  texto: 'Clique aqui',
  tipo: 'primario'
};
```

### Em Componentes de Classe

```jsx
class Botao extends React.Component {
  render() {
    return (
      <button className={`botao-${this.props.tipo}`}>
        {this.props.texto}
      </button>
    );
  }
}

Botao.defaultProps = {
  texto: 'Clique aqui',
  tipo: 'primario'
};
```

## Validação de Props com PropTypes

O React inclui um sistema de validação de tipos para props chamado PropTypes. Embora seja opcional, é uma boa prática usá-lo para documentar e validar as props esperadas por um componente.

Para usar PropTypes, você precisa importar a biblioteca:

```jsx
import PropTypes from 'prop-types';
```

Exemplo de uso:

```jsx
import PropTypes from 'prop-types';

function Usuario({ nome, idade, email, amigos }) {
  return (
    <div>
      <h1>{nome}</h1>
      <p>Idade: {idade}</p>
      <p>Email: {email}</p>
      <p>Amigos: {amigos.join(', ')}</p>
    </div>
  );
}

Usuario.propTypes = {
  nome: PropTypes.string.isRequired,
  idade: PropTypes.number,
  email: PropTypes.string.isRequired,
  amigos: PropTypes.arrayOf(PropTypes.string)
};

Usuario.defaultProps = {
  idade: 0,
  amigos: []
};
```

Neste exemplo:
- `nome` deve ser uma string e é obrigatório
- `idade` deve ser um número (opcional, com valor padrão 0)
- `email` deve ser uma string e é obrigatório
- `amigos` deve ser um array de strings (opcional, com valor padrão array vazio)

## Composição vs. Herança

O React recomenda usar composição em vez de herança para reutilizar código entre componentes. As props, especialmente `children`, são fundamentais para implementar o padrão de composição.

### Exemplo de Composição

```jsx
// Componente de contêiner genérico
function Cartao({ titulo, rodape, children }) {
  return (
    <div className="cartao">
      {titulo && <div className="cartao-cabecalho">{titulo}</div>}
      <div className="cartao-corpo">
        {children}
      </div>
      {rodape && <div className="cartao-rodape">{rodape}</div>}
    </div>
  );
}

// Uso do componente de contêiner para compor diferentes UIs
function App() {
  return (
    <div>
      <Cartao titulo="Bem-vindo">
        <p>Este é um exemplo de composição no React.</p>
        <button>Saiba mais</button>
      </Cartao>
      
      <Cartao 
        titulo="Usuário" 
        rodape={<small>Última atualização: hoje</small>}
      >
        <img src="avatar.jpg" alt="Avatar" />
        <h3>Maria Silva</h3>
        <p>Desenvolvedora Front-end</p>
      </Cartao>
    </div>
  );
}
```

## Passagem de Props

### Spread de Props

Quando você tem um objeto com várias propriedades que deseja passar como props, pode usar o operador spread (`...`):

```jsx
const usuarioProps = {
  nome: 'Maria',
  idade: 25,
  email: 'maria@exemplo.com'
};

// Em vez de:
<Usuario nome={usuarioProps.nome} idade={usuarioProps.idade} email={usuarioProps.email} />

// Você pode usar:
<Usuario {...usuarioProps} />
```

### Encaminhamento de Props (Props Forwarding)

Às vezes, você pode querer passar todas as props recebidas por um componente para um componente filho:

```jsx
function BotaoWrapper(props) {
  // Passa todas as props recebidas para o componente Botao
  return <Botao {...props} />;
}
```

Ou você pode adicionar ou modificar algumas props:

```jsx
function BotaoEnhanced({ className, ...outrasProps }) {
  // Adiciona uma classe extra e passa todas as outras props
  return <Botao className={`botao-enhanced ${className || ''}`} {...outrasProps} />;
}
```

## Padrões Avançados com Props

### Render Props

Um padrão onde uma prop é uma função que retorna um elemento React:

```jsx
function Mouse({ render }) {
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosicao({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return render(posicao);
}

// Uso:
<Mouse render={({ x, y }) => (
  <p>A posição atual do mouse é ({x}, {y})</p>
)} />
```

### Props Condicionais

Você pode renderizar diferentes elementos com base em props:

```jsx
function Botao({ primario, children }) {
  return (
    <button className={primario ? 'botao-primario' : 'botao-secundario'}>
      {children}
    </button>
  );
}

// Uso:
<Botao primario>Salvar</Botao>
<Botao>Cancelar</Botao>
```

## Boas Práticas com Props

1. **Mantenha as props simples**: Evite passar estruturas de dados muito complexas como props.

2. **Use nomes descritivos**: Escolha nomes de props que descrevam claramente seu propósito.

3. **Documente suas props**: Use PropTypes ou TypeScript para documentar as props esperadas.

4. **Evite modificar props**: Props devem ser tratadas como imutáveis dentro de um componente.

5. **Use desestruturação**: Desestruture props para tornar o código mais limpo e legível.

6. **Defina valores padrão**: Forneça valores padrão para props opcionais.

7. **Minimize o número de props**: Se um componente precisa de muitas props, considere dividi-lo em componentes menores.

8. **Siga convenções de nomenclatura**:
   - Use camelCase para nomes de props: `onClick`, `backgroundColor`
   - Use prefixo `on` para handlers de eventos: `onClick`, `onSubmit`
   - Use prefixo `is` ou `has` para props booleanas: `isActive`, `hasError`

As props são um conceito fundamental no React que permite a criação de componentes reutilizáveis e a composição de interfaces complexas a partir de componentes simples. Dominar o uso de props é essencial para se tornar um desenvolvedor React eficiente.

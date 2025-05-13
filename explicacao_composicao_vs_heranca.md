# Composição vs Herança no React

No desenvolvimento de software, existem diferentes abordagens para reutilizar código e compartilhar funcionalidades entre componentes. No React, a equipe oficial recomenda fortemente o uso de composição em vez de herança para construir componentes reutilizáveis. Vamos entender por que essa recomendação existe e como implementar efetivamente a composição em suas aplicações React.

## O Que é Herança?

Herança é um conceito fundamental da programação orientada a objetos (POO) onde uma classe pode herdar propriedades e métodos de outra classe. Em termos de componentes React, isso significaria que um componente poderia herdar funcionalidades de outro componente.

```jsx
// Exemplo conceitual de herança (NÃO recomendado no React)
class ComponenteBase extends React.Component {
  // Métodos e propriedades comuns
  metodoComum() {
    console.log('Funcionalidade compartilhada');
  }
  
  render() {
    return <div>Implementação base</div>;
  }
}

class ComponenteEspecifico extends ComponenteBase {
  // Adiciona ou sobrescreve funcionalidades
  render() {
    return (
      <div>
        {super.metodoComum()}
        <p>Funcionalidade específica</p>
      </div>
    );
  }
}
```

## Por Que o React Prefere Composição?

A equipe do React identificou que, na prática, a herança pode levar a diversos problemas:

1. **Acoplamento forte**: Componentes que herdam de outros ficam fortemente acoplados, dificultando mudanças futuras.
2. **Hierarquias complexas**: Hierarquias de herança profundas podem se tornar difíceis de entender e manter.
3. **Inflexibilidade**: A herança é menos flexível para compartilhar código de forma granular.
4. **Problemas do diamante**: Quando um componente precisa herdar de múltiplas fontes, surgem conflitos difíceis de resolver.

## O Que é Composição no React?

Composição é o princípio de construir componentes complexos combinando componentes mais simples. Em vez de herdar funcionalidades, os componentes recebem outros componentes como props ou children e os renderizam como parte de sua saída.

## Técnicas de Composição no React

### 1. Contenção (Containment)

A contenção é usada quando um componente não conhece seus filhos antecipadamente. Isso é especialmente comum para componentes como `Sidebar`, `Dialog` ou `Card` que atuam como "contêineres" genéricos.

#### Usando a prop `children`:

```jsx
function Card(props) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{props.titulo}</h2>
      </div>
      <div className="card-body">
        {props.children}
      </div>
    </div>
  );
}

// Uso do componente
function App() {
  return (
    <Card titulo="Bem-vindo!">
      <p>Este é um conteúdo que será renderizado dentro do card.</p>
      <button>Clique aqui</button>
    </Card>
  );
}
```

Neste exemplo, o componente `Card` não sabe quais elementos filhos ele irá renderizar. Ele simplesmente recebe qualquer conteúdo através da prop especial `children` e o renderiza dentro de sua estrutura.

#### Usando múltiplos "slots":

Para casos onde você precisa de mais de um "espaço" para conteúdo, você pode criar sua própria convenção:

```jsx
function Layout(props) {
  return (
    <div className="layout">
      <div className="cabecalho">
        {props.cabecalho}
      </div>
      <div className="menu">
        {props.menu}
      </div>
      <div className="conteudo">
        {props.conteudo}
      </div>
      <div className="rodape">
        {props.rodape}
      </div>
    </div>
  );
}

// Uso do componente
function App() {
  return (
    <Layout 
      cabecalho={<Header />}
      menu={<Menu />}
      conteudo={<Conteudo />}
      rodape={<Footer />}
    />
  );
}
```

### 2. Especialização

A especialização ocorre quando um componente é uma versão "especial" de outro componente. Em vez de usar herança, isso é alcançado através da composição, onde um componente mais específico renderiza um componente mais genérico e o configura com props.

```jsx
// Componente genérico
function Dialog(props) {
  return (
    <div className="dialog">
      <div className="dialog-header">
        <h2>{props.titulo}</h2>
      </div>
      <div className="dialog-body">
        <p>{props.mensagem}</p>
      </div>
      <div className="dialog-footer">
        {props.botoes}
      </div>
    </div>
  );
}

// Componente especializado
function DialogoConfirmacao(props) {
  return (
    <Dialog
      titulo="Confirmação"
      mensagem={props.mensagem}
      botoes={
        <>
          <button onClick={props.onConfirm}>Sim</button>
          <button onClick={props.onCancel}>Não</button>
        </>
      }
    />
  );
}

// Uso do componente especializado
function App() {
  return (
    <DialogoConfirmacao 
      mensagem="Tem certeza que deseja excluir este item?"
      onConfirm={() => console.log('Confirmado')}
      onCancel={() => console.log('Cancelado')}
    />
  );
}
```

Neste exemplo, `DialogoConfirmacao` é uma versão especializada de `Dialog`, configurada para um caso de uso específico.

## Benefícios da Composição

1. **Flexibilidade**: A composição oferece mais flexibilidade para combinar componentes de diferentes maneiras.
2. **Clareza**: As relações entre componentes são explícitas e visíveis no código.
3. **Desacoplamento**: Os componentes são menos dependentes uns dos outros.
4. **Testabilidade**: Componentes compostos são mais fáceis de testar isoladamente.
5. **Reutilização**: Facilita a criação de componentes altamente reutilizáveis.

## Padrões Avançados de Composição

### Componentes de Ordem Superior (HOCs)

Um HOC é uma função que recebe um componente e retorna um novo componente com funcionalidades adicionais. Este é um padrão avançado de composição que veremos em detalhes em outra seção.

### Render Props

O padrão Render Props envolve passar uma função como prop que um componente usa para determinar o que renderizar. Este também é um padrão avançado que será abordado separadamente.

## Quando Considerar Herança?

Embora a composição seja geralmente preferida, existem raros casos onde a herança pode fazer sentido:

1. Quando você está criando uma biblioteca de componentes com uma base comum muito clara.
2. Para componentes de classe que compartilham lógica não-UI (embora hooks tenham tornado isso menos necessário).

No entanto, mesmo nesses casos, geralmente é possível refatorar para usar composição com resultados melhores.

## Exemplo Prático: Refatorando de Herança para Composição

### Abordagem com Herança (Problemática):

```jsx
// Componente base com funcionalidade de carregamento
class ComponenteComCarregamento extends React.Component {
  constructor(props) {
    super(props);
    this.state = { carregando: true, dados: null };
  }
  
  componentDidMount() {
    fetch(this.props.url)
      .then(response => response.json())
      .then(dados => {
        this.setState({ carregando: false, dados });
      });
  }
  
  render() {
    if (this.state.carregando) {
      return <div>Carregando...</div>;
    }
    
    return this.renderizarDados();
  }
  
  // Método a ser sobrescrito pelos componentes filhos
  renderizarDados() {
    return <div>Implemente este método</div>;
  }
}

// Componente específico que herda a funcionalidade de carregamento
class ListaDeUsuarios extends ComponenteComCarregamento {
  renderizarDados() {
    return (
      <ul>
        {this.state.dados.map(usuario => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
    );
  }
}
```

### Refatorado para Composição:

```jsx
// Componente de carregamento reutilizável
function ComCarregamento(props) {
  const [estado, setEstado] = useState({ carregando: true, dados: null });
  
  useEffect(() => {
    fetch(props.url)
      .then(response => response.json())
      .then(dados => {
        setEstado({ carregando: false, dados });
      });
  }, [props.url]);
  
  if (estado.carregando) {
    return <div>Carregando...</div>;
  }
  
  // Chama a render prop com os dados carregados
  return props.render(estado.dados);
}

// Componente específico que usa o componente de carregamento
function ListaDeUsuarios(props) {
  return (
    <ComCarregamento 
      url="/api/usuarios" 
      render={dados => (
        <ul>
          {dados.map(usuario => (
            <li key={usuario.id}>{usuario.nome}</li>
          ))}
        </ul>
      )}
    />
  );
}
```

## Conclusão

O React favorece fortemente a composição sobre a herança como mecanismo para reutilização de código entre componentes. A composição oferece maior flexibilidade, clareza e facilidade de manutenção, permitindo criar interfaces complexas a partir de componentes simples.

Ao desenvolver em React, é recomendado:

1. Pensar em termos de composição de componentes.
2. Usar `children` e props para configurar componentes.
3. Extrair funcionalidades compartilhadas em componentes separados que podem ser compostos.
4. Utilizar padrões avançados como HOCs e Render Props quando necessário.

Seguindo esses princípios, você criará uma base de código mais flexível, manutenível e verdadeiramente alinhada com a filosofia do React.

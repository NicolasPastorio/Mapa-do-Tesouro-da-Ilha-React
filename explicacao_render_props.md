# Render Props no React

O padrão Render Props é uma técnica avançada no React para compartilhar código entre componentes usando uma prop cujo valor é uma função. Este padrão oferece uma alternativa flexível aos Componentes de Ordem Superior (HOCs) e, em muitos casos, proporciona uma solução mais intuitiva e transparente para o compartilhamento de lógica.

## O que são Render Props?

Uma render prop é uma função passada como propriedade para um componente, que o componente usa para determinar o que renderizar. Em vez de encapsular e ocultar a lógica interna (como fazem os HOCs), o padrão render props expõe explicitamente os dados e comportamentos para o componente pai.

A estrutura básica é:

```jsx
<ComponenteComEstado
  render={(dados) => <ComponenteDeApresentacao dados={dados} />}
/>
```

O termo "render prop" refere-se ao padrão, mas a prop não precisa necessariamente se chamar `render`. Qualquer prop que seja uma função usada para determinar o que renderizar se qualifica como uma render prop.

## Como Funcionam as Render Props

Um componente com render props:

1. Encapsula alguma lógica ou estado
2. Recebe uma função como prop (a render prop)
3. Chama essa função durante a renderização, passando dados ou callbacks como argumentos
4. A função retorna elementos React que serão renderizados

## Exemplo Básico

Vamos criar um componente `MouseTracker` que rastreia a posição do mouse e compartilha essa informação:

```jsx
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };

  render() {
    return (
      <div 
        style={{ height: '100vh' }} 
        onMouseMove={this.handleMouseMove}
      >
        {/* Chama a render prop passando o estado atual */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

// Uso do componente
function App() {
  return (
    <MouseTracker 
      render={({ x, y }) => (
        <h1>A posição atual do mouse é: {x}, {y}</h1>
      )}
    />
  );
}
```

Neste exemplo, `MouseTracker` gerencia o estado da posição do mouse e fornece esses dados para o componente pai através da render prop.

## Variações do Padrão Render Props

### 1. Usando a Prop `children`

Uma variação comum é usar a prop especial `children` como render prop:

```jsx
class MouseTracker extends React.Component {
  // ... mesmo código de antes

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {/* Usa children como função em vez de uma prop específica */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Uso com children como função
function App() {
  return (
    <MouseTracker>
      {({ x, y }) => (
        <h1>A posição atual do mouse é: {x}, {y}</h1>
      )}
    </MouseTracker>
  );
}
```

Esta abordagem é mais concisa e aproveita a familiaridade dos desenvolvedores com a prop `children`.

### 2. Componente como Prop

Outra variação é passar um componente como prop, em vez de uma função:

```jsx
function MousePosition({ position, Component, ...rest }) {
  return <Component position={position} {...rest} />;
}

class MouseTracker extends React.Component {
  // ... mesmo código de antes

  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        <MousePosition 
          position={this.state} 
          Component={this.props.component} 
          {...this.props}
        />
      </div>
    );
  }
}

// Componente que recebe a posição
function MouseDisplay({ position }) {
  return <h1>A posição atual do mouse é: {position.x}, {position.y}</h1>;
}

// Uso
function App() {
  return <MouseTracker component={MouseDisplay} />;
}
```

## Casos de Uso Comuns para Render Props

### 1. Compartilhamento de Estado e Comportamento

O caso de uso mais comum é compartilhar estado e comportamento entre componentes:

```jsx
class Toggle extends React.Component {
  state = { on: false };
  
  toggle = () => {
    this.setState(prevState => ({ on: !prevState.on }));
  };
  
  render() {
    return this.props.render({
      on: this.state.on,
      toggle: this.toggle
    });
  }
}

// Uso em diferentes contextos
function App() {
  return (
    <div>
      <Toggle 
        render={({ on, toggle }) => (
          <button onClick={toggle}>
            {on ? 'ON' : 'OFF'}
          </button>
        )}
      />
      
      <Toggle 
        render={({ on, toggle }) => (
          <div>
            <button onClick={toggle}>Alternar</button>
            {on && <div>Conteúdo visível quando ativado</div>}
          </div>
        )}
      />
    </div>
  );
}
```

### 2. Acesso a APIs do Navegador

Render props são úteis para encapsular o acesso a APIs do navegador:

```jsx
class WindowSize extends React.Component {
  state = {
    width: window.innerWidth,
    height: window.innerHeight
  };
  
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }
  
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }
  
  handleResize = () => {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  
  render() {
    return this.props.children(this.state);
  }
}

// Uso
function ResponsiveComponent() {
  return (
    <WindowSize>
      {({ width, height }) => (
        <div>
          <p>Largura da janela: {width}px</p>
          <p>Altura da janela: {height}px</p>
          {width < 768 ? (
            <p>Visualização mobile</p>
          ) : (
            <p>Visualização desktop</p>
          )}
        </div>
      )}
    </WindowSize>
  );
}
```

### 3. Gerenciamento de Formulários

Render props podem simplificar o gerenciamento de formulários:

```jsx
class FormHandler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.initialValues || {},
      errors: {},
      touched: {}
    };
  }
  
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        [name]: value
      },
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }));
  };
  
  handleSubmit = (event) => {
    event.preventDefault();
    const errors = this.props.validate(this.state.values);
    
    if (Object.keys(errors).length === 0) {
      this.props.onSubmit(this.state.values);
    } else {
      this.setState({ errors });
    }
  };
  
  render() {
    return this.props.render({
      values: this.state.values,
      errors: this.state.errors,
      touched: this.state.touched,
      handleChange: this.handleChange,
      handleSubmit: this.handleSubmit
    });
  }
}

// Uso
function LoginForm() {
  return (
    <FormHandler
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) errors.email = 'Email é obrigatório';
        if (!values.password) errors.password = 'Senha é obrigatória';
        return errors;
      }}
      onSubmit={values => console.log('Enviando:', values)}
      render={({ values, errors, touched, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            {touched.email && errors.email && <p>{errors.email}</p>}
          </div>
          
          <div>
            <label>Senha:</label>
            <input
              type="password"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            {touched.password && errors.password && <p>{errors.password}</p>}
          </div>
          
          <button type="submit">Entrar</button>
        </form>
      )}
    />
  );
}
```

## Vantagens das Render Props

### 1. Transparência e Clareza

As render props tornam explícito o fluxo de dados entre componentes, facilitando o entendimento de como os dados são passados e utilizados.

### 2. Evita o "Wrapper Hell"

Ao contrário dos HOCs, que podem criar múltiplas camadas de componentes aninhados, as render props mantêm a hierarquia de componentes mais plana.

### 3. Tipagem Mais Simples

Em projetos TypeScript, as render props geralmente são mais fáceis de tipar corretamente do que HOCs complexos.

### 4. Acesso Direto a Props

As render props dão acesso direto às props e estado do componente, sem necessidade de técnicas como prop renaming para evitar colisões.

## Desafios e Limitações

### 1. Problemas de Performance

O uso excessivo de render props pode causar problemas de performance devido à criação de novas funções a cada renderização:

```jsx
// Problema: cria uma nova função em cada renderização
<MouseTracker
  render={position => <Cat position={position} />}
/>
```

Solução: Definir a função fora do método render ou usar memoização:

```jsx
// Melhor: define a função uma única vez
class MouseWithCat extends React.Component {
  renderCat = (position) => {
    return <Cat position={position} />;
  };
  
  render() {
    return <MouseTracker render={this.renderCat} />;
  }
}
```

### 2. Complexidade com Múltiplos Providers

Quando você precisa de múltiplos componentes com render props, o código pode ficar aninhado e difícil de ler:

```jsx
// Aninhamento excessivo
<MouseTracker>
  {mousePosition => (
    <WindowSize>
      {windowSize => (
        <ThemeContext.Consumer>
          {theme => (
            <UserContext.Consumer>
              {user => (
                <div>
                  {/* Componente com muitos parâmetros */}
                </div>
              )}
            </UserContext.Consumer>
          )}
        </ThemeContext.Consumer>
      )}
    </WindowSize>
  )}
</MouseTracker>
```

Solução: Compor os componentes de render props ou usar Hooks quando possível.

## Render Props vs. HOCs vs. Hooks

### Comparação com HOCs

| Aspecto | Render Props | HOCs |
|---------|--------------|------|
| Transparência | Fluxo de dados explícito | Fluxo de dados implícito |
| Hierarquia | Mantém hierarquia plana | Pode criar "wrapper hell" |
| Colisão de props | Não há problema | Pode haver colisão de nomes |
| Composição | Pode ficar aninhado | Fácil de compor com funções |
| Reutilização | Excelente para UI + lógica | Melhor para lógica pura |

### Comparação com Hooks

| Aspecto | Render Props | Hooks |
|---------|--------------|-------|
| Sintaxe | Mais verbosa | Mais concisa |
| Componentes | Funciona com classe e função | Apenas componentes de função |
| Hierarquia | Afeta a estrutura do JSX | Não afeta a estrutura do JSX |
| Escopo | Compartilha entre componentes | Compartilha entre funções |
| Complexidade | Pode ficar aninhado | Composição linear |

### Exemplo Comparativo

**Problema**: Rastrear a posição do mouse

**Solução com Render Props**:
```jsx
class MouseTracker extends React.Component {
  state = { x: 0, y: 0 };
  
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  
  render() {
    return (
      <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}

// Uso
<MouseTracker>
  {({ x, y }) => <p>Posição: {x}, {y}</p>}
</MouseTracker>
```

**Solução com HOC**:
```jsx
function withMouse(Component) {
  return class extends React.Component {
    state = { x: 0, y: 0 };
    
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    render() {
      return (
        <div style={{ height: '100vh' }} onMouseMove={this.handleMouseMove}>
          <Component mouse={this.state} {...this.props} />
        </div>
      );
    }
  };
}

// Uso
const MouseDisplay = ({ mouse }) => <p>Posição: {mouse.x}, {mouse.y}</p>;
const EnhancedMouseDisplay = withMouse(MouseDisplay);
```

**Solução com Hook**:
```jsx
function useMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return mousePosition;
}

// Uso
function MouseDisplay() {
  const { x, y } = useMouse();
  return <p>Posição: {x}, {y}</p>;
}
```

## Quando Usar Render Props

As render props são particularmente úteis quando:

1. Você precisa compartilhar lógica e UI entre componentes
2. Você quer controle explícito sobre como os dados são usados
3. Você trabalha com componentes de classe e não pode usar Hooks
4. Você precisa de flexibilidade para renderizar diferentes UIs com a mesma lógica
5. Você está integrando com bibliotecas que usam render props

## Melhores Práticas

### 1. Use Memoização para Evitar Renderizações Desnecessárias

```jsx
class MouseTracker extends React.Component {
  // Memoize a função render para evitar recriá-la a cada renderização
  renderContent = (mousePosition) => {
    return this.props.render(mousePosition);
  };
  
  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.renderContent(this.state)}
      </div>
    );
  }
}
```

### 2. Combine com React.memo para Componentes Funcionais

```jsx
const MemoizedChild = React.memo(({ position }) => {
  return <div>Mouse position: {position.x}, {position.y}</div>;
});

function App() {
  return (
    <MouseTracker>
      {position => <MemoizedChild position={position} />}
    </MouseTracker>
  );
}
```

### 3. Evite Aninhamento Excessivo

Extraia componentes intermediários para reduzir o aninhamento:

```jsx
// Em vez disso:
<DataProvider>
  {data => (
    <ThemeProvider>
      {theme => (
        <UserProvider>
          {user => (
            <Layout data={data} theme={theme} user={user} />
          )}
        </UserProvider>
      )}
    </ThemeProvider>
  )}
</DataProvider>

// Faça isso:
function ConnectedLayout() {
  return (
    <DataProvider>
      {data => (
        <ThemeConsumer data={data} />
      )}
    </DataProvider>
  );
}

function ThemeConsumer({ data }) {
  return (
    <ThemeProvider>
      {theme => (
        <UserConsumer data={data} theme={theme} />
      )}
    </ThemeProvider>
  );
}

function UserConsumer({ data, theme }) {
  return (
    <UserProvider>
      {user => (
        <Layout data={data} theme={theme} user={user} />
      )}
    </UserProvider>
  );
}
```

### 4. Considere Hooks para Novos Projetos

Para novos projetos usando componentes funcionais, considere usar Hooks em vez de render props, pois eles geralmente oferecem uma solução mais concisa.

## Conclusão

O padrão Render Props é uma técnica poderosa no React para compartilhar lógica entre componentes. Ele oferece grande flexibilidade e transparência, tornando explícito o fluxo de dados entre componentes.

Embora os Hooks tenham simplificado muitos casos de uso que anteriormente exigiam render props, este padrão ainda tem seu lugar no ecossistema React, especialmente quando se trabalha com componentes de classe ou quando se precisa de um controle mais granular sobre o que é renderizado.

Ao decidir entre render props, HOCs e Hooks, considere as necessidades específicas do seu projeto, a complexidade da lógica a ser compartilhada e a preferência da sua equipe. Muitas vezes, uma combinação dessas técnicas pode oferecer a solução mais elegante para seus problemas de compartilhamento de código.

# Componentes de Ordem Superior (HOCs) no React

Os Componentes de Ordem Superior (Higher-Order Components ou HOCs) são um padrão avançado no React para reutilização de lógica de componentes. Este padrão surgiu da natureza composicional do React e representa uma técnica poderosa para compartilhar comportamentos entre componentes sem repetição de código.

## O que é um Componente de Ordem Superior?

Um Componente de Ordem Superior é uma função que recebe um componente e retorna um novo componente com funcionalidades adicionais. Em termos mais técnicos:

```jsx
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

Enquanto um componente transforma props em UI, um HOC transforma um componente em outro componente. É importante entender que HOCs não modificam o componente original nem usam herança - eles compõem o componente original envolvendo-o em um componente container.

## Por que usar HOCs?

Os HOCs resolvem o problema de "preocupações transversais" (cross-cutting concerns) - funcionalidades que precisam ser aplicadas em múltiplos componentes, como:

1. Manipulação de dados e estado
2. Controle de acesso e autenticação
3. Logging e instrumentação
4. Manipulação de contexto
5. Injeção de props adicionais
6. Abstração de lógica de UI comum

## Anatomia de um HOC

Um HOC típico segue este padrão:

```jsx
// Definição do HOC
function withExtraFunctionality(WrappedComponent) {
  // Retorna um novo componente
  return function EnhancedComponent(props) {
    // Lógica adicional aqui
    const extraProp = computeExtraValue();
    
    // Renderiza o componente original com props adicionais
    return <WrappedComponent extraProp={extraProp} {...props} />;
  };
}

// Uso do HOC
const EnhancedComponent = withExtraFunctionality(MyComponent);
```

## Exemplos Práticos de HOCs

### 1. HOC para Manipulação de Dados

Um caso de uso comum é criar um HOC que carrega dados para um componente:

```jsx
function withData(WrappedComponent, dataSource) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        data: null,
        isLoading: true,
        error: null
      };
    }

    componentDidMount() {
      this.fetchData();
    }

    fetchData() {
      this.setState({ isLoading: true });
      
      dataSource(this.props)
        .then(data => this.setState({ data, isLoading: false }))
        .catch(error => this.setState({ error, isLoading: false }));
    }

    render() {
      const { data, isLoading, error } = this.state;
      
      return (
        <WrappedComponent
          data={data}
          isLoading={isLoading}
          error={error}
          refetch={this.fetchData}
          {...this.props}
        />
      );
    }
  };
}

// Uso
const UserListWithData = withData(UserList, props => 
  fetch(`/api/users?page=${props.page}`).then(res => res.json())
);

// Renderização
<UserListWithData page={1} />
```

### 2. HOC para Controle de Acesso

Um HOC que verifica se o usuário está autenticado antes de renderizar um componente:

```jsx
function withAuth(WrappedComponent) {
  return function WithAuth(props) {
    const { isAuthenticated, user } = useAuth(); // Hook personalizado de autenticação
    
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
    
    return <WrappedComponent user={user} {...props} />;
  };
}

// Uso
const ProtectedDashboard = withAuth(Dashboard);
```

### 3. HOC para Manipulação de Formulários

Um HOC que adiciona funcionalidades de formulário a um componente:

```jsx
function withFormHandling(WrappedComponent, initialValues = {}) {
  return function WithFormHandling(props) {
    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setValues(prevValues => ({
        ...prevValues,
        [name]: value
      }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      // Validação e submissão do formulário
      const validationErrors = validate(values);
      
      if (Object.keys(validationErrors).length === 0) {
        props.onSubmit(values);
      } else {
        setErrors(validationErrors);
      }
    };
    
    return (
      <WrappedComponent
        values={values}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        {...props}
      />
    );
  };
}

// Uso
const EnhancedForm = withFormHandling(UserForm, { name: '', email: '' });
```

## Boas Práticas para HOCs

### 1. Não Mutar o Componente Original

Os HOCs não devem modificar o componente original. Em vez disso, eles devem compor o componente original criando um novo.

```jsx
// Incorreto
function withConfig(WrappedComponent) {
  WrappedComponent.prototype.componentDidMount = function() {
    // Isso modifica o componente original!
  };
  return WrappedComponent;
}

// Correto
function withConfig(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      // Lógica adicional aqui
    }
    
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}
```

### 2. Passar Props Não Relacionadas

Um HOC deve passar todas as props não relacionadas à sua funcionalidade específica para o componente envolvido.

```jsx
function withTheme(WrappedComponent) {
  return function WithTheme(props) {
    const theme = useContext(ThemeContext);
    
    // Passe todas as props originais junto com a nova prop 'theme'
    return <WrappedComponent theme={theme} {...props} />;
  };
}
```

### 3. Maximizar Composabilidade

Os HOCs devem ser projetados para serem compostos com outros HOCs.

```jsx
// Composição de múltiplos HOCs
const EnhancedComponent = withAuth(withData(withTheme(MyComponent)));

// Ou usando a função compose do lodash ou redux
const enhance = compose(
  withAuth,
  withData,
  withTheme
);
const EnhancedComponent = enhance(MyComponent);
```

### 4. Convenção de Nomenclatura

Use o prefixo "with" para nomear seus HOCs, indicando claramente sua função.

```jsx
withAuth, withData, withTheme, withRouter, etc.
```

### 5. Adicionar um Nome de Exibição para Depuração

Adicione um displayName explícito para facilitar a depuração.

```jsx
function withSubscription(WrappedComponent) {
  const WithSubscription = props => {
    // ...lógica do HOC
    return <WrappedComponent {...props} />;
  };
  
  // Defina um nome de exibição útil para depuração
  WithSubscription.displayName = `WithSubscription(${getDisplayName(WrappedComponent)})`;
  
  return WithSubscription;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
```

## Limitações e Desafios dos HOCs

### 1. Problema de Props Conflitantes

Se múltiplos HOCs injetarem props com o mesmo nome, eles podem sobrescrever uns aos outros.

```jsx
// HOC 1
const withUser = WrappedComponent => props => {
  const user = { name: 'João' };
  return <WrappedComponent user={user} {...props} />;
};

// HOC 2
const withAdminUser = WrappedComponent => props => {
  const user = { name: 'Admin', role: 'admin' };
  return <WrappedComponent user={user} {...props} />;
};

// A prop 'user' de withUser será sobrescrita por withAdminUser
const EnhancedComponent = withAdminUser(withUser(UserProfile));
```

### 2. Wrapper Hell

O uso excessivo de HOCs pode levar ao "wrapper hell" - muitas camadas de componentes aninhados que dificultam a depuração.

```jsx
// Muitas camadas de HOCs podem dificultar a depuração
const EnhancedComponent = withA(withB(withC(withD(withE(Component)))));
```

### 3. Refs Não São Passadas Automaticamente

As refs não são passadas através de HOCs como props normais. Para resolver isso, use a API `React.forwardRef`.

```jsx
function withLogging(WrappedComponent) {
  class WithLogging extends React.Component {
    // ...lógica do HOC
    render() {
      const { forwardedRef, ...rest } = this.props;
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }
  
  // Use forwardRef para passar refs através do HOC
  return React.forwardRef((props, ref) => {
    return <WithLogging {...props} forwardedRef={ref} />;
  });
}
```

## HOCs vs. Hooks

Com a introdução dos Hooks no React 16.8, muitos casos de uso que anteriormente exigiam HOCs podem agora ser implementados de forma mais direta usando Hooks personalizados.

### Comparação:

**HOCs:**
- Envolvem componentes inteiros
- Podem ser mais verbosos
- Podem causar "wrapper hell"
- Bons para injetar props e comportamentos em componentes de classe

**Hooks:**
- Permitem reutilizar lógica de estado sem mudar a hierarquia de componentes
- Geralmente mais concisos
- Evitam o problema de aninhamento excessivo
- Funcionam apenas com componentes funcionais

### Exemplo de Refatoração de HOC para Hook:

**Versão HOC:**
```jsx
function withWindowSize(WrappedComponent) {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    }
    
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
      return (
        <WrappedComponent
          windowSize={this.state}
          {...this.props}
        />
      );
    }
  };
}

// Uso
const ResponsiveComponent = withWindowSize(MyComponent);
```

**Versão com Hook:**
```jsx
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

// Uso
function MyComponent(props) {
  const windowSize = useWindowSize();
  
  return (
    <div>
      Window width: {windowSize.width}
      Window height: {windowSize.height}
    </div>
  );
}
```

## Quando Usar HOCs vs. Hooks

**Use HOCs quando:**
- Precisa compartilhar lógica com componentes de classe
- Precisa injetar props em uma árvore de componentes
- Está trabalhando com bibliotecas que usam HOCs (como o connect do Redux)
- Precisa manipular o ciclo de vida do componente de forma complexa

**Use Hooks quando:**
- Está trabalhando com componentes funcionais
- Quer uma solução mais concisa e direta
- Quer evitar o aninhamento excessivo de componentes
- Precisa compartilhar apenas lógica, não renderização de UI

## Conclusão

Os Componentes de Ordem Superior são um padrão poderoso no React para reutilização de lógica entre componentes. Eles permitem extrair funcionalidades comuns em funções reutilizáveis, seguindo o princípio de composição do React.

Embora os Hooks tenham simplificado muitos casos de uso que anteriormente exigiam HOCs, os HOCs ainda têm seu lugar no ecossistema React, especialmente ao trabalhar com componentes de classe ou ao integrar com bibliotecas existentes.

Ao decidir entre HOCs e outras abordagens como Hooks ou Render Props, considere a complexidade, a manutenibilidade e as necessidades específicas do seu projeto. Muitas vezes, uma combinação dessas técnicas pode oferecer a solução mais elegante para seus problemas de compartilhamento de código.

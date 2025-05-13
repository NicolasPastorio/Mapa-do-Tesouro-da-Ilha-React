# Error Boundaries no React

As Error Boundaries (Limites de Erro) são um recurso do React que permite capturar e tratar erros de JavaScript que ocorrem durante a renderização, em métodos do ciclo de vida e em construtores de componentes filhos. Elas fornecem uma maneira elegante de lidar com falhas inesperadas em sua aplicação React, evitando que toda a interface do usuário quebre quando ocorre um erro em uma parte específica.

## O Problema que as Error Boundaries Resolvem

Antes das Error Boundaries (introduzidas no React 16), um erro de JavaScript em qualquer parte da interface do usuário poderia corromper o estado interno do React e causar erros criptografados nas renderizações subsequentes. Isso frequentemente resultava em:

1. Telas em branco sem explicação para o usuário
2. Aplicações completamente inutilizáveis após um único erro
3. Experiência de usuário prejudicada
4. Dificuldade em identificar a origem do problema

As Error Boundaries resolvem esses problemas fornecendo um mecanismo para:
- Capturar erros em componentes filhos
- Registrar esses erros
- Exibir uma UI alternativa em vez de deixar a aplicação quebrar

## Como Funcionam as Error Boundaries

Uma Error Boundary é um componente React que:

1. Captura erros de JavaScript em qualquer lugar na sua árvore de componentes filhos
2. Registra esses erros
3. Exibe uma UI alternativa em vez da árvore de componentes que falhou

Um componente se torna uma Error Boundary quando implementa pelo menos um dos seguintes métodos de ciclo de vida:

- `static getDerivedStateFromError()` - Para renderizar uma UI alternativa após um erro
- `componentDidCatch()` - Para registrar informações sobre o erro

## Criando uma Error Boundary

Uma Error Boundary básica pode ser implementada como um componente de classe:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para que a próxima renderização mostre a UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Você pode registrar o erro em um serviço de relatório de erros
    console.error('Erro capturado pela Error Boundary:', error, errorInfo);
    // Ou enviar para um serviço como Sentry, LogRocket, etc.
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Você pode renderizar qualquer UI alternativa
      return <h1>Algo deu errado.</h1>;
    }

    return this.props.children;
  }
}
```

## Usando Error Boundaries

Uma vez definida, você pode usar a Error Boundary envolvendo componentes que podem falhar:

```jsx
<ErrorBoundary>
  <ComponenteQuePoderiaFalhar />
</ErrorBoundary>
```

Você pode aninhar Error Boundaries para criar uma granularidade mais fina:

```jsx
<ErrorBoundary>
  <div>
    <h1>Meu Aplicativo</h1>
    
    <ErrorBoundary>
      <ComponenteA />
    </ErrorBoundary>
    
    <ErrorBoundary>
      <ComponenteB />
    </ErrorBoundary>
  </div>
</ErrorBoundary>
```

Neste exemplo, se `ComponenteA` falhar, apenas ele será substituído pela UI alternativa, enquanto `ComponenteB` continuará funcionando normalmente.

## Exemplo Prático Completo

Vamos criar um exemplo mais completo de uma Error Boundary com uma UI alternativa mais elaborada:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error) {
    // Atualiza o estado para mostrar a UI alternativa
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Captura detalhes do erro para exibição e logging
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Aqui você poderia enviar o erro para um serviço de relatório
    // reportErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // UI alternativa personalizada
      return (
        <div className="error-boundary-fallback">
          <h2>Ops! Algo deu errado</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            <summary>Detalhes do erro</summary>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
          <button
            onClick={() => this.setState({ hasError: false })}
            className="retry-button"
          >
            Tentar novamente
          </button>
        </div>
      );
    }

    // Quando não há erro, renderiza os filhos normalmente
    return this.props.children;
  }
}

// Componente que vai falhar propositalmente
class BuggyCounter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick() {
    this.setState(({counter}) => ({
      counter: counter + 1
    }));
  }
  
  render() {
    if (this.state.counter === 5) {
      // Quando o contador chega a 5, lançamos um erro
      throw new Error('Erro simulado: o contador chegou a 5!');
    }
    return (
      <div>
        <h3>Contador: {this.state.counter}</h3>
        <button onClick={this.handleClick}>Aumentar</button>
      </div>
    );
  }
}

// Uso na aplicação
function App() {
  return (
    <div className="app">
      <h1>Exemplo de Error Boundary</h1>
      
      <ErrorBoundary>
        <p>O contador abaixo vai quebrar quando chegar a 5:</p>
        <BuggyCounter />
      </ErrorBoundary>
      
      <hr />
      
      <p>Os contadores abaixo estão isolados por Error Boundaries separadas:</p>
      
      <div className="counters-grid">
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
        
        <ErrorBoundary>
          <BuggyCounter />
        </ErrorBoundary>
      </div>
    </div>
  );
}
```

Neste exemplo:
1. Criamos uma `ErrorBoundary` que exibe detalhes do erro e um botão para tentar novamente
2. Implementamos um `BuggyCounter` que falha propositalmente quando o contador chega a 5
3. Demonstramos como isolar falhas usando múltiplas instâncias de Error Boundaries

## Limitações das Error Boundaries

As Error Boundaries não capturam erros em:

1. **Manipuladores de eventos** (onClick, onChange, etc.)
2. **Código assíncrono** (callbacks de setTimeout, requisições fetch, etc.)
3. **Renderização no servidor**
4. **Erros lançados na própria Error Boundary** (em vez de em seus filhos)

### Tratando Erros em Manipuladores de Eventos

Para erros em manipuladores de eventos, use o tradicional try/catch do JavaScript:

```jsx
class MeuFormulario extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(event) {
    try {
      // Código que pode falhar
      this.processarDados();
    } catch (error) {
      this.setState({ error });
      // Evita o comportamento padrão do formulário
      event.preventDefault();
    }
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.state.error && (
          <div className="error-message">
            Erro ao enviar formulário: {this.state.error.message}
          </div>
        )}
        {/* Campos do formulário */}
        <button type="submit">Enviar</button>
      </form>
    );
  }
}
```

### Tratando Erros em Código Assíncrono

Para código assíncrono, você pode usar try/catch com async/await ou tratamento de promessas:

```jsx
class ComponenteAssincrono extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      error: null
    };
  }
  
  async componentDidMount() {
    try {
      const response = await fetch('https://api.exemplo.com/dados');
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }
      const data = await response.json();
      this.setState({ data, loading: false });
    } catch (error) {
      this.setState({ error, loading: false });
    }
  }
  
  render() {
    const { data, loading, error } = this.state;
    
    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar dados: {error.message}</div>;
    
    return (
      <div>
        {/* Renderiza os dados */}
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }
}
```

## Estratégias para Usar Error Boundaries

### 1. Granularidade Adequada

Você pode ajustar a granularidade das suas Error Boundaries dependendo da sua aplicação:

- **Error Boundaries de Nível Superior**: Capturam erros em toda a aplicação, garantindo que ela nunca quebre completamente.
- **Error Boundaries de Nível Médio**: Protegem seções importantes como navegação, conteúdo principal, barras laterais.
- **Error Boundaries de Nível Inferior**: Isolam componentes individuais de alto risco.

```jsx
function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <ErrorBoundary>
          <Header />
        </ErrorBoundary>
        
        <div className="content">
          <ErrorBoundary>
            <Sidebar />
          </ErrorBoundary>
          
          <ErrorBoundary>
            <MainContent />
          </ErrorBoundary>
        </div>
        
        <ErrorBoundary>
          <Footer />
        </ErrorBoundary>
      </div>
    </ErrorBoundary>
  );
}
```

### 2. Error Boundaries Específicas para Componentes

Você pode criar Error Boundaries específicas para diferentes tipos de componentes:

```jsx
// Para componentes de dados
class DataErrorBoundary extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <div className="data-error">
          <h3>Não foi possível carregar os dados</h3>
          <p>Por favor, tente novamente mais tarde.</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Tentar novamente
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Para componentes de UI
class UIErrorBoundary extends ErrorBoundary {
  render() {
    if (this.state.hasError) {
      return (
        <div className="ui-error">
          <p>Ocorreu um problema ao exibir esta seção.</p>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

### 3. Recuperação Inteligente

Você pode implementar estratégias de recuperação inteligentes:

```jsx
class RecoverableErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false,
      errorCount: 0
    };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, info) {
    this.setState(state => ({
      errorCount: state.errorCount + 1
    }));
    
    // Registra o erro
    console.error("Erro capturado:", error, info);
  }
  
  resetError = () => {
    this.setState({ hasError: false });
  }
  
  render() {
    const { hasError, errorCount } = this.state;
    
    if (hasError) {
      // Se houver muitas tentativas, sugerimos uma ação diferente
      if (errorCount >= 3) {
        return (
          <div className="persistent-error">
            <h3>Estamos enfrentando problemas persistentes</h3>
            <p>Tente uma das seguintes opções:</p>
            <ul>
              <li>Recarregue a página</li>
              <li>Limpe o cache do navegador</li>
              <li>Volte mais tarde</li>
            </ul>
          </div>
        );
      }
      
      // Para os primeiros erros, permitimos tentar novamente
      return (
        <div className="recoverable-error">
          <h3>Algo deu errado</h3>
          <p>Tentativa {errorCount} de 3</p>
          <button onClick={this.resetError}>
            Tentar novamente
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

## Error Boundaries e Hooks

As Error Boundaries só podem ser implementadas como componentes de classe, pois dependem de métodos de ciclo de vida que não têm equivalentes em Hooks. No entanto, você pode criar um Hook personalizado para facilitar o uso de Error Boundaries em componentes funcionais:

```jsx
// Primeiro, crie sua Error Boundary como componente de classe
class ErrorBoundary extends React.Component {
  // Implementação como mostrado anteriormente
}

// Depois, crie um Hook para facilitar o uso
function useErrorBoundary() {
  const [boundary] = useState(() => {
    // Cria uma referência para um elemento que será usado como Error Boundary
    const boundaryRef = React.createRef();
    
    // Função para resetar o estado da Error Boundary
    const reset = () => {
      if (boundaryRef.current) {
        boundaryRef.current.setState({ hasError: false });
      }
    };
    
    return { boundaryRef, reset };
  });
  
  // Retorna o componente ErrorBoundary e a função de reset
  const ErrorBoundaryWrapper = useCallback(({ children }) => (
    <ErrorBoundary ref={boundary.boundaryRef}>
      {children}
    </ErrorBoundary>
  ), [boundary.boundaryRef]);
  
  return [ErrorBoundaryWrapper, boundary.reset];
}

// Uso em um componente funcional
function MeuComponente() {
  const [ErrorBoundaryWrapper, resetError] = useErrorBoundary();
  
  return (
    <div>
      <ErrorBoundaryWrapper>
        <ComponenteQuePoderiaFalhar />
      </ErrorBoundaryWrapper>
      
      <button onClick={resetError}>
        Resetar em caso de erro
      </button>
    </div>
  );
}
```

## Integrando com Serviços de Monitoramento de Erros

Para aplicações em produção, é essencial integrar suas Error Boundaries com serviços de monitoramento de erros como Sentry, LogRocket, ou similar:

```jsx
class MonitoredErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Captura informações do ambiente
    const errorDetails = {
      error,
      errorInfo,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
      // Você pode adicionar mais informações contextuais aqui
      userId: this.props.userId,
      componentName: this.constructor.name
    };
    
    // Envia para seu serviço de monitoramento
    if (process.env.NODE_ENV === 'production') {
      // Exemplo com Sentry
      Sentry.withScope(scope => {
        Object.keys(errorInfo).forEach(key => {
          scope.setExtra(key, errorInfo[key]);
        });
        Sentry.captureException(error);
      });
      
      // Ou envie para sua própria API
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorDetails)
      }).catch(e => console.error('Falha ao registrar erro:', e));
    } else {
      // Em desenvolvimento, apenas registre no console
      console.error('Error caught by boundary:', errorDetails);
    }
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || <h2>Algo deu errado.</h2>;
    }
    
    return this.props.children;
  }
}
```

## Melhores Práticas para Error Boundaries

### 1. Crie uma Error Boundary Reutilizável

Defina uma Error Boundary reutilizável que possa ser usada em toda a sua aplicação:

```jsx
// ErrorBoundary.js
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    // Logging
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    
    // Notificar serviço de monitoramento
    if 
(Content truncated due to size limit. Use line ranges to read in chunks)
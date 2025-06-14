# Hooks Customizados no React

Os Hooks customizados são uma das características mais poderosas do sistema de Hooks do React. Eles permitem extrair lógica com estado de componentes em funções reutilizáveis, facilitando o compartilhamento de comportamento entre diferentes componentes sem duplicação de código.

## Conceito Básico

Um Hook customizado é simplesmente uma função JavaScript cujo nome começa com "use" e que pode chamar outros Hooks. Esta convenção de nomenclatura é importante, pois permite que o linter do React verifique se as regras dos Hooks estão sendo seguidas.

Ao criar um Hook customizado, você está essencialmente extraindo lógica de componente em uma função reutilizável, permitindo:

1. **Reutilização de lógica com estado**: Compartilhar comportamento entre componentes sem componentes de ordem superior (HOCs) ou render props
2. **Composição**: Combinar múltiplos Hooks em um único Hook customizado
3. **Abstração**: Esconder detalhes de implementação complexos atrás de uma API simples
4. **Testabilidade**: Testar lógica de forma isolada, independente dos componentes que a utilizam

## Sintaxe Básica

```jsx
import { useState, useEffect } from 'react';

// Hook customizado para gerenciar o estado de um contador
function useContador(valorInicial = 0, passo = 1) {
  // Usa Hooks internos do React
  const [contador, setContador] = useState(valorInicial);
  
  // Funções para manipular o estado
  const incrementar = () => setContador(c => c + passo);
  const decrementar = () => setContador(c => c - passo);
  const resetar = () => setContador(valorInicial);
  
  // Retorna o estado e as funções
  return {
    contador,
    incrementar,
    decrementar,
    resetar
  };
}

// Uso em um componente
function ContadorComponente() {
  const { contador, incrementar, decrementar, resetar } = useContador(10, 2);
  
  return (
    <div>
      <p>Contador: {contador}</p>
      <button onClick={incrementar}>+</button>
      <button onClick={decrementar}>-</button>
      <button onClick={resetar}>Resetar</button>
    </div>
  );
}
```

## Criando Hooks Customizados Úteis

Vamos explorar alguns exemplos de Hooks customizados úteis que você pode criar e usar em seus projetos.

### 1. useLocalStorage

Este Hook permite persistir estado no localStorage do navegador:

```jsx
function useLocalStorage(chave, valorInicial) {
  // Função de inicialização para obter o valor do localStorage
  const [valorArmazenado, setValorArmazenado] = useState(() => {
    try {
      // Tenta obter o valor do localStorage
      const item = window.localStorage.getItem(chave);
      // Retorna o item parseado se existir, ou o valor inicial
      return item ? JSON.parse(item) : valorInicial;
    } catch (erro) {
      console.error(`Erro ao obter item '${chave}' do localStorage:`, erro);
      return valorInicial;
    }
  });
  
  // Função para atualizar o valor no estado e no localStorage
  const setValor = (valor) => {
    try {
      // Suporta função como valor (similar ao setState)
      const valorParaArmazenar = valor instanceof Function ? valor(valorArmazenado) : valor;
      
      // Atualiza o estado
      setValorArmazenado(valorParaArmazenar);
      
      // Atualiza o localStorage
      window.localStorage.setItem(chave, JSON.stringify(valorParaArmazenar));
    } catch (erro) {
      console.error(`Erro ao armazenar item '${chave}' no localStorage:`, erro);
    }
  };
  
  return [valorArmazenado, setValor];
}

// Uso
function ConfiguracoesApp() {
  const [tema, setTema] = useLocalStorage('tema', 'claro');
  const [idioma, setIdioma] = useLocalStorage('idioma', 'pt-BR');
  
  return (
    <div>
      <h2>Configurações</h2>
      
      <div>
        <label>Tema:</label>
        <select
          value={tema}
          onChange={(e) => setTema(e.target.value)}
        >
          <option value="claro">Claro</option>
          <option value="escuro">Escuro</option>
          <option value="sistema">Sistema</option>
        </select>
      </div>
      
      <div>
        <label>Idioma:</label>
        <select
          value={idioma}
          onChange={(e) => setIdioma(e.target.value)}
        >
          <option value="pt-BR">Português</option>
          <option value="en-US">Inglês</option>
          <option value="es">Espanhol</option>
        </select>
      </div>
    </div>
  );
}
```

### 2. useFetch

Este Hook simplifica requisições HTTP e gerenciamento de estados de carregamento e erro:

```jsx
function useFetch(url, opcoes = {}) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [controller, setController] = useState(null);
  
  useEffect(() => {
    // Aborta a requisição anterior se uma nova for iniciada
    if (controller) {
      controller.abort();
    }
    
    // Cria um novo controller para esta requisição
    const abortController = new AbortController();
    setController(abortController);
    
    const fetchDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch(url, {
          ...opcoes,
          signal: abortController.signal
        });
        
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        
        const dadosJson = await resposta.json();
        setDados(dadosJson);
      } catch (erro) {
        // Ignora erros de abort
        if (erro.name !== 'AbortError') {
          setErro(erro.message);
        }
      } finally {
        setCarregando(false);
      }
    };
    
    fetchDados();
    
    // Função de limpeza para abortar a requisição quando o componente desmontar
    return () => {
      abortController.abort();
    };
  }, [url, JSON.stringify(opcoes)]);
  
  // Função para recarregar os dados
  const recarregar = () => {
    if (controller) {
      controller.abort();
    }
    
    const abortController = new AbortController();
    setController(abortController);
    
    setCarregando(true);
    setErro(null);
    
    fetch(url, {
      ...opcoes,
      signal: abortController.signal
    })
      .then(resposta => {
        if (!resposta.ok) {
          throw new Error(`Erro HTTP: ${resposta.status}`);
        }
        return resposta.json();
      })
      .then(dadosJson => {
        setDados(dadosJson);
      })
      .catch(erro => {
        if (erro.name !== 'AbortError') {
          setErro(erro.message);
        }
      })
      .finally(() => {
        setCarregando(false);
      });
  };
  
  return { dados, carregando, erro, recarregar };
}

// Uso
function ListaUsuarios() {
  const { 
    dados: usuarios, 
    carregando, 
    erro, 
    recarregar 
  } = useFetch('https://api.exemplo.com/usuarios');
  
  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro} <button onClick={recarregar}>Tentar novamente</button></p>;
  
  return (
    <div>
      <h2>Usuários</h2>
      <button onClick={recarregar}>Atualizar</button>
      
      <ul>
        {usuarios?.map(usuario => (
          <li key={usuario.id}>{usuario.nome}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 3. useForm

Este Hook simplifica o gerenciamento de formulários:

```jsx
function useForm(valoresIniciais = {}) {
  const [valores, setValores] = useState(valoresIniciais);
  const [erros, setErros] = useState({});
  const [tocado, setTocado] = useState({});
  const [enviando, setEnviando] = useState(false);
  
  // Resetar o formulário
  const resetar = () => {
    setValores(valoresIniciais);
    setErros({});
    setTocado({});
    setEnviando(false);
  };
  
  // Manipular mudanças nos campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setValores(v => ({
      ...v,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Manipular eventos de blur (quando o campo perde o foco)
  const handleBlur = (e) => {
    const { name } = e.target;
    
    setTocado(t => ({
      ...t,
      [name]: true
    }));
  };
  
  // Validar o formulário
  const validar = (validacoes = {}) => {
    const novosErros = {};
    
    // Executa cada função de validação
    Object.entries(validacoes).forEach(([campo, validacao]) => {
      if (typeof validacao === 'function') {
        const mensagemErro = validacao(valores[campo], valores);
        if (mensagemErro) {
          novosErros[campo] = mensagemErro;
        }
      }
    });
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  // Manipular envio do formulário
  const handleSubmit = (onSubmit, validacoes = {}) => {
    return async (e) => {
      e.preventDefault();
      
      // Marca todos os campos como tocados
      const todosTocados = Object.keys(valores).reduce((acc, campo) => {
        acc[campo] = true;
        return acc;
      }, {});
      
      setTocado(todosTocados);
      
      // Valida o formulário
      const formularioValido = validar(validacoes);
      
      if (formularioValido) {
        setEnviando(true);
        
        try {
          await onSubmit(valores);
        } catch (erro) {
          console.error('Erro ao enviar formulário:', erro);
        } finally {
          setEnviando(false);
        }
      }
    };
  };
  
  return {
    valores,
    erros,
    tocado,
    enviando,
    handleChange,
    handleBlur,
    handleSubmit,
    resetar,
    setValores
  };
}

// Uso
function FormularioCadastro() {
  const {
    valores,
    erros,
    tocado,
    enviando,
    handleChange,
    handleBlur,
    handleSubmit,
    resetar
  } = useForm({
    nome: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
    termos: false
  });
  
  // Funções de validação
  const validacoes = {
    nome: (valor) => !valor ? 'Nome é obrigatório' : null,
    email: (valor) => {
      if (!valor) return 'Email é obrigatório';
      if (!/\S+@\S+\.\S+/.test(valor)) return 'Email inválido';
      return null;
    },
    senha: (valor) => {
      if (!valor) return 'Senha é obrigatória';
      if (valor.length < 6) return 'Senha deve ter pelo menos 6 caracteres';
      return null;
    },
    confirmacaoSenha: (valor, todos) => {
      if (!valor) return 'Confirmação de senha é obrigatória';
      if (valor !== todos.senha) return 'Senhas não coincidem';
      return null;
    },
    termos: (valor) => !valor ? 'Você deve aceitar os termos' : null
  };
  
  const enviarFormulario = async (dados) => {
    // Simulação de envio para API
    console.log('Enviando dados:', dados);
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Cadastro realizado com sucesso!');
    resetar();
  };
  
  return (
    <form onSubmit={handleSubmit(enviarFormulario, validacoes)}>
      <h2>Cadastro</h2>
      
      <div>
        <label htmlFor="nome">Nome</label>
        <input
          id="nome"
          name="nome"
          value={valores.nome}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {tocado.nome && erros.nome && (
          <span className="erro">{erros.nome}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={valores.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {tocado.email && erros.email && (
          <span className="erro">{erros.email}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="senha">Senha</label>
        <input
          id="senha"
          name="senha"
          type="password"
          value={valores.senha}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {tocado.senha && erros.senha && (
          <span className="erro">{erros.senha}</span>
        )}
      </div>
      
      <div>
        <label htmlFor="confirmacaoSenha">Confirmar Senha</label>
        <input
          id="confirmacaoSenha"
          name="confirmacaoSenha"
          type="password"
          value={valores.confirmacaoSenha}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {tocado.confirmacaoSenha && erros.confirmacaoSenha && (
          <span className="erro">{erros.confirmacaoSenha}</span>
        )}
      </div>
      
      <div>
        <label>
          <input
            name="termos"
            type="checkbox"
            checked={valores.termos}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          Aceito os termos e condições
        </label>
        {tocado.termos && erros.termos && (
          <span className="erro">{erros.termos}</span>
        )}
      </div>
      
      <button type="submit" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Cadastrar'}
      </button>
      <button type="button" onClick={resetar}>
        Limpar
      </button>
    </form>
  );
}
```

### 4. useMediaQuery

Este Hook permite responder a media queries CSS:

```jsx
function useMediaQuery(query) {
  // Verifica se estamos no navegador (para SSR)
  const getMatches = (query) => {
    // Retorna true no servidor para evitar problemas de hidratação
    if (typeof window !== 'object') return true;
    return window.matchMedia(query).matches;
  };
  
  const [matches, setMatches] = useState(getMatches(query));
  
  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Define o valor inicial
    setMatches(mediaQuery.matches);
    
    // Callback para quando a media query mudar
    const handler = (event) => setMatches(event.matches);
    
    // Adiciona o listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
    } else {
      // Fallback para navegadores mais antigos
      mediaQuery.addListener(handler);
    }
    
    // Cleanup
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handler);
      } else {
        // Fallback para navegadores mais antigos
        mediaQuery.removeListener(handler);
      }
    };
  }, [query]);
  
  return matches;
}

// Uso
function ComponenteResponsivo() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  return (
    <div className={isDarkMode ? 'tema-escuro' : 'tema-claro'}>
      <h2>Componente Responsivo</h2>
      
      {isMobile && (
        <div className="layout-mobile">
          <p>Visualização Mobile</p>
          {/* Layout específico para mobile */}
        </div>
      )}
      
      {isTablet && (
        <div className="layout-tablet">
          <p>Visualização Tablet</p>
          {/* Layout específico para tablet */}
        </div>
      )}
      
      {isDesktop && (
        <div className="layout-desktop">
          <p>Visualização Desktop</p>
          {/* Layout específico para desktop */}
        </div>
      )}
      
      <p>
        Modo de cor preferido: {isDarkMode ? 'Escuro' : 'Claro'}
      </p>
    </div>
  );
}
```

### 5. useDebounce

Este Hook permite debounce de valores, útil para inputs de busca:

```jsx
function useDebounce(valor, delay) {
  const [valorDebouncado, setValorDebouncado] = useState(valor);
  
  useEffect(() => {
    // Configura o timer para atualizar o valor após o delay
    const timer = setTimeout(() => {
      setValorDebouncado(valor);
    }, delay);
    
    // Limpa o timer se o valor mudar antes do delay
    return () => {
      clearTimeout(timer);
    };
  }, [valor, delay]);
  
  return valorDebouncado;
}

// Uso
function CampoBusca() {
  const [termo, setTermo] = useState('');
  const termoDebouncado = useDebounce(termo, 500); // 500ms de delay
  const [resultados, setR
(Content truncated due to size limit. Use line ranges to read in chunks)
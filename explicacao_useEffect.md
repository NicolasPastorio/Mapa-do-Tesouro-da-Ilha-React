# useEffect no React

O Hook `useEffect` é um dos Hooks fundamentais do React que permite executar efeitos colaterais em componentes funcionais. Efeitos colaterais são operações que afetam algo fora do escopo do componente, como:

- Requisições de dados (data fetching)
- Assinaturas (subscriptions)
- Manipulação manual do DOM
- Logging
- Temporizadores
- Integração com APIs externas

## Conceito Básico

O `useEffect` serve como substituto para os métodos de ciclo de vida em componentes de classe (`componentDidMount`, `componentDidUpdate` e `componentWillUnmount`), mas com uma abordagem unificada e mais declarativa.

A ideia principal é que alguns códigos não devem ser executados durante a renderização, pois podem causar efeitos colaterais. O `useEffect` permite executar esse código após a renderização, quando o DOM já foi atualizado.

## Sintaxe Básica

```jsx
import { useEffect } from 'react';

function MeuComponente() {
  useEffect(() => {
    // Código do efeito colateral
    console.log('Componente renderizado');
    
    // Função de limpeza opcional
    return () => {
      console.log('Limpando efeito');
    };
  }, [/* array de dependências */]);
  
  return <div>Meu Componente</div>;
}
```

O Hook `useEffect` aceita dois argumentos:
1. Uma **função** que contém o código do efeito
2. Um **array de dependências** (opcional) que controla quando o efeito será executado

## Quando o Efeito é Executado?

O comportamento do `useEffect` depende do array de dependências:

### Sem Array de Dependências

```jsx
useEffect(() => {
  console.log('Este efeito é executado após cada renderização');
});
```

Quando você não fornece um array de dependências, o efeito é executado após cada renderização do componente.

### Array de Dependências Vazio

```jsx
useEffect(() => {
  console.log('Este efeito é executado apenas após a primeira renderização');
}, []);
```

Com um array de dependências vazio, o efeito é executado apenas uma vez, após a primeira renderização do componente (similar ao `componentDidMount`).

### Array de Dependências com Valores

```jsx
useEffect(() => {
  console.log(`O contador mudou para: ${contador}`);
}, [contador]);
```

O efeito será executado após a primeira renderização e depois sempre que qualquer valor no array de dependências mudar.

## Função de Limpeza (Cleanup)

O `useEffect` pode retornar uma função que será executada antes que o componente seja removido do DOM ou antes que o efeito seja executado novamente. Esta função é conhecida como "função de limpeza" ou "cleanup function".

```jsx
useEffect(() => {
  // Configurar algo
  console.log('Efeito aplicado');
  
  // Função de limpeza
  return () => {
    console.log('Efeito limpo');
  };
}, [dependencia]);
```

A função de limpeza é útil para:
- Cancelar assinaturas
- Limpar temporizadores
- Remover event listeners
- Liberar recursos

## Casos de Uso Comuns

### 1. Executar Código Apenas Uma Vez (Na Montagem)

```jsx
useEffect(() => {
  console.log('Componente montado');
  // Código que deve ser executado apenas uma vez
  
  return () => {
    console.log('Componente será desmontado');
    // Limpeza quando o componente for desmontado
  };
}, []); // Array de dependências vazio
```

Este padrão é útil para:
- Inicialização única
- Busca de dados inicial
- Configuração de event listeners globais

### 2. Reagir a Mudanças em Props ou Estado

```jsx
useEffect(() => {
  console.log(`O ID mudou para: ${id}`);
  // Buscar dados com base no novo ID
  fetchDados(id);
}, [id]); // Executa quando 'id' muda
```

Este padrão é útil para:
- Buscar dados quando props mudam
- Sincronizar com sistemas externos
- Executar cálculos caros quando dependências específicas mudam

### 3. Limpeza ao Desmontar

```jsx
useEffect(() => {
  const subscription = dataSource.subscribe();
  
  return () => {
    subscription.unsubscribe();
  };
}, []);
```

Este padrão é útil para:
- Cancelar assinaturas
- Limpar temporizadores
- Remover event listeners

### 4. Atualizar o Título da Página

```jsx
useEffect(() => {
  document.title = `${contador} novos itens`;
}, [contador]);
```

### 5. Busca de Dados (Data Fetching)

```jsx
function PerfilUsuario({ userId }) {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const buscarUsuario = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch(`https://api.exemplo.com/usuarios/${userId}`);
        
        if (!resposta.ok) {
          throw new Error('Falha ao buscar dados do usuário');
        }
        
        const dados = await resposta.json();
        setUsuario(dados);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarUsuario();
  }, [userId]); // Re-executa quando userId mudar
  
  if (carregando) return <p>Carregando...</p>;
  if (erro) return <p>Erro: {erro}</p>;
  if (!usuario) return <p>Nenhum usuário encontrado</p>;
  
  return (
    <div>
      <h1>{usuario.nome}</h1>
      <p>Email: {usuario.email}</p>
      <p>Telefone: {usuario.telefone}</p>
    </div>
  );
}
```

### 6. Event Listeners

```jsx
function TamanhoJanela() {
  const [dimensoes, setDimensoes] = useState({
    largura: window.innerWidth,
    altura: window.innerHeight
  });
  
  useEffect(() => {
    const handleResize = () => {
      setDimensoes({
        largura: window.innerWidth,
        altura: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Função de limpeza para remover o event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Array vazio = executar apenas uma vez
  
  return (
    <div>
      <p>Largura da janela: {dimensoes.largura}px</p>
      <p>Altura da janela: {dimensoes.altura}px</p>
    </div>
  );
}
```

### 7. Temporizadores e Intervalos

```jsx
function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [ativo, setAtivo] = useState(false);
  
  useEffect(() => {
    let intervalo = null;
    
    if (ativo) {
      intervalo = setInterval(() => {
        setSegundos(segundosAnteriores => segundosAnteriores + 1);
      }, 1000);
    }
    
    // Limpa o intervalo quando o componente desmontar ou quando 'ativo' mudar
    return () => {
      if (intervalo) {
        clearInterval(intervalo);
      }
    };
  }, [ativo]);
  
  return (
    <div>
      <p>Tempo: {segundos} segundos</p>
      <button onClick={() => setAtivo(!ativo)}>
        {ativo ? 'Pausar' : 'Iniciar'}
      </button>
      <button onClick={() => setSegundos(0)}>Resetar</button>
    </div>
  );
}
```

## Ordem de Execução

É importante entender a ordem em que os efeitos são executados:

1. React renderiza o componente com os valores iniciais
2. React atualiza o DOM
3. O navegador pinta a tela
4. React executa os efeitos do `useEffect`

Se um efeito atualiza o estado, isso aciona uma nova renderização, e o ciclo se repete.

## Múltiplos useEffect

Você pode usar múltiplos `useEffect` em um único componente para separar preocupações:

```jsx
function PerfilUsuario({ userId }) {
  // Estado para dados do usuário
  const [usuario, setUsuario] = useState(null);
  
  // Estado para preferências do usuário
  const [preferencias, setPreferencias] = useState(null);
  
  // Efeito para buscar dados do usuário
  useEffect(() => {
    fetchUsuario(userId).then(setUsuario);
  }, [userId]);
  
  // Efeito separado para buscar preferências
  useEffect(() => {
    if (usuario) {
      fetchPreferencias(usuario.preferenciaId).then(setPreferencias);
    }
  }, [usuario]);
  
  // Efeito para atualizar o título da página
  useEffect(() => {
    if (usuario) {
      document.title = `Perfil de ${usuario.nome}`;
    } else {
      document.title = 'Carregando perfil...';
    }
    
    return () => {
      document.title = 'Meu App';
    };
  }, [usuario]);
  
  // Resto do componente...
}
```

Esta abordagem torna o código mais organizado e mais fácil de entender, pois cada efeito tem uma responsabilidade clara.

## Problemas Comuns e Soluções

### 1. Loop Infinito

Um erro comum é atualizar o estado dentro de um `useEffect` sem especificar dependências corretamente:

```jsx
// ❌ Loop infinito!
useEffect(() => {
  setContador(contador + 1);
}); // Sem array de dependências
```

Neste exemplo, o efeito atualiza o estado, o que aciona uma nova renderização, que executa o efeito novamente, e assim por diante.

**Solução**: Adicione as dependências corretas ou use um array vazio se o efeito deve ser executado apenas uma vez:

```jsx
// ✅ Executa apenas uma vez
useEffect(() => {
  setContador(c => c + 1);
}, []); // Array vazio
```

### 2. Dependências Ausentes

O ESLint com o plugin `eslint-plugin-react-hooks` alertará sobre dependências ausentes:

```jsx
// ⚠️ Alerta do ESLint: 'contador' está ausente no array de dependências
useEffect(() => {
  console.log(contador);
}, []); // Deveria incluir 'contador'
```

**Solução**: Adicione todas as variáveis usadas no efeito ao array de dependências:

```jsx
// ✅ Correto
useEffect(() => {
  console.log(contador);
}, [contador]);
```

### 3. Dependências Mutáveis

Objetos e arrays criados durante a renderização são recriados a cada renderização, o que pode causar execuções desnecessárias do efeito:

```jsx
// ❌ O objeto options é recriado a cada renderização
const options = { id: userId, page: currentPage };

useEffect(() => {
  fetchData(options);
}, [options]); // 'options' muda em cada renderização
```

**Solução**: Use as propriedades primitivas como dependências ou use `useMemo` para memoizar o objeto:

```jsx
// ✅ Dependências primitivas
useEffect(() => {
  fetchData({ id: userId, page: currentPage });
}, [userId, currentPage]);

// OU

// ✅ Objeto memoizado
const options = useMemo(() => {
  return { id: userId, page: currentPage };
}, [userId, currentPage]);

useEffect(() => {
  fetchData(options);
}, [options]);
```

### 4. Funções como Dependências

Funções definidas dentro do componente também são recriadas a cada renderização:

```jsx
// ❌ getData é recriada a cada renderização
function MeuComponente({ userId }) {
  const getData = () => {
    return fetch(`/api/user/${userId}`);
  };
  
  useEffect(() => {
    getData().then(/* ... */);
  }, [getData]); // Causa re-execução em cada renderização
}
```

**Solução**: Use `useCallback` para memoizar a função ou defina a função dentro do efeito:

```jsx
// ✅ Função memoizada
const getData = useCallback(() => {
  return fetch(`/api/user/${userId}`);
}, [userId]);

useEffect(() => {
  getData().then(/* ... */);
}, [getData]);

// OU

// ✅ Função definida dentro do efeito
useEffect(() => {
  const getData = () => {
    return fetch(`/api/user/${userId}`);
  };
  
  getData().then(/* ... */);
}, [userId]);
```

## Padrões Avançados

### 1. Busca de Dados com Cancelamento

```jsx
function BuscaDados({ query }) {
  const [resultados, setResultados] = useState([]);
  const [carregando, setCarregando] = useState(false);
  
  useEffect(() => {
    let cancelado = false;
    
    const buscar = async () => {
      setCarregando(true);
      
      try {
        const resposta = await fetch(`/api/search?q=${query}`);
        const dados = await resposta.json();
        
        if (!cancelado) {
          setResultados(dados);
        }
      } catch (erro) {
        if (!cancelado) {
          console.error('Erro na busca:', erro);
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    };
    
    buscar();
    
    return () => {
      cancelado = true;
    };
  }, [query]);
  
  // Resto do componente...
}
```

### 2. Debounce de Inputs

```jsx
function CampoBusca() {
  const [termo, setTermo] = useState('');
  const [termoDebouncado, setTermoDebouncado] = useState('');
  
  // Atualiza o termo quando o usuário digita
  const handleChange = (e) => {
    setTermo(e.target.value);
  };
  
  // Debounce do termo de busca
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTermoDebouncado(termo);
    }, 500); // Espera 500ms após a última digitação
    
    return () => {
      clearTimeout(timeoutId);
    };
  }, [termo]);
  
  // Efeito que realiza a busca com o termo debouncado
  useEffect(() => {
    if (termoDebouncado) {
      // Realizar busca com termoDebouncado
      console.log('Buscando por:', termoDebouncado);
    }
  }, [termoDebouncado]);
  
  return (
    <input
      type="text"
      value={termo}
      onChange={handleChange}
      placeholder="Buscar..."
    />
  );
}
```

### 3. Persistência de Dados no localStorage

```jsx
function AppComPersistencia() {
  // Carrega o estado inicial do localStorage ou usa o valor padrão
  const [preferencias, setPreferencias] = useState(() => {
    const salvo = localStorage.getItem('preferencias');
    return salvo ? JSON.parse(salvo) : { tema: 'claro', idioma: 'pt-BR' };
  });
  
  // Salva no localStorage quando as preferências mudam
  useEffect(() => {
    localStorage.setItem('preferencias', JSON.stringify(preferencias));
  }, [preferencias]);
  
  // Resto do componente...
}
```

### 4. Observador de Interseção (Intersection Observer)

```jsx
function ImagemLazyLoad({ src, alt }) {
  const [carregada, setCarregada] = useState(false);
  const [visivel, setVisivel] = useState(false);
  const ref = useRef();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);
  
  return (
    <div ref={ref} className="imagem-container">
      {visivel ? (
        <img
          src={src}
          alt={alt}
          className={`imagem ${carregada ? 'carregada' : 'carregando'}`}
          onLoad={() => setCarregada(true)}
        />
      ) : (
        <div className="placeholder" />
      )}
    </div>
  );
}
```

## useEffect vs. useLayoutEffect

O React fornece outro Hook similar ao `useEffect` chamado `useLayoutEffect`. A principal diferença está no momento em que eles são executados:

- **useEffect**: Executado assincronamente após a renderização e depois que o navegador pintou a tela
- **useLayoutEffect**: Executado sincronamente após a renderização, mas antes que o navegador pinte a tela

```jsx
// Executado após a pintura do navegador
useEffect(() => {
  console.log('useEffect executado');
}, []);

// Executado antes da pintura do navegador
useLayoutEffect(() => {
  console.log('useLayoutEffect executado');
}, []);
```

Use `useLayoutEffect` quando seu efeito precisa medir elementos do DOM ou fazer alterações visuais que devem ser aplicadas antes que o usuário veja a tela atualizada. Para a maioria dos casos, `useEffect` é a escolha correta.

## Boas Práticas

1. **Mantenha os efeitos pequenos e focados**: Cada efeito deve ter uma única responsabilidade.

2. **Separe efeitos não relacionados**: Use múltiplos `useEffect` para separar lógicas não relacionadas.

3. **Inclua todas as dependências necessárias**: Não omita dependências do array de dependências.

4. **Use a função de limpeza**: Sempre limpe recursos como temporizadores, assinaturas e event listeners.

5. **Evite efeitos desnecessários**: Considere se o código realmente precisa ser um efeito ou se pode ser executado durante a renderização.

6. **Extraia lógica complexa para Hooks customizados**: Se a lógica do efeito é complexa ou reutilizável, considere criar um Hook customizado.

7. **Evite atualizações de estado desnecessárias**: Verifique se o valor realmente mudou antes de atualizar o estado dentro de um efeito.

8. **Use ESLint com o plugin react-hooks**: Este plugin ajuda 
(Content truncated due to size limit. Use line ranges to read in chunks)
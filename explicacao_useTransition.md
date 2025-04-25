# useTransition

## Introdução

O hook `useTransition` é uma poderosa ferramenta do React que permite renderizar partes da interface do usuário em segundo plano, sem bloquear a interação do usuário com a aplicação. Este hook foi projetado para melhorar a experiência do usuário durante atualizações de estado que podem ser computacionalmente intensivas, permitindo que a interface permaneça responsiva mesmo durante operações pesadas.

## Sintaxe Básica

```jsx
import { useTransition } from 'react';

function MeuComponente() {
  const [isPending, startTransition] = useTransition();
  
  // Uso do startTransition para marcar atualizações como transições
  function handleClick() {
    startTransition(() => {
      // Atualizações de estado aqui serão tratadas como transições
      setAlgumEstado(novoValor);
    });
  }
  
  // Uso do isPending para mostrar estados visuais de carregamento
  return (
    <div>
      {isPending && <p>Atualizando...</p>}
      <button onClick={handleClick}>Atualizar</button>
      <ComponentePesado estado={algumEstado} />
    </div>
  );
}
```

## Valores Retornados

O hook `useTransition` retorna um array com exatamente dois itens:

1. **isPending**: Um booleano que indica se há uma transição pendente. Útil para mostrar estados de carregamento.
2. **startTransition**: Uma função que permite marcar atualizações de estado como transições.

## Propósito e Casos de Uso

### 1. Atualizações Não-Bloqueantes

O principal propósito do `useTransition` é permitir atualizações não-bloqueantes na interface do usuário. Quando você marca uma atualização de estado como uma transição, o React trata essa atualização como de baixa prioridade, permitindo que outras atualizações mais urgentes (como entrada do usuário) sejam processadas primeiro.

```jsx
function PesquisaAvancada() {
  const [consulta, setConsulta] = useState('');
  const [resultados, setResultados] = useState([]);
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    // Atualização de alta prioridade - acontece imediatamente
    setConsulta(e.target.value);
    
    // Atualização de baixa prioridade - pode ser interrompida
    startTransition(() => {
      // Operação potencialmente cara
      const novosResultados = buscarResultados(e.target.value);
      setResultados(novosResultados);
    });
  }
  
  return (
    <div>
      <input value={consulta} onChange={handleChange} />
      {isPending ? <p>Buscando resultados...</p> : null}
      <ListaResultados resultados={resultados} />
    </div>
  );
}
```

Neste exemplo, a atualização do campo de entrada é tratada como de alta prioridade, enquanto a busca e exibição de resultados é tratada como uma transição de baixa prioridade. Isso garante que a digitação do usuário permaneça fluida, mesmo que a busca de resultados seja uma operação pesada.

### 2. Exibição de Estados Visuais Pendentes

O flag `isPending` permite que você mostre indicadores visuais enquanto uma transição está em andamento, melhorando a experiência do usuário ao fornecer feedback sobre operações em andamento.

```jsx
function TrocaDeAba() {
  const [abaAtual, setAbaAtual] = useState('inicio');
  const [isPending, startTransition] = useTransition();
  
  function selecionarAba(aba) {
    startTransition(() => {
      setAbaAtual(aba);
    });
  }
  
  return (
    <div>
      <nav>
        {['inicio', 'perfil', 'configuracoes'].map(aba => (
          <button 
            key={aba}
            onClick={() => selecionarAba(aba)}
            style={{
              fontWeight: abaAtual === aba ? 'bold' : 'normal',
              opacity: isPending ? 0.7 : 1
            }}
          >
            {aba}
            {isPending && abaAtual !== aba && '...'}
          </button>
        ))}
      </nav>
      
      <div className="conteudo">
        {isPending && <div className="overlay-carregando">Carregando...</div>}
        <ConteudoAba aba={abaAtual} />
      </div>
    </div>
  );
}
```

### 3. Prevenção de Indicadores de Carregamento Indesejados

Quando usado em conjunto com o Suspense do React, o `useTransition` pode evitar que indicadores de carregamento (fallbacks) sejam exibidos para atualizações rápidas, resultando em uma experiência mais suave.

```jsx
function Perfil({ userId }) {
  const [id, setId] = useState(userId);
  const [isPending, startTransition] = useTransition();
  
  function mostrarOutroUsuario(novoId) {
    startTransition(() => {
      setId(novoId);
    });
  }
  
  return (
    <div>
      <ProfileSelector onChange={mostrarOutroUsuario} />
      {isPending && <p>Carregando perfil...</p>}
      <Suspense fallback={<h2>Carregando dados do perfil...</h2>}>
        <PerfilUsuario id={id} />
      </Suspense>
    </div>
  );
}
```

Neste exemplo, ao marcar a atualização de ID como uma transição, o React não mostrará o fallback do Suspense para atualizações rápidas, evitando o "flash" de estados de carregamento para transições rápidas.

### 4. Construção de Roteadores com Suporte a Suspense

O `useTransition` é particularmente útil para implementar roteadores que funcionam bem com o Suspense do React, permitindo transições suaves entre páginas.

```jsx
function Roteador() {
  const [pagina, setPagina] = useState('home');
  const [isPending, startTransition] = useTransition();
  
  function navegarPara(novaPagina) {
    startTransition(() => {
      setPagina(novaPagina);
    });
  }
  
  return (
    <div>
      <nav>
        <button onClick={() => navegarPara('home')}>Home</button>
        <button onClick={() => navegarPara('sobre')}>Sobre</button>
        <button onClick={() => navegarPara('contato')}>Contato</button>
      </nav>
      
      {isPending && <div className="indicador-navegacao">Navegando...</div>}
      
      <Suspense fallback={<div>Carregando página...</div>}>
        <Pagina nome={pagina} />
      </Suspense>
    </div>
  );
}
```

## Conceito de "Actions" (Ações)

No contexto do `useTransition`, a função passada para `startTransition` é chamada de "Action" (Ação). Por convenção, qualquer callback chamado dentro de `startTransition` (como uma prop de callback) deve ser nomeado `action` ou incluir o sufixo "Action":

```jsx
function BotaoEnviar({ submitAction }) {
  const [isPending, startTransition] = useTransition();
  
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          submitAction();
        });
      }}
    >
      {isPending ? 'Enviando...' : 'Enviar'}
    </button>
  );
}
```

## Limitações e Considerações

### 1. Não Pode Ser Usado para Controlar Inputs de Texto

As atualizações de estado marcadas como transições não podem ser usadas para controlar inputs de texto. Isso ocorre porque as transições são de baixa prioridade, e os inputs de texto precisam de atualizações síncronas para manter a experiência de digitação fluida.

```jsx
// ❌ Isso não funcionará corretamente
function InputProblematico() {
  const [texto, setTexto] = useState('');
  const [isPending, startTransition] = useTransition();
  
  return (
    <input
      value={texto}
      onChange={e => {
        startTransition(() => {
          setTexto(e.target.value); // Problema: o input ficará lento
        });
      }}
    />
  );
}

// ✅ Abordagem correta
function InputCorreto() {
  const [texto, setTexto] = useState('');
  const [resultadoProcessado, setResultadoProcessado] = useState('');
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    const novoTexto = e.target.value;
    setTexto(novoTexto); // Atualização de alta prioridade
    
    startTransition(() => {
      // Processamento pesado em uma transição
      setResultadoProcessado(processarTexto(novoTexto));
    });
  }
  
  return (
    <>
      <input value={texto} onChange={handleChange} />
      {isPending ? <p>Processando...</p> : <p>Resultado: {resultadoProcessado}</p>}
    </>
  );
}
```

### 2. Execução Imediata da Função

A função que você passa para `startTransition` é chamada imediatamente, marcando todas as atualizações de estado que ocorrem durante sua execução como transições. Se você tentar realizar atualizações de estado em um `setTimeout`, por exemplo, elas não serão marcadas como transições.

```jsx
// ❌ Isso não funcionará como esperado
startTransition(() => {
  setTimeout(() => {
    setEstado(novoValor); // Não será tratado como uma transição
  }, 1000);
});

// ✅ Abordagem correta
setTimeout(() => {
  startTransition(() => {
    setEstado(novoValor); // Será tratado como uma transição
  });
}, 1000);
```

### 3. Atualizações Após Operações Assíncronas

Atualmente, você deve envolver quaisquer atualizações de estado após chamadas assíncronas em outro `startTransition` para marcá-las como transições. Esta é uma limitação conhecida que deve ser corrigida em versões futuras do React.

```jsx
// ❌ Atualizações após await não são automaticamente transições
startTransition(async () => {
  const dados = await fetchDados();
  setDados(dados); // Não será tratado como uma transição
});

// ✅ Abordagem correta
startTransition(async () => {
  const dados = await fetchDados();
  startTransition(() => {
    setDados(dados); // Será tratado como uma transição
  });
});
```

### 4. Múltiplas Transições Simultâneas

Se houver várias transições em andamento, o React atualmente as agrupa. Esta é uma limitação que pode ser removida em uma versão futura.

## Comparação com useDeferredValue

O React oferece dois hooks principais para priorização de renderização: `useTransition` e `useDeferredValue`. Embora relacionados, eles têm propósitos ligeiramente diferentes:

### useTransition
- Marca atualizações inteiras como de baixa prioridade
- Útil quando você tem controle sobre o código que inicia a atualização
- Fornece um flag `isPending` para mostrar estados de carregamento
- Ideal para transições de estado que podem causar renderizações pesadas

### useDeferredValue
- Adia a atualização de um valor específico
- Útil quando você não tem controle direto sobre a fonte da atualização
- Não fornece um flag de pendência (você precisa comparar valores)
- Ideal para adiar a renderização de partes específicas da UI

```jsx
// Com useTransition
function ComponenteComTransicao() {
  const [valor, setValor] = useState('');
  const [isPending, startTransition] = useTransition();
  
  const handleChange = e => {
    // A atualização do input é prioritária
    setValor(e.target.value);
    
    // A atualização de outros estados é de baixa prioridade
    startTransition(() => {
      setOutroEstado(calcularAlgoComBaseNoValor(e.target.value));
    });
  };
  
  return (
    <>
      <input onChange={handleChange} />
      {isPending ? <p>Atualizando...</p> : null}
      <ComponentePesado valor={valor} outroEstado={outroEstado} />
    </>
  );
}

// Com useDeferredValue
function ComponenteComValorAdiado() {
  const [valor, setValor] = useState('');
  const valorAdiado = useDeferredValue(valor);
  
  // Verifica se estamos mostrando conteúdo desatualizado
  const isStale = valor !== valorAdiado;
  
  return (
    <>
      <input onChange={e => setValor(e.target.value)} />
      {isStale ? <p>Atualizando...</p> : null}
      <ComponentePesado valor={valorAdiado} />
    </>
  );
}
```

## Exemplos Práticos

### Exemplo 1: Filtro de Lista com Transição

```jsx
import { useState, useTransition } from 'react';

function ListaFiltravel({ itens }) {
  const [filtro, setFiltro] = useState('');
  const [itensFiltrados, setItensFiltrados] = useState(itens);
  const [isPending, startTransition] = useTransition();
  
  function handleFiltroChange(e) {
    const novoFiltro = e.target.value;
    
    // Atualiza o input imediatamente (alta prioridade)
    setFiltro(novoFiltro);
    
    // Filtra os itens em uma transição (baixa prioridade)
    startTransition(() => {
      const resultados = itens.filter(item => 
        item.toLowerCase().includes(novoFiltro.toLowerCase())
      );
      setItensFiltrados(resultados);
    });
  }
  
  return (
    <div>
      <input 
        value={filtro} 
        onChange={handleFiltroChange} 
        placeholder="Filtrar itens..." 
      />
      
      {isPending ? (
        <p>Atualizando lista...</p>
      ) : (
        <p>{itensFiltrados.length} itens encontrados</p>
      )}
      
      <ul style={{ opacity: isPending ? 0.7 : 1 }}>
        {itensFiltrados.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Exemplo 2: Navegação entre Abas com Transição

```jsx
import { useState, useTransition, Suspense } from 'react';

// Componentes de conteúdo que podem suspender
const ConteudoInicio = React.lazy(() => import('./ConteudoInicio'));
const ConteudoPerfil = React.lazy(() => import('./ConteudoPerfil'));
const ConteudoConfig = React.lazy(() => import('./ConteudoConfig'));

function NavegacaoAbas() {
  const [abaAtual, setAbaAtual] = useState('inicio');
  const [isPending, startTransition] = useTransition();
  
  const conteudos = {
    inicio: <ConteudoInicio />,
    perfil: <ConteudoPerfil />,
    config: <ConteudoConfig />
  };
  
  function trocarAba(aba) {
    startTransition(() => {
      setAbaAtual(aba);
    });
  }
  
  return (
    <div className="app-container">
      <nav className="tabs">
        {Object.keys(conteudos).map(aba => (
          <button
            key={aba}
            onClick={() => trocarAba(aba)}
            className={`tab ${abaAtual === aba ? 'active' : ''}`}
            style={{
              opacity: isPending ? 0.7 : 1,
              position: 'relative'
            }}
          >
            {aba.charAt(0).toUpperCase() + aba.slice(1)}
            {isPending && abaAtual !== aba && (
              <span className="loading-indicator" />
            )}
          </button>
        ))}
      </nav>
      
      <div className="content-area">
        {isPending && (
          <div className="transition-overlay">
            Carregando conteúdo...
          </div>
        )}
        
        <Suspense fallback={<div>Carregando...</div>}>
          {conteudos[abaAtual]}
        </Suspense>
      </div>
    </div>
  );
}
```

### Exemplo 3: Formulário com Validação em Tempo Real

```jsx
import { useState, useTransition } from 'react';

function validarFormulario(valores) {
  // Simulando uma validação pesada
  let erros = {};
  
  // Simula um processamento pesado
  const inicio = Date.now();
  while (Date.now() - inicio < 100) {
    // Bloqueia o thread por 100ms para simular trabalho pesado
  }
  
  if (!valores.nome) {
    erros.nome = 'Nome é obrigatório';
  } else if (valores.nome.length < 3) {
    erros.nome = 'Nome deve ter pelo menos 3 caracteres';
  }
  
  if (!valores.email) {
    erros.email = 'Email é obrigatório';
  } else if (!/\S+@\S+\.\S+/.test(valores.email)) {
    erros.email = 'Email inválido';
  }
  
  if (!valores.senha) {
    erros.senha = 'Senha é obrigatória';
  } else if (valores.senha.length < 6) {
    erros.senha = 'Senha deve ter pelo menos 6 caracteres';
  }
  
  return erros;
}

function FormularioComValidacao() {
  const [valores, setValores] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  
  const [erros, setErros] = useState({});
  const [isPending, startTransition] = useTransition();
  
  function handleChange(e) {
    const { name, value } = e.target;
    
    // Atualiza o campo imediatamente (alta prioridade)
    setValores(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Valida o formulário em uma transição (baixa prioridade)
    startTransition(() => {
      const novosValores = { ...valores, [name]: value };
      const novosErros = validarFormulario(novosValores);
      setErros(novosErros);
    });
  }
  
  function handleSubmit(e) {
    e.preventDefault();
    const novosErros = validarFormulario(valores);
    setErros(novosErros);
    
    if (Object.keys(novosErros).length === 0) {
      alert('Formulário enviado com sucesso!');
    }
 
(Content truncated due to size limit. Use line ranges to read in chunks)
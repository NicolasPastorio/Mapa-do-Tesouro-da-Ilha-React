# Renderização Condicional no React

A renderização condicional é uma técnica fundamental no React que permite exibir diferentes elementos ou componentes com base em determinadas condições. Isso é essencial para criar interfaces de usuário dinâmicas que respondem ao estado da aplicação e às interações do usuário.

## O que é Renderização Condicional?

Renderização condicional é o processo de mostrar diferentes conteúdos dependendo de condições específicas. No React, isso é feito usando as mesmas estruturas de controle de fluxo que você usaria em JavaScript regular, como instruções `if`, operador ternário e operador lógico `&&`.

## Métodos de Renderização Condicional

### 1. Usando if/else em JavaScript

A forma mais básica de renderização condicional é usar declarações `if/else` fora do JSX:

```jsx
function SaudacaoUsuario({ estaLogado, nomeUsuario }) {
  if (estaLogado) {
    return <h1>Bem-vindo de volta, {nomeUsuario}!</h1>;
  } else {
    return <h1>Por favor, faça login.</h1>;
  }
}

// Uso:
<SaudacaoUsuario estaLogado={true} nomeUsuario="Maria" />
```

Este método é útil quando você precisa renderizar componentes completamente diferentes com base em uma condição.

### 2. Usando o Operador Ternário

O operador ternário (`condição ? expressão1 : expressão2`) é uma forma mais concisa de expressar condicionais diretamente no JSX:

```jsx
function SaudacaoUsuario({ estaLogado, nomeUsuario }) {
  return (
    <div>
      <h1>
        {estaLogado 
          ? `Bem-vindo de volta, ${nomeUsuario}!` 
          : 'Por favor, faça login.'}
      </h1>
    </div>
  );
}
```

O operador ternário é ideal para condicionais simples dentro do JSX, especialmente quando você quer alternar entre dois elementos ou valores.

### 3. Usando o Operador Lógico &&

O operador lógico `&&` é útil quando você quer renderizar um elemento apenas se uma condição for verdadeira, sem necessidade de uma alternativa:

```jsx
function NotificacaoMensagens({ temMensagens, quantidadeMensagens }) {
  return (
    <div>
      <h1>Painel do Usuário</h1>
      {temMensagens && (
        <p>Você tem {quantidadeMensagens} mensagens não lidas.</p>
      )}
    </div>
  );
}

// Uso:
<NotificacaoMensagens temMensagens={true} quantidadeMensagens={5} />
```

Como o JavaScript avalia expressões da esquerda para a direita e para de avaliar assim que encontra uma expressão falsa (short-circuit evaluation), se `temMensagens` for `false`, o React não tentará renderizar o elemento `<p>`.

### 4. Atribuindo Elementos a Variáveis

Você pode atribuir elementos JSX a variáveis e então usar essas variáveis no seu JSX:

```jsx
function Painel({ isAdmin, conteudo }) {
  let botaoAcao;
  
  if (isAdmin) {
    botaoAcao = <button>Editar Conteúdo</button>;
  } else {
    botaoAcao = <button>Visualizar Detalhes</button>;
  }
  
  return (
    <div>
      <h1>{conteudo.titulo}</h1>
      <p>{conteudo.descricao}</p>
      {botaoAcao}
    </div>
  );
}
```

Este método é útil quando a lógica condicional é mais complexa ou quando você precisa determinar vários elementos com base em diferentes condições.

### 5. Usando Funções para Encapsular Lógica Condicional

Para lógica condicional mais complexa, você pode extrair a lógica para funções separadas:

```jsx
function StatusPedido({ status }) {
  const renderizarStatus = () => {
    switch (status) {
      case 'pendente':
        return <span className="status pendente">Pendente</span>;
      case 'processando':
        return <span className="status processando">Processando</span>;
      case 'enviado':
        return <span className="status enviado">Enviado</span>;
      case 'entregue':
        return <span className="status entregue">Entregue</span>;
      case 'cancelado':
        return <span className="status cancelado">Cancelado</span>;
      default:
        return <span className="status desconhecido">Status Desconhecido</span>;
    }
  };
  
  return (
    <div className="pedido">
      <h2>Status do Pedido:</h2>
      {renderizarStatus()}
    </div>
  );
}
```

Este método é particularmente útil quando você tem múltiplas condições ou quando a lógica de renderização é complexa demais para ser expressa diretamente no JSX.

## Casos de Uso Comuns

### 1. Exibição Condicional de Componentes

```jsx
function Aplicacao({ isLogado }) {
  return (
    <div>
      {isLogado ? <PainelUsuario /> : <TelaLogin />}
    </div>
  );
}
```

### 2. Renderização Condicional de Elementos UI

```jsx
function Botao({ isSubmitting }) {
  return (
    <button disabled={isSubmitting}>
      {isSubmitting ? 'Enviando...' : 'Enviar'}
    </button>
  );
}
```

### 3. Exibição de Mensagens de Erro

```jsx
function CampoFormulario({ valor, erro, onChange }) {
  return (
    <div>
      <input 
        value={valor}
        onChange={onChange}
        className={erro ? 'input-erro' : ''}
      />
      {erro && <p className="mensagem-erro">{erro}</p>}
    </div>
  );
}
```

### 4. Alternância de Classes CSS

```jsx
function Item({ isAtivo, onClick, texto }) {
  return (
    <li 
      className={isAtivo ? 'item ativo' : 'item'}
      onClick={onClick}
    >
      {texto}
    </li>
  );
}
```

### 5. Renderização Baseada em Permissões

```jsx
function BotaoAcao({ usuario, recurso }) {
  const podeEditar = usuario.permissoes.includes(`editar:${recurso}`);
  const podeExcluir = usuario.permissoes.includes(`excluir:${recurso}`);
  
  return (
    <div className="acoes">
      {podeEditar && <button className="editar">Editar</button>}
      {podeExcluir && <button className="excluir">Excluir</button>}
      {!podeEditar && !podeExcluir && <p>Sem permissões para este recurso</p>}
    </div>
  );
}
```

## Técnicas Avançadas

### 1. Renderização Condicional com Objetos

Você pode usar objetos para mapear condições a elementos:

```jsx
function StatusIndicador({ status }) {
  const statusConfig = {
    sucesso: { texto: 'Operação bem-sucedida', icone: '✅', classe: 'sucesso' },
    erro: { texto: 'Ocorreu um erro', icone: '❌', classe: 'erro' },
    aviso: { texto: 'Atenção necessária', icone: '⚠️', classe: 'aviso' },
    info: { texto: 'Informação', icone: 'ℹ️', classe: 'info' }
  };
  
  const config = statusConfig[status] || statusConfig.info;
  
  return (
    <div className={`status-indicador ${config.classe}`}>
      <span className="icone">{config.icone}</span>
      <span className="texto">{config.texto}</span>
    </div>
  );
}
```

### 2. Componentes de Ordem Superior (HOC) para Renderização Condicional

```jsx
function comAutorizacao(WrappedComponent, permissaoNecessaria) {
  return function ComponenteComAutorizacao(props) {
    const { usuario, ...outrasProps } = props;
    
    if (!usuario || !usuario.permissoes.includes(permissaoNecessaria)) {
      return <p>Você não tem permissão para acessar este recurso.</p>;
    }
    
    return <WrappedComponent {...outrasProps} usuario={usuario} />;
  };
}

// Uso:
const PainelAdminComAutorizacao = comAutorizacao(PainelAdmin, 'admin:acesso');
```

### 3. Renderização Condicional com Hooks Personalizados

```jsx
function usePermissao(permissao) {
  const { usuario } = useContext(UsuarioContexto);
  return usuario && usuario.permissoes.includes(permissao);
}

function BotaoAdmin() {
  const podeAcessarAdmin = usePermissao('admin:acesso');
  
  if (!podeAcessarAdmin) {
    return null;
  }
  
  return <button>Acessar Painel Admin</button>;
}
```

### 4. Prevenindo Renderização com null

Retornar `null` de um componente faz com que ele não renderize nada:

```jsx
function ConteudoRestrito({ usuario, children }) {
  if (!usuario || !usuario.assinatura.ativa) {
    return null;
  }
  
  return (
    <div className="conteudo-premium">
      {children}
    </div>
  );
}
```

## Boas Práticas

### 1. Mantenha a Lógica Condicional Simples

Se a lógica condicional ficar muito complexa dentro do JSX, extraia-a para funções auxiliares ou componentes separados.

### 2. Use o Operador Ternário para Condicionais Simples

O operador ternário é ideal para alternâncias simples entre dois estados:

```jsx
// Bom
<button className={isAtivo ? 'ativo' : 'inativo'}>
  {isAtivo ? 'Desativar' : 'Ativar'}
</button>

// Evite ternários aninhados complexos
<div>
  {isLogado 
    ? (temPermissao 
        ? <AdminPainel /> 
        : <UsuarioPainel />)
    : <Login />}
</div>
```

### 3. Use && para Renderização Condicional Simples

O operador `&&` é ideal quando você só precisa renderizar algo se uma condição for verdadeira:

```jsx
// Bom
{temErro && <MensagemErro texto={mensagemErro} />}

// Cuidado com valores que podem ser 0
{contagem && <p>Contagem: {contagem}</p>} // Não renderiza quando contagem é 0
{contagem > 0 && <p>Contagem: {contagem}</p>} // Melhor abordagem
```

### 4. Evite Efeitos Colaterais em Renderização Condicional

Não coloque efeitos colaterais (como chamadas de API ou alterações de estado) dentro de expressões condicionais no JSX:

```jsx
// Ruim
{isNovo && setContador(0)} // Isso causará um loop infinito

// Bom - use useEffect para efeitos colaterais
useEffect(() => {
  if (isNovo) {
    setContador(0);
  }
}, [isNovo]);
```

### 5. Use Componentes para Encapsular Lógica Complexa

Se a lógica condicional for complexa, considere criar componentes separados:

```jsx
// Em vez de:
{status === 'carregando' ? (
  <div className="spinner">
    <div className="spinner-inner"></div>
    <p>Carregando...</p>
  </div>
) : status === 'erro' ? (
  <div className="erro">
    <p>Erro ao carregar dados: {erro.mensagem}</p>
    <button onClick={tentarNovamente}>Tentar novamente</button>
  </div>
) : (
  <div className="conteudo">
    {/* Conteúdo real */}
  </div>
)}

// Melhor:
<StatusConteudo 
  status={status} 
  erro={erro} 
  onTentarNovamente={tentarNovamente}
>
  {/* Conteúdo real */}
</StatusConteudo>
```

### 6. Considere o Uso de Bibliotecas para Casos Complexos

Para lógica condicional muito complexa, considere usar bibliotecas como `react-if` ou padrões como máquinas de estado (com bibliotecas como `xstate`).

## Exemplos Práticos

### Exemplo 1: Formulário com Validação

```jsx
function Formulario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [enviado, setEnviado] = useState(false);
  const [erros, setErros] = useState({});
  
  const validarFormulario = () => {
    const novosErros = {};
    
    if (!email) {
      novosErros.email = 'Email é obrigatório';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      novosErros.email = 'Email inválido';
    }
    
    if (!senha) {
      novosErros.senha = 'Senha é obrigatória';
    } else if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validarFormulario()) {
      // Lógica para enviar o formulário
      setEnviado(true);
    }
  };
  
  return (
    <div>
      {enviado ? (
        <div className="sucesso">
          <h2>Formulário enviado com sucesso!</h2>
          <button onClick={() => setEnviado(false)}>Enviar outro</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="campo">
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              className={erros.email ? 'erro' : ''}
            />
            {erros.email && <p className="mensagem-erro">{erros.email}</p>}
          </div>
          
          <div className="campo">
            <label>Senha:</label>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)}
              className={erros.senha ? 'erro' : ''}
            />
            {erros.senha && <p className="mensagem-erro">{erros.senha}</p>}
          </div>
          
          <button type="submit">Enviar</button>
        </form>
      )}
    </div>
  );
}
```

### Exemplo 2: Componente de Dados com Estados de Carregamento

```jsx
function ListaDados() {
  const [dados, setDados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  
  useEffect(() => {
    const buscarDados = async () => {
      try {
        setCarregando(true);
        setErro(null);
        
        const resposta = await fetch('https://api.exemplo.com/dados');
        
        if (!resposta.ok) {
          throw new Error('Falha ao buscar dados');
        }
        
        const dadosJson = await resposta.json();
        setDados(dadosJson);
      } catch (erro) {
        setErro(erro.message);
      } finally {
        setCarregando(false);
      }
    };
    
    buscarDados();
  }, []);
  
  if (carregando) {
    return <div className="carregando">Carregando dados...</div>;
  }
  
  if (erro) {
    return (
      <div className="erro">
        <p>Erro: {erro}</p>
        <button onClick={() => window.location.reload()}>Tentar novamente</button>
      </div>
    );
  }
  
  if (dados.length === 0) {
    return <div className="vazio">Nenhum dado encontrado.</div>;
  }
  
  return (
    <ul className="lista-dados">
      {dados.map(item => (
        <li key={item.id} className="item-dados">
          <h3>{item.titulo}</h3>
          <p>{item.descricao}</p>
        </li>
      ))}
    </ul>
  );
}
```

A renderização condicional é uma técnica poderosa no React que permite criar interfaces dinâmicas e responsivas. Ao dominar os diferentes métodos de renderização condicional e seguir as boas práticas, você pode criar componentes mais flexíveis, reutilizáveis e fáceis de manter.

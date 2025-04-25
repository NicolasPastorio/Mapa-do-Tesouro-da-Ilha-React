# useOptimistic

## Introdução

O hook `useOptimistic` é uma ferramenta poderosa do React que permite atualizar a interface do usuário de forma otimista enquanto uma operação assíncrona, como uma requisição de rede, está em andamento. Este padrão de "atualização otimista" melhora significativamente a experiência do usuário ao mostrar imediatamente o resultado esperado de uma ação, mesmo antes que a operação seja realmente concluída no servidor.

## Sintaxe Básica

```jsx
import { useOptimistic } from 'react';

function MeuComponente() {
  const [estado, setEstado] = useState(estadoInicial);
  
  const [estadoOtimista, addOptimistic] = useOptimistic(
    estado,
    (estadoAtual, valorOtimista) => {
      // Combinar o estado atual com o valor otimista
      // e retornar o novo estado otimista
      return { ...estadoAtual, ...valorOtimista };
    }
  );
  
  // Usar estadoOtimista para renderização
  // e addOptimistic para criar atualizações otimistas
}
```

## Parâmetros

O hook `useOptimistic` aceita dois parâmetros:

1. **state**: O valor que será retornado inicialmente e sempre que nenhuma ação estiver pendente. Este é o estado "real" ou "confirmado".

2. **updateFn(currentState, optimisticValue)**: Uma função que recebe o estado atual e o valor otimista passado para `addOptimistic`, e retorna o estado otimista resultante. Esta função deve ser pura e é responsável por mesclar o estado atual com o valor otimista.

## Valores Retornados

O hook `useOptimistic` retorna um array com exatamente dois itens:

1. **optimisticState**: O estado otimista resultante. É igual ao `state` original, a menos que uma ação esteja pendente, caso em que será igual ao valor retornado pela função `updateFn`.

2. **addOptimistic**: A função de despacho que você chama quando tem uma atualização otimista. Ela recebe um argumento, `optimisticValue`, de qualquer tipo, e chamará a função `updateFn` com o `state` atual e o `optimisticValue` fornecido.

## Como Funciona

O fluxo de trabalho típico ao usar `useOptimistic` é:

1. O usuário inicia uma ação (por exemplo, envia um formulário)
2. Você chama `addOptimistic` com o valor que espera que seja o resultado da ação
3. A UI é imediatamente atualizada com o estado otimista
4. A operação assíncrona (como uma requisição de rede) é iniciada
5. Quando a operação é concluída com sucesso, o estado real é atualizado
6. Se a operação falhar, o estado otimista é revertido para o estado real

Este padrão cria uma experiência de usuário mais fluida e responsiva, especialmente em aplicações com operações de rede frequentes.

## Casos de Uso

### 1. Formulários com Atualizações Otimistas

O caso de uso mais comum para `useOptimistic` é em formulários onde você deseja mostrar o resultado da submissão imediatamente, antes mesmo que o servidor confirme a operação.

```jsx
import { useState, useOptimistic, useRef } from 'react';
import { enviarMensagem } from './api';

function ChatApp() {
  const [mensagens, setMensagens] = useState([]);
  const formRef = useRef(null);
  
  // Estado otimista para mensagens
  const [mensagensOtimistas, addOptimisticMessage] = useOptimistic(
    mensagens,
    (mensagensAtuais, novaMensagem) => {
      // Adiciona a nova mensagem com um indicador de "enviando"
      return [...mensagensAtuais, { ...novaMensagem, enviando: true }];
    }
  );
  
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const texto = formData.get('mensagem');
    
    if (!texto) return;
    
    const novaMensagem = {
      id: Date.now(),
      texto,
      autor: 'você',
      timestamp: new Date().toISOString()
    };
    
    // Atualiza a UI otimisticamente
    addOptimisticMessage(novaMensagem);
    
    // Limpa o formulário
    formRef.current.reset();
    
    try {
      // Envia a mensagem para o servidor
      const mensagemSalva = await enviarMensagem(novaMensagem);
      
      // Atualiza o estado real com a resposta do servidor
      setMensagens(mensagensAnteriores => [
        ...mensagensAnteriores,
        mensagemSalva
      ]);
    } catch (erro) {
      // Em caso de erro, você pode mostrar uma notificação
      // O estado otimista será revertido automaticamente
      alert('Erro ao enviar mensagem: ' + erro.message);
    }
  }
  
  return (
    <div className="chat-container">
      <div className="mensagens">
        {mensagensOtimistas.map(mensagem => (
          <div 
            key={mensagem.id} 
            className={`mensagem ${mensagem.enviando ? 'enviando' : ''}`}
          >
            <strong>{mensagem.autor}:</strong> {mensagem.texto}
            {mensagem.enviando && <span className="status">Enviando...</span>}
          </div>
        ))}
      </div>
      
      <form ref={formRef} onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="mensagem" 
          placeholder="Digite sua mensagem..." 
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
```

Neste exemplo, quando o usuário envia uma mensagem, ela aparece imediatamente na lista com um indicador "Enviando...", mesmo antes que a requisição ao servidor seja concluída. Isso proporciona feedback instantâneo ao usuário.

### 2. Operações de "Curtir" em Redes Sociais

Outro caso de uso comum é para ações rápidas como "curtir" um post em uma rede social:

```jsx
import { useState, useOptimistic } from 'react';
import { curtirPost, descurtirPost } from './api';

function Post({ post, onUpdate }) {
  const [postAtual, setPostAtual] = useState(post);
  
  const [postOtimista, addOptimisticPost] = useOptimistic(
    postAtual,
    (estado, atualizacao) => ({ ...estado, ...atualizacao })
  );
  
  async function handleLike() {
    const jaCurtiu = postOtimista.curtidoPorVoce;
    const delta = jaCurtiu ? -1 : 1;
    
    // Atualiza otimisticamente
    addOptimisticPost({
      curtidoPorVoce: !jaCurtiu,
      contadorCurtidas: postOtimista.contadorCurtidas + delta
    });
    
    try {
      // Envia a ação para o servidor
      const resultado = jaCurtiu 
        ? await descurtirPost(post.id)
        : await curtirPost(post.id);
      
      // Atualiza o estado real com a resposta do servidor
      setPostAtual(resultado);
      onUpdate(resultado);
    } catch (erro) {
      // Em caso de erro, o estado otimista será revertido automaticamente
      alert('Erro ao processar curtida: ' + erro.message);
    }
  }
  
  return (
    <div className="post">
      <h3>{postOtimista.titulo}</h3>
      <p>{postOtimista.conteudo}</p>
      
      <button 
        onClick={handleLike}
        className={postOtimista.curtidoPorVoce ? 'curtido' : ''}
      >
        {postOtimista.curtidoPorVoce ? 'Descurtir' : 'Curtir'} 
        ({postOtimista.contadorCurtidas})
      </button>
    </div>
  );
}
```

Neste exemplo, quando o usuário clica no botão de curtir, a interface é atualizada imediatamente para mostrar o novo estado, sem esperar pela confirmação do servidor.

### 3. Gerenciamento de Listas com Exclusão Otimista

```jsx
import { useState, useOptimistic } from 'react';
import { excluirItem } from './api';

function ListaDeItens({ itensIniciais }) {
  const [itens, setItens] = useState(itensIniciais);
  
  const [itensOtimistas, addOptimisticItems] = useOptimistic(
    itens,
    (itensAtuais, atualizacao) => {
      if (atualizacao.tipo === 'excluir') {
        // Filtra o item a ser excluído
        return itensAtuais.filter(item => item.id !== atualizacao.id);
      }
      return itensAtuais;
    }
  );
  
  async function handleDelete(id) {
    // Atualiza otimisticamente
    addOptimisticItems({ tipo: 'excluir', id });
    
    try {
      // Envia a requisição de exclusão
      await excluirItem(id);
      
      // Atualiza o estado real
      setItens(itensAnteriores => 
        itensAnteriores.filter(item => item.id !== id)
      );
    } catch (erro) {
      // Em caso de erro, o estado otimista será revertido automaticamente
      alert('Erro ao excluir item: ' + erro.message);
    }
  }
  
  return (
    <ul className="lista-itens">
      {itensOtimistas.map(item => (
        <li key={item.id}>
          {item.nome}
          <button onClick={() => handleDelete(item.id)}>Excluir</button>
        </li>
      ))}
    </ul>
  );
}
```

Neste exemplo, quando o usuário clica para excluir um item, ele desaparece imediatamente da lista, mesmo antes que a operação de exclusão seja confirmada pelo servidor.

## Padrões e Técnicas Avançadas

### Combinando com useTransition

Você pode combinar `useOptimistic` com `useTransition` para criar uma experiência ainda mais fluida:

```jsx
import { useState, useOptimistic, useTransition } from 'react';

function ComponenteAvancado() {
  const [dados, setDados] = useState(dadosIniciais);
  const [isPending, startTransition] = useTransition();
  
  const [dadosOtimistas, addOptimisticData] = useOptimistic(
    dados,
    (dadosAtuais, atualizacao) => ({ ...dadosAtuais, ...atualizacao })
  );
  
  async function handleAction(novosDados) {
    // Atualiza otimisticamente
    addOptimisticData(novosDados);
    
    // Usa transition para a operação assíncrona
    startTransition(async () => {
      try {
        const resultado = await enviarDados(novosDados);
        setDados(resultado);
      } catch (erro) {
        // Tratamento de erro
      }
    });
  }
  
  return (
    <div>
      {isPending && <div className="loading-indicator">Processando...</div>}
      <ConteudoComponente 
        dados={dadosOtimistas} 
        onAction={handleAction} 
      />
    </div>
  );
}
```

### Indicadores Visuais para Estados Otimistas

É uma boa prática fornecer indicadores visuais para mostrar que um estado é otimista e ainda não foi confirmado:

```jsx
function ItemLista({ item, onToggle }) {
  // Verifica se o item está em estado otimista
  const isOtimista = item.otimista === true;
  
  return (
    <li className={isOtimista ? 'item-otimista' : ''}>
      <span>{item.texto}</span>
      {isOtimista && <span className="badge">Salvando...</span>}
      <button onClick={() => onToggle(item.id)}>
        {item.concluido ? 'Desmarcar' : 'Marcar'} como concluído
      </button>
    </li>
  );
}
```

E o CSS correspondente:

```css
.item-otimista {
  opacity: 0.8;
  background-color: #f8f9fa;
}

.badge {
  font-size: 0.8em;
  background-color: #6c757d;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
}
```

### Tratamento de Erros Robusto

Para uma experiência de usuário ainda melhor, você pode implementar um tratamento de erros mais robusto:

```jsx
import { useState, useOptimistic } from 'react';
import { toast } from './componentes/Toast';

function FormularioRobusto() {
  const [dados, setDados] = useState(dadosIniciais);
  const [tentativas, setTentativas] = useState({});
  
  const [dadosOtimistas, addOptimisticData] = useOptimistic(
    dados,
    (dadosAtuais, atualizacao) => ({ ...dadosAtuais, ...atualizacao })
  );
  
  async function enviarComRetentativa(id, novosDados, tentativa = 1) {
    // Marca esta operação como em andamento
    setTentativas(prev => ({ ...prev, [id]: { tentativa, emAndamento: true } }));
    
    // Atualiza otimisticamente
    addOptimisticData({ [id]: { ...novosDados, salvando: true } });
    
    try {
      const resultado = await enviarDados(id, novosDados);
      
      // Sucesso - atualiza o estado real
      setDados(prev => ({ ...prev, [id]: resultado }));
      
      // Limpa o estado de tentativas
      setTentativas(prev => {
        const novasTentativas = { ...prev };
        delete novasTentativas[id];
        return novasTentativas;
      });
      
      toast.success('Dados salvos com sucesso!');
    } catch (erro) {
      if (tentativa < 3) {
        // Tenta novamente até 3 vezes
        toast.info(`Tentando novamente (${tentativa + 1}/3)...`);
        setTimeout(() => {
          enviarComRetentativa(id, novosDados, tentativa + 1);
        }, 1000 * tentativa); // Backoff exponencial
      } else {
        // Desiste após 3 tentativas
        setTentativas(prev => ({ ...prev, [id]: { falhou: true, erro } }));
        toast.error(`Falha ao salvar: ${erro.message}`);
      }
    }
  }
  
  function handleSubmit(id, novosDados) {
    enviarComRetentativa(id, novosDados);
  }
  
  return (
    <div>
      {Object.entries(dadosOtimistas).map(([id, item]) => (
        <ItemFormulario 
          key={id}
          item={item}
          salvando={item.salvando}
          erro={tentativas[id]?.falhou ? tentativas[id].erro : null}
          onSubmit={(novosDados) => handleSubmit(id, novosDados)}
          onRetry={() => {
            if (tentativas[id]?.falhou) {
              enviarComRetentativa(id, item);
            }
          }}
        />
      ))}
    </div>
  );
}
```

## Comparação com Outras Abordagens

### useOptimistic vs. Gerenciamento Manual de Estado

Antes do `useOptimistic`, os desenvolvedores geralmente implementavam atualizações otimistas manualmente:

```jsx
// Abordagem manual (sem useOptimistic)
function ComponenteManual() {
  const [dados, setDados] = useState(dadosIniciais);
  const [dadosPendentes, setDadosPendentes] = useState(null);
  
  async function handleSubmit(novosDados) {
    // Salva o estado atual para possível reversão
    const dadosAnteriores = dados;
    
    // Atualiza a UI otimisticamente
    setDados(novosDados);
    setDadosPendentes(novosDados);
    
    try {
      // Envia para o servidor
      const resultado = await enviarDados(novosDados);
      
      // Atualiza com os dados reais do servidor
      setDados(resultado);
      setDadosPendentes(null);
    } catch (erro) {
      // Reverte para o estado anterior em caso de erro
      setDados(dadosAnteriores);
      setDadosPendentes(null);
      alert('Erro: ' + erro.message);
    }
  }
  
  return (
    <div>
      {dadosPendentes && <div>Salvando...</div>}
      <FormularioComponente 
        dados={dados} 
        onSubmit={handleSubmit} 
      />
    </div>
  );
}
```

O `useOptimistic` simplifica significativamente este padrão, gerenciando automaticamente o estado pendente e a reversão em caso de erro.

### useOptimistic vs. Bibliotecas de Gerenciamento de Estado

Muitas bibliotecas de gerenciamento de estado, como Redux ou MobX, oferecem padrões para atualizações otimistas. A vantagem do `useOptimistic` é que ele é integrado diretamente ao React e não requer dependências adicionais.

```jsx
// Com Redux e middleware para atualizações otimistas
const enviarMensagemAction = (mensagem) => ({
  type: 'ENVIAR_MENSAGEM',
  meta: {
    otimista: true,
    mensagem
  },
  payload: mensagem
});

// Com useOptimistic nativo do React
const [mensagensOtimistas, addOptimisticMessage] = useOptimistic(
  mensagens,
  (mensagensAtuais, novaMensagem) => [...mensagensAtuais, novaMensagem]
);
```

### useOptimistic vs. React Query / SWR

Bibliotecas como React Query e SWR também oferecem recursos de atualização otimista:

```jsx
// Com React Query
const { data, mutate } = useQuery('todos', fetchTodos);

// Atualização otimista
mutate(
  async () => {
    const novoTodo = await createTodo(todoData);
    return novoTodo;
  },
  {
    // Atualização otimista
    optimisticData: (todos) => [...todos, { ...todoData, id: 'temp' }],
    // Reversão em caso de erro
    rollbackOnError: true
  }
);

// Com useOptimistic nativo do React
const [todosOtimistas, addOptimisticTodo] = useOptimistic(
  todos,
  (todosAtuais, novoTodo) => [...todosAtuais, novoTodo]
);

// Uso
addOptimisticTodo({ ...todoData, id: 'temp' });
```

A vantagem do `useOptimistic` é que ele é mais leve e integrado diretamente ao React, enquanto bibliotecas como React Query oferecem recursos adicionais como cache, refetch automático, etc.

## Boas Práticas

### 1. Mantenha a Função de Atualização Pura

A função `updateFn` passada para `useOptimistic` deve ser pura e não causar efeitos colaterais:

```jsx
// ✅ Boa prática

(Content truncated due to size limit. Use line ranges to read in chunks)
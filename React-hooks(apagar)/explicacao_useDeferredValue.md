# useDeferredValue

## Introdução

O hook `useDeferredValue` é uma ferramenta poderosa do React que permite adiar a atualização de uma parte específica da interface do usuário. Este hook foi projetado para melhorar a experiência do usuário em situações onde atualizações de dados podem causar lentidão ou travamentos na interface, permitindo que partes críticas da UI permaneçam responsivas enquanto conteúdos menos prioritários são atualizados posteriormente.

## Sintaxe Básica

```jsx
import { useDeferredValue } from 'react';

function MeuComponente() {
  const [valor, setValor] = useState('');
  const valorAdiado = useDeferredValue(valor);
  
  // Usar valorAdiado para renderizar partes menos prioritárias
  return (
    <>
      <input value={valor} onChange={e => setValor(e.target.value)} />
      <ComponentePesado valor={valorAdiado} />
    </>
  );
}
```

## Propósito e Casos de Uso

### 1. Manter a Interface Responsiva Durante Operações Pesadas

O principal propósito do `useDeferredValue` é manter a interface do usuário responsiva mesmo quando há operações de renderização pesadas. Ele permite que você priorize atualizações mais importantes (como a entrada do usuário) enquanto adia atualizações menos críticas (como a exibição de resultados filtrados).

```jsx
function PesquisaComFiltragem() {
  const [consulta, setConsulta] = useState('');
  const consultaAdiada = useDeferredValue(consulta);
  
  // A entrada sempre será responsiva
  // Os resultados podem "atrasar" um pouco, mas a UI permanece fluida
  return (
    <div>
      <input 
        value={consulta} 
        onChange={e => setConsulta(e.target.value)} 
        placeholder="Pesquisar..." 
      />
      <ResultadosDePesquisa consulta={consultaAdiada} />
    </div>
  );
}
```

### 2. Mostrar Conteúdo Desatualizado Enquanto o Novo Conteúdo Carrega

Em aplicações que usam Suspense para carregamento de dados, o `useDeferredValue` pode ser usado para mostrar o conteúdo anterior enquanto o novo conteúdo está sendo carregado, evitando mostrar um estado de carregamento (fallback) a cada atualização.

```jsx
function PaginaDePesquisa() {
  const [consulta, setConsulta] = useState('');
  const consultaAdiada = useDeferredValue(consulta);
  
  return (
    <>
      <input value={consulta} onChange={e => setConsulta(e.target.value)} />
      <Suspense fallback={<h2>Carregando...</h2>}>
        <ResultadosDePesquisa consulta={consultaAdiada} />
      </Suspense>
    </>
  );
}
```

Neste exemplo, quando o usuário digita uma nova consulta, o componente `ResultadosDePesquisa` continuará mostrando os resultados da consulta anterior até que os novos resultados estejam prontos, em vez de mostrar imediatamente o fallback de carregamento.

### 3. Adiar a Renderização de Partes Complexas da UI

Para interfaces com componentes muito complexos que não precisam ser atualizados imediatamente, o `useDeferredValue` permite adiar sua atualização para manter a responsividade geral.

```jsx
function Dashboard() {
  const [dados, setDados] = useState(dadosIniciais);
  const dadosAdiados = useDeferredValue(dados);
  
  return (
    <div>
      <ControlesInterativos dados={dados} onChange={setDados} />
      <GraficoComplexo dados={dadosAdiados} />
    </div>
  );
}
```

## Parâmetros

O hook `useDeferredValue` aceita dois parâmetros:

1. **value**: O valor que você deseja adiar. Pode ser de qualquer tipo.
2. **initialValue** (opcional): Um valor a ser usado durante a renderização inicial do componente. Se esta opção for omitida, o `useDeferredValue` não adiará durante a renderização inicial, pois não há versão anterior do valor que possa ser renderizada.

## Valor Retornado

- **valorAdiado**: Durante a renderização inicial, o valor adiado retornado será o `initialValue` (se fornecido) ou o mesmo valor que você passou. Durante atualizações, o React primeiro tentará uma re-renderização com o valor antigo (então retornará o valor antigo) e depois tentará outra re-renderização em segundo plano com o novo valor (então retornará o valor atualizado).

## Como Funciona

O funcionamento interno do `useDeferredValue` é baseado em prioridades de renderização:

1. Quando um valor passado para `useDeferredValue` muda, o React primeiro completa a renderização atual usando o valor antigo.
2. Em seguida, o React agenda uma renderização em segundo plano com o novo valor.
3. Esta renderização em segundo plano é interruptível - se outro valor chegar antes que a renderização em segundo plano termine, o React descartará a renderização em andamento e começará novamente com o valor mais recente.

Este processo permite que a interface do usuário permaneça responsiva, mesmo quando há atualizações frequentes ou renderizações pesadas.

## Exemplos Práticos

### Exemplo 1: Lista de Filtragem Responsiva

```jsx
import { useState, useDeferredValue } from 'react';

function ListaDeFiltragem({ itens }) {
  const [filtro, setFiltro] = useState('');
  const filtroAdiado = useDeferredValue(filtro);
  
  // Destaque visual para indicar conteúdo desatualizado
  const isStale = filtro !== filtroAdiado;
  
  // Filtragem de itens (operação potencialmente cara)
  const itensFiltrados = itens.filter(item => 
    item.toLowerCase().includes(filtroAdiado.toLowerCase())
  );
  
  return (
    <div>
      <input 
        value={filtro} 
        onChange={e => setFiltro(e.target.value)} 
        placeholder="Filtrar itens..." 
      />
      
      <div style={{ opacity: isStale ? 0.8 : 1 }}>
        {isStale && <p>Atualizando resultados...</p>}
        
        <ul>
          {itensFiltrados.map(item => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

Neste exemplo, a entrada do usuário permanece responsiva mesmo quando a lista de itens é grande. O indicador visual (opacidade reduzida e mensagem) mostra ao usuário que os resultados estão sendo atualizados.

### Exemplo 2: Gráfico com Dados em Tempo Real

```jsx
import { useState, useEffect, useDeferredValue } from 'react';
import { LineChart } from './ComponentesDeGrafico';

function GraficoEmTempoReal() {
  const [dados, setDados] = useState([]);
  const dadosAdiados = useDeferredValue(dados);
  
  useEffect(() => {
    // Simula dados chegando em tempo real
    const intervalo = setInterval(() => {
      setDados(dadosAnteriores => [
        ...dadosAnteriores,
        { timestamp: Date.now(), valor: Math.random() * 100 }
      ].slice(-100)); // Mantém apenas os últimos 100 pontos
    }, 100); // Atualiza a cada 100ms
    
    return () => clearInterval(intervalo);
  }, []);
  
  return (
    <div>
      <div>Pontos de dados: {dados.length}</div>
      <LineChart 
        dados={dadosAdiados} 
        width={800} 
        height={400} 
      />
    </div>
  );
}
```

Neste exemplo, os dados são atualizados frequentemente (a cada 100ms), mas o gráfico é renderizado com uma versão adiada dos dados. Isso permite que a interface permaneça responsiva mesmo com atualizações de dados de alta frequência.

### Exemplo 3: Componente de Pesquisa com Suspense

```jsx
import { Suspense, useState, useDeferredValue } from 'react';
import { fetchResultados } from './api';

// Componente que suspende enquanto busca resultados
function ResultadosDePesquisa({ consulta }) {
  const resultados = fetchResultados(consulta); // Esta função suspende
  
  return (
    <ul>
      {resultados.map(resultado => (
        <li key={resultado.id}>{resultado.titulo}</li>
      ))}
    </ul>
  );
}

function PesquisaAvancada() {
  const [consulta, setConsulta] = useState('');
  const consultaAdiada = useDeferredValue(consulta);
  
  // Indica visualmente quando estamos mostrando resultados desatualizados
  const isStale = consulta !== consultaAdiada;
  
  return (
    <div>
      <input 
        value={consulta} 
        onChange={e => setConsulta(e.target.value)} 
        placeholder="Pesquisar..." 
      />
      
      <div style={{ 
        opacity: isStale ? 0.8 : 1,
        transition: 'opacity 0.2s ease'
      }}>
        <Suspense fallback={<p>Carregando resultados...</p>}>
          <ResultadosDePesquisa consulta={consultaAdiada} />
        </Suspense>
      </div>
    </div>
  );
}
```

Neste exemplo, o `useDeferredValue` trabalha em conjunto com o Suspense para proporcionar uma experiência de usuário mais suave. Em vez de mostrar o fallback de carregamento a cada digitação, os resultados anteriores permanecem visíveis (com uma opacidade reduzida para indicar que estão desatualizados) até que os novos resultados estejam prontos.

## Indicando Conteúdo Desatualizado

Uma prática comum ao usar `useDeferredValue` é fornecer um indicador visual de que o conteúdo exibido está desatualizado e sendo atualizado. Isso pode ser feito comparando o valor original com o valor adiado:

```jsx
function ComponenteComIndicadorDeAtualizacao({ dados }) {
  const [consulta, setConsulta] = useState('');
  const consultaAdiada = useDeferredValue(consulta);
  
  // Verifica se estamos mostrando conteúdo desatualizado
  const isStale = consulta !== consultaAdiada;
  
  return (
    <div>
      <input 
        value={consulta} 
        onChange={e => setConsulta(e.target.value)} 
      />
      
      <div style={{ 
        opacity: isStale ? 0.7 : 1,
        transition: 'opacity 0.2s ease'
      }}>
        {isStale && (
          <div className="indicador-atualizacao">
            Atualizando...
          </div>
        )}
        
        <ResultadosDeConsulta consulta={consultaAdiada} dados={dados} />
      </div>
    </div>
  );
}
```

## Comparação com useTransition

O React oferece dois hooks principais para priorização de renderização: `useDeferredValue` e `useTransition`. Embora relacionados, eles têm propósitos ligeiramente diferentes:

### useDeferredValue
- Adia a atualização de um valor específico
- Útil quando você não tem controle direto sobre a fonte da atualização
- Ideal para adiar a renderização de partes específicas da UI

### useTransition
- Marca atualizações inteiras como de baixa prioridade
- Útil quando você tem controle sobre o código que inicia a atualização
- Ideal para transições de estado que podem causar renderizações pesadas

```jsx
// Com useDeferredValue
function ComponenteComValorAdiado() {
  const [valor, setValor] = useState('');
  const valorAdiado = useDeferredValue(valor);
  
  return (
    <>
      <input onChange={e => setValor(e.target.value)} />
      <ComponentePesado valor={valorAdiado} />
    </>
  );
}

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
```

## Limitações e Considerações

### 1. Integração com Suspense

O `useDeferredValue` é integrado com o Suspense do React. Se a atualização em segundo plano causada por um novo valor suspender a UI, o usuário não verá o fallback. Eles continuarão vendo o valor adiado antigo até que os dados sejam carregados.

### 2. Não Previne Requisições de Rede Extras

O `useDeferredValue` por si só não impede requisições de rede extras. Se o componente que recebe o valor adiado faz requisições de rede baseadas nesse valor, essas requisições ainda ocorrerão. Para otimizar isso, considere combinar com técnicas de debounce ou throttle.

### 3. Valores Primitivos vs. Objetos

Os valores que você passa para `useDeferredValue` devem ser preferencialmente valores primitivos (como strings e números) ou objetos criados fora da renderização. Se você criar um novo objeto durante a renderização e passá-lo imediatamente para `useDeferredValue`, ele será diferente a cada renderização, causando re-renderizações desnecessárias em segundo plano.

```jsx
// ❌ Evite isso
function ComponenteIneficiente() {
  // Este objeto é recriado a cada renderização
  const dados = { id: 1, nome: 'Exemplo' };
  const dadosAdiados = useDeferredValue(dados); // Sempre diferente!
  
  return <ComponentePesado dados={dadosAdiados} />;
}

// ✅ Melhor abordagem
function ComponenteEficiente() {
  const [id, setId] = useState(1);
  const [nome, setNome] = useState('Exemplo');
  
  // Valores primitivos são comparados por valor
  const idAdiado = useDeferredValue(id);
  const nomeAdiado = useDeferredValue(nome);
  
  // Ou use useMemo para criar o objeto
  const dados = useMemo(() => ({ id, nome }), [id, nome]);
  const dadosAdiados = useDeferredValue(dados);
  
  return <ComponentePesado dados={dadosAdiados} />;
}
```

### 4. Comportamento com Transições

Quando uma atualização está dentro de uma Transição (usando `useTransition` ou `startTransition`), o `useDeferredValue` sempre retorna o novo valor e não gera uma renderização adiada, pois a atualização já está sendo adiada pela Transição.

### 5. Sem Atraso Fixo

Não há um atraso fixo causado pelo `useDeferredValue`. Assim que o React termina a renderização original, ele imediatamente começa a trabalhar na renderização em segundo plano com o novo valor adiado. Quaisquer atualizações causadas por eventos (como digitação) interromperão a renderização em segundo plano e terão prioridade sobre ela.

## Padrões Avançados

### Combinando com useMemo para Cálculos Caros

Para cálculos caros baseados em um valor adiado, combine `useDeferredValue` com `useMemo` para evitar recálculos desnecessários:

```jsx
function ComponenteOtimizado({ listaGrande }) {
  const [filtro, setFiltro] = useState('');
  const filtroAdiado = useDeferredValue(filtro);
  
  // Cálculo caro memoizado baseado no valor adiado
  const itensFiltrados = useMemo(() => {
    console.log('Filtrando itens com:', filtroAdiado);
    return listaGrande.filter(item => 
      item.texto.toLowerCase().includes(filtroAdiado.toLowerCase())
    );
  }, [listaGrande, filtroAdiado]);
  
  return (
    <div>
      <input 
        value={filtro} 
        onChange={e => setFiltro(e.target.value)} 
        placeholder="Filtrar..." 
      />
      <ListaVirtual itens={itensFiltrados} />
    </div>
  );
}
```

### Debounce + useDeferredValue para Otimização Máxima

Para casos extremos de performance, você pode combinar debounce com `useDeferredValue`:

```jsx
function PesquisaOtimizada() {
  const [consulta, setConsulta] = useState('');
  const [consultaDebounced, setConsultaDebounced] = useState('');
  const consultaAdiada = useDeferredValue(consultaDebounced);
  
  // Debounce para limitar atualizações
  useEffect(() => {
    const timer = setTimeout(() => {
      setConsultaDebounced(consulta);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [consulta]);
  
  return (
    <div>
      <input 
        value={consulta} 
        onChange={e => setConsulta(e.target.value)} 
        placeholder="Pesquisar..." 
      />
      <ResultadosDePesquisa consulta={consultaAdiada} />
    </div>
  );
}
```

Esta abordagem combina duas técnicas:
1. **Debounce**: Limita a frequência de atualizações do estado
2. **useDeferredValue**: Prioriza a responsividade da UI durante as atualizações

## Casos de Uso Reais

### 1. Editores de Texto com Visualização em Tempo Real

```jsx
function EditorMarkdown() {
  const [markdown, setMarkdown] = useState('# Olá, mundo!');
  const markdownAdiado = useDeferredValue(markdown);
  
  return (
    <div className="editor-container">
      <div className="editor">
        <textarea
          value={markdown}
          onChange={e => setMarkdown(e.target.value)}
          rows={20}
        />
      </div>
      
      <div className="preview">
        <VisualizacaoMarkdown 
          markdown={markdownAdiado} 
  
(Content truncated due to size limit. Use line ranges to read in chunks)
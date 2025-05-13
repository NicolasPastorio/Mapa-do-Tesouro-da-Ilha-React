# Componentes Controlados e Não-Controlados no React

Os componentes controlados e não-controlados representam duas abordagens diferentes para gerenciar dados de formulários e interações do usuário no React. Entender a diferença entre eles é fundamental para criar interfaces de usuário eficientes e manter um fluxo de dados previsível em suas aplicações.

## Componentes Não-Controlados

Um componente não-controlado é aquele que mantém seu próprio estado interno, sem que o componente pai tenha controle direto sobre ele.

### Características Principais:

- **Estado Local**: Mantém seu próprio estado interno sem depender do componente pai.
- **Referências DOM**: Geralmente utiliza refs para acessar valores do DOM diretamente.
- **Menos Código**: Requer menos código para implementação inicial.
- **Menos Controle**: O React não tem controle total sobre o estado do componente.

### Exemplo Prático:

```jsx
import React, { useRef } from 'react';

function FormularioNaoControlado() {
  // Criamos uma referência para acessar o valor do input diretamente
  const inputRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Acessamos o valor atual do input através da referência
    alert('Nome enviado: ' + inputRef.current.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input type="text" ref={inputRef} defaultValue="Nome inicial" />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

Neste exemplo, o React não está "ciente" das mudanças no campo de input enquanto o usuário digita. O valor só é acessado quando o formulário é enviado, através da referência DOM.

### Quando Usar:

- Em formulários simples onde não é necessário validar ou reagir a cada mudança.
- Quando você precisa integrar com bibliotecas DOM de terceiros.
- Para componentes que não precisam reagir a cada alteração de estado.
- Em casos onde a performance é crítica e você quer evitar re-renderizações.

## Componentes Controlados

Um componente controlado é aquele cujo valor é controlado pelo React através do estado (state). O React se torna a "única fonte de verdade" para o valor do componente.

### Características Principais:

- **Estado Gerenciado pelo React**: O valor do componente é armazenado no estado do React.
- **Atualizações Síncronas**: Cada alteração no componente atualiza o estado.
- **Validação Imediata**: Permite validar ou transformar a entrada do usuário a cada alteração.
- **Previsibilidade**: Comportamento mais previsível e fácil de testar.

### Exemplo Prático:

```jsx
import React, { useState } from 'react';

function FormularioControlado() {
  // O estado do React armazena o valor do input
  const [nome, setNome] = useState('Nome inicial');

  const handleChange = (event) => {
    // Atualizamos o estado a cada alteração no input
    setNome(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Nome enviado: ' + nome);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nome:
        <input 
          type="text" 
          value={nome} 
          onChange={handleChange} 
        />
      </label>
      <button type="submit">Enviar</button>
    </form>
  );
}
```

Neste exemplo, o React controla completamente o valor do input. Cada vez que o usuário digita, o evento `onChange` é acionado, atualizando o estado, que por sua vez atualiza o valor exibido no input.

### Quando Usar:

- Quando você precisa validar entradas em tempo real.
- Para implementar filtros ou formatação de entrada (como máscaras de telefone).
- Quando o valor de um campo depende de outros campos.
- Para criar formulários dinâmicos onde campos aparecem/desaparecem com base em outras entradas.
- Quando você precisa desabilitar o botão de envio até que todos os campos sejam preenchidos corretamente.

## Elevação de Estado (State Lifting)

Um conceito importante relacionado a componentes controlados é a "elevação de estado". Quando você precisa que dois ou mais componentes compartilhem o mesmo estado, você pode "elevar" esse estado para o componente pai comum mais próximo.

### Exemplo de Elevação de Estado:

```jsx
import React, { useState } from 'react';

// Componente filho controlado
function InputControlado({ valor, aoMudar }) {
  return (
    <input 
      value={valor} 
      onChange={(e) => aoMudar(e.target.value)} 
    />
  );
}

// Componente pai que gerencia o estado
function FormularioCompartilhado() {
  const [texto, setTexto] = useState('');
  
  return (
    <div>
      <InputControlado valor={texto} aoMudar={setTexto} />
      <p>Texto digitado em tempo real: {texto}</p>
      <InputControlado valor={texto} aoMudar={setTexto} />
    </div>
  );
}
```

Neste exemplo, o estado `texto` foi elevado para o componente pai `FormularioCompartilhado`, permitindo que dois componentes `InputControlado` compartilhem o mesmo valor e se mantenham sincronizados.

## Comparação Prática

| Aspecto | Componentes Controlados | Componentes Não-Controlados |
|---------|-------------------------|----------------------------|
| Fonte da verdade | Estado do React | DOM |
| Código necessário | Mais verboso | Mais conciso |
| Flexibilidade | Alta | Baixa |
| Validação em tempo real | Fácil | Difícil |
| Performance | Pode causar mais re-renderizações | Menos re-renderizações |
| Integração com bibliotecas | Pode ser desafiador | Mais simples |
| Previsibilidade | Alta | Média |

## Considerações Importantes

1. **Não existe certo ou errado absoluto**: A escolha entre componentes controlados e não-controlados depende do caso de uso específico.

2. **Componentes híbridos**: Na prática, muitos componentes React combinam aspectos de ambas as abordagens.

3. **Formulários complexos**: Para formulários muito complexos, considere bibliotecas como Formik ou React Hook Form, que abstraem muita da complexidade.

4. **Consistência**: É geralmente uma boa prática manter uma abordagem consistente em toda a aplicação.

5. **Migração**: É possível migrar de não-controlado para controlado (e vice-versa), mas pode exigir refatoração significativa.

## Conclusão

A escolha entre componentes controlados e não-controlados é uma decisão de design importante no desenvolvimento React. Componentes controlados oferecem mais controle e previsibilidade, enquanto componentes não-controlados podem ser mais simples e ter melhor performance em certos casos.

Na prática, a maioria das aplicações React modernas tende a favorecer componentes controlados para a maioria dos casos de uso, especialmente para formulários que exigem validação em tempo real ou lógica complexa. No entanto, para casos simples ou quando a performance é crítica, componentes não-controlados ainda têm seu lugar.

O importante é entender as implicações de cada abordagem e escolher a que melhor se adapta às necessidades específicas do seu projeto.

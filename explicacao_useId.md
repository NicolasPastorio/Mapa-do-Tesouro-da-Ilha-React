# useId

## Introdução

O hook `useId` é uma ferramenta do React para gerar identificadores únicos que são estáveis entre renderizações do servidor e do cliente. Este hook foi introduzido para resolver problemas específicos relacionados à acessibilidade e à geração de IDs consistentes em aplicações React, especialmente em ambientes que utilizam renderização no servidor (SSR) ou hidratação.

## Sintaxe Básica

```jsx
import { useId } from 'react';

function MeuComponente() {
  const id = useId();
  
  return (
    <div>
      <label htmlFor={id}>Nome</label>
      <input id={id} type="text" />
    </div>
  );
}
```

## Propósito e Casos de Uso

### 1. Geração de IDs para Atributos de Acessibilidade

O principal propósito do `useId` é gerar identificadores únicos para atributos de acessibilidade como `id`, `htmlFor`, `aria-labelledby`, `aria-describedby`, entre outros. Estes atributos são essenciais para tornar sua aplicação acessível a usuários que utilizam tecnologias assistivas.

```jsx
function CampoSenha() {
  const passwordHintId = useId();
  
  return (
    <>
      <label htmlFor={passwordHintId}>Senha:</label>
      <input 
        type="password" 
        aria-describedby={passwordHintId} 
      />
      <p id={passwordHintId}>
        A senha deve conter pelo menos 8 caracteres, incluindo letras e números.
      </p>
    </>
  );
}
```

Neste exemplo, `useId` gera um ID único que conecta o campo de senha com seu texto de descrição através do atributo `aria-describedby`. Isso permite que leitores de tela anunciem a descrição quando o usuário foca no campo de senha.

### 2. Geração de IDs para Vários Elementos Relacionados

Você pode usar um único `useId` como base para gerar múltiplos IDs relacionados, adicionando sufixos:

```jsx
function FormularioContato() {
  const id = useId();
  const nomeId = `${id}-nome`;
  const emailId = `${id}-email`;
  const mensagemId = `${id}-mensagem`;
  
  return (
    <form>
      <div>
        <label htmlFor={nomeId}>Nome:</label>
        <input id={nomeId} type="text" />
      </div>
      
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input id={emailId} type="email" />
      </div>
      
      <div>
        <label htmlFor={mensagemId}>Mensagem:</label>
        <textarea id={mensagemId}></textarea>
      </div>
    </form>
  );
}
```

Esta abordagem garante que todos os IDs relacionados sejam únicos, mas ainda mantenham uma relação lógica entre si.

### 3. Especificando um Prefixo Compartilhado

Em alguns casos, você pode querer especificar um prefixo para todos os IDs gerados em sua aplicação. Isso pode ser útil para depuração ou para garantir que seus IDs não entrem em conflito com IDs de bibliotecas de terceiros.

```jsx
// Em um arquivo de configuração
const ID_PREFIX = 'minha-app';

// Em seus componentes
function MeuComponente() {
  const id = useId();
  const prefixedId = ID_PREFIX ? `${ID_PREFIX}-${id}` : id;
  
  return <div id={prefixedId}>...</div>;
}
```

O React também suporta a configuração global de um prefixo através da propriedade `identifierPrefix` nas funções de renderização do servidor:

```jsx
// Para renderização no servidor
const html = ReactDOMServer.renderToString(
  <App />,
  { identifierPrefix: 'minha-app-' }
);
```

## Características Importantes

### 1. Estabilidade entre Cliente e Servidor

Um dos principais benefícios do `useId` é que ele gera IDs consistentes entre o servidor e o cliente, o que é crucial para aplicações que utilizam renderização no servidor (SSR) ou geração estática (SSG).

Antes do `useId`, os desenvolvedores frequentemente recorriam a contadores incrementais ou geradores de IDs aleatórios, o que poderia causar problemas de "hidratação" quando o React tentava conectar o DOM do servidor com o do cliente.

### 2. Determinismo

Os IDs gerados por `useId` são determinísticos com base na "árvore de componentes". Isso significa que o mesmo componente na mesma posição na árvore sempre receberá o mesmo ID, o que é importante para a estabilidade da aplicação.

### 3. Formato dos IDs Gerados

Os IDs gerados pelo `useId` têm um formato específico que inclui o caractere `:` (dois pontos). Por exemplo: `:r1:`. Este formato foi escolhido para garantir a unicidade e evitar colisões com IDs definidos manualmente.

```jsx
function Exemplo() {
  const id = useId();
  console.log(id); // Algo como ":r1:"
  
  return <div id={id}>Exemplo</div>;
}
```

## Quando Usar useId

Você deve usar `useId`:

1. **Para atributos de acessibilidade**: Quando precisar conectar elementos através de atributos como `htmlFor`, `aria-labelledby`, `aria-describedby`, etc.

2. **Em componentes reutilizáveis**: Quando criar componentes que podem ser usados múltiplas vezes na mesma página e precisam de IDs únicos.

3. **Em aplicações com SSR**: Quando sua aplicação utiliza renderização no servidor e você precisa garantir que os IDs sejam consistentes durante a hidratação.

## Quando NÃO Usar useId

Você NÃO deve usar `useId`:

1. **Para chaves de listas**: Não use `useId` para gerar chaves (`key`) em listas. As chaves devem ser baseadas nos dados, não geradas aleatoriamente.

```jsx
// ❌ Incorreto
function Lista({ itens }) {
  return (
    <ul>
      {itens.map(item => {
        const id = useId(); // Não faça isso!
        return <li key={id}>{item.nome}</li>;
      })}
    </ul>
  );
}

// ✅ Correto
function Lista({ itens }) {
  return (
    <ul>
      {itens.map(item => (
        <li key={item.id}>{item.nome}</li>
      ))}
    </ul>
  );
}
```

2. **Para IDs que precisam ser conhecidos antecipadamente**: Se você precisa saber o valor do ID antes da renderização (por exemplo, para manipulação direta do DOM), `useId` não é adequado.

## Alternativas ao useId

Antes do `useId`, os desenvolvedores usavam várias abordagens para gerar IDs únicos:

1. **Contadores incrementais**: Manter um contador global e incrementá-lo para cada novo ID.
2. **Bibliotecas de geração de UUID**: Usar bibliotecas como `uuid` para gerar identificadores únicos.
3. **Combinação de props e contexto**: Passar IDs de componentes pais para filhos através de props ou contexto.

Estas abordagens ainda podem ser válidas em certos casos, mas `useId` oferece uma solução mais elegante e integrada ao React, especialmente para aplicações que utilizam SSR.

## Considerações de Performance

O `useId` é otimizado para performance e não causa problemas significativos de desempenho. No entanto, como qualquer hook, ele deve ser usado no nível superior do componente e não dentro de loops ou condições.

## Exemplo Completo

Aqui está um exemplo completo de um formulário acessível usando `useId`:

```jsx
import { useId } from 'react';

function FormularioAcessivel() {
  const id = useId();
  
  const nomeId = `${id}-nome`;
  const emailId = `${id}-email`;
  const senhaId = `${id}-senha`;
  const senhaHintId = `${id}-senha-hint`;
  
  return (
    <form>
      <div>
        <label htmlFor={nomeId}>Nome:</label>
        <input id={nomeId} type="text" />
      </div>
      
      <div>
        <label htmlFor={emailId}>Email:</label>
        <input id={emailId} type="email" />
      </div>
      
      <div>
        <label htmlFor={senhaId}>Senha:</label>
        <input 
          id={senhaId} 
          type="password" 
          aria-describedby={senhaHintId} 
        />
        <p id={senhaHintId} className="hint">
          A senha deve conter pelo menos 8 caracteres, incluindo letras maiúsculas, 
          minúsculas, números e caracteres especiais.
        </p>
      </div>
      
      <button type="submit">Cadastrar</button>
    </form>
  );
}
```

## Conclusão

O hook `useId` é uma adição valiosa ao React que resolve problemas específicos relacionados à geração de IDs únicos, especialmente em contextos de acessibilidade e aplicações com renderização no servidor. Ele oferece uma solução elegante e integrada que garante a consistência dos IDs entre o servidor e o cliente, evitando problemas comuns de hidratação e melhorando a acessibilidade da sua aplicação.

Ao usar `useId` corretamente, você pode criar componentes mais acessíveis e robustos, que funcionam bem tanto em renderização no cliente quanto no servidor.

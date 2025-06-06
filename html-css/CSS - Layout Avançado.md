# CSS - Layout Avançado

Com os fundamentos do CSS estabelecidos, podemos agora explorar as ferramentas mais poderosas e modernas para criar layouts complexos e flexíveis: Flexbox e Grid Layout. Essas duas tecnologias revolucionaram a forma como posicionamos elementos em uma página web, superando as limitações das técnicas mais antigas baseadas em `float` e `position`. Além disso, introduziremos as Variáveis CSS (Custom Properties), que trazem o poder das variáveis para o CSS, tornando nossos estilos mais dinâmicos e fáceis de manter.

## Flexbox (Flexible Box Layout)

O Flexbox foi projetado como um modelo de layout unidimensional, otimizado para organizar itens em uma linha ou coluna e distribuir espaço entre eles. É ideal para componentes de interface, como barras de navegação, alinhamento de itens em um cartão, ou qualquer situação onde você precise alinhar ou distribuir um grupo de elementos ao longo de um único eixo.

Para usar o Flexbox, você precisa de um **contêiner flex** (o elemento pai) e **itens flex** (os elementos filhos diretos do contêiner).

**Estrutura HTML de Exemplo:**

```html
<div class="flex-container">
    <div class="flex-item">Item 1</div>
    <div class="flex-item">Item 2</div>
    <div class="flex-item">Item 3</div>
</div>
```

**Ativando o Flexbox:**

A primeira etapa é aplicar `display: flex;` ou `display: inline-flex;` ao elemento contêiner.

```css
.flex-container {
    display: flex; /* Transforma o div em um contêiner flex */
    border: 2px solid blue; /* Apenas para visualização */
}

.flex-item {
    background-color: lightcoral;
    padding: 20px;
    margin: 5px;
    border: 1px solid black;
} 
```

Com `display: flex;`, os filhos diretos (`.flex-item`) automaticamente se tornam itens flex e, por padrão, se alinham em uma linha.

### Propriedades do Contêiner Flex

Estas propriedades são aplicadas ao elemento pai (`.flex-container` no exemplo).

*   **`flex-direction`:** Define o eixo principal ao longo do qual os itens flex são dispostos.
    *   `row` (padrão): Itens dispostos horizontalmente, da esquerda para a direita.
    *   `row-reverse`: Itens dispostos horizontalmente, da direita para a esquerda.
    *   `column`: Itens dispostos verticalmente, de cima para baixo.
    *   `column-reverse`: Itens dispostos verticalmente, de baixo para cima.
    ```css
    .flex-container {
        display: flex;
        flex-direction: column; /* Itens empilhados verticalmente */
    }
    ```
*   **`flex-wrap`:** Controla se os itens flex devem quebrar para a próxima linha quando não couberem no contêiner.
    *   `nowrap` (padrão): Itens tentam caber em uma única linha (podem encolher ou transbordar).
    *   `wrap`: Itens quebram para a linha seguinte, se necessário.
    *   `wrap-reverse`: Itens quebram para a linha anterior, se necessário.
    ```css
    .flex-container {
        display: flex;
        flex-wrap: wrap; /* Permite que os itens quebrem a linha */
        width: 300px; /* Força a quebra se os itens forem largos */
    }
    ```
*   **`flex-flow`:** Propriedade abreviada para `flex-direction` e `flex-wrap`.
    ```css
    .flex-container { flex-flow: row wrap; } /* Direção linha, com quebra */
    ```
*   **`justify-content`:** Alinha os itens flex ao longo do **eixo principal** (definido por `flex-direction`). É usado para distribuir o espaço extra no contêiner.
    *   `flex-start` (padrão): Itens agrupados no início do eixo principal.
    *   `flex-end`: Itens agrupados no final do eixo principal.
    *   `center`: Itens agrupados no centro do eixo principal.
    *   `space-between`: Espaço distribuído igualmente *entre* os itens (primeiro item no início, último no final).
    *   `space-around`: Espaço distribuído igualmente *ao redor* de cada item (espaço nas extremidades é metade do espaço entre os itens).
    *   `space-evenly`: Espaço distribuído igualmente *entre* cada item e também nas extremidades.
    ```css
    .flex-container {
        display: flex;
        justify-content: space-between; /* Espaço máximo entre os itens */
    }
    ```
*   **`align-items`:** Alinha os itens flex ao longo do **eixo transversal** (o eixo perpendicular ao `flex-direction`).
    *   `stretch` (padrão): Itens esticam para preencher a altura (ou largura, se `flex-direction: column`) do contêiner.
    *   `flex-start`: Itens alinhados no início do eixo transversal.
    *   `flex-end`: Itens alinhados no final do eixo transversal.
    *   `center`: Itens alinhados no centro do eixo transversal.
    *   `baseline`: Itens alinhados pela sua linha de base textual.
    ```css
    .flex-container {
        display: flex;
        height: 200px; /* Necessário para ver o efeito de align-items */
        align-items: center; /* Centraliza os itens verticalmente */
    }
    ```
*   **`align-content`:** Similar ao `justify-content`, mas alinha as *linhas* do contêiner flex ao longo do **eixo transversal** quando há múltiplas linhas (ou seja, quando `flex-wrap: wrap` está ativo e há quebra de linha). Não tem efeito se os itens estiverem em uma única linha.
    *   Valores similares a `justify-content`: `flex-start`, `flex-end`, `center`, `space-between`, `space-around`, `space-evenly`, `stretch` (padrão).
    ```css
    .flex-container {
        display: flex;
        flex-wrap: wrap;
        height: 300px; /* Altura maior para permitir múltiplas linhas */
        align-content: space-around; /* Distribui o espaço vertical entre as linhas */
    }
    ```

### Propriedades dos Itens Flex

Estas propriedades são aplicadas aos elementos filhos diretos (`.flex-item` no exemplo).

*   **`order`:** Controla a ordem visual em que os itens flex aparecem no contêiner. O valor padrão é `0`. Itens com valores menores aparecem antes. Permite reordenar itens sem alterar o HTML.
    ```css
    .flex-item:nth-child(1) { order: 3; } /* Primeiro item no HTML vai para o final */
    .flex-item:nth-child(3) { order: 1; } /* Terceiro item no HTML vai para o início */
    ```
*   **`flex-grow`:** Define a capacidade de um item flex crescer (ocupar espaço extra) se necessário. É um número sem unidade que representa uma proporção. O padrão é `0` (não cresce).
    *   Se todos os itens tiverem `flex-grow: 1`, o espaço extra será distribuído igualmente entre eles.
    *   Se um item tiver `flex-grow: 2` e os outros `flex-grow: 1`, ele tentará ocupar o dobro do espaço extra em comparação com os outros.
    ```css
    .flex-item:nth-child(2) { flex-grow: 1; } /* O segundo item ocupará todo o espaço extra */
    ```
*   **`flex-shrink`:** Define a capacidade de um item flex encolher se necessário (quando não há espaço suficiente no contêiner). O padrão é `1` (pode encolher). Um valor `0` impede que o item encolha.
    ```css
    .flex-item:nth-child(1) { flex-shrink: 0; } /* O primeiro item não encolherá */
    ```
*   **`flex-basis`:** Define o tamanho inicial (ideal) de um item flex antes que o espaço extra seja distribuído ou removido (`flex-grow` / `flex-shrink`). Pode ser um valor de tamanho (`px`, `%`, `rem`) ou `auto` (usa o `width` ou `height` do item, ou o tamanho do conteúdo).
    ```css
    .flex-item { flex-basis: 100px; } /* Tamanho inicial de 100px */
    ```
*   **`flex`:** Propriedade abreviada para `flex-grow`, `flex-shrink` e `flex-basis`.
    *   `flex: 0 1 auto;` (Padrão: não cresce, pode encolher, base automática)
    *   `flex: 1;` (Equivalente a `flex: 1 1 0%;` - cresce, encolhe, base zero)
    *   `flex: auto;` (Equivalente a `flex: 1 1 auto;` - cresce, encolhe, base automática)
    *   `flex: none;` (Equivalente a `flex: 0 0 auto;` - não cresce, não encolhe, base automática)
    ```css
    .flex-item { flex: 1; } /* Todos os itens crescem e encolhem igualmente */
    ```
*   **`align-self`:** Permite que um item flex individual sobrescreva o valor de `align-items` definido no contêiner. Aceita os mesmos valores que `align-items` (`auto`, `flex-start`, `flex-end`, `center`, `baseline`, `stretch`).
    ```css
    .flex-container { align-items: flex-start; }
    .flex-item:nth-child(3) { align-self: flex-end; } /* O terceiro item vai para o final do eixo transversal */
    ```

Flexbox é incrivelmente versátil para layouts unidimensionais e alinhamento de componentes.

## Grid Layout (CSS Grid)

Enquanto o Flexbox é unidimensional, o CSS Grid Layout é um sistema de layout bidimensional, projetado para dividir uma página ou componente em regiões principais, definindo a relação em termos de tamanho, posição e camada entre partes de um controle construído a partir de primitivas HTML. Ele permite criar layouts complexos baseados em linhas e colunas com muito mais controle e menos necessidade de HTML aninhado do que métodos anteriores.

Assim como o Flexbox, o Grid Layout também opera com um **contêiner grid** e **itens grid** (filhos diretos).

**Estrutura HTML de Exemplo:**

```html
<div class="grid-container">
    <div class="grid-item item1">Cabeçalho</div>
    <div class="grid-item item2">Menu</div>
    <div class="grid-item item3">Conteúdo Principal</div>
    <div class="grid-item item4">Barra Lateral</div>
    <div class="grid-item item5">Rodapé</div>
</div>
```

**Ativando o Grid Layout:**

Aplique `display: grid;` ou `display: inline-grid;` ao elemento contêiner.

```css
.grid-container {
    display: grid;
    border: 2px solid green; /* Apenas para visualização */
}

.grid-item {
    background-color: lightskyblue;
    padding: 15px;
    border: 1px solid black;
    text-align: center;
}
```

Por si só, `display: grid;` não faz muita coisa visualmente. Precisamos definir as trilhas (linhas e colunas).

### Terminologia do Grid

*   **Linhas do Grid (Grid Lines):** As linhas horizontais e verticais que dividem o grid. Elas são numeradas (começando em 1) e podem ser nomeadas.
*   **Trilhas do Grid (Grid Tracks):** O espaço entre duas linhas adjacentes (basicamente, as colunas e linhas).
*   **Célula do Grid (Grid Cell):** O espaço entre quatro linhas de grid que se cruzam (a menor unidade do grid).
*   **Área do Grid (Grid Area):** Um espaço retangular que abrange uma ou mais células, delimitado por quatro linhas de grid.

### Propriedades do Contêiner Grid

*   **`grid-template-columns` e `grid-template-rows`:** Definem as colunas e linhas do grid, respectivamente. Você especifica o tamanho de cada trilha.
    ```css
    .grid-container {
        display: grid;
        /* Cria 3 colunas: 100px, automática, 200px */
        grid-template-columns: 100px auto 200px;
        /* Cria 2 linhas: 50px de altura, 150px de altura */
        grid-template-rows: 50px 150px;
    }
    ```
    *   **Unidade `fr` (Fração):** Uma unidade flexível específica do Grid. Representa uma fração do espaço *disponível* no contêiner grid. É ótima para layouts fluidos.
        ```css
        /* 3 colunas: a segunda ocupa 2x o espaço da primeira e terceira */
        grid-template-columns: 1fr 2fr 1fr;
        ```
    *   **Função `repeat()`:** Simplifica a definição de múltiplas trilhas de mesmo tamanho.
        ```css
        /* 12 colunas, cada uma ocupando 1 fração do espaço */
        grid-template-columns: repeat(12, 1fr);
        /* 3 colunas de 100px */
        grid-template-columns: repeat(3, 100px);
        ```
    *   **`minmax(min, max)`:** Define um intervalo de tamanho para uma trilha (útil para responsividade).
        ```css
        /* Coluna com no mínimo 100px, máximo 1fr */
        grid-template-columns: minmax(100px, 1fr) 3fr;
        ```
    *   **`auto-fit` e `auto-fill` (com `repeat()`):** Usadas para criar um número flexível de trilhas com base no espaço disponível. `auto-fill` cria quantas trilhas couberem, mesmo que vazias; `auto-fit` colapsa as trilhas vazias.
        ```css
        /* Cria quantas colunas de no mínimo 150px couberem */
        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
        ```
*   **`grid-template-areas`:** Permite definir um layout nomeando áreas e posicionando-as visualmente no CSS. Requer que os itens grid tenham uma propriedade `grid-area` correspondente.
    ```css
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-rows: auto 1fr auto;
        grid-template-areas:
            "header header"
            "sidebar main"
            "footer footer";
        gap: 10px;
    }

    .item1 { grid-area: header; }
    .item2 { grid-area: sidebar; }
    .item3 { grid-area: main; }
    /* .item4 não usado neste layout */
    .item5 { grid-area: footer; }
    ```
    Cada string representa uma linha, e os nomes (separados por espaço) definem quais áreas ocupam quais células. O ponto (`.`) pode ser usado para indicar uma célula vazia.
*   **`gap` (ou `grid-gap` - antigo):** Define o espaçamento (gutter) entre as linhas e colunas do grid.
    *   `gap: 10px;` (10px entre linhas e colunas)
    *   `row-gap: 15px;` (Espaçamento apenas entre linhas)
    *   `column-gap: 5px;` (Espaçamento apenas entre colunas)
    *   `gap: 15px 5px;` (15px entre linhas, 5px entre colunas)
*   **`justify-items`:** Alinha o *conteúdo* dentro de uma célula do grid ao longo do eixo inline (horizontal, por padrão).
    *   `start`, `end`, `center`, `stretch` (padrão).
*   **`align-items`:** Alinha o *conteúdo* dentro de uma célula do grid ao longo do eixo de bloco (vertical, por padrão).
    *   `start`, `end`, `center`, `stretch` (padrão).
*   **`place-items`:** Abreviação para `align-items` e `justify-items` (`place-items: center center;`).
*   **`justify-content`:** Alinha o *grid inteiro* dentro do contêiner grid ao longo do eixo inline (quando o tamanho total do grid é menor que o contêiner).
    *   `start`, `end`, `center`, `stretch`, `space-around`, `space-between`, `space-evenly`.
*   **`align-content`:** Alinha o *grid inteiro* dentro do contêiner grid ao longo do eixo de bloco (quando o tamanho total do grid é menor que o contêiner).
    *   `start`, `end`, `center`, `stretch`, `space-around`, `space-between`, `space-evenly`.
*   **`place-content`:** Abreviação para `align-content` e `justify-content`.
*   **`grid-auto-columns` e `grid-auto-rows`:** Especificam o tamanho de quaisquer trilhas criadas implicitamente (quando você posiciona um item em uma linha ou coluna que não foi definida explicitamente em `grid-template-columns/rows`).
*   **`grid-auto-flow`:** Controla como os itens que não são explicitamente posicionados são colocados no grid.
    *   `row` (padrão): Preenche linha por linha.
    *   `column`: Preenche coluna por coluna.
    *   `dense`: Tenta preencher os buracos deixados no grid anteriormente, o que pode fazer com que os itens apareçam fora da ordem do DOM.

### Propriedades dos Itens Grid

Estas propriedades são aplicadas aos filhos diretos (`.grid-item`).

*   **`grid-column-start`, `grid-column-end`, `grid-row-start`, `grid-row-end`:** Definem em qual linha de grid o item começa e termina, determinando sua posição e extensão no grid.
    ```css
    .item1 {
        grid-column-start: 1;
        grid-column-end: 4; /* Ocupa da linha 1 até a 4 (3 colunas) */
        grid-row-start: 1;
        grid-row-end: 2; /* Ocupa a primeira linha */
    }
    ```
    *   Você pode usar números de linha (positivos ou negativos - negativos contam a partir do final).
    *   Pode usar a palavra-chave `span` para indicar quantas trilhas o item deve ocupar: `grid-column-end: span 2;` (ocupa 2 colunas a partir do início).
    *   Pode usar nomes de linha, se definidos no contêiner: `grid-template-columns: [col1-start] 1fr [col2-start] 1fr [col2-end];` e então `grid-column-start: col1-start;`.
*   **`grid-column` e `grid-row`:** Propriedades abreviadas para `start` e `end`.
    ```css
    /* Equivalente ao exemplo anterior */
    .item1 { grid-column: 1 / 4; grid-row: 1 / 2; }
    /* Ocupa da linha 2 até a 4 */
    .item2 { grid-column: 2 / 4; }
    /* Ocupa 2 colunas a partir da linha 1 */
    .item3 { grid-column: 1 / span 2; }
    ```
*   **`grid-area`:** Pode ser usada de duas formas:
    1.  Como abreviação para `grid-row-start / grid-column-start / grid-row-end / grid-column-end`.
        ```css
        .item1 { grid-area: 1 / 1 / 2 / 4; } /* row-start / col-start / row-end / col-end */
        ```
    2.  Para atribuir um nome à área que o item ocupará, para ser usado com `grid-template-areas` no contêiner.
        ```css
        .item1 { grid-area: cabecalho; }
        ```
*   **`justify-self`:** Alinha um item *individual* dentro de sua área/célula do grid ao longo do eixo inline (sobrescreve `justify-items` do contêiner).
    *   `start`, `end`, `center`, `stretch` (padrão).
*   **`align-self`:** Alinha um item *individual* dentro de sua área/célula do grid ao longo do eixo de bloco (sobrescreve `align-items` do contêiner).
    *   `start`, `end`, `center`, `stretch` (padrão).
*   **`place-self`:** Abreviação para `align-self` e `justify-self`.

Grid Layout é extremamente poderoso para layouts de página inteira e layouts bidimensionais complexos. Frequentemente, Flexbox e Grid são usados juntos: Grid para o layout geral da página e Flexbox para alinhar os componentes dentro de cada área do grid.

## Variáveis CSS (Custom Properties)

As Variáveis CSS, oficialmente chamadas de Custom Properties (Propriedades Personalizadas), permitem definir valores reutilizáveis em seu CSS. Isso é incrivelmente útil para temas, manutenção e para tornar o código mais legível e fácil de atualizar.

**Declaração:**

As variáveis são declaradas usando um nome que começa com dois hífens (`--`) e são geralmente definidas dentro do seletor `:root` (que representa a tag `<html>`), tornando-as globais.

```css
:root {
    --cor-primaria: #0066cc;
    --cor-texto: #333;
    --fonte-padrao: Arial, sans-serif;
    --espacamento-medio: 15px;
}
```

**Uso:**

Para usar uma variável, utilize a função `var()`.

```css
a {
    color: var(--cor-primaria);
    text-decoration: none;
}

body {
    font-family: var(--fonte-padrao);
    color: var(--cor-texto);
    margin: var(--espacamento-medio);
}

button {
    background-color: var(--cor-primaria);
    color: white;
    padding: var(--espacamento-medio);
    border: none;
}
```

**Vantagens:**

*   **Manutenção:** Se você precisar alterar a cor primária do site, basta modificar o valor de `--cor-primaria` em `:root`, e a mudança se refletirá em todos os lugares onde a variável foi usada.
*   **Legibilidade:** Nomes de variáveis como `--cor-primaria` são mais descritivos do que valores hexadecimais como `#0066cc`.
*   **Tematização:** Facilita a criação de temas (por exemplo, modo claro/escuro) alterando os valores das variáveis em um escopo específico (como uma classe no `<body>`).
*   **Cascata e Escopo:** Variáveis CSS seguem as regras normais da cascata e podem ser sobrescritas em seletores mais específicos, permitindo variações locais.

```css
/* Tema escuro */
body.dark-theme {
    --cor-primaria: #3399ff;
    --cor-texto: #f0f0f0;
    background-color: #222;
}

/* Botão especial dentro do tema escuro */
body.dark-theme .botao-especial {
    --cor-primaria: orange; /* Sobrescreve apenas para este botão */
    background-color: var(--cor-primaria);
}
```
*   **Acesso via JavaScript:** Variáveis CSS podem ser lidas e modificadas dinamicamente usando JavaScript.

As Variáveis CSS são uma adição poderosa ao CSS moderno, simplificando muito a gestão de valores consistentes em projetos grandes.

Com Flexbox, Grid e Variáveis CSS em seu arsenal, você está equipado para criar layouts web sofisticados, responsivos e fáceis de manter. A seguir, focaremos especificamente em como fazer nossos layouts se adaptarem a diferentes dispositivos usando técnicas de Design Responsivo.


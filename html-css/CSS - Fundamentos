# CSS - Fundamentos

Após estabelecermos a estrutura e o conteúdo semântico de nossas páginas web com HTML, é hora de dar vida a elas visualmente. Entra em cena o CSS (Cascading Style Sheets), a linguagem que controla a apresentação, o layout e a aparência dos elementos HTML. Neste capítulo, exploraremos os conceitos fundamentais do CSS, desde como aplicá-lo ao seu HTML até a compreensão de sua sintaxe básica, seletores, o crucial Box Model e as propriedades essenciais para estilizar texto, cores e fundos.

## O Que é CSS e Como Adicioná-lo?

Como mencionado anteriormente, CSS é uma linguagem de folha de estilos usada para descrever a aparência de um documento HTML. Ela permite separar a apresentação do conteúdo, tornando o código mais limpo, fácil de manter e flexível. Existem três maneiras principais de adicionar estilos CSS a um documento HTML:

1.  **CSS Inline (Em Linha):**
    Os estilos são aplicados diretamente a um elemento HTML específico usando o atributo `style`.

    ```html
    <p style="color: blue; font-size: 16px;">Este parágrafo terá texto azul e tamanho de fonte 16px.</p>
    ```

    *   **Prós:** Rápido para testes pontuais ou para aplicar um estilo único a um único elemento.
    *   **Contras:** Mistura apresentação com estrutura, torna a manutenção difícil (é preciso alterar cada elemento individualmente), tem alta especificidade (veremos isso adiante), sendo geralmente **desencorajado** para uso extensivo.

2.  **CSS Internal (Interno ou Incorporado):**
    Os estilos são definidos dentro de uma tag `<style>` colocada na seção `<head>` do documento HTML. As regras definidas aqui se aplicam a toda a página.

    ```html
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>CSS Interno</title>
        <style>
            body {
                font-family: sans-serif;
            }
            h1 {
                color: navy;
            }
            p {
                color: gray;
            }
        </style>
    </head>
    <body>
        <h1>Título Principal</h1>
        <p>Este parágrafo herda a fonte do body e tem cor cinza.</p>
        <p>Outro parágrafo com o mesmo estilo.</p>
    </body>
    </html>
    ```

    *   **Prós:** Útil para estilos específicos de uma única página, mantém os estilos separados dos elementos HTML individuais.
    *   **Contras:** Os estilos só se aplicam àquela página específica. Se você tiver vários estilos ou várias páginas com a mesma aparência, ainda resultará em duplicação de código.

3.  **CSS External (Externo):**
    Esta é a **maneira mais comum e recomendada**. Os estilos são definidos em um arquivo separado com a extensão `.css` (por exemplo, `estilos.css`). Este arquivo é então vinculado ao(s) documento(s) HTML usando a tag `<link>` dentro da seção `<head>`.

    **Arquivo `estilos.css`:**
    ```css
    body {
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.6;
    }

    h1 {
        color: darkgreen;
        text-align: center;
    }

    p {
        color: #333; /* Um cinza escuro em hexadecimal */
    }
    ```

    **Arquivo `index.html`:**
    ```html
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <title>CSS Externo</title>
        <link rel="stylesheet" href="estilos.css">
        <!-- O atributo rel="stylesheet" informa que é uma folha de estilo -->
        <!-- O atributo href aponta para o local do arquivo CSS -->
    </head>
    <body>
        <h1>Bem-vindo ao Nosso Site</h1>
        <p>Este conteúdo é estilizado pelo arquivo externo estilos.css.</p>
        <p>Manter os estilos separados facilita a organização e a reutilização.</p>
    </body>
    </html>
    ```

    *   **Prós:** Separação completa entre estrutura (HTML) e apresentação (CSS), facilita a manutenção (altere um arquivo `.css` para mudar a aparência de múltiplas páginas), melhora a performance (o navegador pode armazenar o arquivo `.css` em cache), promove a reutilização de código.
    *   **Contras:** Requer um arquivo adicional.

Para qualquer projeto além do mais simples, o método de **CSS Externo** é a escolha padrão e a melhor prática.

## Sintaxe Básica: Seletores, Propriedades e Valores

Uma regra CSS consiste em duas partes principais: um **seletor** e um **bloco de declaração**.

```css
/* Exemplo de Regra CSS */

/* Seletor */
h1 {
    /* Bloco de Declaração */
    color: blue;        /* Declaração 1: Propriedade: Valor; */
    font-size: 2.5em;   /* Declaração 2: Propriedade: Valor; */
    text-align: center; /* Declaração 3: Propriedade: Valor; */
}

/* Outro Seletor */
p {
    color: #666;
    line-height: 1.5;
}
```

*   **Seletor:** Aponta para o(s) elemento(s) HTML que você deseja estilizar. No exemplo acima, `h1` e `p` são seletores de tipo (ou elemento), que selecionam todas as tags `<h1>` e `<p>` na página, respectivamente. Veremos outros tipos de seletores em breve.
*   **Bloco de Declaração:** Contém uma ou mais declarações, envoltas por chaves `{}`.
*   **Declaração:** Consiste em uma **propriedade** CSS e seu **valor**, separados por dois pontos `:`. Cada declaração termina com um ponto e vírgula `;`. O ponto e vírgula é tecnicamente opcional para a última declaração dentro de um bloco, mas é uma **boa prática sempre incluí-lo** para evitar erros ao adicionar novas declarações posteriormente.
    *   **Propriedade:** É o atributo de estilo que você deseja alterar (ex: `color`, `font-size`, `text-align`, `line-height`).
    *   **Valor:** É a configuração que você deseja aplicar à propriedade (ex: `blue`, `2.5em`, `center`, `#666`, `1.5`). Os valores válidos dependem da propriedade.
*   **Comentários:** Podem ser adicionados usando `/* Comentário aqui */`. São ignorados pelo navegador, mas úteis para explicar o código.

## Seletores CSS: Mirando nos Elementos Certos

Os seletores são a espinha dorsal do CSS, pois determinam *quais* elementos HTML serão afetados por suas regras de estilo. Existem muitos tipos de seletores, permitindo um controle preciso.

### Seletores Básicos

*   **Seletor de Tipo (Elemento):** Seleciona todos os elementos de um determinado tipo de tag.
    ```css
    p { color: green; } /* Todos os parágrafos */
    div { border: 1px solid gray; } /* Todas as divs */
    ```
*   **Seletor de Classe (`.`):** Seleciona todos os elementos que possuem um atributo `class` específico. Classes são reutilizáveis e podem ser aplicadas a múltiplos elementos, inclusive de tipos diferentes.
    ```html
    <p class="destaque">Texto importante.</p>
    <div class="destaque alerta">Caixa de alerta.</div>
    ```
    ```css
    .destaque { font-weight: bold; } /* Elementos com class="destaque" */
    .alerta { background-color: yellow; } /* Elementos com class="alerta" */
    ```
    Note que um elemento pode ter múltiplas classes, separadas por espaço. A regra `.destaque` se aplicará a ambos os elementos, enquanto `.alerta` só se aplicará à `div`.
*   **Seletor de ID (`#`):** Seleciona um *único* elemento que possui um atributo `id` específico. Um `id` **deve ser único** dentro de uma página HTML.
    ```html
    <div id="cabecalho-principal">...</div>
    ```
    ```css
    #cabecalho-principal { background-color: lightblue; } /* O elemento com id="cabecalho-principal" */
    ```
    IDs são frequentemente usados para elementos únicos na página ou como alvos para links de fragmento e JavaScript, mas para estilização, as classes são geralmente mais flexíveis.
*   **Seletor Universal (`*`):** Seleciona *todos* os elementos na página. Use com cautela, pois pode ter implicações de performance e sobrescrever estilos de forma inesperada.
    ```css
    * { margin: 0; padding: 0; box-sizing: border-box; } /* Reset comum */
    ```
*   **Seletor de Atributo (`[]`):** Seleciona elementos com base na presença ou valor de um atributo.
    ```css
    a[target="_blank"] { background-color: yellow; } /* Links que abrem em nova aba */
    input[type="text"] { border: 1px solid blue; } /* Inputs de texto */
    img[alt] { border: 2px solid green; } /* Imagens que possuem o atributo alt */
    ```

### Combinadores

Combinadores permitem selecionar elementos com base em sua relação com outros elementos na árvore do documento.

*   **Descendente (` ` espaço):** Seleciona elementos que são descendentes (filhos, netos, etc.) de outro elemento.
    ```css
    /* Seleciona qualquer <a> que esteja dentro de um <li> */
    li a { text-decoration: none; }
    ```
*   **Filho Direto (`>`):** Seleciona elementos que são filhos *diretos* de outro elemento.
    ```css
    /* Seleciona apenas os <li> que são filhos diretos de um <ul> com id="menu-principal" */
    ul#menu-principal > li { display: inline-block; }
    ```
*   **Irmão Adjacente (`+`):** Seleciona um elemento que vem *imediatamente após* outro elemento, sendo ambos irmãos (mesmo pai).
    ```css
    /* Seleciona um <p> que vem logo após um <h1> */
    h1 + p { margin-top: 0; }
    ```
*   **Irmão Geral (`~`):** Seleciona todos os elementos que vêm *após* outro elemento, sendo todos irmãos.
    ```css
    /* Seleciona todos os <p> que são irmãos e vêm depois de um <h2> */
    h2 ~ p { color: gray; }
    ```

### Pseudo-classes (`:`)

Pseudo-classes selecionam elementos com base em um estado específico ou posição.

*   **Estados de Link/Interação:**
    *   `:link`: Links não visitados.
    *   `:visited`: Links já visitados.
    *   `:hover`: Elemento quando o cursor do mouse está sobre ele.
    *   `:active`: Elemento enquanto está sendo ativado (ex: clicado).
    *   `:focus`: Elemento quando recebe foco (ex: um campo de formulário selecionado ou um link navegado via teclado).
    ```css
    a:link { color: blue; }
    a:visited { color: purple; }
    a:hover { text-decoration: underline; color: red; }
    a:active { color: yellow; }
    input:focus { border-color: orange; outline: none; }
    ```
    (A ordem LVHA - Link, Visited, Hover, Active - é frequentemente recomendada para links devido à especificidade).
*   **Estruturais:**
    *   `:first-child`: Primeiro elemento filho de seu pai.
    *   `:last-child`: Último elemento filho de seu pai.
    *   `:nth-child(n)`: Elemento filho na posição `n` (pode usar números, `odd`, `even`, ou fórmulas como `2n+1`).
    *   `:nth-of-type(n)`: Similar ao `nth-child`, mas considera apenas elementos do mesmo *tipo*.
    *   `:not(seletor)`: Seleciona elementos que *não* correspondem ao seletor interno.
    ```css
    li:first-child { font-weight: bold; }
    tr:nth-child(even) { background-color: #f2f2f2; } /* Linhas pares da tabela */
    p:not(.introducao) { font-size: 14px; } /* Parágrafos que não têm a classe 'introducao' */
    ```

### Pseudo-elementos (`::`)

Pseudo-elementos permitem estilizar partes específicas de um elemento selecionado.

*   `::before`: Cria um pseudo-elemento *antes* do conteúdo do elemento selecionado.
*   `::after`: Cria um pseudo-elemento *depois* do conteúdo do elemento selecionado.
    (Frequentemente usados com a propriedade `content` para inserir conteúdo decorativo).
*   `::first-letter`: Estiliza a primeira letra do conteúdo textual do elemento.
*   `::first-line`: Estiliza a primeira linha do conteúdo textual do elemento.
*   `::selection`: Estiliza a porção do documento que foi destacada (selecionada) pelo usuário.
    ```css
    p::first-letter { font-size: 2em; float: left; margin-right: 0.1em; }
    a::after { content: " (link)"; font-size: 0.8em; }
    ::selection { background-color: yellow; color: black; }
    ```
    (Nota: Por razões históricas, pseudo-elementos também podem ser escritos com um único `:` como as pseudo-classes, mas a sintaxe `::` é a padrão e preferida para diferenciá-los).

Dominar os seletores é fundamental para aplicar estilos de forma eficaz e eficiente.

## O Modelo de Cascata, Especificidade e Herança

O "C" em CSS significa "Cascading" (Cascata). Isso se refere ao algoritmo que os navegadores usam para determinar qual regra de estilo aplicar quando múltiplas regras podem afetar o mesmo elemento. Três conceitos principais governam isso:

1.  **Cascata (Origem e Ordem):** As regras CSS vêm de diferentes fontes (folhas de estilo do navegador, do usuário, do autor - você!) e são aplicadas em uma ordem específica. Geralmente, as regras do autor (seus arquivos `.css`, estilos internos e inline) têm precedência sobre as do navegador. Se múltiplas regras do autor se aplicam, a **última regra definida** no código geralmente vence, assumindo que tenham a mesma especificidade.

    ```css
    /* Em estilos.css */
    p { color: blue; }
    p { color: red; } /* Esta regra vence, o parágrafo será vermelho */
    ```

2.  **Especificidade:** Quando múltiplas regras com seletores diferentes miram no mesmo elemento, o navegador usa a especificidade para decidir qual regra é mais *específica* e, portanto, deve ser aplicada. Seletores mais específicos têm maior peso.
A especificidade é geralmente calculada da seguinte forma (do mais alto para o mais baixo peso):
    *   **Estilos Inline:** Estilos aplicados diretamente com o atributo `style` têm a maior especificidade.
    *   **IDs (`#`):** Seletores de ID têm alta especificidade.
    *   **Classes (`.`), Pseudo-classes (`:`), Seletores de Atributo (`[]`):** Têm especificidade média.
    *   **Seletores de Tipo (`p`, `div`), Pseudo-elementos (`::`):** Têm a menor especificidade.
    *   O seletor universal (`*`) e combinadores (`>`, `+`, `~`, ` `) não adicionam especificidade por si só.

    O navegador calcula um "placar" de especificidade para cada seletor. Aquele com o placar mais alto vence.

    ```html
    <p id="intro" class="destaque" style="color: green;">Parágrafo</p>
    ```
    ```css
    /* Arquivo CSS */
    p { color: blue; }             /* Baixa especificidade (Tipo) */
    .destaque { color: orange; }   /* Média especificidade (Classe) */
    #intro { color: purple; }      /* Alta especificidade (ID) */
    ```
    Neste caso:
    *   O estilo inline `color: green;` vencerá todos os outros devido à sua altíssima especificidade.
    *   Se o estilo inline fosse removido, `#intro { color: purple; }` venceria por ter maior especificidade que a classe.
    *   Se o ID e o inline fossem removidos, `.destaque { color: orange; }` venceria.
    *   A regra `p { color: blue; }` só seria aplicada se nenhuma das outras mais específicas existisse.

    **`!important`:** Você pode adicionar `!important` ao final de uma declaração (ex: `color: red !important;`) para sobrescrever *qualquer* outra declaração, independentemente da especificidade ou ordem. **Use `!important` com extrema cautela e apenas como último recurso**, pois quebra a cascata natural e torna a depuração muito mais difícil.

3.  **Herança:** Alguns (mas não todos) valores de propriedades CSS aplicados a um elemento pai são herdados por seus elementos filhos. Propriedades relacionadas a texto, como `color`, `font-family`, `font-size`, `line-height`, `text-align`, são tipicamente herdadas. Propriedades relacionadas ao layout e ao box model, como `width`, `height`, `padding`, `margin`, `border`, geralmente **não** são herdadas.

    ```html
    <div style="color: blue; border: 1px solid red;">
        <p>Este parágrafo herda a cor azul do div pai, mas não a borda.</p>
    </div>
    ```
    Você pode forçar a herança com o valor `inherit` ou redefinir para o valor padrão do navegador com `initial` ou `unset`.

Compreender esses três conceitos é vital para prever e controlar como seus estilos serão aplicados.

## O Box Model: Entendendo o Espaço dos Elementos

Todo elemento HTML renderizado na página é tratado pelo CSS como uma caixa retangular. O **Box Model** (Modelo de Caixa) descreve como essa caixa é composta e como suas dimensões e espaçamentos são calculados. Ele consiste em quatro partes, de dentro para fora:

1.  **Content (Conteúdo):** A área onde o conteúdo real do elemento (texto, imagem, etc.) é exibido. Suas dimensões são definidas pelas propriedades `width` e `height` (ou determinadas intrinsecamente pelo conteúdo).
2.  **Padding (Preenchimento):** Uma área transparente ao redor do conteúdo, mas dentro da borda. Controla o espaço entre o conteúdo e a borda. Definido pelas propriedades `padding-top`, `padding-right`, `padding-bottom`, `padding-left` ou a forma abreviada `padding`.
3.  **Border (Borda):** Uma linha que envolve o padding e o conteúdo. Sua espessura, estilo e cor são definidos pelas propriedades `border-width`, `border-style`, `border-color` ou as formas abreviadas como `border`.
4.  **Margin (Margem):** Uma área transparente *fora* da borda. Controla o espaço entre a caixa deste elemento e as caixas de outros elementos adjacentes. Definido pelas propriedades `margin-top`, `margin-right`, `margin-bottom`, `margin-left` ou a forma abreviada `margin`.

**Visualização:**

```
+------------------------------------+
| Margin                             |
|   +----------------------------+   |
|   | Border                     |   |
|   |   +--------------------+   |   |
|   |   | Padding            |   |   |
|   |   |   +--------------+ |   |   |
|   |   |   | Content      | |   |   |
|   |   |   | (width/height)| |   |   |
|   |   |   +--------------+ |   |   |
|   |   +--------------------+   |   |
|   +----------------------------+   |
+------------------------------------+
```

**Propriedade `box-sizing`:**

Por padrão (`box-sizing: content-box;`), as propriedades `width` e `height` que você define se aplicam apenas à área de *conteúdo*. O padding e a borda são adicionados *além* dessa largura/altura, o que pode tornar o cálculo do tamanho total da caixa um pouco contraintuitivo.

Uma prática extremamente comum e recomendada é definir `box-sizing: border-box;` globalmente. Com `border-box`, as propriedades `width` e `height` definem o tamanho total da caixa, *incluindo* o padding e a borda. O espaço para o conteúdo é então ajustado internamente.

```css
/* Aplica border-box a todos os elementos */
*,
*::before,
*::after {
    box-sizing: border-box;
}
```
Isso torna o dimensionamento dos elementos muito mais previsível.

**Propriedades Abreviadas (Shorthand):**

Muitas propriedades do Box Model (e outras) têm formas abreviadas:

*   `padding: 10px;` (Aplica 10px a todos os 4 lados)
*   `padding: 10px 20px;` (10px para topo/baixo, 20px para esquerda/direita)
*   `padding: 10px 20px 5px;` (10px topo, 20px esquerda/direita, 5px baixo)
*   `padding: 10px 20px 5px 15px;` (10px topo, 20px direita, 5px baixo, 15px esquerda - sentido horário)

O mesmo padrão se aplica a `margin` e `border-width`. Para `border`, a forma abreviada comum é `border: [width] [style] [color];` (ex: `border: 1px solid black;`).

**Colapso de Margens (Margin Collapsing):**
Um comportamento importante a notar é que as margens verticais (top/bottom) entre elementos de bloco adjacentes podem "colapsar". Em vez de somar as margens, apenas a maior das duas margens adjacentes é aplicada. Isso não acontece com margens horizontais (left/right) nem com padding ou bordas.

## Unidades de Medida

O CSS oferece várias unidades para especificar tamanhos, distâncias e outras quantidades.

### Unidades Absolutas

Têm um tamanho fixo e não mudam com base em outros elementos ou no tamanho da tela.

*   **`px` (Pixels):** A unidade absoluta mais comum na web. Representa um pixel na tela do dispositivo. Embora tecnicamente absoluto, a densidade de pixels pode variar entre telas.

Outras unidades absolutas como `cm`, `mm`, `in`, `pt`, `pc` existem, mas são raramente usadas para design de tela, sendo mais relevantes para impressão.

### Unidades Relativas

Seu valor é calculado com base em outro valor, tornando-as ideais para layouts flexíveis e responsivos.

*   **`%` (Porcentagem):** Relativa ao valor da mesma propriedade no elemento pai (para `width`, `height`, `padding`, `margin`) ou ao tamanho da fonte do elemento pai (para `font-size`).
*   **`em`:** Relativa ao `font-size` do *próprio elemento* (para propriedades como `padding`, `margin`, `width`) ou ao `font-size` do *elemento pai* (quando usada para definir o `font-size` do próprio elemento). Isso pode levar a efeitos de composição complexos se muitos elementos aninhados usarem `em`.
*   **`rem` (Root em):** Relativa ao `font-size` do *elemento raiz* (`<html>`). Isso evita o problema de composição do `em`, tornando `rem` uma escolha muito popular para definir tamanhos de fonte, padding, margin, etc., de forma escalável e consistente. Alterar o `font-size` no `<html>` redimensiona tudo que foi definido em `rem`.
*   **`vw` (Viewport Width):** 1vw é igual a 1% da largura da *viewport* (a área visível da janela do navegador).
*   **`vh` (Viewport Height):** 1vh é igual a 1% da altura da *viewport*.
*   **`vmin`:** 1vmin é igual a 1vw ou 1vh, o que for *menor*.
*   **`vmax`:** 1vmax é igual a 1vw ou 1vh, o que for *maior*.

Unidades relativas como `rem`, `%`, `vw`, e `vh` são fundamentais para criar designs que se adaptam bem a diferentes tamanhos de tela (design responsivo).

## Cores no CSS

Existem várias maneiras de especificar cores em CSS:

*   **Nomes de Cores:** Palavras-chave predefinidas como `red`, `blue`, `green`, `black`, `white`, `lightgray`, etc. Existem cerca de 140 nomes de cores padrão.
    ```css
    h1 { color: darkcyan; }
    ```
*   **Hexadecimal (`#RRGGBB` ou `#RGB`):** Representa a cor usando valores hexadecimais para Vermelho (RR), Verde (GG) e Azul (BB). Cada par varia de `00` (mínimo) a `FF` (máximo). A forma curta `#RGB` é uma abreviação para `#RRGGBB` (ex: `#F0C` é `#FF00CC`).
    ```css
    body { background-color: #f0f0f0; } /* Cinza claro */
    a { color: #0066cc; } /* Azul */
    ```
*   **RGB (`rgb(R, G, B)`):** Similar ao Hex, mas usa valores decimais de 0 a 255 para cada canal de cor (Vermelho, Verde, Azul).
    ```css
    p { color: rgb(51, 51, 51); } /* Equivalente a #333 */
    ```
*   **RGBA (`rgba(R, G, B, A)`):** Adiciona um canal Alfa (A) ao RGB, controlando a opacidade/transparência. O valor Alfa varia de `0` (totalmente transparente) a `1` (totalmente opaco), com valores decimais no meio (ex: `0.5` para 50% de opacidade).
    ```css
    .overlay { background-color: rgba(0, 0, 0, 0.7); } /* Preto com 70% de opacidade */
    ```
*   **HSL (`hsl(H, S%, L%)`):** Define a cor usando Matiz (Hue), Saturação (Saturation) e Luminosidade (Lightness).
    *   Matiz (H): Um ângulo no círculo de cores (0 a 360 graus; 0/360 é vermelho, 120 é verde, 240 é azul).
    *   Saturação (S): A intensidade da cor (0% é cinza, 100% é a cor pura).
    *   Luminosidade (L): O brilho (0% é preto, 50% é a cor normal, 100% é branco).
    ```css
    button { background-color: hsl(210, 80%, 50%); } /* Um azul vibrante */
    ```
*   **HSLA (`hsla(H, S%, L%, A)`):** Adiciona o canal Alfa (opacidade) ao HSL.
    ```css
    .tooltip { background-color: hsla(0, 0%, 10%, 0.8); } /* Cinza escuro com 80% de opacidade */
    ```

HSL/HSLA podem ser mais intuitivos para ajustar cores (ex: clarear/escurecer alterando L, mudar a intensidade com S, ou criar variações com H).

## Estilizando Texto

O CSS oferece um vasto controle sobre a aparência do texto:

*   **`color`:** Define a cor do texto (usando qualquer formato de cor válido).
*   **`font-family`:** Especifica a fonte (ou uma lista de fontes alternativas, chamadas "font stack"). É uma boa prática fornecer alternativas genéricas (como `sans-serif` ou `serif`) no final.
    ```css
    body { font-family: Arial, Helvetica, sans-serif; }
    h1 { font-family: "Georgia", Times, serif; }
    ```
*   **`font-size`:** Define o tamanho do texto (usando `px`, `em`, `rem`, `%`, etc.). `rem` é frequentemente recomendado para escalabilidade.
*   **`font-weight`:** Controla a espessura da fonte (`normal`, `bold`, ou valores numéricos como `400` para normal, `700` para bold, dependendo da fonte).
*   **`font-style`:** Aplica estilos como `italic` ou `oblique`.
*   **`text-align`:** Alinha o texto horizontalmente dentro de seu contêiner (`left`, `right`, `center`, `justify`).
*   **`line-height`:** Define a altura da linha, controlando o espaçamento vertical entre as linhas de texto. Pode ser um número sem unidade (multiplicador do `font-size`), ou um valor com unidade (`px`, `em`, `rem`). Números sem unidade são geralmente preferíveis para herança.
*   **`text-decoration`:** Adiciona ou remove decorações como `underline`, `overline`, `line-through`. Use `text-decoration: none;` para remover o sublinhado padrão dos links.
*   **`text-transform`:** Transforma o texto para `uppercase` (maiúsculas), `lowercase` (minúsculas), ou `capitalize` (primeira letra de cada palavra em maiúscula).
*   **`letter-spacing`:** Ajusta o espaço entre os caracteres.
*   **`word-spacing`:** Ajusta o espaço entre as palavras.

## Backgrounds (Fundos)

Você pode controlar o fundo dos elementos:

*   **`background-color`:** Define uma cor sólida para o fundo.
*   **`background-image`:** Define uma imagem como fundo. Use a função `url()` para especificar o caminho da imagem.
    ```css
    body { background-image: url('../imagens/fundo.jpg'); }
    ```
*   **`background-repeat`:** Controla se a imagem de fundo se repete (`repeat`, `repeat-x`, `repeat-y`, `no-repeat`).
*   **`background-position`:** Define a posição inicial da imagem de fundo (usando palavras-chave como `center`, `top`, `bottom`, `left`, `right`, ou valores percentuais/pixels).
*   **`background-size`:** Controla o tamanho da imagem de fundo (`auto`, `cover` - para cobrir toda a área, `contain` - para caber dentro da área, ou valores específicos).
*   **`background-attachment`:** Define se a imagem de fundo rola com a página (`scroll` - padrão) ou permanece fixa (`fixed`).
*   **`background` (Shorthand):** Propriedade abreviada para definir múltiplas propriedades de fundo em uma única declaração.
    ```css
    div.hero {
        background: url('hero.png') no-repeat center center / cover;
        /* Imagem, Repetição, Posição / Tamanho */
        background-color: #eee; /* Cor de fallback */
    }
    ```

## Propriedades de Layout Básicas

Embora Flexbox e Grid (que veremos depois) sejam as ferramentas modernas preferidas para layouts complexos, algumas propriedades básicas ainda são fundamentais:

*   **`display`:** Esta é uma das propriedades CSS mais importantes, pois define como um elemento é renderizado e como ele interage com outros elementos em termos de layout.
    *   **`block`:** O elemento começa em uma nova linha e ocupa toda a largura disponível (ex: `<h1>`, `<p>`, `<div>`, `<li>`). Você pode definir `width`, `height`, `margin`, `padding`.
    *   **`inline`:** O elemento flui com o texto e ocupa apenas a largura necessária para seu conteúdo (ex: `<a>`, `<span>`, `<img>`, `<strong>`). `width` e `height` não se aplicam diretamente; `margin-top/bottom` e `padding-top/bottom` têm efeitos limitados.
    *   **`inline-block`:** Combina características de ambos. O elemento flui como `inline`, mas você pode definir `width`, `height`, `margin` e `padding` como em um elemento `block`.
    *   **`none`:** O elemento é completamente removido da página e não ocupa espaço (diferente de `visibility: hidden;`, que apenas o torna invisível, mas ainda ocupa espaço).
    *   Outros valores importantes incluem `flex`, `grid`, `table`, etc., que ativam modelos de layout específicos.
*   **`position`:** Controla como um elemento é posicionado na página.
    *   **`static`:** Posição padrão. O elemento segue o fluxo normal do documento. As propriedades `top`, `right`, `bottom`, `left` e `z-index` não têm efeito.
    *   **`relative`:** O elemento é posicionado em relação à sua posição *normal* no fluxo. Você pode usar `top`, `right`, `bottom`, `left` para deslocá-lo de sua posição original, mas o espaço original que ele ocuparia ainda é preservado no layout.
    *   **`absolute`:** O elemento é removido do fluxo normal do documento e posicionado em relação ao seu *ancestral posicionado mais próximo* (um ancestral com `position` diferente de `static`). Se não houver ancestral posicionado, ele se posiciona em relação ao bloco contendo inicial (geralmente a tag `<html>` ou `<body>`). Use `top`, `right`, `bottom`, `left` para definir sua posição.
    *   **`fixed`:** Similar ao `absolute`, mas o elemento é posicionado em relação à *viewport* do navegador. Ele permanece fixo na tela mesmo quando a página é rolada.
    *   **`sticky`:** Um híbrido entre `relative` e `fixed`. O elemento é tratado como `relative` até que atinja um limite especificado (usando `top`, `right`, `bottom`, ou `left`) durante a rolagem, momento em que se torna `fixed` em relação à viewport (ou ao contêiner de rolagem).
*   **`float` e `clear` (Contexto Histórico):**
    *   **`float: left;` / `float: right;`:** Remove o elemento do fluxo normal e o move para a esquerda ou direita de seu contêiner, permitindo que outros conteúdos (como texto) fluam ao redor dele. Era amplamente usado para criar layouts de colunas antes do Flexbox e Grid.
    *   **`clear: left;` / `clear: right;` / `clear: both;`:** Usado em um elemento para garantir que ele apareça *abaixo* de qualquer elemento flutuante anterior (à esquerda, à direita ou ambos). Era essencial para controlar os efeitos colaterais dos floats.
    Embora `float` ainda seja útil para fazer texto envolver imagens, seu uso para layout geral da página é **fortemente desencorajado** em favor de Flexbox e Grid, que são muito mais poderosos e fáceis de controlar.

Com estes fundamentos de CSS, você já pode começar a transformar a aparência de suas páginas HTML. No próximo capítulo, mergulharemos nas técnicas de layout mais modernas e poderosas: Flexbox e Grid Layout.


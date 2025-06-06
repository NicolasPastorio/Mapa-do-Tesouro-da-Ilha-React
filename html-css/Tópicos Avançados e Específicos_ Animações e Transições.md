# Tópicos Avançados e Específicos: Animações e Transições

Além de estruturar e estilizar páginas estáticas, o CSS moderno oferece ferramentas poderosas para adicionar movimento e interatividade às interfaces web, tornando-as mais envolventes e intuitivas. As Transições (Transitions) e Animações (Animations) CSS, juntamente com as Transformações (Transforms), permitem criar efeitos visuais suaves e complexos sem a necessidade de JavaScript (ou complementando-o).

## CSS Transforms: Modificando Posição, Rotação e Escala

Antes de mergulharmos nas transições e animações, é fundamental entender as **Transformações CSS**. Elas permitem modificar o sistema de coordenadas de um elemento, alterando sua posição, rotação, escala ou inclinação, sem afetar o fluxo normal do layout (outros elementos não se movem para acomodar a transformação, a menos que a própria transformação cause uma sobreposição).

As transformações são aplicadas usando a propriedade `transform`.

### Transformações 2D

Operam no plano bidimensional (X e Y).

*   **`translate(tx, ty)`:** Move o elemento horizontalmente (tx) e verticalmente (ty). Valores positivos movem para a direita/baixo, negativos para a esquerda/cima. Pode usar unidades como `px`, `%`, `em`, `rem`.
    *   `transform: translate(50px, 20px);` (Move 50px para a direita, 20px para baixo)
    *   `transform: translateX(100px);` (Move apenas horizontalmente)
    *   `transform: translateY(-50%);` (Move para cima metade da *altura do próprio elemento*)
*   **`rotate(angulo)`:** Rotaciona o elemento em torno de seu ponto de origem (por padrão, o centro). O ângulo pode ser em `deg` (graus), `rad` (radianos), `grad` (grados) ou `turn` (voltas).
    *   `transform: rotate(45deg);` (Rotaciona 45 graus no sentido horário)
    *   `transform: rotate(-0.25turn);` (Rotaciona 90 graus no sentido anti-horário)
*   **`scale(sx, sy)`:** Redimensiona o elemento horizontalmente (sx) e verticalmente (sy). Um valor de `1` é o tamanho original, `2` é o dobro, `0.5` é metade. Se apenas um valor for fornecido, ele se aplica a ambos os eixos.
    *   `transform: scale(1.5);` (Aumenta o elemento em 50% em ambos os eixos)
    *   `transform: scaleX(2);` (Dobra a largura)
    *   `transform: scaleY(0.8);` (Reduz a altura para 80%)
*   **`skew(ax, ay)`:** Inclina o elemento ao longo dos eixos X e Y. Os valores são ângulos (`deg`).
    *   `transform: skewX(20deg);` (Inclina ao longo do eixo X)
    *   `transform: skewY(-10deg);`
    *   `transform: skew(20deg, -10deg);`

**Ponto de Origem (`transform-origin`):**

Por padrão, as transformações (especialmente rotação e escala) ocorrem em torno do centro do elemento (`50% 50%`). Você pode mudar isso com a propriedade `transform-origin`.

```css
.elemento {
    transform-origin: top left; /* Transforma a partir do canto superior esquerdo */
    transform: rotate(30deg);
}

.outro-elemento {
    transform-origin: 0 100%; /* Transforma a partir do canto inferior esquerdo */
    transform: scale(1.2);
}
```

**Múltiplas Transformações:**

Você pode aplicar múltiplas funções de transformação na mesma propriedade `transform`, separadas por espaço. A ordem importa!

```css
.elemento {
    transform: translateX(50px) rotate(45deg) scale(1.1);
}
```

### Transformações 3D

Permitem manipular elementos em um espaço tridimensional (X, Y e Z - profundidade).

*   **`translate3d(tx, ty, tz)`:** Move nos três eixos. `translateZ(tz)` move o elemento para mais perto (`+tz`) ou mais longe (`-tz`) do observador.
*   **`rotate3d(x, y, z, angulo)`:** Rotaciona em torno de um vetor [x, y, z]. Funções mais simples incluem `rotateX(angulo)`, `rotateY(angulo)`, `rotateZ(angulo)` (equivalente a `rotate()` 2D).
*   **`scale3d(sx, sy, sz)`:** Redimensiona nos três eixos. `scaleZ(sz)` afeta a profundidade.
*   **`perspective(valor)`:** Esta propriedade é aplicada ao *elemento pai* (ou na própria propriedade `transform` do elemento filho) para criar um efeito de perspectiva. Quanto menor o valor (ex: `500px`), mais intensa a perspectiva. Sem perspectiva, as transformações Z não terão efeito visual aparente.
*   **`transform-style: preserve-3d;`:** Aplicada ao elemento pai de elementos transformados em 3D, permite que os filhos mantenham suas próprias posições 3D em relação ao pai, criando hierarquias 3D.
*   **`backface-visibility: hidden;`:** Oculta a face traseira de um elemento quando ele é rotacionado em 3D (útil para efeitos de cartão virando).

```css
.container-3d {
    perspective: 800px;
}

.elemento-3d {
    transform-style: preserve-3d; /* Se tiver filhos 3D */
    transform: rotateY(60deg) translateZ(100px);
    backface-visibility: hidden;
}
```

As transformações são a base para a maioria das animações e transições visuais no CSS.

## CSS Transitions: Animando Mudanças de Estado

Transições CSS permitem animar suavemente a mudança de valor de uma propriedade CSS ao longo de um período especificado. Elas são acionadas quando o valor de uma propriedade monitorada muda, geralmente devido a uma interação do usuário (como `:hover`, `:focus`, `:active`) ou uma mudança de classe via JavaScript.

**Propriedades Essenciais:**

*   **`transition-property`:** Especifica qual(is) propriedade(s) CSS devem ser animadas. Você pode listar propriedades específicas (`width`, `background-color`, `transform`) ou usar `all` para monitorar todas as propriedades animáveis.
*   **`transition-duration`:** Define quanto tempo a transição deve levar para ser concluída. O valor é em segundos (`s`) ou milissegundos (`ms`). Ex: `0.3s`, `500ms`.
*   **`transition-timing-function`:** Controla a curva de aceleração da transição (como a velocidade muda ao longo do tempo).
    *   `ease` (padrão): Começa devagar, acelera no meio, desacelera no final.
    *   `linear`: Velocidade constante.
    *   `ease-in`: Começa devagar, acelera até o final.
    *   `ease-out`: Começa rápido, desacelera até o final.
    *   `ease-in-out`: Similar ao `ease`, mas mais simétrico.
    *   `cubic-bezier(n, n, n, n)`: Permite definir uma curva personalizada.
    *   `steps(n, start/end)`: Move a transição em `n` etapas discretas.
*   **`transition-delay`:** Define um atraso antes que a transição comece. O valor é em segundos (`s`) ou milissegundos (`ms`). O padrão é `0s`.

**Propriedade Abreviada `transition`:**

É mais comum usar a forma abreviada `transition`, que permite definir todas as quatro propriedades em uma única declaração. A ordem geralmente recomendada (embora flexível para duração e atraso) é:
`transition: [property] [duration] [timing-function] [delay];`

**Exemplo:**

```html
<button class="botao-transicao">Passe o mouse</button>
```

```css
.botao-transicao {
    background-color: dodgerblue;
    color: white;
    padding: 15px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;

    /* Define a transição no estado base */
    /* Anima background-color e transform em 0.3s com ease-out */
    transition: background-color 0.3s ease-out, transform 0.3s ease-out;
    /* Alternativa com 'all': transition: all 0.3s ease-out; */
}

.botao-transicao:hover, 
.botao-transicao:focus {
    background-color: royalblue;
    transform: translateY(-3px) scale(1.05); /* Move um pouco para cima e aumenta */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.botao-transicao:active {
    transform: translateY(0) scale(1); /* Volta ao normal ao clicar */
    background-color: darkblue;
    transition-duration: 0.1s; /* Transição mais rápida ao clicar */
}
```

**Como Funciona:**

1.  A propriedade `transition` é definida no estado *base* do elemento (`.botao-transicao`). Ela informa ao navegador: "Quando as propriedades `background-color` ou `transform` mudarem, anime essa mudança ao longo de 0.3 segundos usando a função `ease-out`."
2.  Quando o usuário passa o mouse (`:hover`) ou foca (`:focus`) no botão, as regras CSS dentro do bloco `:hover, :focus` são aplicadas.
3.  O navegador detecta que os valores de `background-color` e `transform` mudaram.
4.  Como essas propriedades estão listadas em `transition-property` (ou `all`), em vez de aplicar a mudança instantaneamente, o navegador interpola suavemente os valores do estado base para os valores do estado `:hover/:focus` ao longo dos 0.3 segundos especificados.
5.  Quando o mouse sai ou o foco é perdido, as propriedades retornam aos seus valores do estado base, e o navegador anima essa reversão também usando a mesma transição.

**O que pode ser Transicionado?**

Nem todas as propriedades CSS podem ser transicionadas. Apenas aquelas que têm valores intermediários identificáveis (como cores, números, porcentagens, comprimentos) podem. Propriedades como `display`, `font-family`, ou `background-image` (com exceção de gradientes) geralmente não podem ser transicionadas diretamente.

**Performance:**

Transições que animam as propriedades `transform` e `opacity` são geralmente as mais performáticas, pois podem ser aceleradas pela GPU do navegador, sem causar recalculos de layout (reflow) ou repintura (repaint) de toda a página. Tente priorizar a animação dessas propriedades sempre que possível.

## CSS Animations: Criando Sequências de Animação Complexas

Enquanto as transições são ótimas para animar mudanças simples entre dois estados, as **Animações CSS** oferecem controle muito maior, permitindo criar sequências de múltiplos passos, repetições e controle mais fino sobre o comportamento da animação.

As animações CSS funcionam em duas partes:

1.  **`@keyframes`:** Uma regra especial onde você define os "quadros-chave" (keyframes) da sua animação, especificando os estilos que o elemento deve ter em pontos percentuais específicos ao longo da duração da animação.
2.  **Propriedades `animation-*`:** Aplicadas ao elemento que você deseja animar, essas propriedades vinculam o elemento à animação definida nos `@keyframes` e controlam como ela é executada (duração, repetição, direção, etc.).

**Definindo os Keyframes (`@keyframes`):**

```css
/* Define uma animação chamada 'pulsar' */
@keyframes pulsar {
    /* Estado inicial (0% é sinônimo de 'from') */
    from {
        transform: scale(1);
        opacity: 1;
    }

    /* Estado intermediário */
    50% {
        transform: scale(1.1);
        opacity: 0.7;
    }

    /* Estado final (100% é sinônimo de 'to') */
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Outro exemplo: Mover e mudar cor */
@keyframes mover-e-colorir {
    0% {
        transform: translateX(0);
        background-color: blue;
    }
    50% {
        transform: translateX(100px);
        background-color: green;
    }
    100% {
        transform: translateX(0);
        background-color: blue;
    }
}
```

*   `@keyframes nome-da-animacao { ... }`: Define a animação com um nome único.
*   Dentro dos `@keyframes`, você usa porcentagens (`0%` a `100%`) ou as palavras-chave `from` (igual a `0%`) e `to` (igual a `100%`) para marcar os pontos-chave.
*   Para cada ponto-chave, você define as propriedades CSS que o elemento deve ter naquele momento da animação.

**Aplicando a Animação (Propriedades `animation-*`):**

Estas propriedades são aplicadas ao elemento que deve executar a animação.

*   **`animation-name`:** Especifica o nome da animação `@keyframes` a ser usada.
*   **`animation-duration`:** Define a duração de *um ciclo* da animação (`s` ou `ms`).
*   **`animation-timing-function`:** Controla a curva de aceleração (mesmos valores de `transition-timing-function`: `ease`, `linear`, `steps()`, etc.).
*   **`animation-delay`:** Atraso antes do início da animação (`s` ou `ms`).
*   **`animation-iteration-count`:** Quantas vezes a animação deve se repetir. Pode ser um número (`1`, `2`, `3`, ...) ou `infinite` para repetir indefinidamente.
*   **`animation-direction`:** Define se a animação deve reverter nos ciclos alternados.
    *   `normal` (padrão): Executa de `0%` a `100%` em cada ciclo.
    *   `reverse`: Executa de `100%` a `0%` em cada ciclo.
    *   `alternate`: Executa `0%`->`100%` no primeiro ciclo, `100%`->`0%` no segundo, `0%`->`100%` no terceiro, e assim por diante.
    *   `alternate-reverse`: Executa `100%`->`0%` no primeiro ciclo, `0%`->`100%` no segundo, etc.
*   **`animation-fill-mode`:** Especifica quais estilos são aplicados ao elemento *antes* da animação começar e *depois* dela terminar.
    *   `none` (padrão): O elemento retorna aos seus estilos base fora do tempo da animação.
    *   `forwards`: O elemento retém os estilos do *último keyframe* (`100%` ou `0%` dependendo da direção) após a animação terminar.
    *   `backwards`: O elemento aplica os estilos do *primeiro keyframe* (`0%` ou `100%`) imediatamente durante o `animation-delay`.
    *   `both`: Aplica os comportamentos de `forwards` e `backwards`.
*   **`animation-play-state`:** Permite pausar (`paused`) ou retomar (`running`) uma animação (útil com JavaScript ou `:hover`).

**Propriedade Abreviada `animation`:**

Assim como `transition`, existe uma forma abreviada `animation`. A ordem é flexível, mas uma ordem comum é:
`animation: [name] [duration] [timing-function] [delay] [iteration-count] [direction] [fill-mode] [play-state];`

**Exemplo:**

```html
<div class="box-pulsante"></div>
<div class="box-movel"></div>
```

```css
.box-pulsante {
    width: 100px;
    height: 100px;
    background-color: crimson;
    border-radius: 50%; /* Círculo */
    margin: 50px;

    /* Aplica a animação 'pulsar' */
    animation-name: pulsar;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
    animation-direction: alternate;
}

.box-movel {
    width: 80px;
    height: 80px;
    background-color: blue;
    margin: 50px;

    /* Forma abreviada */
    animation: mover-e-colorir 3s linear 0.5s infinite normal forwards;
    /*         name duration timing delay count direction fill */
}

/* Pausa a animação do box-movel no hover */
.box-movel:hover {
    animation-play-state: paused;
}

/* Definições @keyframes (do exemplo anterior) */
@keyframes pulsar { /* ... */ }
@keyframes mover-e-colorir { /* ... */ }
```

**Considerações:**

*   **Performance:** Assim como nas transições, animar `transform` e `opacity` é geralmente mais performático.
*   **Complexidade:** Animações CSS podem criar efeitos muito sofisticados diretamente no CSS.
*   **Acessibilidade:** Cuidado com animações excessivas ou que piscam rapidamente, pois podem ser problemáticas para alguns usuários (veremos mais sobre isso em Acessibilidade). Considere usar a Media Query `prefers-reduced-motion` para desativar ou reduzir animações para usuários que solicitaram.

```css
@media (prefers-reduced-motion: reduce) {
  /* Desativa ou simplifica animações e transições */
  .box-pulsante, .box-movel {
    animation: none;
  }
  .botao-transicao {
      transition: none;
  }
  /* Ou substitua por transições mais sutis, como fade */
}
```

Dominar transformações, transições e animações CSS abre um leque enorme de possibilidades para criar interfaces web dinâmicas, interativas e visualmente atraentes. No próximo capítulo, abordaremos um tópico igualmente crucial: Acessibilidade Web (A11y).


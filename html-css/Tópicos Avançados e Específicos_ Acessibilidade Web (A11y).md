# Tópicos Avançados e Específicos: Acessibilidade Web (A11y)

Acessibilidade web (frequentemente abreviada como **A11y** - "a" seguido por 11 letras e "y") refere-se à prática de projetar e desenvolver sites e aplicações web de forma que possam ser utilizados por todas as pessoas, independentemente de suas habilidades, deficiências ou das tecnologias assistivas que possam usar. Criar experiências acessíveis não é apenas uma questão de conformidade legal em muitas regiões, mas também um imperativo ético e uma boa prática de negócios, pois amplia seu público potencial e melhora a usabilidade geral para todos.

Este capítulo abordará os princípios fundamentais da acessibilidade web, focando em como o HTML e o CSS que aprendemos podem ser usados para criar interfaces mais inclusivas. Cobriremos a importância do HTML semântico, o papel dos atributos ARIA, a navegação por teclado, o contraste de cores e a criação de formulários acessíveis.

## Introdução à Acessibilidade Web

Deficiências podem ser de diversos tipos: visuais (cegueira, baixa visão, daltonismo), auditivas (surdez, baixa audição), motoras (dificuldade ou incapacidade de usar as mãos, tremores, lentidão) e cognitivas (dificuldades de aprendizado, distração, incapacidade de lembrar ou focar em grandes quantidades de informação).

A acessibilidade visa remover barreiras que impeçam pessoas com essas deficiências de interagir com a web. Isso envolve considerar como diferentes usuários percebem, entendem, navegam e interagem com o conteúdo online.

**Tecnologias Assistivas (AT):**

Muitos usuários com deficiências dependem de tecnologias assistivas para acessar a web. Alguns exemplos incluem:

*   **Leitores de Tela (Screen Readers):** Software que lê o conteúdo da tela em voz alta ou o exibe em braille. Usado principalmente por pessoas cegas ou com baixa visão.
*   **Lupas de Tela (Screen Magnifiers):** Ampliam partes da tela para usuários com baixa visão.
*   **Software de Reconhecimento de Voz:** Permite aos usuários controlar o computador e ditar texto usando a voz.
*   **Teclados Alternativos e Dispositivos de Ponteiro:** Incluem teclados especiais, ponteiros de cabeça, interruptores (switch devices) para usuários com limitações motoras.
*   **Navegação apenas por Teclado:** Muitos usuários com deficiências motoras ou visuais dependem exclusivamente do teclado para navegar.

Um site acessível é construído de forma que essas tecnologias possam interpretar e interagir com o conteúdo de maneira eficaz.

**WCAG (Web Content Accessibility Guidelines):**

As Diretrizes de Acessibilidade para Conteúdo Web (WCAG), desenvolvidas pelo W3C (World Wide Web Consortium), são o padrão internacionalmente reconhecido para acessibilidade web. Elas são organizadas em torno de quatro princípios fundamentais (POUR):

1.  **Perceptível:** A informação e os componentes da interface do usuário devem ser apresentáveis aos usuários de formas que eles possam perceber (ex: fornecer alternativas textuais para conteúdo não textual, legendas para áudio, contraste de cor suficiente).
2.  **Operável:** Os componentes da interface do usuário e a navegação devem ser operáveis (ex: toda funcionalidade disponível via teclado, tempo suficiente para ler e usar o conteúdo, não usar conteúdo que cause convulsões, fornecer maneiras de navegar e encontrar conteúdo).
3.  **Compreensível:** A informação e a operação da interface do usuário devem ser compreensíveis (ex: tornar o texto legível e compreensível, fazer as páginas aparecerem e operarem de maneiras previsíveis, ajudar os usuários a evitar e corrigir erros).
4.  **Robusto:** O conteúdo deve ser robusto o suficiente para ser interpretado de forma confiável por uma ampla variedade de agentes de usuário, incluindo tecnologias assistivas (ex: maximizar a compatibilidade com tecnologias assistivas atuais e futuras, usando padrões web corretamente).

As WCAG possuem três níveis de conformidade: A (mínimo), AA (recomendado, frequentemente exigido por lei) e AAA (mais alto). Nosso objetivo deve ser, no mínimo, atender ao nível AA.

## Uso Correto de HTML Semântico para Acessibilidade

Como já enfatizamos no capítulo sobre Fundamentos do HTML, usar elementos HTML de acordo com seu significado (semântica) é a base da acessibilidade web. Leitores de tela e outras ATs dependem da estrutura semântica para:

*   **Navegar pela Página:** Usuários de leitores de tela podem pular rapidamente entre cabeçalhos (`<h1>`-`<h6>`), listas (`<ul>`, `<ol>`), landmarks (marcos de página como `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`) para entender a estrutura da página e encontrar a informação que procuram.
*   **Entender o Conteúdo:** Tags como `<p>`, `<blockquote>`, `<code>`, `<strong>`, `<em>` fornecem contexto sobre a natureza do texto.
*   **Interagir com Controles:** Usar elementos corretos para controles interativos, como `<button>` para botões e `<a>` para links, garante que eles sejam reconhecidos e operados corretamente pelas ATs.

**Exemplos de Boas Práticas:**

*   **Hierarquia de Cabeçalhos:** Use `<h1>` a `<h6>` para estruturar o conteúdo logicamente. Não pule níveis. Use apenas um `<h1>` por página para o título principal.
*   **Landmarks:** Use `<header>`, `<nav>`, `<main>`, `<footer>`, `<aside>`, `<section>`, `<article>` para definir as principais regiões da página. Isso cria "marcos" que as ATs podem usar para navegação rápida.
*   **Listas:** Use `<ul>` para listas não ordenadas e `<ol>` para listas ordenadas. Não simule listas usando parágrafos com hífens ou asteriscos.
*   **Tabelas:** Use tabelas (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) apenas para dados tabulares. Use `<th>` com o atributo `scope` (`scope="col"` para cabeçalho de coluna, `scope="row"` para cabeçalho de linha) para associar células de dados aos seus cabeçalhos, permitindo que leitores de tela anunciem o contexto correto.
    ```html
    <table>
        <caption>Vendas Trimestrais</caption>
        <thead>
            <tr>
                <th scope="col">Produto</th>
                <th scope="col">Q1</th>
                <th scope="col">Q2</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Widget A</th>
                <td>150</td>
                <td>200</td>
            </tr>
            <!-- ... -->
        </tbody>
    </table>
    ```
*   **Texto Alternativo para Imagens (`alt`):** Sempre forneça um atributo `alt` descritivo para imagens (`<img>`) que transmitem informação. Se a imagem for puramente decorativa, use um `alt` vazio (`alt=""`). Isso informa às ATs que a imagem pode ser ignorada.
*   **Links e Botões:** Use `<a>` para navegação (ir para outra página ou local) e `<button>` para ações (submeter um formulário, abrir um modal, etc.). Forneça texto claro e descritivo para o link/botão que indique seu propósito fora de contexto (evite "clique aqui").

Usar HTML semântico corretamente resolve muitos problemas de acessibilidade desde o início.

## Atributos ARIA (Accessible Rich Internet Applications)

Às vezes, o HTML semântico por si só não é suficiente para descrever a função ou o estado de componentes de interface mais complexos, especialmente aqueles criados com JavaScript (como menus dropdown, sliders, abas, modais). É aqui que entra o ARIA.

ARIA é um conjunto de atributos especiais que podem ser adicionados às tags HTML para fornecer informações semânticas adicionais para tecnologias assistivas, sem afetar a aparência visual.

**Importante: A Primeira Regra do ARIA é "Não use ARIA"!**

Isso significa: se você pode usar um elemento HTML nativo que já possui a semântica e o comportamento de acessibilidade embutidos (como `<button>`, `<input type="checkbox">`, `<nav>`), **use-o**. Use ARIA apenas quando o HTML nativo não for suficiente.

**Tipos de Atributos ARIA:**

1.  **Roles (Papéis):** Definem o tipo de widget ou estrutura que um elemento representa (ex: `role="navigation"`, `role="dialog"`, `role="tablist"`, `role="checkbox"`, `role="button"`). Muitos desses papéis são redundantes se você já estiver usando o elemento HTML semântico correto (ex: `<nav>` já tem `role="navigation"` implícito, `<button>` já tem `role="button"`). Use roles ARIA principalmente quando estiver criando componentes personalizados com `<div>` ou `<span>`.
    ```html
    <!-- Exemplo: Aba customizada (simplificado) -->
    <div role="tablist">
        <button role="tab" aria-selected="true" id="tab1" aria-controls="panel1">Aba 1</button>
        <button role="tab" aria-selected="false" id="tab2" aria-controls="panel2">Aba 2</button>
    </div>
    <div role="tabpanel" id="panel1" aria-labelledby="tab1">Conteúdo Aba 1</div>
    <div role="tabpanel" id="panel2" aria-labelledby="tab2" hidden>Conteúdo Aba 2</div>
    ```
2.  **Properties (Propriedades):** Descrevem características ou relacionamentos do elemento (ex: `aria-labelledby`, `aria-describedby`, `aria-required`, `aria-controls`).
    *   `aria-labelledby="id_do_label"`: Indica qual elemento serve como rótulo para o elemento atual (útil quando `<label for>` não é adequado).
    *   `aria-describedby="id_da_descricao"`: Indica qual elemento fornece uma descrição mais detalhada.
    *   `aria-controls="id_do_elemento_controlado"`: Indica qual elemento é controlado pelo elemento atual (ex: um botão que expande/recolhe um painel).
3.  **States (Estados):** Descrevem a condição atual do elemento, que pode mudar dinamicamente (ex: `aria-selected`, `aria-expanded`, `aria-hidden`, `aria-disabled`, `aria-checked`, `aria-invalid`). Esses estados geralmente precisam ser atualizados via JavaScript quando a interface muda.
    *   `aria-expanded="true" / "false"`: Indica se um elemento que controla outro (como um menu dropdown) está expandido ou recolhido.
    *   `aria-hidden="true" / "false"`: Indica se um elemento deve ser exposto (ou não) à API de acessibilidade. `aria-hidden="true"` o oculta das ATs (diferente de CSS `display: none` ou `visibility: hidden`, que também o ocultam visualmente).
    *   `aria-checked="true" / "false" / "mixed"`: Para checkboxes ou radio buttons customizados.
    *   `aria-invalid="true" / "false"`: Indica se o valor de um campo de formulário é inválido.

**Exemplo Básico (Campo com Descrição Adicional):**

```html
<label for="senha">Senha:</label>
<input type="password" id="senha" aria-describedby="dica-senha" required>
<p id="dica-senha">A senha deve ter pelo menos 8 caracteres.</p>
```
Neste caso, um leitor de tela anunciaria o rótulo "Senha" e, em seguida, a descrição adicional "A senha deve ter pelo menos 8 caracteres" quando o usuário focasse no campo.

Usar ARIA incorretamente pode piorar a acessibilidade. Sempre teste com leitores de tela e valide seu código. Use ARIA com moderação e apenas quando necessário para preencher lacunas semânticas.

## Navegação por Teclado

Muitos usuários, incluindo aqueles com deficiências motoras e usuários de leitores de tela, dependem exclusivamente do teclado para navegar e interagir com páginas web. É crucial garantir que todos os elementos interativos (links, botões, campos de formulário, controles customizados) sejam acessíveis e operáveis via teclado.

**Princípios Chave:**

1.  **Foco Visível:** Deve haver uma indicação visual clara de qual elemento tem o foco do teclado no momento. Os navegadores fornecem um estilo de foco padrão (geralmente um contorno azul ou similar - outline), mas ele é frequentemente removido por desenvolvedores por razões estéticas (`outline: none;`). **Nunca remova o outline sem fornecer uma alternativa de estilo de foco clara e perceptível!**
    ```css
    /* Ruim: Remove o foco para todos */
    *:focus {
        outline: none;
    }

    /* Bom: Mantém o outline padrão ou define um estilo customizado */
    a:focus, button:focus, input:focus, select:focus, textarea:focus {
        outline: 2px solid blue; /* Exemplo de estilo customizado */
        outline-offset: 2px;
        box-shadow: 0 0 5px rgba(0, 0, 255, 0.5);
    }

    /* Melhor ainda: Usar :focus-visible para mostrar o foco apenas para usuários de teclado */
    /* (Suporte está crescendo, mas pode precisar de polyfill ou fallback) */
    a:focus-visible, button:focus-visible, input:focus-visible, /* etc */ {
        outline: 2px solid blue;
        outline-offset: 2px;
    }
    /* Opcional: Remover outline apenas quando :focus-visible não corresponder (para cliques do mouse) */
    a:focus:not(:focus-visible) { 
        outline: none; 
    }
    ```
    A pseudo-classe `:focus-visible` é a solução moderna ideal, pois aplica o estilo de foco apenas quando o navegador detecta que o foco foi movido via teclado (ou outra modalidade não-ponteiro), evitando o anel de foco visualmente intrusivo para cliques de mouse, mas garantindo-o para quem precisa.

2.  **Ordem de Foco Lógica:** A ordem em que os elementos recebem foco ao pressionar a tecla `Tab` deve seguir uma sequência lógica e previsível, geralmente correspondendo à ordem visual de leitura da página (esquerda para direita, cima para baixo em idiomas ocidentais). Uma estrutura HTML bem organizada geralmente garante isso. Evite usar o atributo `tabindex` com valores positivos (`tabindex="1"`, `tabindex="2"`, etc.), pois isso cria uma ordem de foco separada e confusa. Use `tabindex="0"` para tornar elementos não interativos nativos (como `<div>` ou `<span>` usados para criar widgets customizados) focáveis pelo teclado, e `tabindex="-1"` para permitir que um elemento receba foco programaticamente (via JavaScript `element.focus()`) mas não através da navegação sequencial com `Tab`.

3.  **Evitar Armadilhas de Teclado (Keyboard Traps):** O usuário deve ser capaz de navegar *para dentro* e *para fora* de qualquer componente interativo usando apenas o teclado. Uma armadilha ocorre quando o foco fica preso dentro de um widget (como um modal ou um player de vídeo) e o usuário não consegue sair dele pressionando `Tab` ou `Shift+Tab`.

4.  **Interação Padrão:** Elementos interativos nativos já possuem comportamento de teclado esperado (ex: `Enter` ou `Espaço` ativam botões e checkboxes, setas navegam em `<select>` e radio buttons). Se você criar componentes customizados (com `<div>` e ARIA), você precisará implementar esses comportamentos de teclado manualmente usando JavaScript.

## Contraste de Cores e Legibilidade

Usuários com baixa visão ou daltonismo podem ter dificuldade em ler texto ou distinguir elementos se não houver contraste suficiente entre a cor do primeiro plano (texto, ícones) e a cor do plano de fundo.

**Diretrizes WCAG (Nível AA):**

*   **Texto Normal:** Requer uma taxa de contraste de pelo menos **4.5:1**. (Texto normal é considerado abaixo de 18pt/24px ou abaixo de 14pt/19px se em negrito).
*   **Texto Grande:** Requer uma taxa de contraste de pelo menos **3:1**. (Texto grande é 18pt/24px ou maior, ou 14pt/19px ou maior se em negrito).
*   **Componentes de Interface e Gráficos:** Elementos visuais necessários para entender o conteúdo ou operar a interface (como bordas de input, ícones importantes) também devem ter um contraste de pelo menos **3:1** em relação às cores adjacentes.

**Ferramentas:**

Existem muitas ferramentas online e extensões de navegador que permitem verificar as taxas de contraste entre duas cores (ex: WebAIM Contrast Checker, Adobe Color Contrast Analyzer, DevTools do navegador).

**Além do Contraste:**

*   **Não Confie Apenas na Cor:** Não use a cor como *única* maneira de transmitir informação importante (ex: indicar um erro apenas mudando a cor do texto para vermelho). Use também ícones, texto ou outros indicadores visuais.
*   **Tamanho da Fonte e Espaçamento:** Garanta que o tamanho da fonte seja legível e que haja espaçamento adequado entre linhas (`line-height`) e parágrafos para facilitar a leitura.
*   **Fontes Legíveis:** Escolha fontes (tipografias) que sejam claras e fáceis de ler.

## Formulários Acessíveis

Formulários são pontos de interação cruciais e precisam ser acessíveis.

**Práticas Essenciais:**

1.  **Rótulos Claros (`<label>`):** Sempre associe um rótulo (`<label>`) a cada controle de formulário (`<input>`, `<textarea>`, `<select>`) usando o atributo `for` na label, que corresponde ao `id` do controle. Isso permite que usuários de leitores de tela saibam qual o propósito do campo e que usuários de mouse cliquem no rótulo para focar no campo.
    ```html
    <label for="user-email">Endereço de E-mail:</label>
    <input type="email" id="user-email" name="email"> 
    ```
2.  **Agrupamento de Campos Relacionados (`<fieldset>` e `<legend>`):** Use `<fieldset>` para agrupar controles relacionados (como um conjunto de radio buttons ou checkboxes com a mesma pergunta) e `<legend>` para fornecer um rótulo para o grupo inteiro.
    ```html
    <fieldset>
        <legend>Qual seu nível de experiência?</legend>
        <input type="radio" id="exp-iniciante" name="experiencia" value="iniciante">
        <label for="exp-iniciante">Iniciante</label><br>
        <input type="radio" id="exp-intermed" name="experiencia" value="intermediario">
        <label for="exp-intermed">Intermediário</label><br>
        <input type="radio" id="exp-avancado" name="experiencia" value="avancado">
        <label for="exp-avancado">Avançado</label>
    </fieldset>
    ```
3.  **Instruções e Formato Esperado:** Forneça instruções claras e indique quaisquer formatos esperados (ex: "Data (DD/MM/AAAA)"). Use `aria-describedby` para associar programaticamente essas instruções ao campo, se necessário.
4.  **Validação e Feedback de Erro:**
    *   Indique campos obrigatórios claramente (visualmente com um asterisco ou texto, e programaticamente com o atributo `required` ou `aria-required="true"`).
    *   Quando ocorrer um erro de validação, forneça feedback claro, específico e acessível. Não confie apenas na cor.
    *   Identifique o campo com erro (ex: mudando a borda).
    *   Forneça uma mensagem de erro próxima ao campo explicando o problema.
    *   Use `aria-invalid="true"` no campo com erro.
    *   Use `aria-describedby` para associar a mensagem de erro ao campo, para que seja anunciada por leitores de tela.
    *   Considere mover o foco para o primeiro campo com erro após a tentativa de submissão.
    ```html
    <label for="email-erro">Email:</label>
    <input type="email" id="email-erro" name="email" aria-invalid="true" aria-describedby="msg-erro-email">
    <span id="msg-erro-email" style="color: red;">Por favor, insira um endereço de email válido.</span>
    ```
5.  **Navegação por Teclado:** Garanta que todos os campos e o botão de submissão sejam focáveis e operáveis via teclado.

Acessibilidade não é um recurso extra, mas uma parte integral do desenvolvimento web de qualidade. Ao incorporar essas práticas desde o início do processo de design e desenvolvimento, usando HTML semântico, ARIA criteriosamente, garantindo operabilidade via teclado, contraste adequado e formulários claros, você cria produtos digitais que podem ser usados e apreciados por um público muito mais amplo.


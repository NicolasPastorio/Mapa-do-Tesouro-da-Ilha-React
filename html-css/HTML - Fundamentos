# HTML - Fundamentos

Agora que compreendemos o propósito do HTML e temos as ferramentas necessárias, vamos aprofundar nosso conhecimento explorando os blocos de construção fundamentais de qualquer página web. Este capítulo detalhará a estrutura essencial de um documento HTML e apresentará as tags mais comuns que você usará para marcar diferentes tipos de conteúdo, desde textos e links até imagens, listas, tabelas e formulários. Concluiremos com uma discussão crucial sobre HTML semântico, um conceito vital para a acessibilidade e otimização para motores de busca (SEO).

## Estrutura de um Documento HTML Revisada

Relembrando o capítulo anterior, a estrutura básica de um documento HTML5 é a seguinte:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Título da Página</title>
    <!-- Outros metadados e links para CSS/JS vão aqui -->
</head>
<body>
    <!-- Conteúdo visível da página vai aqui -->
</body>
</html>
```

Vamos reforçar o papel de cada parte principal:

*   **`<!DOCTYPE html>`:** Declaração obrigatória que define o tipo de documento como HTML5.
*   **`<html>`:** O elemento raiz que envolve todo o conteúdo da página. O atributo `lang` especifica o idioma principal do documento.
*   **`<head>`:** Contém informações *sobre* a página (metadados), que não são exibidas diretamente no corpo principal. Isso inclui o título (`<title>`), a codificação de caracteres (`<meta charset="UTF-8">`), configurações da viewport para dispositivos móveis (`<meta name="viewport">`), links para folhas de estilo CSS (`<link>`) e scripts JavaScript (`<script>`), entre outros.
*   **`<body>`:** Contém todo o conteúdo que será efetivamente exibido na janela do navegador: textos, imagens, vídeos, formulários, etc. É aqui que a maior parte do seu trabalho de marcação HTML acontecerá.

## Tags Essenciais para Conteúdo

Dentro do `<body>`, utilizamos diversas tags para estruturar e dar significado ao nosso conteúdo.

### Cabeçalhos (`<h1>` a `<h6>`)

Os cabeçalhos são usados para definir títulos e subtítulos em sua página, criando uma hierarquia de informações. Existem seis níveis de cabeçalho, de `<h1>` (o mais importante) a `<h6>` (o menos importante).

```html
<body>
    <h1>Título Principal da Página (Nível 1)</h1>
    <p>Este é um parágrafo introdutório.</p>
    <h2>Subtítulo (Nível 2)</h2>
    <p>Texto relacionado ao subtítulo.</p>
    <h3>Sub-subtítulo (Nível 3)</h3>
    <p>Mais detalhes...</p>
    <!-- E assim por diante até <h6> -->
</body>
```

É crucial usar os cabeçalhos de forma lógica e hierárquica. Não pule níveis (por exemplo, ir de um `<h1>` direto para um `<h3>`) e use apenas um `<h1>` por página, geralmente para o título principal do conteúdo. Os motores de busca e tecnologias assistivas utilizam essa hierarquia para entender a estrutura do seu conteúdo.

### Parágrafos (`<p>`)

A tag `<p>` é usada para marcar blocos de texto como parágrafos. O navegador automaticamente adiciona algum espaço antes e depois de cada parágrafo, separando-os visualmente.

```html
<body>
    <p>Este é o primeiro parágrafo. O HTML organiza o texto em blocos lógicos.</p>
    <p>Este é o segundo parágrafo. Cada tag `<p>` inicia um novo bloco de texto.</p>
</body>
```

### Links (`<a>`)

Os links, ou âncoras (`<a>`), são fundamentais para a navegação na web. Eles permitem conectar sua página a outras páginas (internas ou externas) ou a recursos específicos.

```html
<body>
    <p>Visite o <a href="https://www.google.com">Google</a> para pesquisar.</p>
    <p>Veja nossa <a href="/sobre.html">página Sobre</a>.</p>
    <p>Ir para a <a href="#secao-contato">seção de Contato</a> nesta página.</p>
</body>
```

*   **`href` (Hypertext Reference):** Este é o atributo mais importante da tag `<a>`. Ele especifica o URL (Uniform Resource Locator) de destino do link.
    *   URLs absolutos (como `https://www.google.com`) apontam para recursos externos.
    *   URLs relativos (como `/sobre.html` ou `contato.html`) apontam para outras páginas dentro do mesmo site. O `/` no início indica que o caminho começa na raiz do site.
    *   Links de fragmento (`#secao-contato`) apontam para um elemento específico na *mesma* página que tenha um atributo `id` correspondente (ex: `<div id="secao-contato">...</div>`).
*   **Conteúdo da Tag:** O texto (ou imagem) entre `<a href="...">` e `</a>` é o que se torna clicável no navegador.
*   **Atributo `target="_blank"`:** Frequentemente usado para abrir o link em uma nova aba ou janela do navegador: `<a href="..." target="_blank">Link Externo</a>`. Por razões de segurança e performance, ao usar `target="_blank"`, é recomendado adicionar também `rel="noopener noreferrer"`.

### Imagens (`<img>`)

A tag `<img>` é usada para incorporar imagens em sua página. É uma tag "vazia" ou "autofechante", o que significa que não possui conteúdo interno nem tag de fechamento separada (em HTML5, a barra `/` no final, como `<img />`, é opcional, mas comum).

```html
<body>
    <h2>Nosso Logo</h2>
    <img src="imagens/logo.png" alt="Logo da Empresa XPTO" width="150" height="50">

    <h2>Foto Ilustrativa</h2>
    <img src="https://via.placeholder.com/300x200" alt="Placeholder de imagem 300x200 pixels">
</body>
```

*   **`src` (Source):** Atributo obrigatório que especifica o caminho (URL) para o arquivo de imagem. Pode ser um caminho relativo (para imagens no seu próprio site) ou absoluto (para imagens hospedadas externamente).
*   **`alt` (Alternative Text):** Atributo **essencial** para acessibilidade e SEO. Ele fornece uma descrição textual da imagem. Essa descrição é exibida se a imagem não puder ser carregada e é lida por leitores de tela para usuários com deficiência visual. O texto alternativo deve ser conciso e descritivo.
*   **`width` e `height`:** Atributos que especificam as dimensões da imagem em pixels. Embora o tamanho possa ser controlado com CSS, definir `width` e `height` no HTML ajuda o navegador a reservar o espaço correto para a imagem antes mesmo de ela ser carregada, evitando que o layout da página "salte" durante o carregamento. No entanto, para imagens responsivas, abordagens mais avançadas com CSS ou tags como `<picture>` são geralmente preferíveis.

## Listas

O HTML oferece maneiras de criar listas de itens, que são úteis para organizar informações de forma sequencial ou agrupada.

### Listas Não Ordenadas (`<ul>`)

Usadas para agrupar itens onde a ordem não é estritamente importante. Por padrão, os navegadores exibem os itens com marcadores (bullets).

```html
<h2>Lista de Compras</h2>
<ul>
    <li>Maçãs</li>
    <li>Bananas</li>
    <li>Leite</li>
</ul>
```

*   **`<ul>` (Unordered List):** Envolve toda a lista.
*   **`<li>` (List Item):** Marca cada item individual dentro da lista.

### Listas Ordenadas (`<ol>`)

Usadas quando a sequência dos itens é relevante. Por padrão, os navegadores exibem os itens com números ou letras.

```html
<h2>Instruções</h2>
<ol>
    <li>Abra a caixa.</li>
    <li>Retire o produto.</li>
    <li>Leia o manual.</li>
</ol>
```

*   **`<ol>` (Ordered List):** Envolve toda a lista ordenada.
*   **`<li>` (List Item):** Marca cada item, assim como nas listas não ordenadas.

Você pode aninhar listas umas dentro das outras para criar subitens.

## Tabelas

Tabelas são usadas para exibir dados tabulares (organizados em linhas e colunas).

```html
<h2>Horário das Aulas</h2>
<table>
    <thead>
        <tr>
            <th>Horário</th>
            <th>Segunda</th>
            <th>Terça</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>08:00 - 09:00</td>
            <td>Matemática</td>
            <td>Português</td>
        </tr>
        <tr>
            <td>09:00 - 10:00</td>
            <td>História</td>
            <td>Ciências</td>
        </tr>
    </tbody>
</table>
```

*   **`<table>`:** Elemento principal que define a tabela.
*   **`<thead>`:** Agrupa o conteúdo do cabeçalho da tabela (opcional, mas recomendado para semântica).
*   **`<tbody>`:** Agrupa o conteúdo do corpo principal da tabela.
*   **`<tfoot>`:** Agrupa o conteúdo do rodapé da tabela (menos comum, opcional).
*   **`<tr>` (Table Row):** Define uma linha dentro da tabela.
*   **`<th>` (Table Header):** Define uma célula de cabeçalho (geralmente exibida em negrito e centralizada). Usada dentro do `<thead>` ou para cabeçalhos de linha/coluna no `<tbody>`.
*   **`<td>` (Table Data):** Define uma célula de dados padrão dentro de uma linha.

Atributos como `colspan` (para uma célula ocupar múltiplas colunas) e `rowspan` (para ocupar múltiplas linhas) podem ser usados em `<th>` e `<td>` para criar estruturas de tabela mais complexas.

**Importante:** No passado, tabelas eram frequentemente usadas para criar layouts de página. **Esta prática é altamente desencorajada hoje.** Use CSS (Flexbox, Grid) para layout e reserve as tabelas HTML para apresentar dados genuinamente tabulares.

## Formulários (`<form>` e Elementos Relacionados)

Formulários são essenciais para coletar dados do usuário, como em cadastros, logins, pesquisas ou campos de busca.

```html
<h2>Formulário de Contato</h2>
<form action="/processar-contato" method="post">
    <div>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" name="usuario_nome" required>
    </div>
    <div>
        <label for="email">Email:</label>
        <input type="email" id="email" name="usuario_email" required>
    </div>
    <div>
        <label for="mensagem">Mensagem:</label>
        <textarea id="mensagem" name="usuario_mensagem" rows="4" required></textarea>
    </div>
    <div>
        <label for="assunto">Assunto:</label>
        <select id="assunto" name="assunto_contato">
            <option value="duvida">Dúvida</option>
            <option value="sugestao">Sugestão</option>
            <option value="reclamacao">Reclamação</option>
        </select>
    </div>
    <div>
        <button type="submit">Enviar Mensagem</button>
    </div>
</form>
```

*   **`<form>`:** Elemento que envolve todo o formulário.
    *   **`action`:** Especifica o URL para onde os dados do formulário serão enviados quando submetidos.
    *   **`method`:** Define o método HTTP a ser usado para enviar os dados (`get` ou `post`). `POST` é geralmente preferido para enviar dados sensíveis ou grandes volumes de dados.
*   **`<label>`:** Fornece uma descrição textual para um controle de formulário. O atributo `for` deve corresponder ao `id` do elemento de formulário associado. Clicar em um `<label>` foca no seu controle correspondente, melhorando a usabilidade e a acessibilidade.
*   **`<input>`:** A tag mais versátil para criar campos de formulário. O atributo `type` define o tipo de controle:
    *   `type="text"`: Campo de texto de linha única.
    *   `type="email"`: Campo para endereço de e-mail (com validação básica).
    *   `type="password"`: Campo de senha (mascara a entrada).
    *   `type="number"`: Campo para entrada numérica.
    *   `type="date"`: Campo para selecionar uma data.
    *   `type="checkbox"`: Caixa de seleção (múltiplas opções podem ser selecionadas).
    *   `type="radio"`: Botão de opção (apenas uma opção em um grupo com o mesmo `name` pode ser selecionada).
    *   `type="submit"`: Botão que submete o formulário (alternativa ao `<button type="submit">`).
    *   `type="file"`: Permite ao usuário selecionar um arquivo para upload.
    *   ... e muitos outros.
    *   **`id`:** Identificador único para o elemento (usado pelo `<label>`).
    *   **`name`:** Nome do campo que será enviado junto com o valor para o servidor.
    *   **`required`:** Atributo booleano que indica que o campo deve ser preenchido antes da submissão.
    *   **`placeholder`:** Texto de dica exibido dentro do campo quando ele está vazio.
*   **`<textarea>`:** Cria uma caixa de texto de múltiplas linhas.
    *   **`rows`:** Sugere o número de linhas visíveis.
*   **`<select>`:** Cria uma lista suspensa (dropdown).
    *   **`<option>`:** Define cada item selecionável dentro do `<select>`. O atributo `value` especifica o valor que será enviado ao servidor se aquela opção for selecionada.
*   **`<button>`:** Cria um botão clicável.
    *   **`type="submit"`:** O botão submeterá o formulário (padrão se dentro de um `<form>`).
    *   **`type="reset"`:** O botão limpará os campos do formulário para seus valores iniciais.
    *   **`type="button"`:** Botão genérico, geralmente usado com JavaScript para ações customizadas.

Agrupar cada par de `<label>` e `<input>` (ou outros controles) dentro de um `<div>` ou outra tag de bloco é uma prática comum para facilitar a estilização com CSS.

## HTML Semântico: Escrevendo Código com Significado

HTML Semântico refere-se ao uso de tags HTML de acordo com seu *significado* e *propósito*, em vez de apenas pela sua aparência visual padrão. Usar `<h1>` para o título principal, `<p>` para parágrafos e `<ul>` para listas não ordenadas já são exemplos de uso semântico.

O HTML5 introduziu novos elementos semânticos projetados especificamente para estruturar as principais seções de uma página web:

*   **`<header>`:** Representa o cabeçalho de uma seção ou da página inteira. Geralmente contém o logo, título principal, menu de navegação.
*   **`<footer>`:** Representa o rodapé de uma seção ou da página. Costuma conter informações de copyright, links relacionados, informações de contato.
*   **`<nav>`:** Representa uma seção contendo links de navegação principais (menu do site, por exemplo).
*   **`<main>`:** Representa o conteúdo principal e único do `<body>` do documento. Deve haver apenas um `<main>` por página (diretamente dentro do `<body>`).
*   **`<article>`:** Representa um conteúdo independente e autocontido que poderia, em teoria, ser distribuído separadamente (ex: um post de blog, um item de notícia, um comentário de usuário).
*   **`<section>`:** Representa uma seção genérica de um documento, geralmente com um título. Agrupa conteúdos tematicamente relacionados.
*   **`<aside>`:** Representa um conteúdo tangencialmente relacionado ao conteúdo principal ao redor dele (ex: uma barra lateral com links relacionados, biografia do autor, publicidade).

**Por que usar HTML Semântico?**

1.  **Acessibilidade (A11y):** Leitores de tela e outras tecnologias assistivas usam essas tags para navegar e entender a estrutura da página, proporcionando uma experiência muito melhor para usuários com deficiências.
2.  **SEO (Search Engine Optimization):** Motores de busca como o Google utilizam a estrutura semântica para entender melhor o conteúdo e a relevância da sua página, o que pode impactar positivamente seu ranking nos resultados de busca.
3.  **Manutenibilidade:** Código semântico é mais fácil de ler e entender, tanto para você quanto para outros desenvolvedores que possam trabalhar no projeto.
4.  **Estilização:** Embora não seja o propósito principal, ter uma estrutura semântica clara pode, por vezes, facilitar a aplicação de estilos com CSS.

**Exemplo de Estrutura Semântica:**

```html
<body>
    <header>
        <h1>Blog Incrível</h1>
        <nav>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/sobre">Sobre</a></li>
                <li><a href="/contato">Contato</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>Título do Post do Blog</h2>
            <p>Conteúdo do post...</p>
            <footer>
                <p>Publicado em: <time datetime="2025-05-26">26 de Maio, 2025</time></p>
            </footer>
        </article>

        <section>
            <h2>Comentários</h2>
            <!-- Seção de comentários -->
        </section>
    </main>

    <aside>
        <h3>Posts Recentes</h3>
        <ul>
            <li><a href="...">Outro Post</a></li>
            <li><a href="...">Post Anterior</a></li>
        </ul>
    </aside>

    <footer>
        <p>&copy; 2025 Blog Incrível. Todos os direitos reservados.</p>
    </footer>
</body>
```

Embora elementos como `<div>` (divisor genérico de bloco) e `<span>` (divisor genérico inline) ainda sejam úteis para agrupamento puramente para fins de estilização ou manipulação com JavaScript, sempre prefira usar um elemento semântico quando houver um que se encaixe no propósito do conteúdo.

Dominar esses fundamentos do HTML é a base sólida sobre a qual construiremos nosso conhecimento de CSS e tópicos mais avançados. No próximo capítulo, começaremos a dar vida visual às nossas estruturas HTML com o poder do CSS.


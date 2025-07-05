# Cross-Site Request Forgery (CSRF): Entendendo e Prevenindo

## O que é Cross-Site Request Forgery (CSRF)?

Cross-Site Request Forgery (CSRF), também conhecido como XSRF ou ataque de um clique, é uma vulnerabilidade que permite a um atacante induzir um usuário autenticado a executar ações indesejadas em uma aplicação web. Diferente do XSS, onde o atacante injeta código malicioso no site, no CSRF o atacante explora a confiança que o site tem no navegador do usuário.

## Como funciona o ataque?

O ataque CSRF ocorre quando um usuário autenticado visita um site malicioso ou clica em um link que contém uma requisição forjada. Se o usuário estiver logado em um site legítimo (por exemplo, um banco online), o navegador enviará automaticamente os cookies de sessão para esse site junto com a requisição forjada. O site legítimo, sem saber que a requisição foi forjada, a processará como se fosse uma ação legítima do usuário.

**Cenário de Exemplo:**

1.  **Usuário Autenticado:** Um usuário faz login em seu banco online (`banco.com`) e seu navegador armazena um cookie de sessão que o mantém autenticado.
2.  **Site Malicioso:** O atacante cria um site malicioso (`site-malicioso.com`) que contém um código HTML ou JavaScript que envia uma requisição HTTP para o banco online. Por exemplo, um formulário oculto ou uma tag `<img>` com uma URL que realiza uma transferência de dinheiro:

    ```html
    <img src="https://banco.com/transferencia?conta=atacante&valor=1000" style="display:none;">
    ```

3.  **Vítima Visita o Site Malicioso:** O usuário, ainda logado no banco, visita `site-malicioso.com`.
4.  **Requisição Forjada Enviada:** O navegador do usuário carrega a imagem oculta. Ao fazer a requisição para `https://banco.com/transferencia?conta=atacante&valor=1000`, o navegador automaticamente inclui o cookie de sessão do `banco.com`.
5.  **Ação Indesejada Executada:** O banco online recebe a requisição com o cookie de sessão válido e a processa como se o próprio usuário tivesse iniciado a transferência de R$1000 para a conta do atacante.

Este ataque é eficaz porque o navegador envia automaticamente os cookies de sessão com cada requisição para o domínio de origem, e o site legítimo não tem como saber se a requisição foi iniciada pelo usuário ou por um site malicioso.

## Como proteger sua aplicação?

A principal defesa contra CSRF é garantir que as requisições que alteram o estado da aplicação (POST, PUT, DELETE) não possam ser forjadas por um atacante.

### 1. Tokens Anti-CSRF (Synchronizer Token Pattern)

Esta é a defesa mais comum e eficaz. Envolve a inclusão de um token secreto e imprevisível em cada requisição que altera o estado da aplicação. O token é gerado pelo servidor e incorporado no formulário HTML ou no cabeçalho da requisição. O servidor então verifica se o token recebido na requisição corresponde ao token esperado.

**Como funciona:**

*   **Geração:** Quando o servidor renderiza um formulário, ele gera um token CSRF único para a sessão do usuário e o incorpora como um campo oculto no formulário ou o envia via JavaScript para ser incluído em requisições AJAX.
*   **Envio:** Quando o usuário submete o formulário (ou uma requisição AJAX), o token é enviado junto com os outros dados.
*   **Validação:** O servidor, ao receber a requisição, compara o token recebido com o token armazenado na sessão do usuário. Se os tokens não corresponderem, a requisição é rejeitada.

Um atacante não consegue forjar uma requisição CSRF porque ele não tem acesso ao token secreto do usuário.

**Exemplo (pseudo-código):**

**No servidor (ao renderizar o formulário):**

```html
<form action="/transferencia" method="POST">
    <input type="hidden" name="_csrf_token" value="{{ session.csrf_token }}">
    <label for="conta">Conta:</label>
    <input type="text" id="conta" name="conta">
    <label for="valor">Valor:</label>
    <input type="text" id="valor" name="valor">
    <button type="submit">Transferir</button>
</form>
```

**No servidor (ao processar a requisição POST):**

```python
@app.route('/transferencia', methods=['POST'])
def transferencia():
    received_token = request.form.get('_csrf_token')
    expected_token = session.get('csrf_token')

    if not received_token or received_token != expected_token:
        abort(403) # Proibido - Requisição CSRF detectada

    # Processar a transferência
    return "Transferência realizada com sucesso!"
```

### 2. SameSite Cookie Attribute

O atributo `SameSite` para cookies é uma defesa moderna e eficaz contra CSRF. Ele permite que você declare se o seu cookie deve ser enviado apenas em requisições de "mesmo site" (same-site) ou também em requisições de "site cruzado" (cross-site).

*   **`SameSite=Lax` (Padrão em navegadores modernos):** O cookie é enviado em requisições de mesmo site e em requisições cross-site apenas para navegações de nível superior (links, pré-carregamento) que resultam em uma mudança de URL. Isso protege contra a maioria dos ataques CSRF, mas permite que alguns links legítimos funcionem.
*   **`SameSite=Strict`:** O cookie é enviado apenas em requisições de mesmo site. Isso oferece a proteção mais forte contra CSRF, mas pode quebrar funcionalidades legítimas (por exemplo, se um usuário clica em um link de um email que o leva ao seu site e espera estar logado).
*   **`SameSite=None` e `Secure`:** O cookie é enviado em todas as requisições, incluindo cross-site. Requer que o cookie seja enviado apenas sobre HTTPS. Use com cautela e apenas quando realmente necessário (por exemplo, para APIs que precisam de cookies em requisições cross-site).

Defina o atributo `SameSite` para seus cookies de sessão e outros cookies sensíveis. Por exemplo, em Node.js com Express:

```javascript
res.cookie('session_id', 'some_value', { sameSite: 'Lax', secure: true, httpOnly: true });
```

### 3. Verificação do Cabeçalho Referer/Origin

Embora não seja uma defesa primária e possa ser contornada em certas situações, verificar os cabeçalhos `Referer` ou `Origin` pode adicionar uma camada extra de segurança. O cabeçalho `Origin` é mais confiável que o `Referer`.

*   **`Origin`:** Indica a origem da requisição (esquema, host, porta). É enviado em requisições POST e CORS.
*   **`Referer`:** Indica a URL da página que fez a requisição. Pode ser omitido por navegadores ou proxies, ou falsificado em alguns casos.

Verifique se o cabeçalho `Origin` ou `Referer` corresponde ao domínio esperado da sua aplicação. Se não corresponder, a requisição pode ser forjada.

### 4. Reautenticação para Ações Sensíveis

Para ações extremamente sensíveis (como mudança de senha, transferência de dinheiro), solicite ao usuário que reautentique sua senha antes de prosseguir. Isso garante que, mesmo que um ataque CSRF seja bem-sucedido, o atacante não poderá realizar a ação sem a senha do usuário.

## Conclusão

CSRF é uma vulnerabilidade séria que pode levar a ações não autorizadas em nome do usuário. A implementação de tokens anti-CSRF e a configuração correta do atributo `SameSite` para cookies são as defesas mais importantes. Combinar essas medidas com a verificação de cabeçalhos e reautenticação para ações críticas cria uma defesa robusta contra ataques CSRF.


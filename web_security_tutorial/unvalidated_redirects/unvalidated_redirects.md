# Redirects Não Validados: Entendendo e Prevenindo

## O que são Redirects Não Validados?

Redirects não validados, ou Open Redirects, são uma vulnerabilidade de segurança que ocorre quando uma aplicação web redireciona um usuário para uma URL especificada em um parâmetro de entrada, sem validar se essa URL pertence a um domínio confiável. Isso permite que um atacante manipule o parâmetro de redirecionamento para direcionar a vítima para um site malicioso de sua escolha.

## Como funciona o ataque?

O ataque de Redirect Não Validado explora a confiança que o usuário tem no domínio legítimo. O atacante cria um link para o site legítimo, mas com um parâmetro de redirecionamento manipulado que aponta para um site malicioso. Quando a vítima clica no link, ela é inicialmente direcionada para o site legítimo, que então a redireciona automaticamente para o site do atacante.

**Cenário de Exemplo:**

Imagine um site (`sitelegitimo.com`) que tem uma funcionalidade de redirecionamento após o login ou após clicar em um link de notificação. A URL pode ser algo como:

`https://sitelegitimo.com/redirect?url=https://sitelegitimo.com/pagina_destino`

Um atacante pode manipular essa URL para:

`https://sitelegitimo.com/redirect?url=https://site-malicioso.com/phishing`

**Passos do Ataque:**

1.  **Criação do Link Malicioso:** O atacante envia o link manipulado (`https://sitelegitimo.com/redirect?url=https://site-malicioso.com/phishing`) para a vítima, talvez por e-mail, mensagem instantânea ou em um site comprometido.
2.  **Vítima Clica no Link:** A vítima clica no link. Como o domínio inicial é `sitelegitimo.com`, ela confia no link.
3.  **Redirecionamento:** O `sitelegitimo.com` processa o parâmetro `url` e, sem validação, redireciona o navegador da vítima para `https://site-malicioso.com/phishing`.
4.  **Ataque de Phishing/Malware:** A vítima chega ao site malicioso, que pode ser uma página de phishing idêntica ao site legítimo (para roubar credenciais) ou um site que instala malware.

**Por que é perigoso?**

*   **Credibilidade:** O atacante se beneficia da credibilidade do domínio legítimo, enganando a vítima para que ela confie no link inicial.
*   **Phishing:** Facilita ataques de phishing, pois a URL inicial parece legítima.
*   **Malware:** Pode ser usado para direcionar usuários para sites que distribuem malware.
*   **Bypass de Segurança:** Em alguns casos, pode ser usado para contornar verificações de `Referer` ou políticas de segurança baseadas em origem.

## Como proteger sua aplicação?

A proteção contra redirects não validados se baseia em validar rigorosamente o destino do redirecionamento.

### 1. Whitelisting de URLs de Redirecionamento

Esta é a defesa mais eficaz. Em vez de aceitar qualquer URL como parâmetro, mantenha uma lista predefinida de URLs ou domínios permitidos para redirecionamento. Se a URL solicitada não estiver nesta lista, o redirecionamento deve ser negado ou o usuário deve ser redirecionado para uma página padrão segura.

**Exemplo (pseudo-código):**

```python
@app.route("/redirect")
def safe_redirect():
    target_url = request.args.get("url")
    
    allowed_domains = ["sitelegitimo.com", "sub.sitelegitimo.com"]
    
    if target_url and any(domain in target_url for domain in allowed_domains):
        return redirect(target_url)
    else:
        # Redirecionar para uma página padrão segura ou exibir um erro
        return redirect("/pagina_inicial_segura")
```

### 2. Redirecionamento para Páginas Internas Apenas

Se a funcionalidade de redirecionamento for apenas para páginas dentro do seu próprio domínio, você pode validar se o parâmetro de URL é um caminho relativo ou se o domínio corresponde exatamente ao seu próprio domínio.

**Exemplo:**

```python
from urllib.parse import urlparse

@app.route("/redirect")
def safe_redirect_internal():
    target_url = request.args.get("url")
    
    if target_url:
        parsed_url = urlparse(target_url)
        # Verificar se é um caminho relativo ou se o host é o mesmo
        if not parsed_url.netloc or parsed_url.netloc == request.host:
            return redirect(target_url)
    
    return redirect("/pagina_inicial_segura")
```

### 3. Evitar Redirecionamentos Baseados em Parâmetros

Sempre que possível, evite usar parâmetros de URL para especificar destinos de redirecionamento. Em vez disso, use IDs ou índices que mapeiam para URLs predefinidas no lado do servidor. Por exemplo, em vez de `redirect?url=...`, use `redirect?id=123`, onde `123` corresponde a uma URL segura conhecida pelo servidor.

### 4. Alertar o Usuário

Se um redirecionamento para um domínio externo for absolutamente necessário e não puder ser evitado com whitelisting, considere exibir uma página de aviso ao usuário, informando que ele está prestes a ser redirecionado para um site externo e solicitando sua confirmação antes de prosseguir.

### 5. Validação de Entrada

Embora não seja uma defesa completa por si só, sempre valide e sanitize os parâmetros de entrada para evitar outros ataques, como XSS, que poderiam ser combinados com um open redirect.

## Conclusão

Redirects não validados são uma vulnerabilidade que pode ser facilmente explorada para ataques de phishing e distribuição de malware. A defesa mais robusta é a implementação de uma lista de permissões (whitelisting) para os destinos de redirecionamento. Evitar redirecionamentos baseados em parâmetros e alertar o usuário sobre redirecionamentos externos também são práticas recomendadas para proteger sua aplicação e seus usuários.


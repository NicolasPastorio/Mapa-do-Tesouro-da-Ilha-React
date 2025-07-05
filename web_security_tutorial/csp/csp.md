# Content Security Policy (CSP): Entendendo e Implementando

## O que é Content Security Policy (CSP)?

Content Security Policy (CSP) é uma camada adicional de segurança que ajuda a detectar e mitigar certos tipos de ataques, principalmente Cross-Site Scripting (XSS) e ataques de injeção de dados. A CSP é implementada através de um cabeçalho HTTP (`Content-Security-Policy`) que permite aos administradores de sites controlar quais recursos (scripts, folhas de estilo, imagens, etc.) o navegador do usuário tem permissão para carregar para uma determinada página.

## Como funciona a CSP?

A CSP funciona definindo uma lista de permissões (whitelist) de fontes de conteúdo confiáveis. O navegador do usuário, ao receber o cabeçalho CSP, só carregará e executará recursos de fontes que estão na lista de permissões. Se um atacante conseguir injetar um script malicioso em sua página, a CSP pode impedir que esse script seja executado, pois a fonte do script não estará na lista de permissões.

**Exemplo de Cabeçalho CSP:**

```
Content-Security-Policy: default-src 'self'; script-src 'self' https://apis.google.com; img-src *; media-src media1.com media2.com; style-src 'self' 'unsafe-inline';
```

Este cabeçalho define as seguintes políticas:

*   **`default-src 'self'`:** Por padrão, permite o carregamento de recursos apenas do mesmo domínio (`'self'`).
*   **`script-src 'self' https://apis.google.com`:** Permite a execução de scripts do mesmo domínio e de `https://apis.google.com`.
*   **`img-src *`:** Permite o carregamento de imagens de qualquer fonte (`*`).
*   **`media-src media1.com media2.com`:** Permite o carregamento de mídia (áudio e vídeo) de `media1.com` e `media2.com`.
*   **`style-src 'self' 'unsafe-inline'`:** Permite o carregamento de folhas de estilo do mesmo domínio e o uso de estilos inline (não recomendado, mas às vezes necessário).

## Diretivas Comuns da CSP

*   **`default-src`:** Define a política padrão para a maioria das diretivas de recursos.
*   **`script-src`:** Define as fontes permitidas para scripts JavaScript.
*   **`style-src`:** Define as fontes permitidas para folhas de estilo (CSS).
*   **`img-src`:** Define as fontes permitidas para imagens.
*   **`font-src`:** Define as fontes permitidas para fontes.
*   **`connect-src`:** Define as fontes permitidas para conexões (XHR, WebSockets, EventSource).
*   **`media-src`:** Define as fontes permitidas para mídia (áudio e vídeo).
*   **`object-src`:** Define as fontes permitidas para plugins (`<object>`, `<embed>`, `<applet>`).
*   **`frame-src`:** Define as fontes permitidas para iframes.
*   **`report-uri` / `report-to`:** Especifica uma URL para onde o navegador enviará relatórios de violação da CSP.

## Como implementar a CSP?

### 1. Análise e Planejamento

Antes de implementar a CSP, analise sua aplicação para identificar todos os recursos externos que ela utiliza (scripts, folhas de estilo, imagens, fontes, etc.). Crie uma lista de todas as fontes confiáveis.

### 2. Construção da Política

Construa sua política CSP com base na lista de fontes confiáveis. Comece com uma política restritiva e adicione permissões conforme necessário.

**Exemplo de Política Restritiva:**

```
Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self';
```

### 3. Evitar `unsafe-inline` e `unsafe-eval`

*   **`unsafe-inline`:** Permite o uso de scripts e estilos inline (ex: `<script>...</script>`, `onclick="..."`). Isso enfraquece a proteção contra XSS. Em vez disso, mova todo o código JavaScript e CSS para arquivos externos.
*   **`unsafe-eval`:** Permite o uso de funções como `eval()`, que podem ser perigosas. Evite o uso dessas funções.

### 4. Usar Nonces ou Hashes

Se você precisar permitir scripts ou estilos inline específicos, pode usar nonces ou hashes:

*   **Nonce (Number used once):** Um valor aleatório gerado pelo servidor para cada requisição. O nonce é incluído no cabeçalho CSP e no atributo do script/estilo. O navegador só executará o script/estilo se o nonce corresponder.

    **Cabeçalho:** `Content-Security-Policy: script-src 'nonce-RANDOM_VALUE'`

    **HTML:** `<script nonce="RANDOM_VALUE">...</script>`

*   **Hash:** Um hash SHA256, SHA384 ou SHA512 do conteúdo do script/estilo. O hash é incluído no cabeçalho CSP. O navegador calculará o hash do script/estilo e o executará apenas se corresponder ao hash no cabeçalho.

    **Cabeçalho:** `Content-Security-Policy: script-src 'sha256-HASH_DO_SCRIPT'`

### 5. Modo de Relatório (Report-Only)

Antes de aplicar a CSP, você pode implementá-la em modo de relatório usando o cabeçalho `Content-Security-Policy-Report-Only`. Neste modo, o navegador não bloqueará os recursos que violam a política, mas enviará relatórios de violação para a URL especificada em `report-uri` ou `report-to`. Isso permite que você teste sua política e identifique problemas sem quebrar a funcionalidade do seu site.

**Exemplo de Cabeçalho Report-Only:**

```
Content-Security-Policy-Report-Only: default-src 'self'; report-uri /csp-violation-report-endpoint;
```

### 6. Implementação e Monitoramento

Depois de testar sua política em modo de relatório e ter certeza de que ela não quebra nenhuma funcionalidade legítima, você pode implementá-la usando o cabeçalho `Content-Security-Policy`. Continue monitorando os relatórios de violação para identificar tentativas de ataque ou problemas em sua política.

## Benefícios da CSP

*   **Mitigação de XSS:** A principal vantagem da CSP é a mitigação de ataques XSS, impedindo que scripts maliciosos sejam executados.
*   **Controle sobre Recursos:** Permite um controle granular sobre quais recursos podem ser carregados em sua página.
*   **Relatórios de Violação:** Fornece informações valiosas sobre tentativas de ataque e problemas de segurança em sua aplicação.

## Conclusão

A Content Security Policy é uma defesa poderosa e essencial para aplicações web modernas. Embora sua implementação possa ser complexa, especialmente em aplicações grandes e legadas, os benefícios de segurança superam em muito o esforço. Ao definir uma política CSP robusta, você pode reduzir significativamente o risco de ataques XSS e outras vulnerabilidades de injeção de conteúdo.


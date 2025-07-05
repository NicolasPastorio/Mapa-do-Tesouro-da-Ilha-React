# Subresource Integrity (SRI): Entendendo e Implementando

## O que é Subresource Integrity (SRI)?

Subresource Integrity (SRI) é um recurso de segurança que permite aos navegadores verificar se os recursos que eles buscam (por exemplo, de uma CDN - Content Delivery Network) foram entregues sem manipulação inesperada. Ele funciona permitindo que você forneça um hash criptográfico (um "fingerprint") de um recurso que você está incluindo em sua página. Se o recurso que o navegador busca não corresponder a esse hash, o navegador se recusará a carregá-lo.

## Por que usar SRI?

É comum que aplicações web incluam recursos de terceiros, como bibliotecas JavaScript (jQuery, React), frameworks CSS (Bootstrap) e fontes, a partir de CDNs. Isso melhora o desempenho, pois os usuários podem já ter esses recursos em cache de outros sites.

No entanto, isso introduz um risco de segurança: se a CDN for comprometida, um atacante pode modificar o conteúdo do recurso (por exemplo, injetar código malicioso em um arquivo JavaScript). Se sua aplicação carregar esse recurso comprometido, ela se tornará vulnerável.

O SRI mitiga esse risco, garantindo que o recurso carregado seja exatamente o que você espera que seja.

## Como funciona o SRI?

O SRI é implementado adicionando o atributo `integrity` às tags `<script>` e `<link>` (para folhas de estilo).

O valor do atributo `integrity` é uma string que contém um ou mais hashes criptográficos do recurso. A string começa com o nome do algoritmo de hash (atualmente, `sha256`, `sha384` ou `sha512`), seguido por um hífen e o hash codificado em Base64.

**Exemplo de SRI para um script:**

```html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"
        integrity="sha256-oP6HI9z1XaZNBrJURtCoUT5SUnxFr8s3BzRl+cbzUq8="
        crossorigin="anonymous"></script>
```

**Como o navegador processa isso:**

1.  **Busca do Recurso:** O navegador busca o arquivo `jquery-3.6.0.min.js` da CDN.
2.  **Cálculo do Hash:** O navegador calcula o hash SHA-256 do arquivo que ele baixou.
3.  **Comparação:** O navegador compara o hash que ele calculou com o hash fornecido no atributo `integrity`.
4.  **Decisão:**
    *   **Se os hashes corresponderem:** O recurso é considerado seguro e é executado.
    *   **Se os hashes não corresponderem:** O recurso é considerado comprometido. O navegador se recusa a executá-lo e gera um erro de segurança no console.

## O Atributo `crossorigin`

O atributo `crossorigin="anonymous"` é necessário para que o SRI funcione corretamente com recursos de terceiros. Ele instrui o navegador a buscar o recurso sem enviar credenciais do usuário (como cookies ou cabeçalhos de autenticação HTTP). Isso é importante para a privacidade e segurança, e também é um requisito para que o navegador possa verificar o recurso sem expor informações sensíveis.

## Como gerar os hashes de integridade?

Você pode gerar os hashes de integridade de várias maneiras:

### 1. Usando Ferramentas Online

Existem ferramentas online, como o [SRI Hash Generator](https://www.srihash.org/), que podem gerar os hashes para você. Basta fornecer a URL do recurso.

### 2. Usando a Linha de Comando (OpenSSL)

Você pode usar o OpenSSL para gerar o hash de um arquivo local:

```bash
# Para SHA-256
openssl dgst -sha256 -binary my-file.js | openssl base64 -A

# Para SHA-384
openssl dgst -sha384 -binary my-file.js | openssl base64 -A

# Para SHA-512
openssl dgst -sha512 -binary my-file.js | openssl base64 -A
```

### 3. De Fontes Confiáveis

Muitas CDNs e projetos de código aberto fornecem os hashes de integridade junto com os links para seus recursos. Por exemplo, o site do Bootstrap fornece os hashes para suas bibliotecas CSS e JavaScript.

## Implementando SRI em sua Aplicação

1.  **Identifique Recursos de Terceiros:** Identifique todos os scripts e folhas de estilo que você está carregando de domínios de terceiros.
2.  **Gere os Hashes:** Para cada recurso, gere o hash de integridade usando um dos métodos acima. É recomendado usar pelo menos SHA-384 ou SHA-512, pois são mais resistentes a colisões do que SHA-256.
3.  **Adicione os Atributos:** Adicione os atributos `integrity` e `crossorigin="anonymous"` às suas tags `<script>` e `<link>`.

**Exemplo com Bootstrap:**

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" 
      integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" 
      crossorigin="anonymous">

<!-- JavaScript -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" 
        integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" 
        crossorigin="anonymous"></script>
```

## Limitações do SRI

*   **Não protege contra ataques no seu próprio servidor:** O SRI foi projetado para proteger contra comprometimento de servidores de terceiros. Se o seu próprio servidor for comprometido, um atacante pode simplesmente remover ou alterar os hashes de integridade junto com os recursos.
*   **Atualizações de Recursos:** Se o recurso na CDN for atualizado, o hash mudará e o navegador bloqueará o recurso. Você precisará atualizar o hash de integridade em sua aplicação sempre que o recurso for atualizado.

## Conclusão

Subresource Integrity é uma defesa simples e eficaz contra ataques que visam comprometer CDNs e outros servidores de terceiros. Ao implementar o SRI, você garante que sua aplicação só carregue e execute os recursos que você confia, protegendo seus usuários contra scripts maliciosos e outras ameaças. É uma prática de segurança essencial para qualquer aplicação web que depende de recursos de terceiros.


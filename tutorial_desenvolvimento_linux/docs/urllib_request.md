# urllib.request: Fazendo Requisições HTTP em Python

O módulo `urllib.request` da biblioteca padrão do Python é uma ferramenta poderosa para abrir e ler URLs, o que é essencial para interagir com recursos da web, como APIs, páginas HTML e downloads de arquivos. Ele lida com vários protocolos (HTTP, HTTPS, FTP, etc.) e oferece funcionalidades para lidar com autenticação, cookies, redirecionamentos e proxies.

## 1. Abrindo e Lendo URLs

A função mais básica é `urllib.request.urlopen()`, que abre uma URL e retorna um objeto tipo arquivo que pode ser lido.

```python
import urllib.request

print("\n--- Exemplo 1: Abrindo e Lendo uma URL Simples ---")

try:
    # Abre a URL
    with urllib.request.urlopen("http://www.example.com") as response:
        # Lê o conteúdo da resposta
        html = response.read()
        # Decodifica o conteúdo (geralmente UTF-8)
        print("Conteúdo HTML (primeiros 500 caracteres):\n", html.decode("utf-8")[:500])
        print("\nCódigo de Status HTTP:", response.getcode())
        print("URL Final (após redirecionamentos):", response.geturl())
        print("Cabeçalhos da Resposta:\n")
        for header, value in response.info().items():
            print(f"  {header}: {value}")

except urllib.error.URLError as e:
    print(f"Erro ao abrir URL: {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
```

**Observações:**

*   `urlopen()` retorna um objeto que se comporta como um arquivo, permitindo usar `read()`, `readline()`, `readlines()`, etc.
*   É uma boa prática usar `with` para garantir que a conexão seja fechada automaticamente.
*   `response.getcode()` retorna o código de status HTTP (e.g., 200 para sucesso, 404 para não encontrado).
*   `response.info()` retorna um objeto `http.client.HTTPMessage` que contém os cabeçalhos da resposta.

## 2. Enviando Dados (Requisições POST)

Para enviar dados para um servidor (como em um formulário HTML ou uma API REST), você geralmente usa o método POST. Isso é feito passando um argumento `data` para `urlopen()`.

```python
import urllib.request
import urllib.parse

print("\n--- Exemplo 2: Enviando Dados (POST) ---")

# Dados a serem enviados (dicionário Python)
dados = {
    "nome": "João Silva",
    "email": "joao.silva@example.com"
}

# Codifica os dados para o formato URL-encoded (application/x-www-form-urlencoded)
dados_codificados = urllib.parse.urlencode(dados).encode("utf-8")

# URL para onde os dados serão enviados (um endpoint de teste)
url_post = "https://httpbin.org/post"

try:
    # Cria um objeto Request com a URL e os dados
    req = urllib.request.Request(url_post, data=dados_codificados, method="POST")
    # Adiciona um cabeçalho Content-Type (opcional, mas boa prática)
    req.add_header("Content-Type", "application/x-www-form-urlencoded")

    with urllib.request.urlopen(req) as response:
        resposta_json = response.read().decode("utf-8")
        print("Resposta do Servidor (JSON):\n", resposta_json)

except urllib.error.URLError as e:
    print(f"Erro ao enviar dados: {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
```

**Observações:**

*   `urllib.parse.urlencode()`: Converte um dicionário Python em uma string no formato `chave1=valor1&chave2=valor2`.
*   `.encode("utf-8")`: É crucial codificar a string para bytes, pois `urlopen()` espera bytes para o argumento `data`.
*   `urllib.request.Request()`: Permite criar um objeto de requisição mais complexo, onde você pode definir o método HTTP (`GET`, `POST`, `PUT`, etc.), cabeçalhos personalizados e dados.

## 3. Adicionando Cabeçalhos Personalizados

Você pode adicionar cabeçalhos HTTP personalizados à sua requisição usando o objeto `Request` e o método `add_header()`.

```python
import urllib.request

print("\n--- Exemplo 3: Adicionando Cabeçalhos Personalizados ---")

url = "https://httpbin.org/headers"

# Cria um objeto Request
req = urllib.request.Request(url)

# Adiciona cabeçalhos personalizados
req.add_header("User-Agent", "MeuAppPython/1.0")
req.add_header("Accept-Language", "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7")

try:
    with urllib.request.urlopen(req) as response:
        resposta_json = response.read().decode("utf-8")
        print("Resposta do Servidor (JSON com cabeçalhos):\n", resposta_json)

except urllib.error.URLError as e:
    print(f"Erro ao fazer requisição: {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
```

## 4. Lidando com Erros HTTP

Quando uma requisição HTTP resulta em um código de status de erro (4xx ou 5xx), `urlopen()` levanta uma exceção `urllib.error.HTTPError`, que é uma subclasse de `urllib.error.URLError`.

```python
import urllib.request
import urllib.error

print("\n--- Exemplo 4: Tratamento de Erros HTTP ---")

url_404 = "https://httpbin.org/status/404" # URL que retorna 404 Not Found
url_500 = "https://httpbin.org/status/500" # URL que retorna 500 Internal Server Error

try:
    with urllib.request.urlopen(url_404) as response:
        print("Sucesso inesperado!")
except urllib.error.HTTPError as e:
    print(f"Erro HTTP: {e.code} - {e.reason}")
    # Você pode ler o corpo da resposta de erro se necessário
    # print("Corpo do erro:\n", e.read().decode("utf-8"))
except urllib.error.URLError as e:
    print(f"Erro de URL (rede, etc.): {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")

try:
    with urllib.request.urlopen(url_500) as response:
        print("Sucesso inesperado!")
except urllib.error.HTTPError as e:
    print(f"Erro HTTP: {e.code} - {e.reason}")
except urllib.error.URLError as e:
    print(f"Erro de URL (rede, etc.): {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")
```

## 5. Usando Proxies

Você pode configurar `urllib.request` para usar um proxy HTTP ou HTTPS.

```python
import urllib.request

print("\n--- Exemplo 5: Usando Proxy (Exemplo Conceitual) ---")

# Substitua pelo seu endereço de proxy real
proxy_url = "http://seu.proxy.com:8080"

# Cria um handler de proxy
proxy_handler = urllib.request.ProxyHandler({
    "http": proxy_url,
    "https": proxy_url
})

# Cria um abridor (opener) com o handler de proxy
opener = urllib.request.build_opener(proxy_handler)

# Instala o abridor como o abridor padrão
urllib.request.install_opener(opener)

# Agora, todas as chamadas a urlopen() usarão o proxy
try:
    # Esta requisição passará pelo proxy configurado
    with urllib.request.urlopen("http://www.example.com") as response:
        print("Requisição feita com sucesso via proxy (se configurado corretamente).")
        print("Código de Status HTTP:", response.getcode())
except urllib.error.URLError as e:
    print(f"Erro ao usar proxy: {e.reason}")
except Exception as e:
    print(f"Ocorreu um erro inesperado: {e}")

# Para remover o proxy e voltar ao comportamento padrão:
# urllib.request.install_opener(urllib.request.build_opener())
```

## Conclusão

O módulo `urllib.request` é uma ferramenta fundamental para qualquer aplicação Python que precise interagir com a web. Ele oferece uma interface flexível para fazer requisições HTTP (e outros protocolos), enviar dados, manipular cabeçalhos e lidar com erros. Embora bibliotecas de terceiros como `requests` ofereçam uma API mais amigável e recursos adicionais, `urllib.request` é uma excelente opção para tarefas mais simples ou quando você precisa de uma solução que já vem com a biblioteca padrão do Python.


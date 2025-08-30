# tempfile: Criando Arquivos e Diretórios Temporários

O módulo `tempfile` da biblioteca padrão do Python é usado para criar arquivos e diretórios temporários de forma segura. Ele é ideal para situações em que você precisa de um local de armazenamento temporário para dados que não precisam persistir após a execução do programa, como arquivos intermediários em um pipeline de processamento ou dados sensíveis que devem ser descartados automaticamente.

## 1. Por que usar `tempfile`?

*   **Segurança:** O `tempfile` garante que os arquivos e diretórios temporários sejam criados de forma segura, minimizando o risco de colisões de nomes ou vulnerabilidades de segurança.
*   **Portabilidade:** Ele lida com as diferenças entre sistemas operacionais (Linux, Windows, macOS) na forma como os arquivos temporários são criados e gerenciados.
*   **Limpeza Automática:** Muitos dos objetos criados pelo `tempfile` são automaticamente limpos (excluídos) quando não são mais necessários ou quando o programa termina, o que ajuda a evitar o acúmulo de lixo no sistema.

## 2. Criando Arquivos Temporários

### `tempfile.TemporaryFile()`: Arquivo Temporário em Modo Binário

Cria um arquivo temporário que é aberto em modo binário (`'w+b'`) por padrão. O arquivo é excluído automaticamente quando fechado (ou quando o programa termina).

```python
import tempfile
import os

print("\n--- Exemplo 1: tempfile.TemporaryFile() ---")

# Cria um arquivo temporário
with tempfile.TemporaryFile(mode='w+t', encoding='utf-8') as fp:
    fp.write("Este é um arquivo temporário.\n")
    fp.write("Ele será excluído automaticamente ao fechar.")

    # Volta para o início do arquivo para ler
    fp.seek(0)
    conteudo = fp.read()
    print("Conteúdo do arquivo temporário:\n", conteudo)

# Neste ponto, o arquivo já foi fechado e excluído.
# Tentar acessá-lo resultaria em erro.
# print(os.path.exists(fp.name)) # Isso causaria um AttributeError, pois fp.name não existe para TemporaryFile

print("Arquivo temporário criado, lido e excluído.")
```

**Observações:**

*   `TemporaryFile` não tem um nome de arquivo visível no sistema de arquivos, o que aumenta a segurança. Se você precisar de um nome de arquivo, use `NamedTemporaryFile`.
*   `mode='w+t', encoding='utf-8'` é usado para abrir o arquivo em modo texto com codificação UTF-8.

### `tempfile.NamedTemporaryFile()`: Arquivo Temporário com Nome

Cria um arquivo temporário que tem um nome visível no sistema de arquivos. O arquivo é excluído automaticamente quando fechado (ou quando o programa termina), a menos que `delete=False` seja especificado.

```python
import tempfile
import os

print("\n--- Exemplo 2: tempfile.NamedTemporaryFile() ---")

# Cria um arquivo temporário com nome
with tempfile.NamedTemporaryFile(mode='w+t', delete=False, encoding='utf-8') as temp_file:
    temp_file.write("Este é um arquivo temporário nomeado.\n")
    temp_file.write("Seu nome é visível no sistema de arquivos.")
    temp_file_path = temp_file.name
    print(f"Arquivo temporário criado em: {temp_file_path}")

    temp_file.seek(0)
    conteudo = temp_file.read()
    print("Conteúdo do arquivo temporário:\n", conteudo)

# O arquivo ainda existe aqui porque delete=False
print(f"Arquivo existe após fechar (delete=False)? {os.path.exists(temp_file_path)}")

# Limpeza manual, pois delete=False
os.remove(temp_file_path)
print(f"Arquivo excluído manualmente: {temp_file_path}")

# Exemplo com delete=True (comportamento padrão)
with tempfile.NamedTemporaryFile(mode='w+t', encoding='utf-8') as temp_file_auto_delete:
    temp_file_auto_delete.write("Este será excluído automaticamente.")
    auto_delete_path = temp_file_auto_delete.name
    print(f"Arquivo temporário para auto-exclusão: {auto_delete_path}")

# Neste ponto, o arquivo já foi fechado e excluído.
print(f"Arquivo existe após fechar (delete=True)? {os.path.exists(auto_delete_path)}")
```

## 3. Criando Diretórios Temporários

### `tempfile.TemporaryDirectory()`: Diretório Temporário

Cria um diretório temporário. O diretório e todo o seu conteúdo são excluídos automaticamente quando o objeto `TemporaryDirectory` é destruído (ou quando o programa termina).

```python
import tempfile
import os

print("\n--- Exemplo 3: tempfile.TemporaryDirectory() ---")

# Cria um diretório temporário
with tempfile.TemporaryDirectory() as temp_dir:
    print(f"Diretório temporário criado em: {temp_dir}")

    # Criar um arquivo dentro do diretório temporário
    temp_file_in_dir = os.path.join(temp_dir, "meu_arquivo.txt")
    with open(temp_file_in_dir, "w") as f:
        f.write("Conteúdo do arquivo no diretório temporário.")
    print(f"Arquivo criado dentro do diretório temporário: {temp_file_in_dir}")

    print(f"Conteúdo do diretório temporário: {os.listdir(temp_dir)}")

# Neste ponto, o diretório temporário e seu conteúdo foram excluídos.
print(f"Diretório existe após fechar? {os.path.exists(temp_dir)}")
print("Diretório temporário e seu conteúdo excluídos.")
```

## 4. Funções de Baixo Nível (`mkstemp`, `mkdtemp`)

Para um controle mais granular, `tempfile` oferece funções de baixo nível como `mkstemp()` (make temporary file) e `mkdtemp()` (make temporary directory). Estas funções retornam o caminho completo para o arquivo/diretório e **não os excluem automaticamente**. Você é responsável pela limpeza.

### `tempfile.mkstemp()`: Cria um arquivo temporário de baixo nível

Retorna uma tupla `(fd, path)`, onde `fd` é o descritor de arquivo do arquivo temporário e `path` é o caminho completo para ele. O arquivo é aberto em modo binário.

```python
import tempfile
import os

print("\n--- Exemplo 4: tempfile.mkstemp() ---")

fd, path = tempfile.mkstemp(suffix=".tmp", prefix="meu_app_")
print(f"Arquivo temporário criado (mkstemp): {path}")

# Escrever no arquivo usando o descritor de arquivo
with os.fdopen(fd, 'w') as tmp:
    tmp.write("Dados escritos via descritor de arquivo.")

# Ler o arquivo
with open(path, 'r') as tmp:
    print("Conteúdo lido (mkstemp):", tmp.read())

# Limpeza manual
os.remove(path)
print(f"Arquivo {path} excluído manualmente.")
```

### `tempfile.mkdtemp()`: Cria um diretório temporário de baixo nível

Retorna o caminho completo para o diretório temporário. Você é responsável por excluí-lo e seu conteúdo.

```python
import tempfile
import os
import shutil

print("\n--- Exemplo 5: tempfile.mkdtemp() ---")

dir_path = tempfile.mkdtemp(prefix="dados_temp_")
print(f"Diretório temporário criado (mkdtemp): {dir_path}")

# Criar um arquivo dentro dele
file_in_dir = os.path.join(dir_path, "config.ini")
with open(file_in_dir, "w") as f:
    f.write("[settings]\nkey=value")

print(f"Conteúdo do diretório: {os.listdir(dir_path)}")

# Limpeza manual (usando shutil.rmtree para diretórios não vazios)
shutil.rmtree(dir_path)
print(f"Diretório {dir_path} e seu conteúdo excluídos manualmente.")
```

## Conclusão

O módulo `tempfile` é uma ferramenta essencial para gerenciar arquivos e diretórios temporários em suas aplicações Python. Ele oferece uma maneira segura e portátil de criar e, opcionalmente, limpar automaticamente esses recursos. Para a maioria dos casos de uso, `TemporaryFile`, `NamedTemporaryFile` e `TemporaryDirectory` são as opções mais convenientes devido à sua funcionalidade de auto-limpeza. Para cenários que exigem controle mais preciso, `mkstemp` e `mkdtemp` fornecem as ferramentas necessárias, mas exigem que você gerencie a limpeza manualmente. Usar `tempfile` adequadamente ajuda a manter seu sistema limpo e suas aplicações seguras.


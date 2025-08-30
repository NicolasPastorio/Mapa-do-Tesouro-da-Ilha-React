# pathlib.Path: Manipulação de Caminhos de Arquivo Orientada a Objetos

O módulo `pathlib` da biblioteca padrão do Python oferece uma abordagem orientada a objetos para manipular caminhos de sistema de arquivos. Em vez de usar strings e funções separadas (como no módulo `os.path`), `pathlib` representa caminhos como objetos `Path`, tornando o código mais legível, robusto e menos propenso a erros. Ele abstrai as diferenças entre sistemas operacionais (Windows, Linux, macOS), permitindo que você escreva código mais portátil.

## 1. Por que usar `pathlib.Path`?

Tradicionalmente, a manipulação de caminhos em Python era feita com o módulo `os.path`, que usa strings para representar caminhos. Isso podia levar a código menos legível e a erros, especialmente ao lidar com diferentes separadores de caminho (`/` vs `\`). O `pathlib` resolve isso:

*   **Orientado a Objetos:** Caminhos são objetos com métodos e propriedades, tornando as operações mais intuitivas.
*   **Legibilidade:** O código se torna mais expressivo e fácil de entender.
*   **Portabilidade:** Lida automaticamente com as convenções de caminho do sistema operacional subjacente.
*   **Segurança:** Reduz a chance de erros relacionados a concatenação de strings.

## 2. Criando Objetos `Path`

Você pode criar um objeto `Path` a partir de uma string ou de partes de um caminho.

```python
from pathlib import Path

print("\n--- Exemplo 1: Criando Objetos Path ---")

# Caminho absoluto
path_abs = Path("/home/ubuntu/documentos/relatorio.txt")
print(f"Caminho absoluto: {path_abs}")

# Caminho relativo
path_rel = Path("meus_dados/config.ini")
print(f"Caminho relativo: {path_rel}")

# Caminho a partir do diretório atual
current_dir = Path.cwd()
print(f"Diretório atual: {current_dir}")

# Combinando partes de um caminho (usando o operador /)
combined_path = Path("/home/ubuntu") / "projetos" / "meu_app" / "main.py"
print(f"Caminho combinado: {combined_path}")

# Caminho para o diretório home do usuário
home_dir = Path.home()
print(f"Diretório home: {home_dir}")
```

## 3. Acessando Propriedades do Caminho

Objetos `Path` fornecem propriedades para acessar diferentes partes de um caminho.

```python
from pathlib import Path

print("\n--- Exemplo 2: Propriedades do Caminho ---")

file_path = Path("/home/ubuntu/documentos/relatorio.txt")

print(f"Nome do arquivo: {file_path.name}")         # relatorio.txt
print(f"Sufixo (extensão): {file_path.suffix}")     # .txt
print(f"Sufixos (todas as extensões): {file_path.suffixes}") # [.txt]
print(f"Nome sem sufixo: {file_path.stem}")       # relatorio
print(f"Diretório pai: {file_path.parent}")       # /home/ubuntu/documentos
print(f"Partes do caminho: {file_path.parts}")    # ("/", "home", "ubuntu", "documentos", "relatorio.txt")
print(f"É absoluto? {file_path.is_absolute()}")
print(f"Âncora (raiz): {file_path.anchor}")       # /
print(f"Drive (em Windows): {file_path.drive}")     # (vazio em Linux)
```

## 4. Operações com Arquivos e Diretórios

`pathlib` oferece métodos para verificar a existência, criar, remover, copiar e mover arquivos e diretórios.

```python
from pathlib import Path
import shutil # Ainda útil para operações de alto nível como rmtree

print("\n--- Exemplo 3: Operações com Arquivos e Diretórios ---")

# Criar um diretório
new_dir = Path("./dados_pathlib")
new_dir.mkdir(exist_ok=True) # exist_ok=True evita erro se já existir
print(f"Diretório criado: {new_dir}")

# Criar diretórios aninhados
nested_dirs = Path("./a/b/c")
nested_dirs.mkdir(parents=True, exist_ok=True) # parents=True cria diretórios pais
print(f"Diretórios aninhados criados: {nested_dirs}")

# Criar um arquivo e escrever nele
file_to_write = new_dir / "meu_arquivo.txt"
file_to_write.write_text("Olá do pathlib!")
print(f"Arquivo criado e escrito: {file_to_write}")

# Ler o conteúdo de um arquivo
content = file_to_write.read_text()
print(f"Conteúdo lido: {content}")

# Verificar existência
print(f"Arquivo existe? {file_to_write.exists()}")
print(f"É um arquivo? {file_to_write.is_file()}")
print(f"É um diretório? {new_dir.is_dir()}")

# Renomear um arquivo
new_file_name = new_dir / "arquivo_renomeado.txt"
file_to_write.rename(new_file_name)
print(f"Arquivo renomeado para: {new_file_name}")

# Mover um arquivo (o mesmo que renomear para outro local)
# new_file_name.rename(Path("./outra_pasta/arquivo_movido.txt"))

# Copiar um arquivo (ainda usa shutil)
shutil.copy(new_file_name, new_dir / "copia_arquivo.txt")
print(f"Arquivo copiado para: {new_dir / "copia_arquivo.txt"}")

# Remover um arquivo
(new_dir / "copia_arquivo.txt").unlink()
print(f"Arquivo \"copia_arquivo.txt\" removido.")

# Remover um diretório vazio
nested_dirs.rmdir() # Só funciona se o diretório estiver vazio
print(f"Diretório vazio removido: {nested_dirs}")

# Remover um diretório não vazio (usar shutil.rmtree)
shutil.rmtree(new_dir)
print(f"Diretório \"{new_dir}\" e seu conteúdo removidos com shutil.rmtree.")
```

## 5. Iterando sobre Diretórios

`pathlib` facilita a iteração sobre o conteúdo de diretórios.

### `iterdir()`: Iterar sobre o conteúdo direto

```python
from pathlib import Path
import os

print("\n--- Exemplo 4: Iterando com iterdir() ---")

# Criar uma estrutura de teste
os.makedirs("pasta_teste/sub_pasta", exist_ok=True)
Path("pasta_teste/arquivo1.txt").touch()
Path("pasta_teste/arquivo2.log").touch()

base_path = Path("pasta_teste")

print(f"Conteúdo de \'{base_path}\':")
for item in base_path.iterdir():
    print(f"  - {item} (É diretório? {item.is_dir()}, É arquivo? {item.is_file()})")

# Limpeza
shutil.rmtree(base_path)
```

### `glob()` e `rglob()`: Busca por Padrões

*   `glob(pattern)`: Retorna uma lista de caminhos que correspondem ao padrão no diretório atual.
*   `rglob(pattern)`: Retorna uma lista de caminhos que correspondem ao padrão recursivamente em subdiretórios.

```python
from pathlib import Path
import os
import shutil

print("\n--- Exemplo 5: Busca com glob() e rglob() ---")

# Criar uma estrutura de teste
os.makedirs("dados_glob/docs/relatorios", exist_ok=True)
Path("dados_glob/docs/relatorios/relatorio_jan.txt").touch()
Path("dados_glob/docs/relatorios/relatorio_fev.txt").touch()
Path("dados_glob/logs/app.log").touch()
Path("dados_glob/config.ini").touch()

base_path = Path("dados_glob")

print("Arquivos .txt no diretório atual (glob):")
for p in base_path.glob("*.txt"):
    print(f"  - {p}")

print("\nTodos os arquivos .txt recursivamente (rglob):")
for p in base_path.rglob("*.txt"):
    print(f"  - {p}")

print("\nTodos os arquivos .log recursivamente (rglob):")
for p in base_path.rglob("*.log"):
    print(f"  - {p}")

# Limpeza
shutil.rmtree(base_path)
```

## Conclusão

O módulo `pathlib.Path` é a maneira moderna e preferida de manipular caminhos de sistema de arquivos em Python. Sua abordagem orientada a objetos torna o código mais limpo, legível e portátil, abstraindo as complexidades de diferentes sistemas operacionais. Ao adotar `pathlib`, você pode escrever código mais robusto e fácil de manter para todas as suas necessidades de interação com o sistema de arquivos.


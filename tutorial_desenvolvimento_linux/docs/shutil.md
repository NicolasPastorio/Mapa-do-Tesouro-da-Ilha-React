# shutil: Operações de Alto Nível com Arquivos e Diretórios

O módulo `shutil` (do inglês *shell utility*) da biblioteca padrão do Python fornece uma série de operações de alto nível com arquivos e diretórios. Ele é especialmente útil para tarefas comuns de gerenciamento de arquivos que seriam mais complexas de implementar manualmente, como copiar, mover, renomear e excluir arquivos e árvores de diretórios inteiras. O `shutil` complementa o módulo `os` ao oferecer funcionalidades mais convenientes para operações de nível de usuário.

## 1. Copiando Arquivos e Diretórios

O `shutil` oferece funções para copiar arquivos e diretórios de forma eficiente.

### `shutil.copy(src, dst)`: Copiar um arquivo

Copia o arquivo `src` para o destino `dst`. Se `dst` for um diretório, o arquivo será copiado para dentro dele com o mesmo nome. Se `dst` for um nome de arquivo, o arquivo `src` será copiado e renomeado para `dst`.

```python
import shutil
import os

print("\n--- Exemplo 1: shutil.copy() ---")

# Criar um arquivo de teste
with open("arquivo_original.txt", "w") as f:
    f.write("Este é o conteúdo do arquivo original.")

# Copiar o arquivo para um novo nome
shutil.copy("arquivo_original.txt", "copia_arquivo.txt")
print("\"arquivo_original.txt\" copiado para \"copia_arquivo.txt\".")

# Criar um diretório para copiar o arquivo
os.makedirs("destino_copia", exist_ok=True)
shutil.copy("arquivo_original.txt", "destino_copia/")
print("\"arquivo_original.txt\" copiado para \"destino_copia/\".")

# Limpeza
os.remove("arquivo_original.txt")
os.remove("copia_arquivo.txt")
os.remove("destino_copia/arquivo_original.txt")
os.rmdir("destino_copia")
```

### `shutil.copyfile(src, dst)`: Copiar conteúdo de arquivo (sem metadados)

Copia o conteúdo do arquivo `src` para o arquivo `dst`. Não copia permissões ou outros metadados. `dst` deve ser um nome de arquivo.

### `shutil.copyfileobj(fsrc, fdst[, length])`: Copiar objeto de arquivo

Copia o conteúdo do objeto de arquivo `fsrc` para o objeto de arquivo `fdst`.

### `shutil.copytree(src, dst)`: Copiar um diretório inteiro

Copia recursivamente o diretório `src` para o diretório `dst`. `dst` não deve existir previamente. Copia permissões e metadados.

```python
import shutil
import os

print("\n--- Exemplo 2: shutil.copytree() ---")

# Criar uma estrutura de diretórios de teste
os.makedirs("origem_dir/sub_dir", exist_ok=True)
with open("origem_dir/arquivo1.txt", "w") as f: f.write("1")
with open("origem_dir/sub_dir/arquivo2.txt", "w") as f: f.write("2")

# Copiar a árvore de diretórios
shutil.copytree("origem_dir", "destino_dir_tree")
print("\"origem_dir\" copiado para \"destino_dir_tree\".")

# Limpeza
shutil.rmtree("origem_dir")
shutil.rmtree("destino_dir_tree")
```

## 2. Movendo e Renomeando Arquivos e Diretórios

### `shutil.move(src, dst)`: Mover ou Renomear

Move o arquivo ou diretório `src` para o destino `dst`. Se `dst` for um diretório existente, `src` será movido para dentro dele. Se `dst` não for um diretório, `src` será movido e renomeado para `dst`.

```python
import shutil
import os

print("\n--- Exemplo 3: shutil.move() ---")

# Criar um arquivo de teste
with open("arquivo_para_mover.txt", "w") as f:
    f.write("Conteúdo para mover.")

# Mover e renomear o arquivo
shutil.move("arquivo_para_mover.txt", "arquivo_movido_renomeado.txt")
print("\"arquivo_para_mover.txt\" movido e renomeado para \"arquivo_movido_renomeado.txt\".")

# Criar um diretório para mover o arquivo para dentro
os.makedirs("pasta_destino", exist_ok=True)
shutil.move("arquivo_movido_renomeado.txt", "pasta_destino/")
print("\"arquivo_movido_renomeado.txt\" movido para \"pasta_destino/\".")

# Limpeza
os.remove("pasta_destino/arquivo_movido_renomeado.txt")
os.rmdir("pasta_destino")
```

## 3. Excluindo Arquivos e Diretórios

Enquanto `os.remove()` remove arquivos e `os.rmdir()` remove diretórios vazios, `shutil` fornece uma função para remover árvores de diretórios não vazias.

### `shutil.rmtree(path)`: Remover uma árvore de diretórios

Exclui recursivamente o diretório `path` e todo o seu conteúdo. **Use com extrema cautela**, pois esta operação é irreversível.

```python
import shutil
import os

print("\n--- Exemplo 4: shutil.rmtree() ---")

# Criar uma estrutura de diretórios de teste
os.makedirs("diretorio_para_remover/sub_dir", exist_ok=True)
with open("diretorio_para_remover/arquivo_a.txt", "w") as f: f.write("a")
with open("diretorio_para_remover/sub_dir/arquivo_b.txt", "w") as f: f.write("b")

print("Diretório \"diretorio_para_remover\" criado.")

# Remover a árvore de diretórios
shutil.rmtree("diretorio_para_remover")
print("Diretório \"diretorio_para_remover\" e seu conteúdo removidos.")

# Verificar se o diretório existe (deve retornar False)
print(f"Diretório existe após rmtree? {os.path.exists("diretorio_para_remover")}")
```

## 4. Outras Funções Úteis

*   `shutil.disk_usage(path)`: Retorna estatísticas de uso de disco para o caminho fornecido (total, usado, livre).
*   `shutil.make_archive(base_name, format, root_dir)`: Cria um arquivo compactado (zip, tar, etc.) de um diretório.
*   `shutil.get_archive_formats()`: Retorna uma lista dos formatos de arquivo suportados para arquivamento.

### Exemplo: Criando um Arquivo Zip

```python
import shutil
import os

print("\n--- Exemplo 5: shutil.make_archive() ---")

# Criar alguns arquivos para arquivar
os.makedirs("arquivos_para_zipar", exist_ok=True)
with open("arquivos_para_zipar/doc1.txt", "w") as f: f.write("Documento 1")
with open("arquivos_para_zipar/doc2.txt", "w") as f: f.write("Documento 2")

# Criar um arquivo zip
archive_name = shutil.make_archive("meus_documentos", "zip", "arquivos_para_zipar")
print(f"Arquivo compactado criado: {archive_name}")

# Limpeza
shutil.rmtree("arquivos_para_zipar")
os.remove(archive_name)
```

## Conclusão

O módulo `shutil` é uma adição valiosa à caixa de ferramentas de qualquer desenvolvedor Python, simplificando significativamente as operações de gerenciamento de arquivos e diretórios. Ele oferece uma interface de alto nível para tarefas comuns, tornando o código mais limpo e menos propenso a erros. Ao combinar `shutil` com `os` e `pathlib`, você tem um controle completo e eficiente sobre o sistema de arquivos em suas aplicações Python.


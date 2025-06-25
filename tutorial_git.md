# Tutorial Completo de Git para Linux Ubuntu

## Introdução ao Git

Git é um sistema de controle de versão distribuído (DVCS) amplamente utilizado para rastrear mudanças em arquivos de código-fonte durante o desenvolvimento de software. Ele permite que múltiplos desenvolvedores colaborem em um projeto sem sobrescrever o trabalho uns dos outros, além de fornecer um histórico completo de todas as alterações, facilitando a reversão para versões anteriores, se necessário.

### Por que usar Git?

*   **Controle de Versão:** Rastreia cada alteração feita nos arquivos, permitindo que você veja quem fez o quê, quando e por quê.
*   **Colaboração:** Facilita o trabalho em equipe, permitindo que vários desenvolvedores trabalhem no mesmo projeto simultaneamente.
*   **Backup e Recuperação:** O histórico completo do projeto é armazenado, o que significa que você pode restaurar qualquer versão anterior do seu código.
*   **Branching e Merging:** Permite criar 


branches isoladas para desenvolver novas funcionalidades ou corrigir bugs, sem afetar a linha principal do projeto. Posteriormente, essas branches podem ser mescladas de volta à linha principal.

## Instalação do Git no Linux Ubuntu

Para instalar o Git no Ubuntu, você pode usar o gerenciador de pacotes `apt`. Abra o terminal (Ctrl+Alt+T) e execute os seguintes comandos:

```bash
sudo apt update
sudo apt install git -y
```

Após a instalação, você pode verificar a versão do Git para confirmar que foi instalado corretamente:

```bash
git --version
```

## Configuração Inicial do Git

Depois de instalar o Git, é importante configurar seu nome de usuário e endereço de e-mail. Essas informações serão associadas aos seus commits e são essenciais para identificar o autor das alterações. Execute os seguintes comandos, substituindo `Seu Nome` e `seu.email@example.com` pelas suas informações:

```bash
git config --global user.name "Seu Nome"
git config --global user.email "seu.email@example.com"
```

Você pode verificar suas configurações com:

```bash
git config --list
```

## Criando um Repositório Git Local

Para começar a versionar uma pasta existente com Git, navegue até o diretório desejado no terminal e inicialize um novo repositório Git:

```bash
cd /caminho/para/sua/pasta
git init
```

Este comando cria um subdiretório oculto chamado `.git` dentro da sua pasta, que contém todos os arquivos necessários para o Git rastrear as alterações do seu projeto. A partir deste momento, sua pasta está sob controle de versão do Git.

## Comandos Básicos do Git

### `git status`

Este comando exibe o estado atual do seu repositório, mostrando quais arquivos foram modificados, quais estão na área de staging (prontos para serem commitados) e quais não estão sendo rastreados pelo Git.

```bash
git status
```

### `git add`

O comando `git add` adiciona arquivos à área de staging. Isso significa que você está informando ao Git quais alterações você deseja incluir no próximo commit.

Para adicionar um arquivo específico:

```bash
git add nome_do_arquivo.txt
```

Para adicionar todos os arquivos modificados e novos no diretório atual:

```bash
git add .
```

### `git commit`

O comando `git commit` registra as alterações da área de staging no histórico do repositório. Cada commit deve ter uma mensagem descritiva que explique as alterações feitas.

```bash
git commit -m "Mensagem descritiva do commit"
```

### `git log`

Este comando exibe o histórico de commits do seu repositório, mostrando informações como o autor, a data e a mensagem de cada commit.

```bash
git log
```

Para uma visualização mais concisa:

```bash
git log --oneline --graph --decorate
```

## Criando Repositórios no GitHub

O GitHub é uma plataforma de hospedagem de código para controle de versão e colaboração usando Git. Ele permite que você armazene seus repositórios remotamente, compartilhe-os com outros desenvolvedores e colabore em projetos.

### Criando um Repositório via Interface Web do GitHub

1.  Acesse o GitHub e faça login na sua conta.
2.  No canto superior direito, clique no sinal de `+` e selecione `New repository` (Novo repositório).
3.  Preencha os detalhes do repositório:
    *   **Repository name:** Um nome para o seu repositório (ex: `meu-projeto-git`).
    *   **Description (optional):** Uma breve descrição do seu projeto.
    *   **Public or Private:** Escolha se o repositório será público (visível para todos) ou privado (visível apenas para você e colaboradores).
    *   **Initialize this repository with a README:** É recomendável marcar esta opção para criar um arquivo README.md inicial.
4.  Clique em `Create repository` (Criar repositório).

### Conectando um Repositório Local ao GitHub

Após criar o repositório no GitHub, você precisará conectar seu repositório local a ele. O GitHub fornecerá os comandos necessários após a criação do repositório. Geralmente, são:

```bash
git remote add origin <URL_do_repositorio_remoto>
git branch -M main
git push -u origin main
```

*   `git remote add origin <URL_do_repositorio_remoto>`: Adiciona um "controle remoto" chamado `origin` que aponta para o seu repositório no GitHub.
*   `git branch -M main`: Renomeia sua branch local principal para `main` (se ainda não for).
*   `git push -u origin main`: Envia (push) seus commits locais para o repositório remoto no GitHub e configura a branch `main` local para rastrear a branch `main` remota.

## Gitflow: Um Modelo de Branching

Gitflow é um modelo de branching popular que define um fluxo de trabalho rigoroso para o desenvolvimento de software, utilizando branches dedicadas para diferentes propósitos. Ele foi proposto por Vincent Driessen e é ideal para projetos com ciclos de lançamento bem definidos.

### Branches Principais do Gitflow

*   **`master` (ou `main`):** Esta branch contém o histórico de lançamentos oficiais do projeto. Cada commit nesta branch deve corresponder a uma versão estável e pronta para produção.
*   **`develop`:** Esta branch é a linha principal de desenvolvimento. Todas as novas funcionalidades e correções de bugs são integradas aqui antes de serem preparadas para um lançamento.

### Branches de Suporte do Gitflow

*   **`feature` branches:** Criadas a partir de `develop` para desenvolver novas funcionalidades. Quando a funcionalidade está completa, ela é mesclada de volta em `develop`.
    *   Convenção de nome: `feature/<nome-da-feature>`
*   **`release` branches:** Criadas a partir de `develop` para preparar um novo lançamento. Nesta branch, são feitas apenas correções de bugs e ajustes finais. Uma vez pronta, é mesclada em `master` e `develop`.
    *   Convenção de nome: `release/<versao>`
*   **`hotfix` branches:** Criadas a partir de `master` para corrigir bugs críticos em produção. Após a correção, é mesclada em `master` e `develop`.
    *   Convenção de nome: `hotfix/<nome-do-hotfix>`

## Comandos Git para Trabalhar com Branches

### `git branch`

*   **Listar branches:**
    ```bash
git branch
    ```
    (Mostra as branches locais. A branch atual é marcada com um asterisco.)

*   **Listar branches remotas:**
    ```bash
git branch -r
    ```

*   **Listar todas as branches (locais e remotas):**
    ```bash
git branch -a
    ```

*   **Criar uma nova branch:**
    ```bash
git branch <nome-da-nova-branch>
    ```
    (Isso cria a branch, mas não muda para ela.)

### `git checkout`

*   **Mudar para uma branch existente:**
    ```bash
git checkout <nome-da-branch>
    ```

*   **Criar e mudar para uma nova branch (atalho):**
    ```bash
git checkout -b <nome-da-nova-branch>
    ```

### `git merge`

*   **Mesclar uma branch em outra:**
    Primeiro, mude para a branch que receberá as alterações (ex: `develop`):
    ```bash
git checkout develop
    ```
    Em seguida, mescle a branch desejada (ex: `feature/minha-funcionalidade`):
    ```bash
git merge feature/minha-funcionalidade
    ```

### `git push`

*   **Enviar uma branch local para o repositório remoto:**
    ```bash
git push origin <nome-da-branch>
    ```
    (A primeira vez que você envia uma nova branch, pode ser necessário usar `-u` para configurar o rastreamento remoto: `git push -u origin <nome-da-branch>`)

### `git pull`

*   **Atualizar sua branch local com as alterações do repositório remoto:**
    ```bash
git pull origin <nome-da-branch>
    ```
    (Ou simplesmente `git pull` se a branch local já estiver rastreando uma branch remota.)

### `git branch -d`

*   **Excluir uma branch local:**
    ```bash
git branch -d <nome-da-branch>
    ```
    (Só é possível excluir uma branch se você não estiver nela e se ela já tiver sido mesclada.)

*   **Excluir uma branch local à força (cuidado!):**
    ```bash
git branch -D <nome-da-branch>
    ```

### `git push origin --delete`

*   **Excluir uma branch remota:**
    ```bash
git push origin --delete <nome-da-branch-remota>
    ```

## Versionando uma Pasta para Utilizar em Softwares

O processo de versionar uma pasta para uso em softwares é essencialmente o mesmo de versionar qualquer projeto com Git. A ideia é que o código-fonte ou os arquivos de configuração do software sejam gerenciados por um repositório Git.

1.  **Navegue até a pasta do software:**
    ```bash
cd /caminho/para/pasta/do/software
    ```

2.  **Inicialize o repositório Git:**
    ```bash
git init
    ```

3.  **Adicione os arquivos do software:**
    ```bash
git add .
    ```

4.  **Faça o primeiro commit:**
    ```bash
git commit -m "Primeiro commit: inicialização do repositório do software"
    ```

5.  **Opcional: Conecte a um repositório remoto (GitHub, GitLab, Bitbucket, etc.):**
    Se você deseja colaborar ou ter um backup remoto, crie um repositório no GitHub (conforme explicado anteriormente) e conecte-o:
    ```bash
git remote add origin <URL_do_repositorio_remoto>
git branch -M main
git push -u origin main
    ```

Com isso, todas as alterações futuras na pasta do seu software podem ser rastreadas, commitadas e, se necessário, enviadas para um repositório remoto.

## Conclusão

Este tutorial cobriu os fundamentos do Git, desde a instalação e configuração até os comandos básicos, a criação de repositórios no GitHub, o conceito de Gitflow e o trabalho com branches. Dominar essas ferramentas é crucial para qualquer desenvolvedor que busca eficiência, colaboração e segurança no gerenciamento de seus projetos de software.

## Referências

*   [Git SCM Documentation](https://git-scm.com/docs)
*   [GitHub Docs](https://docs.github.com/en)
*   [Atlassian Git Tutorial - Gitflow Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow)



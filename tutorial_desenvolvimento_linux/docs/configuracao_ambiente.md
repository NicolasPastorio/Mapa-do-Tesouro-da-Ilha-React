# Configuração do Ambiente de Desenvolvimento no Linux Ubuntu

Para seguir este tutorial e desenvolver aplicações leves no Linux Ubuntu, é essencial configurar corretamente o ambiente de desenvolvimento. Esta seção guiará você através da instalação das dependências necessárias, incluindo as bibliotecas GTK e os módulos Python.

## 1. Atualizando o Sistema

É sempre uma boa prática garantir que seu sistema esteja atualizado antes de instalar novos pacotes. Abra um terminal (Ctrl+Alt+T) e execute os seguintes comandos:

```bash
sudo apt update
sudo apt upgrade -y
```

## 2. Instalando as Bibliotecas GTK, Pango, Gdk e GLib

As bibliotecas GTK, Pango, Gdk e GLib são a base para o desenvolvimento de interfaces gráficas de usuário no Linux. Para instalar os pacotes de desenvolvimento necessários, execute o seguinte comando no terminal:

```bash
sudo apt install -y libgtk-3-dev
```

Este comando instalará automaticamente as dependências para Pango, Gdk e GLib, pois `libgtk-3-dev` as requer. Você pode verificar a instalação de pacotes específicos se desejar, mas para o propósito deste tutorial, a instalação do `libgtk-3-dev` é suficiente.

## 3. Verificando a Instalação do Python

O Python 3 geralmente vem pré-instalado no Ubuntu. Você pode verificar a versão instalada com o seguinte comando:

```bash
python3 --version
```

Se o Python 3 não estiver instalado ou se você precisar de uma versão específica, você pode instalá-lo com:

```bash
sudo apt install -y python3 python3-pip
```

## 4. Instalando Bibliotecas Python Essenciais

Embora a maioria das bibliotecas Python que abordaremos (`subprocess`, `os`, `threading`, `json`, `shutil`, `re`, `urllib.request`, `tempfile`, `xml.etree.ElementTree`, `pathlib`, `datetime`) sejam módulos padrão do Python e não exijam instalação via `pip`, é uma boa prática garantir que o `pip` esteja atualizado. Além disso, para interagir com GTK a partir do Python, precisaremos do `python3-gi` (GObject Introspection) e `gir1.2-gtk-3.0`.

```bash
sudo apt install -y python3-gi gir1.2-gtk-3.0
sudo pip3 install --upgrade pip
```

O `python3-gi` permite que você use as bibliotecas GTK diretamente do Python, enquanto `gir1.2-gtk-3.0` fornece os bindings necessários para a versão 3 do GTK.

## 5. Ambiente de Desenvolvimento Integrado (IDE) ou Editor de Texto

Para escrever seu código, você pode usar qualquer editor de texto de sua preferência (como `gedit`, `nano`, `vim`) ou um IDE mais completo, como o Visual Studio Code ou PyCharm. Se você não tiver um editor preferido, o `gedit` é uma opção leve e fácil de usar que geralmente vem pré-instalada:

```bash
sudo apt install -y gedit
```

Com essas configurações, seu ambiente de desenvolvimento estará pronto para começar a criar aplicações leves e eficientes no Linux Ubuntu. No próximo capítulo, começaremos a explorar as bibliotecas GTK em detalhes.


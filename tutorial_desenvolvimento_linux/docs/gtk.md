# GTK: Construindo Interfaces Gráficas Leves no Linux

O GTK (GIMP Toolkit) é uma biblioteca de widgets multiplataforma para a criação de interfaces gráficas de usuário (GUIs). É a base para o ambiente de desktop GNOME e é amplamente utilizado em aplicações Linux devido à sua flexibilidade e desempenho. Nesta seção, vamos explorar os conceitos fundamentais do GTK e como utilizá-lo com Python para criar aplicações leves.

## 1. Fundamentos do GTK

No GTK, tudo é um *widget*. Um widget é um elemento gráfico que pode ser exibido na tela, como botões, rótulos, caixas de texto, janelas, etc. A hierarquia de widgets é fundamental para entender como as interfaces são construídas. Uma janela, por exemplo, é um widget que contém outros widgets.

### O Ciclo de Vida de uma Aplicação GTK

Uma aplicação GTK segue um ciclo de vida básico:

1.  **Inicialização:** O GTK é inicializado.
2.  **Criação de Widgets:** Os widgets são criados e configurados.
3.  **Conexão de Sinais:** Eventos (como cliques de botão) são conectados a funções de callback.
4.  **Exibição:** Os widgets são exibidos na tela.
5.  **Loop Principal:** O GTK entra em um loop principal, aguardando eventos e despachando-os para as funções de callback apropriadas.
6.  **Finalização:** A aplicação é encerrada.

## 2. GTK com Python (PyGObject)

Para usar o GTK com Python, utilizamos o PyGObject, que fornece *bindings* para as bibliotecas baseadas em GObject, incluindo GTK, Gdk e GLib. Isso nos permite escrever aplicações GTK em Python de forma elegante e eficiente.

### Exemplo Básico: Uma Janela Simples

Vamos começar com um exemplo simples de uma janela GTK. Crie um arquivo chamado `janela_simples.py`:

```python
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

class MinhaJanela(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Minha Primeira Janela GTK")
        self.set_border_width(10)
        self.set_default_size(300, 200)

        label = Gtk.Label(label="Olá, Mundo GTK!")
        self.add(label)

def on_activate(app):
    win = MinhaJanela()
    win.set_application(app)
    win.show_all()

if __name__ == '__main__':
    app = Gtk.Application.new("org.example.MinhaJanela", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Para executar este código, salve-o e execute no terminal:

```bash
python3 janela_simples.py
```

Você verá uma janela simples com o texto "Olá, Mundo GTK!".

### Explicação do Código:

*   `gi.require_version('Gtk', '3.0')`: Garante que estamos usando a versão 3.0 do GTK.
*   `from gi.repository import Gtk`: Importa o módulo GTK.
*   `class MinhaJanela(Gtk.Window):`: Define nossa própria classe de janela, que herda de `Gtk.Window`.
*   `Gtk.Window.__init__(self, title="Minha Primeira Janela GTK")`: Inicializa a janela com um título.
*   `self.set_border_width(10)`: Define uma margem interna para a janela.
*   `self.set_default_size(300, 200)`: Define o tamanho padrão da janela.
*   `label = Gtk.Label(label="Olá, Mundo GTK!")`: Cria um widget de rótulo com o texto.
*   `self.add(label)`: Adiciona o rótulo à janela. Uma janela pode conter apenas um widget filho diretamente, mas você pode usar contêineres (como `Gtk.Box` ou `Gtk.Grid`) para organizar múltiplos widgets.
*   `on_activate(app)`: Esta função é chamada quando a aplicação é ativada. É aqui que criamos e exibimos nossa janela.
*   `Gtk.Application.new("org.example.MinhaJanela", Gtk.ApplicationFlags.FLAGS_NONE)`: Cria uma instância da aplicação GTK. O ID da aplicação (`org.example.MinhaJanela`) é importante para que o sistema operacional possa identificar e gerenciar a aplicação (por exemplo, para evitar múltiplas instâncias).
*   `app.connect("activate", on_activate)`: Conecta o sinal "activate" da aplicação à nossa função `on_activate`. O sinal "activate" é emitido quando a aplicação é lançada.
*   `app.run(None)`: Inicia o loop principal do GTK, que aguarda eventos e mantém a aplicação em execução.

## 3. Adicionando Interatividade: Botões e Sinais

Interfaces gráficas são interativas. No GTK, a interatividade é gerenciada através de *sinais* e *slots* (ou *callbacks*). Um sinal é emitido por um widget quando um evento ocorre (por exemplo, um botão é clicado). Uma função de callback (slot) é então executada em resposta a esse sinal.

### Exemplo: Botão com Ação

Vamos modificar o exemplo anterior para incluir um botão que, ao ser clicado, exibe uma mensagem no terminal. Crie um arquivo chamado `botao_interativo.py`:

```python
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

class MinhaJanelaComBotao(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Janela com Botão")
        self.set_border_width(10)
        self.set_default_size(300, 200)

        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        label = Gtk.Label(label="Clique no botão!")
        vbox.pack_start(label, True, True, 0)

        button = Gtk.Button(label="Clique-me")
        button.connect("clicked", self.on_button_clicked, label)
        vbox.pack_start(button, True, True, 0)

    def on_button_clicked(self, widget, label):
        print("Botão clicado!")
        label.set_text("Botão foi clicado!")

def on_activate(app):
    win = MinhaJanelaComBotao()
    win.set_application(app)
    win.show_all()

if __name__ == '__main__':
    app = Gtk.Application.new("org.example.MinhaJanelaComBotao", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Execute este código da mesma forma que o anterior. Ao clicar no botão, você verá a mensagem "Botão clicado!" no terminal e o texto do rótulo será alterado.

### Explicação das Mudanças:

*   `vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)`: Criamos um `Gtk.Box` com orientação vertical para organizar os widgets. O `spacing` adiciona um espaço entre os widgets.
*   `self.add(vbox)`: Adicionamos a caixa (`vbox`) à janela.
*   `vbox.pack_start(label, True, True, 0)`: Adiciona o rótulo ao início da caixa. Os parâmetros `expand`, `fill` e `padding` controlam como o widget se comporta dentro do contêiner.
*   `button = Gtk.Button(label="Clique-me")`: Cria um botão com o texto "Clique-me".
*   `button.connect("clicked", self.on_button_clicked, label)`: Esta é a linha mais importante para a interatividade. Conectamos o sinal "clicked" do botão à nossa função `on_button_clicked`. O `label` é passado como um dado adicional para a função de callback, permitindo que ela modifique o texto do rótulo.
*   `def on_button_clicked(self, widget, label):`: A função de callback. O primeiro argumento (`self`) é a instância da classe, o segundo (`widget`) é o widget que emitiu o sinal (neste caso, o botão), e o terceiro (`label`) é o dado adicional que passamos (`label`).

## 4. Layouts com Contêineres GTK

Para criar interfaces mais complexas, você precisará usar contêineres GTK para organizar seus widgets. Além do `Gtk.Box`, outros contêineres comuns incluem:

*   `Gtk.Grid`: Para organizar widgets em uma grade.
*   `Gtk.Fixed`: Para posicionar widgets em coordenadas absolutas (não recomendado para interfaces responsivas).
*   `Gtk.Paned`: Para criar divisões redimensionáveis.
*   `Gtk.Notebook`: Para criar interfaces com abas.

### Exemplo: Usando Gtk.Grid

Vamos criar um exemplo com `Gtk.Grid` para simular um formulário simples. Crie um arquivo chamado `formulario_grid.py`:

```python
import gi
gi.require_version('Gtk', '3.0')
from gi.repository import Gtk

class FormularioGrid(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Formulário com Gtk.Grid")
        self.set_border_width(10)

        grid = Gtk.Grid()
        grid.set_row_spacing(5)
        grid.set_column_spacing(5)
        self.add(grid)

        label_nome = Gtk.Label(label="Nome:")
        entry_nome = Gtk.Entry()
        label_email = Gtk.Label(label="Email:")
        entry_email = Gtk.Entry()
        button_enviar = Gtk.Button(label="Enviar")

        grid.attach(label_nome, 0, 0, 1, 1) # widget, left, top, width, height
        grid.attach(entry_nome, 1, 0, 1, 1)
        grid.attach(label_email, 0, 1, 1, 1)
        grid.attach(entry_email, 1, 1, 1, 1)
        grid.attach(button_enviar, 0, 2, 2, 1) # Ocupa 2 colunas

        button_enviar.connect("clicked", self.on_enviar_clicked, entry_nome, entry_email)

    def on_enviar_clicked(self, widget, entry_nome, entry_email):
        nome = entry_nome.get_text()
        email = entry_email.get_text()
        print(f"Nome: {nome}, Email: {email}")
        dialog = Gtk.MessageDialog(
            parent=self,
            flags=0,
            message_type=Gtk.MessageType.INFO,
            buttons=Gtk.ButtonsType.OK,
            text=f"Dados enviados:\nNome: {nome}\nEmail: {email}"
        )
        dialog.run()
        dialog.destroy()

def on_activate(app):
    win = FormularioGrid()
    win.set_application(app)
    win.show_all()

if __name__ == '__main__':
    app = Gtk.Application.new("org.example.FormularioGrid", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Execute este código. Você verá um formulário com campos de nome e email, e um botão de envio. Ao preencher e clicar em "Enviar", os dados serão impressos no terminal e uma caixa de diálogo será exibida.

### Explicação do Gtk.Grid:

*   `grid = Gtk.Grid()`: Cria uma nova grade.
*   `grid.set_row_spacing(5)` e `grid.set_column_spacing(5)`: Define o espaçamento entre as linhas e colunas.
*   `grid.attach(widget, left, top, width, height)`: Este método é usado para anexar um widget à grade. Os parâmetros são:
    *   `widget`: O widget a ser anexado.
    *   `left`: A coluna inicial (0-indexada).
    *   `top`: A linha inicial (0-indexada).
    *   `width`: O número de colunas que o widget ocupará.
    *   `height`: O número de linhas que o widget ocupará.
*   `Gtk.MessageDialog`: Um widget de diálogo simples para exibir mensagens ao usuário.

## Conclusão

Esta seção cobriu os fundamentos do GTK com Python, desde a criação de uma janela básica até a adição de interatividade com botões e a organização de layouts com contêineres como `Gtk.Box` e `Gtk.Grid`. O GTK é uma ferramenta poderosa para construir interfaces gráficas nativas e leves no Linux, e dominar esses conceitos é o primeiro passo para criar aplicações mais complexas. No próximo capítulo, exploraremos o Pango e como ele é usado para renderização de texto avançada.


# Pango: Renderização de Texto Avançada no GTK

Pango é uma biblioteca para renderização de texto internacionalizado de alta qualidade. Ela é usada por bibliotecas como o GTK para lidar com a exibição de texto, oferecendo controle preciso sobre fontes, layout, e atributos de texto, como negrito, itálico, e cores. Pango é fundamental para garantir que seu texto seja exibido corretamente em diferentes idiomas e estilos.

## 1. O que é Pango e por que usá-lo?

Enquanto o GTK lida com a criação de widgets e a estrutura da interface, o Pango se concentra especificamente na forma como o texto é desenhado dentro desses widgets. Ele oferece recursos como:

*   **Internacionalização:** Suporte para uma vasta gama de idiomas e sistemas de escrita, incluindo textos da direita para a esquerda (RTL) e scripts complexos.
*   **Atributos de Texto:** Capacidade de aplicar diferentes fontes, tamanhos, pesos (negrito), estilos (itálico), cores e sublinhados a partes específicas do texto.
*   **Layout de Texto:** Controle sobre o alinhamento, quebra de linha, e espaçamento.
*   **Renderização de Glifos:** Converte caracteres em glifos (representações visuais dos caracteres) e os posiciona corretamente.

Para desenvolvedores, Pango significa que você não precisa se preocupar com os detalhes complexos da renderização de texto em diferentes plataformas e idiomas; Pango cuida disso para você.

## 2. Usando Pango com PyGObject

No contexto do GTK com Python (PyGObject), o Pango é frequentemente usado implicitamente pelos widgets GTK. Por exemplo, quando você define o texto de um `Gtk.Label`, o GTK usa o Pango internamente para renderizar esse texto. No entanto, você pode acessar as funcionalidades do Pango diretamente para um controle mais granular.

### Exemplo Básico: Atributos de Texto em um Gtk.Label

Vamos demonstrar como aplicar atributos de texto usando a marcação Pango em um `Gtk.Label`. Crie um arquivo chamado `pango_label.py`:

```python
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Pango

class PangoLabelWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Exemplo Pango com Label")
        self.set_border_width(10)
        self.set_default_size(400, 200)

        # Usando marcação Pango para formatar o texto
        # <b> para negrito, <i> para itálico, <span foreground='cor'> para cor
        markup = (
            "Este é um texto com <span foreground='blue'>partes em azul</span>, "
            "<b>negrito</b> e <i>itálico</i>. "
            "Também podemos mudar o <span font_desc='Sans 16'>tamanho da fonte</span>."
        )

        label = Gtk.Label()
        label.set_markup(markup) # Define o texto usando marcação Pango
        label.set_line_wrap(True) # Quebra de linha automática
        label.set_justify(Gtk.Justification.CENTER) # Alinhamento centralizado

        self.add(label)

def on_activate(app):
    win = PangoLabelWindow()
    win.set_application(app)
    win.show_all()

if __name__ == "__main__":
    app = Gtk.Application.new("org.example.PangoLabel", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Execute este código. Você verá uma janela com um texto formatado, demonstrando negrito, itálico, cores e diferentes tamanhos de fonte, tudo dentro de um único `Gtk.Label`.

### Explicação do Código:

*   `from gi.repository import Gtk, Pango`: Importamos o módulo `Pango` além do `Gtk`.
*   `label.set_markup(markup)`: Em vez de `set_text()`, usamos `set_markup()` para que o GTK interprete as tags Pango no texto. As tags Pango são semelhantes a tags HTML, permitindo aplicar formatação.
    *   `<b>...</b>`: Negrito.
    *   `<i>...</i>`: Itálico.
    *   `<span foreground='cor'>...</span>`: Define a cor do texto. Você pode usar nomes de cores (como 'blue', 'red') ou códigos hexadecimais (como '#FF0000').
    *   `<span font_desc='NomeDaFonte Tamanho'>...</span>`: Define a fonte e o tamanho. Por exemplo, `Sans 16` para fonte Sans com tamanho 16.
*   `label.set_line_wrap(True)`: Habilita a quebra de linha automática para que o texto se ajuste à largura do rótulo.
*   `label.set_justify(Gtk.Justification.CENTER)`: Centraliza o texto dentro do rótulo.

## 3. Pango.Layout: Controle Fino do Layout de Texto

Para um controle mais avançado sobre o layout do texto, especialmente ao desenhar texto diretamente em uma área de desenho (como um `Gtk.DrawingArea`), você pode usar `Pango.Layout`. Um `Pango.Layout` representa um bloco de texto formatado e permite medir seu tamanho, quebrar linhas e renderizá-lo.

### Exemplo: Desenhando Texto com Pango.Layout em Gtk.DrawingArea

Vamos criar um exemplo onde desenhamos texto com Pango em uma `Gtk.DrawingArea`. Crie um arquivo chamado `pango_drawing.py`:

```python
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk, Pango

class PangoDrawingWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Desenho de Texto com Pango")
        self.set_border_width(10)
        self.set_default_size(400, 300)

        drawing_area = Gtk.DrawingArea()
        drawing_area.set_size_request(380, 280)
        drawing_area.connect("draw", self.on_draw)
        self.add(drawing_area)

    def on_draw(self, widget, cr):
        # cr é um objeto Cairo.Context, usado para desenhar

        # Define a cor de fundo
        cr.set_source_rgb(0.9, 0.9, 0.9) # Cinza claro
        cr.paint()

        # Cria um Pango.Layout
        layout = widget.create_pango_layout("")

        # Define o texto e atributos usando marcação Pango
        markup = (
            "<span font_desc='Serif 24' foreground='red'>Olá, Pango!</span>\n"
            "Este é um texto desenhado diretamente com Pango. "
            "Podemos controlar o <span weight='bold'>peso</span>, "
            "<span style='italic'>estilo</span> e "
            "<span underline='single'>sublinhado</span>."
        )
        layout.set_markup(markup, -1)

        # Define a largura para quebra de linha
        layout.set_width(Pango.units_from_double(300)) # Largura em Pango units (1/1024 de pixel)
        layout.set_wrap(Pango.WrapMode.WORD_CHAR) # Quebra de linha por palavra ou caractere
        layout.set_alignment(Pango.Alignment.CENTER) # Alinhamento do texto

        # Obtém o tamanho do layout para centralizar
        width, height = layout.get_size()
        width = Pango.units_to_double(width)
        height = Pango.units_to_double(height)

        # Calcula a posição para centralizar o texto
        x = (widget.get_allocated_width() - width) / 2
        y = (widget.get_allocated_height() - height) / 2

        cr.move_to(x, y)
        Pango.cairo_show_layout(cr, layout)

def on_activate(app):
    win = PangoDrawingWindow()
    win.set_application(app)
    win.show_all()

if __name__ == "__main__":
    app = Gtk.Application.new("org.example.PangoDrawing", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Execute este código. Você verá uma janela com um texto formatado e centralizado, desenhado diretamente em uma área de desenho.

### Explicação das Mudanças:

*   `drawing_area = Gtk.DrawingArea()`: Um widget que fornece uma área para desenho personalizado.
*   `drawing_area.connect("draw", self.on_draw)`: Conecta o sinal "draw" da área de desenho à nossa função `on_draw`. Este sinal é emitido quando a área precisa ser redesenhada.
*   `def on_draw(self, widget, cr)`: A função de callback para o evento de desenho. `cr` é um objeto `Cairo.Context`, que é a API de desenho 2D usada pelo GTK.
*   `layout = widget.create_pango_layout("")`: Cria um `Pango.Layout` associado ao widget.
*   `layout.set_markup(markup, -1)`: Define o texto e os atributos usando marcação Pango. O `-1` indica que a string inteira deve ser usada.
*   `layout.set_width()`: Define a largura máxima para o layout, o que permite que o Pango quebre as linhas automaticamente. As unidades Pango são 1/1024 de um pixel.
*   `layout.set_wrap()` e `layout.set_alignment()`: Controlam como o texto é quebrado e alinhado.
*   `layout.get_size()`: Retorna a largura e altura do layout em unidades Pango.
*   `Pango.units_to_double()`: Converte unidades Pango para pixels de ponto flutuante.
*   `cr.move_to(x, y)`: Move o ponto de desenho do Cairo para a posição `(x, y)`.
*   `Pango.cairo_show_layout(cr, layout)`: Desenha o `Pango.Layout` no contexto Cairo.

## Conclusão

Pango é uma ferramenta poderosa para lidar com a renderização de texto em aplicações GTK. Seja usando a marcação Pango diretamente em widgets como `Gtk.Label` para formatação simples, ou utilizando `Pango.Layout` para um controle mais preciso em áreas de desenho, Pango garante que seu texto seja exibido de forma correta e visualmente atraente, independentemente do idioma ou complexidade. No próximo capítulo, exploraremos o Gdk, a camada de abstração de baixo nível do GTK.


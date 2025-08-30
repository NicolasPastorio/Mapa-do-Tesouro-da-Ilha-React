# Gdk: A Camada de Abstração Gráfica do GTK

Gdk (GIMP Drawing Kit) é a camada de abstração de baixo nível do GTK. Ele atua como uma ponte entre os widgets de alto nível do GTK e o sistema de janelas subjacente (como X11, Wayland, ou Quartz no macOS, e GDI no Windows). Em essência, o Gdk lida com as operações básicas de desenho, eventos de entrada (mouse, teclado) e gerenciamento de janelas, abstraindo as complexidades de cada sistema operacional.

## 1. O Papel do Gdk

Para entender o Gdk, imagine que o GTK é o construtor de uma casa (a interface gráfica), e o Gdk é o engenheiro que garante que a casa seja construída corretamente sobre diferentes tipos de terreno (sistemas de janelas). Ele fornece uma API unificada para operações que são específicas do sistema de janelas, como:

*   **Desenho:** Funções para desenhar primitivas gráficas (linhas, retângulos, círculos), imagens e texto em superfícies de desenho.
*   **Eventos:** Captura e manipulação de eventos de entrada do usuário (cliques do mouse, pressionamentos de tecla, movimentos do mouse).
*   **Gerenciamento de Janelas:** Criação, redimensionamento, movimentação e empilhamento de janelas.
*   **Contextos Gráficos:** Gerenciamento de contextos de desenho para operações gráficas.
*   **Seleção e Área de Transferência:** Operações de copiar e colar.

Embora o GTK geralmente abstraia a necessidade de interagir diretamente com o Gdk, entender seu papel é crucial para operações de desenho personalizadas ou para depurar problemas relacionados a eventos e renderização.

## 2. Gdk com PyGObject

Assim como o GTK e o Pango, o Gdk é acessível via PyGObject em Python. Você pode importar o módulo `Gdk` para acessar suas funcionalidades.

### Exemplo Básico: Capturando Eventos do Mouse

Vamos criar um exemplo que demonstra como o Gdk lida com eventos do mouse em uma `Gtk.DrawingArea`. Crie um arquivo chamado `gdk_mouse_events.py`:

```python
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk

class GdkMouseEventsWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Eventos do Mouse com Gdk")
        self.set_border_width(10)
        self.set_default_size(400, 300)

        self.drawing_area = Gtk.DrawingArea()
        self.drawing_area.set_size_request(380, 280)
        self.drawing_area.set_events(Gdk.EventMask.BUTTON_PRESS_MASK | Gdk.EventMask.POINTER_MOTION_MASK)
        self.drawing_area.connect("draw", self.on_draw)
        self.drawing_area.connect("button-press-event", self.on_button_press)
        self.drawing_area.connect("motion-notify-event", self.on_motion_notify)

        self.add(self.drawing_area)

        self.last_x, self.last_y = -1, -1
        self.click_x, self.click_y = -1, -1

    def on_draw(self, widget, cr):
        cr.set_source_rgb(0.9, 0.9, 0.9) # Cinza claro
        cr.paint()

        if self.click_x != -1 and self.click_y != -1:
            cr.set_source_rgb(0.2, 0.2, 0.8) # Azul
            cr.arc(self.click_x, self.click_y, 5, 0, 2 * 3.14159) # Desenha um círculo no clique
            cr.fill()

        if self.last_x != -1 and self.last_y != -1:
            cr.set_source_rgb(0.8, 0.2, 0.2) # Vermelho
            cr.arc(self.last_x, self.last_y, 3, 0, 2 * 3.14159) # Desenha um círculo no movimento
            cr.fill()

    def on_button_press(self, widget, event):
        if event.button == Gdk.BUTTON_PRIMARY: # Botão esquerdo do mouse
            self.click_x = event.x
            self.click_y = event.y
            print(f"Clique do mouse em: ({event.x}, {event.y})")
            self.drawing_area.queue_draw() # Redesenha a área para mostrar o clique

    def on_motion_notify(self, widget, event):
        if event.is_hint: # Para evitar eventos de movimento excessivos
            x, y, state = event.window.get_device_position(event.device)
        else:
            x, y = event.x, event.y

        self.last_x = x
        self.last_y = y
        # print(f"Movimento do mouse em: ({x}, {y})") # Descomente para ver todos os movimentos
        self.drawing_area.queue_draw() # Redesenha a área para mostrar o movimento

def on_activate(app):
    win = GdkMouseEventsWindow()
    win.set_application(app)
    win.show_all()

if __name__ == "__main__":
    app = Gtk.Application.new("org.example.GdkMouseEvents", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Execute este código. Você verá uma janela com uma área de desenho. Ao clicar com o botão esquerdo, um círculo azul aparecerá no local do clique. Ao mover o mouse, um pequeno círculo vermelho seguirá o cursor.

### Explicação do Código:

*   `self.drawing_area.set_events(Gdk.EventMask.BUTTON_PRESS_MASK | Gdk.EventMask.POINTER_MOTION_MASK)`: Esta linha é crucial. Ela informa ao Gdk quais tipos de eventos a `drawing_area` deve receber. `BUTTON_PRESS_MASK` para cliques do mouse e `POINTER_MOTION_MASK` para movimentos do mouse.
*   `self.drawing_area.connect("button-press-event", self.on_button_press)`: Conecta o sinal `button-press-event` (emitido quando um botão do mouse é pressionado) à nossa função `on_button_press`.
*   `self.drawing_area.connect("motion-notify-event", self.on_motion_notify)`: Conecta o sinal `motion-notify-event` (emitido quando o mouse se move) à nossa função `on_motion_notify`.
*   `event`: O objeto `event` passado para as funções de callback contém informações detalhadas sobre o evento, como as coordenadas `x` e `y` do ponteiro do mouse, e qual botão foi pressionado (`event.button`).
*   `self.drawing_area.queue_draw()`: Este método é chamado para solicitar que a área de desenho seja redesenhada. Isso é importante para que as mudanças visuais (como o desenho dos círculos) sejam refletidas na tela.
*   `cr.arc()` e `cr.fill()`: Funções do Cairo para desenhar um arco (círculo) e preenchê-lo.

## 3. Gdk.RGBA: Cores e Transparência

O Gdk utiliza o formato RGBA (Red, Green, Blue, Alpha) para representar cores, onde Alpha controla a transparência. Os valores para R, G, B e A variam de 0.0 a 1.0.

### Exemplo: Usando Gdk.RGBA para Cores

No exemplo anterior, já usamos `cr.set_source_rgb()`, que é uma forma simplificada. Para incluir transparência, você usaria `cr.set_source_rgba()`. Além disso, você pode criar objetos `Gdk.RGBA` diretamente:

```python
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk

class GdkColorWindow(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Cores com Gdk.RGBA")
        self.set_border_width(10)
        self.set_default_size(400, 300)

        self.drawing_area = Gtk.DrawingArea()
        self.drawing_area.connect("draw", self.on_draw)
        self.add(self.drawing_area)

    def on_draw(self, widget, cr):
        # Cor de fundo com transparência
        bg_color = Gdk.RGBA() # Cria um objeto RGBA
        bg_color.parse("rgba(200, 200, 255, 0.5)") # Define a cor usando string CSS-like
        Gdk.cairo_set_source_rgba(cr, bg_color) # Define a cor no contexto Cairo
        cr.paint()

        # Retângulo vermelho opaco
        cr.set_source_rgb(1.0, 0.0, 0.0) # Vermelho puro
        cr.rectangle(50, 50, 100, 100)
        cr.fill()

        # Retângulo verde semi-transparente
        cr.set_source_rgba(0.0, 1.0, 0.0, 0.5) # Verde com 50% de transparência
        cr.rectangle(100, 100, 100, 100)
        cr.fill()

        # Retângulo azul com transparência total (quase invisível)
        cr.set_source_rgba(0.0, 0.0, 1.0, 0.1) # Azul com 10% de opacidade
        cr.rectangle(150, 150, 100, 100)
        cr.fill()

def on_activate(app):
    win = GdkColorWindow()
    win.set_application(app)
    win.show_all()

if __name__ == "__main__":
    app = Gtk.Application.new("org.example.GdkColor", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.run(None)
```

Este exemplo demonstra como usar `Gdk.RGBA` e `cr.set_source_rgba()` para definir cores com diferentes níveis de transparência. Você verá retângulos sobrepostos, onde a transparência permite ver o que está por baixo.

### Explicação das Cores:

*   `Gdk.RGBA()`: Cria um novo objeto RGBA.
*   `bg_color.parse("rgba(200, 200, 255, 0.5)")`: Permite definir a cor a partir de uma string no formato CSS-like. O último valor (0.5) é o canal alfa (transparência).
*   `Gdk.cairo_set_source_rgba(cr, bg_color)`: Define a cor de desenho no contexto Cairo usando um objeto `Gdk.RGBA`.
*   `cr.set_source_rgba(r, g, b, a)`: Define a cor de desenho diretamente com valores RGBA.

## Conclusão

O Gdk é a espinha dorsal gráfica do GTK, fornecendo a abstração necessária para que as aplicações funcionem em diferentes sistemas de janelas. Embora você não interaja diretamente com ele tão frequentemente quanto com o GTK, entender seus conceitos é fundamental para operações de desenho personalizadas, manipulação de eventos de baixo nível e compreensão de como as interfaces gráficas são renderizadas. No próximo capítulo, mergulharemos na GLib, a biblioteca de utilitários de baixo nível que complementa o GTK e o Gdk.


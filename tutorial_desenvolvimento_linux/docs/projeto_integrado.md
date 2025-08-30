# Projeto Integrado: Um Simples Editor de Texto com GTK e Manipulação de Arquivos

Nesta seção, vamos desenvolver um pequeno editor de texto gráfico para Linux Ubuntu, integrando conceitos de GTK para a interface do usuário e módulos Python como `os`, `pathlib`, `tempfile` e `shutil` para manipulação de arquivos. Este projeto demonstrará como as diferentes tecnologias abordadas neste tutorial podem ser combinadas para criar uma aplicação funcional e leve.

## Funcionalidades do Editor

Nosso editor de texto terá as seguintes funcionalidades básicas:

*   Abrir um arquivo de texto existente.
*   Salvar o conteúdo atual em um arquivo.
*   Salvar o conteúdo em um novo arquivo (Salvar Como).
*   Exibir o caminho do arquivo atual na barra de título.
*   Usar um arquivo temporário para rascunhos não salvos.

## Estrutura do Projeto

Vamos criar um único arquivo Python para a aplicação.

```python
import gi
gi.require_version("Gtk", "3.0")
from gi.repository import Gtk, Gdk, GLib

import os
import pathlib
import tempfile
import shutil

class SimpleTextEditor(Gtk.Window):
    def __init__(self):
        Gtk.Window.__init__(self, title="Editor de Texto Simples")
        self.set_default_size(800, 600)
        self.set_border_width(10)

        self.current_file = None
        self.temp_file = None

        # Layout principal (Vertical Box)
        vbox = Gtk.Box(orientation=Gtk.Orientation.VERTICAL, spacing=6)
        self.add(vbox)

        # Menu Bar
        menubar = Gtk.MenuBar()
        vbox.pack_start(menubar, False, False, 0)

        # Menu Arquivo
        file_menu = Gtk.MenuItem(label="Arquivo")
        menubar.append(file_menu)
        file_submenu = Gtk.Menu()
        file_menu.set_submenu(file_submenu)

        new_item = Gtk.MenuItem(label="Novo")
        new_item.connect("activate", self.on_new_file)
        file_submenu.append(new_item)

        open_item = Gtk.MenuItem(label="Abrir...")
        open_item.connect("activate", self.on_open_file)
        file_submenu.append(open_item)

        save_item = Gtk.MenuItem(label="Salvar")
        save_item.connect("activate", self.on_save_file)
        file_submenu.append(save_item)

        save_as_item = Gtk.MenuItem(label="Salvar Como...")
        save_as_item.connect("activate", self.on_save_as_file)
        file_submenu.append(save_as_item)

        separator = Gtk.SeparatorMenuItem()
        file_submenu.append(separator)

        quit_item = Gtk.MenuItem(label="Sair")
        quit_item.connect("activate", Gtk.main_quit)
        file_submenu.append(quit_item)

        # Text View
        scrolled_window = Gtk.ScrolledWindow()
        scrolled_window.set_hexpand(True)
        scrolled_window.set_vexpand(True)
        vbox.pack_start(scrolled_window, True, True, 0)

        self.textview = Gtk.TextView()
        self.textbuffer = self.textview.get_buffer()
        self.textbuffer.connect("changed", self.on_text_changed)
        scrolled_window.add(self.textview)

        self.status_bar = Gtk.Statusbar()
        vbox.pack_start(self.status_bar, False, False, 0)
        self.context_id = self.status_bar.get_context_id("editor_status")

        self.is_dirty = False # Flag para indicar se o conteúdo foi modificado
        self.create_temp_file() # Cria um arquivo temporário ao iniciar
        self.update_title()

    def create_temp_file(self):
        # Cria um arquivo temporário para rascunhos não salvos
        if self.temp_file and os.path.exists(self.temp_file.name):
            self.temp_file.close()
            os.unlink(self.temp_file.name)

        self.temp_file = tempfile.NamedTemporaryFile(mode=\'w+t\', delete=False, encoding=\'utf-8\')
        self.temp_file.write("") # Garante que o arquivo temporário esteja vazio
        self.temp_file.seek(0)
        print(f"Arquivo temporário criado: {self.temp_file.name}")

    def update_title(self):
        title = "Editor de Texto Simples"
        if self.current_file:
            title = f"{pathlib.Path(self.current_file).name} - {title}"
        else:
            title = f"Novo Documento - {title}"

        if self.is_dirty:
            title += " *"
        self.set_title(title)

    def update_status(self, message):
        self.status_bar.pop(self.context_id)
        self.status_bar.push(self.context_id, message)

    def on_text_changed(self, buffer):
        self.is_dirty = True
        self.update_title()

    def on_new_file(self, widget):
        if self.is_dirty:
            response = self.show_save_dialog()
            if response == Gtk.ResponseType.CANCEL:
                return
            elif response == Gtk.ResponseType.YES:
                if not self.on_save_file(widget): # Tenta salvar, se falhar, não cria novo
                    return

        self.textbuffer.set_text("")
        self.current_file = None
        self.is_dirty = False
        self.create_temp_file()
        self.update_title()
        self.update_status("Novo documento criado.")

    def on_open_file(self, widget):
        dialog = Gtk.FileChooserDialog(
            title="Abrir Arquivo",
            parent=self,
            action=Gtk.FileChooserAction.OPEN,
            buttons=(Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL, Gtk.STOCK_OPEN, Gtk.ResponseType.OK)
        )

        response = dialog.run()
        if response == Gtk.ResponseType.OK:
            file_path = dialog.get_filename()
            try:
                with open(file_path, "r", encoding="utf-8") as f:
                    content = f.read()
                self.textbuffer.set_text(content)
                self.current_file = file_path
                self.is_dirty = False
                self.update_title()
                self.update_status(f"Arquivo aberto: {pathlib.Path(file_path).name}")
            except Exception as e:
                self.show_error_dialog(f"Erro ao abrir arquivo: {e}")
        dialog.destroy()

    def on_save_file(self, widget):
        if not self.current_file:
            return self.on_save_as_file(widget)
        else:
            try:
                start_iter, end_iter = self.textbuffer.get_bounds()
                content = self.textbuffer.get_text(start_iter, end_iter, True)
                with open(self.current_file, "w", encoding="utf-8") as f:
                    f.write(content)
                self.is_dirty = False
                self.update_title()
                self.update_status(f"Arquivo salvo: {pathlib.Path(self.current_file).name}")
                return True
            except Exception as e:
                self.show_error_dialog(f"Erro ao salvar arquivo: {e}")
                return False

    def on_save_as_file(self, widget):
        dialog = Gtk.FileChooserDialog(
            title="Salvar Arquivo Como",
            parent=self,
            action=Gtk.FileChooserAction.SAVE,
            buttons=(Gtk.STOCK_CANCEL, Gtk.ResponseType.CANCEL, Gtk.STOCK_SAVE, Gtk.ResponseType.OK)
        )
        dialog.set_do_overwrite_confirmation(True)

        if self.current_file:
            dialog.set_filename(pathlib.Path(self.current_file).name)

        response = dialog.run()
        if response == Gtk.ResponseType.OK:
            file_path = dialog.get_filename()
            try:
                start_iter, end_iter = self.textbuffer.get_bounds()
                content = self.textbuffer.get_text(start_iter, end_iter, True)
                with open(file_path, "w", encoding="utf-8") as f:
                    f.write(content)
                self.current_file = file_path
                self.is_dirty = False
                self.update_title()
                self.update_status(f"Arquivo salvo como: {pathlib.Path(file_path).name}")
                return True
            except Exception as e:
                self.show_error_dialog(f"Erro ao salvar arquivo: {e}")
                return False
        dialog.destroy()
        return False

    def show_save_dialog(self):
        dialog = Gtk.MessageDialog(
            parent=self,
            flags=Gtk.DialogFlags.MODAL,
            message_type=Gtk.MessageType.QUESTION,
            buttons=Gtk.ButtonsType.YES_NO_CANCEL,
            text="Você tem alterações não salvas."
        )
        dialog.format_secondary_text("Deseja salvar as alterações antes de continuar?")
        response = dialog.run()
        dialog.destroy()
        return response

    def show_error_dialog(self, message):
        dialog = Gtk.MessageDialog(
            parent=self,
            flags=Gtk.DialogFlags.MODAL,
            message_type=Gtk.MessageType.ERROR,
            buttons=Gtk.ButtonsType.OK,
            text="Erro"
        )
        dialog.format_secondary_text(message)
        dialog.run()
        dialog.destroy()

    def do_delete_event(self, widget, event):
        # Sobrescreve o evento de fechar a janela
        if self.is_dirty:
            response = self.show_save_dialog()
            if response == Gtk.ResponseType.CANCEL:
                return True # Não fecha a janela
            elif response == Gtk.ResponseType.YES:
                if not self.on_save_file(widget): # Tenta salvar, se falhar, não fecha
                    return True
        
        # Limpa o arquivo temporário ao fechar a aplicação
        if self.temp_file and os.path.exists(self.temp_file.name):
            self.temp_file.close()
            os.unlink(self.temp_file.name)
            print(f"Arquivo temporário {self.temp_file.name} removido.")

        return False # Fecha a janela

def on_activate(app):
    win = SimpleTextEditor()
    win.set_application(app)
    win.show_all()

if __name__ == "__main__":
    app = Gtk.Application.new("org.example.SimpleTextEditor", Gtk.ApplicationFlags.FLAGS_NONE)
    app.connect("activate", on_activate)
    app.connect("window-added", lambda app, window: window.connect("delete-event", window.do_delete_event))
    app.run(None)
```

## Como Executar

1.  Salve o código acima em um arquivo chamado `editor_texto.py` dentro do diretório `tutorial_dev_linux`.
2.  Abra um terminal no diretório `tutorial_dev_linux`.
3.  Execute o editor com o comando:
    ```bash
    python3 editor_texto.py
    ```

## Explicação do Código e Integração das Bibliotecas

*   **GTK (Gtk.Window, Gtk.Box, Gtk.MenuBar, Gtk.MenuItem, Gtk.TextView, Gtk.ScrolledWindow, Gtk.Statusbar, Gtk.FileChooserDialog, Gtk.MessageDialog):**
    *   A interface do usuário é construída inteiramente com widgets GTK. A janela principal (`Gtk.Window`), o layout (`Gtk.Box`), o menu (`Gtk.MenuBar`, `Gtk.MenuItem`), a área de texto (`Gtk.TextView` dentro de `Gtk.ScrolledWindow`) e a barra de status (`Gtk.Statusbar`) são exemplos de como o GTK é usado para criar a UI.
    *   `Gtk.FileChooserDialog` é usado para as caixas de diálogo de abrir e salvar arquivos, fornecendo uma interface nativa do sistema para seleção de arquivos.
    *   `Gtk.MessageDialog` é utilizado para exibir mensagens de erro ou confirmação ao usuário.
    *   Os sinais (`connect("activate", ...)` e `connect("changed", ...)`) são usados para lidar com a interatividade do usuário, como cliques de menu e alterações no texto.

*   **`os`:**
    *   `os.path.exists(self.temp_file.name)`: Usado para verificar se o arquivo temporário ainda existe antes de tentar fechá-lo e removê-lo.
    *   `os.unlink(self.temp_file.name)`: Usado para remover explicitamente o arquivo temporário quando a aplicação é fechada ou um novo documento é criado.

*   **`pathlib.Path`:**
    *   `pathlib.Path(self.current_file).name`: Usado para extrair apenas o nome do arquivo do caminho completo, tornando a barra de título mais limpa e legível.
    *   A combinação de caminhos é feita de forma mais elegante e segura com `pathlib.Path` (embora não explicitamente demonstrado com `/` neste código, é a prática recomendada para futuras expansões).

*   **`tempfile`:**
    *   `tempfile.NamedTemporaryFile(mode=\'w+t\', delete=False, encoding=\'utf-8\')`: Um arquivo temporário é criado no início da aplicação para servir como um rascunho para o conteúdo não salvo. O `delete=False` é usado inicialmente para que possamos controlar a exclusão manual, mas o arquivo é removido explicitamente no `do_delete_event` e `on_new_file`.

*   **`shutil`:**
    *   Embora não haja uma chamada direta a `shutil` neste projeto, ele seria o módulo ideal para operações como copiar o arquivo temporário para um local permanente se o usuário decidisse salvar o rascunho, ou para mover arquivos. No nosso caso, a lógica de salvar é tratada diretamente com `open()` e `write()`.

*   **`GLib`:**
    *   O `Gtk.Application.new(...)` e `app.run(None)` utilizam o `GMainLoop` da GLib para gerenciar o ciclo de eventos da aplicação, garantindo que a interface do usuário permaneça responsiva e que os eventos sejam processados corretamente.

Este projeto demonstra como as bibliotecas GTK e os módulos Python podem ser combinados para criar aplicações leves e funcionais no ambiente Linux. Ele serve como um ponto de partida para explorar funcionalidades mais avançadas e construir suas próprias ferramentas personalizadas.


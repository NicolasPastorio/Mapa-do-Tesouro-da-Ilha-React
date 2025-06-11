# Guia de Instalação e Configuração do Ambiente Android/Kotlin no Ubuntu

Este guia detalha os passos necessários para configurar seu ambiente de desenvolvimento para criar aplicativos Android nativos usando Kotlin no sistema operacional Ubuntu Linux. Abordaremos a instalação das ferramentas essenciais e as configurações básicas.

## Pré-requisitos

Antes de começar, certifique-se de que seu sistema atende aos seguintes requisitos mínimos e recomendados, conforme a documentação oficial do Android Developers:

**Requisitos Mínimos (para projetos menores e um emulador):**

*   **Sistema Operacional:** Qualquer distribuição Linux de 64 bits com suporte a Gnome, KDE ou Unity DE, e glibc (GNU C Library) 2.31 ou posterior.
*   **RAM:** 8 GB (apenas Android Studio) ou 16 GB (Android Studio + Emulador).
*   **CPU:** Processador x86_64 com suporte à virtualização (Intel VT-x ou AMD-V, habilitado na BIOS). Recomenda-se microarquitetura pós-2017 (Ex: Intel Core i5 8ª Geração, AMD Ryzen Zen 1xxx).
*   **Espaço em Disco:** 8 GB livres (apenas Android Studio) ou 16 GB livres (Android Studio + Emulador).
*   **Resolução da Tela:** 1280 x 800.

**Requisitos Recomendados (para desenvolvimento profissional e múltiplos emuladores):**

*   **Sistema Operacional:** Versão mais recente do Linux de 64 bits.
*   **RAM:** 32 GB ou mais.
*   **CPU:** Processador x86_64 mais recente com suporte à virtualização (Ex: Intel Core i5/i7/i9 séries H/HK/HX para laptops ou S/F/K para desktops; AMD Ryzen 5/6/7/9).
*   **Espaço em Disco:** Unidade de estado sólido (SSD) com 32 GB ou mais de espaço livre.
*   **Resolução da Tela:** 1920 x 1080.
*   **GPU (para Emulador):** GPU com 8 GB de VRAM (Ex: Nvidia GeForce 20 ou superior, AMD Radeon RX6600 ou superior) com drivers atualizados.

**Bibliotecas Necessárias (para máquinas 64-bit):**

Para executar componentes 32-bit, algumas distribuições Linux 64-bit podem precisar da instalação de bibliotecas específicas. Para Ubuntu (18.04 ou superior), execute o seguinte comando no terminal:

```bash
sudo apt-get install libc6:i386 libncurses5:i386 libstdc++6:i386 lib32z1 libbz2-1.0:i386
```

## Passo 1: Instalação do Java Development Kit (JDK)

O Android Studio geralmente inclui uma versão embarcada do OpenJDK, mas é uma boa prática ter o JDK instalado no sistema. O OpenJDK é recomendado.

1.  **Atualize a lista de pacotes:**
    ```bash
    sudo apt update
    ```
2.  **Instale o OpenJDK (versão 17 ou superior é recomendada para desenvolvimento Android moderno):**
    ```bash
    sudo apt install openjdk-17-jdk
    ```
3.  **Verifique a instalação:**
    ```bash
    java -version
    javac -version
    ```
    Você deverá ver as informações da versão do Java instalada.

## Passo 2: Instalação do Android Studio

O Android Studio é o Ambiente de Desenvolvimento Integrado (IDE) oficial para desenvolvimento Android. Ele inclui o Android SDK, ferramentas de build e emulador.

1.  **Faça o download:** Acesse a [página oficial de download do Android Studio](https://developer.android.com/studio?hl=pt-br) e baixe o pacote `.zip` para Linux.
2.  **Extraia o arquivo:** Navegue até o diretório onde o arquivo foi baixado (geralmente `~/Downloads`) e extraia o conteúdo. Você pode fazer isso pelo gerenciador de arquivos ou pelo terminal:
    ```bash
    # Substitua 'android-studio-xxxx.zip' pelo nome do arquivo baixado
    unzip ~/Downloads/android-studio-*.zip -d ~/Android
    ```
    Isso criará um diretório `android-studio` dentro de um diretório `Android` na sua pasta pessoal (crie o diretório `~/Android` se ele não existir).
3.  **Execute o script de instalação:** Navegue até o diretório `bin` dentro da pasta extraída e execute o script `studio.sh`:
    ```bash
    cd ~/Android/android-studio/bin
    ./studio.sh
    ```
4.  **Siga o Assistente de Configuração:** O Android Studio será iniciado. Siga as instruções do assistente:
    *   **Importar Configurações:** Se for a primeira instalação, escolha "Do not import settings".
    *   **Instalação:** Escolha o tipo de instalação "Standard" (Padrão), que instalará os componentes mais comuns.
    *   **Tema da Interface:** Selecione o tema de sua preferência (Darcula é o escuro).
    *   **Verificar Configurações:** Revise os componentes que serão instalados (Android SDK, SDK Platform, Emulador, etc.).
    *   **Aceitar Licenças:** Leia e aceite os termos de licença para os componentes do SDK.
    *   **Download de Componentes:** O assistente fará o download e instalará os componentes necessários. Isso pode levar algum tempo dependendo da sua conexão com a internet.
5.  **Conclusão:** Após a conclusão, você verá a tela de boas-vindas do Android Studio.

## Passo 3: Configuração Inicial (Opcional - Variáveis de Ambiente)

O Android Studio geralmente gerencia o caminho do SDK automaticamente. No entanto, se você precisar usar as ferramentas do SDK (como `adb`) diretamente no terminal ou configurar o VS Code sem o Android Studio, pode ser útil configurar as variáveis de ambiente.

1.  **Edite o arquivo `.bashrc` ou `.zshrc` (dependendo do seu shell):**
    ```bash
    nano ~/.bashrc  # Ou ~/.zshrc se você usa Zsh
    ```
2.  **Adicione as seguintes linhas ao final do arquivo:**
    ```bash
    # Android SDK
    export ANDROID_HOME=$HOME/Android/Sdk
    export PATH=$PATH:$ANDROID_HOME/emulator
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin # Se você instalou as ferramentas de linha de comando
    export PATH=$PATH:$ANDROID_HOME/tools # Pode ser necessário para ferramentas legadas
    export PATH=$PATH:$ANDROID_HOME/tools/bin # Pode ser necessário para ferramentas legadas
    ```
    *   **Importante:** Verifique se o caminho `$HOME/Android/Sdk` corresponde ao local onde o Android Studio instalou o SDK. Você pode confirmar isso nas configurações do Android Studio (File > Settings > Appearance & Behavior > System Settings > Android SDK > Android SDK Location).
    *   Se você instalou as `cmdline-tools` separadamente ou através do SDK Manager, ajuste o caminho `cmdline-tools/latest/bin` conforme necessário.
3.  **Salve o arquivo** (Ctrl+O em `nano`, depois Enter) e **feche** (Ctrl+X).
4.  **Aplique as alterações no terminal atual:**
    ```bash
    source ~/.bashrc # Ou source ~/.zshrc
    ```
5.  **Verifique a configuração (opcional):**
    ```bash
    echo $ANDROID_HOME
    adb version
    ```
    Você deverá ver o caminho do SDK e a versão do ADB (Android Debug Bridge).
    
Com esses passos, seu ambiente base no Ubuntu está configurado com o JDK e o Android Studio (incluindo o SDK). O próximo passo será focar na configuração específica para Kotlin e o uso do VS Code.

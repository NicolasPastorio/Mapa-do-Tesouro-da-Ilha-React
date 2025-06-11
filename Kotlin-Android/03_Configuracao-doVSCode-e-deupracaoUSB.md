# Configurando o VS Code e Depuração USB para Android/Kotlin no Ubuntu

Embora o Android Studio seja o IDE principal e mais completo para desenvolvimento Android, oferecendo integração profunda com todas as ferramentas do SDK, o Visual Studio Code (VS Code) pode ser uma alternativa leve e poderosa, especialmente se você já o utiliza para outros tipos de desenvolvimento ou prefere sua interface e extensibilidade. Esta seção abordará como configurar o VS Code para trabalhar com Kotlin e Android no Ubuntu, e como preparar seu dispositivo físico para depuração via USB.

## Configurando o VS Code para Kotlin e Android

Para usar o VS Code efetivamente para desenvolvimento Android com Kotlin, você precisará instalar algumas extensões e garantir que ele possa interagir com o JDK e o Android SDK que você configurou anteriormente.

*1. Instalação do VS Code:*

Se ainda não o fez, instale o VS Code no Ubuntu. A maneira mais fácil geralmente é via Snap ou baixando o pacote .deb do [site oficial](https://code.visualstudio.com/).

bash
# Via Snap (recomendado)
sudo snap install --classic code


*2. Instalação de Extensões Essenciais:*

Abra o VS Code e vá para a aba de Extensões (ícone de blocos no menu lateral ou Ctrl+Shift+X). Pesquise e instale as seguintes extensões:

*   *Kotlin Language:* Fornecida pela mathiasfrohlich ou a oficial da JetBrains (se disponível e estável para suas necessidades). Esta extensão oferece suporte à sintaxe, autocompletar e outras funcionalidades da linguagem Kotlin.
*   *Extension Pack for Java:* Da Microsoft. Essencial para trabalhar com projetos baseados em Java/JVM, incluindo o suporte ao Gradle, que é o sistema de build padrão para Android. Este pacote inclui várias extensões úteis para desenvolvimento Java/Kotlin.
*   *Gradle for Java:* Também geralmente incluído no pacote acima, mas verifique. Permite visualizar e executar tarefas Gradle diretamente do VS Code.
*   *(Opcional) Android Extension Pack ou similares:* Podem existir extensões da comunidade que tentam trazer mais funcionalidades do Android Studio para o VS Code, como snippets ou comandos ADB. Explore o marketplace, mas esteja ciente de que a experiência pode não ser tão integrada quanto no Android Studio.

*3. Integração com JDK e Android SDK:*

A extensão Java geralmente detecta automaticamente a instalação do JDK. Se você configurou as variáveis de ambiente ANDROID_HOME e adicionou as ferramentas do SDK ao PATH (como explicado na seção de configuração do ambiente), o VS Code e suas extensões (especialmente o terminal integrado e as tarefas Gradle) devem conseguir encontrar e utilizar ferramentas como adb e o próprio SDK.

*4. Trabalhando com Projetos Gradle:*

A maioria dos projetos Android usa Gradle. Ao abrir uma pasta de projeto Android no VS Code:

*   As extensões Java/Gradle devem detectar o arquivo build.gradle ou build.gradle.kts.
*   Você poderá ver uma visualização das tarefas Gradle disponíveis na barra lateral (geralmente em uma seção 

Gradle Tasks").
*   Você pode executar tarefas comuns como build, assembleDebug, installDebug, connectedCheck diretamente da interface do VS Code.
*   O terminal integrado do VS Code (Ctrl+) pode ser usado para executar comandos Gradle (./gradlew tasks`, ./gradlew assembleDebug, etc.) ou comandos adb.

*Limitações do VS Code vs. Android Studio:*

É importante notar que o VS Code, mesmo com extensões, não replicará todas as funcionalidades específicas do Android Studio. Ferramentas visuais como o Layout Editor, Navigation Editor, profilers avançados e a integração profunda com o emulador são pontos fortes do Android Studio. Para tarefas complexas de UI ou depuração avançada, o Android Studio ainda é a ferramenta mais indicada. No entanto, para codificação, refatoração, execução de builds e testes, o VS Code pode ser muito eficiente.

## Configurando a Depuração USB no Dispositivo Android

Executar e depurar seu aplicativo diretamente em um dispositivo físico Android é essencial para testar o comportamento real, desempenho e interações com hardware específico (câmera, sensores, etc.). A conexão é feita via USB.

*1. Habilitar Opções do Desenvolvedor no Dispositivo:*

*   Vá para *Configurações* no seu dispositivo Android.
*   Role até o final e toque em *Sobre o telefone* (ou *Sobre o dispositivo*).
*   Encontre o *Número da versão* (ou *Build number*).
*   Toque repetidamente (cerca de 7 vezes) no *Número da versão* até ver uma mensagem informando "Você agora é um desenvolvedor!". Pode ser necessário inserir seu PIN ou senha.

*2. Habilitar Depuração USB:*

*   Volte para a tela principal de *Configurações*.
*   Procure por *Sistema* > *Opções do desenvolvedor* (ou pode estar diretamente no menu principal de Configurações após habilitado).
*   Dentro das *Opções do desenvolvedor, encontre e ative a opção **Depuração USB*.
*   Confirme a ativação na caixa de diálogo que aparecer.

*3. Conectar o Dispositivo ao Computador Ubuntu:*

*   Use um cabo USB para conectar seu dispositivo Android ao computador Ubuntu.
*   Na primeira vez que conectar com a depuração USB habilitada, uma caixa de diálogo aparecerá no seu dispositivo perguntando *"Permitir depuração USB?"* e mostrando a chave RSA do computador.
*   Marque a opção *"Sempre permitir deste computador"* (recomendado para seu computador de desenvolvimento) e toque em *OK* ou *Permitir*.

*4. Verificar a Conexão (Usando ADB):*

O Android Debug Bridge (ADB) é a ferramenta de linha de comando usada para comunicar-se com o dispositivo. Se você configurou as variáveis de ambiente corretamente, pode usá-lo no terminal.

*   Abra um terminal no Ubuntu (ou o terminal integrado do VS Code).
*   Execute o comando:
    bash
    adb devices
    
*   Você deverá ver uma lista dos dispositivos conectados. Seu dispositivo físico deve aparecer com seu número de série e o status device ao lado. Se aparecer como unauthorized, significa que você não autorizou a depuração USB no dispositivo (passo 3). Se não aparecer nada, verifique o cabo, a porta USB e se a depuração está realmente habilitada.

*5. (Opcional - Regras Udev no Linux):*

Na maioria das distribuições Ubuntu modernas, os dispositivos Android são reconhecidos automaticamente para depuração ADB sem configuração extra. No entanto, se o adb devices não listar seu dispositivo mesmo com tudo habilitado, você pode precisar configurar regras udev. Isso envolve criar um arquivo em /etc/udev/rules.d/ especificando o Vendor ID e Product ID do seu dispositivo. Instruções detalhadas podem ser encontradas na [documentação oficial do Android](https://developer.android.com/studio/run/device?hl=pt-br#setting-up-udev-rules) ou pesquisando por "android udev rules ubuntu [marca do seu celular]".

## Executando e Depurando no Dispositivo via VS Code/Terminal

Com o dispositivo conectado e autorizado:

*   *Via Tarefas Gradle (VS Code):* Você pode usar a visualização Gradle Tasks no VS Code para executar tarefas como installDebug (compila e instala a versão de depuração no dispositivo conectado) ou connectedDebugAndroidTest (executa testes instrumentados no dispositivo).
*   *Via Terminal (VS Code ou Externo):*
    *   Compile o APK de depuração: ./gradlew assembleDebug
    *   Instale o APK no dispositivo: adb install app/build/outputs/apk/debug/app-debug.apk (ajuste o caminho se necessário).
    *   Para iniciar a depuração, você geralmente precisará do Android Studio, pois ele gerencia o anexo do depurador ao processo do aplicativo no dispositivo. O VS Code, através das extensões Java, pode permitir depuração de código Kotlin/Java puro ou testes unitários, mas a depuração completa de um aplicativo Android em execução no dispositivo é mais direta no Android Studio.

Em resumo, enquanto o VS Code pode ser configurado para codificar, construir e instalar aplicativos Android usando Kotlin e Gradle, a experiência de depuração visual e integrada, especialmente com emuladores ou dispositivos físicos, permanece um ponto forte do Android Studio. A depuração USB, no entanto, é uma configuração no nível do sistema e do dispositivo, e uma vez que o adb reconhece seu dispositivo, ele estará pronto para ser usado por qualquer ferramenta que interaja com o ADB, incluindo o Android Studio ou comandos de terminal.

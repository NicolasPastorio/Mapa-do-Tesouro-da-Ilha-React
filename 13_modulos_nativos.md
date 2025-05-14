## Seção 7: Módulos Nativos e Integração com Código Nativo

Embora o React Native forneça uma vasta gama de componentes e APIs para construir aplicativos ricos, haverá momentos em que você precisará acessar funcionalidades da plataforma nativa que não são expostas pelo React Native por padrão, ou quando você precisa integrar código nativo existente (Java/Kotlin para Android, Objective-C/Swift para iOS) em seu aplicativo React Native. Isso pode incluir o uso de SDKs nativos específicos, otimizações de performance que só podem ser alcançadas com código nativo, ou a criação de componentes de UI altamente customizados que aproveitam as capacidades da plataforma.

React Native foi projetado com essa extensibilidade em mente, permitindo que você escreva código nativo e o exponha ao seu JavaScript. Esta seção cobrirá como criar módulos nativos (para expor funcionalidades) e componentes de UI nativos (para renderizar views nativas controladas pelo React).

### Visão Geral da Arquitetura Nativa

Antes de mergulhar na criação de módulos, é útil entender como o React Native se comunica entre o JavaScript e o código nativo.

*   **A Bridge (Ponte):** Tradicionalmente, a comunicação entre o JavaScript e o lado nativo ocorria através da "Bridge". Esta é uma camada de comunicação assíncrona que serializa dados (geralmente como JSON) para passá-los entre os dois reinos. Embora eficaz, a Bridge tem algumas limitações de performance devido à serialização e à natureza assíncrona de todas as chamadas.
*   **JSI (JavaScript Interface):** A Nova Arquitetura do React Native introduz a JSI, que permite a comunicação síncrona direta entre JavaScript e C++ (que por sua vez pode interagir com Java/Kotlin ou Objective-C/Swift). Isso elimina a sobrecarga de serialização da Bridge e permite interações mais performáticas. Módulos escritos com JSI são chamados de Turbo Modules.
*   **Fabric:** É o novo sistema de renderização do React Native, também parte da Nova Arquitetura. Ele permite que componentes de UI nativos sejam renderizados de forma mais eficiente e se integrem mais diretamente com o React.

Atualmente, muitos módulos ainda usam a Bridge, mas a migração para a Nova Arquitetura (Turbo Modules e Fabric) está em andamento e é o futuro do desenvolvimento de módulos nativos em React Native.

### Criando Módulos Nativos (Native Modules)

Módulos nativos são classes (Java/Kotlin no Android, Objective-C/Swift no iOS) que podem ser chamadas a partir do JavaScript. Eles são úteis para expor APIs nativas, executar tarefas computacionalmente intensivas no lado nativo, ou acessar funcionalidades do dispositivo.

**1. Módulos Nativos para Android (Java/Kotlin):**

   **a. Criar a Classe do Módulo (Java):**
      Crie um novo arquivo Java (ex: `MeuModuloNativo.java`) no diretório `android/app/src/main/java/com/nomedoseuapp/`. (O nome do pacote `com.nomedoseuapp` deve corresponder ao do seu projeto).

      ```java
      // android/app/src/main/java/com/nomedoseuapp/MeuModuloNativo.java
      package com.nomedoseuapp; // Pacote do seu app

      import com.facebook.react.bridge.NativeModule;
      import com.facebook.react.bridge.ReactApplicationContext;
      import com.facebook.react.bridge.ReactContext;
      import com.facebook.react.bridge.ReactContextBaseJavaModule;
      import com.facebook.react.bridge.ReactMethod;
      import com.facebook.react.bridge.Promise; // Para métodos assíncronos com promessas
      import android.util.Log;
      import android.widget.Toast;
      import java.util.Map;
      import java.util.HashMap;

      public class MeuModuloNativo extends ReactContextBaseJavaModule {
          private static ReactApplicationContext reactContext;

          MeuModuloNativo(ReactApplicationContext context) {
              super(context);
              reactContext = context;
          }

          @Override
          public String getName() {
              return "MeuModuloNativo"; // Nome pelo qual o módulo será acessado no JS
          }

          // Método síncrono simples (exemplo, geralmente evitado se demorado)
          @ReactMethod(isBlockingSynchronousMethod = true) // Use com MUITA cautela
          public String getConstanteNativaSincrona() {
              return "ValorDiretoDaNativaSincrono";
          }

          // Método para expor constantes ao JavaScript
          @Override
          public Map<String, Object> getConstants() {
              final Map<String, Object> constants = new HashMap<>();
              constants.put("MINHA_CONSTANTE_NATIVA", "Olá do Nativo Android!");
              constants.put("VERSAO_MODULO", 1.0);
              return constants;
          }

          // Método simples que pode ser chamado do JS
          @ReactMethod
          public void mostrarToast(String mensagem) {
              Toast.makeText(getReactApplicationContext(), mensagem, Toast.LENGTH_LONG).show();
          }

          // Método que retorna um valor via Callback
          @ReactMethod
          public void getNomeDispositivoCallback(com.facebook.react.bridge.Callback callback) {
              try {
                  String deviceName = android.os.Build.MODEL;
                  callback.invoke(null, deviceName); // Primeiro argumento é erro, segundo é sucesso
              } catch (Exception e) {
                  callback.invoke(e.getMessage(), null);
              }
          }

          // Método que retorna um valor via Promise
          @ReactMethod
          public void getNomeDispositivoPromise(Promise promise) {
              try {
                  String deviceName = android.os.Build.MANUFACTURER + " " + android.os.Build.MODEL;
                  promise.resolve(deviceName);
              } catch (Exception e) {
                  promise.reject("ERRO_AO_PEGAR_NOME", e.getMessage(), e);
              }
          }

          // Exemplo de como emitir eventos para o JavaScript (veremos mais tarde)
          // private void sendEvent(String eventName, WritableMap params) {
          //   reactContext
          //       .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
          //       .emit(eventName, params);
          // }
      }
      ```

   **b. Criar a Classe do Módulo (Kotlin):**
      Similar ao Java, mas com sintaxe Kotlin.
      ```kotlin
      // android/app/src/main/java/com/nomedoseuapp/MeuModuloNativoKotlin.kt
      package com.nomedoseuapp

      import com.facebook.react.bridge.ReactApplicationContext
      import com.facebook.react.bridge.ReactContextBaseJavaModule
      import com.facebook.react.bridge.ReactMethod
      import com.facebook.react.bridge.Promise
      import com.facebook.react.bridge.Callback
      import android.widget.Toast
      import android.os.Build

      class MeuModuloNativoKotlin(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

          override fun getName(): String {
              return "MeuModuloNativoKotlin" // Nome para JS
          }

          // Constantes
          override fun getConstants(): Map<String, Any>? {
              val constants = HashMap<String, Any>()
              constants["MINHA_CONSTANTE_KOTLIN"] = "Olá do Kotlin Nativo!"
              return constants
          }

          @ReactMethod
          fun mostrarToastKotlin(message: String) {
              Toast.makeText(reactApplicationContext, message, Toast.LENGTH_LONG).show()
          }

          @ReactMethod
          fun getNomeDispositivoPromiseKotlin(promise: Promise) {
              try {
                  val deviceName = "${Build.MANUFACTURER} ${Build.MODEL}"
                  promise.resolve(deviceName)
              } catch (e: Exception) {
                  promise.reject("ERRO_KOTLIN", e.message, e)
              }
          }
      }
      ```

   **c. Registrar o Módulo (Criar um Pacote):**
      Módulos nativos precisam ser registrados em um "Pacote" (Package). Crie uma nova classe Java (ex: `MeuPacoteNativo.java`).

      ```java
      // android/app/src/main/java/com/nomedoseuapp/MeuPacoteNativo.java
      package com.nomedoseuapp;

      import com.facebook.react.ReactPackage;
      import com.facebook.react.bridge.NativeModule;
      import com.facebook.react.bridge.ReactApplicationContext;
      import com.facebook.react.uimanager.ViewManager;

      import java.util.ArrayList;
      import java.util.Collections;
      import java.util.List;

      public class MeuPacoteNativo implements ReactPackage {

          @Override
          public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
              return Collections.emptyList(); // Vazio se não tiver ViewManagers (componentes de UI nativos)
          }

          @Override
          public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
              List<NativeModule> modules = new ArrayList<>();
              modules.add(new MeuModuloNativo(reactContext));
              modules.add(new MeuModuloNativoKotlin(reactContext)); // Adicione o módulo Kotlin aqui também
              return modules;
          }
      }
      ```

   **d. Adicionar o Pacote à Aplicação:**
      Abra `android/app/src/main/java/com/nomedoseuapp/MainApplication.java` (ou `.kt` se seu projeto for Kotlin) e adicione seu pacote à lista retornada pelo método `getPackages()`.

      ```java
      // MainApplication.java
      // ... outros imports
      import com.nomedoseuapp.MeuPacoteNativo; // Importe seu pacote

      public class MainApplication extends Application implements ReactApplication {
          // ... (código existente)

          @Override
          protected List<ReactPackage> getPackages() {
            @SuppressWarnings("UnnecessaryLocalVariable")
            List<ReactPackage> packages = new PackageList(this).getPackages();
            // Pacotes que não são auto-linkados podem ser adicionados manualmente aqui:
            packages.add(new MeuPacoteNativo()); // Adicione seu pacote aqui
            return packages;
          }

          // ... (resto do código)
      }
      ```
      Se o seu `MainApplication` for em Kotlin:
      ```kotlin
      // MainApplication.kt
      // ... outros imports
      import com.nomedoseuapp.MeuPacoteNativo // Importe seu pacote

      class MainApplication : Application(), ReactApplication {
          // ... (código existente)
          override fun getPackages(): List<ReactPackage> {
              val packages: MutableList<ReactPackage> = PackageList(this).packages
              // Pacotes que não são auto-linkados podem ser adicionados manualmente aqui:
              packages.add(MeuPacoteNativo()) // Adicione seu pacote aqui
              return packages
          }
          // ... (resto do código)
      }
      ```

**2. Módulos Nativos para iOS (Objective-C/Swift):**

   **a. Criar Arquivos do Módulo (Objective-C):**
      No Xcode, clique com o botão direito na pasta do seu projeto (geralmente com o nome do seu app) e escolha "New File...".
      *   Selecione "Cocoa Touch Class" (para Objective-C) ou "Swift File" (para Swift).
      *   Nome da Classe: `MeuModuloNativo` (ou similar).
      *   Subclasse de (para Objective-C): `NSObject`.
      *   Linguagem: Objective-C.

      Você terá dois arquivos: `MeuModuloNativo.h` (header) e `MeuModuloNativo.m` (implementation).

      `MeuModuloNativo.h`:
      ```objectivec
      // MeuModuloNativo.h
      #import <React/RCTBridgeModule.h> // Importa o header da Bridge
      #import <React/RCTEventEmitter.h> // Para emitir eventos

      @interface MeuModuloNativo : RCTEventEmitter <RCTBridgeModule>
      // Se não for emitir eventos, pode ser apenas : NSObject <RCTBridgeModule>
      @end
      ```

      `MeuModuloNativo.m`:
      ```objectivec
      // MeuModuloNativo.m
      #import "MeuModuloNativo.h"
      #import <UIKit/UIKit.h> // Para acessar APIs do UIKit como UIDevice

      @implementation MeuModuloNativo

      // Exporta o módulo para o React Native. O nome no JS será "MeuModuloNativo"
      // Se quiser um nome diferente no JS: RCT_EXPORT_MODULE(NomeNoJavaScript);
      RCT_EXPORT_MODULE();

      // Método para expor constantes ao JavaScript
      - (NSDictionary *)constantsToExport
      {
        return @{ 
          @"MINHA_CONSTANTE_IOS": @"Olá do Nativo iOS!",
          @"VERSAO_MODULO_IOS": @(1.1)
        };
      }

      // Exporta um método para o JavaScript
      // O nome do método no JS será `mostrarAlerta:(NSString *)mensagem`
      // Para um nome mais simples no JS: RCT_REMAP_METHOD(mostrarAlertaSimples, mostrarAlerta:(NSString *)mensagem)
      RCT_EXPORT_METHOD(mostrarAlerta:(NSString *)mensagem)
      {
        dispatch_async(dispatch_get_main_queue(), ^{
          UIAlertController *alert = [UIAlertController alertControllerWithTitle:@"Alerta Nativo"
                                                                       message:mensagem
                                                                preferredStyle:UIAlertControllerStyleAlert];
          UIAlertAction *okAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault handler:nil];
          [alert addAction:okAction];
          
          // Encontrar o ViewController raiz para apresentar o alerta
          UIViewController *rootViewController = [UIApplication sharedApplication].delegate.window.rootViewController;
          [rootViewController presentViewController:alert animated:YES completion:nil];
        });
      }

      // Método que retorna um valor via Callback
      // Nome no JS: `getNomeDispositivoCallback:(RCTResponseSenderBlock)callback`
      RCT_EXPORT_METHOD(getNomeDispositivoCallback:(RCTResponseSenderBlock)callback)
      {
        NSString *deviceName = [[UIDevice currentDevice] name];
        if (deviceName) {
          callback(@[[NSNull null], deviceName]); // Primeiro argumento é erro (NSNull se não houver), segundo é sucesso
        } else {
          callback(@[@"Erro ao obter nome do dispositivo", [NSNull null]]);
        }
      }

      // Método que retorna um valor via Promise
      // Nome no JS: `getNomeDispositivoPromise` (o React Native infere que é uma Promise)
      RCT_REMAP_METHOD(getNomeDispositivoPromise,
                     resolver:(RCTPromiseResolveBlock)resolve
                     rejeitar:(RCTPromiseRejectBlock)reject)
      {
        NSString *deviceName = [NSString stringWithFormat:@"%@ %@", [[UIDevice currentDevice] systemName], [[UIDevice currentDevice] systemVersion]];
        if (deviceName) {
          resolve(deviceName);
        } else {
          NSError *error = [NSError errorWithDomain:@"com.meuapp.erro" code:100 userInfo:nil];
          reject(@"ERRO_IOS", @"Não foi possível obter o nome do dispositivo", error);
        }
      }

      // Para emitir eventos (se herdar de RCTEventEmitter)
      - (NSArray<NSString *> *)supportedEvents
      {
        return @[@"MeuEventoNativo"]; // Lista de nomes de eventos que este módulo pode emitir
      }

      // Exemplo de como emitir um evento
      // - (void)enviarMeuEvento {
      //   [self sendEventWithName:@"MeuEventoNativo" body:@{@"dados": @"informacao do evento"}];
      // }

      // Garante que o módulo seja inicializado na thread principal se precisar de acesso à UI
      + (BOOL)requiresMainQueueSetup
      {
        return YES; // Ou NO se não houver interação com UI na inicialização
      }

      @end
      ```

   **b. Criar Arquivos do Módulo (Swift):**
      No Xcode, crie um novo arquivo Swift (ex: `MeuModuloNativoSwift.swift`).
      O Xcode perguntará se você quer criar um "Objective-C Bridging Header". Clique em "Create Bridging Header". Isso cria um arquivo `<SeuProjeto>-Bridging-Header.h`.

      No arquivo de Bridging Header (`<SeuProjeto>-Bridging-Header.h`), adicione os imports da Bridge do React Native:
      ```objectivec
      // <SeuProjeto>-Bridging-Header.h
      #import <React/RCTBridgeModule.h>
      #import <React/RCTEventEmitter.h>
      #import <
(Content truncated due to size limit. Use line ranges to read in chunks)
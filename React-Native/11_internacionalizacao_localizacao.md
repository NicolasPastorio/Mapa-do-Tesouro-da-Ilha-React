## Seção 5: Internacionalização (i18n) e Localização (l10n)

A Internacionalização (i18n - onde "18" representa o número de letras entre "i" e "n" em "internationalization") é o processo de projetar e desenvolver um aplicativo de forma que ele possa ser adaptado para vários idiomas e regiões sem alterações de engenharia. A Localização (l10n - "10" letras entre "l" e "n" em "localization") é o processo de adaptar um aplicativo internacionalizado para uma região ou idioma específico, traduzindo texto e adicionando componentes específicos da localidade (como formatos de data, moeda, números).

Para aplicativos React Native com alcance global, i18n e l10n são cruciais para fornecer uma experiência de usuário nativa e acessível a um público diversificado.

### Conceitos Fundamentais

*   **Locale:** Um identificador para um conjunto específico de preferências de idioma e região do usuário (ex: `en-US` para inglês americano, `pt-BR` para português brasileiro, `fr-CA` para francês canadense).
*   **Traduções (Strings):** O texto da UI do seu aplicativo precisa ser extraído do código e armazenado em arquivos de tradução (geralmente JSON, mas outros formatos como XLIFF também podem ser usados), um para cada idioma suportado.
*   **Pluralização:** Lidar com diferentes formas de palavras com base na quantidade (ex: "1 item" vs. "2 itens"). As regras de pluralização variam significativamente entre os idiomas.
*   **Formatação:** Datas, horas, números e moedas devem ser formatados de acordo com as convenções da localidade do usuário.
*   **Layout e Direção do Texto (RTL/LTR):** Alguns idiomas, como árabe e hebraico, são escritos da direita para a esquerda (RTL - Right-to-Left). A UI do seu aplicativo deve se adaptar para suportar layouts RTL, incluindo a inversão de elementos da interface, ícones e gestos.
*   **Detecção de Locale:** O aplicativo precisa detectar o locale preferido do usuário (geralmente a partir das configurações do dispositivo) e carregar as traduções e formatos apropriados.

### Bibliotecas Populares para i18n em React Native

Existem várias bibliotecas para ajudar com i18n em React Native. Duas das mais populares são `i18next` (com `react-i18next`) e `react-intl` (embora `react-intl` seja mais comum em React web, `i18next` tem uma excelente integração com React Native).

**1. `i18next` com `react-i18next` e `react-native-localize`:**

   Esta é uma combinação poderosa e flexível:
   *   **`i18next`:** É o núcleo da biblioteca i18n, uma estrutura completa que lida com o carregamento de traduções, detecção de idioma, pluralização, formatação, etc. É agnóstica a frameworks.
   *   **`react-i18next`:** Fornece as ligações (bindings) para React e React Native, incluindo hooks (`useTranslation`) e componentes (`Trans`) para usar i18next em seus componentes React.
   *   **`react-native-localize`:** Uma biblioteca para obter informações de localização do dispositivo nativo (como locales preferidos, país, fuso horário, etc.) e detectar mudanças nessas configurações.

   **Instalação:**
   ```bash
   yarn add i18next react-i18next react-native-localize
   # Para projetos iOS, instale os pods:
   cd ios && pod install && cd ..
   ```

   **Configuração:**

   1.  **Criar Arquivos de Tradução:**
      Crie um diretório para suas traduções, por exemplo, `src/locales/`, com subdiretórios para cada idioma e um arquivo `translation.json` (ou similar) dentro de cada um.

      ```
      src/
        locales/
          en/
            translation.json
          pt/
            translation.json
          es/
            translation.json
      ```

      Exemplo `src/locales/en/translation.json`:
      ```json
      {
        "welcomeMessage": "Welcome to My App!",
        "settingsTitle": "Settings",
        "itemCount_one": "{{count}} item",
        "itemCount_other": "{{count}} items",
        "greeting": "Hello, {{name}}."
      }
      ```

      Exemplo `src/locales/pt/translation.json`:
      ```json
      {
        "welcomeMessage": "Bem-vindo ao Meu App!",
        "settingsTitle": "Configurações",
        "itemCount_one": "{{count}} item",
        "itemCount_other": "{{count}} itens",
        "greeting": "Olá, {{name}}."
      }
      ```

   2.  **Configurar `i18next` (`src/i18n.js` ou similar):**
      ```javascript
      // src/i18n.js
      import i18n from "i18next";
      import { initReactI18next } from "react-i18next";
      import * as RNLocalize from "react-native-localize";

      // Importe seus arquivos de tradução
      import en from "./locales/en/translation.json";
      import pt from "./locales/pt/translation.json";
      import es from "./locales/es/translation.json";

      const resources = {
        en: { translation: en },
        pt: { translation: pt },
        es: { translation: es },
      };

      // Encontra o melhor idioma disponível com base nas preferências do dispositivo
      const findBestAvailableLanguage = () => {
        const locales = RNLocalize.getLocales(); // Array de locales do dispositivo, ex: [{ languageTag: "en-US", ...}]
        if (locales && locales.length > 0) {
          const bestLang = RNLocalize.findBestAvailableLanguage(Object.keys(resources));
          return bestLang ? bestLang.languageTag : "en"; // Fallback para inglês
        }
        return "en"; // Fallback se não encontrar locales
      };

      i18n
        .use(initReactI18next) // Passa a instância i18n para react-i18next
        .init({
          resources,
          lng: findBestAvailableLanguage(), // Define o idioma inicial
          fallbackLng: "en", // Idioma de fallback se a tradução não for encontrada no idioma atual
          compatibilityJSON: "v3", // Para compatibilidade com formatos JSON mais antigos, se necessário
          interpolation: {
            escapeValue: false, // React já faz o escape por padrão, evita duplo escape
          },
          react: {
            useSuspense: false, // Opcional: desabilitar Suspense se não estiver usando para carregar traduções
          },
        });

      // Listener para mudanças de locale no dispositivo (opcional, mas bom para UX)
      RNLocalize.addEventListener("change", () => {
        const newBestLang = findBestAvailableLanguage();
        if (i18n.language !== newBestLang) {
          i18n.changeLanguage(newBestLang);
        }
      });

      export default i18n;
      ```

   3.  **Importar a configuração no `App.js` (ou ponto de entrada):**
      ```javascript
      // App.js
      import "./src/i18n"; // Importa para inicializar o i18next
      // ... resto do seu App.js
      ```

   **Uso em Componentes:**

   *   **Hook `useTranslation`:**
      ```javascript
      // MeuComponente.js
      import React from "react";
      import { View, Text, Button } from "react-native";
      import { useTranslation } from "react-i18next";

      const MeuComponente = () => {
        const { t, i18n } = useTranslation(); // t é a função de tradução, i18n é a instância

        const nomeUsuario = "Usuário";
        const numeroDeItens = 1;

        const mudarIdioma = (lang) => {
          i18n.changeLanguage(lang);
        };

        return (
          <View>
            <Text>{t("welcomeMessage")}</Text>
            <Text>{t("greeting", { name: nomeUsuario })}</Text> {/* Interpolação */}
            <Text>{t("itemCount", { count: numeroDeItens })}</Text> {/* Pluralização (count é a chave) */}
            <Text>{t("itemCount", { count: 5 })}</Text>
            <Text>Idioma Atual: {i18n.language}</Text>
            <Button title="Mudar para PT" onPress={() => mudarIdioma("pt")} />
            <Button title="Mudar para ES" onPress={() => mudarIdioma("es")} />
            <Button title="Mudar para EN" onPress={() => mudarIdioma("en")} />
          </View>
        );
      };
      export default MeuComponente;
      ```

   *   **Componente `Trans` (para traduções com elementos React aninhados):**
      ```javascript
      import { Trans } from "react-i18next";
      // Suponha a tradução: "termsAndConditions": "Please read our <1>Terms</1> and <3>Privacy Policy</3>."
      <Text>
        <Trans i18nKey="termsAndConditions">
          Please read our <Text style={{fontWeight: "bold"}} onPress={() => Linking.openURL("/terms")}>Terms</Text> and <Text style={{fontWeight: "bold"}} onPress={() => Linking.openURL("/privacy")}>Privacy Policy</Text>.
        </Trans>
      </Text>
      ```

**2. Outras Bibliotecas e Considerações:**

   *   **`react-native-i18n` (obsoleta, use `react-native-localize` e uma lib i18n como `i18next`):** Era popular, mas não é mais mantida ativamente.
   *   **`fbt` (Facebook Translation):** Usada internamente pelo Facebook, poderosa mas com uma curva de aprendizado maior e menos exemplos para React Native.

### Formatação de Datas, Números e Moedas

   `i18next` pode ser estendido com formatadores ou você pode usar a API `Intl` do JavaScript (disponível em ambientes React Native modernos) ou bibliotecas como `date-fns` (com `date-fns-tz` para fusos horários) ou `moment.js` (embora `moment` seja grande e geralmente desencorajado para novos projetos em favor de alternativas mais leves como `date-fns` ou `dayjs`).

   *   **Usando a API `Intl`:**
      ```javascript
      const numero = 123456.789;
      const data = new Date();

      // Formatar número (ex: para pt-BR)
      console.log(new Intl.NumberFormat("pt-BR").format(numero)); // "123.456,789"
      console.log(new Intl.NumberFormat("en-US").format(numero)); // "123,456.789"

      // Formatar moeda
      console.log(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numero)); // "R$ 123.456,79"
      console.log(new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(numero)); // "$123,456.79"

      // Formatar data
      console.log(new Intl.DateTimeFormat("pt-BR").format(data)); // "14/05/2025" (exemplo)
      console.log(new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "short" }).format(data));
      // "Wednesday, May 14, 2025 at 11:20 PM" (exemplo)

      // Obter o locale atual do i18next para usar com Intl
      const localeAtual = i18n.language; // ex: "pt-BR" ou "pt"
      // new Intl.NumberFormat(localeAtual, ...)
      ```
      Você pode integrar isso com `i18next` criando funções de formatação personalizadas.

   *   **Com `i18next` e `Intl` (configuração de interpolação):**
      ```javascript
      // i18n.js
      i18n.init({
        // ... outras configs
        interpolation: {
          escapeValue: false,
          format: (value, format, lng) => {
            if (value instanceof Date) {
              return new Intl.DateTimeFormat(lng, /* opções de formato aqui */).format(value);
            }
            if (typeof value === "number" && format === "currency") {
              return new Intl.NumberFormat(lng, { style: "currency", currency: "USD" /* ou dinâmico */ }).format(value);
            }
            return value;
          }
        }
      });

      // Uso no JSON:
      // "formattedDate": "Data: {{myDate, DD/MM/YYYY}}" // i18next tem seu próprio sistema de formatação de data
      // "price": "Preço: {{val, currency}}"
      // t("price", { val: 123.45, currencyCode: "BRL" }); // Passar currencyCode dinamicamente
      ```
      A formatação de data/hora do `i18next` é básica. Para formatação rica e consciente de locale, `Intl` ou `date-fns` são mais robustos.

### Suporte a RTL (Right-to-Left)

   React Native tem um bom suporte embutido para layouts RTL.

   1.  **Detectar se o Layout é RTL:**
      ```javascript
      import { I18nManager } from "react-native";

      const isRTL = I18nManager.isRTL;
      console.log("Layout é RTL?", isRTL);
      ```
      `I18nManager.isRTL` é `true` se o idioma do dispositivo for RTL (ex: Árabe, Hebraico).

   2.  **Estilização para RTL:**
      *   **Flexbox:** O Flexbox em React Native lida com RTL automaticamente na maioria dos casos. `flexDirection: "row"` se tornará da direita para a esquerda em RTL. `alignItems: "flex-start"` alinhará à direita em RTL.
      *   **Propriedades Específicas de Início/Fim:** Para margens, paddings, bordas, e posicionamento, use as propriedades lógicas que se adaptam à direção do texto:
          *   `marginStart` (em vez de `marginLeft`)
          *   `marginEnd` (em vez de `marginRight`)
          *   `paddingStart`, `paddingEnd`
          *   `borderStartWidth`, `borderEndWidth`, etc.
          *   `textAlign: "left"` (padrão) e `textAlign: "right"` se alinharão corretamente com base na direção do texto do conteúdo, mas para forçar alinhamento visual, use `textAlign: "auto"` (padrão) ou especifique.
      *   **Ícones:** Ícones direcionais (como setas de "voltar" ou "avançar") podem precisar ser espelhados em RTL. Você pode fazer isso condicionalmente com uma transformação de estilo:
         `style={isRTL && { transform: [{ scaleX: -1 }] }}`
      *   **Imagens:** Algumas imagens podem precisar de versões espelhadas para RTL.

   3.  **Forçar Layout RTL/LTR (para testes):**
      ```javascript
      import { I18nManager } from "react-native";

      // Para forçar RTL (reinicia o app):
      // I18nManager.forceRTL(true);
      // Para desabilitar o forçamento (usa a direção do dispositivo):
      // I18nManager.allowRTL(true); // Garante que RTL é permitido
      // I18nManager.forceRTL(false);
      ```
      **Atenção:** Chamar `forceRTL` geralmente requer uma reinicialização do aplicativo para ter efeito completo.

   4.  **Testando RTL:** Sempre teste seu aplicativo completamente em um idioma RTL para garantir que todos os layouts e interações funcionem corretamente.

### Melhores Práticas para i18n e l10n

*   **Planeje Desde o Início:** Considere i18n desde as fases iniciais de design e desenvolvimento.
*   **Use Chaves Semânticas:** Use chaves de tradução descritivas (ex: `userProfile.editButtonLabel`) em vez de frases em inglês como chaves.
*   **Evite Concatenar Strings Traduzidas:** A ordem das palavras e a gramática variam entre os idiomas. Use interpolação e pluralização fornecidas pela sua biblioteca i18n.
*   **Contexto para Tradutores:** Forneça contexto (screenshots, descrições) para os tradutores para garantir traduções precisas.
*   **Teste em Múltiplos Idiomas e Dispositivos:** Verifique layouts, quebras de texto, e formatação.
*   **Considere o Comprimento do Texto:** Frases em alguns idiomas (ex: Alemão) podem ser muito mais longas que em Inglês. Garanta que sua UI possa acomodar isso.
*   **Carregamento de Traduções:** Para aplicativos com muitos idiomas, considere carregar apenas os arquivos de tradução necessários (ex: o idioma atual e o de fallback) para reduzir o tamanho inicial do bundle ou o tempo de carregamento (algumas configurações de `i18next` com backends podem ajudar nisso).
*   **Mantenha as Traduções Sincronizadas:** Use ferramentas ou processos para garantir que todas as chaves sejam traduzidas em todos os idiomas suportados.

Implementar i18n e l10n corretamente é um investimento que expande significativamente o alcance e a usabilidade do seu aplicativo React Native.


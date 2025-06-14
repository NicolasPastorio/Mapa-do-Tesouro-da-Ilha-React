

### Mocks e Spies em Testes

Mocks (simulacros) e spies (espiões) são técnicas essenciais no arsenal de testes automatizados, especialmente em JavaScript com Jest. Eles permitem isolar o código que está sendo testado de suas dependências externas, controlar o comportamento dessas dependências e verificar se as interações ocorreram como esperado.

**O que são Mocks?**

Um mock é um objeto simulado que imita o comportamento de um objeto real de forma controlada. Mocks são usados para:

1.  **Isolar a Unidade de Teste:** Substituir dependências externas (como módulos, funções, classes, chamadas de API) para que o teste se concentre apenas na lógica da unidade sob teste.
2.  **Controlar Comportamento:** Definir como o mock deve se comportar durante o teste (ex: qual valor retornar, se deve lançar um erro).
3.  **Verificar Interações:** Confirmar se a unidade sob teste interagiu com o mock da maneira esperada (ex: se uma função mock foi chamada, quantas vezes e com quais argumentos).

**O que são Spies?**

Um spy é uma função que "envolve" uma função real, permitindo que você "espione" suas chamadas (quantas vezes foi chamada, com quais argumentos, qual valor retornou) sem alterar seu comportamento original. Spies também podem, opcionalmente, substituir a implementação original.

**Jest e suas Funcionalidades de Mocking:**

Jest oferece um sistema de mocking robusto e fácil de usar.

1.  **`jest.fn()`: Criando Funções Mock Simples**
    *   Cria uma função mock básica. Útil para simular callbacks ou funções passadas como props.
    *   A função mock rastreia chamadas, instâncias, argumentos e valores de retorno.

    ```javascript
    const mockCallback = jest.fn();
    minhaFuncaoQueChamaCallback(mockCallback);
    expect(mockCallback).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalledTimes(1);
    expect(mockCallback).toHaveBeenCalledWith(/* argumentos esperados */);

    // Você também pode definir um valor de retorno para a função mock:
    const mockComRetorno = jest.fn(() => "valor mockado");
    // ou
    mockComRetorno.mockReturnValue("outro valor");
    mockComRetorno.mockResolvedValue("valor de promessa resolvida"); // Para funções async
    mockComRetorno.mockRejectedValue(new Error("erro mockado")); // Para funções async
    ```

2.  **`jest.mock("caminho/para/modulo")`: Mocking de Módulos**
    *   Substitui um módulo inteiro por um mock. Todas as exportações do módulo se tornam funções mock (ou mocks de seus tipos originais se não forem funções).
    *   É "hoisted" (elevado) para o topo do arquivo, então é executado antes das importações.

    ```javascript
    // utils.js
    export const funcaoOriginal = () => "valor original";
    export const outraFuncao = () => 42;

    // meuTeste.test.js
    import { funcaoOriginal, outraFuncao } from "./utils";

    jest.mock("./utils"); // Mocka o módulo utils.js

    test("funcaoOriginal é mockada", () => {
      // funcaoOriginal agora é uma função mock
      funcaoOriginal.mockReturnValue("valor mockado da funcaoOriginal");
      
      const resultado = funcaoOriginal();
      expect(resultado).toBe("valor mockado da funcaoOriginal");
      expect(funcaoOriginal).toHaveBeenCalledTimes(1);

      // outraFuncao também é uma função mock por padrão
      outraFuncao.mockReturnValue(100);
      expect(outraFuncao()).toBe(100);
    });
    ```

    *   **Implementação Mock Customizada para Módulos:**
        Você pode fornecer uma fábrica de mock (uma função que retorna a implementação mock) como segundo argumento para `jest.mock()`.

        ```javascript
        // meuTeste.test.js
        jest.mock("./utils", () => ({
          __esModule: true, // Necessário para módulos ES6
          funcaoOriginal: jest.fn(() => "implementação mock customizada"),
          outraFuncao: jest.fn(() => 99),
        }));

        import { funcaoOriginal, outraFuncao } from "./utils"; // Agora importa os mocks customizados

        test("usa implementação mock customizada", () => {
          expect(funcaoOriginal()).toBe("implementação mock customizada");
          expect(outraFuncao()).toBe(99);
        });
        ```

3.  **`jest.spyOn(objeto, "nomeDoMetodo")`: Espionando Métodos de Objetos**
    *   Cria uma função mock que rastreia chamadas ao método `nomeDoMetodo` do `objeto`, mas por padrão ainda executa a implementação original do método.
    *   Útil quando você quer verificar se um método foi chamado, mas não quer alterar seu comportamento, ou quando quer alterar temporariamente seu comportamento.

    ```javascript
    const video = {
      play() {
        console.log("Vídeo tocando a implementação original");
        return true;
      },
    };

    const spyPlay = jest.spyOn(video, "play");

    video.play(); // Executa a implementação original E registra a chamada no spy

    expect(spyPlay).toHaveBeenCalled();
    spyPlay.mockRestore(); // Restaura a implementação original (remove o spy)

    // Você também pode fornecer uma implementação mock para o spy:
    const spyComMock = jest.spyOn(video, "play").mockReturnValue("vídeo mockado tocando");
    expect(video.play()).toBe("vídeo mockado tocando"); // Agora executa a implementação mock
    spyComMock.mockRestore();
    ```

**Casos de Uso Comuns para Mocks e Spies em React Native:**

*   **Chamadas de API (Networking):**
    Mockar módulos como `fetch` ou bibliotecas como `axios` para simular respostas de API (sucesso, erro, diferentes dados) sem fazer chamadas de rede reais.
    ```javascript
    // Exemplo mockando fetch globalmente
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ data: "dados mockados" }),
        ok: true,
      })
    );

    // Em seu teste:
    // await minhaFuncaoQueUsaFetch();
    // expect(fetch).toHaveBeenCalledWith("url/esperada");
    ```

*   **Módulos Nativos (`NativeModules`):**
    Se seus componentes interagem com módulos nativos customizados, você precisará mocká-los para testes Jest, já que o ambiente de teste não tem acesso ao código nativo.
    ```javascript
    // jest-setup.js ou no topo do arquivo de teste
    import { NativeModules } from "react-native";

    NativeModules.MeuModuloNativoCustomizado = {
      metodoNativo: jest.fn(() => Promise.resolve("resultado mockado do nativo")),
      // ... outros métodos mockados
    };
    ```

*   **Bibliotecas de Terceiros:**
    Mockar bibliotecas como `@react-native-async-storage/async-storage`, `react-native-permissions`, `react-native-geolocation-service`, etc., para controlar seu comportamento durante os testes.
    ```javascript
    // Mockando AsyncStorage
    jest.mock("@react-native-async-storage/async-storage", () => ({
      setItem: jest.fn(() => Promise.resolve(null)),
      getItem: jest.fn(() => Promise.resolve(null)), // Pode retornar um valor mockado específico
      removeItem: jest.fn(() => Promise.resolve(null)),
      clear: jest.fn(() => Promise.resolve(null)),
    }));
    ```

*   **Timers (setTimeout, setInterval):**
    Jest fornece utilitários para controlar timers (`jest.useFakeTimers()`, `jest.runAllTimers()`, `jest.advanceTimersByTime(ms)`), permitindo que você teste lógicas baseadas em tempo sem esperar de verdade.
    ```javascript
    jest.useFakeTimers();

    it("chama callback após 1 segundo", () => {
      const callback = jest.fn();
      setTimeout(callback, 1000);

      expect(callback).not.toHaveBeenCalled(); // Ainda não foi chamado
      jest.advanceTimersByTime(1000); // Avança o tempo
      expect(callback).toHaveBeenCalledTimes(1); // Agora foi chamado
    });
    ```

*   **Hooks Customizados:**
    Ao testar um componente que usa um hook customizado, você pode querer mockar o hook para controlar os valores que ele retorna e focar no teste do componente em si.
    ```javascript
    // __tests__/MeuComponente.test.js
    jest.mock("../hooks/useMeuHookCustomizado", () => ({
      useMeuHookCustomizado: () => ({
        dado: "dado mockado do hook",
        carregarDado: jest.fn(),
      }),
    }));
    // ... resto do teste do componente
    ```

**Matchers Úteis para Mocks e Spies:**

*   `.toHaveBeenCalled()` / `.not.toHaveBeenCalled()`
*   `.toHaveBeenCalledTimes(numero)`
*   `.toHaveBeenCalledWith(arg1, arg2, ...)`
*   `.toHaveBeenLastCalledWith(arg1, arg2, ...)`
*   `.toHaveBeenNthCalledWith(n, arg1, arg2, ...)`
*   `.toHaveReturned()` / `.not.toHaveReturned()`
*   `.toHaveReturnedTimes(numero)`
*   `.toHaveReturnedWith(valor)`
*   `.toHaveLastReturnedWith(valor)`
*   `.toHaveNthReturnedWith(n, valor)`

**Limpando Mocks:**

É importante limpar ou resetar mocks entre os testes para evitar que o estado de um teste afete outro.

*   `mockClear()`: Limpa todas as informações armazenadas na propriedade `.mock` (ex: `mock.calls`, `mock.instances`). Útil em `beforeEach`.
    `minhaFuncaoMock.mockClear();`
*   `mockReset()`: Faz o que `mockClear()` faz e também remove qualquer implementação mockada ou valor de retorno, restaurando para uma função mock simples que retorna `undefined`. Útil se você quer resetar completamente o mock.
*   `mockRestore()`: Faz o que `mockReset()` faz e também restaura a implementação original (se o mock foi criado com `jest.spyOn`).

Jest também tem opções de configuração (`clearMocks`, `resetMocks`, `restoreMocks` no `jest.config.js`) para fazer isso automaticamente antes de cada teste.

Dominar mocks e spies é fundamental para escrever testes unitários e de integração eficazes, permitindo que você crie testes mais focados, confiáveis e fáceis de manter.


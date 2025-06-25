# AppRegistry

A `AppRegistry` é o ponto de entrada JavaScript para executar todos os aplicativos React Native. O registro do componente raiz do seu aplicativo com `AppRegistry.registerComponent` é um passo essencial para que o React Native possa carregar e exibir sua interface de usuário.

## Métodos

### `registerComponent(appKey, getComponentFunc)`
Registra um componente de aplicativo. O `appKey` é uma string que identifica seu aplicativo (geralmente o nome do projeto). O `getComponentFunc` é uma função que retorna o componente React que será o componente raiz do seu aplicativo.

```javascript
import { AppRegistry } from 'react-native';
import App from './App'; // Seu componente raiz
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
```

### `runApplication(appKey, appParameters)`
Inicia um aplicativo React Native registrado. Este método é geralmente chamado internamente pelo React Native e você raramente precisará chamá-lo diretamente. O `appParameters` é um objeto que pode conter propriedades como `rootTag` (o ID da view nativa onde o aplicativo será montado).

```javascript
// Exemplo de como o React Native pode chamar internamente
AppRegistry.runApplication('MyReactNativeApp', { rootTag: document.getElementById('react-root') });
```

### `getRunnable(appKey)`
Retorna a função que foi registrada com `registerComponent` para o `appKey` especificado.

```javascript
import { AppRegistry } from 'react-native';

const getMyApp = AppRegistry.getRunnable('MyReactNativeApp');
if (getMyApp) {
  console.log('Função do componente raiz obtida com sucesso.');
}
```

### `getAppKeys()`
Retorna um array de todas as chaves de aplicativo registradas.

```javascript
import { AppRegistry } from 'react-native';

const appKeys = AppRegistry.getAppKeys();
console.log('Chaves de aplicativos registradas:', appKeys);
```

### `unregisterComponent(appKey)`
Desregistra um componente de aplicativo. Raramente usado em aplicativos normais, mas pode ser útil em cenários de teste ou para descarregar módulos.

```javascript
import { AppRegistry } from 'react-native';

// Supondo que 'MyReactNativeApp' foi registrado
AppRegistry.unregisterComponent('MyReactNativeApp');
console.log('MyReactNativeApp desregistrado.');
```

## Exemplo de Uso Típico

Em um projeto React Native padrão, você encontrará o uso de `AppRegistry` no arquivo `index.js` (ou `App.js` dependendo da configuração do projeto):

```javascript
// index.js
import { AppRegistry } from 'react-native';
import App from './App'; // O seu componente principal da aplicação
import { name as appName } from './app.json'; // O nome do seu aplicativo definido em app.json

// Registra o componente principal da sua aplicação
AppRegistry.registerComponent(appName, () => App);

// Você pode registrar outros componentes se tiver múltiplos pontos de entrada
// AppRegistry.registerComponent('AnotherApp', () => AnotherApp);
```

## Considerações

- **Ponto de Entrada:** `AppRegistry` é o coração do carregamento do seu aplicativo React Native. Sem ele, seu aplicativo não seria inicializado.
- **Múltiplos Componentes Raiz:** Embora seja comum ter apenas um componente raiz para a maioria dos aplicativos, `AppRegistry` permite registrar múltiplos componentes, o que pode ser útil para aplicativos com diferentes fluxos ou para integrar partes do React Native em um aplicativo nativo existente.
- **`app.json`:** O `appKey` usado em `registerComponent` geralmente corresponde ao `name` definido no seu arquivo `app.json`, garantindo que o nome do aplicativo seja consistente em todo o projeto.


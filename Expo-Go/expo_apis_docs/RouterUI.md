# UI do Roteador (Router UI)

Um submódulo do Expo Router que fornece componentes de abas "headless" para criar layouts de abas personalizados.

`expo-router/ui` é um submódulo da biblioteca `expo-router` e exporta componentes e hooks para construir layouts de abas personalizados, em vez de usar os navegadores padrão do [React Navigation](https://reactnavigation.org/) fornecidos pelo `expo-router`.

> Consulte a [referência do Expo Router](https://docs.expo.dev/versions/latest/sdk/router/) para obter mais informações sobre a biblioteca de roteamento baseada em arquivos para aplicativos nativos e web.

## Instalação

Para usar `expo-router/ui` em seu projeto, você precisa instalar `expo-router` em seu projeto. Siga as instruções do guia [Instalar Expo Router](https://docs.expo.dev/router/installation/).

## Configuração no app config

Se você estiver usando o modelo [padrão](https://docs.expo.dev/get-started/create-a-project/#managed-workflow) para criar um novo projeto, o [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) do `expo-router` é configurado automaticamente no `app.json`.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": ["expo-router"]
  }
}
```

## Uso

Encontre mais informações sobre como usar `expo-router/ui` no [guia do Expo Router UI](https://docs.expo.dev/router/reference/router-ui/).

## API

```javascript
import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
```

### Componentes

#### `TabContext`

Tipo: `React.Element<ProviderProps<>>`

Um componente de contexto que fornece o estado e as funções para os componentes de abas.

#### `TabList`

Tipo: `React.Element<TabListProps>`

Componente wrapper para `TabTriggers`. Os `TabTriggers` dentro do `TabList` definem as abas.

Exemplo:

```javascript
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

Propriedades:

*   `asChild` (opcional): Tipo: `boolean`. Encaminha as props para o componente filho e remove o `<View>` extra. Útil para wrappers personalizados.
*   Propriedades herdadas: `ViewProps`.

#### `Tabs`

Tipo: `React.Element<TabsProps>`

Componente raiz para as abas "headless".

> Veja: `useTabsWithChildren` para uma versão hook deste componente.

Exemplo:

```javascript
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

Propriedades:

*   `asChild` (opcional): Tipo: `boolean`. Encaminha as props para o componente filho e remove o `<View>` extra. Útil para wrappers personalizados.
*   Propriedades herdadas: `ViewProps`.

#### `TabSlot`

Tipo: `React.Element<TabSlotProps>`

Renderiza a aba atual.

> Veja: `useTabSlot` para uma versão hook deste componente.

Exemplo:

```javascript
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

Propriedades:

*   `render` (opcional): Tipo: `defaultTabsSlotRender`. Sobrescreve como o componente `Screen` é renderizado.
*   Propriedades herdadas: `ComponentProps<ScreenContainer>`.

#### `TabTrigger`

Tipo: `React.Element<TabTriggerProps>`

Cria um gatilho para navegar para uma aba. Quando usado como filho de `TabList`, sua funcionalidade muda ligeiramente, pois a prop `href` é obrigatória, e o gatilho também define quais rotas estão presentes nas `Tabs`.

Quando usado fora de `TabList`, este componente não requer mais um `href`.

Exemplo:

```javascript
<Tabs>
 <TabSlot />
 <TabList>
  <TabTrigger name="home" href="/" />
 </TabList>
</Tabs>
```

Propriedades:

*   `asChild` (opcional): Tipo: `boolean`. Encaminha as props para o componente filho. Útil para wrappers personalizados.
*   `name`: Nome da aba. Obrigatório quando usado dentro de um `TabList`. Tipo: `string`. Nome da aba. Quando usado dentro de um `TabList`, isso define o nome da aba. Caso contrário, isso faz referência ao nome.
*   `resetOnSwitch` (opcional): Tipo literal: `union`. Redefine a rota ao alternar para uma aba. Valores aceitáveis são: `SwitchToOptions[reset]` ou `onLongPress`.
*   Propriedades herdadas: `ViewProps`.

### Hooks

#### `useTabSlot(namedParameters)`

| Parâmetro | Tipo |
| --- | --- |
| `namedParameters` (opcional) | `TabSlotProps` |

Retorna um `ReactElement` da aba atual.

Exemplo:

```javascript
function MyTabSlot() {
  const slot = useTabSlot();

  return slot;
}
```

#### `useTabsWithChildren(options)`

| Parâmetro | Tipo |
| --- | --- |
| `options` | `UseTabsWithChildrenOptions` |

Versão hook de `Tabs`. O componente `NavigationContent` retornado deve ser renderizado. Usar o hook requer o uso dos componentes `<TabList />` e `<TabTrigger />` exportados do Expo Router.

O hook `useTabsWithTriggers()` pode ser usado para componentes personalizados.

> Veja: `Tabs` para a versão componente deste hook.

Exemplo:

```javascript
export function MyTabs({
  children,
  screenOptions,
  initialRouteName,
  ...rest
}) {
  const { Navigator } = useTabsWithChildren({
    children,
    screenOptions,
    initialRouteName,
    ...rest,
  });

  return <Navigator />;
}
```

#### `useTabsWithTriggers(options)`

| Parâmetro | Tipo |
| --- | --- |
| `options` | `UseTabsOptions` |

Versão hook de `Tabs` que permite o uso de componentes de gatilho personalizados. O componente `NavigationContent` retornado deve ser renderizado.

> Veja: `Tabs` para a versão componente deste hook.

Exemplo:

```javascript
export function MyTabs({
  children,
  screenOptions,
  initialRouteName,
  ...rest
}) {
  const { Navigator } = useTabsWithTriggers({
    children,
    screenOptions,
    initialRouteName,
    ...rest,
  });

  return <Navigator />;
}
```

#### `useTabTrigger(namedParameters)`

| Parâmetro | Tipo |
| --- | --- |
| `namedParameters` (opcional) | `TabTriggerOptions` |

Retorna as props para um componente de gatilho de aba. Útil para criar componentes de gatilho personalizados.

### Tipos

#### `ExpoTabsNavigationProp`

Tipo: `object`

Propriedades de navegação para as abas do Expo.

#### `ExpoTabsNavigatorOptions`

Tipo: `object`

Opções para o navegador de abas do Expo.

#### `ExpoTabsNavigatorScreenOptions`

Tipo: `object`

Opções de tela para o navegador de abas do Expo.

#### `ExpoTabsResetValue`

Tipo: `object`

Valor de redefinição para as abas do Expo.

#### `ExpoTabsScreenOptions`

Tipo: `object`

Opções de tela para as abas do Expo.

#### `SwitchToOptions`

Tipo: `object`

Opções para alternar para uma aba.

#### `TabNavigationEventMap`

Tipo: `object`

Mapa de eventos de navegação de abas.

#### `TabsContextValue`

Tipo: `object`

Valor do contexto das abas.

#### `TabsSlotRenderOptions`

Tipo: `object`

Opções de renderização do slot das abas.

#### `TabTriggerOptions`

Tipo: `object`

Opções para o gatilho da aba.

#### `Trigger`

Tipo: `object`

Um objeto que representa um gatilho.

#### `UseTabsOptions`

Tipo: `object`

Opções para o hook `useTabsWithTriggers`.

#### `UseTabsWithChildrenOptions`

Tipo: `object`

Opções para o hook `useTabsWithChildren`.

---

**Autor:** Manus AI
**Data de Geração:** 19 de Junho de 2025

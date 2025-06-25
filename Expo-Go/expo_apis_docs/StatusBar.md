# Barra de Status (StatusBar)

Uma biblioteca que fornece a mesma interface que a API StatusBar do React Native, mas com padrões ligeiramente diferentes para funcionar bem em ambientes Expo.

`expo-status-bar` oferece um componente e uma interface imperativa para controlar a barra de status do aplicativo para alterar a cor do texto, a cor de fundo, ocultá-la, torná-la translúcida ou opaca e aplicar animações a qualquer uma dessas alterações. Exatamente o que você pode fazer com o componente `StatusBar` depende da plataforma que você está usando.

> **Suporte para tvOS e web**
> 
> Para tvOS, o código `expo-status-bar` será compilado e executado, mas nenhuma barra de status será exibida.
> 
> Para a web, não há API disponível para controlar a barra de status do sistema operacional, então `expo-status-bar` não fará nada e não lançará um erro.

## Instalação

Para instalar a API StatusBar, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-status-bar
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Observe que a barra de status tem texto claro!</Text>
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
});
```

## API

```javascript
import { StatusBar } from 'expo-status-bar';
```

## Componente

### `StatusBar`

Tipo: `React.Element<StatusBarProps>`

Um componente que permite configurar sua barra de status sem chamar diretamente métodos imperativos como `setBarStyle`.

Você provavelmente terá vários componentes `StatusBar` montados no mesmo aplicativo ao mesmo tempo. Por exemplo, se você tiver várias telas em seu aplicativo, poderá acabar usando um por tela. As props de cada componente `StatusBar` serão mescladas na ordem em que foram montadas. Este componente é construído sobre o componente [StatusBar](https://reactnative.dev/docs/statusbar) exportado do React Native e fornece padrões que funcionam melhor para usuários do Expo.

#### Propriedades

| Propriedade | Tipo | Padrão | Descrição |
| --- | --- | --- | --- |
| `animated` (opcional) | `boolean` | `false` | Se a transição entre as alterações de propriedade da barra de status deve ser animada. Suportado para `backgroundColor`, `barStyle` e `hidden`. |
| `backgroundColor` (opcional) | `ColorValue` | `undefined` | A cor de fundo da barra de status. |
| `hidden` (opcional) | `boolean` | `false` | Se a barra de status está oculta. |
| `transition` (opcional) | `StatusBarAnimation` | `fade` | O efeito de transição ao mostrar e ocultar a barra de status usando a prop `hidden`. |
| `networkActivityIndicatorVisible` (opcional) | `boolean` | `false` | Se o indicador de atividade da rede deve estar visível. |
| `style` (opcional) | `StatusBarStyle` | `auto` | Define a cor do texto da barra de status. O valor padrão é `"auto"`, que escolhe o valor apropriado de acordo com o esquema de cores ativo, por exemplo: se o seu aplicativo estiver no modo escuro, o estilo será `"light"`. |
| `translucent` (opcional) | `boolean` | `false` | Se a barra de status é translúcida. Quando `translucent` é definido como `true`, o aplicativo será desenhado sob a barra de status. Este é o comportamento padrão em projetos criados com ferramentas Expo porque é consistente com o iOS. |

## Métodos

### `StatusBar.setStatusBarBackgroundColor(backgroundColor, animated)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `backgroundColor` | `ColorValue` | A cor de fundo da barra de status. |
| `animated` (opcional) | `boolean` | `true` para animar a mudança da cor de fundo, `false` para mudar imediatamente. |

Define a cor de fundo da barra de status.

### `StatusBar.setStatusBarHidden(hidden, animation)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `hidden` | `boolean` | Se a barra de status deve ser oculta. |
| `animation` (opcional) | `StatusBarAnimation` | Animação a ser usada ao alternar oculto, o padrão é `none`. |

Alterna a visibilidade da barra de status.

### `StatusBar.setStatusBarNetworkActivityIndicatorVisible(visible)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `visible` | `boolean` | Se o indicador de atividade da rede deve estar visível. |

Alterna a visibilidade do indicador de atividade da rede.

### `StatusBar.setStatusBarStyle(style, animated)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `style` | `StatusBarStyle` | A cor do texto da barra de status. |
| `animated` (opcional) | `boolean` | Se a transição deve ser animada. |

Define o estilo da barra de status.

### `StatusBar.setStatusBarTranslucent(translucent)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `translucent` | `boolean` | Se o aplicativo pode desenhar sob a barra de status. Quando `true`, o conteúdo será renderizado sob a barra de status. Isso é sempre `true` no iOS e não pode ser alterado. |

Define a translucidez da barra de status.

## Tipos

### `StatusBarAnimation`

Tipo Literal: `string`

Valores aceitáveis são: `none` | `fade` | `slide`

### `StatusBarStyle`

Tipo Literal: `string`

Valores aceitáveis são: `auto` | `inverted` | `light` | `dark`

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025


# Gradiente Linear (LinearGradient)

Um componente React universal que renderiza uma visualização de gradiente.

`expo-linear-gradient` fornece uma visualização React nativa que faz a transição entre várias cores em uma direção linear.

## Instalação

Para instalar a API LinearGradient, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-linear-gradient
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

```javascript
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["rgba(0,0,0,0.8)", "transparent"]}
        style={styles.background}
      />
      <Text style={styles.text}>Seu aplicativo!</Text>
      <LinearGradient
        colors={["#4c669f", "#3b5998", "#192f6a"]}
        style={styles.button}
        onPress={() => console.log("Botão pressionado!")}
      >
        <Text style={styles.buttonText}>Entrar com Facebook</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  button: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 15,
    color: '#fff',
  },
});
```

## API

```javascript
import { LinearGradient } from 'expo-linear-gradient';
```

### Componente

#### `<LinearGradient />`

Um componente React Native que renderiza um gradiente linear. Ele aceita as seguintes propriedades:

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `colors` | `readonly [ColorValue, ColorValue, ...ColorValue[]]` | Um array somente leitura de cores que representam as paradas no gradiente. Pelo menos duas cores são necessárias (para um fundo de cor única, use a propriedade `style.backgroundColor` em um componente `View`). Para que o TypeScript saiba que o array fornecido tem 2 ou mais valores, ele deve ser fornecido "inline" ou tipado `as const`. |
| `start` (opcional) | `LinearGradientPoint` | Um objeto que define o ponto de início do gradiente. Por exemplo, `{ x: 0.1, y: 0.2 }` significa que o gradiente começará a 10% da esquerda e 20% do topo. Na web, isso apenas altera o ângulo do gradiente porque os gradientes CSS não suportam a alteração da posição inicial. |
| `end` (opcional) | `LinearGradientPoint` | Um objeto que define o ponto final do gradiente. Por exemplo, `{ x: 0.1, y: 0.2 }` significa que o gradiente terminará a 10% da esquerda e 20% da parte inferior. Na web, isso apenas altera o ângulo do gradiente porque os gradientes CSS não suportam a alteração da posição final. |
| `locations` (opcional) | `readonly [number, number, ...number[]]` | Um array somente leitura que contém números de 0 a 1, inclusive, e tem o mesmo comprimento da propriedade `colors`. Cada número indica um local de parada de cor onde cada cor respectiva deve estar localizada. Se não for especificado, as cores serão distribuídas uniformemente pelo gradiente. As localizações de parada de cor devem ser crescentes, do menor para o maior. |
| `useAngle` (opcional) | `boolean` | Se `true`, o gradiente usará a propriedade `angle` para determinar a direção do gradiente. Padrão: `false`. |
| `angle` (opcional) | `number` | O ângulo do gradiente em graus. Usado apenas se `useAngle` for `true`. |
| `angleCenter` (opcional) | `LinearGradientPoint` | O ponto central para o cálculo do ângulo. Padrão: `{ x: 0.5, y: 0.5 }`. |
| `dithering` (opcional) | `boolean` | Habilita ou desabilita o dithering de pintura. O dithering pode reduzir o problema de faixas de cores do gradiente. Definir como `false` pode melhorar o desempenho da renderização do gradiente. Padrão: `true`. |

### Tipos

#### `LinearGradientPoint`

Tipo: `object`

Um objeto que representa um ponto no gradiente, com propriedades `x` e `y` (números de 0 a 1).

#### `NativeLinearGradientPoint`

Tipo: `object`

Um objeto que representa um ponto de gradiente nativo, com propriedades `x` e `y` (números).

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025


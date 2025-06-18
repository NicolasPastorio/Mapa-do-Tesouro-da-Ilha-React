# Manter Ativo (KeepAwake)

Um componente React que impede a tela de entrar em modo de suspensão quando renderizado.

`expo-keep-awake` fornece um hook React que impede a tela de entrar em modo de suspensão e um par de funções para habilitar esse comportamento imperativamente.

## Instalação

Para instalar a API KeepAwake, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-keep-awake
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Uso

### Exemplo: hook

```javascript
import { useKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Text, View } from 'react-native';

export default function KeepAwakeExample() {
  useKeepAwake();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Esta tela nunca vai dormir!</Text>
    </View>
  );
}
```

### Exemplo: funções

```javascript
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import React from 'react';
import { Button, View, Alert } from 'react-native';

export default class KeepAwakeExample extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button onPress={this._activate} title="Ativar" />
        <Button onPress={this._deactivate} title="Desativar" />
      </View>
    );
  }

  _activate = () => {
    activateKeepAwake();
    Alert.alert('Ativado!', 'A tela será mantida ativa.');
  };

  _deactivate = () => {
    deactivateKeepAwake();
    Alert.alert('Desativado!', 'A tela pode entrar em modo de suspensão.');
  };
}
```

## API

```javascript
import KeepAwake from 'expo-keep-awake';
```

## Constantes

### `KeepAwake.ExpoKeepAwakeTag`

Tipo: `'ExpoKeepAwakeDefaultTag'`

Tag padrão, usada quando nenhuma tag foi especificada nas chamadas de método `keep awake`.

## Hooks

### `useKeepAwake(tag, options)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `tag` (opcional) | `string` | Tag para bloquear a prevenção de suspensão da tela. Se não for fornecido, um ID exclusivo para o componente proprietário é usado. |
| `options` (opcional) | `KeepAwakeOptions` | Opções adicionais para o hook `keep awake`. |

Um hook React para manter a tela ativa enquanto o componente proprietário estiver montado. O argumento `tag` opcionalmente fornecido é usado ao ativar e desativar o recurso `keep-awake`. Se não for especificado, um ID exclusivo para o componente proprietário é usado. Consulte a documentação para `activateKeepAwakeAsync` abaixo para saber mais sobre o argumento `tag`.

## Métodos

> **Depreciado:** use `activateKeepAwakeAsync` em vez disso.

### `KeepAwake.activateKeepAwake(tag)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `tag` (opcional) | `string` | Tag para bloquear a prevenção de suspensão da tela. Se não for fornecido, a tag padrão é usada. Padrão: `ExpoKeepAwakeTag` |

Impede que a tela entre em modo de suspensão até que `deactivateKeepAwake` seja chamado com o mesmo valor de `tag`.

Se o argumento `tag` for especificado, a tela não entrará em modo de suspensão até que você chame `deactivateKeepAwake` com o mesmo argumento `tag`. Ao usar várias `tags` para ativação, você terá que desativar cada uma para reativar a suspensão da tela. Se a tag não for especificada, a `tag` padrão é usada.

O suporte web é [limitado](https://docs.expo.dev/versions/latest/sdk/keep-awake/#web-support-is-limited).

### `KeepAwake.activateKeepAwakeAsync(tag)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `tag` (opcional) | `string` | Tag para bloquear a prevenção de suspensão da tela. Se não for fornecido, a tag padrão é usada. Padrão: `ExpoKeepAwakeTag` |

Impede que a tela entre em modo de suspensão até que `deactivateKeepAwake` seja chamado com o mesmo valor de `tag`.

Se o argumento `tag` for especificado, a tela não entrará em modo de suspensão até que você chame `deactivateKeepAwake` com o mesmo argumento `tag`. Ao usar várias `tags` para ativação, você terá que desativar cada uma para reativar a suspensão da tela. Se a tag não for especificada, a `tag` padrão é usada.

O suporte web é [limitado](https://docs.expo.dev/versions/latest/sdk/keep-awake/#web-support-is-limited).

### `KeepAwake.deactivateKeepAwake(tag)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `tag` (opcional) | `string` | Tag para liberar o bloqueio na prevenção de suspensão da tela. Se não for fornecido, a tag padrão é usada. Padrão: `ExpoKeepAwakeTag` |

Libera o bloqueio na prevenção de suspensão da tela associado ao valor `tag` fornecido. Se `tag` não for especificado, ele assume a mesma tag padrão que `activateKeepAwake` usa.

### `KeepAwake.isAvailableAsync()`

`true` em todas as plataformas, exceto [navegadores web não suportados](https://docs.expo.dev/versions/latest/sdk/keep-awake/#web-support-is-limited).

## Assinaturas de Eventos

### `KeepAwake.addListener(tagOrListener, listener)`

| Parâmetro | Tipo | Descrição |
| --- | --- | --- |
| `tagOrListener` | `string` ou `KeepAwakeListener` | A tag ou o ouvinte do evento. |
| `listener` (opcional) | `KeepAwakeListener` | Um callback que é invocado quando o estado de `keep awake` muda. |

Observa as mudanças no temporizador `keep awake`. Na web, isso muda ao navegar para fora da janela/aba ativa. Sem operação em nativo.

Retorna: `EventSubscription`

Exemplo:

```javascript
KeepAwake.addListener(({ state }) => {
  console.log('KeepAwake state changed:', state);
});
```

## Tipos

#### `KeepAwakeEvent`

Tipo: `object`

Um objeto que representa um evento `KeepAwake`, contendo o `state` atual (`KeepAwakeEventState`).

#### `KeepAwakeListener`

Tipo: `function`

Um callback para o ouvinte de eventos `KeepAwake`.

#### `KeepAwakeOptions`

Tipo: `object`

Opções para o hook `useKeepAwake`.

### Enums

#### `KeepAwakeEventState`

Enum que representa o estado do evento `KeepAwake` (`active`, `deactivated`).

---

**Autor:** Manus AI
**Data de Geração:** 17 de Junho de 2025


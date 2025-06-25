# SQLite

Uma biblioteca que fornece acesso a um banco de dados que pode ser consultado através de uma API SQLite.

`expo-sqlite` dá ao seu aplicativo acesso a um banco de dados que pode ser consultado através de uma API SQLite. O banco de dados é persistido entre as reinicializações do seu aplicativo.

## Instalação

Para instalar a API SQLite, execute o seguinte comando no seu projeto Expo:

```bash
npx expo install expo-sqlite
```

Se você estiver instalando isso em um [aplicativo React Native existente](https://reactnative.dev/docs/integration-with-existing-apps), certifique-se de ter o `expo` instalado em seu projeto.

## Configuração no app config

Você pode configurar `expo-sqlite` para configurações avançadas usando seu [plugin de configuração](https://docs.expo.dev/guides/config-plugins/) integrado se você usar plugins de configuração em seu projeto ([EAS Build](https://docs.expo.dev/build/introduction/) ou `npx expo run:[android|ios]`). O plugin permite configurar várias propriedades que não podem ser definidas em tempo de execução e exigem a construção de um novo binário de aplicativo para entrar em vigor.

### Exemplo de app.json com config plugin

```json
{
  "expo": {
    "plugins": [
      [
        "expo-sqlite",
        {
          "enableFTS": true,
          "useSQLCipher": true,
          "android": {
            "enableFTS": false,
            "useSQLCipher": false
          },
          "ios": {
            "customBuildFlags": ["-DSQLITE_ENABLE_DBSTAT_VTAB=1 -DSQLITE_ENABLE_SNAPSHOT=1"]
          }
        }
      ]
    ]
  }
}
```

### Propriedades configuráveis

| Nome | Padrão | Descrição |
| --- | --- | --- |
| `customBuildFlags` | - | Flags de construção personalizadas a serem passadas para o processo de construção do SQLite. |
| `enableFTS` | `true` | Se as extensões [FTS3, FTS4](https://www.sqlite.org/fts3.html) e [FTS5](https://www.sqlite.org/fts5.html) devem ser habilitadas. |
| `useSQLCipher` | `false` | Usar as implementações [SQLCipher](https://www.zetetic.net/sqlcipher/) em vez do SQLite padrão. |

## Configuração Web

> O suporte web ainda é experimental e pode ser instável. [Crie um problema no GitHub](https://github.com/expo/expo/issues/new/choose) se encontrar algum problema.

Para usar `expo-sqlite` na web, você precisa configurar o bundler Metro para suportar arquivos wasm e adicionar cabeçalhos HTTP para permitir o uso de [`SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer).

Adicione a seguinte configuração ao seu `metro.config.js`. Se você ainda não tiver o `metro.config.js`, pode executar `npx expo customize metro.config.js`. [Saiba mais](https://docs.expo.dev/guides/customizing-metro/).

```javascript
/** @type {import("expo/metro-config").MetroConfig} */
const config = getDefaultConfig(__dirname);

// Adicionar suporte a ativos wasm
config.resolver.assetExts.push("wasm");

// Adicionar cabeçalhos COEP e COOP para suportar SharedArrayBuffer
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader("Cross-Origin-Embedder-Policy", "credentialless");
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    middleware(req, res, next);
  };
};

module.exports = config;
```

Se você implantar seu aplicativo em serviços de hospedagem web, também precisará adicionar os cabeçalhos `Cross-Origin-Embedder-Policy` e `Cross-Origin-Opener-Policy` ao seu servidor web. [Saiba mais sobre os cabeçalhos `COEP`, `COOP` e `SharedArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer#security_requirements).

## Uso

Importe o módulo de `expo-sqlite`.

```javascript
import * as SQLite from 'expo-sqlite';
```

### Operações CRUD básicas

```javascript
const db = await SQLite.openDatabaseAsync("databaseName");

await db.execAsync(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
  INSERT INTO test (value, intValue) VALUES ("test1", 123);
  INSERT INTO test (value, intValue) VALUES ("test2", 456);
  INSERT INTO test (value, intValue) VALUES ("test3", 789);
`);

const result = await db.runAsync("INSERT INTO test (value, intValue) VALUES (?, ?)", "aaa", 100);
console.log(result.lastInsertRowId, result.changes);

await db.runAsync("UPDATE test SET intValue = ? WHERE value = ?", 999, "aaa");
await db.runAsync("UPDATE test SET intValue = ? WHERE value = ?", [999, "aaa"]);
await db.runAsync("DELETE FROM test WHERE value = $value", { $value: "aaa" });

const firstRow = await db.getFirstAsync("SELECT * FROM test");
console.log(firstRow.id, firstRow.value, firstRow.intValue);

const allRows = await db.getAllAsync("SELECT * FROM test");
for (const row of allRows) {
  console.log(row.id, row.value, row.intValue);
}

for await (const row of db.getEachAsync("SELECT * FROM test")) {
  console.log(row.id, row.value, row.intValue);
}
```

### Declarações preparadas

Declarações preparadas permitem que você compile sua consulta SQL uma vez e a execute várias vezes com parâmetros diferentes. Você pode obter uma declaração preparada chamando o método [`prepareAsync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#prepareasyncsql-options) ou [`prepareSync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#preparesyncsql-options) em uma instância de banco de dados. A declaração preparada pode realizar operações CRUD chamando o método [`executeAsync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#executeasyncparams) ou [`executeSync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#executesyncparams).

> **Nota:** Lembre-se de chamar o método [`finalizeAsync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#finalizeasync) ou [`finalizeSync()`](https://docs.expo.dev/versions/latest/sdk/sqlite/#finalizesync) para liberar a declaração preparada depois de terminar de usá-la. O bloco `try-finally` é recomendado para garantir que a declaração preparada seja finalizada.

```javascript
const statement = await db.prepareAsync(
  "INSERT INTO test (value, intValue) VALUES ($value, $intValue)"
);
try {
  let result = await statement.executeAsync({ $value: "bbb", $intValue: 101 });
  console.log("bbb e 101:", result.lastInsertRowId, result.changes);

  result = await statement.executeAsync({ $value: "ccc", $intValue: 102 });
  console.log("ccc e 102:", result.lastInsertRowId, result.changes);
} finally {
  await statement.finalizeAsync();
}
```

### Usando o hook `useSQLiteContext()`

O hook `useSQLiteContext()` permite que você acesse a instância do banco de dados de qualquer componente filho do `SQLiteProvider`.

```javascript
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import { useEffect } from "react";
import { View, Text } from "react-native";

function MyComponent() {
  const db = useSQLiteContext();

  useEffect(() => {
    async function setup() {
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL);
      `);
      await db.runAsync("INSERT INTO users (name) VALUES (?)", "Alice");
      const allUsers = await db.getAllAsync("SELECT * FROM users");
      console.log("Usuários:", allUsers);
    }
    setup();
  }, []);

  return (
    <View>
      <Text>Componente usando SQLiteContext</Text>
    </View>
  );
}

export default function App() {
  return (
    <SQLiteProvider databaseName="myDatabase.db">
      <MyComponent />
    </SQLiteProvider>
  );
}
```

### Executando consultas dentro de uma transação assíncrona

```javascript
await db.with  TransactionAsync(async () => {
  await db.runAsync("INSERT INTO test (value, intValue) VALUES (?, ?)", "transacao1", 1);
  await db.runAsync("INSERT INTO test (value, intValue) VALUES (?, ?)", "transacao2", 2);
});
```

### Importar um banco de dados existente

Você pode importar um banco de dados SQLite existente para o seu aplicativo. Isso é útil para pré-popular seu aplicativo com dados.

```javascript
import * as FileSystem from "expo-file-system";
import * as SQLite from "expo-sqlite";

async function importDatabase() {
  const databaseName = "myPrepopulatedDatabase.db";
  const localUri = FileSystem.documentDirectory + "SQLite/" + databaseName;

  // Baixe o banco de dados de um servidor remoto ou copie de assets
  // Exemplo: await FileSystem.downloadAsync("http://example.com/myDatabase.db", localUri);

  const db = await SQLite.openDatabaseAsync(databaseName);
  console.log("Banco de dados importado com sucesso!");
}

importDatabase();
```

## API

```javascript
import * as SQLite from "expo-sqlite";
```

### Componente

#### `SQLiteProvider`

Um componente React que fornece um contexto SQLite para seus componentes filhos. Ele gerencia a abertura e o fechamento do banco de dados.

| Propriedade | Tipo | Descrição |
| --- | --- | --- |
| `databaseName` | `string` | O nome do arquivo do banco de dados. |
| `useSuspense` (opcional) | `boolean` | Se deve usar o React Suspense para o carregamento do banco de dados. Padrão: `false`. |

### Constantes

#### `SQLite.defaultDatabaseDirectory`

Tipo: `string`

O diretório padrão onde os bancos de dados SQLite são armazenados.

### Hooks

#### `useSQLiteContext()`

Retorna a instância do banco de dados SQLite do contexto. Deve ser usado dentro de um `SQLiteProvider`.

---

**Autor:** Manus AI
**Data de Geração:** 20 de Junho de 2025

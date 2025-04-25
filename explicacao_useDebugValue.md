# useDebugValue

## Introdução

O hook `useDebugValue` é uma ferramenta especializada do React que permite adicionar rótulos personalizados a hooks customizados quando visualizados no React DevTools. Este hook foi projetado especificamente para melhorar a experiência de depuração, tornando mais fácil identificar e entender o estado interno de hooks personalizados durante o desenvolvimento.

## Sintaxe Básica

```jsx
import { useDebugValue } from 'react';

function useHookPersonalizado() {
  // Lógica do hook...
  
  useDebugValue(valor);
  
  // Resto da lógica...
  return resultado;
}
```

## Propósito e Casos de Uso

### 1. Adicionar Rótulos a Hooks Personalizados

O principal propósito do `useDebugValue` é melhorar a experiência de depuração ao adicionar rótulos descritivos a hooks personalizados no React DevTools. Isso é particularmente útil quando:

- Você está criando bibliotecas de hooks para serem usadas por outros desenvolvedores
- Você tem hooks personalizados complexos com estados internos que não são óbvios
- Você precisa distinguir entre múltiplas instâncias do mesmo hook

```jsx
function useStatusOnline() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Adiciona um rótulo descritivo para o DevTools
  useDebugValue(isOnline ? 'Online' : 'Offline');
  
  return isOnline;
}
```

Quando um componente que usa este hook é inspecionado no React DevTools, em vez de mostrar apenas o valor booleano (`true` ou `false`), ele mostrará um rótulo mais descritivo como "Online" ou "Offline", tornando muito mais fácil entender o estado atual.

### 2. Formatação Adiada de Valores de Depuração

Para valores que exigem formatação complexa ou custosa, o `useDebugValue` aceita uma função de formatação como segundo parâmetro. Esta função só será chamada quando o componente for realmente inspecionado no DevTools, evitando o custo de formatação em cada renderização.

```jsx
function useDataFormatada() {
  const [data, setData] = useState(new Date());
  
  // A função de formatação só será chamada quando o componente for inspecionado
  useDebugValue(data, (data) => {
    return `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`;
  });
  
  return data;
}
```

Neste exemplo, a função de formatação que converte o objeto `Date` em uma string formatada só será executada quando o componente for inspecionado no DevTools, não em cada renderização.

## Parâmetros

O hook `useDebugValue` aceita dois parâmetros:

1. **value**: O valor que você deseja exibir no React DevTools. Pode ser de qualquer tipo.
2. **format** (opcional): Uma função de formatação. Quando o componente é inspecionado, o React DevTools chamará esta função com o `value` como argumento e exibirá o valor formatado retornado. Se não for especificada, o valor original será exibido.

## Exemplos Práticos

### Exemplo 1: Hook de Formulário com Estado de Validação

```jsx
function useFormField(initialValue = '', validationFn = () => true) {
  const [value, setValue] = useState(initialValue);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState('');
  
  const validate = (val) => {
    const result = validationFn(val);
    if (result === true) {
      setError('');
      return true;
    } else {
      setError(result);
      return false;
    }
  };
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (touched) {
      validate(newValue);
    }
  };
  
  const handleBlur = () => {
    setTouched(true);
    validate(value);
  };
  
  // Adiciona um rótulo descritivo para o DevTools
  useDebugValue({
    value,
    touched,
    error: error || 'válido',
    valid: !error
  }, (debug) => {
    return `${debug.value} (${debug.valid ? 'válido' : 'inválido'}: ${debug.error})`;
  });
  
  return {
    value,
    setValue,
    error,
    touched,
    handleChange,
    handleBlur,
    inputProps: {
      value,
      onChange: handleChange,
      onBlur: handleBlur
    }
  };
}

// Uso do hook
function FormularioContato() {
  const nome = useFormField('', (val) => val ? true : 'Nome é obrigatório');
  const email = useFormField('', (val) => {
    if (!val) return 'Email é obrigatório';
    if (!/\S+@\S+\.\S+/.test(val)) return 'Email inválido';
    return true;
  });
  
  // Resto do componente...
}
```

No React DevTools, você verá rótulos como:
- `"João (válido: válido)"`
- `"email@invalido (inválido: Email inválido)"`

### Exemplo 2: Hook de Fetch com Estado de Carregamento

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (e) {
        if (isMounted) {
          setError(e.message);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, [url]);
  
  // Estado para o DevTools
  const status = loading ? 'carregando' : error ? 'erro' : 'sucesso';
  
  useDebugValue({ url, status, error }, (debug) => {
    return `${debug.url} [${debug.status}]${debug.error ? ` - ${debug.error}` : ''}`;
  });
  
  return { data, loading, error };
}

// Uso do hook
function PerfilUsuario({ id }) {
  const { data, loading, error } = useFetch(`https://api.exemplo.com/usuarios/${id}`);
  
  // Resto do componente...
}
```

No React DevTools, você verá rótulos como:
- `"https://api.exemplo.com/usuarios/123 [carregando]"`
- `"https://api.exemplo.com/usuarios/123 [sucesso]"`
- `"https://api.exemplo.com/usuarios/123 [erro] - HTTP error! status: 404"`

### Exemplo 3: Hook de Tema com Formatação Personalizada

```jsx
function useTema() {
  const [modo, setModo] = useState('claro');
  const [corPrimaria, setCorPrimaria] = useState('#0066cc');
  const [corSecundaria, setCorSecundaria] = useState('#ff9900');
  
  const tema = useMemo(() => {
    return {
      modo,
      cores: {
        primaria: corPrimaria,
        secundaria: corSecundaria,
        texto: modo === 'claro' ? '#333333' : '#ffffff',
        fundo: modo === 'claro' ? '#ffffff' : '#333333'
      }
    };
  }, [modo, corPrimaria, corSecundaria]);
  
  const alternarModo = () => {
    setModo(modo === 'claro' ? 'escuro' : 'claro');
  };
  
  // Formatação personalizada para o DevTools
  useDebugValue(tema, (tema) => {
    return {
      modo: tema.modo,
      cores: Object.entries(tema.cores).map(([nome, valor]) => `${nome}: ${valor}`).join(', ')
    };
  });
  
  return {
    tema,
    alternarModo,
    setCorPrimaria,
    setCorSecundaria
  };
}
```

## Boas Práticas

### 1. Use com Moderação

A documentação oficial do React recomenda não adicionar valores de depuração a todos os hooks personalizados. O `useDebugValue` é mais valioso para:

- Hooks que fazem parte de bibliotecas compartilhadas
- Hooks com estruturas de dados internas complexas que são difíceis de inspecionar

```jsx
// ❌ Provavelmente desnecessário para hooks simples
function useContador() {
  const [contador, setContador] = useState(0);
  useDebugValue(contador); // Desnecessário, o valor já é facilmente visível
  return [contador, setContador];
}

// ✅ Útil para hooks complexos
function useEstadoComplexo() {
  // Lógica complexa com múltiplos estados internos
  useDebugValue(estadoFormatado); // Útil para entender o estado interno
  return api;
}
```

### 2. Forneça Rótulos Significativos

Os rótulos devem ser descritivos e fornecer informações que não são imediatamente óbvias apenas olhando para os valores brutos:

```jsx
// ❌ Não muito útil
useDebugValue(isValid); // Apenas mostra true/false

// ✅ Mais descritivo
useDebugValue(isValid ? 'Formulário válido' : `Formulário inválido: ${errorMessage}`);
```

### 3. Use a Formatação Adiada para Operações Caras

Se a formatação do valor de depuração for computacionalmente cara, use a função de formatação para adiar o cálculo:

```jsx
// ❌ Executa em cada renderização
useDebugValue(JSON.stringify(dadosComplexos));

// ✅ Só executa quando o componente é inspecionado
useDebugValue(dadosComplexos, (dados) => JSON.stringify(dados));
```

## Limitações e Considerações

### 1. Visível Apenas no React DevTools

Os valores de `useDebugValue` só são visíveis quando você está usando o React DevTools. Eles não afetam o comportamento do componente em produção e não são visíveis para os usuários finais.

### 2. Não Substitui o Logging Adequado

O `useDebugValue` não deve ser usado como substituto para um sistema de logging adequado. Ele é específico para depuração durante o desenvolvimento e não deve ser usado para rastrear problemas em produção.

### 3. Não Afeta o Comportamento do Componente

Adicionar ou remover chamadas de `useDebugValue` não afeta o comportamento do seu componente. É puramente para fins de depuração.

## Integração com Outras Ferramentas de Desenvolvimento

### 1. React DevTools

O `useDebugValue` foi projetado especificamente para trabalhar com o React DevTools. Para ver os valores de depuração:

1. Instale a extensão React DevTools para seu navegador
2. Abra as ferramentas de desenvolvedor do navegador
3. Navegue até a aba "Components" (ou "React")
4. Selecione um componente que use um hook personalizado com `useDebugValue`
5. Os valores de depuração aparecerão ao lado do nome do hook

### 2. Combinando com Outras Ferramentas de Depuração

O `useDebugValue` pode ser usado em conjunto com outras ferramentas de depuração:

```jsx
function useEstadoRastreado(initialState) {
  const [state, setState] = useState(initialState);
  
  // Para DevTools
  useDebugValue(state);
  
  // Para console logging
  useEffect(() => {
    console.log('Estado atualizado:', state);
  }, [state]);
  
  return [state, setState];
}
```

## Exemplos de Uso em Bibliotecas Populares

### React Query

A biblioteca React Query usa `useDebugValue` para mostrar o estado das queries no DevTools:

```jsx
// Simplificação da implementação do React Query
function useQuery(queryKey, queryFn, options) {
  // Lógica interna...
  
  useDebugValue({
    queryKey,
    status,
    data,
    error,
    isFetching
  });
  
  return { data, error, status, isFetching, /* ... */ };
}
```

### React Router

O React Router usa `useDebugValue` para mostrar informações sobre a rota atual:

```jsx
// Simplificação da implementação do React Router
function useLocation() {
  // Lógica interna...
  
  useDebugValue(location?.pathname || 'unknown');
  
  return location;
}
```

## Criando Hooks Personalizados com useDebugValue

Aqui está um exemplo mais completo de como criar um hook personalizado com `useDebugValue` integrado:

```jsx
import { useState, useEffect, useDebugValue } from 'react';

function useLocalStorage(key, initialValue) {
  // Estado para armazenar o valor
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Tenta obter do localStorage
      const item = window.localStorage.getItem(key);
      // Retorna o item parseado se existir, ou o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Erro ao recuperar ${key} do localStorage:`, error);
      return initialValue;
    }
  });
  
  // Função para atualizar o valor no estado e no localStorage
  const setValue = (value) => {
    try {
      // Permite que o valor seja uma função como no useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Salva no estado
      setStoredValue(valueToStore);
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error);
    }
  };
  
  // Sincroniza com mudanças em outras abas/janelas
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          setStoredValue(e.newValue ? JSON.parse(e.newValue) : initialValue);
        } catch (error) {
          console.error(`Erro ao processar mudança no localStorage para ${key}:`, error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, initialValue]);
  
  // Adiciona valor de depuração
  useDebugValue({ key, value: storedValue }, (debug) => {
    try {
      // Formata o valor para exibição
      const valuePreview = typeof debug.value === 'object' 
        ? `Objeto com ${Object.keys(debug.value).length} propriedades` 
        : String(debug.value).substring(0, 20);
      
      return `${debug.key}: ${valuePreview}${typeof debug.value === 'string' && debug.value.length > 20 ? '...' : ''}`;
    } catch (e) {
      return `${debug.key}: [Erro ao formatar]`;
    }
  });
  
  return [storedValue, setValue];
}

// Uso do hook
function ConfiguracoesUsuario() {
  const [preferencias, setPreferencias] = useLocalStorage('userPrefs', {
    tema: 'claro',
    notificacoes: true,
    idioma: 'pt-BR'
  });
  
  // Resto do componente...
}
```

## Conclusão

O hook `useDebugValue` é uma ferramenta especializada no arsenal do React, projetada para melhorar a experiência de depuração ao trabalhar com hooks personalizados. Embora não afete o comportamento do seu componente, ele pode tornar o processo de desenvolvimento significativamente mais fácil ao fornecer contexto adicional no React DevTools.

Lembre-se de usar `useDebugValue` com moderação, reservando-o para hooks complexos onde o valor adicional de depuração realmente ajuda a entender o estado interno. Quando usado adequadamente, ele pode ser uma ferramenta valiosa para desenvolvedores React, especialmente aqueles que criam e mantêm bibliotecas de hooks personalizados.

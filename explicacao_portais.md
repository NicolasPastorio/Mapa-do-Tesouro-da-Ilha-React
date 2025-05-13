# Portais no React

Os Portais são uma funcionalidade poderosa do React que permite renderizar elementos filhos em um nó DOM que existe fora da hierarquia DOM do componente pai. Eles oferecem uma solução elegante para cenários onde precisamos "escapar" da estrutura normal de aninhamento de componentes, mantendo ao mesmo tempo o modelo mental do React.

## O que são Portais?

Um Portal no React é uma forma de renderizar elementos filhos em um nó DOM que existe fora da hierarquia do componente pai. Em termos simples, os portais permitem que você "teletransporte" elementos React para qualquer lugar na árvore DOM, independentemente de onde o componente que os cria está localizado.

A API básica para criar um portal é:

```jsx
ReactDOM.createPortal(child, container);
```

Onde:
- `child`: Qualquer elemento React renderizável (elemento, string, fragmento, etc.)
- `container`: Um elemento DOM onde o conteúdo será renderizado

## Por que usar Portais?

Os portais resolvem problemas específicos de layout e estilização que são difíceis ou impossíveis de resolver com a estrutura de aninhamento padrão do React:

1. **Quebrar limitações de contexto visual**: Quando um componente pai tem estilos que limitam seus filhos (como `overflow: hidden`, `z-index`, ou posicionamento).

2. **Elementos de UI de nível superior**: Para componentes como modais, diálogos, tooltips e menus flutuantes que precisam aparecer "acima" de todo o resto da aplicação.

3. **Renderização em containers separados**: Quando você precisa renderizar conteúdo em uma parte completamente diferente da página.

## Exemplos Práticos de Portais

### 1. Modal Dialog

O caso de uso mais comum para portais é a criação de modais que aparecem acima de todo o conteúdo da página:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // Criamos um elemento div que será o container do portal
    this.modalRoot = document.getElementById('modal-root');
    // Se não existir, criamos o elemento
    if (!this.modalRoot) {
      this.modalRoot = document.createElement('div');
      this.modalRoot.id = 'modal-root';
      document.body.appendChild(this.modalRoot);
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="modal">
        <div className="modal-content">
          <button onClick={this.props.onClose}>Fechar</button>
          {this.props.children}
        </div>
      </div>,
      this.modalRoot
    );
  }
}

// Uso do componente Modal
function App() {
  const [showModal, setShowModal] = React.useState(false);
  
  return (
    <div className="app">
      <h1>Aplicação React</h1>
      <button onClick={() => setShowModal(true)}>
        Abrir Modal
      </button>
      
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <h2>Modal com Portal</h2>
          <p>Este conteúdo está sendo renderizado fora da hierarquia do componente App!</p>
        </Modal>
      )}
    </div>
  );
}
```

Neste exemplo, o conteúdo do modal é renderizado no elemento `#modal-root` que está fora da hierarquia DOM do componente `App`, evitando problemas com `z-index`, `overflow` ou outros estilos que poderiam afetar a visualização do modal.

### 2. Tooltips e Popovers

Portais são ideais para tooltips que precisam "flutuar" sobre outros elementos:

```jsx
import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

function Tooltip({ children, text }) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const targetRef = useRef(null);
  const tooltipRoot = document.getElementById('tooltip-root') || (() => {
    const root = document.createElement('div');
    root.id = 'tooltip-root';
    document.body.appendChild(root);
    return root;
  })();

  useEffect(() => {
    if (isVisible && targetRef.current) {
      const rect = targetRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 10,
        left: rect.left + window.scrollX + rect.width / 2
      });
    }
  }, [isVisible]);

  const tooltipContent = isVisible && ReactDOM.createPortal(
    <div 
      className="tooltip"
      style={{
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateX(-50%)',
        backgroundColor: 'black',
        color: 'white',
        padding: '5px 10px',
        borderRadius: '4px',
        zIndex: 1000
      }}
    >
      {text}
    </div>,
    tooltipRoot
  );

  return (
    <>
      <span
        ref={targetRef}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </span>
      {tooltipContent}
    </>
  );
}

// Uso
function App() {
  return (
    <div>
      <h1>Exemplo de Tooltip</h1>
      <p>
        Passe o mouse sobre <Tooltip text="Esta é uma dica útil!">este texto</Tooltip> para ver o tooltip.
      </p>
    </div>
  );
}
```

### 3. Notificações e Toasts

Portais são perfeitos para sistemas de notificação que aparecem em um canto da tela:

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

// Gerenciador de notificações
class NotificationManager extends React.Component {
  constructor(props) {
    super(props);
    this.notificationRoot = document.getElementById('notification-root');
    if (!this.notificationRoot) {
      this.notificationRoot = document.createElement('div');
      this.notificationRoot.id = 'notification-root';
      this.notificationRoot.style.position = 'fixed';
      this.notificationRoot.style.top = '20px';
      this.notificationRoot.style.right = '20px';
      this.notificationRoot.style.zIndex = '9999';
      document.body.appendChild(this.notificationRoot);
    }
  }

  render() {
    return ReactDOM.createPortal(
      <div className="notifications-container">
        {this.props.notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`notification notification-${notification.type}`}
            style={{
              padding: '10px 20px',
              marginBottom: '10px',
              backgroundColor: notification.type === 'success' ? '#4CAF50' : 
                              notification.type === 'error' ? '#F44336' : '#2196F3',
              color: 'white',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            <div className="notification-content">
              {notification.message}
            </div>
            <button 
              onClick={() => this.props.onDismiss(notification.id)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'white',
                marginLeft: '10px',
                cursor: 'pointer'
              }}
            >
              ×
            </button>
          </div>
        ))}
      </div>,
      this.notificationRoot
    );
  }
}

// Componente de aplicação com sistema de notificações
function App() {
  const [notifications, setNotifications] = React.useState([]);
  
  const addNotification = (type, message) => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, type, message }]);
    
    // Auto-remove após 5 segundos
    setTimeout(() => {
      dismissNotification(id);
    }, 5000);
  };
  
  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };
  
  return (
    <div className="app">
      <h1>Sistema de Notificações</h1>
      
      <button onClick={() => addNotification('info', 'Esta é uma informação')}>
        Mostrar Info
      </button>
      <button onClick={() => addNotification('success', 'Operação bem-sucedida!')}>
        Mostrar Sucesso
      </button>
      <button onClick={() => addNotification('error', 'Ocorreu um erro!')}>
        Mostrar Erro
      </button>
      
      <NotificationManager 
        notifications={notifications}
        onDismiss={dismissNotification}
      />
    </div>
  );
}
```

## Comportamento de Eventos nos Portais

Uma característica importante dos portais é que, embora o DOM renderizado esteja fora da hierarquia do componente pai, o comportamento de eventos segue a hierarquia de componentes React, não a hierarquia DOM.

Isso significa que os eventos disparados dentro de um portal irão propagar para os ancestrais no componente React, mesmo que esses elementos não sejam ancestrais no DOM real.

### Exemplo de Propagação de Eventos

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function PortalExample() {
  const [count, setCount] = React.useState(0);
  const containerRef = React.useRef(null);
  
  // Criamos um container para o portal se ele não existir
  if (!containerRef.current && typeof document !== 'undefined') {
    containerRef.current = document.createElement('div');
    document.body.appendChild(containerRef.current);
  }
  
  // Manipulador de clique que será acionado mesmo para cliques dentro do portal
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div onClick={handleClick} style={{ border: '2px solid blue', padding: '10px' }}>
      <p>Número de cliques: {count}</p>
      <p>Clique em qualquer lugar (incluindo o botão no portal) para incrementar.</p>
      
      {containerRef.current && ReactDOM.createPortal(
        <div style={{ 
          position: 'fixed', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          padding: '20px',
          backgroundColor: 'lightgray',
          border: '2px solid red'
        }}>
          <p>Este é um conteúdo em um portal.</p>
          <button>Clique aqui</button>
          <p>O clique neste botão será capturado pelo manipulador no componente pai!</p>
        </div>,
        containerRef.current
      )}
    </div>
  );
}
```

Neste exemplo, clicar no botão dentro do portal incrementará o contador, mesmo que o botão esteja renderizado fora da hierarquia DOM do componente pai. Isso ocorre porque o evento de clique se propaga através da hierarquia de componentes React, não da hierarquia DOM.

## Considerações de Acessibilidade

Ao usar portais, é importante considerar a acessibilidade:

1. **Foco do teclado**: Garanta que o foco do teclado seja gerenciado corretamente, especialmente para modais e diálogos.

2. **ARIA roles e atributos**: Adicione os atributos ARIA apropriados para garantir que leitores de tela compreendam a estrutura e o propósito do conteúdo do portal.

3. **Armadilha de foco (Focus trap)**: Para modais, implemente uma "armadilha de foco" para manter o foco dentro do modal enquanto ele estiver aberto.

```jsx
function AccessibleModal({ isOpen, onClose, children }) {
  const modalRef = React.useRef(null);
  const previousFocusRef = React.useRef(null);
  
  React.useEffect(() => {
    if (isOpen) {
      // Armazena o elemento atualmente focado
      previousFocusRef.current = document.activeElement;
      
      // Foca o modal quando aberto
      if (modalRef.current) {
        modalRef.current.focus();
      }
    } else if (previousFocusRef.current) {
      // Restaura o foco quando fechado
      previousFocusRef.current.focus();
    }
  }, [isOpen]);
  
  // Manipula a navegação por teclado dentro do modal
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return ReactDOM.createPortal(
    <div 
      role="dialog"
      aria-modal="true"
      tabIndex="-1"
      ref={modalRef}
      onKeyDown={handleKeyDown}
      className="modal-overlay"
    >
      <div className="modal-content">
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
}
```

## Portais com Hooks (React 16.8+)

Com a introdução dos Hooks, podemos criar portais de forma mais concisa em componentes funcionais:

```jsx
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

function usePortal(id) {
  const [portalContainer, setPortalContainer] = useState(null);
  
  useEffect(() => {
    // Procura um elemento existente ou cria um novo
    let element = document.getElementById(id);
    let created = false;
    
    // Se o elemento não existir, cria-o
    if (!element) {
      created = true;
      element = document.createElement('div');
      element.id = id;
      document.body.appendChild(element);
    }
    
    setPortalContainer(element);
    
    // Limpa o elemento se ele foi criado por este hook
    return () => {
      if (created && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [id]);
  
  // Retorna uma função para criar o portal
  return (children) => {
    return portalContainer ? createPortal(children, portalContainer) : null;
  };
}

// Uso do hook
function Modal({ isOpen, onClose, children }) {
  const createPortal = usePortal('modal-root');
  
  if (!isOpen) return null;
  
  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
        <button onClick={onClose}>Fechar</button>
      </div>
    </div>
  );
}
```

## Casos de Uso Avançados

### 1. Portais Condicionais

Às vezes, você pode querer renderizar conteúdo em um portal apenas em determinadas condições:

```jsx
function ConditionalPortal({ condition, container, children }) {
  return condition
    ? ReactDOM.createPortal(children, container)
    : children;
}

// Uso
function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div>
      <ConditionalPortal 
        condition={!isMobile} 
        container={document.getElementById('sidebar-root')}
      >
        <Sidebar />
      </ConditionalPortal>
    </div>
  );
}
```

### 2. Portais Aninhados

Você pode aninhar portais para criar estruturas complexas:

```jsx
function NestedPortals() {
  return (
    <div>
      {ReactDOM.createPortal(
        <div className="outer-portal">
          Conteúdo do portal externo
          {ReactDOM.createPortal(
            <div className="inner-portal">
              Conteúdo do portal interno
            </div>,
            document.getElementById('inner-portal-root')
          )}
        </div>,
        document.getElementById('outer-portal-root')
      )}
    </div>
  );
}
```

### 3. Portais Dinâmicos

Você pode criar portais dinamicamente para conteúdo que precisa ser renderizado em diferentes locais:

```jsx
function DynamicPortal({ targetId, children }) {
  const [container, setContainer] = useState(null);
  
  useEffect(() => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      setContainer(targetElement);
    }
    
    return () => setContainer(null);
  }, [targetId]);
  
  return container ? ReactDOM.createPortal(children, container) : null;
}

// Uso
function App() {
  const [portalTarget, setPortalTarget] = useState('target-a');
  
  return (
    <div>
      <button onClick={() => setPortalTarget('target-a')}>Renderizar em A</button>
      <button onClick={() => setPortalTarget('target-b')}>Renderizar em B</button>
      <button onClick={() => setPortalTarget('target-c')}>Renderizar em C</button>
      
      <div id="target-a" className="portal-target">Alvo A</div>
      <div id="target-b" className="portal-target">Alvo B</div>
      <div id="target-c" className="portal-target">Alvo C</div>
      
      <DynamicPortal targetId={por
(Content truncated due to size limit. Use line ranges to read in chunks)
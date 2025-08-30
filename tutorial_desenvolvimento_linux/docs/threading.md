# threading: Concorrência e Paralelismo em Python

O módulo `threading` em Python permite que você execute partes do seu código de forma concorrente, ou seja, múltiplas tarefas podem ser executadas 

aparentemente ao mesmo tempo. Isso é particularmente útil para aplicações que precisam realizar operações demoradas (como requisições de rede, acesso a disco ou cálculos complexos) sem bloquear a interface do usuário ou o fluxo principal do programa.

## 1. Threads vs. Processos

É importante distinguir entre threads e processos:

*   **Processos:** São instâncias independentes de um programa, cada uma com seu próprio espaço de memória e recursos. A comunicação entre processos é mais complexa (IPC - Inter-Process Communication).
*   **Threads:** São unidades de execução dentro de um mesmo processo. Elas compartilham o mesmo espaço de memória e recursos, o que facilita a comunicação, mas exige cuidado com o acesso a dados compartilhados para evitar condições de corrida.

Em Python, devido ao Global Interpreter Lock (GIL), o módulo `threading` não oferece paralelismo real para tarefas intensivas em CPU (ou seja, apenas uma thread Python pode executar código Python por vez). No entanto, ele ainda é extremamente útil para tarefas intensivas em I/O (entrada/saída), onde a thread pode liberar o GIL enquanto espera por operações de I/O (como leitura de arquivos ou requisições de rede).

## 2. Criando e Iniciando Threads

Existem duas maneiras principais de criar threads usando o módulo `threading`:

1.  **Passando uma função para o construtor `Thread`:** A maneira mais simples e comum.
2.  **Subclassificando `threading.Thread`:** Para cenários mais complexos, onde você precisa de mais controle sobre o ciclo de vida da thread.

### Exemplo 1: Usando uma Função

```python
import threading
import time

def tarefa(nome, duracao):
    print(f"Thread {nome}: Iniciando...")
    time.sleep(duracao)
    print(f"Thread {nome}: Concluída.")

print("\n--- Exemplo 1: Thread com Função ---")
# Cria as threads
thread1 = threading.Thread(target=tarefa, args=("Um", 2))
thread2 = threading.Thread(target=tarefa, args=("Dois", 3))

# Inicia as threads
thread1.start()
thread2.start()

# Espera as threads terminarem (opcional, mas boa prática)
thread1.join()
thread2.join()

print("Todas as threads concluídas.")
```

Neste exemplo, as duas threads `thread1` e `thread2` são iniciadas e executam a função `tarefa` de forma concorrente. A função `time.sleep()` simula uma operação demorada. `thread.join()` faz com que o programa principal espere a thread terminar antes de continuar.

### Exemplo 2: Subclassificando `threading.Thread`

```python
import threading
import time

class MinhaThread(threading.Thread):
    def __init__(self, nome, duracao):
        super().__init__()
        self.nome = nome
        self.duracao = duracao

    def run(self):
        print(f"Thread {self.nome}: Iniciando...")
        time.sleep(self.duracao)
        print(f"Thread {self.nome}: Concluída.")

print("\n--- Exemplo 2: Subclassificando Thread ---")
thread3 = MinhaThread("Três", 1)
thread4 = MinhaThread("Quatro", 4)

thread3.start()
thread4.start()

thread3.join()
thread4.join()

print("Todas as threads subclassificadas concluídas.")
```

Ao subclassificar `threading.Thread`, você sobrescreve o método `run()`, que é o ponto de entrada da thread quando ela é iniciada.

## 3. Sincronização de Threads: Evitando Condições de Corrida

Quando múltiplas threads acessam e modificam dados compartilhados, podem ocorrer *condições de corrida*, levando a resultados inesperados ou incorretos. O módulo `threading` fornece mecanismos de sincronização para evitar esses problemas.

### Locks (Cadeados)

Um `Lock` é o mecanismo de sincronização mais básico. Ele garante que apenas uma thread por vez possa acessar uma seção crítica do código.

```python
import threading
import time

contador = 0
lock = threading.Lock()

def incrementar():
    global contador
    for _ in range(100000):
        # Adquire o lock antes de acessar o contador
        lock.acquire()
        try:
            contador += 1
        finally:
            # Libera o lock, mesmo que ocorra um erro
            lock.release()

print("\n--- Exemplo 3: Sincronização com Lock ---")
threads = []
for i in range(5):
    thread = threading.Thread(target=incrementar)
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print(f"Valor final do contador: {contador}") # Deve ser 500000
```

Sem o `Lock`, o valor final do `contador` seria imprevisível e provavelmente menor que 500000 devido às condições de corrida. O `with lock:` é uma forma mais idiomática e segura de usar locks, pois garante que o lock seja liberado automaticamente.

### Semáforos

Um `Semaphore` é um contador que pode ser incrementado e decrementado. Ele é usado para controlar o acesso a um recurso limitado. Por exemplo, se você tem um pool de 5 conexões de banco de dados, um semáforo pode garantir que no máximo 5 threads acessem o pool simultaneamente.

```python
import threading
import time

sem = threading.Semaphore(3) # Permite 3 threads acessarem por vez

def worker(id):
    print(f"Worker {id}: Tentando adquirir semáforo...")
    sem.acquire()
    try:
        print(f"Worker {id}: Semáforo adquirido. Trabalhando...")
        time.sleep(2)
        print(f"Worker {id}: Trabalho concluído.")
    finally:
        sem.release()
        print(f"Worker {id}: Semáforo liberado.")

print("\n--- Exemplo 4: Semáforo ---")
threads = []
for i in range(10):
    thread = threading.Thread(target=worker, args=(i,))
    threads.append(thread)
    thread.start()

for thread in threads:
    thread.join()

print("Todos os workers concluídos.")
```

### Eventos

Um `Event` é uma forma simples de comunicação entre threads. Uma thread pode esperar por um evento, e outra thread pode sinalizar esse evento.

```python
import threading
import time

event = threading.Event()

def waiter():
    print("Waiter: Esperando pelo evento...")
    event.wait() # Bloqueia até o evento ser sinalizado
    print("Waiter: Evento sinalizado! Continuar...")

def signaler():
    time.sleep(3)
    print("Signaler: Sinalizando o evento...")
    event.set() # Sinaliza o evento

print("\n--- Exemplo 5: Evento ---")
thread_waiter = threading.Thread(target=waiter)
thread_signaler = threading.Thread(target=signaler)

thread_waiter.start()
thread_signaler.start()

thread_waiter.join()
thread_signaler.join()

print("Exemplo de evento concluído.")
```

## 4. Threads Daemon

Threads podem ser marcadas como *daemon*. Uma thread daemon é uma thread que é executada em segundo plano e é automaticamente encerrada quando o programa principal termina, mesmo que a thread daemon ainda esteja em execução. Isso é útil para tarefas de limpeza ou monitoramento que não precisam impedir o encerramento do programa.

```python
import threading
import time

def daemon_task():
    print("Daemon: Iniciando tarefa em segundo plano...")
    while True:
        print("Daemon: Ainda trabalhando...")
        time.sleep(1)

print("\n--- Exemplo 6: Thread Daemon ---")
daemon_thread = threading.Thread(target=daemon_task, daemon=True)
daemon_thread.start()

print("Programa principal: Fazendo algo por 3 segundos...")
time.sleep(3)
print("Programa principal: Encerrando.")
# A thread daemon será encerrada automaticamente aqui
```

Observe que você não precisa chamar `daemon_thread.join()` para threads daemon. Elas são encerradas automaticamente quando o programa principal termina.

## Conclusão

O módulo `threading` é uma ferramenta poderosa para adicionar concorrência às suas aplicações Python, tornando-as mais responsivas e eficientes, especialmente para tarefas intensivas em I/O. Embora o GIL limite o paralelismo real para tarefas intensivas em CPU, os mecanismos de sincronização como `Lock`, `Semaphore` e `Event` são essenciais para gerenciar o acesso a dados compartilhados e evitar condições de corrida. Dominar o `threading` é um passo importante para construir aplicações Python mais robustas e interativas.


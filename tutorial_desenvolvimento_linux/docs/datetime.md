# datetime: Manipulando Datas e Horas em Python

O módulo `datetime` da biblioteca padrão do Python fornece classes para trabalhar com datas e horas de forma eficiente e intuitiva. Ele oferece funcionalidades para representar datas, horas, datetimes (data e hora combinadas), intervalos de tempo e para realizar operações como formatação, análise (parsing), aritmética e comparação. É uma ferramenta essencial para qualquer aplicação que precise lidar com informações temporais.

## 1. Classes Principais do `datetime`

O módulo `datetime` define as seguintes classes principais:

*   `date`: Representa uma data (ano, mês, dia).
*   `time`: Representa uma hora (hora, minuto, segundo, microssegundo).
*   `datetime`: Representa uma combinação de data e hora.
*   `timedelta`: Representa a diferença entre duas datas, horas ou datetimes.
*   `tzinfo`: Uma classe abstrata para informações de fuso horário.

## 2. A Classe `date`

A classe `date` representa uma data (ano, mês, dia). Os argumentos devem ser inteiros.

```python
from datetime import date

print("\n--- Exemplo 1: Classe date ---")

# Data atual
hoje = date.today()
print(f"Data de hoje: {hoje}")

# Criar uma data específica
data_especifica = date(2023, 12, 25)
print(f"Data específica: {data_especifica}")

# Acessar componentes da data
print(f"Ano: {data_especifica.year}")
print(f"Mês: {data_especifica.month}")
print(f"Dia: {data_especifica.day}")

# Dia da semana (0=Segunda, 6=Domingo)
print(f"Dia da semana (weekday): {hoje.weekday()}")
print(f"Dia da semana (isoweekday, 1=Segunda, 7=Domingo): {hoje.isoweekday()}")

# Formatar data para string
print(f"Data formatada (DD/MM/AAAA): {hoje.strftime("%d/%m/%Y")}")
```

## 3. A Classe `time`

A classe `time` representa uma hora do dia (hora, minuto, segundo, microssegundo). Os argumentos devem ser inteiros.

```python
from datetime import time

print("\n--- Exemplo 2: Classe time ---")

# Criar uma hora específica
hora_especifica = time(14, 30, 45, 123456) # Hora, Minuto, Segundo, Microssegundo
print(f"Hora específica: {hora_especifica}")

# Acessar componentes da hora
print(f"Hora: {hora_especifica.hour}")
print(f"Minuto: {hora_especifica.minute}")
print(f"Segundo: {hora_especifica.second}")
print(f"Microssegundo: {hora_especifica.microsecond}")

# Formatar hora para string
print(f"Hora formatada (HH:MM:SS): {hora_especifica.strftime("%H:%M:%S")}")
```

## 4. A Classe `datetime`

A classe `datetime` combina `date` e `time`, representando um ponto específico no tempo. É a classe mais comumente usada para lidar com datas e horas.

```python
from datetime import datetime

print("\n--- Exemplo 3: Classe datetime ---")

# Datetime atual
agora = datetime.now()
print(f"Datetime atual: {agora}")

# Datetime UTC atual
agora_utc = datetime.utcnow()
print(f"Datetime UTC atual: {agora_utc}")

# Criar um datetime específico
data_hora_especifica = datetime(2023, 12, 25, 10, 30, 0)
print(f"Datetime específica: {data_hora_especifica}")

# Acessar componentes
print(f"Ano: {data_hora_especifica.year}, Hora: {data_hora_especifica.hour}")

# Formatar datetime para string
print(f"Datetime formatada: {agora.strftime("%d/%m/%Y %H:%M:%S")}")

# Converter string para datetime (parsing)
data_str = "2024-01-15 14:00:00"
data_obj = datetime.strptime(data_str, "%Y-%m-%d %H:%M:%S")
print(f"String convertida para datetime: {data_obj}")
```

**Códigos de Formatação Comuns para `strftime` e `strptime`:**

| Código | Descrição                               | Exemplo           |
| :----- | :-------------------------------------- | :---------------- |
| `%Y`   | Ano com século (e.g., 2023)             | 2023              |
| `%m`   | Mês como número (01-12)                 | 12                |
| `%d`   | Dia do mês (01-31)                      | 25                |
| `%H`   | Hora (24 horas, 00-23)                  | 14                |
| `%M`   | Minuto (00-59)                          | 30                |
| `%S`   | Segundo (00-59)                         | 45                |
| `%f`   | Microssegundo (000000-999999)           | 123456            |
| `%A`   | Nome completo do dia da semana          | Monday            |
| `%a`   | Nome abreviado do dia da semana         | Mon               |
| `%B`   | Nome completo do mês                    | December          |
| `%b`   | Nome abreviado do mês                   | Dec               |
| `%j`   | Dia do ano (001-366)                    | 359               |
| `%w`   | Dia da semana (0 como domingo)          | 0                 |
| `%U`   | Número da semana do ano (domingo como 1º dia) | 51                |
| `%W`   | Número da semana do ano (segunda como 1º dia) | 51                |
| `%x`   | Representação de data local             | 12/25/23          |
| `%X`   | Representação de hora local             | 14:30:45          |
| `%c`   | Representação de data e hora local      | Mon Dec 25 14:30:45 2023 |

## 5. A Classe `timedelta`

A classe `timedelta` representa uma duração, a diferença entre dois objetos `date`, `time` ou `datetime`. É útil para realizar aritmética de datas e horas.

```python
from datetime import datetime, timedelta

print("\n--- Exemplo 4: Classe timedelta ---")

# Criar um timedelta
diferenca = timedelta(days=7, hours=3, minutes=15)
print(f"Diferença de tempo: {diferenca}")

# Adicionar/Subtrair timedelta de um datetime
agora = datetime.now()
proxima_semana = agora + diferenca
ultima_semana = agora - diferenca

print(f"Agora: {agora.strftime("%Y-%m-%d %H:%M:%S")}")
print(f"Próxima semana: {proxima_semana.strftime("%Y-%m-%d %H:%M:%S")}")
print(f"Última semana: {ultima_semana.strftime("%Y-%m-%d %H:%M:%S")}")

# Calcular a diferença entre dois datetimes
data1 = datetime(2023, 1, 1, 10, 0, 0)
data2 = datetime(2023, 1, 5, 15, 30, 0)

diff = data2 - data1
print(f"Diferença entre datas: {diff}")
print(f"Total de segundos na diferença: {diff.total_seconds()}")
print(f"Dias na diferença: {diff.days}")
```

## 6. Fusos Horários (Timezones)

Lidar com fusos horários pode ser complexo. O módulo `datetime` suporta objetos `datetime` *aware* (com fuso horário) e *naive* (sem fuso horário). Para trabalhar com fusos horários de forma robusta, é altamente recomendável usar a biblioteca de terceiros `pytz` ou o módulo `zoneinfo` (disponível a partir do Python 3.9).

### Exemplo (com `pytz` - instalação via `pip install pytz`)

```python
# import pytz
# from datetime import datetime

# print("\n--- Exemplo 5: Fusos Horários com pytz (requer instalação) ---")

# # Definir um fuso horário
# fuso_sp = pytz.timezone("America/Sao_Paulo")

# # Criar um datetime aware
# agora_sp = fuso_sp.localize(datetime.now())
# print(f"Agora em São Paulo: {agora_sp}")

# # Converter para outro fuso horário
# fuso_ny = pytz.timezone("America/New_York")
# agora_ny = agora_sp.astimezone(fuso_ny)
# print(f"Agora em Nova York: {agora_ny}")
```

## Conclusão

O módulo `datetime` é uma parte fundamental da biblioteca padrão do Python para qualquer tarefa que envolva datas e horas. Desde a representação simples de datas e horas até a realização de aritmética temporal e formatação complexa, ele oferece um conjunto abrangente de ferramentas. Embora fusos horários possam exigir bibliotecas adicionais para um tratamento completo, as classes `date`, `time`, `datetime` e `timedelta` são indispensáveis para gerenciar informações temporais em suas aplicações Python.


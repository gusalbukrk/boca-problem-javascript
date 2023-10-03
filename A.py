import math

# Lê o número de voltas pretendidas e o número de placas na pista
V, N = map(int, input().split())

# Inicializa uma lista para armazenar as respostas
respostas = []

# Calcula o comprimento total da pista
comprimento_total = V * N

# Calcula o número de placas necessário para cada porcentagem desejada
for porcentagem in range(10, 100, 10):
    placas_necessarias = (porcentagem / 100) * comprimento_total
    respostas.append(math.ceil(placas_necessarias))

# Imprime as respostas
print(*respostas)

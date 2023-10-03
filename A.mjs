import { input, close } from './input.mjs';

const [V, N] = (await input()).split(' ').map(Number);

// Inicializa uma lista para armazenar as respostas
const respostas = [];

// Calcula o comprimento total da pista
const comprimento_total = V * N;

// Calcula o número de placas necessário para cada porcentagem desejada
for (let porcentagem = 10; porcentagem <= 90; porcentagem += 10) {
const placas_necessarias = (porcentagem / 100) * comprimento_total;
respostas.push(Math.ceil(placas_necessarias));
}

// Imprime as respostas
console.log(...respostas);

close();

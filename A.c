#include <stdio.h>
#include <math.h>

int main() {
    int V, N;
    scanf("%d %d", &V, &N);

    int respostas[9];
    int comprimento_total = V * N;

    for (int porcentagem = 10; porcentagem <= 90; porcentagem += 10) {
        double placas_necessarias = (porcentagem / 100.0) * comprimento_total;
        respostas[(porcentagem / 10) - 1] = (int)ceil(placas_necessarias);
    }

    for (int i = 0; i < 9; i++) {
        printf("%d", respostas[i]);

        if (i != 8) printf(" ");
    }
    printf("\n");

    return 0;
}

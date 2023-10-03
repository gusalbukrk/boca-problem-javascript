import java.util.Scanner;

public class ProblemaA {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int V = scanner.nextInt();
        int N = scanner.nextInt();

        int[] respostas = new int[9];
        int comprimentoTotal = V * N;

        for (int porcentagem = 10; porcentagem <= 90; porcentagem += 10) {
            double placasNecessarias = (porcentagem / 100.0) * comprimentoTotal;
            respostas[(porcentagem / 10) - 1] = (int)Math.ceil(placasNecessarias);
        }

        for (int i = 0; i < 9; i++) {
            System.out.print(respostas[i]);

            if (i != 8) {
                System.out.print(" ");
            }
        }
        System.out.println();
    }
}

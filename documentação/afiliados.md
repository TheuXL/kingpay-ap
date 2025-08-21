### Módulo: Affiliates (Afiliados)

A funcionalidade de afiliados permite que um usuário obtenha seu código de afiliação, visualize relatórios de desempenho e solicite o saque de suas comissões. Todas as requisições neste módulo exigem autenticação via `Bearer Token`.

#### 1. Obter Código de Afiliado

*   **Endpoint:** `GET /functions/v1/affiliates/code`
*   **Nome na Coleção:** "Logs" *(Atenção: o nome na coleção parece estar incorreto, mas o endpoint é o correto para esta função)*.
*   **Objetivo:** Retorna o código de afiliação único do usuário autenticado. Este é o código que ele compartilhará para registrar novas indicações.
*   **Autenticação:**
    *   `Authorization: Bearer {{access_token}}`
*   **Corpo da Requisição (Body):**
    *   Não é necessário (requisição `GET`).

#### 2. Obter Relatório de Afiliado

*   **Endpoint:** `GET /functions/v1/affiliates/report`
*   **Nome na Coleção:** "Reports"
*   **Objetivo:** Busca os dados de desempenho do afiliado, como número de indicados, comissões geradas, etc., para exibir em um dashboard ou relatório.
*   **Autenticação:**
    *   `Authorization: Bearer {{access_token}}`
*   **Corpo da Requisição (Body):**
    *   Não é necessário (requisição `GET`).

#### 3. Solicitar Saque de Comissão

*   **Endpoint:** `POST /functions/v1/affiliates/withdraw`
*   **Nome na Coleção:** "Swap"
*   **Objetivo:** Permite que o afiliado solicite a retirada (saque) do saldo de comissão acumulado para sua carteira principal dentro da plataforma.
*   **Autenticação:**
    *   `Authorization: Bearer {{access_token}}`
*   **Corpo da Requisição (Body):**
    *   A requisição deve enviar um objeto JSON contendo o valor a ser sacado.
    ```json
    {
      "amount_cents": 5000
    }
    ```
    *   **`amount_cents`** (obrigatório): O valor da comissão que o afiliado deseja sacar, expresso em **centavos**. No exemplo, `5000` representa R$ 50,00.

Em resumo, o fluxo para um afiliado é:
1.  Obter seu código com `GET /affiliates/code`.
2.  Acompanhar seu desempenho com `GET /affiliates/report`.
3.  Quando tiver saldo, solicitar o saque da comissão para sua carteira com `POST /affiliates/withdraw`.
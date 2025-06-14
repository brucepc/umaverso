# Detalhamento dos Módulos: Categorias, Produtos, Compras e Produção

Este documento aprofunda o planejamento das funcionalidades e entidades para os módulos de gestão de Categorias, Produtos, Compras e Produção.

## Fluxo de Trabalho Integrado

O fluxo de trabalho que conecta estes módulos é o seguinte:
1.  **Cadastro de Categorias:** As categorias de produtos são definidas, incluindo um prefixo para a geração de SKU.
2.  **Cadastro de Produtos:** Matérias-primas e produtos acabados são cadastrados no sistema, associados a uma categoria.
3.  **Gestão de Compras:** As matérias-primas são adquiridas através de Pedidos de Compra. O recebimento da mercadoria atualiza o estoque.
4.  **Gestão de Produção:** Ordens de Produção são criadas. Elas consomem matérias-primas do estoque e, ao serem finalizadas, adicionam produtos acabados ao estoque.

---

## 1. Módulo de Categorias

As categorias ajudam a organizar os produtos e a padronizar a geração de códigos SKU.

### 1.1. Entidade: Categoria

**Atributos Essenciais:**

*   `id`: Identificador único (gerado pelo sistema).
*   `name`: Nome da categoria (ex: "Chapas Metálicas", "Parafusos").
*   `prefix`: Um código curto (ex: "CHM", "PAR") usado para gerar o SKU dos produtos pertencentes a esta categoria.

---

## 2. Módulo de Produtos (Detalhado)

Para suportar os processos de compra e produção, a entidade "Produto" precisa de mais detalhes.

### 2.1. Entidade: Produto

**Atributos Essenciais:**

*   `id`: Identificador único (gerado pelo sistema).
*   `categoryId`: Referência à categoria do produto.
*   `name`: Nome/Descrição do produto (ex: "Chapa de Aço Inox 1mm").
*   `sku`: Código único (SKU - Stock Keeping Unit) (ex: "CHM-001"). Gerado a partir do prefixo da categoria.
*   `productType`: **Campo Crítico**. Define o comportamento do produto no sistema.
    *   `MATERIA_PRIMA`: Item comprado e consumido na produção.
    *   `PRODUTO_ACABADO`: Item fabricado e vendido.
    *   `REVENDA`: Item comprado e revendido diretamente (sem produção).
*   `unitOfMeasure`: (ex: "Peça", "Kg", "Metro", "Chapa").
*   `currentStock`: Quantidade disponível (gerenciado pelo sistema).
*   `averageCost`: Custo do produto (calculado a cada entrada).
*   `salePrice`: Preço para o cliente final (aplicável a `PRODUTO_ACABADO` e `REVENDA`).
*   `isActive`: Controla se o produto pode ser usado em novas transações (padrão `true`).

**Regras de Negócio:**
*   O `sku` de um novo produto deve ser gerado combinando o `prefix` da sua categoria com um número sequencial.
*   Um produto do tipo `MATERIA_PRIMA` não pode ser vendido diretamente.
*   Um produto do tipo `PRODUTO_ACABADO` não pode ser comprado diretamente (sua entrada em estoque vem da produção).
*   O `averageCost` deve ser recalculado sempre que houver uma entrada de estoque com custo diferente (seja por compra ou produção).

---

## 3. Módulo de Compras (Detalhado)

### 3.1. Entidade: Pedido de Compra

**Atributos:**
*   `id`: Identificador único.
*   `fornecedor_id`: Referência ao fornecedor cadastrado.
*   `data_emissao`: Data de criação do pedido.
*   `status`: (ex: "Aberto", "Aprovado", "Recebido", "Cancelado").
*   `itens`: Lista de itens do pedido.
    *   `produto_id`: Referência ao produto.
    *   `quantidade`: Quantidade a ser comprada.
    *   `custo_unitario`: Custo negociado com o fornecedor.
*   `valor_total`: Soma dos custos dos itens.

**Processo Chave: Recebimento de Mercadoria**
*   **Gatilho:** Usuário executa a função "Receber Mercadoria" em um Pedido de Compra `Aprovado`.
*   **Ações:**
    1.  O `status` do Pedido de Compra muda para `Recebido`.
    2.  Para cada item no pedido:
        *   O `estoque_atual` do produto é **incrementado**.
        *   O `custo_medio` do produto é **recalculado**.
    3.  Uma `Conta a Pagar` é gerada no módulo Financeiro no valor total do pedido.

---

## 4. Módulo de Produção (Detalhado)

### 4.1. Entidade: Ficha Técnica (Bill of Materials - BOM)

Esta entidade é um "molde" ou "receita".

**Atributos:**
*   `id`: Identificador único.
*   `produto_acabado_id`: Referência ao produto que esta ficha técnica produz.
*   `componentes`: Lista de matérias-primas necessárias.
    *   `materia_prima_id`: Referência ao produto (tipo `MATERIA_PRIMA`).
    *   `quantidade`: Quantidade da matéria-prima necessária para produzir **uma unidade** do produto acabado.

### 4.2. Entidade: Ordem de Produção (OP)

**Atributos:**
*   `id`: Identificador único.
*   `produto_acabado_id`: Referência ao produto que será fabricado.
*   `quantidade_a_produzir`: Quantidade desejada do produto acabado.
*   `data_inicio`: Data de início da produção.
*   `status`: (ex: "Pendente", "Em Produção", "Finalizada", "Cancelada").
*   `custo_total_producao`: Custo total das matérias-primas consumidas.

**Processo Chave: Iniciar e Finalizar Ordem de Produção**
*   **Ao Iniciar a OP:**
    1.  O sistema verifica se há estoque de **todas** as matérias-primas necessárias (consultando a Ficha Técnica e a `quantidade_a_produzir`).
    2.  Se houver estoque, o `status` da OP muda para `Em Produção`.
    3.  O `estoque_atual` de cada matéria-prima é **decrementado**.
    4.  O `custo_total_producao` é calculado.
*   **Ao Finalizar a OP:**
    1.  O `status` da OP muda para `Finalizada`.
    2.  O `estoque_atual` do `PRODUTO_ACABADO` é **incrementado** pela `quantidade_a_produzir`.
    3.  O `custo_medio` do `PRODUTO_ACABADO` é **recalculado** com base no `custo_total_producao` dividido pela quantidade produzida.

---

## 5. Estrutura de Dados no Firestore

Para persistir os dados da aplicação, utilizaremos o Cloud Firestore, um banco de dados NoSQL baseado em documentos. A estrutura seguirá o modelo de coleções e documentos.

### 5.1. Coleção: `categories`

Armazena as categorias de produtos.

**Exemplo de Documento em `/categories/{categoryId}`:**

```json
{
  "name": "Chapas Metálicas",
  "prefix": "CHM"
}
```

### 5.2. Coleção: `products`

Esta será a coleção principal para armazenar todos os produtos, sejam eles matéria-prima, produtos acabados ou para revenda.

**Exemplo de Documento em `/products/{productId}`:**

```json
{
  "name": "Chapa de Aço Inox 1mm",
  "sku": "CHM-001",
  "categoryId": "xyz123abc",
  "productType": "MATERIA_PRIMA",
  "unitOfMeasure": "PECA",
  "currentStock": 150,
  "averageCost": 25.50,
  "salePrice": null,
  "isActive": true
}
```

*   `{productId}` será um ID único gerado automaticamente pelo Firestore.
*   Não armazenaremos o `id` dentro do documento, pois o próprio ID do documento já serve como nosso identificador único.

### 5.3. Coleções Futuras (Planejamento)

*   **`categories`**: Para as categorias de produto.
*   **`suppliers`**: Para os fornecedores.
*   **`customers`**: Para os clientes.
*   **`purchaseOrders`**: Para os pedidos de compra. A referência ao fornecedor e aos produtos será feita armazenando seus respectivos IDs.
*   **`productionOrders`**: Para as ordens de produção. 
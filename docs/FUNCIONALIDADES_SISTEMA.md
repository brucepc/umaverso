# Planeamento de Funcionalidades do ERP

Este documento detalha as funções que o utilizador poderá executar em cada módulo do sistema.

## Módulo 1: Registos Essenciais

É o módulo onde os dados base que alimentam o resto do sistema são geridos.

### 1.1. Gestão de Produtos
- **[x] Registar um novo produto:** Registar um item que a empresa vende, informando nome, código, preço de venda e unidade de medida.
- **[x] Editar um produto existente:** Corrigir ou atualizar informações de um produto já registado.
- **[x] Consultar/Listar produtos:** Ver a lista de todos os produtos registados com os seus principais detalhes.
- **[x] Inativar um produto:** Marcar um produto que já não é vendido para que não apareça em novas vendas (sem o excluir, para manter o histórico).

### 1.2. Gestão de Clientes
- **[x] Registar um novo cliente:** Registar as informações de um cliente (Nome, NIF/NIPC, contacto, morada).
- **[x] Editar um cliente existente:** Atualizar os dados de um cliente.
- **[x] Consultar/Listar clientes:** Ver a lista de todos os clientes da empresa.
- **[ ] Inativar um cliente:** Marcar um cliente que já não efetua compras.

### 1.3. Gestão de Fornecedores
- **[x] Registar um novo fornecedor:** Registar as informações de um fornecedor (Nome, NIF/NIPC, contacto, morada).
- **[x] Editar um fornecedor existente:** Atualizar os dados de um fornecedor.
- **[x] Consultar/Listar fornecedores:** Ver a lista de todos os fornecedores da empresa.

## Módulo 2: Vendas

O coração da operação comercial.

- **[x] Criar uma nova Nota de Encomenda:** Iniciar uma nova venda para um cliente, selecionando os produtos e as quantidades.
- **[x] Calcular totais automaticamente:** O sistema deve somar os valores dos itens e mostrar o total da encomenda em tempo real.
- **[x] Finalizar (Faturar) a Nota de Encomenda:** Concluir a venda. Esta ação é o gatilho para as etapas seguintes (stock e financeiro).
- **[ ] Cancelar uma Nota de Encomenda:** Desistir de uma venda que ainda não foi finalizada.
- **[x] Consultar/Listar Notas de Encomenda:** Ver o histórico de vendas, com filtros por cliente ou período.

## Módulo 3: Stock

O controlo dos bens da empresa.

- **[x] Registar saída de stock por venda (Automático):** Ao finalizar uma venda, o sistema deve abater a quantidade vendida do stock dos produtos.
- **[x] Consultar saldo de stock:** Verificar a quantidade disponível de um produto específico.
- **[x] Registar entrada em stock (Ajuste Manual):** Adicionar itens ao stock manualmente, seja por uma compra ou ajuste de inventário.
- **[x] Ver o histórico de movimentos:** Rastrear todas as entradas e saídas de um produto para entender o fluxo.

## Módulo 4: Financeiro (Contas a Receber e a Pagar)

O controlo do fluxo de caixa da empresa.

### 4.1. Contas a Receber
- **[x] Gerar conta a receber por venda (Automático):** Ao finalizar uma venda, o sistema deve criar um registo de conta a receber para o cliente no valor da venda.
- **[x] Registar o recebimento (liquidação) da conta:** Marcar uma conta como "paga" quando o cliente efetuar o pagamento.
- **[x] Consultar/Listar contas a receber:** Ver todas as contas que estão em aberto, filtrando por cliente ou data de vencimento.
- **[ ] Ver o extrato financeiro de um cliente:** Listar todas as cobranças e pagamentos de um cliente específico.

### 4.2. Contas a Pagar
- **[x] Gerar conta a pagar por compra (Automático):** Ao receber uma compra, o sistema deve criar um registo de conta a pagar ao fornecedor.
- **[x] Registar o pagamento (liquidação) da conta:** Marcar uma conta como "paga" quando a empresa efetuar o pagamento.
- **[x] Consultar/Listar contas a pagar:** Ver todas as contas que a empresa precisa pagar, filtrando por fornecedor ou data de vencimento.

## Módulo 5: Compras

O processo de aquisição de mercadorias e matéria-prima.

- **[x] Registar uma Ordem de Compra:** Registar uma intenção de compra a um fornecedor, listando produtos e preços.
- **[ ] Aprovar uma Ordem de Compra:** Realizar a aprovação necessária para efetivar a compra.
- **[x] Registar Receção de Mercadoria:** Confirmar que os produtos de uma ordem de compra chegaram. Esta ação despoleta a entrada em stock e a geração da conta a pagar.
- **[x] Consultar/Listar Ordens de Compra:** Ver o histórico de compras.

## Módulo 6: Produção (PCP)

Para empresas que fabricam os próprios produtos.

- **[x] Gerir Ficha Técnica (Lista de Materiais / Bill of Materials - BOM):** Definir que matérias-primas e em que quantidade são necessárias para produzir um determinado produto acabado.
- **[x] Criar Ordem de Produção:** Iniciar o processo de fabricação de um produto, com base em uma necessidade de venda ou para reposição de stock.
- **[x] Realizar abate de matéria-prima (Automático):** Ao iniciar uma ordem de produção, o sistema deve abater do stock as matérias-primas listadas na Ficha Técnica.
- **[x] Registar produto acabado (Entrada em Stock):** Ao finalizar uma ordem de produção, o sistema deve adicionar o produto fabricado ao stock de produtos acabados.
- **[x] Consultar/Listar Ordens de Produção:** Acompanhar o status de todas as ordens de produção (Ex: "Pendente", "Em Andamento", "Concluída"). 
# Planejamento de Funcionalidades do ERP

Este documento detalha as funções que o usuário poderá executar em cada módulo do sistema.

## Módulo 1: Cadastros Essenciais

É o módulo onde os dados básicos que alimentam o resto do sistema são gerenciados.

### 1.1. Gestão de Produtos
- **[ ] Cadastrar um novo produto:** Registrar um item que a empresa vende, informando nome, código, preço de venda e unidade de medida.
- **[ ] Editar um produto existente:** Corrigir ou atualizar informações de um produto já cadastrado.
- **[ ] Consultar/Listar produtos:** Ver a lista de todos os produtos cadastrados com seus principais detalhes.
- **[ ] Inativar um produto:** Marcar um produto que não é mais vendido para que não apareça em novas vendas (sem excluí-lo, para manter o histórico).

### 1.2. Gestão de Clientes
- **[ ] Cadastrar um novo cliente:** Registrar as informações de um cliente (Nome, CPF/CNPJ, contato, endereço).
- **[ ] Editar um cliente existente:** Atualizar os dados de um cliente.
- **[ ] Consultar/Listar clientes:** Ver a lista de todos os clientes da empresa.
- **[ ] Inativar um cliente:** Marcar um cliente que não compra mais.

### 1.3. Gestão de Fornecedores
- **[ ] Cadastrar um novo fornecedor:** Registrar as informações de um fornecedor (Razão Social, CNPJ, contato, endereço).
- **[ ] Editar um fornecedor existente:** Atualizar os dados de um fornecedor.
- **[ ] Consultar/Listar fornecedores:** Ver a lista de todos os fornecedores da empresa.

## Módulo 2: Vendas

O coração da operação comercial.

- **[ ] Criar um novo Pedido de Venda:** Iniciar uma nova venda para um cliente, selecionando os produtos e as quantidades.
- **[ ] Calcular totais automaticamente:** O sistema deve somar os valores dos itens e mostrar o total do pedido em tempo real.
- **[ ] Finalizar (Faturar) o Pedido de Venda:** Concluir a venda. Esta ação é o gatilho para as próximas etapas (estoque e financeiro).
- **[ ] Cancelar um Pedido de Venda:** Desistir de uma venda que ainda não foi finalizada.
- **[ ] Consultar/Listar Pedidos de Venda:** Ver o histórico de vendas, com filtros por cliente ou período.

## Módulo 3: Estoque

O controle dos bens da empresa.

- **[ ] Registrar baixa de estoque por venda (Automático):** Ao finalizar uma venda, o sistema deve dar baixa na quantidade vendida do estoque dos produtos.
- **[ ] Consultar saldo de estoque:** Verificar a quantidade disponível de um produto específico.
- **[ ] Registrar entrada de estoque (Ajuste Manual):** Adicionar itens ao estoque manualmente, seja por uma compra ou ajuste de inventário.
- **[ ] Ver o histórico de movimentações:** Rastrear todas as entradas e saídas de um produto para entender o fluxo.

## Módulo 4: Financeiro (Contas a Receber e a Pagar)

O controle do fluxo de caixa da empresa.

### 4.1. Contas a Receber
- **[ ] Gerar conta a receber por venda (Automático):** Ao finalizar uma venda, o sistema deve criar um registro de conta a receber para o cliente no valor da venda.
- **[ ] Registrar o recebimento (baixa) da conta:** Marcar uma conta como "paga" quando o cliente efetuar o pagamento.
- **[ ] Consultar/Listar contas a receber:** Ver todas as contas que estão em aberto, filtrando por cliente ou data de vencimento.
- **[ ] Ver o extrato financeiro de um cliente:** Listar todas as cobranças e pagamentos de um cliente específico.

### 4.2. Contas a Pagar
- **[ ] Gerar conta a pagar por compra (Automático):** Ao receber uma compra, o sistema deve criar um registro de conta a pagar para o fornecedor.
- **[ ] Registrar o pagamento (baixa) da conta:** Marcar uma conta como "paga" quando a empresa efetuar o pagamento.
- **[ ] Consultar/Listar contas a pagar:** Ver todas as contas que a empresa precisa pagar, filtrando por fornecedor ou data de vencimento.

## Módulo 5: Compras

O processo de aquisição de mercadorias e matéria-prima.

- **[ ] Cadastrar um Pedido de Compra:** Registrar uma intenção de compra de um fornecedor, listando produtos e preços.
- **[ ] Aprovar um Pedido de Compra:** Realizar a aprovação necessária para efetivar a compra.
- **[ ] Registrar Recebimento de Mercadoria:** Confirmar que os produtos de um pedido de compra chegaram. Esta ação dispara a entrada no estoque e a geração da conta a pagar.
- **[ ] Consultar/Listar Pedidos de Compra:** Ver o histórico de compras.

## Módulo 6: Produção (PCP)

Para empresas que fabricam os próprios produtos.

- **[ ] Gerenciar Ficha Técnica (Lista de Materiais / Bill of Materials - BOM):** Definir quais matérias-primas e em que quantidade são necessárias para produzir um determinado produto acabado.
- **[ ] Criar Ordem de Produção:** Iniciar o processo de fabricação de um produto, com base em uma necessidade de venda ou para reposição de estoque.
- **[ ] Realizar baixa de matéria-prima (Automático):** Ao iniciar uma ordem de produção, o sistema deve baixar do estoque as matérias-primas listadas na Ficha Técnica.
- **[ ] Registrar produto acabado (Entrada no Estoque):** Ao finalizar uma ordem de produção, o sistema deve adicionar o produto fabricado ao estoque de produtos acabados.
- **[ ] Consultar/Listar Ordens de Produção:** Acompanhar o status de todas as ordens de produção (Ex: "Pendente", "Em Andamento", "Concluída"). 
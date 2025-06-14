# language: pt
Funcionalidade: Cadastro e Gestão de Produtos
  Para manter a base de dados do sistema íntegra e organizada,
  Como um usuário do sistema,
  Eu quero cadastrar, editar e consultar produtos, diferenciando-os por tipo.

  Contexto:
    Dado que eu sou um usuário autenticado no sistema

  Cenário: Cadastrar uma nova matéria-prima com sucesso
    Quando eu tento cadastrar um novo produto com os seguintes dados:
      | campo         | valor                   |
      | nome          | Chapa de Aço Inox 1mm   |
      | sku           | ACI-001                 |
      | tipo_produto  | MATERIA_PRIMA           |
      | unidade_medida| PECA                    |
    Então eu devo ver uma mensagem de "Produto cadastrado com sucesso"
    E o produto "ACI-001" deve estar registrado no sistema com o tipo "MATERIA_PRIMA"

  Cenário: Cadastrar um novo produto acabado com sucesso
    Quando eu tento cadastrar um novo produto com os seguintes dados:
      | campo         | valor                   |
      | nome          | Mesa de Inox 2m         |
      | sku           | MESA-INOX-200           |
      | tipo_produto  | PRODUTO_ACABADO         |
      | unidade_medida| UNIDADE                 |
      | preco_venda   | 1250.50                 |
    Então eu devo ver uma mensagem de "Produto cadastrado com sucesso"
    E o produto "MESA-INOX-200" deve estar registrado no sistema com o tipo "PRODUTO_ACABADO" e preço de venda "1250.50"

  Cenário: Tentar cadastrar um produto com SKU duplicado
    Dado que já existe um produto com o SKU "ACI-001"
    Quando eu tento cadastrar um novo produto com os seguintes dados:
      | campo         | valor                   |
      | nome          | Chapa de Aço Carbono    |
      | sku           | ACI-001                 |
      | tipo_produto  | MATERIA_PRIMA           |
      | unidade_medida| PECA                    |
    Então eu devo ver uma mensagem de erro "SKU 'ACI-001' já cadastrado no sistema."

  Cenário: Tentar cadastrar um produto sem um campo obrigatório
    Quando eu tento cadastrar um novo produto com os seguintes dados:
      | campo         | valor                   |
      | nome          | Parafuso Sextavado      |
      | sku           |                         |
      | tipo_produto  | REVENDA                 |
      | unidade_medida| UNIDADE                 |
    Então eu devo ver uma mensagem de erro "O campo 'sku' é obrigatório." 
# UMAVERSO ERP

Este projeto é um sistema de Planeamento de Recursos Empresariais (ERP) simplificado, desenvolvido com Angular e Firebase. O objetivo é fornecer uma base funcional para a gestão de produtos, compras, vendas, produção e finanças de uma pequena empresa.

## Stack Técnica

A aplicação é construída com as seguintes tecnologias:

- **Framework Principal:** [Angular](https://angular.io/) (v19)
- **Base de Dados:** [Firebase (Firestore)](https://firebase.google.com/docs/firestore) - Uma base de dados NoSQL, flexível e escalável para a web.
- **Componentes de UI:** [Angular Material](https://material.angular.io/) - Uma biblioteca de componentes de UI que implementa o Material Design da Google.
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** SCSS

## Como Começar

Para executar o projeto localmente, siga estes passos:

1.  **Instalar as dependências:**
    Navegue até ao diretório `erp` e execute o seguinte comando para instalar todas as dependências do projeto.
    ```bash
    npm install
    ```

2.  **Configurar o Firebase:**
    Certifique-se de que tem um ficheiro de configuração do Firebase no diretório `src/environments/`. Normalmente, este ficheiro (ex: `environment.ts`) contém as chaves da API do seu projeto Firebase.

3.  **Executar o Servidor de Desenvolvimento:**
    Após a instalação, execute o comando abaixo para iniciar o servidor de desenvolvimento do Angular.
    ```bash
    ng serve
    ```
    A aplicação estará disponível em `http://localhost:4200/`. O servidor recarregará automaticamente a aplicação sempre que um ficheiro for alterado.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

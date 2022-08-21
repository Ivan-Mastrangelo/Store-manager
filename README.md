## Sobre

Este projeto foi desenvolvido como parte da avaliação do curso de Desenvolvimento Web da escola Trybe. Foi o quinto projeto do módulo Back-End, onde me foi pedido desenvolver minha primeira API utilizando a arquitetura MSC(Model, Service, Controller), seguindo os padrões Rest e Restful. E a realização de testes unitários para as funções de cada camada.

### O que foi desenvolvido

A API construída trata-se de um sistema de gerenciamento de vendas, onde é possível realizar as operações básicas que se pode fazer em um banco de dados: Criação, Leitura, Atualização e Exclusão (ou `CRUD`).

Tive que utilizar o banco MySQL para a gestão de dados. Além disso, a API deveria ser RESTful.

### Requisitos básicos

- Deve ser possível que a pessoa usuária, independente de cadastro ou login, possa adicionar, ler, deletar e atualizar produtos no seu estoque. A pessoa usuária deve poder também enviar vendas para o sistema e essas vendas devem validar se o produto em questão existe. Deve-se também, ser possível ler, deletar e atualizar vendas.

#### Para **todos os endpoints** garanta que:

  - Caso o recurso **não seja encontrado**, **aconteça um erro**, ou **haja dados inválidos** na sua requisição, sua API retorne o status HTTP adequado com o body `{ message: <mensagem de erro> }`.
  - Todos os retornos de erro devem seguir o mesmo formato.

  - Você pode utilizar middlewares e objetos de erro personalizados para que não tenha que repetir a lógica de tratamento de erro em vários lugares.

#### Todos os seus endpoints devem estar no padrão REST

- Use os verbos HTTP adequados para cada operação.

- Agrupe e padronize suas URL em cada recurso.

- Garanta que seus endpoints sempre retornem uma resposta, havendo sucesso nas operações ou não.

- Retorne os códigos de status corretos (recurso criado, erro de validação, autorização, etc).

#### Cada camada da sua API deve estar em sua respectiva pasta

- Models devem estar na pasta `models`, **na raiz do projeto**

- Services devem estar na pasta `services`, **na raiz do projeto**

- Controllers devem estar na pasta `controllers`, **na raiz do projeto**

- Middlewares devem estar na pasta `middlewares`, **na raiz do projeto**

#### Para escrever seus própios arquivos de teste

- Utilize o **mocha**, **chai** e **sinon** para escrever seus testes

- Coloque todos os testes de `models`, `services` e `controllers` dentro da pasta `test/unit` 


### Habilidades

- Entender o funcionamento da camada de Model;
- Delegar responsabilidades específicas para essa camada;
- Conectar sua aplicação com diferentes bancos de dados;
- Estruturar uma aplicação em camadas;
- Delegar responsabilidades específicas para cada parte do seu app;
- Melhorar manutenibilidade e reusabilidade do seu código;
- Entender e aplicar os padrões REST;
- Escrever assinaturas para APIs intuitivas e facilmente entendíveis.

#### Observação:

Para conexão com o BD é necessário a criação de um arquivo .env na raiz do projeto no seguinte formato:

```sh
MYSQL_HOST=localhost
MYSQL_USER=nome
MYSQL_PASSWORD=1234
PORT=3000
```
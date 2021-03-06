[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<div align="center">
  <img src="./src/assets/cash-logo.svg"/>
</div><br>

Desenvolvida com Angular, `CashApp` é uma aplicação para registrar movimentações financeiras de entradas e saídas, fornecendo estatísticas das transações com uso de gráficos utiliza uma proposta de interface simples e minimalista.

## Protótipo do projeto

https://www.figma.com/file/XDP3UijlKEZH1a78jTs6Vi/Desafio-PDZ?node-id=0%3A1

## Detalhes Técnicos

   1. [Angular 13](https://angular.io/)
   2. Gerenciamento de Estados com [NgXS](https://www.ngxs.io/)
   3. [Chart.js](https://www.chartjs.org/)
   4. Testes Unitários com [Jest](https://jestjs.io/pt-BR/docs/getting-started) (Utilizando TDD)
   5. Testes E2E com [Cypress](https://cypress.io/)

## Como usar

1. Instale as dependências do projeto com
   `npm install` ou `yarn install`

2. Execute o servidor local (Json Api)
   `npm run server` ou `yarn server`

3. Execute o projeto
   `npm run start` ou `yarn start`

### Dados para acesso

A aplicação utiliza os serviços de uma API pública que simula um sistema de autenticação com JWT. Confira-a [aqui](https://reqres.in/).

Para efetuar login no sistema, utilize as credenciais abaixo

```javascript
{
   "email": "eve.holt@reqres.in",
   "password": "cityslicka"
}
```

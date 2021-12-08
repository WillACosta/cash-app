[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

<div align="center" border-radius="100px">
  <img src="./src/assets/cash-logo.svg" style="text-align:center"/>
</div><br>

Desenvolvida com Angular 13, `CashApp` é uma aplicação para registrar movimentações financeiras de entradas e saídas, fornecendo estatísticas das transações com uso de gráficos e uma interface simples e minimalista.

## Protótipo do projeto

https://www.figma.com/file/XDP3UijlKEZH1a78jTs6Vi/Desafio-PDZ?node-id=0%3A1

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

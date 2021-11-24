[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# CashApp

Aplicação de registros financeiros desenvolvida em Angular 13.

## Protótipo do projeto

https://www.figma.com/file/XDP3UijlKEZH1a78jTs6Vi/Desafio-PDZ?node-id=0%3A1


## API

1. Instale a biblioteca do JSON Server
   `npm i -g json-server`

2. Para executar o servidor
   `npm run server`

### Rotas Disponíveis

As rotas suportam todos os verbos HTTP

Url base: `http://localhost:3000`

`/transactions`

#### Paginação

GET `/transactions?\_page=7&\_limit=20`

#### Models

```javascript
//  JSON de saídas
{
   "id": "1",
   "amount": "150",
   "currency": "BRL",
   "created_at": "2018-01-01T00:00:00Z",
   "source": "expanse",
   "isPayed": "true",
   "description": "Pagamento de conta de energia"
},

// JSON de entradas
{
   "id": "2",
   "amount": "1260",
   "currency": "BRL",
   "created_at": "2018-01-01T00:00:00Z",
   "source": "incoming",
   "description": "Salário do mês"
},
```

### Rotas de autenticação

URL Base: `https://reqres.in/api`

`/login`

```javascript
{
   "email": "eve.holt@reqres.in",
   "password": "cityslicka"
}
```

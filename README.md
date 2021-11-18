# CashApp

Aplicação de registros financeiros desenvolvida em Angular 13.

## API

1. Instale a biblioteca do JSON Server
   `npm i -g json-server`

2. Para executar o servidor
   `npm run server`

### Rotas Disponíveis

GET: /tasks
POST: /tasks
PUT: /tasks
PATCH: /tasks
DELETE: /tasks

#### Paginação

GET: /tasks?\_page=7
GET: /tasks?\_page=7&\_limit=20

GET: /account
POST: /account
PUT: /account
PATCH: /account
DELETE: /account

#### Models

Tasks - Esta é sua lista com agenda de pagamentos. Aqui você cadastrar, editar e excluir um pagamento.
{ "id": 5, "name": "Anthea Pundy", "username": "apundy4", "title": "Software Engineer III", "value": 177.19, "date": "2021-01-01T14:09:51Z", "image": "https://robohash.org/quiaautomnis.png?size=150x150&set=set1", "isPayed": true },

Account - Usuário para efetuar Login da plataforma
{ "id": 0, "name": "usuario", "email": "usuario@gmail.com", "password": "usuario" }

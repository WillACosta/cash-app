Feature: Login Usuário

  Como um usuário
  Quero registrar minhas transações financeiras
  E obter informações em relatórios
  Para controlar melhor minha vida financeira

  Scenario: Efetuar login no sistema com sucesso

  Dado que acesso a página inicial da aplicação
  Quando digito meus dados (email e senha) e clico em `Entrar`
  Então sou redirecionado para o dashboard

  Scenario: Efetuar login no sistema com erro

  Dado que acesso a página inicial da aplicação
  Quando digito um email e senha inválidos e clico em `Entrar`
  Então vejo uma mensagem no top da tela exibindo o erro
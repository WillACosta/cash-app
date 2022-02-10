## New Transaction

> ### Success Case

  1. Usuário preenche todos os dados corretamente
  2. Botão de `Salvar` é habilitado
  3. Clicar no botão para salvar os dados
  4. Redirecionar usuário para a tela de `Transações`
  5. Exibir Toas com mensagem de sucesso

> ### Error Case

  1. Usuário preenche algum dado com falha
  2. Input com erro muda para status de `ERRO`
  3. Desabilitar botão de `Salvar`
  4. Clicar no botão de salvar e não fazer nada (redirecionar)
  5. Usuário corrige o problema
  6. Botão de salvar é ativado

> ### Special Case

  1. Depois de preencher os dados, apertar `esc` ou clicar fora do modal
  2. Não salvar os dados
  3. Redirecionar para a tela de transações
  4. Não exibir nenhum toast de mensagem

  1. Usuário escolher o tipo `Entrada` ou `Saída`
  2. Exibir checkbox para marcar como `recebido` ou `pago`

# Workflow do Agente

## 1. Descoberta

Use estes comandos para entender um projeto web:

```powershell
Get-ChildItem -Force
Get-ChildItem -Recurse -Filter package.json
Get-ChildItem -Recurse -Include "README*","*.config.*","vite.config.*","next.config.*","tsconfig.json"
```

Procure:

- framework usado;
- scripts de `dev`, `test`, `lint`, `typecheck` e `build`;
- estrutura de rotas, componentes, servicos e API;
- configuracao de deploy;
- variaveis de ambiente esperadas.

## 2. Desenvolvimento

Checklist:

- Entender o comportamento esperado.
- Localizar arquivos responsaveis.
- Implementar seguindo padroes locais.
- Validar em desktop e mobile quando houver interface.
- Atualizar testes ou documentacao se a mudanca alterar contrato.

## 3. Correcao de bugs

Checklist:

- Capturar mensagem de erro, stack trace ou comportamento incorreto.
- Encontrar caminho de execucao.
- Identificar causa raiz.
- Corrigir no ponto responsavel.
- Rodar teste especifico, depois verificacao mais ampla quando possivel.

## 4. Preparacao de deploy

Checklist:

- Build local passa.
- Variaveis de ambiente documentadas.
- Banco de dados e migrations conferidos.
- Integracoes externas verificadas.
- Plano de rollback definido.

## 5. Comunicacao

Durante o trabalho, mantenha o usuario informado com mensagens curtas:

- o que esta investigando;
- o que encontrou;
- que arquivos vai alterar;
- quais verificacoes executou;
- o que ficou pendente.

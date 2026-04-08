# CRUD de Tarefas em Node.js e Express

Projeto de uma API REST para gerenciamento de tarefas, desenvolvido em TypeScript com Express. Foi construído como exercício prático seguindo conceitos de validação, upload de CSV e persistência simples em arquivo JSON.

## Visão Geral

- API de tarefas com operações CRUD completas
- Validação de dados usando `zod`
- Upload de arquivo CSV para importação em lote de tarefas
- Persistência leve em arquivo JSON (`src/database/db.json`)
- Tratamento de erros personalizado
- Uso de `multer` para upload de arquivos

## Tecnologias

- Node.js
- TypeScript
- Express
- Zod
- Multer
- CSV-Parse
- TSX

## Estrutura do Projeto

- `src/server.ts` - inicializa o servidor
- `src/app.ts` - configura o Express, rotas e middleware de erro
- `src/routes/` - definição de rotas da API
- `src/controllers/tasksController.ts` - regras de negócio e endpoints
- `src/CSV/importCSV.ts` - parser de CSV para importação de tarefas
- `src/utils/AppError.ts` - classe de erro customizada
- `src/database/db.json` - banco de dados local em formato JSON
- `src/middlewares/multer.ts` - configuração de upload de arquivos

## Funcionalidades

- Criar tarefa
- Listar tarefas com filtro por título ou descrição
- Atualizar tarefa
- Deletar tarefa
- Marcar tarefa como completa
- Fazer upload de arquivo CSV para inserir tarefas em lote

## Endpoints

Base: `http://localhost:3333/tasks`

- `POST /tasks` - cria uma nova tarefa
- `GET /tasks` - lista tarefas (aceita filtros `title` e `description`)
- `PUT /tasks/:id` - atualiza tarefa existente
- `DELETE /tasks/:id` - remove tarefa
- `PATCH /tasks/:id/complete` - marca tarefa como concluída
- `POST /tasks/upload` - importa tarefas a partir de CSV

## Execução

1. Instalar dependências:

```bash
npm install
```

2. Executar o servidor em modo de desenvolvimento:

```bash
npm run dev
```

3. A API será iniciada em:

```bash
http://localhost:3333
```

## Observações Técnicas

- O projeto usa JSON como banco de dados local para simplificar o protótipo.
- Caso `src/database/db.json` não exista, ele é criado automaticamente na primeira inserção de tarefa.
- A validação é feita com `zod` para garantir que títulos e descrições atendam aos requisitos mínimos.
- O upload de CSV exige um arquivo com cabeçalho e insere novas tarefas em lote.
- Há um middleware de tratamento de erros para respostas consistentes.

## Por que este projeto é relevante para recrutadores

- Demonstra conhecimento em Node.js com TypeScript
- Mostra habilidade em construir APIs RESTful com rotas e controllers
- Exibe uso de validação, tratamento de erros e upload de arquivos
- Evidencia capacidade de trabalhar com persistência e importação de dados

## Próximos passos possíveis

- Adicionar testes automatizados
- Implementar autenticação e autorização
- Migrar para banco de dados real (SQLite, PostgreSQL, MongoDB)
- Criar documentação Swagger/OpenAPI

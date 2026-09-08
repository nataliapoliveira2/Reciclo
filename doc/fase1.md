## 1. Concepção, Setup e Planejamento
Nesta etapa foi definido o que fará parte da primeira versão do Reciclo, quem utilizará a aplicação e quais funcionalidades serão necessárias para atender ao objetivo do projeto.

#### Mapeamento dos usuários
**Usuário principal (estudantes)**: pode descobrir rapidamente onde descartar determinado resíduo; compreender a classificação dos resíduos; acessar informações sem conhecimento técnico prévio; utilizar o sistema pelo celular e encontrar respostas de maneira rápida e visual.

**Usuário secundário (demais usuários do Campus IFB)**: também poderão utilizar a plataforma para consultar informações relacionadas ao descarte. As necessidades são semelhantes às dos estudantes, porém o desenvolvimento da linguagem e da experiência será direcionado prioritariamente ao público estudantil.

**Usuário administrador**: responsável por cadastrar posts; editar informações; atualizar orientações de descarte; adicionar novas categorias e remover informações incorretas ou desatualizadas.

#### Definição dos requisitos funcionais
**RF01 — Visualizar tipos e categorias de resíduos:** o sistema deverá apresentar os principais tipos e classificações de resíduos abordados pelo projeto LixoZero.

**RF02 — Consultar informações sobre resíduos:** o usuário deverá conseguir visualizar informações básicas sobre cada resíduo.

**RF03 — Consultar a forma correta de descarte:** o sistema deverá informar de maneira objetiva como determinado resíduo deve ser descartado.

**RF04 — Consultar informações sobre resíduos orgânicos:** A aplicação deverá oferecer maior destaque ao conteúdo relacionado aos resíduos orgânicos.

**RF05 — Pesquisar resíduos:** o usuário deverá poder pesquisar um resíduo pelo nome.

**RF06 — Filtrar resíduos por categoria:** o usuário deverá conseguir visualizar resíduos pertencentes a uma determinada categoria.

**RF07 — Visualizar informações sobre o projeto:** a aplicação deverá apresentar brevemente o objetivo do Reciclo e sua relação com o projeto Lixo Zero.

#### Definição dos requisitos não funcionais

**RNF01 — Responsividade:** a aplicação deverá funcionar em diferentes tamanhos de tela, priorizando dispositivos móveis.

**RNF02 — Usabilidade:** as principais informações deverão ser encontradas de maneira simples e com poucos passos.

**RNF03 — Acessibilidade:** a interface deverá considerar legibilidade, contraste, textos alternativos e navegação compreensível.

**RNF04 — Linguagem acessível:** o conteúdo deverá utilizar comunicação simples, direta e adequada principalmente ao público
estudantil.

**RNF05 — Desempenho:** a aplicação deverá possuir carregamento adequado para utilização por dispositivos móveis.

**RNF06 — Manutenibilidade:** a solução deverá possuir separação organizada entre frontend, backend, API e persistência.

**RNF07 — Evolução:** a estrutura deverá permitir futuras integrações com a segunda frente do Reciclo.

### Definição do escopo inicial
**A primeira versão contempla:**

- landing page do Reciclo;
- apresentação dos projetos já realizados;
- informações básicas sobre os resíduos;
- destaque para resíduos orgânicos;
- orientação sobre descarte correto;
- pesquisa de resíduos;
- apresentação do projeto Reciclo e do Lixo Zero;
- interface responsiva com prioridade para smartphones;
- API para cadastro de usuários e publicação de posts com imagens.

**Não fazem parte desta primeira fase:**

- reconhecimento de resíduos pela câmera;
- realidade aumentada ou outros recursos imersivos;
- ponto de coleta interativo;
- autenticação de usuários;
- painel administrativo completo;
- pesquisa de resíduos por nome (planejado);
- filtros por categoria (planejado).

#### Backlog inicial
O backlog inicial transformou o escopo em atividades que foram detalhadas e
distribuídas entre os integrantes:

- levantar categorias de resíduos;
- pesquisar informações sobre resíduos;
- validar informações com o projeto Lixo Zero;
- definir requisitos;
- elaborar protótipos;
- definir arquitetura;
- definir contratos da API;
- estruturar frontend;
- estruturar backend;
- modelar banco de dados;
- implementar API;
- integrar banco de dados;
- integrar frontend e backend;
- realizar testes.
 ---

## 2. Design Técnico e Arquitetura

### 2.1 Prototipagem e Contratos
Nesta etapa foram definidos os fluxos de comunicação entre os componentes da aplicação antes da
implementação completa.

#### Protótipo de integração
O fluxo demonstra como o frontend solicita uma informação ao backend.

```
Usuário
 ↓
Frontend (Vue.js 3 + Vite 8)
 ↓
Requisição HTTP
 ↓
API REST (Express 4)
 ↓
Prisma Client
 ↓
SQLite (dev.db)
 ↓
Resposta em JSON
 ↓
Frontend
 ↓
Informação apresentada ao usuário
```

#### Definição dos contratos da API

Os contratos documentam como frontend e backend se comunicam.

**Endpoints implementados:**

**Criar usuário**

`POST /users`

Corpo da requisição:
```json
{
  "name": "Nome do Usuário",
  "email": "email@exemplo.com"
}
```

Resposta de sucesso (201):
```json
{
  "id": "uuid",
  "name": "Nome do Usuário",
  "email": "email@exemplo.com",
  "createdAt": "2025-12-05T00:00:00.000Z"
}
```

Resposta de erro (400):
```json
{
  "error": "Erro ao criar usuário ou e-mail já existente."
}
```

---

**Criar post com imagens**

`POST /posts` (multipart/form-data)

Campos:
- `title` — título do post
- `content` — conteúdo do post
- `authorId` — ID do usuário autor
- `images` — até 5 arquivos de imagem

Resposta de sucesso (201):
```json
{
  "id": "uuid",
  "title": "Título",
  "content": "Conteúdo",
  "authorId": "uuid",
  "createdAt": "2025-12-05T00:00:00.000Z",
  "author": { "id": "uuid", "name": "Nome", "email": "email" },
  "images": [
    { "id": "uuid", "url": "/uploads/images-123456789.jpg", "postId": "uuid" }
  ]
}
```

Resposta de erro (400):
```json
{
  "error": "Erro ao criar post com imagens."
}
```

---

**Listar posts**

`GET /posts`

Resposta de sucesso (200):
```json
[
  {
    "id": "uuid",
    "title": "Título",
    "content": "Conteúdo",
    "authorId": "uuid",
    "createdAt": "2025-12-05T00:00:00.000Z",
    "author": { "id": "uuid", "name": "Nome", "email": "email" },
    "images": []
  }
]
```

Os posts são retornados ordenados por data de criação (mais recentes primeiro).

Resposta de erro (500):
```json
{
  "error": "Erro ao buscar posts."
}
```

---

**Endpoint de verificação**

`GET /` (definido no `app.js`, porém não utilizado pelo `server.js`)

Resposta (200):
```json
{
  "message": "API funcionando"
}
```

---

**Endpoints planejados (não implementados):**

```
GET /api/v1/categorias
GET /api/v1/residuos
GET /api/v1/residuos/:id
GET /api/v1/residuos?busca=banana
GET /api/v1/residuos?categoria=organico
```

#### Padrão das respostas

Respostas de sucesso retornam o objeto ou array diretamente com código HTTP correspondente (200 ou 201).

Respostas de erro utilizam a chave `error`:
```json
{
  "error": "Mensagem descritiva do erro."
}
```

Principais códigos:

```
200 — Sucesso (leitura)
201 — Criado com sucesso
400 — Requisição inválida ou dado duplicado
500 — Erro interno do servidor
```

### 2.2 Definição de Arquitetura

```
┌──────────────────────────┐
│ USUÁRIO                  │
│ Smartphone / Desktop     │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ FRONTEND                 │
│ Vue.js 3.5 + Vite 8      │
└────────────┬─────────────┘
             │ HTTP / JSON
             ↓
┌──────────────────────────┐
│ API REST                 │
│ Express 4.21             │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ BACKEND                  │
│ Node.js (CommonJS)       │
│ Multer (upload)          │
│ Swagger (documentação)   │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ PERSISTÊNCIA             │
│ Prisma ORM + SQLite      │
└──────────────────────────┘
```

**Frontend:** Vue.js 3.5 + Vite 8 + Vue Router 4.6

**Backend:** Node.js + Express 4.21 (CommonJS)

**ORM:** Prisma Client 5.22 + Prisma CLI 5.22

**Upload de arquivos:** Multer 2.3

**Documentação da API:** Swagger (swagger-autogen 2.23 + swagger-ui-express 5.0)

**API REST:** HTTP + JSON

**Camada de persistência:** SQLite (arquivo local `dev.db`)

#### Organização do Repositório (Estrutura Git)

```
reciclo/
├── README.md
├── doc/
│   ├── fase1.md
│   └── fase2.md
├── img/
│   └── mockup.jpg
├── backend/
│   ├── package.json
│   ├── .gitignore
│   ├── prisma/
│   │   └── schema.prisma
│   └── src/
│       ├── server.js               # Ponto de entrada (Express + rotas + Prisma)
│       └── app.js                  # Config Express alternativa (não utilizado)
└── front/
    ├── package.json
    ├── index.html                  # HTML raiz (title: "Reciclo")
    ├── vite.config.js
    ├── jsconfig.json
    └── src/
        ├── main.js                 # Bootstrapping do Vue
        ├── App.vue                 # Portal de Notícias (página principal)
        ├── ApresentacaoApp.vue     # Landing page Realidade Aumentada
        ├── assets/
        │   ├── base.css
        │   ├── main.css
        │   └── logo.svg
        ├── components/
        │   ├── HelloWorld.vue      # Scaffold Vue (não utilizado)
        │   ├── TheWelcome.vue      # Scaffold Vue (não utilizado)
        │   └── WelcomeItem.vue     # Scaffold Vue (não utilizado)
        └── public/
            ├── LogoIFB.png         # Logo do IFB
            ├── LogoILZB.png        # Logo do Instituto Lixo Zero Brasil
            ├── ImgNoticia1.jpg     # Imagem notícia 1
            ├── ImgNoticia2.jpeg    # Imagem notícia 2
            ├── ImgNoticia3.jpeg    # Imagem notícia 3
            ├── ImgNoticia4.jpg     # Imagem notícia 4
            ├── ImgNoticia5.png     # Imagem notícia 5
            └── favicon.ico
```

---

## 3. Desenvolvimento do Backend e Persistência

### 3.1 Modelagem e Casos de Uso

Nesta etapa os requisitos definidos anteriormente foram convertidos em estruturas técnicas que
orientaram a implementação do backend.

#### Modelagem do domínio

O schema do banco de dados foi definido utilizando Prisma ORM com três entidades:

**User**

```
User
---------
id          String   (UUID, chave primária)
name        String
email       String   (único)
posts       Post[]   (relacionamento 1:N)
createdAt   DateTime (padrão: now)
```

**Post**

```
Post
---------
id          String   (UUID, chave primária)
title       String
content     String
author      User     (relacionamento N:1)
authorId    String   (chave estrangeira)
images      Image[]  (relacionamento 1:N)
createdAt   DateTime (padrão: now)
```

**Image**

```
Image
---------
id          String   (UUID, chave primária)
url         String
post        Post     (relacionamento N:1, cascade delete)
postId      String   (chave estrangeira)
```

**Relacionamentos:**
```
USER
 1
 │
 N
POST
 1
 │
 N
IMAGE
```

Um usuário pode possuir vários posts. Um post pode possuir várias imagens. Ao excluir um post, suas imagens são removidas em cascata (`onDelete: Cascade`).

Exemplo:
```
Maria Clara
 ├── Post: "IFB recebe Prêmio Lixo Zero 2025"
 │    ├── Imagem: /uploads/images-123.jpg
 │    └── Imagem: /uploads/images-456.jpg
 └── Post: "Coleta de eletrônicos no Campus"
      └── Imagem: /uploads/images-789.jpg
```

#### Casos de uso técnicos implementados

**UC01 — Criar usuário**

Objetivo: cadastrar um novo usuário com nome e e-mail único.

**UC02 — Criar post com imagens**

Objetivo: publicar um novo post vinculado a um autor, com upload de até 5 imagens.

**UC03 — Listar posts**

Objetivo: retornar todos os posts com dados do autor e imagens, ordenados do mais recente para o mais antigo.

#### Casos de uso técnicos planejados

**UC04 — Listar categorias**

Objetivo: retornar as categorias de resíduos cadastradas no sistema.

**UC05 — Listar resíduos**

Objetivo: retornar os resíduos disponíveis para consulta.

**UC06 — Consultar resíduo**

Objetivo: recuperar todas as informações relacionadas a um resíduo específico.

**UC07 — Pesquisar resíduo**

Objetivo: localizar resíduos utilizando o nome informado pelo usuário.

**UC08 — Filtrar resíduos por categoria**

Objetivo: retornar apenas resíduos pertencentes à categoria selecionada.

#### Detalhamento no backlog

| ID   | Tarefa                                       | Status         |
|------|----------------------------------------------|----------------|
| BK01 | Criar entidade User (Prisma)                 | ✅ Concluído    |
| BK02 | Criar entidade Post (Prisma)                 | ✅ Concluído    |
| BK03 | Criar entidade Image (Prisma)                | ✅ Concluído    |
| BK04 | Implementar criação de usuário               | ✅ Concluído    |
| BK05 | Implementar criação de post com imagens      | ✅ Concluído    |
| BK06 | Implementar listagem de posts                | ✅ Concluído    |
| BK07 | Implementar upload de imagens (Multer)       | ✅ Concluído    |
| BK08 | Criar entidade Categoria                     | ⬜ Pendente     |
| BK09 | Criar entidade Resíduo                       | ⬜ Pendente     |
| BK10 | Implementar listagem de categorias           | ⬜ Pendente     |
| BK11 | Implementar listagem de resíduos             | ⬜ Pendente     |
| BK12 | Implementar consulta individual de resíduo   | ⬜ Pendente     |
| BK13 | Implementar pesquisa por nome                | ⬜ Pendente     |
| BK14 | Implementar filtro por categoria             | ⬜ Pendente     |
| BK15 | Implementar validações                       | ⬜ Pendente     |
| BK16 | Implementar tratamento padronizado de erros  | ⬜ Pendente     |

### 3.2 Implementação da API

Nesta etapa foram desenvolvidos os componentes responsáveis pelo funcionamento do backend.

#### Estrutura do backend

A lógica da aplicação está concentrada no arquivo `server.js`, que acumula as responsabilidades de configuração, rotas, middlewares e acesso ao banco:

```javascript
// server.js — Estrutura geral
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Configuração do Multer (upload de imagens)
// Rotas (POST /users, POST /posts, GET /posts)
// Inicialização do servidor (porta 3000)
```

O arquivo `app.js` existe no projeto com uma configuração alternativa do Express (rota `GET /` de verificação), porém **não é importado nem utilizado** pelo `server.js`.

#### Rotas implementadas

```
POST /users                → Criar usuário
POST /posts                → Criar post com imagens (multipart/form-data)
GET  /posts                → Listar posts com autor e imagens
GET  /uploads/:filename    → Servir arquivos de imagem estáticos
```

#### Upload de imagens (Multer)

O backend utiliza Multer com `diskStorage` para o upload de imagens:

- **Destino:** diretório `uploads/` na raiz do backend
- **Nomenclatura:** `{fieldname}-{timestamp}-{random}.{extensão}`
- **Limite:** até 5 imagens por requisição
- **Acesso:** servidos como arquivos estáticos em `/uploads/`

Configuração:
```javascript
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ storage: storage });
```

#### Validação dos dados

A validação atual é mínima, tratada por:

- restrição `@unique` no campo `email` do User (nível de banco);
- tratamento de erros genéricos nos blocos `try/catch`.

Validações planejadas:
- verificar se o ID é válido;
- validar parâmetros de pesquisa;
- verificar parâmetros de filtros;
- verificar campos obrigatórios;
- impedir dados em formato incorreto.

#### Tratamento de erros

O backend utiliza blocos `try/catch` em cada rota, retornando respostas no formato:

```json
{
  "error": "Mensagem descritiva do erro."
}
```

Códigos HTTP utilizados:
- `400` — erro de validação ou dado duplicado;
- `500` — erro interno do servidor.

Exemplos implementados:
```json
{ "error": "Erro ao criar usuário ou e-mail já existente." }
{ "error": "Erro ao criar post com imagens." }
{ "error": "Erro ao buscar posts." }
```

#### Dependências do backend

| Pacote              | Versão       | Finalidade                          |
|---------------------|--------------|-------------------------------------|
| express             | ^4.21.1      | Framework HTTP                      |
| cors                | ^2.8.5       | Habilitar Cross-Origin Requests     |
| dotenv              | ^16.4.5      | Variáveis de ambiente (instalado, não utilizado) |
| @prisma/client      | ^5.22.0      | Cliente ORM para banco de dados     |
| multer              | ^2.3.0       | Upload de arquivos                  |
| swagger-autogen     | ^2.23.7      | Geração automática de docs da API   |
| swagger-ui-express  | ^5.0.1       | Interface visual do Swagger         |
| nodemon (dev)       | ^3.1.7       | Hot-reload em desenvolvimento       |
| prisma (dev)        | ^5.22.0      | CLI do Prisma (migrations etc.)     |

#### Scripts disponíveis

| Script               | Comando                          | Descrição                          |
|----------------------|----------------------------------|------------------------------------|
| `npm run dev`        | `nodemon src/server.js`          | Inicia com hot-reload              |
| `npm start`          | `node src/server.js`             | Inicia em produção                 |
| `npm run db:push`    | `prisma db push`                 | Sincroniza schema com o banco      |
| `npm run db:migrate` | `prisma migrate dev --name init` | Cria migration de desenvolvimento  |

### 3.3 Persistência de Dados

Nesta etapa foi implementado o armazenamento das informações da aplicação.

#### Configuração do banco de dados

O banco de dados utiliza **SQLite** como provedor, gerenciado pelo **Prisma ORM**.

Schema (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}

model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  posts     Post[]
  createdAt DateTime @default(now())
}

model Post {
  id        String   @id @default(uuid())
  title     String
  content   String
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  images    Image[]
  createdAt DateTime @default(now())
}

model Image {
  id        String   @id @default(uuid())
  url       String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  postId    String
}
```

Estrutura de relacionamento:
```
USER
  │
  │ 1:N
  ↓
POST
  │
  │ 1:N
  ↓
IMAGE
```

#### Integração backend e banco

A aplicação utiliza o Prisma Client diretamente nas rotas, sem camadas intermediárias de controller, service ou repository.

Fluxo atual:
```
POST /users
     ↓
Rota Express (server.js)
     ↓
prisma.user.create()
     ↓
SQLite (dev.db)
     ↓
Usuário criado
```

```
POST /posts
     ↓
Rota Express (server.js) + Multer (upload)
     ↓
prisma.post.create({ include: { images, author } })
     ↓
SQLite (dev.db)
     ↓
Post criado com imagens
```

```
GET /posts
     ↓
Rota Express (server.js)
     ↓
prisma.post.findMany({ include: { author, images }, orderBy: { createdAt: 'desc' } })
     ↓
SQLite (dev.db)
     ↓
Lista de posts
```

#### Variáveis de ambiente

O pacote `dotenv` está instalado como dependência, porém **não é importado** em nenhum arquivo do projeto. As configurações estão definidas diretamente no código:

- **Porta do servidor:** `3000` (hardcoded no `server.js`)
- **URL do banco:** `file:./dev.db` (hardcoded no `schema.prisma`)

Configuração recomendada para o arquivo `.env`:
```
DATABASE_URL="file:./dev.db"
PORT=3000
NODE_ENV=development
```

O `.env` está incluído no `.gitignore` para não ser versionado.

#### Ambiente de desenvolvimento

Utilizado pela equipe durante a implementação e testes.

Utiliza:
- servidor local (porta 3000);
- banco de dados SQLite local (`prisma/dev.db`);
- hot-reload com nodemon (`npm run dev`);
- upload de imagens em diretório local (`uploads/`).

#### Ambiente de produção

Utilizado quando a aplicação estiver publicada.

Deverá utilizar:
- banco de produção;
- credenciais próprias;
- configurações específicas do servidor;
- variáveis de ambiente protegidas.

As credenciais não deverão ser armazenadas diretamente no repositório.

---

## 4. Desenvolvimento do Frontend

### 4.1 Tecnologias e Configuração

O frontend foi estruturado com Vue.js 3 e Vite.

**Dependências:**

| Pacote                   | Versão     | Finalidade                       |
|--------------------------|------------|----------------------------------|
| vue                      | ^3.5.40    | Framework reativo                |
| vue-router               | ^4.6.4     | Roteamento SPA (instalado, não configurado) |
| vite                     | ^8.1.5     | Build tool e dev server          |
| @vitejs/plugin-vue       | ^6.0.8     | Suporte a SFCs no Vite           |
| vite-plugin-vue-devtools | ^8.1.5     | DevTools para desenvolvimento    |

**Requisito de runtime:** Node.js ^22.18.0 ou >=24.12.0

**Scripts disponíveis:**

| Script            | Comando          | Descrição              |
|-------------------|------------------|------------------------|
| `npm run dev`     | `vite`           | Inicia dev server      |
| `npm run build`   | `vite build`     | Build de produção      |
| `npm run preview` | `vite preview`   | Preview do build       |

**Ponto de entrada:** `main.js` inicializa o Vue e monta o componente `App.vue` no elemento `#app`.

O `vue-router` está instalado como dependência, porém não está configurado no `main.js`. A aplicação renderiza diretamente o componente `App.vue`.

### 4.2 Portal de Notícias (App.vue)

O componente principal (`App.vue`, 713 linhas) implementa um **Portal de Notícias** do Reciclo com o seguinte conteúdo:

**Header:**
- Logos do IFB e do Instituto Lixo Zero Brasil (imagens em `public/`)
- Menu hamburger com dropdown contendo link de Login

**Carrossel de destaques:**
- Exibe as 3 notícias mais recentes
- Navegação com botões ❮/❯ e indicadores circulares clicáveis
- Imagem de capa em destaque
- Tag "DESTAQUE", data formatada (dd/mm/aaaa), título, resumo
- Botão "Ler Matéria Completa"

**Grade de notícias:**
- Grid responsivo (`auto-fit`, mínimo 300px por card)
- Cards com imagem, data, título e resumo
- Hover com efeito de elevação (`translateY(-8px)`)
- Clicável — abre modal de leitura

**Modal de leitura:**
- Popup glassmorphism com overlay blur
- Exibe data, título, imagem, resumo em negrito e conteúdo completo
- Botão de fechar (✕)

**Dados das notícias (hardcoded):**

O componente contém 5 notícias estáticas com conteúdo real do projeto Lixo Zero:

| ID | Título | Data |
|----|--------|------|
| 1  | IFB Campus Brasília recebe destaque no Prêmio Lixo Zero 2025 | 05/12/2025 |
| 2  | IFB recebe Encontro Nacional de Boas Práticas Lixo Zero nesta semana | 03/12/2025 |
| 3  | Campus Brasília avança rumo ao lixo zero e seleciona cooperativas | 06/06/2025 |
| 4  | Coleta de resíduos eletrônicos no IFB Campus Brasília | 01/08/2024 |
| 5  | Encontro Nacional de Boas Práticas Lixo Zero começa dia 3 | sem data |

**Lógica reativa (`<script setup>`):**
- `menuAberto` — controle do dropdown do menu
- `slideAtivo` — índice do slide do carrossel
- `noticiaAberta` — notícia exibida no modal (bloqueia scroll do body)
- `noticiasOrdenadas` — computed que ordena por data decrescente
- `noticiasDestaque` — computed que seleciona as 3 mais recentes
- `formatarData()` — converte ISO (yyyy-mm-dd) para formato brasileiro (dd/mm/aaaa)

**Características visuais:**
- Fonte: Inter (Google Fonts)
- Layout: full-width responsivo (max-width: 1100px)
- Gradiente de fundo: tons de verde/azul (#258599 → #86c596)
- Cards glassmorphism (backdrop-filter: blur)
- Breakpoint em 850px (carrossel empilha verticalmente)
- Título: "Portal de Notícias **RECICLO**" (RECICLO em amarelo #facc15)

### 4.3 Landing Page de Realidade Aumentada (ApresentacaoApp.vue)

O componente `ApresentacaoApp.vue` (402 linhas) contém a landing page de apresentação do conceito de Realidade Aumentada do Reciclo. Este componente **não está integrado à navegação** da aplicação (não é roteado nem importado pelo `App.vue`).

**Conteúdo:**
- Header com título "Reciclo" e subtítulo "Realidade Aumentada"
- Card introdutório com descrição do projeto e integração com o Lixo Zero
- Seção "Mecânica Principal" com 4 cards explicativos:
  1. Scan & Spawn — escaneamento com RA
  2. Indicação da Lixeira — coleta seletiva em RA
  3. Pontos de Coleta (Ecopontos)
  4. Confirmação do Descarte
- Seção "Tipos de Resíduos" com lista estática:
  - Papel (cor azul)
  - Reciclável Seco (cor vermelha)
  - Orgânico / Úmido (cor marrom, com destaque "Foco Lixo Zero / Compostagem")
- CTA "Baixar Reciclo" e texto "Disponível para iOS e Android"

**Características visuais:**
- Fonte: Poppins (Google Fonts)
- Layout: full-width (sem frame mobile)
- Background do body: #258599
- Ícones SVG inline
- Cards translúcidos com backdrop-filter

### 4.4 Assets

**Diretório `public/`:**
- `LogoIFB.png` — logo institucional do IFB
- `LogoILZB.png` — logo do Instituto Lixo Zero Brasil
- `ImgNoticia1.jpg` a `ImgNoticia5.png` — fotografias das notícias
- `favicon.ico`

**Diretório `assets/`:**
- `base.css` — estilos base
- `main.css` — estilos globais
- `logo.svg` — logo do Vue (scaffold, não utilizado)

**Componentes de scaffold (não utilizados):**
- `components/HelloWorld.vue`
- `components/TheWelcome.vue`
- `components/WelcomeItem.vue`
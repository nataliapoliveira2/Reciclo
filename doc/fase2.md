## 2. Design Técnico e Arquitetura

### 2.1 Prototipagem e Contratos

A integração entre a aplicação cliente (Frontend) e a API (Backend) ocorre por meio de protocolo HTTP/HTTPS utilizando o padrão RESTful e payloads em formato JSON.

#### Fluxo Geral de Comunicação

```text
Usuário ──> Frontend ──> Requisição HTTP (JSON) ──> API REST (Express) ──> Prisma ORM ──> Banco SQLite
  ▲                                                                                         │
  └──────────────── Resposta HTTP (JSON) <──────────────────────────────────────────────────┘
```

### Contrato de Interface para pesquisa de resíduos
Exemplo de fluxo de requisição para consulta de resíduos por palavra-chave:

1. Requisição HTTP (Frontend):

```HTTP
GET /api/v1/residuos?busca=banana HTTP/1.1
Host: localhost:3000
Accept: application/json
```
2. Resposta HTTP (Backend):
```HTTP
HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "data": [
    {
      "id": 1,
      "nome": "Casca de banana",
      "descricao": "Resto de fruta rico em potássio.",
      "descarte": "Coletor de resíduos orgânicos ou composteira escolar.",
      "informacao_adicional": "Pode ser utilizada na compostagem para gerar adubo natural.",
      "imagem_url": "/uploads/casca-banana.png",
      "categoria_id": 1,
      "categoria": {
        "id": 1,
        "nome": "Orgânico",
        "descricao": "Resíduos de origem vegetal ou animal sujeitos à decomposição natural."
      }
    }
  ]
}
```
## 2.2 Definição de Arquitetura
A aplicação adota uma arquitetura em camadas no Back-end, promovendo separação de responsabilidades, facilidade de manutenção e desacoplamento do acesso aos dados.

### Visão Geral da Arquitetura do Sistema
- Frontend: Aplicação responsável pela interface do usuário, captação das interações e renderização dos dados consumidos via fetch.

- Backend (API REST): Desenvolvido em Node.js com Express, responsável pelo roteamento, regras de negócio e intermediação das requisições.

- Camada de Upload (Multer): Middleware encarregado de receber arquivos do tipo multipart/form-data, salvando-os no diretório estático local /uploads.

- Camada de Persistência (Prisma ORM): Mapeamento objeto-relacional para consulta e manipulação estruturada dos dados em linguagem JavaScript/TypeScript.

- Banco de Dados (SQLite): Banco de dados relacional embarcado em arquivo local (dev.db), ideal para desenvolvimento leve e portabilidade.

### Estrutura de Diretórios do Projeto
 ```Plaintext
 backend/
├── prisma/
│   ├── schema.prisma        # Definição dos modelos de dados (User, Post, Category, Waste)
│   ├── dev.db               # Arquivo do banco de dados SQLite local
│   └── seed.js              # Script de população inicial do banco de dados
├── src/
│   ├── app.js               # Configuração do Express, middlewares e rotas da API
│   └── server.js            # Ponto de entrada que inicializa o servidor HTTP na porta 3000
├── uploads/                 # Diretório físico de armazenamento de arquivos enviados via Multer
├── swagger.js               # Configuração do gerador automático de documentação
├── swagger-output.json      # Arquivo JSON gerado para consumo do Swagger UI
├── package.json             # Gerenciamento de dependências e scripts do Node.js
└── .gitignore               # Exclusão de artefatos de build, banco local e variáveis locais
 ```
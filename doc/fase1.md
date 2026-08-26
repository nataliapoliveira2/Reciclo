## 1. Concepção, Setup e Planejamento
Nesta etapa será definido o que fará parte da primeira versão do Reciclo, quem utilizará a aplicação e quais funcionalidades serão necessárias para atender ao objetivo do projeto.

#### Mapeamento dos usuários
**Usuário principal (estudantes)**: pode descobrir rapidamente onde descartar determinado resíduo; compreender a classificação dos resíduos; acessar informações sem conhecimento técnico prévio; utilizar o sistema pelo celular e encontrar respostas de maneira rápida e visual.

**Usuário secundário (demais usuários do Campus IFB)**: também poderão utilizar a plataforma para consultar informações relacionadas ao descarte. As necessidades são semelhantes às dos estudantes, porém o desenvolvimento da linguagem e da experiência será direcionado prioritariamente ao público estudantil.

**Usuário administrador**: responsável por cadastrar resíduos; editar informações; atualizar orientações de descarte; adicionar novas categorias e remover informações incorretas ou desatualizadas.

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
**A primeira versão deverá contemplar:**

- landing page do Reciclo;
- apresentação das categorias de resíduos;
- informações básicas sobre os resíduos;
- destaque para resíduos orgânicos;
- orientação sobre descarte correto;
- pesquisa de resíduos;
- filtros por categoria;
- apresentação do projeto Reciclo e do Lixo Zero;
- interface responsiva com prioridade para smartphones.

**Não fazem parte desta primeira fase:**

- reconhecimento de resíduos pela câmera;
- realidade aumentada ou outros recursos imersivos;
- ponto de coleta interativo;
- autenticação de usuários;
- painel administrativo completo.

#### Backlog inicial
O backlog inicial deverá transformar o escopo em atividades que posteriormente serão detalhadas e
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
Nesta etapa serão definidos os fluxos de comunicação entre os componentes da aplicação antes da
implementação completa.

#### Protótipo de integração
Será criado um fluxo inicial demonstrando como o frontend solicitará uma informação ao backend.

```
Usuário
 ↓
Frontend
 ↓
Requisição HTTP
 ↓
API REST
 ↓
Backend
 ↓
Resposta em JSON
 ↓
Frontend
 ↓
Informação apresentada ao usuário
```
**Exemplo:**

O estudante pesquisa: `Casca de banana`

O frontend realiza: `GET /api/v1/residuos?busca=banana`

A API poderá retornar:
```
{
    "success": true,
        "data": [
        {
            "id": 1,
            "nome": "Casca de banana",
            "categoria": "Orgânico",
            "descarte": "Coletor destinado aos resíduos orgânicos."
        }
    ]
}
```
O frontend será responsável por transformar esses dados em uma apresentação simples para o
usuário.

#### Definição dos contratos da API
Os contratos documentarão como frontend e backend deverão se comunicar.

**Endpoints iniciais:**

**Listar categorias**

`GET /api/v1/categorias`

**Listar resíduos**

`GET /api/v1/residuos`

**Consultar um resíduo**

`GET /api/v1/residuos/:id`

**Pesquisar resíduos**

`GET /api/v1/residuos?busca=banana`

**Filtrar por categoria**

`GET /api/v1/residuos?categoria=organico`

Para cada endpoint deverão ser documentados:

- método HTTP;
- endereço da rota;
- parâmetros;
- estrutura da requisição;
- estrutura da resposta;
- possíveis códigos HTTP;
- formato dos erros.

#### Padrão inicial das respostas

Resposta de sucesso:
```
{
"success": true,
"data": {}
}
```

Resposta de erro:
```
{
"success": false,
"message": "Resíduo não encontrado."
}
```

Principais códigos:

```
200 — Sucesso
400 — Requisição inválida
404 — Recurso não encontrado
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
│ Interface e interação    │
└────────────┬─────────────┘
             │ HTTP / JSON
             ↓
┌──────────────────────────┐
│ API REST                 │
│ Comunicação da aplicação │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ BACKEND                  │
│ Regras e processamento   │
└────────────┬─────────────┘
             ↓
┌──────────────────────────┐
│ PERSISTÊNCIA             │
│ Banco de dados           │
└──────────────────────────┘
```

**Frontend:** Vue.js + Vite

**Backend:** Node.js + Express

**API REST:** HTTP + JSON

**Camada de persistência:** PostgreSQL


#### Organização do Repositório (Estrutura Git)

<!-- Nota: Acrescentar estrutura posteriormente.--->

---

## 3. Desenvolvimento do Backend e Persistência

### 3.1 Modelagem e Casos de Uso

Nesta etapa os requisitos definidos anteriormente serão convertidos em estruturas técnicas que
orientarão a implementação do backend.

#### Modelagem do domínio
Inicialmente serão necessárias duas entidades principais.

**Categoria**

```
Categoria
---------
id
nome
descricao
```

**Resíduo**
```
Residuo
-------
id
nome
descricao
descarte
informacao_adicional
imagem_url
categoria_id
```

**Relacionamento:**
```
CATEGORIA
1
│
│
N
RESÍDUO
```
Uma categoria poderá possuir vários resíduos.

Exemplo:
```
Orgânico
 ├── Casca de banana
 ├── Casca de laranja
 ├── Borra de café
 └── Restos de alimentos
```

#### Casos de uso técnicos

**UC01 — Listar categorias**

Objetivo: retornar as categorias cadastradas no sistema.

**UC02 — Listar resíduos**

Objetivo: retornar os resíduos disponíveis para consulta.

**UC03 — Consultar resíduo**

Objetivo: recuperar todas as informações relacionadas a um resíduo específico.

**UC04 — Pesquisar resíduo**

Objetivo: localizar resíduos utilizando o nome informado pelo usuário.

**UC05 — Filtrar resíduos por categoria**

Objetivo: retornar apenas resíduos pertencentes à categoria selecionada.


#### Detalhamento no backlog
Os casos de uso serão convertidos em tarefas técnicas.

Exemplos:

BK01 — Criar entidade Categoria

BK02 — Criar entidade Resíduo

BK03 — Implementar listagem de categorias

BK04 — Implementar listagem de resíduos

BK05 — Implementar consulta individual

BK06 — Implementar pesquisa por nome

BK07 — Implementar filtro por categoria

BK08 — Implementar validações

BK09 — Implementar tratamento de erros

BK10 — Integrar API ao banco de dados

### 3.2 Implementação da API
Nesta etapa serão desenvolvidos os componentes responsáveis pelo funcionamento do backend.

#### Rotas
As rotas serão responsáveis por direcionar as requisições recebidas.

Exemplos:

```
GET /api/v1/categorias
GET /api/v1/residuos
GET /api/v1/residuos/:id
```

#### Controllers
Os controladores serão responsáveis por:

- receber as requisições;
- acessar parâmetros;
- chamar o serviço correspondente;
- retornar a resposta HTTP.

Estrutura:

```
CategoriaController
ResiduoController
```

#### Services
Os serviços concentrarão as regras da aplicação.

Exemplos:

```
CategoriaService
ResiduoService
```

Responsabilidades:
- consultar registros;
- pesquisar resíduos;
- aplicar filtros;
- verificar existência de registros;
- coordenar operações necessárias para atender aos casos de uso.

#### Validação dos dados
A API deverá validar as informações antes de realizar o processamento.

Exemplos:
- verificar se o ID é válido;
- validar parâmetros de pesquisa;
- verificar parâmetros de filtros;
- verificar campos obrigatórios;
- impedir dados em formato incorreto.

#### Tratamento de erros
O backend deverá possuir tratamento padronizado de erros.

Exemplo:
```
{
"success": false,
"message": "Resíduo não encontrado."
}
```
Também deverão ser tratados:
- parâmetros inválidos;
- registros inexistentes;
- erros de conexão com banco;
- erros internos da aplicação.

### 3.3 Persistência de Dados
Nesta etapa será implementado o armazenamento das informações da aplicação.

#### Configuração do banco de dados

Criar:
- banco de dados;
- tabelas;
- campos;
- tipos de dados;
- chaves primárias;
- chaves estrangeiras;
- relacionamentos;
- restrições necessárias.

Estrutura inicial:
```
CATEGORIA
    │
    │ 1:N
    ↓
RESÍDUO
```

#### Integração backend e banco

A aplicação deverá estabelecer conexão com o banco e executar as consultas através da camada de
persistência.

Exemplo:
```
GET /api/v1/residuos
     ↓
ResiduoController
     ↓
ResiduoService
     ↓
ResiduoRepository
     ↓
PostgreSQL
     ↓
Lista de resíduos
```

#### Variáveis de ambiente

Informações de configuração não deverão permanecer diretamente no código-fonte.

Exemplo:
```
NODE_ENV=
PORT=
DB_HOST=
DB_PORT=
DB_NAME=
DB_USER=
DB_PASSWORD=
DATABASE_URL=
```

#### Ambiente de desenvolvimento

Utilizado pela equipe durante a implementação e testes.

Exemplo:
`NODE_ENV=development
`

Poderá utilizar:
- servidor local;
- banco de dados local ou de desenvolvimento;
- configurações específicas para testes.

#### Ambiente de produção

Utilizado quando a aplicação estiver publicada.

Exemplo:
`NODE_ENV=production`

Deverá utilizar:
- banco de produção;
- credenciais próprias;
- configurações específicas do servidor;
- variáveis de ambiente protegidas.

As credenciais não deverão ser armazenadas diretamente no repositório.
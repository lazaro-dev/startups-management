# Startups Management

Plataforma web para gestão de startups, desenvolvida como projeto acadêmico para a disciplina de **Engenharia de Software II**.

O projeto tem como objetivo aplicar na prática conceitos de engenharia de software, desenvolvimento full stack, organização modular, integração entre frontend e backend e gerenciamento de dados.

## Tecnologias utilizadas

### Frontend
- **Angular** — desenvolvimento da interface web.
- **TypeScript** — linguagem de programação.
- **Tailwind CSS** — estilização dos componentes.

### Backend
- **Java** — linguagem de programação.
- **Spring Boot** — desenvolvimento da API REST.
- **Maven** — gerenciamento de dependências e build.

### Banco de dados e infraestrutura
- **PostgreSQL 16** — banco de dados relacional.
- **Docker** — containerização dos serviços.
- **Docker Compose** — orquestração do ambiente de desenvolvimento.
- **Adminer** — interface web para administração do banco de dados.

## Pré-requisitos

Antes de executar o projeto, certifique-se de que as seguintes ferramentas estão instaladas:

- [Git](https://git-scm.com/) — para clonar o repositório.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — para executar os containers.
- Docker Compose — incluído nas versões atuais do Docker Desktop.

Para executar o script `dev.sh` no Windows, também será necessário utilizar o **Git Bash** ou o **WSL**.

Não é necessário instalar Java, Maven, Node.js ou Angular CLI diretamente na máquina, pois essas ferramentas são disponibilizadas pelos containers configurados no projeto.

## Como executar o projeto

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd startups-management
```

Substitua `<URL_DO_REPOSITORIO>` pela URL do repositório no GitHub.

### 2. Verificar os pré-requisitos

Execute os comandos abaixo para verificar se o Docker e o Docker Compose estão disponíveis:

```bash
docker --version
docker compose version
```

Certifique-se de que o Docker Desktop esteja em execução.

### 3. Configurar o ambiente

Verifique o arquivo `docker-compose.dev.yml` para consultar as configurações dos serviços e suas respectivas variáveis de ambiente.

Atualmente, o ambiente de desenvolvimento utiliza as seguintes credenciais para o PostgreSQL:

| Configuração | Valor |
|---|---|
| Banco de dados | `startups` |
| Usuário | `admin` |
| Senha | `admin` |
| Porta | `5432` |

Essas credenciais são destinadas exclusivamente ao ambiente de desenvolvimento acadêmico. Não utilize essas configurações em produção.

### 4. Iniciar o ambiente

#### Linux, macOS, Git Bash ou WSL

Caso utilize Linux, macOS ou WSL, dê permissão de execução ao script, se necessário:

```bash
chmod +x dev.sh
```

Inicie os containers com:

```bash
./dev.sh -u
```

#### Windows — PowerShell

Caso prefira utilizar o PowerShell, execute o comando abaixo na raiz do projeto:

```powershell
docker compose -f docker-compose.dev.yml up -d --remove-orphans
```

Esse comando inicia os serviços em segundo plano e remove containers que não estejam mais definidos na configuração.

Na primeira execução, o Docker poderá precisar baixar as imagens e construir os serviços.

### 5. Acessar a aplicação

Após a inicialização dos serviços, os endereços disponíveis são:

| Serviço | Endereço |
|---|---|
| Frontend Angular | [http://localhost:4200](http://localhost:4200) |
| Backend Spring Boot | [http://localhost:8080](http://localhost:8080) |
| Adminer — banco de dados | [http://localhost:9090](http://localhost:9090) |

O backend disponibiliza a API REST. As rotas específicas dependem dos controllers implementados no projeto.

## Como acessar o banco de dados

O projeto utiliza PostgreSQL executado em um container Docker. É possível acessar o banco pelo navegador, usando o Adminer, ou por uma ferramenta de gerenciamento de banco de dados, como o DBeaver.

### Opção 1 — Adminer pelo navegador

1. Inicie os containers do projeto.
2. Acesse [http://localhost:9090](http://localhost:9090).
3. Preencha o formulário de conexão com os seguintes dados:

| Campo | Valor |
|---|---|
| Sistema | PostgreSQL |
| Servidor | `postgres` |
| Usuário | `admin` |
| Senha | `admin` |
| Banco de dados | `startups` |

4. Clique em **Entrar**.

**Importante:** no campo Servidor, utilize `postgres`, pois esse é o nome do serviço do banco na rede interna do Docker Compose.

### Opção 2 — DBeaver ou outro cliente PostgreSQL

Também é possível conectar-se ao banco diretamente pela máquina Windows utilizando um cliente compatível com PostgreSQL.

No DBeaver, crie uma nova conexão PostgreSQL e informe:

| Campo | Valor |
|---|---|
| Host | `localhost` |
| Porta | `5432` |
| Database | `startups` |
| Username | `admin` |
| Password | `admin` |

Salve a conexão e clique em **Test Connection** para verificar se o acesso está funcionando.

Nesse caso, utilize `localhost`, pois a porta `5432` do container PostgreSQL está publicada na máquina host.

### Consultar os dados pelo terminal

Também é possível abrir o terminal do PostgreSQL dentro do container:

```bash
docker compose -f docker-compose.dev.yml exec postgres psql -U admin -d startups
```

Para listar as tabelas:

```sql
\dt
```

Para consultar os registros de uma tabela, por exemplo:

```sql
SELECT * FROM estado;
```

Substitua `estado` pelo nome da tabela que deseja consultar. Para sair do terminal do PostgreSQL, execute:

```sql
\q
```

## Comandos disponíveis no dev.sh

O script `dev.sh` simplifica o gerenciamento do ambiente de desenvolvimento.

| Comando | Descrição |
|---|---|
| `./dev.sh -u` | Inicia os containers em segundo plano. |
| `./dev.sh -d` | Para e remove os containers. |
| `./dev.sh -dv` | Para e remove os containers e os volumes associados. |
| `./dev.sh -b backend` | Constrói a imagem do backend. |
| `./dev.sh -bnc backend` | Reconstrói a imagem do backend sem utilizar o cache. |
| `./dev.sh -logs` | Acompanha os logs dos serviços. |
| `./dev.sh -logs backend` | Acompanha os logs do backend. |
| `./dev.sh -logs frontend` | Acompanha os logs do frontend. |

Os comandos acima devem ser executados em um terminal Bash, como Git Bash ou WSL.

### Comandos equivalentes no PowerShell

Se estiver utilizando o PowerShell no Windows, você pode executar diretamente os comandos do Docker Compose:

**Iniciar os serviços:**

```powershell
docker compose -f docker-compose.dev.yml up -d --remove-orphans
```

**Acompanhar os logs de todos os serviços:**

```powershell
docker compose -f docker-compose.dev.yml logs -f
```

**Acompanhar os logs de um serviço específico:**

```powershell
docker compose -f docker-compose.dev.yml logs -f backend
```

**Construir a imagem de um serviço:**

```powershell
docker compose -f docker-compose.dev.yml build backend
```

**Construir sem utilizar o cache:**

```powershell
docker compose -f docker-compose.dev.yml build --no-cache backend
```

**Parar e remover os containers:**

```powershell
docker compose -f docker-compose.dev.yml down
```

**Parar os containers e remover os volumes:**

```powershell
docker compose -f docker-compose.dev.yml down -v
```

**Atenção:** o comando `down -v` remove os volumes associados ao ambiente, incluindo o volume `postgres-data`, que armazena os dados persistidos do PostgreSQL. Utilize-o somente quando desejar apagar esses dados.

## Estrutura do projeto

```text
startups-management/
├── backend/
│   ├── src/
│   ├── Dockerfile.dev
│   └── pom.xml
├── frontend/
│   ├── src/
│   ├── Dockerfile.dev
│   └── package.json
├── docker-compose.dev.yml
└── dev.sh
```

O diretório `backend` contém a API desenvolvida com Spring Boot, enquanto o diretório `frontend` contém a aplicação Angular. O arquivo `docker-compose.dev.yml` define os serviços e suas configurações, e o script `dev.sh` facilita o gerenciamento do ambiente.

## Contexto acadêmico

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de **Engenharia de Software II**, com foco na aplicação prática dos conceitos estudados durante a graduação.

### Objetivos acadêmicos

- Organização e modularização de software.
- Separação de responsabilidades entre frontend e backend.
- Desenvolvimento e integração de uma API REST.
- Persistência de dados em banco relacional.
- Configuração de ambientes de desenvolvimento.
- Uso de ferramentas de versionamento e containerização.

## Licença

Projeto acadêmico destinado a fins educacionais. A inclusão de uma licença de distribuição deverá ser definida pelos responsáveis pelo projeto.

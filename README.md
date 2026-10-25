# Startups Management

Plataforma web para gestão de startups, desenvolvida como projeto acadêmico para a disciplina de **Engenharia de Software II**.

O projeto tem como objetivo aplicar na prática os conceitos de engenharia de software, desenvolvimento full stack, organização modular, integração entre frontend e backend e gerenciamento de dados.

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

- **PostgreSQL** — banco de dados relacional.
- **Docker** — containerização dos serviços.
- **Docker Compose** — orquestração do ambiente de desenvolvimento.

## Pré-requisitos

Antes de executar o projeto, certifique-se de que as seguintes ferramentas estão instaladas:

- [Git](https://git-scm.com/) — para clonar o repositório.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — para executar os containers.
- Docker Compose — disponível integrado ao Docker Desktop nas versões atuais.

Não é necessário instalar Java, Maven, Node.js ou Angular CLI diretamente na máquina caso todos esses serviços sejam executados pelos containers configurados no projeto.

> **Importante:** a execução depende das configurações presentes nos arquivos Docker do repositório. Caso algum serviço seja executado diretamente na máquina, suas respectivas ferramentas e versões compatíveis também serão necessárias.

## Como executar o projeto

### Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- [Git](https://git-scm.com/) — para clonar o repositório.
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) — para executar os containers.
- Docker Compose — incluído nas versões atuais do Docker Desktop.
- Bash — necessário para executar o script `dev.sh`. No Windows, você pode utilizar o Git Bash ou o WSL.

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd startups-management
```

Substitua `<URL_DO_REPOSITORIO>` pela URL do repositório no GitHub.

### 2. Verificar os pré-requisitos

Confirme se o Docker e o Docker Compose estão disponíveis:

```bash
docker --version
docker compose version
```

Certifique-se também de que o Docker Desktop está em execução.

### 3. Configurar as variáveis de ambiente

Verifique as configurações do arquivo `docker-compose.dev.yml` e dos serviços para identificar se existem variáveis de ambiente obrigatórias.

Caso o projeto utilize um arquivo `.env`, configure-o conforme os requisitos do ambiente. Não compartilhe senhas ou credenciais reais no repositório.

### 4. Dar permissão de execução ao script

Em ambientes Linux, macOS ou WSL, execute:

```bash
chmod +x dev.sh
```

No Windows, utilizando Git Bash ou WSL, você também pode executar o script pelo Bash.

### 5. Iniciar o ambiente de desenvolvimento

Para iniciar os containers em segundo plano:

```bash
./dev.sh -u
```

Esse comando executa o Docker Compose com as configurações de `docker-compose.dev.yml`, inicia os serviços em segundo plano e remove containers de serviços que não estejam mais definidos na configuração.

Na primeira execução, caso as imagens necessárias ainda não existam, poderá ser necessário construí-las antes de iniciar os serviços.

### 6. Consultar os logs

Para acompanhar os logs de todos os serviços:

```bash
./dev.sh -logs
```

Para acompanhar os logs de um serviço específico, informe seu nome conforme definido no `docker-compose.dev.yml`:

```bash
./dev.sh -logs backend
```

Exemplo para o frontend:

```bash
./dev.sh -logs frontend
```

### 7. Acessar a aplicação

Depois que os containers estiverem em execução, acesse os endereços configurados no `docker-compose.dev.yml`.

Os endereços podem variar conforme as portas publicadas no Docker Compose. Consulte esse arquivo para identificar as URLs do frontend e do backend.

## Comandos disponíveis no dev.sh

O projeto disponibiliza o script `dev.sh` para simplificar o gerenciamento do ambiente de desenvolvimento.

| Comando | Descrição |
|---|---|
| `./dev.sh -u` | Inicia os containers em segundo plano. |
| `./dev.sh -d` | Para e remove os containers do projeto. |
| `./dev.sh -dv` | Para e remove os containers e os volumes associados. |
| `./dev.sh -b` | Constrói a imagem de um serviço específico. |
| `./dev.sh -bnc` | Reconstrói a imagem de um serviço sem utilizar o cache. |
| `./dev.sh -logs` | Acompanha os logs dos serviços. |

### Reconstruir a imagem de um serviço

Para construir a imagem de um serviço específico:

```bash
./dev.sh -b backend
```

Para construir a imagem sem utilizar o cache:

```bash
./dev.sh -bnc backend
```

Substitua `backend` pelo nome do serviço definido no arquivo `docker-compose.dev.yml`.

### Encerrar o ambiente

Para parar e remover os containers:

```bash
./dev.sh -d
```

Para remover os containers e também os volumes associados:

```bash
./dev.sh -dv
```

**Atenção:** o comando `-dv` pode apagar os dados persistidos no banco de dados, caso estejam armazenados em volumes removidos por essa operação. Utilize-o somente quando desejar remover esses dados.

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

O diretório `backend` contém a API desenvolvida com Spring Boot, enquanto o diretório `frontend` contém a aplicação Angular. O arquivo `docker-compose.dev.yml` define os serviços e suas configurações, e o script `dev.sh` facilita a execução dos comandos de gerenciamento do ambiente.

## Contexto acadêmico

Este projeto foi desenvolvido para fins educacionais como parte da disciplina de **Engenharia de Software II**, com o objetivo de aplicar na prática os conceitos de desenvolvimento full stack, organização modular, integração entre serviços e gerenciamento de ambientes de desenvolvimento.

## Objetivos acadêmicos

Este projeto foi desenvolvido no contexto da disciplina de **Engenharia de Software II**, com foco na aplicação prática dos conceitos estudados durante a graduação, incluindo:

- Organização e modularização de software.
- Separação de responsabilidades entre frontend e backend.
- Desenvolvimento e integração de uma API REST.
- Persistência de dados em banco relacional.
- Configuração de ambientes de desenvolvimento.
- Uso de ferramentas de versionamento e containerização.

## Licença

Projeto acadêmico destinado a fins educacionais. A inclusão de uma licença de distribuição deverá ser definida pelos responsáveis pelo projeto.

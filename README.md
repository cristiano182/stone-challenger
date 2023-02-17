<p  align="center"><h1>Stone Challenger - Customer-API v.1.0.0</h1></p>
<br />
RESTful API

<br /><br />


> ## Endpoints da aplicação

- [Buscar um cliente - GET] `/customers/:id`
- [Atualizar um cliente - PUT] `/customers/:id`
- [Registrar um cliente - POST] `/customers/`


###### *OBS1: Todos os endpoints requerem um Bearer token válido.
###### *OBS2: Solicite um token realizando uma request (POST) para [SSO](https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/)
###### *OBS3: Adicione na sua request o cabeçalho `Authorization` com o valor `Bearer (token solicitado no passo 2)`

<br /><br />

> ## Documentação da API - Swagger

- [Documentação da API (Swagger) - GET] `/documents`

<br /><br />

> ## Requisitos de sistema (Windows, Mac, Linux)

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en/) Para executar a aplicação localmente, sem docker
- [Redis](https://redis.io/download/) Para executar a aplicação  localmente, sem docker

<br /><br />

> ## Variáveis de ambiente

###### Para desenvolvimento local, criei o arquivo .env na raiz da aplicação  com o conteudo do arquivo .env-example (também na raiz do projeto), exemplo:


- **PORT**=3000
- **SSO_HOST**=
- **REDIS_HOST**=
- **SSO_CLIENT_ID**= 
- **REDIS_PORT**=6379
- **SSO_CLIENT_SECRET**=
- **SSO_CLIENT_USERNAME**=cristianogb182@gmail.com

<br /><br />


> ## **Executando a aplicação  - Utilizando Docker (recomendado)**

```
git clone https://github.com/cristiano182/stone-challenger.git
```
```
cd stone-challenger 
```
```
docker-compose up
```
###### Aplicação  disponivel em http://localhost:3000

<br /><br />


> ## **Executando a aplicação  - Nao utilizando Docker (requer o Redis instalado e rodando localmente)**

```
git clone https://github.com/cristiano182/stone-challenger.git
```
```
cd stone-challenger 
```
```
npm install
```
```
npm start
```

<br /><br />

> ## **Deploy para produção**

###### Com Docker
```
docker build -t stone-customer-api  .
docker run -p 3000:3000 stone-customer-api -e <variaveis_ambiente>
```


###### Sem Docker
```
npm run build
npm run start:prod
```

<br /><br />


> ## **Executando testes - Utilizando Docker (recomendado)**

```
docker-compose run stone-customer-api npm run test
```
###### Gerando relatorio de cobertura
```
docker-compose run stone-customer-api npm run test:cov
```

<br /><br />


> ## **Executando testes - Nao utilizando Docker (requer o Redis instalado e rodando localmente)**

```
npm run test
```
###### Gerando relatorio de cobertura
```
npm run test:cov
```

<br /><br />


> ## Metodologias e Princípios
* TDD
* SOLID

<br /><br />

> ## Tecnologias utilizadas

- [Axios](https://axios-http.com/) HTTP client
- [Redis](https://redis.io/) In-memory Database
- [Swagger](https://redis.io/) Documentation API
- [Jest](https://jestjs.io/) Testing Library Framework
- [Docker](https://www.docker.com/) Container and Images
- [NestJS](https://github.com/nestjs/nest) NodeJS Framework
- [Typescript](https://www.typescriptlang.org/) JavaScript Superset


<br /><br />

> ## Contato

- [E-Mail](cristianogb182@gmail.com)
- [Github](https://github.com/cristiano182)


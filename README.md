
<p  align="center">
<a  href="http://nestjs.com/"  target="blank">
<img  src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Stone_pagamentos.png"  width="250"  alt="logotipo stone" />
</a>
</p>
<p  align="center">Stone Challenger - Customer-API v.1.0.0</p>

Uma RESTful API

<br /><br />


> ## Endpoints da aplicação

- [Buscar um cliente - GET] `/customers/:id`
- [Atualizar um cliente - PUT] `/customers/:id`
- [Registrar um cliente - POST] `/customers/`


###### *OBS1: Todos os endpoints requerem um Bearer token valido.
###### *OBS2: Solicite um token realizando uma request (POST) para [SSO](https://accounts.seguros.vitta.com.br/auth/realms/careers/protocol/openid-connect/token/)
###### *OBS3: Adicione na sua request o cabecalho `Authorization` com o valor `Bearer (token solicitado no passo 2)`

<br /><br />

> ## Documentação da API - Swagger

- [Documentacao da API (Swagger) - GET] `/documents`

<br /><br />

> ## Requisitos de sistema (Windows, Mac, Linux)

- [Docker](https://www.docker.com/)
- [NodeJS](https://nodejs.org/en/) Para executar a aplicacao localmente, sem docker
- [Redis](https://redis.io/download/) Para executar a aplicacao localmente, sem docker

<br /><br />

> ## Variaveis de ambiente

###### Para desenvolvimento local, criei o arquivo .env na raiz da aplicacao com o conteudo do arquivo .env-example (tambem na raiz do projeto), exemplo:


- **PORT**=3000
- **SSO_HOST**=
- **REDIS_HOST**=
- **SSO_CLIENT_ID**= 
- **REDIS_PORT**=6379
- **SSO_CLIENT_SECRET**=
- **SSO_CLIENT_USERNAME**=cristianogb182@gmail.com

<br /><br />


> ## **Executando a aplicacao - Utilizando Docker (recomendado)**

```
git clone https://github.com/cristiano182/stone-challenger.git
```
```
cd stone-challenger 
```
```
docker-compose up
```
###### Aplicacao disponivel em http://localhost:3000

<br /><br />


> ## **Executando a aplicacao - Nao utilizando Docker (requer o Redis instalado e rodando localmente)**

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
###### Aplicacao disponivel em http://localhost:3000

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


> ## Metodologias e principios
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


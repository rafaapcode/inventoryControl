# Controle de Estoque

- Este projeto de API, foi retirado de um processo seletivo. Tem objetivo de fazer o controle de um estoque em uma loja pequena.
- O banco de dados utilizado é o MONGODB

### Arquitetura
- Estou utilizando a arquitetura MVC.

### Aoprendizados
- O maior aprendizado que tive com esse projeto, foi a construção da DOCUMENTAÇÃO da API, usando o Swagger.
- A documentação pode ser encontrada na seguinte URL : http://localhost:5000/api-doc


## Como inicar a aplicação ?
1. Primeiro clone ou baixo o arquivo em seu PC.
2. Depois entre na pasta do arquivo pelo seu terminal e digite o comando ```npm i``` para instalar as dependências.
3. Depois digite o comando ```npm start``` para iniciar a API.


#### OBS
- Como estou usando o MONGODB, você terá que configurar uma variável de ambiente com a URL do seu MONGODB, com o seguinte nome : ( DATABASE_URL ).
- Também coloque nesta mesma variável de ambiente a porta que sua API irá escutar, com o seguinte nome : ( PORT )
- E para autenticação estou utilizando o JWT e para isso temos que utilizar um segredo que pode ser qualquer coisa, o coloque com o seguinte nome na variável de ambiente : ( TOKEN_SECRET )

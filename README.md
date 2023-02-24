# Sobre o projeto
O projeto foi feito em *NodeJS* com NestJS e *MySQL* usando TypeORM, utilizando bibliotecas como *Class-Validator*,  *Swagger* e *JWT* com testes unitátios feitos com *Jest* e feito utilizando os conceitos *SOLID*

# Como rodar
- Clone o repositório
- Navegue até o diretório e rodar *npm install*.
- Renomeie o arquivo *.env.example* para *.env* e coloque os valores adequados para suas configurações
- Crie o banco de dados no MySQL
- Rode *npm start*
- Acesse *http://localhost:3000/api* para utilizar o *Swagger* para testar a API
- Você precisa de um *token JWT* para usar a API. Para gerar um token válido basta enviar um POST para */api/v1/auth* passando o parâmetro *email* com o valor *testuser@test.com* e será retornado o *access_token* para posteriormente ser utilizado atráves do campo Authorization no cabeçalho.
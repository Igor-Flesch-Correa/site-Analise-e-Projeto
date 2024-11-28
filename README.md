# Casa dos Sabores - Trabalho da disciplina de **Análise e Projeto de Sistemas**.

## API - Backend

### API - Guia de instalação

Baixe ou clone o repositório para seu computador e acesse a pasta "**api-project**". 

- Instalação:

    Adicione o arquivo "**.env**" dentro da pasta "**api-project**"

    Dentro do arquivo "**.env**" cole o endereço do Database abaixo:
    >DATABASE_URL="postgres://postgres:YkIPAqWMihNA@yjwxjj.easypanel.host:25565/project"

    Acesse a pasta "**api-project**" e instale as libs:
    >npm i

    Agora execute o comando do Prisma que gera o cliente Prisma Client com base no arquivo schema.prisma:
    >npx prisma generate 

    Pronto! Só usar. **Olhe antes os scripts disponíveis dentro do package.json!**

<br/>

### API - Scripts para testar
**start:dev**  //testar em dev
> npm run start:dev

**test** //para verificar testes
> npm run test

**test:cov** //para verificar testes com coverage
> npm run test:cov

<br/>

### Link da API - Swagger:
> https://casadossabores.yjwxjj.easypanel.host/api

<br/> 

### Tecnologias usadas:
👩‍💻 
Técnologias Utilizadas na api: <br/>
<img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" alt="node" width="70" height="70"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/nestjs/nestjs-original.svg" alt="nest" width="70" height="70"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" alt="typescript" width="70" height="70"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/prisma/prisma-original.svg" alt="prisma" width="70" height="70"/>
<img src="https://jestjs.io/img/jest.png" alt="jest" width="70" height="70"/>

## Frontend

### API - Guia de instalação

Baixe ou clone o repositório para seu computador e acesse a pasta "**front**"

- Instalação:

    Instale a extensão no VSCode: LiveServer

    Com projeto aberto, no lado direito, em baixo, clique no "**Go Live**" para ativar a extesão do LiveServer e assim criar de forma automática um host temporário para ver o front funcionando.
    
    Pronto! Só usar.

    **Obs: Front não hospedado, por isso não tem link de site.**

<br/>

### Tecnologias usadas:
👩‍💻 
Técnologias Utilizadas no Front: <br/>
<img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-original.svg" alt="js" width="70" height="70"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/html5/html5-original.svg" alt="html" width="70" height="70"/>
<img src="https://github.com/devicons/devicon/blob/master/icons/css3/css3-original.svg" alt="css" width="70" height="70"/>

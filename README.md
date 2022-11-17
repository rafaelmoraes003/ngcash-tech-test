# NGCASH TESTE TÉCNICO

## CONFIGURAÇÕES NECESSÁRIAS

- docker-compose a partir da versão 1.29.2

## COMO RODAR A APLICAÇÃO

Na pasta raiz do projeto, utilize o comando `docker-compose up -d` no terminal e espere os serviços serem inicializados. O Front-End estará localizado na porta 3000, o Back-End na porta 3001 e o banco de dados (Postgresql) na porta 5432.

## SOBRE O BANCO DE DADOS E O SERVIDOR

Ao inicializar os serviços através do `docker-compose`, serão criados 3 usuários, que são estes:

```JavaScript
[
  { id: 1, username: 'Rafael Moraes', password: 'AAbbCC11' },
  { id: 2, username: 'Pedro Pereira', password: 'DDeeFF22' },
  { id: 2, username: 'Lucas Almeida', password: 'XXyyZZ55' },
]
```

OBS: As senhas no banco de dados estão em formato de hash.

## TELAS

Existem 4 telas na aplicação, sendo elas:

- ### `/login` - Realização login.
- ### `/register` - Criação de novo usuário.
- ### `/home` - Tela principal, onde é possível realizar operações bancárias e consultar saldo do usuário.
- ### `/transactions` - Listagem de transações bancárias e opções de filtragem para elas.

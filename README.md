# NGCASH TECH TEST

## TECHNOLOGIES USED

## NECESSARY SETTINGS

- `docker-compose` from version 1.29.2

## HOW TO RUN THE APPLICATION

In the root folder of the project, use the `docker-compose up -d` command in the terminal and wait for the services to start up. The Front-End will be located on port 3000, the Back-End on port 3001 and the database (Postgresql) on port 5432.

## ABOUT THE DATABASE AND SERVER

When initializing the services through `docker-compose`, 3 users will be created, which are these:

```JavaScript
[
  { id: 1, username: 'Rafael Moraes', password: 'AAbbCC11' },
  { id: 2, username: 'Pedro Pereira', password: 'DDeeFF22' },
  { id: 2, username: 'Lucas Almeida', password: 'XXyyZZ55' },
]
```

NOTE: The passwords in the database are hashed.

## SCREENS

There are 4 screens in the application, namely:

- ### `/login` - Performing a login.
- ### `/register` - Creation of a new user.
- ### `/home` - Main screen, where you can perform banking operations and check the user's balance.
- ### `/transactions` - Listing of bank transactions and filtering options for them.

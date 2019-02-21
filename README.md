# Node TS API Boilerplate

## 1. Install Dependences

```
npm i
```

```
npm i -g typescript
```

```
npm i -g db-migrate
```

- MySQL databases

```
npm i db-migrate-mysql --save
```

- PostegreSQL databases

```
npm i db-migrate-pg --save
```

- Sqlite databases

```
npm i db-migrate-sqlite3 --save
```


## 2. Enviroments

Copy `.env.example` to `.env` and set enviroments

```
cp .env.example .env
```


Copy `db.config.example` to `db.config.ts` and set enviroments

```
cp db.config.example db.config.ts
```


## 3. Database


### 3.1 Create DB
```
db-migrate db:create DB_NAME
```

### 3.2 Migrations
```
db-migrate create MIGRATION_NAME
```

### 3.3 Running Migrations

- DEV
```
db-migrate up
```

- PROD
```
npm run migrate:prod OR db-migrate up -e prod
```

## 4. Run Project

```
npm start
```


## 5. Docs

- sequelize-typescript: https://github.com/RobinBuschmann/sequelize-typescript

- db-migrate: https://db-migrate.readthedocs.io/en/latest/

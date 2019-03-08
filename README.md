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
npm i db-migrate-mysql mysql2 --save
```

- PostegreSQL databases

```
npm i db-migrate-pg pg pg-hstore --save
```

- Sqlite databases

```
npm i db-migrate-sqlite3 sqlite3 --save
```

## 2. Enviroments

Copy `.env.example` to `.env` and set enviroments

```
cp .env.example .env
```


Copy `src/config/db.config.example` to `src/config/db.config.ts` and set enviroments

```
cp src/config/db.config.example src/config/db.config.ts
```


## 3. Database


### 3.1 Create DB
```
db-migrate db:create DB_NAME
```

### 3.2 Migrations
```
npm run create-migration -- MIGRATION_NAME
```

### 3.3 Running Migrations

- DEV
```
npm run migrate
```

- PROD
```
npm run migrate:prod
```

## 4. Run Project

- DEV
```
npm start
```

- PROD
```
npm start:prod
```


## 5. Docs

- sequelize-typescript: https://github.com/RobinBuschmann/sequelize-typescript

- db-migrate: https://db-migrate.readthedocs.io/en/latest/

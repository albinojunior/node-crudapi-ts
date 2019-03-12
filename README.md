# Node API | TypeScript Boilerplate

## 1. Install Dependencies

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

- Postgres databases

```
npm i db-migrate-pg pg pg-hstore --save
```

- SQLite databases

```
npm i db-migrate-sqlite3 sqlite3 --save
```

## 2. Environments

Copy `.env.example` to `.env` and set environments

```
cp .env.example .env
```

## 3. Database

### 3.1 Migrations
```
npm run create-migration -- MIGRATION_NAME
```

### 3.1 Running Migrations

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

# Node API | TypeScript Boilerplate

## 1. Install Dependencies

```
npm i
```

```
npm i -g typescript
```

```
npm i -g sequelize-cli
```

## 2. Environments

Copy `.env.example` to `.env` and set environments

```
cp .env.example .env
```

## 3. Database

### 3.1 Creating Migrations
```
npm run create-migration -- MIGRATION_NAME
```
or
```
sequelize migration:create --name MIGRATION_NAME
```

### 3.2 Running Migrations

```
npm run migrate
```
or
```
sequelize db:migrate
```

### 3.3 Creating Seeds
```
npm run create-seed -- SEED_NAME
```
or
```
sequelize seed:create --name SEED_NAME
```

### 3.4 Running Seeds

```
npm run seed
```
or
```
sequelize db:seed:all
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

- db-migrate: https://db-migrate.readthedocs.io/en/latest/

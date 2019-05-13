# Node CrudsAPI | TypeScript
- A Node API boilerplate for create CRUDS written in TypeScript

[TOC]

## 1.  Installing

#### Install dependencies

`$ npm i`

#### Installing pm2
`$ npm i -g pm2`

#### Environments

Copy `.env.example` to `.env` and set environments

## 2. Database
#### Install database driver

- **PostgresSQL**
`$ npm install --save pg pg-hstore `

- **MySQL**
`$ npm install --save mysql2`

- **MariaDB**
`$ npm install --save mariadb`

- **SQLite**
`$ npm install --save sqlite3`

- **SQL Server**
`$ npm install --save tedious `

#### Database Config
Setting config database connection on config file:  `config/database.js`
***if you will not use migrations or seeds this config  can be created with ".ts" extension**
[more config details](http://docs.sequelizejs.com/manual/getting-started.html)

#### Migrations and Seeds
- For implements migrations or seeds install sequelize-cli module:

`$ npm i -g sequelize-cli`

- Create `database/seeds` and/or  `database/migrations` folder
*OBS: You can create seeds or migrations folders individually*

- Create a `.sequeilizerc` and paste follow code:

```
module.exports = {
  "config": "./config/database.js", //database config file reference
  "seeders-path": "./database/seeds", //remove if you don't use seeds
  "migrations-path": "./database/migrations" //remove if you don't use migrations
};
```

#### Creating Migrations

`$ sequelize migration:create --name MIGRATION_NAME`

#### Running Migrations

`$ sequelize db:migrate`

#### Creating Seeds

`$ sequelize seed:create --name SEED_NAME`

#### Running Seeds

`$ sequelize db:seed:all`


## 3.  Schedules
#### Installing
- For implements Schedules install node-schedule module:

`$ npm i node-schedule --save`

`$ npm i @types/node-schedule --save-dev`

#### Configuring

- Create `src/jobs` folder and view [example](https://github.com/albinojunior/nodeapi-typescript/blob/master/examples/job.example.ts) of job file.

- Create `src/schedule.ts` file ande paste follow code or copy from [example](https://github.com/albinojunior/nodeapi-typescript/blob/master/examples/schedule.example.ts)

```
/* src/schedule.ts */

import { resolve } from "path";
import { scheduleJob } from "node-schedule";
import * as fs from "fs";
import { Job } from "./common/interfaces/job";

export default class Schedule {
  public jobs: Job[] = [];

  public constructor() {
    this.getJobs();
  }

  public getJobs = (): void => {
    const path = resolve("src/jobs");
    let files = fs.readdirSync(path);
    this.jobs = files.map((file): Job => require(`./src/jobs/${file}`));
  };

  public startJobs = (): void => {
    this.jobs.map(
      (job: Job): void => {
        if (job.enabled)
          scheduleJob(job.date, async (): Promise<void> => await job.execute());
      }
    );
  };
}
```
- Import `src/schedule.ts` on app and call **startJobs()** method on *App* constructor


##  4. Running

`$ npm run dev`

## 5. Building

#### DEV

`$ npm build:dev`

#### PROD

`$ npm build:dev

`


## Docs

- [Sequelize](http://docs.sequelizejs.com/)

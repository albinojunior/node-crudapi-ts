
/* path: src/schedule.ts
import { resolve } from "path";
import { scheduleJob } from "node-schedule";

import * as fs from "fs";
import { Job } from "./common/interfaces/job";

const env = process.env.NODE_ENV || "development";
const prefix = env == "development" ? "" : "build/";

export default class Schedule {
  public jobs: Job[] = [];

  public constructor() {
    this.getJobs();
  }

  public getJobs = (): void => {
    const path = resolve(`${prefix}src/jobs`);
    let files = fs.readdirSync(path);
    this.jobs = files.map((file): Job => require(`./jobs/${file}`).default);
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
*/

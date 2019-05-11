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
    let files = fs
      .readdirSync(path)
      .filter((filename: string): boolean => /.*\.job.*/i.test(filename))
      .map((filename: string): string => filename.replace(/\.ts/, ".js"));

    this.jobs = files.map((file): Job => require(`./src/jobs/${file}`));
  };

  public startJobs = (): void => {
    if (!process.env.DISABLE_SCHEDULE) {
      this.jobs.map((job: Job): void => {
        if (job.enabled) scheduleJob(job.date, async (): Promise<void> => await job.execute());
      });
    }
  };
}

import { resolve } from "path";
import { scheduleJob } from "node-schedule";
import * as fs from "fs";
import { Job } from "nodeapi-cruds-ts";

export default class Schedule {
  jobs: any[] = [];

  constructor() {
    this.getJobs();
  }

  getJobs = () => {
    const path = resolve("src/app/jobs");
    let files = fs.readdirSync(path).filter((filename: string) => /.*\.job.*/i.test(filename)).map((filename: string) => filename.replace(/\.ts/, ".js"));
    this.jobs = files.map(file => require(`./app/jobs/${file}`).default);
  }

  startJobs = () => {
    if (!process.env.DISABLE_SCHEDULE) {
      this.jobs.map((job: Job) => {
        if (job.enabled) scheduleJob(job.date, async () => await job.execute());
      })
    }
  }

}

import { Job } from "nodeapi-cruds-ts";

class ExampleJob implements Job {
  date: string = "* * * * *";
  enabled: boolean = true;
  execute = async () => {
    //job content
  }
}

export default new ExampleJob();
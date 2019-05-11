import { Job } from "../common/interfaces/job";

class ExampleJob implements Job {
  public date: string = "* * * * *";
  public enabled: boolean = true;
  public execute = async (): Promise<void> => {};
}

export default new ExampleJob();

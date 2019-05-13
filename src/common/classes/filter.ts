export abstract class Filter {
  abstract execute(where: any, model: any, options: any): any;
}

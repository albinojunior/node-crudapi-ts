export default interface Filter {
  execute(where: any, model: any, options: any): any;
}
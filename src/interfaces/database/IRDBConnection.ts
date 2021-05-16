export abstract class IRDBConnection {
  abstract execute(query: string, params: any): any;
}

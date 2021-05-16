export abstract class INoSQLDBConnection {
  abstract insert(params: any): Promise<any>;
  abstract update(key: any, params: any): Promise<any>;
  abstract finds(params?: any): Promise<Array<any>>;
  abstract delete(params: any): Promise<any>;
  abstract idToString(id: any): string;
}

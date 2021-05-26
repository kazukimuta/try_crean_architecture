import { injectable } from "inversify";
import "reflect-metadata";

@injectable()
export abstract class IRDBConnection {
  abstract execute(query: string, params?: any): any;
}

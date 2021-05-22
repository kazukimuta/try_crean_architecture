import { IRDBConnection } from "../../../src/interfaces/database/IRDBConnection";

export class RDBConnectionMock extends IRDBConnection {
  public execute = jest.fn((query: string, params: any) => <any>{});
  constructor() {
    super();
  }
}

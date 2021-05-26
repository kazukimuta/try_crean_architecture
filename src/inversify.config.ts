import { Container } from "inversify";
import "reflect-metadata";
import Symbols from "./symbols";
import { MysqlConnection } from "./infrastructure/MysqlConnection";
import { RDSTaskRepository } from "./interfaces/database/RDSTaskRepository";
import { NoSQLTaskRepository } from "./interfaces/database/NoSQLTaskRepository";
import { MongodbConnection } from "./infrastructure/MongodbConnection";
import { LocalTaskRepository } from "./interfaces/database/LocalTaskRepository";
import { ITaskRepository } from "./application/repositories/ITaskRepository";
import { IRDBConnection } from "./interfaces/database/IRDBConnection";
import { INoSQLDBConnection } from "./interfaces/database/INoSQLDBConnection";

const container = new Container();

container
  .bind<LocalTaskRepository>(Symbols.LocalTaskRepository)
  .to(LocalTaskRepository);

container
  .bind<NoSQLTaskRepository>(Symbols.NoSQLTaskRepository)
  .to(NoSQLTaskRepository);
container
  .bind<INoSQLDBConnection>(Symbols.INoSQLDBConnection)
  .to(MongodbConnection);

container
  .bind<RDSTaskRepository>(Symbols.RDSTaskRepository)
  .to(RDSTaskRepository);
container.bind<IRDBConnection>(Symbols.IRDBConnection).to(MysqlConnection);

export { container };

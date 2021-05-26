const symbols = {
  ITaskRepository: Symbol.for("ITaskRepository"),
  LocalTaskRepository: Symbol.for("LocalTaskRepository"),
  NoSQLTaskRepository: Symbol.for("NoSQLTaskRepository"),
  RDSTaskRepository: Symbol.for("RDSTaskRepository"),
  INoSQLDBConnection: Symbol.for("INoSQLDBConnection"),
  IRDBConnection: Symbol.for("IRDBConnection"),
  MysqlConnection: Symbol.for("MysqlConnection"),
  MongodbConnection: Symbol.for("MongodbConnection"),
};

export default symbols;

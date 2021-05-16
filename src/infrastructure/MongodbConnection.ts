import { MongoClient, ObjectID } from "mongodb";
import dotenv from "dotenv";
import { INoSQLDBConnection } from "../interfaces/database/INoSQLDBConnection";

export class MongodbConnection extends INoSQLDBConnection {
  private MONGO_URL: string;
  private MONGO_DB: string;
  private MONGO_COLLECTION: string;
  private collection: any;

  constructor() {
    super();
    dotenv.config();
    this.MONGO_URL = process.env.MONGO_URL;
    this.MONGO_DB = process.env.MONGO_DB;
    this.MONGO_COLLECTION = process.env.MONGO_COLLECTION;
  }
  idToString(id: any) {
    return id.toHexString();
  }
  async connect() {
    const client = await MongoClient.connect(this.MONGO_URL, {
      useNewUrlParser: true,
    });
    this.collection = client
      .db(this.MONGO_DB)
      .collection(this.MONGO_COLLECTION);
  }

  async insert(params: any): Promise<any> {
    return this.collection.insertOne(params);
  }
  async update(key: any, params: any): Promise<any> {
    const updateDoc = {
      $set: params,
    };
    return this.collection.updateOne(key, updateDoc, { updsert: true });
  }
  async finds(params?: any): Promise<Array<any>> {
    const cursor = this.collection.find(this.toObjectIdIfNeed(params));
    let results = [];
    await cursor.forEach((elem) => {
      results.push(elem);
    });
    return results;
  }
  async delete(params: any): Promise<any> {
    return this.collection.deleteOne(this.toObjectIdIfNeed(params));
  }
  private toObjectIdIfNeed(params: any): any {
    if (params && params.id) {
      params._id = new ObjectID(params.id);
      delete params.id;
    }
    return params;
  }
}

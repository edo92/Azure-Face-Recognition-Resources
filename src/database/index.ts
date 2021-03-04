import { CosmosClient } from "@azure/cosmos";
import { IData } from "../iface";

interface IProps {
  endpoint: string;
  key: string;
  databaseId: string;
  containerId: string;
}

class Database {
  private client;
  private databaseId;
  private containerId;

  constructor({ endpoint, key, databaseId, containerId }: IProps) {
    this.client = new CosmosClient({ endpoint, key });
    this.databaseId = databaseId;
    this.containerId = containerId;
  }

  private createDatabase = async (): Promise<void> => {
    if (!this.databaseId) throw new Error("Database Id is invalid");
    await this.client.databases.createIfNotExists({
      id: this.databaseId,
    });
  };

  private createContainer = async () => {
    await this.client.database(this.databaseId).containers.createIfNotExists(
      {
        id: this.containerId,
        partitionKey: {
          paths: ["/Country"],
        },
      },
      { offerThroughput: 400 }
    );
  };

  private createFamilyItem = async (data: IData): Promise<void> => {
    if (!this.client) throw new Error(`Client is ${typeof this.client}`);

    if (!this.databaseId && !this.containerId) {
      throw new Error("Invalid Container or Database ID");
    }

    // concat date with save data
    const withDate = Object.assign({}, data, { date: Date.now() });

    await this.client
      .database(this.databaseId)
      .container(this.containerId)
      .items.upsert(withDate);
  };

  public registerClient = async (data: IData): Promise<void> => {
    await this.createDatabase();
    await this.createContainer();
    await this.createFamilyItem(data);
  };
}

export default Database;

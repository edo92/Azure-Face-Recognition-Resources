import DectectionApi from "./faceRecog";
import Database from "./database";
import { IParams, IData, IClient } from "./iface";

interface ISecrets {
  face: {
    FD_SUB_KEY: string;
    FD_ENDPOINT: string;
  };
  database: {
    DB_ENDPOINT: string;
    DB_KEY: string;
    DB_ID: string;
    DB_CONTAINER_ID: string;
  };
}

export class FaceDetection {
  protected ext = "/face/v1.0/detect";

  private FD_SUB_KEY;
  private FD_ENDPOINT;
  private DB_ENDPOINT;
  private DB_KEY;
  private DB_ID;
  private DB_CONTAINER_ID;

  constructor({ face, database }: ISecrets) {
    if (face) {
      const { FD_SUB_KEY, FD_ENDPOINT } = face;
      this.FD_SUB_KEY = FD_SUB_KEY;
      this.FD_ENDPOINT = FD_ENDPOINT + this.ext;
    }

    if (database) {
      const { DB_ENDPOINT, DB_KEY, DB_ID, DB_CONTAINER_ID } = database;
      this.DB_CONTAINER_ID = DB_CONTAINER_ID;
      this.DB_ENDPOINT = DB_ENDPOINT;
      this.DB_KEY = DB_KEY;
      this.DB_ID = DB_ID;
    }
  }

  public async detectFace(image: string, params: IParams): Promise<IClient[]> {
    if (!this.FD_ENDPOINT || !this.FD_SUB_KEY) {
      throw new Error("Face Detecton Keys are Not Valid");
    }

    const detection = new DectectionApi({
      subscriptionKey: this.FD_SUB_KEY,
      endpoint: this.FD_ENDPOINT,
    });

    return await detection.faceRecognition({
      imageUrl: image,
      params: params,
    });
  }

  public async saveDetection(data: IData): Promise<void> {
    if (!this.DB_ENDPOINT || !this.DB_KEY) {
      throw new Error("Credentials are not valid");
    }

    if (!this.DB_ID || !this.DB_CONTAINER_ID) {
      throw new Error("DatabaseId and ContainerId must be string");
    }

    const database = new Database({
      endpoint: this.DB_ENDPOINT,
      key: this.DB_KEY,
      databaseId: this.DB_ID,
      containerId: this.DB_CONTAINER_ID,
    });

    await database.registerClient(data);
  }

  public async detectAndSave(
    image: string,
    params: IParams
  ): Promise<IClient[]> {
    const result = await this.detectFace(image, params);
    await this.saveDetection({ client: result });
    return result;
  }
}

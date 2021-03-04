import axios from "axios";
import { FdParams, IClient, IParams } from "../iface";

export interface ISecrets {
  subscriptionKey: string;
  endpoint: string;
}

export interface IPayload {
  url: string;
}

class DectectionApi {
  private subscriptionKey;
  private endpoint;

  constructor({ subscriptionKey, endpoint }: ISecrets) {
    this.subscriptionKey = subscriptionKey;
    this.endpoint = endpoint;
  }

  public async faceRecognition(data: FdParams): Promise<IClient[]> {
    const { imageUrl, params }: FdParams = data;

    const options: IParams = {
      ...(params || {}),
      ...{
        returnFaceId: true,
        detectionModel: "detection_01",
        returnFaceAttributes: "age,gender",
      },
    };

    const headers = {
      "Ocp-Apim-Subscription-Key": this.subscriptionKey,
    };

    const payload: IPayload = {
      url: imageUrl,
    };

    try {
      const response = await axios({
        method: "post",
        url: this.endpoint,
        params: options,
        data: payload,
        headers: headers,
      });
      return response.data;
    } catch (err) {
      return err;
    }
  }
}

export default DectectionApi;

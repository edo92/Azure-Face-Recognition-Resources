// Face Detector
export interface IParams {
  returnFaceId?: boolean;
  detectionModel?: string;
  returnFaceAttributes?: string;
}

// Detect Api
export interface FdParams {
  imageUrl: string;
  params: IParams;
}

export interface IClient {
  faceId: string;
  faceAttributes: {
    gender: string;
    age: number;
  };
  faceRectangle: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

export interface IData {
  id?: string;
  client: IClient[];
}

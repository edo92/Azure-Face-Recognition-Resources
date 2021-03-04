import { FaceDetection } from "../src";
const { CosmosClient } = require("@azure/cosmos");
import * as mock from "./mocks/mocks.json";

let imageUrl =
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=933&q=80";

const secrets = {
  face: {
    FD_SUB_KEY: process.env.FD_SUB_KEY,
    FD_ENDPOINT: process.env.FD_ENDPOINT,
  },
  database: {
    DB_ENDPOINT: process.env.DB_ENDPOINT,
    DB_KEY: process.env.DB_KEY,
    DB_ID: process.env.DB_ID,
    DB_CONTAINER_ID: process.env.DB_CONTAINER_ID_TEST,
  },
};

let face: any;

beforeAll(() => {
  face = new FaceDetection(secrets);
});

describe("Face Detection Tests", () => {
  it("Detect Face", async () => {
    const res = await face.detectFace(imageUrl, {});

    expect(JSON.stringify(res[0].faceRectangle)).toBe(
      JSON.stringify(mock.faceDetectResult[0].faceRectangle)
    );
    expect(JSON.stringify(res[0].faceAttributes)).toBe(
      JSON.stringify(mock.faceDetectResult[0].faceAttributes)
    );
  });
});

let client;

beforeAll(() => {
  client = new CosmosClient({
    endpoint: secrets.database.DB_ENDPOINT,
    key: secrets.database.DB_KEY,
  });
});

afterAll(async () => {
  await client
    .database(secrets.database.DB_ID)
    .container(secrets.database.DB_CONTAINER_ID)
    .item(secrets.database.DB_CONTAINER_ID)
    .delete({ id: secrets.database.DB_CONTAINER_ID });
});

describe("Database Test", () => {
  it("Save Detection to DB", async () => {
    await face.saveDetection({
      client: mock.faceDetectResult,
      id: secrets.database.DB_CONTAINER_ID,
    });

    const querySpec = {
      query: "SELECT * FROM Families f WHERE f.id = @id",
      parameters: [
        {
          name: "@id",
          value: secrets.database.DB_CONTAINER_ID,
        },
      ],
    };

    let found = await client
      .database(secrets.database.DB_ID)
      .container(secrets.database.DB_CONTAINER_ID)
      .items.query(querySpec)
      .fetchAll();

    expect(found.resources.length).toBe(1);
    expect(found.resources[0].client[0].faceId).toBe(
      mock.faceDetectResult[0].faceId
    );
  });
});

const { FaceDetection } = require("../dist");
require("dotenv").config({ path: "../.env" });

let imageUrl =
  "https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=933&q=80";

const api = new FaceDetection({
  face: {
    FD_SUB_KEY: process.env.FD_SUB_KEY,
    FD_ENDPOINT: process.env.FD_ENDPOINT,
  },
  database: {
    DB_ENDPOINT: process.env.DB_ENDPOINT,
    DB_KEY: process.env.DB_KEY,
    DB_ID: process.env.DB_ID,
    DB_CONTAINER_ID: process.env.DB_CONTAINER_ID,
  },
});

api
  .detectAndSave(imageUrl, {})
  .then(() => {})
  .catch((err) => {});

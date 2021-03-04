# Usage

- Basic example

  ```js
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

  const result = await api.detectAndSave(imageUrl, {});
  console.log(result);
  ```

<br/>

- Passing options
  ```js
  const test = await face.faceRecognition(imageUrl, {
    params: {
      returnFaceAttributes: "age,gender",
    },
  });
  ```


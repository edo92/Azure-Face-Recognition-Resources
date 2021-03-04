[![All Contributors](https://img.shields.io/badge/all_contributors-welcome-orange.svg?style=shield)](#contributors)

<br/>

<img src="https://azure.microsoft.com/svghandler/cognitive-services/?width=600&height=315" width="130"/>

# Azure-Face-Recognition-Resources

- Face Detection with Azure Cognitive Services
- Api Request to face detection endpoint
- Azure DevOps Pipeline

---

## [Setup Azure DevOps Pipeline ](https://github.com/edo92/Azure-Face-Recognition-Resources/blob/docs/devops/devops.md#setup-azure-devops-pipeline)

## Usage

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

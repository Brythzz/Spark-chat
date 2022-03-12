# Spark - Chat Web App
School project - Junior Year (2021)

Websocket chat app built with VueJS

<p align="center">
  <img width="128" height="128" src="https://user-images.githubusercontent.com/62302815/158025442-84df63f8-a74c-4a02-bcaa-d2b1baa919e9.png" alt="logo"/>
</p>
<p align="center">
  <em style="display:block;">The project's logo</em>
</p>

## Setup

```sh
npm install
node src/server
```

By default, the app will start on port `3040`

## Database

The app uses a MongoDB (document) database

User document schema:
```js
{
  email: String,
  username: String,
  password: String,
  color: String,
  admin: Boolean
}
```

Whitelist document schema:
```js
{
  email: String
}
```

Messages are not stored

## Presentation doc

[Presentation PDF file](public/assets/spark.pdf)

## Screenshots

![login](https://user-images.githubusercontent.com/62302815/158025677-f7a3f989-0401-40c9-a7b2-7558f17fd389.png)
![register](https://user-images.githubusercontent.com/62302815/158025688-c67c3ffa-bda0-4021-8255-c62df8e09a64.png)
![chat](https://user-images.githubusercontent.com/62302815/158025682-c38d8f2b-8b6d-4381-8fe8-05058e325cf5.png)
![settings](https://user-images.githubusercontent.com/62302815/158025686-34492c6d-2426-4082-a5f7-f1bf8c94ddc4.png)

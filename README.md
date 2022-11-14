# \[Template] Node web service using Typescript

Quick start boilerplate for building a nodejs web service

## Setup

- Install Node (pref v16 LTS)
- Install deps:
```shell
npm install
```
- Run in web server:
```shell
PORT=7654 node dist/web.js
```
- Run interactive demo:
```shell
npm run docs:dev
```

### Environment variables

- PORT is always required, and can be altered to run the server in multiple processes
- LOG=`log file location` is optional, but when running the server will stream logging to the file rather than stdio.
- TEST=true can be used to run the server in test mode

## Docker

This project is setup to run in [Docker](https://www.docker.com/).
- Install latest version of Docker install on your machine.
- Build the docker image:
```shell
docker build --pull --no-cache .
```
- This will return a value, like: `Successfully built b8e941d58bea`. In this example `b8e941d58bea` is the image ID, aka `<image ID>`.
- Run the image:
```shell
docker run -p 7654:7654 <image ID>
```

## Dependencies

### General

- [Pino](https://github.com/pinojs/pino) for logging (is also bundled with Fastify by default). Using [pino-pretty](https://github.com/pinojs/pino-pretty) as transport to make logs look good in dev.
- [nodemon](https://github.com/remy/nodemon) for development watch + build.
- [fastify](https://github.com/fastify/fastify) for API.
- [esbuild](https://github.com/evanw/esbuild) via [esbuild-node-tsc](https://github.com/a7ul/esbuild-node-tsc) for typescript compiling.

### Development

- [eslint](https://github.com/eslint/eslint) for making the typescript source code look consistent and detecting any problems with formatting.
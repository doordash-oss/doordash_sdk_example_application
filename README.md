# DoorDash SDK Example Application

This sample application is a prototype of a full stack solution. It will create delivery quotes, accept the quote, and allow you to see the delivery status changes as you move them through the delivery simulator. It is written in Typescript and consists of three major parts:

- React front end using webpack server hot reloading
- Express server backend that uses the [Doordash SDK](https://www.npmjs.com/package/@doordash/sdk) to communicate with the [DoorDash Drive API](https://developer.doordash.com/en-US/api/drive)
- (optional) A Redis instance managed by docker. This is used for storing the deliveries you have created.

## Setup

1. Install the required modules
   `npm install`
2. Create a developer account at https://developer.doordash.com/
3. Create your DoorDash Drive sandbox credentials at https://developer.doordash.com/portal/integration/drive/credentials
4. Create your environment variable file in this projects root `touch .env`
5. Copy your sandbox credentials and paste them into `.env` it should look like this.

```
DD_DEVELOPER_ID="DEVELOPER-UUID-HERE"
DD_KEY_ID="KEY-UUID-HERE"
DD_SIGNING_SECRET="SIGNING-SECRET-HASH-HERE"
```

## Development

You need to run two different local processes for development. I prefer to open each one up in a terminal tab so I can see their outputs.

- (optional) Start the redis image with `docker-compose up`
- Start the webpack dev server and express server with `npm start`
- Or you can run the client and server separate `npm run dev:client` and `npm run dev:server`

## Redis as a Data store

If you plan on using Redis as a data store. You first need to edit the .env file and add

```
DATA_STORE="redis"
```

If you need to manually clear out the deliveries in your local instance. Here is all in one command to flush redis
`docker exec -it dd_sdk_redis redis-cli flushall`

The all in one command can be broken down into two separate commands:

1. Shell into your redis docker instance
   `docker exec -it dd_sdk_redis bash`
2. Flush memory in redis
   `redis-cli flushall`

### Contributing

If you would like to contribute to DoorDash SDK Example Application, please make sure to read our [contributor license agreement](CLA.md).

### Apple M1 users

If you're running an older version of Node on an M1 processor you may run into application memory issues. (Upgrading Node to 15.3 or higher)[https://stackoverflow.com/questions/65856300/wasm-code-commit-allocation-failed-process-out-of-memory] should resolve these issues.

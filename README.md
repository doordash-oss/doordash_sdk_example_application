# DoorDash SDK Example Application

This example application is a prototype full stack solution with a React application and Node Express server that uses the [Doordash SDK](https://www.npmjs.com/package/@doordash/sdk) to communicate with the [DoorDash Drive API](https://developer.doordash.com/en-US/api/drive).

The React application and Node Express server can be run locally and with it you can create/accept delivery quotes and view the delivery status changes while stepping them  through the delivery process using the Delivery Simulator.

There are two different storage methods for retaining the deliveries created. The default method is using localStorage in your browser managed by the React application. Optionally, you can use a Redis instance managed by docker as your Data store.

## Setup

1. Install the required modules
   `npm install`
2. Sign up for a developer account at https://developer.doordash.com/
3. Create your DoorDash Drive sandbox credentials [here](https://developer.doordash.com/portal/integration/drive/credentials)
4. Create your environment variable file in this projects root `touch .env`
5. Copy your sandbox credentials and paste them into `.env` your environment variables should look like this

```bash
DD_DEVELOPER_ID="DEVELOPER-UUID-HERE"
DD_KEY_ID="KEY-UUID-HERE"
DD_SIGNING_SECRET="SIGNING-SECRET-HASH-HERE"
```

## Running the example application

Once you have your sandbox credentials added to your `.env` file. You need to run two different local processes to run the application. For development, I prefer to open each one up in a separate windows so I can see their outputs.

- (optional) Start the redis image with `docker-compose up`
- Start the webpack dev server and express server with `npm start`
- Or for development you can run the client and server in separate windows `npm run dev:client` and `npm run dev:server`
- The application should now be running on http://localhost:3000

## Redis as a Data store

If you plan on using Redis as a data store. Edit the `.env` file and add:

```bash
DATA_STORE="redis"
```

If you need to manually clear out the deliveries in your local instance. Here is one liner command to flush redis in your docker container.
```bash
docker exec -it dd_sdk_redis redis-cli flushall
```

The one linter flush command can be broken down into two separate commands:

1. Shell into your redis docker instance
   `docker exec -it dd_sdk_redis bash`
2. Flush memory in redis
   `redis-cli flushall`

### Contributing

If you would like to contribute to the DoorDash SDK Example Application, please make sure to read our [contributor license agreement](CLA.md).

### Apple M1 users

If you're running an older version of Node on an M1 processor you may run into application memory issues. (Upgrading Node to 15.3 or higher)[https://stackoverflow.com/questions/65856300/wasm-code-commit-allocation-failed-process-out-of-memory] should resolve these issues.

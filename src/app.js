import {parseEnvironmentVariables} from './envs';
import {createConnection, disconnect} from './db';
import {createServer} from './server';


const params = parseEnvironmentVariables();

async function main() {
  const connection = await createConnection(params.dbHost, params.dbPort);
  const server = createServer(connection, params.dbName);

  server.listen(params.apiPort);

  await setupExitCallback(connection);
}

function setupExitCallback(connection) {
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  async function cleanup() {
    console.info('Disconnecting from the db.');
    await disconnect(connection);
    console.info('Closing the app.');
    process.exit(1);
  }
}

main();

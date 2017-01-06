import {createConnection, disconnect} from './db';
import {createServer} from './server';


async function main() {
  const connection = await createConnection('0.0.0.0', '28015');
  const server = createServer(connection, 'powietrze_test');

  server.listen(8081);

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

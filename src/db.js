import rethink from 'rethinkdb';


export const createConnection = (dbHost, dbPort) => rethink.connect({host: dbHost, port: dbPort});

export const disconnect = (connection) => connection.close();

export const getCities = async(connection, dbName) => {
  const cursor = await rethink.db(dbName).table('cities').run(connection);
  return cursor.toArray();
};

export const getCity = (connection, dbName, id) => rethink
  .db(dbName)
  .table('cities')
  .get(id)
  .run(connection);

export const getStations = async(connection, dbName) => {
  const cursor = await rethink.db(dbName).table('stations').run(connection);
  return cursor.toArray();
};

export const getStation = (connection, dbName, id) => rethink
  .db(dbName)
  .table('stations')
  .get(id)
  .run(connection);

export const getSensors = async(connection, dbName, stationId) => {
  const cursor = await rethink.db(dbName).table('sensors').filter({stationId}).run(connection);
  return cursor.toArray();
};

export const getSensor = (connection, dbName, id) => rethink
  .db(dbName)
  .table('sensors')
  .get(id)
  .run(connection);

export const getReadings = async(connection, dbName, sensorId) => {
  const cursor = await rethink
    .db(dbName)
    .table('readings')
    .filter({sensorId})
    .withFields('dateTime', 'value')
    .orderBy('dateTime')
    .run(connection);
  return cursor.toArray();
};

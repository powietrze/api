import Koa from 'koa';
import koaRouter from 'koa-router';

import {getCities, getCity, getStations, getStation, getSensors, getReadings} from './db';


export function createServer(connection, dbName) {
  const router = koaRouter()
    .get('/rest/cities/', async(ctx) => {
      const cities = await getCities(connection, dbName);
      ctx.body = JSON.stringify({cities});
    })
    .get('/rest/cities/:id/', async(ctx) => {
      const city = await getCity(connection, dbName, ctx.params.id);
      city ? ctx.body = JSON.stringify({city}) : ctx.status = 404;
    })
    .get('/rest/stations/', async(ctx) => {
      const stations = await getStations(connection, dbName);
      ctx.body = JSON.stringify({stations});
    })
    .get('/rest/stations/:id/', async(ctx) => {
      const station = await getStation(connection, dbName, ctx.params.id);
      station ? ctx.body = JSON.stringify({station}) : ctx.status = 404;
    })
    .get('/rest/sensors/:stationId/', async(ctx) => {
      const sensors = await getSensors(connection, dbName, ctx.params.stationId);
      ctx.body = JSON.stringify({sensors});
    })
    .get('/rest/sensors/:id/readings/', async(ctx) => {
      const readings = await getReadings(connection, dbName, ctx.params.id);
      ctx.body = JSON.stringify({readings});
    });

  const app = new Koa();
  app.use(router.routes());

  return app;
}

import Koa from 'koa';
import koaRouter from 'koa-router';


const router = koaRouter()
  .get('/rest/cities/', async(ctx) => {
    ctx.body = 'All cities';
  })
  .get('/rest/cities/:id/', async(ctx) => {
    ctx.body = 'City for id: ' + ctx.params.id;
  })
  .get('/rest/stations/', async(ctx) => {
    ctx.body = 'All stations';
  })
  .get('/rest/stations/:id/', async(ctx) => {
    ctx.body = 'Station for id: ' + ctx.params.id;
  })
  .get('/rest/sensors/:id/', async(ctx) => {
    ctx.body = 'Sensor for id: ' + ctx.params.id;
  })
  .get('/rest/sensors/:id/readings/', async(ctx) => {
    ctx.body = 'Readings for sensorId: ' + ctx.params.id;
  });

const app = new Koa();
app.use(router.routes());

export const server = app;

import 'reflect-metadata';
import { join } from 'path';
import express from 'express';
import { useExpressServer } from 'routing-controllers';
import { config, CustomErrorHandler } from './common';
import { AdminsController, PostController } from './util/exportController.util';

const { port } = config;
const app = express();
app.use(express.static(join(__dirname, 'public')));

useExpressServer(app, {
  cors: true,
  routePrefix: '/api',
  controllers: [AdminsController, PostController],
  defaultErrorHandler: false,
  middlewares: [CustomErrorHandler],
});

app.listen(port, () => {
  console.log(`server runing at port: ${port}`);
});

export default app;

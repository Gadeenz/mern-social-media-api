import 'dotenv/config';
// connect to db
import { writeFileSync } from 'fs';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
// import express server
import './server';
import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
import { config as conf } from './common';
import { connectToDB } from './db';
import './events';

connectToDB();

const schemas = validationMetadatasToSchemas({
  refPointerPrefix: '#/components/schemas/',
});

const storage = getMetadataArgsStorage();
const spec = routingControllersToSpec(
  storage,
  {},
  {
    components: { schemas },
    info: {
      title: 'central fish agency ',
      version: '1.0.0',
      description: 'API documentation for the central fish agency ',
    },
    servers: [
      {
        url: `${conf.baseUrl}:${conf.port}/api`,
      },
    ],
  }
);
const json = JSON.stringify(spec);

writeFileSync(`${__dirname}/public/spec.json`, json, 'utf8');

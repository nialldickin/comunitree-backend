import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { graphqlUploadExpress } from 'graphql-upload';
import schema from './schema.js';
import cors from 'cors';
import { join } from 'path';

const app = express();

app.use(cors());

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.use('/images', express.static(join(__dirname, '/../uploads')));

app.listen(8080, () => {
  console.log('Server running succefully...');
});

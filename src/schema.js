import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import path from 'path';

const typeDefs = importSchema(
  path.join(__dirname, '../../comunitree/src/api/', 'schema.graphql')
);
const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;

import { GraphQLUpload } from 'graphql-upload';
import { Resolvers } from './types';
import { createGarden } from './mutations/createGardenMutation';
import { singleUpload } from './mutations/singleUploadMutation';
import { createUser } from './mutations/createUserMutation';
import { convertPlaceToCoordinates } from './queries/convertPlaceToCoordinatesQuery';
import { getGardens } from './queries/getGardensQuery';
import { getGeocodedLocation } from './queries/getGeocodedLocationQuery';

const resolvers: Resolvers = {
  Upload: GraphQLUpload,
  Query: {
    viewer: () => ({
      convertPlaceToCoordinates: convertPlaceToCoordinates,
      getGeocodedLocation: getGeocodedLocation,
      getGardens: getGardens
    })
  },
  Mutation: {
    singleUpload: singleUpload,
    createGarden: createGarden,
    createUser: createUser
  }
};

export default resolvers;

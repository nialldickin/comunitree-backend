import {
  Location,
  ViewerConvertPlaceToCoordinatesArgs
} from '../../../comunitree/src/types/graphql';
import { Client } from '@googlemaps/google-maps-services-js';

const googleMaps = new Client({});

type Query = (
  args: ViewerConvertPlaceToCoordinatesArgs
) => Promise<Location>;

export const convertPlaceToCoordinates: Query = async ({
  placeId
}) => {
  try {
    const { data } = await googleMaps.geocode({
      params: {
        place_id: placeId,
        key: process.env.API_KEY || 'api_key_not_found'
      }
    });
    console.log(data.results[0].geometry.location);
    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng
    } as Location;
  } catch (error) {
    console.error(error);
  }
  return {
    latitude: 0,
    longitude: 0
  } as Location;
};

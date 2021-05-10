import {
  AddressPrediction,
  ViewerGetGeocodedLocationArgs
} from '../../../comunitree/src/types/graphql';
import { Client } from '@googlemaps/google-maps-services-js';

const googleMaps = new Client({});

type Query = (
  args: ViewerGetGeocodedLocationArgs
) => Promise<Array<AddressPrediction>>;

export const getGeocodedLocation: Query = async ({ address }) => {
  try {
    const { data } = await googleMaps.placeAutocomplete({
      params: {
        input: address,
        key: process.env.API_KEY || 'key_not_found'
      }
    });

    const places = data.predictions.map((obj) => ({
      description: obj.description,
      place_id: obj.place_id
    }));

    return places;
  } catch (error) {
    console.error(error);
    return [];
  }
};

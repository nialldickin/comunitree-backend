import { Garden } from '../dbConnector.js';
import { CreateGardenMutation } from '../types';

export const createGarden: CreateGardenMutation = async (
  _,
  { garden }
) => {
  console.log('Received request: createGarden');
  console.log(garden);

  const { owner, photos, description, location } = garden;

  try {
    await Garden.create({
      owner: owner,
      description: description,
      photos: photos,
      location: {
        type: 'Point',
        coordinates: [location.longitude, location.latitude]
      }
    });

    return true;
  } catch (error) {
    console.error('Error occured: createGarden');
    console.error(error);
    return false;
  }
};

import {
  GardenList,
  Location,
  SortOrder,
  ViewerGetGardensArgs
} from '../../../comunitree/src/types/graphql';
import { Garden } from '../dbConnector.js';

const convertLocationToAgg = (
  location: Location | undefined,
  searchDistance: number | undefined
) => {
  if (location && searchDistance !== undefined) {
    const distanceMeters = searchDistance * 1.60934 * 1000;
    return [
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude]
          },
          spherical: true,
          distanceField: 'distance',
          maxDistance: distanceMeters,
          distanceMultiplier: 0.000621371 // meter to miles
        }
      }
    ];
  } else {
    return [];
  }
};

const translateSortEnum = (sortEnum: SortOrder) => {
  switch (sortEnum) {
    case 'NEWEST':
      return { $sort: { _id: -1 } };
    case 'OLDEST':
      return { $sort: { _id: 1 } };
    case 'CLOSEST':
      return {
        $sort: {
          distance: 1
        }
      };
    case 'FURTHEST':
      return {
        $sort: {
          distance: -1
        }
      };
    default:
      return { $sort: { _id: 1 } };
  }
};

type Query = (args: ViewerGetGardensArgs) => Promise<GardenList>;

export const getGardens: Query = async ({
  first,
  after,
  sortEnum,
  location,
  searchDistance
}) => {
  // TODO remove these debug statements
  console.log('First:' + first);
  console.log('After:' + after);
  console.log('Enum:' + sortEnum);
  console.log(location);
  console.log('Distance: ' + searchDistance);

  const locationAggregate = convertLocationToAgg(
    location ?? undefined,
    searchDistance ?? undefined
  );

  const sortingAggregate = translateSortEnum(sortEnum);

  const query = Garden.aggregate([
    ...locationAggregate,
    sortingAggregate,
    {
      $addFields: {
        coordinates: {
          longitude: {
            $arrayElemAt: ['$location.coordinates', 0]
          },
          latitude: {
            $arrayElemAt: ['$location.coordinates', 1]
          }
        }
      }
    },
    {
      $facet: {
        gardens: [{ $skip: after }, { $limit: first }],
        total: [
          {
            $count: 'count'
          }
        ]
      }
    },
    {
      $addFields: {
        count: {
          $ifNull: [{ $arrayElemAt: ['$total.count', 0] }, 0]
        }
      }
    }
  ]);

  const result = (await query.exec())[0];

  return {
    gardens: result.gardens,
    count: result.count
  };
};

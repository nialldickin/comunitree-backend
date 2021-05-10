import { Document } from 'mongoose';

import { GraphQLScalarType } from 'graphql';
import {
  Mutation,
  MutationCreateGardenArgs,
  MutationCreateUserArgs,
  MutationSingleUploadArgs,
  Viewer,
  ViewerConvertPlaceToCoordinatesArgs,
  ViewerGetGardensArgs,
  ViewerGetGeocodedLocationArgs
} from '../../comunitree/src/types/graphql';

type TParent = unknown;

interface Garden {
  owner: {
    firstName: string;
    lastName: string;
    username: string;
  };
  description: string;
  location: {
    type: string;
    coordinates: number[];
  };
  photo: [
    {
      filename: string;
    }
  ];
}

export interface GardenDocument extends Garden, Document {}

export type ConvertPlaceToCoordinatesQuery = (
  args: ViewerConvertPlaceToCoordinatesArgs
) => Promise<Viewer['convertPlaceToCoordinates']>;

export type GetGeocodedLocationQuery = (
  args: ViewerGetGeocodedLocationArgs
) => Promise<Viewer['getGeocodedLocation']>;

export type GetGardensQuery = (
  args: ViewerGetGardensArgs
) => Promise<Viewer['getGardens']>;

export interface ViewerResolver {
  convertPlaceToCoordinates: ConvertPlaceToCoordinatesQuery;
  getGeocodedLocation: GetGeocodedLocationQuery;
  getGardens: GetGardensQuery;
}

export interface QueryResolver {
  viewer: () => ViewerResolver;
}

export type SingleUploadMutation = (
  parent: TParent,
  args: MutationSingleUploadArgs
) => Promise<Mutation['singleUpload']>;

export type CreateGardenMutation = (
  parent: TParent,
  args: MutationCreateGardenArgs
) => Promise<Mutation['createGarden']>;

export type CreateUserMutation = (
  parent: TParent,
  args: MutationCreateUserArgs
) => Promise<Mutation['createUser']>;

export interface MutationResolver {
  singleUpload: SingleUploadMutation;
  createGarden: CreateGardenMutation;
  createUser: CreateUserMutation;
}

export interface Resolvers {
  Upload: GraphQLScalarType;
  Query: QueryResolver;
  Mutation: MutationResolver;
}

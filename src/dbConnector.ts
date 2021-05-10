import mongoose from 'mongoose';
import { GardenDocument } from './types';

mongoose.connection.on('connected', () => {
  console.log('Connected to the database');
});

mongoose.connect('mongodb://localhost/comunitree', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const gardenSchema = new mongoose.Schema({
  owner: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  },
  description: {
    type: String,
    required: true
  },
  photos: [{ filename: String }],
  location: {
    type: { type: String, required: true },
    coordinates: {
      type: [Number],
      required: true
    }
  }
});

const Garden = mongoose.model<GardenDocument>(
  'gardens',
  gardenSchema
);

export { Garden };

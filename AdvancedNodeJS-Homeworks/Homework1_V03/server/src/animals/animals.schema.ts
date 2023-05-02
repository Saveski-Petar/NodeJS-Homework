import { Schema } from 'mongoose';
import { AnimalDenger, AnimalGender } from './interfaces/animals';

const CharacteristicsStructure = new Schema(
  {
    food: {
      type: [String],
    },
    colour: {
      type: String,
    },
    isDangerous: {
      type: String,
      enum: Object.keys(AnimalDenger),
      default: AnimalDenger.Harmless,
    },
    weight: {
      type: Number,
    },
    enclosure: {
      type: String,
    },
  },
  { _id: false },
);

export const AnimalSchema = new Schema({
  name: {
    type: String,
  },
  type: {
    type: String,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
  gender: {
    type: String,
    enum: Object.keys(AnimalGender),
  },
  characteristics: {
    type: CharacteristicsStructure,
  },
  zookeeper: {
    type: Schema.Types.ObjectId,
    ref: 'Zookeeper',
  },
});

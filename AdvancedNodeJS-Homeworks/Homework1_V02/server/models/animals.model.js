import { Schema, model } from 'mongoose'

const CharacteristicsStructure = new Schema({
  _id: false,
  food: {
    type: [String],
  },
  colour: {
    type: String,
  },
  isDangerous: {
    type: Boolean,
    default: false,
  },
  weight: {
    type: Number,
    min: 0,
  },
  enclosure: {
    type: String,
    required: true,
  },
})

const AnimalSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 2,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  location: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['M', 'F'],
  },
  characteristics: {
    type: CharacteristicsStructure,
    required: true,
  },
  zookeeper: {
    type: Schema.Types.ObjectId,
    ref: 'Zookeeper',
  },
})

const Animal = model('Animal', AnimalSchema)

export default Animal

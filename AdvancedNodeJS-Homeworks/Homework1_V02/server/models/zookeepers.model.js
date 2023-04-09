import { Schema, model } from 'mongoose'

const zookeeperSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 5,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 110,
  },
  location: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Animal',
    },
  ],
})

const Zookeeper = model('Zookeeper', zookeeperSchema)

export default Zookeeper

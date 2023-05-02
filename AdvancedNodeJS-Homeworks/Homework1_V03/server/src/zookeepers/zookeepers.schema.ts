import { Schema } from 'mongoose';
import { ZookeeperStatus } from './interfaces/zookeeper';

export const ZookeeperSchema = new Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  location: {
    type: String,
  },
  isActive: {
    type: String,
    enum: Object.keys(ZookeeperStatus),
    default: ZookeeperStatus.inactive,
    required: false,
  },
  animals: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Animal',
    },
  ],
});

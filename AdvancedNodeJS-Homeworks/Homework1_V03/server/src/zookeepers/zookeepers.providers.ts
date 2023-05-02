import { Connection } from 'mongoose';
import { ZookeeperSchema } from './zookeepers.schema';

export const zookeepersProviders = [
  {
    provide: 'ZOOKEEPER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Zookeeper', ZookeeperSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

import { Connection, connection } from 'mongoose';
import { AnimalSchema } from './animals.schema';

export const AnimalsProviders = [
  {
    provide: 'ANIMAL_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Animal', AnimalSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];

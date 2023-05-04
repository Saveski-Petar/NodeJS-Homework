import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ZookeeperStatus } from './interfaces/zookeeper.interface';
import { Animal } from 'src/animals/animal.entity';
// import { Animal } from 'src/animals/animal.entity';

@Entity()
export class Zookeeper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  age: number;

  @Column()
  location: string;

  @Column()
  isActive: ZookeeperStatus;

  @OneToMany(() => Animal, (animal) => animal.zookeeper)
  animals: Animal[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

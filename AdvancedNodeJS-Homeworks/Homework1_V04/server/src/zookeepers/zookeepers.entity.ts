import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ZookeeperStatus } from './interfaces/zookeeper.interface';

@Entity()
export class Zookeeper {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;
  @Column()
  age: number;
  @Column()
  location: string;
  @Column()
  isActive: ZookeeperStatus;
}

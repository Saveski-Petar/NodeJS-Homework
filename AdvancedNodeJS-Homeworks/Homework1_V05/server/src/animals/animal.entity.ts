import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AnimalDanger, animalGender } from './interface/animal';
import { Type } from 'class-transformer';
import { AnimalCharacteristics } from './dtos/animal-characteristics.dto';
import { Zookeeper } from 'src/zookeepers/zookeepers.entity';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column('int')
  age: number;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: animalGender,
  })
  gender: animalGender;

  @Column({
    type: 'json',
  })
  @Type(() => AnimalCharacteristics)
  characteristics: AnimalCharacteristics;

  @Column({
    nullable: true,
  })
  zookeeperId: string;

  @ManyToOne(() => Zookeeper, (zookeeper) => zookeeper.animals)
  zookeeper: Zookeeper;

  @CreateDateColumn()
  createdAt!: Date;
  @UpdateDateColumn()
  updatedAt!: Date;
  @DeleteDateColumn()
  deletedAt?: Date;
}

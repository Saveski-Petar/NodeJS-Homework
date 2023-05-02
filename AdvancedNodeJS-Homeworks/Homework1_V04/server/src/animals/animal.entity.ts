import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AnimalGender, AnimalDenger } from './interface/animal.interface';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  age: number;

  @Column()
  location: string;

  @Column({
    type: 'enum',
    enum: AnimalGender,
  })
  gender: AnimalGender;

  @Column({
    type: 'json',
    nullable: true,
  })
  characteristics: {
    food?: string[];
    colour?: string;
    isDangerous: AnimalDenger;
    weight?: number;
    enclosure: string;
  };
}

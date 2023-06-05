import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { ZookeeperStatus } from "./interfaces/zookeeper.interface";
import { Animal } from "src/animals/animal.entity";
import { RolesEnum } from "src/auth/role.enum";
// import { Animal } from 'src/animals/animal.entity';

@Entity()
export class Zookeeper {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  fullName: string;

  @Column("int")
  age: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  location: string;

  @Column({
    type: "enum",
    enum: ZookeeperStatus,
    default: ZookeeperStatus.inactive,
  })
  isActive: ZookeeperStatus;

  @Column({
    type: "enum",
    enum: RolesEnum,
    default: RolesEnum.zookeeper,
  })
  role: RolesEnum;

  @OneToMany(() => Animal, (animal) => animal.zookeeper)
  animals: Animal[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}

import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { UserRegisterDto, UserResponseDto } from "./dtos/user.dto";
import { RolesEnum } from "../auth/role.enum";
import { ZookeepersService } from "src/zookeepers/zookeepers.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly zookeeperService: ZookeepersService,
  ) {}

  async createUser(user: UserRegisterDto): Promise<UserResponseDto> {
    const userExists = await this.findUserByEmail(user.email);
    const zookeeperExists = await this.zookeeperService.findZookeeperByEmail(
      user.email,
    );

    if (userExists) {
      throw new ConflictException("User with that email already exists");
    }
    if (!userExists && zookeeperExists) {
      throw new ConflictException("Email is already registered ");
    }
    const { confirmPassword, ...rest } = user;

    return await this.userRepository.save(rest);
  }

  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({});

    if (users.length === 0)
      throw new Error("There are no users in our database");

    return users;
  }

  async findUserById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user)
      throw new NotFoundException(`User with the id: ${id} doesnt exist`);

    return user;
  }

  async findUserByEmail(email: string): Promise<UserResponseDto> {
    const user = this.userRepository.findOne({ where: { email } });

    if (!user)
      throw new NotFoundException(`User with the email: ${email} doesnt exist`);

    return user;
  }

  async addEmployee(id: string, role: RolesEnum) {
    const user = await this.findUserById(id);

    const IfEmailAlreadyExist =
      await this.zookeeperService.findZookeeperByEmail(user.email);

    if (IfEmailAlreadyExist)
      throw new ConflictException(
        `Employee with the email ${user.email} already exist`,
      );

    user.role = role;

    if (user.role === RolesEnum.zookeeper) {
      await this.zookeeperService.addZookeeper(user);
    }

    await this.userRepository.delete(id);

    return user;
  }
}

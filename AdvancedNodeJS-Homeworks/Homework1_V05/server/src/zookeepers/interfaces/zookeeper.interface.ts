import { RolesEnum } from "../../auth/role.enum";

export interface Zookeeper {
  id: string;
  fullName: string;
  age: number;
  email: string;
  location: string;
  isActive: ZookeeperStatus;
  role: RolesEnum;
}

export enum ZookeeperStatus {
  active = "active",
  inactive = "inactive",
}

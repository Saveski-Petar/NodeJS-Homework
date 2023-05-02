export interface Zookeeper {
  id: string;
  name: string;
  age: number;
  location: string;
  isActive: ZookeeperStatus;
  //animals:...
}

export enum ZookeeperStatus {
  active = 'active',
  inactive = 'inactive',
}

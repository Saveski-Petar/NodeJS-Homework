export interface Animal {
  id: string;
  name: string;
  type: string;
  age: number;
  location: string;
  gender: animalGender;
  zookeeperID?: string;
  characteristics: {
    food?: string[];
    color?: string;
    isDangerous: AnimalDanger;
    weight?: number;
    enclosure: string;
  };
}

export enum animalGender {
  Male = 'Male',
  Female = 'Female',
}

export enum AnimalDanger {
  Dangerous = 'Dangerous',
  Harmless = 'Harmless',
}

export interface Animal {
  id: string;
  name: string;
  type: string;
  age: number;
  location: string;
  gender: AnimalGender;
  characteristics: {
    food?: string[];
    color?: string;
    isDangerous: AnimalDenger;
    weight?: number;
    enclosure: string;
  };
}

export enum AnimalGender {
  Male = 'Male',
  Female = 'Female',
}
export enum AnimalDenger {
  Dangerous = 'Dangerous',
  Harmless = 'Harmless',
}

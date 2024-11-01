export interface Breed {
  id: string;
  name: string;
  temperament?: string;
  [key: string]: any;
}

export interface Cat {
  id: string;
  url: string;
  breeds: Breed[];
}

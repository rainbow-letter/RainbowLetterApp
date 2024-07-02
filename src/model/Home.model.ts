import { ImageSourcePropType } from 'react-native';
import { Image } from './Image.model';

export interface Contents {
  title: string;
  description: string;
  link: string;
  image: ImageSourcePropType;
  isImpotant: boolean;
}

export interface PetDashBoard {
  id: number;
  name: string;
  letterCount: number;
  favoriteCount: number;
  image: Image;
  deathAnniversary: string;
}

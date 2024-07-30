import { StyleProp } from 'react-native';

export interface StyledPetRegisterTitle {
  titleStyle: StyleProp<any>;
}

export interface PetRegister {
  name: string;
  species: string;
  owner: string;
  personalities: string[];
  deathAnniversary: string | null;
  image: any;
  year?: string;
  month?: string;
  day?: string;
}

export interface PetFavorite {
  id: number;
  total: number;
  dayIncreaseCount: number;
  canIncrease: boolean;
}

export interface Pets {
  id: number;
  name: string;
  deathAnniversary: string;
  image: any;

  species?: string;
  owner?: string;
  personalities?: string[];
  favorite?: PetFavorite;

  letterCount?: number;
  favoriteCount?: number;
}

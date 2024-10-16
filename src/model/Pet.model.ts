import { StyleProp } from 'react-native';

export interface StyledPetRegisterTitle {
  titleStyle: StyleProp<any>;
}

export interface PetRegister {
  name: string | undefined;
  species: string | undefined;
  owner: string | undefined;
  personalities: string[] | undefined;
  deathAnniversary: string | null | undefined;
  image: string | undefined;
  year?: string | null | undefined;
  month?: string | null | undefined;
  day?: string | null | undefined;
}

export interface PetFavorite {
  id: number;
  total: number;
  dayIncreaseCount: number;
  canIncrease: boolean;
  lastIncreasedAt: Date | string;
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

export interface PetsList {
  id: number;
  userId: number;
  name: string;
  species: string;
  owner: string;
  personalities: string[];
  deathAnniversary: string;
  image: string;
  favorite: PetFavorite;
  createdAt: Date | string;
  updatedAt: Date | string;
}

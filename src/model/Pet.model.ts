import { StyleProp } from 'react-native';

export interface Pet {
  name: string;
  species: string;
  owner: string;
  personalities: string[];
  deathAnniversary: string | null;
  image: any;
}

export interface StyledPetRegisterTitle {
  titleStyle: StyleProp<any>;
}

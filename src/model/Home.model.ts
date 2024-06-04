import { ImageSourcePropType } from 'react-native';

export default interface Contents {
  title: string;
  description: string;
  link: string;
  image: ImageSourcePropType;
  isImpotant: boolean;
}

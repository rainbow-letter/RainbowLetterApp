import { View } from 'react-native';
import React from 'react';

import CoverImage from '../common/CoverImage';
import ThickDivider from '../home/ThickDivider';
import { PetsList } from '../../model/Pet.model';
import InfoBox from './InfoBox';
import PetToggle from './PetToggle';

type Props = {
  petsList: PetsList[];
};

const PetInfoCard = ({ petsList }: Props) => {
  return (
    <View>
      <PetToggle petsList={petsList} />
      <CoverImage />
      <InfoBox />
      <ThickDivider />
    </View>
  );
};

export default PetInfoCard;

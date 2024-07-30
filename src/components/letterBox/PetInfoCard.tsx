import { View } from 'react-native';
import React from 'react';

import CoverImage from '../common/CoverImage';
import ThickDivider from '../home/ThickDivider';
import { Pets } from '../../model/Pet.model';
import InfoBox from './InfoBox';
import PetToggle from './PetToggle';

type Props = {
  petsList: Pets[];
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

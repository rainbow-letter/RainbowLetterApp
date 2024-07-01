import { View } from 'react-native';
import React from 'react';

import AccountBox from './AccountBox';
import PetBox from './PetBox';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

const PetsSection = () => {
  const token = useSelector((state: RootState) => state.account.token);

  return <View>{token ? <PetBox /> : <AccountBox />}</View>;
};

export default PetsSection;

import { View } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/reducer';
import AccountBox from '../../components/home/AccountBox';
import PetBox from '../../components/home/PetBox';

const PetsSection = () => {
  const token = useSelector((state: RootState) => state.account.token);

  return <View>{token ? <PetBox /> : <AccountBox />}</View>;
};

export default PetsSection;

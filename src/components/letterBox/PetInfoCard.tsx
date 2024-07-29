import { View, Text } from 'react-native';
import React from 'react';

import CoverImage from '../common/CoverImage';
import ThickDivider from '../home/ThickDivider';

const PetInfoCard = () => {
  return (
    <View>
      <CoverImage />
      <View style={{ paddingTop: 242 }}>
        <View
          style={{
            backgroundColor: 'white',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            paddingTop: 24,
            paddingHorizontal: 18,
            paddingBottom: 30,
          }}>
          <Text>단추</Text>
          <Text>#애교많은</Text>
          <Text>아이에게 나는 사랑하는 엄마</Text>
        </View>
        <ThickDivider />
      </View>
    </View>
  );
};

export default PetInfoCard;

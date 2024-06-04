import { View, useWindowDimensions } from 'react-native';
import React from 'react';
import RenderHTML from 'react-native-render-html';

import Secesstion from '../../model/Secesstion.model';
import { THEME } from '../../constants/theme';

const SecesstionItem = ({ item }: { item: Secesstion }) => {
  const { width } = useWindowDimensions();
  const tagsStyles = {
    p: {
      color: THEME.COLOR.BLACK_1,
      marginTop: 6,
      fontSize: 16,
    },
  };

  return (
    <View>
      <RenderHTML
        contentWidth={width}
        source={{ html: item.contents }}
        tagsStyles={tagsStyles}
      />
    </View>
  );
};

export default SecesstionItem;

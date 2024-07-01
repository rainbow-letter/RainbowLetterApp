import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';

import CarouselItem from './CarouselItem';
import { THEME } from '../../constants/theme';

type Props = {
  gap: number;
  offset: number;
  pages: any[];
  pageWidth: number;
};

const Carousel = ({ pages, pageWidth, gap, offset }: Props) => {
  function renderItem({ item }: any) {
    return (
      <CarouselItem
        item={item}
        style={{
          width: pageWidth,
          marginHorizontal: gap / 2,
          backgroundColor:
            item.type === 'letter' ? THEME.COLOR.GRAY_2 : THEME.COLOR.ORANGE_3,
        }}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <FlatList
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={pages}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: any) => `page__${item.id}`}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  screen: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

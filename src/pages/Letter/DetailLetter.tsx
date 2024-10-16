import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootBottomTabParamList } from '../../components/bottomTab/BottomTabScreen';
import { RootState } from '../../store/reducer';
import { getLetter } from '../../api/letter';
import { Letter } from '../../model/Letter.model';
import CoverImage from '../../components/common/CoverImage';
import { THEME } from '../../constants/theme';
import LetterPaper from '../../components/detailLetter/LetterPaper';
import SentImage from '../../components/detailLetter/SentImage';
import Button from '../../components/common/Button';

type Props = {
  route: any;
};

const DetailLetter = ({ route }: Props) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootBottomTabParamList>>();
  const { id } = route.params;
  const { token } = useSelector((state: RootState) => state.account);
  const [letterData, setLetterData] = useState<Letter | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await getLetter(token, id);

      setLetterData(data);
    })();
  }, [token, id]);

  const onClickReplyButton = useCallback(() => {
    navigation.navigate('WriteLetter');
  }, [navigation]);

  const isExistReplyContents = !!letterData?.reply?.content;
  const isExistSentImage = !!letterData?.letter.image;

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <View style={styles.relativeLayout}>
          <CoverImage />
          <LetterPaper
            content={letterData?.letter.content}
            pet={letterData?.pet.name}
            timeStamp={letterData?.letter.createdAt}
            type="LETTER"
          />
        </View>
        {isExistReplyContents && (
          <LetterPaper
            content={letterData?.reply.content}
            pet={letterData?.pet.name}
            timeStamp={letterData?.reply.createdAt}
            type="REPLY"
          />
        )}
        {isExistSentImage && <SentImage objectKey={letterData?.letter.image} />}
        <Button
          isCheck={isExistReplyContents}
          style={styles.button}
          onPress={onClickReplyButton}>
          답장 쓰기
        </Button>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DetailLetter;

const styles = StyleSheet.create({
  screen: {
    height: '100%',
    backgroundColor: THEME.COLOR.WHITE,
    paddingHorizontal: 18,
  },
  relativeLayout: {
    position: 'relative',
    marginTop: 10,
  },
  button: {
    marginVertical: 50,
  },
});

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  Pressable,
  FlatList,
} from 'react-native';

import TipItem from './TipItem';
import TipList from '../../constants/WriteLetter/constants';
import { THEME } from '../../constants/theme';
import { Tip } from '../../model/Letter.model';
import Info from '../../assets/ic_write_info.svg';
import Cancel from '../../assets/ic_write_cancel.svg';

const { width } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

const WriteLetterTutorial = ({ visible, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const animatedValue = useRef(new Animated.Value(0)).current;

  const renderItems = useCallback(({ item }: { item: Tip }) => {
    return <TipItem item={item} />;
  }, []);

  useEffect(() => {
    if (visible) {
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [visible, animatedValue]);

  const handlePress = () => {
    if (step === 1) {
      setStep(2);
    } else {
      onClose();
    }
  };

  return (
    <>
      <Pressable onPress={handlePress} style={styles.tipButton}>
        <Info />
        <Text style={styles.tipText}>TIP. 이런 주제로도 써보세요</Text>
      </Pressable>
      <Modal visible={visible} transparent={true}>
        <TouchableOpacity style={styles.overlay} onPress={handlePress}>
          <View style={styles.tooltipContainer}>
            {step === 1 && (
              <>
                <Animated.View
                  style={[
                    styles.highlight,
                    {
                      top: 80,
                      right: 26,
                      opacity: animatedValue,
                    },
                  ]}
                />
                <Text
                  style={[styles.tooltip, { top: 130, left: width / 2 - 50 }]}>
                  편지 보낼 아이를 선택할 수 있어요!
                </Text>
              </>
            )}
            {step === 2 && (
              <View style={styles.tipbox}>
                <Cancel style={styles.cancel} />
                <Text style={[styles.tipTitle]}>이런 주제로 써보세요</Text>
                <FlatList
                  data={TipList}
                  renderItem={renderItems}
                  keyExtractor={item => item.id}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  tipButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 16,
  },
  tipText: {
    fontSize: 14,
    color: THEME.COLOR.GRAY_1,
    textDecorationLine: 'underline',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 18,
  },
  tooltipContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  highlight: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 3,
    borderColor: THEME.COLOR.WHITE,
  },
  tooltip: {
    position: 'absolute',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 5,
  },
  tipbox: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 34,
    borderRadius: 15,
    width: '100%',
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 'auto',
    marginBottom: 24,
  },
  cancel: {
    position: 'absolute',
    right: 16,
    top: 13,
  },
});

export default WriteLetterTutorial;

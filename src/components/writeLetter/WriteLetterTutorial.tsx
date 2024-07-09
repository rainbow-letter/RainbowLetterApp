import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import { THEME } from '../../constants/theme';

const { width } = Dimensions.get('window');

type Props = {
  visible: boolean;
  onClose: () => void;
};

const WriteLetterTutorial = ({ visible, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const animatedValue = useRef(new Animated.Value(0)).current;

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
            <>
              <Animated.View
                style={[
                  styles.highlight,
                  {
                    bottom: 50,
                    left: width / 2 - 25,
                    opacity: animatedValue,
                  },
                ]}
              />
              <Text
                style={[styles.tooltip, { bottom: 100, left: width / 2 - 75 }]}>
                This is the bottom part
              </Text>
            </>
          )}
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});

export default WriteLetterTutorial;

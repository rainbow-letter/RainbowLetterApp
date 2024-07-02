import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import DateInput from '../../common/DateInput';
import Chip from '../../common/Chip';

const DateSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  return (
    <View style={styles.section}>
      <View>
        <Text style={titleStyle}>아이가 떠난 날</Text>
        <View style={styles.dateWrap}>
          <View style={styles.inputWrap}>
            <DateInput placeholder="YYYY" width={70} />
            <Text style={styles.dateText}>년</Text>
            <DateInput placeholder="MM" width={55} />
            <Text style={styles.dateText}>월</Text>
            <DateInput placeholder="DD" width={55} />
            <Text style={styles.dateText}>일</Text>
          </View>
          <Chip
            value="몰라요"
            isSelected={false}
            onClick={() => console.log('s')}
          />
        </View>
      </View>
    </View>
  );
};

export default DateSection;

const styles = StyleSheet.create({
  section: {
    marginTop: 45,
  },
  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputWrap: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dateText: {
    padding: 8,
  },
});

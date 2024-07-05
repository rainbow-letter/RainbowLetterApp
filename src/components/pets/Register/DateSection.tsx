import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { StyledPetRegisterTitle } from '../../../model/Pet.model';
import DateInput from '../../common/DateInput';
import Chip from '../../common/Chip';
import { RootState } from '../../../store/reducer';
import PetRegisterSlice from '../../../slices/pets';
import { filterNumericValue } from '../../../utils/date';

const DateSection = ({ titleStyle }: StyledPetRegisterTitle) => {
  const { year, month, day, deathAnniversary } = useSelector(
    (state: RootState) => state.petRegister,
  );
  const dispatch = useDispatch();

  const handleCheckUnknownDate = useCallback(() => {
    const action = PetRegisterSlice.actions.setPetInfo({
      deathAnniversary: null,
      year: '',
      month: '',
      day: '',
    });
    dispatch(action);
  }, [dispatch]);

  const handleInputYear = useCallback(
    (year: string) => {
      const value = filterNumericValue(year);

      const action = PetRegisterSlice.actions.setYear(value);
      dispatch(action);
    },
    [dispatch],
  );

  const handleInputMonth = useCallback(
    (month: string) => {
      const value = filterNumericValue(month);

      const action = PetRegisterSlice.actions.setMonth(value);
      dispatch(action);
    },
    [dispatch],
  );

  const handleInputDate = useCallback(
    (day: string) => {
      const value = filterNumericValue(day);

      const action = PetRegisterSlice.actions.setDay(value);
      dispatch(action);
    },
    [dispatch],
  );

  return (
    <View style={styles.section}>
      <View>
        <Text style={titleStyle}>아이가 떠난 날</Text>
        <View style={styles.dateWrap}>
          <View style={styles.inputWrap}>
            <DateInput
              placeholder="YYYY"
              width={70}
              onChange={handleInputYear}
              value={year}
            />
            <Text style={styles.dateText}>년</Text>
            <DateInput
              placeholder="MM"
              width={55}
              onChange={handleInputMonth}
              value={month}
            />
            <Text style={styles.dateText}>월</Text>
            <DateInput
              placeholder="DD"
              width={55}
              onChange={handleInputDate}
              value={day}
            />
            <Text style={styles.dateText}>일</Text>
          </View>
          <Chip
            value="몰라요"
            isSelected={deathAnniversary === null}
            onClick={handleCheckUnknownDate}
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

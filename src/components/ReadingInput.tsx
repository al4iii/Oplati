import React, {useEffect, useState} from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import {COLORS, FONTS} from '../constants/theme';
import {MeteringDevice} from '../store/UserData/types';
import {APIStatus} from '../lib/axiosAPI';
import {useGetMeteringDevice} from '../hooks/useGetMeteringDevice';

export interface Reading {
  muId: string;
  readings: number | null;
}

interface ReadingInputProps {
  data: MeteringDevice[];
  toggleModal: () => void;
  onSave: (data: {needSave: boolean; readings: Reading[]}) => void;
  status: string;
}

const ReadingInput: React.FC<ReadingInputProps> = ({ data, onSave, toggleModal, status }) => {
  const {fetch: fetchGetMeteringDevice} = useGetMeteringDevice();
  const [readings, setReadings] = useState<Reading[]>( data.map(item => ({muId: item.id, readings: null})));

  const onReadingChange = (index: number, value: string) => {
    const newReadings = [...readings];
    newReadings[index].readings = parseInt(value);
    setReadings(newReadings);
  };

  const isReadingValid = (reading: Reading) => {
    const device = data.find(item => item.id === reading.muId);
    if (!device) {
      return true;
    }
    const todayReadingValue = device.todayReadingValue ?? device.lastReadingValue;
    return reading.readings === null || reading.readings >= todayReadingValue;
  };

  const onSaveClick = () => {
    const invalidReading = readings.find(reading => !isReadingValid(reading));
    const hasValidReading = readings.some(item => item.readings !== null);

    if (!hasValidReading) {
      Alert.alert('Введите значение');
      return;
    }

    if (invalidReading) {
      Alert.alert('Одно или несколько значения не корректны.');
      return;
    }

    const dataToSave = readings.filter(item => item.readings !== null).map(item => ({
        muId: item.muId,
        readings: item.readings!,
      }));

    onSave({needSave: true, readings: dataToSave});
  };

  useEffect(() => {
    if (status === APIStatus.Success) {
      fetchGetMeteringDevice();
      toggleModal();
    } else if (status === APIStatus.Failure) {
      Alert.alert('Что-то пошло не так. Попробуйте позже.');
    }
  }, [status]);

  return (
    <ScrollView>
      {data.map((item, index) => (
        <View key={item.id} style={styles.borderContainer}>
          <View style={styles.rowContainer}>
            <Text style={styles.headerText2}>№ {`${item.number}`}</Text>
            <Text style={styles.text}>{`${
              item.todayReadingValue ?? item.lastReadingValue
            } `}</Text>
          </View>
          <View style={styles.rowContainer}>
            <Text style={styles.headerText2}>{`${item.facility}`}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Новые показания ${item.facility}`}
              keyboardType="numeric"
              onChangeText={value => onReadingChange(index, value)}
            />
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.touchableOpacity} onPress={onSaveClick}>
        <Text>{'Отправить показания'}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  borderContainer: {
    borderBottomColor: COLORS.grayLight,
    borderBottomWidth: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '50%',
    borderRadius: 5,
  },
  headerText2: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  text: {
    ...FONTS.body1,
    color: COLORS.gray,
  },
  touchableOpacity: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'flex-end',
    paddingHorizontal: 70,
    height: 50,
    borderRadius: 12.5,
    backgroundColor: COLORS.primary,
  },
});

export default ReadingInput;

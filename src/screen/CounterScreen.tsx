import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {useGetMeteringDevice} from '../hooks/useGetMeteringDevice';
import ReadingInput, {Reading} from '../components/ReadingInput';
import {useSendMeteringDevice} from '../hooks/useSendMeteringDevice';
import Modal from 'react-native-modal';
import {COLORS, FONTS} from '../constants/theme';
import {MeteringDevice} from '../store/UserData/types';
import CrossSVG from '../assets/icons/svgIcons/CrossSVG';

const CounterScreen = () => {
  const meteringDevice = useSelector<RootState, MeteringDevice[] | null>(state => state.userData.meteringDevice);
  const {fetch: fetchSendMeteringDevice, status} = useSendMeteringDevice();
  const {fetch: fetchGetMeteringDevice} = useGetMeteringDevice();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const handleSave = (data: {needSave: boolean; readings: Reading[]}) => {
    fetchSendMeteringDevice(data);
  };

  useEffect(() => {
    fetchGetMeteringDevice();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>{'Регистрация показаний'}</Text>
        </View>
      </View>

      <View style={styles.content}>
        <ScrollView>
          {meteringDevice?.map(
            ({
              id,
              number,
              facility,
              lastReadingDate,
              lastReadingValue,
              todayReadingDate,
              todayReadingValue,
            }) => (
              <View
                key={id}
                style={{
                  borderBottomColor: COLORS.grayLight,
                  borderBottomWidth: 1,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                  }}>
                  <Text style={styles.headerText2}>{`№ ${number}`}</Text>
                  <Text style={styles.text}>{`${
                    todayReadingValue ? todayReadingDate : lastReadingDate
                  } `}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                  }}>
                  <Text style={styles.headerText2}>{facility}</Text>
                  <Text style={styles.text}>{`${
                    todayReadingValue ?? lastReadingValue
                  } `}</Text>
                </View>
              </View>
            ),
          )}
        </ScrollView>
        <View style={{}}>
          {meteringDevice && meteringDevice.length && (
            <TouchableOpacity
              style={styles.touchableOpacity}
              onPress={toggleModal}>
              <Text style={styles.text}>{'Передать показания'}</Text>
            </TouchableOpacity>
          )}
          <Modal
            isVisible={isModalVisible}
            backdropColor={COLORS.white}
            backdropOpacity={1}>
            <View style={styles.containerModal}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  marginBottom: 100,
                }}>
                <TouchableOpacity style={styles.goOut} onPress={toggleModal}>
                  <CrossSVG />
                </TouchableOpacity>
              </View>
              {meteringDevice ? (
                <ReadingInput
                  data={meteringDevice}
                  onSave={handleSave}
                  toggleModal={toggleModal}
                  status={status}
                />
              ) : (
                <Text>{'No metering devices found'}</Text>
              )}
            </View>
          </Modal>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  backgroundContainer: {
    height: '10%',
    overflow: 'hidden',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerText: {
    ...FONTS.h2,
    color: COLORS.black,
  },
  headerText2: {
    ...FONTS.h5,
    color: COLORS.black,
  },
  text: {
    ...FONTS.body1,
    color: COLORS.gray,
  },
  content: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.grayLight,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.grayLight2,
    padding: 20,
    marginTop: -20,
    zIndex: 2,
  },
  containerModal: {
    flex: 1,
    justifyContent: 'space-between',
  },
  touchableOpacity: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 70,
    height: 50,
    borderRadius: 12.5,
    backgroundColor: COLORS.primary,
  },
  goOut: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 40,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
  }
});

export default CounterScreen;

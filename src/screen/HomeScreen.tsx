import React, {useEffect} from 'react';
import { View, Text, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import {useGetUserData} from '../hooks/useGetUserData';
import {COLORS, FONTS} from '../constants/theme';
import {useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {UserData} from '../store/UserData/types';

const HomeScreen = () => {
  const {fetch} = useGetUserData();
  const userData = useSelector<RootState, UserData | null>( state => state.userData.userData );

  useEffect(() => {
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.backgroundContainer}>
        <ImageBackground
          source={require('../assets/icons/images/wave.png')}
          style={styles.backgroundImage}>
          <View style={styles.header}>
            <View>
              <Text style={styles.headerText}>Главная</Text>
            </View>
            <View>
              <Text style={styles.headerText2}>Лицевой счет</Text>
              <Text style={styles.text}>
                {userData?.serviceContract?.contractNumber}
              </Text>
            </View>
            <View>
              <Text style={styles.headerText2}>Адрес</Text>
              <Text style={styles.text}>{userData?.address}</Text>
            </View>
            <View>
              <Text style={styles.headerText2}>Исполнитель</Text>
              <Text style={styles.text}>
                {userData?.serviceContract?.managerialCompany?.name}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </View>
      <View style={styles.content}>
        <ScrollView>
          <View>
            <Text style={styles.headerText2}>Показания</Text>
            <Text style={[styles.text, {color: COLORS.red}]}>
              {
                userData?.serviceContract?.managerialCompany
                  .readingRegistrationPeriod?.value
              }
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    height: '30%',
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  header: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerText: {
    ...FONTS.h3,
    color: COLORS.black,
    paddingVertical: 10,
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
});

export default HomeScreen;

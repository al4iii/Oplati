import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {removeToken} from '../store/AsyncStorage';
import {COLORS} from '../constants/theme';
import {userActionCreators} from '../slices/userSlice';

const LogoutScreen = () => {
  const {setLogout, setAccessToken} = userActionCreators();

  const onPress = () => {
    setAccessToken('');
    setLogout();
    removeToken();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Вы уверены, что хотите выйти?</Text>
      <TouchableOpacity style={styles.touchableOpacity} onPress={onPress}>
        <Text>{'LogOut'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchableOpacity: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 120,
    height: 50,
    borderRadius: 12.5,
    backgroundColor: COLORS.primary,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LogoutScreen;

import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuthorization } from '../hooks/useAuthorization';
import { APIStatus } from '../lib/axiosAPI';
import { COLORS, FONTS } from '../constants/theme';

interface AuthorizationProps {}

const AuthorizationScreen: React.FC<AuthorizationProps> = () => {
  const { fetch, status } = useAuthorization();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);

  const handleLogin = () => {
    fetch(username, password);
  };

  useEffect(() => {
    if (status === APIStatus.Failure) {
      setError(true);
    }
  }, [status]);

  useEffect(() => {
    setError(false);
    setIsLoginDisabled(username.length < 4 || password.length < 4);
  }, [username, password]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {error && (
        <Text style={styles.errorText}>
          {'неверный логин или пароль'}
        </Text>
      )}
      <TouchableOpacity
        style={[
          styles.touchableOpacity,
          {
            backgroundColor: isLoginDisabled
              ? COLORS.secondary
              : COLORS.primary,
          },
        ]}
        disabled={isLoginDisabled}
        onPress={handleLogin}>
        <Text>{'LogIn'}</Text>
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
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginVertical: 10,
    width: '80%',
    borderRadius: 5,
  },
  touchableOpacity: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 120,
    height: 50,
    borderRadius: 12.5,
  },
  errorText: {
    ...FONTS.h5,
    color: COLORS.red,
  },
});

export default AuthorizationScreen;

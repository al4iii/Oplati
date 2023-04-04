import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text, StyleProp, ViewStyle } from 'react-native';

interface Props {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  style?: StyleProp<ViewStyle>;
}

const LoadingIndicator = ({ size = 'large', color = '#000', text, style }: Props) => {
  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size={size} color={color} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default LoadingIndicator;

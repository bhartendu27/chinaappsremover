import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LoadingIndicator from './misc/LoadingIndicator';
import { ThemeStatic, Typography } from '../theme';

const { FontWeights, FontSizes } = Typography;



const Button = ({ Icon, label, onPress, loading, containerStyle, labelStyle, indicatorColor }) => {

  let content = <LoadingIndicator size={8} color={indicatorColor || ThemeStatic.white} />
  if (!loading) content = (
    <>
      {Icon && <Icon />}
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </>
  );

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress} style={[styles.container, containerStyle]}>
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 40,
    backgroundColor: ThemeStatic.accent
  },
  label: {
    ...FontWeights.Light,
    ...FontSizes.Body,
    marginLeft: 5,
    color: ThemeStatic.white
  }
});

export default Button;

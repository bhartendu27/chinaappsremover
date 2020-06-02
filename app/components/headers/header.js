import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Typography } from '../../theme';

const { FontWeights, FontSizes } = Typography;



const Header = ({ title, IconRight }) => {

  // const { theme } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {IconRight && <IconRight />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  title: {
    ...FontWeights.Bold,
    ...FontSizes.Heading,
    color: '#000000'
  }
});

export default Header;

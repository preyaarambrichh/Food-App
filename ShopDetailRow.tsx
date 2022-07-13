import React from 'react';
import {View, StyleSheet, Image, ImageSourcePropType} from 'react-native';

export default ({
  leftIcon,
  children,
  hideBorder,
}: {
  leftIcon?: ImageSourcePropType;
  children: JSX.Element | Array<JSX.Element | null>;
  hideBorder?: boolean;
}) => {
  return (
    <View style={[styles.container, !hideBorder && styles.border]}>
      {!!leftIcon && <Image source={leftIcon} style={styles.leftIcon} />}
      <View style={styles.content}>{children}</View>
      
      <Image
        source={require('../assets/images/arrow-right.png')}
        style={styles.arrowRight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    marginHorizontal: 16,
  },
  border: {
    borderBottomWidth: 0.2,
    borderBottomColor: '#f5b041',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  leftIcon: {
    width: 27,
    height: 27,
    marginRight: 6,  
  },
  
  arrowRight: {
    width: 13,
    height: 13,
    alignSelf: 'center',
  },
});

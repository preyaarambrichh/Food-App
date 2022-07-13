import React from 'react';
import {StyleSheet, TextInputProps, TextInput, View, Image} from 'react-native';

export default (props: TextInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search in Au Bureau Lounge..."
        placeholderTextColor="#909090"
        {...props}
      />
      <Image
        source={require('../assets/images/search.png')}
        style={styles.searchIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems:'center',
    padding: 8,
    marginHorizontal: 19,
    borderRadius: 12,
    backgroundColor: '#d7ffd1',
  },
  input: {
    flex: 1,
    color: 'red',
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
})
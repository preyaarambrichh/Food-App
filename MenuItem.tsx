import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  ViewStyle,
} from 'react-native';


type MenuItemProps = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  price: string;
  description: string;
  style?: ViewStyle;
};
export default ({name, image, price, description, style}: MenuItemProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]}>
      <Image source={image} style={styles.image} />
      <View style={styles.dishInfo}>
        <View>
          <Text style={styles.dishName}>{name}</Text>
          <Text style={styles.description}>{description}</Text>


        </View>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 0.9,
    borderBottomColor: 'red',
    paddingVertical: 18,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 16,
    borderRadius: 12,
  },
  dishInfo: {
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dishName: {
    fontSize: 16,
    color: 'green',
    marginBottom: 10,
    fontFamily: 'Roboto-Black',
    lineHeight: 20,
  },
  description: {
    fontSize: 11,
    color: '#660c57',
    marginBottom: 10,
    fontFamily: 'Roboto-MediumItalic',
    fontWeight: '400',
  },
  
  price: {
    fontSize: 18,
    color: '#1c89d6',
    fontFamily: 'Roboto-Medium',
  },
});

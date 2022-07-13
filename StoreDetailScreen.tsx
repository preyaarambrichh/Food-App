/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import Menu from './components/Menu';
import MenuItem from './components/MenuItem';
import AnimatedHeader from './components/AnimatedHeader';
import SearchModal from './components/SearchModal';
import ShopDetailRow from './components/ShopDetailRow';
import {menuData} from './data/menuData';



const HEADER_HEIGHT = 80;

export type CategoryPositions = number[];

export default () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  const [activeCategory, setActiveCategory] = useState(-1);
  const [categoryPositions, setCategoryPositions] = useState<CategoryPositions>(
    [],
  );

  const scrollViewRef = useRef<ScrollView>(null);

  const scrollTo = (index: number) => {
    scrollViewRef?.current?.scrollTo({
      x: 0,
      y: categoryPositions[index] + HEADER_HEIGHT,
      animated: false,
    });
  };

  const handleScroll = (event: any) => {
    const y = event.nativeEvent.contentOffset.y;
    categoryPositions.forEach((position, index) => {
      if (y >= position && y < categoryPositions[index + 1]) {
        setActiveCategory(index);
        return;
      } else if (y > categoryPositions[categoryPositions.length - 1]) {
        setActiveCategory(categoryPositions.length - 1);
      }
    });
  };

  const bannerAnimation = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [-200, 0],
          outputRange: [2, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const headerAnimation = {
    zIndex: animatedValue,
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [0, 1],
    }),
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1, 40],
          outputRange: [0, 1, 1],
          extrapolate: 'clamp',
        }),
      },
    ],
  };

  const searchIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  const backIconAnimation = {
    opacity: animatedValue.interpolate({
      inputRange: [0, 40],
      outputRange: [1, 0],
    }),
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />

      <TouchableOpacity style={styles.backButton}>
        <Animated.Image
          source={require('./assets/images/chevron-left.png')}
          style={[styles.backIcon, backIconAnimation]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.searchButton}
        onPress={() => setSearchModalVisible(true)}>
        <Animated.Image
          source={require('./assets/images/search.png')}
          style={[styles.searchIcon, searchIconAnimation]}
        />
      </TouchableOpacity>
      <SearchModal
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
      />

      <AnimatedHeader
        categories={menuData}
        animationStyle={headerAnimation}
        activeCategory={activeCategory}
        onChangeCategory={(index: number) => {
          scrollTo(index);
          setActiveCategory(index);
        }}
      />

      <Animated.View style={[styles.bannerContainer, bannerAnimation]}>
        <Image
          style={styles.banner}
          source={require('./assets/images/foodBanners.png')}
        />
        <LinearGradient
          style={styles.gradient}
          colors={['black', 'black', 'transparent']}
        />
      </Animated.View>

      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {y: animatedValue},
              },
            },
          ],
          {useNativeDriver: true, listener: event => handleScroll(event)},
        )}
        scrollEventThrottle={16}>
        <View style={styles.paddingForBanner} />

        <View style={styles.scrollViewContent}>
          <View style={styles.shopDetailsCard}>
            <ShopDetailRow>
              <Text style={styles.shopName}>Au Bureau Lounge </Text>
            </ShopDetailRow>

            <ShopDetailRow leftIcon={require('./assets/images/starscropped.png')}>
              <Text style={styles.boldText}>4.9</Text>
              <Text style={styles.greyText}>(9 Reviews)</Text>
              
              <Text style={styles.regularText}>Ratings and Reviews</Text>
            </ShopDetailRow>
             
            <ShopDetailRow leftIcon={require('./assets/images/open.png')}>
            
            <Text style={styles.regularText}>LOCATION - OPENING HOURS</Text>  
            
                <View style={[styles.row, {marginBottom: 10}]}>
                  <Text style={styles.smallText}> Belle Vue Maurel  - 10:30  to 22:00</Text>
                  
                </View>
                         
            </ShopDetailRow>


            <ShopDetailRow leftIcon={require('./assets/images/dis.png')}>
              <View>
                <View style={[styles.row, {marginBottom: 8}]}>
                  <Text style={styles.boldText}> 9.7 km</Text>
                  <Text style={styles.greyText}> (10 mins)</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.smallText}>Deliver now </Text>
                  
                  <Image
                    source={require('./assets/images/fastdelivery.jpg')}
                    
                    style={styles.bikeIcon}
                  />
                  <Text style={styles.smallText}></Text>
                </View>
              </View>
            </ShopDetailRow>
             
            <ShopDetailRow
              leftIcon={require('./assets/images/whatsapp.png')}
              hideBorder>
                 <View style={[styles.row, {marginBottom: 8}]}>
              <Text style={styles.regularText}>(+230) 57784423</Text>
              </View>
            </ShopDetailRow>

            <ShopDetailRow
              leftIcon={require('./assets/images/facebook.png')}
              hideBorder>
              <View style={[styles.row, {marginBottom: 8}]}>
              <Text style={styles.regularText}>Au_Bureau_Lounge</Text>
              </View>
            </ShopDetailRow>

            <ShopDetailRow
              leftIcon={require('./assets/images/tag.png')}
              hideBorder>
              <Text style={styles.regularText}>Enjoy great discount on your food</Text>
            </ShopDetailRow>

            
          </View>

          

          {menuData.map(({name, id, items,}) => (
            <Menu
              key={id}
              title={name}             
              categoryPositions={categoryPositions}
              setCategoryPositions={setCategoryPositions}>
              {items.map(item => (
                <MenuItem {...item} key={item.id} />
              ))}
            </Menu>
          ))}
          <View style={{height: 16}} />
        </View>
      </Animated.ScrollView>
    </View>
  );
};

const BANNER_HEIGHT = 236;
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  searchButton: {
    position: 'absolute',
    right: 0,
    top: 30,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  searchIcon: {
    width: 32,
    height: 32,
    tintColor: 'lime',
    zIndex: 50,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 49,
    width: 48,
    height: 48,
    zIndex: 100,
  },
  backIcon: {
    width: 36,
    height: 36,
    tintColor: 'lime',
    zIndex: 50,
  },
  bannerContainer: {
    position: 'absolute',
    height: BANNER_HEIGHT,
    width: '100%',
  },
  banner: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    opacity: 0.5,
    width: '110%',
    height: 130,
  },
  paddingForBanner: {
    height: BANNER_HEIGHT,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
    backgroundColor: 'thistle',
  },
  shopDetailsCard: {
    width: '100%',
    backgroundColor: '#581845',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: -49,
    marginBottom: 40,
    borderRadius: 30,
    ...Platform.select({
      android: {elevation: 3},
      ios: {
        shadowColor: '#708090',
        shadowOpacity: 1,
        shadowRadius: 3,
        shadowOffset: {
          width: 2,
          height: 2,
        },
      },
    }),
  },
  shopName: {
    color: '#f4d03f',
    fontSize: 30,
    fontFamily: 'Roboto-Black',
  },
  boldText: {
    fontSize: 16,
    fontFamily: 'Roboto-Bold',
    color: '#ffc300',
  },
  regularText: {
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
    color: '#daf7a6',
  },
  greyText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: 'lime',
    marginLeft: 4,
  },
  smallText: {
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    color: '#85c1e9',
  },
  
  bikeIcon: {
    width: 27,
    height: 27,
    marginRight: 5,
  },
  verticalBar: {
    height: '100%',
    width: 0.5,
    backgroundColor: '#222222',
    marginHorizontal: 5,
  },
});

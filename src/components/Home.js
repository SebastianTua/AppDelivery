import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet
} from 'react-native';
import { Categories, COLOURS, Items } from '../database/items';
import Material from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchExample from './Search';

const Home = ({ navigation }) => {
  const [currentSelected, setCurrentSelected] = useState([0]);
  const [products, setProducts] = useState([]);

  //get called on screen loads
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  //get data from DB

  const getDataFromDB = () => {
    let productList = [];
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].category == 'product') {
        productList.push(Items[index]);
      }
    }

    setProducts(productList);
  };

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Toast.show(
          'Añadido al carrito correctamente', {
          backgroundColor: '#FFFFFF',
          textColor: 'green',
          position: Toast.positions.BOTTOM,
          opacity: 1,
          shadowColor: '#000',
          duration: 1500
        },
          Toast.SHORT,
        );
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(id);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Toast.show(
          'Item Added Successfully to cart',
          Toast.SHORT,
        );
        navigation.navigate('Home');
      } catch (error) {
        return error;
      }
    }
    console.log(data, 'anadido')
  };


  const renderCategories = ({ item, index }) => {
    return (
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => setCurrentSelected(index)}>
        <View
          style={[styles.categoriesDiv,
            {backgroundColor:
              currentSelected == index ? COLOURS.accent : COLOURS.light,
          }]}>
          <View style={styles.contImgCategorias}>
            <Image
              source={item.image}
              style={styles.imgCategorias}
            />
          </View>
          <Text
            style={styles.categoriesName}>
            {item.name}
          </Text>
          <View
            style={[styles.div, {
              backgroundColor:
                currentSelected == index ? COLOURS.white : COLOURS.accentGray
            }]}>
            <FontAwesome
              name="angle-right"
              style={{
                fontSize: 12,
                color: currentSelected == index ? COLOURS.black : COLOURS.white,
              }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderItems = (data, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={0.9}
        style={{
          width: '100%',
          height: 180,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.navigate('ProductInfo', { data: data })
        }>
        <View
          style={{
            width: '90%',
            height: 160,
            backgroundColor: COLOURS.light,
            borderRadius: 20,
            elevation: 4,
            position: 'relative',
            padding: 15,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ marginBottom: 50 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                display: data.isTopOfTheWeek ? 'flex' : 'none',
              }}>
              <FontAwesome
                name="crown"
                style={{
                  fontSize: 10,
                  color: COLOURS.gold,
                }}
              />
              <Text
                style={{
                  fontSize: 12,
                  color: COLOURS.black,
                  opacity: 0.8,
                  marginLeft: 5,
                }}>
                top of the week
              </Text>
            </View>
            <Text
              style={{
                fontSize: 22,
                color: COLOURS.black,
                fontWeight: 'bold',
                paddingTop: 10,
              }}>
              {data.name}
            </Text>
            <Text
              style={{
                fontSize: 14,
                marginTop: 5,
                color: COLOURS.black,
                opacity: 0.5,
              }}>
              ${data.price}
            </Text>
          </View>
          <View style={{ width: 150, height: 150, marginRight: -25 }}>
            <Image
              source={data.image}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 85,
                height: 50,
                backgroundColor: COLOURS.accent,
                borderTopRightRadius: 20,
                borderBottomLeftRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => addToCart(data.id)}>
              <Entypo
                name="plus"
                style={{ fontSize: 18, color: COLOURS.black }}
              />
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 20,
              }}>
              <AntDesign
                name="star"
                style={{ fontSize: 12, color: COLOURS.black, paddingRight: 5 }}
              />
              <Text
                style={{
                  fontSize: 15,
                  color: COLOURS.black,
                  fontWeight: 'bold',
                }}>
                {data.rating}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: COLOURS.white,
            position: 'relative',
          }}>
          <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
          <Image
            source={require('../database/images/background.png')}
            style={{ position: 'absolute', top: 0, left: -100 }}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 20,
            }}>
            <TouchableOpacity
              style={{
                width: 40,
                height: 40,
              }}
              onPress={() => navigation.openDrawer()}
            >
              <Image
                source={require('../database/images/profile.jpg')}
                style={{
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                  borderRadius: 500,
                  marginTop: 25
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Material
                name="shopping-cart"
                style={{
                  fontSize: 28,
                  color: COLOURS.black,
                  marginTop: 25,
                }}
                onPress={() => navigation.navigate('cart')}
              />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 20 }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                opacity: 0.5,
                fontWeight: '400',
              }}>
              Food
            </Text>
            <Text
              style={{
                fontSize: 40,
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 2,
              }}>
              Delivery
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              paddingVertical: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Ionicons
              name="search"
              style={{ fontSize: 20, color: COLOURS.black, opacity: 0.8 }}
            />
            <SearchExample style={{
              color: COLOURS.black,
              fontSize: 16,
              paddingVertical: 5,
              borderBottomWidth: 1,
              borderBottomColor: COLOURS.black + 20,
              width: '90%',
              marginLeft: 10,
              letterSpacing: 1,
            }} />
          </View>
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              color: COLOURS.black,
              letterSpacing: 1,
            }}>
            Categorias
          </Text>
          <FlatList
            horizontal={true}
            data={Categories}
            renderItem={renderCategories}
            showsHorizontalScrollIndicator={false}
          />
          <Text
            style={{
              paddingTop: 20,
              paddingHorizontal: 20,
              fontSize: 18,
              fontWeight: '700',
              color: COLOURS.black,
            }}>
            Popular
          </Text>
          {Categories[currentSelected].item.map(renderItems)}
          <TouchableOpacity
            style={{
              margin: 30,
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                borderBottomWidth: 1,
                borderBottomColor: COLOURS.black,
              }}>
              Load more
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  categoriesDiv:{
    width: 120,
    height: 180,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: 20,
    margin: 10,
    elevation: 5,
  },
  contImgCategorias: {
    width: 60,
    height: 60
  },
  imgCategorias: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  categoriesName: {
    fontSize: 16,
    color: COLOURS.black,
    fontWeight: '600',
  },
  div: {
    width: 30,
    height: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Home;

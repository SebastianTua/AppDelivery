import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { COLOURS } from '../database/items';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from 'react-native-root-toast';


const Details = ({ route, navigation }) => {
  
  const {
    data
  } = route.params;

  console.log(data)
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <View
        style={{
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            borderWidth: 2,
            borderColor: COLOURS.lightGray,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 30
          }}>
          <FontAwesome
            name="angle-left"
            style={{
              fontSize: 16,
              color: COLOURS.black,
            }}
          />
        </TouchableOpacity>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: COLOURS.accent,
            opacity: data?.isTopOfTheWeek ? 1 : 0.5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Material name="shopping-cart" style={{ fontSize: 25, color: COLOURS.white }} onPress={() => navigation.navigate('cart')} />
        </View>
      </View>
      <Text
        style={{
          fontSize: 38,
          color: COLOURS.black,
          fontWeight: '800',
          paddingHorizontal: 20,
          maxWidth: 310,
        }}>
        {data?.name}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 15,
            color: COLOURS.gray,
            fontWeight: '900',
            paddingRight: 5,
            paddingBottom: 8,
          }}>
          $
        </Text>
        <Text
          style={{
            fontSize: 38,
            color: COLOURS.gray,
            fontWeight: '900',
          }}>
          {data?.price}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          maxHeight: 300,
          width: '100%',
          alignItems: 'center',
        }}>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                opacity: 0.5,
              }}>
              Size
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '600',
              }}>
              {data?.size}
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                opacity: 0.5,
              }}>
              Crust
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '600',
              }}>
              {data?.crust}
            </Text>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <Text
              style={{
                fontSize: 12,
                color: COLOURS.black,
                opacity: 0.5,
              }}>
              Delivery
            </Text>
            <Text
              style={{
                fontSize: 18,
                color: COLOURS.black,
                fontWeight: '600',
              }}>
              {data?.delivery} min
            </Text>
          </View>
        </View>
        <View
          style={{
            width: 380,
            height: 380,
          }}>
          <Image
            source={data?.image}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
      </View>
      <Text
        style={{
          paddingTop: 20,
          paddingHorizontal: 20,
          fontSize: 20,
          fontWeight: '700',
          color: COLOURS.black,
        }}>
        Ingredients
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.ingredients.map((data, index) => {
          return (
            <View
              key={index}
              style={{
                margin: 12,
                width: 80,
                height: 80,
                borderRadius: 20,
                backgroundColor: COLOURS.white,
                elevation: 5,
              }}>
              <Image
                source={data}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => addToCart(data?.id)}
          style={{
            width: '90%',
            height: 80,
            backgroundColor: COLOURS.accent,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: COLOURS.black,
              letterSpacing: 1,
              marginRight: 10,
            }}>
            Place on Order
          </Text>
          <Entypo
            name="chevron-right"
            style={{ fontSize: 16, color: COLOURS.black }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const addToCart = async (id) => {
  console.log('id: ', id)
  let itemArry = await AsyncStorage.getItem('cartItems')
  itemArry = JSON.parse(itemArry)
  if (itemArry) {
    let array = itemArry
    array.push(id);

    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(array))
      Toast.show(
        "Añadido al carrito correctamente",
        Toast.SHORT,
      )
      navigation.navigate('Home')
    } catch (error) {
      return error
    }
  }
  else {
    let array = [];
    array.push(id);
    try {
      await AsyncStorage.setItem('cartItems', JSON.stringify(array))
      Toast.show(
        "No se pudo añadir al carrito",
        Toast.SHORT
      )
      navigation.navigate('Home')
    } catch (error) {
      return error
    }
  }
}

export default Details;
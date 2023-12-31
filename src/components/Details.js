import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { COLOURS, Categories, Items } from '../database/items';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Material from 'react-native-vector-icons/MaterialIcons';
import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductInfo = ({ route, navigation }) => {
  const { data } = route.params;

  const [product, setProduct] = useState({});

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDataFromDB();
    });

    return unsubscribe;
  }, [navigation]);

  const getDataFromDB = async () => {
    for (let index = 0; index < Items.length; index++) {
      if (Items[index].id == data) {
        await setProduct(Items[index]);
        return;
      }
    }
  };

  //add to cart

  const addToCart = async id => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(id);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        Toast.show(
          'Añadido al carrito correctamente',{
            backgroundColor:'#FFFFFF',
            textColor:'green',
            position:Toast.positions.BOTTOM,
            opacity:1,
            shadowColor:'#000',
            duration:1500
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
    console.log(data,'anadido')
  };

  return (
    <View
      style={styles.div}>
      <View
        style={styles.divBtnBack}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.btnBack}>
          <FontAwesome
            name="angle-left"
            style={styles.btnIcon}
          />
        </TouchableOpacity>
        <View
          style={styles.btnCart}>
          <Material name="shopping-cart" style={styles.iconCart} onPress={() => navigation.navigate('cart')} />
        </View>
      </View>
      <Text
        style={styles.productName}>
        {data.name}
      </Text>
      <View
        style={styles.precioCont}>
        <Text
          style={styles.iconPrecio}>
          $
        </Text>
        <Text
          style={styles.precio}>
          {data?.price}
        </Text>
      </View>
      <View
        style={styles.container}>
        <View style={styles.divInfoHor}>
          <View style={styles.divInfoVer}>
            <Text
              style={styles.info}>
              Size
            </Text>
            <Text
              style={styles.productInfo}>
              {data.size}
            </Text>
          </View>
          <View style={styles.divInfoVer}>
            <Text
              style={styles.info}>
              Crust
            </Text>
            <Text
              style={styles.productInfo}>
              {data?.crust}
            </Text>
          </View>
          <View style={styles.divInfoVer}>
            <Text
              style={styles.info}>
              Delivery
            </Text>
            <Text
              style={styles.productInfo}>
              {data.delivery} min
            </Text>
          </View>
        </View>
        <View
          style={styles.divImg}>
          <Image
            source={data.image}
            style={styles.img}
          />
        </View>
      </View>
      <Text
        style={styles.ingredients}>
        Ingredients
      </Text>
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data?.ingredients.map((data, index) => {
          return (
            <View
              key={index}
              style={styles.ingredientsCont}>
              <Image
                source={data}
                style={styles.img}
              />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={styles.btnCont}>
        <TouchableOpacity
          onPress={() => addToCart(data.id)}
          style={styles.btn}>
          <Text
            style={styles.btnText}>
            Terminar orden
          </Text>
          <Entypo
            name="chevron-right"
            style={styles.btnIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  div:{
    width: '100%',
    height: '100%',
    backgroundColor: COLOURS.white,
    position: 'relative',
  },
  btnIcon:{ 
    fontSize: 16, 
    color: COLOURS.black 
  },
  iconCart:{ 
    fontSize: 25, 
    color: COLOURS.white 
  },
  ingredients: {
    paddingTop: 20,
    paddingHorizontal: 20,
    fontSize: 20,
    fontWeight: '700',
    color: COLOURS.black,
  },
  divInfoVer:{ 
    paddingVertical: 20 
  },
  divInfoHor:{
    paddingHorizontal: 20
  },
  divBtnBack:{
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btnBack: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLOURS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  btnCart: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: COLOURS.accent,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productName: {
    fontSize: 38,
    color: COLOURS.black,
    fontWeight: '800',
    paddingHorizontal: 20,
    maxWidth: 310,
  },
  precioCont: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconPrecio: {
    fontSize: 15,
    color: COLOURS.gray,
    fontWeight: '900',
    paddingRight: 5,
    paddingBottom: 8,
  },
  precio: {
    fontSize: 38,
    color: COLOURS.gray,
    fontWeight: '900',
  },
  container: {
    flexDirection: 'row',
    maxHeight: 300,
    width: '100%',
    alignItems: 'center',
  },
  info: {
    fontSize: 12,
    color: COLOURS.black,
    opacity: 0.5,
  },
  productInfo: {
    fontSize: 18,
    color: COLOURS.black,
    fontWeight: '600',
  },
  divImg:{
    width: 380,
    height: 380,
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  ingredientsCont: {
    margin: 12,
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    elevation: 5,
  },
  btnCont:{
    position: 'absolute',
    width: '100%',
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn:{
    width: '90%',
    height: 80,
    backgroundColor: COLOURS.accent,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  btnText:{
    fontSize: 16,
    fontWeight: 'bold',
    color: COLOURS.black,
    letterSpacing: 1,
    marginRight: 10,
  }
})

export default ProductInfo
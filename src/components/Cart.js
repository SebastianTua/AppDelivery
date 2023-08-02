import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories, COLOURS, Items } from '../database/items';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Cart = ({ navigation }) => {
    const [product, setProduct] = useState();
    const [total, setTotal] = useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getDataFromDB()
        });

        return unsubscribe;
    }, [navigation]);

    const getDataFromDB = async () => {
        let items = await AsyncStorage.getItem('cartItems');
        items = JSON.parse(items);
        let productData = [];
        if (items) {
            Items.forEach(data => {
                console.log('data: ', data)

                console.log('items: ', items)
                if (items.includes(data.id)) {
                    productData.push(data);
                    return;
                }
            });
            setProduct(productData);
            getTotal(productData);
        }
    };

    //get total price of all items in the cart
    const getTotal = productData => {
        let total = 0;
        for (let index = 0; index < productData.length; index++) {
            let price = productData[index].price;
            total = total + price;
        }
        setTotal(total);
    };

    //remove data from Cart

    const removeItemFromCart = async id => {
        let itemArray = await AsyncStorage.getItem('cartItems');
        itemArray = JSON.parse(itemArray);
        if (itemArray) {
            let array = itemArray;
            for (let index = 0; index < array.length; index++) {
                if (array[index] == id) {
                    array.splice(index, 1);
                }

                await AsyncStorage.setItem('cartItems', JSON.stringify(array));
                getDataFromDB();
            }
        }
    };

    console.log('product: ', product)

    const renderProducts = (data, index) => {
        return (
            <View style={styles.div}>
                <View style={styles.container}>
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity
                            onPress={() => removeItemFromCart(data.item.id)}
                        >
                            <Entypo
                                name="cross"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <Text
                            style={styles.title}>
                            {data.item.name}
                        </Text>
                        <Text
                            style={styles.precio}>
                            ${data.item.price}
                        </Text>
                    </View>
                    <View style={styles.imgCont}>
                        <Image
                            source={data.item.image}
                            style={styles.img}
                        />
                    </View>
                    <View
                        style={styles.contBtn}>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => { }}>
                            <Entypo
                                name="plus"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <View style={styles.cant}>
                            <Text style={styles.cantText}>1</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.btn}
                            onPress={() => { }}>
                            <Entypo
                                name="minus"
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                        <View
                            style={styles.contStar}>
                            <AntDesign
                                name="star"
                                style={styles.star}
                            />
                            <Text
                                style={styles.star}>
                                {data.item.rating}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

    return (
        <View>
            <Text style={styles.titlePage}>Carrito</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.btnBack}>
                <FontAwesome
                    name="angle-left"
                    style={styles.icon}
                />
            </TouchableOpacity>
            <FlatList
                data={product ?? []}
                renderItem={renderProducts}
                showsHorizontalScrollIndicator={false}
                style={{ height: '70%' }}
                ListEmptyComponent={() => <><Text style={styles.vacio}>carrito vacio <AntDesign name="shoppingcart" size={20} /></Text></>}
            />
            <Text style={styles.total}>Total:</Text>
            <Text style={styles.totalNum}>${total}</Text>
            <TouchableOpacity
                onPress={() => console.log(product)}
                style={styles.btnPagar}>
                <Text
                    style={styles.btnText}>
                    Pagar
                </Text>
                <Entypo
                    name="chevron-right"
                    style={styles.icon}
                />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 160,
        backgroundColor: COLOURS.white,
        borderRadius: 20,
        elevation: 4,
        position: 'relative',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    vacio: {
        flex: 1,
        marginTop: '70%',
        marginLeft: '35%',
        fontSize: 22,
        color: COLOURS.gray,
        fontWeight: '600',
        opacity: .6
    },
    cant: {
        marginBottom: 10,
        marginLeft: 10,
        backgroundColor: '#F5F5F5',
        padding: 15,
        borderRadius: 15,
    },
    cantText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon: {
        fontSize: 18,
        color: COLOURS.black
    },
    title: {
        fontSize: 22,
        color: COLOURS.black,
        fontWeight: 'bold',
        paddingTop: 10,
        marginBottom: 10
    },
    precio: {
        fontSize: 12,
        color: COLOURS.black,
        opacity: 0.5,
    },
    imgCont: {
        width: 150,
        height: 150,
        marginRight: -15
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    btn: {
        width: 45,
        height: 25,
        backgroundColor: COLOURS.accent,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginLeft: 10
    },
    div: {
        width: '100%',
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contBtn: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
    },
    contStar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
    },
    star: {
        fontSize: 12,
        color: COLOURS.black,
        paddingRight: 5,
        fontWeight: 'bold',
    },
    titlePage: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 22,
        color: COLOURS.black,
        fontWeight: 'bold'
    },
    btnBack: {
        width: 40,
        height: 40,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLOURS.lightGray,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    },
    total: {
        marginLeft: 35,
        fontWeight: 'bold',
        flexDirection: 'row',
        display: 'flex',
        opacity: .5,
        marginTop: 40
    },
    totalNum: {
        fontWeight: 'bold',
        flexDirection: 'row',
        display: 'flex',
        marginLeft: 90,
        fontSize: 25,
        marginTop: -27,
        marginBottom: 10,
        color:'#4F4F4F',
        opacity:.8
    },
    btnPagar: {
        width: '90%',
        height: 80,
        backgroundColor: COLOURS.accent,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginLeft: 25,
        marginTop: 10,
    },
    btnText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLOURS.black,
        letterSpacing: 1,
        marginRight: 10,
    }
})

export default Cart
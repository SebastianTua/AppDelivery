import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Categories, COLOURS } from '../database/items';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Details from './Details';

const Cart = ({ navigation }) => {
    return (
        <View>
            <Text style={{
                textAlign: 'center',
                marginTop: 50,
                fontSize: 22,
                color: COLOURS.black,
                fontWeight: 'bold'
            }}>Carrito</Text>
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
                    marginLeft: 15
                }}>
                <FontAwesome
                    name="angle-left"
                    style={{
                        fontSize: 16,
                        color: COLOURS.black,
                    }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '100%',
                    height: 180,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.container}>
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity>
                            <Entypo
                                name="cross"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                color: COLOURS.black,
                                fontWeight: 'bold',
                                paddingTop: 10,
                                marginBottom: 10
                            }}>
                            Pepperoni Pizza
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            $19.99
                        </Text>
                    </View>
                    <View style={{ width: 150, height: 150, marginRight: -15 }}>
                        <Image
                            source={require('../database/images/pizza/pepperonipizza.png')}
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
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="plus"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <View style={styles.cant}>
                            <Text style={styles.cantText}> 1</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="minus"
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
                                5.0
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '100%',
                    height: 180,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.container}>
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity>
                            <Entypo
                                name="cross"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                color: COLOURS.black,
                                fontWeight: 'bold',
                                paddingTop: 10,
                                marginBottom: 10
                            }}>
                            Coco Cola
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            $2.99
                        </Text>
                    </View>
                    <View style={{ width: 150, height: 150, marginRight: -15 }}>
                        <Image
                            source={require('../database/images/softdrinks/cocacola.png')}
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
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="plus"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <View style={styles.cant}>
                            <Text style={styles.cantText}> 1</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="minus"
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
                                5.0
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.9}
                style={{
                    width: '100%',
                    height: 180,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View style={styles.container}>
                    <View style={{ marginBottom: 50 }}>
                        <TouchableOpacity>
                            <Entypo
                                name="cross"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <Text
                            style={{
                                fontSize: 22,
                                color: COLOURS.black,
                                fontWeight: 'bold',
                                paddingTop: 10,
                                marginBottom: 10
                            }}>
                            Biggie Cheese
                        </Text>
                        <Text
                            style={{
                                fontSize: 12,
                                color: COLOURS.black,
                                opacity: 0.5,
                            }}>
                            $9.99
                        </Text>
                    </View>
                    <View style={{ width: 150, height: 150, marginRight: -15 }}>
                        <Image
                            source={require('../database/images/burger/biggiecheese.png')}
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
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="plus"
                                style={{ fontSize: 18, color: COLOURS.black }}
                            />
                        </TouchableOpacity>
                        <View style={styles.cant}>
                            <Text style={styles.cantText}> 1</Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                width: 45,
                                height: 25,
                                backgroundColor: COLOURS.accent,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginBottom: 10,
                                marginLeft: 10
                            }}
                            onPress={() => { }}>
                            <Entypo
                                name="minus"
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
                                4.2
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            <Text style={{ marginLeft: 35, marginTop: 130, fontWeight: 'bold', flexDirection: 'row', display: 'flex', opacity: .5 }}>Total:</Text>
            <Text style={{ fontWeight: 'bold', flexDirection: 'row', display: 'flex', marginLeft: 90, marginTop: -25, fontSize: 22 }}>$32.97</Text>
            <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{
                    width: '90%',
                    height: 80,
                    backgroundColor: COLOURS.accent,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginLeft: 25,
                    marginTop: 15
                }}>
                <Text
                    style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: COLOURS.black,
                        letterSpacing: 1,
                        marginRight: 10,
                    }}>
                    Terminar Orden
                </Text>
                <Entypo
                    name="chevron-right"
                    style={{ fontSize: 16, color: COLOURS.black }}
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
    }
})

export default Cart
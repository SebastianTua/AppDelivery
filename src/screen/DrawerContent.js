import { View, StyleSheet } from 'react-native'
import React from 'react'
import { COLOURS } from '../database/items';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Text,
  Drawer,
  TouchableRipple,
  Switch
} from 'react-native-paper'
import Entypo from 'react-native-vector-icons/Entypo';

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={[styles.UserInfoSection, { flexDirection: 'row' }]}>
            <View style={{ marginTop: 15, marginLeft: 10 }}>
              <Avatar.Image source={require('../database/images/profile.jpg')} />
            </View>
            <View style={{ marginLeft: 10, marginTop: 15 }}>
              <Title style={styles.title}>Name user</Title>
              <Caption style={styles.caption}>@UserTag</Caption>
            </View>
          </View>
          <Drawer.Section style={{ flex: 1, marginTop: 20 }}>
            <Drawer.Item label='Home' onPress={() => { props.navigation.navigate('Home') }} style={styles.bottom} />
            <Drawer.Item label='Perfil' onPress={() => { props.navigation.navigate('perfil') }} style={styles.bottom} />
            <Drawer.Item label='Carrito' onPress={() => { props.navigation.navigate('cart') }} style={styles.bottom}  />
            <Drawer.Item label='Contacto' onPress={() => { props.navigation.navigate('contacto') }} style={styles.bottom}  />
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawer}>
        <Drawer.Item label='Cerrar sesion' onPress={() => { }}/>
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomDrawer: {
    opacity:.5,
    marginBottom:-5
  },
  title: {
    color: '#515151',
    fontSize: 22,
    color: COLOURS.black,
    fontWeight: 'bold'
  },
  caption: {
    fontWeight: 'bold'
  },
  bottom: {
    marginBottom: 10, 
    width: 250,
    height: 60, 
    borderRadius: 5,
    backgroundColor: '#E1E1E1',
  }
})

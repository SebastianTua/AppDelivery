import { View, StyleSheet } from 'react-native'
import React from 'react'
import { COLOURS } from '../database/items';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import {
  Avatar,
  Title,
  Caption,
  Drawer,
} from 'react-native-paper'
import { TouchableOpacity } from 'react-native';
import Material from 'react-native-vector-icons/MaterialIcons';


export function DrawerContent(props) {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5' }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: COLOURS.light }}>
        <View style={styles.drawerContent}>
          <View style={[styles.UserInfoSection, { flexDirection: 'row' }]}>
            <View style={{ marginTop: 15, marginLeft: 10 }}>
              <TouchableOpacity onPress={() => { props.navigation.navigate('perfil') }}>
                <Avatar.Image source={require('../database/images/profile.jpg')} />
              </TouchableOpacity>
            </View>
            <View style={{ marginLeft: 10, marginTop: 15 }}>
              <TouchableOpacity onPress={() => { props.navigation.navigate('perfil') }}>
                <Title style={styles.title}>Name user</Title>
              </TouchableOpacity>
              <Caption style={styles.caption}>@UserTag</Caption>
            </View>
          </View>
          <View style={{marginTop: 50}}>
            <DrawerItemList {...props} />
          </View>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawer}>
      <Material
                name="logout" size={20} style={{display:'flex',marginLeft:3,marginBottom:-40,opacity:.8}}
              />
        <Drawer.Item label='Cerrar sesion' onPress={() => props.navigation.goBack()} />
      </Drawer.Section>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomDrawer: {
    opacity: .7,
    marginBottom: -5,
    marginLeft:17
  },
  title: {
    color: '#515151',
    fontSize: 25,
    color: COLOURS.black,
    fontWeight: 'bold'
  },
  caption: {
    fontWeight: 'bold',
  },
  bottom: {
    flex: 1, backgroundColor: '#fff', paddingTop: 10, marginBottom: 10
  }
})

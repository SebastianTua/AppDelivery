import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './src/components/Home';
import ProductInfo from './src/components/Details';
import Cart from './src/components/Cart';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from './src/screen/Perfil';
import { DrawerContent } from './src/screen/DrawerContent';
import Contacto from './src/screen/Contacto';
import Pago from './src/screen/Pago';
import { SimpleLineIcons } from '@expo/vector-icons';
import { COLOURS } from './src/database/items';
import Material from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';

export function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName='Home' screenOptions={{
      drawerActiveBackgroundColor:COLOURS.accent,
      headerShown: false,
      drawerStyle: {
        backgroundColor: "#fff",
        width: 250
      },
      headerStyle: {
        backgroundColor: "#f4511e",
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      },
      drawerLabelStyle: {
        color: '#3C3B3B'
      },
    }} drawerContent={(props) => <DrawerContent{...props} />}>
      <Drawer.Screen name="Home" component={Home} options={{
        drawerIcon: () => (
          <SimpleLineIcons name="home" size={20} color="#3C3B3B" />
        )
      }} />
      <Drawer.Screen name="Perfil" component={Perfil} options={{
        drawerIcon: () => (
          <SimpleLineIcons name="user" size={20} color="#3C3B3B" />
        )
      }} />
      <Drawer.Screen name="Contacto" component={Contacto} options={{
        drawerIcon: () => (
          <SimpleLineIcons name="envelope" size={20} color="#3C3B3B" />
        )
      }} />
      <Drawer.Screen name="Carrito" component={Cart} options={{
        drawerIcon: () => (
          <AntDesign  name="shoppingcart" size={20} color="#3C3B3B"/>
        )
      }} />
    </Drawer.Navigator>
  )
}


const App = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Drawer" component={DrawerNavigation} />
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="cart" component={Cart} />
        <Stack.Screen name="ProductInfo" component={ProductInfo} />
        <Stack.Screen name="perfil" component={Perfil} />
        <Stack.Screen name="contacto" component={Contacto} />
        <Stack.Screen name="pago" component={Pago} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
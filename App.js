import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Home from './src/components/Home';
import Details from './src/components/Details';
import Cart from './src/components/Cart';
import 'react-native-gesture-handler'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Perfil from './src/screen/Perfil';
import { DrawerContent } from './src/screen/DrawerContent';
import Contacto from './src/screen/Contacto';


export function DrawerNavigation(){
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator initialRouteName='Home' screenOptions={{
      headerShown: false,
    }}drawerContent={(props) => <DrawerContent{...props}/>}>
        <Drawer.Screen name="Home" component={Home}/>
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
        <Stack.Screen name="details" component={Details} />
        <Stack.Screen name="perfil" component={Perfil} />
        <Stack.Screen name="contacto" component={Contacto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
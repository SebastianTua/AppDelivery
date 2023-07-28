import { View, Text, TouchableOpacity } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import React from 'react'
import { COLOURS } from '../database/items';

const Perfil = ({navigation}) => {
  return (
    <View>
        <Text style={{
                textAlign:'center',
                marginTop:50,
                fontSize: 22,
                color: COLOURS.black,
                fontWeight: 'bold'}}>Perfil</Text>
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
            marginLeft:15
          }}>
            <FontAwesome
          name="angle-left"
          style={{
            fontSize: 16,
            color: COLOURS.black,
          }}
        />
      </TouchableOpacity>
      </View>
  )
}

export default Perfil
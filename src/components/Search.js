import { View, Text , FlatList} from 'react-native'
import React from 'react'

const Search = ({data,input,setInput}) => {
  return (
    <View>
      <Text>Search</Text>
      <FlatList data={data} renderItem={({item})=>{
        if(input === ""){
            return(
                <View>
                    <Text>{item.name}</Text>
                </View>
            )
        }
        if(item.name.toLowerCase().inludes(input.toLowerCase())){
            <View>
                    <Text>{item.name}</Text>
                </View>
        }
      }}/>
    </View>
  )
}

export default Search

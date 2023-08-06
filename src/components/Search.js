import React, { useState } from 'react';
import { View, TextInput, FlatList, Text } from 'react-native';
import { COLOURS, Items } from '../database/items';

const SearchExample = () => {
  
    const initialData = Items || []

    const [data, setData] = useState(initialData.item);
    const [searchText, setSearchText] = useState('');
  
    const handleSearch = (text) => {
      const filteredData = initialData.item.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setData(filteredData);
      setSearchText(text);
    };
    console.log(initialData)
    
    const renderItem = ({ item }) => (
      <Text>{item.name}</Text>
    );
  
    return (
      <View>
        <TextInput
          placeholder="Search..."
          value={searchText}
          onChangeText={handleSearch}
          style={{
            color: COLOURS.black,
            fontSize: 16,
            paddingVertical: 5,
            borderBottomWidth: 1,
            borderBottomColor: COLOURS.black + 20,
            width: '90%',
            marginLeft: 10,
            letterSpacing: 1,
          }}
        />
        <FlatList
          data={data || []}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
};

export default SearchExample
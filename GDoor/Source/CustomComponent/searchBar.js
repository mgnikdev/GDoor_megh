import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {color} from '../Helper/Global/Global';
export default function SearchBar({searchData}) {
  const [name, setName] = useState('');

  const searchText = e => {
    searchData(e);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: color.secondaryLight,
        marginBottom: 10,
      }}>
      <Ionicons
        name="ios-search"
        size={25}
        color="#000"
        style={{alignSelf: 'center', marginLeft: 10}}
      />
      <TextInput
        style={styles.input}
        onChangeText={text => {
          setName(text), searchText(text);
        }}
        value={name}
        placeholder="Search"
        placeholderTextColor="gray"
      />
    </View>
  );
}
const styles = StyleSheet.create({
  activityLoader: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 1000,
  },
  input: {
    fontSize: 18,
    height: 45,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    paddingHorizontal: 10,
  },
});

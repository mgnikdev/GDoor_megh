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
export default function Header({navigation}) {
  const [name, setName] = useState('');

  const searchText = e => {
    searchData(e);
  };

  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 15,
        right: 15,
      }}
      onPress={() => {
        navigation.replace('GeneralMenu');
        console.log('helloo');
      }}>
      <Ionicons
        name="ios-home"
        size={25}
        color="#EE1E27"
        style={{alignSelf: 'center'}}
      />
    </TouchableOpacity>
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

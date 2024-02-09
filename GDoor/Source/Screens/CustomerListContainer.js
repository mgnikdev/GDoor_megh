import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CustomerListContainer({navigation, item}) {
  return (
    <TouchableOpacity
      onPress={async () => {
        navigation.push('FilterSelection');
        await AsyncStorage.setItem('partner_id', JSON.stringify(item.id));
      }}
      activeOpacity={0.8}
      style={{
        width: '90%',
        borderRadius: 10,
        backgroundColor: color.PrimaryDark,
        margin: 5,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontWeight: '700',
          color: 'white',
          fontSize: 16,
          // fontFamily: 'PTSerif-Bold',
        }}>
        {item.customer}
      </Text>
      {item.mobile == false ? null : (
        <Text
          style={{
            fontWeight: '700',
            color: 'white',
            fontSize: 16,
            // fontFamily: 'PTSerif-Bold',
          }}>
          Mo - {item.mobile}
        </Text>
      )}
    </TouchableOpacity>
  );
}

import {Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {NavigationContext} from '@react-navigation/core';

export default function GeneralMenuContainer({navigation, item}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push(item.screenName);
      }}
      activeOpacity={0.8}
      style={{
        borderRadius: 10,
        backgroundColor: '#fff',
        margin: 10,
        padding: 10,
      }}>
      <Text
        style={{
          fontWeight: '700',
          color: '#404040',
          fontSize: 18,
          // fontFamily: 'PTSerif-Bold',
        }}>
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}

import {Text, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';

export default function AllCategorieListContainer({navigation, item}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('CategoryBrandList', {categoryId: item.id});
      }}
      activeOpacity={0.8}
      style={{
        width: '90%',
        borderRadius: 10,
        backgroundColor: color.PrimaryDark,
        margin: 5,
        padding: 12,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontWeight: '700',
          color: 'white',
          fontSize: 16,
          alignSelf: 'center',
          // fontFamily: 'PTSerif-Bold',
        }}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

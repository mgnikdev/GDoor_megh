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

export default function BrandCategoryListContainer({
  navigation,
  item,
  brandId,
}) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('ProductList', {
          categoryId: item.id,
          brandId: brandId,
        });
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

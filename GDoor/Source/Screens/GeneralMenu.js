import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

import GeneralMenuContainer from './GeneralMenuContainer';
const DATA = [
  {
    title: 'Create New Customer',
    screenName: 'NewCustomer',
  },
  {
    title: 'All Customer For Adding Order',
    screenName: 'CustomerList',
  },
  {
    title: 'Pending Sales Order',
    screenName: 'QuotationList',
  },
  {
    title: 'Confirmed Sales Order',
    screenName: 'AllSalesOrderProducts',
  },

  {
    title: 'InProcess Delivery',
    screenName: 'InProcess',
  },

  {
    title: 'Delivered List',
    screenName: 'Delivered',
  },
];
export default function GeneralMenu({navigation, props}) {
  const renderItem = ({item}) => (
    <GeneralMenuContainer item={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.secondaryLight}}>
      <StatusBar backgroundColor={color.PrimaryDark} />

      <ImageBackground
        source={require('../Helper/Assets/dashboard_background.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <TouchableOpacity
          style={{
            position: 'absolute',
            left: 8,
            bottom: 8,
            backgroundColor: color.PrimaryDark,
            borderRadius: 8,
            zIndex: 1111,
          }}
          onPress={() =>
            Alert.alert('', 'Are you sure want to clear your cart?', [
              {
                text: 'NO',
                // onPress: () => console.log("Cancel Pressed"),
                style: 'cancel',
              },
              {
                text: 'YES',
                onPress: async () => await AsyncStorage.removeItem('tempCart'),
              },
            ])
          }>
          <Text
            style={{
              padding: 10,
              paddingRight: 15,
              paddingLeft: 15,
              color: 'white',
              // fontFamily: 'PTSerif-Bold'
            }}>
            Clear Cart
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: '#404040',
            fontSize: 25,
            fontWeight: '800',
            alignSelf: 'center',
            letterSpacing: 0.5,
            padding: 30,
            paddingTop: 50,
            marginBottom: 30,
            // fontFamily: 'PTSerif-Bold',
          }}>
          General Menu
        </Text>
        <FlatList
          style={{alignSelf: 'center', width: '100%'}}
          data={DATA}
          renderItem={renderItem}
        />

        <TouchableOpacity
          onPress={() =>
            Alert.alert('', 'Are you sure you want to logout?', [
              {
                text: 'NO',
                // onPress: () => console.log("Cancel Pressed"),
                style: 'cancel',
              },
              {text: 'YES', onPress: () => navigation.replace('Login')},
            ])
          }
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 8,
            bottom: 5,
          }}>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 30,
              overflow: 'hidden',
              alignSelf: 'center',
            }}
            source={require('../Helper/Assets/exit_logo1-red.png')}
          />
          <Text
            style={{
              color: '#404040',
              textAlign: 'center',
              alignSelf: 'center',
              fontWeight: '900',
              fontSize: 18,
              // fontFamily: 'PTSerif-Bold',
            }}>
            Log Out
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
}

import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function Splash({navigation, props}) {
  useEffect(() => {
    console.log('mount it!');
    setTimeout(function () {
      next();
    }, 1000);
  }, []);
  const next = () => {
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={'white'} />
      <View style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
        <Image
          style={{
            height: 150,
            width: 160,
            borderRadius: 30,
            overflow: 'hidden',
            marginTop: 50,
          }}
          source={require('../Helper/Assets/gdoor_red.png')}
        />
        <Text
          style={{
            color: color.PrimaryDark,
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'center',
            // fontFamily: 'PTSerif-Bold',
          }}>
          GDoor
        </Text>
      </View>
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <Text
          style={{
            color: '#1F85B4',
            fontWeight: '800',
            fontSize: 11,
            marginBottom: 3,
            textAlign: 'center',
            // fontFamily: 'PTSerif-Bold',
          }}>
          Design & Developed By
        </Text>

        <Image
          style={{
            height: 50,
            width: 180,
            alignSelf: 'center',
            marginBottom: 10,
          }}
          source={require('../Helper/Assets/company_logo.png')}
          // source={require('../Helper/Assets/company_logo_white.png')}
          resizeMode={'contain'}
        />
      </View>
    </SafeAreaView>
  );
}

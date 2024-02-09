import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';

export default function ConfirmOrderCartContainer({navigation, item}) {
  const [loading, setLoading] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: '90%',
        borderRadius: 10,
        backgroundColor: color.secondaryLight,
        margin: 5,
        padding: 15,
        alignSelf: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            marginRight: 20,

            // fontFamily: 'PTSerif-Bold',

            //   alignSelf: 'center',
          }}>
          Product Name
        </Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            width: 170,

            // fontFamily: 'PTSerif-Bold',
          }}>
          {item.product_name}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            marginRight: 20,

            // fontFamily: 'PTSerif-Bold',

            //   alignSelf: 'center',
          }}></Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            marginLeft: 103,
            // paddingRight: 30,
            // fontFamily: 'PTSerif-Bold',
          }}>
          {item.attribute}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            marginRight: 23,

            // fontFamily: 'PTSerif-Bold',

            //   alignSelf: 'center',
          }}>
          Product Price
        </Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            alignSelf: 'flex-start',
            width: 170,
            // fontFamily: 'PTSerif-Bold',
          }}>
          RS. {item.sales_price.toFixed(0)}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          // justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            marginRight: 60,

            // fontFamily: 'PTSerif-Bold',

            //   alignSelf: 'center',
          }}>
          Quantity
        </Text>
        <Text
          style={{
            fontWeight: '500',
            color: 'black',
            fontSize: 16,
            width: 170,
            // fontFamily: 'PTSerif-Bold',
          }}>
          {item.quntity}
        </Text>
      </View>
      <Text
        style={{
          color: '#404040',
          fontSize: 16,
          // width: 170,
          fontWeight: 'bold',
          alignSelf: 'center',
          textAlign: 'center',
          marginTop: 10,
          // fontFamily: 'PTSerif-Bold',
        }}>
        Amount = {(item.quntity * item.sales_price).toFixed(0)}
      </Text>
    </TouchableOpacity>
  );
}

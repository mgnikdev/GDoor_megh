import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ProductListContainer({
  navigation,
  item,
  updateState,
  route,
}) {
  const [quntity, setquntity] = useState(0);
  const [isPress, setisPress] = useState(false);

  const [ProductList, setProductList] = useState([]);

  useEffect(() => {}, []);

  const incrementProduct = () => {
    setquntity(quntity + 1);
  };
  const decrementProduct = () => {
    quntity < 1 ? null : setquntity(quntity - 1);
  };
  const addProduct = () => {
    if (quntity == 0) {
      Toast.showWithGravity(
        'Please choose quntity first..',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else {
      updateState({...item, quntity: quntity});
      setisPress(true);
    }
  };
  return (
    <View
      onPress={() => {
        // navigation.push('ProductList');
      }}
      activeOpacity={0.8}
      style={{
        width: windowWidth / 2.5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 10,
        alignSelf: 'center',
        // height: windowHeight / 3.2,
      }}>
      <Text
        style={{
          fontWeight: '600',
          color: 'black',
          fontSize: 15,
          alignSelf: 'center',
          width: windowWidth / 2.8,
          marginTop: 8,
          textAlign: 'center',
          // fontFamily: 'PTSerif-Bold',
        }}>
        {item.product_name}
      </Text>
      <Text
        style={{
          fontWeight: '600',
          color: 'black',
          fontSize: 15,
          alignSelf: 'center',
          paddingTop: 20,
          // fontFamily: 'PTSerif-Bold',
        }}>
        {item.attribute}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          alignSelf: 'center',
          width: windowWidth / 5,
          marginTop: 5,
        }}>
        <TouchableOpacity onPress={() => decrementProduct()}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'gray',
              fontSize: 20,
              fontWeight: 'bold',
              // fontFamily: 'PTSerif-Bold',
            }}>
            -
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
            color: 'gray',
            fontSize: 18,
            fontWeight: 'bold',
            // fontFamily: 'PTSerif-Bold',
          }}>
          {quntity}
        </Text>
        <TouchableOpacity onPress={() => incrementProduct()}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'gray',
              fontSize: 20,
              fontWeight: 'bold',
              // fontFamily: 'PTSerif-Bold',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          fontWeight: '600',
          color: 'black',
          fontSize: 15,
          alignSelf: 'center',
          margin: 15,
          // fontFamily: 'PTSerif-Bold',
        }}>
        RS. {item.sales_price.toFixed(0)}
      </Text>
      <TouchableOpacity
        activeOpacity={isPress == false ? 0.7 : 0.9}
        style={{
          backgroundColor: color.PrimaryDark,
          borderRadius: 10,
          alignSelf: 'center',
          marginBottom: 10,
        }}
        onPress={() => isPress == false && addProduct()}>
        <Text
          style={{
            color: 'white',
            padding: 5,
            paddingLeft: 20,
            paddingRight: 20,
            alignSelf: 'center',
            // fontFamily: 'PTSerif-Bold',
          }}>
          {isPress ? `Added` : `Add`}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
const windowWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import ConfirmOrderCartContainer from './ConfirmOrderCartContainer';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ConfirmOrderCart({navigation, route}) {
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    console.log('confirmOrder', route);
    setorderData(route.params.orders);
    const newStateList = route.params.orders.map(value => ({
      total: value.quntity * value.sales_price,
    }));
    const sum = newStateList.reduce((accumulator, object) => {
      return accumulator + object.total;
    }, 0);

    setTotal(sum);
    console.log('total', newStateList, sum);
  }, []);
  const SubmitProduct = async () => {
    var patnerId = await AsyncStorage.getItem('partner_id');
    var userId = await AsyncStorage.getItem('user_id');

    const newStateList = orderData.map(value => ({
      product_id: value.id,
      name: value.product_name,
      product_uom_qty: value.quntity,
      price_unit: value.sales_price,
    }));
    console.log('ggggg', newStateList);

    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        partner_id: parseInt(patnerId),
        user_id: parseInt(userId),
        order_line: newStateList,
      },
    });
    console.log('create/saleorder', JSON.parse(raw));

    POST('create/saleorder', raw)
      .then(async response => {
        console.log('create/saleorder ', response);
        setLoading(false);
        if (response.error) {
          Toast.showWithGravity(
            response.error.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
        } else {
          navigation.replace('QuotationList');
          var tempCart = await AsyncStorage.removeItem('tempCart');

          Toast.showWithGravity(
            response.result.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const getAllOrders = id => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: id,
      },
    });

    POST('single/saleorder', raw)
      .then(async response => {
        console.log('single/saleorder', response);
        setLoading(false);
        setorderData(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const renderItem = ({item}) => (
    <ConfirmOrderCartContainer item={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      <Header navigation={navigation} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.pop();
          }}
          style={{
            position: 'absolute',
            left: 10,
            top: Platform.OS == 'ios' ? 30 : 15,
          }}>
          <Icon name="keyboard-backspace" size={30} color={color.PrimaryDark} />
        </TouchableOpacity>
        <Text
          style={{
            color: '#404040',
            fontWeight: '800',
            fontSize: 20,
            alignSelf: 'center',
            letterSpacing: 0.5,
            marginTop: Platform.OS == 'ios' ? 33 : 15,
            // fontFamily: 'PTSerif-Bold',
          }}>
          Confirm Order
        </Text>
      </View>

      {/* <TextInput
                        style={styles.input}
                        onChangeText={text => setName(text)}
                        value={name}
                        placeholder="Name"
                        placeholderTextColor="gray"
                      /> */}
      <FlatList
        contentContainerStyle={{marginTop: 10}}
        data={orderData}
        renderItem={renderItem}
      />
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: color.secondaryLight,

          width: windowWidth / 1.5,
          height: 50,
          alignSelf: 'center',
          borderRadius: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: color.PrimaryDark,
            letterSpacing: 0.5,
            fontSize: 16,
            alignSelf: 'center',
            fontWeight: '700',
            // fontFamily: 'PTSerif-Bold',
          }}>
          Total Amount: {total.toFixed(0)}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => SubmitProduct()}
        style={{
          backgroundColor: color.PrimaryDark,
          width: windowWidth / 1.1,
          height: 50,
          alignSelf: 'center',
          borderRadius: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            letterSpacing: 0.5,
            fontSize: 18,
            alignSelf: 'center',
            fontWeight: '700',
            // fontFamily: 'PTSerif-Bold',
          }}>
          PLACE ORDER
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    // fontFamily: 'PTSerif-Bold',

    fontSize: 18,
    marginTop: 8,
    height: 45,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

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

export default function AllSalesOrderContainer({navigation, item}) {
  const [loading, setLoading] = useState(false);

  const confirmOrder = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {order_id: item.id},
    });
    console.log('order/confirm ', JSON.parse(raw));

    POST('order/confirm', raw)
      .then(async response => {
        console.log('order/confirm ', response);
        setLoading(false);
        navigation.push('AllOrders', {
          orderId: item.id,
          screenName: 'Final',
          deliveryStatus: item.delivery_status,
        });
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => confirmOrder()}
      activeOpacity={0.8}
      style={{
        width: '90%',
        borderRadius: 10,
        backgroundColor: color.PrimaryDark,
        margin: 5,
        padding: 15,
        alignSelf: 'center',
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            // fontFamily: 'PTSerif-Bold',

            fontWeight: '500',
            color: 'white',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          Name - {item.customer}
        </Text>
        {item.mobile && (
          <Text
            style={{
              fontWeight: '500',
              color: 'white',
              fontSize: 16,
              alignSelf: 'center',
              // fontFamily: 'PTSerif-Bold',
            }}>
            Mo - {item.mobile}
          </Text>
        )}
      </View>
      <Text
        style={{
          fontWeight: '500',
          color: 'white',
          fontSize: 16,
          marginTop: 5,
          marginBottom: 5,
          // fontFamily: 'PTSerif-Bold',
        }}>
        Generated Date = {item.create_date}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontWeight: '500',
            color: 'white',
            fontSize: 16,
            alignSelf: 'center',
            // fontFamily: 'PTSerif-Bold',
          }}>
          Order Id= {item.id}
        </Text>

        <Text
          style={{
            // fontFamily: 'PTSerif-Bold',

            fontWeight: '500',
            color: 'white',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          Total= {item.total.toFixed(0)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

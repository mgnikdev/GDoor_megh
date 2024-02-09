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

export default function QuotationListContainer({navigation, item}) {
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
        navigation.replace('AllOrders', {
          flag: item.state,

          orderId: item.id,
          screenName: 'Quatation',
        });

        // navigation.push('AllSalesOrderProducts');
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  return (
    <TouchableOpacity
      onPress={() => {
        // Alert.alert('', 'Are you sure you want to Confirm this Order?', [
        //   {
        //     text: 'NO',
        //     // onPress: () => console.log("Cancel Pressed"),
        //     style: 'cancel',
        //   },
        //   {text: 'YES', onPress: () => confirmOrder()},
        // ]);
        navigation.replace('AllOrders', {
          flag: item.state,
          orderId: item.id,
          screenName: 'Quatation',
        });

        // confirmOrder();
        // navigation.push('ProductList');
      }}
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
              // fontFamily: 'PTSerif-Bold',
              fontWeight: '500',
              color: 'white',
              fontSize: 16,
              alignSelf: 'center',
            }}>
            Mo - {item.mobile}
          </Text>
        )}
      </View>
      <Text
        style={{
          // fontFamily: 'PTSerif-Bold',
          fontWeight: '500',
          color: 'white',
          fontSize: 16,
          marginTop: 5,
          marginBottom: 5,
        }}>
        Generated Date = {item.create_date}
      </Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            // fontFamily: 'PTSerif-Bold',
            fontWeight: '500',
            color: 'white',
            fontSize: 16,
            alignSelf: 'center',
          }}>
          Order Id= {item.id}
        </Text>
        {item.mobile && (
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
        )}
      </View>
    </TouchableOpacity>
  );
}

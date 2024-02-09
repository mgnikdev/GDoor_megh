import {Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AllOrderContainer({
  item,
  data,
  displayCall,
  screenName,
}) {
  const incrementProduct = () => {
    data(item, item.qty + 1);
  };
  const decrementProduct = () => {
    item.qty <= 1 ? DeleteOrder() : data(item, item.qty - 1);
  };
  const DeleteOrder = async () => {
    console.log('DeleteOrder', item.line_id);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        mode: 'delete',
        line_id: item.line_id,
      },
    });
    console.log('DeleteOrder rawraw ', JSON.parse(raw));

    POST('edit/order', raw)
      .then(response => {
        displayCall();
        console.log('DeleteOrder Response ', response);
      })
      .catch(err => {
        console.log('Erroorr', err);
      });
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={{
        width: '90%',
        borderRadius: 10,
        backgroundColor: color.PrimaryDark,
        margin: 5,
        padding: 15,
        alignSelf: 'center',
      }}>
      <Text
        style={{
          fontWeight: '500',
          color: 'white',
          // fontFamily: 'PTSerif-Bold',
          fontSize: 16,
        }}>
        {item.product_name}
      </Text>
      <Text
        style={{
          fontWeight: '500',
          color: 'white',
          // fontFamily: 'PTSerif-Bold',
          fontSize: 16,
        }}>
        Price: {(item.sales_price * item.qty).toFixed(0)}
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
          {item.attribute}
        </Text>
        {screenName == 'Quatation' ? null : (
          <Text
            style={{
              fontWeight: '500',
              color: 'white',
              fontSize: 16,
              alignSelf: 'center',
              // fontFamily: 'PTSerif-Bold',
              marginLeft: 8,
              marginRight: 8,
            }}>
            Quntity : {item.qty}
          </Text>
        )}
        {screenName == 'Quatation' && (
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{backgroundColor: 'white', borderRadius: 5}}
              onPress={() => item.qty != 0 && decrementProduct()}>
              {item.qty <= 1 ? (
                <Icon
                  name="delete"
                  size={20}
                  color={color.PrimaryDark}
                  style={{
                    padding: 3,
                    marginLeft: 3,
                    marginRight: 3,
                    padding: 5,
                  }}
                />
              ) : (
                <Text
                  style={{
                    paddingRight: 8,
                    paddingLeft: 8,

                    fontWeight: '500',
                    color: color.PrimaryDark,
                    fontSize: 25,
                    alignSelf: 'center',
                    // fontFamily: 'PTSerif-Bold',
                  }}>
                  -
                </Text>
              )}
            </TouchableOpacity>

            <Text
              style={{
                fontWeight: '500',
                color: 'white',
                fontSize: 16,
                alignSelf: 'center',
                // fontFamily: 'PTSerif-Bold',
                marginLeft: 8,
                marginRight: 8,
              }}>
              {item.qty}
            </Text>

            <TouchableOpacity
              style={{backgroundColor: 'white', borderRadius: 5}}
              onPress={() => {
                incrementProduct();
              }}>
              <Text
                style={{
                  paddingRight: 8,
                  paddingLeft: 8,

                  fontWeight: '500',
                  color: color.PrimaryDark,
                  fontSize: 25,
                  alignSelf: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

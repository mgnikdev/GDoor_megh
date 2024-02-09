import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';

const windowWidth = Dimensions.get('window').width;
export default function DeliveredContainer({navigation, item, updateState}) {
  const [loading, setLoading] = useState(false);

  const confirmOrder = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {order_id: item.id},
    });
    console.log('confirm/delivery/otp ', JSON.parse(raw));

    POST('confirm/delivery/otp', raw)
      .then(async response => {
        console.log('confirm/delivery/otp', response);
        setvalidateOTP(response.result.response.otp);
        setLoading(false);
        setOtpModal(true);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };

  return (
    <TouchableOpacity
      onPress={() => {}}
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
const styles = StyleSheet.create({
  root: {padding: 20, minHeight: 300},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {
    marginTop: 20,
    width: 200,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 10,
  },
  cellRoot: {
    width: 40,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  cellText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  },
  focusCell: {
    borderBottomColor: '#007AFF',
    borderBottomWidth: 2,
  },

  otpBoxesContainer: {
    flexDirection: 'row',
  },
  otpBox: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'grey',
    height: 45,
    width: 45,
    textAlign: 'center',
  },
  borderStyleBase: {
    width: 30,
    height: 45,
  },

  borderStyleHighLighted: {
    borderColor: '#03DAC6',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
  },

  underlineStyleHighLighted: {
    borderColor: '#03DAC6',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 15,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: windowWidth / 1.3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

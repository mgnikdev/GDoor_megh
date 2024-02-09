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
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;
const windowWidth = Dimensions.get('window').width;
export default function InProcessContainer({navigation, item, updateState}) {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState(['-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');
  const [validateOTP, setvalidateOTP] = useState('');
  const [otpModal, setOtpModal] = useState(false);

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
  const doneDelivery = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {order_id: item.id},
    });
    console.log('delivery/done ', JSON.parse(raw));

    POST('delivery/done', raw)
      .then(async response => {
        console.log('delivery/done', response);
        Toast.showWithGravity(
          response.result.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
        setLoading(false);
        setOtpModal(false);
        setOtp(['-', '-', '-', '-']);
        setOtpVal('');
        navigation.replace('Delivered');

        updateState('calling');
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };

  const [value, setValue] = useState('');
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert('', 'Are you sure you want to Confirm this Order?', [
          {
            text: 'NO',
            style: 'cancel',
          },
          {text: 'YES', onPress: () => confirmOrder()},
        ])
      }
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModal}
        onRequestClose={() => {
          setOtpModal(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: color.PrimaryDark, fontSize: 20}}>OTP</Text>
            <CodeField
              ref={ref}
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <View
                  // Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
                  onLayout={getCellOnLayoutHandler(index)}
                  key={index}
                  style={[styles.cellRoot, isFocused && styles.focusCell]}>
                  <Text style={styles.cellText}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                </View>
              )}
            />

            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: color.PrimaryDark,
                width: 210,
                marginTop: 10,
              }}
              onPress={() => {
                console.log('validation', typeof validateOTP, typeof otp);
                const otpInt = parseInt(value);

                const validateotpInt = parseInt(validateOTP);
                if (validateotpInt == otpInt) {
                  doneDelivery();
                  // setOtpModal(false);

                  // submitOtp();
                } else {
                  setOtp(['-', '-', '-', '-']);
                  setOtpVal('');
                  Toast.showWithGravity(
                    'Invalid OTP',
                    Toast.SHORT,
                    Toast.BOTTOM,
                  );
                  setTimeout(function () {
                    setOtpModal(false);
                  }, 800);
                }
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '600',
                  padding: 15,
                  textAlign: 'center',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

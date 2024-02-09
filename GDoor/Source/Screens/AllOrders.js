import {
  TextInput,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Platform,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import AllOrderContainer from './AllOrderContainer';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-simple-toast';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
const CELL_COUNT = 4;

const windowWidth = Dimensions.get('window').width;

export default function AllOrders({navigation, route}) {
  const [orderData, setorderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [screenName, setscreenName] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [otpModal, setOtpModal] = useState(false);
  const [code1, setcode1] = useState('');
  const [code2, setcode2] = useState('');
  const [code3, setcode3] = useState('');

  const [code4, setcode4] = useState('');
  const [otp, setOtp] = useState(['-', '-', '-', '-']);
  const [otpVal, setOtpVal] = useState('');
  const [validateOTP, setvalidateOTP] = useState('');

  const confirmOrder = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {order_id: route.params.orderId},
    });
    console.log('order/confirm ', JSON.parse(raw));
    POST('order/confirm', raw)
      .then(async response => {
        console.log('order/confirm ', response);
        setLoading(false);
        whtsApp(route.params.orderId);
        // navigation.pop();

        // navigation.replace('AllSalesOrderProducts');
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const whtsApp = id => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        id: id,
      },
    });
    POST('send/whatsapp', raw)
      .then(response => {
        console.log('send/whatsapp Response ', response);
        // Toast.showWithGravity(response.result, Toast.SHORT, Toast.BOTTOM);
        navigation.replace('AllSalesOrderProducts');
      })
      .catch(err => {
        setLoading(false);

        console.log(' send/whatsapp Erroorr', err);
      });
  };

  useEffect(() => {
    getAllOrders(route.params.orderId);
  }, []);
  const getAllOrders = id => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: id,
      },
    });
    console.log('single/saleorder ', JSON.parse(raw));

    POST('single/saleorder', raw)
      .then(async response => {
        console.log('getAllOrders', response);
        setLoading(false);
        setorderData(response.result.response);
        if (response.result.response.length == 0) {
          cancelOrder();
        }
        const newStateList = response.result.response.map(value => ({
          total: value.qty * value.sales_price,
        }));
        const sum = newStateList.reduce((accumulator, object) => {
          return accumulator + object.total;
        }, 0);

        setTotal(sum);
        console.log('total', newStateList, sum);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const cancelOrder = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: route.params.orderId,
      },
    });
    console.log('cancel/saleorder', JSON.parse(raw));

    POST('cancel/saleorder', raw)
      .then(async response => {
        console.log('cancel/saleorder', response);
        setLoading(false);
        setorderData([]);
        navigation.pop();
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const EditOrder = async (line_id, product_id, product_name, qty) => {
    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        mode: 'edit',
        line_id: line_id,
        order_line: [
          {
            product_id: product_id,
            name: product_name,
            product_uom_qty: qty,
            // price_unit: 50,
          },
        ],
      },
    });
    console.log('EditOrder rawraw ', JSON.parse(raw));

    POST('edit/order', raw)
      .then(response => {
        getAllOrders(route.params.orderId);
        console.log('EditOrder Response ', response);
      })
      .catch(err => {
        console.log('Erroorr', err);
      });
  };

  const renderEmpty = () => (
    <Text
      style={{
        fontSize: 18,
        marginTop: 20,
        fontWeight: '600',
        color: 'gray',
        alignItems: 'center',
        textAlign: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1,
      }}>
      You have no data
    </Text>
  );
  const renderItem = ({item}) => (
    <AllOrderContainer
      item={item}
      navigation={navigation}
      data={(val, val1) => {
        EditOrder(val.line_id, val.product_id, val.product_name, val1);
        console.log('AllOrderContainer value', val, val1);
      }}
      displayCall={() => getAllOrders(route.params.orderId)}
      screenName={route.params.screenName}
    />
  );

  const paymentOptionApi = payment_type => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: route.params.orderId,
        payment_type: payment_type,
      },
    });
    console.log('set/payment/type', JSON.parse(raw));

    POST('set/payment/type', raw)
      .then(async response => {
        console.log('set/payment/type', response);

        setLoading(false);
        setModalVisible(false);
        submitOtp();
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const submitOtp = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: route.params.orderId,
      },
    });
    console.log('/send/payment/otp', JSON.parse(raw));

    POST('send/payment/otp', raw)
      .then(async response => {
        console.log('/send/payment/otp', response);
        Toast.showWithGravity(
          response.result.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
        setvalidateOTP(response.result.response.otp);
        setOtpModal(true);

        setLoading(false);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };

  const deliveryInprocess = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        order_id: route.params.orderId,
      },
    });
    console.log('delivery/inprocess', JSON.parse(raw));

    POST('order/confirm/delivery/inprocess', raw)
      .then(async response => {
        console.log('delivery/inprocess', response);
        Toast.showWithGravity(
          response.result.message,
          Toast.SHORT,
          Toast.BOTTOM,
        );
        setvalidateOTP(response.result.response.otp);
        setOtpModal(false);
        navigation.replace('InProcess');
        setOtp(['-', '-', '-', '-']);
        setOtpVal('');
        setLoading(false);
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
          Order Detail
        </Text>
      </View>
      {route.params.screenName == 'Final' &&
      route.params.deliveryStatus != 'done' ? (
        <View
          style={{
            flexDirection: 'row',
            alignSelf: 'flex-end',
            marginRight: 15,
          }}>
          <TouchableOpacity
            style={{
              width: '35%',
              borderRadius: 10,
              backgroundColor: color.PrimaryDark,
              alignSelf: 'center',
              padding: 10,
              marginRight: 10,
              marginTop: 10,
            }}
            onPress={() => setModalVisible(true)}>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 15,
                alignSelf: 'center',
                // fontFamily: 'PTSerif-Bold',
              }}>
              Payment
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {route.params.screenName == 'Quatation' && (
        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity
            style={{
              width: '35%',
              borderRadius: 10,
              backgroundColor: color.PrimaryDark,
              alignSelf: 'center',
              padding: 10,
              marginRight: 10,
              marginTop: 10,
            }}
            onPress={() =>
              Alert.alert('', 'Are you sure you want to Confirm this Order?', [
                {
                  text: 'NO',
                  style: 'cancel',
                },
                {text: 'YES', onPress: () => confirmOrder()},
              ])
            }>
            <Text
              style={{
                color: 'white',
                fontWeight: '500',
                fontSize: 15,
                alignSelf: 'center',
                // fontFamily: 'PTSerif-Bold',
                marginLeft: 10,
              }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
          {route.params.flag == 'draft' && (
            <TouchableOpacity
              style={{
                width: '35%',
                borderRadius: 10,
                backgroundColor: color.PrimaryDark,
                alignSelf: 'center',
                padding: 10,
                // marginRight: 20,
                marginTop: 10,
              }}
              onPress={() =>
                Alert.alert('', 'Are you sure you want to Cancel this Order?', [
                  {
                    text: 'NO',
                    style: 'cancel',
                  },
                  {text: 'YES', onPress: () => cancelOrder()},
                ])
              }>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '500',
                  fontSize: 15,
                  alignSelf: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                Cancel Order
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      <FlatList
        contentContainerStyle={{marginTop: 8}}
        data={orderData}
        renderItem={renderItem}
        ListEmptyComponent={renderEmpty}
      />

      <View style={{backgroundColor: '#303030'}}>
        <Text
          style={{
            padding: 20,
            color: 'white',
            // fontFamily: 'PTSerif-Bold',
            fontWeight: '500',
            fontSize: 18,
          }}>
          Total : {total.toFixed(0)}
        </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: color.PrimaryDark, fontSize: 20}}>
              Payment Options
            </Text>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: color.PrimaryDark,
                width: 210,
                marginTop: 10,
              }}
              onPress={() => {
                paymentOptionApi('cod');
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '600',
                  padding: 15,
                  textAlign: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                COD
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: color.PrimaryDark,
                width: 210,
                marginTop: 10,
              }}
              onPress={() => {
                paymentOptionApi('cash_now');
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '600',
                  padding: 15,
                  textAlign: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                Cash Now
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                borderRadius: 10,
                backgroundColor: color.PrimaryDark,
                width: 210,
                marginTop: 10,
              }}
              onPress={() => {
                // paymentOptionApi('payment_link');
              }}>
              <Text
                style={{
                  letterSpacing: 0.5,
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '600',
                  padding: 15,
                  textAlign: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                Payment Link
              </Text>
            </TouchableOpacity> */}
            {/* <Text style={styles.modalText}>Hello World!</Text> */}
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={otpModal}
        onRequestClose={() => {
          setOtpModal(false);
          setOtp(['-', '-', '-', '-']);
          setOtpVal('');
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color: color.PrimaryDark, fontSize: 20}}>OTP</Text>
            {/* <TextInput
              onChangeText={value => {
                if (isNaN(value)) {
                  return;
                }
                if (value.length > 4) {
                  return;
                }
                let val = value + '----'.substr(0, 4 - value.length);
                let a = [...val];
                setOtpVal(a);
                setOtp(value);
                console.log('otpval', a, '=======otp====', value);
              }}
              // style={{height: 0}}
              // autoFocus={true}
              keyboardType="number-pad"
              keyboardAppearance={'dark'}
            />
            <View style={styles.otpBoxesContainer}>
              {[0, 1, 2, 3].map((item, index) => (
                <Text style={styles.otpBox} key={index}>
                  {otp[item]}
                </Text>
              ))}
            </View> */}
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
                if (validateOTP == otpInt) {
                  deliveryInprocess();
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
    </SafeAreaView>
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
  input: {
    height: 65,
    width: '13%',
    borderWidth: 1,
    borderRadius: 15,
    alignSelf: 'center',
    fontWeight: '800',
    textAlign: 'center',
    fontSize: 35,
    margin: 5,
    marginTop: 40,
    color: 'black',
    textAlign: 'center',
    textAlignVertical: 'center',
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

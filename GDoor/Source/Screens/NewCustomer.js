import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import {MultiSelect, Dropdown} from 'react-native-element-dropdown';
import Toast from 'react-native-simple-toast';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewCustomer({navigation, props}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMob] = useState('');
  const [city, setCity] = useState('');
  const [stateList, setStateList] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState(588);
  const [zipList, setzipList] = useState([]);
  const [selectedzipId, setselectedzipId] = useState(0);
  const [landmark, setlandmark] = useState('');
  const [address, setaddress] = useState('');
  const [aptNo, setaptNo] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSelectedStateId(588);
    getstate();
    zipcodeList();
  }, []);
  const zipcodeList = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });
    POST('zip', raw)
      .then(response => {
        console.log('zip Response ', response);
        const newStateList = response.result.response.map(value => ({
          label: value.name,
          value: value.id,
        }));
        console.log('zip newStateList ', newStateList);

        setLoading(false);
        setzipList(newStateList);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const getstate = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });
    console.log('auth raw ', JSON.parse(raw));

    POST('getstate', raw)
      .then(async response => {
        console.log('getstate Response ', response);
        setLoading(false);

        const newStateList = response.result.response.map(value => ({
          label: value.state_name,
          value: value.id,
        }));
        setStateList(newStateList);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const next = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        name: name,
        login: email,
        mobile: mobile,
        street: `${aptNo} `,
        street2: address,
        zip_id: selectedzipId != 0 && parseInt(selectedzipId),
        password: password,
        city: city,
        state_id: selectedStateId,
      },
    });
    console.log('create/user raw ', JSON.parse(raw));

    POST('create/user', raw)
      .then(async response => {
        console.log('create/user Response ', response);
        setLoading(false);
        if (response.error) {
          Toast.showWithGravity(
            response.error.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
        } else {
          setLoading(false);

          Toast.showWithGravity(
            response.result.message,
            Toast.SHORT,
            Toast.BOTTOM,
          );
          if (response.result.response.length != 0) {
            navigation.push('CustomerList');
            setName('');
            setEmail('');
            setMob('');
            setPassword('');
            setCity('');
            setSelectedStateId(588);
            setaptNo('');
            setaddress('');
            setselectedzipId(0);
          }
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const validationField = () => {
    if (name == '') {
      Toast.showWithGravity('Enter Customer Name', Toast.SHORT, Toast.BOTTOM);
    } else if (email == '') {
      Toast.showWithGravity('Please enter Email ', Toast.SHORT, Toast.BOTTOM);
    } else if (password == '') {
      Toast.showWithGravity(
        'Enter Customer Password',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else if (mobile == '') {
      Toast.showWithGravity(
        "Enter Customer's Mobile Number ",
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else if (city == '') {
      Toast.showWithGravity("Enter Customer's City", Toast.SHORT, Toast.BOTTOM);
    } else {
      next();
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.secondaryLight}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      {loading && (
        <View style={styles.activityLoader}>
          <ActivityIndicator
            size="large"
            color="#000"
            style={{alignSelf: 'center'}}
          />
        </View>
      )}
      <ImageBackground
        source={require('../Helper/Assets/create_user_background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
        <ScrollView>
          <TouchableOpacity
            onPress={() => {
              navigation.pop();
            }}
            style={{
              position: 'absolute',
              left: 10,
              top: Platform.OS == 'ios' ? 30 : 20,
            }}>
            <Icon
              name="keyboard-backspace"
              size={30}
              color={color.PrimaryDark}
            />
          </TouchableOpacity>
          <Header navigation={navigation} />
          <Text
            style={{
              color: '#404040',
              fontWeight: '800',
              fontSize: 25,
              alignSelf: 'center',
              letterSpacing: 0.5,
              padding: 20,
              // fontFamily: 'PTSerif-Bold',
            }}>
            Create Customer
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Name"
            placeholderTextColor="gray"
          />

          <TextInput
            style={styles.input}
            onChangeText={text => setEmail(text)}
            value={email}
            placeholder="Mail ID"
            placeholderTextColor="gray"
          />

          <TextInput
            style={styles.input}
            onChangeText={text => setPassword(text)}
            value={password}
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            onChangeText={text => setMob(text)}
            value={mobile}
            placeholder="Mobile Number"
            placeholderTextColor="gray"
            keyboardType="phone-pad"
            maxLength={10}
          />

          <TextInput
            style={styles.input}
            onChangeText={val => setaptNo(val)}
            value={aptNo}
            placeholder="House no/Appartment Name"
            placeholderTextColor="gray"
          />
          <TextInput
            style={styles.input}
            onChangeText={val => setaddress(val)}
            value={address}
            placeholder="Address"
            placeholderTextColor="gray"
          />
          {/* <TextInput
            style={styles.input}
            onChangeText={val => {
              setlandmark(val);
            }}
            value={landmark}
            placeholder="Landmark/Area"
            placeholderTextColor="gray"
          /> */}
          <TextInput
            style={styles.input}
            onChangeText={text => setCity(text)}
            value={city}
            placeholder="City"
            placeholderTextColor="gray"
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={zipList}
            labelField="label"
            valueField="value"
            placeholder="ZipCode"
            searchPlaceholder="Search..."
            placeholderTextColor="gray"
            value={selectedzipId}
            onChange={item => {
              console.log('item', item);
              setselectedzipId(item.value);
              // this.setState({selectedStateId: item.value});
            }}
            selectedStyle={styles.selectedStyle}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            search
            data={stateList}
            labelField="label"
            valueField="value"
            placeholder="State"
            searchPlaceholder="Search..."
            placeholderTextColor="gray"
            value={selectedStateId}
            onChange={item => {
              console.log('item', item);
              setSelectedStateId(item.value);
              // this.setState({selectedStateId: item.value});
            }}
            selectedStyle={styles.selectedStyle}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={{
              backgroundColor: color.PrimaryDark,
              width: '90%',
              marginTop: 30,
              padding: 10,
              alignSelf: 'center',
              borderRadius: 10,
              zIndex: 111111,
            }}
            onPress={() => {
              validationField();
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                fontSize: 18,
                alignSelf: 'center',
                letterSpacing: 0.5,
                // fontFamily: 'PTSerif-Bold',
              }}>
              Add Customer
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </ImageBackground>
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
    fontSize: 18,
    marginTop: 8,
    height: 45,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // fontFamily: 'PTSerif-Bold',
  },
  dropdown: {
    width: '90%',
    alignSelf: 'center',
    // marginLeft: Platform.OS == 'ios' ? 15 : 20,
    // marginRight: Platform.OS == 'ios' ? 15 : 20,
    marginTop: 8,
    height: 45,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: 'gray',
    padding: 5,
    // fontFamily: 'PTSerif-Bold',
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'gray',
    paddingHorizontal: 5,
    fontSize: 18,
    // fontFamily: 'PTSerif-Bold',
  },
  selectedTextStyle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    paddingHorizontal: 5,
    // fontFamily: 'PTSerif-Bold',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    // fontFamily: 'PTSerif-Bold',
  },
});

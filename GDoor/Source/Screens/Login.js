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
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation, props}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [email, setEmail] = useState('info@meghsundar.com');
  // const [password, setPassword] = useState('Meghsundar@123456');
  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  const next = () => {
    navigation.replace('GeneralMenu');
  };
  const validationField = () => {
    if (email == '') {
      Toast.showWithGravity(
        'Please enter UserName first',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else if (password == '') {
      Toast.showWithGravity(
        'Please enter Password first',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else {
      login();
    }
  };
  const login = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        login: email,
        password: password,

        db: 'website',
      },
    });
    console.log('auth raw ', JSON.parse(raw));

    POST('web/session/authenticate', raw)
      .then(async response => {
        console.log('auth Response ', response);

        setLoading(false);

        if (response.error) {
          Toast.showWithGravity(
            'Your id or password is invalid',
            Toast.SHORT,
            Toast.BOTTOM,
          );
        } else {
          await AsyncStorage.setItem(
            'user_id',
            JSON.stringify(response.result.user_id[0]),
          );
          next();
        }
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.secondaryLight}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      <ImageBackground
        source={require('../Helper/Assets/background_login.jpg')}
        resizeMode="cover"
        style={{flex: 1}}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image
            style={{
              height: 100,
              width: 100,
              borderRadius: 22,
              overflow: 'hidden',
              alignSelf: 'center',
            }}
            source={require('../Helper/Assets/gdoor_red.png')}
          />
          <Text
            style={{
              color: color.PrimaryDark,
              fontWeight: '600',
              fontSize: 25,
              textAlign: 'center',
              // fontFamily: 'PTSerif-Bold',
            }}>
            GDoor
          </Text>
        </View>

        <View style={{flex: 1, zIndex: 111111111}}>
          <View
            style={{backgroundColor: '#fff', borderRadius: 20, padding: 25}}>
            <Text
              style={{
                color: 'black',
                fontWeight: '400',
                fontSize: 18,
                marginBottom: 10,
                // fontFamily: 'PTSerif-Bold',
              }}>
              Login With
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={text => setEmail(text)}
              value={email}
              placeholder="UserName"
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

            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                backgroundColor: color.PrimaryDark,
                width: '100%',
                marginTop: 30,
                padding: 10,
                alignSelf: 'center',
                borderRadius: 10,
                zIndex: 111111111,
              }}
              onPress={() => {
                validationField();
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '700',
                  fontSize: 15,
                  alignSelf: 'center',
                  // fontFamily: 'PTSerif-Bold',
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text
            style={{
              color: '#1F85B4',
              fontWeight: '600',
              fontSize: 11,
              marginBottom: 5,
              textAlign: 'center',
              // fontFamily: 'PTSerif-Bold',
            }}>
            Design & Developed By
          </Text>

          <Image
            style={{
              height: 50,
              width: 180,
              alignSelf: 'center',
              marginBottom: 10,
            }}
            source={require('../Helper/Assets/company_logo.png')}
            resizeMode={'contain'}
          />
        </View>
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
    marginTop: 5,
    height: 45,
    width: '100%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    backgroundColor: '#E9EDEE',
    paddingHorizontal: 10,
    // fontFamily: 'PTSerif-Bold',
  },
});

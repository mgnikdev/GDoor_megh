import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FilterSelection({navigation, props}) {
  // const [email, setEmail] = useState('mgg@meghsundar.com');
  // const [password, setPassword] = useState('Megha1234');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMob] = useState('');
  const [city, setCity] = useState('');
  const [stateList, setStateList] = useState([]);
  const [selectedStateId, setSelectedStateId] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: color.secondaryLight}}>
      <StatusBar backgroundColor={color.PrimaryDark} />

      <ImageBackground
        source={require('../Helper/Assets/create_user_background.png')}
        resizeMode="cover"
        style={{flex: 1}}>
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
              top: Platform.OS == 'ios' ? 35 : 18,
            }}>
            <Icon
              name="keyboard-backspace"
              size={30}
              color={color.PrimaryDark}
            />
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
            Select Category/Brand
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: color.PrimaryDark,
              width: 210,
              marginBottom: 80,
            }}
            onPress={() => {
              navigation.push('AllCategorieList');
            }}>
            <Text
              style={{
                letterSpacing: 0.5,
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                padding: 25,
                textAlign: 'center',
                // fontFamily: 'PTSerif-Bold',
              }}>
              CATEGORY
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderRadius: 10,
              backgroundColor: color.PrimaryDark,
              width: 210,
            }}
            onPress={() => {
              navigation.push('AllBrandList');
            }}>
            <Text
              style={{
                letterSpacing: 0.5,
                color: '#fff',
                fontSize: 18,
                fontWeight: '600',
                padding: 25,
                textAlign: 'center',
                // fontFamily: 'PTSerif-Bold',
              }}>
              BRAND
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

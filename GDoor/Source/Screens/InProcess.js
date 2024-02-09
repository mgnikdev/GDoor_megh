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
  FlatList,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
import InProcessContainer from './InProcessContainer';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function InProcess({navigation}) {
  const [saleorderData, setsaleorderData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);
  useEffect(() => {
    getsaleorder();
  }, []);
  const getsaleorder = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });

    POST('order/delivery/inprocess', raw)
      .then(async response => {
        console.log('order/delivery/inprocess ', response);
        setLoading(false);
        setsaleorderData(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = saleorderData;
    let filteredName = trucks.filter(item => {
      // return item.customer.toLowerCase().match(text);
      const itemData = `${item.customer.toLowerCase()} ${item.mobile} ${
        item.mobile
      } ${item.id}`;
      const textData = text;
      return itemData.includes(textData);
    });
    // if (!text || text === '') {
    //   settempData(saleorderData);
    // } else
    if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setnoData(true);
    } else if (Array.isArray(filteredName)) {
      setnoData(false);

      settempData(filteredName);
    }
  };
  const renderItem = ({item}) => (
    <InProcessContainer
      item={item}
      navigation={navigation}
      updateState={data => getsaleorder()}
    />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      <Header navigation={navigation} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
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
            // fontFamily: 'PTSerif-Bold'
          }}>
          InProcess Delivery
        </Text>
      </View>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />
      <FlatList
        style={{marginTop: 15}}
        data={tempData.length != 0 ? tempData : saleorderData}
        renderItem={renderItem}
      />
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
    // fontFamily: 'PTSerif-Bold',

    height: 45,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
});

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
import QuotationListContainer from './QuotationListContainer';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function QuotationList({navigation}) {
  const [quotationData, setQuotationData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getQuotationList();
    });
    return unsubscribe;
  }, [navigation]);
  //   getQuotationList();
  // }, []);
  const getQuotationList = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });

    POST('quotation', raw)
      .then(async response => {
        console.log('quotation ', response);
        setLoading(false);
        setQuotationData(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const renderItem = ({item}) => (
    <QuotationListContainer item={item} navigation={navigation} />
  );
  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = quotationData;
    let filteredName = trucks.filter(item => {
      // return item.customer.toLowerCase().match(text);
      const itemData = `${item.customer.toLowerCase()} ${item.mobile} ${
        item.mobile
      } ${item.id}`;
      const textData = text;
      return itemData.includes(textData);
    });
    // if (!text || text === '') {
    //   settempData(quotationData);
    // } else
    if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setnoData(true);
    } else if (Array.isArray(filteredName)) {
      setnoData(false);

      settempData(filteredName);
    }
  };
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
            // fontFamily: 'PTSerif-Bold',
          }}>
          Placed Orders
        </Text>
      </View>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />
      <Text
        style={{
          color: '#404040',
          fontWeight: '600',
          fontSize: 18,
          // letterSpacing: 0.5,
          marginLeft: 10,
          // fontFamily: 'PTSerif-Bold',
          marginTop: 10,
        }}>
        Select The Order For Confirm
      </Text>

      <FlatList
        data={tempData.length != 0 ? tempData : quotationData}
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

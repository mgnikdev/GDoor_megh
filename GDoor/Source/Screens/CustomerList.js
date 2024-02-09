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
import CustomerListContainer from './CustomerListContainer';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import SearchInput, {createFilter} from 'react-native-search-filter';
export default function CustomerList({navigation, props}) {
  const [customerList, setCustomerList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);

  useEffect(() => {
    getCustomers();
  }, []);
  const getCustomers = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });
    console.log('customers raw ', JSON.parse(raw));

    POST('customers', raw)
      .then(async response => {
        console.log('customers Response ', response);
        setLoading(false);
        setCustomerList(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = customerList;
    let filteredName = trucks.filter(item => {
      // return item.customer.toLowerCase().match(text);

      const itemData = `${item.customer.toLowerCase()} ${item.mobile}`;
      const textData = text;
      return itemData.includes(textData);
    });
    // if (!text || text === '') {
    //   settempData(customerList);
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
    <CustomerListContainer item={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      <Header navigation={navigation} />

      <TouchableOpacity
        onPress={() => {
          navigation.pop();
        }}
        style={{
          position: 'absolute',
          left: 10,
          top: Platform.OS == 'ios' ? 60 : 18,
        }}>
        <Icon name="keyboard-backspace" size={30} color={color.PrimaryDark} />
      </TouchableOpacity>
      <Text
        style={{
          color: '#404040',
          fontWeight: '800',
          fontSize: 23,
          alignSelf: 'center',
          letterSpacing: 0.5,
          marginTop: 15,
          marginBottom: 20,
          // fontFamily: 'PTSerif-Bold',
        }}>
        All Customers
      </Text>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />

      <FlatList
        data={tempData.length != 0 ? tempData : customerList}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${index}`}
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
    height: 45,
    width: '90%',
    borderRadius: 10,
    alignSelf: 'center',
    color: 'black',
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    // fontFamily: 'PTSerif-Bold',
  },
});

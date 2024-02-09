import {
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  FlatList,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
const windowWidth = Dimensions.get('window').width;
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ProductListContainer from './ProductListContainer';
export default function ProductList({navigation, route}) {
  const [ProductList, setProductList] = useState([]);
  const [submitProductList, setSubmitProductList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);
  useEffect(async () => {
    var tempCart = await AsyncStorage.getItem('tempCart');
    console.log('tempCart', tempCart);

    if (tempCart != null) {
      console.log('tempCart12', JSON.parse(tempCart));
      setSubmitProductList(JSON.parse(tempCart));
    }
    getProducts(route.params.categoryId, route.params.brandId);
  }, []);
  const getProducts = (categoryId, brandId) => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        category_id: categoryId,
        brand_id: brandId,
      },
    });
    console.log('filter/brand_category', JSON.parse(raw));

    POST('filter/brand_category', raw)
      .then(async response => {
        console.log('brand_category Response ', response);
        setLoading(false);
        setProductList(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const SubmitProduct = async () => {
    if (submitProductList.length == 0) {
      Toast.showWithGravity(
        'Choose atleast any one Product',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    } else {
      var patnerId = await AsyncStorage.getItem('partner_id');
      var userId = await AsyncStorage.getItem('user_id');

      const newStateList = submitProductList.map(value => ({
        id: value.id,
        product_name: value.product_name,
        quntity: value.quntity,
        sales_price: value.sales_price,
        attribute: value.attribute,
      }));
      console.log('ggggg', newStateList);
      navigation.replace('ConfirmOrderCart', {orders: newStateList});
      await AsyncStorage.setItem('tempCart', JSON.stringify(newStateList));
      // setLoading(true);

      // var raw = JSON.stringify({
      //   jsonrpc: '2.0',
      //   params: {
      //     partner_id: parseInt(patnerId),
      //     user_id: parseInt(userId),
      //     order_line: newStateList,
      //   },
      // });
      // console.log('create/saleorder', raw);

      // POST('create/saleorder', raw)
      //   .then(async response => {
      //     console.log('create/saleorder ', response);
      //     setLoading(false);
      //     if (response.error) {
      //       Toast.showWithGravity(
      //         response.error.message,
      //         Toast.SHORT,
      //         Toast.BOTTOM,
      //       );
      //     } else {
      //       navigation.push('QuotationList');

      //       Toast.showWithGravity(
      //         response.result.message,
      //         Toast.SHORT,
      //         Toast.BOTTOM,
      //       );
      //     }
      //   })
      //   .catch(err => {
      //     setLoading(false);

      //     console.log('Erroorr', err);
      //   });
    }
  };
  const renderItem = ({item}) => (
    <ProductListContainer
      item={item}
      navigation={navigation}
      updateState={data => updateState(data)}
    />
  );
  const updateState = data => {
    setSubmitProductList([...submitProductList, data]);
    console.log('updated State', data, submitProductList);
  };
  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = ProductList;
    let filteredName = trucks.filter(item => {
      return item.product_name.toLowerCase().match(text);
      // const itemData = `${item.product_name.toLowerCase()} ${item.attribute}`;
      // const textData = e;
      // return itemData.includes(textData);
    });
    if (!text || text === '') {
      settempData(ProductList);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setnoData(true);
    } else if (Array.isArray(filteredName)) {
      setnoData(false);

      settempData(filteredName);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#F8F8F8'}}>
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
          Add Order To Use Cart
        </Text>
      </View>
      <Text
        style={{
          color: 'black',
          fontSize: 16,
          alignSelf: 'center',
          letterSpacing: 0.8,
          marginTop: Platform.OS == 'ios' ? 33 : 15,
          borderBottomColor: color.PrimaryDark,
          borderBottomWidth: 1.3,
          marginTop: 10,
          marginBottom: 15,
          // fontFamily: 'PTSerif-Bold',
        }}>
        ALL PRODUCTS
      </Text>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />
      <FlatList
        data={tempData.length != 0 ? tempData : ProductList}
        renderItem={renderItem}
        contentContainerStyle={{alignSelf: 'center'}}
        numColumns={2}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        onPress={() => SubmitProduct()}
        style={{
          backgroundColor: color.PrimaryDark,
          width: windowWidth / 1.1,
          height: 50,
          alignSelf: 'center',
          borderRadius: 10,
          marginBottom: 5,
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            letterSpacing: 0.5,
            fontSize: 18,
            alignSelf: 'center',
            fontWeight: '700',
            // fontFamily: 'PTSerif-Bold',
          }}>
          Submit
        </Text>
      </TouchableOpacity>
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

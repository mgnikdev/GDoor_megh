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
  ActivityIndicator,
  Platform,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
import AllBrandListContainer from './AllBrandListContainer';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function AllBrandList({navigation, props}) {
  const [brandList, setBrandList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);
  useEffect(() => {
    getBrand();
  }, []);

  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = brandList;
    let filteredName = trucks.filter(item => {
      return item.brand_name.toLowerCase().match(text);
    });
    if (!text || text === '') {
      settempData(brandList);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // set no data flag to true so as to render flatlist conditionally
      setnoData(true);
    } else if (Array.isArray(filteredName)) {
      setnoData(false);

      settempData(filteredName);
    }
  };
  const getBrand = () => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {},
    });

    POST('brands', raw)
      .then(async response => {
        console.log('brands Response ', response);
        setLoading(false);
        setBrandList(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const renderItem = ({item}) => (
    <AllBrandListContainer item={item} navigation={navigation} />
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar backgroundColor={color.PrimaryDark} />
      <Header navigation={navigation} />
      {loading && (
        <View style={styles.activityLoader}>
          <ActivityIndicator
            size="large"
            color="#000"
            style={{alignSelf: 'center'}}
          />
        </View>
      )}
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
            top: Platform.OS == 'ios' ? 35 : 18,
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
            marginTop: Platform.OS == 'ios' ? 33 : 15,
            // fontFamily: 'PTSerif-Bold',
          }}>
          All Brands
        </Text>
      </View>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />
      <FlatList
        data={tempData.length != 0 ? tempData : brandList}
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

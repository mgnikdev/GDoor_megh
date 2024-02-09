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
  ActivityIndicator
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {color} from '../Helper/Global/Global';
import {POST} from '../Helper/Apis/Apis';
import Toast from 'react-native-simple-toast';
import BrandCategoryListContainer from './BrandCategoryListContainer';
import SearchBar from '../CustomComponent/searchBar';
import Header from '../CustomComponent/Header';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function BrandCategoryList({navigation, route}) {
  const [categoryBrandList, setCategoryBrandList] = useState([]);
  const [brandId, setbrandId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tempData, settempData] = useState([]);
  const [noData, setnoData] = useState(false);

  useEffect(() => {
    console.log('CategoryBrandList ppprrrooops', navigation, route);
    setbrandId(route.params.brandId);
    getCategoryBrand(route.params.brandId);
  }, []);
  const getCategoryBrand = id => {
    setLoading(true);

    var raw = JSON.stringify({
      jsonrpc: '2.0',
      params: {
        brand_id: id,
      },
    });
    console.log('brand/related/category', JSON.parse(raw));
    POST('brand/related/category', raw)
      .then(async response => {
        console.log('brand/related/category Response ', response);
        setLoading(false);
        setCategoryBrandList(response.result.response);
      })
      .catch(err => {
        setLoading(false);

        console.log('Erroorr', err);
      });
  };
  const renderItem = ({item}) => (
    <BrandCategoryListContainer
      item={item}
      navigation={navigation}
      brandId={brandId}
    />
  );

  const searchText = e => {
    let text = e.toLowerCase();
    let trucks = categoryBrandList;
    let filteredName = trucks.filter(item => {
      return item.name.toLowerCase().match(text);
    });
    if (!text || text === '') {
      settempData(categoryBrandList);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
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
          All Category Related Brands
        </Text>
      </View>
      <SearchBar
        searchData={data => {
          console.log('darra', data);
          searchText(data);
        }}
      />
      <FlatList
        data={tempData.length != 0 ? tempData : categoryBrandList}
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

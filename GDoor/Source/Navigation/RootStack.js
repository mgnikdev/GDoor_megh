import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../Screens/Login';
import GeneralMenu from '../Screens/GeneralMenu';
import Splash from '../Screens/Splash';
import NewCustomer from '../Screens/NewCustomer';
import CustomerList from '../Screens/CustomerList';
import QuotationList from '../Screens/QuotationList';
import AllSalesOrderProducts from '../Screens/AllSalesOrderProducts';
import FilterSelection from '../Screens/FilterSelection';
import AllCategorieList from '../Screens/AllCategorieList';
import AllBrandList from '../Screens/AllBrandList';
import CategoryBrandList from '../Screens/CategoryBrandList';
import ProductList from '../Screens/ProductList';
import AllOrders from '../Screens/AllOrders';
import ConfirmOrderCart from '../Screens/ConfirmOrderCart';
import BrandCategoryList from '../Screens/BrandCategoryList';
import InProcess from '../Screens/InProcess';
import Delivered from '../Screens/Delivered';
const Stack = createNativeStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="Login" component={Login} />
      {/* <Stack.Group screenOptions={{presentation: 'modal'}}> */}
      <Stack.Screen name="GeneralMenu" component={GeneralMenu} />
      <Stack.Screen name="NewCustomer" component={NewCustomer} />
      <Stack.Screen name="CustomerList" component={CustomerList} />
      <Stack.Screen name="FilterSelection" component={FilterSelection} />
      <Stack.Screen name="AllCategorieList" component={AllCategorieList} />
      <Stack.Screen name="AllBrandList" component={AllBrandList} />
      <Stack.Screen name="CategoryBrandList" component={CategoryBrandList} />
      <Stack.Screen name="BrandCategoryList" component={BrandCategoryList} />

      <Stack.Screen name="ProductList" component={ProductList} />
      <Stack.Screen name="ConfirmOrderCart" component={ConfirmOrderCart} />
      <Stack.Screen name="InProcess" component={InProcess} />
      <Stack.Screen name="Delivered" component={Delivered} />

      <Stack.Screen name="QuotationList" component={QuotationList} />
      <Stack.Screen
        name="AllSalesOrderProducts"
        component={AllSalesOrderProducts}
      />
      <Stack.Screen name="AllOrders" component={AllOrders} />

      {/* </Stack.Group> */}
    </Stack.Navigator>
  );
}

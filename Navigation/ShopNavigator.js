import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerActions,
  DrawerItems,
} from 'react-navigation-drawer';
import ProductDisplayScreen from '../Screens/Shop/ProductDisplayScreen';
import ProductDetailsScreen from '../Screens/Shop/ProductDetailsScreen';
import CartScreen from '../Screens/Shop/CartScreen';
import OrdersScreen from '../Screens/Shop/OrdersScreen';
import {SafeAreaView, View, TouchableOpacity, Text} from 'react-native';
import Colors from '../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AdminProductScreen from '../Screens/Admin/AdminProductScreen';
import EditProductScreen from '../Screens/Admin/EditProductScreen';
import AuthScreen from '../Screens/Admin/AuthScreen';
import StartPage from '../Screens/StartPage';
import React from 'react';
import {useDispatch} from 'react-redux';
import {Logout} from '../store/actions/auth';

const configSettings = {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: 'white',
};
const stackNav = createStackNavigator(
  {
    Products: ProductDisplayScreen,
    ProductDetails: ProductDetailsScreen,
    Cart: CartScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerSetting) => (
        <Ionicons
          size={23}
          color={drawerSetting.tintColor}
          name="md-cart"></Ionicons>
      ),
    },
    defaultNavigationOptions: configSettings,
  },
);
const ordernavigator = createStackNavigator(
  {
    Order: OrdersScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerSetting) => (
        <Ionicons
          size={23}
          color={drawerSetting.tintColor}
          name="md-list"></Ionicons>
      ),
    },
    defaultNavigationOptions: configSettings,
  },
);
const Adminnavigator = createStackNavigator(
  {
    Admin: AdminProductScreen,
    EditProduct: EditProductScreen,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerSetting) => (
        <Ionicons
          size={23}
          color={drawerSetting.tintColor}
          name="md-create"></Ionicons>
      ),
    },
    defaultNavigationOptions: configSettings,
  },
);
const drawer = createDrawerNavigator(
  {
    Product: stackNav,
    Order: ordernavigator,
    Admin: Adminnavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
      labelStyle: {
        fontSize: 23,
      },
    },
    contentComponent: (props) => {
      const dispatch=useDispatch();
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
            <DrawerItems {...props}></DrawerItems>
            <TouchableOpacity
              style={{padding: 10, backgroundColor: Colors.primary}}
              onPress={() => {
                dispatch(Logout());
                // props.navigation.navigate('Auth');
              }}>
              <Text style={{fontSize: 23, paddingLeft: 50, color: 'white'}}>
                Logout
              </Text>
            </TouchableOpacity>
          </SafeAreaView>
        </View>
      );
    },
  },
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: configSettings,
    headerMode: 'none',
  },
);

const MainNavigator = createSwitchNavigator({
  Start: StartPage,
  Auth: AuthNavigator,
  Shop: drawer,
});

export default createAppContainer(MainNavigator);

import React, {useEffect, useState, useCallback} from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../../Constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {RemoveItems} from '../../store/actions/Cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonCom from '../../Component/Shop/HeaderButtonsCom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderItem from '../../Component/Shop/OrderItem';
import {LoadOrder} from '../../store/actions/Order';
//import {} from '../../store/reducer/OrderReducer'
const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.Order.orders);
  console.log(orders);
  const [isloading, setloading] = useState(false);
  const dispatch = useDispatch();
  const LoadingEffect = useCallback(async () => {
    setloading(true);
    await dispatch(LoadOrder());
    setloading(false);
  },[setloading,dispatch]);
  useEffect(() => {
    LoadingEffect();
  }, [LoadingEffect]);

  if (isloading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          size="large"
          color={Colors.primary}></ActivityIndicator>
      </View>
    );
  }
  if(orders.length==0)
  {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>No Orders Found.Try Ordering Something!</Text>
      </View>
    )
  }
  return (
    <View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={(OrderData) => (
          <OrderItem
            price={OrderData.item.totamt}
            date={OrderData.item.date}
            items={OrderData.item.items}></OrderItem>
        )}></FlatList>
    </View>
  );
};

OrdersScreen.navigationOptions = (nav) => {
  const headerLeftbtn = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCom}>
        {/* <Item title="Cart" iconName="cart-outline"></Item> */}
        <Ionicons
          name="menu"
          title="menu"
          size={30}
          color="white"
          style={{paddingRight: 30}}
          onPress={() => {
            nav.navigation.toggleDrawer();
          }}
          style={{paddingLeft: 20}}></Ionicons>
      </HeaderButtons>
    );
  };
  return {
    headerTitle: 'Your Orders',
    headerLeft: headerLeftbtn,
  };
};
const styles = StyleSheet.create({
  mainsc: {
    margin: 20,
  },
});
export default OrdersScreen;

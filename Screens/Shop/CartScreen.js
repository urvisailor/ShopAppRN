import React, {useState} from 'react';
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
import ProductCard from '../../Component/Shop/productcard';
import CartItems from '../../Component/Shop/CartItems';
import {RemoveItems} from '../../store/actions/Cart';
import {ADDORDER} from '../../store/actions/Order';
const CartScreen = (props) => {
  const cartitems = useSelector((cartpro) => {
    const CARTArray = [];
    for (const key in cartpro.Cart.Items) {
      CARTArray.push({
        productID: key,
        title: cartpro.Cart.Items[key].title,
        qty: cartpro.Cart.Items[key].qty,
        price: cartpro.Cart.Items[key].price,
        sum: cartpro.Cart.Items[key].sum,
      });
    }
    return CARTArray.sort((x, y) => (x.productID > y.productID ? 1 : -1));
  });
  const Total = useSelector((cartpro) => cartpro.Cart.TotAmt);
  console.log(cartitems);
  const [isloading, setloading] = useState(false);
  const dispatch = useDispatch();
  const AddHandler = async () => {
    try {
      setloading(true);
      await dispatch(ADDORDER(cartitems, Total));
    } catch (err) {
      throw err;
    }
    setloading(false);
    props.navigation.navigate('Order');
  };
  return (
    <View style={styles.mainsc}>
      <View style={styles.CartD}>
        <Text style={styles.amt}>Total:Rs.{Total}</Text>
        {isloading ? (
          <ActivityIndicator
            size="small"
            color={Colors.primary}></ActivityIndicator>
        ) : (
          <Button
            title="Order Now"
            color={Colors.primary}
            disabled={cartitems.length == 0}
            onPress={AddHandler}></Button>
        )}
      </View>
      <FlatList
        data={cartitems}
        keyExtractor={(item) => item.productID}
        renderItem={(cartitem) => (
          <CartItems
            qty={cartitem.item.qty}
            title={cartitem.item.title}
            deletable
            OnRemove={() => {
              dispatch(RemoveItems(cartitem.item.productID));
            }}
            price={cartitem.item.price}
            sum={cartitem.item.sum}
          />
        )}></FlatList>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Cart Screen',
};
const styles = StyleSheet.create({
  mainsc: {
    margin: 20,
  },
  CartD: {
    elevation: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 5,
    padding: 20,
  },
  amt: {
    color: Colors.maincolor,
    fontSize: 20,
  },
});
export default CartScreen;

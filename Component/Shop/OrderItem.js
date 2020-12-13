import React, {useState} from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Colors from '../../Constants/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import moment from 'moment';
import CartItems from './CartItems';
const OrderItem = (props) => {
  const [toggle, settoggle] = useState(false);
  return (
    <View style={styles.mainsc}>
      <View style={styles.details}>
        <Text style={styles.content}>{props.price}</Text>
        <Text style={styles.content}>
          {moment(props.date).format('MMMM Do YYYY, h:mm:ss a')}
        </Text>
      </View>
      <View style={styles.btnstyle}>
        <Button
          title={toggle?'Hide Details':'Show Details'}
          color={Colors.primary}
          onPress={() => {
            settoggle((prestate) => !prestate);
          }}></Button>
      </View>
      {toggle && (
        <View style={{width: '100%'}}>
          {props.items.map((cartItem) => (
            <CartItems
              key={cartItem.productID}
              qty={cartItem.qty}
              title={cartItem.title}
              sum={cartItem.sum}></CartItems>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainsc: {
    margin: 20,
    elevation: 5,
    borderRadius: 4,
    padding: 20,
    alignItems: 'center',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 20,
    width: '100%',
  },
  content: {
    fontSize: 15,
  },
  btnstyle: {
    paddingTop: 20,
  },
});
export default OrderItem;

import React from 'react';
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

const CartItems = (props) => {
  return (
    <View style={styles.mainsc}>
      <View style={styles.Itemss}>
        <Text style={styles.common}>{props.title}  </Text>
        <Text style={styles.qty}>{props.qty} </Text>
      </View>
      <View style={styles.Itemss}>
        <Text style={styles.price}>Rs.{Math.round(props.sum*100)/100} </Text>
        { props.deletable &&
          <TouchableOpacity onPress={props.OnRemove}>
            <Ionicons
              name="trash-bin"
              title="delete"
              size={23}
              color="red"></Ionicons>
          </TouchableOpacity>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainsc: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  Itemss: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    color: Colors.maincolor,
    fontSize: 20,
  },
  qty: {
    color: '#888',
    fontSize: 20,
  },
  common: {
    fontSize: 20,
  },
});
export default CartItems;

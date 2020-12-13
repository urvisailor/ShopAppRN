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
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProductCard = (props) => {
  return (
    <TouchableOpacity onPress={props.OnDetailsPage}>
      <View style={styles.products}>
        <View
          style={{
            width: '100%',
            height: '60%',
            borderRadius: 10,
            overflow: 'hidden',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Image style={styles.image} source={{uri: props.imageUrl}} />
        </View>
        <View style={styles.TextDetails}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.price}>Rs.{props.price}</Text>
        </View>
        <View style={styles.buttons}>
           {props.children}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  products: {
    elevation: 5,
    borderRadius: 10,
    margin: 20,
    height: 300,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  TextDetails: {
    alignItems: 'center',
  },
  title: {
    marginVertical: 5,
    fontSize: 20,
  },
  price: {
    fontSize: 20,
    marginVertical: 5,
    color: '#888',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
export default ProductCard;

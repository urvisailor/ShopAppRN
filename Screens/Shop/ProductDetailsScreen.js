import React from 'react';
import {FlatList, StyleSheet, Text, View,Image,Button} from 'react-native';
import Colors from '../../Constants/Colors';
import {useSelector,useDispatch} from 'react-redux';
import * as CartAction from '../../store/actions/Cart';
const ProductDetailsScreen = (props) => {
  const productID = props.navigation.getParam('productID');
  const Products = useSelector((state) => state.products.avaProducts);
  const MyProduct = Products.find((pro) => pro.ID === productID);
 const dispatch=useDispatch();
  return (
    <View>
      <Image style={styles.image} source={{uri: MyProduct.ImageUrl}}></Image>
      <View style={styles.buttons}>
        <Button title="Add to Cart" color={Colors.primary} onPress={()=>{
            dispatch(CartAction.ADDTOCART(MyProduct));
        }}></Button>
      </View>
      <Text style={styles.price}>Rs.{MyProduct.Price}</Text>
      <Text style={styles.dec}>{MyProduct.Description}</Text>
    </View>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const Title = navData.navigation.getParam('productTitle');
  return {
    headerTitle: Title,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '70%',
  },
  buttons: {
    padding: 20,
    alignItems: 'center',
  },
  price:{
    fontSize:25,
    textAlign:'center',
    marginVertical:20,
    color:'#888'
  },
  dec:{
    fontSize:20,
    textAlign:'center'
  }
});
export default ProductDetailsScreen;

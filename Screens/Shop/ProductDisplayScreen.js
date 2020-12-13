import React, {useEffect, useState,useCallback} from 'react';
import {
  FlatList,
  Text,
  Button,
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductCard from '../../Component/Shop/productcard';
import * as CartAction from '../../store/actions/Cart';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonCom from '../../Component/Shop/HeaderButtonsCom';
import * as ProductAction from '../../store/actions/Product';
import Colors from '../../Constants/Colors';
const ProductDisplayScreen = (props) => {
  console.log('--Loading----');
  const products = useSelector((state) => state.products.avaProducts);
  // console.log(products);
  const [isloading, setloading] = useState(false);
  const [pullrefresh,setpullrefresh]=useState(false);
  const[err,seterror]=useState('');
  const dispatch = useDispatch();
  const GotoDetailsPageHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productID: id,
      productTitle: title,
    });
  };
  const Dis = useCallback(async () => {
    try {
      seterror(null);
      setpullrefresh(true);
      setloading(true);
      await dispatch(ProductAction.FetchProducts());
      setloading(false);
    }catch(error)
    {
      seterror(error.message);
    }
    setpullrefresh(false);
  },[dispatch,seterror]);

  useEffect(()=>{
   const listner=props.navigation.addListener('willFocus',Dis);
   return ()=>{
     listner.remove();
   }
  },[Dis]);

  useEffect(() => {
    Dis();
  }, [dispatch]);

  if (isloading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator
          color={Colors.primary}
          size="large"></ActivityIndicator>
      </View>
    );
  }
  if(err)
  {
    return (
      <View style={styles.loader}>
       <Text>An error Ocurred!</Text>
       <Button title='Try Again' color={Colors.primary}></Button>
       </View>
    );
  }
  if (!isloading && products.length == 0) {
    return (
      <View style={styles.loader}>
        <Text>No Data Found</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={products}
      refreshing={pullrefresh}
      onRefresh={Dis}
      keyExtractor={(item) => item.ID}
      renderItem={(itemData) => (
        <ProductCard
          title={itemData.item.Title}
          price={itemData.item.Price}
          imageUrl={itemData.item.ImageUrl}
          OnDetailsPage={() => {
            GotoDetailsPageHandler(itemData.item.ID, itemData.item.Title);
          }}>
          <Button
            title="View Details"
            color={Colors.primary}
            onPress={() => {
              GotoDetailsPageHandler(itemData.item.ID, itemData.item.Title);
            }}></Button>
          <Button
            title="Add to Cart"
            color={Colors.primary}
            onPress={() => {
              dispatch(CartAction.ADDTOCART(itemData.item));
              props.navigation.navigate('Cart');
            }}></Button>
        </ProductCard>
      )}
    />
  );
};

ProductDisplayScreen.navigationOptions = (nav) => {
  const headerRightbtn = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCom}>
        {/* <Item title="Cart" iconName="cart-outline"></Item> */}
        <Ionicons
          name="cart-outline"
          title="cart"
          size={30}
          color="white"
          style={{paddingRight: 30}}
          onPress={() => {
            nav.navigation.navigate('Cart');
          }}></Ionicons>
      </HeaderButtons>
    );
  };
  const headerLeftbtn = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCom}>
        {/* <Item title="Cart" iconName="cart-outline"></Item> */}
        <Ionicons
          name="menu"
          title="menu"
          size={30}
          color="white"
          onPress={() => {
            nav.navigation.toggleDrawer();
          }}
          style={{paddingLeft: 20}}></Ionicons>
      </HeaderButtons>
    );
  };
  return {
    headerTitle: 'Our Products',
    headerRight: headerRightbtn,
    headerLeft: headerLeftbtn,
  };
};
const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ProductDisplayScreen;

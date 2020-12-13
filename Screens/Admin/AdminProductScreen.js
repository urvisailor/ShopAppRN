import React from 'react';
import {Button, FlatList, Text, View, StyleSheet,Alert} from 'react-native';
import Colors from '../../Constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {RemoveItems} from '../../store/actions/Cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonCom from '../../Component/Shop/HeaderButtonsCom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderItem from '../../Component/Shop/OrderItem';
import ProductCard from '../../Component/Shop/productcard';
import {RemoveProductFromList} from '../../store/actions/Product';
const AdminProductScreen = (props) => {
  const UserProducts = useSelector((state) => state.products.userProducts);
  console.log(UserProducts);
  const dispatch = useDispatch();
  const EditProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {proID: id});
  };
  const DeleteHandler=(id)=>{
    Alert.alert('Are you sure?','Do your really want to delete this Item?',[
      {text:'No',style:'default'},
      {text:'Yes',style:'destructive',onPress:()=>{
        dispatch(RemoveProductFromList(id));
      }}
    ])
  }
  if(UserProducts.length==0)
  {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Text>No Products you have included</Text>
      </View>
    )
  }
  return (
    <View>
      <FlatList
        data={UserProducts}
        keyExtractor={(item) => item.ID}
        renderItem={(itemData) => (
          <ProductCard
            title={itemData.item.Title}
            price={itemData.item.Price}
            imageUrl={itemData.item.ImageUrl}
            OnDetailsPage={() => {
             EditProductHandler(itemData.item.ID);
            }}>
            <Button
              title="Edit"
              color={Colors.primary}
              onPress={() => {
                EditProductHandler(itemData.item.ID);
              }}></Button>
            <Button
              title="Delete"
              color={Colors.primary}
              onPress={DeleteHandler.bind(this,itemData.item.ID)}></Button>
          </ProductCard>
        )}></FlatList>
    </View>
  );
};

AdminProductScreen.navigationOptions = (nav) => {
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
          }} style={{paddingLeft:20}}></Ionicons>
      </HeaderButtons>
    );
  };
  const headerRightbtn=()=>{
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCom}>
        {/* <Item title="Cart" iconName="cart-outline"></Item> */}
        <Ionicons
          name="md-create"
          title="Add"
          size={30}
          color="white"
          onPress={() => {
            nav.navigation.navigate('EditProduct');
          }}></Ionicons>
      </HeaderButtons>
    );
  }
  return {
    headerTitle: 'My Products',
    headerLeft: headerLeftbtn,
    headerRight:headerRightbtn
  };
};
const styles = StyleSheet.create({
  mainsc: {
    margin: 20,
  },
});
export default AdminProductScreen;

import React, {useState, useCallback, useEffect, useReducer} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonCom from '../../Component/Shop/HeaderButtonsCom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CreateProduct, UpdateProduct} from '../../store/actions/Product';
import Colors from '../../Constants/Colors';

const Update_Form = 'Update_Form';
const FormReducer = (state, action) => {
  if ((action.type = Update_Form)) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value,
    };
    const updateValid = {
      ...state.inputValid,
      [action.input]: action.isValid,
    };
    let formValid = true;
    for (const key in updateValid) {
      formValid = formValid && updateValid[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValid: updateValid,
      FormValid: formValid,
    };
    console.log(updateValid);
  }
  return state;
};
const EditProductScreen = (props) => {
  const proID = props.navigation.getParam('proID');
  const [error, seterror] = useState('');
  const [loading, setloading] = useState(false);

  const Products = useSelector((state) =>
    state.products.userProducts.find((pro) => pro.ID === proID),
  );

  const [formState, dispatcherForm] = useReducer(FormReducer, {
    inputValues: {
      title: Products ? Products.Title : '',
      imgUrl: Products ? Products.ImageUrl : '',
      desc: Products ? Products.Description : '',
      price: '',
    },
    inputValid: {
      title: Products ? true : false,
      imgUrl: Products ? true : false,
      desc: Products ? true : false,
      price: Products ? true : false,
    },
    FormValid: Products ? true : false,
  });
  useEffect(() => {
    if (error) {
      Alert.alert('Error Occurred!!', [{Text: 'Ok'}]);
    }
  }, [error]);

  // const [title, settitle] = useState(Products ? Products.Title : '');
  // const [ValTitlte, setValTitle] = useState(false);
  // const [imgUrl, setimgUrl] = useState(Products ? Products.ImageUrl : '');
  // const [ValimgUrl, setValimgUrl] = useState(false);
  // const [desc, setdesc] = useState(Products ? Products.Description : '');
  // const [Valdesc, setValdesc] = useState(false);
  // const [price, setprice] = useState('');
  // const [Valprice, setValprice] = useState(false);
  const dispatch = useDispatch();
  const Submitbtn = useCallback(async () => {
    if (!formState.FormValid) {
      Alert.alert('Errors', 'Please Check Those erorr first!', [{text: 'OK'}]);
      return;
    }
    seterror(null);
    setloading(true);
    try {
      if (Products) {
        await dispatch(
          UpdateProduct(
            proID,
            formState.inputValues.title,
            formState.inputValues.imgUrl,
            formState.inputValues.desc,
          ),
        );
      } else {
        await dispatch(
          CreateProduct(
            formState.inputValues.title,
            formState.inputValues.imgUrl,
            formState.inputValues.desc,
            formState.inputValues.price,
          ),
        );
      }
      props.navigation.goBack();
    } catch (err) {
      seterror(err.message);
    }
    setloading(false);
  }, [dispatch, proID, formState]);

  useEffect(() => {
    props.navigation.setParams({submit: Submitbtn});
  }, [Submitbtn]);

  // const ImgHandler = (text) => {
  //   if (!text.length == 0) {
  //     setValimgUrl(true);
  //   } else {
  //     setValimgUrl(false);
  //   }
  //   setimgUrl(text);
  // };
  const TextHandler = (inputtype, text) => {
    let isValid = false;
    if (text.length > 0) {
      console.log('in--');
      isValid = true;
    }
    dispatcherForm({
      type: Update_Form,
      value: text,
      isValid: isValid,
      input: inputtype,
    });
  };
  // const DescHandler = (text) => {
  //   if (!text.length == 0) {
  //     setValdesc(true);
  //   } else {
  //     setValdesc(false);
  //   }
  //   setdesc(text);
  // };

  // const PriceHandler = (text) => {
  //   if (!text.length == 0) {
  //     setValprice(true);
  //   } else {
  //     setValprice(false);
  //   }
  //   setprice(text);
  // };
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator
          color={Colors.primary}
          size="large"></ActivityIndicator>
      </View>
    );
  }
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.frmctr}>
            <Text style={styles.lbl}>Title</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.title}
              onChangeText={(text) => TextHandler('title', text)}></TextInput>
            {!formState.inputValid.title && (
              <Text style={{color: 'red'}}>Please enter Product Title</Text>
            )}
          </View>
          <View style={styles.frmctr}>
            <Text style={styles.lbl}>ImageUrl</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.imgUrl}
              onChangeText={(text) => TextHandler('imgUrl', text)}></TextInput>
          </View>
          {!formState.inputValid.imgUrl && (
            <Text style={{color: 'red'}}>Please enter Valid Image Url</Text>
          )}
          <View style={styles.frmctr}>
            <Text style={styles.lbl}>Description</Text>
            <TextInput
              style={styles.input}
              value={formState.inputValues.desc}
              onChangeText={(text) => TextHandler('desc', text)}></TextInput>
          </View>
          {!formState.inputValid.desc && (
            <Text style={{color: 'red'}}>Please enter Decription</Text>
          )}
          {Products ? null : (
            <View style={styles.frmctr}>
              <Text style={styles.lbl}>Price</Text>
              <TextInput
                style={styles.input}
                value={formState.inputValues.price}
                onChangeText={(text) => TextHandler('price', text)}></TextInput>
            </View>
          )}
          {!formState.inputValid.price && (
            <Text style={{color: 'red'}}>Please enter Price</Text>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProductScreen.navigationOptions = (nav) => {
  const submitData = nav.navigation.getParam('submit');
  const headerRightbtn = () => {
    return (
      <HeaderButtons HeaderButtonComponent={HeaderButtonCom}>
        {/* <Item title="Cart" iconName="cart-outline"></Item> */}
        <Ionicons
          name="md-checkmark"
          title="Save"
          size={30}
          color="white"
          onPress={submitData}></Ionicons>
      </HeaderButtons>
    );
  };
  return {
    headerTitle: nav.navigation.getParam('proID')
      ? 'Edit Products'
      : 'Add Product',
    headerRight: headerRightbtn,
  };
};
const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  frmctr: {
    width: '100%',
  },
  lbl: {
    fontSize: 20,
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
export default EditProductScreen;

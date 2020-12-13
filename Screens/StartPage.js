import React, {useEffect} from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Colors from '../Constants/Colors';
import {useDispatch} from 'react-redux';
import {authenticate} from '../store/actions/auth';
const StartPage = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const LoginCre = async () => {
      const data = await AsyncStorage.getItem('UserData');
      console.log('data-->', data);
      if (data == null) {
        console.log('in data null');
        props.navigation.navigate('Auth');
        return;
      }
      const storeddata = JSON.parse(data);
      const {token, userId, expiryDate} = storeddata;
      const expirydate = new Date(expiryDate);
      console.log('expirydate-->', expirydate);
      console.log('current date-->', new Date());
      if (expirydate <= new Date() || !token || !userId) {
        console.log('in expire date');
        props.navigation.navigate('Auth');
        return;
      }
      const expirationDate = expirydate.getTime() - new Date().getTime();

      props.navigation.navigate('Shop');

      dispatch(authenticate(token, userId, expirationDate));
    };

    LoginCre();
  }, [dispatch]);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator
        size="large"
        color={Colors.primary}></ActivityIndicator>
    </View>
  );
};

const styles = StyleSheet.create({});
export default StartPage;

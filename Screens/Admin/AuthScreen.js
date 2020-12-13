import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Text,
  View,
  StyleSheet,
  Alert,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../../Constants/Colors';
import {useSelector, useDispatch} from 'react-redux';
import {RemoveItems} from '../../store/actions/Cart';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import HeaderButtonCom from '../../Component/Shop/HeaderButtonsCom';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OrderItem from '../../Component/Shop/OrderItem';
import ProductCard from '../../Component/Shop/productcard';
import {RemoveProductFromList} from '../../store/actions/Product';
import LinearGradient from 'react-native-linear-gradient';
import {SignUp, Login} from '../../store/actions/auth';
const AuthScreen = (props) => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [userError, setuserError] = useState('');
  const [passError, setpassError] = useState('');
  const [errortoggle, seterrortoggle] = useState(false);
  const [errortoggle2, seterrortoggle2] = useState(false);
  const [error, seterror] = useState('');
  const [issignup, setissignup] = useState(false);
  const dispatch = useDispatch();
  const AuthHandler = async () => {
    seterror(null);
    try {
      if (issignup) {
        await dispatch(SignUp(username, password));
      } else {
        await dispatch(Login(username, password));
        props.navigation.navigate('Shop');
      }
    } catch (err) {
      seterror(err.message);
      console.log('errorpage-->', err.message);
      Alert.alert('An Error:', err.message, [
        {Text: 'Okay'},
      ]);
    }
  
    // console.log(username + password);
  };
  // const EmailHandler = () => {
  //   if (username.length == 0) {
  //     setuserError('Please Enter Email-ID');
  //     seterrortoggle(true);
  //   } else {
  //     setuserError('');
  //     setusername(username);
  //     seterrortoggle(false);
  //   }
  // };
  // const PassHandler = (text) => {
  //   if (password.length == 0) {
  //     setpassError('Please Enter Password');
  //     seterrortoggle(true);
  //   } else if (password.length < 6) {
  //     setpassError('Password Should be of more than 6 character');
  //     seterrortoggle(true);
  //   } else {
  //     setpassError('');
  //     setpassword(text);
  //     seterrortoggle(false);
  //   }
  // };
  useEffect(() => {
    if (username.length == 0 && errortoggle) {
      setuserError('Please Enter Email-ID');
      // seterrortoggle(true);
    } else {
      setuserError('');
      //seterrortoggle(false);
    }
    if (password.length == 0 && errortoggle2) {
      setpassError('Please Enter Password');
      //seterrortoggle(true);
    } else if (password.length < 6 && errortoggle2) {
      setpassError('Password Should be of more than 6 character');
      //seterrortoggle(true);
    } else {
      setpassError('');
      //seterrortoggle(false);
    }
  }, [
    username,
    password,
    setuserError,
    setpassError,
    errortoggle,
    errortoggle2,
  ]);
  return (
    <LinearGradient
      colors={['purple', 'white']}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.mainsc}>
      <View>
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.Card}>
              <TextInput
                style={styles.input}
                placeholder="Enter Email-ID"
                keyboardType="email-address"
                value={username}
                onChangeText={(text) => {
                  setusername(text);
                  seterrortoggle(true);
                }}></TextInput>
              {errortoggle ? (
                <Text style={{color: 'red'}}>{userError}</Text>
              ) : (
                <Text></Text>
              )}
              <TextInput
                style={styles.input}
                secureTextEntry
                value={password}
                placeholder="Enter password"
                onChangeText={(text) => {
                  setpassword(text);
                  seterrortoggle2(true);
                }}></TextInput>
              {errortoggle2 ? (
                <Text style={{color: 'red'}}>{passError}</Text>
              ) : (
                <Text></Text>
              )}
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity
                  onPress={AuthHandler.bind(this, username, password)}
                  style={{...styles.btn, backgroundColor: Colors.primary}}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                    {issignup ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setissignup((prestate) => !prestate);
                  }}
                  style={{...styles.btn, backgroundColor: Colors.maincolor}}>
                  <Text
                    style={{color: 'white', textAlign: 'center', fontSize: 20}}>
                    Switch To {issignup ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
                {/* <Button title="Sign In" color={Colors.primary}  marginVertical={20} fontSize={10}></Button>
            <Button title='Sign Up' color={Colors.secondary}  marginVertical={20} fontSize={10}></Button> */}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </LinearGradient>
  );
};

// AuthScreen.navigationOptions = (nav) => {
//   return {
//     headerTitle: 'Authentication',
//   };
//};
const styles = StyleSheet.create({
  mainsc: {
    flex: 1,
    //margin: 20,
    justifyContent: 'center',
    // paddingVertical: 80,
  },
  Card: {
    elevation: 4,
    backgroundColor: 'white',
    borderRadius: 4,
    padding: 20,
    margin: 25,
  },
  input: {
    borderBottomWidth: 1,
    padding: 10,
    marginVertical: 20,
    fontSize: 20,
  },
  btn: {
    marginVertical: 10,
    padding: 20,
    borderRadius: 10,
  },
});
export default AuthScreen;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {createStore, combineReducers,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import productReducer from './store/reducer/productReducer';
import NavigationContainer from './Navigation/NavigationContainer';
import CartReducer from './store/reducer/CartReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import OrderReducer from './store/reducer/OrderReducer'; 
import ReduxThunk from 'redux-thunk';
import {AuthReducer} from './store/reducer/auth';

const rootReducer = combineReducers({
  products: productReducer,
  Cart:CartReducer,
  Order:OrderReducer,
  auth:AuthReducer
});
const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
const App = () => {
  console.log("state-->",store.getState());
  return (
    <Provider store={store}>
      <NavigationContainer/>
    </Provider>
  );
};
const styles = StyleSheet.create({});

export default App;

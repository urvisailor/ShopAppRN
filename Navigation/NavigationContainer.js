/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useRef} from 'react';
import {StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ShopNavigator from './ShopNavigator';
import {NavigationAction, NavigationActions} from 'react-navigation';
const NavigationContainer = () => {
  const isAuth = useSelector((state) => !!state.auth.token);
  const useNav = useRef();
  useEffect(() => {
    if (!isAuth) {
      useNav.current.dispatch(NavigationActions.navigate({routeName: 'Auth'}));
    }
  }, [isAuth]);

  return <ShopNavigator ref={useNav} />;
};
const styles = StyleSheet.create({});

export default NavigationContainer;

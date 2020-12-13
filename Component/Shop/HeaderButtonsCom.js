import React, { version } from 'react';
import {HeaderButton,HeaderButtons} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../../Constants/Colors';
export const HeaderButtonCom = (props) => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color='white'></HeaderButton>
  )
}
export const  headerButtons=(props)=>{
  return(
    <HeaderButtons HeaderButtonComponent={HeaderButtonCom} {...props}></HeaderButtons>
  );
}
export  {Item} from 'react-navigation-header-buttons'; 
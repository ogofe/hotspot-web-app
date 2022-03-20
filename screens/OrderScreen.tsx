import * as React from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import PaymentPage from '../pages/PaymentPage';


const {Navigator, Screen} = createStackNavigator();

export default function OrderScreen(props:any){
  return(
  <Navigator
    initialRouteName="Cart"
    screenOptions={{
      headerShown: false,
      unmountOnBlur: true,
      animationEnabled: true,
      cardStyle: {backgroundColor: '#fcfcfc'}
    }}
    >
      <Screen name="Cart" component={CartPage} />
      <Screen name="Checkout" component={CheckoutPage} />
      <Screen name="MakePayment" component={PaymentPage} />
    </Navigator>
  )
}
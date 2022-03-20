import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  WebView,
} from 'react-native';
import styling from '../constants/Styling';
import {Header} from '../components';
import {GlobalStore} from '../App';
// import {PaystackWebView} from 'react-native-paystack-webview';

const PaystackWebView = (props) => (
  <View>
  </View>
)


export default function PaymentPage({ navigation, route, ...props }){

  const {invoice} = route.params;
  const {notify, PAYSTACK_API_KEY, USER} = useContext(GlobalStore);
  const [totalAmount, setTotal] = useState(1000);
  const [billingEmail, setEmail] = useState(USER.email);
  const [billingPhone, setPhone] = useState(USER.phone);
  const [billingName, setName] = useState(USER.full_name);
  const [order, setOrder] = useState<any>({});

  function onSuccess(transactionRef){
    // do stuff with transaction ref
    // - confirm transaction success
    // - credit business account (server side webhook)
    // send reciept (server side webhook)
    // place order (server side webhook)
    notify("Your order has been placed!");
    setTimeout(() => { navigation.navigate('') }, 3000);
  }

  function onCancel(){
    notify('Your order has been canceled by you!');
  };


  useEffect(() => {
    async function setup(){
      setTotal(order.total);
      await getOrder();
      await async function(){
      };
    }
    setup();

    return (() => cleanup());
  }, [])

  async function getOrder(){

  }

  function cleanup(){
    // sends a cleanup command to the server to handle
    // order canceled by pressing back or navigating to the previous screen
  }

  return(
    <PaystackWebView
     buttonText={"pay now"}
     paystackKey={PAYSTACK_API_KEY}
     amount={totalAmount}
     billingMobile={billingPhone}
     billingName={billingName}
     billingEmail={billingEmail}
     onSuccess={ ref => onSuccess(ref)}
     onCancel={onCancel}
    />
  )
}
import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Animated,
  Image,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Ionicons, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {CartItem, Header} from '../components';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';



export default function Cart({navigation, ...props}){
  const {TOKEN, notify, BASE_URL} = useContext(GlobalStore);
  const [loading, setLoading] = useState(true);
  const [subtotal, setSubtotal] = useState(0.0);
  const [cartData, setCartData] = useState<any []>([]);

  function getData(){
    fetch(BASE_URL + 'cart/', {
      headers: {
        'Authorization': 'Token ' + TOKEN
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        notify(data.error_text)
      }else{
        setSubtotal(data.subtotal)
        setCartData(data.items);
      }
    })
    .catch(err => {
      notify(err)
    })
  }

  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 500)
  }, [])

  function renderList({item}:any){
    return(
      <View style={{width: '100%', marginBottom: 10}}>
        <CartItem item={item} onRemove={getData} />
      </View>
    )
  }

  if (loading){
    return (
      <View style={{marginTop: 50, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator animating size={"large"} color="orange" />
      </View>
    )
  }

  return(
    <View style={{flex: 1}}>
      <Header navigation={navigation} title="Cart" />

      <ScrollView showsVerticalScrollIndicator={false}>
      {cartData?.length > 0 ?
        <View style={[styling.w100,]}>
          <FlatList 
            data={cartData}
            renderItem={renderList}
            keyExtractor={(item) => `${item.id}`}
            style={{width: '100%', paddingVertical: 10, paddingHorizontal: 10, flex: 1}}
            showsVerticalScrollIndicator={false}
          />

          <CheckoutButton navigation={navigation} subtotal={subtotal} />
        </View>
        : 
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingTop: 120, alignItems: 'center'}}>
          <MaterialCommunityIcons name="cart" size={130} color="grey" />
          <Text style={{fontWeight: '600', fontSize: 20, marginTop: 30, color: 'grey',}}> There's nothing in your cart </Text>
        </View>
      }
      </ScrollView>
    </View>
  )
}


function CheckoutButton({navigation, subtotal, ...props}){
  const position = useRef(new Animated.Value(-100)).current

  Animated.timing(position, {
    toValue: 0,
    duration: 300,
    delay: 500,
    easeIn: 'linear'
  }).start()

  return(
    <Animated.View style={{position: 'sticky', width: '100%', bottom:position, zIndex: 10, backgroundColor: 'transparent',}}>
      <View style={{
        width: '100%', marginHorizontal: 'auto', paddingVertical: 25, paddingHorizontal:10,
        backgroundColor: "white", flexDirection: 'row', justifyContent: 'space-between',
        borderTopLeftRadius: 20, borderTopRightRadius: 20
       }}>
        <View>
          <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 5}}> Subtotal </Text>
          <Text style={{fontSize: 15, fontWeight: '600'}}> $ {subtotal} </Text>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('Order', {
          screen: 'Checkout'
        })} style={{
          flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
          padding: 10, borderRadius: 10, backgroundColor: 'orange', flex: 1, marginLeft: 10,
        }}>
          <MaterialCommunityIcons name="credit-card" size={23} color="white" />
          <Text style={{flex: 1, marginRight: 5, fontWeight: '900', fontSize: 15, color: 'white'}}> Checkout </Text>
          <MaterialCommunityIcons name="chevron-right" size={23} color="white" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}


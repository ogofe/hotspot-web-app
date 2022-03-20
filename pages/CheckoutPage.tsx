import React, {useContext, useState, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  FlatList,
  WebView,
  TouchableOpacity
} from 'react-native';
import {MaterialCommunityIcons, SimpleLineIcons} from '@expo/vector-icons';
import styling from '../constants/Styling';
import {Header} from '../components';
import {GlobalStore} from '../App';

export default function CheckoutPage({navigation, ...props}){
  const [items, setOrderItems] = useState<any []>([]);
  const [fees, setFees] = useState<any []>([]);
  const [total, setTotal] = useState(0.0);
  const [subTotal, setSubtotal] = useState(0.0);
  const {TOKEN, notify, BASE_URL} = useContext(GlobalStore);

  function getData(){
    fetch(BASE_URL + 'checkout/', {
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
        setOrderItems(data.items);
        setFees(data.fees);
        setTotal(data.total);
      }
    })
    .catch(err => {
      notify(err)
    })
  }

  useEffect(() => {
    getData()
  }, [])

  function renderList({item, ...props}){
    return(
      <View style={{marginVertical:5, backgroundColor:'#fff', paddingVertical:5, paddingHorizontal:5,
                    borderRadius:10, flexDirection:'row', justifyContent:'center', alignItems:'center',
                    }}>
        <Image source={{uri:item.item.image}} style={{height: 50, width: 50, marginRight: 10, borderRadius: 10}} />
        <View style={{flex: 1}}>
          <Text style={{fontSize: 16, fontWeight: '600'}} numberOfLines={1} ellipsisMode="clip"> {item.item.title} </Text>
          <Text style={{fontSize: 14, fontWeight: '600', marginVertical: 6}}> ${item.total} </Text>
        </View>
      </View>
    )
  }

  return(
    <View style={{flex: 1}}>

      <Header title="Checkout" nav={() => navigation.navigate('Cart')} back={true} />

      <ScrollView showsVerticalScrollIndicator={false} style={{paddingHorizontal: 15, paddingVertical: 20}}>
        
        <Text style={{fontSize: 16, fontWeight: '900', marginTop: 15}}> Your order </Text>
         
        <View style={{
          marginVertical: 10, borderRadius: 10
        }}>
          <FlatList 
            data={items}
            renderItem={renderList}
            keyExtractor={(item) => `${item.id}`}
            showsVerticalScrollIndicator={false}
            style={{
              minHeight: 200,
              height: 200,
            }}
          />
        </View>

          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
            <Text style={{fontSize: 15, fontWeight: '900'}}> SubTotal </Text>
            <Text style={{fontSize: 15, fontWeight: '900'}}> ${subTotal} </Text>
          </View>

        <View style={{marginTop: 10 }}>
          <FlatList 
            data={fees}
            keyExtractor={(item) => item.type.split(' ')[0]}
            renderItem={({item}) => (
              <Text style={{ marginTop: 5, color: 'orangered', textAlign: 'right' }}> + {item.type} ${item.amount} </Text>
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={{marginTop: 20}}>
          <Text style={{fontWeight: '900', fontSize: 15}}> Delivery Option </Text>
        </View>

      {/* Shipping Info */}
        <View style={{paddingHorizontal: 10, paddingVertical: 15, marginTop: 20, backgroundColor: '#d8d8d82e', borderRadius: 10,}}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <SimpleLineIcons name="location-pin" size={20}  />
            <View style={{ flex: 1, marginLeft: 15}}>
              <Text style={{ fontSize: 14, fontWeight: 'bold' }} numberOfLines={1} ellipsisMode="clip"> Kaduna, Nigeria. </Text>
              <Text style={{ fontSize: 12, marginTop: 3}} numberOfLines={1} ellipsisMode="clip"> No. 15 Abeokuta Street. 19001 </Text>
            </View>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop: 12}}>
            <Text style={{marginRight:10, fontSize:14, flex:1, fontWeight: 'bold', color:"grey"}}> Shipping Information </Text>
            <TouchableOpacity>
             <Text style={{ color:'#fdc031', fontSize:14, fontWeight:'600'}}> Change </Text> 
            </TouchableOpacity>
          </View>
        </View>

        <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginTop:20 }}>
          <Text style={{fontWeight: '900', fontSize: 15}}> Total </Text>
          <Text style={{fontWeight: '600', fontSize: 15}}> ${total} </Text>
        </View>
          
        <TouchableOpacity onClick={() => navigation.navigate('Order', {
          screen: 'MakePayment'
        })} style={{
          justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 15, marginTop: 20,
          borderRadius: 10, backgroundColor: 'orange', flexDirection: 'row', alignItems: 'center',
         }}>
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Pay now </Text> 
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> ${total} </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

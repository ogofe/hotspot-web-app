import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Rating, Customization, Reviewer, Separator} from '../components';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';



export default function ItemDetailPage({navigation, route, ...props}){
  const [customizations, setCustom] = useState({})
  const {notify, BASE_URL, TOKEN} = useContext(GlobalStore);
  const [loading, setLoading] = useState(true);
  const [subtotal, setTotal] = useState(0.0);
  const [qty, setQty] = useState(1);
  const [food, setItem] = useState<any>({});
  const {itemId} = route.params;

  function getData(){
    fetch(BASE_URL+`menu/${itemId}/`, {
      method: 'get',
      headers:{"Authorization": `Token ${TOKEN}`}
    })
    .then(res => res.json())
    .then(data => {
      setItem(data.item)
      setTotal(data.item.price)
    })
  }

  function addToCart(){
    let payload = JSON.stringify({
      action: 'add-to-cart',
      qty: qty,
      item: food.id,
      customizations: customizations,
    })

    fetch(BASE_URL + 'cart/', {
      method: 'post',
      body: payload,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Token " + TOKEN
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        notify(data.error_text)
      }else{
        notify("Successfully added item to your cart.")
      }
    })
  }

  async function customizeOrder(item, option){
    customizations[item.title] = option;
    setCustom({...customizations})
    
    let sum = 0;
    for (let obj in customizations){
      sum += Number(customizations[obj].price);
    }
    await setTotal(Number(food.price) + sum);
  }

  function renderImages({item}){
    return(
      <View style={[{flex: 1, width: "100vw"}]}>
        <Image source={{uri: item.image_url}} resizeMode="cover" style={[{width: "100%", height: 320, borderRadius: '0px 0px 30px 30px'}]} />
      </View>
    )
  }

  useEffect(() => {
    getData();
    setTimeout(() => setLoading(false), 1200);
    
  }, [itemId])

  if (loading){
    return(
      <ActivityIndicator color="orange" size={30} style={{marginTop: 20}} />
    )
  }

  return(
    <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1, backgroundColor: '#fff'}}>
      <View>
        {
          food.images?.length > 1 ?
            <FlatList
              data={food.images}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={renderImages}
              style={{flex: 1}}
            />
          :
          <Image source={{uri: food.image}} style={{width: '100%', height: 320}} />
        }
        
        <View style={[
          styling.w100, styling.flexBox, styling.p1,
          {justifyContent: "space-between", alignItems: "center"},
          {position: 'absolute', top: 5}
          ]}>
          <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={{
             width: 40, height: 40, backgroundColor: '#ffffffdb', borderRadius: 40,
             justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
            }}>
            <MaterialCommunityIcons name="chevron-left" size={26} />
          </TouchableOpacity>

          {food.images?.length > 1 && <MaterialCommunityIcons name="circle-multiple" size={18} color="#000" />}
          
        </View>

        <View style={{
          justifyContent:"space-between", flexDirection: 'row',
          paddingHorizontal: 10, paddingVertical: 5, backgroundColor: '#0000004d',
          position: 'absolute', bottom: 0, width: '100%', marginHorizontal: 'auto'           
         }}
         >

          <View style={{flex: 1,}}>
            <Text numOfLines={2} ellipsisMode="clip" style={{fontSize: 16, width: 'calc(100% - 50px)', fontWeight: '900', color: '#fff'}}> {food.title} </Text>
            <Text numOfLines={1} ellipsisMode="clip" style={{fontSize: 13, width: 'calc(100% - 50px)', fontWeight: '600', marginTop: 5, color: '#fff'}}> {food.subtitle} </Text>
          </View>

          <Rating stars={food.rating || "0.0"} style={{marginLeft: 0, backgroundColor: 'transparent'}} iconStyle={{ color: "orange" }} />
        </View>
      </View>

      <View style={{flex: 1, paddingVertical: 10, paddingHorizontal: 15}}>
        
        <Text style={{fontSize: 15, whiteSpace: 'pre-line', marginTop: 7}}>{food.about|| 
          "There is currently no description available for this item."}
        </Text>

        
        {food.customizations?.length > 0 ?
          <View style={{marginVertical: 15}}>
            <Text style={{fontWeight: 'bold', fontSize: 15, whiteSpace: 'pre-line', marginTop: 7}}> Customize your order </Text>

            <FlatList
              data={food.customizations}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return(
                  <Customization
                   options={item.options}
                   custom={item.title}
                   customizations={customizations}
                   onChange={(option) => customizeOrder(item, option)}
                   required={item.required}
                   selected={item.default_option||null}
                  />
                )            
              }}
            /> 
          </View>
          : null
        }

          <Reviewer product={food} />
      </View>

      <View
        style={{
          position: 'sticky', bottom: 0,
          width: '100%', 
          backgroundColor: '#fff',
          paddingBottom: 15,
          borderTop: '1px solid gainsboro',  paddingHorizontal: 10,
          borderTopLeftRadius: "25px",
          borderTopRightRadius: "25px",
        }}
       >
        <View style={{
            padding: 13,
            borderRadius: 5,
            backgroundColor: "transparent",
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20
          }}
          >
          <Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> QTY </Text> 

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            marginLeft: 40
           }}>

            <TouchableOpacity style={{
              backgroundColor: 'white',
              color: '#000',
              borderRadius: 5,
            }} onPress={() => {
              if (qty > 1){
                setQty((qty - 1))
              }
            }}>
              <MaterialCommunityIcons name="minus" size={23} />
            </TouchableOpacity>
            
            <Text style={{fontSize: 15, fontWeight: '900', color: '#000'}}> {qty} </Text> 

            <TouchableOpacity style={{
              backgroundColor: 'white',
              color: '#000',
              borderRadius: 5,
            }} onPress={() => setQty((qty + 1))}>
              <MaterialCommunityIcons name="plus" size={23} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={{
          justifyContent: 'space-between', paddingHorizontal: 13, paddingVertical: 13,
          marginTop: 20,
          borderRadius: 7, backgroundColor: 'orange', flexDirection: 'row', alignItems: 'center',
         }} onPress={addToCart}>
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> Add To Cart </Text> 
          <Text style={{fontSize: 15, fontWeight: '900', color: '#fff'}}> ${(subtotal * qty)} </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}


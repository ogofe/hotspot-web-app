import { Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import React, {useContext, useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    TextInput,
    Keyboard,
    Image,
    Button,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ActivityIndicator
} from 'react-native'
import styling from '../constants/Styling';
import {GlobalStore} from '../App';



export function ListLoadingFooter({show}){
    if(!show){
        return null
    }

    return(
        <View style={{marginVertical:20}}>
            <ActivityIndicator animating color="orange" size={"small"} />
        </View>
    )
}


export function CategoryList({list}){
    const [selected, selectCategory] = useState<any>(null);

    function Category({item}){
        return(
            <View>
                <TouchableOpacity onPress={() => {
                    console.log(selected);
                    selectCategory(item);
                }} 
                    style={{
                      paddingHorizontal: 15, paddingVertical: 10, borderRadius: 4, marginHorizontal: 7,
                      backgroundColor: item?.name === selected?.name ? 'orange' : "#484848c9"
                    }}>
                   <Text style={{color: "#fff", fontSize: 12, fontWeight:'600'}}> {item.name} </Text>
                  </TouchableOpacity>
            </View>
        )
    }

    return(
        <FlatList 
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={list}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({item}) => <Category item={item} />}
        />
    )
}


export function Input({ placeholder, onChangeText, style, ...props}){
    return(
        <TextInput placeholder={placeholder} onChangeText={onChangeText} style={{
            paddingVertical: 10, fontSize: 17, backgroundColor: '#fff', paddingHorizontal: 10,
            borderRadius: 5,
            ...style
        }} {...props} />
    )
}

export function PasswordInput({ placeholder, onChangeText, style}){
    const [visible, setPasswordVisibility] = useState(false);

    return(
        <View style={{
            flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5,
            alignItems: 'center',  backgroundColor: '#fff', paddingHorizontal: 10,
            ...style
        }}>
            <TextInput placeholder={placeholder} onChangeText={onChangeText} style={{
                flex: 1, paddingVertical: 10, marginRight: 7,
                fontSize: 17, backgroundColor: 'transparent',
            }} secureTextEntry={!visible} />

            <TouchableOpacity onPress={() => setPasswordVisibility(!visible)} style={{}}>
             <Ionicons name={!visible ? "eye" : "eye"} size={20} />
            </TouchableOpacity>
        </View>
    )
}

export function Searchbar({label, style, onChangeText, ...props}:any) {
    return(
        <View style={{
            flexDirection: 'row', paddingVertical: 5, borderRadius: 30, alignItems:'center',
            justifyContent:'space-between', boxShadow:'0px 0px 2px 0px gainsboro',
            marginVertical: 15, marginHorizontal: 10, paddingHorizontal: 10,
            top:12, position: 'sticky', zIndex:10, backgroundColor:'#fff',
        }}>
            <Ionicons size={20} name="search" style={{paddingHorizontal: 5}} color="grey" />
            <TextInput {...props} onChangeText={text => onChangeText(text)}
             style={[styles.searchBox, {flex: 1, fontFamily: 'sans'}, style]} placeholder={label || "Search for food..."} />
        </View>
    )
}


export function Customization({ options, custom, customizations, required, onChange, selected }){
    const [option, setOption] = useState(selected||null);

    function select(_option){
        onChange(_option);
        setOption(_option);
    }

    return(
        <View style={{ padding: 10, marginVertical: 10, backgroundColor: '#ececec54', borderRadius: 10 }}>
          <FlatList
           style={{ marginTop: 5, }} 
           data={options}
           renderItem={({item}) => {
              return(
                <TouchableOpacity onPress={() => select(item)} style={{
                    padding: 5, borderRadius: 5, backgroundColor: option?.option === item.option ? 'orange' : '#fff',
                    marginRight: 5,
                 }}>
                  <Text style={{color: option?.option === item.option ? '#fff' : '#000', fontSize: 13, fontWeight: '600'}}> {item.option} </Text>
                </TouchableOpacity>
              )
           }}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
          />
          <Text style={{fontSize: 13, marginTop: 15, color: '#5e5c5c', fontWeight: '600'}}> {custom} </Text>
          {required && <Text style={{fontSize: 12.5, textAlign: 'right', marginTop: 5, color: 'orangered', fontWeight: '500'}}> Required </Text>}
        </View>
    )
}


export function Alert({position, visibility, text}){
    return(
    <Animated.View style={{position: 'fixed', bottom: position, zIndex: 10, width: '100%', display: visibility}}>
      <View style={{padding: 13, backgroundColor: '#0d0800', borderRadius: 10,
        width: '90%', marginHorizontal: 'auto' }}>
        <Text style={{color: 'white', fontSize: 12.5, fontWeight:'600', whiteSpace: 'pre-line'}}> {text} </Text>
      </View>
    </Animated.View>
    )
}


export function Rating({ stars, style, iconStyle, textStyle, ...props}){
    return(
        <View style={{
            paddingHorizontal: 5, paddingVertical: 5, borderRadius: 20, backgroundColor: "orange", alignItems: 'center',
            position: 'absolute', zIndex: 1, top: 10, right: 7, flexDirection: "row", justifyContent: "center",
            ...style
            }}>
            <MaterialCommunityIcons color="white" style={iconStyle} name="star" size={15} />
            <Text style={{color: "white", fontWeight: "800", ...textStyle}}> {stars} </Text>
        </View>
    )
}


export function Reviewer({ product }){
    const [reviews, setReviews] = useState<any []>([]);
    const [canReview, setCanReview] = useState(false);
    const [stars, rate] = useState(0);
    const [comment, setComment] = useState("");
    const [reviewing, setReviewing] = useState(false);
    const {TOKEN, notify, BASE_URL, USER} = useContext(GlobalStore);

    function leaveReview(){
        fetch(BASE_URL + 'rate/', {
            method: 'post',
            headers: {
                "Authorization": 'Token ' + TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                item: product.id,
                stars: stars,
                comment: comment
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                notify(data.error_text)
            }else{
                notify("Thanks for your feedback.");
                getData();
            }
        })
    }

    function getData(){
        fetch(`${BASE_URL}rate/?item=${product.id}`, {
            headers: {"Authorization": 'Token ' + TOKEN}
        })
        .then(res => res.json())
        .then(data => {
            if(data.error){
                notify(data.error_text);
            }else{
                setCanReview(!data.user_has_review);
                setReviews(data.reviews);
            }
        });
    }

    useEffect(() => {
        getData();
    }, [])

    const Review = ({ review }) => {
        const [seeMore, setSeeMore] = useState(false);

        return (
            <View style={{backgroundColor: '#f1f1f1', padding: 10, marginTop: 10, borderRadius: 5}}>
                <Text style={{fontSize: 15, fontWeight: '600', marginBottom: 10}}>
                    {review.reviewer === (USER?.first_name + ' ' + USER?.last_name) ? "You" : review.reviewer}
                </Text>
                <Text numberOfLines={3}>{review.comment || "No comment available"}</Text>
            </View>
        )
    }

    const renderReviews = ({item}) => (
        <Review review={item} />
    )


    return(
        <View>
        {canReview &&
            <View style={{marginTop: 15}}>
                <Separator style={{height: 3}} />
                <Text style={{fontSize: 15, marginBottom: 10, fontWeight:'600'}}> Rate this item </Text>
            
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <TouchableOpacity onPress={() => rate(1) }>
                        <MaterialCommunityIcons size={30} name="star" color={stars > 0 ? "orange" : "grey"} />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => rate(2) }>
                        <MaterialCommunityIcons size={30} name="star" color={stars > 1 ? "orange" : "grey"} />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => rate(3) }>
                        <MaterialCommunityIcons size={30} name="star" color={stars > 2 ? "orange" : "grey"} />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => rate(4) }>
                        <MaterialCommunityIcons size={30} name="star" color={stars > 3 ? "orange" : "grey"} />
                    </TouchableOpacity>
                
                    <TouchableOpacity onPress={() => rate(5) }>
                        <MaterialCommunityIcons size={30} name="star" color={stars > 4 ? "orange" : "grey"} />
                    </TouchableOpacity>
                </View>
                <Text style={{marginTop: 5, fontSize: 12, marginBottom:5}}> {stars} Star{stars > 1 || stars === 0 ? "s" : null} </Text>

                <TextInput
                    maxLength={150}
                    onChangeText={text => setComment(text)}
                    placeholder="Type here..."
                    multiline={true} numberOfLines={3}
                    style={{
                        backgroundColor:'#f9f9f9',
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        marginVertical:15,
                        borderRadius:10,
                        width:'100%'
                    }} rows={3}></TextInput>

                <TouchableOpacity onPress={leaveReview} disabled={stars > 0 ? false : true} style={{
                    paddingHorizontal: 15,  paddingVertical:13, textAlign: 'center', 
                    backgroundColor: stars > 0 ? '#995329' : 'grey', borderRadius:5}}>
                    <Text style={{fontSize: 15, fontWeight:'600', color: '#ffe'}}> Leave a review </Text>
                </TouchableOpacity>
            </View>
        }

        {reviews?.length > 0 ?
            <View style={{ marginVertical: 20}}>
                <Text style={{fontSize: 15, fontWeight:'600'}}>Customer Reviews </Text>

                <FlatList 
                    data={reviews}
                    style={{marginVertical: 15, paddingHorizontal: 0}}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderReviews}
                />
            </View>
            : null
        }
        </View>
    )
}


export function Header({nav, title, back}) {
    return(
        <View style={[styling.flexBox, {padding:15, justifyContent: "center", backgroundColor: '#ffffff3b', alignItems: "center", borderBottom: '1px solid gainsboro'} ]}>
            {back && <TouchableOpacity onPress={nav}>
              <MaterialCommunityIcons name="chevron-left" size={23} />
            </TouchableOpacity>}
            <Text style={{fontWeight: '800', flex: 1, fontSize:17, marginLeft: 20}}> {title} </Text> 
        </View>
    )
}


export function FeaturedItem({item, onPress, navigation,  ...props}:any) {
    const {notify, BASE_URL, TOKEN} = useContext(GlobalStore);
    const [customizations, setCustomizations] = useState<any []>([]);

    function addToCart(){
        fetch(BASE_URL+'cart/', {
            method: 'post',
            headers:{
                "Authorization": "Token " + TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'action': 'add-to-cart',
                'item': item.id,
                'customizations': customizations
            })
        })
        .then(res => res.json())
        .then(data => {
            notify("Successfully added item to your cart")
        })
        .catch(err => {
            notify("Couldn't add item to your cart")
        })
    }

    return(
        <View style={{width:200, padding: 7, backgroundColor: "#fff", borderRadius: 20}}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home', {
                    screen: 'ItemDetail',
                    params: {
                        itemId: item.id,
                    }
                })}>
                  <Image source={{uri: item.image}} style={{width: '100%', height: 130, borderRadius: 20}} size="cover" />

                    <Rating stars={item.rating||"0.0"} />

                </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical:10}}>
                <Text style={{fontSize: 15.6, fontWeight: '700'}} numberOfLines={1}> {item.title} </Text>
                <Text style={{marginTop: 4, fontSize: 14, color: 'grey'}} numberOfLines={1}> {item.subtitle} </Text>
                
                <View style={{marginTop:10, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:'grey', fontWeight:'700', marginRight:2, whiteSpace:'pre-line'}}> $ </Text>
                    <Text style={{ntSize:15.6, fontWeight:'700', flex:1}} numberOfLines={1}>  {item.price} </Text>
                </View>
            </View>

            <TouchableOpacity onPress={addToCart} style={{backgroundColor: "orange", flexDirection: "row", marginLeft: 'auto', top: 0, right: 0, justifyContent: "center", borderRadius: 50, width: 40, height: 40, alignItems: "center"}}>
                <MaterialCommunityIcons name="cart-plus" color="white" size={23} />
            </TouchableOpacity>
        </View>
    )
}

export function Card({item, onPress, navigation,  ...props}:any) {
    const {notify, BASE_URL, TOKEN} = useContext(GlobalStore);
    const [customizations, setCustomizations] = useState<any []>([]);

    function addToCart(){
        fetch(BASE_URL+'cart/', {
            method: 'post',
            headers:{
                "Authorization": "Token " + TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'action': 'add-to-cart',
                'item': item.id,
                'customizations': customizations
            })
        })
        .then(res => res.json())
        .then(data => {
            notify("Successfully added item to your cart")
        })
        .catch(err => {
            notify("Couldn't add item to your cart")
        })
    }

    return(
        <View style={{minidth:150, height: 270, width: '100%', padding: 7, backgroundColor: "#fff", borderRadius: 20}}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Home', {
                    screen: 'ItemDetail',
                    params: {
                        itemId: item.id,
                    }
                })}>
                  <Image source={{uri: item.image}} style={{width: '100%', height: 130, borderRadius: 20}} size="cover" />

                    <Rating stars={item.rating||"0.0"} />

                </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 10, paddingVertical:10}}>
                <Text style={{fontSize: 15.6, fontWeight: '700'}} numberOfLines={1}> {item.title} </Text>
                <Text style={{marginTop: 4, fontSize: 14, color: 'grey'}} numberOfLines={1}> {item.subtitle} </Text>
                
                <View style={{marginTop:10, flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <Text style={{color:'grey', fontWeight:'700', marginRight:2, whiteSpace:'pre-line'}}> $ </Text>
                    <Text style={{ntSize:15.6, fontWeight:'700', flex:1}} numberOfLines={1}>  {item.price} </Text>
                </View>
            </View>

            <TouchableOpacity onPress={addToCart} style={{backgroundColor: "orange", flexDirection: "row", marginLeft: 'auto', top: 0, right: 0, justifyContent: "center", borderRadius: 50, width: 40, height: 40, alignItems: "center"}}>
                <MaterialCommunityIcons name="cart-plus" color="white" size={23} />
            </TouchableOpacity>
        </View>
    )
}


export function Separator({style}){
    return(<View style={{width:'100%', height:5, marginVertical:20, backgroundColor:'gainsboro', ...style}} />)
}


export function OrderItem({item, ...props}:any) {
    const STATUS = {
        pending: 'orange',
        completed: 'green',
        canceled: 'red',
        transit: 'blue',
    }

    return(
        <View style={{width: '100%', backgroundColor: "#fff", borderRadius: 7, boxShadow: '#0000003d 0px 1px 3px -1px', marginBottom: 15}} >
            <View style={{ flexDirection: 'row', padding: 10, alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={{fontSize: 15, fontWeight: '700', color:'#6a6a6a'}} numberOfLines={1}> {item.date} </Text>
                <Text style={{
                    fontSize: 12, paddingVertical: 5, paddingHorizontal: 10, borderRadius:20, 
                    color: '#fff', backgroundColor: STATUS[item.status], opacity: .75, fontWeight:'600'
                    }} numberOfLines={1}> {item.status} </Text>
            </View>
              
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, justifyContent: 'space-between'}}>
                <View style={{ width: 60, height: 60, borderRadius: 30, border: '1px solid gainsboro'}}>

                </View>
            </View>
                
            <View style={{borderTop: '1px solid #e8e8e8', padding: 10, flexDirection:'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <Text> ${item.total} </Text>
                <Text> Order ID {item.invoice} </Text>                
            </View>
        </View>
    )
}



export function CartItem({item, onRemove, ...props}:any) {
    const {notify, BASE_URL, TOKEN} = useContext(GlobalStore);

    function removeMe(){
        fetch(BASE_URL+'cart/', {
            method: 'post',
            headers:{
                "Authorization": "Token " + TOKEN,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                'action': 'remove-from-cart',
                'item': item.id
            })
        })
        .then(res => res.json())
        .then(data => {
            notify("Successfully removed item from your cart.")
            onRemove();
        })
        .catch(err => {
            notify("Something went wrong")
        })
    }

    return(
        <View style={{width: '100%', padding: 7, backgroundColor: "#bbbbbb12", borderRadius: 20, }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                <View style={{height: 90}}>
                    <Image source={{uri: item?.item?.image}} style={{width: 90, height: '100%', borderRadius: 20}} size="cover" />
                </View>
              
                <View style={{paddingHorizontal: 10, marginTop: 7, flex: 1}}>
                    <Text style={{fontSize: 16, fontWeight: '700'}} numberOfLines={1}> {item?.item?.title} </Text>
                    <Text style={{marginTop: 4, fontSize: 15, fontWeight: '600'}} numberOfLines={1}> ${item?.total} </Text>

                    <TouchableOpacity onPress={removeMe} style={{backgroundColor: "orange", borderRadius: 10, paddingVertical: 10, paddingHorizontal: 10, marginTop: 5}}>
                        <Text style={{fontSize: 15, fontWeight: '900', textAlign: "center", color: "white"}}> Remove item </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}


const ICONSMAP = {
    'order-created': {
        icon: 'clipboard-list',
        color: 'cornflowerblue'
    },
    'order-confirmed': {
        icon: 'bookmark-check',
        color: '#ff8606'
    },
    'order-prepared': {
        icon: 'heart',
        color: '#a819a6'
    },
    'order-on_route': {
        icon: 'bike-fast',
        color: 'limegreen'
    },
    'order-delivered': {
        icon: 'bag-checked',
        color: '#1fbf92'
    },
}

export function Notification({item, ...props}:any){
    return(
        <View style={{ width: '100%', backgroundColor: "#f0eeee", paddingHorizontal: 15, paddingVertical: 15, borderRadius: 10,}}>
            <MaterialCommunityIcons name={ICONSMAP[item.type].icon} size={23} color={'orange'} />

            <Text style={{fontSize: 13, marginTop: 5, whiteSpace: 'pre-line'}}> {item.title} </Text>
            <Text style={{fontSize: 11, marginTop: 7, textAlign: 'right'}}> {item.time} </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    searchBar:{
        backgroundColor: "#f8f8f8",
        flexDirection: "row",
        borderColor: "grey",
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 3,
        paddingHorizontal: 7,
    },
    searchBox:{
        paddingVertical: 7,
        paddingHorizontal: 7,
        height: '100%',
    },
    searchIcon:{
        padding: 5,
        fontSize: 23,
    },
    w70:{
        flex: 1,
    },
});

export default {
    Searchbar, Header,
    Card, CartItem, Notification,
    Rating, Alert,
    Customization, Reviewer,
    Separator, Input,
    PasswordInput, OrderItem,
    ListLoadingFooter, FeaturedItem,
    CategoryList,
}

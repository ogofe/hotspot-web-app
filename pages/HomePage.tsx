import React, {useRef, useState, useContext, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {Searchbar, Card, ListLoadingFooter, CategoryList, FeaturedItem} from '../components/index';
import styling from '../constants/Styling';
import {request} from '../hooks/utils';
import {GlobalStore} from '../App';



export default function HomePage({navigation, ...props}:any){
  const [next, setNextUrl] = useState<any>(null);
  const [prev, setPrevUrl] = useState<any>(null);
  const [categories, setCatategories] = useState<any []>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [items, setItems] = useState<any []>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [menu, setMenu] = useState<any []>([]);
  const [featuredItems, setFeaturedItems] = useState<any []>([]);
  const [search_is_on, setSearch] = useState(false);
  const {BASE_URL, TOKEN, notify} = useContext(GlobalStore);


  function getData(pageNum){
    fetch(`${BASE_URL}menu/`, {
      method: 'get',
      headers: {'Authorization': 'Token ' + TOKEN}
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        notify(data.error_text)
      }else{
        setMenu(data.menu);
        setFeaturedItems(data.featured_items);
        setNextUrl(data.next);
        setCatategories([...data.categories]);
        setPrevUrl(data.previous);
      }
    })
    .catch(({ message, ...err}) => {
      if(message.includes('NetworkError')){
        notify('You are not connected to the internet');
      }
      console.log("Error fetching resource,", err);
    })
  }

  function loadMoreItems(){
    if (next){
      setLoadingMore(true)
      setTimeout(() => {
        fetch(`${next}`, {
          method: 'get',
          headers: {'Authorization': 'Token ' + TOKEN}
        })
        .then(res => res.json())
        .then(data => {
          setMenu([...menu, ...data.menu])
          setNextUrl(data.next)
          setPrevUrl(data.previous)
          setLoadingMore(false)
        })
      }, 200)
    }else{
      setLoadingMore(false)
    }
  }


  function handleRefresh(){
    setRefreshing(true);
    setPage(1);
    getData();
  }

  function search(text){
    setQuery(text);
    setItems(foodData);

    if(text === ""){
      setSearch(false);
      setItems(menu);
    }else{
      let results = menu.filter(function(item){
        return item.name.toLowerCase().includes(text);
      })
      
      setSearch(true);
      setItems(results);
    }
  }

  useEffect(() => {
   getData()
   setTimeout(() => setLoading(false), 1200)
  }, [])

  function renderMenu({item}:any){
    return(
      <View style={{width: '100%', paddingHorizontal: 5, marginBottom: 20}}>
        <Card navigation={navigation} item={item} />
      </View>
    )
  }

  function renderFeaturedMenu({item}:any){
    return(
      <View style={{marginHorizontal: 10}}>
        <FeaturedItem navigation={navigation} item={item} />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>       
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={[styling.w100, {backgroundColor: "transparent", position: "sticky", top: 10, zIndex: 100, marginBottom: 10} ]}>
          <View style={[
            styling.bgWhite, styling.flexBox, {paddingVertical: 7},
            {width: '95%', flex:1, justifyContent: "space-between", alignItems: "center"},
            {marginHorizontal: 'auto', borderRadius: 30, boxShadow: '#403e3e52 0px 2px 6px -4px'}
            ]}>

            <View style={[]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile', {
                  screen: "Account"
                })}
                style={{height: 30, width: 30, marginHorizontal: 10, borderRadius: 50, backgroundColor: "sandybrown", justifyContent: "center", alignItems: "center"}}>
                <MaterialCommunityIcons name="account" color="white" size={23} />
              </TouchableOpacity>
            </View>
            
            <Text style={{fontWeight:'600'}} numberOfLines={1} ellipsisMode="clip"> Suite GF-12 Mathis Plaza </Text>

            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => navigation.navigate('Notifications')}>
              <MaterialCommunityIcons color="orange" size={23} name="bell-ring-outline" />
            </TouchableOpacity>

          </View>
        </View>


        { loading ? <ActivityIndicator style={{marginTop: 15}} color='orange' size={30} /> : (
        <View>         
          <View style={{marginTop: 20}}>
            <Text style={{marginBottom: 10, paddingHorizontal:10, fontSize: 17, fontWeight:'600'}}> Categories </Text>
            <CategoryList list={categories} />
          </View>

          {/* Featured items */}
          {featuredItems.length > 0 ?
            <View style={{marginVertical: 20, borderBottom: '5px solid gainsboro', paddingVertical: 10}}>
              <Text style={{fontSize: 17, paddingHorizontal: 10, fontWeight: '900', marginBottom: 7}}> Featured Items </Text>
    
              <FlatList 
                data={featuredItems}
                renderItem={renderFeaturedMenu}
                keyExtractor={(item) => `${item.id}`}
                style={{width: '100%', paddingVertical: 10}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View>
            : null
          }

          {/* Main menu */}
          
          <View style={[styling.w100,]}>
            <Text style={{fontSize: 17, paddingHorizontal: 10, marginTop: 20, fontWeight: '900', marginBottom: 7}}> Explore our Cuisines </Text>
            
            <FlatList 
              data={menu}
              renderItem={renderMenu}
              keyExtractor={(item) => `${item.id}`}
              style={{width: '100%', paddingVertical: 10}}
              numColumns={2}
              columnWrapperStyle={[{
                width: '50%',
              }]}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMoreItems}
              onEndReachedThreshold={1}
              initialNumToRender={4}
              ListFooterComponent={<ListLoadingFooter show={loadingMore} />}
              onRefresh={handleRefresh}
              refreshing={refreshing}
            />
          </View>

        </View>)}
      </ScrollView>
    </View>
  );
}
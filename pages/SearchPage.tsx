import React, {useState, useContext, useEffect} from 'react';
import {
  ScrollView,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {Card, Header, Searchbar} from '../components/index';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';


export default function SearchPage({navigation, ...props}){
  const [list, setList] = useState<any[]>([]);
  const {notify, BASE_URL, TOKEN} = useContext(GlobalStore);
  const [query, setQuery] = useState('');
  const [next, setNextUrl] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  function renderList({item}:any){
    function removeMe(){
      let sol = [];
      let first = list.slice(0, list.indexOf(item))
      let last = list.slice(list.indexOf(item)+1, list.length)
      sol.concat(first)
      sol.concat(last)
      setList(sol)
    }

    return(
      <View style={{width: '100%', paddingHorizontal: 5, marginBottom: 20}}>
        <Card removeAction={removeMe} navigation={navigation} item={item} />
      </View>
    )
  }

  function getResults(text){
    fetch(BASE_URL + 'find/?query=' + text, {
      headers: {"Authorization": "Token " + TOKEN}
    })
    .then(res => res.json())
    .then(data => {
      if(data.error){
        notify(data.error_text)
      }else{
        setNextUrl(data.next)
        setList([...data.results])
      }
    })
  }

  function processText(text){
    if (text && text !== " " && text !== ""){
      setList([])
      setTimeout(() => getResults(text), 200)
      setQuery(text);
      setIsSearching(true);
    }else{
      setQuery(text);
      setIsSearching(false);
    }

  }

  return(
    <View style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar onChangeText={processText} />

        <View style={[styling.w100,]}>
          {isSearching && list?.length > 0 ? 
            <FlatList 
              data={list}
              renderItem={renderList}
              keyExtractor={(item) => `${item.id}`}
              style={{width: '100%', paddingVertical: 10}}
              numColumns={2}
              columnWrapperStyle={[{
                width: '50%',
              }]}
              showsVerticalScrollIndicator={false}
            />
          :
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingTop: 120, alignItems: 'center'}}>
              <Ionicons name="search" size={130} color="grey" />
              <Text style={{fontWeight: '600', fontSize: 20, marginTop: 30, color: 'grey',}}> Nothing to see here. </Text>
            </View>
          }
        </View>

      </ScrollView>
    </View>
  )
}


import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
} from 'react-native';
import {Ionicons, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {Notification, Header} from '../components/index';
import styling from '../constants/Styling';
import {GlobalStore} from '../App';


export default function NotificationsPage({navigation}){

  const [notifications, setNotifications] = useState<any []>([]);
  const [loading, setLoading] = useState(true);
  const {notify, TOKEN, BASE_URL} = useContext(GlobalStore);

  useEffect(() => {
    fetch(`${BASE_URL}notifications/`, {
      headers:{"Authorization": 'Token ' + TOKEN}
    })
    .then(res => res.json())
    .then(data => {
      if (data.error){
        notify(data.error_text)
      }else{
        setNotifications(data.notifications)
      }
    })
    .catch(err => {
      notify("Something went wrong!")
      console.log("Error", err)
    })
    setTimeout(() => setLoading(false), 1000)
  }, [])


  function renderList({item}:any){
    return(
      <View style={{width: '100%', marginBottom: 10}}>
        <Notification item={item} />
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <Header title="Notifications" nav={() => navigation.navigate('HomePage')} back={true} />      

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styling.w100,]}>
          <FlatList 
            data={notifications}
            renderItem={renderList}
            keyExtractor={(item) => `${item.id}`}
            style={{width: '100%', padding: 10}}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>
    </View>
  );
}
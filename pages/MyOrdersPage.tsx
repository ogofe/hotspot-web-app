import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import {Ionicons, AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import {OrderItem, Separator, Header} from '../components/index';
import styling from '../constants/Styling';



function MyOrdersPage({ navigation, ...props}:any){
    function renderList({item}:any){
        return(
        <View style={{width: '100%', marginBottom: 10}}>
            <OrderItem item={item} />
        </View>
        )
    }

    return(
        <View style={{flex: 1}}>
            <Header title="My Orders" back={true} nav={() => navigation.navigate('Account')} />

            <FlatList 
                data={orders}
                renderItem={renderList}
                keyExtractor={(item) => `${item.id}`}
                style={{width: '100%', padding: 10}}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default MyOrdersPage;
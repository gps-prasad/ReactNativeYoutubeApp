import Home from './Home';
import { View, Text, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Foundation from '@expo/vector-icons/Foundation';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import Subscriptions from './Subscriptions';
import You from './You';
import ShortsPage from './ShortsPage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Tabs = () => {
  screenOptions = {
    tabBarShowLabel:false,
    headerShown:false,
    tabBarStyle:{
        backgroundColor:'black'
    }
  }
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen name="Home" component={Home} options={{tabBarIcon:({focused})=>{
        return(
        <View className='items-center'>
            <Foundation name='home' size={25} color={`${focused?'red':'white'}`}/>
            <Text className={`text-xs ${focused?'text-red-500':'text-white'} -mt-1`}>Home</Text>
        </View>)
      }}} />
      <Tab.Screen name='Shorts' component={ShortsPage} options={{tabBarIcon:({focused})=>{
        return(
        <View className='items-center'>
            <MaterialIcons name={'slow-motion-video'} size={25} color={`${focused?'red':'white'}`}/>
            <Text className={`text-xs ${focused?'text-red-500':'text-white'} -mt-1`}>Shorts</Text>
        </View>)
      }}}/>
      <Tab.Screen name='Subscriptions' component={Subscriptions} options={{tabBarIcon:({focused})=>{
        return(
        <View className='items-center'>
            <Entypo name='folder-video' size={25} color={`${focused?'red':'white'}`}/>
            <Text className={`text-xs ${focused?'text-red-500':'text-white'} -mt-1`}>Subscriptions</Text>
        </View>)
      }}}/>
      <Tab.Screen name='You' component={You} options={{tabBarIcon:({focused})=>{
        return(
        <View className='items-center'>
            <Image className="w-7 h-7 rounded-full" style={{borderColor:`${focused?'red':'white'}`, borderWidth:1}} resizeMode={'contain'} source={{uri:'https://marketplace.canva.com/EAFcyEtxbGA/1/0/1600w/canva-black-and-red-modern-gaming-youtube-channel-logo-onRlchjOY2w.jpg'}}/>
            <Text className={`text-xs ${focused?'text-red-500':'text-white'} -mt-1`}>You</Text>
        </View>)
      }}} />
    </Tab.Navigator>
  )
}

export default Tabs
import { View, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native'
import React, {useState, useEffect} from 'react';
import data from '../assets/tags.json'
import { useNavigation } from '@react-navigation/native';

const ChannelsRowList = () => {

  const navigation = useNavigation()

  return (
    <ScrollView horizontal>
    <View className='flex-row space-x-1 my-2'>
      {data.channels.map((channel,ind)=>{
        return (
          <TouchableWithoutFeedback key={ind} onPress={()=>{navigation.navigate('channel',{channelID:channel.Link})}}>
          <View className='items-center mx-2'>
          <View className='relative'>
          <Image className="w-14 h-14 rounded-full" resizeMode='cover' source={{uri:channel.Img}}/>
          <View className='absolute w-4 h-4 bg-blue-500 rounded-full bottom-0 right-0' style={{borderColor:'black',borderWidth:2}}></View></View>
          <Text className='text-white text-xs'>{channel.Text.length>10?channel.Text.slice(0,8)+"...":channel.Text}</Text>
        </View></TouchableWithoutFeedback>
        )
      })}
    </View></ScrollView>
  )
}

export default ChannelsRowList
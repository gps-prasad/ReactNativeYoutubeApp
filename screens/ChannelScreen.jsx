import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import ChannelTopTabs from './ChannelTopTabs'
import axios from 'axios';

const ChannelScreen = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const [channelDetails,setChannelDetails] = useState([]);
    const [loading,setLoading] = useState(true)

    const fetchChannelDetails = async()=>{
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/channels',
            params: {
              part: 'snippet,statistics',
              id: route.params.channelID || 'UCX6OQ3DkcsbYNE6H8uQQuVA'
            },
            headers: {
              'X-RapidAPI-Key': '4680113032msh533604ecd7349c0p1bfc14jsn6db1cf155f8b',
              'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setChannelDetails(response.data.items[0])
          } catch (error) {
              console.error(error);
          }
    }

    useEffect(()=>{
        fetchChannelDetails();
        setLoading(false)
    },[])

  return (
    <>{loading?<Text>loading</Text>:<View className='flex-1 bg-black'>
        <View className='flex-row items-center px-2'>
            <View className='flex-row items-center space-x-2'>
                <Feather name='arrow-left' onPress={()=>navigation.goBack()} color={'white'} size={25}/>
                <Text className='text-white font-bold text-lg'>{channelDetails?.snippet?.title}</Text>
            </View>
            <View className='flex-row space-x-5 ml-auto'>
                <Feather name='cast' color={'white'} size={25}/>
                <Feather name='bell' color={'white'} size={25}/>
                <Feather name='search' color={'white'} size={25}/>
            </View>
        </View>
        <View className='px-3'>
            <Image />
            <View className='flex-row my-5 items-center'>
        <View>
            <Image className="w-20 h-20 rounded-full" source={{uri:channelDetails?.snippet?.thumbnails?.default.url || channelDetails?.snippet?.thumbnails?.medium.url || channelDetails?.snippet?.thumbnails?.high.url}}/>
        </View>
        <View className='ml-5'>
            <Text className='text-white'>{channelDetails?.snippet?.title}</Text>
            <Text className='text-white text-xs'>useremail@gamil.com</Text>
            <View className='flex-row'>
                <Text className='text-white text-xs'>{JSON.stringify(channelDetails?.snippet?.customUrl)}</Text>
                <Text className='text-white text-xs'> View Channel</Text>
            </View>
        </View>
      </View>
      <View className='flex-row justify-center items-center bg-neutral-800 space-x-2 rounded-full p-1 mr-2'>
            <Feather name='bell' className='' color={'white'} size={20}/>
            <Text className="text-white font-bold text-lg self-center">Subscribe</Text>
            <Feather name='chevron-down' className='' color={'white'} size={15}/>
        </View>
    </View>
    <ChannelTopTabs channelID={route.params.channelID}/>
    </View>}</>
  )
}

export default ChannelScreen
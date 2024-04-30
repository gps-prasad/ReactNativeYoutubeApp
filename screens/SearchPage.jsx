import { View, Text, ScrollView,StyleSheet,TextInput, Pressable, Keyboard } from 'react-native'
import axios from 'axios';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState} from 'react'
import LoadingSpinner from '../components/LoadingSpinner';
import VideoCard from '../components/VideoCard';
import { useRoute } from '@react-navigation/native';

const SearchPage = () => {
    const navigation = useNavigation()
    const x = useRoute().params
    const [loading,setLoading] = useState(true)
    const [videos,setVideos] = useState([]);
    const [input,setInput] = useState(x?.input);
  
    useEffect(()=>{
      fetchSearchVideos();
    },[])
  
    const fetchSearchVideos = async () =>{
        setLoading(true)
      const options = {
        method: 'GET',
        url: 'https://youtube-v31.p.rapidapi.com/search',
        params: {
          q: input || 'Video Game Trailers',
          part: 'snippet,id',
          regionCode: 'IN',
          maxResults: '10',
          order: 'date'
        },
        headers: {
          'X-RapidAPI-Key': '4680113032msh533604ecd7349c0p1bfc14jsn6db1cf155f8b',
          'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
        }
      };
      try {
        const response = await axios.request(options);
        console.log(response.data);
        setVideos(response.data.items)
        setLoading(false)
      } catch (error) {
        console.error(error);
      }    
    } 



  return (
    <>{loading?<LoadingSpinner/>:(
    <View className='flex-1 bg-black'>
        <View className='flex-row justify-between items-center mt-2 m-1'>
          <Pressable onPress={()=>navigation.navigate('tabs',{screen:'Home'})} className=''>
            <MaterialIcons name="arrow-back" color="#fff" size={25} />
          </Pressable>
          <TextInput className='h-8 flex-1 mx-2 bg-neutral-800 rounded-full px-3s pl-3' placeholderTextColor={'gray'} placeholder='Search' color='white' onSubmitEditing={()=>{fetchSearchVideos();Keyboard.dismiss}} autoFocus={false} style={{color:'white'}} value={input} onChangeText={(e)=>{setInput(e)}}/>
          <Feather name='search' color={'white'} onPress={()=>fetchSearchVideos()} size={25}/>
        </View>
      <ScrollView>
      {videos.length>0 && videos.map((video,index)=>{
        return (
            <VideoCard key={index} channelID={video.snippet?.channelId || 'UCQ0skUDTL_n5p5iUjW-OatA'} channelTitle={video.snippet.channelTitle} videoTitle={video.snippet.title} videoID={video.id.videoId} thumbnailURI={video?.snippet?.thumbnails?.high?.url}/> 
        )
      })}</ScrollView>
    </View>)
    }</>
  )
}

export default SearchPage
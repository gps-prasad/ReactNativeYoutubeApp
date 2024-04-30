import { View, Text, ScrollView } from 'react-native'
import React, {useState,useEffect} from 'react';
import { useNavigation } from '@react-navigation/native';
import MiniVideoCard from './MiniVideoCard'
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';

const RowVideosComponent = ({rowName}) => {

  const navigation = useNavigation()
  const [loading,setLoading] = useState(true)
  const [videos,setVideos] = useState([]);
  const [tag,setTag] = useState('');

  useEffect(()=>{
    fetchHomeVideos();

  },[tag])

  const fetchHomeVideos = async () =>{
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: 'cartoon',
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
    } catch (error) {
      console.error(error);
    }    
    setLoading(false)
  } 


  return (
    <View className='flex-coloumn w-full mb-4'>
      <View className='flex-row justify-between mb-2'>
        <Text className='text-white text-lg font-bold'>{rowName}</Text>
        <Text className='text-white border-white border-[1px] rounded-full px-3 py-1 self-center'>View all</Text>
      </View>
      <ScrollView horizontal={true}>
        <View className='flex-row w-full'>{loading?<LoadingSpinner/>:(
          
            videos.map((video,index)=>{
              return(
              <MiniVideoCard  key={index} channelID={video.snippet?.channelId || 'UCQ0skUDTL_n5p5iUjW-OatA'} channelTitle={video?.snippet?.channelTitle} videoTitle={video?.snippet?.title} videoID={video?.id?.videoId} thumbnailURI={video?.snippet?.thumbnails?.high?.url}/>)
            })
          )}
        </View>
      </ScrollView>
    </View>
  )
}

export default RowVideosComponent
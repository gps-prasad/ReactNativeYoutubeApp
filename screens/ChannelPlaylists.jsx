import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import VideoCard from '../components/VideoCard';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useRoute } from '@react-navigation/native';

const ChannelPlaylists = () => {
  const route = useRoute()
  const [loading,setLoading] = useState(true);
  const [channelVideos,setChannelVideos] = useState([]);

  const fetchChannelVideos = async() =>{
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        channelId: route.params.channelID,
        part: 'snippet,id',
        order: 'date',
        maxResults: '10'
      },
      headers: {
        'X-RapidAPI-Key': '4680113032msh533604ecd7349c0p1bfc14jsn6db1cf155f8b',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);
      console.log('channel videos');
      setChannelVideos(response.data.items)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  useEffect(()=>{
    fetchChannelVideos();
  },[])

  return (
<>
    {loading?<LoadingSpinner/>:(
      <ScrollView>
    <View className="flex-1 bg-black">
      {channelVideos.length==0?<Text className='text-white text-lg'>No Videos</Text>: (channelVideos.map((video,index)=>{
        return(<VideoCard key={index} channelID={video.snippet?.channelId || 'UCQ0skUDTL_n5p5iUjW-OatA'} channelTitle={video.snippet.channelTitle} videoTitle={video.snippet.title} videoID={video.id.videoId} thumbnailURI={video.snippet?.thumbnails?.medium?.url || video.snippet?.thumbnails?.high?.url || video.snippet?.thumbnails?.default?.url}/> )
      }))}
    </View></ScrollView>)}</>
  )
}

export default ChannelPlaylists
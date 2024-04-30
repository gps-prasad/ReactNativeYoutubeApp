import { View, Text, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useState, useEffect } from 'react'
import axios from 'axios'
import React from 'react'
import Head from '../components/Head'
import ChannelsRowList from '../components/ChannelsRowList'
import TagsRow from '../components/TagsRow'
import VideoCard from '../components/VideoCard'
import LoadingSpinner from '../components/LoadingSpinner'

const Subscriptions = () => {

  const navigation = useNavigation()
  const [loading,setLoading] = useState(true)
  const [videos,setVideos] = useState([]);
  const [tag,setTag] = useState('game trailers');

  useEffect(()=>{
    fetchHomeVideos();

  },[tag])

  const fetchHomeVideos = async () =>{
    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://youtube-v31.p.rapidapi.com/search',
      params: {
        q: tag,
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
    <View className='flex-1 bg-black p-2'>
      <Head/>
      <View>
      <ScrollView horizontal>
        <ChannelsRowList/>
      </ScrollView>
      </View>
      <View>
      <TagsRow setTag={setTag} tag={tag}/>
      </View>
      {loading?<LoadingSpinner/>:
      <ScrollView showsVerticalScrollIndicator={false}>
      {videos.map((video,index)=>{
        return (
            <VideoCard key={index} channelID={video.snippet?.channelId || 'UCQ0skUDTL_n5p5iUjW-OatA'} channelTitle={video.snippet.channelTitle} videoTitle={video.snippet.title} videoID={video.id.videoId} thumbnailURI={video.snippet.thumbnails.high.url}/> 
        )})}
      </ScrollView>}
    </View>
  )
}

export default Subscriptions
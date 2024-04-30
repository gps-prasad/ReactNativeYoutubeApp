import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TouchableWithoutFeedback } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo'
import VideoCard from "../components/VideoCard";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState} from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const VideoScreen = () => {  
    const navigation = useNavigation()
    const route = useRoute();
    console.log(route.params)
    const [ID,setID] = useState(route.params.videoID)
    const [videoDetails,setVideoDetails] = useState();
    const [channelDetails,setChannelDetails] = useState();
    const [simillarVideos,setSimillarVideos] = useState([]);
    const [loading,setLoading] = useState(true)
    const [subscribe,setSubscribe] = useState(false);

    function formatNumber(x=10000) {
        const number = parseInt(x,10)
        const billion = 1000000000;
        const million = 1000000;
        const lakhs = 100000;
        const thousand = 1000
      
        if (number >= billion) {
          return (number / billion).toFixed(1) + 'B';
        } else if (number >= million) {
          return (number / million).toFixed(1) + 'M';
        } else if (number >= lakhs){
            return (number / lakhs).toFixed(1) + 'L'
        } else if (number >= thousand){
            return (number / thousand).toFixed(1) +'K'
        } else {
          return number.toString();
        }
      }

    const fetchVideoDetails = async()=>{
        const options = {
          method: 'GET',
          url: 'https://youtube-v31.p.rapidapi.com/videos',
          params: {
            part: 'contentDetails,snippet,statistics',
            id: ID
          },
          headers: {
            'X-RapidAPI-Key': '4680113032msh533604ecd7349c0p1bfc14jsn6db1cf155f8b',
            'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
          }
        };
        
        try {
          const response = await axios.request(options);
          setVideoDetails(response.data.items[0])
        } catch (error) {
          console.error(error);
        }
      }
    

    const fetchChannelDetails = async()=>{
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/channels',
            params: {
              part: 'snippet,statistics',
              id: route.params.channelID
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

    const fetchSimillarVideos = async() => {
        const options = {
            method: 'GET',
            url: 'https://youtube-v31.p.rapidapi.com/search',
            params: {
              relatedToVideoId: route.params.videoID,
              part: 'id,snippet',
              type: 'video',
              maxResults: '5'
            },
            headers: {
              'X-RapidAPI-Key': '4680113032msh533604ecd7349c0p1bfc14jsn6db1cf155f8b',
              'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
            }
          };
          
          try {
              const response = await axios.request(options);
              setSimillarVideos(response.data.items)
          } catch (error) {
              console.error(error);
          }
    }

    const details_fetch = async() => {
      const results = await Promise.all([
        fetchVideoDetails(),
        fetchChannelDetails(),
        fetchSimillarVideos()
      ]);
      setID(route.params.videoID)
      setLoading(false);
      console.log('loading')
    }

      useEffect(()=>{
        details_fetch();
      },[route.params.videoID])
    return (
        <>{loading?<LoadingSpinner/>:
      <View className='flex-1 mt-0 bg-black'>
        <View className='shadow-2xl mb-2' style={{elevation:24}}>
        <YoutubePlayer
          height={220}
          videoId={ID}
        />
        </View>
        <ScrollView>
        <View className='p-2 pt-0'>
            <Text className='text-white font-bold text-xl'>{JSON.stringify(videoDetails?.snippet.title)}</Text>
            <Text className='text-white font-light text-[12px] my-1'>{formatNumber(videoDetails?.statistics.viewCount)} Views</Text>
            <View className='flex-row w-full items-center my-2'>
                <TouchableOpacity onPress={()=>{navigation.navigate('channel',{channelID:route.params.channelID})}} className='flex-row items-center'>
                <Image className="w-8 h-8 rounded-full" source={{uri:channelDetails?.snippet.thumbnails.default.url || channelDetails?.snippet.thumbnails.medium.url || channelDetails?.snippet.thumbnails.high.url }}/>
                <Text className='text-white font-bold text-lg ml-2'>{videoDetails?.snippet.channelTitle}</Text>
                </TouchableOpacity>
                <Text className='text-white font-light text-[12px] ml-2'>{formatNumber(channelDetails?.statistics.subscriberCount)} Subscribers</Text>
                <TouchableWithoutFeedback onPress={(subscribe)=>setSubscribe(!subscribe)} className={`p-2 bg-white rounded-full ml-auto ${subscribe?"bg-black":"bg-white"}`}>
                    <View>
                        <Text className='font-bold'>Subscribe</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View className='flex-row items-center space-x-2 my-1'>
                <ScrollView horizontal contentContainerStyle={{justifyContent: 'space-betweens'}}>
                <View className='flex-row items-center py-2 px-3 rounded-full space-x-3 bg-neutral-800 mx-1'>
                    <View className='flex-row'>
                        <AntDesign size={15} name='like2' color={'white'}/>
                        <Text className='text-white font-light text-[12px] ml-2'>{formatNumber(videoDetails?.statistics.likeCount)}</Text>
                    </View>
                    <AntDesign size={15} name='dislike2' color={'white'} style={{transform: [{rotateY: '180deg'}]}}/>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <MaterialIcons size={15} name='share' color={'white'}/>
                    <Text className='text-white'>Share</Text>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <Entypo size={15} name='sound-mix' color={'white'}/>
                    <Text className='text-white'>Remix</Text>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <Ionicons size={15} name='ban-outline' color={'white'}/>
                    <Text className='text-white'>Stop ads</Text>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <Feather size={15} name='scissors' color={'white'}/>
                    <Text className='text-white'>Clip</Text>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <Feather size={15} name='save' color={'white'}/>
                    <Text className='text-white'>Save</Text>
                </View>
                <View className='flex-row items-center py-2 px-4 rounded-full space-x-2 bg-neutral-800 mx-1'>
                    <Feather size={15} name='flag' color={'white'}/>
                    <Text className='text-white'>Report</Text>
                </View>
                </ScrollView>
            </View>
            <View className='bg-neutral-800 my-3 rounded-xl p-2'>
                <View className='flex-row items-center'>
                    <Text className='text-white'>Comments</Text>
                    <Text className='text-gray-400 text-[12px] ml-2'>{formatNumber(videoDetails?.statistics.commentCount)}</Text>
                </View> 
                <View className='flex-row my-2 items-center'>
                    <Image className="w-5 h-5 rounded-full" source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
                    <Text className='text-white px-3'> simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry</Text>
                </View>
            </View>
        </View>
        {simillarVideos.length!=0 && simillarVideos.map((video,index)=>{
            return (
                <VideoCard key={index} channelID={video.snippet?.channelId || 'UCQ0skUDTL_n5p5iUjW-OatA'} channelTitle={video.snippet.channelTitle} videoTitle={video.snippet.title} videoID={video.id.videoId} thumbnailURI={video.snippet.thumbnails?.medium?.url || video.snippet.thumbnails?.high?.url || video.snippet.thumbnails?.default?.url}/> 
            )
        })}
        </ScrollView>
      </View>}</>
    );
}

export default VideoScreen
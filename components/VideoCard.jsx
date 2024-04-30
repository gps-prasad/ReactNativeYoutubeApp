import { View, Text,Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const VideoCard = ({channelID,channelTitle,videoTitle,videoID,thumbnailURI,views}) => {
  const navigation = useNavigation()


  return (
    <TouchableOpacity onPress={()=>navigation.navigate('video',{videoID:videoID,channelID:channelID})}>
    <View className='flex-columon space-y-1 bg-black py-1'>
        <Image className="w-full h-64" source={{uri:thumbnailURI}}/>
      <View className='flex-row w-full items-center'>
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('channel',{channelID:channelID})}><Image className="w-10 h-10 rounded-full ml-1" style={{borderColor:'red', borderWidth:1}} resizeMode={'contain'} source={{uri:'https://marketplace.canva.com/EAFcyEtxbGA/1/0/1600w/canva-black-and-red-modern-gaming-youtube-channel-logo-onRlchjOY2w.jpg'}}/></TouchableWithoutFeedback>
        <View className='ml-4 flex-1'>
            <Text className='text-white font-bold text-[16px]' ellipsizeMode="tail" numberOfLines={2} style={{flexWrap:'wrap'}}>{videoTitle}</Text>
            <Text className='text-neutral-400 mt-1 text-xs text-[11px]'>{channelTitle} {'\u2022'} 10k views {'\u2022'} 10 days ago</Text>
        </View>
        <View className='ml-auto mr-1'>
            <Entypo name='dots-three-vertical' size={20} color={'white'}/>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default VideoCard
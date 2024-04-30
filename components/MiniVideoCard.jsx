import { View, Text, Image } from 'react-native'
import { TouchableOpacity } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const MiniVideoCard = ({channelID,channelTitle,videoTitle,videoID,thumbnailURI,views}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>navigation.navigate('video',{videoID:videoID,channelID:channelID})}>
    <View className='flex-columon space-y-2 w-[160px] bg-black py-2 mr-3'>
        <Image className="w-full h-20 rounded-xl" source={{uri:thumbnailURI}}/>
      <View className='flex-row w-full items-center'>
        <View className='pr-2'>
            <Text className='text-white font-bold text-[12px]' ellipsizeMode="tail" numberOfLines={1} style={{flexWrap:'wrap'}}>{videoTitle}</Text>
            <Text className='text-white text-xs text-[9px]' ellipsizeMode="tail" numberOfLines={1} style={{flexWrap:'wrap'}}>{channelTitle}</Text>
        </View>
        <View className='ml-auto mr-1'>
            <Entypo name='dots-three-vertical' size={15} color={'white'}/>
        </View>
      </View>
    </View>
    </TouchableOpacity>
  )
}

export default MiniVideoCard
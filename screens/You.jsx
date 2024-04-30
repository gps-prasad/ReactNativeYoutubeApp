import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import RowVideosComponent from '../components/RowVideosComponent';


const You = () => {
  return (
    <View className='bg-black flex-1 pl-3 pr-3'>
      <View className='flex-row space-x-5 ml-auto items-center'>
        <Feather name='cast' color={'white'} size={25}/>
        <Feather name='bell' color={'white'} size={25}/>
        <Feather name='search' color={'white'} size={25}/>
        <Feather name='settings' color={'white'} size={25}/>
      </View>
      <ScrollView>
      {/* user details */}
      <View className='flex-row my-5 items-center'>
        <View>
            <Image className="w-20 h-20 rounded-full" style={{borderColor:'red', borderWidth:1}} source={{uri:'https://marketplace.canva.com/EAFcyEtxbGA/1/0/1600w/canva-black-and-red-modern-gaming-youtube-channel-logo-onRlchjOY2w.jpg'}}/>
        </View>
        <View className='ml-5'>
            <Text className='text-white'>USER NAME</Text>
            <View className='flex-row'>
                <Text className='text-white text-xs'>useremail@gamil.com</Text>
                <Text className='text-white text-xs'> View Channel</Text>
            </View>
        </View>
      </View>
      {/* End user details */}
      <RowVideosComponent rowName={'History'} />
      <RowVideosComponent rowName={'Playlists'}/>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <Entypo name='folder-video' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Your videos</Text>
      </View>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <Feather name='download' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Downloads</Text>
      </View>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <MaterialCommunityIcons name='movie-open-outline' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Your Movies</Text>
      </View>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <Feather name='youtube' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Get YouTube Premium</Text>
      </View>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <Ionicons name='stats-chart' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Time Watched</Text>
      </View>
      <View className='flex-row items-center pl-3 w-full my-3'>
        <AntDesign name='questioncircleo' color={'white'} size={25}/>
        <Text className='text-white ml-6 text-[16px]'>Help and feedback</Text>
      </View>
      </ScrollView>
    </View>
  )
}

export default You
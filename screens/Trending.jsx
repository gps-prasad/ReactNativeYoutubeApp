import { View, Text } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo'
import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react'

const Trending = () => {
  return (
    <View className='mt-8 mx-2'>
        <View className='flex-row items-center w-full'>
          <View className='flex-row items-center'>
            <AntDesign name='arrowleft' size={30} color={'black'} />
            <Text className='font-bold text-lg ml-2'>SHORTS</Text>
          </View>
          <View className='ml-auto mr-1'>
            <Entypo name='dots-three-vertical' size={20} color={'black'}/>
        </View>
        </View>
    </View>
  )
}

export default Trending
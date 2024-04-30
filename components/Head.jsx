import { View, Text, Image } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React from 'react'

const Head = ({setIsModalVisible, isModalVisible}) => {
  
  return (
    <View className='flex-row bg-black p-1 px-2'>
      <View className='flex-row items-center'>
        <View>
          <AntDesign name="youtube" size={30} color={'red'} style={{zIndex:2}}/>
          <View className='w-4 h-3 bg-white absolute top-[50%] left-[50%] z-1' style={{transform: [{translateX: -5},{translateY:-5}]}} ></View>
        </View>
        <Text className='text-xl text-white font-bold'> YouTube</Text>
      </View>
      <View className='flex-row space-x-3 ml-auto items-center'>
        <Feather name='cast' color={'white'} size={25}/>
        <Feather name='bell' color={'white'} size={25}/>
        <Feather name='search' color={'white'} onPress={()=>setIsModalVisible(true)} size={25}/>
      </View>
    </View>
  )
}

export default Head
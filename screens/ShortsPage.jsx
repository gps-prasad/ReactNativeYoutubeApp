import { View, Text, ScrollView, Dimensions } from 'react-native'
import SafeAreaView from 'react-native-safe-area-view';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import data from '../assets/tags.json'
import React, { useEffect, useState } from 'react'
import Shorts from './Shorts'
import { useNavigation, useRoute } from '@react-navigation/native';

const ShortsPage = () => {
    const navigation = useNavigation()
    const [active,setActive] = useState(0)
    const bottomTabHeight = useBottomTabBarHeight();

  return (
    <SafeAreaView style={{ flex: 1 }}>
    <ScrollView pagingEnabled className='flex-1 bg-black' onScroll={(e)=>{
        const index = Math.round(e.nativeEvent.contentOffset.y/(Dimensions.get('window').height-bottomTabHeight))
        setActive(index)
        
    }}>{data.shorts.map((vid,ind)=>{
        return(<Shorts key={ind} vid={vid} active={active} ID={ind}/>)
    })}
  </ScrollView>
  </SafeAreaView>
  )
}

export default ShortsPage
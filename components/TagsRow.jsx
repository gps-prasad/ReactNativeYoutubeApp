import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import data from '../assets/tags.json'
import { TouchableHighlight } from 'react-native'


const TagsRow = ({setTag, tag}) => {
  return (
    <ScrollView horizontal className='flex-row my-1' showsHorizontalScrollIndicator={false}>
        {data.tags.map((name,ind)=>{
            return(<Tag key={ind} name={name} setTag={setTag} isActive={name===tag}/>)
        })}
    </ScrollView>
  )
}


const Tag = ({name,setTag,isActive}) => {
    return (
        <TouchableHighlight onPress={()=>setTag(name)}>
        <View className={`rounded-md p-2 mx-1 ${isActive?'bg-white':'bg-neutral-800'}`}>
            <Text className={`font-bold ${isActive?'text-neutral-1000':'text-white'}`}>{name}</Text>
        </View>
        </TouchableHighlight>
    )
}

export default TagsRow
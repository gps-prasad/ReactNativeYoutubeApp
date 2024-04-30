import { View, Text, Image, Dimensions, TouchableWithoutFeedback,StyleSheet, StatusBar } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useState, useEffect } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Video, ResizeMode } from 'expo-av';


const Shorts = ({active,ID,vid}) => {
  const route = useRoute()
  const bottomTabHeight = useBottomTabBarHeight()
  const navigation = useNavigation();
  const video = React.useRef(null);
  const [playing,setPlaying] = useState(true)
  const [status, setStatus] = React.useState({});

  useEffect(()=>{
    const tabLeaving = navigation.addListener('blur',()=>{
      setPlaying(false)
    })
    const tabFocus = navigation.addListener('focus',()=>{
      setPlaying(true)
    })
    tabFocus;
    tabLeaving;
  },[navigation])

  return (
    <View className='flex relative bg-black w-full' style={{height:Dimensions.get('window').height-bottomTabHeight}}> 
          <TouchableWithoutFeedback onPress={()=>setPlaying(()=>!playing)}><View className='absolute w-10/12 h-4/6 bg-transparent top-[10%] left-0' style={{zIndex:1}}></View></TouchableWithoutFeedback>   
          <Video
            ref={video}
            className="h-full"
            shouldPlay={active===ID && playing}
            source={{
              uri: vid,
            }}
            useNativeControls={false}
            resizeMode={ResizeMode.COVER}
            isLooping
            onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
      <View className='absolute w-full h-full flex-coloumn space-between top-0 left-0'>
        {/* shorts top nav */}
        <View className='mx-3'> 
        <View className='flex-row items-center w-full'>
          <View className='flex-row items-center'>
            <TouchableWithoutFeedback onPress={()=>{setPlaying(false);navigation.goBack()}}>
              <AntDesign name='arrowleft' size={30} color={'white'} />
            </TouchableWithoutFeedback>
            <Text className='font-bold text-white text-lg ml-2'>SHORTS</Text>
          </View>
          <View className='ml-auto mr-1'>
            <Entypo name='dots-three-vertical' size={20} color={'white'}/>
        </View>
        </View>
        </View>
        {/* shorts top nav end */}
        <View className='flex-row w-full h-full'>
            {/* shorts video details */}
            <View className='w-[75%] bg-transparent'>
                <View className='mt-auto mb-5 h-[150px] space-y-3 p-2'>
                    <View className='flex-row space-x-2 items-center'>
                    <Image className="w-8 h-8 rounded-full" source={{uri:'https://marketplace.canva.com/EAFcyEtxbGA/1/0/1600w/canva-black-and-red-modern-gaming-youtube-channel-logo-onRlchjOY2w.jpg'}}/>
                    <Text className='text-white'>Channel Name</Text>
                    <View className='bg-white rounded-full'>
                        <Text className='text-[10px] p-3'>SUBSCRIBE</Text>
                    </View>
                    </View>
                    <Text className='text-white pl-10'>
                        Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, 
                    </Text>
                </View>

            </View>
            {/* shorts video details end */}
            {/* likes colomn */}
            <View className='w-[20%] ml-auto bg-transparent'>
                <View className='flex-coloumn space-y-5 mt-auto mb-10 items-center'>
                    <View className='items-center'>
                        <AntDesign size={30} name='like1' color={'white'}/>
                        <Text className='text-white'>Like</Text>
                    </View>
                    <View className='items-center'>
                    <AntDesign size={30} name='dislike1' color={'white'}/>
                        <Text className='text-white'>DisLike</Text>
                    </View>
                    <View className='items-center'>
                    <MaterialIcons size={30} name='chat' color={'white'}/>
                        <Text className='text-white'>10</Text>
                    </View>
                    <View className='items-center'>
                    <MaterialIcons size={30} name='share' color={'white'}/>
                        <Text className='text-white'>Share</Text>
                    </View>              
                    <AntDesign size={30} name='retweet'  color={'white'}/>
                    <Image className="w-8 h-8 rounded-full" source={{uri:'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'}}/>
                </View>
            </View> 
            {/* end likes coloumn */}
        </View>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  video: {
    alignSelf: 'center',
    width: 320,
    height: 200,
    zIndex:5,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default Shorts

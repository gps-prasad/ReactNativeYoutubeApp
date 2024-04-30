import { Modal, View, Text, Pressable, StyleSheet, TextInput, Keyboard } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import Feather from '@expo/vector-icons/Feather';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function SearchPageModal({ isModalVisible, setIsModalVisible }) {
    const [input,setInput] = useState('');
    const navigation = useNavigation()    
  return (
    <Modal animationType="slide" transparent={true} visible={isModalVisible}>
      <View className='flex-1 bg-black' >
        <View className='flex-row justify-between items-center mt-2 mx-1'>
          <Pressable onPress={()=>setIsModalVisible(false)} className=''>
            <MaterialIcons name="arrow-back" color="#fff" size={25} onPress={()=>setIsModalVisible(false)} />
          </Pressable>
          <TextInput className='h-8 flex-1 mx-2 bg-neutral-800 rounded-full px-3' color='white' placeholderTextColor={'gray'} placeholder='Search' onSubmitEditing={()=>{setIsModalVisible(false);navigation.navigate('search',{input:input})}} autoFocus={true} style={{color:'white'}} value={input} onChangeText={(e)=>{setInput(e)}}/>
          <Feather name='search' color={'white'} onPress={()=>{setIsModalVisible(false);navigation.navigate('search',{input:input})}} size={25}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
    modalContent: {
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
      borderTopRightRadius: 18,
      borderTopLeftRadius: 18,
      position: 'absolute',
      bottom: 0,
    },
    titleContainer: {
      height: '8%',
      backgroundColor: '#464C55',
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      color: '#fff',
      width:'50%',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
  });
  

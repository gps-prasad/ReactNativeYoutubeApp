import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import tabs from './screens/Tabs';
import VideoScreen from './screens/VideoScreen';
import ChannelScreen from './screens/ChannelScreen';
import SearchPage from './screens/SearchPage';
import { useEffect } from 'react';

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='tabs'>
        <Stack.Screen name='tabs' component={tabs} />
        <Stack.Screen name='video' component={VideoScreen} />
        <Stack.Screen name='channel' component={ChannelScreen}/>
        <Stack.Screen name='search' component={SearchPage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


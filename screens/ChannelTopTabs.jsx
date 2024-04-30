import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChannelHome from './ChannelHome';
import ChannelPlaylists from './ChannelPlaylists';

const Tab = createMaterialTopTabNavigator();

function MyTabs({channelID}) {
  return (
    <Tab.Navigator initialRouteName='ChannelHome' screenOptions={{tabBarStyle:{backgroundColor:'black'}}}>
      <Tab.Screen name="ChannelHome" component={ChannelHome} initialParams={{channelID:channelID}} options={{tabBarLabel:'Home',tabBarLabelStyle:{color:'white',fontWeight:700}}} />
      <Tab.Screen name="ChannelPlaylists" component={ChannelPlaylists} initialParams={{channelID:channelID}} options={{tabBarLabel:'Playlists',tabBarLabelStyle:{color:'white',fontWeight:700}}} />
    </Tab.Navigator>
  );
}

export default MyTabs;
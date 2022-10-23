import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import JoinRoom from "./JoinRoom";
import CreateRoom from "./CreateRoom";

const Tab = createMaterialTopTabNavigator();

const Default = ({navigation}) => {

    return ( 
        <Tab.Navigator>
          <Tab.Screen name="Create room" component={CreateRoom}  />
          <Tab.Screen name="Join room" component={JoinRoom} />
        </Tab.Navigator>
     );
}
 
export default Default;
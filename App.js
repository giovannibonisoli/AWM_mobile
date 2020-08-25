import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { StatusBar } from 'react-native';

import HomeScreen from './src/pages/HomeScreen';
import LoginScreen from './src/pages/LoginScreen';
import BarrelSetScreen from './src/pages/BarrelSetScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  render(){
    return (
      <Drawer.Navigator>
        <Drawer.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
          }}/>
        <Drawer.Screen
          name="BarrelSet"
          component={BarrelSetScreen}
          options={{
            title: 'BarrelSet'
          }}/>
      </Drawer.Navigator>
    )
  }
}



class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator {...this.props} headerMode='none'>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Login'
            }}
          />
          <Stack.Screen
            name="Drawer"
            component={DrawerNavigator}
            //options={}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;

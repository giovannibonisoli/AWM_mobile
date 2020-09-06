import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

import LoginScreen from '../pages/LoginScreen';
import DrawerNavigator from './DrawerNavigator';

import AuthService from '../services/auth.service';

const Stack = createStackNavigator();

class RootNavigator extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <StatusBar hidden />
        <Stack.Navigator {...this.props} headerMode='none'>
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={{
              title: 'Login'
            }}
          />
          {AuthService.isLoggedIn() &&
            (<Stack.Screen
              name="Drawer"
              component={DrawerNavigator}
            />)
          }
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default RootNavigator;

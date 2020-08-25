import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, StatusBar } from 'react-native';

import Header from '../components/Header';
import AuthService from '../services/auth.service';

class HomeScreen extends React.Component {

  render () {
    return (
      <View>
        <Header name="Home" openDrawer={this.props.navigation.openDrawer}/>
        <Text>Hello {/*this.props.route.params.name*/}</Text>
        <Button
          onPress={() => AuthService.logout()}
          title="Logout"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"/>
      </View>
    );
  }
};

export default HomeScreen;

import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

import { request } from '../helpers/requests';
import AuthService from '../services/auth.service';

class HomeScreen extends React.Component {
  getBarrels = async () => {
    console.log(await request("barrel_set/", 'GET'));
  }

  render () {
    return (
      <View>
        <Text>Hello {this.props.route.params.name}</Text>
        <Button
          onPress={this.getBarrels}
          title="Get data"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"/>
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

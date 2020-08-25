import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

import Header from '../components/Header';
import { request } from '../helpers/requests';

class BarrelSetScreen extends React.Component {
  getBarrels = async () => {
    console.log(await request("barrel_set/", 'GET'));
  }

  render () {
    return (
      <View>
        <Header name="Batterie" openDrawer={this.props.navigation.openDrawer}/>
        <Text>Hello BarrelSetScreen</Text>
        <Button
          onPress={this.getBarrels}
          title="Get data"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"/>
      </View>
    );
  }
};

export default BarrelSetScreen;

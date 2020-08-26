import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';

class BarrelSetScreen extends React.Component {
  state = {
    items: []
  }

  async componentDidMount() {
    this.setState({items: await request("barrel_set/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Batterie" openDrawer={this.props.navigation.openDrawer}/>
        <DataList items={this.state.items} />
      </View>
    );
  }
};


export default BarrelSetScreen;

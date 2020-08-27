import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';


class BarrelScreen extends React.Component {
  state = {
    items: [],
    fields: []
  }

  async componentDidMount() {
    this.setState({items: await request("barrel/set/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Batterie e Barili" openDrawer={this.props.navigation.openDrawer}/>
        <DataList items={this.state.items}
                  fields={this.state.fields}
                  navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
};

export default BarrelScreen;

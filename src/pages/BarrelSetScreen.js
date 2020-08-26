import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';

class BarrelSetScreen extends React.Component {
  state = {
    items: [],
    fields: [
              {
                field: 'id',
                name: 'Numero Batteria',
                type: 'number',
                modifiable: false
              },
              {
                field: 'year',
                name: 'Anno',
                type: 'number',
                min: 1984,
                modifiable: true
              }
            ]
  }

  async componentDidMount() {
    this.setState({items: await request("barrel_set/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Batterie" openDrawer={this.props.navigation.openDrawer}/>
        <DataList items={this.state.items}
                  fields={this.state.fields}
                  navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
};


export default BarrelSetScreen;

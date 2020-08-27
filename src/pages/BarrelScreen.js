import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';


class BarrelScreen extends React.Component {
  state = {
    items: [],
    fields: [
              {
                field: 'id',
                name: 'Codice Barile',
                type: '',
                modifiable: false
              },
              {
                field: 'wood_type',
                name: 'Legno',
                type: '',
                modifiable: true
              },
              {
                field: 'capability',
                name: 'Capacità (litri)',
                type: 'number',
                modifiable: true
              }
            ]
  }

  async componentDidUpdate(prevProps){
    if(this.props.route.params.setID !== prevProps.route.params.setID){
      this.setState({items: await request(`barrel/set/${this.props.route.params.setID}/`, 'GET')});
    }
  }

  async componentDidMount() {
    this.setState({items: await request(`barrel/set/${this.props.route.params.setID}/`, 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Barili" openDrawer={this.props.navigation.openDrawer}/>
        <DataList items={this.state.items}
                  fields={this.state.fields}
                  navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
};

export default BarrelScreen;

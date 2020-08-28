import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import { Header } from '../components/smallComponents';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';

class OperationTypeScreen extends React.Component {
  state = {
    items: [],
    fields: [
              {
                field: 'name',
                name: 'Nome',
                type: 'text',
                modifiable: true
              },
              {
                field: 'description',
                name: 'Descrizione',
                type: 'textArea',
                modifiable: true
              }
            ]
  }

  async componentDidMount() {
    this.setState({items: await request("operation_type/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Tipi di Operazione" openDrawer={this.props.navigation.openDrawer}/>
        <DataList items={this.state.items}
                  fields={this.state.fields}
                  navigate={this.props.navigation.navigate}/>
      </View>
    );
  }
};


export default OperationTypeScreen;

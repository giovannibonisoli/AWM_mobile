import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';

class OperationTypeScreen extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'name',
              name: 'Nome',
              type: 'default'
            },
            {
              field: 'description',
              name: 'Descrizione',
              type: 'default'
            }
          ]

  goToOperation = (item) => {
    this.props.navigation.navigate("operation", {operation: item})
  }

  addItem = (item) => {
    AuthService.getToken().then(token => {
      item.id = item.name.toLowerCase().replace(/\s/g, '');
      post("operation_type/", item, token).then(newItem => {
        this.setState(prevState => ({
          items: [...prevState.items, newItem]
        }));
      })
    })
  }

  updateDeleteItem = (item, action) => {
    AuthService.getToken().then(token => {
      if(action === 'PUT'){
        put(`operation_type/${item.id}/`, item, token).then(updatedItem => {
          const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
          const newArray = [
            ...this.state.items.slice(0, itemIndex),
            updatedItem,
            ...this.state.items.slice(itemIndex + 1)
          ]
          this.setState({ items: newArray });
        });
      }
      else{
        del(`operation_type/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    })
  }

  componentDidMount(){
    AuthService.getToken().then(token => {
      get("operation_type/", token).then(items => {
        this.setState({items: items});
      })
    });
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Tipi di Operazione" openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName="Tipo di Operazione"
                  items={this.state.items}
                  fields={this.fields}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem}
                  detailLabel = "Vedi tutti"
                  detailAction={this.goToOperation}
                  variable={true}/>
      </View>
    );
  }
};


export default OperationTypeScreen;

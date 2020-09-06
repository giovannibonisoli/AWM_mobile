import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';

class BarrelScreen extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'id',
              name: 'Codice Barile',
              type: 'auto',
              notModifiable: true
            },
            {
              field: 'wood_type',
              name: 'Legno',
              type: 'text',
            },
            {
              field: 'capability',
              name: 'Capacità (millilitri)',
              type: 'number',
            }
          ]

  addItem = (item, action) => {
    AuthService.getToken().then(token => {
      item.barrel_set = this.props.route.params.setID;
      post("barrel/", item, token).then(
        this.setState(prevState => ({
          items: [...prevState.items, newItem]
        }))
      )
    })
  }

  updateDeleteItem = (item, action) => {
    AuthService.getToken().then(token => {
      if(action === 'PUT'){
        put(`barrel/${item.id}/`, item, token).then(updatedItem => {
          const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
          const newArray = [
            ...this.state.items.slice(0, itemIndex),
            updatedItem,
            ...this.state.items.slice(itemIndex + 1)
          ]
          this.setState({ items: newArray });
        })
      }
      else{
        del(`barrel/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    })
  }

  getBarrels = () => {
    AuthService.getToken().then(token => {
      get(`barrel/set/${this.props.route.params.setID}/`, token).then(items => {
        this.setState({items: items});
      })
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.route.params.setID !== prevProps.route.params.setID)
      this.getBarrels();
  }

  componentDidMount() {
    this.getBarrels();
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name={`Batteria ${this.props.route.params.setID}`}
                openDrawer={this.props.navigation.openDrawer} />
        <DataList objectName="Barile"
                  items={this.state.items}
                  fields={this.fields}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem}
                  />
      </View>
    );
  }
};

export default BarrelScreen;

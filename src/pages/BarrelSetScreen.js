import React from 'react';
import { StyleSheet, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';


class BarrelSetScreen extends React.Component {
  state = {
    items: []
  }

  fields = [
            {
              field: 'id',
              name: 'Numero Batteria',
              type: 'number',
              notModifiable: true
            },
            {
              field: 'year',
              name: 'Anno',
              type: 'number',
              min: 1984
            }
          ]

  goToDetail = (item) => {
    this.props.navigation.navigate("barrel", {element: item})
  }

  addItem = (item, action) => {
    AuthService.getToken().then(token => {
      post("barrel_set/", item, token).then(newItem => {
        this.setState(prevState => ({
          items: [...prevState.items, newItem]
        }));
      })
    })
  }

  updateDeleteItem = async (item, action) => {
    AuthService.getToken().then(token => {
      if(token){
        if(action === 'PUT'){
          put(`barrel_set/${item.id}/`, item, token).then(updatedItem => {
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
          del(`barrel_set/${item.id}/`, token);
          const updatedItems = this.state.items.filter(el => el.id !== item.id);
          this.setState({ items: updatedItems });
        }
      }
    })
  }

  componentDidMount() {
    AuthService.getToken().then(token => {
      get("barrel_set/", token).then(items => {
        if(token)
          this.setState({items: items});
      })
    })
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Batterie" openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName="Batteria"
                  items={this.state.items}
                  fields={this.fields}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem}
                  detailLabel = "Vai ai Barili"
                  detailAction={this.goToDetail}
                  />
      </View>
    );
  }
};


export default BarrelSetScreen;

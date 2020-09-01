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

  addItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      let newItem = await post("barrel_set/", item, token);
      this.setState(prevState => ({
        items: [...prevState.items, newItem]
      }));
    }

  }

  updateDeleteItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      if(action === 'PUT'){
        let updatedItem = await put(`barrel_set/${item.id}/`, item, token);

        const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
        const newArray = [
          // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
          // add the updated item to the array
          updatedItem,
          // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
        ]
        this.setState({ items: newArray });
      }
      else{
        await del (`barrel_set/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    }
  }

  async componentDidMount() {

    const token = await AuthService.getToken();
    if(token){
      this.setState({items: await get("barrel_set/", token)});
    }
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
                  details={["barrel", "Vai ai Barili"]}
                  />
      </View>
    );
  }
};


export default BarrelSetScreen;

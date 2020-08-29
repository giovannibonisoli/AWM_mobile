import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/smallComponents';
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

  addItem = async (item, action) => {
    let newItem = await request ("barrel_set/", 'POST', item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateDeleteItem = async (item, action) => {
    if(action === 'PUT'){
      let updatedItem = await request (`barrel_set/${item.id}/`, 'PUT', item);

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
      await request (`barrel_set/${item.id}/`, 'DELETE');
      const updatedItems = this.state.items.filter(el => el.id !== item.id);
      this.setState({ items: updatedItems });
    }
  }

  async componentDidMount() {
    this.setState({items: await request("barrel_set/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Batterie" openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName="Batteria"
                  items={this.state.items}
                  fields={this.state.fields}
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

import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
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

  addItem = async (item, action) => {
    item.id = item.name.toLowerCase().replace(/\s/g, '');
    item.schema = JSON.stringify(item.schema);
    let newItem = await request("operation_type/", 'POST', item);
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }));
  }

  updateDeleteItem = async (item, action) => {
    if(action === 'PUT'){
      item.schema = JSON.stringify(item.schema);
      let updatedItem = await request (`operation_type/${item.id}/`, 'PUT', item);

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
      await request (`operation_type/${item.id}/`, 'DELETE');
      const updatedItems = this.state.items.filter(el => el.id !== item.id);
      this.setState({ items: updatedItems });
    }
  }

  async componentDidMount() {
    this.setState({items: await request("operation_type/", 'GET')});
  }

  render () {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name="Tipi di Operazione" openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName="Tipo di Operazione"
                  items={this.state.items}
                  fields={this.state.fields}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem}
                  details={["operation", "Vedi tutti"]}
                  variable={true}/>
      </View>
    );
  }
};


export default OperationTypeScreen;

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

  addItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      item.id = item.name.toLowerCase().replace(/\s/g, '');
      item.schema = JSON.stringify(item.schema);
      let newItem = await post("operation_type/", item, token);
      this.setState(prevState => ({
        items: [...prevState.items, newItem]
      }));
    }
  }

  updateDeleteItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      if(action === 'PUT'){
        item.schema = JSON.stringify(item.schema);
        let updatedItem = await put (`operation_type/${item.id}/`, item, token);

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
        await del (`operation_type/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    }
  }

  async componentDidMount() {
    const token = await AuthService.getToken();
    if(token){
      this.setState({items: await get("operation_type/", token)});
    }
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
                  details={["operation", "Vedi tutti"]}
                  variable={true}/>
      </View>
    );
  }
};


export default OperationTypeScreen;

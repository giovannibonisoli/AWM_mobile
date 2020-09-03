import React from 'react';
import { StyleSheet, Button, View } from 'react-native';

import Header from '../components/Header';
import DataList from '../components/DataList';

import AuthService from '../services/auth.service';
import { get, post, put, del } from '../helpers/requests';
import { serializeFields, deserializeFields } from '../helpers/variableObjects';

class OperationScreen extends React.Component {
  state = {
    items: []
  }

  fixedfields = [
                  {
                    field: 'id',
                    name: `Codice Operazione`,
                    type: 'auto',
                    notModifiable: true
                  },
                  {
                    field: 'date',
                    name: 'Data',
                    type: 'date',
                  },
                  {
                    field: 'barrel',
                    name: 'Barile',
                    type: 'barrel',
                  }
                ]

  objectName = "";


  addItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      let serializedItem = serializeFields(item, this.fixedfields.concat(this.props.route.params.element.schema), this.fixedfields);
      serializedItem.type = this.props.route.params.element.id;
      let newItem = await post(`operation/${this.props.route.params.element.id}/`, serializedItem, token);
      this.setState(prevState => ({
        items: [...prevState.items, deserializeFields(newItem, "values")]
      }))
    }
  }

  updateDeleteItem = async (item, action) => {
    const token = await AuthService.getToken();
    if(token){
      if(action === 'PUT'){
        let serializedItem = serializeFields(item, this.fixedfields.concat(this.props.route.params.element.schema), this.fixedfields);
        serializedItem.type = this.props.route.params.element.id;
        let updatedItem = await put (`operation/${this.props.route.params.element.id}/${item.id}/`, serializedItem, token);

        const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
        const newArray = [
          // destructure all items from beginning to the indexed item
          ...this.state.items.slice(0, itemIndex),
          // add the updated item to the array
          deserializeFields(updatedItem, "values"),
          // add the rest of the items to the array from the index after the replaced item
          ...this.state.items.slice(itemIndex + 1)
          ]
          this.setState({ items: newArray });
      }
      else{
        await del (`operation/${this.props.route.params.element.id}/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    }
  }

  setItems = async () => {
    const token = await AuthService.getToken();
    if(token){
      let items = await get(`operation/${this.props.route.params.element.id}/`, token);
      items = items.map(item => deserializeFields(item, "values"));
      this.setState({items: items});
    }
  }

  async componentDidUpdate(prevProps){
    if(this.props.route.params.element !== prevProps.route.params.element){
      this.setItems();
    }
  }

  async componentDidMount(){
    this.setItems();
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name={this.props.route.params.element.name} openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName={this.props.route.params.element.name}
                  items={this.state.items}
                  fields={this.fixedfields.concat(this.props.route.params.element.schema)}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem} />
      </View>
    )
  }
}


export default OperationScreen;

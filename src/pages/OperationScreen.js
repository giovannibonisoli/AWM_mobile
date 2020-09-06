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
      let serializedItem = serializeFields(item, this.fixedfields.concat(this.props.route.params.operation.schema), this.fixedfields);
      serializedItem.type = this.props.route.params.operation.id;
      let newItem = await post(`operation/${this.props.route.params.operation.id}/`, serializedItem, token);
      this.setState(prevState => ({
        items: [...prevState.items, deserializeFields(newItem, "values")]
      }))
    }
  }

  updateDeleteItem = (item, action) => {
    AuthService.getToken().then(token => {
      if(action === 'PUT'){
        let serializedItem = serializeFields(item,
                                              this.fixedfields.concat(this.props.route.params.operation.schema),
                                              this.fixedfields);
        serializedItem.type = this.props.route.params.operation.id;
        put (`operation/${this.props.route.params.operation.id}/${item.id}/`, serializedItem, token)
        .then(updatedItem => {
          const itemIndex = this.state.items.findIndex(data => data.id === updatedItem.id);
          const newArray = [
            ...this.state.items.slice(0, itemIndex),
            deserializeFields(updatedItem, "values"),
            ...this.state.items.slice(itemIndex + 1)
            ]
            this.setState({ items: newArray });
        })
      }
      else{
        del(`operation/${this.props.route.params.operation.id}/${item.id}/`, token);
        const updatedItems = this.state.items.filter(el => el.id !== item.id);
        this.setState({ items: updatedItems });
      }
    })
  }

  setItems = () => {
    AuthService.getToken().then(token => {
      get(`operation/${this.props.route.params.operation.id}/`, token).then(items => {
        items = items.map(item => deserializeFields(item, "values"));
        this.setState({items: items});
      })
    })
  }

  componentDidUpdate(prevProps){
    if(this.props.route.params.operation !== prevProps.route.params.operation){
      this.setItems();
    }
  }

  componentDidMount(){
    this.setItems();
  }

  render() {
    return (
      <View style={{width: '100%', height: '100%'}}>
        <Header name={this.props.route.params.operation.name} openDrawer={this.props.navigation.openDrawer}/>
        <DataList objectName={this.props.route.params.operation.name}
                  items={this.state.items}
                  fields={this.fixedfields.concat(this.props.route.params.operation.schema)}
                  navigate={this.props.navigation.navigate}
                  addAction={this.addItem}
                  updateDeleteAction={this.updateDeleteItem} />
      </View>
    )
  }
}


export default OperationScreen;

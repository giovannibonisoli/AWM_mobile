import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-community/picker';

import { AntDesign } from '@expo/vector-icons';

import { Header, CustomInput, DisabledInput, IconButton } from '../components/smallComponents';
import DataList from '../components/DataList';
import { validate, alertError } from '../helpers/FormValidation';

class VariableDetailScreen extends React.Component {
  state = {
    schema: [{ field:"", name: "", type: ""}]
  }

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
  }

  handleShareholderNameChange = (idx, text) => {
    const newSchema= this.state.schema.map((field, sidx) => {
      if (idx !== sidx) {return field}
      else {
        if(this.props.item){
          return { ...field, name: text};
        }
        return { ...field, name: text, field: e.target.value.toLowerCase().replace(/\s+/g, '')};
      }
    });

    this.setState({ schema: newSchema });
  };

  handleShareholderTypeChange = (idx, text) => {
    const newSchema = this.state.schema.map((field, sidx) => {
      if (idx !== sidx) return field;
      return { ...field, type: text };
    });

    this.setState({ schema: newSchema });
  };

  handleAddShareholder = () => {
    this.setState({
      schema: this.state.schema.concat([{field:"", name: "", type: ""}])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      schema: this.state.schema.filter((s, sidx) => idx !== sidx)
    });
  };

  handleSubmit = () => {
    this.props.action({
      id : this.state.id,
      name: this.state.name,
      description: this.state.description,
      schema: this.state.schema
    });
  };

  componentDidUpdate(prevProps){
    if(this.props.route.params.item !== prevProps.route.params.item){
      if (this.props.route.params.item === undefined){
        this.setState({
          id : "",
          name: "",
          description: "",
          schema: []
        });
      }
      else{
        this.setState({
          id : this.props.route.params.item.id,
          name: this.props.route.params.item.name,
          description: this.props.route.params.item.description,
          schema: JSON.parse(this.props.route.params.item.schema)
        });
      }
    }
  }

  componentDidMount(){
    if(this.props.route.params.item){
      this.setState({
        id : this.props.route.params.item.id,
        name: this.props.route.params.item.name,
        description: this.props.route.params.item.description,
        schema: JSON.parse(this.props.route.params.item.schema)
      });
    }
  }

  render(){
    const item = this.props.route.params.item;
    const fields = this.props.route.params.fields;
    return (<View style={{padding: 20, flex: 1}}>
              <IconButton style={{paddingBottom: 20}} iconName="close" onPress={() => this.props.navigation.goBack()}/>
              <View style={{alignItems: 'center', flexDirection:'row', paddingBottom: 10}}>
                <Text style={styles.title}>
                  {this.props.route.params.title}
                </Text>
              </View>
              {item ? (<DisabledInput name="Nome" value={this.state.name}/>)
                    : (<CustomInput field={{field: "name", name: "Nome"}}
                                    value={`${this.state.name ? this.state.name : ''}`}
                                    onChangeText={this.onChangeTextHandler} labeled/>)}

              <CustomInput style={{paddingTop: 20}}
                            field={{field: "description", name: "Descrizione"}}
                            value={`${this.state.description ? this.state.description : ''}`}
                            onChangeText={this.onChangeTextHandler} labeled/>

              {this.state.schema.map((field, idx) => (
                <View key={idx} style={{flexDirection:"row", paddingTop: 20}}>
                  <CustomInput style={{width: '45%', paddingRight: 10}}
                                field={field}
                                value={`${field.name ? field.name : ''}`}
                                onChangeText={(field, text) => this.handleShareholderNameChange(idx, text)}/>
                  <CustomInput style={{width: '45%', paddingRight: 10}}
                                field={{type: "select", options: [
                                                                  {label: "testo", value: "text"},
                                                                  {label: "numero", value: "number"},
                                                                  {label: "barile", value: "barrel"}
                                                                ]}}
                                value={`${field.type ? field.type : ''}`}
                                onChangeText={(field, text) => this.handleShareholderTypeChange(idx, text)}/>
                  <IconButton style={{justifyContent: 'center'}}
                              iconName="minus"
                              onPress={this.handleRemoveShareholder(idx)}/>

                </View>
              ))}
              <IconButton style={{paddingTop: 20}} iconName="plus" onPress={this.handleAddShareholder}/>
            </View>);
  }

};

const styles = {
  title: {
    fontWeight:"bold",
    fontSize: 30,
    color:"#000",
  },


};

export default VariableDetailScreen;

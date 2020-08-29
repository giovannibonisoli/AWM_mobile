import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

import {CustomInput, DisabledInput, IconButton } from '../components/smallComponents';
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
        return { ...field, name: text, field: text.toLowerCase().replace(/\s+/g, '')};
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

  submitForm = (action) => {
      this.props.route.params.action({
        id : this.state.id,
        name: this.state.name,
        description: this.state.description,
        schema: this.state.schema
      }, action);
      this.props.navigation.goBack();
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
    console.log(this.props.route.params.detail);
    return (<ScrollView style={styles.container}>
              <IconButton style={{paddingBottom: 20}} iconName="close" onPress={() => this.props.navigation.goBack()}/>
              <View style={{alignItems: 'center', flexDirection:'row', paddingBottom: 10}}>
                <Text style={styles.title}>
                  {`${this.props.route.params.title} "${this.state.name}"`}
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
              {this.props.route.params.item ?
                (<View>
                  <View style={styles.footerView}>
                    <IconButton iconName="check" label="Modifica" onPress={() => this.submitForm('PUT')}/>
                    <IconButton iconName="delete" label="Elimina" onPress={() => {
                                                                                  Alert.alert(
                                                                                            'Conferma',
                                                                                            'Sicuro di voler procedere?',
                                                                                            [
                                                                                              {text: 'Yes', onPress: () => this.submitForm('DELETE')},
                                                                                              {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
                                                                                            ],
                                                                                            { cancelable: false }
                                                                                            );
                                                                                  }}/>
                  </View>
                  <View style={styles.footerView}>
                    {this.props.route.params.details ?
                      (<IconButton iconName="arrowright"
                                    label={this.props.route.params.details[1]}
                                    onPress={() => this.props.navigation.navigate(this.props.route.params.details[0],
                                                                                  {operationID: this.props.route.params.item.id,
                                                                                    operationName: this.props.route.params.item.name })}/>
                          ) : (<View></View>)}
                  </View>
                </View>)
                :
                (<View style={{...styles.footerView}}>
                  <IconButton iconName="check" label="Aggiungi" onPress={() => this.submitForm('ADD')}/>
                </View>)}
            </ScrollView>);
  }

};

const styles = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40
  },

  title: {
    alignItems: 'center',
    fontWeight:"bold",
    fontSize: 30,
    color:"#000",
  },

  footerView: {
    flexDirection:"row",
    justifyContent: 'center',
    paddingTop: 20
  }


};

export default VariableDetailScreen;

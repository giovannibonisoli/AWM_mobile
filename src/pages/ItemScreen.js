import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';

import FormButtons from '../components/FormButtons';
import CustomInput from '../components/CustomInput';
import IconButton from '../components/IconButton';
import { validate, validateSchema } from '../helpers/FormValidation';

class ItemScreen extends React.Component {
  state = {}

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
  }

  handleShareholderNameChange = (idx, text) => {
    const newSchema= this.state.schema.map((field, sidx) => {
      if (idx !== sidx) {return field}
      else {
        if(this.props.route.params.item){
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

  handleRemoveShareholder = idx => {
    this.setState({
      schema: this.state.schema.filter((s, sidx) => idx !== sidx)
    });
  };

  submitForm = (action) => {
    let validation = true;

    if(this.props.route.params.variable){
      validation = validation && validateSchema(this.state.schema);
    }

    let valfields = this.props.route.params.fields.filter(field => field.notModifiable !== true);

    validation = validation && validate(valfields, this.state);
    if(validation){
      this.props.route.params.action(Object.assign({}, this.state), action);
      this.props.navigation.goBack();
    }
  };

  initializeState = () => {
    if (this.props.route.params.item === undefined){
      if (this.props.route.params.variable)
        this.setState({schema: [{ field:"", name: "", type: ""}]})
      else
        this.setState({schema: undefined})
    }
    else {
      Object.keys(this.props.route.params.item).forEach(key => {
        this.setState({[key]: this.props.route.params.item[key]});
      });
      if (this.props.route.params.variable){
      }
    }
  }

  resetState = () => {
    Object.keys(this.state).forEach(key => {
        this.setState({[key]: undefined})
    });
  }

  componentDidUpdate(prevProps){
    if(this.props.route.params.item !== prevProps.route.params.item){
      this.resetState();
      this.initializeState();
    }
  }

  componentDidMount(){
    this.initializeState();
  }

  render(){
    const variable = (this.props.route.params.variable === true) && (this.state.schema !== undefined)
    return (<ScrollView style={styles.container}>
              <IconButton iconName="close" onPress={() => this.props.navigation.goBack()}/>
              <View style={{alignItems: 'center', flexDirection:'row', paddingTop: 20}}>
                <Text style={styles.title}>
                  {`${this.props.route.params.title} `}
                </Text>
              </View>
              {this.props.route.params.fields.map((field, i) => {
                if(this.props.route.params.item !== undefined || field.type !== "auto")
                  return (
                    <CustomInput key={i}
                                  style={{paddingTop: 20}}
                                  field={field}
                                  value={`${this.state[field.field] ? this.state[field.field] : ''}`}
                                  onChangeText={this.onChangeTextHandler}
                                  disabled={this.props.route.params.item !== undefined && field.notModifiable}
                                  labeled/>)
              })}
              {variable && (
              <View>
                {this.state.schema.map((field, idx) => (
                    <View key={idx} style={{flexDirection:"row", paddingTop: 20}}>
                      <CustomInput style={{width: '45%', paddingRight: 10}}
                                    field={{type: "default" }}
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
                                  onPress={() => this.handleRemoveShareholder(idx)}/>
                    </View>)
                )}
                <IconButton style={{paddingTop: 20}} iconName="plus" onPress={this.handleAddShareholder}/>
              </View>)}
              {this.props.route.params.item ?
                (<FormButtons updateAction={() => this.submitForm('PUT')}
                              deleteAction={() => this.submitForm('DELETE')}
                              detailLabel={this.props.route.params.detailLabel}
                              detailAction={() => this.props.route.params.detailAction(this.props.route.params.item)}/>) :
                (<IconButton style={styles.footerView}
                              iconName="check"
                              label="Aggiungi"
                              onPress={() => this.submitForm('ADD')}/>
                )}
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

export default ItemScreen;

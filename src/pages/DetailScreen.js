import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import { Header, CustomInput, DisabledInput, IconButton } from '../components/smallComponents';
import DataList from '../components/DataList';
import { validate } from '../helpers/FormValidation';

class DetailScreen extends React.Component {
  state = {}

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
  }

  submitForm = (action) => {
    if(validate(this.props.route.params.fields, this.state)){
      this.props.route.params.action(this.state, action);
      this.props.navigation.goBack();
    }
  }

  componentDidUpdate(prevProps){
    if(this.props.route.params.item !== prevProps.route.params.item){
      if (this.props.route.params.item === undefined){
        Object.keys(this.state).forEach(key => {
          this.setState({[key]: undefined});
        });
      }
      else{
        Object.keys(this.props.route.params.item).forEach(key => {
          this.setState({[key]: this.props.route.params.item[key]});
        });
      }
    }
  }

  componentDidMount(){
    if (this.props.route.params.item){
      Object.keys(this.props.route.params.item).forEach(key => {
        this.setState({[key]: this.props.route.params.item[key]});
      });
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <IconButton iconName="close" onPress={() => this.props.navigation.goBack()}/>
        <View style={{alignItems: 'center', flexDirection:'row', paddingTop: 20}}>
          <Text style={styles.title}>
            {this.props.route.params.title}
          </Text>
        </View>
        {this.props.route.params.fields.map((field, i) => {
          if (this.props.route.params.item !== undefined & !field.modifiable)
            return (<DisabledInput key={i}
                                    style={{paddingTop: 20}}
                                    name={field.name}
                                    value={this.state[field.field]}/>)
          else
            return (<CustomInput key={i}
                                  style={{paddingTop: 20}}
                                  field={field}
                                  value={`${this.state[field.field] ? this.state[field.field] : ''}`}
                                  onChangeText={this.onChangeTextHandler}
                                  labeled/>)
        })}
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
                                                                            {setID: this.props.route.params.item.id })}/>
                    ) : (<View></View>)}
            </View>
          </View>)
          :
          (<View style={styles.footerView}>
            <IconButton iconName="check" label="Aggiungi" onPress={() => this.submitForm('ADD')}/>
          </View>)}
      </View>
    )}
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
    color:"#000"
  },
  footerView: {
    flexDirection:"row",
    justifyContent: 'center',
    paddingTop: 20
  }
};

export default DetailScreen;

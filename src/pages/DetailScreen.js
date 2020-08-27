import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import DataList from '../components/DataList';
import { request } from '../helpers/requests';


class DetailScreen extends React.Component {
  state = {}

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
    console.log(this.state);
  }

  componentDidUpdate(prevProps){
    if(this.props.route.params.item &&
        this.props.route.params.item !== prevProps.route.params.item){
      Object.keys(this.props.route.params.item).forEach(key => {
        this.setState({[key]: this.props.route.params.item[key]});
      });
    }
  }

  render () {
    return (
      <View>
        <View style={{padding: 20, flexDirection:"row"}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            {`Modifica ${this.props.route.params.title}`}
          </Text>
        </View>
        {this.props.route.params.fields.map((field, i) => (
          <View style={{paddingHorizontal: 20}} key={i}>
            <Text style={{color: 'black', fontWeight: "bold", padding: 10, fontSize: 17}}>
              {field.name}
            </Text>
            {field.modifiable ? (<View style={{...styles.inputView, backgroundColor: 'white'}} >
                                    <TextInput
                                      style={styles.inputText}
                                      placeholder={field.field}
                                      placeholderTextColor="#003f5c"
                                      value={`${this.state[field.field]}`}
                                      onChangeText={text => this.onChangeTextHandler(field.field, text)} />
                                 </View>)
                              : (<View style={{...styles.inputView, backgroundColor: 'lightgray'}} >
                                  <Text>
                                    {this.state[field.field]}
                                  </Text>
                                 </View>)}
          </View>
        ))}
        <View style={{padding: 20, flexDirection:"row", justifyContent: 'center'}}>
          <TouchableOpacity style={{flexDirection:"row", padding: 20}} onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="check" size={24} color="black" />
            <Text style={{color: 'black', fontWeight: "bold", fontSize: 17, paddingHorizontal: 10}}>
              Modifica
            </Text>
          </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:"row", padding: 20}} onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="delete" size={24} color="black" />
              <Text style={{color: 'black', fontWeight: "bold", fontSize: 17, paddingHorizontal: 10}}>
                Elimina
              </Text>
            </TouchableOpacity>
        </View>
        <View style={{padding: 20, flexDirection:"row", justifyContent: 'center'}}>
          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.props.navigation.goBack()}>
            <MaterialIcons name="details" size={24} color="black" />
            <Text style={{color: 'black', fontWeight: "bold", fontSize: 17, paddingHorizontal: 10}}>
              Vai ai Barili
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = {
  inputText: {
    color:"#000",
    fontSize: 17
  },

  inputView:  {
    width: "100%",
    borderWidth: 1,
    borderRadius:15,
    justifyContent:"center",
    padding: 20,
  },

  title: {
    fontWeight:"bold",
    fontSize: 30,
    color:"#000",
    marginBottom: 10
  },

};

export default DetailScreen;

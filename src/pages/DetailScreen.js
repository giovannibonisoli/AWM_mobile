import React from 'react';
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

import Header from '../components/Header';
import DataList from '../components/DataList';

class DetailScreen extends React.Component {
  state = {}

  onChangeTextHandler = (field, text) => {
    this.setState({[field]: text});
    console.log(this.state);
  }

  updateItem = () => {
    this.props.route.params.action(this.state);
    this.props.navigation.goBack();
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
      <View style={{padding: 20}}>
        <View style={{flexDirection:"row", paddingBottom: 10}}>
          <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.title}>
            {this.props.route.params.title}
          </Text>
        </View>
        {this.props.route.params.fields.map((field, i) => {
          if (this.props.route.params.item !== undefined & !field.modifiable){
            return (<View>
                      <Text style={styles.inputLabel}>{field.name}</Text>
                      <View key={i} style={{...styles.inputView, backgroundColor: 'lightgray'}} >
                        <Text style={styles.inputText}>{this.state[field.field]}</Text>
                      </View>
                    </View>)
          }
          else{
            return (<View>
                      <Text style={styles.inputLabel}>{field.name}</Text>
                      <View key={i} style={{...styles.inputView, backgroundColor: 'white'}} >
                        <TextInput style={styles.inputText}
                                    placeholder={field.name}
                                    placeholderTextColor="#003f5c"
                                    value={`${this.state[field.field] ? this.state[field.field] : ''}`}
                                    onChangeText={text => this.onChangeTextHandler(field.field, text)} />
                      </View>
                    </View>)
          }
        })}
        <View style={styles.footerView}>
          <TouchableOpacity style={{flexDirection:"row", padding: 20}} onPress={this.updateItem}>
            <AntDesign name="check" size={24} color="black" />
            <Text style={styles.buttonText}>
              Modifica
            </Text>
          </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:"row", padding: 20}} onPress={() => this.props.navigation.goBack()}>
              <AntDesign name="delete" size={24} color="black" />
              <Text style={styles.buttonText}>
                Elimina
              </Text>
            </TouchableOpacity>
        </View>
        <View style={styles.footerView}>
          <TouchableOpacity style={{flexDirection:"row"}} onPress={() => this.props.navigation.goBack()}>
            <AntDesign name="arrowright" size={24} color="black" />
            <Text style={styles.buttonText}>
              Vai ai Barili
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
};

const styles = {

  title: {
    fontWeight:"bold",
    fontSize: 30,
    color:"#000",
  },

  inputLabel: {
    color:"#000",
    fontSize: 17,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingBottom: 10
  },

  inputView:  {
    width: "100%",
    borderWidth: 1,
    borderRadius:15,
    justifyContent:"center",
  },

  inputText: {
    color:"#000",
    fontSize: 17,
    padding: 20
  },

  footerView: {
    flexDirection:"row",
    justifyContent: 'center',
    paddingTop: 20
  },

  buttonText: {
    color: 'black',
    fontWeight: "bold",
    fontSize: 17,
    paddingHorizontal: 10
  }
};

export default DetailScreen;

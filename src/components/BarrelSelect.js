import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity,
          Text, Alert, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

import IconButton from './IconButton';
import CustomInput from './CustomInput';

import { request } from '../helpers/requests';

class BarrelSelect extends React.Component {
  state = {
    modalVisible: false,
    sets: [],
    barrels: [],
    selectedSet: null,
    selectedBarrel: null
  }

  showModal = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  }

  submitBarrel = () => {
    this.props.onChange(this.state.selectedBarrel);
    this.showModal();
  }

  async componentDidMount (){
    this.setState({
      sets: await request("barrel_set/", 'GET'),
      barrels: await request("barrel/", 'GET')
    });
  }

  componentDidUpdate(prevProps) {
    if(this.state.barrels.length !== 0){
      if(this.props.value){
        if(this.props.value !== prevProps.value || this.state.selectedBarrel === null){
          const item = this.state.barrels.filter(barrel => barrel.id === this.props.value)[0];
          this.setState({
                          selectedSet: item.barrel_set,
                          selectedBarrel: item.id
                        });
        }
      }
      else{
        if(this.state.selectedSet == null && this.state.selectedBarrel){
          this.setState({
                          selectedSet: this.state.barrels[0].barrel_set,
                          selectedBarrel: this.state.barrels[0].id
                        });
        }
      }
    }
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={this.showModal}>
            <CustomInput style={{width: '45%', PaddingTop: 20}}
                          field={{
                                  name: "Batteria",
                                  type: "select",
                                  options: this.state.sets.map((set, i) => ({
                                                                              label: set.id.toString(),
                                                                              value: set.id
                                                                            }))
                                }}
                          onChangeText={(field, value) => {this.setState({selectedSet: value})}}
                          value={this.state.selectedSet}
                          labeled />
            <CustomInput style={{width: '45%', PaddingTop: 20}}
                          field={{
                                  name: "Barile",
                                  type: "select",
                                  options: this.state.barrels.filter(barrel => barrel.barrel_set === this.state.selectedSet)
                                  .map((barrel, i) => ({
                                                          label: barrel.id,
                                                          value: barrel.id
                                                        }))
                                }}
                          value={this.state.selectedBarrel}
                          onChangeText={(field, value) => {this.setState({selectedBarrel: value})}}
                          labeled/>

            <IconButton iconName="check" label="Modifica" onPress={this.submitBarrel}/>
        </Modal>
        <TouchableOpacity style={{...styles.inputView, backgroundColor: 'white'}} onPress={this.showModal}>
          <Text style={styles.inputText}>{this.props.value}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default BarrelSelect;

const styles = StyleSheet.create({
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
  }
});

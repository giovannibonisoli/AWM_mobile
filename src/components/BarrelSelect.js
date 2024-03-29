import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity,
          Text, Alert, Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-community/picker';

import IconButton from './IconButton';

import AuthService from '../services/auth.service';
import { get } from '../helpers/requests';

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
    const token = await AuthService.getToken();
    if(token){
      this.setState({
        sets: await get("barrel_set/", token),
        barrels: await get("barrel/", token)
      });
      this.setState({
                      selectedSet: this.state.barrels[0].barrel_set,
                      selectedBarrel: this.state.barrels[0].id
                    });
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.value && this.state.barrels.length !== 0){
      if(this.props.value !== prevProps.value){
        const item = this.state.barrels.filter(barrel => barrel.id === this.props.value)[0];
        this.setState({
                        selectedSet: item.barrel_set,
                        selectedBarrel: item.id
                      });
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

          <Text style={styles.inputLabel}>Batteria</Text>
          <View style={{...styles.inputView, backgroundColor: 'white'}}>
            <Picker style={{color:"#000", fontSize: 17, padding: 34}}
                    selectedValue={this.state.selectedSet}
                    onValueChange={(value, index) => this.setState({selectedSet: value})}>
                    {this.state.sets.map((set, i) => (<Picker.Item key={i} label={set.id.toString()} value={set.id} />))}
            </Picker>
          </View>
          <Text style={styles.inputLabel}>Barile</Text>
          <View style={{...styles.inputView, backgroundColor: 'white'}}>
            <Picker style={{color:"#000", fontSize: 17, padding: 34}}
                    selectedValue={this.state.selectedBarrel}
                    onValueChange={(value, index) => this.setState({selectedBarrel: value})}>
                    {this.state.barrels.filter(barrel => barrel.barrel_set === this.state.selectedSet)
                    .map((barrel, i) => (<Picker.Item key={i} label={barrel.id.toString()} value={barrel.id} />))}
             </Picker>
          </View>
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

import React from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import CustomInput from '../components/CustomInput';
import IconButton from '../components/IconButton';
import { validate, validateSchema } from '../helpers/FormValidation';

class FormButtons extends React.Component {

  handleDeleteAction = () => {
    Alert.alert(
                  'Conferma',
                  'Sicuro di voler procedere?',
                  [
                    {text: 'Yes', onPress: this.props.deleteAction},
                    {text: 'No', onPress: () => console.log('No Pressed')},
                  ],
                  { cancelable: false }
                );
  }

  render(){
    return(<View>
            <View style={styles.footerView}>
              <IconButton style={{paddingRight: 20}}
                          iconName="check"
                          label="Modifica"
                          onPress={this.props.updateAction}/>
              <IconButton iconName="delete"
                          label="Elimina"
                          onPress={this.handleDeleteAction}/>
            </View>
            <View style={styles.footerView}>
            {this.props.detailLabel &&
              (<IconButton iconName="arrowright"
                            label={this.props.detailLabel}
                            onPress={this.props.detailAction}/>
              )}
            </View>
          </View>)
  }
};

const styles = {
  footerView: {
    flexDirection:"row",
    justifyContent: 'center',
    paddingTop: 20
  }
};

export default FormButtons;

import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert } from 'react-native';

import { CustomInput} from '../components/smallComponents';
import AuthService from '../services/auth.service';
import { validate, alertError } from '../helpers/FormValidation';


class LogoutScreen extends React.Component {
  handleLogout = () => {
    AuthService.logout();
    this.props.navigation.navigate('login');
  }
  render () {
    return (
      <View style={styles.container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.logo}>Sicuro di voler uscire?</Text>
        </View>

        <TouchableOpacity style={styles.loginBtn} onPress={this.handleLogout}>
          <Text style={styles.loginText}>Sì</Text>
        </TouchableOpacity>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  logo: {
    fontWeight:"bold",
    fontSize: 50,
    color:"#000",
  },

  loginText: {
    color: "white",
    fontSize: 17
  },

  loginBtn:{
    width:"100%",
    color: "#fff",
    backgroundColor:"#3366ff",
    borderRadius: 15,
    height: 50,
    alignItems:"center",
    justifyContent:"center",
    marginTop: 40,
    marginBottom: 10
  },
});


export default LogoutScreen;

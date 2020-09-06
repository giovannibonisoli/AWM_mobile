import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Texts, Image } from 'react-native';

import Header from '../components/Header';
import CustomInput from '../components/CustomInput';

class ProfileScreen extends React.Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
  }

  fields = [
            {
              field: 'first_name',
              name: 'Nome',
              type: 'text'
            },
            {
              field: 'last_name',
              name: 'Cognome',
              type: 'text'
            },
            {
              field: 'email',
              name: 'Email',
              type: 'text'
            }
          ]

  render () {
    return (
      <View>
        <Header name="Informazioni Utente" openDrawer={this.props.navigation.openDrawer}/>
        <View style={{padding: 20}}>
          <View style={{alignItems: 'center'}}>
            <Image source={require("../static/user.png")} style={styles.profileImg}/>
          </View>
          {this.fields.map((field, i) => (
            <CustomInput key={i}
                          style={{paddingTop: 20}}
                          field={field}
                          value={`${this.props.route.params ? this.props.route.params.user[field.field] : ''}`}
                          onChangeText={this.onChangeTextHandler} disabled labeled/>
          ))}
        </View>
      </View>
    );
  }
}

export default ProfileScreen;

const styles = {
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 40
  },

  profileImg: {
    width: 120,
    height: 120,
    marginTop: 20,
  },

  sidebarDivider:{
    height: 1,
    width: "100%",
    backgroundColor: "lightgray",
    marginVertical: 10
  },

  listItem:{
    height:60,
    alignItems:"center",
    flexDirection:"row",
  },

  title:{
      fontSize:18,
      marginLeft:20
  }
}

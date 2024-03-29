import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AuthService from '../services/auth.service';

const Item = ({ item, navigate }) => {

  return (
    <TouchableOpacity style={styles.listItem} onPress={()=> navigate(item.name)}>
      {item.icon}
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {

  render () {
    return (
      <View>
        <TouchableOpacity style={{alignItems: 'center'}}
                          onPress={() => this.props.navigation.navigate('profile', {user: this.props.user})}>
          <Image source={require("../static/user.png")} style={styles.profileImg}/>
          <Text style={{fontWeight:"bold", fontSize: 16, marginTop: 10}}>
            {this.props.user.username}
          </Text>
        </TouchableOpacity>
        <View style={styles.sidebarDivider}></View>

        <FlatList
          style={{width:"100%", marginLeft:30}}
          data={this.props.routes}
          renderItem={({ item }) => <Item item={item} navigate={this.props.navigation.navigate}/>}
          keyExtractor={item => item.name}
        />
      </View>

    );
  }
};

const styles = {
  profileImg: {
    width: 80,
    height: 80,
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

export default Sidebar;

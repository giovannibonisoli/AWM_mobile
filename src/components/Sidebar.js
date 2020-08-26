import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, navigate }) => {

  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Image source={item.icon} style={{width: '10%', height: '56%'}}/>
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {

  render () {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Image source={require("../static/user.png")} style={styles.profileImg}/>
          <Text style={{fontWeight:"bold", fontSize: 16, marginTop: 10}}>{this.props.username}</Text>
        </View>
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

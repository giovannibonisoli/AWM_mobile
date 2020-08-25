import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Item = ({ item, navigate }) => {
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=>navigate(item.name)}>
      <Ionicons name={item.icon} size={32} />
      <Text style={styles.title}>{item.name}</Text>
    </TouchableOpacity>
  );
}

class Sidebar extends React.Component {
  state = {
      routes:[
          {
              name:"Home",
              icon:"ios-home"
          },
          {
              name:"Profile",
              icon:"ios-contact"
          },
          {
              name:"Settings",
              icon:"ios-settings"
          },
      ]
  }


  render () {
    return (
      <View>
        <View style={{alignItems: 'center'}}>
          <Image style={styles.profileImg}/>
          <Text style={{fontWeight:"bold", fontSize:16, marginTop: 10}}>Janna Doe</Text>
          <Text style={{color:"gray", marginBottom:10 }}>janna@doe.com</Text>
        </View>
        <View style={styles.sidebarDivider}></View>

        <FlatList
          style={{width:"100%",marginLeft:30}}
          data={this.state.routes}
          renderItem={({ item }) => <Item  item={item} navigate={this.props.navigation.navigate}/>}
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
    borderRadius: 40,
    marginTop: 20,
    borderColor: "#20232a",
    borderWidth: 1,
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

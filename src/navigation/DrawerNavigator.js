import * as React from 'react';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import ProfileScreen from '../pages/ProfileScreen';
import BarrelSetScreen from '../pages/BarrelSetScreen';
import BarrelScreen from '../pages/BarrelScreen';
import OperationTypeScreen from '../pages/OperationTypeScreen';
import OperationScreen from '../pages/OperationScreen';
import ItemScreen from '../pages/ItemScreen';
import LogoutScreen from '../pages/LogoutScreen';
import Sidebar from '../components/Sidebar';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  state = {
    routes:[
        {
          name: "barrelSet",
          title: "Batterie e Barili",
          component: BarrelSetScreen,
          sidebar: true,
          icon: <Image source={require("../static/barrel.png")} style={{width: '10%', height: '56%'}}/>
        },
        {
          name: "barrel",
          title: "Barili",
          component: BarrelScreen,
          sidebar: false
        },
        {
          name: "operationType",
          title: "Tipi di Operazione",
          component: OperationTypeScreen,
          sidebar: true,
          icon: <Image source={require("../static/operation.png")} style={{width: '10%', height: '56%'}}/>
        },
        {
          name: "operation",
          title: "",
          component: OperationScreen,
          sidebar: false
        },
        {
          name: "item",
          title: "",
          component: ItemScreen,
          sidebar: false
        },
        {
          name: "logout",
          title: "Esci",
          component: LogoutScreen,
          sidebar: true,
          icon: <MaterialCommunityIcons name="logout" size={24} color="black" />
        },
        {
          name: "profile",
          title: "Profilo",
          component: ProfileScreen,
          sidebar: false
        }
    ]
  }
  render(){
    return (
      <Drawer.Navigator drawerContent={props => (<Sidebar {...props} user={this.props.route.params.user}
                                                                    routes={this.state.routes.filter(route => {
                                                                              return route.sidebar === true;
                                                                            })} />) }>
        {this.state.routes.map((route, i) => (
          <Drawer.Screen
            key={i}
            name={route.name}
            component={route.component}
            options={{
              title: route.title
            }}/>
        ))}
      </Drawer.Navigator>
    )
  }
}

export default DrawerNavigator;

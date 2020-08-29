import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import BarrelSetScreen from '../pages/BarrelSetScreen';
import BarrelScreen from '../pages/BarrelScreen';
import OperationTypeScreen from '../pages/OperationTypeScreen';
import OperationScreen from '../pages/OperationScreen';
import DetailScreen from '../pages/DetailScreen';
import VariableDetailScreen from '../pages/VariableDetailScreen';
import Sidebar from '../components/Sidebar';

const Drawer = createDrawerNavigator();

class DrawerNavigator extends React.Component {
  state = {
    routes:[
        {
          name: "barrelSet",
          title: "Batterie e Barili",
          component: BarrelSetScreen,
          show: true,
          icon: require("../static/barrel.png")
        },
        {
          name: "barrel",
          title: "Barili",
          component: BarrelScreen,
          show: false
        },
        {
          name: "operationType",
          title: "Tipi di Operazione",
          component: OperationTypeScreen,
          show: true,
          icon: require("../static/operation.png")
        },
        {
          name: "operation",
          title: "",
          component: OperationScreen,
          show: false
        },
        {
          name: "detail",
          title: "",
          component: DetailScreen,
          show: false
        },
        {
          name: "operationDetail",
          title: "",
          component: VariableDetailScreen,
          show: false
        },

    ]
  }
  render(){
    return (
      <Drawer.Navigator drawerContent={props => (<Sidebar {...props} username={this.props.route.params.username}
                                                                    routes={this.state.routes.filter(route => {
                                                                              return route.show === true;
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

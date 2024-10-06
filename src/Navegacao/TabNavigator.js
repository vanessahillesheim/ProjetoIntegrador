import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../Telas/Menu';
import ListaCorridas from '../Telas/ListaCorridas';
import Calendario from '../Telas/Calendario';
import PerfilUsuario from '../Telas/PerfilUsuario';
import CadastroCorrida from '../Telas/CadastroCorrida';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#12B1F5',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: true,
        tabBarLabelPosition: 'below-icon'
      }}
    >
      <Tab.Screen
        name="Menu"
        component={Menu}
        options={{
          tabBarIcon: () => <Icon name='bars' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Todas Corridas"
        component={ListaCorridas}
        options={{
          tabBarIcon: () => <Icon name='list' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Nova Corrida"
        component={CadastroCorrida}
        options={{
          tabBarIcon: () => <Icon name='running' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
      
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarIcon: () => <Icon name='calendar-check' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
   <Tab.Screen
        name="PerfilUsuariio"
        component={PerfilUsuario}
        options={{
          tabBarIcon: () => <Icon name='user' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
     
     
    </Tab.Navigator>
  );
}

export default TabNavigator;

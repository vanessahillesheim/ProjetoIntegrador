import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from '../Telas/Menu';
import ListaCorridas from '../Telas/ListaCorridas';
import Calendario from '../Telas/Calendario';
import DetalhesCorridas from '../Telas/DetalhesCorridas';
import DiaNoite from '../Telas/DiaNoite';
import AtualizacaoUsuario from '../Telas/AtualizacaoUsuario';

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
        name="ListaCorridas"
        component={ListaCorridas}
        options={{
          tabBarIcon: () => <Icon name='list' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
      <Tab.Screen
        name="Calendario"
        component={Calendario}
        options={{
          tabBarIcon: () => <Icon name='info-circle' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />

     
       <Tab.Screen
        name="Atualização Usuário"
        component={AtualizacaoUsuario}
        options={{
          tabBarIcon: () => <Icon name='sun' size={20} color={'#0038a8'} />,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

export default TabNavigator;

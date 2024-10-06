// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida';
import ListaCorridas from '../Telas/ListaCorridas';
import Calendario from '../Telas/Calendario';




const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      {/* Adiciona o TabNavigator como uma tela do Drawer */}
      <Drawer.Screen 
      name="Menu" 
      component={TabNavigator} 
      initialParams={{ screen: 'Menu' }}/>
     
      <Drawer.Screen name="Calendario" 
      component={TabNavigator} 
      initialParams={{ screen: 'Calendario' }}/>
      
      
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
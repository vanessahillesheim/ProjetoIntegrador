// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida';
import ListaCorridas from '../Telas/ListaCorridas';
import StatusCorrida from '../Telas/StatusCorrida';
import Tela1 from '../Telas/Tela1';

const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      {/* Adiciona o TabNavigator como uma tela do Drawer */}
      <Drawer.Screen name="Menu" component={TabNavigator} />
      <Drawer.Screen name="CadastroCorrida" component={CadastroCorrida} />
      <Drawer.Screen name="ListaCorridas" component={ListaCorridas} />
      <Drawer.Screen name="StatusCorrida" component={StatusCorrida} />
      <Drawer.Screen name="Login" component={Tela1} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;

// DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida';
import ListaCorridas from '../Telas/ListaCorridas';
import Calendario from '../Telas/Calendario';
import Tela1 from '../Telas/Tela1';
import AtualizacaoUsuario from '../Telas/AtualizacaoUsuario';



const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      {/* Adiciona o TabNavigator como uma tela do Drawer */}
      <Drawer.Screen name="Menu" component={TabNavigator} />
      <Drawer.Screen name="CadastroCorrida" component={CadastroCorrida} />
      <Drawer.Screen name="ListaCorridas" component={ListaCorridas} />
      <Drawer.Screen name="Calendario" component={Calendario} />
      <Drawer.Screen name="Login" component={Tela1} />
      <Drawer.Screen name="AtualizacaoUsuario" component={AtualizacaoUsuario} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;
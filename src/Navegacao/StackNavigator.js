// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tela1 from '../Telas/Tela1'; // Tela de login
import CadastroUsuario from '../Telas/CadastroUsuario'; // Tela de cadastro de usuário
import CadastroSucesso from '../Telas/CadastroSucesso'; // Tela de sucesso do cadastro
import DrawerNavigator from './DrawerNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida'; // Tela de cadastro de nova corrida

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tela1">
      {/* Telas relacionadas ao login e cadastro */}
      <Stack.Screen name="Tela1" component={Tela1} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroSucesso" component={CadastroSucesso} options={{ headerShown: false }} />
      
      {/* O DrawerNavigator será exibido após o login/cadastro bem-sucedido */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      
      {/* Telas de cadastro de corrida */}
      <Stack.Screen name="CadastroCorrida" component={CadastroCorrida} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroSucessoCorrida" component={CadastroSucesso} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;

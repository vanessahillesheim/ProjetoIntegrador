
// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tela1 from '../Telas/Tela1'; // Tela de login
import CadastroUsuario from '../Telas/CadastroUsuario'; // Tela de cadastro de usuário
import CadastroSucessoUser from '../Telas/CadastroSucessoUser'; // Tela de sucesso do cadastro Usuário
import CadastroSucessoCorrida from '../Telas/CadastroSucessoCorrida'; // Tela de sucesso do cadastro Corrida
import DrawerNavigator from './DrawerNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida'; // Tela de cadastro de nova corrida
import Cabecalho from '../Telas/Cabecalho';
import AtualizacaoCorrida from '../Telas/AtualizacaoCorrida';


const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Tela1">
      {/* Telas relacionadas ao login e cadastro */}
      <Stack.Screen name="Tela1" component={Tela1} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: true }} />
      <Stack.Screen name="CadastroSucessoUser" component={CadastroSucessoUser} options={{ headerShown: false }} />
      <Stack.Screen name="Cabecalho" component={Cabecalho} options={{ headerShown: false }} />
      <Stack.Screen name="AtualizacaoCorrida" component={AtualizacaoCorrida} options={{ headerShown: false }} />
      
      
      {/* O DrawerNavigator será exibido após o login/cadastro bem-sucedido */}
      <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
      
      {/* Telas de cadastro de corrida */}
      <Stack.Screen name="CadastroCorrida" component={CadastroCorrida} options={{ headerShown: false }} />
      <Stack.Screen name="CadastroSucessoCorrida" component={CadastroSucessoCorrida} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default StackNavigator;


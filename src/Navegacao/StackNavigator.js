import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tela1 from '../Telas/Tela1'; // Tela de login
import CadastroUsuario from '../Telas/CadastroUsuario'; // Tela de cadastro de usuário
import CadastroSucessoUser from '../Telas/CadastroSucessoUser'; // Tela de sucesso do cadastro Usuário
import CadastroSucessoCorrida from '../Telas/CadastroSucessoCorrida'; // Tela de sucesso do cadastro Corrida
import DrawerNavigator from './DrawerNavigator'; // Certifique-se de que o caminho está correto
import CadastroCorrida from '../Telas/CadastroCorrida'; // Tela de cadastro de nova corrida
import Cabecalho from '../Telas/Cabecalho';
import AtualizacaoCorrida from '../Telas/AtualizacaoCorrida';
import ListaUsuario from '../Telas/ListaUsuario';
import ListaCorridas from '../Telas/ListaCorridas';
import AtualizacaoUsuario from '../Telas/AtualizacaoUsuario';
import PerfilUsuario from '../Telas/PerfilUsuario';
import { AuthContext } from '../servicos/AuthContext';

const Stack = createStackNavigator();

function StackNavigator() {
  const { user } = useContext(AuthContext); // Pegando o estado de autenticação do usuário
  
  return (
    <Stack.Navigator initialRouteName="Tela1">
      {/* Exibe a tela de login se o usuário não estiver autenticado */}
      {user ? (
        <>
          {/* Telas que requerem autenticação */}
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="PerfilUsuario" component={PerfilUsuario} options={{ headerShown: true }} />
          <Stack.Screen name="AtualizacaoUsuario" component={AtualizacaoUsuario} options={{ headerShown: true }} />
          <Stack.Screen name="CadastroCorrida" component={CadastroCorrida} options={{ headerShown: true }} />
          <Stack.Screen name="CadastroSucessoCorrida" component={CadastroSucessoCorrida} options={{ headerShown: false }} />
          <Stack.Screen name="AtualizacaoCorrida" component={AtualizacaoCorrida} options={{ headerShown: true }} />
          <Stack.Screen name="ListaCorridas" component={ListaCorridas} options={{ headerShown: true }} />
        </>
      ) : (
        <>
          {/* Telas de login e cadastro, caso o usuário não esteja logado */}
          <Stack.Screen name="Tela1" component={Tela1} options={{ headerShown: false }} />
          <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ headerShown: true }} />
          <Stack.Screen name="CadastroSucessoUser" component={CadastroSucessoUser} options={{ headerShown: false }} />
        </>
      )}
    </Stack.Navigator>
  );
}

export default StackNavigator;

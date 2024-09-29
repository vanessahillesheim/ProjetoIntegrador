// Tela1.js
import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTUser from "./CxTxTUser";
import { useNavigation } from "@react-navigation/native";

function Tela1() {
  const nav = useNavigation();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');



  let fundoCabecalho = require("../img/cabecalho.png");
  let logo = require("../img/logo.png");

  let arraypHol = ['Digite seu e-mail', 'Digite sua senha'];
  let arrayaCap = ['none', 'none'];
  let arraycMax = ['50', '8'];
  let arraykTyp = ['email-address', 'default'];
  let arrayEdit = ['true', 'true'];
  let arraysegT = ['false', 'true'];
  let arraymLin = ['false', 'false'];
  let campos = [];

  for (let i = 0; i < arraypHol.length; i++) {
    campos.push(
      <CxTxTUser
        key={i} // Adicionando a chave única
        pHol={arraypHol[i]}
        aCap={arrayaCap[i]}
        cMax={arraycMax[i]}
        kTyp={arraykTyp[i]}
        edit={arrayEdit[i]}
        segT={arraysegT[i]}
        mLin={arraymLin[i]}
      />
    );
  }

  function cadastrar() {
    nav.navigate('CadastroUsuario');
  }

  function menu() {
    nav.navigate('DrawerNavigator'); // Navega para o DrawerNavigator
  }

  return (
    <View style={estilos.fundo}>
      <View style={estilos.cabecalho}>
        <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
      </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
        <Image style={estilos.logo} source={logo} />
      </View>

      <View style={estilos.corpo}>
        {campos}
      </View>
      <View style={estilos.rodape}>
        <TouchableHighlight onPress={() => cadastrar()}>
          <Text style={{ paddingBottom: 20 }}>Primeiro Acesso</Text>
        </TouchableHighlight>

        <TouchableHighlight style={estilos.rodapeBotao} onPress={() => menu()}>
          <Text style={{ color: 'white', fontWeight: "bold" }}>Entrar</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
}

export default Tela1;

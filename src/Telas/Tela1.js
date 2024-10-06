import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { EntradaTexto } from "./EntradaTexto";
import { useNavigation } from "@react-navigation/native";
import { logar } from "../servicos/requisicoesfirebase";
import { Alerta } from "../componentes/Alerta";
import { auth } from "../database/firebaseconexao";
import animacaoquadrado from "../../assets/animacaoquadrado.gif";
import { alteraDados } from "../utils/funcoesComum";

function Tela1() {
  const nav = useNavigation(); // Hook de navegação
  let icone = require("../img/icone.png");

  const [dados, setDados]  = useState ({
    email: '',
    senha: '',
  }) 
    

  const [statusError, setStatusError] = useState('');
  const [mensagemError, setMensagemError] = useState('');
  const [carregando, setCarregando] = useState(true);
  const entradas = [{
    id: '1',
    name: 'email',
    label: 'e-mail',
    messageError: 'Digite um e-mail válido',
    secureTextEntry: false
  },
  {
    id: '2',
    name: 'senha',
    label: 'senha',
  messageError: 'Digite uma senha válida',
  secureTextEntry: true
}
    ];




//verificação se o usuário está logado, persiste no DrawerNavigator
  useEffect(()=>{
const estadoUsuario = auth.onAuthStateChanged( usuario=> {
  if(usuario){
    nav.replace('DrawerNavigator')
  }
  setCarregando(false)
})
return () =>estadoUsuario();
  },[])


  async function realizarLogin() {
    if (dados.email === '') {
      setMensagemError('Preenchimento do e-mail é obrigatório.');
      setStatusError('email'); // Este status deve corresponder ao campo de erro
      return;
    } else if (dados.senha === '') {
      setMensagemError('Preenchimento de senha é obrigatório.');
      setStatusError('senha'); // Este status deve corresponder ao campo de erro
      return;
    } else {
      const resultado = await logar(dados.email, dados.senha);
      if (resultado === 'Erro ao logar') {
        setStatusError('firebase');
        setMensagemError('E-mail ou senha não confere.');
      } else {
        nav.replace('Menu'); // Se login ok, navega para o DrawerNavigator
      }
    }
  }
  

  let fundoCabecalho = require("../img/cabecalho.png");
  let logo = require("../img/logo.png");
  

  // Função para navegar para a tela de Cadastro de Usuário
  function cadastrar() {
    nav.navigate('CadastroUsuario');
  }


if(carregando){
  return(
    <View style={estilos.containerAnimacao}>
      <Image source={animacaoquadrado}
      style={estilos.carregando}/>

    </View>

  )
}


  return (
    <View style={estilos.fundo}>
      <View style={estilos.cabecalho}>
      
     
        <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
      </View>
      <View style={{ position: 'absolute', top: 10, left: 10, flexDirection: 'row', alignItems: 'center' }}>
                <Image style={{ width: 40, height: 40, borderRadius: 50, left: 10 }} source={icone} />
            </View>

      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.3 }}>
        <Image style={estilos.logo} source={logo} />
      </View>

      <View style={estilos.corpo}>
        <View>
        {
  entradas.map((entrada) => {
    return (
      <EntradaTexto
        key={entrada.id}
        label={entrada.label}
        messageError={entrada.messageError}
        secureTextEntry={entrada.secureTextEntry}
        value={dados[entrada.name]}
        onChangeText={(valor) => alteraDados(entrada.name, valor, dados, setDados)}
        error={statusError === entrada.name}  // Adicione esta linha
      />
    )
  })
}


      </View>
      </View>

      <View style={estilos.rodape}>
        <TouchableHighlight onPress={cadastrar}>
          <Text style={{ paddingBottom: 20 }}>Primeiro Acesso</Text>
        </TouchableHighlight>
        <Alerta
          mensagem={mensagemError}
          error={statusError === 'firebase'}
          setError={setStatusError}
        />
        <TouchableHighlight style={estilos.rodapeBotao} onPress={realizarLogin}>
          <Text style={{ color: 'white', fontWeight: "bold" }}>Entrar</Text>
        </TouchableHighlight>
      </View>
    </View> // <-- Remova o parêntese extra
  );
}

export default Tela1;

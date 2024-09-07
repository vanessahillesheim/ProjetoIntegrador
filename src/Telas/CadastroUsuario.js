import React from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CxTxTUser from "./CxTxTUser";
import { useNavigation} from "@react-navigation/native";

function CadastroUsuario() {

    const nav = useNavigation();
    let fundoCabecalho = require("../img/cabecalho.png");

    let arraypHol = ['Digite o seu nome', 'qual a sua idade', 'CPF:999.999.999-00', 'Digite seu e-mail', 'Digite seu número de celular', 'Digite sua senha'];
    let arrayaCap = ['characters', 'none', 'none', 'none', 'none', 'none',  'none'];
    let arraycMax = ['30', '2', '14', '50', '50',  '5'];
    let arraykTyp = ['default', 'number-pad', 'number-pad', 'email-address', 'phone-pad',  'default'];
    let arrayEdit = ['true', 'true', 'true', 'true', 'true',  'true'];
    let arraysegT = ['false', 'false', 'false', 'false',  'false', 'true'];
    let arraymLin = ['false', 'false', 'false', 'false', 'false', 'false'];
    let campos = [];

    for (let i = 0; i < arraypHol.length; i++) {
        campos.push(<CxTxTUser
            pHol={arraypHol[i]}
            aCap={arrayaCap[i]}
            cMax={arraycMax[i]}
            kTyp={arraykTyp[i]}
            edit={arrayEdit[i]}
            segT={arraysegT[i]}
            mLin={arraymLin[i]} />
        );
    }

    

    function cadastroSucesso(){
        nav.navigate('CadastroSucesso')
    }




    return (

        <View style={estilos.fundo} >
              <View style={estilos.cabecalhoCadastro}>
                <View>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho}/>
                </View>
               

            </View>




            <View style={estilos.corpoCadastro}>

                <Text style={estilos.titulo}>Preencha seu cadastro:</Text>
                {campos}

                </View>

                <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={estilos.rodapeBotao}
                    onPress={() => cadastroSucesso()}

                >
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Entrar</Text>
                </TouchableHighlight>


        

            </View>
        </View>
    );
}
export default CadastroUsuario;
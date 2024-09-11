import React from "react";
import { TextInput } from "react-native";
import { estilos } from "../styleSheet/estilos";

function CxTxT(props){
    let campoEditavel = false;
    let textoSeguro = false;
    let retorno = [];

    if (props.edit =='true')
        campoEditavel = true;
    else
        campoEditavel = false;

    if (props.segT == 'true')
        textoSeguro = true;
    else
        textoSeguro = false;

    if (props.mLin == 'true'){
        return(
            <TextInput style={estilos.entrada_texto}
                placeholder={props.pHol}
                autoCapitalize={props.aCap}
                maxLength={parseInt(props.cMax)}
                keyboardType={props.kTyp}
                editable={campoEditavel}
                secureTextEntry={textoSeguro}
                multiline={true}/>
        );
    }
    else{
        return(
            <TextInput style={estilos.entrada_texto}
            placeholder={props.pHol}
            autoCapitalize={props.aCap}
            maxLength={parseInt(props.cMax)}
            keyboardType={props.kTyp}
            editable={campoEditavel}
            secureTextEntry={textoSeguro}
            multiline={false}/>
        );
    }

}
export default CxTxT;
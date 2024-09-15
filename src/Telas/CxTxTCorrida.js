import React from "react";
import { TextInput } from "react-native";
import { estilos } from "../styleSheet/estilos";

function CxTxTCorrida(props) {
    let campoEditavel = props.edit === 'true';
    let textoSeguro = props.segT === 'true';
    let multiline = props.mLin === 'true';

    return (
        <TextInput
            style={multiline ? estilos.entrada_texto2 : estilos.entrada_texto}
            placeholder={props.pHol}
            autoCapitalize={props.aCap}
            maxLength={parseInt(props.cMax)}
            keyboardType={props.kTyp}
            editable={campoEditavel}
            secureTextEntry={textoSeguro}
            multiline={multiline}
            onChangeText={props.onChangeText} // Adiciona o onChangeText
        />
    );
}

export default CxTxTCorrida;

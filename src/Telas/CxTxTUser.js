import React from "react";
import { TextInput } from "react-native";
import { estilos } from "../styleSheet/estilos";

function CxTxTUser(props) {
    let campoEditavel = props.edit === 'true';
    let textoSeguro = props.segT === 'true';

    return (
        <TextInput
            style={props.mLin === 'true' ? estilos.entrada_texto2 : estilos.entrada_texto}
            placeholder={props.pHol}
            autoCapitalize={props.aCap}
            maxLength={parseInt(props.cMax)}
            keyboardType={props.kTyp}
            editable={campoEditavel}
            secureTextEntry={textoSeguro}
            multiline={props.mLin === 'true'}
            onChangeText={props.onChangeText}
        />
    );
}

export default CxTxTUser;

import React from "react";
import { TextInput } from "react-native";
import { estilos } from "../styleSheet/estilos";

function CxTxTCorrida(props) {
    const campoEditavel = props.edit === true; // Verifique se `edit` é booleano
    const textoSeguro = props.segT === 'true';
    const multiline = props.mLin === 'true';

    return (
        <TextInput
            style={props.customStyle || (multiline ? estilos.entrada_texto2 : estilos.entrada_texto4)} // Aplica o estilo customizado ou o padrão
            placeholder={props.pHol}
            autoCapitalize={props.aCap}
            maxLength={parseInt(props.cMax)}
            keyboardType={props.kTyp}
            editable={campoEditavel}
            secureTextEntry={textoSeguro}
            multiline={multiline}
            onChangeText={props.onChangeText}
        />
    );
}

export default CxTxTCorrida;
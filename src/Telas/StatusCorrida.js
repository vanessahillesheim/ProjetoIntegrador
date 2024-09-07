import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, Switch } from "react-native";
import { estilos } from "../styleSheet/estilos";
import CorridasConcluidas from "./CorridasConcluidas";
import CorridasFuturas from "./CorridasFuturas";


function StatusCorrida() {


    let fundoCabecalho = require('../img/cabecalho.png');
    const [ligado, setLigado] = useState(false); 
    const [inicio, setInicio] = useState(<CorridasFuturas/>); 

   
    function mudaTela() {
        if (ligado) {
            setInicio(<CorridasFuturas/>); 
            setLigado(false);
        } else {
            setInicio(<CorridasConcluidas/>);
            setLigado(true);
        }
    }

  

    return (
        <View style={estilos.fundo}>

<View style={estilos.cabecalhoCadastro}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
                            
            </View>


            <View style={{ alignItems: 'center', marginVertical: 20 }}>
                <Switch
                    value={ligado}
                    trackColor={{ false: "#0038a8", true: "#cccccc" }} 
                    thumbColor={ligado ? "#0038a8" : "#F9dd16"} 
                    onValueChange={mudaTela} 
                />
            </View>
            {inicio} {/* Renderiza o componente baseado no estado `inicio` */}
        
        </View>
        
    );
}

export default StatusCorrida;

import React, { useState } from "react";
import { View, Text, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";



function DetalhesCorridas() {

    const nav = useNavigation();
    function menu(){
        nav.navigate('Menu')
    }


    const [itemSelecionado, setItemSelecionado] = useState("");
    const [boleto, setBoleto] = useState("");

    const boletos = [
        {
            detalhes: "Batel Run\n" +
                "28/01/2024\n" +
                "km: 10\n" +
                "tempo: 00:59:08\n" +
                "Valor da Inscrição: R$110,00"
        },
        {
            detalhes: "Mundo Livre Rock and Run\n" +
                "27/07/2024\n" +
                "km: 05\n" +
                "tempo: 00:28:03\n" +
                "Valor da Inscrição: R$180,00"
        },
        {
            detalhes: "Furacão Run\n" +
                "17/03/2024\n" +
                "km: 10\n" +
                "Tempo: 00:59:47\n" +
                "Valor da Inscrição: R$90,00"
        },
    ];

    const Titulo1 = "Detalhamento das Corridas";

    function verifica() {
        if (itemSelecionado !== "") {
            setBoleto(boletos[itemSelecionado].detalhes);
        } else {
            setBoleto("");
        }
    }

    function trocaItemSelecionado(itemIndex) {
        setItemSelecionado(itemIndex);
    }
    let fundoCabecalho = require('../img/cabecalho.png');

 
 
    return (
        <View style={estilos.fundo}>
                <View style={estilos.cabecalhoCadastro}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />

                
                
            </View>
            
            
            <View style={[{ paddingHorizontal: 10, flex: 0.14 }]}>
                <Text style={{ color: '#0038a8', fontSize: 18, textAlign: 'center', padding: 20 }}>{Titulo1}</Text>
                
            </View>
            <View style={estilos.viewPicker}>
                <Picker
                    style={estilos.picker}
                    selectedValue={itemSelecionado}
                    onValueChange={(itemValue) => trocaItemSelecionado(itemValue)}
                >
                    <Picker.Item label="Selecione a corrida..." value={""} />
                    <Picker.Item label="Batel Run" value={0} />
                    <Picker.Item label="Rock and Run" value={1} />
                    <Picker.Item label="Furacão Run" value={2} />
                </Picker>

                <TouchableHighlight
                    onPress={verifica}
                    style={estilos.botaoConteudo}
                >
                    <Text style={estilos.exibir}>Exibir</Text>
                </TouchableHighlight>

                {boleto ? (
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 16, color: '#000' }}>{boleto}</Text>
                    </View>
                ) : ""}
            </View>

          



        </View>
    );
}

export default DetalhesCorridas;

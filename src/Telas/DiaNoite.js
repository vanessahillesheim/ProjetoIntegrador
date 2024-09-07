// src/Telas/DiaNoite.js
import React, { useState } from "react";
import { View, Text, Image, FlatList, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

function DiaNoite() {
    let fundoCabecalho = require('../img/cabecalho.png');
    let dia = require('../img/sol.png');
    let noite = require('../img/lua.png');

    const nav = useNavigation();
    function menu() {
        nav.navigate('Menu');
    }

    const Dia = [
        { data: '28/01/2024', nome: 'Batel Run', km: '10km' },
        { data: '18/02/2024', nome: 'Meia Maratona de Curitiba', km: '21km' },
        { data: '10/03/2024', nome: 'Corrida da Mulher', km: '6km' },
        { data: '17/03/2024', nome: 'Furacão Runner', km: '10km' },
        { data: '14/04/2024', nome: 'Santader Track&Field', km: '10km' },
        { data: '28/04/2024', nome: 'Circuito AENT4', km: '10km' },
        { data: '12/05/2024', nome: 'Meia Maratona Internacional', km: '21km' },
        { data: '23/05/2024', nome: 'Corrida da Polícia Científica', km: '10km' },
        { data: '07/06/2024', nome: '15k de Santa Felicidade', km: '15km' },
    ];

    const Noite = [
        { data: '27/07/2024', nome: 'Mundo Livre Rock and Run', km: '5km' },
        { data: '25/08/2024', nome: 'Circuito de Corridas PM Curitiba', km: '10km' },
        { data: '01/09/2024', nome: 'Corrida do Dia do Soldado', km: '10km' },
        { data: '29/09/2024', nome: 'Circuito AENT5', km: '10km' },
        { data: '13/10/2024', nome: 'Run the Pink 2024', km: '7km' },
        { data: '10/11/2024', nome: '5ª Corrida dos Amigos do HC', km: '10km' },
        { data: '17/11/2024', nome: 'Maratona de Curitiba', km: '21km' },
        { data: '08/12/2024', nome: 'Circuito Sanepar', km: '10km' },
        { data: '31/12/2024', nome: 'São Silvestre', km: '15km' }
    ];

    const [exibirDia, setExibirDia] = useState(true);
    const [corDeFundoApp, setCorFundoApp] = useState('white');
    const [corDoTexto, setCorDoTexto] = useState('#0038a8');

    function deslizaSlider(value) {
        if (value > 50) {
            setExibirDia(false);
            setCorFundoApp('black');
            setCorDoTexto('white');
        } else {
            setExibirDia(true);
            setCorFundoApp('white');
            setCorDoTexto('#0038a8');
        }
    }

    function MostraItem({ item }) {
        return (
            <View style={{ backgroundColor: corDeFundoApp, width: 250, }}>
                <Text style={[estilos.textoConteudo, { color: corDoTexto }]}>{item.data}</Text>
                <Text style={[estilos.textoConteudo, { color: corDoTexto }]}>{item.nome}</Text>
                <Text style={[estilos.textoConteudo, { color: corDoTexto }]}>{item.km}</Text>
                <View style={estilos.separador}></View>
            </View>
        );
    }

    let conteudo;

    if (exibirDia) {
        conteudo = Dia;
    } else {
        conteudo = Noite;
    }


    

    return (
        <View style={estilos.fundo}>
            <View style={estilos.cabecalhoCadastro}>
                <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
            </View>


            <View style={estilos.corpoFlatList}>
                <Text style={estilos.titulo}>Confira o período da corrida: </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: 250, }}>

                    <View style={{ flexDirection: 'column' }}>
                        <Image source={dia} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        <Text>Diurna</Text>
                    </View>
                    <View style={{ flexDirection: 'column' }}>
                        <Image source={noite} style={{ width: 30, height: 30, borderRadius: 15 }} />
                        <Text>Noturna</Text>
                    </View>
                </View>

                <Slider
                    style={{ width: 250, marginVertical: 10 }}
                    step={1}
                    minimumValue={0}
                    maximumValue={100}
                    thumbTintColor="#0038a8"           // Cor do bullet (thumb)
                    minimumTrackTintColor="#12B1F5"    // Cor da linha deslizada
                    maximumTrackTintColor="#d3d3d3"    // Cor da linha não deslizada (opcional)
                    onValueChange={deslizaSlider}

                />
                <FlatList
                    data={conteudo}
                    renderItem={MostraItem}
                    keyExtractor={(item) => item.data + item.nome} // Certifique-se de que esta chave é única
                />


            </View>
        </View>
    );
}

export default DiaNoite;

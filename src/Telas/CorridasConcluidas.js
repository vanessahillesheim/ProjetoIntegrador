import React from "react";
import { View, Text, SectionList, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";


function CorridasConcluidas(){

    let Titulo2 = "Corridas Concluídas";
    let Titulo1 = "Corridas Futuras";


      const nav = useNavigation();
    function menu(){
        nav.navigate('Menu')
    }

    const Datas = [
        'Janeiro de 2024', 'Fevereiro de 2024', 'Março de 2024',
        'Abril de 2024', 'Junho de 2024', 'Julho de 2024',  ];

    const Corridas = [
        ['Dia 28: Batel Run'],
        ['Dia 18: Meia Maratona de Curitiba'],
        ['Dia 10: Corrida da Mulher',
         'Dia 17: Furacão Runner'],
        ['Dia 14: Santader Track&Fiel', 
         'Dia 28: Circuito AENT4'],
        ['Dia 12: Meia Maratona Internacional'],
        ['Dia 23: Corrida da Polícia Científica'],
        ['Dia 07: 15k de Santa Felicidade',
         'Dia 27: Mundo Livre Rock and Run'],
       

                    
    ];

    function mostra_dados({ item }) {
        return (
            <View>
                <Text style={{ fontSize: 18, paddingLeft: 20 }}>{item}</Text>
            </View>
        );
    }

    function mostra_Cab_Secao({ section }) {
        return (
            <View>
                <Text style={{ fontSize: 20, backgroundColor: 'lightgray', textAlign: 'center', color: '#0038a8' }}>{section.title}</Text>
            </View>
        );
    }

    return (
        <View style={estilos.fundo}>
       
            
            <View style={estilos.atendimentoHead}>
                
            <Text style={{color: 'gray', fontSize: 18}}>{Titulo1}</Text>
            <Text style={estilos.atendimentoHeadText}>{Titulo2}</Text>
            </View>

            <View style={estilos.lista}>
                <SectionList
                    sections={[
                        { title: Datas[0], data: Corridas[0] },
                        { title: Datas[1], data: Corridas[1] },
                        { title: Datas[2], data: Corridas[2] },
                        { title: Datas[3], data: Corridas[3] },
                        { title: Datas[4], data: Corridas[4] },
                        { title: Datas[5], data: Corridas[5] },
                        { title: Datas[6], data: Corridas[6] },
                       
                    ]}
                    renderItem={mostra_dados}
                    renderSectionHeader={mostra_Cab_Secao}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
           

          
        </View>
    );
}

export default CorridasConcluidas
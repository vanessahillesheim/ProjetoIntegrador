import React from "react";
import { View, Text, SectionList, Image, TouchableHighlight } from "react-native";
import { estilos } from "../styleSheet/estilos";
import { useNavigation } from "@react-navigation/native";


function CorridasFuturas(){
    
    let Titulo2 = "Corridas Concluídas";
    let Titulo1 = "Corridas Futuras";

    const nav = useNavigation();
    function menu(){
        nav.navigate('Menu')
    }

    const Datas = [
        'Agosto de 2024', 'Setembro de 2024', 'Outubro de 2024', 'Novembro de 2024', 'Dezembro de 2024'
    ];

    const Corridas = [
        ['Dia 25: Circuito de Corridas PM Curitiba'],
        ['Dia 01: Corrida do dia do Soldado',
         'Dia 29: Circuito AENT5'
        ],
        ['Dia 13: Run the Pink 2024 '],
        ['Dia 10: 5ª Corrida dos Amigos do HC', 
         'Dia 17: Maratona de Curitiba'
        ],
        ['Dia 08: Circuito Sanepar', 
         'Dia 31: São Silvestre'],

                    
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
                <Text style={estilos.atendimentoHeadText}>{Titulo1}</Text>
                <Text style={{ color: 'gray', fontSize: 18 }}>{Titulo2}</Text>
            </View>
        
            <View style={estilos.lista}>
                <SectionList
                    sections={[
                        { title: Datas[0], data: Corridas[0] },
                        { title: Datas[1], data: Corridas[1] },
                        { title: Datas[2], data: Corridas[2] },
                        { title: Datas[3], data: Corridas[3] },
                        { title: Datas[4], data: Corridas[4] },
                       
                       
                    ]}
                    renderItem={mostra_dados}
                    renderSectionHeader={mostra_Cab_Secao}
                    keyExtractor={(item, index) => item + index}
                />
            </View>
           

          
        </View>
    );
}
export default CorridasFuturas
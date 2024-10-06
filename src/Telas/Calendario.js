import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { estilos } from "../styleSheet/estilos";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; // Importar onSnapshot
import database from "../database/firebaseconexao";
import { auth } from "../database/firebaseconexao";
import Cabecalho from "./Cabecalho";
import { useNavigation } from "@react-navigation/native"; 

function Calendario() {

  const navigation = useNavigation();

  const [corridas, setCorridas] = useState({});
  const [selectedCorrida, setSelectedCorrida] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Função para buscar as corridas no Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(database, "corridas"), (querySnapshot) => {
      const corridaData = {};
      querySnapshot.forEach((doc) => {
        const { data, nomeEvento, local, horario, distancia } = doc.data();
        corridaData[data] = {
          selected: true,
          selectedColor: "#84F85B",
          nomeEvento,
          local,
          horario, 
          distancia
        };
      });
      setCorridas(corridaData);
    });

    // Limpa a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, []);

  // Função para lidar com o clique em um dia do calendário
  const onDayPress = (day) => {
    const selected = corridas[day.dateString];
    if (selected) {
      setSelectedCorrida(selected);
      setShowModal(true);
    }
  };

  function deslogar() {
    auth.signOut();
    navigation.replace('Tela1');
}

function irParaMenu() {
    navigation.navigate('Menu');
}
  return (
    <View style={estilos.fundo}>
      <Cabecalho navigation={navigation} logout={deslogar} irParaMenu={irParaMenu} />

      <View>
        <Text style={[estilos.titulo, {paddingTop: 60}]}>Calendário de Corridas</Text>
      </View>

      <View style={estilos.corpoCadastro}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={corridas}
          markingType={"custom"}
          renderArrow={(direction) => (
            <Text style={{ fontSize: 28 }}>{direction === "left" ? "<" : ">"}</Text>
          )}
          theme={{
            selectedDayBackgroundColor: "#84F85B",
            todayTextColor: "blue",
            arrowColor: "blue",
            dotColor: "#84F85B",
            monthTextColor: "#0038A8",
            textMonthFontWeight: "bold",
            backgroundColor: "#0038A8",
          }}
        />
      </View>

      {/* Modal para exibir as informações da corrida agendada */}
      {showModal && (
        <Modal
          transparent={true}
          visible={showModal}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={estilos.modalOverlay}>
            <View style={estilos.modalContent}>
              <Text style={estilos.modalTitle}></Text>
              <Text style={estilos.modalCorrida}>{selectedCorrida.nomeEvento}</Text>
              <Text style={estilos.modalDetails}>Largada: {selectedCorrida.local}</Text>
              <Text style={estilos.modalDetails}>Horário: {selectedCorrida.horario}</Text>
              <Text style={estilos.modalDetails}>Distância (km): {selectedCorrida.distancia}</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text style={estilos.modalClose}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

export default Calendario;

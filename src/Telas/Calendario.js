<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { estilos } from "../styleSheet/estilos";
import { collection, getDocs } from "firebase/firestore";
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase

let fundoCabecalho = require("../img/cabecalho.png");

function Calendario() {
  const [corridas, setCorridas] = useState({});
  const [selectedCorrida, setSelectedCorrida] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Função para buscar as corridas no Firestore
  useEffect(() => {
    const fetchCorridas = async () => {
      const querySnapshot = await getDocs(collection(database, "corridas"));
      const corridaData = {};
      querySnapshot.forEach((doc) => {
        const { data, nomeEvento, local, horario } = doc.data();
        corridaData[data] = {
          selected: true,
          selectedColor: "#84F85B", // Cor diferente para as datas com corridas agendadas
          nomeEvento,
          local,
          horario
        };
      });
      setCorridas(corridaData);
    };

    fetchCorridas();
  }, []);

  // Função para lidar com o clique em um dia do calendário
  const onDayPress = (day) => {
    const selected = corridas[day.dateString];
    if (selected) {
      setSelectedCorrida(selected);
      setShowModal(true);
    }
  };

  return (
    <View style={estilos.fundo}>
      <View style={estilos.cabecalhoCadastro}>
        <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
      </View>

      <View style={[{ paddingHorizontal: 10, flex: 0.14 }]}>
        <Text style={{color: '#0038a8', fontSize: 18, textAlign: 'center', padding: 20}}>Calendário de Corridas</Text>
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
              <Text style={estilos.modalTitle}>Evento:</Text>
              <Text style={estilos.modalCorrida}>{selectedCorrida.nomeEvento}</Text>
              <Text style={estilos.modalDetails}>Local: {selectedCorrida.local}</Text>
              <Text style={estilos.modalDetails}>Horário: {selectedCorrida.horario}</Text>
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
=======
import React, { useState, useEffect } from "react";
import { View, Text, Image, Modal, TouchableOpacity } from "react-native";
import { Calendar } from "react-native-calendars";
import { estilos } from "../styleSheet/estilos";
import { collection, getDocs } from "firebase/firestore";
import database from "../database/firebaseconexao"; // Importa a configuração do Firebase

let fundoCabecalho = require("../img/cabecalho.png");

function Calendario() {
  const [corridas, setCorridas] = useState({});
  const [selectedCorrida, setSelectedCorrida] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Função para buscar as corridas no Firestore
  useEffect(() => {
    const fetchCorridas = async () => {
      const querySnapshot = await getDocs(collection(database, "corridas"));
      const corridaData = {};
      querySnapshot.forEach((doc) => {
        const { data, nomeEvento, local, horario } = doc.data();
        corridaData[data] = {
          selected: true,
          selectedColor: "#84F85B", // Cor diferente para as datas com corridas agendadas
          nomeEvento,
          local,
          horario
        };
      });
      setCorridas(corridaData);
    };

    fetchCorridas();
  }, []);

  // Função para lidar com o clique em um dia do calendário
  const onDayPress = (day) => {
    const selected = corridas[day.dateString];
    if (selected) {
      setSelectedCorrida(selected);
      setShowModal(true);
    }
  };

  return (
    <View style={estilos.fundo}>
      <View style={estilos.cabecalhoCadastro}>
        <Image style={estilos.fundoCabecalho} source={fundoCabecalho} />
      </View>

      <View style={[{ paddingHorizontal: 10, flex: 0.14 }]}>
        <Text style={{color: '#0038a8', fontSize: 18, textAlign: 'center', padding: 20}}>Calendário de Corridas</Text>
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
              <Text style={estilos.modalTitle}>Evento:</Text>
              <Text style={estilos.modalCorrida}>{selectedCorrida.nomeEvento}</Text>
              <Text style={estilos.modalDetails}>Local: {selectedCorrida.local}</Text>
              <Text style={estilos.modalDetails}>Horário: {selectedCorrida.horario}</Text>
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
>>>>>>> 7445952cd1ba76e126cb4c5471bc8e60f9c7d606

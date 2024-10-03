import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import database, { auth } from '../database/firebaseconexao';
import { estilos } from '../styleSheet/estilos';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from './Cabecalho';
import { onAuthStateChanged } from 'firebase/auth';

function AtualizacaoUsuario() {
    const navigation = useNavigation();
    const [nome, setNome] = useState('');
    const [endereco, setEndereco] = useState({});
    const [userId, setUserId] = useState(null); // ID do usuário logado

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUserId(user.uid); // Armazena o ID do usuário autenticado
                await carregarUsuario(user.uid); // Carrega os dados do usuário
            } else {
                navigation.replace('Tela1'); // Se não estiver autenticado, redireciona para login
            }
        });

        return () => unsubscribe();
    }, []);

    const carregarUsuario = async (userId) => {
        try {
            const usuarioRef = doc(database, "usuarios", userId);
            const docSnap = await getDoc(usuarioRef);

            if (docSnap.exists()) {
                const dados = docSnap.data();
                setNome(dados.nome || '');
                setEndereco(dados.endereco || {});
            } else {
                Alert.alert("Erro", "Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário: ", error.message);
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        }
    };

    const handleUpdate = async () => {
        try {
            if (!userId) return;
            const usuarioRef = doc(database, "usuarios", userId);
    
            // Atualizando os dados no Firestore
            await updateDoc(usuarioRef, {
                nome: nome,
                endereco: endereco,
            });

            Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
            navigation.navigate('ListaUsuario'); 
        } catch (error) {
            console.error("Erro ao atualizar usuário: ", error.message);
            Alert.alert("Erro", `Não foi possível atualizar o usuário. Erro: ${error.message}`);
        }
    };

    function deslogar() {
        auth.signOut();
        navigation.replace('Tela1');
    }

    return (
        <View style={estilos.fundo}>
            <Cabecalho logout={deslogar} />
            <View style={estilos.corpoMenu}>
                <Text style={estilos.titulo}>Atualizar Usuário</Text>

                <TextInput
                    style={estilos.entrada_texto4}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
              
                <TextInput
                    style={estilos.entrada_texto4}
                    placeholder="Endereço (Rua)"
                    value={endereco.rua || ''}
                    onChangeText={rua => setEndereco({ ...endereco, rua })}
                />
                <TextInput
                    style={estilos.entrada_texto4}
                    placeholder="Bairro"
                    value={endereco.bairro || ''}
                    onChangeText={bairro => setEndereco({ ...endereco, bairro })}
                />
                <TextInput
                    style={estilos.entrada_texto4}
                    placeholder="Cidade"
                    value={endereco.cidade || ''}
                    onChangeText={cidade => setEndereco({ ...endereco, cidade })}
                />
                <TextInput
                    style={estilos.entrada_texto4}
                    placeholder="CEP"
                    value={endereco.cep || ''}
                    onChangeText={cep => setEndereco({ ...endereco, cep })}
                    keyboardType="numeric"
                />
            </View>

            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={[estilos.rodapeBotao, { marginTop: 20 }]} onPress={handleUpdate}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default AtualizacaoUsuario;

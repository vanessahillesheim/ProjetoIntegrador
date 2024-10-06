import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableHighlight, Alert } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import database, { auth } from '../database/firebaseconexao';
import { estilos } from '../styleSheet/estilos';
import { useNavigation } from '@react-navigation/native';
import Cabecalho from './Cabecalho';
import axios from 'axios'; // Importa axios para requisições HTTP

function AtualizacaoUsuario() {
    const navigation = useNavigation();
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cep, setCep] = useState('');

    useEffect(() => {
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                console.log("Usuário autenticado: ", user);
                await carregarUsuario(user.uid);
            } else {
                navigation.navigate('Tela1'); // Se não estiver autenticado, redireciona para login
            }
        });

        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        if (cep.length === 8) { // Verifica se o CEP tem 8 dígitos
            buscarEnderecoPorCEP(cep);
        }
    }, [cep]);

    const carregarUsuario = async (userId) => {
        try {
            const usuariosCollection = collection(database, "usuarios");
            const q = query(usuariosCollection, where("uid", "==", userId));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                const usuarioData = querySnapshot.docs[0].data();
                setUsuario({ id: querySnapshot.docs[0].id, ...usuarioData });
            } else {
                Alert.alert("Erro", "Usuário não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao carregar dados do usuário: ", error.message);
            Alert.alert("Erro", "Não foi possível carregar os dados do usuário.");
        } finally {
            setLoading(false);
        }
    };

    const buscarEnderecoPorCEP = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro, localidade } = response.data;
            if (logradouro) {
                setUsuario(prevUsuario => ({
                    ...prevUsuario,
                    endereco: {
                        ...prevUsuario.endereco,
                        rua: logradouro,
                        bairro: bairro,
                        cidade: localidade,
                        cep: cep
                    }
                }));
                setCep(''); // Limpa o campo do CEP após a busca
            } else {
                Alert.alert('Erro', 'CEP não encontrado.');
            }
        } catch (error) {
            console.error('Erro ao buscar o endereço: ', error);
            Alert.alert('Erro', 'Erro ao buscar o endereço.');
        }
    };

    const handleUpdate = async () => {
        try {
            if (!usuario) return; // Se não há usuário, não faz nada

            const usuarioRef = doc(database, "usuarios", usuario.id);

            // Atualizando os dados no Firestore
            await updateDoc(usuarioRef, {
                nome: usuario.nome,
                endereco: usuario.endereco,
            });

            Alert.alert("Sucesso", "Usuário atualizado com sucesso!");
            navigation.replace('PerfilUsuario'); // Navega de volta ao PerfilUsuario após a atualização
        } catch (error) {
            console.error("Erro ao atualizar usuário: ", error.message);
            Alert.alert("Erro", `Não foi possível atualizar o usuário. Erro: ${error.message}`);
        }
    };

    function deslogar() {
        auth.signOut();
        navigation.replace('Tela1');
    }

    function irParaMenu() {
        navigation.navigate('Menu');
    }

    if (loading) {
        return (
            <View style={estilos.fundo}>
                <Text>Carregando dados do usuário...</Text>
            </View>
        );
    }

    return (
        <View style={estilos.fundo}>
            <Cabecalho navigation={navigation} logout={deslogar} irParaMenu={irParaMenu} />
            {usuario ? (
                <View style={estilos.corpoMenu}>
                    <Text style={estilos.titulo}>Atualizar Usuário</Text>

                    <TextInput
                        style={estilos.entrada_texto4}
                        placeholder="Nome"
                        value={usuario.nome}
                        onChangeText={nome => setUsuario({ ...usuario, nome })} // Atualiza o nome
                    />
                    <TextInput
                        style={estilos.entrada_texto4}
                        placeholder="CEP"
                        value={cep}
                        onChangeText={setCep} // Atualiza o CEP e aciona a busca automática
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={estilos.entrada_texto4}
                        placeholder="Endereço (Rua)"
                        value={usuario.endereco?.rua || ''}
                        onChangeText={rua => setUsuario({ ...usuario, endereco: { ...usuario.endereco, rua }})} // Atualiza o endereço
                    />
                    <TextInput
                        style={estilos.entrada_texto4}
                        placeholder="Bairro"
                        value={usuario.endereco?.bairro || ''}
                        onChangeText={bairro => setUsuario({ ...usuario, endereco: { ...usuario.endereco, bairro }})} // Atualiza o bairro
                    />
                    <TextInput
                        style={estilos.entrada_texto4}
                        placeholder="Cidade"
                        value={usuario.endereco?.cidade || ''}
                        onChangeText={cidade => setUsuario({ ...usuario, endereco: { ...usuario.endereco, cidade }})} // Atualiza a cidade
                    />
                </View>
            ) : (
                <Text>Nenhum usuário encontrado</Text>
            )}

            <View style={estilos.rodapeCadastro}>
                <TouchableHighlight style={[estilos.rodapeBotao, { marginTop: 20 }]} onPress={handleUpdate}>
                    <Text style={{ color: 'white', fontWeight: "bold" }}>Atualizar</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}

export default AtualizacaoUsuario;

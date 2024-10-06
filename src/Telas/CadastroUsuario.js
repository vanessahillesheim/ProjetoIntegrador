import React, { useState } from "react";
import { View, Text, TouchableHighlight, Image, Pressable } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { estilos } from "../styleSheet/estilos";
import { EntradaTexto } from "./EntradaTexto";
import { cadastrar } from "../servicos/requisicoesfirebase"; // Função de cadastro
import { Alerta } from "../componentes/Alerta";
import { alteraDados } from "../utils/funcoesComum";
import * as ImagePicker from 'react-native-image-picker';
import axios from 'axios'; // Biblioteca para fazer requisições HTTP

function CadastroUsuario({ navigation }) {
    const [dados, setDados] = useState({
        email: '',
        senha: '',
        confirmaSenha: '',
        nome: '',
        endereco: {
            rua: '',
            bairro: '',
            cidade: '',
            cep: '',
        },
        foto: null,
    });

    const [statusError, setStatusError] = useState('');
    const [mensagemError, setMensagemError] = useState('');

    const abrirGaleriaOuCamera = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, response => {
            if (response.assets) {
                setDados(prevDados => ({
                    ...prevDados,
                    foto: response.assets[0].uri // Armazena a URI da imagem selecionada
                }));
            }
        });
    };

    const buscarEnderecoPorCEP = async (cep) => {
        try {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
            const { logradouro, bairro, localidade } = response.data;
            if (logradouro) {
                setDados(prevDados => ({
                    ...prevDados,
                    endereco: {
                        ...prevDados.endereco,
                        rua: logradouro,
                        bairro: bairro,
                        cidade: localidade,
                        cep: cep
                    }
                }));
            } else {
                setMensagemError('CEP não encontrado.');
                setStatusError('cep');
            }
        } catch (error) {
            setMensagemError('Erro ao buscar o endereço.');
            setStatusError('cep');
        }
    };

    async function realizarCadastro() {
        // Validações
        if (dados.nome === '') {
            setMensagemError('Preencha o seu nome');
            setStatusError('nome');
            return;
        } else if (dados.email === '') {
            setMensagemError('Preencha o seu e-mail');
            setStatusError('email');
            return;
        } else if (dados.senha === '') {
            setMensagemError('Preencha sua senha');
            setStatusError('senha');
            return;
        } else if (dados.senha.length < 6) {
            setMensagemError('A senha deve ter pelo menos 6 caracteres');
            setStatusError('senha');
            return;
        } else if (dados.confirmaSenha === '') {
            setMensagemError('Confirme sua senha');
            setStatusError('confirmaSenha');
            return;
        } else if (dados.confirmaSenha !== dados.senha) {
            setMensagemError('A senha não confere!');
            setStatusError('confirmaSenha');
            return;
        } else if (dados.endereco.rua === '') {
            setMensagemError('Preencha a sua rua');
            setStatusError('rua');
            return;
        } else if (dados.endereco.bairro === '') {
            setMensagemError('Preencha o seu bairro');
            setStatusError('bairro');
            return;
        } else if (dados.endereco.cidade === '') {
            setMensagemError('Preencha a sua cidade');
            setStatusError('cidade');
            return;
        } else if (dados.endereco.cep === '') {
            setMensagemError('Preencha o seu CEP');
            setStatusError('cep');
            return;
        } else if (!dados.foto) {
            setMensagemError('Adicione uma foto');
            setStatusError('foto');
            return;
        }

        // Cadastrar o usuário no Firebase Authentication
        const resultado = await cadastrar(dados.email, dados.senha, {
            nome: dados.nome,
            endereco: dados.endereco,
            foto: dados.foto,
            email: dados.email,
        });

        setStatusError('firebase');

        if (resultado === "sucesso") { // Verifica se o resultado foi bem-sucedido
            setMensagemError('Usuário cadastrado com sucesso!');
            setDados({
                email: '',
                senha: '',
                confirmaSenha: '',
                nome: '',
                endereco: {
                    rua: '',
                    bairro: '',
                    cidade: '',
                    cep: '',
                },
                foto: null,
            });
            navigation.navigate('CadastroSucessoUser');
        } else {
            setMensagemError(resultado); // Se houver outro erro
        }
    }

    return (
        <View style={estilos.fundo}>
            <View>
                <Text style={estilos.titulo}>
                    Preencha seu Cadastro
                </Text>
            </View>
            <View style={estilos.corpoCadastroUsuario}>
                <View style={{ paddingTop: 10 }}>
                    <EntradaTexto
                        label='Nome'
                        value={dados.nome}
                        onChangeText={valor => alteraDados('nome', valor, dados, setDados)}
                        error={statusError === 'nome'}
                        messageError={mensagemError}
                        containerStyle={{ height: 25 }}
                    />
                    <EntradaTexto
                        label='E-mail'
                        value={dados.email}
                        onChangeText={valor => alteraDados('email', valor, dados, setDados)}
                        error={statusError === 'email'}
                        messageError={mensagemError}
                        containerStyle={{ height: 25 }}
                    />
                    <EntradaTexto
                        label='Senha'
                        value={dados.senha}
                        onChangeText={valor => alteraDados('senha', valor, dados, setDados)}
                        error={statusError === 'senha'}
                        messageError={mensagemError}
                        secureTextEntry={true}
                        containerStyle={{ height: 25 }}
                    />
                    <EntradaTexto
                        label='Confirmar Senha'
                        value={dados.confirmaSenha}
                        onChangeText={valor => alteraDados('confirmaSenha', valor, dados, setDados)}
                        error={statusError === 'confirmaSenha'}
                        messageError={mensagemError}
                        secureTextEntry={true}
                        containerStyle={{ height: 25 }}
                    />
                    <EntradaTexto
                        label='CEP'
                        value={dados.endereco.cep}
                        onChangeText={valor => {
                            alteraDados('endereco.cep', valor, dados, setDados);
                            if (valor.length === 8) { // Quando o CEP tem 8 dígitos
                                buscarEnderecoPorCEP(valor); // Chama a função para buscar o endereço
                            }
                        }}
                        error={statusError === 'cep'}
                        messageError={mensagemError}
                        containerStyle={{ height: 25 }}
                    />
                    <EntradaTexto
                        label='Rua'
                        value={dados.endereco.rua}
                        onChangeText={valor => alteraDados('endereco.rua', valor, dados, setDados)}
                        error={statusError === 'rua'}
                        messageError={mensagemError}
                        containerStyle={{ height: 25 }}
                    />
                    <View style={estilos.containerLinha}>
                        <EntradaTexto
                            label='Bairro'
                            value={dados.endereco.bairro}
                            onChangeText={valor => alteraDados('endereco.bairro', valor, dados, setDados)}
                            error={statusError === 'bairro'}
                            messageError={mensagemError}
                            containerStyle={estilos.campoLinha}
                            height={25}
                        />
                        <EntradaTexto
                            label='Cidade'
                            value={dados.endereco.cidade}
                            onChangeText={valor => alteraDados('endereco.cidade', valor, dados, setDados)}
                            error={statusError === 'cidade'}
                            messageError={mensagemError}
                            containerStyle={estilos.campoLinha}
                            height={25}
                        />
                    </View>
                    <View style={{justifyContent: 'space-between', marginTop: 5, flexDirection: 'row', marginHorizontal: 20 }}>
                        <Pressable onPress={abrirGaleriaOuCamera} style={[estilos.cameraIcon, { height: 25, justifyContent: 'flex-end', flexDirection: 'row' }]}>
                            <Icon name="camera" size={20} color="#12B1F5" />
                            <Text > Adicionar Foto</Text>
                        </Pressable>

                        {dados.foto && (
                            <Image source={{ uri: dados.foto }} style={{ width: 80, height: 80, narginRight: 20 }} />
                        )}
                    </View>
                    </View>

                </View>
                <View style={estilos.rodapeCadastro}>
                    <Alerta
                        mensagem={mensagemError}
                        error={statusError === 'firebase'}
                        setError={setStatusError}
                    />
                    <TouchableHighlight style={estilos.rodapeBotao} onPress={realizarCadastro}>
                        <Text style={{ color: 'white', fontWeight: "bold" }}>Cadastrar</Text>
                    </TouchableHighlight>
                </View>
            </View>
            );
}

            export default CadastroUsuario;

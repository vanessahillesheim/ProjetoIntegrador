import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({

    fundo: {
        flex: 1,
        backgroundColor: 'white'

    },

    cabecalho: {
        flex: 0.2,
        flexDirection: "column",

    },
    cabecalhoCadastro: {
        flex: 0.25,
        flexDirection: "column",
    },

    fundoCabecalho: {
        width: "auto", height: 170, 
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
    },

    sucesso: {
        width: 130,
        height: 130,
        resizeMode: 'contain',
    },
    entrada_texto: {
        height: 60, width: 270, borderWidth: 1, borderColor: '#12B1F5', marginHorizontal: 10, fontSize: 16, padding: 5,
        borderRadius: 6, marginBottom: 20,
        textAlign: 'center'
    },
    entrada_texto2: {
        height: 60, width: 270, borderWidth: 1, borderColor: '#12B1F5', marginHorizontal: 10, fontSize: 20, padding: 5, 
        textAlign: 'center'
    },

    corpo: {
        flex: 0.25,
        paddingHorizontal: 20,
        alignItems: 'center',


    },

    corpoCadastro: {
        flex: 0.55,
        paddingHorizontal: 20,
        alignItems: 'center',


    },
    corpoMenu: {
        flex: 0.6,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: 'center',
  marginTop: 50


    },

    
    corpoFlatList: {
        flex: 0.7,
        paddingHorizontal: 20,
        alignItems: 'center',


    },

    rodapeCadastro: {
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rodape: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },

    rodapeLista: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    rodapeBotao: {
        width: 270,
        height: 60,
        backgroundColor: "#12B1F5",
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',

    },
    titulo: { color: '#0038A8', textAlign: 'center', fontSize: 'bold', fontSize: 18, marginBottom: 30 },


  
    lista: { marginHorizontal: 20, 
        backgroundColor: 'white', flex: 0.65, 
    paddingTop: 30 },

 
voltar:{width: 50, height: 50, alignItems: 'center', borderRadius: 25},

 viewPicker: {
        flex: 0.48, flexDirection: 'column', alignItems: 'center',
        width: "90%", paddingLeft: 20, paddingTop: 100
    },
    picker: { width: 300, borderRadius: 4, height: 30, margingLeft: 10 },

    exibir: {
        color: "white", fontWeight: 'bold', borderWidth: 1,
        borderColor: 'gray', textAlign: 'center', marginTop: 10, width: 100, borderRadius: 20, height: 30, paddingTop: 5, backgroundColor: "#12B1F5"
    },

    atendimentoHead: {
        flex: 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around'


    },

    atendimentoHeadText: {
        fontSize: 18,
        color: '#0038a8',

    },

    textoConteudo: {
        color: 'white', 
        fontSize: 16, 
        textAlign: 'justify'
    },
    separador: {
        height: 2, backgroundColor: '#12B1F5', marginTop: 4
    },
    


});
export { estilos };
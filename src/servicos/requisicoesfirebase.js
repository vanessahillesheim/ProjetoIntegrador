import { auth } from "../database/firebaseconexao";
import { createUserWithEmailAndPassword, 
         signInWithEmailAndPassword,
         AuthErrorCodes } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Importa o Firestore
import database from "../database/firebaseconexao"; // Importa a conexão do Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Importa as funções necessárias

function errosFirebase(error) {
    let mensagem = '';
    switch (error.code) {
        case 'auth/email-already-in-use':
            mensagem = "Esse e-mail já está em uso.";
            break;
        case 'auth/invalid-email':
            mensagem = "E-mail inválido.";
            break;
        case 'auth/weak-password':
            mensagem = "A senha precisa de no mínimo 6 caracteres.";
            break;
        default:
            mensagem = "Erro desconhecido.";
    }
    return mensagem;
}

export async function cadastrar(email, senha, usuarioData) {
    try {
        // Cria o usuário
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        // Armazena os dados do usuário na coleção 'usuarios'
        await addDoc(collection(database, 'usuarios'), {
            uid: user.uid, // Armazena o ID do usuário
            ...usuarioData // Espalha os dados do usuário
        });

        return "sucesso"; // Cadastro realizado com sucesso
    } catch (error) {
        console.log(error); // Log do erro para depuração
        return errosFirebase(error); // Retorna a mensagem de erro
    }
}

export async function logar(email, senha) {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        return "sucesso"; // Login realizado com sucesso
    } catch (error) {
        console.log(error); // Log do erro para depuração
        return "Erro ao logar";
    }
}

// Função para buscar os dados do usuário
export const buscarDadosUsuario = async () => {
    const usuario = auth.currentUser; // Obtém o usuário autenticado
    if (!usuario) return null; // Retorna null se não houver usuário autenticado

    const docRef = doc(database, 'usuarios', usuario.uid); // Referência ao documento do usuário
    const docSnap = await getDoc(docRef); // Obtém o documento

    if (docSnap.exists()) {
        return docSnap.data(); // Retorna os dados do documento
    } else {
        console.log("Documento não encontrado");
        return null; // Retorna null se o documento não existir
    }
};

// Função para atualizar os dados do usuário
export async function atualizarDadosUsuario(usuarioData) {
    const user = auth.currentUser; // Obtém o usuário autenticado
    if (user) {
        const docRef = doc(database, 'usuarios', user.uid);
        await updateDoc(docRef, usuarioData);
        return "sucesso"; // Retorna sucesso após a atualização
    }
    return "Erro ao atualizar dados"; // Retorna erro se não houver usuário
}
import { auth } from "../database/firebaseconexao";
import { createUserWithEmailAndPassword, 
            signInWithEmailAndPassword,
    
    AuthErrorCodes } from "firebase/auth";

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

export async function cadastrar(email, senha) {
    try {
        await createUserWithEmailAndPassword(auth, email, senha);
        return "sucesso"; // Cadastro realizado com sucesso
    } catch (error) {
        console.log(error); // Log do erro para depuração
        return errosFirebase(error); // Retorna a mensagem de erro
    }
}

export async function logar(email, senha) {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        return "sucesso"; // Cadastro realizado com sucesso
    } catch (error) {
        console.log(error); // Log do erro para depuração
        //return errosFirebase(error); 
         return "Erro ao logar"
    }
}

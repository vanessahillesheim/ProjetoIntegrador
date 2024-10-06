import { auth } from "../database/firebaseconexao";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore"; // Importa o Firestore
import database from "../database/firebaseconexao"; // Importa a conexão do Firestore
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Importa as funções necessárias

function errosFirebase(error) {
    let mensagem = '';
    switch (error.code) {
        case 'auth/invalid-email':
            mensagem = 'E-mail inválido.';
            break;
        case 'auth/email-already-in-use':
            mensagem = 'E-mail já cadastrado.';
            break;
        case 'auth/weak-password':
            mensagem = 'A senha deve ter pelo menos 6 caracteres.';
            break;
        case 'auth/user-not-found':
            mensagem = 'Usuário não encontrado.';
            break;
        case 'auth/wrong-password':
            mensagem = 'Senha incorreta.';
            break;
        default:
            mensagem = 'Erro desconhecido.';
            break;
    }
    return mensagem;
}

// Cadastrar um usuário
export async function cadastrar(email, senha, usuario) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        console.log('Usuário criado:', user.uid); // Adicionando log para verificar o UID do usuário

        // Adiciona os dados do usuário ao Firestore
        await addDoc(collection(database, "usuarios"), {
            uid: user.uid,
            email: usuario.email,
            nome: usuario.nome,
            endereco: usuario.endereco,
            foto: usuario.foto,
        });

        console.log('Usuário salvo no Firestore:', usuario); // Verifica os dados que estão sendo salvos
        return "sucesso"; // Retorna sucesso se tudo ocorreu bem
    } catch (error) {
        console.error('Erro ao cadastrar:', error); // Log de erro para ver o que está acontecendo
        return errosFirebase(error); // Retorna a mensagem de erro
    }
}

// Função para autenticar o usuário
export async function autenticar(email, senha) {
    try {
        await signInWithEmailAndPassword(auth, email, senha);
        return "sucesso"; // Retorna sucesso se tudo ocorreu bem
    } catch (error) {
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

// Função para atualizar os dados do usuário
export async function atualizarUsuario(uid, dados) {
    const userDoc = doc(database, "usuarios", uid);
    try {
        await updateDoc(userDoc, dados);
        return "sucesso"; // Retorna sucesso se a atualização ocorrer bem
    } catch (error) {
        return errosFirebase(error); // Retorna a mensagem de erro
    }
}

// Função para obter os dados do usuário
export async function obterUsuario(uid) {
    const userDoc = doc(database, "usuarios", uid);
    const docSnap = await getDoc(userDoc);
    
    if (docSnap.exists()) {
        return docSnap.data(); // Retorna os dados do usuário
    } else {
        return null; // Retorna null se o documento não existir
    }
}


// Função para atualizar a senha
const handleUpdatePassword = async (newPassword, currentPassword) => {
    const user = auth.currentUser;

    // Reautenticar o usuário
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    try {
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        Alert.alert("Sucesso", "Senha atualizada com sucesso.");
    } catch (error) {
        Alert.alert("Erro", "Não foi possível atualizar a senha. Tente novamente.");
        console.log("Erro ao atualizar a senha:", error);
    }
};

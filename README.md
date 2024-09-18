# RunTracking - Aplicativo do Corredor de Rua

RunTracking é um aplicativo desenvolvido para ajudar corredores a gerenciar suas corridas, acompanhar seu progresso e manter um histórico detalhado de suas atividades. O aplicativo permite o cadastro de perfis de corredores e registro de corridas, fornecendo ao corredor o histórico das corridas já concluídas (informações sobre o evento, classificação, tempo do percurso) e também o acesso ao calendário para verificação das corridas futuras agendadas.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)
- [Instalação](#instalação)
- [Configuração do Firebase](#configuração-do-firebase)
- 
## Visão Geral

O RunTracking foi criado para corredores amadores que desejam acompanhar suas corridas de forma simples e eficiente. Com o aplicativo, você pode:
- **Cadastrar e gerenciar perfis de corredores**
- **Registrar novas corridas**
- **Visualizar estatísticas e detalhes das corridas**
- **Acompanhar corridas passadas e futuras**

  
## Funcionalidades

- **Cadastro de Usuários**: Permite o registro de novos corredores e a manutenção de seus perfis.
- **Gerenciamento de Corridas**: Adiciona, edita e exclui corridas, com detalhes como data, distância, tempo, classificação, valor da inscrição.
- **Visualização da Agenda**: Verifique as corridas agendadas e ative a notificação de "retirada de kit".
- **Interface Intuitiva**: Navegação fácil com um design amigável.

## Uso

Após a instalação, você pode usar o aplicativo para:
- **Cadastrar um novo usuário**: Acesse a tela de cadastro e preencha as informações necessárias.
- **Adicionar uma corrida**: Navegue até a seção de corridas e adicione os detalhes da sua atividade.
- **Visualizar a agenda**: Verifique as corridas futuras e as notificações de retirada de kit.

## Tecnologias Utilizadas

- **React Native**: Para desenvolvimento de aplicativos móveis.
- **Node.js**: Para o backend e gerenciamento de pacotes.
- **Firebase**: Para armazenamento de dados locais.

## **Contribuição**
Contribuições são bem-vindas! Para contribuir com o projeto, por favor siga os seguintes passos:

Fork o repositório.
- Crie uma branch para a sua feature (git checkout -b minha-feature).
- Faça as alterações e commit (git commit -am 'Adiciona nova feature').
- Push para a branch (git push origin minha-feature).
- Abra um Pull Request.

## **Licença**
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.

## Instalação

Para instalar e rodar o RunTracking localmente, siga estas etapas:

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/usuario/RunTracking.git

2. **Navegue para o Diretório do Projeto**:
   ```bash
   cd RunTracking

3. **Instale as Dependências**:
Execute o seguinte comando para instalar todas as dependências listadas no arquivo package.json:
   ```bash
   npm install

4. **Inicie o servidor e comece a desenvolver, executando o comando**:
   ```bash
   npm start


## **Configuração do Firebase**

Para configurar o Firebase em seu projeto, siga estas etapas:

1. **Crie um Projeto no Firebase**:
   - Acesse o [Console do Firebase](https://console.firebase.google.com/).
   - Clique em **"Adicionar projeto"** e siga as instruções para criar um novo projeto Firebase.

2. **Adicione um App ao Projeto**:
   - No painel do Firebase, clique no ícone de **"Adicionar app"** para adicionar um aplicativo Android ou iOS.
   - Siga as instruções fornecidas para registrar o seu aplicativo e obter as credenciais necessárias.

3. **Configure o Firestore e Obtenha as Credenciais**:
   - No console do Firebase, configure o Firestore se ainda não estiver configurado.
   - Copie as credenciais do seu projeto.

4. **Atualize o Arquivo de Configuração do Firebase**:
   - Crie ou atualize o arquivo `src/config/firebaseconfig.js` com as suas credenciais do Firebase. O arquivo deve se parecer com o seguinte:

   ```javascript
   // src/config/firebaseconfig.js
   import { initializeApp } from "firebase/app";
   import { getFirestore } from "firebase/firestore";

   const firebaseConfig = {
     apiKey: "SUA_API_KEY",
     authDomain: "SEU_AUTH_DOMAIN",
     projectId: "SEU_PROJECT_ID",
     storageBucket: "SEU_STORAGE_BUCKET",
     messagingSenderId: "SEU_MESSAGING_SENDER_ID",
     appId: "SEU_APP_ID"
   };

   const app = initializeApp(firebaseConfig);
   const database = getFirestore(app);

   export default database;



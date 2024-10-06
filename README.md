# RunTracking - Aplicativo do Corredor de Rua
![Run Tracking App](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/RunTraking.JPG)
![Menu](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/menu.PNG)
![Nova Corrida](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/nova_corrida.PNG)
![Corridas](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/corridas.PNG)
![Calendário](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/calendario.PNG)
![Evento](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/evento.PNG)
![Perfil](https://raw.githubusercontent.com/vanessahillesheim/ProjetoIntegrador/master/src/img/perfil.PNG)

Assista ao vídeo de apresentação do aplicativo.
[![Assista ao vídeo](https://img.youtube.com/vi/F38zsjO55GI/0.jpg)](https://youtu.be/F38zsjO55GI)

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
- **Firebase**: Para autenticação do usuário e armazenamento de dados.

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

# 1. Clone o Repositório:
```bash
   git clone https://github.com/vanessahillesheim/ProjetoIntegrador.git

# 2. Navegue para o Diretório do Projeto:
```bash
   cd ProjetoIntegrador

# 3. Copie o package.json para o diretório raiz, se necessário:
if [ ! -f "package.json" ]; then
```bash
   cp caminho_do_repositorio/package.json .
fi

# 4. Instale as dependências do projeto:
```bash
   npm install

# 5. Inicie o servidor localmente:
```bash
npm run web

4. **Atualize o Arquivo de Configuração do Firebase**:
   - Crie ou atualize o arquivo `src/database/firebaseconexao.js` com as suas credenciais do Firebase. O arquivo deve se parecer com o seguinte:

   ```javascript
   // src/database/firebaseconexao.js
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

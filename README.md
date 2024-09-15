# RunTracking - Aplicativo do Corredor de Rua

RunTracking é um aplicativo desenvolvido para ajudar corredores a gerenciar suas corridas, acompanhar seu progresso e manter um histórico detalhado de suas atividades. 
O aplicativo permite o cadastro de perfis de corredores e registro de corridas, fornecendo ao corredor o histórico das corridas já concluídas (informações sobre o evento, 
classificação, tempo do percurso) e também o acesso ao calendário para verificação das corridas futuras agendadas.

## Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Instalação](#instalação)
- [Uso](#uso)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Contribuição](#contribuição)
- [Licença](#licença)

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

## Instalação

Para instalar e rodar o RunTracking localmente, siga estas etapas:

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/usuario/RunTracking.git

2. **Navegue para o Diretório do Projeto**:
```bash
cd RunTracking

4. **Copie arquivos de instalação**:
- Copie os arquivos package.json e package-lock.json e cole na raiz do projeto.

4. **Instale as Dependências**:
- Execute o seguinte comando para instalar todas as dependências listadas nos arquivos do item 3.
```bash
npm install

5. **Inicie o servidor**:
- Para iniciar o servidor e começar a desenvolver, execute:
```bash
npm start

## Uso

Após a instalação, você pode usar o aplicativo para:
- Cadastrar um novo usuário: Acesse a tela de cadastro e preencha as informações necessárias.
- Adicionar uma corrida: Navegue até a seção de corridas e adicione os detalhes da sua atividade.
- Visualizar a agenda: Verifique as corridas futuras e as notificações de retirada de kit.

## Tecnologias Utilizadas

- React Native: Para desenvolvimento de aplicativos móveis.
- Node.js: Para o backend e gerenciamento de pacotes.
- SQLite: Para armazenamento de dados locais.

## Contribuição

Contribuições são bem-vindas! Para contribuir com o projeto:
1. Faça um fork do repositório.
2. Crie uma nova branch (git checkout -b feature/nova-funcionalidade).
3. Faça as alterações desejadas e comite (git commit -am 'Adiciona nova funcionalidade').
4. Envie sua branch para o repositório remoto (git push origin feature/nova-funcionalidade).
5. Abra um pull request no GitHub.

## Licença
Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.




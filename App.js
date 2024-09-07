import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navegacao/StackNavigator"; // Certifique-se de que o caminho está correto

function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <StackNavigator/>
    </NavigationContainer>
  );
}

export default App;

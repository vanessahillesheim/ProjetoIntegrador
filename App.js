import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navegacao/StackNavigator"; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/servicos/AuthContext';
function App() {
   return (
     <SafeAreaProvider>
       <AuthProvider>
         <NavigationContainer>
           <StatusBar />
           <StackNavigator />
         </NavigationContainer> 
       </AuthProvider>
     </SafeAreaProvider>      
   );
}

export default App;

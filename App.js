import React from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/Navegacao/StackNavigator"; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
 
 
 
 
function App() {
   return (
     <SafeAreaProvider>
         <NavigationContainer>
            <StatusBar />
            <StackNavigator />
         </NavigationContainer>
         
      </SafeAreaProvider>      
   );
 
 
}
 
export default App;
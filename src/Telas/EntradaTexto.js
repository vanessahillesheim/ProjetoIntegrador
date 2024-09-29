import React, { useState } from "react";
import { TextInput, HelperText } from "react-native-paper";
import { estilos } from "../styleSheet/estilos";

export function EntradaTexto({ label, value, onChangeText, secureTextEntry, error, messageError, style }) {
    // Inicializa o estado de modo seguro baseado na prop secureTextEntry
    const [secureMode, setSecureMode] = useState(secureTextEntry);

    return (
        <>
            <TextInput
                label={label}
                value={value}
                error={error}
                secureTextEntry={secureTextEntry ? secureMode : false}  // Define a visibilidade do texto
                onChangeText={onChangeText}
                style={[estilos.entrada_texto, style]} // Combina o estilo padrão com o passado
                mode="outlined"
                activeOutlineColor="#12B1F5"
                right={
                    secureTextEntry ? (  // Verifica se o campo é de senha
                        <TextInput.Icon
                            name={secureMode ? 'eye-off' : 'eye'}  // Altera o ícone com base no estado
                            onPress={() => setSecureMode(!secureMode)}  // Alterna entre mostrar e esconder a senha
                        />
                    ) : null
                }
            />
            {error && (
                <HelperText type="error" visible={error}>
                    {messageError}
                </HelperText>
            )}
        </>
    );
}

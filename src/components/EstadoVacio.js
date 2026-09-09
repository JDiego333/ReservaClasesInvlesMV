import react from "react";
import { View, Text, StyleSheet } from "react-native";
import { Icoicons, Ionicons } from "@expo/vector-icons";
import { colors, spacing } from "../theme";

export default function EstadoVacio({ icono, titulo, mensaje, textoAccion, onAccion }) {
    return (
        <View style={style.contenedor}>
            <View style={style.circulo}> 
                <Ionicons name={icono} size={30} color={colors.primario} />
            </View>
            <Text style={style.titulo}>{titulo}</Text>
            <Text>{mensaje}</Text>
        </View>
    )
}
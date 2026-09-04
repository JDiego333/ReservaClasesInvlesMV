import React, { useState } from "react";
import { View, Text, FlatList, ScrollView, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import { UseResponsive } from "../hooks/UseResponsive";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { spacing, colors, typography, radius } from "../theme";
import { CLASES, NIVELES } from "../data/Clases";

export default function ClasesScreens ({navigation}) {
    const insets = useSafeAreaInsets();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('') 

    return (
        <View style={[style.pantalla, { paddingTop: insets.top + spacing.md }]}>
            <View style={{paddingHorizontal: spacing.lg}}>
                <Text style={typography.titulo}>Aplicacion de clases de ingles</Text>
                <View style={style.buscador}>
                    <Ionicons name="search" size={18}/>
                    <TextInput placeholder="Buscar nivel..." value={busqueda} onChangeText={setBusqueda} autoCorrect={false}/>

                    {busqueda.length > 0 && (<Ionicons name="close-circle" size={18} onPress={() => setBusqueda('')}/>)}
                </View>
                <ScrollView style={{flexGrow: 0}}>
                    {
                        NIVELES.map((item)=>(
                            <NivelFiltro key={item} etiqueta={item} activo={nivel === item} onPress={()=>setNivel(item)}/>
                        ))
                    }   
                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  buscador: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    height: 46,
    marginTop: spacing.lg,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  input: { flex: 1, fontSize: 14, color: colors.texto, paddingVertical: 0 },
});
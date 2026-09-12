import React, { useState, useMemo } from "react";
import { View, Text, FlatList, ScrollView, TextInput, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Ionicons } from "@expo/vector-icons";

import UseResponsive from "../hooks/UseResponsive";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import EstadoVacio from "../components/EstadoVacio";
import { spacing, colors, typography, radius } from "../theme";
import { CLASES, NIVELES } from "../data/Clases";

export default function ClasesScreens ({navigation}) {
    const insets = useSafeAreaInsets();
    const { columnas, paddingHorizontal } = UseResponsive();

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('') 

    const resultados = useMemo(() => {
        const textoBusqueda = busqueda.trim().toLowerCase();
        return CLASES.filter((clase) => {
            const coicidenciaNivel = nivel === 'Todos' || clase.nivel === nivel;
            const coicidenciaTextoBusqueda = textoBusqueda === '' || clase.titulo.toLowerCase().includes(textoBusqueda) ||
            clase.profesor.nombre.toLowerCase().includes(textoBusqueda);
            return coicidenciaNivel && coicidenciaTextoBusqueda;
        });
    }, [nivel, busqueda]);

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
                <FlatList data={resultados} keyExtractor={(item) => item.id} renderItem={({item}) => (
                    <Card clase={item} onPress={() => navigation.navigate('DetallesClase', { clase: item })} />
                )} numColumns={columnas} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal, flexGrow: 1, paddingBottom: spacing.xl }} ListEmptyComponent={<EstadoVacio icono="search-outline" titulo="No se encontraron resultados" mensaje="Intenta con otro término de búsqueda." />} onAccion={() => {
                    setNivel('Todos');
                    setBusqueda('');
                }} />
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
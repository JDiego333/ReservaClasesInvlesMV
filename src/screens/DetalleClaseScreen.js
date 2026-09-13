import React, { useState, useMemo, useLayoutEffect } from "react";
import { View, Text, FlatList, ScrollView, TextInput, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import UseResponsive from "../hooks/UseResponsive";
import { colors, spacing, typography, radius } from "../theme";
import { formatPrecio } from "../utils/formatPrecio";

export default function DetalleClaseScreen({ route, navigation }) { 

    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const { isTable } = UseResponsive();

    useLayoutEffect(() => {
        navigation.setOptions({title: clase.titulo});
    },[navigation, clase.titulo]); 

    return (
        <View style={[styles.pantalla]}>
            <ScrollView contentContainerStyle={{paddingBottom: 120}} showVerticalScrollIndicator={false} >
                <Image source={{ uri: clase.imagen }} style={[styles.portada, { height: isTable ? 300 : 200 }]} resizeMode="cover" />  
                
                <View style={styles.contenido}>
                  <Text style={typography.titulo}>{clase.titulo}</Text>

                  <Text style={styles.etiqueta}>DESCRIPCION</Text>
                  <Text style={styles.descripcion}>{clase.descripcion}</Text>

                  <Text style={styles.etiqueta}>PROFESOR</Text>
                  <View style={styles.profesor}>
                    <Image source={{ uri: clase.profesor.foto }} style={styles.avatar} />
                    <View>
                      <Text style={styles.profesorNombre}>{clase.profesor.nombre}</Text>
                      <Text style={styles.profesorPais}>{clase.profesor.pais}</Text>
                    </View>
                  </View>

                  <Text style={styles.etiqueta}>PRECIO</Text>
                  <Text style={styles.precio}>{formatPrecio(clase.precio)}</Text>
                </View>

                <View style={styles.duracion}>
                  <Text style={styles.etiqueta}>DURACION</Text>
                  <Text style={styles.duracionValor}>{clase.duracion}</Text>
                </View>

                <View style={styles.cupos}> 
                  <Text style={styles.etiqueta}>CUPOS DISPONIBLES</Text>
                  <Text style={styles.cuposValor}>{clase.cupos}</Text>
                </View>

                <View style={styles.horario}>
                  <Text style={styles.etiqueta}>HORARIOS DISPONIBLES</Text>
                  {clase.horarios.map((horario) => (
                    <View key={horario}>
                      <Text style={styles.horarioValor}>{horario}</Text>
                    </View>
                  ))}
                </View>

                    {/*TAREA PENDIENTE
                    //Boton realizar reserva*/}
                    
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  portada: { width: '100%', backgroundColor: colors.primarioSuave },
  contenido: { padding: spacing.lg },
  etiqueta: {
    color: colors.textoSuave,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: spacing.xl,
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  profesorPais: { fontSize: 14, color: colors.textoSuave, marginTop: spacing.xs },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  barra: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.superficie,
    borderTopWidth: 1,
    borderTopColor: colors.borde,
    paddingVertical: spacing.lg,
    paddingTop: spacing.lg
  },
  precio: { fontSize: 18, fontWeight: '800', color: colors.primario },
});

import React, { useState, useMemo, useLayoutEffect } from "react";
import { View, Text, FlatList, ScrollView, TextInput, StyleSheet, Image, Alert, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; 
import UseResponsive from "../hooks/useResponsive";
import { colors, spacing, typography, radius } from "../theme";
import { formatPrecio } from "../utils/formatPrecio";

export default function DetalleClaseScreen({ route, navigation }) { 

    const insets = useSafeAreaInsets();
    const {clase} = route.params;
    const { isTable } = UseResponsive();
    const [horarioSeleccionado, setHorarioSeleccionado] = useState(null);
    const [reservaRealizada, setReservaRealizada] = useState(false);
    const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos);

    useLayoutEffect(() => {
        navigation.setOptions({title: clase.titulo});
    },[navigation, clase.titulo]); 

    return (
        <View style={styles.pantalla}>
          <ScrollView contentContainerStyle={styles.scrollContenido} showVerticalScrollIndicator={false}>
            <Image source={{ uri: clase.imagen }} style={[styles.portada, { height: isTable ? 300 : 220 }]} resizeMode="cover" />
                
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

                  <View style={styles.resumenPrecio}>
                    <View>
                      <Text style={styles.etiqueta}>PRECIO</Text>
                      <Text style={styles.precio}>{formatPrecio(clase.precio)}</Text>
                    </View>
                    <View style={styles.nivelBadge}>
                      <Text style={styles.nivelTexto}>{clase.nivel}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.infoFila}>
                  <View style={styles.infoItem}>
                    <Text style={styles.etiqueta}>DURACION</Text>
                    <Text style={styles.infoValor}>{clase.duracion} min</Text>
                  </View>
                  <View style={styles.infoItem}>
                    <Text style={styles.etiqueta}>CUPOS DISPONIBLES</Text>
                    <Text style={styles.infoValor}>{cuposDisponibles}</Text>
                  </View>
                </View>

                <Text style={styles.seccionTitulo}>HORARIOS DISPONIBLES</Text>
                {clase.horarios.map((horario) => (
                  <Pressable key={horario} onPress={() => setHorarioSeleccionado(horario)} style={[
                    styles.horario,
                    horarioSeleccionado === horario && styles.horarioSeleccionado
                  ]}>
                    <Text style={[styles.horarioValor, horarioSeleccionado === horario && styles.horarioTextoSeleccionado]}>{horario}</Text>
                  </Pressable>
                ))}

                <Pressable onPress={() => {
                  if (cuposDisponibles <= 0) {
                    Alert.alert("Sin cupos disponibles", "Esta clase ya no tiene cupos disponibles.");
                    return;
                  }

                  if (!horarioSeleccionado) {
                    Alert.alert("Selecciona un horario", "Por favor selecciona un horario antes de realizar la reserva.");
                    return;
                  }

                  Alert.alert("Confirmar reserva", `¿Deseas realizar la reserva para el horario "${horarioSeleccionado}"?`, [
                    {
                      text: "Cancelar",
                      style: "cancel"
                    },
                    {
                      text: "Confirmar",
                      onPress: () => {setReservaRealizada(true);
                        setCuposDisponibles((cupos) => cupos - 1);
                        Alert.alert("Reserva realizada con el horario " + horarioSeleccionado);
                      }
                    }
                ]); }} style={styles.botonReserva}>
                  <Text style={styles.boton}>Realizar Reserva</Text>
                </Pressable>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  pantalla: { flex: 1, backgroundColor: colors.fondo },
  scrollContenido: { paddingBottom: 36 },
  portada: { width: '100%', backgroundColor: '#dfe3ff' },
  contenido: { padding: spacing.lg, paddingTop: 24 },
  etiqueta: {
    color: colors.textoSuave,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginTop: spacing.lg,
  },
  datos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
  },
  dato: { alignItems: 'center', gap: 2 },
  datoValor: { fontSize: 16, fontWeight: '800', color: colors.texto },
  profesor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: '#ffffff',
    borderRadius: radius.md,
    padding: spacing.lg,
    marginTop: spacing.sm,
  },
  avatar: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.borde },
  profesorNombre: { fontSize: 15, fontWeight: '700', color: colors.texto },
  profesorPais: { fontSize: 14, color: colors.textoSuave, marginTop: spacing.xs },
  descripcion: { ...typography.cuerpo, color: colors.textoSuave, lineHeight: 22, marginTop: spacing.sm },
  resumenPrecio: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: spacing.sm },
  precio: { fontSize: 20, fontWeight: '800', color: colors.primario, marginTop: spacing.xs },
  nivelBadge: { backgroundColor: '#eef0ff', borderRadius: radius.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  nivelTexto: { color: colors.primario, fontSize: 12, fontWeight: '800' },
  infoFila: { flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, marginTop: spacing.sm },
  infoItem: { flex: 1, backgroundColor: '#ffffff', borderRadius: radius.md, padding: spacing.md },
  infoValor: { color: colors.texto, fontSize: 18, fontWeight: '800', marginTop: spacing.xs },
  seccionTitulo: { color: colors.texto, fontSize: 14, fontWeight: '800', marginHorizontal: spacing.lg, marginTop: 28, marginBottom: spacing.sm },
  horario: { backgroundColor: '#ffffff', borderColor: colors.borde, borderWidth: 1, borderRadius: radius.md, padding: spacing.md, marginHorizontal: spacing.lg, marginVertical: spacing.xs },
  horarioSeleccionado: { backgroundColor: colors.primario, borderColor: colors.primario },
  horarioValor: { fontSize: 14, fontWeight: '600', color: colors.texto },
  horarioTextoSeleccionado: { color: '#ffffff' },
  botonReserva: { backgroundColor: colors.primario, padding: spacing.md, marginHorizontal: spacing.lg, marginTop: 24, borderRadius: radius.md, alignItems: 'center' },
  boton: { fontSize: 16, fontWeight: '800', color: '#ffffff' },
});

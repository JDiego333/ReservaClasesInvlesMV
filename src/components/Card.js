import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, radius } from '../theme';
import { formatPrecio } from '../utils/formatPrecio';

export default function Card({clase, onPress}) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [styles.tarjeta, pressed && styles.tarjetaPresionada]}>
            <Image style={styles.imagen} source={{uri: clase.imagen}} />
            <View style={styles.contenido}>
                <EtiquetaNivel nivel={clase.nivel}/>
                <Text style={styles.titulo} numberOfLines={2}>{clase.titulo}</Text>
                <Text style={styles.descripcion} numberOfLines={4}>{clase.descripcion}</Text>
                <Text style={styles.profesor} numberOfLines={1}>{clase.profesor.nombre}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    tarjeta: {
        flex: 1,
        margin: spacing.sm,
        backgroundColor: '#ffffff',
        borderRadius: radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: colors.borde,
        elevation: 3,
        shadowColor: '#111827',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
    },
    tarjetaPresionada: { opacity: 0.88, transform: [{ scale: 0.99 }] },
    imagen: { width: '100%', height: 260, backgroundColor: '#e5e7eb' },
    contenido: { padding: spacing.md },
    titulo: { fontSize: 18, lineHeight: 24, fontWeight: '800', color: colors.texto, marginTop: spacing.md },
    descripcion: { fontSize: 15, lineHeight: 21, color: '#6b7280', marginTop: spacing.sm },
    profesor: { fontSize: 15, fontWeight: '700', color: colors.primario, marginTop: spacing.md },
    detalles: { flexDirection: 'row', alignItems: 'center', marginTop: spacing.md },
    detalle: { fontSize: 12, color: '#6b7280', fontWeight: '600' },
    separador: { fontSize: 14, color: '#9ca3af', marginHorizontal: spacing.sm },
});
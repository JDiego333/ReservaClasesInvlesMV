import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, typography } from '../theme';
import {CLASES} from '../data/clases';

export default function Card({clase, onPress}) {
    return (
        <Pressable onPress={onPress}> 
            <Image source={{uri: clase.imagen}}/>
            <View>
                <EtiquetaNivel nivel={clase.nivel}/>
                <Text>{clase.titulo}</Text>
                <Text>{clase.precio}</Text>
                <Text>{clase.nivel}</Text>
                <Text>{clase.profesor.nombre}</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    titulo: {fontSize: 16, color: colors.texto}
});
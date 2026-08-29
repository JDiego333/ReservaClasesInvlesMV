import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import EtiquetaNivel from './EtiquetaNivel';
import { colors, spacing, typography } from '../theme';

export default function Card({clase, onPress}) {
    return (
        <Pressable onPress={onPress}> 
            <Image source={{uri: clase.imagen}}/>
            <View>
                <EtiquetaNivel nivel={clase.nivel}/>
            </View>
        </Pressable>
    )
}
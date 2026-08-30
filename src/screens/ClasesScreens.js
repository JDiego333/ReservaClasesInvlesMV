import React, { useState } from "react";
import { View, Text, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "../components/Card";
import NivelFiltro from "../components/NivelFiltro";
import { spacing, colors, typography } from "../theme";
import { CLASES, NIVELES } from "../data/Clases";
import { ScrollView, TextInput } from "react-native";
export default function ClasesScreens ({navigation}) {

    const [nivel, setNivel] = useState('Todos');
    const [busqueda, setBusqueda] = useState('') 

    return (
        <View>
            <View>
                <Text>Aplicacion de clases de ingles</Text>
                <View>
                    <Ionicons name="search" size={18}/>
                    <TextInput placeholder="Buscar nivel..." value={nivel} onChangeText={setNivel} autoCorrect={false}/>

                    {busqueda.length > 0 && (<Ionicons name="close-circle" size={18} onPress={() => setBusqueda('')}/>)}
                </View>
                <ScrollView style={{flexGrow: 0}}>
                    {
                        NIVELES.map((item)=>(
                            <NivelFiltro etiqueta={item} activo={nivel === item} onPress={()=>setNivel(item)}/>
                        ))
                    }   
                </ScrollView>
            </View>
        </View>
    )
}


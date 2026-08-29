import React from "react";
import { View, Text, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Card from "../components/Card";
import { spacing, colors, typography } from "../theme";
import { CLASES, NIVELES } from "../data/clases";
import { TextInput } from "react-native/types_generated/index";

export default function ClasesScreens ({navigation}) {

    const {nivel, setNivel} = React.useState('Todos');

    return (
        <View>
            <View>
                <Text>Aplicacion de clases de ingles</Text>
                <View>
                    <Ionicons name="search" size={18}/>
                    <TextInput placeholder="Buscar nivel..." value={nivel} onChangeText={setNivel} autoCorrect={false}/>
                </View>
            </View>
        </View>
    )
}


import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ClasesScreens from "../screens/ClasesScreens";
import { Color } from "react-native/types_generated/Libraries/Animated/AnimatedExports";

const Stack = createNativeStackNavigator();

export default function ClasesStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Home" component={ClasesScreens} options={{headerShow: false}}/>
        </Stack.Navigator>
    )
}
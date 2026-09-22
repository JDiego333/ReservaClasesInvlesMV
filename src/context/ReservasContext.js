import React, { useState, useEffect, useCallback, useMemo, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CLAVE_RESERVAS = '@reservas_ingles';

export const ReservasContext = createContext(null);

export function ReservaProvider({children}){
    const [reservas, setRersevas] = useState([]);
    const [cargando, setCargando] = useState(true);

    //Cargar las reservas que tengo guardadas, sino tengo nada me devuelvo a un arreglo vacio

    useEffect(()=>{
        const cargar = async() =>{
            try{
                const guardado = await AsyncStorage.getItem(CLAVE_RESERVAS);
                if(guardado !== null ){
                    setRersevas(JSON.parse(guardado))
                }
            }catch(error){
                console.log('Error leyendo reservas: ' + error)
            }finally{
                setCargando(false)
            }
        };
        cargar();
    }, []);
}
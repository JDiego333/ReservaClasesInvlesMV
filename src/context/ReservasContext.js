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

    //Hacer el guardado

    useEffect(()=>{
        if (cargando) return; //Evita sobreescribir el arreglo
        AsyncStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas)).catch((error)=>
            console.log('Ocurrio un error guardando la reserva: ', error)
        );
    },[reservas, cargando]);

    const agregarReserva = useCallback((clase, horario)=>{
        const nueva = {
            id: clase.id + '-' + horario,
            titulo: clase.titulo,
            nivel: clase.nivel,
            profesor: clase.profesor.nombre + ' ' + clase.profesor.apellido,
            precio: clase.precio,
            horario,
            creadaEn: new Date().toISOString()
        };
        let resultados = { ok: true };
        setRersevas((previa)=>{
            if(previa.some((r)=> r.id === nueva.id)) {
                resultados = {ok: false, mensaje: 'Data duplicado'}
                return previa
            }
            return [nueva, ...previa]
        });
        return resultados
    },[]); //Cierre de Callback

    const valor = useMemo(
        ()=>{reservas, cargando, agregarReserva},[reservas, cargando, agregarReserva]
    ); 

    return <ReservasContext.Provider value={valor} >{children}</ReservasContext.Provider>
    
}
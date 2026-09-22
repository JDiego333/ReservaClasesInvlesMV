import { useContext } from 'react';
import { ReservaContext } from '../context/ReservaContext';

export default function useRereserva() {
    const context = useContext(ReservaContext);
    if (!context) {
        throw new Error('useReserva debe usarse dentro de un <ReservaProvider>');
    }
    return context;
};
import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

// 1. Definimos las interfaces para TypeScript
interface IPropietario {
  nombre: string;
  apellido: string;
}

interface ICanonMes {
  mes: number;
  anio: number;
  montoOriginal: number;
  montoDisponible: number;
  montoGastado: number;
  _id?: string;
}

interface ILote {
  _id: string;
  loteId: string;
  propietarios: IPropietario[];
  canones: ICanonMes[];
  createdAt?: string;
}

interface LoteState {
    lotes: ILote[];
    loading: boolean;
    error: string | null;
  // Acciones
    fetchLotes: () => Promise<void>;
    addLote: (nuevoLote: Partial<ILote>) => Promise<boolean>;
    pagarExpensa: (loteId: string, mes: number, anio: number, monto: number) => Promise<void>;
    consumirCanon: (loteId: string, monto: number) => Promise<void>;  
    deleteLote: (id: string) => Promise<void>;
    deleteCanon: (loteId: string, canonId: string) => Promise<void>;
    updatePropietarios: (id: string, propietarios: any[]) => Promise<void>;
}

// 2. Creamos el Store
export const useLoteStore = create<LoteState>((set) => ({
    lotes: [],
    loading: false,
    error: null,

  // Obtener todos los lotes de la DB
    fetchLotes: async () => {
    set({ loading: true, error: null });
    try {
        const response = await axios.get('/api/lotes');
        
        // Verificamos si la data es un array directamente o si viene dentro de una propiedad 'lotes'
        const dataParaGuardar = Array.isArray(response.data) 
            ? response.data 
            : (response.data.lotes || []);

        set({ lotes: dataParaGuardar, loading: false });
    } catch (error: any) {
        set({ 
            error: error.response?.data?.message || 'Error al obtener lotes', 
            loading: false,
            lotes: [] // Importante: resetear a array vacío en caso de error
        });
    }
},

  // Agregar un nuevo lote
    addLote: async (loteData) => {
        set({ loading: true, error: null });
        try {
        const response = await axios.post('http://localhost:5000/api/lotes', loteData);
        
        // Actualizamos el estado local agregando el nuevo lote al array existente
        set((state) => ({ 
            lotes: [...state.lotes, response.data],
            loading: false 
        }));
        
        return true;
        } catch (error: any) {
        console.error(error);
        throw error;
        }
        set({ loading: false });
        return false;
    },
  // Pagar expensa de un lote
    pagarExpensa: async (loteId: string, mes: number, anio: number, monto: number) => {
    try {
        const res = await axios.post('http://localhost:5000/api/lotes/pagar-expensa', { 
            loteId, mes, anio, monto 
        });
        
        set((state) => ({
            lotes: state.lotes.map((l) => (l.loteId === loteId ? res.data.lote : l))
        }));
    } catch (error) {
        console.error("Error 404 detectado. Verifica la ruta en el servidor.");
    }
},

    consumirCanon: async (loteId, montoAGastar) => {
    try {
        const res = await axios.post('http://localhost:5000/api/lotes/consumir-canon', { loteId, montoAGastar });
        
        set((state) => ({
            // CAMBIO AQUÍ: Comparamos l.loteId con el loteId que recibimos
            lotes: state.lotes.map((l) => (l.loteId === loteId ? res.data.lote : l))
        }));

        // Opcional: retornar el lote para que el componente sepa que terminó bien
        return res.data.lote; 
    } catch (error) {
        console.error("Error en consumirCanon:", error);
        throw error; // Lanzamos el error para que LoteCard lo capture en su catch
    }
},

    deleteLote: async (id: string) => {
    try {
        await axios.delete(`http://localhost:5000/api/lotes/${id}`);
        set((state) => ({
            lotes: state.lotes.filter((l) => l._id !== id)
        }));
    } catch (error) {
        console.error(error);
        throw error; // Lo lanzamos para que el componente lo maneje
    }
},

    deleteCanon: async (loteId: string, canonId: string) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/lotes/${loteId}/canon/${canonId}`);
        set((state) => ({
            lotes: state.lotes.map((l) => (l._id === loteId ? res.data.lote : l))
        }));
    } catch (error) { console.error(error); }
},
    updatePropietarios: async (id, propietarios) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/lotes/${id}/propietarios`, { propietarios });
        set((state) => ({
            lotes: state.lotes.map((l) => (l._id === id ? res.data.lote : l))
        }));
        toast.success("Propietarios actualizados");
    } catch (error) {
        toast.error("Error al actualizar");
    }
}
}));
import { useState, useEffect } from 'react';
import { useLoteStore } from '../store/useLoteStore';
import { LoteCard } from '../components/LoteCard';
import { LoteMiniCard } from '../components/LoteMiniCard';
import { LoteForm } from '../components/LoteForm';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import { Login } from '../components/Login';

function App() {
  const { fetchLotes, lotes } = useLoteStore();
  const [selectedLoteId, setSelectedLoteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const { token } = useAuthStore();

  useEffect(() => {
    // Solo pedimos lotes si hay un token válido
    if (token) {
      fetchLotes();
    }
  }, [token, fetchLotes]);

  // 1. PRIMERO validamos el token. Si no hay, mostramos Login y cortamos la ejecución aquí.
  if (!token) {
    return (
      <>
        <Toaster position="top-right" />
        <Login />
      </>
    );
  }


  // Ahora estamos seguros de que el usuario está logueado y 'lotes' existe.
  const lotesFiltrados = (Array.isArray(lotes) ? lotes : []).filter(lote => 
  lote.loteId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lote.propietarios?.some((p: any) => 
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.apellido.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const selectedLote = lotes.find(l => l._id === selectedLoteId);

  // 3. Renderizamos el Dashboard
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Toaster position="top-right" />
      
      <nav className="max-w-7xl mx-auto flex justify-between items-center mb-6">
          <h1 className="text-2xl font-black">Sistema Expensas</h1>
          <button 
            onClick={() => useAuthStore.getState().logout()}
            className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors"
          >
            Cerrar Sesión ⏻
          </button>
      </nav>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <LoteForm closeForm={() => setShowForm(false)} />
        </div>
      )}

      <header className="max-w-6xl mx-auto mb-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Gestión de Barrios
          </h1>
          <p className="text-slate-500 font-medium">
            Control de Expensas y Canon de Restaurant
          </p>
        </div>

        <button 
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
        >
          + Nuevo Lote
        </button>
      </header>

      <main className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 h-screen md:h-[85vh] overflow-hidden pb-20 md:pb-0">
        
        <div className="w-full md:w-1/2 flex flex-col gap-4 h-[60vh] md:h-full order-1">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input 
              type="text"
              placeholder="Buscar por lote o propietario..."
              className="w-full p-4 pl-12 rounded-2xl border border-slate-200 shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-3 min-h-0">
            <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Resultados ({lotesFiltrados.length})
            </h2>
            
            {lotesFiltrados.length > 0 ? (
              lotesFiltrados.map((lote) => (
                <LoteMiniCard 
                  key={lote._id} 
                  lote={lote} 
                  isSelected={selectedLoteId === lote._id}
                  onSelect={() => setSelectedLoteId(lote._id)}
                />
              ))
            ) : (
              <div className="text-center py-10 text-slate-400 italic bg-white/30 rounded-2xl border-2 border-dashed border-slate-200">
                No se encontraron coincidencias
              </div>
            )}
          </div>
        </div>

        <div className="w-full md:w-1/2 order-2">
          {selectedLote ? (
            <LoteCard lote={selectedLote} />
          ) : (
            <div className="hidden md:flex h-full border-2 border-dashed border-slate-200 rounded-3xl items-center justify-center text-slate-400 bg-white/50">
              <p>Selecciona un lote de la lista</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
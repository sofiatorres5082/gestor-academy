import { useEffect, useState } from "react";
import {
  getTalleres,
  getTalleresInactivos,
  actualizarTaller,
  eliminarTaller,
  restaurarTaller,
  crearTaller,
} from "../services/talleres";
import TalleresTable from "../components/TalleresTable";
import TallerFormModal from "../components/TalleresFormModal";
import ConfirmModal from "../../../components/ConfirmModal";
import { Toaster, toast } from "react-hot-toast";

export default function TalleresPage() {
  const [talleres, setTalleres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [editandoTaller, setEditandoTaller] = useState(null);
  const [confirmarEliminacionId, setConfirmarEliminacionId] = useState(null);
  const [confirmarRestauracionId, setConfirmarRestauracionId] = useState(null);
  const [accionLoading, setAccionLoading] = useState(false);
  const [totalResultados, setTotalResultados] = useState(0);


  useEffect(() => {
    cargarTalleres(paginaActual);
  }, [mostrarInactivos, paginaActual]);

  const cargarTalleres = async (page = 1) => {
    setLoading(true);
    try {
      const response = mostrarInactivos
        ? await getTalleresInactivos(page)
        : await getTalleres(page);

      setTalleres(response.data);
      setPaginaActual(response.current_page);
      setUltimaPagina(response.last_page);
    } catch (error) {
      console.error("Error al cargar talleres", error);
      toast.error("Error al cargar talleres");
    } finally {
      setLoading(false);
    }
  };

  const talleresFiltrados = talleres.filter((taller) => {
    if (!busqueda.trim()) return true;
    const termino = busqueda.toLowerCase().trim();
    return (
      (taller.nombre?.toLowerCase().includes(termino)) ||
      (taller.profesor?.toLowerCase().includes(termino))
    );
  });

  const cambiarPagina = (nuevaPagina) => {
    if (
      nuevaPagina !== paginaActual &&
      nuevaPagina >= 1 &&
      nuevaPagina <= ultimaPagina
    ) {
      setPaginaActual(nuevaPagina);
    }
  };

  const toggleMostrarInactivos = () => {
    setMostrarInactivos(!mostrarInactivos);
    setPaginaActual(1);
    setBusqueda("");
  };

  const limpiarBusqueda = () => setBusqueda("");

  const abrirModalCrear = () => {
    setEditandoTaller(null);
    setModalAbierto(true);
  };

  const abrirModalEditar = (taller) => {
    setEditandoTaller(taller);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setEditandoTaller(null);
    setModalAbierto(false);
  };

  const handleGuardarTaller = async (data) => {
    try {
      if (editandoTaller) {
        await actualizarTaller(editandoTaller.id, data);
        toast.success("Taller actualizado correctamente");
      } else {
        await crearTaller(data);
        toast.success("Taller creado correctamente");
      }
      cerrarModal();
      cargarTalleres(paginaActual);
    } catch (error) {
      console.error("Error al guardar taller", error);
      toast.error("Error al guardar taller");
    }
  };

  const handleEliminarTaller = (id) => {
    setConfirmarEliminacionId(id);
  };

  const confirmarEliminar = async () => {
    setAccionLoading(true);
    try {
      await eliminarTaller(confirmarEliminacionId);
      toast.success("Taller eliminado correctamente");
      setConfirmarEliminacionId(null);
      cargarTalleres(paginaActual);
    } catch (error) {
      console.error("Error al eliminar taller", error);
      toast.error("Error al eliminar taller");
    } finally {
      setAccionLoading(false);
    }
  };

  const handleRestaurarTaller = (id) => {
    setConfirmarRestauracionId(id);
  };

  const confirmarRestaurar = async () => {
    setAccionLoading(true);
    try {
      await restaurarTaller(confirmarRestauracionId);
      toast.success("Taller restaurado correctamente");
      setConfirmarRestauracionId(null);
      cargarTalleres(paginaActual);
    } catch (error) {
      console.error("Error al restaurar taller", error);
      toast.error("Error al restaurar taller");
    } finally {
      setAccionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Talleres
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {mostrarInactivos ? "Talleres inactivos" : "Talleres activos"}
            {busqueda && ` - Buscando: "${busqueda}"`}
          </p>
        </div>
        <button
          onClick={abrirModalCrear}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="text-lg">+</span>
          Crear Taller
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar por nombre o profesor..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {busqueda && (
              <button
                onClick={limpiarBusqueda}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                ×
              </button>
            )}
          </div>
          <button
            onClick={toggleMostrarInactivos}
            className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
              mostrarInactivos
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {mostrarInactivos ? "Ver Activos" : "Ver Inactivos"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Cargando talleres...</p>
        </div>
      ) : (
        <>
          <TalleresTable
            talleres={talleresFiltrados}
            onEdit={abrirModalEditar}
            onDelete={handleEliminarTaller}
            onRestore={handleRestaurarTaller}
          />

          {ultimaPagina > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${
                  paginaActual === 1
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                ← Anterior
              </button>

              {Array.from({ length: ultimaPagina }).map((_, i) => {
                const page = i + 1;
                return (
                  <button
                    key={page}
                    onClick={() => cambiarPagina(page)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${
                      page === paginaActual
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() => cambiarPagina(paginaActual + 1)}
                disabled={paginaActual === ultimaPagina}
                className={`px-3 py-1.5 rounded-md text-sm font-medium cursor-pointer ${
                  paginaActual === ultimaPagina
                    ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Siguiente →
              </button>
            </div>
          )}
        </>
      )}

      {modalAbierto && (
        <TallerFormModal
          onClose={cerrarModal}
          tallerEditando={editandoTaller}
          onGuardar={handleGuardarTaller}
        />
      )}

      {confirmarEliminacionId && (
        <ConfirmModal
          open={true}
          onClose={() => setConfirmarEliminacionId(null)}
          onConfirm={confirmarEliminar}
          loading={accionLoading}
          titulo="Eliminar taller"
          mensaje="¿Estás seguro que querés eliminar este taller?"
          confirmText="Eliminar"
          cancelText="Cancelar"
        />
      )}

      {confirmarRestauracionId && (
        <ConfirmModal
          open={true}
          onClose={() => setConfirmarRestauracionId(null)}
          onConfirm={confirmarRestaurar}
          loading={accionLoading}
          titulo="Restaurar taller"
          mensaje="¿Querés restaurar este taller?"
          confirmText="Restaurar"
          cancelText="Cancelar"
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

import { useEffect, useState } from "react";
import {
  getSocios,
  getSociosInactivos,
  actualizarSocio,
  eliminarSocio,
  restaurarSocio,
} from "../services/socios";
import SociosTable from "../components/SociosTable";
import SocioFormModal from "../components/SocioFormModal";
import VerSocioModal from "../components/VerSocioModal";
import ConfirmModal from "../components/ConfirmModal";
import { Toaster, toast } from "react-hot-toast";

export default function SociosPage() {
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostrarInactivos, setMostrarInactivos] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);
  const [ultimaPagina, setUltimaPagina] = useState(1);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [editandoSocio, setEditandoSocio] = useState(null);
  const [confirmarEliminacionId, setConfirmarEliminacionId] = useState(null);
  const [confirmarRestauracionId, setConfirmarRestauracionId] = useState(null);
  const [accionLoading, setAccionLoading] = useState(false);

  useEffect(() => {
    cargarSocios(paginaActual);
  }, [mostrarInactivos, paginaActual]);

  const cargarSocios = async (page = 1) => {
    setLoading(true);
    try {
      const response = mostrarInactivos
        ? await getSociosInactivos(page)
        : await getSocios(page);

      setSocios(response.data);
      setPaginaActual(response.current_page);
      setUltimaPagina(response.last_page);
    } catch (error) {
      console.error("Error al cargar socios", error);
      toast.error("Error al cargar socios");
    } finally {
      setLoading(false);
    }
  };

  const sociosFiltrados = socios.filter((socio) => {
    if (!busqueda.trim()) return true;
    const termino = busqueda.toLowerCase().trim();
    return (
      socio.nombre?.toLowerCase().includes(termino) ||
      socio.email?.toLowerCase().includes(termino) ||
      socio.telefono?.includes(termino)
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

  const abrirModalVer = (socio) => {
    setSocioSeleccionado(socio);
  };
  const cerrarModalVer = () => {
    setSocioSeleccionado(null);
  };

  const abrirModalEditar = (socio) => {
    setEditandoSocio(socio);
    setModalAbierto(true);
  };
  const cerrarModalEditar = () => {
    setEditandoSocio(null);
    setModalAbierto(false);
  };

  const handleActualizarSocio = async (id, datosActualizados) => {
    try {
      await actualizarSocio(id, datosActualizados);
      toast.success("Socio actualizado correctamente");
      cerrarModalEditar();
      cargarSocios(paginaActual);
    } catch (error) {
      console.error("Error al actualizar socio", error);
      toast.error("Error al actualizar socio");
    }
  };

  const handleEliminarSocio = (id) => {
    setConfirmarEliminacionId(id);
  };

  const confirmarEliminar = async () => {
    setAccionLoading(true);
    try {
      await eliminarSocio(confirmarEliminacionId);
      toast.success("Socio eliminado correctamente");
      setConfirmarEliminacionId(null);
      cargarSocios(paginaActual);
    } catch (error) {
      console.error("Error al eliminar socio", error);
      toast.error("Error al eliminar socio");
    } finally {
      setAccionLoading(false);
    }
  };

  const handleRestaurarSocio = (id) => {
    setConfirmarRestauracionId(id);
  };

  const confirmarRestaurar = async () => {
    setAccionLoading(true);
    try {
      await restaurarSocio(confirmarRestauracionId);
      toast.success("Socio restaurado correctamente");
      setConfirmarRestauracionId(null);
      cargarSocios(paginaActual);
    } catch (error) {
      console.error("Error al restaurar socio", error);
      toast.error("Error al restaurar socio");
    } finally {
      setAccionLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Socios
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            {mostrarInactivos ? "Socios inactivos" : "Socios activos"}
            {busqueda && ` - Buscando: "${busqueda}"`}
          </p>
        </div>
        <button
          onClick={() => setModalAbierto(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="text-lg">+</span>
          Crear Socio
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Buscar por nombre, email o teléfono..."
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
          <span className="text-sm text-gray-500 whitespace-nowrap">
            {sociosFiltrados.length} resultado
            {sociosFiltrados.length !== 1 && "s"}
          </span>
        </div>
      </div>

      {loading ? (
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Cargando socios...</p>
        </div>
      ) : (
        <>
          <SociosTable
            socios={sociosFiltrados}
            onView={abrirModalVer}
            onEdit={abrirModalEditar}
            onDelete={handleEliminarSocio}
            onRestore={handleRestaurarSocio}
          />

          {ultimaPagina > 1 && (
            <div className="flex justify-center mt-6 gap-2 flex-wrap items-center">
              <button
                onClick={() => cambiarPagina(paginaActual - 1)}
                disabled={paginaActual === 1}
                className={`px-3 py-1.5 rounded-md text-sm font-medium ${
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
        <SocioFormModal
          onClose={() => {
            setModalAbierto(false);
            setEditandoSocio(null);
          }}
          onSocioCreado={cargarSocios}
          socioEditando={editandoSocio}
          onActualizar={handleActualizarSocio}
        />
      )}

      {socioSeleccionado && (
        <VerSocioModal socio={socioSeleccionado} onClose={cerrarModalVer} />
      )}

      {confirmarEliminacionId && (
        <ConfirmModal
          open={true}
          onClose={() => setConfirmarEliminacionId(null)}
          onConfirm={confirmarEliminar}
          loading={accionLoading}
          titulo="Eliminar socio"
          mensaje="¿Estás seguro que querés eliminar este socio?"
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
          titulo="Restaurar socio"
          mensaje="¿Querés restaurar este socio?"
          confirmText="Restaurar"
          cancelText="Cancelar"
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

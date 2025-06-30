import { useEffect, useState } from "react";
import { Search, User, BookOpen, Plus, X, Users, Calendar } from "lucide-react";
import {
  inscribirSocio,
  desinscribirSocio,
  obtenerTalleresDeSocio,
} from "../services/inscripciones";
import { getSocios } from "../../socios/services/socios";
import { getTalleres } from "../../talleres/services/talleres";
import { Toaster, toast } from "react-hot-toast";
import ConfirmModal from "../../../components/ConfirmModal";

export default function InscripcionesPage() {
  const [socios, setSocios] = useState([]);
  const [talleres, setTalleres] = useState([]);
  const [socioSeleccionado, setSocioSeleccionado] = useState(null);
  const [talleresDelSocio, setTalleresDelSocio] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingTalleresSocio, setLoadingTalleresSocio] = useState(false);
  const [procesando, setProcesando] = useState(false);

  // Estados para el modal de confirmación
  const [modalDesinscripcion, setModalDesinscripcion] = useState({
    abierto: false,
    taller: null,
  });

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      const [sociosRes, talleresRes] = await Promise.all([
        getSocios(),
        getTalleres(),
      ]);
      setSocios(sociosRes.data);
      setTalleres(talleresRes.data);
    } catch (error) {
      toast.error("Error al cargar datos");
    } finally {
      setLoading(false);
    }
  };

  const cargarTalleresDeSocio = async (socio) => {
    setSocioSeleccionado(socio);
    setLoadingTalleresSocio(true);
    setTalleresDelSocio([]);

    try {
      const res = await obtenerTalleresDeSocio(socio.id);
      setTalleresDelSocio(res.data);
    } catch (error) {
      toast.error("Error al cargar talleres del socio");
    } finally {
      setLoadingTalleresSocio(false);
    }
  };

  const handleInscribir = async (tallerId) => {
    setProcesando(true);
    try {
      await inscribirSocio(socioSeleccionado.id, tallerId);
      toast.success("Inscripción exitosa");
      setLoadingTalleresSocio(true);
      const res = await obtenerTalleresDeSocio(socioSeleccionado.id);
      setTalleresDelSocio(res.data);
      setLoadingTalleresSocio(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al inscribir");
      setLoadingTalleresSocio(false);
    } finally {
      setProcesando(false);
    }
  };

  const abrirModalDesinscripcion = (taller) => {
    setModalDesinscripcion({
      abierto: true,
      taller,
    });
  };

  const cerrarModalDesinscripcion = () => {
    setModalDesinscripcion({
      abierto: false,
      taller: null,
    });
  };

  const confirmarDesinscripcion = async () => {
    if (!modalDesinscripcion.taller) return;

    setProcesando(true);
    try {
      await desinscribirSocio(
        socioSeleccionado.id,
        modalDesinscripcion.taller.id
      );
      toast.success("Desinscripción exitosa");
      setLoadingTalleresSocio(true);
      const res = await obtenerTalleresDeSocio(socioSeleccionado.id);
      setTalleresDelSocio(res.data);
      setLoadingTalleresSocio(false);
      cerrarModalDesinscripcion();
    } catch (error) {
      toast.error("Error al desinscribir");
      setLoadingTalleresSocio(false);
    } finally {
      setProcesando(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return "Sin fecha";

    try {
      const date = new Date(fecha);
      return date.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "Fecha inválida";
    }
  };

  const talleresDisponibles = talleres.filter(
    (t) => !talleresDelSocio.some((inscripto) => inscripto.id === t.id)
  );

  const sociosFiltrados = socios.filter((s) => {
    if (!busqueda.trim()) return true;
    const termino = busqueda.toLowerCase();
    return (
      s.nombre?.toLowerCase().includes(termino) ||
      s.email?.toLowerCase().includes(termino)
    );
  });

  const limpiarBusqueda = () => setBusqueda("");

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-8 rounded-lg shadow-sm border text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-2 text-gray-600">Cargando datos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Users className="h-7 w-7 text-blue-600" />
          Gestión de Inscripciones
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Administra las inscripciones de socios a talleres
          {socioSeleccionado && ` - ${socioSeleccionado.nombre}`}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar socio por nombre o email..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            {busqueda && (
              <button
                onClick={limpiarBusqueda}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          {socioSeleccionado && (
            <button
              onClick={() => setSocioSeleccionado(null)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <X className="h-4 w-4" />
              Limpiar selección
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <User className="h-5 w-5 text-gray-600" />
                Socios ({sociosFiltrados.length})
              </h2>
            </div>

            <div className="p-4">
              <div className="max-h-96 overflow-y-auto space-y-2">
                {sociosFiltrados.length > 0 ? (
                  sociosFiltrados.map((socio) => (
                    <div
                      key={socio.id}
                      onClick={() => cargarTalleresDeSocio(socio)}
                      className={`p-3 rounded-lg cursor-pointer transition-all border ${
                        socioSeleccionado?.id === socio.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm truncate">
                            {socio.nombre}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {socio.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      No se encontraron socios
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {socioSeleccionado ? (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {socioSeleccionado.nombre}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {socioSeleccionado.email}
                    </p>
                  </div>
                </div>
              </div>

              {loadingTalleresSocio ? (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Cargando talleres...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-green-50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-green-600" />
                        Inscripto ({talleresDelSocio.length})
                      </h3>
                    </div>

                    <div className="p-4">
                      {talleresDelSocio.length > 0 ? (
                        <div className="space-y-2">
                          {talleresDelSocio.map((taller) => (
                            <div
                              key={taller.id}
                              className="p-3 bg-green-50 border border-green-200 rounded-lg"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-900 text-sm">
                                  {taller.nombre}
                                </span>
                                <button
                                  onClick={() =>
                                    abrirModalDesinscripcion(taller)
                                  }
                                  disabled={procesando}
                                  className="text-xs px-2 py-1 text-red-600 hover:bg-red-50 rounded transition-colors disabled:opacity-50 cursor-pointer"
                                >
                                  Quitar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">
                            Sin inscripciones
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-blue-50">
                      <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                        <Plus className="h-5 w-5 text-blue-600" />
                        Disponibles ({talleresDisponibles.length})
                      </h3>
                    </div>

                    <div className="p-4">
                      {talleresDisponibles.length > 0 ? (
                        <div className="space-y-2">
                          {talleresDisponibles.map((taller) => (
                            <div
                              key={taller.id}
                              className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                            >
                              <span className="font-medium text-gray-900 text-sm">
                                {taller.nombre}
                              </span>
                              <button
                                onClick={() => handleInscribir(taller.id)}
                                disabled={procesando}
                                className="text-xs px-2 py-1 text-blue-600 hover:bg-blue-100 rounded transition-colors disabled:opacity-50 cursor-pointer"
                              >
                                Agregar
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-500 text-sm mb-4">
                            No hay talleres disponibles
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border h-96 flex items-center justify-center">
              <div className="text-center">
                <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Selecciona un socio
                </h3>
                <p className="text-gray-500 text-sm">
                  Busca y selecciona un socio para gestionar sus inscripciones
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        open={modalDesinscripcion.abierto}
        onClose={cerrarModalDesinscripcion}
        onConfirm={confirmarDesinscripcion}
        titulo="Confirmar desinscripción"
        mensaje={`¿Estás seguro que querés desinscribir a ${socioSeleccionado?.nombre} del taller "${modalDesinscripcion.taller?.nombre}"?`}
        confirmText="Sí, desinscribir"
        cancelText="Cancelar"
        type="danger"
        loading={procesando}
      />

      <Toaster position="top-right" />
    </div>
  );
}

import { useEffect, useState } from "react";
import Modal from "../../../components/Modal";
import { getTalleresDeSocio } from "../services/socios";

export default function VerSocioModal({ socio, onClose }) {
  const [talleres, setTalleres] = useState([]);
  const [loadingTalleres, setLoadingTalleres] = useState(false);

  useEffect(() => {
    if (socio?.id) {
      setLoadingTalleres(true);
      getTalleresDeSocio(socio.id)
        .then(setTalleres)
        .catch(() => setTalleres([]))
        .finally(() => setLoadingTalleres(false));
    }
  }, [socio]);

  if (!socio) return null;

  return (
    <Modal open={true} onClose={onClose}>
      {({ cerrar }) => (
        <>
          <h2 className="text-lg font-semibold mb-4">Detalles del Socio</h2>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nombre:</strong> {socio.nombre || "—"}
            </div>
            <div>
              <strong>Email:</strong> {socio.email || "—"}
            </div>
            <div>
              <strong>DNI:</strong> {socio.dni || "—"}
            </div>
            <div>
              <strong>Teléfono:</strong> {socio.telefono || "—"}
            </div>
            <div>
              <strong>Dirección:</strong> {socio.direccion || "—"}
            </div>
            <div>
              <strong>Fecha de nacimiento:</strong>{" "}
              {socio.fecha_nacimiento
                ? new Date(socio.fecha_nacimiento).toLocaleDateString()
                : "—"}
            </div>
            <div>
              <strong>Estado:</strong>{" "}
              {socio.deleted_at ? (
                <span className="text-red-600 font-semibold">Inactivo</span>
              ) : (
                <span className="text-green-600 font-semibold">Activo</span>
              )}
            </div>

            <div>
              <strong>Talleres inscriptos:</strong>
              {loadingTalleres ? (
                <p className="text-sm text-gray-500 mt-1">Cargando talleres...</p>
              ) : talleres.length === 0 ? (
                <p className="text-sm text-gray-500 mt-1">No está inscripto en ningún taller</p>
              ) : (
                <ul className="mt-1 list-disc list-inside text-sm text-gray-700">
                  {talleres.map((t) => (
                    <li key={t.id}>
                      {t.nombre}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              onClick={cerrar}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
            >
              Cerrar
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
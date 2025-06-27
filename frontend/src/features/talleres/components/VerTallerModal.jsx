import Modal from "../../../components/Modal";

export default function VerTallerModal({ taller, onClose }) {
  if (!taller) return null;

  return (
    <Modal open={true} onClose={onClose}>
      {({ cerrar }) => (
        <>
          <h2 className="text-lg font-semibold mb-4">Detalles del Taller</h2>

          <div className="space-y-3 text-gray-700">
            <div>
              <strong>Nombre:</strong> {taller.nombre || "—"}
            </div>
            <div>
              <strong>Profesor:</strong> {taller.profesor || "—"}
            </div>
            <div>
              <strong>Descripción:</strong> {taller.descripcion || "—"}
            </div>
            <div>
              <strong>Horario:</strong> {taller.horario || "—"}
            </div>
            <div>
              <strong>Días:</strong> {taller.dias || "—"}
            </div>
            <div>
              <strong>Estado:</strong>{" "}
              {taller.deleted_at ? (
                <span className="text-red-600 font-semibold">Inactivo</span>
              ) : (
                <span className="text-green-600 font-semibold">Activo</span>
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

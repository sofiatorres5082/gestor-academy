import Modal from "../../../components/Modal";

export default function ConfirmModal({
  open,
  onClose,
  onConfirm,
  mensaje = "¿Estás seguro que querés continuar?",
  titulo = "Confirmar acción",
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  loading = false,
}) {
  return (
    <Modal open={open} onClose={onClose}>
      {({ cerrar }) => (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">{titulo}</h2>
          <p className="text-sm text-gray-700">{mensaje}</p>

          <div className="flex justify-center gap-4 pt-4">
            <button
              onClick={cerrar}
              className="text-gray-600 hover:underline cursor-pointer"
              disabled={loading}
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors cursor-pointer"
            >
              {loading ? "Procesando..." : confirmText}
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
}

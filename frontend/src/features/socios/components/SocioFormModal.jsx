import { useState } from "react";
import { crearSocio } from "../services/socios";
import toast from "react-hot-toast";
import Modal from "../../../components/Modal"; // Ajustá la ruta si lo pusiste en otro lugar

const initialForm = {
  nombre: "",
  email: "",
  dni: "",
  telefono: "",
  direccion: "",
  fecha_nacimiento: "",
};

export default function SocioFormModal({ onClose, onSocioCreado }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const nuevo = await crearSocio(form);
      toast.success("Socio creado exitosamente");
      onSocioCreado(nuevo);
      onClose(); // el cierre ahora lo maneja Modal internamente con animación
    } catch (error) {
      toast.error("Error al crear socio");
      console.error(error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      {({ cerrar }) => (
        <>
          <h2 className="text-lg font-semibold mb-4">Crear nuevo socio</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              name="dni"
              placeholder="DNI"
              value={form.dni}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              name="telefono"
              placeholder="Teléfono"
              value={form.telefono}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="text"
              name="direccion"
              placeholder="Dirección"
              value={form.direccion}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
            <input
              type="date"
              name="fecha_nacimiento"
              value={form.fecha_nacimiento}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={cerrar}
                className="text-gray-600 hover:underline cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
          </form>
        </>
      )}
    </Modal>
  );
}

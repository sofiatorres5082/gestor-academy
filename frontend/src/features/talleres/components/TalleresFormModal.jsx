import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Modal from "../../../components/Modal";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  descripcion: yup.string().nullable(),
  profesor: yup.string().nullable(),
  dias: yup.string().nullable(),
  horario: yup.string().nullable(),
});

export default function TallerFormModal({ onClose, onGuardar, tallerEditando }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      profesor: "",
      dias: "",
      horario: "",
    },
  });

  useEffect(() => {
    if (tallerEditando) {
      reset(tallerEditando);
    } else {
      reset();
    }
  }, [tallerEditando, reset]);

  const onSubmit = async (data) => {
    try {
      await onGuardar(data);
    } catch (error) {
      console.error("Error al guardar", error);
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      {({ cerrar }) => (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {tallerEditando ? "Editar taller" : "Crear nuevo taller"}
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Nombre"
                {...register("nombre")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.nombre ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.nombre && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.nombre.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Profesor"
                {...register("profesor")}
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Días"
                {...register("dias")}
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div>
              <input
                type="text"
                placeholder="Horario"
                {...register("horario")}
                className="w-full border px-3 py-2 rounded border-gray-300"
              />
            </div>

            <div>
              <textarea
                placeholder="Descripción (opcional)"
                {...register("descripcion")}
                rows={3}
                className="w-full border px-3 py-2 rounded border-gray-300"
              ></textarea>
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={cerrar}
                disabled={isSubmitting}
                className="text-gray-600 hover:underline cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
              >
                {isSubmitting
                  ? "Guardando..."
                  : tallerEditando
                  ? "Actualizar"
                  : "Guardar"}
              </button>
            </div>
          </form>
        </div>
      )}
    </Modal>
  );
}

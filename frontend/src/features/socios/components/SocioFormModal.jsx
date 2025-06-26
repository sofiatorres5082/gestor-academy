import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { crearSocio } from "../services/socios";
import Modal from "../../../components/Modal";

const schema = yup.object().shape({
  nombre: yup.string().required("El nombre es obligatorio"),
  email: yup
    .string()
    .email("El email no es válido")
    .required("El email es obligatorio"),
  dni: yup
    .string()
    .matches(/^\d{8}$/, "El DNI debe tener 8 dígitos")
    .required("El DNI es obligatorio"),
  telefono: yup
    .string()
    .matches(/^\d{7,15}$/, "El teléfono debe tener entre 7 y 15 dígitos")
    .nullable()
    .transform((value) => (value === "" ? null : value)),
  direccion: yup
    .string()
    .nullable()
    .transform((v) => (v === "" ? null : v)),
  fecha_nacimiento: yup
    .date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .typeError("La fecha de nacimiento es obligatoria")
    .required("La fecha de nacimiento es obligatoria")
    .max(new Date(), "La fecha no puede ser futura"),
});

export default function SocioFormModal({
  onClose,
  onSocioCreado,
  onActualizar,
  socioEditando = null,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm({
    defaultValues: {
      nombre: "",
      email: "",
      dni: "",
      telefono: "",
      direccion: "",
      fecha_nacimiento: "",
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (socioEditando) {
      reset({
        nombre: socioEditando.nombre || "",
        email: socioEditando.email || "",
        dni: socioEditando.dni || "",
        telefono: socioEditando.telefono || "",
        direccion: socioEditando.direccion || "",
        fecha_nacimiento: socioEditando.fecha_nacimiento?.split("T")[0] || "",
      });
    } else {
      reset();
    }
  }, [socioEditando, reset]);

  const onSubmit = async (data) => {
    try {
      if (data.fecha_nacimiento) {
        data.fecha_nacimiento = new Date(data.fecha_nacimiento)
          .toISOString()
          .split("T")[0];
      }

      if (socioEditando) {
        await onActualizar(socioEditando.id, data);
      } else {
        const nuevo = await crearSocio(data);
        onSocioCreado(nuevo);
      }

      onClose();
    } catch (error) {
      const backendErrors = error.response?.data?.errors;

      if (backendErrors) {
        if (backendErrors.dni) {
          const mensajeOriginal = backendErrors.dni[0];
          let mensajeUsuario = mensajeOriginal;

          if (
            mensajeOriginal.toLowerCase().includes("dni has already been taken")
          ) {
            mensajeUsuario = "El DNI ya está en uso";
          }

          setError("dni", {
            type: "manual",
            message: mensajeUsuario,
          });
        }

        if (backendErrors.email) {
          const mensajeOriginal = backendErrors.email[0];
          let mensajeUsuario = mensajeOriginal;

          if (
            mensajeOriginal
              .toLowerCase()
              .includes("email has already been taken")
          ) {
            mensajeUsuario = "El correo electrónico ya está en uso";
          }

          setError("email", {
            type: "manual",
            message: mensajeUsuario,
          });
        }
      } else {
        console.error(error.response?.data || error);
      }
    }
  };

  return (
    <Modal open={true} onClose={onClose}>
      {({ cerrar }) => (
        <div>
          <h2 className="text-lg font-semibold mb-4">
            {socioEditando ? "Editar socio" : "Crear nuevo socio"}
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
                type="email"
                placeholder="Correo electrónico"
                {...register("email")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="DNI"
                {...register("dni")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.dni ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.dni && (
                <p className="text-red-600 text-sm mt-1">{errors.dni.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Teléfono"
                {...register("telefono")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.telefono ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.telefono && (
                <p className="text-red-600 text-sm mt-1">{errors.telefono.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Dirección"
                {...register("direccion")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.direccion ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.direccion && (
                <p className="text-red-600 text-sm mt-1">{errors.direccion.message}</p>
              )}
            </div>

            <div>
              <input
                type="date"
                {...register("fecha_nacimiento")}
                className={`w-full border px-3 py-2 rounded ${
                  errors.fecha_nacimiento ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fecha_nacimiento && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.fecha_nacimiento.message}
                </p>
              )}
            </div>

            <div className="flex justify-center gap-4 pt-4">
              <button
                type="button"
                onClick={cerrar}
                disabled={isSubmitting}
                className="text-gray-600 hover:underline cursor-pointer "
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
                  : socioEditando
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

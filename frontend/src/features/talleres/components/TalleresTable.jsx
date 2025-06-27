import { useState } from "react";
import { Edit, Eye, Trash2, RotateCcw } from "lucide-react";
import VerTallerModal from "./VerTallerModal";

const TalleresTable = ({ talleres = [], onEdit, onDelete, onRestore }) => {
  const [tallerSeleccionado, setTallerSeleccionado] = useState(null);

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Profesor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Horario
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Días
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {talleres.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-gray-400" />
                      </div>
                      <p className="text-sm">No hay talleres registrados</p>
                    </div>
                  </td>
                </tr>
              ) : (
                talleres.map((taller) => (
                  <tr
                    key={taller.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {taller.nombre}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {taller.profesor || "—"}
                    </td>
                    <td
                      className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate"
                      title={taller.descripcion}
                    >
                      {taller.descripcion || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {taller.horario || "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {taller.dias ? `${taller.dias}` : "—"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          taller.deleted_at
                            ? "bg-red-100 text-red-700 border border-red-200"
                            : "bg-green-100 text-green-700 border border-green-200"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            taller.deleted_at ? "bg-red-400" : "bg-green-400"
                          }`}
                        />
                        {taller.deleted_at ? "Inactivo" : "Activo"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onEdit(taller)}
                          className="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors duration-150 cursor-pointer"
                          title="Editar taller"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setTallerSeleccionado(taller)}
                          className="inline-flex items-center p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-150 cursor-pointer"
                          title="Ver detalles del taller"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {taller.deleted_at ? (
                          <button
                            onClick={() => onRestore(taller.id)}
                            className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md transition-colors duration-150 cursor-pointer"
                            title="Restaurar taller"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        ) : (
                          <button
                            onClick={() => onDelete(taller.id)}
                            className="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors duration-150 cursor-pointer"
                            title="Eliminar taller"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {tallerSeleccionado && (
        <VerTallerModal
          taller={tallerSeleccionado}
          onClose={() => setTallerSeleccionado(null)}
        />
      )}
    </>
  );
};

export default TalleresTable;

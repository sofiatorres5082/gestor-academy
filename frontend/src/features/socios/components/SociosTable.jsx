import { Edit, Eye, Trash2, RotateCcw } from 'lucide-react';

const SociosTable = ({ socios = [], onEdit, onView, onDelete, onRestore }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DNI</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teléfono</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Dirección</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nacimiento</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {socios.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <Eye className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-sm">No hay socios registrados</p>
                  </div>
                </td>
              </tr>
            ) : (
              socios.map((socio) => (
                <tr key={socio.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{socio.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.dni}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.telefono || "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.direccion || "—"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {socio.fecha_nacimiento
                      ? new Date(socio.fecha_nacimiento).toLocaleDateString()
                      : "—"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        socio.deleted_at
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : "bg-green-100 text-green-700 border border-green-200"
                      }`}
                    >
                      <span 
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          socio.deleted_at ? "bg-red-400" : "bg-green-400"
                        }`}
                      />
                      {socio.deleted_at ? "Inactivo" : "Activo"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button 
                        onClick={() => onEdit(socio)}
                        className="inline-flex items-center p-1.5 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-md transition-colors duration-150 cursor-pointer"
                        title="Editar socio"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onView(socio)}
                        className="inline-flex items-center p-1.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors duration-150 cursor-pointer"
                        title="Ver detalles"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {socio.deleted_at ? (
                        <button 
                          onClick={() => onRestore(socio.id)}
                          className="inline-flex items-center p-1.5 text-green-600 hover:text-green-900 hover:bg-green-50 rounded-md transition-colors duration-150 cursor-pointer"
                          title="Restaurar socio"
                        >
                          <RotateCcw className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => onDelete(socio.id)}
                          className="inline-flex items-center p-1.5 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-md transition-colors duration-150 cursor-pointer"
                          title="Eliminar socio"
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
  );
};

export default SociosTable;

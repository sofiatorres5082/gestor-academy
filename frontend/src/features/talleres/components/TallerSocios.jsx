import { useState, useEffect } from 'react';
import { Users, Download } from 'lucide-react';
import { getTalleres, getSociosDeTaller } from '../../dashboard/services/dashboard';
import * as XLSX from 'xlsx';

const TallerSocios = () => {
  const [talleres, setTalleres] = useState([]);
  const [selectedTaller, setSelectedTaller] = useState('');
  const [socios, setSocios] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTalleres().then(setTalleres);
  }, []);

  useEffect(() => {
    if (selectedTaller) {
      setLoading(true);
      getSociosDeTaller(selectedTaller)
        .then(setSocios)
        .catch(console.error)
        .finally(() => setLoading(false));
    } else {
      setSocios([]);
    }
  }, [selectedTaller]);

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(socios);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Inscriptos');
    XLSX.writeFile(wb, 'inscriptos.xlsx');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Socios por Taller</h2>
      
      <div className="mb-6">
        <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
          Seleccionar Taller
        </label>
        <select
          className="block w-full max-w-md px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={selectedTaller}
          onChange={(e) => setSelectedTaller(e.target.value)}
        >
          <option value="">Seleccioná un taller</option>
          {talleres.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nombre}
            </option>
          ))}
        </select>
      </div>

      {selectedTaller && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-900">
              Inscriptos del Taller
            </h3>
            {socios.length > 0 && (
              <button
                onClick={exportarExcel}
                className="inline-flex items-center px-3 py-1.5 border border-blue-200 text-xs font-medium rounded-md text-blue-600 bg-blue-50 hover:bg-blue-100 hover:border-blue-300 transition-colors duration-150 cursor-pointer"
              >
                <Download className="w-4 h-4 mr-1.5" />
                Exportar Excel
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            {loading ? (
              <div className="px-6 py-12 text-center">
                <div className="animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              </div>
            ) : socios.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="text-sm">No hay socios inscriptos en este taller</p>
                </div>
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">DNI</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Teléfono</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {socios.map((socio) => (
                    <tr key={socio.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{socio.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.dni || "—"}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{socio.telefono || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TallerSocios;
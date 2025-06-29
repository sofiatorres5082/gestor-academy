import ResumenStats from '../components/ResumenStats';

const Dashboard = () => {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h1 className="text-3xl font-bold text-gray-900">Panel de Administración</h1>
          <p className="text-gray-600 mt-2">Gestiona socios, talleres e inscripciones desde aquí</p>
        </div>

        <ResumenStats />
      </div>
    </div>
  );
};

export default Dashboard;
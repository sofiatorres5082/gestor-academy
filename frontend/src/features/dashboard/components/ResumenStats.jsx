import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, Award, Eye } from 'lucide-react';
import { getResumenDashboard } from '../services/dashboard';

const ResumenStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getResumenDashboard()
      .then(setStats)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-48 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-500">Error al cargar el resumen</p>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Inscripciones",
      value: stats.total_inscripciones,
      icon: Users,
      color: "blue"
    },
    {
      title: "Taller Más Popular",
      value: stats.taller_mas_popular?.nombre || "—",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Socio Más Participativo",
      value: stats.socio_mas_participativo?.nombre || "—",
      icon: Award,
      color: "purple"
    },
    {
      title: "Talleres Sin Inscriptos",
      value: stats.talleres_sin_inscriptos.length,
      icon: Eye,
      color: "orange"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Resumen General</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                    {stat.title}
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {stat.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center border ${colorClasses[stat.color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResumenStats;
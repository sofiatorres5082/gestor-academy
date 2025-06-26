import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardList,
  LogOut,
  Menu,
  X,
} from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#1e1e42] text-white p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>


      <aside
        className={`
          fixed lg:relative top-0 left-0 h-full w-64 bg-[#1e1e42] text-white 
          flex flex-col justify-between z-50 transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold">Gestor Academy</h1>
                <p className="text-sm text-blue-300">Panel de administración</p>
              </div>
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-white hover:bg-[#1e1e42] p-1 rounded"
              >
                <X size={20} />
              </button>
            </div>
          </div>
          <nav className="mt-6">
            <SidebarItem
              to="/admin"
              icon={<LayoutDashboard />}
              label="Dashboard"
              onClick={toggleSidebar}
            />
            <SidebarItem
              to="/admin/socios"
              icon={<Users />}
              label="Socios"
              onClick={toggleSidebar}
            />
            <SidebarItem
              to="/admin/talleres"
              icon={<Calendar />}
              label="Talleres"
              onClick={toggleSidebar}
            />
            <SidebarItem
              to="/admin/inscripciones"
              icon={<ClipboardList />}
              label="Inscripciones"
              onClick={toggleSidebar}
            />
          </nav>
        </div>

        <div className="p-6 border-t border-gray-700">
          <button className="flex items-center gap-3 hover:bg-[#26265a] px-3 py-2 rounded w-full cursor-pointer">
            <LogOut size={20} />
            <span>Cerrar sesión</span>
          </button>
        </div>
      </aside>
    </>
  );
};

const SidebarItem = ({ to, icon, label, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center px-6 py-3 transition-colors ${
        isActive
          ? "bg-[#26265a]"
          : "hover:bg-[#26265a]"
      }`
    }
  >
    <div className="mr-3">{icon}</div>
    <span>{label}</span>
  </NavLink>
);

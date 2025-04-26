import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  HomeIcon,
  UsersIcon,
  ClipboardListIcon,
  LogoutIcon,
} from "@heroicons/react/outline";

const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: "Dashboard", path: "/", icon: HomeIcon },
    { name: "Clients", path: "/clients", icon: UsersIcon },
    { name: "Programs", path: "/programs", icon: ClipboardListIcon },
  ];

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
        <div className="h-0 flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4">
            <h1 className="text-xl font-bold text-blue-600">
              {import.meta.env.VITE_APP_NAME}
            </h1>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`
                }>
                <item.icon
                  className={`mr-3 h-5 w-5 ${
                    location.pathname === item.path
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button onClick={logout} className="flex-shrink-0 w-full group block">
            <div className="flex items-center">
              <LogoutIcon className="h-5 w-5 text-gray-400 group-hover:text-gray-500 mr-3" />
              <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                Logout
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

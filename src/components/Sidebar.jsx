import {
  LayoutDashboard,
  Receipt,
  TrendingUp,
  User,
  Landmark,
} from "lucide-react";
import Logo from "./common/Logo";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menu = [
    {
      name: "Dashboard",
      path: "/",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Expenses",
      path: "/expenses",
      icon: <Receipt size={20} />,
    },
    {
      name: "Investments",
      path: "/investments",
      icon: <TrendingUp size={20} />,
    },
    {
      name: "Home Loan",
      path: "/loans",
      icon: <Landmark size={20} />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <User size={20} />,
    },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <Logo />

      <nav className="space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
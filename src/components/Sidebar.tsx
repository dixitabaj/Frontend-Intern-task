
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../features/auth/AuthContext";
import dashboardIcon from "../assets/board.png";
import taskManagementIcon from "../assets/taskManagement.png";
import taskIcon from "../assets/tasks.png";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: dashboardIcon },
  { to: "/tasks", label: "Task Management", icon: taskIcon },
];

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useAuth();

  return (
    <div className="flex flex-col h-full p-4">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-11 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <img src={taskManagementIcon} alt="" className="w-19 h-9" />
        </div>
        <span className="font-semibold text-gray-900">Task Dashboard</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <img src={icon} alt="" className="w-[26px] h-[26px]" />
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={logout}
        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
      >
        Logout
      </button>
    </div>
  );
}

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* mobile top bar with hamburger toggle, only shows below sm breakpoint */}
      <div className="sm:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3">
        <span className="font-semibold text-gray-900">Task Dashboard</span>
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* desktop sidebar, always visible at sm and above */}
      <aside className="hidden sm:block w-60 shrink-0 bg-white border-r border-gray-200 min-h-screen">
        <SidebarContent />
      </aside>

      {/* mobile slide-in drawer, only rendered when open */}
      {isOpen && (
        <div className="sm:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-64 bg-white h-full shadow-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-lg hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
            <SidebarContent onNavigate={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

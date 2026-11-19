import { NavLink, Outlet } from "react-router-dom";
import {
  BellIcon,
  Cog6ToothIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import LogoutButton from "./LogoutButton";

function NavItem({ to, icon: Icon, children }) {
  return (
    <NavLink
      to={to}
      end
      className={({ isActive }) =>
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition " +
        (isActive
          ? "bg-primary-50 text-primary-600"
          : "text-zinc-700 hover:bg-zinc-100")
      }
    >
      <Icon className="size-5" />
      {children}
    </NavLink>
  );
}

function NavGroup({ label, children }) {
  return (
    <div>
      <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {label}
      </p>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

export default function AppLayout() {
  const role = localStorage.getItem("role");

  return (
    <div className="min-h-screen">
      {/* Menu a gauche */}
      <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-zinc-950/5 bg-white lg:flex">
        <div className="flex h-16 items-center px-6 text-lg font-bold tracking-tight">
          Soodu
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto px-4 py-4">
          <NavGroup label="Boutique">
            <NavItem to="/" icon={ShoppingBagIcon}>Produits</NavItem>
          </NavGroup>

          {role === "admin" && (
            <NavGroup label="Administration">
              <NavItem to="/admin" icon={Cog6ToothIcon}>Gestion</NavItem>
            </NavGroup>
          )}
        </nav>
      </aside>

      {/* Zone de droite */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between gap-4 border-b border-zinc-950/5 bg-white px-6">
          <div className="relative w-full max-w-xs">
            <MagnifyingGlassIcon className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-zinc-400" />
            <input className="fi-input pl-10" placeholder="Rechercher" />
          </div>

          <div className="flex items-center gap-3">
            <BellIcon className="size-6 text-zinc-500" />
            <span className="fi-badge fi-badge-warning">
              {role === "admin" ? "Admin" : "Client"}
            </span>
            <LogoutButton />
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
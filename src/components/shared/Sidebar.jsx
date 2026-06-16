// barra lateral del dashboard, muestra el logo, el nombre del usuario y los links de navegación

import { useState } from "react" // useState se usa para manejar el estado de la barra lateral, como el menu desplegable en dispositivos moviles
import { NavLink, useNavigate } from "react-router-dom" // navLink se usa para los links de navegacion para aplicar estilos activos
import { useAuth } from "@/context/AuthContext" // useAuth se usa para obtener la informacion del usuario y la funcion de logout, así como para determinar si es admin o emprendedora
import { Button } from "@/components/ui/button" // Button se usa para el boton de logout
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet" // Sheet se usa para el menu desplegable en dispositivos moviles

// Links de navegacion para emprendedora y admin
const navEmprendedora = [
    { path: "/pedidos", label: "Pedidos" },
    { path: "/productos", label: "Productos" },
    { path: "/perfil", label: "Perfil" },
]
// El admin tiene acceso a metricas, gestión de emprendedoras y usuarios
const navAdmin = [
    { path: "/admin/metricas", label: "Métricas" },
    { path: "/admin/emprendedoras", label: "Emprendedoras" },
    { path: "/admin/usuarios", label: "Usuarios" },
]

function NavContent({ onClose }) { // componente para el contenido del menu desplegable en dispositivos moviles, recibe una funcion onClose para cerrar el menu al hacer click en un link
    const { usuario, logout, esAdmin } = useAuth()
    const navigate = useNavigate()
    const nav = esAdmin ? navAdmin : navEmprendedora

    function handleLogout() { // funcion para cerrar sesion la cual llama a la funcion de logout del contexto y luego redirige al login
        logout()
        navigate("/login")
        onClose?.()
    }

    // se renderiza el logo, el nombre del usuario y los links de navegacion, aplicando estilos activos a los links y un boton para cerrar sesion al final
    return (
        <div className="flex flex-col h-full bg-[#1E1A17]">

            {/* Logo */}
            <div className="flex flex-col items-center py-8 border-b border-[#3A2F26]">
                <div className="w-12 h-12 rounded-full border border-[#C49A6C] flex items-center justify-center mb-2">
                    <span className="text-[#C49A6C] text-base italic font-serif">SV</span>
                </div>
                <p className="text-[#C49A6C] text-xs tracking-[0.12em] uppercase">Sweet Virginia</p>
            </div>

            {/* Usuario */}
            <div className="px-4 py-4 border-b border-[#3A2F26]">
                <p className="text-[#F0E8DF] text-sm font-medium truncate">{usuario?.nombre}</p>
                <p className="text-[#7A6A5E] text-xs truncate">
                    {esAdmin ? "Administrador" : usuario?.nombre_negocio}
                </p>
            </div>

            {/* Navegación */}
            <nav className="flex flex-col gap-1 p-3 flex-1">
                {nav.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={() => onClose?.()}
                        className={({ isActive }) =>
                            `px-3 py-2 rounded-lg text-sm transition-colors ${isActive
                                ? "bg-[#C49A6C] text-[#1E1A17] font-medium"
                                : "text-[#A08070] hover:text-[#F0E8DF] hover:bg-[#2A2420]"
                            }`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </nav>

            {/* Logout */}
            <div className="p-3 border-t border-[#3A2F26]">
                <Button
                    variant="ghost"
                    className="w-full text-[#7A6A5E] hover:text-[#F0E8DF] hover:bg-[#2A2420] text-sm"
                    onClick={handleLogout}
                >
                    Cerrar sesión
                </Button>
            </div>

        </div>
    )
}

// Componente Sidebar que muestra el logo, el nombre del usuario y los links de navegacion, con un diseño responsivo que muestra un menu desplegable en dispositivos moviles
export default function Sidebar() {
    const [open, setOpen] = useState(false)

    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex w-56 min-h-screen flex-col">
                <NavContent />
            </aside>

            {/* Mobile hamburger */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[#1E1A17] border-b border-[#3A2F26] px-4 py-3 flex items-center gap-3">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <button className="text-[#C49A6C] text-xl">☰</button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-56 bg-[#1E1A17] border-[#3A2F26]">
                        <NavContent onClose={() => setOpen(false)} />
                    </SheetContent>
                </Sheet>
                <p className="text-[#C49A6C] text-xs tracking-[0.12em] uppercase">Sweet Virginia</p>
            </div>
        </>
    )
}
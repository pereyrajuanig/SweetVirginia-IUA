import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

import Login from "@/pages/auth/Login"
import PanelPedidos from "@/pages/emprendedora/PanelPedidos"
import Productos from "@/pages/emprendedora/Productos"
import Perfil from "@/pages/emprendedora/Perfil"
import Emprendedoras from "@/pages/admin/Emprendedoras"
import Usuarios from "@/pages/admin/Usuarios"
import Metricas from "@/pages/admin/Metricas"

function RutaProtegida({ children, rol }) {
    const { usuario } = useAuth()

    if (!usuario) {
        return <Navigate to="/login" replace />
    }

    if (rol && !usuario.roles.includes(rol)) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />

                {/* Rutas emprendedora */}
                <Route
                    path="/pedidos"
                    element={
                        <RutaProtegida rol="emprendedora">
                            <PanelPedidos />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/productos"
                    element={
                        <RutaProtegida rol="emprendedora">
                            <Productos />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/perfil"
                    element={
                        <RutaProtegida rol="emprendedora">
                            <Perfil />
                        </RutaProtegida>
                    }
                />

                {/* Rutas admin */}
                <Route
                    path="/admin/emprendedoras"
                    element={
                        <RutaProtegida rol="administrador">
                            <Emprendedoras />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <RutaProtegida rol="administrador">
                            <Usuarios />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/admin/metricas"
                    element={
                        <RutaProtegida rol="administrador">
                            <Metricas />
                        </RutaProtegida>
                    }
                />

                {/* Redirigir raíz a login */}
                <Route path="/" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    )
}
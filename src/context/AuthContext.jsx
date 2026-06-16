// archivo para gestion de estado global de autenticacion
// lo puede utilizar cualquier componente de la app

import { createContext, useContext, useState } from "react"; // se importa herramientas

const AuthContext = createContext(null); // aca se guarda informacion del usuario 

// componente que envuelve toda la app
export function AuthProvider({ children }) {
    const [usuario, setUsuario] = useState(null);

    function login(datos) { // guarda los datos
        setUsuario(datos);
    }

    function logout() { // borra los datos
        setUsuario(null);
    }

    // variables que calculan el rol del usuario
    const esEmprendedora = usuario?.roles?.includes("emprendedora");
    const esAdmin = usuario?.roles?.includes("administrador");

    return ( // devuelve el estado global y todo lo que app puede leer
        <AuthContext.Provider
            value={{ usuario, login, logout, esEmprendedora, esAdmin }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// hook que usan los componentes para acceder al contexto
export function useAuth() {
    return useContext(AuthContext);
}

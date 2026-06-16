// src/mocks/emprendedoras.mock.js - Mock de datos para emprendedoras, con informacion de nombre del negocio, usuario asociado, estado y fecha de creacion

export const emprendedorasMock = [
    {
        id: 1,
        nombre_negocio: "La Pastelería de Ana",
        usuario: { nombre: "Ana García", telefono: "+5493412345678" },
        estado: "activa",
        created_at: "2025-01-15T10:00:00",
    },
    {
        id: 2,
        nombre_negocio: "Dulces de Marta",
        usuario: { nombre: "Marta López", telefono: "+5493416789012" },
        estado: "activa",
        created_at: "2025-02-20T14:00:00",
    },
    {
        id: 3,
        nombre_negocio: "Repostería Flor",
        usuario: { nombre: "Florencia Ruiz", telefono: "+5493419876543" },
        estado: "pendiente",
        created_at: "2025-06-01T09:00:00",
    },
    {
        id: 4,
        nombre_negocio: "El Rincón Dulce",
        usuario: { nombre: "Valentina Sosa", telefono: "+5493413456789" },
        estado: "suspendida",
        created_at: "2025-03-10T11:00:00",
    },
]
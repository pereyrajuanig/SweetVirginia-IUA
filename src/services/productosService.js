import { productosMock } from "@/mocks/productos.mock"

const USAR_MOCK = true

export async function getProductos() {
    if (USAR_MOCK) {
        return productosMock
    }
    const res = await fetch("/api/v1/productos")
    return res.json()
}

export async function toggleDisponibilidad(id, disponible) {
    if (USAR_MOCK) {
        return { id, disponible }
    }
    const res = await fetch(`/api/v1/productos/${id}/disponibilidad`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ disponible }),
    })
    return res.json()
}
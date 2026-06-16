import { pedidosMock } from "@/mocks/pedidos.mock"

const USAR_MOCK = true

export async function getPedidos() {
    if (USAR_MOCK) {
        return pedidosMock
    }
    const res = await fetch("/api/v1/pedidos")
    return res.json()
}

export async function cambiarEstadoPedido(id, nuevoEstado) {
    if (USAR_MOCK) {
        return { id, estado: nuevoEstado }
    }
    const res = await fetch(`/api/v1/pedidos/${id}/estado`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado: nuevoEstado }),
    })
    return res.json()
}
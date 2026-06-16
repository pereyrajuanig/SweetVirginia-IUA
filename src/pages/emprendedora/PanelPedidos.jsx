import { useState, useEffect } from "react"
import { getPedidos, cambiarEstadoPedido } from "@/services/pedidosService"
import BadgeEstado from "@/components/shared/BadgeEstado"
import { Button } from "@/components/ui/button"

const transiciones = {
    pendiente: { label: "Confirmar", siguiente: "confirmado" },
    confirmado: { label: "Iniciar prep.", siguiente: "en_preparacion" },
    en_preparacion: { label: "Marcar listo", siguiente: "listo" },
    listo: { label: "Entregar", siguiente: "entregado" },
}

const filtros = ["todos", "pendiente", "confirmado", "en_preparacion", "listo", "entregado"]

export default function PanelPedidos() {
    const [pedidos, setPedidos] = useState([])
    const [filtro, setFiltro] = useState("todos")

    useEffect(() => {
        getPedidos().then(setPedidos)
    }, [])

    async function avanzarEstado(id, siguienteEstado) {
        await cambiarEstadoPedido(id, siguienteEstado)
        setPedidos((prev) =>
            prev.map((p) => (p.id === id ? { ...p, estado: siguienteEstado } : p))
        )
    }

    const pedidosFiltrados = filtro === "todos"
        ? pedidos
        : pedidos.filter((p) => p.estado === filtro)

    return (
        <div className="max-w-4xl mx-auto">

            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold text-[#3D2B1F]">Pedidos activos</h1>
                <p className="text-[#A08070] text-sm mt-1">{pedidos.length} pedidos en total</p>
            </div>

            {/* Filtros */}
            <div className="flex gap-2 flex-wrap mb-6">
                {filtros.map((f) => (
                    <button
                        key={f}
                        onClick={() => setFiltro(f)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filtro === f
                                ? "bg-[#C49A6C] text-[#1E1A17]"
                                : "bg-[#EEE4DC] text-[#8B6F5E] hover:bg-[#E0D0C0]"
                            }`}
                    >
                        {f === "todos" ? "Todos" : f.replace("_", " ")}
                    </button>
                ))}
            </div>

            {/* Lista de pedidos */}
            <div className="flex flex-col gap-4">
                {pedidosFiltrados.length === 0 && (
                    <p className="text-[#A08070] text-sm text-center py-12">
                        No hay pedidos en este estado.
                    </p>
                )}
                {pedidosFiltrados.map((pedido) => (
                    <div
                        key={pedido.id}
                        className="bg-white rounded-xl border border-[#E8DDD6] p-5"
                    >
                        {/* Cabecera del pedido */}
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-xs text-[#A08070] font-mono">{pedido.numero_orden}</p>
                                <p className="font-medium text-[#3D2B1F]">{pedido.cliente.nombre}</p>
                            </div>
                            <BadgeEstado estado={pedido.estado} />
                        </div>

                        {/* Items */}
                        <div className="flex flex-col gap-1 mb-3">
                            {pedido.items.map((item, i) => (
                                <div key={i} className="flex justify-between text-sm">
                                    <span className="text-[#5D6D7E]">
                                        {item.cantidad}x {item.nombre_producto}
                                    </span>
                                    <span className="text-[#A08070] font-mono">
                                        ${(item.cantidad * item.precio_unitario).toLocaleString()}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#E8DDD6]">
                            <p className="font-medium text-[#C49A6C] font-mono">
                                Total: ${pedido.subtotal.toLocaleString()}
                            </p>
                            {transiciones[pedido.estado] && (
                                <Button
                                    size="sm"
                                    onClick={() => avanzarEstado(pedido.id, transiciones[pedido.estado].siguiente)}
                                    className="bg-[#C49A6C] hover:bg-[#B08050] text-[#1E1A17] text-xs"
                                >
                                    {transiciones[pedido.estado].label}
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
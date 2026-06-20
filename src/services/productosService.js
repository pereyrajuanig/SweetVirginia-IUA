import { supabase } from "@/lib/supabase"

export async function getProductos() {
  const { data, error } = await supabase
    .from("productos")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error al obtener productos:", error)
    return []
  }

  return data
}

export async function crearProducto(producto) {
  const { data, error } = await supabase
    .from("productos")
    .insert([producto])
    .select()

  if (error) {
    console.error("Error al crear producto:", error)
    throw error
  }

  return data[0]
}

export async function toggleDisponibilidad(id, disponible) {
  const { data, error } = await supabase
    .from("productos")
    .update({ disponible })
    .eq("id", id)
    .select()

  if (error) {
    console.error("Error al actualizar disponibilidad:", error)
    throw error
  }

  return data[0]
}
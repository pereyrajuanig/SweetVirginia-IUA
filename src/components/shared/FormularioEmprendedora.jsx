import { useState } from "react";
import { crearEmprendedora } from "@/services/emprendedorasService";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function FormularioEmprendedora({ onEmprendedoraCreada }) {
  const [open, setOpen] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [form, setForm] = useState({
    nombreContacto: "",
    nombreNegocio: "",
    descripcion: "",
    telefono: "",
  });

  function handleChange(campo, valor) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.nombreContacto.trim() ||
      !form.nombreNegocio.trim() ||
      !form.telefono.trim()
    ) {
      toast.error("Completá el nombre de contacto, el negocio y el teléfono.");
      return;
    }

    setGuardando(true);

    try {
      const nuevaEmprendedora = await crearEmprendedora({
        nombre_contacto: form.nombreContacto,
        nombre_negocio: form.nombreNegocio,
        descripcion: form.descripcion,
        telefono: form.telefono,
        estado: "activa",
      });

      toast.success("Emprendedora creada exitosamente.");
      onEmprendedoraCreada(nuevaEmprendedora);
      setForm({
        nombreContacto: "",
        nombreNegocio: "",
        descripcion: "",
        telefono: "",
      });
      setOpen(false);
    } catch (error) {
      toast.error("Hubo un error al crear la emprendedora.");
    }

    setGuardando(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#C49A6C] hover:bg-[#B08050] text-[#1E1A17]">
          + Nueva emprendedora
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#FDF8F4] border-[#E8DDD6]">
        <DialogHeader>
          <DialogTitle className="text-[#3D2B1F]">
            Nueva emprendedora
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#7A6A5E] text-xs">Nombre de contacto</Label>
            <Input
              value={form.nombreContacto}
              onChange={(e) => handleChange("nombreContacto", e.target.value)}
              placeholder="Marta López"
              className="bg-white border-[#E8DDD6]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-[#7A6A5E] text-xs">Nombre del negocio</Label>
            <Input
              value={form.nombreNegocio}
              onChange={(e) => handleChange("nombreNegocio", e.target.value)}
              placeholder="Dulces de Marta"
              className="bg-white border-[#E8DDD6]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[#7A6A5E] text-xs">Descripción</Label>
            <Textarea
              value={form.descripcion}
              onChange={(e) => handleChange("descripcion", e.target.value)}
              placeholder="Repostería artesanal, especialidad en tortas..."
              className="bg-white border-[#E8DDD6]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label className="text-[#7A6A5E] text-xs">Teléfono</Label>
            <Input
              value={form.telefono}
              onChange={(e) => handleChange("telefono", e.target.value)}
              placeholder="+5493412345678"
              className="bg-white border-[#E8DDD6]"
            />
          </div>

          <Button
            type="submit"
            disabled={guardando}
            className="w-full bg-[#C49A6C] hover:bg-[#B08050] text-[#1E1A17] mt-2"
          >
            {guardando ? "Guardando..." : "Crear emprendedora"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

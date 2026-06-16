import { Button } from "@/components/ui/button"

function App() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-amber-700">
          Sweet Virginia
        </h1>
        <Button>Explorar catálogo</Button>
      </div>
    </div>
  )
}

export default App
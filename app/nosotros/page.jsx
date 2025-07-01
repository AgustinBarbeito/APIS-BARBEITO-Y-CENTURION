import { KrustyHeader } from "@/components/krusty-header.jsx"
import { KrustyFooter } from "@/components/krusty-footer.jsx"
import { KrustyNosotros } from "@/components/krusty-nosotros.jsx"

export default function NosotrosPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <KrustyHeader />
      <main className="flex-1">
        <KrustyNosotros />
      </main>
      <KrustyFooter />
    </div>
  )
} 
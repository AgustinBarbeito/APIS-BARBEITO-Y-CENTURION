import React from "react"
import "./globals.css"
import { CartProvider } from "@/context/cart-context.jsx"
import Navbar from "@/components/Navbar.jsx"

export const metadata = {
  title: "Krusty Burger",
  description: "Las mejores hamburguesas de Springfield",
  generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
} 
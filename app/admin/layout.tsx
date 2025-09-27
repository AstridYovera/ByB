"use client"
import "../globals.css"
import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const isAdmin = sessionStorage.getItem("isAdmin")
    if (!isAdmin && pathname !== "/admin/login") router.push("/admin/login")
  }, [pathname])

  const handleLogout = () => {
    sessionStorage.removeItem("isAdmin")
    router.push("/admin/login")
  }

  const mostrarLogout = pathname !== "/admin/login"

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Panel de Administración</h1>
        {mostrarLogout && (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Cerrar sesión
          </button>
        )}
      </header>
      <main className="admin-content">{children}</main>
    </div>
  )
}

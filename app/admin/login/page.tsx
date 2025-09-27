"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const [user, setUser] = useState("")
  const [pass, setPass] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const adminUser = process.env.NEXT_PUBLIC_ADMIN_USER
    const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS

    if (user === adminUser && pass === adminPass) {
      sessionStorage.setItem("isAdmin", "true")
      router.push("/admin/reclamos")
    } else {
      setError("Usuario o contraseña incorrectos")
    }
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h1 className="admin-login-title">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="admin-login-input"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            className="admin-login-input"
            required
          />
          {error && <p className="admin-login-error">{error}</p>}
          <button type="submit" className="admin-login-button">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  )
}

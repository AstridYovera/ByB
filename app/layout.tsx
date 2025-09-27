export const metadata = {
  title: "BYB - Tienda de Ropa",
  description: "Moda minimalista y moderna en BYB",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}

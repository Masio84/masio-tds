import { neon } from "@neondatabase/serverless"

async function getLeads() {
  if (!process.env.DATABASE_URL) return []

  const sql = neon(process.env.DATABASE_URL)

  const leads = await sql`
    SELECT * FROM leads
    ORDER BY created_at DESC
  `

  return leads
}

export default async function AdminPage() {
  const leads = await getLeads()

  return (
    <main className="min-h-screen bg-black text-green-400 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Panel Interno — MasioTDS
      </h1>

      <div className="overflow-x-auto">
        <table className="w-full border border-green-500">
          <thead>
            <tr className="border-b border-green-500">
              <th className="p-3 text-left">Nombre</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Teléfono</th>
              <th className="p-3 text-left">Mensaje</th>
              <th className="p-3 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead: any) => (
              <tr
                key={lead.id}
                className="border-b border-green-800"
              >
                <td className="p-3">{lead.name}</td>
                <td className="p-3">{lead.email}</td>
                <td className="p-3">{lead.phone}</td>
                <td className="p-3">{lead.message}</td>
                <td className="p-3">
                  {lead.contacted ? "Contactado" : "Pendiente"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}
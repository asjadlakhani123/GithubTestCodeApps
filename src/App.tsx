import { useEffect, useState } from 'react'
import { Devpub_table1sService } from './generated'
import type { Devpub_table1s } from './generated/models/Devpub_table1sModel'
import './App.css'

function App() {
  const [records, setRecords] = useState<Devpub_table1s[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Devpub_table1sService.getAll({
      select: ['devpub_title', 'createdon'],
    })
      .then((result) => {
        setRecords(result.data ?? [])
      })
      .catch((err) => {
        setError(err?.message ?? 'Failed to load records')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page">
      <div className="tabs">
        <button className="tab tab--active">Table 1 Data</button>
      </div>

      <div className="tab-content">
        {loading && <p className="status">Loading...</p>}
        {error && <p className="status status--error">{error}</p>}
        {!loading && !error && (
          <table className="data-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Created On</th>
              </tr>
            </thead>
            <tbody>
              {records.length === 0 ? (
                <tr>
                  <td colSpan={2} className="empty">No records found.</td>
                </tr>
              ) : (
                records.map((row) => (
                  <tr key={row.devpub_table1id}>
                    <td>{row.devpub_title}</td>
                    <td>{row.createdon ? new Date(row.createdon).toLocaleString() : '—'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App

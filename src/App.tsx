import { useEffect, useState } from 'react'
import { Devpub_table1sService, Devpub_table2sService } from './generated'
import type { Devpub_table1s } from './generated/models/Devpub_table1sModel'
import type { Devpub_table2s } from './generated/models/Devpub_table2sModel'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState<'table1' | 'table2'>('table1')

  // Table 1 state
  const [t1Records, setT1Records] = useState<Devpub_table1s[]>([])
  const [t1Loading, setT1Loading] = useState(true)
  const [t1Error, setT1Error] = useState<string | null>(null)

  // Table 2 state
  const [t2Records, setT2Records] = useState<Devpub_table2s[]>([])
  const [t2Loading, setT2Loading] = useState(true)
  const [t2Error, setT2Error] = useState<string | null>(null)

  useEffect(() => {
    Devpub_table1sService.getAll({ select: ['devpub_title', 'createdon'] })
      .then((result) => setT1Records(result.data ?? []))
      .catch((err) => setT1Error(err?.message ?? 'Failed to load records'))
      .finally(() => setT1Loading(false))
  }, [])

  useEffect(() => {
    Devpub_table2sService.getAll({ select: ['devpub_title', 'createdon'] })
      .then((result) => setT2Records(result.data ?? []))
      .catch((err) => setT2Error(err?.message ?? 'Failed to load records'))
      .finally(() => setT2Loading(false))
  }, [])

  return (
    <div className="page">
      <div className="tabs">
        <button
          className={`tab${activeTab === 'table1' ? ' tab--active' : ''}`}
          onClick={() => setActiveTab('table1')}
        >
          Table 1 Data
        </button>
        <button
          className={`tab${activeTab === 'table2' ? ' tab--active' : ''}`}
          onClick={() => setActiveTab('table2')}
        >
          Table 2 Data
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'table1' && (
          <>
            {t1Loading && <p className="status">Loading...</p>}
            {t1Error && <p className="status status--error">{t1Error}</p>}
            {!t1Loading && !t1Error && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {t1Records.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="empty">No records found.</td>
                    </tr>
                  ) : (
                    t1Records.map((row) => (
                      <tr key={row.devpub_table1id}>
                        <td>{row.devpub_title}</td>
                        <td>{row.createdon ? new Date(row.createdon).toLocaleString() : '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </>
        )}

        {activeTab === 'table2' && (
          <>
            {t2Loading && <p className="status">Loading...</p>}
            {t2Error && <p className="status status--error">{t2Error}</p>}
            {!t2Loading && !t2Error && (
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Created On</th>
                  </tr>
                </thead>
                <tbody>
                  {t2Records.length === 0 ? (
                    <tr>
                      <td colSpan={2} className="empty">No records found.</td>
                    </tr>
                  ) : (
                    t2Records.map((row) => (
                      <tr key={row.devpub_table2id}>
                        <td>{row.devpub_title}</td>
                        <td>{row.createdon ? new Date(row.createdon).toLocaleString() : '—'}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default App

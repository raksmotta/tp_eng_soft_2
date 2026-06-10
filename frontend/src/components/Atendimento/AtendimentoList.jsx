import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { atendimentoService } from '../../services/api'

const receitaBadge = { REMEDIO: 'danger', ATIVIDADE_FISICA: 'success', ATIVIDADE_MENTAL: 'info' }

export default function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([])

  useEffect(() => {
    atendimentoService.listar().then(res => setAtendimentos(res.data))
  }, [])

  const excluir = (id) => {
    if (!window.confirm('Excluir este atendimento?')) return
    atendimentoService.excluir(id).then(() =>
      setAtendimentos(prev => prev.filter(a => a.id !== id))
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Atendimentos</h4>
        <Link to="/atendimentos/novo" className="btn btn-primary btn-sm">
          + Novo Atendimento
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Profissional</th>
                <th>Receita</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {atendimentos.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Nenhum atendimento cadastrado.
                  </td>
                </tr>
              )}
              {atendimentos.map(a => (
                <tr key={a.id}>
                  <td className="text-muted">{a.id}</td>
                  <td>{a.data}</td>
                  <td>{a.horario}</td>
                  <td>{a.profissional?.nome || '—'}</td>
                  <td>
                    <span className={`badge bg-${receitaBadge[a.receitaSaude] || 'secondary'}`}>
                      {a.receitaSaude}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/atendimentos/${a.id}/exames`}
                      className="btn btn-outline-primary btn-sm me-2"
                    >
                      Exames
                    </Link>
                    <Link
                      to={`/atendimentos/${a.id}/editar`}
                      className="btn btn-outline-secondary btn-sm me-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => excluir(a.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

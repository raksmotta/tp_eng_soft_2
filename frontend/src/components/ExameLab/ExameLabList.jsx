import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { exameLabService } from '../../services/api'

export default function ExameLabList() {
  const { atendimentoId } = useParams()
  const navigate = useNavigate()
  const [exames, setExames] = useState([])

  useEffect(() => {
    exameLabService.buscarPorAtendimento(atendimentoId).then(res => setExames(res.data))
  }, [atendimentoId])

  const excluir = (id) => {
    if (!window.confirm('Excluir este exame?')) return
    exameLabService.excluir(id).then(() =>
      setExames(prev => prev.filter(e => e.id !== id))
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <button
            className="btn btn-link p-0 me-3 text-decoration-none"
            onClick={() => navigate('/atendimentos')}
          >
            ← Voltar
          </button>
          <span className="h4">Exames do Atendimento #{atendimentoId}</span>
        </div>
        <Link
          to={`/atendimentos/${atendimentoId}/exames/novo`}
          className="btn btn-primary btn-sm"
        >
          + Novo Exame
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Descrição</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {exames.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-muted py-4">
                    Nenhum exame registrado para este atendimento.
                  </td>
                </tr>
              )}
              {exames.map(e => (
                <tr key={e.id}>
                  <td className="text-muted">{e.id}</td>
                  <td>{e.descricao}</td>
                  <td className="text-end">
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => excluir(e.id)}
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

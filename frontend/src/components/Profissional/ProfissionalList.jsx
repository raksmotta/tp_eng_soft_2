import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profissionalService } from '../../services/api'

const categoriaBadge = { MEDICO: 'primary', PSICOLOGO: 'info', FISIOTERAPEUTA: 'success' }

export default function ProfissionalList() {
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    profissionalService.listar().then(res => setProfissionais(res.data))
  }, [])

  const excluir = (id) => {
    if (!window.confirm('Excluir este profissional?')) return
    profissionalService.excluir(id).then(() =>
      setProfissionais(prev => prev.filter(p => p.id !== id))
    )
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Profissionais de Saúde</h4>
        <Link to="/profissionais/novo" className="btn btn-primary btn-sm">
          + Novo Profissional
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Telefone</th>
                <th>Endereço</th>
                <th>Categoria</th>
                <th className="text-end">Ações</th>
              </tr>
            </thead>
            <tbody>
              {profissionais.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center text-muted py-4">
                    Nenhum profissional cadastrado.
                  </td>
                </tr>
              )}
              {profissionais.map(p => (
                <tr key={p.id}>
                  <td className="text-muted">{p.id}</td>
                  <td>{p.nome}</td>
                  <td>{p.telefone || '—'}</td>
                  <td>{p.endereco || '—'}</td>
                  <td>
                    <span className={`badge bg-${categoriaBadge[p.categoria] || 'secondary'}`}>
                      {p.categoria}
                    </span>
                  </td>
                  <td className="text-end">
                    <Link
                      to={`/profissionais/${p.id}/editar`}
                      className="btn btn-outline-secondary btn-sm me-2"
                    >
                      Editar
                    </Link>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => excluir(p.id)}
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

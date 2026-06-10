import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { exameLabService } from '../../services/api'

export default function ExameLabForm() {
  const { atendimentoId } = useParams()
  const navigate = useNavigate()
  const [descricao, setDescricao] = useState('')

  const salvar = (e) => {
    e.preventDefault()
    exameLabService.inserir({ descricao, atendimento: { id: atendimentoId } })
      .then(() => navigate(`/atendimentos/${atendimentoId}/exames`))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">Novo Exame — Atendimento #{atendimentoId}</h5>
          </div>
          <div className="card-body">
            <form onSubmit={salvar}>
              <div className="mb-4">
                <label className="form-label">Descrição *</label>
                <input
                  className="form-control"
                  placeholder="Ex: Hemograma completo"
                  value={descricao}
                  onChange={e => setDescricao(e.target.value)}
                  required
                />
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/atendimentos/${atendimentoId}/exames`)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

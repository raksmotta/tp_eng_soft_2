import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { atendimentoService, profissionalService } from '../../services/api'

const RECEITAS = ['REMEDIO', 'ATIVIDADE_FISICA', 'ATIVIDADE_MENTAL']

export default function AtendimentoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [profissionais, setProfissionais] = useState([])
  const [form, setForm] = useState({
    data: '', horario: '', problemaTexto: '', receitaSaude: '',
    profissional: { id: '' }
  })

  useEffect(() => {
    profissionalService.listar().then(res => setProfissionais(res.data))
    if (id) atendimentoService.buscarPorId(id).then(res => setForm(res.data))
  }, [id])

  const salvar = (e) => {
    e.preventDefault()
    const acao = id ? atendimentoService.alterar(id, form) : atendimentoService.inserir(form)
    acao.then(() => navigate('/atendimentos'))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-7">
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">{id ? 'Editar' : 'Novo'} Atendimento</h5>
          </div>
          <div className="card-body">
            <form onSubmit={salvar}>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Data *</label>
                  <input
                    type="date"
                    className="form-control"
                    value={form.data}
                    onChange={e => setForm({ ...form, data: e.target.value })}
                    required
                  />
                </div>
                <div className="col">
                  <label className="form-label">Horário *</label>
                  <input
                    type="time"
                    className="form-control"
                    value={form.horario}
                    onChange={e => setForm({ ...form, horario: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Profissional *</label>
                <select
                  className="form-select"
                  value={form.profissional?.id || ''}
                  onChange={e => setForm({ ...form, profissional: { id: e.target.value } })}
                  required
                >
                  <option value="">Selecione...</option>
                  {profissionais.map(p => (
                    <option key={p.id} value={p.id}>{p.nome} — {p.categoria}</option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Descrição do Problema</label>
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Descreva o problema relatado pelo paciente"
                  value={form.problemaTexto}
                  onChange={e => setForm({ ...form, problemaTexto: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Receita *</label>
                <select
                  className="form-select"
                  value={form.receitaSaude}
                  onChange={e => setForm({ ...form, receitaSaude: e.target.value })}
                  required
                >
                  <option value="">Selecione...</option>
                  {RECEITAS.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/atendimentos')}
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

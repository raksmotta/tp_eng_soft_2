import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { profissionalService } from '../../services/api'

const CATEGORIAS = ['MEDICO', 'PSICOLOGO', 'FISIOTERAPEUTA']

export default function ProfissionalForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', telefone: '', endereco: '', categoria: '' })

  useEffect(() => {
    if (id) profissionalService.buscarPorId(id).then(res => setForm(res.data))
  }, [id])

  const salvar = (e) => {
    e.preventDefault()
    const acao = id ? profissionalService.alterar(id, form) : profissionalService.inserir(form)
    acao.then(() => navigate('/profissionais'))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">{id ? 'Editar' : 'Novo'} Profissional</h5>
          </div>
          <div className="card-body">
            <form onSubmit={salvar}>
              <div className="mb-3">
                <label className="form-label">Nome *</label>
                <input
                  className="form-control"
                  placeholder="Nome completo"
                  value={form.nome}
                  onChange={e => setForm({ ...form, nome: e.target.value })}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={e => setForm({ ...form, telefone: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Endereço</label>
                <input
                  className="form-control"
                  placeholder="Endereço completo"
                  value={form.endereco}
                  onChange={e => setForm({ ...form, endereco: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Categoria *</label>
                <select
                  className="form-select"
                  value={form.categoria}
                  onChange={e => setForm({ ...form, categoria: e.target.value })}
                  required
                >
                  <option value="">Selecione...</option>
                  {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/profissionais')}
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

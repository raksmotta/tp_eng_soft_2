import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { pacienteService } from '../../services/api'

export default function PacienteForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({ nome: '', cpf: '', dataNascimento: '', telefone: '' })

  useEffect(() => {
    if (id) pacienteService.buscarPorId(id).then(res => setForm(res.data))
  }, [id])

  const salvar = (e) => {
    e.preventDefault()
    const acao = id ? pacienteService.alterar(id, form) : pacienteService.inserir(form)
    acao.then(() => navigate('/pacientes'))
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">{id ? 'Editar' : 'Novo'} Paciente</h5>
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
                <label className="form-label">CPF</label>
                <input
                  className="form-control"
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={e => setForm({ ...form, cpf: e.target.value })}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Data de Nascimento</label>
                <input
                  type="date"
                  className="form-control"
                  value={form.dataNascimento}
                  onChange={e => setForm({ ...form, dataNascimento: e.target.value })}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Telefone</label>
                <input
                  className="form-control"
                  placeholder="(00) 00000-0000"
                  value={form.telefone}
                  onChange={e => setForm({ ...form, telefone: e.target.value })}
                />
              </div>

              <div className="d-flex gap-2 justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate('/pacientes')}
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

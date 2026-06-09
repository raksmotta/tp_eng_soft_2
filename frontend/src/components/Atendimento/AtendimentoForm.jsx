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
    <form onSubmit={salvar}>
      <h2>{id ? 'Editar' : 'Novo'} Atendimento</h2>
      <input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} required />
      <input type="time" value={form.horario} onChange={e => setForm({ ...form, horario: e.target.value })} required />
      <textarea placeholder="Problema" value={form.problemaTexto} onChange={e => setForm({ ...form, problemaTexto: e.target.value })} />
      <select value={form.receitaSaude} onChange={e => setForm({ ...form, receitaSaude: e.target.value })} required>
        <option value="">Receita</option>
        {RECEITAS.map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      <select value={form.profissional?.id || ''} onChange={e => setForm({ ...form, profissional: { id: e.target.value } })} required>
        <option value="">Profissional</option>
        {profissionais.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
      </select>
      <button type="submit">Salvar</button>
    </form>
  )
}

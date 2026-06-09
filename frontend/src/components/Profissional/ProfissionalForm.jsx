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
    <form onSubmit={salvar}>
      <h2>{id ? 'Editar' : 'Novo'} Profissional</h2>
      <input placeholder="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} required />
      <input placeholder="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
      <input placeholder="Endereco" value={form.endereco} onChange={e => setForm({ ...form, endereco: e.target.value })} />
      <select value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} required>
        <option value="">Categoria</option>
        {CATEGORIAS.map(c => <option key={c} value={c}>{c}</option>)}
      </select>
      <button type="submit">Salvar</button>
    </form>
  )
}

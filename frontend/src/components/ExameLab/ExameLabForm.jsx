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
    <form onSubmit={salvar}>
      <h2>Novo Exame</h2>
      <input placeholder="Descricao" value={descricao} onChange={e => setDescricao(e.target.value)} required />
      <button type="submit">Salvar</button>
    </form>
  )
}

import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { exameLabService } from '../../services/api'

export default function ExameLabList() {
  const { atendimentoId } = useParams()
  const [exames, setExames] = useState([])

  useEffect(() => {
    exameLabService.buscarPorAtendimento(atendimentoId).then(res => setExames(res.data))
  }, [atendimentoId])

  const excluir = (id) => {
    exameLabService.excluir(id).then(() =>
      setExames(prev => prev.filter(e => e.id !== id))
    )
  }

  return (
    <div>
      <h2>Exames do Atendimento #{atendimentoId}</h2>
      <Link to={`/atendimentos/${atendimentoId}/exames/novo`}>Novo Exame</Link>
      <ul>
        {exames.map(e => (
          <li key={e.id}>
            {e.descricao}
            <button onClick={() => excluir(e.id)}> Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

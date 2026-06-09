import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { atendimentoService } from '../../services/api'

export default function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([])

  useEffect(() => {
    atendimentoService.listar().then(res => setAtendimentos(res.data))
  }, [])

  const excluir = (id) => {
    atendimentoService.excluir(id).then(() =>
      setAtendimentos(prev => prev.filter(a => a.id !== id))
    )
  }

  return (
    <div>
      <h2>Atendimentos</h2>
      <Link to="/atendimentos/novo">Novo</Link>
      <ul>
        {atendimentos.map(a => (
          <li key={a.id}>
            {a.data} {a.horario} - {a.receitaSaude}
            <Link to={`/atendimentos/${a.id}/editar`}> Editar</Link>
            <Link to={`/atendimentos/${a.id}/exames`}> Exames</Link>
            <button onClick={() => excluir(a.id)}> Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

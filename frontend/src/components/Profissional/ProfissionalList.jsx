import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { profissionalService } from '../../services/api'

export default function ProfissionalList() {
  const [profissionais, setProfissionais] = useState([])

  useEffect(() => {
    profissionalService.listar().then(res => setProfissionais(res.data))
  }, [])

  const excluir = (id) => {
    profissionalService.excluir(id).then(() =>
      setProfissionais(prev => prev.filter(p => p.id !== id))
    )
  }

  return (
    <div>
      <h2>Profissionais de Saude</h2>
      <Link to="/profissionais/novo">Novo</Link>
      <ul>
        {profissionais.map(p => (
          <li key={p.id}>
            {p.nome} - {p.categoria}
            <Link to={`/profissionais/${p.id}/editar`}> Editar</Link>
            <button onClick={() => excluir(p.id)}> Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

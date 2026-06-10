import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { pacienteService } from '../../services/api'

function formatarData(data) {
  return data ? data.split('-').reverse().join('/') : '—'
}

export default function PacienteList() {
  const [pacientes, setPacientes] = useState([])
  const [busca, setBusca] = useState('')
  const [selecionado, setSelecionado] = useState(null)
  const [erro, setErro] = useState(null)

  useEffect(() => {
    pacienteService.listar().then(res => setPacientes(res.data))
  }, [])

  const pesquisar = () => {
    const termo = busca.trim()
    const req = termo
      ? pacienteService.buscarPorNome(termo)
      : pacienteService.listar()
    req.then(res => {
      setPacientes(res.data)
      setSelecionado(null)
    })
  }

  const limpar = () => {
    setBusca('')
    pacienteService.listar().then(res => {
      setPacientes(res.data)
      setSelecionado(null)
    })
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') pesquisar()
  }

  const excluir = (id) => {
    if (!window.confirm('Excluir este paciente?')) return
    pacienteService.excluir(id)
      .then(() => {
        setPacientes(prev => prev.filter(p => p.id !== id))
        if (selecionado?.id === id) setSelecionado(null)
        setErro(null)
      })
      .catch(err => {
        if (err.response?.status === 409) {
          setErro('Este paciente possui atendimentos vinculados e não pode ser excluído.')
        }
      })
  }

  const selecionar = (p) => {
    setSelecionado(prev => prev?.id === p.id ? null : p)
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Pacientes</h4>
        <Link to="/pacientes/novo" className="btn btn-primary btn-sm">
          + Novo Paciente
        </Link>
      </div>

      {erro && (
        <div className="alert alert-warning alert-dismissible mb-3" role="alert">
          {erro}
          <button type="button" className="btn-close" onClick={() => setErro(null)} />
        </div>
      )}

      <div className="input-group mb-3" style={{ maxWidth: '420px' }}>
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="btn btn-outline-secondary" onClick={pesquisar}>
          Pesquisar
        </button>
        {busca.trim() && (
          <button className="btn btn-outline-danger" onClick={limpar}>
            Limpar
          </button>
        )}
      </div>

      <div className="row g-3 align-items-start">
        <div className={selecionado ? 'col-md-7' : 'col-12'}>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Data de Nascimento</th>
                  </tr>
                </thead>
                <tbody>
                  {pacientes.length === 0 && (
                    <tr>
                      <td colSpan={2} className="text-center text-muted py-4">
                        Nenhum paciente cadastrado.
                      </td>
                    </tr>
                  )}
                  {pacientes.map(p => (
                    <tr
                      key={p.id}
                      onClick={() => selecionar(p)}
                      className={selecionado?.id === p.id ? 'table-active' : ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <td>{p.nome}</td>
                      <td>{formatarData(p.dataNascimento)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {selecionado && (
          <div className="col-md-5">
            <div className="card shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center">
                <span className="fw-semibold">Detalhes do Paciente</span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelecionado(null)}
                />
              </div>
              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-5 text-muted">Nome</dt>
                  <dd className="col-7">{selecionado.nome}</dd>

                  <dt className="col-5 text-muted">CPF</dt>
                  <dd className="col-7">{selecionado.cpf || '—'}</dd>

                  <dt className="col-5 text-muted">Nascimento</dt>
                  <dd className="col-7">{formatarData(selecionado.dataNascimento)}</dd>

                  <dt className="col-5 text-muted">Telefone</dt>
                  <dd className="col-7">{selecionado.telefone || '—'}</dd>
                </dl>
              </div>
              <div className="card-footer d-flex gap-2">
                <Link
                  to={`/pacientes/${selecionado.id}/editar`}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Editar
                </Link>
                <button
                  className="btn btn-outline-danger btn-sm ms-auto"
                  onClick={() => excluir(selecionado.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

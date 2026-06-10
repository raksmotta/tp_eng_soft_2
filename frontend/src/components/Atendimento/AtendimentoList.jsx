import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { atendimentoService, exameLabService } from '../../services/api'

const receitaBadge = { REMEDIO: 'danger', ATIVIDADE_FISICA: 'success', ATIVIDADE_MENTAL: 'info' }
const receitaLabel = { REMEDIO: 'Remédio', ATIVIDADE_FISICA: 'Atividade Física', ATIVIDADE_MENTAL: 'Atividade Mental' }

function formatarData(data) {
  return data ? data.split('-').reverse().join('/') : '—'
}

function TrashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
    </svg>
  )
}

export default function AtendimentoList() {
  const [atendimentos, setAtendimentos] = useState([])
  const [selecionado, setSelecionado] = useState(null)
  const [exames, setExames] = useState([])
  const [adicionandoExame, setAdicionandoExame] = useState(false)
  const [novoExame, setNovoExame] = useState('')

  useEffect(() => {
    atendimentoService.listar().then(res => {
      const ordenados = [...res.data].sort((a, b) => new Date(b.data) - new Date(a.data))
      setAtendimentos(ordenados)
    })
  }, [])

  useEffect(() => {
    if (!selecionado) { setExames([]); return }
    exameLabService.buscarPorAtendimento(selecionado.id).then(res => setExames(res.data))
    setAdicionandoExame(false)
    setNovoExame('')
  }, [selecionado?.id])

  const selecionar = (a) => {
    setSelecionado(prev => prev?.id === a.id ? null : a)
  }

  const excluir = (id) => {
    if (!window.confirm('Excluir este atendimento?')) return
    atendimentoService.excluir(id).then(() => {
      setAtendimentos(prev => prev.filter(a => a.id !== id))
      if (selecionado?.id === id) setSelecionado(null)
    })
  }

  const excluirExame = (id) => {
    if (!window.confirm('Excluir este exame?')) return
    exameLabService.excluir(id).then(() =>
      setExames(prev => prev.filter(e => e.id !== id))
    )
  }

  const adicionarExame = () => {
    const descricao = novoExame.trim()
    if (!descricao) return
    exameLabService
      .inserir({ descricao, atendimento: { id: selecionado.id } })
      .then(res => {
        setExames(prev => [...prev, res.data])
        setNovoExame('')
        setAdicionandoExame(false)
      })
  }

  const handleNovoExameKeyDown = (e) => {
    if (e.key === 'Enter') adicionarExame()
    if (e.key === 'Escape') { setAdicionandoExame(false); setNovoExame('') }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h4 className="mb-0">Atendimentos</h4>
        <Link to="/atendimentos/novo" className="btn btn-primary btn-sm">
          + Novo Atendimento
        </Link>
      </div>

      <div className="row g-3 align-items-start">
        <div className={selecionado ? 'col-md-7' : 'col-12'}>
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <table className="table table-hover mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Data</th>
                    <th>Horário</th>
                    <th>Profissional</th>
                    <th>Receita</th>
                  </tr>
                </thead>
                <tbody>
                  {atendimentos.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center text-muted py-4">
                        Nenhum atendimento cadastrado.
                      </td>
                    </tr>
                  )}
                  {atendimentos.map(a => (
                    <tr
                      key={a.id}
                      onClick={() => selecionar(a)}
                      className={selecionado?.id === a.id ? 'table-active' : ''}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="text-muted">{a.id}</td>
                      <td>{formatarData(a.data)}</td>
                      <td>{a.horario}</td>
                      <td>{a.profissional?.nome || '—'}</td>
                      <td>
                        <span className={`badge bg-${receitaBadge[a.receitaSaude] || 'secondary'}`}>
                          {receitaLabel[a.receitaSaude] || a.receitaSaude}
                        </span>
                      </td>
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
                <span className="fw-semibold">Detalhes do Atendimento</span>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelecionado(null)}
                />
              </div>

              <div className="card-body">
                <dl className="row mb-0">
                  <dt className="col-5 text-muted">Data</dt>
                  <dd className="col-7">{formatarData(selecionado.data)}</dd>

                  <dt className="col-5 text-muted">Horário</dt>
                  <dd className="col-7">{selecionado.horario || '—'}</dd>

                  <dt className="col-5 text-muted">Paciente</dt>
                  <dd className="col-7">{selecionado.paciente?.nome || '—'}</dd>

                  <dt className="col-5 text-muted">Profissional</dt>
                  <dd className="col-7">{selecionado.profissional?.nome || '—'}</dd>

                  <dt className="col-5 text-muted">Receita</dt>
                  <dd className="col-7">
                    <span className={`badge bg-${receitaBadge[selecionado.receitaSaude] || 'secondary'}`}>
                      {receitaLabel[selecionado.receitaSaude] || selecionado.receitaSaude}
                    </span>
                  </dd>

                  <dt className="col-5 text-muted">Problema</dt>
                  <dd className="col-7">{selecionado.problemaTexto || '—'}</dd>
                </dl>

                <hr />

                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="fw-semibold small">Exames</span>
                  {!adicionandoExame && (
                    <button
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => setAdicionandoExame(true)}
                    >
                      + Adicionar Exame
                    </button>
                  )}
                </div>

                {adicionandoExame && (
                  <div className="input-group input-group-sm mb-2">
                    <input
                      className="form-control"
                      placeholder="Descrição do exame"
                      value={novoExame}
                      onChange={e => setNovoExame(e.target.value)}
                      onKeyDown={handleNovoExameKeyDown}
                      autoFocus
                    />
                    <button className="btn btn-primary" onClick={adicionarExame}>Salvar</button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => { setAdicionandoExame(false); setNovoExame('') }}
                    >
                      Cancelar
                    </button>
                  </div>
                )}

                {exames.length === 0 ? (
                  <p className="text-muted small mb-0">Nenhum exame registrado.</p>
                ) : (
                  <ul className="list-group list-group-flush">
                    {exames.map(e => (
                      <li
                        key={e.id}
                        className="list-group-item d-flex justify-content-between align-items-center px-0"
                      >
                        <span className="small">{e.descricao}</span>
                        <button
                          className="btn btn-link btn-sm text-danger p-0"
                          onClick={() => excluirExame(e.id)}
                          title="Excluir exame"
                        >
                          <TrashIcon />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="card-footer d-flex gap-2">
                <Link
                  to={`/atendimentos/${selecionado.id}/editar`}
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

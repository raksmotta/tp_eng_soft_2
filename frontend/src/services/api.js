import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:8080/api' })

export const profissionalService = {
  listar: () => api.get('/profissionais'),
  buscarPorId: (id) => api.get(`/profissionais/${id}`),
  buscarPorNome: (nome) => api.get(`/profissionais/buscar?nome=${nome}`),
  buscarPorCategoria: (categoria) => api.get(`/profissionais/categoria/${categoria}`),
  inserir: (dados) => api.post('/profissionais', dados),
  alterar: (id, dados) => api.put(`/profissionais/${id}`, dados),
  excluir: (id) => api.delete(`/profissionais/${id}`),
}

export const pacienteService = {
  listar: () => api.get('/pacientes'),
  buscarPorId: (id) => api.get(`/pacientes/${id}`),
  buscarPorNome: (nome) => api.get(`/pacientes/buscar?nome=${nome}`),
  inserir: (dados) => api.post('/pacientes', dados),
  alterar: (id, dados) => api.put(`/pacientes/${id}`, dados),
  excluir: (id) => api.delete(`/pacientes/${id}`),
}

export const atendimentoService = {
  listar: () => api.get('/atendimentos'),
  buscarPorId: (id) => api.get(`/atendimentos/${id}`),
  buscarPorData: (data) => api.get(`/atendimentos/data/${data}`),
  buscarPorProfissional: (id) => api.get(`/atendimentos/profissional/${id}`),
  buscarPorReceita: (receita) => api.get(`/atendimentos/receita/${receita}`),
  inserir: (dados) => api.post('/atendimentos', dados),
  alterar: (id, dados) => api.put(`/atendimentos/${id}`, dados),
  excluir: (id) => api.delete(`/atendimentos/${id}`),
}

export const exameLabService = {
  buscarPorAtendimento: (atendimentoId) => api.get(`/exames/atendimento/${atendimentoId}`),
  buscarPorId: (id) => api.get(`/exames/${id}`),
  inserir: (dados) => api.post('/exames', dados),
  alterar: (id, dados) => api.put(`/exames/${id}`, dados),
  excluir: (id) => api.delete(`/exames/${id}`),
}

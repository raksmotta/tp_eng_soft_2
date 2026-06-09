import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import ProfissionalList from './components/Profissional/ProfissionalList'
import ProfissionalForm from './components/Profissional/ProfissionalForm'
import AtendimentoList from './components/Atendimento/AtendimentoList'
import AtendimentoForm from './components/Atendimento/AtendimentoForm'
import ExameLabList from './components/ExameLab/ExameLabList'
import ExameLabForm from './components/ExameLab/ExameLabForm'

export default function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/profissionais">Profissionais</Link> |{' '}
        <Link to="/atendimentos">Atendimentos</Link>
      </nav>
      <Routes>
        <Route path="/profissionais" element={<ProfissionalList />} />
        <Route path="/profissionais/novo" element={<ProfissionalForm />} />
        <Route path="/profissionais/:id/editar" element={<ProfissionalForm />} />
        <Route path="/atendimentos" element={<AtendimentoList />} />
        <Route path="/atendimentos/novo" element={<AtendimentoForm />} />
        <Route path="/atendimentos/:id/editar" element={<AtendimentoForm />} />
        <Route path="/atendimentos/:atendimentoId/exames" element={<ExameLabList />} />
        <Route path="/atendimentos/:atendimentoId/exames/novo" element={<ExameLabForm />} />
      </Routes>
    </BrowserRouter>
  )
}

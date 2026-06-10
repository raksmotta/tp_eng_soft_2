import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom'
import ProfissionalList from './components/Profissional/ProfissionalList'
import ProfissionalForm from './components/Profissional/ProfissionalForm'
import PacienteList from './components/Paciente/PacienteList'
import PacienteForm from './components/Paciente/PacienteForm'
import AtendimentoList from './components/Atendimento/AtendimentoList'
import AtendimentoForm from './components/Atendimento/AtendimentoForm'
import ExameLabList from './components/ExameLab/ExameLabList'
import ExameLabForm from './components/ExameLab/ExameLabForm'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <Link className="navbar-brand fw-semibold" to="/profissionais">
          Saúde
        </Link>
        <ul className="navbar-nav gap-2">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              to="/pacientes"
            >
              Pacientes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              to="/profissionais"
            >
              Profissionais
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
              to="/atendimentos"
            >
              Atendimentos
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="container py-4">
        <Routes>
          <Route path="/pacientes" element={<PacienteList />} />
          <Route path="/pacientes/novo" element={<PacienteForm />} />
          <Route path="/pacientes/:id/editar" element={<PacienteForm />} />
          <Route path="/profissionais" element={<ProfissionalList />} />
          <Route path="/profissionais/novo" element={<ProfissionalForm />} />
          <Route path="/profissionais/:id/editar" element={<ProfissionalForm />} />
          <Route path="/atendimentos" element={<AtendimentoList />} />
          <Route path="/atendimentos/novo" element={<AtendimentoForm />} />
          <Route path="/atendimentos/:id/editar" element={<AtendimentoForm />} />
          <Route path="/atendimentos/:atendimentoId/exames" element={<ExameLabList />} />
          <Route path="/atendimentos/:atendimentoId/exames/novo" element={<ExameLabForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

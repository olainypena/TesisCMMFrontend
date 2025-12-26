import { Routes, Route } from 'react-router-dom'
import PublicLayout from '../../presentation/components/layouts/PublicLayout'
import DashboardLayout from '../../presentation/components/layouts/DashboardLayout'


import Home from '../../presentation/pages/Public/Home'
import Nosotros from '../../presentation/pages/Public/Nosotros'
import Servicios from '../../presentation/pages/Public/Servicios'
import Especialidades from '../../presentation/pages/Public/Especialidades'
import Contacto from '../../presentation/pages/Public/Contacto'


import Login from '../../presentation/pages/Auth/Login'
import Register from '../../presentation/pages/Auth/Register'


import PacienteDashboard from '../../presentation/pages/Dashboard/PacienteDashboard'
import PacientHome from '../../presentation/pages/Dashboard/PatientHome'
import MedicoHome from '../../presentation/pages/Dashboard/MedicoHome'
import MedicoDashboard from '../../presentation/pages/Dashboard/MedicoDashboard'
import SecretariaDashboard from '../../presentation/pages/Dashboard/SecretariaDashboard'
import ServicioClienteDashboard from '../../presentation/pages/Dashboard/ServicioClienteDashboard'


export default function AppRouter() {
return (
<Routes>
<Route element={<PublicLayout />}>
<Route path="/" element={<Home />} />
<Route path="/nosotros" element={<Nosotros />} />
<Route path="/servicios" element={<Servicios />} />
<Route path="/especialidades" element={<Especialidades />} />
<Route path="/contacto" element={<Contacto />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />   
</Route>


<Route element={<DashboardLayout />}>
<Route path="/dashboard/paciente" element={<PacienteDashboard />} />
<Route path="/dashboard/home" element={<PacientHome />} />
<Route path="/dashboard/homeMed" element={<MedicoHome />} />

<Route path="/dashboard/medico" element={<MedicoDashboard />} />
<Route path="/dashboard/secretaria" element={<SecretariaDashboard />} />
<Route path="/dashboard/servicio" element={<ServicioClienteDashboard />} />
</Route>
</Routes>
)
}
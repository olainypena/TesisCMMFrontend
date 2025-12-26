# 🏥 CMMSalud – Frontend Web

Aplicación web desarrollada con **React + Vite**, que se conecta a un **backend en .NET Core**, utiliza **SQL Server** como base de datos y **Node.js** como herramienta de desarrollo.

El sistema está orientado a la gestión clínica, permitiendo la administración de usuarios, médicos, pacientes y citas médicas.

---

## 🚀 Tecnologías Utilizadas

### Frontend
- ⚛️ **React 18**
- ⚡ **Vite**
- 🧭 **React Router DOM**
- 🗃️ **Zustand** (manejo de estado)
- 🎨 **CSS3**
- 🌐 **Fetch API**

### Backend
- 🔷 **.NET Core Web API**
- 🗄️ **SQL Server**
- 🔐 **JWT Authentication**
- 📦 **Entity Framework Core**

### Herramientas
- 🟢 **Node.js**
- 📦 **npm**
- 🔧 **Git & GitHub**
- 🔧 **EmailJs**

---

## 📁 Estructura del Proyecto

```bash
src
│── App.css
│── App.jsx
│── index.css
│── main.jsx
│
├── App
│   ├── hooks
│   │   └── useAuth.js
│   │
│   ├── router
│   │   └── AppRouter.jsx
│   │
│   └── store
│       └── authStore.js
│
├── assets
│   └── react.svg
│
├── core
│   └── config
│       └── api.js
│
├── data
│   └── api
│       ├── authApi.js
│       ├── citasApi.js
│       ├── medicosApi.js
│       └── pacientesApi.js
│
├── domain
│   ├── models
│   │   ├── medico.js
│   │   ├── paciente.js
│   │   └── user.js
│   │
│   └── repositories
│       └── usuarioRepository.js
│
└── presentation
    ├── components
    │   ├── MedicoCard.jsx
    │   └── PublicNavbar.jsx
    │
    ├── layouts
    │   ├── DashboardLayout.jsx
    │   └── PublicLayout.jsx
    │
    └── pages
        ├── Auth
        │   ├── Login.jsx
        │   └── Register.jsx
        │
        ├── Dashboard
        │   ├── MedicoDashboard.jsx
        │   ├── MedicoHome.jsx
        │   ├── PacienteDashboard.jsx
        │   ├── PatientHome.jsx
        │   ├── SecretariaDashboard.jsx
        │   └── ServicioClienteDashboard.jsx
        │
        └── Public
            ├── Contacto.jsx
            ├── Especialidades.jsx
            ├── Home.jsx
            ├── Nosotros.jsx
            └── Servicios.jsx

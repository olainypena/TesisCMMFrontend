import { Outlet } from 'react-router-dom'


export default function DashboardLayout() {
return (
<div className="dashboard">
<aside className="sidebar">CMMSalud</aside>
<main className="content">
<Outlet />
</main>
</div>
)
}
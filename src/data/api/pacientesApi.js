import { API_URL } from "../../core/config/api";

export async function getPacientes() {
  const res = await fetch(`${API_URL}/Pacientes`);
  if (!res.ok) throw new Error("Error al obtener pacientes");
  return res.json();
}

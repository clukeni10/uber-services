// models/admin.ts
import type { User } from "../types/UserType";

const BASE_URL = "http://localhost:3001/api/admin";

function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// 1. Obter todos os utilizadores
export async function getAllUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// 2. Obter um utilizador por ID
export async function getUserById(id: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// 3. Criar um novo utilizador (Inclui password e role)
export async function createUser(userData: Omit<User, "id"> & { password?: string }) {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// 4. Atualizar dados de qualquer utilizador por ID (A password torna-se opcional aqui)
export async function updateUser(id: number, userData: Partial<User> & { password?: string }) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(userData),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

// 5. Eliminar um utilizador por ID
export async function deleteUser(id: number): Promise<{ message: string }> {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getAdminStats() {
  const res = await fetch(`${BASE_URL}/stats`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}

export async function getAdminInvoices() {
  const res = await fetch(`${BASE_URL}/invoices/all`, { headers: getHeaders() });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error);
  return data;
}
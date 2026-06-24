// controllers/useAdmin.ts
import { useState, useEffect } from "react";
import { getAllUsers, createUser, updateUser, deleteUser } from "../models/admin";
import type { User } from "../types/UserType";

export function useAdmin() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carrega todos os utilizadores ao montar o painel do administrador
  useEffect(() => {
    getAllUsers()
      .then(setUsers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // Função para criar utilizador
  async function handleCreate(userData: Omit<User, "id"> & { password?: string }) {
    try {
      setError(null);
      const result = await createUser(userData);
      
      // Criamos o objeto completo para injetar no estado local e atualizar a tabela na hora
      const newUser: User = { ...userData, id: result.userId } as User;
      setUsers((prev) => [...prev, newUser]);
    } catch (err: any) {
      setError(err.message); 
      throw err;
    }
  }

  // Função para atualizar um utilizador específico
  async function handleUpdate(id: number, userData: Partial<User> & { password?: string }) {
    try {
      setError(null);
      await updateUser(id, userData);
      
      // Atualiza o utilizador correspondente no estado da lista
      setUsers((prev) =>
        prev.map((u) => (u.id === id ? { ...u, ...userData } : u))
      );
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  // Função para eliminar um utilizador
  async function handleDelete(id: number) {
    try {
      setError(null);
      await deleteUser(id);
      
      // Remove o utilizador eliminado do estado local
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  }

  return { users, loading, error, handleCreate, handleUpdate, handleDelete };
}
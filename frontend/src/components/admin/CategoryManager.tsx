import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryProvider } from './QueryProvider';
import Spinner from './Spinner';
import api from '../../lib/api';
import type { Category } from '../../types';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function CategoryManagerInner() {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');
  const [error, setError] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  const categories: (Category & { _count?: { products: number } })[] = data?.data || data || [];

  const createMutation = useMutation({
    mutationFn: (payload: { name: string; slug: string; description?: string }) =>
      api.post('/admin/categories', payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setNewName('');
      setNewDesc('');
      setError('');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Error al crear');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }: { id: string; name: string; description?: string }) =>
      api.patch(`/admin/categories/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setEditingId(null);
      setError('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      setError('');
    },
    onError: (err: any) => {
      setError(err.response?.data?.message || 'Error al eliminar');
    },
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createMutation.mutate({
      name: newName.trim(),
      slug: slugify(newName),
      description: newDesc || undefined,
    });
  };

  const handleUpdate = (id: string) => {
    if (!editName.trim()) return;
    updateMutation.mutate({ id, name: editName.trim(), description: editDesc || undefined });
  };

  const startEdit = (cat: Category) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || '');
  };

  return (
    <div>
      <h1 className="text-2xl uppercase tracking-[-0.01em] font-bold mb-8">Categorias</h1>

      {/* Create form */}
      <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-3 mb-8">
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="Nombre de la categoria"
          className="border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        />
        <input
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          placeholder="Descripcion (opcional)"
          className="border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        />
        <button
          type="submit"
          disabled={createMutation.isPending}
          className="bg-[#2B2521] text-[#F2EBD8] px-6 py-2 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition disabled:opacity-50 cursor-pointer whitespace-nowrap flex items-center gap-1.5"
        >
          {createMutation.isPending ? (<><Spinner size="sm" light /> Creando...</>) : 'Crear'}
        </button>
      </form>

      {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12 gap-3">
          <Spinner size="lg" />
          <span className="text-sm text-[#3C3A37]/50">Cargando categorias...</span>
        </div>
      ) : categories.length === 0 ? (
        <p className="text-sm text-[#3C3A37]/50">No hay categorias.</p>
      ) : (
        <div className="bg-white border border-[#3C3A37]/10 divide-y divide-[#3C3A37]/10">
          {categories.map((cat) => (
            <div key={cat.id} className="p-3 flex items-center gap-4">
              {editingId === cat.id ? (
                <>
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border border-[#3C3A37]/20 bg-white px-2 py-1 text-sm font-serif flex-1"
                  />
                  <input
                    value={editDesc}
                    onChange={(e) => setEditDesc(e.target.value)}
                    className="border border-[#3C3A37]/20 bg-white px-2 py-1 text-sm font-serif flex-1"
                    placeholder="Descripcion"
                  />
                  <button
                    onClick={() => handleUpdate(cat.id)}
                    disabled={updateMutation.isPending}
                    className="text-[10px] uppercase px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    {updateMutation.isPending ? (<><Spinner size="sm" /> Guardando...</>) : 'Guardar'}
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-[10px] uppercase px-2 py-1 text-[#3C3A37]/50 hover:text-[#3C3A37] cursor-pointer"
                  >
                    Cancelar
                  </button>
                </>
              ) : (
                <>
                  <div className="flex-1">
                    <span className="font-bold text-sm">{cat.name}</span>
                    {cat.description && (
                      <span className="text-xs text-[#3C3A37]/50 ml-2">{cat.description}</span>
                    )}
                  </div>
                  <span className="text-xs text-[#3C3A37]/50">
                    {cat._count?.products || 0} productos
                  </span>
                  <button
                    onClick={() => startEdit(cat)}
                    className="text-[10px] uppercase px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 cursor-pointer"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Eliminar "${cat.name}"?`)) deleteMutation.mutate(cat.id);
                    }}
                    disabled={deleteMutation.isPending && deleteMutation.variables === cat.id}
                    className="text-[10px] uppercase px-2 py-1 text-red-600 hover:bg-red-50 cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    {deleteMutation.isPending && deleteMutation.variables === cat.id ? (
                      <><Spinner size="sm" /> Eliminando...</>
                    ) : 'Eliminar'}
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function CategoryManager() {
  return (
    <QueryProvider>
      <CategoryManagerInner />
    </QueryProvider>
  );
}

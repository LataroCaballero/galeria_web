import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryProvider } from './QueryProvider';
import api from '../../lib/api';
import type { Product, PaginatedResponse } from '../../types';

function ProductListInner() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['admin-products', page, search, statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set('page', String(page));
      params.set('limit', '15');
      if (search) params.set('search', search);
      if (statusFilter) params.set('status', statusFilter);

      const res = await api.get(`/admin/products?${params}`);
      return res.data as { data: PaginatedResponse<Product> } | PaginatedResponse<Product>;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/admin/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  const publishMutation = useMutation({
    mutationFn: (id: string) => api.post(`/admin/products/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-products'] }),
  });

  // Handle both wrapped and unwrapped response formats
  const responseData = data as any;
  const products: Product[] = responseData?.data?.data || responseData?.data || [];
  const meta = responseData?.data?.meta || responseData?.meta || { total: 0, page: 1, totalPages: 1 };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Eliminar "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl uppercase tracking-[-0.01em] font-bold">Productos</h1>
        <a
          href="/admin/productos/nuevo"
          className="bg-[#2B2521] text-[#F2EBD8] px-6 py-2 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition text-center no-underline"
        >
          Nuevo Producto
        </a>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none"
        >
          <option value="">Todos los estados</option>
          <option value="DRAFT">Borrador</option>
          <option value="PUBLISHED">Publicado</option>
          <option value="ARCHIVED">Archivado</option>
        </select>
      </div>

      {/* Table */}
      {isLoading ? (
        <p className="text-sm text-[#3C3A37]/50">Cargando...</p>
      ) : products.length === 0 ? (
        <div className="text-center py-12 bg-white border border-[#3C3A37]/10">
          <p className="text-sm text-[#3C3A37]/50">No se encontraron productos.</p>
          <a href="/admin/productos/nuevo" className="text-sm mt-2 inline-block">Crear el primero</a>
        </div>
      ) : (
        <div className="bg-white border border-[#3C3A37]/10 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#2B2521] text-[#F2EBD8] uppercase tracking-[-0.01em] text-xs">
                <th className="py-2 px-3 text-left font-normal">Imagen</th>
                <th className="py-2 px-3 text-left font-normal">Nombre</th>
                <th className="py-2 px-3 text-left font-normal hidden md:table-cell">Categoria</th>
                <th className="py-2 px-3 text-left font-normal">Estado</th>
                <th className="py-2 px-3 text-left font-normal hidden md:table-cell">Precio</th>
                <th className="py-2 px-3 text-right font-normal">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-[#3C3A37]/10 hover:bg-[#F2EBD8]/50">
                  <td className="py-2 px-3">
                    {product.images?.[0] ? (
                      <img src={product.images[0].cloudinaryUrl} alt="" className="w-10 h-10 object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-[#3C3A37]/5" />
                    )}
                  </td>
                  <td className="py-2 px-3 font-bold">{product.name}</td>
                  <td className="py-2 px-3 hidden md:table-cell text-[#3C3A37]/60">{product.category?.name}</td>
                  <td className="py-2 px-3">
                    <span className={`text-[10px] uppercase px-2 py-0.5 ${
                      product.status === 'PUBLISHED'
                        ? 'bg-green-100 text-green-800'
                        : product.status === 'ARCHIVED'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-[#3C3A37]/10 text-[#3C3A37]'
                    }`}>
                      {product.status === 'PUBLISHED' ? 'Publicado' : product.status === 'DRAFT' ? 'Borrador' : 'Archivado'}
                    </span>
                  </td>
                  <td className="py-2 px-3 hidden md:table-cell">${Number(product.price).toLocaleString('es-AR')}</td>
                  <td className="py-2 px-3 text-right">
                    <div className="flex justify-end gap-2">
                      {product.status === 'DRAFT' && (
                        <button
                          onClick={() => publishMutation.mutate(product.id)}
                          className="text-[10px] uppercase px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 transition cursor-pointer"
                        >
                          Publicar
                        </button>
                      )}
                      <a
                        href={`/admin/productos/${product.id}/editar`}
                        className="text-[10px] uppercase px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 transition no-underline text-[#3C3A37]"
                      >
                        Editar
                      </a>
                      <button
                        onClick={() => handleDelete(product.id, product.name)}
                        className="text-[10px] uppercase px-2 py-1 text-red-600 hover:bg-red-50 transition cursor-pointer"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-3 py-1 text-xs border border-[#3C3A37]/20 disabled:opacity-30 cursor-pointer"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-xs">
            {page} / {meta.totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(meta.totalPages, p + 1))}
            disabled={page >= meta.totalPages}
            className="px-3 py-1 text-xs border border-[#3C3A37]/20 disabled:opacity-30 cursor-pointer"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProductList() {
  return (
    <QueryProvider>
      <ProductListInner />
    </QueryProvider>
  );
}

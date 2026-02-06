import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { QueryProvider } from './QueryProvider';
import api from '../../lib/api';
import type { Product, Category } from '../../types';
import ImageUploader from './ImageUploader';

const productSchema = z.object({
  name: z.string().min(3, 'Minimo 3 caracteres'),
  slug: z.string().min(3, 'Minimo 3 caracteres'),
  description: z.string().optional(),
  price: z.number({ invalid_type_error: 'Ingrese un precio' }).positive('Debe ser positivo'),
  categoryId: z.string().uuid('Seleccione una categoria'),
  status: z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED']),
});

type ProductFormData = z.infer<typeof productSchema>;

interface SpecEntry {
  key: string;
  value: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function ProductFormInner({ product, apiUrl }: { product?: Product; apiUrl: string }) {
  const isEdit = !!product;
  const [specs, setSpecs] = useState<SpecEntry[]>(
    product?.specifications
      ? Object.entries(product.specifications).map(([key, value]) => ({ key, value }))
      : []
  );
  const [saved, setSaved] = useState(false);
  const [savedProductId, setSavedProductId] = useState(product?.id || '');

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await api.get('/categories');
      return res.data;
    },
  });

  const categories: Category[] = categoriesData?.data || categoriesData || [];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      slug: product?.slug || '',
      description: product?.description || '',
      price: product?.price ? Number(product.price) : undefined,
      categoryId: product?.categoryId || '',
      status: product?.status || 'DRAFT',
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ProductFormData) => {
      const payload = {
        ...data,
        specifications: specs.length > 0
          ? Object.fromEntries(specs.filter((s) => s.key).map((s) => [s.key, s.value]))
          : undefined,
      };

      if (isEdit) {
        return api.patch(`/admin/products/${product.id}`, payload);
      }
      return api.post('/admin/products', payload);
    },
    onSuccess: (res) => {
      const newProduct = res.data?.data || res.data;
      if (!isEdit && newProduct?.id) {
        setSavedProductId(newProduct.id);
        setSaved(true);
        // Redirect to edit page to allow image upload
        window.location.href = `/admin/productos/${newProduct.id}/editar`;
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    },
  });

  const handleNameBlur = () => {
    const name = watch('name');
    const currentSlug = watch('slug');
    if (name && (!currentSlug || (!isEdit && currentSlug === slugify(watch('name'))))) {
      setValue('slug', slugify(name));
    }
  };

  const addSpec = () => setSpecs([...specs, { key: '', value: '' }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl uppercase tracking-[-0.01em] font-bold">
          {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        <a href="/admin/productos" className="text-xs text-[#3C3A37]/60 hover:text-[#3C3A37]">
          Volver a lista
        </a>
      </div>

      <form onSubmit={handleSubmit((data) => mutation.mutate(data))} className="space-y-6 max-w-2xl">
        {/* Name */}
        <div>
          <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Nombre</label>
          <input
            {...register('name')}
            onBlur={handleNameBlur}
            className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
            placeholder="Silla Nordica Minimalista"
          />
          {errors.name && <span className="text-red-600 text-xs mt-1 block">{errors.name.message}</span>}
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Slug (URL)</label>
          <input
            {...register('slug')}
            className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
            placeholder="silla-nordica-minimalista"
          />
          {errors.slug && <span className="text-red-600 text-xs mt-1 block">{errors.slug.message}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Descripcion</label>
          <textarea
            {...register('description')}
            rows={4}
            className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 resize-y"
            placeholder="Descripcion del producto..."
          />
        </div>

        {/* Price + Category */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Precio (ARS)</label>
            <input
              {...register('price', { valueAsNumber: true })}
              type="number"
              step="0.01"
              className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
              placeholder="45000"
            />
            {errors.price && <span className="text-red-600 text-xs mt-1 block">{errors.price.message}</span>}
          </div>
          <div>
            <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Categoria</label>
            <select
              {...register('categoryId')}
              className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
            >
              <option value="">Seleccionar...</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {errors.categoryId && <span className="text-red-600 text-xs mt-1 block">{errors.categoryId.message}</span>}
          </div>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs uppercase tracking-[-0.01em] mb-1 font-bold">Estado</label>
          <select
            {...register('status')}
            className="w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
          >
            <option value="DRAFT">Borrador</option>
            <option value="PUBLISHED">Publicado</option>
            <option value="ARCHIVED">Archivado</option>
          </select>
        </div>

        {/* Specifications */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs uppercase tracking-[-0.01em] font-bold">Especificaciones</label>
            <button
              type="button"
              onClick={addSpec}
              className="text-xs px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 transition cursor-pointer"
            >
              + Agregar
            </button>
          </div>
          {specs.map((spec, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={spec.key}
                onChange={(e) => updateSpec(i, 'key', e.target.value)}
                placeholder="Ej: Material"
                className="flex-1 border border-[#3C3A37]/20 bg-white px-3 py-1.5 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
              />
              <input
                value={spec.value}
                onChange={(e) => updateSpec(i, 'value', e.target.value)}
                placeholder="Ej: Madera de roble"
                className="flex-1 border border-[#3C3A37]/20 bg-white px-3 py-1.5 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
              />
              <button
                type="button"
                onClick={() => removeSpec(i)}
                className="text-red-500 text-xs px-2 hover:bg-red-50 cursor-pointer"
              >
                x
              </button>
            </div>
          ))}
        </div>

        {/* Image uploader (only for edit mode) */}
        {isEdit && product && (
          <div className="mt-4">
            <h2 className="text-sm uppercase tracking-[-0.01em] font-bold mb-4">Imagenes</h2>
            <ImageUploader productId={product.id} existingImages={product.images || []} apiUrl={apiUrl} />
          </div>
        )}

        {/* Submit */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={mutation.isPending}
            className="bg-[#2B2521] text-[#F2EBD8] px-8 py-2.5 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {mutation.isPending ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Producto'}
          </button>
          {saved && <span className="text-green-700 text-sm">Guardado</span>}
          {mutation.isError && (
            <span className="text-red-600 text-sm">Error al guardar</span>
          )}
        </div>
      </form>
    </div>
  );
}

export default function ProductForm({ product, apiUrl }: { product?: Product; apiUrl: string }) {
  return (
    <QueryProvider>
      <ProductFormInner product={product} apiUrl={apiUrl} />
    </QueryProvider>
  );
}

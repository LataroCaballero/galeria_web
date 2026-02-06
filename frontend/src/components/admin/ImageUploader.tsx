import { useCallback, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../lib/api';
import { optimizeImage } from '../../lib/optimizeImage';
import type { ProductImage } from '../../types';

interface Props {
  productId: string;
  existingImages: ProductImage[];
  apiUrl: string;
}

export default function ImageUploader({ productId, existingImages, apiUrl }: Props) {
  const [images, setImages] = useState<ProductImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const prevImagesRef = useRef<ProductImage[]>(images);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setError('');
    setOptimizing(true);

    const optimizedFiles: File[] = [];
    for (const file of acceptedFiles) {
      try {
        optimizedFiles.push(await optimizeImage(file));
      } catch {
        optimizedFiles.push(file);
      }
    }

    setOptimizing(false);
    setUploading(true);

    for (const file of optimizedFiles) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('productId', productId);

        const res = await api.post('/admin/uploads/image', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const newImage = res.data?.data || res.data;
        setImages((prev) => [...prev, newImage]);
      } catch (err) {
        setError('Error al subir imagen');
      }
    }

    setUploading(false);
  }, [productId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 10 * 1024 * 1024,
  });

  const deleteImage = async (publicId: string) => {
    if (!confirm('Eliminar imagen?')) return;
    try {
      await api.delete(`/admin/uploads/${encodeURIComponent(publicId)}`);
      setImages((prev) => prev.filter((img) => img.cloudinaryPublicId !== publicId));
    } catch {
      setError('Error al eliminar');
    }
  };

  const setPrimary = async (imageId: string) => {
    const prev = [...images];
    try {
      // Move to first position + mark as primary
      const sorted = [...images].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((img) => img.id === imageId);
      if (idx > 0) {
        const [moved] = sorted.splice(idx, 1);
        sorted.unshift(moved);
      }
      const reordered = sorted.map((img, i) => ({
        ...img,
        order: i,
        isPrimary: img.id === imageId,
      }));
      setImages(reordered);

      await api.patch(`/admin/uploads/primary/${imageId}`);
      if (idx > 0) {
        await api.patch(`/admin/uploads/order/${productId}`, {
          imageIds: reordered.map((img) => img.id),
        });
      }
    } catch {
      setImages(prev);
      setError('Error al cambiar imagen principal');
    }
  };

  const handleDragStart = (index: number) => {
    prevImagesRef.current = [...images];
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDrop = async (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const sorted = [...images].sort((a, b) => a.order - b.order);
    const [moved] = sorted.splice(draggedIndex, 1);
    sorted.splice(targetIndex, 0, moved);

    // If moved to first position, make it primary
    const newPrimaryId = targetIndex === 0 ? moved.id : null;
    const reordered = sorted.map((img, i) => ({
      ...img,
      order: i,
      ...(newPrimaryId != null ? { isPrimary: img.id === newPrimaryId } : {}),
    }));

    setImages(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);

    try {
      await api.patch(`/admin/uploads/order/${productId}`, {
        imageIds: reordered.map((img) => img.id),
      });
      if (newPrimaryId) {
        await api.patch(`/admin/uploads/primary/${newPrimaryId}`);
      }
    } catch {
      setImages(prevImagesRef.current);
      setError('Error al reordenar imagenes');
    }
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div>
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed px-6 py-8 text-center cursor-pointer transition mb-4 ${
          isDragActive ? 'border-[#2B2521] bg-[#F2EBD8]' : 'border-[#3C3A37]/20 hover:border-[#3C3A37]/40'
        }`}
      >
        <input {...getInputProps()} />
        {optimizing ? (
          <p className="text-sm text-[#3C3A37]/60">Optimizando imagenes...</p>
        ) : uploading ? (
          <p className="text-sm text-[#3C3A37]/60">Subiendo...</p>
        ) : isDragActive ? (
          <p className="text-sm">Soltar imagenes aqui</p>
        ) : (
          <p className="text-sm text-[#3C3A37]/60">
            Arrastra imagenes aqui o hace click para seleccionar
          </p>
        )}
      </div>

      {error && <p className="text-red-600 text-xs mb-4">{error}</p>}

      {/* Image grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
          {[...images]
            .sort((a, b) => a.order - b.order)
            .map((img, index) => (
              <div
                key={img.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={(e) => handleDragOver(e, index)}
                onDrop={() => handleDrop(index)}
                onDragEnd={handleDragEnd}
                className={`relative group cursor-grab active:cursor-grabbing transition-all ${
                  draggedIndex === index ? 'opacity-40' : ''
                } ${dragOverIndex === index && draggedIndex !== index ? 'ring-2 ring-[#2B2521] scale-[1.03]' : ''}`}
              >
                <span className="absolute top-1 right-1 z-10 bg-[#2B2521]/80 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full">
                  {index + 1}
                </span>
                <img
                  src={img.cloudinaryUrl}
                  alt={img.altText || ''}
                  className={`w-full aspect-square object-cover pointer-events-none ${
                    img.isPrimary ? 'ring-2 ring-green-600' : ''
                  }`}
                />
                {img.isPrimary && (
                  <span className="absolute top-1 left-1 bg-green-600 text-white text-[9px] px-1">
                    Principal
                  </span>
                )}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  {!img.isPrimary && (
                    <button
                      onClick={() => setPrimary(img.id)}
                      className="text-white text-[10px] bg-green-700 px-2 py-1 hover:bg-green-800 cursor-pointer"
                    >
                      Principal
                    </button>
                  )}
                  <button
                    onClick={() => deleteImage(img.cloudinaryPublicId)}
                    className="text-white text-[10px] bg-red-700 px-2 py-1 hover:bg-red-800 cursor-pointer"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

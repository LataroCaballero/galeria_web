import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../lib/api';
import type { ProductImage } from '../../types';

interface Props {
  productId: string;
  existingImages: ProductImage[];
  apiUrl: string;
}

export default function ImageUploader({ productId, existingImages, apiUrl }: Props) {
  const [images, setImages] = useState<ProductImage[]>(existingImages);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setUploading(true);
    setError('');

    for (const file of acceptedFiles) {
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
    try {
      await api.patch(`/admin/uploads/primary/${imageId}`);
      setImages((prev) =>
        prev.map((img) => ({
          ...img,
          isPrimary: img.id === imageId,
        }))
      );
    } catch {
      setError('Error al cambiar imagen principal');
    }
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
        {uploading ? (
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
          {images
            .sort((a, b) => a.order - b.order)
            .map((img) => (
              <div key={img.id} className="relative group">
                <img
                  src={img.cloudinaryUrl}
                  alt={img.altText || ''}
                  className={`w-full aspect-square object-cover ${
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

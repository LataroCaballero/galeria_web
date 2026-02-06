import { jsxs, jsx } from 'react/jsx-runtime';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState, useRef, useCallback } from 'react';
import { a as api, Q as QueryProvider } from './api_9J35uP7a.mjs';
import { useDropzone } from 'react-dropzone';
import imageCompression from 'browser-image-compression';

const OPTIONS = {
  maxSizeMB: 2,
  maxWidthOrHeight: 2048,
  useWebWorker: true,
  initialQuality: 0.92,
  preserveExif: false
};
async function optimizeImage(file) {
  const compressed = await imageCompression(file, OPTIONS);
  return new File([compressed], file.name, { type: compressed.type });
}

function ImageUploader({ productId, existingImages, apiUrl }) {
  const [images, setImages] = useState(existingImages);
  const [uploading, setUploading] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const [error, setError] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const prevImagesRef = useRef(images);
  const onDrop = useCallback(async (acceptedFiles) => {
    setError("");
    setOptimizing(true);
    const optimizedFiles = [];
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
        formData.append("file", file);
        formData.append("productId", productId);
        const res = await api.post("/admin/uploads/image", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
        const newImage = res.data?.data || res.data;
        setImages((prev) => [...prev, newImage]);
      } catch (err) {
        setError("Error al subir imagen");
      }
    }
    setUploading(false);
  }, [productId]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
    maxSize: 10 * 1024 * 1024
  });
  const deleteImage = async (publicId) => {
    if (!confirm("Eliminar imagen?")) return;
    try {
      await api.delete(`/admin/uploads/${encodeURIComponent(publicId)}`);
      setImages((prev) => prev.filter((img) => img.cloudinaryPublicId !== publicId));
    } catch {
      setError("Error al eliminar");
    }
  };
  const setPrimary = async (imageId) => {
    const prev = [...images];
    try {
      const sorted = [...images].sort((a, b) => a.order - b.order);
      const idx = sorted.findIndex((img) => img.id === imageId);
      if (idx > 0) {
        const [moved] = sorted.splice(idx, 1);
        sorted.unshift(moved);
      }
      const reordered = sorted.map((img, i) => ({
        ...img,
        order: i,
        isPrimary: img.id === imageId
      }));
      setImages(reordered);
      await api.patch(`/admin/uploads/primary/${imageId}`);
      if (idx > 0) {
        await api.patch(`/admin/uploads/order/${productId}`, {
          imageIds: reordered.map((img) => img.id)
        });
      }
    } catch {
      setImages(prev);
      setError("Error al cambiar imagen principal");
    }
  };
  const handleDragStart = (index) => {
    prevImagesRef.current = [...images];
    setDraggedIndex(index);
  };
  const handleDragOver = (e, index) => {
    e.preventDefault();
    setDragOverIndex(index);
  };
  const handleDrop = async (targetIndex) => {
    if (draggedIndex === null || draggedIndex === targetIndex) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }
    const sorted = [...images].sort((a, b) => a.order - b.order);
    const [moved] = sorted.splice(draggedIndex, 1);
    sorted.splice(targetIndex, 0, moved);
    const newPrimaryId = targetIndex === 0 ? moved.id : null;
    const reordered = sorted.map((img, i) => ({
      ...img,
      order: i,
      ...newPrimaryId != null ? { isPrimary: img.id === newPrimaryId } : {}
    }));
    setImages(reordered);
    setDraggedIndex(null);
    setDragOverIndex(null);
    try {
      await api.patch(`/admin/uploads/order/${productId}`, {
        imageIds: reordered.map((img) => img.id)
      });
      if (newPrimaryId) {
        await api.patch(`/admin/uploads/primary/${newPrimaryId}`);
      }
    } catch {
      setImages(prevImagesRef.current);
      setError("Error al reordenar imagenes");
    }
  };
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...getRootProps(),
        className: `border-2 border-dashed px-6 py-8 text-center cursor-pointer transition mb-4 ${isDragActive ? "border-[#2B2521] bg-[#F2EBD8]" : "border-[#3C3A37]/20 hover:border-[#3C3A37]/40"}`,
        children: [
          /* @__PURE__ */ jsx("input", { ...getInputProps() }),
          optimizing ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/60", children: "Optimizando imagenes..." }) : uploading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/60", children: "Subiendo..." }) : isDragActive ? /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Soltar imagenes aqui" }) : /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/60", children: "Arrastra imagenes aqui o hace click para seleccionar" })
        ]
      }
    ),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mb-4", children: error }),
    images.length > 0 && /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 md:grid-cols-4 gap-3", children: [...images].sort((a, b) => a.order - b.order).map((img, index) => /* @__PURE__ */ jsxs(
      "div",
      {
        draggable: true,
        onDragStart: () => handleDragStart(index),
        onDragOver: (e) => handleDragOver(e, index),
        onDrop: () => handleDrop(index),
        onDragEnd: handleDragEnd,
        className: `relative group cursor-grab active:cursor-grabbing transition-all ${draggedIndex === index ? "opacity-40" : ""} ${dragOverIndex === index && draggedIndex !== index ? "ring-2 ring-[#2B2521] scale-[1.03]" : ""}`,
        children: [
          /* @__PURE__ */ jsx("span", { className: "absolute top-1 right-1 z-10 bg-[#2B2521]/80 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full", children: index + 1 }),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: img.cloudinaryUrl,
              alt: img.altText || "",
              className: `w-full aspect-square object-cover pointer-events-none ${img.isPrimary ? "ring-2 ring-green-600" : ""}`
            }
          ),
          img.isPrimary && /* @__PURE__ */ jsx("span", { className: "absolute top-1 left-1 bg-green-600 text-white text-[9px] px-1", children: "Principal" }),
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2", children: [
            !img.isPrimary && /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setPrimary(img.id),
                className: "text-white text-[10px] bg-green-700 px-2 py-1 hover:bg-green-800 cursor-pointer",
                children: "Principal"
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => deleteImage(img.cloudinaryPublicId),
                className: "text-white text-[10px] bg-red-700 px-2 py-1 hover:bg-red-800 cursor-pointer",
                children: "Eliminar"
              }
            )
          ] })
        ]
      },
      img.id
    )) })
  ] });
}

const productSchema = z.object({
  name: z.string().min(3, "Minimo 3 caracteres"),
  slug: z.string().min(3, "Minimo 3 caracteres"),
  description: z.string().optional(),
  price: z.number({ invalid_type_error: "Ingrese un precio" }).positive("Debe ser positivo"),
  categoryId: z.string().uuid("Seleccione una categoria"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"])
});
function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function ProductFormInner({ product, apiUrl }) {
  const isEdit = !!product;
  const [specs, setSpecs] = useState(
    product?.specifications ? Object.entries(product.specifications).map(([key, value]) => ({ key, value })) : []
  );
  const [saved, setSaved] = useState(false);
  const [savedProductId, setSavedProductId] = useState(product?.id || "");
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    }
  });
  const categories = categoriesData?.data || categoriesData || [];
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price ? Number(product.price) : void 0,
      categoryId: product?.categoryId || "",
      status: product?.status || "DRAFT"
    }
  });
  const mutation = useMutation({
    mutationFn: async (data) => {
      const payload = {
        ...data,
        specifications: specs.length > 0 ? Object.fromEntries(specs.filter((s) => s.key).map((s) => [s.key, s.value])) : void 0
      };
      if (isEdit) {
        return api.patch(`/admin/products/${product.id}`, payload);
      }
      return api.post("/admin/products", payload);
    },
    onSuccess: (res) => {
      const newProduct = res.data?.data || res.data;
      if (!isEdit && newProduct?.id) {
        setSavedProductId(newProduct.id);
        setSaved(true);
        window.location.href = `/admin/productos/${newProduct.id}/editar`;
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3e3);
      }
    }
  });
  const handleNameBlur = () => {
    const name = watch("name");
    const currentSlug = watch("slug");
    if (name && (!currentSlug || !isEdit && currentSlug === slugify(watch("name")))) {
      setValue("slug", slugify(name));
    }
  };
  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index, field, val) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-8", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl uppercase tracking-[-0.01em] font-bold", children: isEdit ? "Editar Producto" : "Nuevo Producto" }),
      /* @__PURE__ */ jsx("a", { href: "/admin/productos", className: "text-xs text-[#3C3A37]/60 hover:text-[#3C3A37]", children: "Volver a lista" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit((data) => mutation.mutate(data)), className: "space-y-6 max-w-2xl", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Nombre" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("name"),
            onBlur: handleNameBlur,
            className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60",
            placeholder: "Silla Nordica Minimalista"
          }
        ),
        errors.name && /* @__PURE__ */ jsx("span", { className: "text-red-600 text-xs mt-1 block", children: errors.name.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Slug (URL)" }),
        /* @__PURE__ */ jsx(
          "input",
          {
            ...register("slug"),
            className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60",
            placeholder: "silla-nordica-minimalista"
          }
        ),
        errors.slug && /* @__PURE__ */ jsx("span", { className: "text-red-600 text-xs mt-1 block", children: errors.slug.message })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Descripcion" }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            ...register("description"),
            rows: 4,
            className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 resize-y",
            placeholder: "Descripcion del producto..."
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Precio (ARS)" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              ...register("price", { valueAsNumber: true }),
              type: "number",
              step: "0.01",
              className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60",
              placeholder: "45000"
            }
          ),
          errors.price && /* @__PURE__ */ jsx("span", { className: "text-red-600 text-xs mt-1 block", children: errors.price.message })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Categoria" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              ...register("categoryId"),
              className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Seleccionar..." }),
                categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
              ]
            }
          ),
          errors.categoryId && /* @__PURE__ */ jsx("span", { className: "text-red-600 text-xs mt-1 block", children: errors.categoryId.message })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("label", { className: "block text-xs uppercase tracking-[-0.01em] mb-1 font-bold", children: "Estado" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            ...register("status"),
            className: "w-full border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60",
            children: [
              /* @__PURE__ */ jsx("option", { value: "DRAFT", children: "Borrador" }),
              /* @__PURE__ */ jsx("option", { value: "PUBLISHED", children: "Publicado" }),
              /* @__PURE__ */ jsx("option", { value: "ARCHIVED", children: "Archivado" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
          /* @__PURE__ */ jsx("label", { className: "text-xs uppercase tracking-[-0.01em] font-bold", children: "Especificaciones" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: addSpec,
              className: "text-xs px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 transition cursor-pointer",
              children: "+ Agregar"
            }
          )
        ] }),
        specs.map((spec, i) => /* @__PURE__ */ jsxs("div", { className: "flex gap-2 mb-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              value: spec.key,
              onChange: (e) => updateSpec(i, "key", e.target.value),
              placeholder: "Ej: Material",
              className: "flex-1 border border-[#3C3A37]/20 bg-white px-3 py-1.5 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              value: spec.value,
              onChange: (e) => updateSpec(i, "value", e.target.value),
              placeholder: "Ej: Madera de roble",
              className: "flex-1 border border-[#3C3A37]/20 bg-white px-3 py-1.5 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => removeSpec(i),
              className: "text-red-500 text-xs px-2 hover:bg-red-50 cursor-pointer",
              children: "x"
            }
          )
        ] }, i))
      ] }),
      isEdit && product && /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-sm uppercase tracking-[-0.01em] font-bold mb-4", children: "Imagenes" }),
        /* @__PURE__ */ jsx(ImageUploader, { productId: product.id, existingImages: product.images || [], apiUrl })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "submit",
            disabled: mutation.isPending,
            className: "bg-[#2B2521] text-[#F2EBD8] px-8 py-2.5 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition disabled:opacity-50 cursor-pointer",
            children: mutation.isPending ? "Guardando..." : isEdit ? "Actualizar" : "Crear Producto"
          }
        ),
        saved && /* @__PURE__ */ jsx("span", { className: "text-green-700 text-sm", children: "Guardado" }),
        mutation.isError && /* @__PURE__ */ jsx("span", { className: "text-red-600 text-sm", children: "Error al guardar" })
      ] })
    ] })
  ] });
}
function ProductForm({ product, apiUrl }) {
  return /* @__PURE__ */ jsx(QueryProvider, { children: /* @__PURE__ */ jsx(ProductFormInner, { product, apiUrl }) });
}

export { ProductForm as P };

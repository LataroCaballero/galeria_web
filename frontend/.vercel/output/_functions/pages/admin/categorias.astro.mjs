import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Bi6a7uwE.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Bokrgrpk.mjs';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Q as QueryProvider, a as api } from '../../chunks/api_9J35uP7a.mjs';
export { renderers } from '../../renderers.mjs';

function slugify(text) {
  return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
function CategoryManagerInner() {
  const queryClient = useQueryClient();
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [error, setError] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    }
  });
  const categories = data?.data || data || [];
  const createMutation = useMutation({
    mutationFn: (payload) => api.post("/admin/categories", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setNewName("");
      setNewDesc("");
      setError("");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Error al crear");
    }
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, ...payload }) => api.patch(`/admin/categories/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setEditingId(null);
      setError("");
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/categories/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      setError("");
    },
    onError: (err) => {
      setError(err.response?.data?.message || "Error al eliminar");
    }
  });
  const handleCreate = (e) => {
    e.preventDefault();
    if (!newName.trim()) return;
    createMutation.mutate({
      name: newName.trim(),
      slug: slugify(newName),
      description: newDesc || void 0
    });
  };
  const handleUpdate = (id) => {
    if (!editName.trim()) return;
    updateMutation.mutate({ id, name: editName.trim(), description: editDesc || void 0 });
  };
  const startEdit = (cat) => {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDesc(cat.description || "");
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("h1", { className: "text-2xl uppercase tracking-[-0.01em] font-bold mb-8", children: "Categorias" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleCreate, className: "flex flex-col md:flex-row gap-3 mb-8", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: newName,
          onChange: (e) => setNewName(e.target.value),
          placeholder: "Nombre de la categoria",
          className: "border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: newDesc,
          onChange: (e) => setNewDesc(e.target.value),
          placeholder: "Descripcion (opcional)",
          className: "border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: createMutation.isPending,
          className: "bg-[#2B2521] text-[#F2EBD8] px-6 py-2 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition disabled:opacity-50 cursor-pointer whitespace-nowrap",
          children: createMutation.isPending ? "..." : "Crear"
        }
      )
    ] }),
    error && /* @__PURE__ */ jsx("p", { className: "text-red-600 text-xs mb-4", children: error }),
    isLoading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/50", children: "Cargando..." }) : categories.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/50", children: "No hay categorias." }) : /* @__PURE__ */ jsx("div", { className: "bg-white border border-[#3C3A37]/10 divide-y divide-[#3C3A37]/10", children: categories.map((cat) => /* @__PURE__ */ jsx("div", { className: "p-3 flex items-center gap-4", children: editingId === cat.id ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          value: editName,
          onChange: (e) => setEditName(e.target.value),
          className: "border border-[#3C3A37]/20 bg-white px-2 py-1 text-sm font-serif flex-1"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          value: editDesc,
          onChange: (e) => setEditDesc(e.target.value),
          className: "border border-[#3C3A37]/20 bg-white px-2 py-1 text-sm font-serif flex-1",
          placeholder: "Descripcion"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleUpdate(cat.id),
          className: "text-[10px] uppercase px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 cursor-pointer",
          children: "Guardar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setEditingId(null),
          className: "text-[10px] uppercase px-2 py-1 text-[#3C3A37]/50 hover:text-[#3C3A37] cursor-pointer",
          children: "Cancelar"
        }
      )
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx("span", { className: "font-bold text-sm", children: cat.name }),
        cat.description && /* @__PURE__ */ jsx("span", { className: "text-xs text-[#3C3A37]/50 ml-2", children: cat.description })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#3C3A37]/50", children: [
        cat._count?.products || 0,
        " productos"
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => startEdit(cat),
          className: "text-[10px] uppercase px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 cursor-pointer",
          children: "Editar"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            if (confirm(`Eliminar "${cat.name}"?`)) deleteMutation.mutate(cat.id);
          },
          className: "text-[10px] uppercase px-2 py-1 text-red-600 hover:bg-red-50 cursor-pointer",
          children: "Eliminar"
        }
      )
    ] }) }, cat.id)) })
  ] });
}
function CategoryManager() {
  return /* @__PURE__ */ jsx(QueryProvider, { children: /* @__PURE__ */ jsx(CategoryManagerInner, {}) });
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Categorias" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CategoryManager", CategoryManager, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/components/admin/CategoryManager", "client:component-export": "default" })} ` })}`;
}, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/categorias/index.astro", void 0);

const $$file = "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/categorias/index.astro";
const $$url = "/admin/categorias";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

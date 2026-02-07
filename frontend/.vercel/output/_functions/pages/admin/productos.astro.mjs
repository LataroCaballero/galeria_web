import { c as createComponent, r as renderComponent, a as renderTemplate } from '../../chunks/astro/server_CRPzdeUu.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_AufrkSKa.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Q as QueryProvider, a as api } from '../../chunks/api_9J35uP7a.mjs';
export { renderers } from '../../renderers.mjs';

function ProductListInner() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await api.get("/categories");
      return res.data;
    }
  });
  const categories = categoriesData?.data || categoriesData || [];
  const { data, isLoading } = useQuery({
    queryKey: ["admin-products", page, search, statusFilter, categoryFilter],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.set("page", String(page));
      params.set("limit", "15");
      if (search) params.set("search", search);
      if (statusFilter) params.set("status", statusFilter);
      if (categoryFilter) params.set("categoryId", categoryFilter);
      const res = await api.get(`/admin/products?${params}`);
      return res.data;
    }
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/admin/products/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] })
  });
  const publishMutation = useMutation({
    mutationFn: (id) => api.post(`/admin/products/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-products"] })
  });
  const responseData = data;
  const products = responseData?.data?.data || responseData?.data || [];
  const meta = responseData?.data?.meta || responseData?.meta || { totalPages: 1 };
  const handleDelete = (id, name) => {
    if (confirm(`Eliminar "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-2xl uppercase tracking-[-0.01em] font-bold", children: "Productos" }),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/admin/productos/nuevo",
          className: "bg-[#2B2521] text-[#F2EBD8] px-6 py-2 text-sm uppercase tracking-[-0.01em] hover:opacity-90 transition text-center no-underline",
          children: "Nuevo Producto"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-3 mb-6", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "text",
          placeholder: "Buscar por nombre...",
          value: search,
          onChange: (e) => {
            setSearch(e.target.value);
            setPage(1);
          },
          className: "border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-[#3C3A37]/60 flex-1"
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: statusFilter,
          onChange: (e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          },
          className: "border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todos los estados" }),
            /* @__PURE__ */ jsx("option", { value: "DRAFT", children: "Borrador" }),
            /* @__PURE__ */ jsx("option", { value: "PUBLISHED", children: "Publicado" }),
            /* @__PURE__ */ jsx("option", { value: "ARCHIVED", children: "Archivado" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "select",
        {
          value: categoryFilter,
          onChange: (e) => {
            setCategoryFilter(e.target.value);
            setPage(1);
          },
          className: "border border-[#3C3A37]/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none",
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "Todas las categorias" }),
            categories.map((cat) => /* @__PURE__ */ jsx("option", { value: cat.id, children: cat.name }, cat.id))
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/50", children: "Cargando..." }) : products.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "text-center py-12 bg-white border border-[#3C3A37]/10", children: [
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#3C3A37]/50", children: "No se encontraron productos." }),
      /* @__PURE__ */ jsx("a", { href: "/admin/productos/nuevo", className: "text-sm mt-2 inline-block", children: "Crear el primero" })
    ] }) : /* @__PURE__ */ jsx("div", { className: "bg-white border border-[#3C3A37]/10 overflow-x-auto", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-[#2B2521] text-[#F2EBD8] uppercase tracking-[-0.01em] text-xs", children: [
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-left font-normal", children: "Imagen" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-left font-normal", children: "Nombre" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-left font-normal hidden md:table-cell", children: "Categoria" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-left font-normal", children: "Estado" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-left font-normal hidden md:table-cell", children: "Precio" }),
        /* @__PURE__ */ jsx("th", { className: "py-2 px-3 text-right font-normal", children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: products.map((product) => /* @__PURE__ */ jsxs("tr", { className: "border-b border-[#3C3A37]/10 hover:bg-[#F2EBD8]/50", children: [
        /* @__PURE__ */ jsx("td", { className: "py-2 px-3", children: product.images?.[0] ? /* @__PURE__ */ jsx("img", { src: product.images[0].cloudinaryUrl, alt: "", className: "w-10 h-10 object-cover" }) : /* @__PURE__ */ jsx("div", { className: "w-10 h-10 bg-[#3C3A37]/5" }) }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-3 font-bold", children: product.name }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-3 hidden md:table-cell text-[#3C3A37]/60", children: product.category?.name }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-3", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] uppercase px-2 py-0.5 ${product.status === "PUBLISHED" ? "bg-green-100 text-green-800" : product.status === "ARCHIVED" ? "bg-red-100 text-red-800" : "bg-[#3C3A37]/10 text-[#3C3A37]"}`, children: product.status === "PUBLISHED" ? "Publicado" : product.status === "DRAFT" ? "Borrador" : "Archivado" }) }),
        /* @__PURE__ */ jsxs("td", { className: "py-2 px-3 hidden md:table-cell", children: [
          "$",
          Number(product.price).toLocaleString("es-AR")
        ] }),
        /* @__PURE__ */ jsx("td", { className: "py-2 px-3 text-right", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2", children: [
          product.status === "DRAFT" && /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => publishMutation.mutate(product.id),
              className: "text-[10px] uppercase px-2 py-1 bg-green-100 text-green-800 hover:bg-green-200 transition cursor-pointer",
              children: "Publicar"
            }
          ),
          /* @__PURE__ */ jsx(
            "a",
            {
              href: `/admin/productos/${product.id}/editar`,
              className: "text-[10px] uppercase px-2 py-1 border border-[#3C3A37]/20 hover:bg-[#3C3A37]/5 transition no-underline text-[#3C3A37]",
              children: "Editar"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleDelete(product.id, product.name),
              className: "text-[10px] uppercase px-2 py-1 text-red-600 hover:bg-red-50 transition cursor-pointer",
              children: "Eliminar"
            }
          )
        ] }) })
      ] }, product.id)) })
    ] }) }),
    meta.totalPages > 1 && /* @__PURE__ */ jsxs("div", { className: "flex justify-center gap-2 mt-6", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setPage((p) => Math.max(1, p - 1)),
          disabled: page <= 1,
          className: "px-3 py-1 text-xs border border-[#3C3A37]/20 disabled:opacity-30 cursor-pointer",
          children: "Anterior"
        }
      ),
      /* @__PURE__ */ jsxs("span", { className: "px-3 py-1 text-xs", children: [
        page,
        " / ",
        meta.totalPages
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setPage((p) => Math.min(meta.totalPages, p + 1)),
          disabled: page >= meta.totalPages,
          className: "px-3 py-1 text-xs border border-[#3C3A37]/20 disabled:opacity-30 cursor-pointer",
          children: "Siguiente"
        }
      )
    ] })
  ] });
}
function ProductList() {
  return /* @__PURE__ */ jsx(QueryProvider, { children: /* @__PURE__ */ jsx(ProductListInner, {}) });
}

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductList", ProductList, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/components/admin/ProductList", "client:component-export": "default" })} ` })}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/admin/productos/index.astro", void 0);

const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/admin/productos/index.astro";
const $$url = "/admin/productos";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

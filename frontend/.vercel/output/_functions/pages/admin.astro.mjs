import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_Dz1MIulS.mjs';
import { $ as $$AdminLayout } from '../chunks/AdminLayout_RZG_zdt2.mjs';
import { g as getTokenFromCookies } from '../chunks/auth_Du1NjG1G.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const token = getTokenFromCookies(Astro2.request.headers.get("cookie"));
  const API = "http://localhost:3000";
  let stats = { totalProducts: 0, published: 0, drafts: 0, categories: 0 };
  let recentProducts = [];
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API}/admin/products?limit=5`, {
        headers: { Authorization: `Bearer ${token}` }
      }),
      fetch(`${API}/categories`)
    ]);
    if (productsRes.ok) {
      const productsData = await productsRes.json();
      const products = productsData.data?.data || productsData.data || [];
      const meta = productsData.data?.meta || productsData.meta || {};
      stats.totalProducts = meta.total || products.length;
      stats.published = products.filter((p) => p.status === "PUBLISHED").length;
      stats.drafts = products.filter((p) => p.status === "DRAFT").length;
      recentProducts = products.slice(0, 5);
    }
    if (categoriesRes.ok) {
      const categoriesData = await categoriesRes.json();
      const categories = categoriesData.data || categoriesData || [];
      stats.categories = Array.isArray(categories) ? categories.length : 0;
    }
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl uppercase tracking-tightish font-bold mb-8">Dashboard</h1>  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10"> <div class="bg-white p-4 border border-tinta/10"> <p class="text-xs uppercase tracking-tightish text-tinta/50 mb-1">Total Productos</p> <p class="text-2xl font-bold">${stats.totalProducts}</p> </div> <div class="bg-white p-4 border border-tinta/10"> <p class="text-xs uppercase tracking-tightish text-tinta/50 mb-1">Publicados</p> <p class="text-2xl font-bold text-green-700">${stats.published}</p> </div> <div class="bg-white p-4 border border-tinta/10"> <p class="text-xs uppercase tracking-tightish text-tinta/50 mb-1">Borradores</p> <p class="text-2xl font-bold text-amber-700">${stats.drafts}</p> </div> <div class="bg-white p-4 border border-tinta/10"> <p class="text-xs uppercase tracking-tightish text-tinta/50 mb-1">Categorias</p> <p class="text-2xl font-bold">${stats.categories}</p> </div> </div>  <div class="flex gap-4 mb-10"> <a href="/admin/productos/nuevo" class="bg-carbón text-crema px-6 py-2 text-sm uppercase tracking-tightish hover:opacity-90 transition">
Nuevo Producto
</a> <a href="/admin/productos" class="border border-tinta/20 px-6 py-2 text-sm uppercase tracking-tightish hover:bg-tinta/5 transition">
Ver Todos
</a> </div>  ${recentProducts.length > 0 && renderTemplate`<div> <h2 class="text-sm uppercase tracking-tightish font-bold mb-4">Productos Recientes</h2> <div class="bg-white border border-tinta/10 divide-y divide-tinta/10"> ${recentProducts.map((product) => renderTemplate`<a${addAttribute(`/admin/productos/${product.id}/editar`, "href")} class="flex items-center gap-4 p-3 hover:bg-crema/50 transition no-underline"> ${product.images?.[0] && renderTemplate`<img${addAttribute(product.images[0].cloudinaryUrl, "src")} alt="" class="w-10 h-10 object-cover">`} <div class="flex-1"> <p class="text-sm font-bold">${product.name}</p> <p class="text-xs text-tinta/50">${product.category?.name}</p> </div> <span${addAttribute(`text-[10px] uppercase px-2 py-0.5 ${product.status === "PUBLISHED" ? "bg-green-100 text-green-800" : product.status === "ARCHIVED" ? "bg-red-100 text-red-800" : "bg-tinta/10 text-tinta"}`, "class")}> ${product.status === "PUBLISHED" ? "Publicado" : product.status === "DRAFT" ? "Borrador" : "Archivado"} </span> </a>`)} </div> </div>`}` })}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/admin/index.astro", void 0);
const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createComponent, b as createAstro, m as maybeRenderHead, f as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_CRPzdeUu.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DjabzewM.mjs';
import { $ as $$Navbar } from '../chunks/Navbar_DX8MAGMh.mjs';
import 'clsx';
import { c as cloudinaryUrl } from '../chunks/cloudinary_CD5vEc9b.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$CatalogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CatalogCard;
  const { name, slug, imageUrl, imageAlt, category } = Astro2.props;
  const optimizedUrl = cloudinaryUrl(imageUrl, { width: 600 });
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/shop/${slug}`, "href")} class="group relative block aspect-[4/5] overflow-hidden bg-tinta/5"> <img${addAttribute(optimizedUrl, "src")}${addAttribute(imageAlt, "alt")} width="600" height="750" class="w-full h-full object-cover" loading="lazy"> <div class="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center"> <h3 class="font-serif text-sm md:text-base uppercase tracking-tightish text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-4"> ${name} </h3> </div> </a>`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/components/public/CatalogCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$CategoryFilter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CategoryFilter;
  const { categories, activeCategory } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="flex flex-wrap gap-4 mb-12 justify-center md:justify-start"> <a href="/shop"${addAttribute(`text-xs uppercase tracking-[0.12em] pb-1 transition-opacity no-underline
      ${!activeCategory ? "border-b border-tinta text-tinta" : "text-tinta/50 hover:text-tinta"}`, "class")}>
Todo
</a> ${categories.map((cat) => renderTemplate`<a${addAttribute(`/shop?categoria=${cat.slug}`, "href")}${addAttribute(`text-xs uppercase tracking-[0.12em] pb-1 transition-opacity no-underline
        ${activeCategory === cat.slug ? "border-b border-tinta text-tinta" : "text-tinta/50 hover:text-tinta"}`, "class")}> ${cat.name} </a>`)} </nav>`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/components/public/CategoryFilter.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const categorySlug = Astro2.url.searchParams.get("categoria") || void 0;
  const search = Astro2.url.searchParams.get("q") || void 0;
  const currentPage = Math.max(1, Number(Astro2.url.searchParams.get("page")) || 1);
  const ITEMS_PER_PAGE = 12;
  const API = "http://localhost:3000";
  let products = [];
  let categories = [];
  let totalPages = 1;
  Astro2.response.headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
  try {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (search) params.set("search", search);
    params.set("limit", String(ITEMS_PER_PAGE));
    params.set("page", String(currentPage));
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API}/products?${params}`),
      fetch(`${API}/categories`)
    ]);
    if (productsRes.ok) {
      const data = await productsRes.json();
      products = data.data?.data || data.data || [];
      totalPages = data.data?.meta?.totalPages || data.meta?.totalPages || 1;
    }
    if (categoriesRes.ok) {
      const data = await categoriesRes.json();
      categories = data.data || data || [];
    }
  } catch (e) {
  }
  function buildPageUrl(page) {
    const url = new URL(Astro2.url);
    if (page <= 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", String(page));
    }
    return url.pathname + url.search;
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Shop · GALERÍA", "description": "Catalogo de mobiliario, decoracion y arte - Galeria Estudio" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-28 pb-24 px-6 md:px-20 bg-[#F5F1E4] min-h-screen"> <!-- Filters --> <div class="max-w-7xl mx-auto"> ${renderComponent($$result2, "CategoryFilter", $$CategoryFilter, { "categories": categories, "activeCategory": categorySlug })} </div> <!-- Product Grid --> <div class="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-1"> ${products.map((product) => {
    const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
    return renderTemplate`${renderComponent($$result2, "CatalogCard", $$CatalogCard, { "name": product.name, "slug": product.slug, "imageUrl": primaryImage?.cloudinaryUrl || "/images/shop.jpg", "imageAlt": primaryImage?.altText || product.name, "category": product.category?.name })}`;
  })} </div> <!-- Empty state --> ${products.length === 0 && renderTemplate`<div class="text-center py-20 max-w-7xl mx-auto"> <p class="font-serif text-tinta/60">No se encontraron productos.</p> </div>`} <!-- Pagination --> ${totalPages > 1 && renderTemplate`<nav class="max-w-7xl mx-auto flex justify-center items-center gap-6 mt-16"> ${currentPage > 1 ? renderTemplate`<a${addAttribute(buildPageUrl(currentPage - 1), "href")} class="font-serif text-sm uppercase tracking-tightish text-tinta hover:opacity-70 transition no-underline">
&larr; Anterior
</a>` : renderTemplate`<span class="font-serif text-sm uppercase tracking-tightish text-tinta/30">
&larr; Anterior
</span>`} <span class="font-serif text-sm text-tinta/60"> ${currentPage} / ${totalPages} </span> ${currentPage < totalPages ? renderTemplate`<a${addAttribute(buildPageUrl(currentPage + 1), "href")} class="font-serif text-sm uppercase tracking-tightish text-tinta hover:opacity-70 transition no-underline">
Siguiente &rarr;
</a>` : renderTemplate`<span class="font-serif text-sm uppercase tracking-tightish text-tinta/30">
Siguiente &rarr;
</span>`} </nav>`} </main> ` })}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/shop/index.astro", void 0);
const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/shop/index.astro";
const $$url = "/shop";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

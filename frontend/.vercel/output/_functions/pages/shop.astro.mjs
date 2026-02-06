import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent } from '../chunks/astro/server_Dz1MIulS.mjs';
import { $ as $$BaseLayout } from '../chunks/BaseLayout_DWq2fQDr.mjs';
import { $ as $$Navbar } from '../chunks/Navbar_6f9cWjxq.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Astro$2 = createAstro();
const $$CatalogCard = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CatalogCard;
  const { name, slug, imageUrl, imageAlt, category } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/shop/${slug}`, "href")} class="group block no-underline"> <figure class="space-y-3"> <div class="aspect-[4/5] overflow-hidden bg-tinta/5"> <img${addAttribute(imageUrl, "src")}${addAttribute(imageAlt, "alt")} class="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-90" loading="lazy"> </div> <figcaption class="space-y-1"> <h3 class="font-serif text-sm uppercase tracking-tightish text-tinta"> ${name} </h3> ${category && renderTemplate`<p class="text-[11px] uppercase tracking-wide text-tinta/50"> ${category} </p>`} </figcaption> </figure> </a>`;
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
  const API = "http://localhost:3000";
  let products = [];
  let categories = [];
  try {
    const params = new URLSearchParams();
    if (categorySlug) params.set("category", categorySlug);
    if (search) params.set("search", search);
    params.set("limit", "50");
    const [productsRes, categoriesRes] = await Promise.all([
      fetch(`${API}/products?${params}`),
      fetch(`${API}/categories`)
    ]);
    if (productsRes.ok) {
      const data = await productsRes.json();
      products = data.data?.data || data.data || [];
    }
    if (categoriesRes.ok) {
      const data = await categoriesRes.json();
      categories = data.data || data || [];
    }
  } catch (e) {
  }
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Shop · GALERÍA", "description": "Catalogo de mobiliario, decoracion y arte - Galeria Estudio" }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-28 pb-24 px-6 md:px-20 bg-[#F5F1E4] min-h-screen"> <!-- Page heading --> <div class="max-w-7xl mx-auto mb-12"> <h1 class="font-serif text-lg md:text-2xl font-bold uppercase tracking-tightish">
SHOP
</h1> </div> <!-- Filters --> <div class="max-w-7xl mx-auto"> ${renderComponent($$result2, "CategoryFilter", $$CategoryFilter, { "categories": categories, "activeCategory": categorySlug })} </div> <!-- Product Grid --> <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"> ${products.map((product) => {
    const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
    return renderTemplate`${renderComponent($$result2, "CatalogCard", $$CatalogCard, { "name": product.name, "slug": product.slug, "imageUrl": primaryImage?.cloudinaryUrl || "/images/shop.jpg", "imageAlt": primaryImage?.altText || product.name, "category": product.category?.name })}`;
  })} </div> <!-- Empty state --> ${products.length === 0 && renderTemplate`<div class="text-center py-20 max-w-7xl mx-auto"> <p class="font-serif text-tinta/60">No se encontraron productos.</p> </div>`} </main> ` })}`;
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

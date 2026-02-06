import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, q as Fragment, u as unescapeHTML, m as maybeRenderHead, h as addAttribute } from '../../chunks/astro/server_Dz1MIulS.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DWq2fQDr.mjs';
import { $ as $$Navbar } from '../../chunks/Navbar_6f9cWjxq.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const API = "http://localhost:3000";
  let product = null;
  try {
    const res = await fetch(`${API}/products/${slug}`);
    if (res.ok) {
      const data = await res.json();
      product = data.data || data;
    }
  } catch (e) {
  }
  if (!product) {
    return Astro2.redirect("/shop");
  }
  const primaryImage = product.images?.find((i) => i.isPrimary) || product.images?.[0];
  const otherImages = product.images?.filter((i) => i.id !== primaryImage?.id) || [];
  const seoTitle = `${product.name} · GALERÍA`;
  const seoDescription = product.description || `Descubri ${product.name} en Galeria Estudio`;
  const seoImage = primaryImage?.cloudinaryUrl || "/images/hero.jpg";
  const schemaOrg = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: primaryImage?.cloudinaryUrl,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "ARS",
      availability: "https://schema.org/InStock"
    }
  });
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seoTitle, "description": seoDescription, "image": seoImage }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-28 pb-24 bg-[#F5F1E4] min-h-screen"> <!-- Breadcrumb --> <nav class="max-w-7xl mx-auto px-6 md:px-20 mb-8"> <ol class="flex gap-2 text-xs uppercase tracking-[0.12em] text-tinta/50"> <li><a href="/shop" class="hover:text-tinta no-underline">Shop</a></li> <li>/</li> ${product.category && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <li> <a${addAttribute(`/shop?categoria=${product.category.slug}`, "href")} class="hover:text-tinta no-underline"> ${product.category.name} </a> </li> <li>/</li> ` })}`} <li class="text-tinta">${product.name}</li> </ol> </nav> <!-- Product Layout: 2 columns --> <div class="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-12"> <!-- Image Gallery --> <div class="space-y-4"> ${primaryImage && renderTemplate`<div class="aspect-[4/5] overflow-hidden"> <img${addAttribute(primaryImage.cloudinaryUrl, "src")}${addAttribute(primaryImage.altText || product.name, "alt")} class="w-full h-full object-cover"> </div>`} ${otherImages.map((img) => renderTemplate`<div class="aspect-[4/5] overflow-hidden"> <img${addAttribute(img.cloudinaryUrl, "src")}${addAttribute(img.altText || product.name, "alt")} class="w-full h-full object-cover" loading="lazy"> </div>`)} </div> <!-- Product Info (sticky on desktop) --> <div class="md:sticky md:top-28 md:self-start space-y-8"> <div> <h1 class="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tightish mb-3"> ${product.name} </h1> <p class="font-serif text-lg text-tinta/80">
$${Number(product.price).toLocaleString("es-AR")} </p> </div> ${product.description && renderTemplate`<div class="font-serif text-sm leading-relaxed text-black/80 space-y-4"> <p>${product.description}</p> </div>`} ${product.specifications && Object.keys(product.specifications).length > 0 && renderTemplate`<div> <h3 class="text-xs uppercase tracking-[0.12em] font-bold mb-4">Especificaciones</h3> <dl class="space-y-2 text-sm"> ${Object.entries(product.specifications).map(([key, value]) => renderTemplate`<div class="flex justify-between border-b border-tinta/10 pb-2"> <dt class="text-tinta/60 uppercase text-xs tracking-wide">${key}</dt> <dd class="font-serif">${value}</dd> </div>`)} </dl> </div>`} <a href="/contacto" class="inline-block bg-carbón text-crema px-8 py-3 text-sm uppercase tracking-tightish hover:opacity-90 transition no-underline">
Consultar
</a> </div> </div> </main> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "</script> "])), unescapeHTML(schemaOrg)) })}` })}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/shop/[slug].astro", void 0);
const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/pages/shop/[slug].astro";
const $$url = "/shop/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

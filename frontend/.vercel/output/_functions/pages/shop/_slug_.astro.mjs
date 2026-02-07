import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, F as Fragment, u as unescapeHTML, m as maybeRenderHead, f as addAttribute } from '../../chunks/astro/server_CRPzdeUu.mjs';
import { $ as $$BaseLayout } from '../../chunks/BaseLayout_DjabzewM.mjs';
import { $ as $$Navbar } from '../../chunks/Navbar_DX8MAGMh.mjs';
import { c as cloudinaryUrl } from '../../chunks/cloudinary_CD5vEc9b.mjs';
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
  const seoImage = primaryImage?.cloudinaryUrl || "/images/og-hero.jpg";
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
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": seoTitle, "description": seoDescription, "image": seoImage }, { "default": async ($$result2) => renderTemplate`  ${renderComponent($$result2, "Navbar", $$Navbar, {})} ${maybeRenderHead()}<main class="pt-28 pb-24 bg-[#F5F1E4] min-h-screen"> <!-- Breadcrumb --> <nav class="max-w-5xl mx-auto px-6 md:px-20 mb-12"> <ol class="flex justify-center gap-2 text-xs uppercase tracking-[0.12em] text-tinta/50"> <li><a href="/shop" class="hover:text-tinta no-underline">Shop</a></li> <li>/</li> ${product.category && renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <li> <a${addAttribute(`/shop?categoria=${product.category.slug}`, "href")} class="hover:text-tinta no-underline"> ${product.category.name} </a> </li> <li>/</li> ` })}`} <li class="text-tinta">${product.name}</li> </ol> </nav> <!-- Product Info (centered) --> <div class="max-w-2xl mx-auto px-6 text-center space-y-6 mb-16"> <h1 class="font-serif text-2xl md:text-3xl font-bold uppercase tracking-tightish"> ${product.name} </h1> ${product.description && renderTemplate`<p class="font-serif text-sm leading-relaxed text-tinta/80"> ${product.description} </p>`} ${product.specifications && Object.keys(product.specifications).length > 0 && renderTemplate`<dl class="inline-flex flex-col gap-1 text-sm text-tinta/70"> ${Object.entries(product.specifications).map(([key, value]) => renderTemplate`<div> <dt class="inline uppercase text-xs tracking-wide">${key}:</dt> <dd class="inline font-serif ml-1">${value}</dd> </div>`)} </dl>`} <p class="font-serif text-lg text-tinta">
$${Number(product.price).toLocaleString("es-AR")} </p> </div> <!-- Image Gallery (2 columns) --> <div class="max-w-5xl mx-auto px-6 md:px-20 grid grid-cols-1 sm:grid-cols-2 gap-1 mb-16"> ${primaryImage && renderTemplate`<div class="aspect-[4/5] overflow-hidden"> <img${addAttribute(cloudinaryUrl(primaryImage.cloudinaryUrl, { width: 800 }), "src")}${addAttribute(primaryImage.altText || product.name, "alt")} width="800" height="1000" class="w-full h-full object-cover"> </div>`} ${otherImages.map((img) => renderTemplate`<div class="aspect-[4/5] overflow-hidden"> <img${addAttribute(cloudinaryUrl(img.cloudinaryUrl, { width: 800 }), "src")}${addAttribute(img.altText || product.name, "alt")} width="800" height="1000" class="w-full h-full object-cover" loading="lazy"> </div>`)} </div> <!-- CTA --> <div class="text-center"> <a href="/contacto" class="inline-block bg-carbón text-crema px-10 py-3 text-sm uppercase tracking-tightish hover:opacity-90 transition no-underline">
Consultar
</a> </div> </main> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <script type="application/ld+json">', "</script> "])), unescapeHTML(schemaOrg)) })}` })}`;
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

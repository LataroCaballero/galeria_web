import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate } from '../../../../chunks/astro/server_Bi6a7uwE.mjs';
import { $ as $$AdminLayout } from '../../../../chunks/AdminLayout_D0H1qbr8.mjs';
import { P as ProductForm } from '../../../../chunks/ProductForm_DunD83s_.mjs';
import { g as getTokenFromCookies } from '../../../../chunks/auth_Du1NjG1G.mjs';
export { renderers } from '../../../../renderers.mjs';

const $$Astro = createAstro();
const prerender = false;
const $$Editar = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Editar;
  const { id } = Astro2.params;
  const token = getTokenFromCookies(Astro2.request.headers.get("cookie"));
  const API = "http://localhost:3000";
  let product = null;
  try {
    const res = await fetch(`${API}/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      product = data.data || data;
    }
  } catch (e) {
  }
  if (!product) {
    return Astro2.redirect("/admin/productos");
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Editar: ${product.name}` }, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductForm", ProductForm, { "client:load": true, "product": product, "apiUrl": API, "client:component-hydration": "load", "client:component-path": "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/components/admin/ProductForm", "client:component-export": "default" })} ` })}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/[id]/editar.astro", void 0);
const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/[id]/editar.astro";
const $$url = "/admin/productos/[id]/editar";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Editar,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { e as createComponent, k as renderComponent, r as renderTemplate } from '../../../chunks/astro/server_Bi6a7uwE.mjs';
import { $ as $$AdminLayout } from '../../../chunks/AdminLayout_Bokrgrpk.mjs';
import { P as ProductForm } from '../../../chunks/ProductForm_DunD83s_.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const $$Nuevo = createComponent(($$result, $$props, $$slots) => {
  const apiUrl = "http://localhost:3000";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Nuevo Producto" }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "ProductForm", ProductForm, { "client:load": true, "apiUrl": apiUrl, "client:component-hydration": "load", "client:component-path": "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/components/admin/ProductForm", "client:component-export": "default" })} ` })}`;
}, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/productos/nuevo.astro", void 0);
const $$file = "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/productos/nuevo.astro";
const $$url = "/admin/productos/nuevo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Nuevo,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

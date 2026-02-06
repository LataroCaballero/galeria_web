import { e as createComponent, k as renderComponent, o as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bi6a7uwE.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_Bokrgrpk.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="product-list"></div> ` })} ${renderScript($$result, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/productos/index.astro", void 0);

const $$file = "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/productos/index.astro";
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

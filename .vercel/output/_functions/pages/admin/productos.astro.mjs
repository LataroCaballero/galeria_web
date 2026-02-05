import { e as createComponent, k as renderComponent, o as renderScript, r as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_Bi6a7uwE.mjs';
import { $ as $$AdminLayout } from '../../chunks/AdminLayout_D0H1qbr8.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Productos" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="product-list"></div> ` })} ${renderScript($$result, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/index.astro", void 0);

const $$file = "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/index.astro";
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

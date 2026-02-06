import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_6-RIbwcO.mjs';
import { manifest } from './manifest_UPwoTbQv.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin/categorias.astro.mjs');
const _page2 = () => import('./pages/admin/login.astro.mjs');
const _page3 = () => import('./pages/admin/productos/nuevo.astro.mjs');
const _page4 = () => import('./pages/admin/productos/_id_/editar.astro.mjs');
const _page5 = () => import('./pages/admin/productos.astro.mjs');
const _page6 = () => import('./pages/admin.astro.mjs');
const _page7 = () => import('./pages/contacto.astro.mjs');
const _page8 = () => import('./pages/estudio.astro.mjs');
const _page9 = () => import('./pages/muestras.astro.mjs');
const _page10 = () => import('./pages/proyectos.astro.mjs');
const _page11 = () => import('./pages/shop/_slug_.astro.mjs');
const _page12 = () => import('./pages/shop.astro.mjs');
const _page13 = () => import('./pages/styling.astro.mjs');
const _page14 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin/categorias/index.astro", _page1],
    ["src/pages/admin/login.astro", _page2],
    ["src/pages/admin/productos/nuevo.astro", _page3],
    ["src/pages/admin/productos/[id]/editar.astro", _page4],
    ["src/pages/admin/productos/index.astro", _page5],
    ["src/pages/admin/index.astro", _page6],
    ["src/pages/contacto.astro", _page7],
    ["src/pages/estudio.astro", _page8],
    ["src/pages/muestras.astro", _page9],
    ["src/pages/proyectos.astro", _page10],
    ["src/pages/shop/[slug].astro", _page11],
    ["src/pages/shop/index.astro", _page12],
    ["src/pages/styling.astro", _page13],
    ["src/pages/index.astro", _page14]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "7009667a-1376-48a5-8301-ae194d94c029",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };

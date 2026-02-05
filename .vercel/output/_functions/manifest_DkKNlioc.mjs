import { v as decodeKey } from './chunks/astro/server_Bi6a7uwE.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CG75spF5.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/","cacheDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/node_modules/.astro/","outDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/dist/","srcDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/","publicDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/public/","buildClientDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/dist/client/","buildServerDir":"file:///Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"contacto/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contacto","isIndex":false,"type":"page","pattern":"^\\/contacto\\/?$","segments":[[{"content":"contacto","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/contacto.astro","pathname":"/contacto","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"estudio/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/estudio","isIndex":false,"type":"page","pattern":"^\\/estudio\\/?$","segments":[[{"content":"estudio","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/estudio.astro","pathname":"/estudio","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"muestras/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/muestras","isIndex":false,"type":"page","pattern":"^\\/muestras\\/?$","segments":[[{"content":"muestras","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/muestras.astro","pathname":"/muestras","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"proyectos/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/proyectos","isIndex":false,"type":"page","pattern":"^\\/proyectos\\/?$","segments":[[{"content":"proyectos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/proyectos.astro","pathname":"/proyectos","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"styling/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/styling","isIndex":false,"type":"page","pattern":"^\\/styling\\/?$","segments":[[{"content":"styling","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/styling.astro","pathname":"/styling","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin/categorias","isIndex":true,"type":"page","pattern":"^\\/admin\\/categorias\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"categorias","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/categorias/index.astro","pathname":"/admin/categorias","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin/login","isIndex":false,"type":"page","pattern":"^\\/admin\\/login\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/login.astro","pathname":"/admin/login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin/productos/nuevo","isIndex":false,"type":"page","pattern":"^\\/admin\\/productos\\/nuevo\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"productos","dynamic":false,"spread":false}],[{"content":"nuevo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/productos/nuevo.astro","pathname":"/admin/productos/nuevo","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin/productos/[id]/editar","isIndex":false,"type":"page","pattern":"^\\/admin\\/productos\\/([^/]+?)\\/editar\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"productos","dynamic":false,"spread":false}],[{"content":"id","dynamic":true,"spread":false}],[{"content":"editar","dynamic":false,"spread":false}]],"params":["id"],"component":"src/pages/admin/productos/[id]/editar.astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin/productos","isIndex":true,"type":"page","pattern":"^\\/admin\\/productos\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}],[{"content":"productos","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/productos/index.astro","pathname":"/admin/productos","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/admin","isIndex":true,"type":"page","pattern":"^\\/admin\\/?$","segments":[[{"content":"admin","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/admin/index.astro","pathname":"/admin","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/shop/[slug]","isIndex":false,"type":"page","pattern":"^\\/shop\\/([^/]+?)\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/shop/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/index.BRncgNrp.css"}],"routeData":{"route":"/shop","isIndex":true,"type":"page","pattern":"^\\/shop\\/?$","segments":[[{"content":"shop","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/shop/index.astro","pathname":"/shop","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/login.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/categorias/index.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/index.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/[id]/editar.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/index.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/nuevo.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/contacto.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/estudio.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/muestras.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/proyectos.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/shop/[slug].astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/shop/index.astro",{"propagation":"none","containsHead":true}],["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/styling.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000virtual:astro:actions/noop-entrypoint":"noop-entrypoint.mjs","\u0000@astro-page:src/pages/admin/categorias/index@_@astro":"pages/admin/categorias.astro.mjs","\u0000@astro-page:src/pages/admin/login@_@astro":"pages/admin/login.astro.mjs","\u0000@astro-page:src/pages/admin/productos/nuevo@_@astro":"pages/admin/productos/nuevo.astro.mjs","\u0000@astro-page:src/pages/admin/productos/[id]/editar@_@astro":"pages/admin/productos/_id_/editar.astro.mjs","\u0000@astro-page:src/pages/admin/productos/index@_@astro":"pages/admin/productos.astro.mjs","\u0000@astro-page:src/pages/admin/index@_@astro":"pages/admin.astro.mjs","\u0000@astro-page:src/pages/contacto@_@astro":"pages/contacto.astro.mjs","\u0000@astro-page:src/pages/estudio@_@astro":"pages/estudio.astro.mjs","\u0000@astro-page:src/pages/muestras@_@astro":"pages/muestras.astro.mjs","\u0000@astro-page:src/pages/proyectos@_@astro":"pages/proyectos.astro.mjs","\u0000@astro-page:src/pages/shop/[slug]@_@astro":"pages/shop/_slug_.astro.mjs","\u0000@astro-page:src/pages/shop/index@_@astro":"pages/shop.astro.mjs","\u0000@astro-page:src/pages/styling@_@astro":"pages/styling.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_DkKNlioc.mjs","/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BaZBDRCm.mjs","/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/components/admin/CategoryManager":"_astro/CategoryManager.DGPRaiRF.js","/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/components/admin/ProductForm":"_astro/ProductForm.o983t3Jc.js","@astrojs/react/client.js":"_astro/client.H-e-8mqe.js","/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/pages/admin/productos/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BuBZW-EZ.js","/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts":"_astro/AdminLayout.astro_astro_type_script_index_0_lang.CDytkIpw.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts","document.getElementById(\"logoutBtn\")?.addEventListener(\"click\",()=>{document.cookie=\"auth_token=; Max-Age=0; path=/\",window.location.href=\"/admin/login\"});document.getElementById(\"logoutBtnMobile\")?.addEventListener(\"click\",()=>{document.cookie=\"auth_token=; Max-Age=0; path=/\",window.location.href=\"/admin/login\"});"]],"assets":["/_astro/index.BRncgNrp.css","/favicon.svg","/images.md","/_astro/CategoryManager.DGPRaiRF.js","/_astro/ProductForm.o983t3Jc.js","/_astro/api.By0AvBr2.js","/_astro/client.CX6jqniO.js","/_astro/client.H-e-8mqe.js","/_astro/index.7in8nkh5.js","/_astro/index.astro_astro_type_script_index_0_lang.BuBZW-EZ.js","/fonts/Perpetua-Regular.ttf","/images/estudio-01.jpg","/images/hero.jpg","/images/logo-w.png","/images/logo.png","/images/poster.webp","/images/proyecto-01.jpg","/images/proyecto-02.jpg","/images/shop-01.jpg","/images/shop-02.jpg","/images/shop-03.jpg","/images/shop-04.jpg","/images/shop.jpg","/images/styling-01.jpg","/images/styling-02.jpg","/images/styling-03.jpg","/videos/video_desktop.webm","/videos/video_mobile.webm","/contacto/index.html","/estudio/index.html","/muestras/index.html","/proyectos/index.html","/styling/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"allowedDomains":[],"serverIslandNameMap":[],"key":"ys4NtlM8vugyBBE2QcnFzVHGDzW8tKNU67Z3n34JDVM="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };

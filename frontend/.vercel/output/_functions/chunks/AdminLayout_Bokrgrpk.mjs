import { e as createComponent, f as createAstro, n as renderHead, p as renderSlot, o as renderScript, h as addAttribute, r as renderTemplate } from './astro/server_Bi6a7uwE.mjs';
import 'clsx';
/* empty css                         */
import { g as getTokenFromCookies, v as validateToken } from './auth_Du1NjG1G.mjs';

const $$Astro = createAstro();
const $$AdminLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AdminLayout;
  const token = getTokenFromCookies(Astro2.request.headers.get("cookie"));
  if (!token) {
    return Astro2.redirect("/admin/login");
  }
  const user = await validateToken(token);
  if (!user) {
    return Astro2.redirect("/admin/login");
  }
  const { title = "Admin" } = Astro2.props;
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { href: "/admin", label: "Dashboard", icon: "\u25FB" },
    { href: "/admin/productos", label: "Productos", icon: "\u25FB" },
    { href: "/admin/categorias", label: "Categorias", icon: "\u25FB" }
  ];
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Admin Panel</title><meta name="robots" content="noindex, nofollow">${renderHead()}</head> <body class="bg-[#F5F1E4] text-tinta font-serif min-h-screen"> <div class="flex min-h-screen"> <!-- Sidebar --> <aside class="w-56 bg-carbón text-crema p-6 space-y-8 hidden md:flex md:flex-col shrink-0"> <a href="/admin" class="text-sm uppercase tracking-tightish font-bold block">
Galeria Admin
</a> <nav class="space-y-3 text-sm flex-1"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`block py-1 hover:opacity-70 transition ${currentPath === item.href ? "opacity-100 font-bold" : "opacity-70"}`, "class")}> ${item.label} </a>`)} </nav> <div class="space-y-3 text-sm border-t border-crema/20 pt-4"> <a href="/" target="_blank" class="block hover:opacity-70 opacity-70">Ver Sitio</a> <button id="logoutBtn" class="block hover:opacity-70 opacity-70 text-left cursor-pointer">
Cerrar Sesion
</button> </div> </aside> <!-- Mobile header --> <div class="md:hidden fixed top-0 left-0 right-0 z-50 bg-carbón text-crema px-4 py-3 flex items-center justify-between"> <a href="/admin" class="text-sm uppercase tracking-tightish font-bold">Admin</a> <div class="flex gap-4 text-xs"> <a href="/admin/productos" class="hover:opacity-70">Productos</a> <a href="/admin/categorias" class="hover:opacity-70">Categorias</a> <button id="logoutBtnMobile" class="hover:opacity-70 cursor-pointer">Salir</button> </div> </div> <!-- Main content --> <main class="flex-1 p-6 md:p-8 overflow-y-auto mt-12 md:mt-0"> ${renderSlot($$result, $$slots["default"])} </main> </div> ${renderScript($$result, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body> </html>`;
}, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/layouts/AdminLayout.astro", void 0);

export { $$AdminLayout as $ };

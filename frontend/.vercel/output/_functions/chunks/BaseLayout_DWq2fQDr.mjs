import { e as createComponent, f as createAstro, h as addAttribute, o as renderSlot, n as renderHead, r as renderTemplate } from './astro/server_Dz1MIulS.mjs';
import 'clsx';
/* empty css                         */

const $$Astro = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const {
    title = "Galer\xEDa Estudio",
    description = "Arquitectura & Interiorismo - Galer\xEDa Estudio",
    image = "/images/hero.jpg",
    darkMode = false,
    showNavbar = true
  } = Astro2.props;
  return renderTemplate`<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title} - Galería Estudio</title><meta name="description"${addAttribute(description, "content")}><!-- Open Graph --><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta property="og:image"${addAttribute(image, "content")}><meta property="og:type" content="website"><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><!-- Fuentes principales --><link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;700&family=Inter:wght@400;700&display=swap" rel="stylesheet">${renderSlot($$result, $$slots["head"])}${renderHead()}</head> <body${addAttribute(`${darkMode ? "bg-dark text-cream" : "bg-[#F5F1E4] text-dark"} font-sans`, "class")}> <main class=""> ${renderSlot($$result, $$slots["default"])} </main> </body></html>`;
}, "/Users/laucaballero/Desktop/Lautaro/AndesCode/galeria_web/frontend/src/layouts/BaseLayout.astro", void 0);

export { $$BaseLayout as $ };

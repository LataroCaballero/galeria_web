import { e as createComponent, f as createAstro, r as renderTemplate, l as defineScriptVars, n as renderHead } from '../../chunks/astro/server_Bi6a7uwE.mjs';
import 'clsx';
/* empty css                                    */
import { g as getTokenFromCookies, v as validateToken } from '../../chunks/auth_Du1NjG1G.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$Login = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Login;
  const token = getTokenFromCookies(Astro2.request.headers.get("cookie"));
  if (token) {
    const user = await validateToken(token);
    if (user) {
      return Astro2.redirect("/admin");
    }
  }
  return renderTemplate(_a || (_a = __template(['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - Admin Panel</title><meta name="robots" content="noindex, nofollow">', '</head> <body class="bg-[#F5F1E4] text-tinta font-serif min-h-screen flex items-center justify-center"> <div class="w-full max-w-sm px-8"> <div class="text-center mb-10"> <h1 class="text-2xl uppercase tracking-tightish font-bold">Admin</h1> <p class="text-sm text-tinta/60 mt-2">Galeria Estudio</p> </div> <form id="loginForm" class="space-y-5"> <div> <label class="block text-xs uppercase tracking-tightish mb-1 font-bold" for="email">\nEmail\n</label> <input type="email" id="email" name="email" required class="w-full border border-tinta/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-tinta/60" placeholder="admin@galeriaestudio.com.ar"> </div> <div> <label class="block text-xs uppercase tracking-tightish mb-1 font-bold" for="password">\nPassword\n</label> <input type="password" id="password" name="password" required minlength="6" class="w-full border border-tinta/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-tinta/60"> </div> <div id="errorMsg" class="text-red-600 text-xs hidden"></div> <button type="submit" class="w-full bg-carbón text-crema px-6 py-2.5 text-sm uppercase tracking-tightish hover:opacity-90 transition cursor-pointer">\nIngresar\n</button> </form> <div class="text-center mt-8"> <a href="/" class="text-xs text-tinta/50 hover:text-tinta transition">Volver al sitio</a> </div> </div> <script>(function(){', "\n    document.getElementById('loginForm').addEventListener('submit', async (e) => {\n      e.preventDefault();\n      const errorMsg = document.getElementById('errorMsg');\n      errorMsg.classList.add('hidden');\n\n      const email = document.getElementById('email').value;\n      const password = document.getElementById('password').value;\n\n      try {\n        const res = await fetch(`${apiUrl}/auth/login`, {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({ email, password }),\n        });\n\n        if (!res.ok) {\n          const err = await res.json();\n          throw new Error(err.message || 'Credenciales invalidas');\n        }\n\n        const data = await res.json();\n        const token = data.data?.accessToken || data.accessToken;\n\n        // Set cookie (7 days)\n        document.cookie = `auth_token=${token}; path=/; max-age=604800; SameSite=Lax`;\n\n        window.location.href = '/admin';\n      } catch (err) {\n        errorMsg.textContent = err.message;\n        errorMsg.classList.remove('hidden');\n      }\n    });\n  })();</script> </body> </html>"], ['<html lang="es"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Login - Admin Panel</title><meta name="robots" content="noindex, nofollow">', '</head> <body class="bg-[#F5F1E4] text-tinta font-serif min-h-screen flex items-center justify-center"> <div class="w-full max-w-sm px-8"> <div class="text-center mb-10"> <h1 class="text-2xl uppercase tracking-tightish font-bold">Admin</h1> <p class="text-sm text-tinta/60 mt-2">Galeria Estudio</p> </div> <form id="loginForm" class="space-y-5"> <div> <label class="block text-xs uppercase tracking-tightish mb-1 font-bold" for="email">\nEmail\n</label> <input type="email" id="email" name="email" required class="w-full border border-tinta/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-tinta/60" placeholder="admin@galeriaestudio.com.ar"> </div> <div> <label class="block text-xs uppercase tracking-tightish mb-1 font-bold" for="password">\nPassword\n</label> <input type="password" id="password" name="password" required minlength="6" class="w-full border border-tinta/20 bg-white px-3 py-2 text-sm font-serif focus:outline-none focus:border-tinta/60"> </div> <div id="errorMsg" class="text-red-600 text-xs hidden"></div> <button type="submit" class="w-full bg-carbón text-crema px-6 py-2.5 text-sm uppercase tracking-tightish hover:opacity-90 transition cursor-pointer">\nIngresar\n</button> </form> <div class="text-center mt-8"> <a href="/" class="text-xs text-tinta/50 hover:text-tinta transition">Volver al sitio</a> </div> </div> <script>(function(){', "\n    document.getElementById('loginForm').addEventListener('submit', async (e) => {\n      e.preventDefault();\n      const errorMsg = document.getElementById('errorMsg');\n      errorMsg.classList.add('hidden');\n\n      const email = document.getElementById('email').value;\n      const password = document.getElementById('password').value;\n\n      try {\n        const res = await fetch(\\`\\${apiUrl}/auth/login\\`, {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({ email, password }),\n        });\n\n        if (!res.ok) {\n          const err = await res.json();\n          throw new Error(err.message || 'Credenciales invalidas');\n        }\n\n        const data = await res.json();\n        const token = data.data?.accessToken || data.accessToken;\n\n        // Set cookie (7 days)\n        document.cookie = \\`auth_token=\\${token}; path=/; max-age=604800; SameSite=Lax\\`;\n\n        window.location.href = '/admin';\n      } catch (err) {\n        errorMsg.textContent = err.message;\n        errorMsg.classList.remove('hidden');\n      }\n    });\n  })();</script> </body> </html>"])), renderHead(), defineScriptVars({ apiUrl: "http://localhost:3000" }));
}, "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/login.astro", void 0);
const $$file = "D:/Santi Medina/Documents/Andes Code/Galeria Estudio/galeria-estudio-web/frontend/src/pages/admin/login.astro";
const $$url = "/admin/login";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Login,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

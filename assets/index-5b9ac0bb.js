(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))l(t);new MutationObserver(t=>{for(const e of t)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&l(r)}).observe(document,{childList:!0,subtree:!0});function i(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?e.credentials="include":t.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function l(t){if(t.ep)return;t.ep=!0;const e=i(t);fetch(t.href,e)}})();const h="modulepreload",p=function(n,o){return new URL(n,o).href},f={},a=function(o,i,l){if(!i||i.length===0)return o();const t=document.getElementsByTagName("link");return Promise.all(i.map(e=>{if(e=p(e,l),e in f)return;f[e]=!0;const r=e.endsWith(".css"),m=r?'[rel="stylesheet"]':"";if(!!l)for(let c=t.length-1;c>=0;c--){const u=t[c];if(u.href===e&&(!r||u.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${e}"]${m}`))return;const s=document.createElement("link");if(s.rel=r?"stylesheet":h,r||(s.as="script",s.crossOrigin=""),s.href=e,document.head.appendChild(s),r)return new Promise((c,u)=>{s.addEventListener("load",c),s.addEventListener("error",()=>u(new Error(`Unable to preload CSS for ${e}`)))})})).then(()=>o()).catch(e=>{const r=new Event("vite:preloadError",{cancelable:!0});if(r.payload=e,window.dispatchEvent(r),!r.defaultPrevented)throw e})};a(()=>import("./needle-asap-21747c6d.js"),["./needle-asap-21747c6d.js","./three.module-6742a2cb.js"],import.meta.url);globalThis["needle:dependencies:ready"]=a(()=>import("./register_types-4ed993c7.js"),[],import.meta.url);const d=new Array;globalThis["needle:codegen_files"]=d;d.push("assets/scene_Loading.glb?v=1715327032877");document.addEventListener("DOMContentLoaded",()=>{const n=document.querySelector("needle-engine");n&&n.getAttribute("src")===null&&(n.setAttribute("hash","1715327032877"),n.setAttribute("src",JSON.stringify(d)))});a(()=>import("./needle-engine-d67b61ba.js"),["./needle-engine-d67b61ba.js","./three.module-6742a2cb.js"],import.meta.url);export{a as _};
(function() {
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) return;

    // Preload all link elements with rel="modulepreload"
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        loadModulePreload(link);
    }

    // Observe new link elements added to the DOM and preload if necessary
    new MutationObserver(mutations => {
        for (const mutation of mutations) {
            if (mutation.type === "childList") {
                for (const node of mutation.addedNodes) {
                    if (node.tagName === "LINK" && node.rel === "modulepreload") {
                        loadModulePreload(node);
                    }
                }
            }
        }
    }).observe(document, { childList: true, subtree: true });

    function getFetchOptions(link) {
        const options = {};
        if (link.integrity) options.integrity = link.integrity;
        if (link.referrerPolicy) options.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === "use-credentials") {
            options.credentials = "include";
        } else if (link.crossOrigin === "anonymous") {
            options.credentials = "omit";
        } else {
            options.credentials = "same-origin";
        }
        return options;
    }

    function loadModulePreload(link) {
        if (link.ep) return;
        link.ep = true;
        const options = getFetchOptions(link);
        fetch(link.href, options);
    }
})();

const MODULE_PRELOAD_REL = "modulepreload";
const modulePreload = function(path, baseUrl) {
    return new URL(path, baseUrl).href;
};
const loadedModules = {};

const loadModules = function(callback, modules, baseUrl) {
    if (!modules || modules.length === 0) return callback();

    const links = document.getElementsByTagName("link");
    return Promise.all(modules.map(module => {
        const url = modulePreload(module, baseUrl);
        if (url in loadedModules) return;
        loadedModules[url] = true;

        const isCSS = url.endsWith(".css");
        const selector = isCSS ? '[rel="stylesheet"]' : "";

        if (baseUrl) {
            for (let i = links.length - 1; i >= 0; i--) {
                const link = links[i];
                if (link.href === url && (!isCSS || link.rel === "stylesheet")) return;
            }
        } else if (document.querySelector(`link[href="${url}"]${selector}`)) {
            return;
        }

        const linkElement = document.createElement("link");
        linkElement.rel = isCSS ? "stylesheet" : MODULE_PRELOAD_REL;
        if (!isCSS) {
            linkElement.as = "script";
            linkElement.crossOrigin = "";
        }
        linkElement.href = url;
        document.head.appendChild(linkElement);

        if (isCSS) {
            return new Promise((resolve, reject) => {
                linkElement.addEventListener("load", resolve);
                linkElement.addEventListener("error", () => reject(new Error(`Unable to preload CSS for ${url}`)));
            });
        }
    })).then(() => callback()).catch(error => {
        const preloadErrorEvent = new Event("vite:preloadError", { cancelable: true });
        preloadErrorEvent.payload = error;
        window.dispatchEvent(preloadErrorEvent);
        if (!preloadErrorEvent.defaultPrevented) throw error;
    });
};

loadModules(() => import("./needle-asap-21747c6d.js"), ["./needle-asap-21747c6d.js", "./three.module-6742a2cb.js"], import.meta.url);

globalThis["needle:dependencies:ready"] = loadModules(() => import("./register_types-4ed993c7.js"), [], import.meta.url);

const codegenFiles = [];
globalThis["needle:codegen_files"] = codegenFiles;
codegenFiles.push("assets/scene_Loading.glb?v=1715327032877");

document.addEventListener("DOMContentLoaded", () => {
    const needleEngine = document.querySelector("needle-engine");
    if (needleEngine && needleEngine.getAttribute("src") === null) {
        needleEngine.setAttribute("hash", "1715327032877");
        needleEngine.setAttribute("src", JSON.stringify(codegenFiles));
    }
});

loadModules(() => import("./needle-engine-d67b61ba.js"), ["./needle-engine-d67b61ba.js", "./three.module-6742a2cb.js"], import.meta.url);

export { loadModules as _ };

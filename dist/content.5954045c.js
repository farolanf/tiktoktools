// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"8OC3o":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = "localhost";
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "e792fbbdaa78ee84";
module.bundle.HMR_BUNDLE_ID = "34ba23145954045c";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, chrome, browser, globalThis, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, acceptedAssets, assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
} // eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? "wss" : "ws";
    var ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/"); // Web extension context
    var extCtx = typeof chrome === "undefined" ? typeof browser === "undefined" ? null : browser : chrome; // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    } // $FlowFixMe
    ws.onmessage = async function(event) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        acceptedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH); // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear(); // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html); // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function() {
        console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] ✨ Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>📝 <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", link.getAttribute("href").split("?")[0] + "?" + Date.now()); // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension bugfix for Chromium
                    // https://bugs.chromium.org/p/chromium/issues/detail?id=1255412#c12
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3) {
                        if (typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                            extCtx.runtime.reload();
                            return;
                        }
                        asset.url = extCtx.runtime.getURL("/__parcel_hmr_proxy__?url=" + encodeURIComponent(asset.url + "?t=" + Date.now()));
                        return hmrDownload(asset);
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle, asset) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
             // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        } // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id]; // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle, id, depsByBundle) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
     // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle, id, depsByBundle) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) return true;
}
function hmrAcceptRun(bundle, id) {
    var cached = bundle.cache[id];
    bundle.hotData = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) // $FlowFixMe[method-unbinding]
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"d9GIc":[function(require,module,exports) {
console.log("tiktoktools content");

},{}]},["8OC3o","d9GIc"], "d9GIc", "parcelRequirec52c")

//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxPQUFPLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQzdELE9BQU8sSUFBSTtBQUVmO0FBRUEsU0FBUyxhQUFhLE1BQU0sRUFFMUIsRUFBRSxFQUVGO0lBQ0EsSUFBSSxTQUFTLE9BQU8sS0FBSyxDQUFDLEdBQUc7SUFDN0IsT0FBTyxPQUFPLEdBQUcsQ0FBQztJQUVsQixJQUFJLFVBQVUsT0FBTyxHQUFHLEVBQ3RCLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxPQUFPLE9BQU87SUFHbEMsSUFBSSxVQUFVLE9BQU8sR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLGlCQUFpQixDQUFDLE1BQU0sRUFDN0QsT0FBTyxHQUFHLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDLFNBQVUsRUFBRSxFQUFFO1FBQ2pELEdBQUcsT0FBTyxPQUFPO0lBQ25CO0lBR0YsT0FBTyxPQUFPLEtBQUssQ0FBQyxHQUFHO0lBQ3ZCLE9BQU87SUFDUCxTQUFTLE9BQU8sS0FBSyxDQUFDLEdBQUc7SUFFekIsSUFBSSxVQUFVLE9BQU8sR0FBRyxJQUFJLE9BQU8sR0FBRyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFDNUQsT0FBTyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLFNBQVUsRUFBRSxFQUFFO1FBQ2hELElBQUkscUJBQXFCLEdBQUcsV0FBWTtZQUN0QyxPQUFPLFdBQVcsT0FBTyxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ3hDO1FBRUEsSUFBSSxzQkFBc0IsZUFBZSxNQUFNLEVBQzdDLCtCQUErQjtRQUMvQixlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCO0lBRTlDO0lBR0YsY0FBYyxDQUFDLEdBQUcsR0FBRyxJQUFJO0FBQzNCOzs7QUNua0JBLFFBQVEsR0FBRyxDQUFDIiwic291cmNlcyI6WyJub2RlX21vZHVsZXMvQHBhcmNlbC9ydW50aW1lLWJyb3dzZXItaG1yL2xpYi9ydW50aW1lLTBlYWVhN2EwMTIzMzE2M2YuanMiLCJzcmMvY29udGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgSE1SX0hPU1QgPSBcImxvY2FsaG9zdFwiO3ZhciBITVJfUE9SVCA9IDEyMzQ7dmFyIEhNUl9TRUNVUkUgPSBmYWxzZTt2YXIgSE1SX0VOVl9IQVNIID0gXCJlNzkyZmJiZGFhNzhlZTg0XCI7bW9kdWxlLmJ1bmRsZS5ITVJfQlVORExFX0lEID0gXCIzNGJhMjMxNDU5NTQwNDVjXCI7XCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGdsb2JhbCBITVJfSE9TVCwgSE1SX1BPUlQsIEhNUl9FTlZfSEFTSCwgSE1SX1NFQ1VSRSwgY2hyb21lLCBicm93c2VyLCBnbG9iYWxUaGlzLCBfX3BhcmNlbF9faW1wb3J0X18sIF9fcGFyY2VsX19pbXBvcnRTY3JpcHRzX18sIFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZSAqL1xuXG4vKjo6XG5pbXBvcnQgdHlwZSB7XG4gIEhNUkFzc2V0LFxuICBITVJNZXNzYWdlLFxufSBmcm9tICdAcGFyY2VsL3JlcG9ydGVyLWRldi1zZXJ2ZXIvc3JjL0hNUlNlcnZlci5qcyc7XG5pbnRlcmZhY2UgUGFyY2VsUmVxdWlyZSB7XG4gIChzdHJpbmcpOiBtaXhlZDtcbiAgY2FjaGU6IHt8W3N0cmluZ106IFBhcmNlbE1vZHVsZXx9O1xuICBob3REYXRhOiBtaXhlZDtcbiAgTW9kdWxlOiBhbnk7XG4gIHBhcmVudDogP1BhcmNlbFJlcXVpcmU7XG4gIGlzUGFyY2VsUmVxdWlyZTogdHJ1ZTtcbiAgbW9kdWxlczoge3xbc3RyaW5nXTogW0Z1bmN0aW9uLCB7fFtzdHJpbmddOiBzdHJpbmd8fV18fTtcbiAgSE1SX0JVTkRMRV9JRDogc3RyaW5nO1xuICByb290OiBQYXJjZWxSZXF1aXJlO1xufVxuaW50ZXJmYWNlIFBhcmNlbE1vZHVsZSB7XG4gIGhvdDoge3xcbiAgICBkYXRhOiBtaXhlZCxcbiAgICBhY2NlcHQoY2I6IChGdW5jdGlvbikgPT4gdm9pZCk6IHZvaWQsXG4gICAgZGlzcG9zZShjYjogKG1peGVkKSA9PiB2b2lkKTogdm9pZCxcbiAgICAvLyBhY2NlcHQoZGVwczogQXJyYXk8c3RyaW5nPiB8IHN0cmluZywgY2I6IChGdW5jdGlvbikgPT4gdm9pZCk6IHZvaWQsXG4gICAgLy8gZGVjbGluZSgpOiB2b2lkLFxuICAgIF9hY2NlcHRDYWxsYmFja3M6IEFycmF5PChGdW5jdGlvbikgPT4gdm9pZD4sXG4gICAgX2Rpc3Bvc2VDYWxsYmFja3M6IEFycmF5PChtaXhlZCkgPT4gdm9pZD4sXG4gIHx9O1xufVxuaW50ZXJmYWNlIEV4dGVuc2lvbkNvbnRleHQge1xuICBydW50aW1lOiB7fFxuICAgIHJlbG9hZCgpOiB2b2lkLFxuICAgIGdldFVSTCh1cmw6IHN0cmluZyk6IHN0cmluZztcbiAgICBnZXRNYW5pZmVzdCgpOiB7bWFuaWZlc3RfdmVyc2lvbjogbnVtYmVyLCAuLi59O1xuICB8fTtcbn1cbmRlY2xhcmUgdmFyIG1vZHVsZToge2J1bmRsZTogUGFyY2VsUmVxdWlyZSwgLi4ufTtcbmRlY2xhcmUgdmFyIEhNUl9IT1NUOiBzdHJpbmc7XG5kZWNsYXJlIHZhciBITVJfUE9SVDogc3RyaW5nO1xuZGVjbGFyZSB2YXIgSE1SX0VOVl9IQVNIOiBzdHJpbmc7XG5kZWNsYXJlIHZhciBITVJfU0VDVVJFOiBib29sZWFuO1xuZGVjbGFyZSB2YXIgY2hyb21lOiBFeHRlbnNpb25Db250ZXh0O1xuZGVjbGFyZSB2YXIgYnJvd3NlcjogRXh0ZW5zaW9uQ29udGV4dDtcbmRlY2xhcmUgdmFyIF9fcGFyY2VsX19pbXBvcnRfXzogKHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbmRlY2xhcmUgdmFyIF9fcGFyY2VsX19pbXBvcnRTY3JpcHRzX186IChzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG5kZWNsYXJlIHZhciBnbG9iYWxUaGlzOiB0eXBlb2Ygc2VsZjtcbmRlY2xhcmUgdmFyIFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZTogT2JqZWN0O1xuKi9cbnZhciBPVkVSTEFZX0lEID0gJ19fcGFyY2VsX19lcnJvcl9fb3ZlcmxheV9fJztcbnZhciBPbGRNb2R1bGUgPSBtb2R1bGUuYnVuZGxlLk1vZHVsZTtcblxuZnVuY3Rpb24gTW9kdWxlKG1vZHVsZU5hbWUpIHtcbiAgT2xkTW9kdWxlLmNhbGwodGhpcywgbW9kdWxlTmFtZSk7XG4gIHRoaXMuaG90ID0ge1xuICAgIGRhdGE6IG1vZHVsZS5idW5kbGUuaG90RGF0YSxcbiAgICBfYWNjZXB0Q2FsbGJhY2tzOiBbXSxcbiAgICBfZGlzcG9zZUNhbGxiYWNrczogW10sXG4gICAgYWNjZXB0OiBmdW5jdGlvbiAoZm4pIHtcbiAgICAgIHRoaXMuX2FjY2VwdENhbGxiYWNrcy5wdXNoKGZuIHx8IGZ1bmN0aW9uICgpIHt9KTtcbiAgICB9LFxuICAgIGRpc3Bvc2U6IGZ1bmN0aW9uIChmbikge1xuICAgICAgdGhpcy5fZGlzcG9zZUNhbGxiYWNrcy5wdXNoKGZuKTtcbiAgICB9XG4gIH07XG4gIG1vZHVsZS5idW5kbGUuaG90RGF0YSA9IHVuZGVmaW5lZDtcbn1cblxubW9kdWxlLmJ1bmRsZS5Nb2R1bGUgPSBNb2R1bGU7XG52YXIgY2hlY2tlZEFzc2V0c1xuLyo6IHt8W3N0cmluZ106IGJvb2xlYW58fSAqL1xuLCBhY2NlcHRlZEFzc2V0c1xuLyo6IHt8W3N0cmluZ106IGJvb2xlYW58fSAqL1xuLCBhc3NldHNUb0FjY2VwdFxuLyo6IEFycmF5PFtQYXJjZWxSZXF1aXJlLCBzdHJpbmddPiAqL1xuO1xuXG5mdW5jdGlvbiBnZXRIb3N0bmFtZSgpIHtcbiAgcmV0dXJuIEhNUl9IT1NUIHx8IChsb2NhdGlvbi5wcm90b2NvbC5pbmRleE9mKCdodHRwJykgPT09IDAgPyBsb2NhdGlvbi5ob3N0bmFtZSA6ICdsb2NhbGhvc3QnKTtcbn1cblxuZnVuY3Rpb24gZ2V0UG9ydCgpIHtcbiAgcmV0dXJuIEhNUl9QT1JUIHx8IGxvY2F0aW9uLnBvcnQ7XG59IC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1yZWRlY2xhcmVcblxuXG52YXIgcGFyZW50ID0gbW9kdWxlLmJ1bmRsZS5wYXJlbnQ7XG5cbmlmICgoIXBhcmVudCB8fCAhcGFyZW50LmlzUGFyY2VsUmVxdWlyZSkgJiYgdHlwZW9mIFdlYlNvY2tldCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgdmFyIGhvc3RuYW1lID0gZ2V0SG9zdG5hbWUoKTtcbiAgdmFyIHBvcnQgPSBnZXRQb3J0KCk7XG4gIHZhciBwcm90b2NvbCA9IEhNUl9TRUNVUkUgfHwgbG9jYXRpb24ucHJvdG9jb2wgPT0gJ2h0dHBzOicgJiYgIS9sb2NhbGhvc3R8MTI3LjAuMC4xfDAuMC4wLjAvLnRlc3QoaG9zdG5hbWUpID8gJ3dzcycgOiAnd3MnO1xuICB2YXIgd3MgPSBuZXcgV2ViU29ja2V0KHByb3RvY29sICsgJzovLycgKyBob3N0bmFtZSArIChwb3J0ID8gJzonICsgcG9ydCA6ICcnKSArICcvJyk7IC8vIFdlYiBleHRlbnNpb24gY29udGV4dFxuXG4gIHZhciBleHRDdHggPSB0eXBlb2YgY2hyb21lID09PSAndW5kZWZpbmVkJyA/IHR5cGVvZiBicm93c2VyID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiBicm93c2VyIDogY2hyb21lOyAvLyBTYWZhcmkgZG9lc24ndCBzdXBwb3J0IHNvdXJjZVVSTCBpbiBlcnJvciBzdGFja3MuXG4gIC8vIGV2YWwgbWF5IGFsc28gYmUgZGlzYWJsZWQgdmlhIENTUCwgc28gZG8gYSBxdWljayBjaGVjay5cblxuICB2YXIgc3VwcG9ydHNTb3VyY2VVUkwgPSBmYWxzZTtcblxuICB0cnkge1xuICAgICgwLCBldmFsKSgndGhyb3cgbmV3IEVycm9yKFwidGVzdFwiKTsgLy8jIHNvdXJjZVVSTD10ZXN0LmpzJyk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHN1cHBvcnRzU291cmNlVVJMID0gZXJyLnN0YWNrLmluY2x1ZGVzKCd0ZXN0LmpzJyk7XG4gIH0gLy8gJEZsb3dGaXhNZVxuXG5cbiAgd3Mub25tZXNzYWdlID0gYXN5bmMgZnVuY3Rpb24gKGV2ZW50XG4gIC8qOiB7ZGF0YTogc3RyaW5nLCAuLi59ICovXG4gICkge1xuICAgIGNoZWNrZWRBc3NldHMgPSB7fVxuICAgIC8qOiB7fFtzdHJpbmddOiBib29sZWFufH0gKi9cbiAgICA7XG4gICAgYWNjZXB0ZWRBc3NldHMgPSB7fVxuICAgIC8qOiB7fFtzdHJpbmddOiBib29sZWFufH0gKi9cbiAgICA7XG4gICAgYXNzZXRzVG9BY2NlcHQgPSBbXTtcbiAgICB2YXIgZGF0YVxuICAgIC8qOiBITVJNZXNzYWdlICovXG4gICAgPSBKU09OLnBhcnNlKGV2ZW50LmRhdGEpO1xuXG4gICAgaWYgKGRhdGEudHlwZSA9PT0gJ3VwZGF0ZScpIHtcbiAgICAgIC8vIFJlbW92ZSBlcnJvciBvdmVybGF5IGlmIHRoZXJlIGlzIG9uZVxuICAgICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmVtb3ZlRXJyb3JPdmVybGF5KCk7XG4gICAgICB9XG5cbiAgICAgIGxldCBhc3NldHMgPSBkYXRhLmFzc2V0cy5maWx0ZXIoYXNzZXQgPT4gYXNzZXQuZW52SGFzaCA9PT0gSE1SX0VOVl9IQVNIKTsgLy8gSGFuZGxlIEhNUiBVcGRhdGVcblxuICAgICAgbGV0IGhhbmRsZWQgPSBhc3NldHMuZXZlcnkoYXNzZXQgPT4ge1xuICAgICAgICByZXR1cm4gYXNzZXQudHlwZSA9PT0gJ2NzcycgfHwgYXNzZXQudHlwZSA9PT0gJ2pzJyAmJiBobXJBY2NlcHRDaGVjayhtb2R1bGUuYnVuZGxlLnJvb3QsIGFzc2V0LmlkLCBhc3NldC5kZXBzQnlCdW5kbGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChoYW5kbGVkKSB7XG4gICAgICAgIGNvbnNvbGUuY2xlYXIoKTsgLy8gRGlzcGF0Y2ggY3VzdG9tIGV2ZW50IHNvIG90aGVyIHJ1bnRpbWVzIChlLmcgUmVhY3QgUmVmcmVzaCkgYXJlIGF3YXJlLlxuXG4gICAgICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQ3VzdG9tRXZlbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgd2luZG93LmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KCdwYXJjZWxobXJhY2NlcHQnKSk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBobXJBcHBseVVwZGF0ZXMoYXNzZXRzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFzc2V0c1RvQWNjZXB0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGlkID0gYXNzZXRzVG9BY2NlcHRbaV1bMV07XG5cbiAgICAgICAgICBpZiAoIWFjY2VwdGVkQXNzZXRzW2lkXSkge1xuICAgICAgICAgICAgaG1yQWNjZXB0UnVuKGFzc2V0c1RvQWNjZXB0W2ldWzBdLCBpZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgZnVsbFJlbG9hZCgpO1xuICAgIH1cblxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdlcnJvcicpIHtcbiAgICAgIC8vIExvZyBwYXJjZWwgZXJyb3JzIHRvIGNvbnNvbGVcbiAgICAgIGZvciAobGV0IGFuc2lEaWFnbm9zdGljIG9mIGRhdGEuZGlhZ25vc3RpY3MuYW5zaSkge1xuICAgICAgICBsZXQgc3RhY2sgPSBhbnNpRGlhZ25vc3RpYy5jb2RlZnJhbWUgPyBhbnNpRGlhZ25vc3RpYy5jb2RlZnJhbWUgOiBhbnNpRGlhZ25vc3RpYy5zdGFjaztcbiAgICAgICAgY29uc29sZS5lcnJvcign8J+aqCBbcGFyY2VsXTogJyArIGFuc2lEaWFnbm9zdGljLm1lc3NhZ2UgKyAnXFxuJyArIHN0YWNrICsgJ1xcblxcbicgKyBhbnNpRGlhZ25vc3RpYy5oaW50cy5qb2luKCdcXG4nKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIC8vIFJlbmRlciB0aGUgZmFuY3kgaHRtbCBvdmVybGF5XG4gICAgICAgIHJlbW92ZUVycm9yT3ZlcmxheSgpO1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGNyZWF0ZUVycm9yT3ZlcmxheShkYXRhLmRpYWdub3N0aWNzLmh0bWwpOyAvLyAkRmxvd0ZpeE1lXG5cbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChvdmVybGF5KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd3Mub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gICAgY29uc29sZS5lcnJvcihlLm1lc3NhZ2UpO1xuICB9O1xuXG4gIHdzLm9uY2xvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS53YXJuKCdbcGFyY2VsXSDwn5qoIENvbm5lY3Rpb24gdG8gdGhlIEhNUiBzZXJ2ZXIgd2FzIGxvc3QnKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlRXJyb3JPdmVybGF5KCkge1xuICB2YXIgb3ZlcmxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKE9WRVJMQVlfSUQpO1xuXG4gIGlmIChvdmVybGF5KSB7XG4gICAgb3ZlcmxheS5yZW1vdmUoKTtcbiAgICBjb25zb2xlLmxvZygnW3BhcmNlbF0g4pyoIEVycm9yIHJlc29sdmVkJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlRXJyb3JPdmVybGF5KGRpYWdub3N0aWNzKSB7XG4gIHZhciBvdmVybGF5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gIG92ZXJsYXkuaWQgPSBPVkVSTEFZX0lEO1xuICBsZXQgZXJyb3JIVE1MID0gJzxkaXYgc3R5bGU9XCJiYWNrZ3JvdW5kOiBibGFjazsgb3BhY2l0eTogMC44NTsgZm9udC1zaXplOiAxNnB4OyBjb2xvcjogd2hpdGU7IHBvc2l0aW9uOiBmaXhlZDsgaGVpZ2h0OiAxMDAlOyB3aWR0aDogMTAwJTsgdG9wOiAwcHg7IGxlZnQ6IDBweDsgcGFkZGluZzogMzBweDsgZm9udC1mYW1pbHk6IE1lbmxvLCBDb25zb2xhcywgbW9ub3NwYWNlOyB6LWluZGV4OiA5OTk5O1wiPic7XG5cbiAgZm9yIChsZXQgZGlhZ25vc3RpYyBvZiBkaWFnbm9zdGljcykge1xuICAgIGxldCBzdGFjayA9IGRpYWdub3N0aWMuZnJhbWVzLmxlbmd0aCA/IGRpYWdub3N0aWMuZnJhbWVzLnJlZHVjZSgocCwgZnJhbWUpID0+IHtcbiAgICAgIHJldHVybiBgJHtwfVxuPGEgaHJlZj1cIi9fX3BhcmNlbF9sYXVuY2hfZWRpdG9yP2ZpbGU9JHtlbmNvZGVVUklDb21wb25lbnQoZnJhbWUubG9jYXRpb24pfVwiIHN0eWxlPVwidGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7IGNvbG9yOiAjODg4XCIgb25jbGljaz1cImZldGNoKHRoaXMuaHJlZik7IHJldHVybiBmYWxzZVwiPiR7ZnJhbWUubG9jYXRpb259PC9hPlxuJHtmcmFtZS5jb2RlfWA7XG4gICAgfSwgJycpIDogZGlhZ25vc3RpYy5zdGFjaztcbiAgICBlcnJvckhUTUwgKz0gYFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IG1hcmdpbi10b3A6IDIwcHg7XCI+XG4gICAgICAgICAg8J+aqCAke2RpYWdub3N0aWMubWVzc2FnZX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxwcmU+JHtzdGFja308L3ByZT5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICAke2RpYWdub3N0aWMuaGludHMubWFwKGhpbnQgPT4gJzxkaXY+8J+SoSAnICsgaGludCArICc8L2Rpdj4nKS5qb2luKCcnKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgICR7ZGlhZ25vc3RpYy5kb2N1bWVudGF0aW9uID8gYDxkaXY+8J+TnSA8YSBzdHlsZT1cImNvbG9yOiB2aW9sZXRcIiBocmVmPVwiJHtkaWFnbm9zdGljLmRvY3VtZW50YXRpb259XCIgdGFyZ2V0PVwiX2JsYW5rXCI+TGVhcm4gbW9yZTwvYT48L2Rpdj5gIDogJyd9XG4gICAgICA8L2Rpdj5cbiAgICBgO1xuICB9XG5cbiAgZXJyb3JIVE1MICs9ICc8L2Rpdj4nO1xuICBvdmVybGF5LmlubmVySFRNTCA9IGVycm9ySFRNTDtcbiAgcmV0dXJuIG92ZXJsYXk7XG59XG5cbmZ1bmN0aW9uIGZ1bGxSZWxvYWQoKSB7XG4gIGlmICgncmVsb2FkJyBpbiBsb2NhdGlvbikge1xuICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xuICB9IGVsc2UgaWYgKGV4dEN0eCAmJiBleHRDdHgucnVudGltZSAmJiBleHRDdHgucnVudGltZS5yZWxvYWQpIHtcbiAgICBleHRDdHgucnVudGltZS5yZWxvYWQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRQYXJlbnRzKGJ1bmRsZSwgaWQpXG4vKjogQXJyYXk8W1BhcmNlbFJlcXVpcmUsIHN0cmluZ10+ICovXG57XG4gIHZhciBtb2R1bGVzID0gYnVuZGxlLm1vZHVsZXM7XG5cbiAgaWYgKCFtb2R1bGVzKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgdmFyIHBhcmVudHMgPSBbXTtcbiAgdmFyIGssIGQsIGRlcDtcblxuICBmb3IgKGsgaW4gbW9kdWxlcykge1xuICAgIGZvciAoZCBpbiBtb2R1bGVzW2tdWzFdKSB7XG4gICAgICBkZXAgPSBtb2R1bGVzW2tdWzFdW2RdO1xuXG4gICAgICBpZiAoZGVwID09PSBpZCB8fCBBcnJheS5pc0FycmF5KGRlcCkgJiYgZGVwW2RlcC5sZW5ndGggLSAxXSA9PT0gaWQpIHtcbiAgICAgICAgcGFyZW50cy5wdXNoKFtidW5kbGUsIGtdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAoYnVuZGxlLnBhcmVudCkge1xuICAgIHBhcmVudHMgPSBwYXJlbnRzLmNvbmNhdChnZXRQYXJlbnRzKGJ1bmRsZS5wYXJlbnQsIGlkKSk7XG4gIH1cblxuICByZXR1cm4gcGFyZW50cztcbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rKSB7XG4gIHZhciBuZXdMaW5rID0gbGluay5jbG9uZU5vZGUoKTtcblxuICBuZXdMaW5rLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAobGluay5wYXJlbnROb2RlICE9PSBudWxsKSB7XG4gICAgICAvLyAkRmxvd0ZpeE1lXG4gICAgICBsaW5rLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGluayk7XG4gICAgfVxuICB9O1xuXG4gIG5ld0xpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgLy8gJEZsb3dGaXhNZVxuICBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpLnNwbGl0KCc/JylbMF0gKyAnPycgKyBEYXRlLm5vdygpKTsgLy8gJEZsb3dGaXhNZVxuXG4gIGxpbmsucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobmV3TGluaywgbGluay5uZXh0U2libGluZyk7XG59XG5cbnZhciBjc3NUaW1lb3V0ID0gbnVsbDtcblxuZnVuY3Rpb24gcmVsb2FkQ1NTKCkge1xuICBpZiAoY3NzVGltZW91dCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNzc1RpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgbGlua3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdsaW5rW3JlbD1cInN0eWxlc2hlZXRcIl0nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlua3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vICRGbG93Rml4TWVbaW5jb21wYXRpYmxlLXR5cGVdXG4gICAgICB2YXIgaHJlZlxuICAgICAgLyo6IHN0cmluZyAqL1xuICAgICAgPSBsaW5rc1tpXS5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAgIHZhciBob3N0bmFtZSA9IGdldEhvc3RuYW1lKCk7XG4gICAgICB2YXIgc2VydmVkRnJvbUhNUlNlcnZlciA9IGhvc3RuYW1lID09PSAnbG9jYWxob3N0JyA/IG5ldyBSZWdFeHAoJ14oaHR0cHM/OlxcXFwvXFxcXC8oMC4wLjAuMHwxMjcuMC4wLjEpfGxvY2FsaG9zdCk6JyArIGdldFBvcnQoKSkudGVzdChocmVmKSA6IGhyZWYuaW5kZXhPZihob3N0bmFtZSArICc6JyArIGdldFBvcnQoKSk7XG4gICAgICB2YXIgYWJzb2x1dGUgPSAvXmh0dHBzPzpcXC9cXC8vaS50ZXN0KGhyZWYpICYmIGhyZWYuaW5kZXhPZihsb2NhdGlvbi5vcmlnaW4pICE9PSAwICYmICFzZXJ2ZWRGcm9tSE1SU2VydmVyO1xuXG4gICAgICBpZiAoIWFic29sdXRlKSB7XG4gICAgICAgIHVwZGF0ZUxpbmsobGlua3NbaV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNzc1RpbWVvdXQgPSBudWxsO1xuICB9LCA1MCk7XG59XG5cbmZ1bmN0aW9uIGhtckRvd25sb2FkKGFzc2V0KSB7XG4gIGlmIChhc3NldC50eXBlID09PSAnanMnKSB7XG4gICAgaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGxldCBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcbiAgICAgIHNjcmlwdC5zcmMgPSBhc3NldC51cmwgKyAnP3Q9JyArIERhdGUubm93KCk7XG5cbiAgICAgIGlmIChhc3NldC5vdXRwdXRGb3JtYXQgPT09ICdlc21vZHVsZScpIHtcbiAgICAgICAgc2NyaXB0LnR5cGUgPSAnbW9kdWxlJztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgdmFyIF9kb2N1bWVudCRoZWFkO1xuXG4gICAgICAgIHNjcmlwdC5vbmxvYWQgPSAoKSA9PiByZXNvbHZlKHNjcmlwdCk7XG5cbiAgICAgICAgc2NyaXB0Lm9uZXJyb3IgPSByZWplY3Q7XG4gICAgICAgIChfZG9jdW1lbnQkaGVhZCA9IGRvY3VtZW50LmhlYWQpID09PSBudWxsIHx8IF9kb2N1bWVudCRoZWFkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZG9jdW1lbnQkaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaW1wb3J0U2NyaXB0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgLy8gV29ya2VyIHNjcmlwdHNcbiAgICAgIGlmIChhc3NldC5vdXRwdXRGb3JtYXQgPT09ICdlc21vZHVsZScpIHtcbiAgICAgICAgcmV0dXJuIF9fcGFyY2VsX19pbXBvcnRfXyhhc3NldC51cmwgKyAnP3Q9JyArIERhdGUubm93KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgX19wYXJjZWxfX2ltcG9ydFNjcmlwdHNfXyhhc3NldC51cmwgKyAnP3Q9JyArIERhdGUubm93KCkpO1xuXG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICByZWplY3QoZXJyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBobXJBcHBseVVwZGF0ZXMoYXNzZXRzKSB7XG4gIGdsb2JhbC5wYXJjZWxIb3RVcGRhdGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICBsZXQgc2NyaXB0c1RvUmVtb3ZlO1xuXG4gIHRyeSB7XG4gICAgLy8gSWYgc291cmNlVVJMIGNvbW1lbnRzIGFyZW4ndCBzdXBwb3J0ZWQgaW4gZXZhbCwgd2UgbmVlZCB0byBsb2FkXG4gICAgLy8gdGhlIHVwZGF0ZSBmcm9tIHRoZSBkZXYgc2VydmVyIG92ZXIgSFRUUCBzbyB0aGF0IHN0YWNrIHRyYWNlc1xuICAgIC8vIGFyZSBjb3JyZWN0IGluIGVycm9ycy9sb2dzLiBUaGlzIGlzIG11Y2ggc2xvd2VyIHRoYW4gZXZhbCwgc29cbiAgICAvLyB3ZSBvbmx5IGRvIGl0IGlmIG5lZWRlZCAoY3VycmVudGx5IGp1c3QgU2FmYXJpKS5cbiAgICAvLyBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTM3Mjk3XG4gICAgLy8gVGhpcyBwYXRoIGlzIGFsc28gdGFrZW4gaWYgYSBDU1AgZGlzYWxsb3dzIGV2YWwuXG4gICAgaWYgKCFzdXBwb3J0c1NvdXJjZVVSTCkge1xuICAgICAgbGV0IHByb21pc2VzID0gYXNzZXRzLm1hcChhc3NldCA9PiB7XG4gICAgICAgIHZhciBfaG1yRG93bmxvYWQ7XG5cbiAgICAgICAgcmV0dXJuIChfaG1yRG93bmxvYWQgPSBobXJEb3dubG9hZChhc3NldCkpID09PSBudWxsIHx8IF9obXJEb3dubG9hZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2htckRvd25sb2FkLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgLy8gV2ViIGV4dGVuc2lvbiBidWdmaXggZm9yIENocm9taXVtXG4gICAgICAgICAgLy8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL2Nocm9taXVtL2lzc3Vlcy9kZXRhaWw/aWQ9MTI1NTQxMiNjMTJcbiAgICAgICAgICBpZiAoZXh0Q3R4ICYmIGV4dEN0eC5ydW50aW1lICYmIGV4dEN0eC5ydW50aW1lLmdldE1hbmlmZXN0KCkubWFuaWZlc3RfdmVyc2lvbiA9PSAzKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIFNlcnZpY2VXb3JrZXJHbG9iYWxTY29wZSAhPSAndW5kZWZpbmVkJyAmJiBnbG9iYWwgaW5zdGFuY2VvZiBTZXJ2aWNlV29ya2VyR2xvYmFsU2NvcGUpIHtcbiAgICAgICAgICAgICAgZXh0Q3R4LnJ1bnRpbWUucmVsb2FkKCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYXNzZXQudXJsID0gZXh0Q3R4LnJ1bnRpbWUuZ2V0VVJMKCcvX19wYXJjZWxfaG1yX3Byb3h5X18/dXJsPScgKyBlbmNvZGVVUklDb21wb25lbnQoYXNzZXQudXJsICsgJz90PScgKyBEYXRlLm5vdygpKSk7XG4gICAgICAgICAgICByZXR1cm4gaG1yRG93bmxvYWQoYXNzZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHNjcmlwdHNUb1JlbW92ZSA9IGF3YWl0IFByb21pc2UuYWxsKHByb21pc2VzKTtcbiAgICB9XG5cbiAgICBhc3NldHMuZm9yRWFjaChmdW5jdGlvbiAoYXNzZXQpIHtcbiAgICAgIGhtckFwcGx5KG1vZHVsZS5idW5kbGUucm9vdCwgYXNzZXQpO1xuICAgIH0pO1xuICB9IGZpbmFsbHkge1xuICAgIGRlbGV0ZSBnbG9iYWwucGFyY2VsSG90VXBkYXRlO1xuXG4gICAgaWYgKHNjcmlwdHNUb1JlbW92ZSkge1xuICAgICAgc2NyaXB0c1RvUmVtb3ZlLmZvckVhY2goc2NyaXB0ID0+IHtcbiAgICAgICAgaWYgKHNjcmlwdCkge1xuICAgICAgICAgIHZhciBfZG9jdW1lbnQkaGVhZDI7XG5cbiAgICAgICAgICAoX2RvY3VtZW50JGhlYWQyID0gZG9jdW1lbnQuaGVhZCkgPT09IG51bGwgfHwgX2RvY3VtZW50JGhlYWQyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfZG9jdW1lbnQkaGVhZDIucmVtb3ZlQ2hpbGQoc2NyaXB0KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhtckFwcGx5KGJ1bmRsZVxuLyo6IFBhcmNlbFJlcXVpcmUgKi9cbiwgYXNzZXRcbi8qOiAgSE1SQXNzZXQgKi9cbikge1xuICB2YXIgbW9kdWxlcyA9IGJ1bmRsZS5tb2R1bGVzO1xuXG4gIGlmICghbW9kdWxlcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChhc3NldC50eXBlID09PSAnY3NzJykge1xuICAgIHJlbG9hZENTUygpO1xuICB9IGVsc2UgaWYgKGFzc2V0LnR5cGUgPT09ICdqcycpIHtcbiAgICBsZXQgZGVwcyA9IGFzc2V0LmRlcHNCeUJ1bmRsZVtidW5kbGUuSE1SX0JVTkRMRV9JRF07XG5cbiAgICBpZiAoZGVwcykge1xuICAgICAgaWYgKG1vZHVsZXNbYXNzZXQuaWRdKSB7XG4gICAgICAgIC8vIFJlbW92ZSBkZXBlbmRlbmNpZXMgdGhhdCBhcmUgcmVtb3ZlZCBhbmQgd2lsbCBiZWNvbWUgb3JwaGFuZWQuXG4gICAgICAgIC8vIFRoaXMgaXMgbmVjZXNzYXJ5IHNvIHRoYXQgaWYgdGhlIGFzc2V0IGlzIGFkZGVkIGJhY2sgYWdhaW4sIHRoZSBjYWNoZSBpcyBnb25lLCBhbmQgd2UgcHJldmVudCBhIGZ1bGwgcGFnZSByZWxvYWQuXG4gICAgICAgIGxldCBvbGREZXBzID0gbW9kdWxlc1thc3NldC5pZF1bMV07XG5cbiAgICAgICAgZm9yIChsZXQgZGVwIGluIG9sZERlcHMpIHtcbiAgICAgICAgICBpZiAoIWRlcHNbZGVwXSB8fCBkZXBzW2RlcF0gIT09IG9sZERlcHNbZGVwXSkge1xuICAgICAgICAgICAgbGV0IGlkID0gb2xkRGVwc1tkZXBdO1xuICAgICAgICAgICAgbGV0IHBhcmVudHMgPSBnZXRQYXJlbnRzKG1vZHVsZS5idW5kbGUucm9vdCwgaWQpO1xuXG4gICAgICAgICAgICBpZiAocGFyZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgaG1yRGVsZXRlKG1vZHVsZS5idW5kbGUucm9vdCwgaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHNTb3VyY2VVUkwpIHtcbiAgICAgICAgLy8gR2xvYmFsIGV2YWwuIFdlIHdvdWxkIHVzZSBgbmV3IEZ1bmN0aW9uYCBoZXJlIGJ1dCBicm93c2VyXG4gICAgICAgIC8vIHN1cHBvcnQgZm9yIHNvdXJjZSBtYXBzIGlzIGJldHRlciB3aXRoIGV2YWwuXG4gICAgICAgICgwLCBldmFsKShhc3NldC5vdXRwdXQpO1xuICAgICAgfSAvLyAkRmxvd0ZpeE1lXG5cblxuICAgICAgbGV0IGZuID0gZ2xvYmFsLnBhcmNlbEhvdFVwZGF0ZVthc3NldC5pZF07XG4gICAgICBtb2R1bGVzW2Fzc2V0LmlkXSA9IFtmbiwgZGVwc107XG4gICAgfSBlbHNlIGlmIChidW5kbGUucGFyZW50KSB7XG4gICAgICBobXJBcHBseShidW5kbGUucGFyZW50LCBhc3NldCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGhtckRlbGV0ZShidW5kbGUsIGlkKSB7XG4gIGxldCBtb2R1bGVzID0gYnVuZGxlLm1vZHVsZXM7XG5cbiAgaWYgKCFtb2R1bGVzKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKG1vZHVsZXNbaWRdKSB7XG4gICAgLy8gQ29sbGVjdCBkZXBlbmRlbmNpZXMgdGhhdCB3aWxsIGJlY29tZSBvcnBoYW5lZCB3aGVuIHRoaXMgbW9kdWxlIGlzIGRlbGV0ZWQuXG4gICAgbGV0IGRlcHMgPSBtb2R1bGVzW2lkXVsxXTtcbiAgICBsZXQgb3JwaGFucyA9IFtdO1xuXG4gICAgZm9yIChsZXQgZGVwIGluIGRlcHMpIHtcbiAgICAgIGxldCBwYXJlbnRzID0gZ2V0UGFyZW50cyhtb2R1bGUuYnVuZGxlLnJvb3QsIGRlcHNbZGVwXSk7XG5cbiAgICAgIGlmIChwYXJlbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBvcnBoYW5zLnB1c2goZGVwc1tkZXBdKTtcbiAgICAgIH1cbiAgICB9IC8vIERlbGV0ZSB0aGUgbW9kdWxlLiBUaGlzIG11c3QgYmUgZG9uZSBiZWZvcmUgZGVsZXRpbmcgZGVwZW5kZW5jaWVzIGluIGNhc2Ugb2YgY2lyY3VsYXIgZGVwZW5kZW5jaWVzLlxuXG5cbiAgICBkZWxldGUgbW9kdWxlc1tpZF07XG4gICAgZGVsZXRlIGJ1bmRsZS5jYWNoZVtpZF07IC8vIE5vdyBkZWxldGUgdGhlIG9ycGhhbnMuXG5cbiAgICBvcnBoYW5zLmZvckVhY2goaWQgPT4ge1xuICAgICAgaG1yRGVsZXRlKG1vZHVsZS5idW5kbGUucm9vdCwgaWQpO1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKGJ1bmRsZS5wYXJlbnQpIHtcbiAgICBobXJEZWxldGUoYnVuZGxlLnBhcmVudCwgaWQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhtckFjY2VwdENoZWNrKGJ1bmRsZVxuLyo6IFBhcmNlbFJlcXVpcmUgKi9cbiwgaWRcbi8qOiBzdHJpbmcgKi9cbiwgZGVwc0J5QnVuZGxlXG4vKjogP3sgW3N0cmluZ106IHsgW3N0cmluZ106IHN0cmluZyB9IH0qL1xuKSB7XG4gIGlmIChobXJBY2NlcHRDaGVja09uZShidW5kbGUsIGlkLCBkZXBzQnlCdW5kbGUpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gLy8gVHJhdmVyc2UgcGFyZW50cyBicmVhZHRoIGZpcnN0LiBBbGwgcG9zc2libGUgYW5jZXN0cmllcyBtdXN0IGFjY2VwdCB0aGUgSE1SIHVwZGF0ZSwgb3Igd2UnbGwgcmVsb2FkLlxuXG5cbiAgbGV0IHBhcmVudHMgPSBnZXRQYXJlbnRzKG1vZHVsZS5idW5kbGUucm9vdCwgaWQpO1xuICBsZXQgYWNjZXB0ZWQgPSBmYWxzZTtcblxuICB3aGlsZSAocGFyZW50cy5sZW5ndGggPiAwKSB7XG4gICAgbGV0IHYgPSBwYXJlbnRzLnNoaWZ0KCk7XG4gICAgbGV0IGEgPSBobXJBY2NlcHRDaGVja09uZSh2WzBdLCB2WzFdLCBudWxsKTtcblxuICAgIGlmIChhKSB7XG4gICAgICAvLyBJZiB0aGlzIHBhcmVudCBhY2NlcHRzLCBzdG9wIHRyYXZlcnNpbmcgdXB3YXJkLCBidXQgc3RpbGwgY29uc2lkZXIgc2libGluZ3MuXG4gICAgICBhY2NlcHRlZCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE90aGVyd2lzZSwgcXVldWUgdGhlIHBhcmVudHMgaW4gdGhlIG5leHQgbGV2ZWwgdXB3YXJkLlxuICAgICAgbGV0IHAgPSBnZXRQYXJlbnRzKG1vZHVsZS5idW5kbGUucm9vdCwgdlsxXSk7XG5cbiAgICAgIGlmIChwLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyBJZiB0aGVyZSBhcmUgbm8gcGFyZW50cywgdGhlbiB3ZSd2ZSByZWFjaGVkIGFuIGVudHJ5IHdpdGhvdXQgYWNjZXB0aW5nLiBSZWxvYWQuXG4gICAgICAgIGFjY2VwdGVkID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBwYXJlbnRzLnB1c2goLi4ucCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFjY2VwdGVkO1xufVxuXG5mdW5jdGlvbiBobXJBY2NlcHRDaGVja09uZShidW5kbGVcbi8qOiBQYXJjZWxSZXF1aXJlICovXG4sIGlkXG4vKjogc3RyaW5nICovXG4sIGRlcHNCeUJ1bmRsZVxuLyo6ID97IFtzdHJpbmddOiB7IFtzdHJpbmddOiBzdHJpbmcgfSB9Ki9cbikge1xuICB2YXIgbW9kdWxlcyA9IGJ1bmRsZS5tb2R1bGVzO1xuXG4gIGlmICghbW9kdWxlcykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChkZXBzQnlCdW5kbGUgJiYgIWRlcHNCeUJ1bmRsZVtidW5kbGUuSE1SX0JVTkRMRV9JRF0pIHtcbiAgICAvLyBJZiB3ZSByZWFjaGVkIHRoZSByb290IGJ1bmRsZSB3aXRob3V0IGZpbmRpbmcgd2hlcmUgdGhlIGFzc2V0IHNob3VsZCBnbyxcbiAgICAvLyB0aGVyZSdzIG5vdGhpbmcgdG8gZG8uIE1hcmsgYXMgXCJhY2NlcHRlZFwiIHNvIHdlIGRvbid0IHJlbG9hZCB0aGUgcGFnZS5cbiAgICBpZiAoIWJ1bmRsZS5wYXJlbnQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBobXJBY2NlcHRDaGVjayhidW5kbGUucGFyZW50LCBpZCwgZGVwc0J5QnVuZGxlKTtcbiAgfVxuXG4gIGlmIChjaGVja2VkQXNzZXRzW2lkXSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2hlY2tlZEFzc2V0c1tpZF0gPSB0cnVlO1xuICB2YXIgY2FjaGVkID0gYnVuZGxlLmNhY2hlW2lkXTtcbiAgYXNzZXRzVG9BY2NlcHQucHVzaChbYnVuZGxlLCBpZF0pO1xuXG4gIGlmICghY2FjaGVkIHx8IGNhY2hlZC5ob3QgJiYgY2FjaGVkLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIGhtckFjY2VwdFJ1bihidW5kbGVcbi8qOiBQYXJjZWxSZXF1aXJlICovXG4sIGlkXG4vKjogc3RyaW5nICovXG4pIHtcbiAgdmFyIGNhY2hlZCA9IGJ1bmRsZS5jYWNoZVtpZF07XG4gIGJ1bmRsZS5ob3REYXRhID0ge307XG5cbiAgaWYgKGNhY2hlZCAmJiBjYWNoZWQuaG90KSB7XG4gICAgY2FjaGVkLmhvdC5kYXRhID0gYnVuZGxlLmhvdERhdGE7XG4gIH1cblxuICBpZiAoY2FjaGVkICYmIGNhY2hlZC5ob3QgJiYgY2FjaGVkLmhvdC5fZGlzcG9zZUNhbGxiYWNrcy5sZW5ndGgpIHtcbiAgICBjYWNoZWQuaG90Ll9kaXNwb3NlQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24gKGNiKSB7XG4gICAgICBjYihidW5kbGUuaG90RGF0YSk7XG4gICAgfSk7XG4gIH1cblxuICBkZWxldGUgYnVuZGxlLmNhY2hlW2lkXTtcbiAgYnVuZGxlKGlkKTtcbiAgY2FjaGVkID0gYnVuZGxlLmNhY2hlW2lkXTtcblxuICBpZiAoY2FjaGVkICYmIGNhY2hlZC5ob3QgJiYgY2FjaGVkLmhvdC5fYWNjZXB0Q2FsbGJhY2tzLmxlbmd0aCkge1xuICAgIGNhY2hlZC5ob3QuX2FjY2VwdENhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uIChjYikge1xuICAgICAgdmFyIGFzc2V0c1RvQWxzb0FjY2VwdCA9IGNiKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGdldFBhcmVudHMobW9kdWxlLmJ1bmRsZS5yb290LCBpZCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGFzc2V0c1RvQWxzb0FjY2VwdCAmJiBhc3NldHNUb0FjY2VwdC5sZW5ndGgpIHtcbiAgICAgICAgLy8gJEZsb3dGaXhNZVttZXRob2QtdW5iaW5kaW5nXVxuICAgICAgICBhc3NldHNUb0FjY2VwdC5wdXNoLmFwcGx5KGFzc2V0c1RvQWNjZXB0LCBhc3NldHNUb0Fsc29BY2NlcHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWNjZXB0ZWRBc3NldHNbaWRdID0gdHJ1ZTtcbn0iLCJjb25zb2xlLmxvZygndGlrdG9rdG9vbHMgY29udGVudCcpOyJdLCJuYW1lcyI6W10sInZlcnNpb24iOjMsImZpbGUiOiJjb250ZW50LjU5NTQwNDVjLmpzLm1hcCJ9

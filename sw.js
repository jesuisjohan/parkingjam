(()=>{"use strict";var e={913:()=>{try{self["workbox:core:6.5.2"]&&_()}catch(e){}},977:()=>{try{self["workbox:precaching:6.5.2"]&&_()}catch(e){}},80:()=>{try{self["workbox:routing:6.5.2"]&&_()}catch(e){}},873:()=>{try{self["workbox:strategies:6.5.2"]&&_()}catch(e){}}},t={};function s(a){var n=t[a];if(void 0!==n)return n.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}(()=>{s(913);class e extends Error{constructor(e,t){super(((e,...t)=>{let s=e;return t.length>0&&(s+=` :: ${JSON.stringify(t)}`),s})(e,t)),this.name=e,this.details=t}}const t={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},a=e=>[t.prefix,e,t.suffix].filter((e=>e&&e.length>0)).join("-"),n=e=>e||a(t.precache);function r(e,t){const s=t();return e.waitUntil(s),s}function i(t){if(!t)throw new e("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:s,url:a}=t;if(!a)throw new e("add-to-cache-list-unexpected-type",{entry:t});if(!s){const e=new URL(a,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(a,location.href),r=new URL(a,location.href);return n.searchParams.set("__WB_REVISION__",s),{cacheKey:n.href,url:r.href}}s(977);class c{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if("install"===e.type&&t&&t.originalRequest&&t.originalRequest instanceof Request){const e=t.originalRequest.url;s?this.notUpdatedURLs.push(e):this.updatedURLs.push(e)}return s}}}class o{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:e,params:t})=>{const s=(null==t?void 0:t.cacheKey)||this._precacheController.getCacheKeyForURL(e.url);return s?new Request(s,{headers:e.headers}):e},this._precacheController=e}}let h;function l(e,t){const s=new URL(e);for(const e of t)s.searchParams.delete(e);return s.href}class u{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}const d=new Set;function f(e){return"string"==typeof e?new Request(e):e}s(873);class p{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new u,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const e of this._plugins)this._pluginStateMap.set(e,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(t){const{event:s}=this;let a=f(t);if("navigate"===a.mode&&s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const n=this.hasCallback("fetchDidFail")?a.clone():null;try{for(const e of this.iterateCallbacks("requestWillFetch"))a=await e({request:a.clone(),event:s})}catch(t){if(t instanceof Error)throw new e("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const r=a.clone();try{let e;e=await fetch(a,"navigate"===a.mode?void 0:this._strategy.fetchOptions);for(const t of this.iterateCallbacks("fetchDidSucceed"))e=await t({event:s,request:r,response:e});return e}catch(e){throw n&&await this.runCallbacks("fetchDidFail",{error:e,event:s,originalRequest:n.clone(),request:r.clone()}),e}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=f(e);let s;const{cacheName:a,matchOptions:n}=this._strategy,r=await this.getCacheKey(t,"read"),i=Object.assign(Object.assign({},n),{cacheName:a});s=await caches.match(r,i);for(const e of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await e({cacheName:a,matchOptions:n,cachedResponse:s,request:r,event:this.event})||void 0;return s}async cachePut(t,s){const a=f(t);await(0,new Promise((e=>setTimeout(e,0))));const n=await this.getCacheKey(a,"write");if(!s)throw new e("cache-put-with-no-response",{url:(r=n.url,new URL(String(r),location.href).href.replace(new RegExp(`^${location.origin}`),""))});var r;const i=await this._ensureResponseSafeToCache(s);if(!i)return!1;const{cacheName:c,matchOptions:o}=this._strategy,h=await self.caches.open(c),u=this.hasCallback("cacheDidUpdate"),p=u?await async function(e,t,s,a){const n=l(t.url,s);if(t.url===n)return e.match(t,a);const r=Object.assign(Object.assign({},a),{ignoreSearch:!0}),i=await e.keys(t,r);for(const t of i)if(n===l(t.url,s))return e.match(t,a)}(h,n.clone(),["__WB_REVISION__"],o):null;try{await h.put(n,u?i.clone():i)}catch(e){if(e instanceof Error)throw"QuotaExceededError"===e.name&&await async function(){for(const e of d)await e()}(),e}for(const e of this.iterateCallbacks("cacheDidUpdate"))await e({cacheName:c,oldResponse:p,newResponse:i.clone(),request:n,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let a=e;for(const e of this.iterateCallbacks("cacheKeyWillBeUsed"))a=f(await e({mode:t,request:a,event:this.event,params:this.params}));this._cacheKeys[s]=a}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if("function"==typeof t[e]){const s=this._pluginStateMap.get(t),a=a=>{const n=Object.assign(Object.assign({},a),{state:s});return t[e](n)};yield a}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const e of this.iterateCallbacks("cacheWillUpdate"))if(t=await e({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&200!==t.status&&(t=void 0),t}}class g extends class{constructor(e={}){this.cacheName=e.cacheName||a(t.runtime),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s="string"==typeof e.request?new Request(e.request):e.request,a="params"in e?e.params:void 0,n=new p(this,{event:t,request:s,params:a}),r=this._getResponse(n,s,t);return[r,this._awaitComplete(r,n,s,t)]}async _getResponse(t,s,a){let n;await t.runCallbacks("handlerWillStart",{event:a,request:s});try{if(n=await this._handle(s,t),!n||"error"===n.type)throw new e("no-response",{url:s.url})}catch(e){if(e instanceof Error)for(const r of t.iterateCallbacks("handlerDidError"))if(n=await r({error:e,event:a,request:s}),n)break;if(!n)throw e}for(const e of t.iterateCallbacks("handlerWillRespond"))n=await e({event:a,request:s,response:n});return n}async _awaitComplete(e,t,s,a){let n,r;try{n=await e}catch(r){}try{await t.runCallbacks("handlerDidRespond",{event:a,request:s,response:n}),await t.doneWaiting()}catch(e){e instanceof Error&&(r=e)}if(await t.runCallbacks("handlerDidComplete",{event:a,request:s,response:n,error:r}),t.destroy(),r)throw r}}{constructor(e={}){e.cacheName=n(e.cacheName),super(e),this._fallbackToNetwork=!1!==e.fallbackToNetwork,this.plugins.push(g.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){return await t.cacheMatch(e)||(t.event&&"install"===t.event.type?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(t,s){let a;const n=s.params||{};if(!this._fallbackToNetwork)throw new e("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const e=n.integrity,r=t.integrity,i=!r||r===e;a=await s.fetch(new Request(t,{integrity:r||e})),e&&i&&(this._useDefaultCacheabilityPluginIfNeeded(),await s.cachePut(t,a.clone()))}return a}async _handleInstall(t,s){this._useDefaultCacheabilityPluginIfNeeded();const a=await s.fetch(t);if(!await s.cachePut(t,a.clone()))throw new e("bad-precaching-response",{url:t.url,status:a.status});return a}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,a]of this.plugins.entries())a!==g.copyRedirectedCacheableResponsesPlugin&&(a===g.defaultPrecacheCacheabilityPlugin&&(e=s),a.cacheWillUpdate&&t++);0===t?this.plugins.push(g.defaultPrecacheCacheabilityPlugin):t>1&&null!==e&&this.plugins.splice(e,1)}}g.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:e})=>!e||e.status>=400?null:e},g.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await async function(t,s){let a=null;if(t.url&&(a=new URL(t.url).origin),a!==self.location.origin)throw new e("cross-origin-copy-response",{origin:a});const n=t.clone(),r={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},i=s?s(r):r,c=function(){if(void 0===h){const e=new Response("");if("body"in e)try{new Response(e.body),h=!0}catch(e){h=!1}h=!1}return h}()?n.body:await n.blob();return new Response(c,i)}(t):t};class y{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new g({cacheName:n(e),plugins:[...t,new o({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(t){const s=[];for(const a of t){"string"==typeof a?s.push(a):a&&void 0===a.revision&&s.push(a.url);const{cacheKey:t,url:n}=i(a),r="string"!=typeof a&&a.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==t)throw new e("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:t});if("string"!=typeof a&&a.integrity){if(this._cacheKeysToIntegrities.has(t)&&this._cacheKeysToIntegrities.get(t)!==a.integrity)throw new e("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(t,a.integrity)}if(this._urlsToCacheKeys.set(n,t),this._urlsToCacheModes.set(n,r),s.length>0){const e=`Workbox is precaching URLs without revision info: ${s.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}install(e){return r(e,(async()=>{const t=new c;this.strategy.plugins.push(t);for(const[t,s]of this._urlsToCacheKeys){const a=this._cacheKeysToIntegrities.get(s),n=this._urlsToCacheModes.get(t),r=new Request(t,{integrity:a,cache:n,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:r,event:e}))}const{updatedURLs:s,notUpdatedURLs:a}=t;return{updatedURLs:s,notUpdatedURLs:a}}))}activate(e){return r(e,(async()=>{const e=await self.caches.open(this.strategy.cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),a=[];for(const n of t)s.has(n.url)||(await e.delete(n),a.push(n.url));return{deletedURLs:a}}))}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(t){const s=this.getCacheKeyForURL(t);if(!s)throw new e("non-precached-url",{url:t});return e=>(e.request=new Request(t),e.params=Object.assign({cacheKey:s},e.params),this.strategy.handle(e))}}let w;const m=()=>(w||(w=new y),w);s(80);const _=e=>e&&"object"==typeof e?e:{handle:e};class R{constructor(e,t,s="GET"){this.handler=_(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=_(e)}}class v extends R{constructor(e,t,s){super((({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)}),t,s)}}class C{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",(e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map((t=>{"string"==typeof t&&(t=[t]);const s=new Request(...t);return this.handleRequest({request:s,event:e})})));e.waitUntil(s),e.ports&&e.ports[0]&&s.then((()=>e.ports[0].postMessage(!0)))}}))}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const a=s.origin===location.origin,{params:n,route:r}=this.findMatchingRoute({event:t,request:e,sameOrigin:a,url:s});let i=r&&r.handler;const c=e.method;if(!i&&this._defaultHandlerMap.has(c)&&(i=this._defaultHandlerMap.get(c)),!i)return;let o;try{o=i.handle({url:s,request:e,event:t,params:n})}catch(e){o=Promise.reject(e)}const h=r&&r.catchHandler;return o instanceof Promise&&(this._catchHandler||h)&&(o=o.catch((async a=>{if(h)try{return await h.handle({url:s,request:e,event:t,params:n})}catch(e){e instanceof Error&&(a=e)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw a}))),o}findMatchingRoute({url:e,sameOrigin:t,request:s,event:a}){const n=this._routes.get(s.method)||[];for(const r of n){let n;const i=r.match({url:e,sameOrigin:t,request:s,event:a});if(i)return n=i,(Array.isArray(n)&&0===n.length||i.constructor===Object&&0===Object.keys(i).length||"boolean"==typeof i)&&(n=void 0),{route:r,params:n}}return{}}setDefaultHandler(e,t="GET"){this._defaultHandlerMap.set(t,_(e))}setCatchHandler(e){this._catchHandler=_(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(t){if(!this._routes.has(t.method))throw new e("unregister-route-but-not-found-with-method",{method:t.method});const s=this._routes.get(t.method).indexOf(t);if(!(s>-1))throw new e("unregister-route-route-not-registered");this._routes.get(t.method).splice(s,1)}}let b;class q extends R{constructor(e,t){super((({request:s})=>{const a=e.getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:a=!0,urlManipulation:n}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some((e=>e.test(s)))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(a){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(n){const e=n({url:r});for(const t of e)yield t.href}}(s.url,t)){const t=a.get(n);if(t)return{cacheKey:t,integrity:e.getIntegrityForCacheKey(t)}}}),e.strategy)}}var U;U=[{'revision':'47b569b35ca1376f603af077725ea39d','url':'assets/Levels/AutoGenerated/auto_level_0.json'},{'revision':'3d88d48f843a1b4822f887e99e1ce757','url':'assets/Levels/AutoGenerated/auto_level_1.json'},{'revision':'a5c7efcd5323c5fc21b5ae0bfe99f6af','url':'assets/Levels/AutoGenerated/auto_level_10.json'},{'revision':'05e08c8636a95f4b1f2e6919cda7cfe1','url':'assets/Levels/AutoGenerated/auto_level_100.json'},{'revision':'acda45ac55cada9e0e6aef7d677c75db','url':'assets/Levels/AutoGenerated/auto_level_101.json'},{'revision':'f227eca53acf05ea23c32c4e62d9092d','url':'assets/Levels/AutoGenerated/auto_level_102.json'},{'revision':'3a58f02fa793ce3bc225d0102e702372','url':'assets/Levels/AutoGenerated/auto_level_103.json'},{'revision':'97ebdfb985e6bc9ed4b7761b5aecd103','url':'assets/Levels/AutoGenerated/auto_level_104.json'},{'revision':'d7f3907a35ed6a4b2ed25b73b656028a','url':'assets/Levels/AutoGenerated/auto_level_105.json'},{'revision':'da24360f7ae7f4725ca1fe7468eaed42','url':'assets/Levels/AutoGenerated/auto_level_106.json'},{'revision':'9691be692950d9d90806143c122cd6e3','url':'assets/Levels/AutoGenerated/auto_level_107.json'},{'revision':'c1ebc4babba3a8e94f01e7b3d6bcbd62','url':'assets/Levels/AutoGenerated/auto_level_108.json'},{'revision':'9b8b421efe5661e51d7fde94d745678b','url':'assets/Levels/AutoGenerated/auto_level_109.json'},{'revision':'e22b03e832c97eaea7508d302db7eb3c','url':'assets/Levels/AutoGenerated/auto_level_11.json'},{'revision':'0e108dc56850964a70b2ddbe0ad75ea2','url':'assets/Levels/AutoGenerated/auto_level_110.json'},{'revision':'1f43e66dc38e266ff7c881ef38aa5a54','url':'assets/Levels/AutoGenerated/auto_level_111.json'},{'revision':'47b4e26b3e79b700d9ab404e2e42ae6b','url':'assets/Levels/AutoGenerated/auto_level_112.json'},{'revision':'8a36de3839fe3bafb04401ff784b022b','url':'assets/Levels/AutoGenerated/auto_level_113.json'},{'revision':'a5d00d966e8bae6818f32f714b7f0f61','url':'assets/Levels/AutoGenerated/auto_level_114.json'},{'revision':'e3bbf1c870470f5a8a61e315947b0f3c','url':'assets/Levels/AutoGenerated/auto_level_115.json'},{'revision':'c151733191265fad5ffae389c15f8d95','url':'assets/Levels/AutoGenerated/auto_level_116.json'},{'revision':'18816f8af612a0ebd6ae957eb6f84b80','url':'assets/Levels/AutoGenerated/auto_level_117.json'},{'revision':'2ae586c53fa3b86a0237ed8929e48f98','url':'assets/Levels/AutoGenerated/auto_level_118.json'},{'revision':'ff7653500035a78158ab68b68d953fff','url':'assets/Levels/AutoGenerated/auto_level_119.json'},{'revision':'d7276506a76c367eb9935824b7873e16','url':'assets/Levels/AutoGenerated/auto_level_12.json'},{'revision':'706494ff56936d0807a13722e9cd1b8c','url':'assets/Levels/AutoGenerated/auto_level_13.json'},{'revision':'904ff303b9050a72e195934339d8f205','url':'assets/Levels/AutoGenerated/auto_level_14.json'},{'revision':'89b75c372c3a74cbdbb088ac1aae64c1','url':'assets/Levels/AutoGenerated/auto_level_15.json'},{'revision':'4d2f4f99c93864afdd57a5ae3a83f38f','url':'assets/Levels/AutoGenerated/auto_level_16.json'},{'revision':'f8a7d437e3702668c203a8b712a44093','url':'assets/Levels/AutoGenerated/auto_level_17.json'},{'revision':'443e5db5b8552fa98a3bb5b694545113','url':'assets/Levels/AutoGenerated/auto_level_18.json'},{'revision':'868200fa266981bd9cba7baf53791800','url':'assets/Levels/AutoGenerated/auto_level_19.json'},{'revision':'47b569b35ca1376f603af077725ea39d','url':'assets/Levels/AutoGenerated/auto_level_2.json'},{'revision':'d155ee0eb520e4dc5656717263755340','url':'assets/Levels/AutoGenerated/auto_level_20.json'},{'revision':'4014011422da4bc9552c1f402db325b3','url':'assets/Levels/AutoGenerated/auto_level_21.json'},{'revision':'1ca2db3b12283c4498d1eb3ba736056d','url':'assets/Levels/AutoGenerated/auto_level_22.json'},{'revision':'933aab66a5dc4c656e8adec7ccb2668a','url':'assets/Levels/AutoGenerated/auto_level_23.json'},{'revision':'f62ab01155f430ad4d7607ab69b5a267','url':'assets/Levels/AutoGenerated/auto_level_24.json'},{'revision':'4f6163bcc970c326a350a248469c8352','url':'assets/Levels/AutoGenerated/auto_level_25.json'},{'revision':'fb76c9c58957056525e473cd4030cbd6','url':'assets/Levels/AutoGenerated/auto_level_26.json'},{'revision':'2eeed665fae7980220e8031925bdcd50','url':'assets/Levels/AutoGenerated/auto_level_27.json'},{'revision':'f0b3918f9ea370907a6433bbb2309828','url':'assets/Levels/AutoGenerated/auto_level_28.json'},{'revision':'d259722569411c8c019a7c1dd5dae47e','url':'assets/Levels/AutoGenerated/auto_level_29.json'},{'revision':'9380c38d1f82f5b74c1d5cc29eb5a605','url':'assets/Levels/AutoGenerated/auto_level_3.json'},{'revision':'c631c3cb8b58b3d66dea7d0ffedd5170','url':'assets/Levels/AutoGenerated/auto_level_30.json'},{'revision':'12b0bfb49d22791211c941e1232db553','url':'assets/Levels/AutoGenerated/auto_level_31.json'},{'revision':'e9f593aab2633a76da2672356a3ab0a1','url':'assets/Levels/AutoGenerated/auto_level_32.json'},{'revision':'04fdcd7707145133cc11bcde32b39a3c','url':'assets/Levels/AutoGenerated/auto_level_33.json'},{'revision':'68a4d26737972b283a9d6b212b14578f','url':'assets/Levels/AutoGenerated/auto_level_34.json'},{'revision':'816cf846ca95fa020c5c9f80d82b7f73','url':'assets/Levels/AutoGenerated/auto_level_35.json'},{'revision':'8d173a1a4714b5537da35d3917cc408d','url':'assets/Levels/AutoGenerated/auto_level_36.json'},{'revision':'e23dff30eaecf201a6e678bf923b7fdf','url':'assets/Levels/AutoGenerated/auto_level_37.json'},{'revision':'09d69d158918d11951b7ab364f5bdf8b','url':'assets/Levels/AutoGenerated/auto_level_38.json'},{'revision':'9e0c8be832838989375441fa81863612','url':'assets/Levels/AutoGenerated/auto_level_39.json'},{'revision':'e8f99ddf0cda03c25f21804761158503','url':'assets/Levels/AutoGenerated/auto_level_4.json'},{'revision':'fcc629c4740ca3d3a8072b64141afa1e','url':'assets/Levels/AutoGenerated/auto_level_40.json'},{'revision':'1a63156f47be4f124e43b7617c56b538','url':'assets/Levels/AutoGenerated/auto_level_41.json'},{'revision':'8141931bf65ec8305858807bc9455663','url':'assets/Levels/AutoGenerated/auto_level_42.json'},{'revision':'b85eacb1fea06d984d878a56e5307eca','url':'assets/Levels/AutoGenerated/auto_level_43.json'},{'revision':'a0d593c5c0ebb9f1678e35cc532641e1','url':'assets/Levels/AutoGenerated/auto_level_44.json'},{'revision':'8869cdb8b045b6ca5086ccd135bd6c6b','url':'assets/Levels/AutoGenerated/auto_level_45.json'},{'revision':'30f758a2333c8a0c2a8161df8ac89a41','url':'assets/Levels/AutoGenerated/auto_level_46.json'},{'revision':'e35c801c72f42f9b7bc1c00c6f4f1f8e','url':'assets/Levels/AutoGenerated/auto_level_47.json'},{'revision':'bd201db664dd7194b7b9b10d72b71b50','url':'assets/Levels/AutoGenerated/auto_level_48.json'},{'revision':'a69dc8573c9a5ea3055c0df5be444a5c','url':'assets/Levels/AutoGenerated/auto_level_49.json'},{'revision':'20848ec9d18286f4b9c19d4945e90b30','url':'assets/Levels/AutoGenerated/auto_level_5.json'},{'revision':'7923ced102fa3e066456513b733c1127','url':'assets/Levels/AutoGenerated/auto_level_50.json'},{'revision':'d91393479484032f1cbf067120386b12','url':'assets/Levels/AutoGenerated/auto_level_51.json'},{'revision':'6aba60f015d61eebced65ae534595c2c','url':'assets/Levels/AutoGenerated/auto_level_52.json'},{'revision':'fa439a7ebba06472e6ff490a5b17a25f','url':'assets/Levels/AutoGenerated/auto_level_53.json'},{'revision':'27ab094fb3ef07f7e4caafebc79cbc5a','url':'assets/Levels/AutoGenerated/auto_level_54.json'},{'revision':'0701fff9fd996f0b9eb08066bff36adf','url':'assets/Levels/AutoGenerated/auto_level_55.json'},{'revision':'6a897947eea0773d30682de79ea8beab','url':'assets/Levels/AutoGenerated/auto_level_56.json'},{'revision':'a095394ce0f8894c4f80b0b907effd4f','url':'assets/Levels/AutoGenerated/auto_level_57.json'},{'revision':'56cbc02547b7e35d2ee582bfb231774a','url':'assets/Levels/AutoGenerated/auto_level_58.json'},{'revision':'a8c5a704141f6979c30c8154eb5beeb9','url':'assets/Levels/AutoGenerated/auto_level_59.json'},{'revision':'37e7fbe38315af3543c3a2631a0c2486','url':'assets/Levels/AutoGenerated/auto_level_6.json'},{'revision':'c8134b873afe3d9d4d98df8442da5fdf','url':'assets/Levels/AutoGenerated/auto_level_60.json'},{'revision':'4bd1198f96bafc7ca0c5357f75a81bc5','url':'assets/Levels/AutoGenerated/auto_level_61.json'},{'revision':'a6a8349b6d6973010ecb335caf3cb237','url':'assets/Levels/AutoGenerated/auto_level_62.json'},{'revision':'239d0430ab53d2fd83f9b5a36dd6911f','url':'assets/Levels/AutoGenerated/auto_level_63.json'},{'revision':'ab8fde94118812a52afb8a8fe44b7187','url':'assets/Levels/AutoGenerated/auto_level_64.json'},{'revision':'dc6644aa78aebd46a0a7fd4fceacb098','url':'assets/Levels/AutoGenerated/auto_level_65.json'},{'revision':'0581b332f294f945d51638ee335f02ad','url':'assets/Levels/AutoGenerated/auto_level_66.json'},{'revision':'55e295ff852bd8bfe86679cb067ddc74','url':'assets/Levels/AutoGenerated/auto_level_67.json'},{'revision':'302f1f0b4f218b47dc694608af2f565d','url':'assets/Levels/AutoGenerated/auto_level_68.json'},{'revision':'a8f10ba85f7fb729505192465733183f','url':'assets/Levels/AutoGenerated/auto_level_69.json'},{'revision':'539b04e570bf8957572a8ad8eb7e8da2','url':'assets/Levels/AutoGenerated/auto_level_7.json'},{'revision':'ccfd08c91d77e766ce4f4fd2b4e764c9','url':'assets/Levels/AutoGenerated/auto_level_70.json'},{'revision':'0f3c637495d8c92a16522e067cc8a088','url':'assets/Levels/AutoGenerated/auto_level_71.json'},{'revision':'49a7cc18afcd066c3f9375982f9bfe8a','url':'assets/Levels/AutoGenerated/auto_level_72.json'},{'revision':'081b804011af04565110b1f3441af4ec','url':'assets/Levels/AutoGenerated/auto_level_73.json'},{'revision':'c00e82d890e22c47f33f371caa5f84da','url':'assets/Levels/AutoGenerated/auto_level_74.json'},{'revision':'c0e90ca1622a9e308584b4bb86f61375','url':'assets/Levels/AutoGenerated/auto_level_75.json'},{'revision':'d5d2bf5f68c7dd5ebd88e1632eb51841','url':'assets/Levels/AutoGenerated/auto_level_76.json'},{'revision':'265f385f4fc57bfb02b4052b37793736','url':'assets/Levels/AutoGenerated/auto_level_77.json'},{'revision':'ae8d5dadad7013299233988eb59b7c06','url':'assets/Levels/AutoGenerated/auto_level_78.json'},{'revision':'ca1fddc9d359f385d4c0ce76a9b2792c','url':'assets/Levels/AutoGenerated/auto_level_79.json'},{'revision':'0731493e29ba0c08485cdc39abfa0495','url':'assets/Levels/AutoGenerated/auto_level_8.json'},{'revision':'b474982bf27be60157d2163208d8b183','url':'assets/Levels/AutoGenerated/auto_level_80.json'},{'revision':'67ffd42910cb21a5c33d2d027c54995d','url':'assets/Levels/AutoGenerated/auto_level_81.json'},{'revision':'8fa5ca09dd06c48134be63609491f749','url':'assets/Levels/AutoGenerated/auto_level_82.json'},{'revision':'f0aee92bef14ce087379f544be6983e3','url':'assets/Levels/AutoGenerated/auto_level_83.json'},{'revision':'79e24ded21cdbcac8b74cf0484cd322f','url':'assets/Levels/AutoGenerated/auto_level_84.json'},{'revision':'896be05e98c5fcce61e7f85af20c749a','url':'assets/Levels/AutoGenerated/auto_level_85.json'},{'revision':'e8d539c1cc1c5f7e38dce71def7d9b18','url':'assets/Levels/AutoGenerated/auto_level_86.json'},{'revision':'f327d572437e3e3028de5ae477d69879','url':'assets/Levels/AutoGenerated/auto_level_87.json'},{'revision':'f12cd2ab9c6d24e5df35566d66e30876','url':'assets/Levels/AutoGenerated/auto_level_88.json'},{'revision':'e835189fec27ee0570983f0c653bb779','url':'assets/Levels/AutoGenerated/auto_level_89.json'},{'revision':'79383edeaac0f3a31c859e5bc901a231','url':'assets/Levels/AutoGenerated/auto_level_9.json'},{'revision':'f1da4053882ae369d57b8714a13c16dd','url':'assets/Levels/AutoGenerated/auto_level_90.json'},{'revision':'b8a6b150a571c727c8cd6a2424043950','url':'assets/Levels/AutoGenerated/auto_level_91.json'},{'revision':'c8f519945cc1f1cd221b1bdd1415913d','url':'assets/Levels/AutoGenerated/auto_level_92.json'},{'revision':'8790a2d68988bb4d578441ca27310269','url':'assets/Levels/AutoGenerated/auto_level_93.json'},{'revision':'4672d3b0aa9c5f01f5cb6ad60978d318','url':'assets/Levels/AutoGenerated/auto_level_94.json'},{'revision':'2a28d77a7ce545b67ffdc9b5383f7673','url':'assets/Levels/AutoGenerated/auto_level_95.json'},{'revision':'d7e458164120de404270b6837af330e0','url':'assets/Levels/AutoGenerated/auto_level_96.json'},{'revision':'9065f35890bf2aae230197ffba8447d2','url':'assets/Levels/AutoGenerated/auto_level_97.json'},{'revision':'1e18c9e9b7e18582653611880a35a0d3','url':'assets/Levels/AutoGenerated/auto_level_98.json'},{'revision':'77caa2f22a08e6550eba16e422041a83','url':'assets/Levels/AutoGenerated/auto_level_99.json'},{'revision':'e8e82f019785ddbf8906605be7429e1b','url':'assets/Levels/level_0.json'},{'revision':'7ba52083ec1c061057946b8eb7225e32','url':'assets/Levels/level_1.json'},{'revision':'e54b284c3e4c47508f60f93bdc4b5155','url':'assets/Levels/level_2.json'},{'revision':'03b9be39926fea9222a2a476dd65268d','url':'assets/Levels/level_3.json'},{'revision':'6f4d7e8fbe44a291ebb1e9465607bd94','url':'assets/Levels/sample.json'},{'revision':'91d289c5f2a0eac0c87f133ad4696042','url':'assets/img/button-continue.png'},{'revision':'d403d3a44ad12dda0f4044e388164ec2','url':'assets/img/cars/4x4_blue.png'},{'revision':'b43c927192fdc306ea6baedbbc0df9ff','url':'assets/img/cars/4x4_green.png'},{'revision':'5f6ef46048c09d1e6a09f0a116693e82','url':'assets/img/cars/4x4_white.png'},{'revision':'37d9b993d9d1cb0d907075ace431b0fc','url':'assets/img/cars/boss.png'},{'revision':'5306e3d1f8617104ea150ad8a743d831','url':'assets/img/cars/cabrio_blue.png'},{'revision':'e59d6566bbce7601865fd6df4d3927ff','url':'assets/img/cars/cabrio_red.png'},{'revision':'8338fba1c5aaed86364256ccffbf7c0c','url':'assets/img/cars/cabrio_yellow.png'},{'revision':'8c2fd0af0f6ca68f3d72442a0a152dbf','url':'assets/img/cars/minicar_black.png'},{'revision':'8391a4e3954aceefe18ee538a68e255b','url':'assets/img/cars/minicar_blue.png'},{'revision':'47f12c4182e54b5ecc73c2b209eaa026','url':'assets/img/cars/minicar_yellow.png'},{'revision':'74846340b168f69a45acda149740c425','url':'assets/img/cars/pickup_gray.png'},{'revision':'7cc07451e8d50e8e563a54deccc7de72','url':'assets/img/cars/pickup_red.png'},{'revision':'8f7f5761866064607ec1def02de56b65','url':'assets/img/cars/pickup_white.png'},{'revision':'e43ae9b83c0aefb042fcc99bcf3a3884','url':'assets/img/cars/straight_cone.png'},{'revision':'d3d486d87aaa44243ab9263429d9bb74','url':'assets/img/cars/touringcar_dark.png'},{'revision':'8f78b7a074225ecad9ed961803af28e1','url':'assets/img/cars/touringcar_gray.png'},{'revision':'6add2bfd52978701c2ed47b13d36e9d6','url':'assets/img/cars/touringcar_white.png'},{'revision':'0bf06b0fd712e657f6bbda07936a3321','url':'assets/img/emptytile.png'},{'revision':'b887c333d5ec8274b78d0851e7b3337b','url':'assets/img/phaser-logo.png'},{'revision':'57040e5677322118f6d56a1d9e43c5c6','url':'favicon.ico'},{'revision':'2ffbc23293ee8a797bc61e9c02534206','url':'icons/icons-192.png'},{'revision':'8bdcc486cda9b423f50e886f2ddb6604','url':'icons/icons-512.png'},{'revision':'3ce6da6d4338f4ed5380717cd428efbd','url':'index.html'},{'revision':null,'url':'main.846599769776549c2531.bundle.js'},{'revision':'bce522c56cb3f14ea2e70f00ad566f9d','url':'main.846599769776549c2531.bundle.js.LICENSE.txt'},{'revision':'ff0d08eca92dee1c2fc3a94297f58aeb','url':'manifest.json'},{'revision':null,'url':'vendors.78fc15d6c9fccb418f8f.bundle.js'},{'revision':'fbc1173afdd4de88faa77d1382453c93','url':'vendors.78fc15d6c9fccb418f8f.bundle.js.LICENSE.txt'}],m().precache(U),function(t){const s=m();!function(t,s,a){let n;if("string"==typeof t){const e=new URL(t,location.href);n=new R((({url:t})=>t.href===e.href),s,a)}else if(t instanceof RegExp)n=new v(t,s,a);else if("function"==typeof t)n=new R(t,s,a);else{if(!(t instanceof R))throw new e("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=t}(b||(b=new C,b.addFetchListener(),b.addCacheListener()),b).registerRoute(n)}(new q(s,t))}(undefined)})()})();
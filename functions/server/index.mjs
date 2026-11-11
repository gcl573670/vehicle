globalThis.__nitro_main__ = import.meta.url;
import { i as HTTPError, n as defineLazyEventHandler, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { t as HookableCore } from "./_libs/hookable.mjs";
import { r as FastResponse } from "./_libs/h3-v2+rou3+srvx.mjs";
//#region #nitro-vite-setup
function lazyService(loader) {
	let promise, mod;
	return { fetch(req) {
		if (mod) return mod.fetch(req);
		if (!promise) promise = loader().then((_mod) => mod = _mod.default || _mod);
		return promise.then((mod) => mod.fetch(req));
	} };
}
var services = { ["ssr"]: lazyService(() => import("./_ssr/ssr.mjs")) };
globalThis.__nitro_vite_envs__ = services;
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/favicon.ico": {
		"type": "image/vnd.microsoft.icon",
		"etag": "\"4f95-3RXc3p2mhEAs1WBwaIvE0Y0uu0Y\"",
		"mtime": "2026-11-11T02:19:58.000Z",
		"size": 20373,
		"path": "../public/favicon.ico"
	},
	"/robots.txt": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"d8-FdGRds1JgvWGTEm4FbcxdliXDQo\"",
		"mtime": "2026-11-11T02:42:38.782Z",
		"size": 216,
		"path": "../public/robots.txt"
	},
	"/sitemap.xml": {
		"type": "application/xml",
		"etag": "\"6a7-bjBKImq47p5tM3ClrmMYQy9oLlY\"",
		"mtime": "2026-11-11T02:42:38.781Z",
		"size": 1703,
		"path": "../public/sitemap.xml"
	},
	"/assets/account-DlOIrsiM.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c41-4PVFE5FM8qKcVLz+ze1m90a5X+Q\"",
		"mtime": "2026-11-11T03:40:54.878Z",
		"size": 3137,
		"path": "../public/assets/account-DlOIrsiM.js"
	},
	"/assets/admin-DrMFuk7Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1624-ITBS0+kEGIpb5OWxYnWlRs38pl0\"",
		"mtime": "2026-11-11T03:40:54.885Z",
		"size": 5668,
		"path": "../public/assets/admin-DrMFuk7Q.js"
	},
	"/assets/autospec.model-DHSuW2J7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"64f-9LzYiNcO8qMWgNnBMUrT/Now3dE\"",
		"mtime": "2026-11-11T03:40:54.909Z",
		"size": 1615,
		"path": "../public/assets/autospec.model-DHSuW2J7.js"
	},
	"/assets/autospec-vehicle-C9k-HCOp.jpg": {
		"type": "image/jpeg",
		"etag": "\"24cd5-WQ1PCHE1ZyoVQadMLq9g0mKqbgE\"",
		"mtime": "2026-11-11T03:40:55.052Z",
		"size": 150741,
		"path": "../public/assets/autospec-vehicle-C9k-HCOp.jpg"
	},
	"/assets/autospec.functions-eP78-Eyr.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19de-smXw5wqxLkfQw6DDbF4o90uU5e8\"",
		"mtime": "2026-11-11T03:40:54.892Z",
		"size": 6622,
		"path": "../public/assets/autospec.functions-eP78-Eyr.js"
	},
	"/assets/book-open-text-CSWon68q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ac-sSrUzoRzjGnLqO9+HRPSsO5FzMg\"",
		"mtime": "2026-11-11T03:40:54.914Z",
		"size": 428,
		"path": "../public/assets/book-open-text-CSWon68q.js"
	},
	"/assets/button-C1HUJsPi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"7f60-oOhPZAicmaTtjLeN+40zqEod9Do\"",
		"mtime": "2026-11-11T03:40:54.919Z",
		"size": 32608,
		"path": "../public/assets/button-C1HUJsPi.js"
	},
	"/assets/createLucideIcon-Btarka3T.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ab-fe/o0wV57+7ejNM9RDMI8LaN81I\"",
		"mtime": "2026-11-11T03:40:54.937Z",
		"size": 1195,
		"path": "../public/assets/createLucideIcon-Btarka3T.js"
	},
	"/assets/card-CQDiOstR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"426-CVHFi38qKsf04aQzFmwO6ogW8YM\"",
		"mtime": "2026-11-11T03:40:54.933Z",
		"size": 1062,
		"path": "../public/assets/card-CQDiOstR.js"
	},
	"/assets/external-link-CNRhhIjU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"fb-YvaIksyPxLq4CzgE0SgeSaZhpXQ\"",
		"mtime": "2026-11-11T03:40:54.951Z",
		"size": 251,
		"path": "../public/assets/external-link-CNRhhIjU.js"
	},
	"/assets/gauge-BgBPCIZy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b0-RzmaIPbcR0qkvMJEwmLWwFQADig\"",
		"mtime": "2026-11-11T03:40:54.960Z",
		"size": 176,
		"path": "../public/assets/gauge-BgBPCIZy.js"
	},
	"/assets/file-text-B9H5bP5c.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"181-ohoM8ZWi50sH4GlPAlc98Mj/e+g\"",
		"mtime": "2026-11-11T03:40:54.956Z",
		"size": 385,
		"path": "../public/assets/file-text-B9H5bP5c.js"
	},
	"/assets/dist-DBBvjn0r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4103-CVLTBi4P8sePBr27Lbvc5k75r0M\"",
		"mtime": "2026-11-11T03:40:54.943Z",
		"size": 16643,
		"path": "../public/assets/dist-DBBvjn0r.js"
	},
	"/assets/guides-DoZMsIz_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"13c8-iuC/l9mKckaYNiiASHepwfy18Nw\"",
		"mtime": "2026-11-11T03:40:54.964Z",
		"size": 5064,
		"path": "../public/assets/guides-DoZMsIz_.js"
	},
	"/assets/input-bm6Dy7fb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"269-sZ+fiUz0AX/5VILA3eCw7K7ktkI\"",
		"mtime": "2026-11-11T03:40:54.971Z",
		"size": 617,
		"path": "../public/assets/input-bm6Dy7fb.js"
	},
	"/assets/login-BtwXnmGc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"851-xgQNThXpBO6DtoMhraRgNCw1a1I\"",
		"mtime": "2026-11-11T03:40:54.985Z",
		"size": 2129,
		"path": "../public/assets/login-BtwXnmGc.js"
	},
	"/assets/routes-SrFvF8o-.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"54ab-V47wZwl/aQORPo8Y4hHJktoTSPU\"",
		"mtime": "2026-11-11T03:40:54.991Z",
		"size": 21675,
		"path": "../public/assets/routes-SrFvF8o-.js"
	},
	"/assets/search-jyXtzxKb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae-qrdK4hs8NW+O3NYWnAvW5tuV/CY\"",
		"mtime": "2026-11-11T03:40:55.004Z",
		"size": 174,
		"path": "../public/assets/search-jyXtzxKb.js"
	},
	"/assets/select-hSDGYCQA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"117b3-6yTq8EClyfpM0UPrDnFUYLKgtk8\"",
		"mtime": "2026-11-11T03:40:55.008Z",
		"size": 71603,
		"path": "../public/assets/select-hSDGYCQA.js"
	},
	"/assets/shield-89Htyn2l.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"110-6akBJoH9VVFSsaZzSC7MB/lU4EA\"",
		"mtime": "2026-11-11T03:40:55.020Z",
		"size": 272,
		"path": "../public/assets/shield-89Htyn2l.js"
	},
	"/assets/jsx-runtime-ByaQ0wya.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2246-Gj4fxED/klRTPlxoTWmHhxgF1NQ\"",
		"mtime": "2026-11-11T03:40:54.976Z",
		"size": 8774,
		"path": "../public/assets/jsx-runtime-ByaQ0wya.js"
	},
	"/assets/index-CwBD3HZo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8f433-yAsV+7gTEEmMrOzZMtD1isBgBfE\"",
		"mtime": "2026-11-11T03:40:54.778Z",
		"size": 586803,
		"path": "../public/assets/index-CwBD3HZo.js"
	},
	"/assets/signup-DiEtkQOD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"85e-CXIjLOrzVFW8W5kkNCmEQRc9m/I\"",
		"mtime": "2026-11-11T03:40:55.025Z",
		"size": 2142,
		"path": "../public/assets/signup-DiEtkQOD.js"
	},
	"/assets/styles-CgegmWhq.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"15421-rVXnDoEe3JZ9BZadqQark7qcfbg\"",
		"mtime": "2026-11-11T03:40:55.054Z",
		"size": 87073,
		"path": "../public/assets/styles-CgegmWhq.css"
	},
	"/assets/vehicles-DEldny9O.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2075-n8TnT0rLbjl0UDkNpho9Uv5J6nA\"",
		"mtime": "2026-11-11T03:40:55.035Z",
		"size": 8309,
		"path": "../public/assets/vehicles-DEldny9O.js"
	},
	"/assets/wrench-Bbp-3Gr0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bb-rmjz9MnMgKE4GJGiGF20qvKEl6k\"",
		"mtime": "2026-11-11T03:40:55.043Z",
		"size": 699,
		"path": "../public/assets/wrench-Bbp-3Gr0.js"
	},
	"/assets/user-m32LW3xV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c4-daRNBOauGkJfBdnFvnjFCGyfyQU\"",
		"mtime": "2026-11-11T03:40:55.031Z",
		"size": 196,
		"path": "../public/assets/user-m32LW3xV.js"
	},
	"/assets/zap-eQ7JzBpj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"106-wimV8pz2BCRykyMSEZe4bz44t8Y\"",
		"mtime": "2026-11-11T03:40:55.048Z",
		"size": 262,
		"path": "../public/assets/zap-eQ7JzBpj.js"
	},
	"/assets/_slug-C_8DMa5B.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c26-8bNktXs5O3uXdTpIyPBLaTviA0s\"",
		"mtime": "2026-11-11T03:40:54.847Z",
		"size": 3110,
		"path": "../public/assets/_slug-C_8DMa5B.js"
	},
	"/assets/_tool-BSFcf-qa.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"469e-DzfftO04vbyJ37JIt8GRrAV4AAA\"",
		"mtime": "2026-11-11T03:40:54.854Z",
		"size": 18078,
		"path": "../public/assets/_tool-BSFcf-qa.js"
	},
	"/assets/_year-bP4yU-dj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"63e1-TKFJ8o1j9cZV34vL6hSzT3kzVCw\"",
		"mtime": "2026-11-11T03:40:54.864Z",
		"size": 25569,
		"path": "../public/assets/_year-bP4yU-dj.js"
	}
};
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_hfBHCr = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_hfBHCr
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
[].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new FastResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function useNitroHooks() {
	const nitroApp = useNitroApp();
	const hooks = nitroApp.hooks;
	if (hooks) return hooks;
	return nitroApp.hooks = new HookableCore();
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/_module-handler.mjs
function createHandler(hooks) {
	const nitroApp = useNitroApp();
	const nitroHooks = useNitroHooks();
	return {
		async fetch(request, env, context) {
			globalThis.__env__ = env;
			augmentReq(request, {
				env,
				context
			});
			const ctxExt = {};
			const url = new URL(request.url);
			if (hooks.fetch) {
				const res = await hooks.fetch(request, env, context, url, ctxExt);
				if (res) return res;
			}
			return await nitroApp.fetch(request);
		},
		scheduled(controller, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:scheduled", {
				controller,
				env,
				context
			}) || Promise.resolve());
		},
		email(message, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:email", {
				message,
				event: message,
				env,
				context
			}) || Promise.resolve());
		},
		queue(batch, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:queue", {
				batch,
				event: batch,
				env,
				context
			}) || Promise.resolve());
		},
		tail(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:tail", {
				traces,
				env,
				context
			}) || Promise.resolve());
		},
		trace(traces, env, context) {
			globalThis.__env__ = env;
			context.waitUntil(nitroHooks.callHook("cloudflare:trace", {
				traces,
				env,
				context
			}) || Promise.resolve());
		}
	};
}
function augmentReq(cfReq, ctx) {
	const req = cfReq;
	req.ip = cfReq.headers.get("cf-connecting-ip") || void 0;
	req.runtime ??= { name: "cloudflare" };
	req.runtime.cloudflare = {
		...req.runtime.cloudflare,
		...ctx
	};
	req.waitUntil = ctx.context?.waitUntil.bind(ctx.context);
}
//#endregion
//#region node_modules/nitro/dist/presets/cloudflare/runtime/cloudflare-module.mjs
var cloudflare_module_default = createHandler({ fetch(cfRequest, env, context, url) {
	if (env.ASSETS && isPublicAssetURL(url.pathname)) return env.ASSETS.fetch(cfRequest);
} });
//#endregion
export { cloudflare_module_default as default };

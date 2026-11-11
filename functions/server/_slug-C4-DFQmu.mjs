import { n as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { b as useParams, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { o as getPublishedArticles } from "./_ssr/autospec.functions-suH5Sbge.mjs";
import { O as Calendar, g as FileText, i as User } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_slug-C4-DFQmu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GuidePage() {
	const slug = useParams().slug;
	const [article, setArticle] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		setBusy(true);
		getPublishedArticles({ data: {} }).then((res) => {
			if (!active) return;
			const found = (res.data ?? []).find((a) => a.slug === slug);
			if (found) setArticle(found);
			else setError("Guide not found.");
			setError(res.error ?? "");
		}).catch(() => {
			if (active) setError("Unable to load guide.");
		}).finally(() => {
			if (active) setBusy(false);
		});
		return () => {
			active = false;
		};
	}, [slug]);
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-8 text-muted-foreground mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading guide…"
			})]
		})
	});
	if (error || !article) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-background p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl font-semibold",
				children: error || "Guide not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/guides",
					children: "Browse guides"
				})
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1 text-xs text-muted-foreground mb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/guides",
						className: "hover:text-primary",
						children: "Guides"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: article.title
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 mb-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] font-semibold text-muted-foreground uppercase",
							children: article.category
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-3xl font-bold tracking-tight mb-4",
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4 text-xs text-muted-foreground mb-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, { className: "size-3.5 mr-1" }), article.author ?? "AutoSpec Editorial"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, { className: "size-3.5 mr-1" }), article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "prose prose-sm text-muted-foreground leading-7",
						children: article.content.split("\n\n").map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-4",
							children: p
						}, i))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 pt-6 border-t border-border",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/guides",
								children: "← Back to guides"
							})
						})
					})
				]
			})]
		})
	});
}
//#endregion
export { GuidePage as component };

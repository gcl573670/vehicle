import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { o as getPublishedArticles } from "./autospec.functions-suH5Sbge.mjs";
import { A as Battery, b as Clock, g as FileText, h as Fuel, k as BookOpenText, r as Wrench, s as Shield, t as Zap } from "../_libs/lucide-react.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, t as Card } from "./card-D6Xq84JD.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/guides-Nh0_fHqQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GUIDE_CATEGORIES = [
	{
		id: "tire-care",
		label: "Tire care",
		icon: Clock,
		description: "Tire pressure, rotation, tread wear, and replacement."
	},
	{
		id: "battery-maintenance",
		label: "Battery maintenance",
		icon: Battery,
		description: "Group size, terminal care, testing, and replacement."
	},
	{
		id: "engine-oil",
		label: "Engine oil",
		icon: FileText,
		description: "Viscosity, specifications, capacity, and change intervals."
	},
	{
		id: "cooling-systems",
		label: "Cooling systems",
		icon: Zap,
		description: "Coolant type, capacity, and radiator maintenance."
	},
	{
		id: "brakes",
		label: "Brakes",
		icon: Shield,
		description: "Brake pad, rotor, and fluid maintenance."
	},
	{
		id: "spark-plugs",
		label: "Spark plugs",
		icon: FileText,
		description: "Part numbers, gaps, heat ranges, and replacement."
	},
	{
		id: "wipers",
		label: "Wipers",
		icon: Wrench,
		description: "Blade sizes, fitment, and replacement."
	},
	{
		id: "vehicle-maintenance",
		label: "Vehicle maintenance",
		icon: Wrench,
		description: "General maintenance schedules and best practices."
	},
	{
		id: "fuel-economy",
		label: "Fuel economy",
		icon: Fuel,
		description: "MPG, fuel types, and efficiency tips."
	},
	{
		id: "ev-ownership",
		label: "EV ownership",
		icon: Zap,
		description: "Charging, range, and EV maintenance."
	}
];
function GuidesPage() {
	const [articles, setArticles] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		setBusy(true);
		getPublishedArticles({ data: {} }).then((res) => {
			if (!active) return;
			setArticles(res.data ?? []);
			setError(res.error ?? "");
		}).finally(() => {
			if (active) setBusy(false);
		});
		return () => {
			active = false;
		};
	}, []);
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { className: "size-8 text-muted-foreground mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading guides…"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold tracking-tight",
						children: "Guides"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Practical automotive maintenance and ownership guides. All guides are reviewed before publishing."
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5",
					children: GUIDE_CATEGORIES.map((cat) => {
						const catArticles = articles.filter((a) => a.category === cat.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: "flex flex-col group hover:bg-secondary/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, {
									className: "pb-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(cat.icon, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold",
											children: cat.label
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-[11px] text-muted-foreground",
										children: cat.description
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
									className: "flex-1 pt-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											catArticles.length,
											" article",
											catArticles.length !== 1 ? "s" : "",
											" available"
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, {
									className: "pt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "outline",
										size: "sm",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/guides",
											className: "w-full text-[11px]",
											children: ["Browse ", cat.label]
										})
									})
								})
							]
						}, cat.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Latest guides"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
						children: [articles.slice(0, 6).map((article) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							className: "hover:bg-secondary/50 transition-colors",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
								className: "pt-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] font-semibold text-muted-foreground uppercase",
											children: article.category
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
										className: "text-sm",
										children: article.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted-foreground line-clamp-2",
										children: [article.content.slice(0, 120), "…"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-[10px] text-muted-foreground",
											children: article.published_at ? new Date(article.published_at).toLocaleDateString() : "—"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											variant: "link",
											size: "sm",
											asChild: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: `/guides/${article.slug}`,
												children: "Read more"
											})
										})]
									})
								]
							})
						}, article.id)), articles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "col-span-full py-8 text-center text-sm text-muted-foreground",
							children: "No published guides yet. Check back soon."
						})]
					})]
				})
			]
		})
	});
}
//#endregion
export { GuidesPage as component };

import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Activity, a as TriangleAlert, g as FileText, l as Settings, p as List, s as Shield, y as Database } from "../_libs/lucide-react.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-D6Xq84JD.mjs";
import { t as supabase } from "./client-9Lv_B3m8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-DfGr_HWv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_SECTIONS = [
	{
		label: "Vehicles",
		href: "/admin/vehicles",
		icon: Database,
		description: "View and manage vehicle records"
	},
	{
		label: "Engines",
		href: "/admin/engines",
		icon: Settings,
		description: "Manage engine catalog"
	},
	{
		label: "Specifications",
		href: "/admin/specifications",
		icon: FileText,
		description: "Manage technical specifications"
	},
	{
		label: "Parts & Compatibility",
		href: "/admin/parts",
		icon: List,
		description: "Manage parts and fitment"
	},
	{
		label: "Maintenance",
		href: "/admin/maintenance",
		icon: Activity,
		description: "Manage maintenance schedules"
	},
	{
		label: "Fluids & Tires",
		href: "/admin/fluids-tires",
		icon: Settings,
		description: "Manage fluid and tire data"
	},
	{
		label: "Recalls",
		href: "/admin/recalls",
		icon: TriangleAlert,
		description: "Manage recall records"
	},
	{
		label: "Articles & Guides",
		href: "/admin/articles",
		icon: FileText,
		description: "Manage guides and articles"
	},
	{
		label: "Data Sources",
		href: "/admin/sources",
		icon: Shield,
		description: "Manage data source registry"
	},
	{
		label: "Import Logs",
		href: "/admin/imports",
		icon: List,
		description: "View data import history"
	},
	{
		label: "API Health",
		href: "/admin/api-health",
		icon: Activity,
		description: "Monitor external API health"
	}
];
function AdminDashboard() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let active = true;
		supabase.auth.getSession().then(({ data }) => {
			if (!active) return;
			setSession(data.session);
			setBusy(false);
		});
		return () => {
			active = false;
		};
	}, []);
	if (busy) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20 flex items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading admin dashboard…" })]
			})
		})
	});
	if (!session) {
		window.location.href = "/login";
		return null;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold tracking-tight",
						children: "Admin Dashboard"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Manage vehicle data, specifications, parts, and content. All changes are audited with user, timestamp, and source."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							className: "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-xs font-semibold border border-green/20",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 shrink-0 rounded-full bg-green" }), "System operational"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline",
							children: ["Visit site ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: ADMIN_SECTIONS.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "hover:bg-secondary/50 transition-colors group",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
							className: "pb-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(section.icon, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
									className: "text-sm",
									children: section.label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, {
									className: "text-[10px]",
									children: section.description
								})] })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								className: "w-full text-[11px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: section.href,
									children: "Open"
								})
							})
						})]
					}, section.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-semibold mb-4",
						children: "Quick actions"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								className: "text-[11px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/imports",
									children: "Import CSV/JSON dataset"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								className: "text-[11px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/sources",
									children: "Manage data sources"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								className: "text-[11px]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/admin/api-health",
									children: "Check API health"
								})
							})
						]
					})]
				})
			]
		})
	});
}
function Badge({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className,
		children
	});
}
//#endregion
export { AdminDashboard as component };

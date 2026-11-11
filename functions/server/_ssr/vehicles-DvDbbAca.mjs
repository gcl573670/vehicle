import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as buttonVariants, r as cn, t as Button } from "./button-PwNqyxv_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as getVehicleMakes, g as searchVehicles } from "./autospec.functions-suH5Sbge.mjs";
import { T as ChevronLeft, u as Search, v as Ellipsis, w as ChevronRight } from "../_libs/lucide-react.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/vehicles-DvDbbAca.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
function VehicleDatabasePage() {
	const [search, setSearch] = (0, import_react.useState)("");
	const [year, setYear] = (0, import_react.useState)("");
	const [make, setMake] = (0, import_react.useState)("");
	const [market, setMarket] = (0, import_react.useState)("US");
	const [vehicles, setVehicles] = (0, import_react.useState)([]);
	const [makes, setMakes] = (0, import_react.useState)([]);
	const [total, setTotal] = (0, import_react.useState)(0);
	const [page, setPage] = (0, import_react.useState)(1);
	const [pageSize] = (0, import_react.useState)(20);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [searchParams] = useSearchParams();
	(0, import_react.useEffect)(() => {
		const y = searchParams.get("year");
		const m = searchParams.get("make");
		const mod = searchParams.get("model");
		const mk = searchParams.get("market");
		if (y) setYear(y);
		if (m) setMake(m);
		if (mod) setSearch(mod);
		if (mk) setMarket(mk);
	}, [searchParams]);
	(0, import_react.useEffect)(() => {
		let active = true;
		setBusy(true);
		getVehicleMakes({ data: { market } }).then((res) => {
			if (!active) return;
			setMakes(res.data ?? []);
			setError(res.error ?? "");
		}).finally(() => {
			if (active) setBusy(false);
		});
		return () => {
			active = false;
		};
	}, [market]);
	(0, import_react.useEffect)(() => {
		let active = true;
		setBusy(true);
		searchVehicles({ data: {
			year: year ? Number(year) : void 0,
			make: make || void 0,
			model: search || void 0,
			market,
			page,
			pageSize
		} }).then((res) => {
			if (!active) return;
			if (res.data) {
				setVehicles(res.data.vehicles);
				setTotal(res.data.total);
			}
			setError(res.error ?? "");
		}).catch(() => {
			if (active) setError("Unable to load vehicles at this time.");
		}).finally(() => {
			if (active) setBusy(false);
		});
		return () => {
			active = false;
		};
	}, [
		year,
		make,
		search,
		market,
		page,
		pageSize
	]);
	const totalPages = Math.ceil(total / pageSize);
	if (busy && vehicles.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-col items-center justify-center text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Loading vehicles…" })]
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-3xl font-bold tracking-tight",
						children: "Vehicle Database"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Search and browse verified vehicle records by year, make, model, and market."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "text",
							placeholder: "Search make, model…",
							value: search,
							onChange: (e) => {
								setSearch(e.target.value);
								setPage(1);
							},
							className: "h-11 rounded-md border border-input bg-background px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => setPage(1),
							children: "Search"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid gap-4 lg:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "autospec-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-semibold text-foreground/80",
								children: "Year"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: year || void 0,
								onValueChange: (v) => {
									setYear(v);
									setPage(1);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-11 rounded-md border-border bg-background px-3.5 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Any year" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: Array.from({ length: (/* @__PURE__ */ new Date()).getFullYear() - 1983 }, (_, i) => (/* @__PURE__ */ new Date()).getFullYear() - i).map((y) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: String(y),
									children: y
								}, y)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "autospec-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-semibold text-foreground/80",
								children: "Make"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: make || void 0,
								onValueChange: (v) => {
									setMake(v);
									setPage(1);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-11 rounded-md border-border bg-background px-3.5 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: busy && !make ? "Loading makes…" : "Any make" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: makes.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: m,
									children: m
								}, m)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "autospec-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-[11px] font-semibold text-foreground/80",
								children: "Market"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
								value: market || void 0,
								onValueChange: (v) => {
									setMarket(v);
									setPage(1);
									setMakes([]);
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
									className: "h-11 rounded-md border-border bg-background px-3.5 text-sm",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: market })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: [
									"US",
									"CA",
									"MX",
									"EU",
									"UK",
									"AU",
									"JP"
								].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
									value: m,
									children: m
								}, m)) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-end",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => {
									setYear("");
									setMake("");
									setSearch("");
									setPage(1);
								},
								children: "Reset"
							})
						})
					]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 p-3 rounded-md border border-destructive/20 bg-destructive/5 text-destructive text-sm",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 overflow-x-auto",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
						className: "w-full text-left border-collapse",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Year"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Make"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Model"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Trim"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider",
									children: "Market"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "pb-3 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider text-right",
									children: "Action"
								})
							]
						}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tbody", { children: [vehicles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							colSpan: 6,
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "No vehicles match your search."
						}) }), vehicles.map((vehicle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-border/50 hover:bg-secondary/50 transition-colors",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-sm font-medium text-foreground",
									children: vehicle.year
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-sm text-foreground",
									children: vehicle.make
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-sm text-foreground",
									children: vehicle.model
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-sm text-muted-foreground",
									children: vehicle.trim ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-sm text-muted-foreground",
									children: vehicle.market
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "py-4 text-right",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: {
											to: "/cars/$makeSlug/$modelSlug/$year",
											params: {
												makeSlug: vehicle.make.toLowerCase().replace(/\s+/g, "-"),
												modelSlug: vehicle.model.toLowerCase().replace(/\s+/g, "-"),
												year: String(vehicle.year)
											}
										},
										className: "text-sm font-semibold text-primary hover:underline",
										children: ["View details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 inline ml-1" })]
									})
								})
							]
						}, vehicle.id))] })]
					})
				}),
				total > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Showing ",
							vehicles.length,
							" of ",
							total,
							" vehicles"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
						onClick: () => setPage((p) => Math.max(p - 1, 1)),
						disabled: page === 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
						onClick: () => setPage((p) => Math.min(p + 1, totalPages)),
						disabled: page === totalPages
					})] }) })]
				})
			]
		})
	});
}
//#endregion
export { VehicleDatabasePage as component };

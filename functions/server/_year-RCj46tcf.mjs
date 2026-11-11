import { n as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { t as cva } from "./_libs/class-variance-authority+clsx.mjs";
import { r as cn, t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { b as useParams, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { c as getVehicleBySlug, f as getVehicleParts, h as getVehicleTires, l as getVehicleFluids, m as getVehicleSpecifications, s as getRecallsByVehicle, u as getVehicleMaintenance } from "./_ssr/autospec.functions-suH5Sbge.mjs";
import { _ as ExternalLink, m as Gauge } from "./_libs/lucide-react.mjs";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./_ssr/card-D6Xq84JD.mjs";
import { i as TabsTrigger$1, n as TabsContent$1, r as TabsList$1, t as Tabs$1 } from "./_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_year-RCj46tcf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Tabs$1;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsList$1, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = TabsList$1.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger$1, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = TabsTrigger$1.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent$1, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = TabsContent$1.displayName;
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var CONFIDENCE_CONFIG = {
	manufacturer_verified: {
		label: "Manufacturer verified",
		variant: "default",
		description: "Sourced directly from the vehicle manufacturer."
	},
	official_government_source: {
		label: "Official government source",
		variant: "secondary",
		description: "Sourced from NHTSA or U.S. EPA records."
	},
	verified_third_party_source: {
		label: "Verified third-party source",
		variant: "outline",
		description: "Independently confirmed from an attributable source."
	},
	community_unverified: {
		label: "Community submitted — unverified",
		variant: "outline",
		description: "Submitted by the community; not yet verified."
	},
	not_available: {
		label: "Not verified yet",
		variant: "secondary",
		description: "No trusted source is available for this configuration."
	}
};
function ConfidenceBadge({ status, showDescription = false }) {
	const config = CONFIDENCE_CONFIG[status] ?? CONFIDENCE_CONFIG.not_available;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "flex items-center gap-2 whitespace-nowrap",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
			variant: config.variant,
			size: "sm",
			children: config.label
		}), showDescription && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[10px] text-muted-foreground leading-none",
			children: config.description
		})]
	});
}
function SourceCitation({ sourceName, sourceUrl, sourceId, retrievedAt }) {
	if (!Boolean(sourceName || sourceUrl)) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-1.5 text-[10px] leading-4 text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Source, { className: "size-3.5" }),
			sourceName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [sourceName, sourceUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: {
					to: "/tools/source-detail",
					params: {}
				},
				asChild: false,
				href: sourceUrl,
				target: "_blank",
				rel: "noreferrer noopener",
				className: "inline text-primary underline underline-offset-4 hover:text-primary/80",
				children: ["source ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 inline ml-0.5" })]
			})] }),
			retrievedAt && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· retrieved ", new Date(retrievedAt).toLocaleDateString()] })
		]
	});
}
var Table = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "relative w-full overflow-auto",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("table", {
		ref,
		className: cn("w-full caption-bottom text-sm", className),
		...props
	})
}));
Table.displayName = "Table";
var TableHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
	ref,
	className: cn("[&_tr]:border-b", className),
	...props
}));
TableHeader.displayName = "TableHeader";
var TableBody = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
	ref,
	className: cn("[&_tr:last-child]:border-0", className),
	...props
}));
TableBody.displayName = "TableBody";
var TableFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tfoot", {
	ref,
	className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
	...props
}));
TableFooter.displayName = "TableFooter";
var TableRow = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
	ref,
	className: cn("border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className),
	...props
}));
TableRow.displayName = "TableRow";
var TableHead = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
	ref,
	className: cn("h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableHead.displayName = "TableHead";
var TableCell = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
	ref,
	className: cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className),
	...props
}));
TableCell.displayName = "TableCell";
var TableCaption = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("caption", {
	ref,
	className: cn("mt-4 text-sm text-muted-foreground", className),
	...props
}));
TableCaption.displayName = "TableCaption";
function SpecificationTable({ specifications, category, marketFilter, title, showEmptyState = true }) {
	const filtered = specifications.filter((spec) => {
		if (category && spec.specification_category !== category) return false;
		if (marketFilter && spec.market !== marketFilter) return false;
		return true;
	});
	if (filtered.length === 0) {
		if (!showEmptyState) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md border border-border bg-background p-4 text-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "No sourced specifications available for this selection."
			})
		});
	}
	const byCategory = /* @__PURE__ */ new Map();
	for (const spec of filtered) {
		const group = byCategory.get(spec.specification_category) ?? [];
		group.push(spec);
		byCategory.set(spec.specification_category, group);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-sm font-semibold text-foreground",
			children: title
		}), Array.from(byCategory.entries()).map(([catName, specs]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "rounded-md border border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-1/3 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Specification"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-1/3 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Value"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-1/6 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Market"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
					className: "w-1/6 text-left text-[11px] uppercase tracking-wider text-muted-foreground",
					children: "Source"
				})
			] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: specs.map((spec) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground",
					children: spec.specification_name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm font-medium text-foreground text-right",
					children: spec.value ? `${spec.value}${spec.unit ? " " + spec.unit : ""}` : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Not specified"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-muted-foreground text-right",
					children: spec.market
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					className: "text-sm text-right",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-end gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, {
							status: spec.confidence_status,
							showDescription: false
						}), spec.source_name || spec.source_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCitation, {
							sourceName: spec.source_name ?? void 0,
							sourceUrl: spec.source_url ?? void 0,
							retrievedAt: spec.retrieved_at ?? void 0
						}) : null]
					})
				})
			] }, spec.specification_name + spec.market)) })] })
		}, catName))]
	});
}
function slugify(s) {
	return s.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
function VehiclePage() {
	const params = useParams();
	const makeSlug = params.makeSlug;
	const modelSlug = params.modelSlug;
	const year = params.year;
	const [vehicle, setVehicle] = (0, import_react.useState)(null);
	const [specifications, setSpecifications] = (0, import_react.useState)([]);
	const [maintenance, setMaintenance] = (0, import_react.useState)([]);
	const [parts, setParts] = (0, import_react.useState)([]);
	const [tires, setTires] = (0, import_react.useState)([]);
	const [fluids, setFluids] = (0, import_react.useState)([]);
	const [recalls, setRecalls] = (0, import_react.useState)([]);
	const [busy, setBusy] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("overview");
	const loadVehicle = (0, import_react.useCallback)(async () => {
		setBusy(true);
		setError("");
		try {
			const vResp = await getVehicleBySlug({ data: { slug: `${makeSlug}-${modelSlug}-${year}` } });
			if (vResp.data) setVehicle(vResp.data);
			else if (vResp.error) setError(vResp.error);
			if (!vResp.data) {
				const altSlug = `${slugify(makeSlug)}-${slugify(modelSlug)}-${year}`;
				const vResp2 = await getVehicleBySlug({ data: { slug: altSlug } });
				if (vResp2.data) setVehicle(vResp2.data);
				else if (vResp2.error) setError(vResp2.error);
			}
			if (vehicle?.id) {
				const [specResp, maintResp, partsResp, tiresResp, fluidsResp, recallResp] = await Promise.all([
					getVehicleSpecifications({ data: { vehicleId: vehicle.id } }),
					getVehicleMaintenance({ data: { vehicleId: vehicle.id } }),
					getVehicleParts({ data: { vehicleId: vehicle.id } }),
					getVehicleTires({ data: { vehicleId: vehicle.id } }),
					getVehicleFluids({ data: { vehicleId: vehicle.id } }),
					getRecallsByVehicle({ data: { vehicleId: vehicle.id } })
				]);
				if (specResp.data) setSpecifications(specResp.data);
				if (maintResp.data) setMaintenance(maintResp.data);
				if (partsResp.data) setParts(partsResp.data);
				if (tiresResp.data) setTires(tiresResp.data);
				if (fluidsResp.data) setFluids(fluidsResp.data);
				if (recallResp.data) setRecalls(recallResp.data);
			}
		} catch {
			setError("Unable to load vehicle details.");
		} finally {
			setBusy(false);
		}
	}, [
		makeSlug,
		modelSlug,
		year,
		vehicle?.id
	]);
	(0, import_react.useEffect)(() => {
		loadVehicle();
	}, [loadVehicle]);
	if (busy && !vehicle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center justify-center text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gauge, { className: "size-8 text-muted-foreground mb-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading vehicle details…"
			})]
		})
	});
	if (error || !vehicle) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-background p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: error || "Vehicle not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: [
						"No matching vehicle record for ",
						year,
						" ",
						makeSlug.replace(/-/g, " "),
						" ",
						modelSlug.replace(/-/g, " "),
						"."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => window.location.href = "/vehicles",
					children: "Browse vehicle database"
				})
			]
		})
	});
	const hasSpecs = specifications.length > 0;
	const hasMaintenance = maintenance.length > 0;
	const hasParts = parts.length > 0;
	const hasTires = tires.length > 0;
	const hasFluids = fluids.length > 0;
	const hasRecalls = recalls.length > 0;
	const fullLabel = `${vehicle.year} ${vehicle.make} ${vehicle.model}${vehicle.trim ? ` ${vehicle.trim}` : ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1 text-xs text-muted-foreground mb-6",
				"aria-label": "Breadcrumb",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "hover:text-primary",
						children: "Home"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/vehicles",
						className: "hover:text-primary",
						children: "Vehicle Database"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: vehicle.year
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: vehicle.make
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: vehicle.model
					}),
					vehicle.trim && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: vehicle.trim
					})] })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col lg:flex-row gap-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "lg:w-1/3 flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
							className: "text-lg",
							children: fullLabel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, {
							className: "text-sm",
							children: [
								vehicle.market,
								" market · ",
								vehicle.vehicle_type ?? "Vehicle"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, {
							className: "pt-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-3 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: "Body:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.body_style ?? "Not specified" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: "Drivetrain:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.drivetrain ?? "Not specified" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: "Transmission:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.transmission ?? "Not specified" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: "Fuel:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.fuel_type ?? "Not specified" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium text-muted-foreground",
											children: "Engine:"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: vehicle.engine?.engine_code ?? vehicle.engine?.displacement ? `${vehicle.engine.displacement}L` : "Not specified" })]
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setActiveTab("specifications"),
								children: "Specifications"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setActiveTab("maintenance"),
								children: "Maintenance"
							})]
						}) })
					] }), hasTires && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "text-sm font-semibold",
						children: "Tire Pressure"
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2 text-sm",
						children: tires.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between pb-2 border-b border-border/50 last:border-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: t.tire_position
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-right",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium",
										children: [t.pressure_value, t.pressure_unit ? " " + t.pressure_unit : ""]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs text-muted-foreground block",
										children: t.tire_size ?? ""
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { status: t.confidence_status })
							]
						}, t.id))
					}) })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: activeTab,
						onValueChange: setActiveTab,
						className: "w-full",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "w-full",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "overview",
										children: "Overview"
									}),
									hasSpecs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "specifications",
										children: "Specifications"
									}),
									hasMaintenance && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "maintenance",
										children: "Maintenance"
									}),
									hasParts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "parts",
										children: "Parts & Compatibility"
									}),
									hasFluids && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "fluids",
										children: "Fluids & Capacities"
									}),
									hasRecalls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
										value: "recalls",
										children: "Recalls & Safety"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "overview",
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "grid gap-4 md:grid-cols-3",
									children: [
										{
											label: "Year",
											value: String(vehicle.year)
										},
										{
											label: "Make",
											value: vehicle.make
										},
										{
											label: "Model",
											value: vehicle.model
										},
										{
											label: "Trim",
											value: vehicle.trim ?? "—"
										},
										{
											label: "Market",
											value: vehicle.market
										},
										{
											label: "Body Style",
											value: vehicle.body_style ?? "—"
										},
										{
											label: "Drivetrain",
											value: vehicle.drivetrain ?? "—"
										},
										{
											label: "Transmission",
											value: vehicle.transmission ?? "—"
										},
										{
											label: "Fuel Type",
											value: vehicle.fuel_type ?? "—"
										}
									].map(({ label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "p-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-wider text-muted-foreground",
											children: label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm font-semibold",
											children: value
										})]
									}, label))
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-8",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Select a tab above to view specifications, maintenance, parts compatibility, fluids, and recall information for this vehicle. Data shown is sourced from verified records where available."
									})
								})]
							}),
							hasSpecs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "specifications",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecificationTable, {
									specifications,
									title: "Technical Specifications"
								})
							}),
							hasMaintenance && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
								value: "maintenance",
								className: "mt-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: maintenance.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm",
													children: item.item_name
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { status: item.confidence_status })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4 text-sm text-muted-foreground mb-2",
												children: [
													item.interval_distance && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.interval_distance, " mi"] }),
													item.interval_time_months && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.interval_time_months, " months"] }),
													item.conditions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.conditions })
												]
											}),
											item.instructions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: item.instructions
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCitation, {
												sourceName: item.source_name,
												sourceUrl: item.source_url
											})
										]
									}, item.id))
								}), maintenance.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "No maintenance records available."
								})]
							}),
							hasParts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "parts",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: parts.map((p) => {
										const part = p.parts ?? {};
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
											className: "p-4",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between mb-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "font-semibold text-sm",
														children: part.product_name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { status: p.confidence_status })]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center gap-4 text-sm text-muted-foreground mb-2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part.part_category }),
														part.manufacturer && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", part.manufacturer] }),
														part.part_number && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", part.part_number] })
													]
												}),
												part.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-xs text-muted-foreground",
													children: part.description
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCitation, {
													sourceName: p.source_name,
													sourceUrl: p.source_url
												}),
												part.external_url && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
													href: part.external_url,
													target: "_blank",
													rel: "noreferrer noopener",
													className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary",
													children: ["View part ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
												}),
												part.affiliate_relationship && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 text-[10px] text-muted-foreground",
													children: ["Affiliate link: ", part.affiliate_relationship]
												})
											]
										}, p.id);
									})
								})
							}),
							hasFluids && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "fluids",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: fluids.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm",
													children: f.fluid_type
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfidenceBadge, { status: f.confidence_status })]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-4 text-sm text-muted-foreground mb-2",
												children: [
													f.specification && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: f.specification }),
													f.capacity && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
														f.capacity,
														" ",
														f.capacity_unit
													] }),
													f.recommended_product_type && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", f.recommended_product_type] })
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceCitation, {
												sourceName: f.source_name,
												sourceUrl: f.source_url
											})
										]
									}, f.id))
								})
							}),
							hasRecalls && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "recalls",
								className: "mt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "space-y-4",
									children: recalls.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
										className: "p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center justify-between mb-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "font-semibold text-sm",
													children: r.campaign_number
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-xs font-semibold text-destructive",
													children: "Safety Recall"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm text-muted-foreground mb-2",
												children: r.summary
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap gap-2 text-xs text-muted-foreground mb-2",
												children: [r.component && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.component }), r.report_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", new Date(r.report_date).toLocaleDateString()] })]
											}),
											r.remedy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-sm",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Remedy:" }),
													" ",
													r.remedy
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-xs text-muted-foreground",
												children: "This is a model-year recall history, not individual VIN repair status. Confirm at NHTSA."
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
												href: "https://www.nhtsa.gov/recalls",
												target: "_blank",
												rel: "noreferrer noopener",
												className: "mt-2 inline-flex items-center gap-1 text-xs font-semibold text-primary",
												children: ["Confirm at NHTSA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
											})
										]
									}, r.campaign_number))
								})
							})
						]
					})
				})]
			})]
		})
	});
}
//#endregion
export { VehiclePage as component };

import { n as __toESM } from "./_runtime.mjs";
import { u as require_react } from "./_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { r as cn, t as Button } from "./_ssr/button-PwNqyxv_.mjs";
import { b as useParams, y as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { n as getEpaFuelPrices, p as getVehicleRecalls, t as decodeVin } from "./_ssr/autospec.functions-suH5Sbge.mjs";
import { A as Battery, S as CircleGauge, _ as ExternalLink, c as ShieldAlert, f as MapPin, h as Fuel, m as Gauge, o as Sparkles, r as Wrench, t as Zap, u as Search } from "./_libs/lucide-react.mjs";
import { a as CardHeader, n as CardContent, o as CardTitle, t as Card } from "./_ssr/card-D6Xq84JD.mjs";
import { r as isValidVin, t as calculateFuelCost } from "./_ssr/autospec.model-BD7PEZCG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_tool-_bXVXp-I.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOOLS = {
	"tire-pressure": {
		title: "Tire Pressure Lookup",
		description: "Verified front and rear tire pressure specifications with PSI, kPa, and bar conversions.",
		category: "Specifications",
		icon: Gauge,
		path: "/cars/$makeSlug/$modelSlug/$year/tire-pressure"
	},
	"wiper-blades": {
		title: "Wiper Blade Finder",
		description: "Driver, passenger, and rear blade lengths with fitment source and confidence.",
		category: "Parts & Fitment",
		icon: Sparkles,
		path: "/cars/$makeSlug/$modelSlug/$year/wiper-blades"
	},
	"battery-compatibility": {
		title: "Battery Compatibility Finder",
		description: "Verified battery group size, dimensions, terminal layout, polarity, and CCA.",
		category: "Parts & Fitment",
		icon: Battery,
		path: "/cars/$makeSlug/$modelSlug/$year/battery"
	},
	"oil-and-coolant": {
		title: "Oil & Coolant Reference",
		description: "Engine-specific oil viscosity, capacity, and coolant specifications.",
		category: "Fluids",
		icon: CircleGauge,
		path: "/cars/$makeSlug/$modelSlug/$year/oil-coolant"
	},
	"maintenance-schedule": {
		title: "Maintenance Schedule",
		description: "Time and distance service intervals with normal and severe driving conditions.",
		category: "Maintenance",
		icon: Wrench,
		path: "/cars/$makeSlug/$modelSlug/$year/maintenance"
	},
	"fuel-cost-calculator": {
		title: "Fuel Cost Calculator",
		description: "Calculate estimated fuel consumption and trip cost from EPA fuel-economy data.",
		category: "Calculators",
		icon: Fuel,
		path: "/tools/fuel-cost-calculator"
	},
	"recall-checker": {
		title: "Recall Checker",
		description: "NHTSA recall campaigns by vehicle or VIN with campaign numbers and remedies.",
		category: "Safety",
		icon: ShieldAlert,
		path: "/tools/recall-checker"
	},
	"vin-decoder": {
		title: "VIN Decoder",
		description: "Decode a 17-character VIN through the official NHTSA vPIC API.",
		category: "Identification",
		icon: Search,
		path: "/tools/vin-decoder"
	},
	"ev-charging": {
		title: "EV Charging Station Locator",
		description: "Find public EV charging stations with connector types and operator details.",
		category: "EV",
		icon: Zap,
		path: "/tools/ev-charging"
	},
	"specifications": {
		title: "Vehicle Specifications Browser",
		description: "Browse technical specifications across the vehicle catalog.",
		category: "Reference",
		icon: MapPin,
		path: "/tools/specifications"
	},
	"parts-compatibility": {
		title: "Parts Compatibility Browser",
		description: "Search compatible parts by vehicle and part category.",
		category: "Parts & Fitment",
		icon: Battery,
		path: "/tools/parts-compatibility"
	}
};
function ToolPage() {
	const toolSlug = useParams().tool ?? "";
	const tool = TOOLS[toolSlug];
	if (!tool) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "autospec-container py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-xl border border-border bg-background p-8 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-xl font-semibold",
					children: "Tool not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The requested tool does not exist."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						children: "Return home"
					})
				})
			]
		})
	});
	if (tool.path.startsWith("/cars/")) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "min-h-screen bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "autospec-container py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "flex items-center gap-1 text-xs text-muted-foreground mb-6",
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
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: "Tools"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "/"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-foreground",
						children: tool.title
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "max-w-3xl",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCategory, {
								className: "inline-flex items-center gap-1.5 text-[11px] font-semibold text-primary mb-2",
								children: tool.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-bold tracking-tight",
								children: tool.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: tool.description
							})
						]
					}),
					toolSlug === "fuel-cost-calculator" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FuelCostCalculator, {}),
					toolSlug === "vin-decoder" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VINDecoderTool, {}),
					toolSlug === "recall-checker" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecallCheckerTool, {}),
					toolSlug === "ev-charging" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EVChargingTool, {}),
					toolSlug === "specifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpecificationsBrowserTool, {}),
					toolSlug === "parts-compatibility" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartsBrowserTool, {}),
					![
						"fuel-cost-calculator",
						"vin-decoder",
						"recall-checker",
						"ev-charging",
						"specifications",
						"parts-compatibility"
					].includes(toolSlug) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-background p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(tool.icon, { className: "size-12 text-primary mb-4" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-lg font-semibold",
								children: tool.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: tool.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-xs text-muted-foreground/70",
								children: "Please select a vehicle first to use this tool."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								mt: 6,
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									children: "Select your vehicle"
								})
							})
						]
					})
				]
			})]
		})
	});
}
function BadgeCategory({ children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-md bg-primary/10 px-2 py-0.5", className),
		children
	});
}
function FuelCostCalculator() {
	const [distance, setDistance] = (0, import_react.useState)("");
	const [distanceUnit, setDistanceUnit] = (0, import_react.useState)("miles");
	const [economy, setEconomy] = (0, import_react.useState)(null);
	const [economyUnit, setEconomyUnit] = (0, import_react.useState)("mpg");
	const [price, setPrice] = (0, import_react.useState)("");
	const [priceUnit, setPriceUnit] = (0, import_react.useState)("gallon");
	const [fuelPrices, setFuelPrices] = (0, import_react.useState)({});
	const [result, setResult] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let active = true;
		setBusy(true);
		getEpaFuelPrices().then((res) => {
			if (!active) return;
			setFuelPrices(res.data ?? {});
			setError(res.error ?? "");
		}).finally(() => {
			if (active) setBusy(false);
		});
		return () => {
			active = false;
		};
	}, []);
	const calculate = () => {
		const d = Number(distance);
		const p = Number(price);
		if (!economy || !d || !p || d <= 0 || p < 0) {
			setResult(null);
			return;
		}
		const r = calculateFuelCost({
			distance: d,
			distanceUnit,
			economy,
			economyUnit,
			price: p,
			priceUnit
		});
		setResult(r);
	};
	fuelPrices["regular"] ?? fuelPrices["gasoline"];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Fuel Cost Calculator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Estimate fuel consumption and cost for a trip. Based on U.S. EPA fuel-economy data; actual consumption varies." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "pt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Distance"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: distance,
								onChange: (e) => {
									setDistance(e.target.value);
									calculate();
								},
								className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setDistanceUnit(distanceUnit === "miles" ? "kilometers" : "miles"),
								children: distanceUnit === "miles" ? "km" : "mi"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Fuel economy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								value: economy ? String(economy) : "",
								onChange: (e) => {
									setEconomy(Number(e.target.value) || null);
									calculate();
								},
								className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									setEconomyUnit(economyUnit === "mpg" ? "l100km" : economyUnit === "l100km" ? "kml" : "mpg");
								},
								children: economyUnit === "mpg" ? "L/100km" : economyUnit === "l100km" ? "km/L" : "MPG"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-semibold text-muted-foreground",
								children: "Fuel price"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								step: "0.01",
								value: price,
								onChange: (e) => {
									setPrice(e.target.value);
									calculate();
								},
								className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => setPriceUnit(priceUnit === "gallon" ? "liter" : "gallon"),
								children: priceUnit === "gallon" ? "L" : "gal"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-col gap-2 justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							size: "sm",
							onClick: () => {
								setEconomy(null);
								calculate();
							},
							disabled: !economy,
							children: "Use EPA data"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 pt-6 border-t border-border",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Estimated fuel cost"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: result ? `$${result.cost.toFixed(2)}` : "—"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between text-sm mt-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: "Estimated fuel used"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-foreground",
						children: result ? `${result.fuelLiters.toFixed(1)} L` : "—"
					})]
				})]
			}),
			fuelPrices["regular"] && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted-foreground",
				children: [
					"Reference U.S. regular gasoline price: $",
					fuelPrices["regular"].toFixed(2),
					"/gal (EPA FuelEconomy.gov)."
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs text-destructive",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-[10px] text-muted-foreground/70",
				children: "Actual fuel consumption varies by driving conditions, vehicle load, and maintenance."
			})
		]
	})] });
}
function VINDecoderTool() {
	const [vin, setVin] = (0, import_react.useState)("");
	const [result, setResult] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const submit = async (e) => {
		e.preventDefault();
		const normalized = vin.trim().toUpperCase();
		if (!isValidVin(normalized)) {
			setError("Enter a 17-character VIN. The letters I, O and Q are not used.");
			setResult(null);
			return;
		}
		setBusy(true);
		setError("");
		setResult(null);
		try {
			const response = await decodeVin({ data: { vin: normalized } });
			setResult(response.data);
			setError(response.error ?? "");
		} catch {
			setError("NHTSA VIN decoding is temporarily unavailable.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "VIN Decoder" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Decode manufacturer-reported vehicle details through the official NHTSA vPIC API." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "pt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: submit,
				className: "flex flex-col sm:flex-row gap-3 mb-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoComplete: "off",
					spellCheck: false,
					maxLength: 17,
					value: vin,
					onChange: (e) => setVin(e.target.value.toUpperCase()),
					placeholder: "Enter 17-character VIN",
					className: "h-11 min-w-0 flex-1 rounded-md border border-input bg-background px-4 font-mono text-sm uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					disabled: busy || !isValidVin(vin.trim()),
					children: busy ? "Decoding…" : "Decode VIN"
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-destructive",
				children: error
			}),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-l-2 border-primary bg-background p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-2 mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium text-muted-foreground",
							children: "NHTSA vPIC · decoded record"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-1 text-base font-semibold",
							children: [
								result.year,
								result.make,
								result.model
							].filter(Boolean).join(" ") || "Vehicle details"
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: result.sourceUrl,
							target: "_blank",
							rel: "noreferrer",
							className: "text-xs font-semibold text-primary",
							children: "Source"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "grid gap-x-6 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "VIN"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm font-mono",
								children: result.vin
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Trim / series"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: [result.trim, result.series].filter(Boolean).join(" · ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Body"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.bodyClass || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Engine"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: [result.displacement && `${result.displacement} L`, result.engineCylinders && `${result.engineCylinders} cylinders`].filter(Boolean).join(" · ") || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Fuel"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.fuelType || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Drive"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.driveType || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Transmission"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.transmission || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Manufacturer"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.manufacturer || "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-xs text-muted-foreground",
								children: "Plant country"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "text-sm",
								children: result.plantCountry || "—"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs leading-5 text-muted-foreground",
						children: "Manufacturer-reported U.S. VIN data. Available fields vary; this decode does not establish exact parts fitment or repair status."
					})
				]
			})
		]
	})] });
}
function RecallCheckerTool() {
	const [year, setYear] = (0, import_react.useState)("");
	const [make, setMake] = (0, import_react.useState)("");
	const [model, setModel] = (0, import_react.useState)("");
	const [recalls, setRecalls] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const check = async () => {
		if (!year || !make || !model) return;
		setBusy(true);
		setError("");
		setRecalls(null);
		try {
			const response = await getVehicleRecalls({ data: {
				year: Number(year),
				make,
				model
			} });
			setRecalls(response.data);
			setError(response.error ?? "");
		} catch {
			setError("NHTSA recall records are temporarily unavailable.");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recall Checker" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Check NHTSA safety recall campaigns by year, make, and model." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
		className: "pt-0",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Year"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "number",
							value: year,
							onChange: (e) => setYear(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Make"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: make,
							onChange: (e) => setMake(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "text-xs font-semibold text-muted-foreground",
							children: "Model"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: model,
							onChange: (e) => setModel(e.target.value),
							className: "h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: check,
							disabled: busy || !year || !make || !model,
							children: busy ? "Checking…" : "Check recalls"
						})
					})
				]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-destructive",
				children: error
			}),
			recalls !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: recalls.length === 0 ? "No matching campaigns were returned by NHTSA." : `${recalls.length} NHTSA campaign${recalls.length === 1 ? "" : "s"} reported.`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "This is a model-year history lookup, not a VIN-specific open-recall or repair-status check."
					}),
					recalls.slice(0, 5).map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-3 rounded-md border border-border/60 bg-background",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold text-primary",
								children: r.campaignNumber
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: r.summary
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground",
								children: [r.component && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.component }), r.reportDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["· ", new Date(r.reportDate).toLocaleDateString()] })]
							}),
							r.remedy && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Remedy:" }),
									" ",
									r.remedy
								]
							})
						]
					}, r.campaignNumber)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://www.nhtsa.gov/recalls",
						target: "_blank",
						rel: "noreferrer noopener",
						className: "mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary",
						children: ["Confirm at NHTSA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })]
					})
				]
			})
		]
	})] });
}
function EVChargingTool() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "EV Charging Station Locator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Find public EV charging stations with connector types and operator details. (Open Charge Map integration — API key required)" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-dashed border-border/60 bg-secondary/30 p-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-8 text-primary mb-3" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "text-sm font-semibold",
				children: "Open Charge Map integration"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: "Configure your Open Charge Map API key in Supabase secrets to enable EV charging station search. API keys are never exposed in browser code."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				size: "sm",
				children: "Request API key setup"
			})
		]
	}) })] });
}
function SpecificationsBrowserTool() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Vehicle Specifications Browser" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Browse technical specifications across the vehicle catalog." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Select a vehicle from the header or homepage to view its full specifications, including sourced confidence levels and source citations."
	}) })] });
}
function PartsBrowserTool() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Parts Compatibility Browser" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Search compatible parts by vehicle and part category." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Select a vehicle to view compatible parts with verified fitment notes, source attribution, and confidence levels. Never guess fitment."
	}) })] });
}
//#endregion
export { ToolPage as component };

import { n as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { s as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as Button } from "./button-PwNqyxv_.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as getFuelEconomyOptions, i as getFuelEconomyModels, p as getVehicleRecalls, r as getFuelEconomyMakes, t as decodeVin } from "./autospec.functions-suH5Sbge.mjs";
import { A as Battery, M as ArrowRight, N as ArrowDownRight, S as CircleGauge, c as ShieldAlert, d as Menu, f as MapPin, h as Fuel, j as ArrowUpRight, k as BookOpenText, m as Gauge, n as X, o as Sparkles, r as Wrench, u as Search, x as Clock3 } from "../_libs/lucide-react.mjs";
import { n as createModelYears, r as isValidVin } from "./autospec.model-BD7PEZCG.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-DamjaduW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CJW8_Tz8.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var autospec_vehicle_default = "/assets/autospec-vehicle-C9k-HCOp.jpg";
var tools = [
	{
		title: "Tire pressure",
		caption: "Specification lookup",
		icon: Gauge,
		slug: "tire-pressure"
	},
	{
		title: "Wiper blades",
		caption: "Fitment reference",
		icon: Sparkles,
		slug: "wiper-blades"
	},
	{
		title: "Battery fit",
		caption: "Compatibility reference",
		icon: Battery,
		slug: "battery-compatibility"
	},
	{
		title: "Engine oil",
		caption: "Type & capacity",
		icon: CircleGauge,
		slug: "oil-and-coolant"
	},
	{
		title: "Maintenance",
		caption: "Service schedule",
		icon: Wrench,
		slug: "maintenance-schedule"
	},
	{
		title: "Fuel cost",
		caption: "Trip cost calculator",
		icon: Fuel,
		slug: "fuel-cost-calculator"
	},
	{
		title: "Recall check",
		caption: "Official safety records",
		icon: ShieldAlert,
		slug: "recall-checker"
	},
	{
		title: "VIN decode",
		caption: "Identify your vehicle",
		icon: Search,
		slug: "vin-decoder"
	}
];
var navigation = [
	{
		label: "Find my car",
		href: "#find-vehicle"
	},
	{
		label: "Vehicle database",
		href: "/vehicles"
	},
	{
		label: "Specifications",
		href: "/tools/specifications"
	},
	{
		label: "Maintenance",
		href: "/tools/maintenance-schedule"
	},
	{
		label: "Parts & fitment",
		href: "/tools/parts-compatibility"
	},
	{
		label: "Calculators",
		href: "/tools/fuel-cost-calculator"
	},
	{
		label: "Recalls & safety",
		href: "/tools/recall-checker"
	},
	{
		label: "EV information",
		href: "/tools/ev-charging"
	},
	{
		label: "Guides",
		href: "/guides"
	}
];
function toolPath(slug) {
	return {
		to: "/tools/$tool",
		params: { tool: slug }
	};
}
function DetailRow({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-baseline justify-between gap-x-5 gap-y-1 border-b border-border/70 py-3 last:border-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "max-w-full break-words text-right text-sm font-semibold text-foreground",
			children: value
		})]
	});
}
function AutoSpecHomePage() {
	const fetchMakes = getFuelEconomyMakes;
	const fetchModels = getFuelEconomyModels;
	const fetchOptions = getFuelEconomyOptions;
	const runVinDecode = decodeVin;
	const fetchRecalls = getVehicleRecalls;
	const modelYears = createModelYears((/* @__PURE__ */ new Date()).getFullYear());
	const [year, setYear] = (0, import_react.useState)("");
	const [make, setMake] = (0, import_react.useState)("");
	const [model, setModel] = (0, import_react.useState)("");
	const [option, setOption] = (0, import_react.useState)("");
	const [makes, setMakes] = (0, import_react.useState)([]);
	const [models, setModels] = (0, import_react.useState)([]);
	const [configurations, setConfigurations] = (0, import_react.useState)([]);
	const [catalogError, setCatalogError] = (0, import_react.useState)("");
	const [catalogBusy, setCatalogBusy] = (0, import_react.useState)(false);
	const [vin, setVin] = (0, import_react.useState)("");
	const [vinResult, setVinResult] = (0, import_react.useState)(null);
	const [vinError, setVinError] = (0, import_react.useState)("");
	const [vinBusy, setVinBusy] = (0, import_react.useState)(false);
	const [recalls, setRecalls] = (0, import_react.useState)(null);
	const [recallError, setRecallError] = (0, import_react.useState)("");
	const [recallBusy, setRecallBusy] = (0, import_react.useState)(false);
	const [mobileNavOpen, setMobileNavOpen] = (0, import_react.useState)(false);
	const [optionId, setOptionId] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		try {
			const stored = window.sessionStorage.getItem("autospec.selected-vehicle");
			if (!stored) return;
			const selected = JSON.parse(stored);
			if (selected.year && selected.make && selected.model) {
				setYear(String(selected.year));
				setMake(selected.make);
				setModel(selected.model);
				if (selected.option) setOption(selected.option);
				if (typeof selected.fuelEconomyId === "number") setOptionId(String(selected.fuelEconomyId));
			}
		} catch {
			window.sessionStorage.removeItem("autospec.selected-vehicle");
		}
	}, []);
	(0, import_react.useEffect)(() => {
		if (!year) {
			setMakes([]);
			setCatalogError("");
			return;
		}
		let active = true;
		setCatalogBusy(true);
		setCatalogError("");
		fetchMakes({ data: { year: Number(year) } }).then((response) => {
			if (!active) return;
			setMakes(response.data ?? []);
			setCatalogError(response.error ?? "");
		}).catch(() => {
			if (active) setCatalogError("Vehicle data is temporarily unavailable. Try again shortly.");
		}).finally(() => {
			if (active) setCatalogBusy(false);
		});
		return () => {
			active = false;
		};
	}, [year, fetchMakes]);
	(0, import_react.useEffect)(() => {
		if (!year || !make) {
			setModels([]);
			return;
		}
		let active = true;
		setCatalogBusy(true);
		fetchModels({ data: {
			year: Number(year),
			make
		} }).then((response) => {
			if (!active) return;
			setModels(response.data ?? []);
			setCatalogError(response.error ?? "");
		}).catch(() => {
			if (active) setCatalogError("Vehicle data is temporarily unavailable. Try again shortly.");
		}).finally(() => {
			if (active) setCatalogBusy(false);
		});
		return () => {
			active = false;
		};
	}, [
		year,
		make,
		fetchModels
	]);
	(0, import_react.useEffect)(() => {
		if (!year || !make || !model) {
			setConfigurations([]);
			return;
		}
		let active = true;
		setCatalogBusy(true);
		fetchOptions({ data: {
			year: Number(year),
			make,
			model
		} }).then((response) => {
			if (!active) return;
			setConfigurations(response.data ?? []);
			setCatalogError(response.error ?? "");
		}).catch(() => {
			if (active) setCatalogError("Vehicle configurations are temporarily unavailable.");
		}).finally(() => {
			if (active) setCatalogBusy(false);
		});
		return () => {
			active = false;
		};
	}, [
		year,
		make,
		model,
		fetchOptions
	]);
	const selectYear = (value) => {
		setYear(value);
		setMake("");
		setModel("");
		setOption("");
		setOptionId("");
		setModels([]);
		setConfigurations([]);
		setVinResult(null);
	};
	const selectMake = (value) => {
		setMake(value);
		setModel("");
		setOption("");
		setOptionId("");
		setConfigurations([]);
		setVinResult(null);
	};
	const selectModel = (value) => {
		setModel(value);
		setOption("");
		setOptionId("");
		setVinResult(null);
	};
	const selectOption = (value) => {
		const selected = configurations.find((item) => item.id === value);
		setOption(selected?.name ?? "");
		setOptionId(value);
		const selection = {
			year: Number(year),
			make,
			model,
			option: selected?.name ?? "",
			fuelEconomyId: Number(value)
		};
		try {
			window.sessionStorage.setItem("autospec.selected-vehicle", JSON.stringify(selection));
		} catch {}
	};
	const submitVin = async (event) => {
		event.preventDefault();
		const normalized = vin.trim().toUpperCase();
		if (!isValidVin(normalized)) {
			setVinError("Enter a 17-character VIN. The letters I, O and Q are not used.");
			setVinResult(null);
			return;
		}
		setVinBusy(true);
		setVinError("");
		setVinResult(null);
		try {
			const response = await runVinDecode({ data: { vin: normalized } });
			setVinResult(response.data);
			setVinError(response.error ?? "");
		} catch {
			setVinError("NHTSA VIN decoding is temporarily unavailable. Your VIN was not saved.");
		} finally {
			setVinBusy(false);
		}
	};
	const submitRecalls = async () => {
		if (!year || !make || !model) return;
		setRecallBusy(true);
		setRecallError("");
		setRecalls(null);
		try {
			const response = await fetchRecalls({ data: {
				year: Number(year),
				make,
				model
			} });
			setRecalls(response.data);
			setRecallError(response.error ?? "");
		} catch {
			setRecallError("NHTSA recall records are temporarily unavailable. Try again shortly.");
		} finally {
			setRecallBusy(false);
		}
	};
	const handleSaveVehicle = () => {
		if (!year || !make || !model) return;
		const selected = {
			year: Number(year),
			make,
			model,
			option,
			...optionId ? { fuelEconomyId: Number(optionId) } : {}
		};
		try {
			window.sessionStorage.setItem("autospec.selected-vehicle", JSON.stringify(selected));
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-screen bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border/70 bg-background",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "autospec-container flex h-[76px] items-center justify-between gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/",
							className: "flex shrink-0 items-center gap-2.5",
							"aria-label": "AutoSpec home",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-9 place-items-center rounded-md bg-primary text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-display text-sm font-bold",
									children: ["A", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-accent",
										children: "/"
									})]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-[20px] font-bold tracking-[0.015em]",
								children: "AutoSpec"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "hidden items-center gap-5 xl:flex",
							"aria-label": "Main navigation",
							children: navigation.map((item) => item.href.startsWith("/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: item.href,
								className: "whitespace-nowrap text-[12px] font-semibold text-muted-foreground transition-colors hover:text-foreground",
								children: item.label
							}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: item.href,
								className: "whitespace-nowrap text-[12px] font-semibold text-muted-foreground transition-colors hover:text-foreground",
								children: item.label
							}, item.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-3 xl:flex",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3.5" }), " US data"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									...toolPath("vin-decoder"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5" }), " Decode VIN"]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "xl:hidden",
							"aria-label": mobileNavOpen ? "Close menu" : "Open menu",
							onClick: () => setMobileNavOpen((open) => !open),
							children: mobileNavOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
						})
					]
				}), mobileNavOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "autospec-container grid grid-cols-2 gap-x-5 gap-y-3 pb-5 xl:hidden",
					"aria-label": "Mobile navigation",
					children: navigation.map((item) => item.href.startsWith("/") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: item.href,
						onClick: () => setMobileNavOpen(false),
						className: "py-1 text-sm font-semibold text-foreground",
						children: item.label
					}, item.label) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: item.href,
						onClick: () => setMobileNavOpen(false),
						className: "py-1 text-sm font-semibold text-foreground",
						children: item.label
					}, item.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "hero-panel overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "autospec-container grid min-h-[478px] items-center gap-7 py-9 lg:grid-cols-[0.94fr_1.06fr] lg:py-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "autospec-reveal relative z-10 max-w-[540px] py-5 lg:py-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 inline-flex items-center gap-2 text-xs font-semibold text-primary",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent" }), " THE REFERENCE FOR YOUR RIDE"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "max-w-[520px] text-[42px] font-semibold leading-[1.03] sm:text-[56px] lg:text-[62px]",
								children: [
									"Know your car.",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-accent",
										children: "Maintain it better."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 max-w-[410px] text-[15px] leading-7 text-foreground/75",
								children: "Vehicle specifications, maintenance references, compatible parts and automotive tools—all in one place."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "lg",
									className: "h-12 rounded-md bg-accent px-5 text-accent-foreground shadow-none hover:bg-accent/90",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "#find-vehicle",
										children: ["Find your vehicle ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									size: "lg",
									className: "h-12 rounded-md border-foreground/20 bg-transparent px-5 text-foreground hover:bg-foreground/10",
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										...toolPath("vin-decoder"),
										children: ["Decode a VIN ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4" })]
									})
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative order-first flex min-h-[230px] items-center justify-center lg:order-last lg:min-h-[385px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-y-3 -right-16 left-8 hidden bg-foreground/5 lg:block" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: autospec_vehicle_default,
								alt: "Silver vehicle in a modern service bay",
								width: 1280,
								height: 960,
								fetchPriority: "high",
								className: "relative z-10 h-[245px] w-full max-w-[640px] object-cover sm:h-[320px] lg:h-[370px]"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-0 left-0 z-20 hidden border-l-2 border-accent bg-background px-4 py-3 text-foreground shadow-sm sm:block lg:bottom-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "autospec-eyebrow",
									children: "Vehicle data, without guesswork"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs font-semibold",
									children: "Sources shown. Unknowns stay unknown."
								})]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "find-vehicle",
				className: "autospec-container relative z-20 -mt-2 scroll-mt-5 pb-16 pt-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-7 border-b border-border pb-8 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col justify-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "autospec-eyebrow",
								children: "Start with your vehicle"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-2 text-[25px] font-semibold",
								children: "Find the right fit."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 max-w-[350px] text-sm leading-6 text-muted-foreground",
								children: "Choose a specific U.S. model configuration to unlock source-linked information."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: "#vin-decoder",
								className: "mt-4 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline",
								children: ["Have your VIN? Decode it ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "autospec-field",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrettyLabel, { value: "Year" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
											value: year || void 0,
											onValueChange: selectYear,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
												className: "h-12 rounded-md border-border bg-background px-3.5 text-sm",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Select year" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: modelYears.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
												value: String(item),
												children: item
											}, item)) })]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
										label: "Make",
										placeholder: catalogBusy && year ? "Loading makes…" : "Select make",
										value: make,
										options: makes,
										disabled: !year || catalogBusy,
										onChange: selectMake
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
										label: "Model",
										placeholder: "Select model",
										value: model,
										options: models,
										disabled: !make || catalogBusy,
										onChange: selectModel
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldSelect, {
										label: "Configuration",
										placeholder: "Select configuration",
										value: optionId,
										options: configurations,
										disabled: !model || catalogBusy,
										onChange: selectOption
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex min-h-7 flex-wrap items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "status",
									className: "text-xs text-muted-foreground",
									children: catalogError || (optionId ? "Selection held for this browser session." : "Powered by U.S. EPA FuelEconomy.gov data.")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "rounded-md px-4",
									disabled: !year || !make || !model,
									onClick: handleSaveVehicle,
									children: ["Use this vehicle ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-3.5" })]
								})]
							}),
							year && make && model && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex flex-wrap items-center gap-3 border-t border-border pt-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-sm font-semibold",
									children: [
										year,
										" ",
										make,
										" ",
										model,
										option ? ` · ${option}` : ""
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "outline",
									size: "sm",
									className: "rounded-md",
									onClick: submitRecalls,
									disabled: recallBusy,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldAlert, { className: "size-3.5" }), recallBusy ? "Checking NHTSA…" : "Check recalls"]
								})]
							}),
							recallError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								role: "status",
								className: "mt-3 text-sm text-destructive",
								children: recallError
							}),
							recalls !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 space-y-3",
								"aria-live": "polite",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: recalls.length === 0 ? "No matching campaigns were returned by NHTSA." : `${recalls.length} NHTSA campaign${recalls.length === 1 ? "" : "s"} reported for this model.`
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: "This is a model-year history lookup, not a VIN-specific open-recall or repair-status check."
									}),
									recalls.slice(0, 3).map((recall) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
										className: "border-l-2 border-primary pl-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-xs font-semibold",
											children: [
												recall.campaignNumber,
												" · ",
												recall.component || "Component not specified"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 line-clamp-2 text-xs leading-5 text-muted-foreground",
											children: recall.summary
										})]
									}, recall.campaignNumber)),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: "https://www.nhtsa.gov/recalls",
										target: "_blank",
										rel: "noreferrer",
										className: "inline-flex items-center gap-1 text-xs font-semibold text-primary",
										children: ["Confirm at NHTSA ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3" })]
									})
								]
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "autospec-container pb-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "autospec-eyebrow",
						children: "At your service"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 text-[28px] font-semibold",
						children: "Useful tools. Verified when available."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "max-w-[340px] text-sm leading-6 text-muted-foreground",
						children: "No sourced data? We’ll say so—never fill in a spec by guessing."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-7 grid gap-x-7 sm:grid-cols-2 lg:grid-cols-4",
					children: tools.map(({ title, caption, icon: Icon, slug }, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						...toolPath(slug),
						className: "group flex min-h-[112px] items-center gap-4 border-t border-border py-5 transition-colors hover:border-primary",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 shrink-0 place-items-center rounded-md bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block text-sm font-bold text-foreground",
									children: title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-xs text-muted-foreground",
									children: caption
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownRight, { className: "size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5 group-hover:text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "sr-only",
								children: ["Tool ", index + 1]
							})
						]
					}, slug))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "bg-secondary/60 py-14",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "autospec-container grid gap-9 lg:grid-cols-[1fr_1fr] lg:items-start",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "autospec-eyebrow",
							children: "From identification to the details"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 max-w-lg text-[29px] font-semibold leading-tight",
							children: "A VIN is a good place to start."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-md text-sm leading-6 text-muted-foreground",
							children: "Decode manufacturer-reported vehicle details through NHTSA. Your VIN is sent to the official decoder and isn’t stored here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							id: "vin-decoder",
							onSubmit: submitVin,
							className: "mt-6 flex max-w-[540px] flex-col gap-3 sm:flex-row",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "autospec-vin",
									className: "sr-only",
									children: "17-character vehicle identification number"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "autospec-vin",
									autoComplete: "off",
									spellCheck: false,
									maxLength: 17,
									value: vin,
									onChange: (event) => setVin(event.target.value.toUpperCase()),
									placeholder: "Enter 17-character VIN",
									className: "h-12 min-w-0 flex-1 rounded-md border border-input bg-background px-4 font-mono text-sm uppercase placeholder:font-sans placeholder:normal-case placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
									"aria-describedby": vinError ? "vin-feedback" : void 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "submit",
									className: "h-12 rounded-md px-5",
									disabled: vinBusy,
									children: [vinBusy ? "Decoding…" : "Decode VIN", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							]
						}),
						vinError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							id: "vin-feedback",
							role: "alert",
							className: "mt-3 text-sm text-destructive",
							children: vinError
						}),
						vinResult && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 border-l-2 border-primary bg-background px-5 py-4",
							"aria-live": "polite",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium text-muted-foreground",
										children: "NHTSA vPIC · decoded record"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "mt-1 text-base font-semibold",
										children: [
											vinResult.year,
											vinResult.make,
											vinResult.model
										].filter(Boolean).join(" ") || "Vehicle details"
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										href: vinResult.sourceUrl,
										target: "_blank",
										rel: "noreferrer",
										className: "text-xs font-semibold text-primary",
										children: "Source"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
									className: "mt-3 grid gap-x-6 sm:grid-cols-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Trim / series",
											value: [vinResult.trim, vinResult.series].filter(Boolean).join(" · ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Body",
											value: vinResult.bodyClass
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Engine",
											value: [vinResult.displacement && `${vinResult.displacement} L`, vinResult.engineCylinders && `${vinResult.engineCylinders} cylinders`].filter(Boolean).join(" · ")
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Fuel",
											value: vinResult.fuelType
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Drive",
											value: vinResult.driveType
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Manufacturer",
											value: vinResult.manufacturer
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
											label: "Plant country",
											value: vinResult.plantCountry
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 text-xs leading-5 text-muted-foreground",
									children: "Manufacturer-reported U.S. VIN data. Available fields vary; this decode does not establish exact parts fitment or repair status."
								})
							]
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "autospec-eyebrow",
								children: "The confidence behind every detail"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-2 text-xl font-semibold",
								children: "Know the source, not just the spec."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-5 space-y-0",
								children: [
									["Manufacturer verified", "Sourced directly from vehicle-maker information."],
									["Official government source", "Sourced from NHTSA or U.S. EPA records."],
									["Verified third party", "Independently confirmed from an attributable source."],
									["Not verified yet", "No trusted source is available for this configuration."]
								].map(([label, description]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-3 border-t border-border py-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1 size-2 shrink-0 rounded-full bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-semibold",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs leading-5 text-muted-foreground",
										children: description
									})] })]
								}, label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 border-l-2 border-accent px-3 text-xs leading-5 text-muted-foreground",
								children: "For safety-critical service, verify the answer against your owner’s manual or manufacturer."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "autospec-container py-14",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-5 border-b border-border pb-11 md:grid-cols-3",
					children: [
						{
							icon: Clock3,
							label: "VIN decode",
							value: "Official NHTSA vPIC"
						},
						{
							icon: Fuel,
							label: "Fuel economy",
							value: "U.S. EPA estimates"
						},
						{
							icon: ShieldAlert,
							label: "Safety records",
							value: "NHTSA campaign history"
						}
					].map(({ icon: Icon, label, value }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-semibold uppercase text-muted-foreground",
							children: label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm font-semibold",
							children: value
						})] })]
					}, label))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col justify-between gap-5 pt-8 sm:flex-row sm:items-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "font-display text-lg font-bold",
							children: "AutoSpec"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "max-w-xl text-xs leading-5 text-muted-foreground",
							children: "Fuel economy estimates apply to the U.S. EPA test cycle and may differ from real-world use. Recall history is not individual VIN repair status. Data market: United States."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/guides",
							className: "inline-flex items-center gap-2 text-xs font-semibold text-primary",
							children: ["Explore guides ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpenText, { className: "size-3.5" })]
						})
					]
				})]
			})
		]
	});
}
function PrettyLabel({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "text-[13px] font-semibold text-foreground",
		children: value
	});
}
function FieldSelect({ label, placeholder, value, options, disabled, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "autospec-field",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrettyLabel, { value: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: value || void 0,
			onValueChange: onChange,
			disabled,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				className: "h-12 rounded-md border-border bg-background px-3.5 text-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: option.id,
				children: option.name
			}, option.id)) })]
		})]
	});
}
//#endregion
export { AutoSpecHomePage as component };

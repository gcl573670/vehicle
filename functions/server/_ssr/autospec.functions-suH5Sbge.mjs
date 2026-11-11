import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-BwBzfFIC.mjs";
import { a as TSS_SERVER_FUNCTION, l as createServerFn } from "./createServerFn-DDDJMFWM.mjs";
import { n as objectType, r as stringType, t as numberType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/autospec.functions-suH5Sbge.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var getFuelEconomyMakes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ year: numberType().int().min(1984).max(2100) }).parse(input)).handler(createSsrRpc("ee70af4c2256ffde32b50b167125afe236a74c574049694f9510b5c3ecd5a4d9"));
var getFuelEconomyModels = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100)
}).parse(input)).handler(createSsrRpc("f2ab1c1ea8b9fedd0d1d0be87ad02ae07d7ad890a2c7027f8b2d344aaa84f44d"));
var getFuelEconomyOptions = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120)
}).parse(input)).handler(createSsrRpc("766d5987fa0d471cea226c97cc7b5567c37460c810f3c23e14b7084915b3f7e3"));
createServerFn({ method: "GET" }).inputValidator((input) => objectType({ id: numberType().int().positive().max(1e6) }).parse(input)).handler(createSsrRpc("a177709f3cfb1849a076ccf3090870d45c33385d7fe8607c7d62580945c7ae69"));
var getEpaFuelPrices = createServerFn({ method: "GET" }).handler(createSsrRpc("929258b48e910d3b917b3f21962db5964831a093253f63b763261c62e388f5b8"));
var decodeVin = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ vin: stringType().trim().toUpperCase().regex(/^[A-HJ-NPR-Z0-9]{17}$/) }).parse(input)).handler(createSsrRpc("acb6e23ad4ca57303e82679db57d7003cf0f44c188a019c0a491a6deae598a71"));
var getVehicleRecalls = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1981).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120)
}).parse(input)).handler(createSsrRpc("c029d602bc464986cbeb997e29972dd7eb9d4b471f34cea7ca6f8b1b39eaea85"));
var getVehicleMakes = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100).optional(),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(createSsrRpc("83bff1df512d3f5c860e6810636c3203c7b32e6c0ae23bd9df56434956fb7610"));
createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(createSsrRpc("95d57b7a678f83831a229bc17aa36941bc529fb772ff4887070e31590a9b7d8d"));
createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100),
	make: stringType().trim().min(1).max(100),
	model: stringType().trim().min(1).max(120),
	market: stringType().min(1).max(10).optional()
}).parse(input)).handler(createSsrRpc("a91d70ddfc55ec3d7b5446d754b61d6ce3fe538640e766f370de32df8ec234cd"));
createServerFn({ method: "GET" }).handler(createSsrRpc("54114e6b72f2abe77009c3c601e1bd40bd2d2828450592d96afdc11b6a933ac6"));
var searchVehicles = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	year: numberType().int().min(1984).max(2100).optional(),
	make: stringType().trim().min(1).max(100).optional(),
	model: stringType().trim().min(1).max(120).optional(),
	market: stringType().min(1).max(10).optional(),
	fuel_type: stringType().min(1).max(50).optional(),
	vehicle_type: stringType().min(1).max(50).optional(),
	page: numberType().int().min(1).default(1).optional(),
	pageSize: numberType().int().min(1).max(100).default(20).optional()
}).parse(input)).handler(createSsrRpc("b416928522c602ab9625b8e32eb13ff041f92388ee351f975661e6e87851fe2f"));
var getVehicleBySlug = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ slug: stringType().trim().min(1).max(200) }).parse(input)).handler(createSsrRpc("934c3c14b8ca1dceb38abac6f968223aff7e092b548d66ec07a8576112145360"));
var getVehicleSpecifications = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	vehicleId: stringType().uuid(),
	category: stringType().optional(),
	market: stringType().optional()
}).parse(input)).handler(createSsrRpc("54575f07e4308202c19fac2238b487353452a246745d3c9ac739a00b7739f175"));
var getVehicleMaintenance = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(createSsrRpc("86590dc5151bb412d8092dc572f9482e9fed0905b00bc6e240ac0dbda9691827"));
var getVehicleParts = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(createSsrRpc("7d5a1a3c31620df7190e7b4a98081d0c708b9bfa14eb87178b56405cd6769d04"));
var getVehicleTires = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(createSsrRpc("b0523c1692d976a59586dede502a6fe86dffd1424aff263f22686ede1a640e92"));
var getVehicleFluids = createServerFn({ method: "GET" }).inputValidator((input) => objectType({ vehicleId: stringType().uuid() }).parse(input)).handler(createSsrRpc("6bc16de0db809743082a50d47858c12a1ab52fec4e8f8b981b0e1e6eb16c439f"));
var getRecallsByVehicle = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	vehicleId: stringType().uuid().optional(),
	year: numberType().int().optional(),
	make: stringType().optional(),
	model: stringType().optional()
}).parse(input)).handler(createSsrRpc("76803bc26f6b781399db8ec3335c487080f91e71da4ce2da785db15722d7a930"));
createServerFn({ method: "GET" }).handler(createSsrRpc("7e354cc1eccc03a7bb826cbc2ca80f3d67603416edc0e95e8cb2ccdab73ce09e"));
var getPublishedArticles = createServerFn({ method: "GET" }).inputValidator((input) => objectType({
	category: stringType().optional(),
	limit: numberType().int().min(1).max(50).optional()
}).parse(input)).handler(createSsrRpc("9915c3e101b549d5d2df6555622bb33b4c3e1445fea7de6a14db1352ad2802b7"));
//#endregion
export { getFuelEconomyOptions as a, getVehicleBySlug as c, getVehicleMakes as d, getVehicleParts as f, searchVehicles as g, getVehicleTires as h, getFuelEconomyModels as i, getVehicleFluids as l, getVehicleSpecifications as m, getEpaFuelPrices as n, getPublishedArticles as o, getVehicleRecalls as p, getFuelEconomyMakes as r, getRecallsByVehicle as s, decodeVin as t, getVehicleMaintenance as u };

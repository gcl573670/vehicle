//#region node_modules/.nitro/vite/services/ssr/assets/autospec.model-BD7PEZCG.js
var US_GALLON_LITERS = 3.785411784;
var MILES_PER_KILOMETER = .621371192;
function isValidVin(vin) {
	return /^[A-HJ-NPR-Z0-9]{17}$/i.test(vin.trim());
}
function createModelYears(currentYear) {
	return Array.from({ length: currentYear - 1984 + 1 }, (_, index) => currentYear - index);
}
function calculateFuelCost(input) {
	const { distance, distanceUnit, economy, economyUnit, price, priceUnit } = input;
	if (![
		distance,
		economy,
		price
	].every(Number.isFinite) || distance <= 0 || economy <= 0 || price < 0) return null;
	const kilometers = distanceUnit === "miles" ? distance / MILES_PER_KILOMETER : distance;
	let fuelLiters;
	if (economyUnit === "l100km") fuelLiters = kilometers * economy / 100;
	else if (economyUnit === "kml") fuelLiters = kilometers / economy;
	else fuelLiters = kilometers * MILES_PER_KILOMETER / economy * US_GALLON_LITERS;
	return {
		cost: priceUnit === "gallon" ? fuelLiters / US_GALLON_LITERS * price : fuelLiters * price,
		fuelLiters
	};
}
//#endregion
export { createModelYears as n, isValidVin as r, calculateFuelCost as t };

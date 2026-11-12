// Seed the AutoSpec guides library with starter articles.
//
// Content is general automotive maintenance knowledge — no vehicle-specific
// specifications are claimed. Category ids must match GUIDE_CATEGORIES in
// src/routes/guides/index.tsx. Guide pages render content split on blank
// lines, so paragraphs are separated by "\n\n" (no markdown).
//
// Usage: node scripts/seed-articles.mjs
// Requires SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env (never committed).

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadEnv() {
  const env = { ...process.env };
  const file = path.join(ROOT, ".env");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/i);
      if (m && !(m[1] in env)) env[m[1]] = m[2];
    }
  }
  return env;
}
const env = loadEnv();
const SUPABASE_URL = (env.SUPABASE_URL || env.VITE_SUPABASE_URL || "").replace(/\/$/, "");
const SERVICE_KEY = env.SUPABASE_SERVICE_ROLE_KEY || "";
if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error("Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

function uuidFrom(key) {
  const h = crypto.createHash("md5").update(key).digest("hex");
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-a${h.slice(13, 16)}-8${h.slice(17, 20)}-${h.slice(20, 32)}`;
}

const AUTHOR = "AutoSpec Editorial";

const ARTICLES = [
  {
    slug: "tire-pressure-rotation-and-tread",
    category: "tire-care",
    title: "Tire pressure, rotation, and tread wear",
    content: `Tires are the only part of your car touching the road, so their condition shapes stopping distance, handling, ride comfort, and fuel economy. Three routine checks cover most of what matters: keeping the correct pressure, rotating on schedule, and watching how the tread wears out.

Check tire pressure when the tires are cold, meaning before driving or at least three miles after. The number molded into the tire sidewall is the maximum pressure the tire can safely hold, not the target. The correct pressure for your vehicle is printed on the driver's door jamb placard, and sometimes on the fuel door or glove box lid. Most drivers check too rarely: a monthly check is a good habit, and tires naturally lose about a pound per month plus more in cold weather, since pressure drops roughly one pound for every ten degrees of temperature change.

Underinflated tires flex more as they roll, build heat, wear faster on the outer shoulders, and increase rolling resistance, which hurts fuel economy. Overinflated tires give a harsh ride and concentrate wear in the center of the tread. Either extreme can hurt grip in hard braking.

Rotate your tires every 5,000 to 8,000 miles unless your owner's manual specifies otherwise. Front tires usually wear faster because they steer and carry most of the braking load, so rotating evens things out. The correct pattern depends on your tire type: directional tires must stay on the same side of the car, while non-directional tires can often be crossed front to back or side to side.

Tread depth determines wet-weather grip. The legal minimum in the United States is 2/32 inch, but many tire professionals recommend replacing tires at 4/32 inch, because braking distance on wet roads grows noticeably as tread thins. A simple check is the penny test: insert a penny into the tread with Lincoln's head pointing down, and if you can see the top of his head, the tread is at or below 2/32 inch.

Uneven wear is a clue about something else going on. Wear on both outer shoulders usually points to low pressure, wear down the center points to overinflation, and wear on one side alone often means an alignment problem. Cupping or scalloped patches can indicate worn shocks or struts or a balance problem. If you notice any of these patterns, have the alignment and balance checked rather than just replacing the tires.

Tires also age out even when tread looks fine. The rubber hardens and the structural bonds weaken over time, so most tire professionals suggest inspecting tires at least annually after six years and replacing them around ten years regardless of mileage. The DOT code on the sidewall ends with a four-digit week and year of manufacture, which tells you how old a tire is when you buy it.

When you do replace tires, match the size and load rating printed on the door placard, keep the same size on all four corners unless the car was designed otherwise, and check that the speed rating meets or exceeds what the vehicle requires. Don't forget the spare: it loses pressure too, and a flat spare discovered at the roadside is no help at all.`,
  },
  {
    slug: "car-battery-care-and-testing",
    category: "battery-maintenance",
    title: "Car battery care and testing",
    content: `A car battery's job is to provide the large burst of current needed to crank the engine, and then to act as a stable reservoir for the electrical system once the engine is running. Most passenger vehicles use a 12-volt lead-acid battery, either a flooded design with removable caps or a sealed AGM (absorbent glass mat) type. Batteries are sold by group size, which defines the physical case and terminal layout, and by cold cranking amps, which measures the current available at a cold temperature.

Batteries fail more often than drivers expect. A weak battery shows up as a slow or sluggish crank, dimmer headlights at idle, or a rapid clicking sound when you turn the key. Electrical quirks like erratic power windows or a radio that resets can also point at a battery or charging system problem.

Heat is as hard on batteries as cold. High temperatures accelerate the chemical breakdown inside the battery, which is why batteries in hot climates often fail in three or four years even though cold weather is the season everyone associates with dead batteries. Keeping the battery secured matters too: a battery that can vibrate or bounce in its tray will wear out internally faster.

Maintenance is simple but worth doing. Once a year, inspect the terminals for white or bluish corrosion, clean it with a brush and a baking-soda-and-water solution, and make sure the clamps are tight. A loose or corroded connection can mimic a bad battery. Keep the top of the battery clean and dry, and make sure the hold-down bracket is secure.

Short trips are a battery's enemy. Starting the engine uses a meaningful amount of charge, and a drive short enough that the alternator never fully replenishes it leaves the battery chronically undercharged. If you mostly make trips under fifteen minutes, consider a periodic longer drive or a maintenance charger. Aftermarket accessories such as dash cams, remote starters, and high-powered audio systems draw current while the car is parked and can flatten a battery if they are not wired correctly.

Have the battery load-tested once a year after it reaches about three years of age. Most auto parts stores will test it for free. A battery that tests weak should be replaced before it leaves you stranded, because failure tends to happen on the worst possible day. When replacing it, match the group size and cranking rating from the owner's manual, and check whether your vehicle requires the new battery to be registered or coded to its charging system.

When jump-starting, connect the positive cable to the positive terminal first, then the negative cable to an unpainted metal ground on the engine block rather than the dead battery's negative terminal. Turn off accessories before starting, and remove the cables in reverse order. If the battery dies repeatedly, the problem is usually the charging system or a parasitic drain rather than the battery itself.

Batteries contain lead and acid, so they should never be thrown in the trash. Nearly every auto parts store and many repair shops take used batteries for recycling, and most charge a small core deposit that is refunded when you return the old unit.`,
  },
  {
    slug: "engine-oil-viscosity-and-change-intervals",
    category: "engine-oil",
    title: "Engine oil viscosity and change intervals",
    content: `Engine oil does four jobs at once: it lubricates moving parts to reduce wear, carries heat away from hot components, suspends combustion byproducts so the filter can trap them, and helps seal the piston rings against the cylinder walls. Oil that has lost its ability to do those jobs lets an engine wear faster, so the change interval is one of the few maintenance items that genuinely affects engine life.

The numbers on the bottle describe viscosity, or how thick the oil is and how its thickness changes with temperature. In a grade like 5W-30, the "5W" describes how the oil flows when cold (the W stands for winter), and the "30" describes its viscosity at operating temperature. A lower cold number means easier cranking and faster lubrication on startup, which is when most engine wear happens. The correct grade is specified by the engine manufacturer and is usually printed on the oil filler cap or in the owner's manual. Using a thicker oil than specified can starve sensitive components at startup, and using a thinner one can reduce protection at high temperature.

Conventional, synthetic blend, and full synthetic oils all meet the same duty when fresh; the difference is how long they hold up. Full synthetic base stocks resist thermal breakdown and oxidation better, flow better when cold, and generally allow longer change intervals. Many modern engines specifically require a full synthetic, and some performance or turbocharged engines are designed around low-viscosity synthetic oils. Check the manual rather than the bottle's marketing.

The old "every 3,000 miles" advice came from conventional oil and severe driving. With modern oils, common guidance is 5,000 to 7,500 miles for conventional oil and longer for synthetic, but the manual's schedule is the authority, and it may have separate lists for normal and severe service. Severe service includes frequent short trips, lots of stop-and-go driving, towing, dusty or very hot conditions, and extended idling. Time matters as well as distance: oil absorbs moisture and degrades slowly even if the car barely moves, so a yearly change is sensible for low-mileage drivers.

Check the level monthly. Pull the dipstick with the engine off and the car level, wipe it, reinsert, and read again. The level should sit between the marks; consistently topping up between changes can indicate an oil leak or consumption. A drop of more than a quart between changes is worth investigating. Also be alert to oil pressure or level warning lights, which mean stop and check rather than continue driving.

Change the oil filter at the same time as the oil. A filter that has reached its dirt-holding capacity restricts flow, and its bypass valve can let unfiltered oil circulate. Make sure the old gasket comes off with the old filter before the new one goes on, and oil the new filter's gasket so it seats properly.

Used oil is one of the most recyclable fluids in the car. Do not pour it down a drain or into the ground. Most parts stores accept used oil free of charge, and it can be re-refined into new lubricant. Dispose of filters the same way where local rules allow, letting them drain before bagging them.

Finally, ignore the myth that dark oil is automatically worn out or that it should be changed as soon as it darkens. Fresh oil darkens within a few hundred miles as it does its cleaning job. Condition is judged by mileage, time, and the manufacturer's schedule, not by color alone.`,
  },
  {
    slug: "cooling-system-basics-and-coolant-care",
    category: "cooling-systems",
    title: "Cooling system basics and coolant care",
    content: `An engine makes a great deal of waste heat, and a cooling system's job is to remove just enough of it to keep the engine in its normal operating range while also supplying heat to the cabin. The main parts are the radiator, a water pump driven by the engine, a thermostat that regulates flow, upper and lower hoses, a pressure cap, and an electric or engine-driven fan. Most modern vehicles also have a separate heater core that bleeds a little coolant temperature into the cabin heat.

Coolant, sometimes called antifreeze, is a mixture of concentrated coolant and water. A 50/50 mix is the usual starting point and provides freeze protection to roughly -34°F and boil protection well above 212°F under pressure. Using straight water is not a good idea: it boils sooner, freezes, and promotes corrosion. For colder climates a richer mix may be needed, and a coolant hydrometer or refractometer can check the actual freeze point.

The type of coolant matters as much as the ratio. Modern vehicles typically use organic acid technology (OAT) coolant, often sold as "long life" and colored orange, pink, or blue depending on the manufacturer, while older systems used green inorganic coolant. Mixing the wrong types can cause gels and deposits that clog small passages. When topping up, use the type specified for your vehicle, or a universal coolant that is explicitly labeled as compatible with your system.

Never open the pressure cap on a hot cooling system. The system is under pressure and can release a jet of steam and scalding coolant the moment the seal breaks. Let the engine cool completely, place a thick cloth over the cap, and turn it slowly to vent before removing it. Check the coolant level in the transparent overflow reservoir instead, and with the engine cold.

Hoses are worth inspecting a couple of times a year. With the engine cold, squeeze the upper and lower radiator hoses: they should feel firm but slightly flexible, not mushy, swollen, or crunchy with deposits. Look for cracks, bulges near the clamps, and crusty residue that suggests a slow leak. A hose that has hardened or swollen should be replaced before it fails on the road, and a failed hose can empty the system in minutes.

Coolant gradually loses its corrosion inhibitors even when it still prevents freezing, so flushing and replacing it on the schedule in the owner's manual is important — commonly in the range of every few years or thirty to fifty thousand miles, though some "lifetime" coolants still benefit from inspection. A cooling system flush at a shop replaces the coolant and usually includes a pressure test to find leaks.

Watch for symptoms of cooling trouble: a temperature gauge that climbs above its normal band, a sweet smell from the engine bay, white steam, coolant spots on the driveway, or a heater that stops blowing hot air. A rising temperature light or gauge means pull over safely and shut the engine down as soon as practical, because continued overheating can warp a head gasket or damage the engine beyond economical repair. A water pump that begins leaking from its weep hole and leaves a trail down the block is another common failure worth catching early.

Finally, keep the radiator's front surface clear of bugs, leaves, and debris, and make sure the cooling fan runs when it should. A small amount of care keeps the system pressure-tested, sealed, and doing its job for years.`,
  },
  {
    slug: "brake-pads-rotors-and-fluid",
    category: "brakes",
    title: "Brake pads, rotors, and fluid",
    content: `Most passenger cars use disc brakes: a caliper squeezes brake pads against a rotor that turns with the wheel, converting the car's motion into heat. Some vehicles also use drum brakes at the rear, and many have a parking brake that acts on the rear discs or drums. Because brakes are the single most safety-critical system on the car, anything that feels unusual deserves prompt attention.

Pad wear is normal and expected, and most pads have a built-in wear indicator — a small metal tab that begins to squeal or scrape once the friction material is nearly gone. That noise is a warning, not a defect: have the brakes inspected soon. If you instead hear a deep grinding sound, the pad material may already be gone and metal is contacting metal, which can damage the rotor and needs immediate service.

Inspection is about measurement. Pads are checked in millimeters of remaining friction material, and rotors have a minimum thickness stamped on the edge or hub face. A rotor can be machined smooth again only while it remains above that minimum; otherwise it must be replaced. Many shops now replace rotors with the pads rather than resurfacing them, since new rotors are inexpensive relative to the labor of a second teardown.

Symptoms beyond noise include a pulsation or vibration through the brake pedal, which usually indicates uneven rotor thickness or lateral runout; a car that pulls to one side under braking, which can point at a stuck caliper or contaminated pad; a soft or spongy pedal, which often points at air in the lines or old fluid; and a pedal that sinks toward the floor when held, which is a hydraulic problem that must not be ignored.

Brake fluid is hygroscopic, meaning it absorbs moisture from the air over time. Moisture lowers the fluid's boiling point and can corrode hydraulic components from the inside, which is why flushing the fluid every two to three years is common guidance regardless of mileage. Check the reservoir level with the engine off: a level that drops over time usually reflects pad wear, since the caliper piston moves further out as pads thin. A rapidly falling level, or a level that keeps dropping after the pads are replaced, suggests a leak and needs investigation.

Check the fluid's appearance too. Fresh fluid is clear to pale amber; dark brown or cloudy fluid has absorbed moisture and should be flushed. Use only the fluid specification stamped on the reservoir cap or listed in the manual — usually DOT 3 or DOT 4 — and never mix types indiscriminately.

Driving habits also affect brake life. On long descents, shift to a lower gear and let engine braking share the work instead of riding the pedal, which can overheat the fluid and glaze the pads. Avoid accelerating hard and then braking hard in traffic when coasting would do. If you drive mostly in city stop-and-go traffic, expect pads to wear faster than highway mileage alone would suggest.

Finally, pay attention to warning lights. An ABS light means the anti-lock system has detected a fault and may not intervene in a skid; a brake system light can mean low fluid or a parking brake that is engaged. Neither light should be cleared and forgotten. Brake work is also a good place to involve a qualified technician, since correct pad bedding, rotor runout, and caliper operation are safety matters.`,
  },
  {
    slug: "spark-plugs-gaps-and-replacement",
    category: "spark-plugs",
    title: "Spark plugs, gaps, and replacement",
    content: `A spark plug ignites the air-fuel mixture in each cylinder thousands of times per minute. The plug's center electrode carries high-voltage current from the ignition coil, jumps a small gap to the ground electrode, and creates the spark that starts combustion. Modern engines typically use coil-on-plug ignition, with one coil sitting directly above each plug, though some still use a shared coil and spark plug wires.

Plugs wear gradually. The electrodes erode, which widens the gap and raises the voltage required to fire, and deposits accumulate on the insulator. The usual symptoms are a rough idle, hesitation or misfire under load, harder starting, sluggish acceleration, reduced fuel economy, and possibly a check engine light with a misfire code. A single misfiring cylinder is enough to cause a noticeable vibration.

How long a plug lasts depends on its material. Conventional copper plugs are the least expensive and are commonly replaced around 30,000 miles. Platinum and double-platinum plugs typically last around 60,000 miles, and iridium plugs, which have a very fine center electrode, are often specified for 100,000 miles or more. Those are typical ranges rather than rules: the owner's manual schedule is what governs your engine, and turbocharged or high-performance engines may specify shorter intervals.

The gap is the distance between the center and ground electrodes, and it must match the engine's specification. Too wide a gap can cause a weak or missing spark, especially at high load or high rpm; too narrow a gap can produce a spark too weak to ignite the mixture reliably. Many plugs come pre-gapped from the factory, but it is worth checking with a feeler gauge or wire-type gap tool before installation. On fine-wire iridium or platinum plugs, avoid prying against the delicate center electrode, and adjust gap by carefully bending the ground electrode only.

Heat range and thread length must also match the engine. A plug that is too hot can cause pre-ignition and detonation; one that is too cold can foul with deposits. Thread reach matters as well: a plug that is too long can contact the piston, and one that is too short leaves deposits on the unthreaded portion of the chamber. Use the part number specified for the engine rather than a "one size fits all" cross reference.

Installation details matter. Work on a cool engine, remove each ignition coil and its mounting fastener, and blow or brush debris out of the plug well so nothing falls into the cylinder. Thread the new plug in by hand first to avoid cross-threading, then torque it to the manufacturer's specification — over-tightening can crack the insulator or damage the cylinder head, and under-tightening causes poor heat transfer and a loose plug. Follow the plug manufacturer's guidance on whether anti-seize compound should be used, since some modern plugs come with a coating that makes anti-seize unnecessary, and apply a small amount of dielectric grease to the coil boot to prevent the rubber from seizing and to seal out moisture.

Replacement is also a good time to inspect the ignition coil boots for cracks, carbon tracking, or corrosion, and to check the coil itself if a misfire code points at a specific cylinder. Replacing plugs on schedule keeps combustion even, protects the coils from having to work harder, and is one of the cheapest ways to restore smooth running.`,
  },
  {
    slug: "wiper-blades-sizes-and-replacement",
    category: "wipers",
    title: "Wiper blade sizes and replacement",
    content: `Wiper blades are inexpensive, easy to replace, and one of the most neglected visibility items on a car. Most blades begin to degrade within six months to a year of regular use, because the rubber edge hardens in sunlight, temperature swings, and ozone exposure long before the blade looks worn out.

The signs of a tired blade are straightforward: streaks that leave lines of water, skipping or chattering across the glass, a smearing haze, a blade that lifts or misses a section of the sweep, or a squealing noise on dry glass. Any of these means the rubber has lost its flexible edge and it is time to replace rather than clean.

Blades come in several designs. Conventional bracket blades use a metal frame with several pressure points pressing the rubber against the glass; they are cheap and effective but the frame can ice up and the joints can corrode. Beam blades are a single curved spring steel beam with no exposed frame, which distributes pressure evenly and sheds snow and ice better, and they are now common original equipment. Hybrid designs combine a hidden frame with a aerodynamic shell. Winter-specific blades often encase the arm in a rubber boot.

Sizing matters. The driver's side, passenger's side, and rear window usually take different lengths, and the sizes vary by year and trim level even within the same model. The owner's manual, the vehicle's wiper size guide, or the markings stamped on the blade itself are the reliable sources. Many parts counters can look the sizes up from the vehicle, and mismatched blades that are too long will strike the windshield trim or leave an unswept corner.

Replacement takes a minute per blade. Lift the wiper arm away from the glass, depress the small release tab or clip on the old blade, and slide the blade off the arm's hook or adapter. Slide the new blade on until it clicks, and lower the arm gently. Never let a bare wiper arm snap back against the glass — an unweighted arm can crack a windshield. If the arm is springy, hold it while you work and lay a towel on the glass as a precaution.

Care extends blade life. Clean the rubber edge occasionally with a damp cloth, wipe grime and tree sap off the windshield, and don't run the blades across a dry, dusty windshield, which abrades the edge. Parking in shade rather than direct sun slows rubber hardening. Replacing blades before winter and again before summer is a simple seasonal routine, since heat and cold are exactly what degrade the rubber.

Don't forget the washer system. Top up the reservoir with washer fluid rather than plain water: fluid resists freezing in winter, cleans better, and doesn't leave mineral spots. Use a winter-rated fluid in cold climates, and check that both nozzles spray where they should — a clogged or misaligned nozzle is a cheap fix that restores visibility as effectively as new blades. If the washer pump runs but nothing sprays, check for a empty reservoir, a frozen line, or a failed pump before assuming the worst.`,
  },
  {
    slug: "a-practical-maintenance-schedule",
    category: "vehicle-maintenance",
    title: "A practical maintenance schedule",
    content: `Every vehicle has an official maintenance schedule in its owner's manual, and it should be your starting point — it accounts for the engine, fluids, and components your particular car actually has. Many manuals also include a "severe service" list for drivers who tow, drive mostly short trips, idle in heavy traffic, or operate in extreme heat, cold, or dust. The severe schedule is more common than most owners admit, and following it costs less than the repairs it helps avoid.

Some tasks deserve attention at every fill-up or at least monthly. Check tire pressures when the tires are cold and look at tread and wear patterns. Walk around the car to confirm every light works, since a burned-out bulb is both a safety issue and a traffic stop waiting to happen. Check the windshield washer fluid, and glance under the car for fresh fluid spots that might indicate a leak.

At roughly every oil change, or per the manual's interval, the rest of the routine checklist follows: replace the oil filter with the oil, rotate the tires, inspect brake pads and rotors, look at belts and hoses, check battery terminals for corrosion, and inspect wiper blades. Air filters — engine and cabin — are cheap and easy to check, and a clogged engine air filter can measurably reduce performance and economy.

Fluids age with time as well as mileage. Brake fluid absorbs moisture, coolant loses its corrosion protection, transmission fluid and differential fluid break down with heat and shear, and power steering fluid degrades in a system that gets hot. Even a car that is driven gently a few thousand miles a year benefits from a periodic fluid check and from following the time-based part of the schedule.

Some items are seasonal. Before winter, check battery health, coolant freeze protection, tire condition, lights, and wiper blades, and consider switching to winter-rated washer fluid. Before summer, check the cooling system, air conditioning performance, tire pressure (which rises with temperature), and the condition of belts. Two short seasonal checkups a year prevent most weather-related breakdowns.

Keep records. A folder or spreadsheet with dates, mileage, receipts, and work performed helps you avoid duplicate services, proves maintenance history if you sell the car, and makes it far easier for a technician to diagnose a new problem. Modern cars may also store some service data, but paper or digital receipts are still worth keeping.

Learn the warning signs. A dashboard light, a new noise, a vibration, a pull to one side, a change in pedal feel, a smell of burning or sweetness, or fluid on the driveway all mean stop and investigate. Of these, the oil pressure and coolant temperature warnings are the ones never to ignore: continuing to drive with either can turn a modest repair into engine replacement.

Finally, resist the temptation to skip small items. Belts, hoses, filters, and fluids are inexpensive compared with the components they protect, and most of them are designed to be replaced on a schedule rather than run to failure. A car that receives the boring, regular attention lasts longer, costs less to own, and is safer every time you drive it.`,
  },
  {
    slug: "how-to-improve-fuel-economy",
    category: "fuel-economy",
    title: "How to improve fuel economy",
    content: `EPA fuel economy ratings exist so different vehicles can be compared under the same test conditions, but real-world economy always differs from the window sticker. Traffic, temperature, terrain, cargo, tire pressure, and driving style all move the needle. The good news is that the factors within your control are mostly free to manage.

Driving style is the largest lever. Aggressive acceleration burns fuel quickly, and hard braking throws away the energy you just paid for. Smooth, progressive inputs and anticipating traffic ahead let you coast more and brake less. On the highway, aerodynamic drag rises steeply with speed, so a steady moderate pace is considerably more economical than a fast one, and cruise control can help on level ground where it is safe to use.

Tire pressure directly affects rolling resistance. Tires that are underinflated require more energy to roll and also wear faster, so checking pressures monthly against the placard on the door jamb is one of the cheapest economy improvements available. Load matters too: unnecessary weight in the trunk or bed means the engine works harder in city driving, and a roof rack or cargo box — even when empty — disrupts airflow and costs fuel at highway speeds. Remove them when they are not in use.

Climate control has a cost. Running the air conditioning puts a load on the engine, particularly in stop-and-go traffic, so on mild days opening the windows or using the ventilation fan is cheaper. At highway speeds, open windows create enough drag that running the A/C is often the more efficient choice. In hot weather, using the recirculate mode cools the cabin faster and reduces the load, and in an electric or hybrid vehicle preconditioning the cabin while still plugged in shifts that energy to the grid instead of the battery.

Short trips are disproportionately expensive. A cold engine runs richer and the catalytic converter has not reached operating temperature, so fuel economy is worst in the first few minutes of driving. Combining errands into one longer trip, letting the engine warm up by driving gently rather than idling, and avoiding unnecessary warm-up idling all help. Idling gets you zero miles per gallon, so switching the engine off during long waits is worthwhile where it is safe and practical.

Fuel choice matters less than marketing suggests. Using the octane rating recommended by the manufacturer is correct; putting premium fuel in an engine designed for regular does not add power or economy. Conversely, using a lower octane than specified can cause detonation in engines that require premium, which hurts both performance and efficiency. Keep the fuel system and air filter maintained, since a restricted air filter or dirty injectors cost efficiency over time.

Trip planning adds up. Combining stops, choosing routes with fewer traffic lights and less congestion, parking once and walking between nearby errands, and avoiding peak-hour gridlock all reduce the fuel burned per mile. In cold weather, expect worse economy until the engine warms up, and note that winter blended fuel and increased idling both contribute.

Track your own numbers. Fill the tank completely, note the odometer, drive normally, then refill and divide miles driven by gallons used. Comparing a few tanks in a row reveals whether a change in economy is real — and a sudden drop that is not explained by conditions or habits often points at a maintenance need such as low tire pressure, a clogged filter, worn spark plugs, or an issue that a scan can identify.

For hybrid and electric drivers, different techniques apply: gentle use of the accelerator keeps the car in its efficient operating range, using regenerative braking to slow down recovers energy, and in an electric vehicle planning around charge state and temperature (preconditioning while plugged in, for example) makes a larger difference than any single driving trick.`,
  },
  {
    slug: "ev-charging-range-and-battery-health",
    category: "ev-ownership",
    title: "EV charging, range, and battery health",
    content: `Electric vehicles refill differently from gas cars, and understanding charging levels makes ownership much easier. Level 1 charging uses an ordinary 120-volt household outlet and the portable cord that comes with the car; it adds roughly three to five miles of range per hour, which is often enough for drivers with short commutes who can leave the car plugged in overnight. Level 2 uses a 240-volt circuit and a dedicated charger, the kind installed in a garage or at public stations, and typically refills a typical battery overnight or in a few hours. DC fast charging is the high-power equipment found along highways: it can add a large share of charge in twenty to forty minutes, though the rate slows considerably as the battery fills.

Most daily charging happens at home or work, because a full or nearly full battery each morning removes the need to visit a charging station at all. If you are considering a home Level 2 installation, the circuit capacity, outlet type, and wiring must be handled by a qualified electrician, and the charger's amperage determines how quickly the car charges. Public networks are growing, and most drivers use apps or the car's built-in navigation to locate compatible stations and check whether they are working before arriving.

Rated range is a comparison figure measured under controlled conditions, and real-world range varies with speed, weather, terrain, cabin heating, and driving style. Cold weather is the biggest single factor: low temperatures slow the battery's chemistry and heating the cabin draws energy directly from the pack, so winter range can be noticeably lower than the rating. The practical countermeasure is preconditioning — warming or cooling the car while it is still plugged in — which uses grid power instead of range, and many cars do this automatically on a scheduled departure time.

Battery health improves with sensible habits. Lithium-ion packs age with time, charge cycles, and exposure to extreme states of charge. For daily use, keeping the battery roughly between twenty and eighty percent is gentler than routinely charging to full or running it to empty, and many cars let you set a daily charge limit for exactly this reason. Leaving a car at a high state of charge for weeks parked, or at a very low one, adds stress; if the car will sit unused for a long time, the manufacturer's storage guidance is worth following. Fast charging generates more heat than slow charging, which is fine in moderation, but a pattern of daily fast charging accelerates wear compared with mostly home charging.

Modern EV batteries are engineered to retain most of their capacity over the years, and manufacturers back the pack with warranties that specify capacity retention over a period or mileage — the exact terms vary by maker, so check yours. Degradation is gradual rather than sudden, and a small amount of loss is normal. If range seems to drop abruptly rather than slowly, that is worth having diagnosed under warranty.

Charging connectors vary by region and manufacturer, so it pays to know which plug your car uses and which networks support it, either directly or with an adapter. Filtering station searches by connector type, power level, and availability saves wasted trips, and arriving at a fast charger with the battery warm and at a low state of charge gives the fastest charging rate the car will accept.

Electric vehicles also change the maintenance picture. There are no oil changes, no spark plugs, and far fewer filters, and regenerative braking means the conventional brake pads last much longer because most slowing is done by the motor acting as a generator. On the other hand, EVs are heavy and deliver instant torque, so tires tend to wear faster than on a similar gasoline car — keeping pressures correct and watching tread wear matters more, not less.

Finally, plan for the end of the battery's life as well as the beginning. Batteries are increasingly recycled to recover lithium, nickel, cobalt, and other materials, and reputable manufacturers and recyclers handle retired packs. Asking about recycling provisions when you buy is a reasonable question, and it is a reminder that an EV battery is a serviceable, warrantied component rather than a mystery box.`,
  },
];

async function main() {
  const now = new Date().toISOString();
  const rows = ARTICLES.map((a) => ({
    id: uuidFrom(`article:${a.slug}`),
    title: a.title,
    slug: a.slug,
    content: a.content,
    category: a.category,
    related_vehicle_id: null,
    author: AUTHOR,
    published_at: now,
    updated_at: now,
    status: "published",
  }));

  console.log(`Upserting ${rows.length} published guides …`);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/articles?on_conflict=slug`, {
    method: "POST",
    headers: {
      apikey: SERVICE_KEY,
      authorization: `Bearer ${SERVICE_KEY}`,
      "content-type": "application/json",
      Prefer: "resolution=merge-duplicates,return=representation",
    },
    body: JSON.stringify(rows),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`FAILED ${res.status}: ${text.slice(0, 500)}`);
    process.exit(1);
  }
  const inserted = JSON.parse(text);
  console.log(`Done: ${inserted.length} guides published.`);
  for (const r of inserted) console.log(`  /guides/${r.slug}  [${r.category}] ${r.title}`);
}

main().catch((err) => {
  console.error("SEED FAILED:", err.message);
  process.exit(1);
});

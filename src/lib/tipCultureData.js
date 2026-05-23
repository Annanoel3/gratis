// Static, research-based tipping culture data for known countries.
// Used by InternationalInsight to provide accurate context without relying solely on LLM.
// Sources: Wikipedia List of Tipping Customs, Lonely Planet, LendingTree, Toast Restaurant Trends.

export const TIP_CULTURE_DATA = {
  "italy": {
    summary: "Tipping in Italy is optional and modest. The local custom is 'lasciare il resto' — leaving the change, not a percentage. Rounding up or leaving €1–2 per person is appropriate. A 'coperto' (cover charge of €1–4/person) is standard at sit-down restaurants and is NOT a tip — it covers bread and table service.",
    basePercent: 7,
    range: "0–10%",
    noTip: false,
    culturalNote: "Coperto cover charge is standard and separate from a tip. Never feel obligated to leave 15–20%.",
  },
  "france": {
    summary: "French restaurants are legally required to include a service charge ('service compris') of ~15% in the listed price, so tipping is genuinely optional. When French people do tip, they leave a small 'pourboire' — €2–5, not a percentage. Leaving 20% American-style would surprise most French servers.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "Service is legally included in the menu price. Any tip is an optional extra, not an expectation.",
  },
  "germany": {
    summary: "Germans tip by 'Aufrunden' — rounding up to a convenient number. If the bill is €37, you say 'mach's vierzig' (make it forty) when paying. Always tell the server what you're paying rather than waiting for change. In nicer restaurants, 5–10% is normal.",
    basePercent: 8,
    range: "5–10%",
    noTip: false,
    culturalNote: "State the total you're paying directly to the server — leaving cash on the table and walking out can cause confusion.",
  },
  "spain": {
    summary: "Tipping in Spain is genuinely optional — locals often don't tip at all, especially in smaller cities. Leaving coins or rounding up is the traditional gesture. In Madrid and Barcelona's upscale restaurants, 5–10% is natural for good service. Service staff are paid regular wages.",
    basePercent: 7,
    range: "0–10%",
    noTip: false,
    culturalNote: "Dropping coins on the receipt dish is very Spanish. No obligation to calculate a percentage.",
  },
  "portugal": {
    summary: "Portugal is one of Europe's least tip-focused countries. Locals often leave nothing or round up slightly. Lisbon and Porto's tourist restaurants have grown toward 10–15% expectations from foreign visitors, but in rural areas tipping is rare. The 'couvert' (bread/olives at table start) is a standard charge, not a tip.",
    basePercent: 6,
    range: "0–10%",
    noTip: false,
    culturalNote: "The couvert charge for bread and olives is standard — don't confuse it with a tip or feel obligated to add more.",
  },
  "united kingdom": {
    summary: "Check your bill for a 'discretionary service charge' (usually 12.5%) before tipping — you can legally request its removal. If no service charge is listed, 10–15% is standard at sit-down restaurants. Ordering at a pub bar: no tip expected. The British 'and one for yourself?' is a classic way to tip a bartender.",
    basePercent: 12,
    range: "10–15%",
    noTip: false,
    culturalNote: "Always check for 12.5% service charge before adding more. At pub bar counters, tipping is not expected.",
  },
  "ireland": {
    summary: "In sit-down restaurants, 10–15% is standard. Irish pubs where you order at the bar: no tip expected. Check whether a service charge is already on the bill. Irish servers are paid better wages than Americans but still appreciate tips genuinely.",
    basePercent: 12,
    range: "10–15%",
    noTip: false,
    culturalNote: "Ordering at an Irish pub bar: no tip. Table-service restaurants: 10–15%. Always check the bill first.",
  },
  "netherlands": {
    summary: "The Dutch tip by rounding up to a convenient number — not by calculating a percentage. If the bill is €28, handing over €30 and saying 'that's fine' is perfectly generous. In nicer restaurants, 10% is appropriate. Strong minimum wage laws mean tips are a genuine thank-you, not a survival mechanism.",
    basePercent: 8,
    range: "5–10%",
    noTip: false,
    culturalNote: "Round up, don't calculate percentages. The Dutch are straightforward about money — a simple round-up is completely appropriate.",
  },
  "switzerland": {
    summary: "Service charges (~15%) are legally included in Swiss restaurant prices, so tips are truly optional extras. Swiss locals typically round up slightly — if the bill is CHF 47, leaving CHF 50 is generous. Switzerland's costs are high, so even small tips represent real money.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "Service charge is legally included in all listed prices. Any tip is a bonus — even a small round-up is well-received.",
  },
  "sweden": {
    summary: "Sweden's service staff earn professional wages and tipping is not expected. In Stockholm's fine dining scene, rounding up or leaving 5–10% for genuinely excellent service is appreciated. Digital payment terminals now prompt for tips in Sweden, which many locals find awkward — you're free to skip.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "No tipping obligation. Digital tip prompts are common but skipping them is completely normal in Swedish culture.",
  },
  "norway": {
    summary: "Norway is nearly cashless and one of the wealthiest countries per capita — service workers earn full professional wages. Tipping is not expected. In Oslo's upscale restaurants, 5–10% for excellent service is a thoughtful gesture. Card terminals prompt for tips everywhere — you're free to skip.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "Nearly cashless society. Workers earn full professional wages. Skipping a tip prompt carries no social weight.",
  },
  "denmark": {
    summary: "Danish workers earn strong wages and tipping is not culturally expected. In Copenhagen's world-class restaurant scene, 5–10% for excellent service is a kind gesture. Casual restaurants, cafes, and street food: no tipping norm at all. Card payment dominates — tip prompts appear but are routinely skipped.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "You pay the menu price — that's the full, honest cost. Any tip is a sincere personal gift, not an obligation.",
  },
  "finland": {
    summary: "Finland shares Scandinavia's tipping culture: workers earn fair wages and tipping is not expected. In Helsinki's upscale restaurants, a small round-up or 5–10% is appreciated. Casual restaurants and bars: no tip expected. Card payment is universal.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "Same as the broader Scandinavian norm: tips are a genuine thank-you, not an expectation.",
  },
  "greece": {
    summary: "Greece has a genuine tipping culture. At sit-down restaurants, 10% is standard. Leave cash tips on the table directly — Greeks prefer this to ensure the server receives it. Complimentary dessert or shots of ouzo/raki at the end of a meal are a traditional gift, not a prompt for a bigger tip.",
    basePercent: 10,
    range: "5–15%",
    noTip: false,
    culturalNote: "Leave cash on the table, not on the card. The complimentary ouzo at the end is a hospitality gesture — not a tip request.",
  },
  "czech republic": {
    summary: "In Prague, 10% is standard and expected in tourist-zone restaurants. The Czech method: tell the server what you're paying when they collect. If the bill is 380 Kč, hand over 400 Kč and say 'čtyři sta' — the difference is the tip. Outside Prague, rounding up is enough.",
    basePercent: 10,
    range: "5–15%",
    noTip: false,
    culturalNote: "State your payment total before the server processes it — don't wait for change and then decide.",
  },
  "poland": {
    summary: "Poland has a clear tipping culture: 10–15% at sit-down restaurants. Polish servers earn lower wages than Western European counterparts and tips supplement income meaningfully. Tell the server your payment amount before they run the transaction. At traditional milk bars (bar mleczny), no tipping — they're self-service canteens.",
    basePercent: 12,
    range: "10–15%",
    noTip: false,
    culturalNote: "Tip by stating the total you're paying before the transaction. At Soviet-era milk bar canteens: no tip expected.",
  },
  "russia": {
    summary: "In Moscow and St. Petersburg restaurants, 10% in cash given directly to the server is standard. Always tip in cash — card tips are uncommon and may not reach the server. Outside major cities, tipping culture is less established. Stolovaya (cafeteria-style Soviet canteens): no tipping.",
    basePercent: 10,
    range: "5–15%",
    noTip: false,
    culturalNote: "Cash tips only — hand them directly to the server. Coat check attendants are also traditionally tipped.",
  },
  "japan": {
    summary: "Tipping in Japan is not just unnecessary — in many situations it is considered rude or insulting. Japanese service is driven by 'omotenashi,' a philosophy of selfless hospitality given from professional pride, not for financial reward. Attempting to tip may cause discomfort or confusion. The server may refuse or chase after you to return the money.",
    basePercent: 0,
    range: "0%",
    noTip: true,
    culturalNote: "Never tip in Japan. Express appreciation by saying 'oishikatta desu' (it was delicious) or bowing. Leaving cash on the table is not a tip — it will be returned to you.",
  },
  "south korea": {
    summary: "Tipping is not practiced in South Korea and can embarrass the recipient. Service is a professional duty driven by personal and workplace pride, not by financial incentive. The vast majority of restaurants, cafes, and taxis operate entirely without tips. High-end international hotels in Seoul are the one partial exception for bellhops and housekeeping.",
    basePercent: 0,
    range: "0%",
    noTip: true,
    culturalNote: "Do not tip. Saying 'mashisseoyo' (it was delicious) or leaving a positive review is far more meaningful.",
  },
  "china": {
    summary: "Tipping in China is generally not practiced and can cause face-related awkwardness. An extra payment can imply the worker is underpaid, which is a sensitive suggestion. Tour guides are one notable exception — tipping ¥50–100 per day is expected. International hotels in Shanghai and Beijing have adapted to Western norms for bellhops and concierge.",
    basePercent: 0,
    range: "0%",
    noTip: true,
    culturalNote: "Do not tip at restaurants, cafes, or taxis. Tour guides are the primary exception where a tip is expected.",
  },
  "thailand": {
    summary: "Thailand's tipping culture blends local tradition with tourism influence. Local street food stalls: no tip. Mid-range and upscale restaurants often include a 10% service charge — check the bill. Massage therapists (Thailand's traditional massage is world-famous) should receive 50–100 baht above the service fee. Touristy areas expect 10–15%.",
    basePercent: 10,
    range: "0–15%",
    noTip: false,
    culturalNote: "Thai massage therapists: 50–100 baht tip is important and impactful. Street food vendors: never tip.",
  },
  "vietnam": {
    summary: "Traditional Vietnamese restaurants and street food: no tip expected. Tourist-facing sit-down restaurants in Hanoi's Old Quarter and Ho Chi Minh City: 10–15% is appreciated. Tour guides receive $3–5 USD per person per day for group tours, $10–15 for private — one of the strongest tipping norms in the country.",
    basePercent: 8,
    range: "0–15%",
    noTip: false,
    culturalNote: "Tour guide tipping is strong cultural expectation. Plastic-chair sidewalk restaurants: no tip needed.",
  },
  "indonesia": {
    summary: "Bali has adopted Western tipping norms significantly — 10% is standard in tourist restaurants and beach clubs. Local warungs (family-owned casual eateries) serve excellent food at low prices with no tipping expectation. Many menus display '++' which means tax and service charge will be added to the price.",
    basePercent: 10,
    range: "0–15%",
    noTip: false,
    culturalNote: "Check menus for '++' notation — this means service charge is already included. Warungs: never tip.",
  },
  "singapore": {
    summary: "Locals don't tip in Singapore, but tourists are often expected to. At hawker centres — the iconic outdoor food courts — tipping never happens and would confuse vendors. At restaurant-style establishments, a mandatory 10% service charge is automatically included in the bill. Luxury hotels follow international norms.",
    basePercent: 5,
    range: "0–10%",
    noTip: false,
    culturalNote: "Hawker centres: never tip. Restaurants: 10% service charge is mandatory and already included in your bill.",
  },
  "australia": {
    summary: "Australia is transitioning toward tipping culture but it's not obligatory. Pubs and counter-service cafes: no tip expected. At table-service restaurants, 10% for good service is appreciated and increasingly normal. Australia has one of the world's highest minimum wages — workers aren't dependent on tips to make rent.",
    basePercent: 10,
    range: "0–15%",
    noTip: false,
    culturalNote: "Tip if you loved it; don't feel bad if you didn't. Counter-service and pubs: no tip needed.",
  },
  "new zealand": {
    summary: "New Zealand leans firmly toward the no-tipping end. Locals rarely tip at restaurants, cafes, or bars, and no server will make you feel awkward for not leaving extra. Tipping is not offensive — if you had exceptional service and want to leave something, it's warmly received. Auckland and Wellington's fine dining: 10% is a lovely gesture.",
    basePercent: 8,
    range: "0–10%",
    noTip: false,
    culturalNote: "Price is price in New Zealand. A sincere thank-you in words is just as valued as cash.",
  },
  "canada": {
    summary: "Canada's tipping culture closely mirrors the US — 15–20% at sit-down restaurants is expected. Servers in most provinces earn low base wages with tip credits and rely heavily on gratuities. Toronto and Vancouver see 18–20% as standard. During harsh winters, tipping delivery drivers generously (20%+) is considered a mark of good character.",
    basePercent: 18,
    range: "15–20%",
    noTip: false,
    culturalNote: "Very similar to US norms. Quebec historically tips slightly less. Winter delivery workers especially deserve generosity.",
  },
  "mexico": {
    summary: "Mexico has a strong tipping culture — service workers depend on tips as a core part of income because base wages are very low. 15% is the standard minimum at restaurants; 20% for great service. Street taco stands and market stalls: a small tip is appreciated but not expected. Tips in USD are welcome in tourist areas.",
    basePercent: 15,
    range: "10–20%",
    noTip: false,
    culturalNote: "Workers earn very low base wages — tips are critically important here, more so than in the US.",
  },
  "brazil": {
    summary: "Brazil has a legally mandated 10% service charge ('taxa de serviço') automatically added to most restaurant bills. Because this charge exists, additional tipping is genuinely optional. For outstanding service, Brazilians leave a small extra amount in cash. Hair salons tip 10–20% above the service price.",
    basePercent: 10,
    range: "0–15%",
    noTip: false,
    culturalNote: "10% taxa de serviço is already in your bill. Check before adding more — you're often already tipping.",
  },
  "argentina": {
    summary: "Argentina has a clear tipping culture: 10% is the standard at restaurants. Cash tips are strongly preferred — card tips may be delayed or deducted before reaching staff. Given Argentina's high inflation, USD tips are particularly valued in Buenos Aires. In rural Argentina, rounding up is sufficient.",
    basePercent: 10,
    range: "10–15%",
    noTip: false,
    culturalNote: "USD tips go a very long way given Argentina's inflation. Always tip in cash directly to the server.",
  },
  "uae": {
    summary: "A 10% service charge is added by law to restaurant bills in the UAE, but additional tips are still expected and appreciated — many hospitality workers are migrant workers on modest wages. At Dubai's luxury hotels, 10–20% on top of the service charge is common. Valet parking, tipping AED 5–10, is ubiquitous.",
    basePercent: 15,
    range: "10–20%",
    noTip: false,
    culturalNote: "10% service charge is legally mandatory, but tipping more is still expected. Dubai hospitality staff are often migrant workers for whom tips are very impactful.",
  },
  "israel": {
    summary: "Israel has a strong restaurant tipping culture — 12–15% is standard. Israeli restaurant workers earn low base wages and depend on tips. Cash is preferred. Quick-service hummus shops and falafel stands: no tip. Sit-down restaurants with table service: 15% is the comfortable baseline in Tel Aviv.",
    basePercent: 13,
    range: "12–18%",
    noTip: false,
    culturalNote: "Hummus shops and falafel counters: no tip. Table-service restaurants: 15%. Cash preferred over card.",
  },
  "turkey": {
    summary: "Turkey has a moderate tipping culture. In restaurants, 5–10% is the norm. The local way is 'üstü kalsın' (keep the change). Hammam (Turkish bath) attendants receive a significant tip — 15–20% on top of the bath fee is standard and important, as the service is very hands-on. Istanbul tourist districts expect 10–15%.",
    basePercent: 8,
    range: "5–15%",
    noTip: false,
    culturalNote: "Say 'üstü kalsın' (keep the change) when tipping. Hammam attendants always receive significant tips.",
  },
  "egypt": {
    summary: "Egypt has one of the world's strongest tipping cultures, built around 'baksheesh' — a social payment with deep cultural roots. At tourist restaurants, 10% in cash directly to the server is standard even when a service charge is included. Keep small bills on hand at all times — baksheesh applies everywhere from restaurants to historic sites.",
    basePercent: 12,
    range: "10–15%",
    noTip: false,
    culturalNote: "Baksheesh is a deep cultural tradition, not just a restaurant tip. Have 5–20 EGP bills ready at all times.",
  },
  "south africa": {
    summary: "South Africa has a clear tipping culture shaped by significant income inequality. 10–15% at restaurants is standard. Car guards (informal parking lot workers) expect R5–10 — this is their livelihood. Petrol station attendants who fill your tank get R5–10. Safari tour guides receive 10–15% of the tour cost.",
    basePercent: 13,
    range: "10–20%",
    noTip: false,
    culturalNote: "Car guards (parking lot attendants) and petrol station attendants always get tipped — this is their primary income.",
  },
  "morocco": {
    summary: "Morocco has a tipping culture rooted in both local tradition and tourism. Tourist-facing restaurants: 10% is expected. At riads (traditional guesthouses), housekeeping gets 20–50 MAD per day. Hammam attendants always receive a tip. Unofficial medina guides expect payment — agree on terms before accepting help.",
    basePercent: 10,
    range: "5–15%",
    noTip: false,
    culturalNote: "Riad housekeeping tips are important. Unsolicited medina guides will expect payment — decide before you follow.",
  },
  "india": {
    summary: "India's tipping culture is context-dependent. Upscale restaurants in major cities: 10% is standard. Local dhabas and thali spots: no tip expected. A service charge of 5–10% is often already included at upscale restaurants — check before adding more. Baksheesh for small services (bags, doors, parking) is culturally normal.",
    basePercent: 10,
    range: "5–15%",
    noTip: false,
    culturalNote: "Check for pre-added service charge at upscale restaurants. Dhabas and local thali spots: no tip expected.",
  },
};

export function getCountryCultureData(country) {
  if (!country) return null;
  const key = country.toLowerCase().trim();
  // Direct match
  if (TIP_CULTURE_DATA[key]) return TIP_CULTURE_DATA[key];
  // Alias matching
  if (key === 'uk' || key === 'great britain' || key === 'england' || key === 'scotland' || key === 'wales') return TIP_CULTURE_DATA['united kingdom'];
  if (key === 'nippon') return TIP_CULTURE_DATA['japan'];
  if (key === 'korea') return TIP_CULTURE_DATA['south korea'];
  if (key === 'prc' || key === "people's republic of china") return TIP_CULTURE_DATA['china'];
  if (key === 'méxico') return TIP_CULTURE_DATA['mexico'];
  if (key === 'türkiye') return TIP_CULTURE_DATA['turkey'];
  if (key === 'italia') return TIP_CULTURE_DATA['italy'];
  if (key === 'españa') return TIP_CULTURE_DATA['spain'];
  if (key === 'brasil') return TIP_CULTURE_DATA['brazil'];
  if (key === 'uae' || key === 'dubai' || key === 'abu dhabi' || key === 'united arab emirates') return TIP_CULTURE_DATA['uae'];
  if (key === 'viet nam') return TIP_CULTURE_DATA['vietnam'];
  if (key === 'bali') return TIP_CULTURE_DATA['indonesia'];
  if (key === 'czechia' || key === 'czech') return TIP_CULTURE_DATA['czech republic'];
  if (key === 'hellas') return TIP_CULTURE_DATA['greece'];
  return null;
}
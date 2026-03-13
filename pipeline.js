// Indicative Deal Pipeline - Sourced from major broker listings March 2026
// Note: Pricing indicative based on market cap rates; actual pricing confidential

const dealPipeline = [
  // JAPAN - Industrial & Logistics
  {
    id: 1,
    property: "Molex Japan - Yamato HQ",
    address: "1-5-4 Fukami-higashi, Yamato",
    city: "Kanagawa",
    country: "Japan",
    type: "Industrial",
    subtype: "Distribution",
    size_sqm: 14087,
    price_usd: 42000000,
    yield_pct: 4.2,
    status: "Under Contract",
    broker: "JLL",
    notes: "Modern logistics facility, strong tenant"
  },
  {
    id: 2,
    property: "Opella Osaka DC",
    address: "5-chome Torikaihonmachi, Settsu",
    city: "Osaka",
    country: "Japan",
    type: "Industrial",
    subtype: "Distribution Center",
    size_sqm: 5797,
    price_usd: 18500000,
    yield_pct: 4.0,
    status: "Under Contract",
    broker: "JLL",
    notes: "Pharma distribution, prime Osaka location"
  },
  {
    id: 3,
    property: "Shibuya Office Tower",
    address: "Shibuya Ward",
    city: "Tokyo",
    country: "Japan",
    type: "Office",
    subtype: "Grade B",
    size_sqm: 8500,
    price_usd: 85000000,
    yield_pct: 3.5,
    status: "Available",
    broker: "CBRE",
    notes: "Value-add potential, ESG upgrade candidate"
  },
  {
    id: 4,
    property: "Misato Logistics Land",
    address: "2-chome Hikoito, Misato",
    city: "Saitama",
    country: "Japan",
    type: "Land",
    subtype: "Development",
    size_sqm: 5110,
    price_usd: 12000000,
    yield_pct: null,
    status: "Available",
    broker: "JLL",
    notes: "Forward commit opportunity, zoned logistics"
  },

  // AUSTRALIA - Office & Industrial
  {
    id: 5,
    property: "468 St Kilda Road",
    address: "468 St Kilda Road",
    city: "Melbourne",
    country: "Australia",
    type: "Office",
    subtype: "Grade A",
    size_sqm: 12500,
    price_usd: 62000000,
    yield_pct: 5.8,
    status: "Available",
    broker: "Knight Frank / Colliers",
    notes: "Iconic St Kilda Rd, panoramic views, value-add"
  },
  {
    id: 6,
    property: "Peninsula Place",
    address: "454-472 Nepean Highway, Frankston",
    city: "Melbourne",
    country: "Australia",
    type: "Office",
    subtype: "Suburban",
    size_sqm: 4200,
    price_usd: 18000000,
    yield_pct: 6.5,
    status: "Available",
    broker: "Knight Frank / C&W",
    notes: "SE Melbourne growth corridor"
  },
  {
    id: 7,
    property: "66 Annerley Road",
    address: "66 Annerley Road, Woolloongabba",
    city: "Brisbane",
    country: "Australia",
    type: "Office",
    subtype: "Healthcare",
    size_sqm: 724,
    price_usd: 4500000,
    yield_pct: 6.2,
    status: "Available",
    broker: "JLL",
    notes: "Medical precinct, strong tenant profile"
  },
  {
    id: 8,
    property: "Surry Hills Creative Office",
    address: "Crown Street, Surry Hills",
    city: "Sydney",
    country: "Australia",
    type: "Office",
    subtype: "Creative",
    size_sqm: 2800,
    price_usd: 32600000,
    yield_pct: 5.0,
    status: "Recently Sold",
    broker: "Knight Frank / JLL",
    notes: "2.5% vacancy, outperforming CBD rents"
  },
  {
    id: 9,
    property: "Eastern Creek Logistics",
    address: "Eastern Creek, Western Sydney",
    city: "Sydney",
    country: "Australia",
    type: "Industrial",
    subtype: "Logistics",
    size_sqm: 22000,
    price_usd: 55000000,
    yield_pct: 5.2,
    status: "Available",
    broker: "CBRE",
    notes: "Near intermodal, e-commerce tenant"
  },
  {
    id: 10,
    property: "Winston Glades Shopping Centre",
    address: "259 Ash Street, Flinders View",
    city: "Brisbane",
    country: "Australia",
    type: "Retail",
    subtype: "Neighbourhood",
    size_sqm: 10000,
    price_usd: 28000000,
    yield_pct: 6.8,
    status: "Call for Offers",
    broker: "JLL",
    notes: "Anchored retail, defensive income"
  },

  // SINGAPORE - Industrial
  {
    id: 11,
    property: "218 Pandan Loop",
    address: "218 Pandan Loop",
    city: "Singapore",
    country: "Singapore",
    type: "Industrial",
    subtype: "Food Manufacturing",
    size_sqm: 18500,
    price_usd: 75000000,
    yield_pct: 5.0,
    status: "Lease Available",
    broker: "CBRE",
    notes: "Purpose-built food facility, cold chain"
  },
  {
    id: 12,
    property: "Jurong Industrial Hub",
    address: "Jurong West",
    city: "Singapore",
    country: "Singapore",
    type: "Industrial",
    subtype: "Multi-User",
    size_sqm: 8200,
    price_usd: 42000000,
    yield_pct: 4.8,
    status: "Available",
    broker: "JLL",
    notes: "Near Tuas Port, JTC leasehold"
  },
  {
    id: 13,
    property: "Changi Business Park Office",
    address: "Changi Business Park",
    city: "Singapore",
    country: "Singapore",
    type: "Office",
    subtype: "Business Park",
    size_sqm: 5500,
    price_usd: 38000000,
    yield_pct: 4.2,
    status: "Available",
    broker: "Savills",
    notes: "Tech tenant, modern spec"
  },

  // HONG KONG - Office
  {
    id: 14,
    property: "Kowloon Bay Office Floor",
    address: "Kowloon Bay",
    city: "Hong Kong",
    country: "Hong Kong",
    type: "Office",
    subtype: "Grade A Strata",
    size_sqm: 2300,
    price_usd: 45000000,
    yield_pct: 4.5,
    status: "Available",
    broker: "Savills",
    notes: "Distressed seller, 30% below peak"
  },
  {
    id: 15,
    property: "Central Core Office",
    address: "Des Voeux Road Central",
    city: "Hong Kong",
    country: "Hong Kong",
    type: "Office",
    subtype: "Grade A",
    size_sqm: 1800,
    price_usd: 72000000,
    yield_pct: 3.8,
    status: "Available",
    broker: "CBRE",
    notes: "Trophy location, rare availability"
  },
  {
    id: 16,
    property: "Kwun Tong Industrial Conversion",
    address: "Kwun Tong",
    city: "Hong Kong",
    country: "Hong Kong",
    type: "Industrial",
    subtype: "Conversion Candidate",
    size_sqm: 6500,
    price_usd: 55000000,
    yield_pct: 5.5,
    status: "Available",
    broker: "Knight Frank",
    notes: "Data center / office conversion play"
  }
];

// Summary stats
const pipelineStats = {
  totalDeals: dealPipeline.length,
  totalValue: dealPipeline.reduce((sum, d) => sum + (d.price_usd || 0), 0),
  byCountry: {
    Japan: dealPipeline.filter(d => d.country === "Japan"),
    Australia: dealPipeline.filter(d => d.country === "Australia"),
    Singapore: dealPipeline.filter(d => d.country === "Singapore"),
    HongKong: dealPipeline.filter(d => d.country === "Hong Kong")
  },
  byType: {
    Office: dealPipeline.filter(d => d.type === "Office"),
    Industrial: dealPipeline.filter(d => d.type === "Industrial"),
    Other: dealPipeline.filter(d => !["Office", "Industrial"].includes(d.type))
  },
  avgYield: dealPipeline.filter(d => d.yield_pct).reduce((sum, d) => sum + d.yield_pct, 0) / dealPipeline.filter(d => d.yield_pct).length
};

// Export for use
window.dealPipeline = dealPipeline;
window.pipelineStats = pipelineStats;

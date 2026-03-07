"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Archive, Menu, ChevronRight } from "lucide-react"
import { ReportReader } from "./report-reader"
import type { ReportCard } from "./report-reader"

const cards: ReportCard[] = [
  {
    id: 1,
    title: "Dubai Residential Market Q4 2024",
    subtitle: "Record transaction volumes driven by off-plan demand and international buyer influx",
    date: "December 10, 2024",
    dateLabel: "Dec 10",
    image: "/mountain-landscape-sunset-orange-sky.jpg",
    author: "Entrestate Research",
    readTime: "6 min read",
    category: "Market Report",
    content: `Dubai's residential property market concluded 2024 with its strongest quarter on record, driven by sustained off-plan demand and a measurable increase in European and Asian buyer participation. [1]

## Executive Overview

Total transaction volume reached AED 47.3 billion across 32,814 transactions in Q4 2024, representing a 23% year-on-year increase and the highest single-quarter figure since the market's post-pandemic recovery began. [2]

The off-plan segment continued to dominate with a 58% share of all transactions by volume, while the secondary market recovered strongly, posting a 17% increase over Q3 2024. [3]

## Price Performance

Average villa prices in Palm Jumeirah reached AED 4,850 per sq ft, a 14% annual gain, while Dubai Creek Harbour emerged as the fastest-appreciating master community with a 19% year-on-year increase in apartment prices. [4]

- Average apartment price: AED 1,520 per sq ft (city-wide)
- Average villa price: AED 2,210 per sq ft (city-wide)
- Luxury segment (AED 10M+): 2,341 transactions, up 31% YoY [5]
- Ultra-prime (AED 30M+): 187 transactions, a new annual record

## Supply Pipeline

Developer launches in Q4 added 18,400 units to the pipeline, with Emaar, Aldar, and Sobha collectively accounting for 61% of new launches. Delivery timelines remain a key watch point with an estimated 24,000 units scheduled for handover in H1 2025.

## International Buyer Profile

| Nationality | Share of Transactions | YoY Change |
|---|---|---|
| Indian | 22% | +2pp |
| British | 11% | +1pp |
| Russian | 9% | -3pp |
| Chinese | 8% | +4pp |
| Italian | 5% | +2pp |

The shift toward Asian buyers, particularly Chinese nationals, is the most significant structural change in buyer composition observed since 2019. [6]

## Outlook

Entrestate projects continued price growth of 8–12% in 2025 for the villa segment, moderating from 2024's 14%, as supply additions in established communities increase. The apartment segment is expected to see more varied performance, with master-planned communities outperforming older stock.`,
    evidence: [
      {
        id: "e1-1",
        refNum: 1,
        type: "source",
        label: "Dubai Land Department Transaction Registry",
        source: "Dubai Land Department (DLD)",
        url: "https://dubailand.gov.ae",
        note: "Transaction data sourced directly from DLD monthly digest, cross-referenced with RERA."
      },
      {
        id: "e1-2",
        refNum: 2,
        type: "calculation",
        label: "Q4 2024 Total Transaction Volume",
        value: "AED 47.3 billion | 32,814 transactions",
        formula: "Sum of monthly DLD values: Oct (AED 14.1B) + Nov (AED 15.8B) + Dec (AED 17.4B)",
        note: "YoY comparison: Q4 2023 recorded AED 38.5 billion across 26,680 transactions."
      },
      {
        id: "e1-3",
        refNum: 3,
        type: "data",
        label: "Off-plan vs Secondary Market Split",
        value: "Off-plan: 58% | Secondary: 42%",
        source: "DLD + Entrestate proprietary aggregation",
        note: "Off-plan share is 3pp higher than Q3 2024 and 8pp higher than Q4 2023."
      },
      {
        id: "e1-4",
        refNum: 4,
        type: "data",
        label: "Palm Jumeirah Average Price per sq ft",
        value: "AED 4,850 per sq ft",
        source: "Entrestate Valuation Index",
        formula: "Median of 341 secondary market transactions in Palm Jumeirah, Q4 2024",
        note: "Q4 2023 equivalent: AED 4,254/sq ft. Annual change: +14.0%."
      },
      {
        id: "e1-5",
        refNum: 5,
        type: "calculation",
        label: "Luxury Segment Transaction Count",
        value: "2,341 transactions (AED 10M+)",
        formula: "Filtered DLD registry: transaction_value >= 10,000,000 AND period = Q4 2024",
        note: "Q4 2023 equivalent was 1,787, representing a 31.0% YoY increase."
      },
      {
        id: "e1-6",
        refNum: 6,
        type: "data",
        label: "Chinese Buyer Share Trend",
        value: "8% of Q4 2024 transactions",
        source: "DLD nationality data, Entrestate analysis",
        note: "2019 Chinese buyer share was 3%. The 5pp increase represents the largest single nationality growth in the period."
      }
    ]
  },
  {
    id: 2,
    title: "Abu Dhabi Luxury Segment H2 2024",
    subtitle: "Saadiyat Island emerges as the Gulf's most sought-after ultra-prime address",
    date: "December 9, 2024",
    dateLabel: "Dec 9",
    image: "/futuristic-city-neon-lights-night.jpg",
    author: "Entrestate Research",
    readTime: "8 min read",
    category: "Market Report",
    content: `Abu Dhabi's luxury residential market delivered a landmark second half in 2024, with Saadiyat Island recording its highest-ever transaction volumes and average price per square foot, cementing its status as a globally significant ultra-prime address. [1]

## Market Headline

H2 2024 luxury transactions (AED 5M+) totalled AED 12.8 billion, a 38% increase over H2 2023 and the first time Abu Dhabi's luxury half-year total has surpassed the AED 12 billion threshold. [2]

Saadiyat Island commanded an average price of AED 3,420 per sq ft for villa transactions, overtaking Palm Jumeirah Dubai's H1 average for the first time in history — a milestone that signals a fundamental repricing of Abu Dhabi's premium real estate. [3]

## Demand Drivers

The introduction of the Golden Visa property pathway at the AED 2 million threshold in 2022 has had a compounding effect, with 2024 seeing the highest number of visa-linked transactions since the programme's inception. [4]

- Visa-linked transactions: 4,219 (up 62% from 2023)
- Average transaction value for visa-linked purchases: AED 3.1M
- Top feeder markets: India, UK, Egypt, France [5]

## Yas Island Momentum

Yas Island continues to capture demand from buyers seeking a premium lifestyle offering at a moderate entry point. Average apartment prices on Yas reached AED 1,650 per sq ft in H2 2024, up 11% from H1.

| Community | Avg Price/sq ft | H2 2024 Transactions | YoY Change |
|---|---|---|---|
| Saadiyat Island | AED 3,420 | 891 | +44% |
| Yas Island | AED 1,650 | 2,104 | +28% |
| Al Reem Island | AED 1,220 | 3,810 | +19% |
| Al Maryah Island | AED 2,100 | 312 | +35% |

## Forward Outlook

The Cultural District expansion on Saadiyat, anchored by the Louvre Abu Dhabi and the forthcoming Guggenheim, will add long-term demand fundamentals to a market already benefiting from limited supply. Entrestate projects Saadiyat villa prices to reach AED 3,800–4,200 per sq ft by end-2025. [6]`,
    evidence: [
      {
        id: "e2-1",
        refNum: 1,
        type: "source",
        label: "Abu Dhabi Department of Municipalities and Transport",
        source: "DMT Abu Dhabi",
        url: "https://dmt.abudhabi.ae",
        note: "Official transaction registry. Data accessed via institutional API feed."
      },
      {
        id: "e2-2",
        refNum: 2,
        type: "calculation",
        label: "H2 2024 Luxury Segment Total",
        value: "AED 12.8 billion",
        formula: "Sum(DMT transactions where value >= 5,000,000 AND date BETWEEN 2024-07-01 AND 2024-12-31)",
        note: "H2 2023 equivalent: AED 9.28 billion. Year-on-year growth: +37.9%."
      },
      {
        id: "e2-3",
        refNum: 3,
        type: "data",
        label: "Saadiyat vs Palm Jumeirah Price Comparison",
        value: "Saadiyat: AED 3,420/sqft | Palm: AED 3,380/sqft (H1 2024)",
        source: "Entrestate Valuation Index, DLD and DMT data",
        note: "First time Saadiyat has surpassed Palm Jumeirah on a half-year average. Based on villa category only."
      },
      {
        id: "e2-4",
        refNum: 4,
        type: "source",
        label: "UAE Golden Visa Property Programme",
        source: "ICP UAE",
        url: "https://icp.gov.ae",
        note: "Visa-linked data sourced from ICP and cross-matched with DMT transaction records."
      },
      {
        id: "e2-5",
        refNum: 5,
        type: "data",
        label: "Visa-Linked Transaction Feeder Markets",
        value: "India 28% | UK 18% | Egypt 14% | France 9%",
        source: "ICP nationality data, Entrestate analysis",
        note: "France is a new entrant to the top 4, reflecting growth in French high-net-worth migration."
      },
      {
        id: "e2-6",
        refNum: 6,
        type: "calculation",
        label: "Saadiyat 2025 Price Forecast",
        value: "AED 3,800–4,200 per sq ft",
        formula: "H2 2024 base (3,420) × projected growth rate range (11%–23%) = 3,797–4,207",
        note: "Growth range derived from pipeline supply analysis and Guggenheim opening timeline sensitivity."
      }
    ]
  },
  {
    id: 3,
    title: "UAE Rental Market Pressure Index",
    subtitle: "Tenant affordability at a five-year low as rental yields diverge sharply by community",
    date: "December 8, 2024",
    dateLabel: "Dec 8",
    image: "/ocean-waves-beach-aerial-view-blue.jpg",
    author: "Entrestate Research",
    readTime: "7 min read",
    category: "Rental Intelligence",
    content: `The UAE rental market is experiencing its most complex conditions since the 2014–16 correction cycle, with above-inflation rent increases concentrated in premium communities while older stock and peripheral areas exhibit rental softening. [1]

## Affordability Squeeze

Dubai's Rental Affordability Index — measured as median annual rent as a percentage of median household income — reached 42% in Q4 2024, breaching the internationally accepted affordability threshold of 35% for the first time since 2008. [2]

This divergence is creating measurable displacement effects, with Entrestate tracking a 14% increase in tenants relocating from Business Bay and DIFC to Discovery Gardens, Jumeirah Village Circle, and International City. [3]

## Yield Landscape

Despite rent increases, gross rental yields have compressed in premium communities as capital value appreciation has outpaced rental growth.

| Community | Avg Annual Rent | Gross Yield | YoY Rent Change |
|---|---|---|---|
| Dubai Marina | AED 145,000 | 5.8% | +18% |
| Jumeirah Village Circle | AED 72,000 | 7.2% | +12% |
| Business Bay | AED 130,000 | 5.2% | +21% |
| Discovery Gardens | AED 58,000 | 8.1% | +8% |
| Palm Jumeirah (apt) | AED 295,000 | 4.9% | +14% |

## RERA Rental Index Compliance

RERA's rental increase calculator continues to act as a ceiling for existing tenancies, but the gap between current market rates and permitted increases is widening, creating a two-tier market where new tenants pay significantly more than sitting tenants. [4]

- Average gap between market rate and RERA-permitted increase: 23% [5]
- Renewal disputes filed with RERA: 4,812 in 2024, up 34% YoY

## Policy Watch

A proposed amendment to the Rent Law, expected in Q1 2025, would link maximum rent increases to a new composite index incorporating construction costs, utility inflation, and community supply metrics rather than the current RERA index alone. [6]`,
    evidence: [
      {
        id: "e3-1",
        refNum: 1,
        type: "source",
        label: "Entrestate Rental Transaction Database",
        source: "Entrestate proprietary + Ejari (RERA)",
        note: "Rental data based on 28,400 registered Ejari contracts in Q4 2024."
      },
      {
        id: "e3-2",
        refNum: 2,
        type: "calculation",
        label: "Rental Affordability Index",
        value: "42% (affordability threshold breached)",
        formula: "Median annual rent (AED 108,000) ÷ Median household income (AED 257,000) = 42.0%",
        note: "Median household income sourced from UAE Stats Centre 2024 survey data. Prior peak was 39% in 2008."
      },
      {
        id: "e3-3",
        refNum: 3,
        type: "data",
        label: "Tenant Displacement Tracking",
        value: "14% increase in outward migration from premium communities",
        source: "Entrestate address-change dataset",
        formula: "Ejari cancellations in Business Bay/DIFC where new registration is in JVC/Discovery Gardens/IC ÷ total renewals in those communities",
        note: "Tracked via Ejari registration address pairs, Q4 2023 vs Q4 2024."
      },
      {
        id: "e3-4",
        refNum: 4,
        type: "source",
        label: "RERA Rental Index and Increase Calculator",
        source: "Real Estate Regulatory Agency (RERA)",
        url: "https://dubailand.gov.ae/en/eservices/rental-index",
        note: "RERA index updated quarterly. Q4 2024 update reflects community-level average asking rents."
      },
      {
        id: "e3-5",
        refNum: 5,
        type: "calculation",
        label: "Market Rate vs RERA-Permitted Increase Gap",
        value: "Average gap: 23%",
        formula: "Mean(market_asking_rent − RERA_permitted_ceiling) ÷ Mean(RERA_permitted_ceiling) across 12 sample communities",
        note: "Widest gap observed in Business Bay (31%) and Marina (27%). Narrowest in Discovery Gardens (6%)."
      },
      {
        id: "e3-6",
        refNum: 6,
        type: "source",
        label: "Proposed Rent Law Amendment",
        source: "Dubai Government Media Office (reported)",
        note: "Amendment details based on government consultation document circulated Q3 2024. Not yet enacted."
      }
    ]
  },
  {
    id: 4,
    title: "Gulf Cross-Border Investment Flows 2024",
    subtitle: "GCC capital allocation to real estate hits a decade high, reshaping global prime markets",
    date: "November 14, 2024",
    dateLabel: "Nov 14",
    image: "/forest-fog-morning-mist-green-trees.jpg",
    author: "Entrestate Research",
    readTime: "10 min read",
    category: "Investment Intelligence",
    content: `GCC sovereign and private capital deployed into international real estate reached USD 38.4 billion in 2024 — the highest annual figure in a decade — with London, New York, and Paris absorbing the largest single-market allocations. [1]

## Macro Context

The post-hydrocarbon diversification agenda, most prominently expressed through Saudi Vision 2030 and UAE Net Zero 2050, is driving a structural shift in GCC capital deployment. Real estate remains the preferred asset class for family offices and sovereign wealth funds seeking inflation-hedged, long-duration returns. [2]

## Cross-Border Allocation Breakdown

| Destination | 2024 Allocation (USD bn) | YoY Change |
|---|---|---|
| United Kingdom | 9.2 | +22% |
| United States | 7.8 | +14% |
| France | 4.1 | +31% |
| Germany | 3.2 | -8% |
| India | 3.0 | +67% |
| Egypt | 2.4 | +18% |
| Other | 8.7 | +19% |

India's 67% surge reflects the Abu Dhabi Investment Authority's expanded mandate in Mumbai and Bangalore commercial real estate, while Germany's decline is attributed to structurally higher financing costs and compressed yields. [3]

## Domestic Reinvestment

Alongside outbound flows, GCC-based developers and family offices reinvested USD 22.1 billion into domestic real estate in 2024, with Saudi Arabia's NEOM-adjacent developments capturing 31% of this capital. [4]

- UAE domestic real estate investment: USD 9.4 billion
- Saudi Arabia domestic: USD 8.6 billion
- Qatar domestic: USD 4.1 billion

## Institutional Trends

REIT formation in the UAE and Saudi Arabia accelerated in 2024, with three new REITs listed on the Dubai Financial Market and two on the Saudi Exchange. Total GCC REIT AUM reached USD 14.2 billion, a 28% increase from 2023. [5]

## 2025 Forecast

Entrestate projects GCC cross-border real estate investment to reach USD 42–46 billion in 2025, driven by accelerating family office growth in the UAE and the continued expansion of Saudi PIF's international real estate mandate. [6]`,
    evidence: [
      {
        id: "e4-1",
        refNum: 1,
        type: "source",
        label: "GCC Cross-Border Real Estate Capital Flows",
        source: "CBRE Global Research + Entrestate synthesis",
        note: "Based on disclosed transactions and institutional filing data. Undisclosed private transactions estimated via deal count extrapolation."
      },
      {
        id: "e4-2",
        refNum: 2,
        type: "source",
        label: "Saudi Vision 2030 and UAE Net Zero 2050",
        source: "Saudi Vision 2030 Secretariat / UAE Ministry of Climate Change",
        url: "https://www.vision2030.gov.sa",
        note: "Policy framework documents reviewed. Capital allocation inference is Entrestate's analysis."
      },
      {
        id: "e4-3",
        refNum: 3,
        type: "data",
        label: "ADIA India Allocation Expansion",
        value: "India allocation: USD 3.0 billion (+67% YoY)",
        source: "ADIA Annual Review 2024 + Bloomberg data",
        note: "Mumbai Bandra Kurla Complex and Bangalore tech corridor are primary target submarkets."
      },
      {
        id: "e4-4",
        refNum: 4,
        type: "calculation",
        label: "GCC Domestic Reinvestment Total",
        value: "USD 22.1 billion",
        formula: "UAE (9.4) + Saudi (8.6) + Qatar (4.1) = 22.1",
        note: "Excludes Bahrain and Oman which collectively account for an additional ~USD 2.1 billion."
      },
      {
        id: "e4-5",
        refNum: 5,
        type: "data",
        label: "GCC REIT AUM 2024",
        value: "USD 14.2 billion total AUM (+28% YoY)",
        source: "DFM, Saudi Exchange, Boursa Kuwait",
        note: "Five new REITs listed in 2024 across UAE and Saudi Arabia."
      },
      {
        id: "e4-6",
        refNum: 6,
        type: "calculation",
        label: "2025 Cross-Border Investment Forecast",
        value: "USD 42–46 billion",
        formula: "2024 base (38.4) × growth rate range (9.4%–19.8%) = 42.0–46.0",
        note: "Growth range reflects low scenario (rate plateau, moderate family office expansion) and high scenario (PIF acceleration, new asset class mandates)."
      }
    ]
  },
  {
    id: 5,
    title: "Affordable Housing Gap: UAE 2024",
    subtitle: "Middle-income housing deficit reaches 95,000 units as developer focus skews ultra-prime",
    date: "November 12, 2024",
    dateLabel: "Nov 12",
    image: "/misty-valley-green-moss-iceland-landscape-river.jpg",
    author: "Entrestate Research",
    readTime: "7 min read",
    category: "Housing Policy",
    content: `The UAE's middle-income housing market faces a structural deficit of 95,000 units in 2024, a gap that has widened by 18% since 2022 as developer pipelines continue to skew toward the premium and ultra-prime segments. [1]

## Defining the Problem

For the purposes of this report, Entrestate defines middle-income housing as units priced between AED 600,000 and AED 1.4 million in the sale market, or AED 50,000 to AED 85,000 per annum in the rental market. [2]

This segment is primarily served by teachers, nurses, engineers, and mid-level corporate professionals — the workforce backbone of the UAE's non-oil economy.

## Supply Analysis

Of the 74,000 units launched in 2024, only 22% (approximately 16,280 units) fell within the middle-income price bracket — down from 31% in 2022. [3] The shift has been driven by developer margin optimization, with luxury units delivering 34–48% higher profit margins per square foot than middle-income product.

| Year | Total Launches | Middle-Income Share | Units (Middle Income) |
|---|---|---|---|
| 2021 | 42,000 | 38% | 15,960 |
| 2022 | 56,000 | 31% | 17,360 |
| 2023 | 65,000 | 27% | 17,550 |
| 2024 | 74,000 | 22% | 16,280 |

## Demand Side

An estimated 111,000 households in the UAE are actively seeking middle-income housing in 2024. With only 16,280 new units entering this price band, the demand-supply gap is approximately 95,000 units. [4]

- Expatriate population growth contribution: +28,000 households (2024)
- Natural household formation (UAE nationals): +4,200 households (2024)
- Middle-income households priced out of the market: 38,000 (estimated)

## Policy Recommendations

Entrestate recommends a developer incentive programme linking plot allocation rights in prime master communities to minimum affordable unit quotas of 20–25%, similar to the Section 106 model employed in the United Kingdom. [5] Without structural intervention, the middle-income deficit is projected to reach 135,000 units by 2027. [6]`,
    evidence: [
      {
        id: "e5-1",
        refNum: 1,
        type: "calculation",
        label: "Middle-Income Housing Deficit 2024",
        value: "95,000 units (deficit)",
        formula: "Estimated demand (111,000 households) − middle-income supply additions (16,280 units) = 94,720 ≈ 95,000",
        note: "2022 equivalent deficit was 80,300 units. Growth of 18.3% over the period."
      },
      {
        id: "e5-2",
        refNum: 2,
        type: "data",
        label: "Middle-Income Housing Price Band Definition",
        value: "Sale: AED 600K–1.4M | Rent: AED 50K–85K p.a.",
        source: "Entrestate Income Segmentation Model 2024",
        note: "Band calibrated against UAE Stats Centre income quintile 3 (mid) and rent-to-income ratio of 30-35%."
      },
      {
        id: "e5-3",
        refNum: 3,
        type: "data",
        label: "Middle-Income Share of New Launches",
        value: "22% in 2024 (down from 31% in 2022)",
        source: "Entrestate Developer Launch Database",
        note: "Classified by launch price per unit at initial release. Secondary-market pricing excluded."
      },
      {
        id: "e5-4",
        refNum: 4,
        type: "calculation",
        label: "Demand-Supply Gap Calculation",
        value: "Gap: ~95,000 units",
        formula: "Active demand (111,000) − new middle-income supply (16,280) = 94,720",
        note: "Active demand estimated from DLD search data, mortgage applications, and Ejari waitlist data."
      },
      {
        id: "e5-5",
        refNum: 5,
        type: "source",
        label: "UK Section 106 Affordable Housing Model",
        source: "UK Planning Portal / Entrestate Policy Research",
        url: "https://www.gov.uk/guidance/planning-obligations",
        note: "Section 106 requires developers to contribute affordable units typically at 25–40% of development volume."
      },
      {
        id: "e5-6",
        refNum: 6,
        type: "calculation",
        label: "2027 Deficit Projection",
        value: "135,000 units by 2027",
        formula: "2024 deficit (95,000) + projected annual gap growth (2025: +14,000, 2026: +13,500, 2027: +12,500) = 135,000",
        note: "Assumes no policy intervention. Scenarios with 20% affordable quota reduce 2027 deficit to ~62,000 units."
      }
    ]
  },
  {
    id: 6,
    title: "Riyadh Office Market: Mega-Project Effect",
    subtitle: "NEOM and Vision 2030 projects drive unprecedented corporate relocation to the Saudi capital",
    date: "November 11, 2024",
    dateLabel: "Nov 11",
    image: "/mountain-landscape-sunset-orange-sky.jpg",
    author: "Entrestate Research",
    readTime: "6 min read",
    category: "Commercial Intelligence",
    content: `Riyadh's Grade A office market is experiencing demand conditions not seen since the oil boom years, with occupancy rates at 96.3% in Q4 2024 and average rents surpassing AED 2,200 per sq m per annum in the King Abdullah Financial District. [1]

## Demand Shock

The requirement that multinational corporations establish their regional headquarters in the Kingdom — or forgo access to Saudi government contracts — has driven a 42% increase in Riyadh Grade A office take-up in 2024. [2]

Major occupiers committing to Riyadh in 2024 included global consulting firms, financial institutions, and technology companies, with the King Abdullah Financial District (KAFD) absorbing 68% of premium demand.

## Supply Constraints

The Grade A office pipeline for 2025–2027 totals only 1.2 million sq m, against projected net absorption of 1.9 million sq m over the same period, implying a structural supply shortfall of 700,000 sq m. [3]

| District | Occupancy Rate | Avg Rent SAR/sqm/yr | Grade A Stock |
|---|---|---|---|
| KAFD | 98.1% | SAR 2,800 | 420,000 sqm |
| Olaya Corridor | 95.4% | SAR 2,100 | 680,000 sqm |
| Diplomatic Quarter | 94.8% | SAR 1,900 | 280,000 sqm |
| North Riyadh | 91.2% | SAR 1,400 | 520,000 sqm |

## Workplace Strategy Implications

The co-working and serviced office sector is absorbing overflow demand from corporates awaiting Grade A availability, with IWG, WeWork, and regional operator Nasma collectively expanding Riyadh portfolios by 34% in 2024. [4]

## Investment Case

Grade A Riyadh office assets are trading at initial yields of 6.2–7.1%, a 150–200 basis point premium over London and Paris prime office, despite Riyadh exhibiting stronger rental growth fundamentals. [5]

For institutional investors with a tolerance for emerging market risk, Riyadh presents one of the most compelling core-plus office investment cases globally. [6]`,
    evidence: [
      {
        id: "e6-1",
        refNum: 1,
        type: "data",
        label: "Riyadh Grade A Office Occupancy Q4 2024",
        value: "96.3% occupancy city-wide",
        source: "CBRE Saudi Arabia + JLL Riyadh",
        note: "Highest occupancy recorded since data collection began in 2011. KAFD stands at 98.1%."
      },
      {
        id: "e6-2",
        refNum: 2,
        type: "calculation",
        label: "Grade A Take-Up Growth 2024",
        value: "+42% YoY",
        formula: "2024 take-up (520,000 sqm) ÷ 2023 take-up (366,000 sqm) − 1 = 42.1%",
        note: "Take-up data from CBRE, JLL, and Entrestate's own tracked transactions."
      },
      {
        id: "e6-3",
        refNum: 3,
        type: "calculation",
        label: "Supply-Demand Gap 2025–2027",
        value: "Shortfall: 700,000 sqm",
        formula: "Projected net absorption (1,900,000 sqm) − pipeline supply (1,200,000 sqm) = 700,000 sqm",
        note: "Absorption projection based on linear extrapolation of 2024 demand × corporate relocation pipeline."
      },
      {
        id: "e6-4",
        refNum: 4,
        type: "data",
        label: "Co-working Sector Expansion Riyadh 2024",
        value: "+34% portfolio expansion",
        source: "IWG investor presentation Q3 2024, JLL Flex Office Tracker",
        note: "IWG expanded by 8 centres, WeWork by 3, Nasma by 5 across Riyadh in calendar year 2024."
      },
      {
        id: "e6-5",
        refNum: 5,
        type: "data",
        label: "Riyadh vs London/Paris Office Yield Comparison",
        value: "Riyadh: 6.2–7.1% | London prime: 4.2–4.8% | Paris prime: 4.0–4.5%",
        source: "MSCI Real Assets + Entrestate analysis",
        note: "150–200bps premium against European prime despite superior rental growth trajectory."
      },
      {
        id: "e6-6",
        refNum: 6,
        type: "source",
        label: "Saudi HQ Mandate Policy",
        source: "Saudi Ministry of Investment (MISA)",
        url: "https://misa.gov.sa",
        note: "The Regional Headquarters Programme (RHQ) requires multinational firms to establish their Middle East HQ in Saudi Arabia by end-2024 to be eligible for government contracts."
      }
    ]
  },
  {
    id: 7,
    title: "PropTech Disruption in GCC Real Estate",
    subtitle: "Digital platforms are reshaping the transaction, valuation, and management stack",
    date: "September 18, 2024",
    dateLabel: "Sep 18",
    image: "/futuristic-city-neon-lights-night.jpg",
    author: "Entrestate Research",
    readTime: "9 min read",
    category: "Technology Report",
    content: `The GCC PropTech sector attracted USD 840 million in venture capital in 2024, a 55% increase over 2023, as investors bet on digital transformation in a market that has historically relied on broker networks and offline processes. [1]

## Investment Landscape

UAE-based PropTech companies captured 62% of GCC PropTech funding, with Saudi Arabia accounting for 29% and other GCC markets sharing the remainder. [2]

The most heavily funded categories were:

- Transaction platforms (listing aggregators, digital brokerages): USD 310M [3]
- Property management SaaS: USD 195M
- Valuation and analytics: USD 158M
- Smart building / IoT: USD 112M
- Mortgage technology: USD 65M

## Valuations and AI Integration

Automated Valuation Models (AVMs) are gaining institutional acceptance in the UAE, with Dubai's Mashreq Bank and Emirates NBD both adopting AI-based valuations for mortgage approvals under AED 3 million. [4] Entrestate's own AVM achieves 94.2% accuracy within a 5% price range on Dubai apartments — comparable to top-tier global AVM performance.

## Transaction Platform Consolidation

The competitive dynamics of the listing aggregator market are shifting from growth to monetisation, with PropertyFinder and Bayut both introducing performance-based listing products that charge per qualified lead rather than subscription. [5]

| Platform | MAUs | YoY Growth | Primary Revenue Model |
|---|---|---|---|
| Bayut | 9.8M | +22% | Subscription + performance |
| PropertyFinder | 8.1M | +18% | Subscription + performance |
| Dubizzle | 6.4M | +8% | Subscription |
| Houza | 1.2M | +94% | Performance-only |

## Regulatory Tailwinds

DLD's introduction of the Real Estate Tokenisation Pilot in Q3 2024 has positioned Dubai as a global pioneer in fractional real estate ownership. The pilot saw AED 52 million in tokenised property transactions in its first quarter of operation. [6]`,
    evidence: [
      {
        id: "e7-1",
        refNum: 1,
        type: "data",
        label: "GCC PropTech VC Funding 2024",
        value: "USD 840 million (+55% YoY)",
        source: "MAGNiTT PropTech Report 2024",
        note: "2023 equivalent: USD 542 million. Data includes disclosed rounds only."
      },
      {
        id: "e7-2",
        refNum: 2,
        type: "calculation",
        label: "GCC PropTech Funding by Country",
        value: "UAE: 62% | Saudi: 29% | Other: 9%",
        formula: "UAE (521M) ÷ total (840M) = 62.0% | Saudi (244M) ÷ total = 29.0%",
        source: "MAGNiTT 2024"
      },
      {
        id: "e7-3",
        refNum: 3,
        type: "data",
        label: "Transaction Platform Funding",
        value: "USD 310 million in 2024",
        source: "MAGNiTT + Entrestate deal tracking",
        note: "Includes PropertyFinder Series E (USD 166M) and undisclosed Houza funding."
      },
      {
        id: "e7-4",
        refNum: 4,
        type: "data",
        label: "Bank AVM Adoption — UAE",
        source: "Mashreq Bank Digital Banking Report Q3 2024",
        note: "Emirates NBD confirmed AVM adoption in their Q3 2024 earnings call. Sub-AED 3M threshold is their current bracket."
      },
      {
        id: "e7-5",
        refNum: 5,
        type: "source",
        label: "Bayut Performance-Based Listing Product",
        source: "Dubizzle Group Investor Presentation, September 2024",
        note: "Pay-per-lead model launched June 2024. PropertyFinder equivalent launched August 2024."
      },
      {
        id: "e7-6",
        refNum: 6,
        type: "data",
        label: "DLD Tokenisation Pilot Q3 2024",
        value: "AED 52 million in tokenised transactions",
        source: "Dubai Land Department press release, October 2024",
        url: "https://dubailand.gov.ae",
        note: "Pilot covers residential properties only. Expansion to commercial expected H1 2025."
      }
    ]
  },
  {
    id: 8,
    title: "UAE Mortgage Market 2024 Review",
    subtitle: "Rate expectations and policy changes redefine the home finance landscape",
    date: "September 17, 2024",
    dateLabel: "Sep 17",
    image: "/ocean-waves-beach-aerial-view-blue.jpg",
    author: "Entrestate Research",
    readTime: "8 min read",
    category: "Finance Report",
    content: `The UAE mortgage market processed AED 58.6 billion in residential home finance in 2024, a 16% increase over 2023, as easing Fed rate expectations and competitive bank lending drove improved affordability in the sub-AED 3 million segment. [1]

## Rate Environment

Following the US Federal Reserve's 50bps cut in September 2024, UAE bank prime rates began declining from their 2023 peak, with the average variable-rate mortgage product reaching 4.85% in Q4 2024, down from the 5.6% peak in Q4 2023. [2]

Fixed-rate products (typically 1–5 year fixed, then variable) gained significant share, accounting for 44% of new originations in 2024 as borrowers sought protection against volatility. [3]

## Market Segmentation

| Lender Category | Market Share | Avg LTV | Avg Rate |
|---|---|---|---|
| Local banks (ADCB, FAB, DIB) | 64% | 74% | 4.90% |
| International banks | 22% | 71% | 4.75% |
| Mortgage brokers (facilitated) | 14% | 73% | 4.82% |

## First-Time Buyer Pressure

The Central Bank of UAE's Loan-to-Value cap of 75% for expat first-time buyers on properties above AED 5 million creates a significant equity barrier — requiring a minimum deposit of AED 1.25 million. [4] Only 18% of expat mortgage applicants had deposits meeting this threshold.

## Islamic Finance

Sharia-compliant home finance (Ijara and Murabaha structures) accounted for 38% of total mortgage originations in 2024 — the highest share recorded. [5] The UAE's Islamic finance infrastructure continues to mature, with Amlak and Tamweel seeing the strongest origination growth.

## 2025 Outlook

With a further 100bps of Fed cuts projected in 2025, the average UAE mortgage rate is expected to decline to 4.2–4.5% by Q4 2025, which Entrestate models as unlocking an additional 12,000–16,000 qualifying borrowers in the sub-AED 2M segment. [6]`,
    evidence: [
      {
        id: "e8-1",
        refNum: 1,
        type: "data",
        label: "UAE Residential Mortgage Originations 2024",
        value: "AED 58.6 billion (+16% YoY)",
        source: "Central Bank of UAE Banking Sector Report 2024",
        note: "2023 equivalent: AED 50.5 billion."
      },
      {
        id: "e8-2",
        refNum: 2,
        type: "data",
        label: "Average Variable Mortgage Rate Q4 2024",
        value: "4.85% (down from 5.60% peak in Q4 2023)",
        source: "Entrestate bank rate tracker + CBUAE",
        note: "Survey of 8 leading UAE mortgage lenders."
      },
      {
        id: "e8-3",
        refNum: 3,
        type: "data",
        label: "Fixed-Rate Mortgage Product Share 2024",
        value: "44% of new originations",
        source: "CBUAE Mortgage Market Statistics Q4 2024",
        note: "2022 share was 28%. Significant shift driven by rate volatility awareness."
      },
      {
        id: "e8-4",
        refNum: 4,
        type: "source",
        label: "CBUAE LTV Regulations for Expats",
        source: "Central Bank of UAE — Mortgage Regulations",
        url: "https://www.centralbank.ae",
        note: "75% LTV cap applies to expat borrowers on properties above AED 5M. UAE nationals benefit from 80% LTV on first properties."
      },
      {
        id: "e8-5",
        refNum: 5,
        type: "data",
        label: "Islamic Finance Share of Mortgage Market",
        value: "38% of total originations in 2024",
        source: "CBUAE Islamic Banking Report 2024",
        note: "Prior peak was 34% in 2021. Driven by Amlak and Tamweel origination growth of 28% YoY."
      },
      {
        id: "e8-6",
        refNum: 6,
        type: "calculation",
        label: "Rate Decline Impact on Qualifying Borrowers",
        value: "+12,000–16,000 new qualifying borrowers",
        formula: "Modelled at rate 4.2% vs 4.85% against Entrestate income distribution dataset. Median income AED 230K. Property price sub-AED 2M.",
        note: "Lower bound assumes 100bps cut. Upper bound assumes 125bps cut over full year."
      }
    ]
  },
  {
    id: 9,
    title: "Sustainability Premium in UAE Real Estate",
    subtitle: "Green-certified buildings command measurable price and rental premiums as ESG mandates intensify",
    date: "September 16, 2024",
    dateLabel: "Sep 16",
    image: "/forest-fog-morning-mist-green-trees.jpg",
    author: "Entrestate Research",
    readTime: "7 min read",
    category: "ESG Report",
    content: `Buildings with LEED or Pearl (Estidama) green certifications command an average 8.4% sale price premium and a 6.2% rental premium over non-certified comparable stock in the UAE — premiums that have grown significantly since the announcement of COP28 in Dubai. [1]

## Certification Landscape

As of Q3 2024, the UAE has 2,841 LEED-certified buildings, ranking it 5th globally by certified floor area. The Pearl Rating System (Abu Dhabi's Estidama equivalent) has been mandatory for new Abu Dhabi developments since 2010. [2]

- LEED Platinum: 184 buildings
- LEED Gold: 892 buildings
- LEED Silver: 1,765 buildings
- Pearl 3+ (Estidama): 412 buildings

## Price Premium Analysis

Entrestate's analysis of 14,200 transactions between Q1 2022 and Q3 2024 demonstrates a statistically significant and growing price premium for certified buildings. [3]

| Certification | Sale Premium | Rental Premium | 2022 Sale Premium |
|---|---|---|---|
| LEED Platinum | 14.2% | 10.8% | 9.1% |
| LEED Gold | 8.7% | 6.5% | 5.4% |
| LEED Silver | 4.1% | 2.8% | 2.2% |
| Pearl 3+ | 9.3% | 7.1% | 6.0% |

## Institutional Driver

Institutional investors bound by ESG mandates — including sovereign wealth funds with Net Zero commitments and listed REITs — are increasingly restricting capital deployment to certified assets. [4] This is beginning to create a two-tier market, where non-certified institutional-grade assets face structural re-pricing risk.

## Retrofit Economics

For existing non-certified commercial buildings, the average cost of achieving LEED Gold certification in the UAE is AED 85–140 per sq ft (all-in, including design fees). [5] At current rental premiums, the payback period for a Grade A office building in DIFC is estimated at 6.8 years.

## Regulatory Trajectory

Dubai's Green Building Regulations were updated in 2023 to require LEED Silver as a minimum for all new commercial developments above 10,000 sq m. Entrestate anticipates a further tightening to LEED Gold by 2027. [6]`,
    evidence: [
      {
        id: "e9-1",
        refNum: 1,
        type: "calculation",
        label: "Green Building Price and Rental Premium",
        value: "Sale: +8.4% | Rental: +6.2% (average across certification levels)",
        formula: "Weighted average of LEED Platinum, Gold, Silver, and Pearl 3+ premiums by transaction count",
        note: "Based on 14,200 matched-pair transactions Q1 2022–Q3 2024."
      },
      {
        id: "e9-2",
        refNum: 2,
        type: "data",
        label: "UAE LEED Certified Building Count",
        value: "2,841 certified buildings (5th globally by floor area)",
        source: "USGBC LEED Project Directory, Q3 2024",
        url: "https://www.usgbc.org/projects",
        note: "Floor area basis. Countries ahead: USA, China, India, Canada."
      },
      {
        id: "e9-3",
        refNum: 3,
        type: "data",
        label: "Transaction Dataset for Premium Analysis",
        value: "14,200 matched-pair transactions, Q1 2022–Q3 2024",
        source: "DLD + DMT transaction registry, Entrestate certification database",
        note: "Matched-pair methodology: each certified unit matched to 3 comparable non-certified transactions within 500m, same build year ±5 years, same size ±15%."
      },
      {
        id: "e9-4",
        refNum: 4,
        type: "source",
        label: "ESG Mandates and Institutional Real Estate",
        source: "GRESB Real Estate Assessment 2024",
        url: "https://gresb.com",
        note: "GRESB data shows 78% of survey respondents have a formal green building acquisition policy."
      },
      {
        id: "e9-5",
        refNum: 5,
        type: "data",
        label: "LEED Gold Retrofit Cost UAE",
        value: "AED 85–140 per sq ft all-in",
        source: "Entrestate Cost Consultancy Database (6 completed LEED Gold retrofits, 2022–2024)",
        note: "Range reflects building complexity and MEP upgrade requirements. Simple office plates at lower bound; complex mixed-use at upper."
      },
      {
        id: "e9-6",
        refNum: 6,
        type: "source",
        label: "Dubai Green Building Regulations",
        source: "Dubai Electricity and Water Authority (DEWA)",
        url: "https://www.dewa.gov.ae",
        note: "2023 amendment mandates LEED Silver minimum for commercial builds >10,000 sqm. Estidama 2-Pearl is equivalent in Abu Dhabi."
      }
    ]
  },
  {
    id: 10,
    title: "Dubai Marina Micro-Market Analysis",
    subtitle: "A granular view of the UAE's most traded apartment community",
    date: "July 22, 2024",
    dateLabel: "Jul 22",
    image: "/misty-valley-green-moss-iceland-landscape-river.jpg",
    author: "Entrestate Research",
    readTime: "8 min read",
    category: "Micro-Market Report",
    content: `Dubai Marina remains the most liquid residential community in the UAE, accounting for 4.2% of all Dubai residential transactions in H1 2024, with a total traded value of AED 8.9 billion. [1]

## Community Profile

Dubai Marina spans approximately 4.97 km of waterfront and contains an estimated 115 residential towers comprising 43,800 units. [2] The community's walkability score, marina lifestyle, and transportation connectivity (Metro, Marina Walk) sustain demand across market cycles.

## Transaction Breakdown H1 2024

| Segment | Transactions | Total Value | Avg Price/sqft |
|---|---|---|---|
| Studio | 1,842 | AED 1.4B | AED 1,820 |
| 1-Bedroom | 3,104 | AED 3.2B | AED 1,950 |
| 2-Bedroom | 1,680 | AED 2.4B | AED 2,080 |
| 3-Bedroom+ | 412 | AED 1.9B | AED 2,340 |

## Sub-Community Price Variance

Price per square foot varies significantly within Dubai Marina based on proximity to the waterfront, tower age, and developer brand:

- Waterfront towers (Dubai Marina Walk frontage): AED 2,200–2,800/sqft [3]
- Mid-community towers (2nd–3rd row): AED 1,700–2,100/sqft
- Peripheral towers (JBR-adjacent, inland): AED 1,500–1,900/sqft

## Rental Market

Dubai Marina's rental market tightened significantly in H1 2024, with average 1-bedroom rents reaching AED 145,000 per annum — a 22% increase over H1 2023. [4] The community's gross rental yield of 5.8% remains attractive relative to its capital value, though compressed from the 7.2% recorded in 2020.

## Investment Outlook

With limited new supply (only 2 towers under construction for delivery 2025–2026), the supply constrained nature of Dubai Marina supports continued price appreciation. [5] Entrestate rates Dubai Marina as a BUY for income-seeking investors targeting 1-2 bedroom units, with a 12-month price target of AED 2,100–2,250 per sqft. [6]`,
    evidence: [
      {
        id: "e10-1",
        refNum: 1,
        type: "calculation",
        label: "Dubai Marina Transaction Share H1 2024",
        value: "4.2% of all Dubai residential transactions | AED 8.9B",
        formula: "Marina transactions (7,038) ÷ total Dubai transactions (167,571 H1 2024) = 4.2%",
        source: "DLD H1 2024 Transaction Report"
      },
      {
        id: "e10-2",
        refNum: 2,
        type: "data",
        label: "Dubai Marina Community Statistics",
        value: "115 residential towers | 43,800 units | 4.97km waterfront",
        source: "Dubai Marina Master Community Association + Entrestate Building Registry",
        note: "Unit count includes apartments only. Serviced apartments and hotel units excluded."
      },
      {
        id: "e10-3",
        refNum: 3,
        type: "data",
        label: "Waterfront Tower Price Premium",
        value: "AED 2,200–2,800/sqft (vs AED 1,500–1,900 peripheral)",
        source: "Entrestate Valuation Index, 890 transactions Q1–Q2 2024",
        note: "Defined as direct Marina Walk or Marina waterfront promenade frontage."
      },
      {
        id: "e10-4",
        refNum: 4,
        type: "data",
        label: "Average 1BR Rent Dubai Marina H1 2024",
        value: "AED 145,000 p.a. (+22% vs H1 2023)",
        source: "Ejari rental registrations, Entrestate analysis",
        note: "Median of 2,840 1BR Ejari registrations in Dubai Marina, H1 2024."
      },
      {
        id: "e10-5",
        refNum: 5,
        type: "data",
        label: "Dubai Marina Supply Pipeline",
        value: "2 towers under construction | ~820 units total for 2025–2026 delivery",
        source: "Entrestate Developer Pipeline Tracker",
        note: "No major community-scale launches expected in the 2024–2026 window."
      },
      {
        id: "e10-6",
        refNum: 6,
        type: "calculation",
        label: "12-Month Price Target",
        value: "AED 2,100–2,250 per sqft",
        formula: "Current avg (2,000) × supply tightening premium (5%) + rental yield support (0.5%) = 2,100–2,250",
        note: "BUY rating applies specifically to 1–2BR units, not studios or 3BR+ which have different demand dynamics."
      }
    ]
  },
  {
    id: 11,
    title: "Real Estate Tokenisation: GCC State of Play",
    subtitle: "Fractional ownership is moving from concept to transaction — what it means for liquidity",
    date: "July 20, 2024",
    dateLabel: "Jul 20",
    image: "/mountain-landscape-sunset-orange-sky.jpg",
    author: "Entrestate Research",
    readTime: "6 min read",
    category: "Technology Report",
    content: `Real estate tokenisation — the process of representing property ownership as digital tokens on a blockchain — is transitioning from proof-of-concept to regulated commercial activity in the GCC, with Dubai leading the regulatory framework development. [1]

## Regulatory Milestones

Dubai Land Department's tokenisation pilot, launched Q3 2024, provides the first government-backed framework for fractional ownership of residential real estate in the UAE. The pilot operates under RERA oversight and requires participating platforms to be licensed by DFSA or ADGM. [2]

## Market Activity

The pilot's first quarter recorded AED 52 million in tokenised transactions across 14 properties, with average token lot sizes of AED 25,000 — making sub-AED 100,000 real estate investment accessible for the first time. [3]

- Total properties tokenised: 14
- Average property value: AED 3.7 million
- Average token size: AED 25,000
- Unique investors: 2,104 (spanning 61 nationalities)

## Liquidity Mechanics

Tokenised real estate creates secondary market liquidity that is structurally impossible in traditional co-ownership structures. Holders can trade fractional positions 24/7 without requiring all co-owners' agreement — a transformative improvement in liquidity risk. [4]

## Investor Profile

Early token investors in the DLD pilot skewed toward millennials (25–40) with existing crypto familiarity, but institutional interest is growing, with two UAE family offices committing to dedicated tokenised real estate allocations in Q3 2024. [5]

## Challenges

- Regulatory clarity on cross-border token transfers remains incomplete
- Secondary market liquidity is nascent — average time to find a buyer: 8.4 days [6]
- Tax treatment uncertainty for non-UAE residents

## Global Context

Singapore (MAS framework), Switzerland (DLT Act), and the Cayman Islands lead globally in tokenised real estate regulatory maturity. Dubai's DLD pilot positions the UAE as the leading GCC jurisdiction and a strong global contender.`,
    evidence: [
      {
        id: "e11-1",
        refNum: 1,
        type: "source",
        label: "DLD Real Estate Tokenisation Framework",
        source: "Dubai Land Department",
        url: "https://dubailand.gov.ae",
        note: "Framework announced July 2024. Pilot launched September 2024."
      },
      {
        id: "e11-2",
        refNum: 2,
        type: "source",
        label: "RERA Tokenisation Oversight and DFSA Licensing",
        source: "RERA / DFSA",
        url: "https://www.dfsa.ae",
        note: "Platforms must hold a DFSA or ADGM licence to participate in the DLD tokenisation pilot."
      },
      {
        id: "e11-3",
        refNum: 3,
        type: "data",
        label: "DLD Pilot Q3 2024 Activity",
        value: "AED 52M transactions | 14 properties | 2,104 investors",
        source: "Dubai Land Department press release, October 2024"
      },
      {
        id: "e11-4",
        refNum: 4,
        type: "source",
        label: "Tokenised vs Traditional Co-ownership Liquidity",
        source: "Entrestate Legal and Technology Research",
        note: "Traditional co-ownership in UAE law requires unanimous consent for disposal under the Joint Ownership Law."
      },
      {
        id: "e11-5",
        refNum: 5,
        type: "data",
        label: "Family Office Tokenised RE Allocations",
        value: "2 UAE family offices committed to dedicated allocations, Q3 2024",
        source: "Entrestate private capital intelligence (names withheld)",
        note: "Combined allocation size AED 45M. Disclosed to Entrestate under confidentiality."
      },
      {
        id: "e11-6",
        refNum: 6,
        type: "data",
        label: "Secondary Market Average Time to Trade",
        value: "8.4 days average",
        source: "DLD Pilot Platform Data (aggregated, Q3 2024)",
        note: "Defined as listing to confirmed trade. Excludes cancelled listings."
      }
    ]
  },
  {
    id: 12,
    title: "GCC Hotel & Hospitality Real Estate 2024",
    subtitle: "Record RevPAR and mega-event pipeline fuel institutional appetite for Gulf hospitality assets",
    date: "July 19, 2024",
    dateLabel: "Jul 19",
    image: "/futuristic-city-neon-lights-night.jpg",
    author: "Entrestate Research",
    readTime: "7 min read",
    category: "Hospitality Report",
    content: `The GCC hospitality real estate sector delivered its strongest operational performance on record in 2024, with average Revenue Per Available Room (RevPAR) across Dubai, Abu Dhabi, and Riyadh reaching USD 198 — a 12% increase over 2023's previous record. [1]

## Performance Highlights

Dubai maintained its position as the MENA region's premium hospitality market, achieving an average occupancy of 79.4% and ADR of USD 248 — making it one of the top 5 most expensive hotel markets globally. [2]

| City | Occupancy | ADR (USD) | RevPAR (USD) | YoY RevPAR Change |
|---|---|---|---|---|
| Dubai | 79.4% | 248 | 197 | +11% |
| Abu Dhabi | 74.1% | 189 | 140 | +16% |
| Riyadh | 71.2% | 221 | 157 | +18% |
| Doha | 68.8% | 175 | 120 | +8% |

## Investment Activity

Hotel transactions in the GCC totalled USD 3.8 billion in 2024, with Abu Dhabi accounting for a disproportionate share following the Yas Island hotel portfolio sale. [3]

Institutional investors are increasingly targeting limited-service and extended-stay formats, which offer lower operating leverage and more resilient returns through demand cycles. [4]

## Event Pipeline Value

The GCC's event-driven demand calendar through 2030 is unprecedented:

- Expo 2030 Riyadh: projected 40M visitors
- FIFA World Cup 2034 (Saudi Arabia): 3.5M+ international visitors
- Formula E, Grand Prix, and World Expo legacy venues driving year-round demand

Entrestate estimates the event pipeline will add USD 12–18 billion in incremental hotel real estate value across the GCC by 2030. [5]

## Development Pipeline

An estimated 68,000 hotel keys are under development across the GCC, with Saudi Arabia representing 61% of the pipeline. [6] The luxury and ultra-luxury segments dominate new supply, with NEOM's concept hotels and Diriyah's historic district hospitality expected to command premium positioning.`,
    evidence: [
      {
        id: "e12-1",
        refNum: 1,
        type: "data",
        label: "GCC Average RevPAR 2024",
        value: "USD 198 (+12% YoY)",
        source: "STR Global + Entrestate Hospitality Analytics",
        note: "Weighted average across Dubai, Abu Dhabi, Riyadh, Doha, and Muscat hotel stock."
      },
      {
        id: "e12-2",
        refNum: 2,
        type: "data",
        label: "Dubai Hotel Performance 2024",
        value: "Occupancy: 79.4% | ADR: USD 248 | RevPAR: USD 197",
        source: "DTCM (Dubai Tourism) + STR Global",
        note: "Top 5 most expensive markets globally (ADR basis): Paris, NYC, London, Dubai, Singapore."
      },
      {
        id: "e12-3",
        refNum: 3,
        type: "data",
        label: "GCC Hotel Transaction Volume 2024",
        value: "USD 3.8 billion total",
        source: "JLL Hotels & Hospitality Group + CBRE",
        note: "Yas Island portfolio sale (USD 980M) accounts for 26% of GCC total."
      },
      {
        id: "e12-4",
        refNum: 4,
        type: "source",
        label: "Limited-Service Hotel Institutional Demand",
        source: "Savills World Research — GCC Hospitality 2024",
        note: "Survey of 28 institutional hotel investors. 67% prefer limited-service or extended-stay for GCC allocations."
      },
      {
        id: "e12-5",
        refNum: 5,
        type: "calculation",
        label: "Event Pipeline Hotel Real Estate Value Impact",
        value: "USD 12–18 billion additional value by 2030",
        formula: "Incremental rooms demand (projected) × average hotel development cost × stabilised cap rate range = asset value range",
        note: "Low scenario: Expo 2030 + FIFA demand only. High scenario: full calendar including recurring premium events."
      },
      {
        id: "e12-6",
        refNum: 6,
        type: "data",
        label: "GCC Hotel Development Pipeline",
        value: "68,000 keys under development | Saudi: 61% share",
        source: "STR Development Pipeline Report Q3 2024",
        note: "NEOM alone accounts for an estimated 12,000–15,000 keys in the pipeline."
      }
    ]
  }
]

export function TimeMachineRolodex() {
  const [position, setPosition] = useState(0)
  const [viewMode, setViewMode] = useState<"stack" | "list">("stack")
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [selectedReport, setSelectedReport] = useState<ReportCard | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = (e: WheelEvent) => {
    if (viewMode !== "stack") return
    e.preventDefault()
    const scrollSensitivity = 0.008
    const delta = e.deltaY * scrollSensitivity
    setPosition((prev) => Math.max(0, Math.min(cards.length - 1, prev + delta)))
  }

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", handleScroll, { passive: false })
      return () => container.removeEventListener("wheel", handleScroll)
    }
  }, [viewMode])

  const activeIndex = Math.round(position)

  const openReport = (card: ReportCard) => setSelectedReport(card)
  const closeReport = () => setSelectedReport(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <>
      {/* Report Reader — full-screen overlay */}
      {selectedReport && (
        <ReportReader
          report={selectedReport}
          allReports={cards}
          onClose={closeReport}
          onNavigate={(r) => setSelectedReport(r)}
        />
      )}

      {/* Rolodex container */}
      <div
        ref={containerRef}
        className="relative min-h-screen w-full overflow-hidden bg-background"
        onMouseMove={handleMouseMove}
      >
        {/* Header nav */}
        <div className="absolute right-6 top-6 z-50 flex items-center gap-1 rounded-lg border border-border/70 bg-card/80 p-1 shadow-sm backdrop-blur-sm">
          <button
            className={`rounded-md p-2 transition-colors ${viewMode === "stack" ? "bg-secondary" : "hover:bg-secondary"}`}
            onClick={() => setViewMode("stack")}
          >
            <Archive className="h-5 w-5 text-foreground" />
          </button>
          <button
            className={`rounded-md p-2 transition-colors ${viewMode === "list" ? "bg-secondary" : "hover:bg-secondary"}`}
            onClick={() => setViewMode("list")}
          >
            <Menu className="h-5 w-5 text-foreground" />
          </button>
        </div>

        {/* Entrestate wordmark */}
        <div className="absolute left-6 top-6 z-50 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            entrestate
          </span>
          <span className="text-border">/</span>
          <span className="text-xs text-muted-foreground">Research</span>
        </div>

        {viewMode === "stack" ? (
          <>
            <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1500px" }}>
              <div className="relative h-[600px] w-[800px]" style={{ transformStyle: "preserve-3d" }}>
                {[...cards].reverse().map((card, reverseIndex) => {
                  const index = cards.length - 1 - reverseIndex
                  const distanceFromActive = index - position

                  if (distanceFromActive < -1.5 || distanceFromActive > 5) return null

                  const isInFront = distanceFromActive < 0
                  const translateZ = distanceFromActive * -60
                  const translateY = distanceFromActive * -30
                  const scale = 1 - Math.abs(distanceFromActive) * 0.03
                  let opacity = 1
                  if (isInFront) opacity = Math.max(0, 1 + distanceFromActive * 2)

                  return (
                    <div
                      key={card.id}
                      className="absolute inset-0 cursor-pointer"
                      style={{
                        transform: `translateZ(${translateZ}px) translateY(${translateY}px) scale(${Math.max(0.7, scale)})`,
                        opacity: Math.max(0, opacity),
                        zIndex: Math.round((cards.length - Math.abs(distanceFromActive)) * 10),
                        transition: "transform 0.15s ease-out, opacity 0.15s ease-out",
                        pointerEvents: Math.abs(distanceFromActive) < 0.5 ? "auto" : "none",
                      }}
                      onClick={() => {
                        if (Math.abs(distanceFromActive) < 0.3) {
                          openReport(card)
                        } else {
                          setPosition(index)
                        }
                      }}
                    >
                      <div className="h-full w-full overflow-hidden rounded-2xl border border-border/70 bg-card shadow-2xl">
                        <div className="relative h-[65%] overflow-hidden bg-muted">
                          <img src={card.image || "/placeholder.svg"} alt={card.title} className="h-full w-full object-cover" />
                          {distanceFromActive > 0 && (
                            <div className="absolute inset-0 bg-black" style={{ opacity: Math.min(0.3, Math.abs(distanceFromActive) * 0.08) }} />
                          )}
                          {card.category && (
                            <div className="absolute left-5 top-5">
                              <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                                {card.category}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="bg-card p-8">
                          <h2 className="text-3xl font-semibold tracking-tight text-foreground">{card.title}</h2>
                          <p className="mt-2 text-lg text-muted-foreground">{card.subtitle}</p>
                          <div className="mt-3 flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">{card.date}</p>
                            {Math.abs(distanceFromActive) < 0.3 && (
                              <span className="flex items-center gap-1.5 text-sm font-medium text-primary">
                                Open report <ChevronRight className="h-4 w-4" />
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="absolute bottom-20 right-8 top-20 z-40 flex flex-col items-end justify-between py-8">
              {cards.map((card, index) => {
                const isActive = index === activeIndex
                return (
                  <button key={card.id} className="group flex items-center gap-2 transition-all duration-300" onClick={() => setPosition(index)}>
                    <span className={`text-sm font-medium transition-all duration-300 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                      {index === 0 ? "Now" : card.dateLabel}
                    </span>
                    <div className="relative flex items-center">
                      <div className={`h-0.5 transition-all duration-300 ${isActive ? "w-8 bg-primary" : "w-4 bg-border group-hover:w-6 group-hover:bg-muted-foreground"}`} />
                      {isActive && <div className="absolute -right-1 h-2 w-2 rounded-full bg-primary" />}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground">
              Scroll or click timeline to navigate
            </div>
          </>
        ) : (
          <>
            <div className="mx-auto max-w-5xl px-6 pb-12 pt-24">
              <div className="divide-y divide-border/70">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    className="group flex w-full items-center gap-6 py-4 text-left transition-colors hover:bg-card/60 rounded-lg px-3"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => openReport(card)}
                  >
                    <span className="w-32 shrink-0 text-sm text-muted-foreground">
                      {card.date.split(",")[0]}, {card.date.split(",")[1]?.trim().split(" ")[0]}
                    </span>
                    {card.category && (
                      <span className="hidden shrink-0 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary sm:inline">
                        {card.category}
                      </span>
                    )}
                    <span className="min-w-0 shrink-0 font-medium text-foreground" style={{ width: "240px" }}>
                      {card.title}
                    </span>
                    <span className="min-w-0 flex-1 text-muted-foreground">{card.subtitle}</span>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground/50 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
                  </button>
                ))}
              </div>
            </div>
            {hoveredIndex !== null && (
              <div
                className="pointer-events-none fixed z-50 overflow-hidden rounded-xl border border-border/70 shadow-2xl"
                style={{ left: mousePos.x + 20, top: mousePos.y - 100, width: 280, height: 180 }}
              >
                <img src={cards[hoveredIndex].image || "/placeholder.svg"} alt={cards[hoveredIndex].title} className="h-full w-full object-cover" />
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}

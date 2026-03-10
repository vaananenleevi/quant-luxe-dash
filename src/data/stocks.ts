// Centralized mock financial data

export interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  sector: string;
  industry: string;
  country: string;
  pe: number;
  forwardPe: number;
  evEbitda: number;
  ps: number;
  pb: number;
  ebitMargin: number;
  ebitdaMargin: number;
  netMargin: number;
  roe: number;
  roic: number;
  revenueGrowth: number;
  earningsGrowth: number;
  fcfGrowth: number;
  debtEquity: number;
  netDebtEbitda: number;
  currentRatio: number;
  assetTurnover: number;
  operatingMargin: number;
  dividendYield: number;
  buybackYield: number;
  beta: number;
  enterpriseValue: string;
  employees: string;
  headquarters: string;
  description: string;
  revenue: string;
  ebit: string;
  netIncome: string;
  fcf: string;
  eps: number;
  sparkline: number[];
}

export const allStocks: StockData[] = [
  // Semiconductors
  {
    ticker: "NVDA", name: "NVIDIA Corp.", price: 878.36, change: 27.32, changePercent: 3.21,
    marketCap: "$2.16T", sector: "Semiconductors", industry: "GPU & AI Chips", country: "US",
    pe: 72.4, forwardPe: 38.2, evEbitda: 62.1, ps: 36.8, pb: 52.3,
    ebitMargin: 54.2, ebitdaMargin: 56.8, netMargin: 49.8, roe: 91.5, roic: 68.2,
    revenueGrowth: 122.4, earningsGrowth: 168.5, fcfGrowth: 142.3,
    debtEquity: 0.41, netDebtEbitda: -0.8, currentRatio: 4.2,
    assetTurnover: 1.1, operatingMargin: 54.1, dividendYield: 0.02, buybackYield: 0.8,
    beta: 1.72, enterpriseValue: "$2.12T", employees: "29,600", headquarters: "Santa Clara, CA",
    description: "NVIDIA designs GPUs and AI computing platforms powering data centers, gaming, and autonomous vehicles.",
    revenue: "$60.9B", ebit: "$33.0B", netIncome: "$29.8B", fcf: "$27.1B", eps: 11.93,
    sparkline: [650, 680, 720, 690, 750, 780, 810, 830, 845, 860, 870, 878]
  },
  {
    ticker: "AMD", name: "Advanced Micro Devices", price: 178.23, change: -1.20, changePercent: -0.67,
    marketCap: "$288B", sector: "Semiconductors", industry: "CPU & GPU", country: "US",
    pe: 46.2, forwardPe: 28.5, evEbitda: 38.4, ps: 12.5, pb: 4.8,
    ebitMargin: 22.1, ebitdaMargin: 27.3, netMargin: 18.4, roe: 10.2, roic: 8.1,
    revenueGrowth: 10.2, earningsGrowth: 42.5, fcfGrowth: 35.2,
    debtEquity: 0.04, netDebtEbitda: -1.2, currentRatio: 2.5,
    assetTurnover: 0.4, operatingMargin: 22.0, dividendYield: 0, buybackYield: 1.2,
    beta: 1.68, enterpriseValue: "$280B", employees: "26,000", headquarters: "Santa Clara, CA",
    description: "AMD designs high-performance CPUs and GPUs for computing, gaming, and data center markets.",
    revenue: "$22.7B", ebit: "$5.0B", netIncome: "$4.2B", fcf: "$4.8B", eps: 2.65,
    sparkline: [160, 165, 170, 168, 175, 180, 178, 176, 174, 177, 179, 178]
  },
  {
    ticker: "INTC", name: "Intel Corp.", price: 31.42, change: -0.39, changePercent: -1.23,
    marketCap: "$133B", sector: "Semiconductors", industry: "CPU & Foundry", country: "US",
    pe: 108.3, forwardPe: 22.1, evEbitda: 18.5, ps: 2.5, pb: 1.3,
    ebitMargin: 2.1, ebitdaMargin: 18.4, netMargin: 1.8, roe: 1.2, roic: 0.8,
    revenueGrowth: -14.2, earningsGrowth: -62.1, fcfGrowth: -45.3,
    debtEquity: 0.47, netDebtEbitda: 2.8, currentRatio: 1.5,
    assetTurnover: 0.3, operatingMargin: 2.1, dividendYield: 1.58, buybackYield: 0,
    beta: 1.05, enterpriseValue: "$148B", employees: "124,800", headquarters: "Santa Clara, CA",
    description: "Intel designs and manufactures CPUs, chipsets, and is investing heavily in foundry services.",
    revenue: "$54.2B", ebit: "$1.1B", netIncome: "$0.9B", fcf: "-$2.1B", eps: 0.29,
    sparkline: [38, 36, 35, 33, 34, 32, 33, 31, 30, 31, 32, 31]
  },
  {
    ticker: "TSM", name: "TSMC", price: 142.56, change: 2.62, changePercent: 1.87,
    marketCap: "$738B", sector: "Semiconductors", industry: "Foundry", country: "Taiwan",
    pe: 25.8, forwardPe: 20.1, evEbitda: 15.2, ps: 10.5, pb: 6.8,
    ebitMargin: 43.2, ebitdaMargin: 64.8, netMargin: 38.5, roe: 28.4, roic: 22.1,
    revenueGrowth: 26.3, earningsGrowth: 32.1, fcfGrowth: 18.5,
    debtEquity: 0.24, netDebtEbitda: -0.5, currentRatio: 2.1,
    assetTurnover: 0.5, operatingMargin: 43.0, dividendYield: 1.42, buybackYield: 0.3,
    beta: 1.15, enterpriseValue: "$720B", employees: "76,000", headquarters: "Hsinchu, Taiwan",
    description: "TSMC is the world's largest semiconductor foundry, manufacturing chips for Apple, NVIDIA, and AMD.",
    revenue: "$69.3B", ebit: "$29.9B", netIncome: "$26.7B", fcf: "$18.2B", eps: 5.52,
    sparkline: [105, 110, 115, 112, 120, 125, 128, 132, 135, 138, 140, 142]
  },
  {
    ticker: "ASML", name: "ASML Holding", price: 982.45, change: 14.82, changePercent: 1.53,
    marketCap: "$388B", sector: "Semiconductors", industry: "Lithography Equipment", country: "Netherlands",
    pe: 42.1, forwardPe: 32.5, evEbitda: 35.8, ps: 14.2, pb: 18.5,
    ebitMargin: 33.8, ebitdaMargin: 36.2, netMargin: 28.4, roe: 52.1, roic: 38.4,
    revenueGrowth: 30.2, earningsGrowth: 28.5, fcfGrowth: 22.1,
    debtEquity: 0.52, netDebtEbitda: 0.2, currentRatio: 1.5,
    assetTurnover: 0.8, operatingMargin: 33.5, dividendYield: 0.68, buybackYield: 1.5,
    beta: 1.22, enterpriseValue: "$392B", employees: "42,000", headquarters: "Veldhoven, Netherlands",
    description: "ASML is the sole manufacturer of EUV lithography machines essential for advanced semiconductor production.",
    revenue: "$27.6B", ebit: "$9.3B", netIncome: "$7.8B", fcf: "$6.2B", eps: 23.32,
    sparkline: [780, 800, 820, 850, 870, 890, 920, 940, 950, 960, 970, 982]
  },
  {
    ticker: "AVGO", name: "Broadcom Inc.", price: 1685.20, change: 22.15, changePercent: 1.33,
    marketCap: "$783B", sector: "Semiconductors", industry: "Networking & Infrastructure", country: "US",
    pe: 36.8, forwardPe: 26.2, evEbitda: 24.5, ps: 16.8, pb: 12.1,
    ebitMargin: 38.2, ebitdaMargin: 58.5, netMargin: 32.4, roe: 42.8, roic: 18.5,
    revenueGrowth: 44.2, earningsGrowth: 38.1, fcfGrowth: 25.3,
    debtEquity: 1.02, netDebtEbitda: 1.8, currentRatio: 1.1,
    assetTurnover: 0.3, operatingMargin: 38.0, dividendYield: 1.24, buybackYield: 2.1,
    beta: 1.18, enterpriseValue: "$820B", employees: "20,000", headquarters: "Palo Alto, CA",
    description: "Broadcom designs semiconductors and infrastructure software for data centers, networking, and enterprise.",
    revenue: "$46.8B", ebit: "$17.9B", netIncome: "$15.2B", fcf: "$18.5B", eps: 45.75,
    sparkline: [1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1580, 1620, 1660, 1685]
  },
  // Big Tech
  {
    ticker: "AAPL", name: "Apple Inc.", price: 189.84, change: 2.66, changePercent: 1.42,
    marketCap: "$2.94T", sector: "Big Tech", industry: "Consumer Electronics", country: "US",
    pe: 31.2, forwardPe: 28.5, evEbitda: 25.8, ps: 7.8, pb: 48.2,
    ebitMargin: 30.8, ebitdaMargin: 33.5, netMargin: 25.3, roe: 160.2, roic: 52.8,
    revenueGrowth: 8.1, earningsGrowth: 11.2, fcfGrowth: 6.5,
    debtEquity: 1.79, netDebtEbitda: 0.8, currentRatio: 1.0,
    assetTurnover: 1.1, operatingMargin: 30.7, dividendYield: 0.52, buybackYield: 3.5,
    beta: 1.28, enterpriseValue: "$2.98T", employees: "161,000", headquarters: "Cupertino, CA",
    description: "Apple designs, manufactures, and markets consumer electronics, software, and services globally.",
    revenue: "$383.3B", ebit: "$118.0B", netIncome: "$97.0B", fcf: "$110.5B", eps: 6.42,
    sparkline: [172, 175, 178, 180, 177, 182, 185, 183, 186, 188, 187, 189]
  },
  {
    ticker: "MSFT", name: "Microsoft Corp.", price: 425.52, change: 3.76, changePercent: 0.89,
    marketCap: "$3.16T", sector: "Big Tech", industry: "Software & Cloud", country: "US",
    pe: 36.5, forwardPe: 30.2, evEbitda: 26.8, ps: 14.2, pb: 13.1,
    ebitMargin: 44.2, ebitdaMargin: 50.1, netMargin: 35.8, roe: 38.5, roic: 28.2,
    revenueGrowth: 15.2, earningsGrowth: 20.5, fcfGrowth: 18.2,
    debtEquity: 0.32, netDebtEbitda: -0.2, currentRatio: 1.8,
    assetTurnover: 0.5, operatingMargin: 44.0, dividendYield: 0.72, buybackYield: 1.8,
    beta: 0.92, enterpriseValue: "$3.10T", employees: "221,000", headquarters: "Redmond, WA",
    description: "Microsoft develops software, cloud computing (Azure), and AI services for enterprise and consumers.",
    revenue: "$227.6B", ebit: "$100.6B", netIncome: "$81.5B", fcf: "$72.4B", eps: 11.86,
    sparkline: [380, 385, 392, 398, 405, 410, 408, 415, 420, 418, 422, 425]
  },
  {
    ticker: "AMZN", name: "Amazon.com", price: 185.07, change: 0.99, changePercent: 0.54,
    marketCap: "$1.93T", sector: "Big Tech", industry: "E-Commerce & Cloud", country: "US",
    pe: 42.8, forwardPe: 32.1, evEbitda: 18.5, ps: 3.3, pb: 8.2,
    ebitMargin: 10.8, ebitdaMargin: 22.5, netMargin: 7.8, roe: 21.2, roic: 12.5,
    revenueGrowth: 12.5, earningsGrowth: 52.3, fcfGrowth: 85.2,
    debtEquity: 0.58, netDebtEbitda: 0.4, currentRatio: 1.1,
    assetTurnover: 1.0, operatingMargin: 10.5, dividendYield: 0, buybackYield: 0.5,
    beta: 1.15, enterpriseValue: "$1.98T", employees: "1,525,000", headquarters: "Seattle, WA",
    description: "Amazon operates in e-commerce, cloud computing (AWS), streaming, and AI services globally.",
    revenue: "$574.8B", ebit: "$62.1B", netIncome: "$44.9B", fcf: "$54.2B", eps: 4.35,
    sparkline: [168, 170, 172, 175, 178, 176, 180, 182, 181, 183, 184, 185]
  },
  {
    ticker: "GOOGL", name: "Alphabet Inc.", price: 156.82, change: 1.88, changePercent: 1.21,
    marketCap: "$1.94T", sector: "Big Tech", industry: "Search & Cloud", country: "US",
    pe: 24.5, forwardPe: 20.8, evEbitda: 16.2, ps: 6.2, pb: 6.8,
    ebitMargin: 30.5, ebitdaMargin: 36.2, netMargin: 25.8, roe: 28.5, roic: 22.1,
    revenueGrowth: 13.5, earningsGrowth: 28.2, fcfGrowth: 22.5,
    debtEquity: 0.05, netDebtEbitda: -2.5, currentRatio: 2.1,
    assetTurnover: 0.7, operatingMargin: 30.2, dividendYield: 0.45, buybackYield: 2.8,
    beta: 1.05, enterpriseValue: "$1.82T", employees: "182,500", headquarters: "Mountain View, CA",
    description: "Alphabet is the parent company of Google, operating search, advertising, cloud, and AI platforms.",
    revenue: "$307.4B", ebit: "$93.6B", netIncome: "$79.2B", fcf: "$67.5B", eps: 6.52,
    sparkline: [135, 138, 140, 142, 145, 148, 150, 152, 153, 155, 154, 156]
  },
  {
    ticker: "META", name: "Meta Platforms", price: 515.42, change: 5.82, changePercent: 1.14,
    marketCap: "$1.31T", sector: "Big Tech", industry: "Social Media & AI", country: "US",
    pe: 26.2, forwardPe: 22.5, evEbitda: 16.8, ps: 9.5, pb: 8.2,
    ebitMargin: 38.5, ebitdaMargin: 48.2, netMargin: 32.1, roe: 32.8, roic: 24.5,
    revenueGrowth: 22.8, earningsGrowth: 68.5, fcfGrowth: 42.1,
    debtEquity: 0.28, netDebtEbitda: -1.5, currentRatio: 2.7,
    assetTurnover: 0.7, operatingMargin: 38.2, dividendYield: 0.38, buybackYield: 4.2,
    beta: 1.22, enterpriseValue: "$1.25T", employees: "67,300", headquarters: "Menlo Park, CA",
    description: "Meta operates Facebook, Instagram, WhatsApp, and invests heavily in VR/AR and AI.",
    revenue: "$134.9B", ebit: "$51.9B", netIncome: "$43.3B", fcf: "$38.2B", eps: 19.72,
    sparkline: [400, 420, 440, 450, 460, 470, 480, 490, 495, 500, 510, 515]
  },
  {
    ticker: "ADBE", name: "Adobe Inc.", price: 478.92, change: -3.21, changePercent: -0.67,
    marketCap: "$212B", sector: "Big Tech", industry: "Creative Software", country: "US",
    pe: 38.5, forwardPe: 25.2, evEbitda: 28.1, ps: 10.8, pb: 14.2,
    ebitMargin: 35.2, ebitdaMargin: 42.5, netMargin: 28.1, roe: 38.2, roic: 26.5,
    revenueGrowth: 11.2, earningsGrowth: 15.8, fcfGrowth: 12.5,
    debtEquity: 0.38, netDebtEbitda: 0.5, currentRatio: 1.2,
    assetTurnover: 0.6, operatingMargin: 35.0, dividendYield: 0, buybackYield: 2.5,
    beta: 1.12, enterpriseValue: "$218B", employees: "29,900", headquarters: "San Jose, CA",
    description: "Adobe develops creative, marketing, and document management software including Photoshop and Acrobat.",
    revenue: "$19.4B", ebit: "$6.8B", netIncome: "$5.5B", fcf: "$7.2B", eps: 12.42,
    sparkline: [510, 505, 500, 495, 490, 488, 485, 482, 480, 478, 479, 478]
  },
  // AI / Software
  {
    ticker: "PLTR", name: "Palantir Technologies", price: 24.82, change: 0.95, changePercent: 3.98,
    marketCap: "$54B", sector: "AI / Software", industry: "AI & Data Analytics", country: "US",
    pe: 228.5, forwardPe: 82.1, evEbitda: 125.2, ps: 22.8, pb: 15.2,
    ebitMargin: 12.5, ebitdaMargin: 15.2, netMargin: 9.8, roe: 8.5, roic: 6.2,
    revenueGrowth: 20.8, earningsGrowth: 185.2, fcfGrowth: 62.5,
    debtEquity: 0, netDebtEbitda: -5.2, currentRatio: 5.8,
    assetTurnover: 0.6, operatingMargin: 12.2, dividendYield: 0, buybackYield: 0,
    beta: 1.85, enterpriseValue: "$48B", employees: "3,700", headquarters: "Denver, CO",
    description: "Palantir builds AI-powered data analytics platforms for government and commercial customers.",
    revenue: "$2.2B", ebit: "$0.28B", netIncome: "$0.21B", fcf: "$0.72B", eps: 0.11,
    sparkline: [16, 17, 18, 19, 20, 21, 22, 23, 23.5, 24, 24.5, 24.8]
  },
  {
    ticker: "SNOW", name: "Snowflake Inc.", price: 162.45, change: -2.18, changePercent: -1.32,
    marketCap: "$54B", sector: "AI / Software", industry: "Cloud Data Platform", country: "US",
    pe: -1, forwardPe: 185.2, evEbitda: -1, ps: 18.5, pb: 8.2,
    ebitMargin: -8.5, ebitdaMargin: -5.2, netMargin: -12.1, roe: -8.2, roic: -6.5,
    revenueGrowth: 32.8, earningsGrowth: 0, fcfGrowth: 45.2,
    debtEquity: 0.08, netDebtEbitda: -15.2, currentRatio: 1.8,
    assetTurnover: 0.4, operatingMargin: -8.2, dividendYield: 0, buybackYield: 0,
    beta: 1.52, enterpriseValue: "$48B", employees: "6,900", headquarters: "Bozeman, MT",
    description: "Snowflake provides a cloud-based data warehouse platform enabling data sharing and analytics.",
    revenue: "$2.8B", ebit: "-$0.24B", netIncome: "-$0.34B", fcf: "$0.42B", eps: -1.05,
    sparkline: [180, 178, 175, 172, 168, 165, 163, 160, 162, 164, 163, 162]
  },
  {
    ticker: "CRM", name: "Salesforce Inc.", price: 272.85, change: 3.42, changePercent: 1.27,
    marketCap: "$264B", sector: "AI / Software", industry: "CRM & Cloud", country: "US",
    pe: 48.2, forwardPe: 28.5, evEbitda: 26.8, ps: 7.5, pb: 4.5,
    ebitMargin: 18.2, ebitdaMargin: 28.5, netMargin: 15.8, roe: 10.2, roic: 8.5,
    revenueGrowth: 11.2, earningsGrowth: 42.5, fcfGrowth: 28.2,
    debtEquity: 0.18, netDebtEbitda: 0.2, currentRatio: 1.0,
    assetTurnover: 0.4, operatingMargin: 18.0, dividendYield: 0.55, buybackYield: 2.8,
    beta: 1.15, enterpriseValue: "$268B", employees: "79,400", headquarters: "San Francisco, CA",
    description: "Salesforce provides cloud-based CRM, marketing automation, and enterprise AI solutions.",
    revenue: "$34.9B", ebit: "$6.4B", netIncome: "$5.5B", fcf: "$10.2B", eps: 5.65,
    sparkline: [240, 245, 250, 255, 258, 262, 265, 268, 270, 272, 271, 272]
  },
  {
    ticker: "NOW", name: "ServiceNow Inc.", price: 792.15, change: 8.52, changePercent: 1.09,
    marketCap: "$163B", sector: "AI / Software", industry: "IT Service Management", country: "US",
    pe: 62.5, forwardPe: 42.1, evEbitda: 52.8, ps: 16.8, pb: 22.5,
    ebitMargin: 25.8, ebitdaMargin: 30.2, netMargin: 22.1, roe: 38.5, roic: 18.2,
    revenueGrowth: 24.5, earningsGrowth: 32.8, fcfGrowth: 28.5,
    debtEquity: 0.25, netDebtEbitda: -0.8, currentRatio: 1.2,
    assetTurnover: 0.7, operatingMargin: 25.5, dividendYield: 0, buybackYield: 0.8,
    beta: 1.05, enterpriseValue: "$160B", employees: "22,700", headquarters: "Santa Clara, CA",
    description: "ServiceNow provides cloud-based IT service management and digital workflow automation.",
    revenue: "$9.5B", ebit: "$2.5B", netIncome: "$2.1B", fcf: "$3.2B", eps: 12.68,
    sparkline: [680, 700, 720, 735, 745, 755, 765, 772, 780, 785, 790, 792]
  },
  // Healthcare
  {
    ticker: "NVO", name: "Novo Nordisk", price: 128.45, change: -1.82, changePercent: -1.40,
    marketCap: "$572B", sector: "Healthcare", industry: "Pharmaceuticals", country: "Denmark",
    pe: 35.2, forwardPe: 28.5, evEbitda: 28.2, ps: 16.2, pb: 32.5,
    ebitMargin: 42.5, ebitdaMargin: 45.8, netMargin: 34.2, roe: 82.5, roic: 58.2,
    revenueGrowth: 31.5, earningsGrowth: 28.2, fcfGrowth: 22.1,
    debtEquity: 0.42, netDebtEbitda: 0.5, currentRatio: 0.9,
    assetTurnover: 1.2, operatingMargin: 42.2, dividendYield: 1.12, buybackYield: 1.8,
    beta: 0.78, enterpriseValue: "$580B", employees: "63,400", headquarters: "Bagsværd, Denmark",
    description: "Novo Nordisk is a global leader in diabetes care and obesity treatments including Ozempic and Wegovy.",
    revenue: "$33.7B", ebit: "$14.3B", netIncome: "$11.5B", fcf: "$9.8B", eps: 3.65,
    sparkline: [145, 142, 140, 138, 135, 133, 132, 130, 129, 128, 129, 128]
  },
  {
    ticker: "LLY", name: "Eli Lilly", price: 782.35, change: 12.45, changePercent: 1.62,
    marketCap: "$743B", sector: "Healthcare", industry: "Pharmaceuticals", country: "US",
    pe: 118.5, forwardPe: 52.8, evEbitda: 72.5, ps: 21.8, pb: 58.2,
    ebitMargin: 28.5, ebitdaMargin: 32.1, netMargin: 18.2, roe: 52.8, roic: 22.5,
    revenueGrowth: 20.2, earningsGrowth: 35.8, fcfGrowth: 28.5,
    debtEquity: 1.85, netDebtEbitda: 2.2, currentRatio: 1.2,
    assetTurnover: 0.5, operatingMargin: 28.2, dividendYield: 0.65, buybackYield: 0.8,
    beta: 0.42, enterpriseValue: "$762B", employees: "43,000", headquarters: "Indianapolis, IN",
    description: "Eli Lilly develops pharmaceuticals in diabetes, oncology, immunology, and neuroscience.",
    revenue: "$34.1B", ebit: "$9.7B", netIncome: "$6.2B", fcf: "$5.8B", eps: 6.60,
    sparkline: [600, 620, 640, 660, 680, 700, 720, 740, 755, 765, 775, 782]
  },
  {
    ticker: "UNH", name: "UnitedHealth Group", price: 528.92, change: -4.25, changePercent: -0.80,
    marketCap: "$488B", sector: "Healthcare", industry: "Health Insurance", country: "US",
    pe: 22.5, forwardPe: 18.2, evEbitda: 14.8, ps: 1.3, pb: 5.8,
    ebitMargin: 8.5, ebitdaMargin: 10.2, netMargin: 5.8, roe: 25.2, roic: 12.5,
    revenueGrowth: 14.5, earningsGrowth: 12.2, fcfGrowth: 8.5,
    debtEquity: 0.72, netDebtEbitda: 2.1, currentRatio: 0.8,
    assetTurnover: 1.4, operatingMargin: 8.2, dividendYield: 1.38, buybackYield: 1.5,
    beta: 0.62, enterpriseValue: "$520B", employees: "400,000", headquarters: "Minnetonka, MN",
    description: "UnitedHealth Group provides health insurance and healthcare services through UnitedHealthcare and Optum.",
    revenue: "$371.6B", ebit: "$31.6B", netIncome: "$21.5B", fcf: "$22.8B", eps: 23.48,
    sparkline: [545, 542, 540, 538, 535, 533, 530, 532, 531, 529, 530, 528]
  },
  // EV and Mobility
  {
    ticker: "TSLA", name: "Tesla Inc.", price: 175.21, change: -3.82, changePercent: -2.14,
    marketCap: "$558B", sector: "EV and Mobility", industry: "Electric Vehicles", country: "US",
    pe: 42.5, forwardPe: 58.2, evEbitda: 32.8, ps: 5.8, pb: 10.2,
    ebitMargin: 8.2, ebitdaMargin: 14.5, netMargin: 12.8, roe: 22.5, roic: 15.8,
    revenueGrowth: 2.5, earningsGrowth: -22.5, fcfGrowth: -35.2,
    debtEquity: 0.08, netDebtEbitda: -2.5, currentRatio: 1.7,
    assetTurnover: 0.8, operatingMargin: 8.0, dividendYield: 0, buybackYield: 0,
    beta: 2.05, enterpriseValue: "$540B", employees: "140,500", headquarters: "Austin, TX",
    description: "Tesla designs, manufactures, and sells electric vehicles, energy storage, and solar products.",
    revenue: "$96.8B", ebit: "$7.9B", netIncome: "$12.4B", fcf: "$4.4B", eps: 4.12,
    sparkline: [195, 192, 188, 185, 182, 180, 178, 176, 174, 175, 176, 175]
  },
  {
    ticker: "UBER", name: "Uber Technologies", price: 72.85, change: 1.42, changePercent: 1.99,
    marketCap: "$150B", sector: "EV and Mobility", industry: "Ride-Sharing & Delivery", country: "US",
    pe: 72.8, forwardPe: 28.5, evEbitda: 28.2, ps: 3.8, pb: 12.5,
    ebitMargin: 5.2, ebitdaMargin: 12.8, netMargin: 4.5, roe: 18.2, roic: 8.5,
    revenueGrowth: 15.8, earningsGrowth: 182.5, fcfGrowth: 45.2,
    debtEquity: 0.82, netDebtEbitda: 1.5, currentRatio: 1.0,
    assetTurnover: 1.0, operatingMargin: 5.0, dividendYield: 0, buybackYield: 2.5,
    beta: 1.42, enterpriseValue: "$158B", employees: "30,800", headquarters: "San Francisco, CA",
    description: "Uber operates a global ride-sharing and food delivery platform connecting drivers and riders.",
    revenue: "$37.3B", ebit: "$1.9B", netIncome: "$1.7B", fcf: "$4.2B", eps: 1.0,
    sparkline: [55, 58, 60, 62, 64, 66, 68, 69, 70, 71, 72, 72.8]
  },
  // China Tech
  {
    ticker: "BABA", name: "Alibaba Group", price: 88.42, change: 2.85, changePercent: 3.33,
    marketCap: "$218B", sector: "China Tech", industry: "E-Commerce & Cloud", country: "China",
    pe: 12.5, forwardPe: 10.2, evEbitda: 7.8, ps: 1.8, pb: 1.5,
    ebitMargin: 14.2, ebitdaMargin: 22.5, netMargin: 12.8, roe: 12.5, roic: 8.2,
    revenueGrowth: 8.5, earningsGrowth: 22.5, fcfGrowth: 15.2,
    debtEquity: 0.18, netDebtEbitda: -1.8, currentRatio: 1.5,
    assetTurnover: 0.5, operatingMargin: 14.0, dividendYield: 1.25, buybackYield: 5.2,
    beta: 0.85, enterpriseValue: "$195B", employees: "219,200", headquarters: "Hangzhou, China",
    description: "Alibaba is China's largest e-commerce and cloud computing company operating Taobao, Tmall, and Alibaba Cloud.",
    revenue: "$126.5B", ebit: "$18.0B", netIncome: "$16.2B", fcf: "$22.5B", eps: 7.08,
    sparkline: [72, 74, 76, 78, 80, 82, 84, 85, 86, 87, 88, 88.4]
  },
  {
    ticker: "TCEHY", name: "Tencent Holdings", price: 45.82, change: 0.92, changePercent: 2.05,
    marketCap: "$432B", sector: "China Tech", industry: "Gaming & Social Media", country: "China",
    pe: 18.5, forwardPe: 15.8, evEbitda: 12.5, ps: 5.8, pb: 3.8,
    ebitMargin: 28.5, ebitdaMargin: 35.2, netMargin: 25.8, roe: 18.5, roic: 14.2,
    revenueGrowth: 10.2, earningsGrowth: 28.5, fcfGrowth: 18.2,
    debtEquity: 0.32, netDebtEbitda: -0.5, currentRatio: 1.3,
    assetTurnover: 0.3, operatingMargin: 28.2, dividendYield: 0.82, buybackYield: 2.5,
    beta: 0.72, enterpriseValue: "$415B", employees: "105,400", headquarters: "Shenzhen, China",
    description: "Tencent operates WeChat, online gaming, fintech, and cloud services across Asia.",
    revenue: "$82.5B", ebit: "$23.5B", netIncome: "$21.3B", fcf: "$18.5B", eps: 2.48,
    sparkline: [38, 39, 40, 41, 42, 43, 43.5, 44, 44.5, 45, 45.5, 45.8]
  },
  {
    ticker: "BYDDY", name: "BYD Co.", price: 68.52, change: 1.55, changePercent: 2.31,
    marketCap: "$98B", sector: "China Tech", industry: "Electric Vehicles", country: "China",
    pe: 22.8, forwardPe: 18.5, evEbitda: 14.2, ps: 1.2, pb: 4.5,
    ebitMargin: 6.8, ebitdaMargin: 10.2, netMargin: 5.2, roe: 18.5, roic: 12.5,
    revenueGrowth: 42.5, earningsGrowth: 80.2, fcfGrowth: 55.2,
    debtEquity: 0.28, netDebtEbitda: 0.8, currentRatio: 1.2,
    assetTurnover: 1.2, operatingMargin: 6.5, dividendYield: 0.45, buybackYield: 0,
    beta: 0.92, enterpriseValue: "$102B", employees: "703,900", headquarters: "Shenzhen, China",
    description: "BYD manufactures electric vehicles, batteries, and renewable energy solutions.",
    revenue: "$82.8B", ebit: "$5.6B", netIncome: "$4.3B", fcf: "$2.8B", eps: 3.0,
    sparkline: [52, 54, 56, 58, 60, 62, 63, 64, 65, 66, 67, 68.5]
  },
  // Strategy (Bitcoin proxy)
  {
    ticker: "MSTR", name: "Strategy (MicroStrategy)", price: 1542.80, change: 48.25, changePercent: 3.23,
    marketCap: "$32B", sector: "Crypto Exposure", industry: "Bitcoin Treasury", country: "US",
    pe: -1, forwardPe: -1, evEbitda: -1, ps: 65.2, pb: 2.8,
    ebitMargin: -12.5, ebitdaMargin: -8.2, netMargin: -15.2, roe: -8.5, roic: -5.2,
    revenueGrowth: -2.5, earningsGrowth: 0, fcfGrowth: -5.2,
    debtEquity: 1.85, netDebtEbitda: -25.2, currentRatio: 0.6,
    assetTurnover: 0.03, operatingMargin: -12.2, dividendYield: 0, buybackYield: 0,
    beta: 2.85, enterpriseValue: "$38B", employees: "1,530", headquarters: "Tysons, VA",
    description: "MicroStrategy (Strategy) is a Bitcoin treasury company and enterprise analytics software provider.",
    revenue: "$0.5B", ebit: "-$0.06B", netIncome: "-$0.08B", fcf: "$0.02B", eps: -4.52,
    sparkline: [1200, 1250, 1300, 1350, 1400, 1420, 1450, 1480, 1500, 1520, 1535, 1542]
  },
  // Finnish / Nordic
  {
    ticker: "DETEC.HE", name: "Detection Technology", price: 18.42, change: 0.32, changePercent: 1.77,
    marketCap: "$280M", sector: "Semiconductors", industry: "X-ray Detectors", country: "Finland",
    pe: 32.5, forwardPe: 22.8, evEbitda: 18.5, ps: 2.8, pb: 3.2,
    ebitMargin: 12.5, ebitdaMargin: 18.2, netMargin: 8.5, roe: 10.2, roic: 8.5,
    revenueGrowth: 15.2, earningsGrowth: 28.5, fcfGrowth: 18.2,
    debtEquity: 0.12, netDebtEbitda: -0.5, currentRatio: 3.2,
    assetTurnover: 0.8, operatingMargin: 12.2, dividendYield: 1.85, buybackYield: 0,
    beta: 0.95, enterpriseValue: "$265M", employees: "550", headquarters: "Oulu, Finland",
    description: "Detection Technology develops X-ray detector solutions for medical, security, and industrial imaging.",
    revenue: "$98M", ebit: "$12.3M", netIncome: "$8.3M", fcf: "$10.5M", eps: 0.57,
    sparkline: [15, 15.5, 16, 16.5, 17, 17.2, 17.5, 17.8, 18, 18.1, 18.3, 18.4]
  },
  {
    ticker: "CANATU", name: "Canatu Oy", price: 2.85, change: 0.08, changePercent: 2.89,
    marketCap: "$45M", sector: "Semiconductors", industry: "Carbon Nanomaterials", country: "Finland",
    pe: -1, forwardPe: -1, evEbitda: -1, ps: 8.5, pb: 4.2,
    ebitMargin: -42.5, ebitdaMargin: -35.2, netMargin: -48.5, roe: -22.5, roic: -18.2,
    revenueGrowth: 45.2, earningsGrowth: 0, fcfGrowth: 0,
    debtEquity: 0.52, netDebtEbitda: -8.5, currentRatio: 1.5,
    assetTurnover: 0.2, operatingMargin: -42.2, dividendYield: 0, buybackYield: 0,
    beta: 1.85, enterpriseValue: "$50M", employees: "85", headquarters: "Helsinki, Finland",
    description: "Canatu develops carbon nanotube films for touch sensors, heaters, and semiconductor applications.",
    revenue: "$5.3M", ebit: "-$2.3M", netIncome: "-$2.6M", fcf: "-$3.1M", eps: -0.18,
    sparkline: [2.2, 2.3, 2.4, 2.5, 2.5, 2.6, 2.7, 2.7, 2.8, 2.8, 2.85, 2.85]
  },
  {
    ticker: "QTCOM.HE", name: "Qt Group", price: 68.20, change: 1.85, changePercent: 2.79,
    marketCap: "$1.7B", sector: "AI / Software", industry: "Development Tools", country: "Finland",
    pe: 52.5, forwardPe: 38.2, evEbitda: 42.1, ps: 9.8, pb: 8.5,
    ebitMargin: 18.5, ebitdaMargin: 22.8, netMargin: 14.2, roe: 15.8, roic: 12.2,
    revenueGrowth: 12.8, earningsGrowth: 22.5, fcfGrowth: 18.5,
    debtEquity: 0.05, netDebtEbitda: -1.2, currentRatio: 2.5,
    assetTurnover: 0.8, operatingMargin: 18.2, dividendYield: 0, buybackYield: 0,
    beta: 1.15, enterpriseValue: "$1.65B", employees: "780", headquarters: "Espoo, Finland",
    description: "Qt Group provides cross-platform software development tools for embedded systems and applications.",
    revenue: "$178M", ebit: "$33M", netIncome: "$25.3M", fcf: "$28.5M", eps: 1.30,
    sparkline: [55, 57, 58, 60, 62, 63, 64, 65, 66, 67, 68, 68.2]
  },
  {
    ticker: "REG1V.HE", name: "Revenio Group", price: 28.45, change: -0.42, changePercent: -1.45,
    marketCap: "$765M", sector: "Healthcare", industry: "Medical Devices", country: "Finland",
    pe: 38.2, forwardPe: 28.5, evEbitda: 28.8, ps: 8.5, pb: 12.2,
    ebitMargin: 28.5, ebitdaMargin: 32.8, netMargin: 22.1, roe: 32.5, roic: 24.8,
    revenueGrowth: 8.5, earningsGrowth: 12.2, fcfGrowth: 15.5,
    debtEquity: 0.08, netDebtEbitda: -0.8, currentRatio: 2.8,
    assetTurnover: 0.9, operatingMargin: 28.2, dividendYield: 1.42, buybackYield: 0,
    beta: 0.72, enterpriseValue: "$745M", employees: "350", headquarters: "Vantaa, Finland",
    description: "Revenio develops ophthalmic screening devices including the iCare tonometer for glaucoma screening.",
    revenue: "$90M", ebit: "$25.7M", netIncome: "$19.9M", fcf: "$22.1M", eps: 0.74,
    sparkline: [30, 29.8, 29.5, 29.2, 29, 28.8, 28.5, 28.6, 28.5, 28.4, 28.5, 28.4]
  },
  {
    ticker: "TNOM.HE", name: "Talenom Oyj", price: 6.82, change: 0.12, changePercent: 1.79,
    marketCap: "$310M", sector: "AI / Software", industry: "Accounting & Fintech", country: "Finland",
    pe: 22.5, forwardPe: 18.2, evEbitda: 12.8, ps: 3.2, pb: 5.5,
    ebitMargin: 15.2, ebitdaMargin: 28.5, netMargin: 10.8, roe: 22.5, roic: 12.8,
    revenueGrowth: 18.5, earningsGrowth: 15.2, fcfGrowth: 22.8,
    debtEquity: 1.22, netDebtEbitda: 2.8, currentRatio: 0.8,
    assetTurnover: 0.5, operatingMargin: 15.0, dividendYield: 2.85, buybackYield: 0,
    beta: 0.82, enterpriseValue: "$380M", employees: "1,200", headquarters: "Helsinki, Finland",
    description: "Talenom provides automated accounting, bookkeeping, and financial management services in Nordics.",
    revenue: "$95M", ebit: "$14.4M", netIncome: "$10.3M", fcf: "$18.2M", eps: 0.30,
    sparkline: [5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.75, 6.82]
  },
  {
    ticker: "IREN", name: "Iren (ex-Iris Energy)", price: 12.85, change: 0.62, changePercent: 5.07,
    marketCap: "$3.2B", sector: "Crypto Exposure", industry: "Bitcoin Mining & AI Data Centers", country: "Australia",
    pe: -1, forwardPe: 42.5, evEbitda: 18.5, ps: 8.2, pb: 2.8,
    ebitMargin: -5.2, ebitdaMargin: 42.5, netMargin: -8.5, roe: -12.5, roic: -8.2,
    revenueGrowth: 85.2, earningsGrowth: 0, fcfGrowth: 125.2,
    debtEquity: 0.15, netDebtEbitda: 0.2, currentRatio: 2.5,
    assetTurnover: 0.2, operatingMargin: -5.0, dividendYield: 0, buybackYield: 0,
    beta: 2.52, enterpriseValue: "$3.1B", employees: "350", headquarters: "Sydney, Australia",
    description: "Iren operates Bitcoin mining and AI/HPC data center infrastructure using renewable energy.",
    revenue: "$0.38B", ebit: "-$0.02B", netIncome: "-$0.03B", fcf: "$0.15B", eps: -0.12,
    sparkline: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.2, 12.5, 12.85]
  },
  {
    ticker: "AIFORIA", name: "Aiforia Technologies", price: 1.42, change: -0.08, changePercent: -5.33,
    marketCap: "$28M", sector: "Healthcare", industry: "AI Pathology", country: "Finland",
    pe: -1, forwardPe: -1, evEbitda: -1, ps: 5.8, pb: 2.2,
    ebitMargin: -85.2, ebitdaMargin: -78.5, netMargin: -92.5, roe: -42.5, roic: -35.2,
    revenueGrowth: 32.5, earningsGrowth: 0, fcfGrowth: 0,
    debtEquity: 0.22, netDebtEbitda: -5.2, currentRatio: 2.2,
    assetTurnover: 0.15, operatingMargin: -85.0, dividendYield: 0, buybackYield: 0,
    beta: 1.95, enterpriseValue: "$25M", employees: "65", headquarters: "Helsinki, Finland",
    description: "Aiforia develops AI-powered pathology platforms for clinical diagnostics and pharmaceutical research.",
    revenue: "$4.8M", ebit: "-$4.1M", netIncome: "-$4.4M", fcf: "-$3.8M", eps: -0.22,
    sparkline: [2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.55, 1.5, 1.48, 1.45, 1.42]
  },
  {
    ticker: "EASOR", name: "Easor Oy", price: 0.85, change: 0.02, changePercent: 2.41,
    marketCap: "$12M", sector: "AI / Software", industry: "Geothermal Energy Tech", country: "Finland",
    pe: -1, forwardPe: -1, evEbitda: -1, ps: 25.2, pb: 3.5,
    ebitMargin: -125.2, ebitdaMargin: -118.5, netMargin: -132.5, roe: -55.2, roic: -42.5,
    revenueGrowth: 0, earningsGrowth: 0, fcfGrowth: 0,
    debtEquity: 0.35, netDebtEbitda: -12.5, currentRatio: 1.8,
    assetTurnover: 0.05, operatingMargin: -125.0, dividendYield: 0, buybackYield: 0,
    beta: 2.15, enterpriseValue: "$14M", employees: "25", headquarters: "Espoo, Finland",
    description: "Easor develops deep geothermal heating technology for sustainable district heating solutions.",
    revenue: "$0.5M", ebit: "-$0.6M", netIncome: "-$0.7M", fcf: "-$0.8M", eps: -0.08,
    sparkline: [0.72, 0.74, 0.76, 0.78, 0.80, 0.81, 0.82, 0.83, 0.84, 0.84, 0.85, 0.85]
  },
];

// iShares Core S&P 500 UCITS ETF
export const portfolioETFs = [
  {
    ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", price: 582.45, change: 3.82, changePercent: 0.66,
    marketCap: "$82B AUM", sector: "ETF", industry: "US Large Cap Index", country: "Ireland (domicile)",
    sparkline: [550, 555, 560, 565, 568, 572, 575, 578, 580, 581, 582, 582]
  },
  {
    ticker: "QTUM", name: "iShares Quantum Computing ETF", price: 42.15, change: 0.85, changePercent: 2.06,
    marketCap: "$850M AUM", sector: "ETF", industry: "Quantum Computing", country: "US",
    sparkline: [35, 36, 37, 38, 39, 39.5, 40, 40.5, 41, 41.5, 42, 42.1]
  },
];

export interface PortfolioHolding {
  ticker: string;
  name: string;
  shares: number;
  avgCost: number;
  weight: number;
  sector: string;
  country: string;
  assetType: "Stock" | "ETF" | "Crypto Exposure";
}

export const portfolioHoldings: PortfolioHolding[] = [
  { ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", shares: 12, avgCost: 520.0, weight: 14.2, sector: "ETF", country: "US", assetType: "ETF" },
  { ticker: "TSM", name: "TSMC", shares: 45, avgCost: 98.50, weight: 13.0, sector: "Semiconductors", country: "Taiwan", assetType: "Stock" },
  { ticker: "ASML", name: "ASML Holding", shares: 8, avgCost: 680.0, weight: 15.9, sector: "Semiconductors", country: "Netherlands", assetType: "Stock" },
  { ticker: "MSTR", name: "Strategy (Bitcoin)", shares: 3, avgCost: 1200.0, weight: 9.4, sector: "Crypto Exposure", country: "US", assetType: "Crypto Exposure" },
  { ticker: "NVO", name: "Novo Nordisk", shares: 35, avgCost: 110.0, weight: 9.1, sector: "Healthcare", country: "Denmark", assetType: "Stock" },
  { ticker: "AMZN", name: "Amazon", shares: 22, avgCost: 145.0, weight: 8.3, sector: "Big Tech", country: "US", assetType: "Stock" },
  { ticker: "ADBE", name: "Adobe", shares: 6, avgCost: 420.0, weight: 5.8, sector: "Big Tech", country: "US", assetType: "Stock" },
  { ticker: "BABA", name: "Alibaba", shares: 30, avgCost: 72.0, weight: 5.4, sector: "China Tech", country: "China", assetType: "Stock" },
  { ticker: "AVGO", name: "Broadcom", shares: 2, avgCost: 1400.0, weight: 6.8, sector: "Semiconductors", country: "US", assetType: "Stock" },
  { ticker: "DETEC.HE", name: "Detection Technology", shares: 120, avgCost: 14.50, weight: 4.5, sector: "Semiconductors", country: "Finland", assetType: "Stock" },
  { ticker: "CANATU", name: "Canatu", shares: 800, avgCost: 2.20, weight: 4.6, sector: "Semiconductors", country: "Finland", assetType: "Stock" },
  { ticker: "UNH", name: "UnitedHealth Group", shares: 4, avgCost: 480.0, weight: 4.3, sector: "Healthcare", country: "US", assetType: "Stock" },
  { ticker: "QTCOM.HE", name: "Qt Group", shares: 30, avgCost: 52.0, weight: 4.2, sector: "AI / Software", country: "Finland", assetType: "Stock" },
  { ticker: "UBER", name: "Uber", shares: 25, avgCost: 48.0, weight: 3.7, sector: "EV and Mobility", country: "US", assetType: "Stock" },
  { ticker: "QTUM", name: "iShares Quantum Computing ETF", shares: 40, avgCost: 32.0, weight: 3.4, sector: "ETF", country: "US", assetType: "ETF" },
  { ticker: "REG1V.HE", name: "Revenio Group", shares: 45, avgCost: 25.0, weight: 2.6, sector: "Healthcare", country: "Finland", assetType: "Stock" },
  { ticker: "TNOM.HE", name: "Talenom", shares: 150, avgCost: 5.50, weight: 2.1, sector: "AI / Software", country: "Finland", assetType: "Stock" },
  { ticker: "IREN", name: "Iren", shares: 80, avgCost: 8.50, weight: 2.1, sector: "Crypto Exposure", country: "Australia", assetType: "Stock" },
  { ticker: "AIFORIA", name: "Aiforia Technologies", shares: 400, avgCost: 1.80, weight: 1.2, sector: "Healthcare", country: "Finland", assetType: "Stock" },
  { ticker: "EASOR", name: "Easor", shares: 500, avgCost: 0.65, weight: 0.9, sector: "AI / Software", country: "Finland", assetType: "Stock" },
];

export const sectorCategories: Record<string, string[]> = {
  "Semiconductors": ["NVDA", "AMD", "INTC", "TSM", "ASML", "AVGO", "DETEC.HE", "CANATU"],
  "Big Tech": ["AAPL", "MSFT", "AMZN", "GOOGL", "META", "ADBE"],
  "AI / Software": ["PLTR", "SNOW", "CRM", "NOW", "QTCOM.HE", "TNOM.HE", "EASOR"],
  "Healthcare": ["NVO", "LLY", "UNH", "REG1V.HE", "AIFORIA"],
  "EV and Mobility": ["TSLA", "UBER"],
  "China Tech": ["BABA", "TCEHY", "BYDDY"],
  "Crypto Exposure": ["MSTR", "IREN"],
};

export function getStockByTicker(ticker: string): StockData | undefined {
  return allStocks.find(s => s.ticker === ticker);
}

// Centralized mock financial data

export interface StockData {
  ticker: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  weeklyPercent: number;
  ytdPercent: number;
  yearPercent: number;
  marketCap: string;
  sector: string;
  theme: string;
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

function spark(base: number, trend: number, vol: number): number[] {
  const pts: number[] = [];
  let v = base;
  for (let i = 0; i < 12; i++) {
    v += trend + (Math.sin(i * 1.3) * vol);
    pts.push(Math.round(v * 100) / 100);
  }
  return pts;
}

function s(overrides: Partial<StockData> & Pick<StockData, 'ticker' | 'name' | 'price' | 'changePercent' | 'marketCap' | 'sector' | 'theme' | 'country'>): StockData {
  const cp = overrides.changePercent;
  return {
    change: +(overrides.price * cp / 100).toFixed(2),
    weeklyPercent: overrides.weeklyPercent ?? +(cp * 2.1 + (Math.random() - 0.5) * 3).toFixed(2),
    ytdPercent: overrides.ytdPercent ?? +(cp * 15 + (Math.random() - 0.5) * 20).toFixed(2),
    yearPercent: overrides.yearPercent ?? +(cp * 25 + (Math.random() - 0.5) * 40).toFixed(2),
    industry: overrides.industry ?? overrides.sector,
    pe: 0, forwardPe: 0, evEbitda: 0, ps: 0, pb: 0,
    ebitMargin: 0, ebitdaMargin: 0, netMargin: 0, roe: 0, roic: 0,
    revenueGrowth: 0, earningsGrowth: 0, fcfGrowth: 0,
    debtEquity: 0, netDebtEbitda: 0, currentRatio: 1.5,
    assetTurnover: 0.5, operatingMargin: 0, dividendYield: 0, buybackYield: 0,
    beta: 1.0, enterpriseValue: overrides.marketCap, employees: "N/A",
    headquarters: "", description: "", revenue: "N/A", ebit: "N/A",
    netIncome: "N/A", fcf: "N/A", eps: 0,
    sparkline: spark(overrides.price * 0.9, overrides.price * 0.008 * (cp >= 0 ? 1 : -1), overrides.price * 0.01),
    ...overrides,
  } as StockData;
}

export const allStocks: StockData[] = [
  // ═══════════════════════════════════════════
  // SEMICONDUCTORS & CHIP EQUIPMENT
  // ═══════════════════════════════════════════
  s({
    ticker: "NVDA", name: "NVIDIA Corp.", price: 878.36, changePercent: 3.21,
    marketCap: "$2.16T", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "GPU & AI Chips", country: "US",
    pe: 72.4, forwardPe: 38.2, evEbitda: 62.1, ps: 36.8, pb: 52.3,
    ebitMargin: 54.2, ebitdaMargin: 56.8, netMargin: 49.8, roe: 91.5, roic: 68.2,
    revenueGrowth: 122.4, earningsGrowth: 168.5, fcfGrowth: 142.3,
    debtEquity: 0.41, netDebtEbitda: -0.8, currentRatio: 4.2,
    assetTurnover: 1.1, operatingMargin: 54.1, dividendYield: 0.02, buybackYield: 0.8,
    beta: 1.72, enterpriseValue: "$2.12T", employees: "29,600", headquarters: "Santa Clara, CA",
    description: "NVIDIA designs GPUs and AI computing platforms powering data centers, gaming, and autonomous vehicles.",
    revenue: "$60.9B", ebit: "$33.0B", netIncome: "$29.8B", fcf: "$27.1B", eps: 11.93,
    weeklyPercent: 5.42, ytdPercent: 42.8, yearPercent: 185.2,
    sparkline: [650, 680, 720, 690, 750, 780, 810, 830, 845, 860, 870, 878]
  }),
  s({
    ticker: "AMD", name: "Advanced Micro Devices", price: 178.23, changePercent: -0.67,
    marketCap: "$288B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "CPU & GPU", country: "US",
    pe: 46.2, forwardPe: 28.5, evEbitda: 38.4, ps: 12.5, pb: 4.8,
    ebitMargin: 22.1, ebitdaMargin: 27.3, netMargin: 18.4, roe: 10.2, roic: 8.1,
    revenueGrowth: 10.2, earningsGrowth: 42.5, fcfGrowth: 35.2,
    debtEquity: 0.04, netDebtEbitda: -1.2, currentRatio: 2.5,
    beta: 1.68, employees: "26,000", headquarters: "Santa Clara, CA",
    description: "AMD designs high-performance CPUs and GPUs for computing, gaming, and data center markets.",
    revenue: "$22.7B", ebit: "$5.0B", netIncome: "$4.2B", fcf: "$4.8B", eps: 2.65,
    weeklyPercent: -2.1, ytdPercent: -8.5, yearPercent: 12.4,
    sparkline: [160, 165, 170, 168, 175, 180, 178, 176, 174, 177, 179, 178]
  }),
  s({
    ticker: "INTC", name: "Intel Corp.", price: 31.42, changePercent: -1.23,
    marketCap: "$133B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "CPU & Foundry", country: "US",
    pe: 108.3, forwardPe: 22.1, evEbitda: 18.5, ps: 2.5, pb: 1.3,
    ebitMargin: 2.1, ebitdaMargin: 18.4, netMargin: 1.8, roe: 1.2, roic: 0.8,
    revenueGrowth: -14.2, earningsGrowth: -62.1, fcfGrowth: -45.3,
    beta: 1.05, employees: "124,800", headquarters: "Santa Clara, CA",
    description: "Intel designs and manufactures CPUs and is investing heavily in foundry services.",
    revenue: "$54.2B", ebit: "$1.1B", netIncome: "$0.9B", fcf: "-$2.1B", eps: 0.29,
    dividendYield: 1.58, weeklyPercent: -3.2, ytdPercent: -22.5, yearPercent: -38.2,
    sparkline: [38, 36, 35, 33, 34, 32, 33, 31, 30, 31, 32, 31]
  }),
  s({
    ticker: "TSM", name: "TSMC", price: 142.56, changePercent: 1.87,
    marketCap: "$738B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Foundry", country: "Taiwan",
    pe: 25.8, forwardPe: 20.1, evEbitda: 15.2, ps: 10.5, pb: 6.8,
    ebitMargin: 43.2, ebitdaMargin: 64.8, netMargin: 38.5, roe: 28.4, roic: 22.1,
    revenueGrowth: 26.3, earningsGrowth: 32.1, fcfGrowth: 18.5,
    beta: 1.15, employees: "76,000", headquarters: "Hsinchu, Taiwan",
    description: "TSMC is the world's largest semiconductor foundry.",
    revenue: "$69.3B", ebit: "$29.9B", netIncome: "$26.7B", fcf: "$18.2B", eps: 5.52,
    dividendYield: 1.42, weeklyPercent: 3.8, ytdPercent: 28.5, yearPercent: 62.1,
    sparkline: [105, 110, 115, 112, 120, 125, 128, 132, 135, 138, 140, 142]
  }),
  s({
    ticker: "ASML", name: "ASML Holding", price: 982.45, changePercent: 1.53,
    marketCap: "$388B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Lithography Equipment", country: "Netherlands",
    pe: 42.1, forwardPe: 32.5, evEbitda: 35.8, ps: 14.2, pb: 18.5,
    ebitMargin: 33.8, ebitdaMargin: 36.2, netMargin: 28.4, roe: 52.1, roic: 38.4,
    revenueGrowth: 30.2, earningsGrowth: 28.5, fcfGrowth: 22.1,
    beta: 1.22, employees: "42,000", headquarters: "Veldhoven, Netherlands",
    description: "ASML is the sole manufacturer of EUV lithography machines.",
    revenue: "$27.6B", ebit: "$9.3B", netIncome: "$7.8B", fcf: "$6.2B", eps: 23.32,
    dividendYield: 0.68, weeklyPercent: 2.9, ytdPercent: 18.2, yearPercent: 45.8,
    sparkline: [780, 800, 820, 850, 870, 890, 920, 940, 950, 960, 970, 982]
  }),
  s({
    ticker: "AVGO", name: "Broadcom Inc.", price: 1685.20, changePercent: 1.33,
    marketCap: "$783B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Networking & Infrastructure", country: "US",
    pe: 36.8, forwardPe: 26.2, evEbitda: 24.5, ps: 16.8, pb: 12.1,
    ebitMargin: 38.2, ebitdaMargin: 58.5, netMargin: 32.4, roe: 42.8, roic: 18.5,
    revenueGrowth: 44.2, earningsGrowth: 38.1, fcfGrowth: 25.3,
    beta: 1.18, employees: "20,000", headquarters: "Palo Alto, CA",
    description: "Broadcom designs semiconductors and infrastructure software for data centers.",
    revenue: "$46.8B", ebit: "$17.9B", netIncome: "$15.2B", fcf: "$18.5B", eps: 45.75,
    dividendYield: 1.24, weeklyPercent: 4.1, ytdPercent: 32.5, yearPercent: 88.2,
    sparkline: [1200, 1250, 1300, 1350, 1400, 1450, 1500, 1550, 1580, 1620, 1660, 1685]
  }),
  s({
    ticker: "MU", name: "Micron Technology", price: 94.82, changePercent: 2.15,
    marketCap: "$105B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Memory & Storage", country: "US",
    pe: 22.8, forwardPe: 12.5, evEbitda: 10.2, ps: 3.8, pb: 2.5,
    ebitMargin: 22.5, ebitdaMargin: 42.8, netMargin: 18.2, roe: 12.5, roic: 8.2,
    revenueGrowth: 61.5, earningsGrowth: 320.2, fcfGrowth: 185.2,
    beta: 1.35, employees: "48,000", headquarters: "Boise, ID",
    description: "Micron produces DRAM and NAND memory chips for computing and mobile markets.",
    revenue: "$25.1B", ebit: "$5.7B", netIncome: "$4.6B", fcf: "$3.2B", eps: 4.16,
    weeklyPercent: 4.8, ytdPercent: 15.2, yearPercent: 42.5,
  }),
  s({
    ticker: "LRCX", name: "Lam Research", price: 842.15, changePercent: 0.92,
    marketCap: "$110B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Semiconductor Equipment", country: "US",
    pe: 24.5, forwardPe: 20.8, evEbitda: 18.2, ps: 6.8, pb: 12.5,
    ebitMargin: 30.2, ebitdaMargin: 34.5, netMargin: 25.8, roe: 58.2, roic: 32.5,
    revenueGrowth: 20.5, earningsGrowth: 28.2, fcfGrowth: 22.1,
    beta: 1.28, employees: "17,200", headquarters: "Fremont, CA",
    description: "Lam Research designs wafer fabrication equipment for the semiconductor industry.",
    revenue: "$16.2B", ebit: "$4.9B", netIncome: "$4.2B", fcf: "$4.8B", eps: 34.28,
    dividendYield: 0.85, weeklyPercent: 2.1, ytdPercent: 12.8, yearPercent: 35.2,
  }),
  s({
    ticker: "AMAT", name: "Applied Materials", price: 198.52, changePercent: 1.18,
    marketCap: "$165B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Semiconductor Equipment", country: "US",
    pe: 22.1, forwardPe: 18.5, evEbitda: 16.8, ps: 6.2, pb: 8.5,
    ebitMargin: 28.5, ebitdaMargin: 32.8, netMargin: 24.2, roe: 42.5, roic: 28.2,
    revenueGrowth: 5.2, earningsGrowth: 12.5, fcfGrowth: 8.2,
    beta: 1.32, employees: "34,000", headquarters: "Santa Clara, CA",
    description: "Applied Materials provides equipment and services for semiconductor manufacturing.",
    revenue: "$26.5B", ebit: "$7.6B", netIncome: "$6.4B", fcf: "$7.2B", eps: 8.98,
    dividendYield: 0.68, weeklyPercent: 1.8, ytdPercent: 8.5, yearPercent: 22.1,
  }),
  s({
    ticker: "QCOM", name: "QUALCOMM", price: 168.42, changePercent: 0.85,
    marketCap: "$188B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Mobile Chips & 5G", country: "US",
    pe: 18.5, forwardPe: 14.2, evEbitda: 12.8, ps: 4.8, pb: 7.2,
    ebitMargin: 28.2, ebitdaMargin: 32.5, netMargin: 24.5, roe: 42.8, roic: 28.5,
    revenueGrowth: 8.5, earningsGrowth: 22.1, fcfGrowth: 15.2,
    beta: 1.22, employees: "51,000", headquarters: "San Diego, CA",
    description: "QUALCOMM develops wireless technology and mobile chipsets including Snapdragon.",
    revenue: "$38.9B", ebit: "$11.0B", netIncome: "$9.5B", fcf: "$10.2B", eps: 9.12,
    dividendYield: 1.85, weeklyPercent: 1.5, ytdPercent: 5.2, yearPercent: 18.5,
  }),
  s({
    ticker: "ARM", name: "Arm Holdings", price: 152.85, changePercent: 2.42,
    marketCap: "$158B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Chip Architecture IP", country: "UK",
    pe: 185.2, forwardPe: 82.5, evEbitda: 125.8, ps: 48.2, pb: 28.5,
    ebitMargin: 25.8, ebitdaMargin: 28.5, netMargin: 22.1, roe: 18.5, roic: 12.2,
    revenueGrowth: 46.2, earningsGrowth: 82.5, fcfGrowth: 55.2,
    beta: 1.55, employees: "6,400", headquarters: "Cambridge, UK",
    description: "Arm designs CPU architectures licensed to chipmakers worldwide.",
    revenue: "$3.2B", ebit: "$0.83B", netIncome: "$0.72B", fcf: "$0.85B", eps: 0.83,
    weeklyPercent: 5.2, ytdPercent: 22.5, yearPercent: 68.2,
  }),
  s({
    ticker: "COHR", name: "Coherent Corp.", price: 82.45, changePercent: 1.85,
    marketCap: "$13B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Photonics & Optics", country: "US",
    pe: 42.5, forwardPe: 22.8, evEbitda: 18.5, ps: 2.8, pb: 2.2,
    revenueGrowth: 18.5, earningsGrowth: 125.2, beta: 1.65,
    employees: "28,000", headquarters: "Saxonburg, PA",
    description: "Coherent develops photonic solutions for communications, electronics, and industrial markets.",
    weeklyPercent: 4.2, ytdPercent: 28.5, yearPercent: 92.1,
  }),
  s({
    ticker: "ALAB", name: "Astera Labs", price: 88.52, changePercent: 3.85,
    marketCap: "$14B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "Data Center Connectivity", country: "US",
    pe: -1, forwardPe: 125.2, evEbitda: -1, ps: 52.8, pb: 18.5,
    revenueGrowth: 85.2, earningsGrowth: 0, beta: 2.15,
    employees: "450", headquarters: "Santa Clara, CA",
    description: "Astera Labs develops connectivity solutions for AI and cloud data center infrastructure.",
    weeklyPercent: 8.5, ytdPercent: 42.8, yearPercent: 155.2,
  }),
  s({
    ticker: "CLS", name: "Celestica Inc.", price: 68.25, changePercent: 2.12,
    marketCap: "$8.2B", sector: "Semiconductors", theme: "Semiconductors & Chip Equipment",
    industry: "EMS & Data Center HW", country: "Canada",
    pe: 28.5, forwardPe: 18.2, evEbitda: 14.5, ps: 1.2, pb: 5.8,
    revenueGrowth: 22.5, earningsGrowth: 45.2, beta: 1.45,
    employees: "26,000", headquarters: "Toronto, Canada",
    description: "Celestica provides electronic manufacturing services and hardware platform solutions.",
    weeklyPercent: 5.8, ytdPercent: 35.2, yearPercent: 142.5,
  }),

  // ═══════════════════════════════════════════
  // AI / SOFTWARE / CLOUD
  // ═══════════════════════════════════════════
  s({
    ticker: "MSFT", name: "Microsoft Corp.", price: 425.52, changePercent: 0.89,
    marketCap: "$3.16T", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "Software & Cloud", country: "US",
    pe: 36.5, forwardPe: 30.2, evEbitda: 26.8, ps: 14.2, pb: 13.1,
    ebitMargin: 44.2, ebitdaMargin: 50.1, netMargin: 35.8, roe: 38.5, roic: 28.2,
    revenueGrowth: 15.2, earningsGrowth: 20.5, fcfGrowth: 18.2,
    beta: 0.92, employees: "221,000", headquarters: "Redmond, WA",
    description: "Microsoft develops software, cloud computing (Azure), and AI services.",
    revenue: "$227.6B", ebit: "$100.6B", netIncome: "$81.5B", fcf: "$72.4B", eps: 11.86,
    dividendYield: 0.72, weeklyPercent: 1.8, ytdPercent: 12.5, yearPercent: 28.2,
    sparkline: [380, 385, 392, 398, 405, 410, 408, 415, 420, 418, 422, 425]
  }),
  s({
    ticker: "GOOGL", name: "Alphabet Inc.", price: 156.82, changePercent: 1.21,
    marketCap: "$1.94T", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "Search & Cloud", country: "US",
    pe: 24.5, forwardPe: 20.8, evEbitda: 16.2, ps: 6.2, pb: 6.8,
    ebitMargin: 30.5, ebitdaMargin: 36.2, netMargin: 25.8, roe: 28.5, roic: 22.1,
    revenueGrowth: 13.5, earningsGrowth: 28.2, fcfGrowth: 22.5,
    beta: 1.05, employees: "182,500", headquarters: "Mountain View, CA",
    description: "Alphabet is the parent company of Google.",
    revenue: "$307.4B", ebit: "$93.6B", netIncome: "$79.2B", fcf: "$67.5B", eps: 6.52,
    dividendYield: 0.45, weeklyPercent: 2.5, ytdPercent: 15.2, yearPercent: 32.5,
    sparkline: [135, 138, 140, 142, 145, 148, 150, 152, 153, 155, 154, 156]
  }),
  s({
    ticker: "META", name: "Meta Platforms", price: 515.42, changePercent: 1.14,
    marketCap: "$1.31T", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "Social Media & AI", country: "US",
    pe: 26.2, forwardPe: 22.5, evEbitda: 16.8, ps: 9.5, pb: 8.2,
    ebitMargin: 38.5, ebitdaMargin: 48.2, netMargin: 32.1, roe: 32.8, roic: 24.5,
    revenueGrowth: 22.8, earningsGrowth: 68.5, fcfGrowth: 42.1,
    beta: 1.22, employees: "67,300", headquarters: "Menlo Park, CA",
    description: "Meta operates Facebook, Instagram, WhatsApp.",
    revenue: "$134.9B", ebit: "$51.9B", netIncome: "$43.3B", fcf: "$38.2B", eps: 19.72,
    dividendYield: 0.38, weeklyPercent: 2.2, ytdPercent: 18.5, yearPercent: 52.8,
    sparkline: [400, 420, 440, 450, 460, 470, 480, 490, 495, 500, 510, 515]
  }),
  s({
    ticker: "AMZN", name: "Amazon.com", price: 185.07, changePercent: 0.54,
    marketCap: "$1.93T", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "E-Commerce & Cloud", country: "US",
    pe: 42.8, forwardPe: 32.1, evEbitda: 18.5, ps: 3.3, pb: 8.2,
    ebitMargin: 10.8, ebitdaMargin: 22.5, netMargin: 7.8, roe: 21.2, roic: 12.5,
    revenueGrowth: 12.5, earningsGrowth: 52.3, fcfGrowth: 85.2,
    beta: 1.15, employees: "1,525,000", headquarters: "Seattle, WA",
    description: "Amazon operates in e-commerce, cloud computing (AWS), and AI services.",
    revenue: "$574.8B", ebit: "$62.1B", netIncome: "$44.9B", fcf: "$54.2B", eps: 4.35,
    weeklyPercent: 1.2, ytdPercent: 8.5, yearPercent: 22.1,
    sparkline: [168, 170, 172, 175, 178, 176, 180, 182, 181, 183, 184, 185]
  }),
  s({
    ticker: "ADBE", name: "Adobe Inc.", price: 478.92, changePercent: -0.67,
    marketCap: "$212B", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "Creative Software", country: "US",
    pe: 38.5, forwardPe: 25.2, evEbitda: 28.1, ps: 10.8, pb: 14.2,
    ebitMargin: 35.2, ebitdaMargin: 42.5, netMargin: 28.1, roe: 38.2, roic: 26.5,
    revenueGrowth: 11.2, earningsGrowth: 15.8, fcfGrowth: 12.5,
    beta: 1.12, employees: "29,900", headquarters: "San Jose, CA",
    description: "Adobe develops creative and marketing software including Photoshop and Acrobat.",
    revenue: "$19.4B", ebit: "$6.8B", netIncome: "$5.5B", fcf: "$7.2B", eps: 12.42,
    weeklyPercent: -1.2, ytdPercent: -5.8, yearPercent: 2.5,
    sparkline: [510, 505, 500, 495, 490, 488, 485, 482, 480, 478, 479, 478]
  }),
  s({
    ticker: "ORCL", name: "Oracle Corp.", price: 178.52, changePercent: 0.95,
    marketCap: "$492B", sector: "Big Tech", theme: "AI / Software / Cloud",
    industry: "Enterprise Software & Cloud", country: "US",
    pe: 38.2, forwardPe: 28.5, evEbitda: 22.8, ps: 9.2, pb: 42.5,
    ebitMargin: 30.5, ebitdaMargin: 42.8, netMargin: 22.5, roe: 115.2, roic: 18.5,
    revenueGrowth: 18.2, earningsGrowth: 25.8, fcfGrowth: 22.1,
    beta: 1.05, employees: "164,000", headquarters: "Austin, TX",
    description: "Oracle provides database, cloud infrastructure, and enterprise software.",
    revenue: "$53.8B", ebit: "$16.4B", netIncome: "$12.1B", fcf: "$14.8B", eps: 4.68,
    dividendYield: 0.92, weeklyPercent: 2.1, ytdPercent: 15.8, yearPercent: 52.1,
  }),
  s({
    ticker: "CRM", name: "Salesforce Inc.", price: 272.85, changePercent: 1.27,
    marketCap: "$264B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "CRM & Cloud", country: "US",
    pe: 48.2, forwardPe: 28.5, evEbitda: 26.8, ps: 7.5, pb: 4.5,
    ebitMargin: 18.2, ebitdaMargin: 28.5, netMargin: 15.8, roe: 10.2, roic: 8.5,
    revenueGrowth: 11.2, earningsGrowth: 42.5, fcfGrowth: 28.2,
    beta: 1.15, employees: "79,400", headquarters: "San Francisco, CA",
    description: "Salesforce provides cloud-based CRM and enterprise AI solutions.",
    revenue: "$34.9B", ebit: "$6.4B", netIncome: "$5.5B", fcf: "$10.2B", eps: 5.65,
    dividendYield: 0.55, weeklyPercent: 2.8, ytdPercent: 12.2, yearPercent: 28.5,
    sparkline: [240, 245, 250, 255, 258, 262, 265, 268, 270, 272, 271, 272]
  }),
  s({
    ticker: "NOW", name: "ServiceNow Inc.", price: 792.15, changePercent: 1.09,
    marketCap: "$163B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "IT Service Management", country: "US",
    pe: 62.5, forwardPe: 42.1, evEbitda: 52.8, ps: 16.8, pb: 22.5,
    ebitMargin: 25.8, ebitdaMargin: 30.2, netMargin: 22.1, roe: 38.5, roic: 18.2,
    revenueGrowth: 24.5, earningsGrowth: 32.8, fcfGrowth: 28.5,
    beta: 1.05, employees: "22,700", headquarters: "Santa Clara, CA",
    description: "ServiceNow provides cloud-based IT service management and workflow automation.",
    revenue: "$9.5B", ebit: "$2.5B", netIncome: "$2.1B", fcf: "$3.2B", eps: 12.68,
    weeklyPercent: 2.5, ytdPercent: 18.2, yearPercent: 42.5,
    sparkline: [680, 700, 720, 735, 745, 755, 765, 772, 780, 785, 790, 792]
  }),
  s({
    ticker: "SNOW", name: "Snowflake Inc.", price: 162.45, changePercent: -1.32,
    marketCap: "$54B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Cloud Data Platform", country: "US",
    pe: -1, forwardPe: 185.2, evEbitda: -1, ps: 18.5, pb: 8.2,
    revenueGrowth: 32.8, beta: 1.52, employees: "6,900", headquarters: "Bozeman, MT",
    description: "Snowflake provides a cloud-based data warehouse platform.",
    revenue: "$2.8B", ebit: "-$0.24B", netIncome: "-$0.34B", fcf: "$0.42B", eps: -1.05,
    weeklyPercent: -3.5, ytdPercent: -12.8, yearPercent: -8.5,
    sparkline: [180, 178, 175, 172, 168, 165, 163, 160, 162, 164, 163, 162]
  }),
  s({
    ticker: "PLTR", name: "Palantir Technologies", price: 24.82, changePercent: 3.98,
    marketCap: "$54B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "AI & Data Analytics", country: "US",
    pe: 228.5, forwardPe: 82.1, evEbitda: 125.2, ps: 22.8, pb: 15.2,
    revenueGrowth: 20.8, earningsGrowth: 185.2,
    beta: 1.85, employees: "3,700", headquarters: "Denver, CO",
    description: "Palantir builds AI-powered data analytics platforms.",
    revenue: "$2.2B", ebit: "$0.28B", netIncome: "$0.21B", fcf: "$0.72B", eps: 0.11,
    weeklyPercent: 8.5, ytdPercent: 52.8, yearPercent: 185.2,
    sparkline: [16, 17, 18, 19, 20, 21, 22, 23, 23.5, 24, 24.5, 24.8]
  }),
  s({
    ticker: "CRWD", name: "CrowdStrike Holdings", price: 342.85, changePercent: 1.52,
    marketCap: "$82B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Cybersecurity", country: "US",
    pe: 485.2, forwardPe: 62.5, evEbitda: 72.8, ps: 22.5, pb: 28.2,
    revenueGrowth: 33.5, earningsGrowth: 125.2, beta: 1.42,
    employees: "8,500", headquarters: "Austin, TX",
    description: "CrowdStrike provides cloud-native endpoint security and threat intelligence.",
    weeklyPercent: 3.2, ytdPercent: 18.5, yearPercent: 62.8,
  }),
  s({
    ticker: "PANW", name: "Palo Alto Networks", price: 312.45, changePercent: 0.82,
    marketCap: "$105B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Cybersecurity", country: "US",
    pe: 48.5, forwardPe: 42.8, evEbitda: 52.1, ps: 14.2, pb: 22.5,
    revenueGrowth: 16.2, earningsGrowth: 58.5, beta: 1.18,
    employees: "15,500", headquarters: "Santa Clara, CA",
    description: "Palo Alto Networks provides cybersecurity solutions for enterprise and cloud.",
    weeklyPercent: 1.8, ytdPercent: 8.2, yearPercent: 28.5,
  }),
  s({
    ticker: "ZETA", name: "Zeta Global Holdings", price: 18.25, changePercent: 4.28,
    marketCap: "$4.2B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Marketing Technology", country: "US",
    pe: -1, forwardPe: 85.2, revenueGrowth: 28.5, beta: 1.72,
    employees: "1,800", headquarters: "New York, NY",
    description: "Zeta Global provides AI-powered marketing and customer engagement platforms.",
    weeklyPercent: 8.2, ytdPercent: 42.5, yearPercent: 125.8,
  }),
  s({
    ticker: "PATH", name: "UiPath Inc.", price: 14.82, changePercent: -2.15,
    marketCap: "$8.5B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Robotic Process Automation", country: "US",
    pe: -1, forwardPe: 42.5, revenueGrowth: 15.2, beta: 1.52,
    employees: "4,200", headquarters: "New York, NY",
    description: "UiPath develops robotic process automation and AI-powered enterprise solutions.",
    weeklyPercent: -4.5, ytdPercent: -18.2, yearPercent: -32.5,
  }),
  s({
    ticker: "RBRK", name: "Rubrik Inc.", price: 42.85, changePercent: 2.82,
    marketCap: "$8.8B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Data Security & Backup", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 35.2, beta: 1.85,
    employees: "3,200", headquarters: "Palo Alto, CA",
    description: "Rubrik provides cloud data management and cyber resilience solutions.",
    weeklyPercent: 5.8, ytdPercent: 28.5, yearPercent: 85.2,
  }),
  s({
    ticker: "U", name: "Unity Software", price: 22.15, changePercent: -1.85,
    marketCap: "$8.6B", sector: "AI / Software", theme: "AI / Software / Cloud",
    industry: "Game Engine & Real-Time 3D", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: -18.2, beta: 1.92,
    employees: "6,800", headquarters: "San Francisco, CA",
    description: "Unity develops a real-time 3D development platform for games and interactive experiences.",
    weeklyPercent: -5.2, ytdPercent: -22.5, yearPercent: -45.8,
  }),

  // ═══════════════════════════════════════════
  // ENERGY / INFRASTRUCTURE / INDUSTRIALS
  // ═══════════════════════════════════════════
  s({
    ticker: "BE", name: "Bloom Energy", price: 15.82, changePercent: 3.42,
    marketCap: "$3.6B", sector: "Energy", theme: "Energy / Infrastructure / Industrials",
    industry: "Fuel Cells", country: "US",
    pe: -1, forwardPe: 85.2, revenueGrowth: 22.5, beta: 2.15,
    employees: "2,800", headquarters: "San Jose, CA",
    description: "Bloom Energy manufactures solid-oxide fuel cells for distributed power generation.",
    weeklyPercent: 8.5, ytdPercent: 32.5, yearPercent: 42.8,
  }),
  s({
    ticker: "VRT", name: "Vertiv Holdings", price: 82.45, changePercent: 2.85,
    marketCap: "$31B", sector: "Industrials", theme: "Energy / Infrastructure / Industrials",
    industry: "Data Center Infrastructure", country: "US",
    pe: 42.5, forwardPe: 28.2, revenueGrowth: 12.8, earningsGrowth: 85.2, beta: 1.65,
    employees: "27,000", headquarters: "Westerville, OH",
    description: "Vertiv provides critical digital infrastructure for data centers.",
    weeklyPercent: 5.8, ytdPercent: 42.5, yearPercent: 185.2,
  }),
  s({
    ticker: "GEV", name: "GE Vernova", price: 185.42, changePercent: 1.52,
    marketCap: "$51B", sector: "Energy", theme: "Energy / Infrastructure / Industrials",
    industry: "Power & Renewables", country: "US",
    pe: 38.5, forwardPe: 25.8, revenueGrowth: 5.2, beta: 1.18,
    employees: "80,000", headquarters: "Cambridge, MA",
    description: "GE Vernova provides power generation, wind energy, and grid solutions.",
    weeklyPercent: 3.2, ytdPercent: 22.8, yearPercent: 82.5,
  }),
  s({
    ticker: "HON", name: "Honeywell International", price: 205.82, changePercent: 0.42,
    marketCap: "$138B", sector: "Industrials", theme: "Energy / Infrastructure / Industrials",
    industry: "Aerospace & Automation", country: "US",
    pe: 22.5, forwardPe: 18.8, ebitMargin: 22.8, netMargin: 15.2, roe: 32.5,
    revenueGrowth: 3.5, dividendYield: 2.05, beta: 0.95,
    employees: "97,000", headquarters: "Charlotte, NC",
    description: "Honeywell produces aerospace systems, building technologies, and industrial automation.",
    weeklyPercent: 0.8, ytdPercent: -2.5, yearPercent: 5.2,
  }),
  s({
    ticker: "NEE", name: "NextEra Energy", price: 72.85, changePercent: 0.68,
    marketCap: "$150B", sector: "Energy", theme: "Energy / Infrastructure / Industrials",
    industry: "Renewable Utilities", country: "US",
    pe: 22.8, forwardPe: 18.5, dividendYield: 2.82, beta: 0.65,
    employees: "16,800", headquarters: "Juno Beach, FL",
    description: "NextEra Energy is the world's largest generator of wind and solar energy.",
    weeklyPercent: 1.2, ytdPercent: 8.5, yearPercent: 15.2,
  }),
  s({
    ticker: "CEG", name: "Constellation Energy", price: 225.82, changePercent: 2.42,
    marketCap: "$72B", sector: "Energy", theme: "Energy / Infrastructure / Industrials",
    industry: "Nuclear & Clean Energy", country: "US",
    pe: 28.5, forwardPe: 22.1, revenueGrowth: 8.5, beta: 1.05,
    employees: "13,100", headquarters: "Baltimore, MD",
    description: "Constellation Energy operates the largest fleet of nuclear power plants in the US.",
    weeklyPercent: 5.2, ytdPercent: 42.8, yearPercent: 125.2,
  }),
  s({
    ticker: "LIN", name: "Linde plc", price: 462.85, changePercent: 0.52,
    marketCap: "$222B", sector: "Industrials", theme: "Energy / Infrastructure / Industrials",
    industry: "Industrial Gases", country: "Ireland",
    pe: 32.5, forwardPe: 28.2, ebitMargin: 25.8, netMargin: 18.5, roe: 18.2,
    dividendYield: 1.22, beta: 0.82,
    employees: "66,000", headquarters: "Woking, UK",
    description: "Linde produces and distributes industrial gases for healthcare, manufacturing, and electronics.",
    weeklyPercent: 0.8, ytdPercent: 5.2, yearPercent: 18.5,
  }),
  s({
    ticker: "BN", name: "Brookfield Corporation", price: 52.42, changePercent: 0.85,
    marketCap: "$82B", sector: "Industrials", theme: "Energy / Infrastructure / Industrials",
    industry: "Asset Management", country: "Canada",
    pe: 42.5, forwardPe: 18.5, dividendYield: 0.62, beta: 1.25,
    employees: "240,000", headquarters: "Toronto, Canada",
    description: "Brookfield manages alternative assets including infrastructure, real estate, and renewable power.",
    weeklyPercent: 1.8, ytdPercent: 12.5, yearPercent: 35.2,
  }),

  // ═══════════════════════════════════════════
  // QUANTUM / ADVANCED COMPUTING / SPACE
  // ═══════════════════════════════════════════
  s({
    ticker: "IONQ", name: "IonQ Inc.", price: 12.85, changePercent: 5.52,
    marketCap: "$2.8B", sector: "Quantum Computing", theme: "Quantum / Advanced Computing / Space",
    industry: "Quantum Computing", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 95.2, beta: 2.85,
    employees: "420", headquarters: "College Park, MD",
    description: "IonQ develops trapped-ion quantum computers for enterprise and research applications.",
    weeklyPercent: 12.5, ytdPercent: 85.2, yearPercent: 225.8,
  }),
  s({
    ticker: "RGTI", name: "Rigetti Computing", price: 2.15, changePercent: 8.25,
    marketCap: "$580M", sector: "Quantum Computing", theme: "Quantum / Advanced Computing / Space",
    industry: "Quantum Computing", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 42.5, beta: 3.25,
    employees: "180", headquarters: "Berkeley, CA",
    description: "Rigetti designs superconducting quantum processors and cloud quantum computing services.",
    weeklyPercent: 18.5, ytdPercent: 125.2, yearPercent: 285.2,
  }),
  s({
    ticker: "QBTS", name: "D-Wave Quantum", price: 3.42, changePercent: 6.85,
    marketCap: "$850M", sector: "Quantum Computing", theme: "Quantum / Advanced Computing / Space",
    industry: "Quantum Annealing", country: "Canada",
    pe: -1, forwardPe: -1, revenueGrowth: 18.5, beta: 3.15,
    employees: "200", headquarters: "Burnaby, Canada",
    description: "D-Wave provides quantum annealing computers for optimization problems.",
    weeklyPercent: 15.2, ytdPercent: 95.8, yearPercent: 342.5,
  }),
  s({
    ticker: "NNE", name: "Nano Nuclear Energy", price: 28.52, changePercent: 4.25,
    marketCap: "$1.2B", sector: "Energy", theme: "Quantum / Advanced Computing / Space",
    industry: "Micro Nuclear Reactors", country: "US",
    pe: -1, forwardPe: -1, beta: 2.85,
    employees: "45", headquarters: "New York, NY",
    description: "Nano Nuclear develops portable micro nuclear reactors for clean energy.",
    weeklyPercent: 12.8, ytdPercent: 82.5, yearPercent: 185.2,
  }),
  s({
    ticker: "PL", name: "Planet Labs", price: 3.85, changePercent: 2.15,
    marketCap: "$1.1B", sector: "Space", theme: "Quantum / Advanced Computing / Space",
    industry: "Earth Observation Satellites", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 12.5, beta: 1.85,
    employees: "950", headquarters: "San Francisco, CA",
    description: "Planet Labs operates the largest constellation of Earth-imaging satellites.",
    weeklyPercent: 5.2, ytdPercent: -8.5, yearPercent: -22.5,
  }),
  s({
    ticker: "RKLB", name: "Rocket Lab USA", price: 18.42, changePercent: 3.82,
    marketCap: "$8.8B", sector: "Space", theme: "Quantum / Advanced Computing / Space",
    industry: "Launch Services", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 55.2, beta: 2.42,
    employees: "2,000", headquarters: "Long Beach, CA",
    description: "Rocket Lab provides launch services and space systems for satellite operators.",
    weeklyPercent: 8.5, ytdPercent: 62.5, yearPercent: 285.2,
  }),

  // ═══════════════════════════════════════════
  // CHINA / ASIA
  // ═══════════════════════════════════════════
  s({
    ticker: "BABA", name: "Alibaba Group", price: 88.42, changePercent: 3.33,
    marketCap: "$218B", sector: "China Tech", theme: "China / Asia",
    industry: "E-Commerce & Cloud", country: "China",
    pe: 12.5, forwardPe: 10.2, evEbitda: 7.8, ps: 1.8, pb: 1.5,
    ebitMargin: 14.2, ebitdaMargin: 22.5, netMargin: 12.8, roe: 12.5, roic: 8.2,
    revenueGrowth: 8.5, earningsGrowth: 22.5, fcfGrowth: 15.2,
    beta: 0.85, employees: "219,200", headquarters: "Hangzhou, China",
    description: "Alibaba is China's largest e-commerce and cloud computing company.",
    revenue: "$126.5B", ebit: "$18.0B", netIncome: "$16.2B", fcf: "$22.5B", eps: 7.08,
    dividendYield: 1.25, weeklyPercent: 5.8, ytdPercent: 28.5, yearPercent: 42.8,
    sparkline: [72, 74, 76, 78, 80, 82, 84, 85, 86, 87, 88, 88.4]
  }),
  s({
    ticker: "JD", name: "JD.com Inc.", price: 35.82, changePercent: 2.85,
    marketCap: "$55B", sector: "China Tech", theme: "China / Asia",
    industry: "E-Commerce & Logistics", country: "China",
    pe: 12.8, forwardPe: 10.5, revenueGrowth: 5.2, beta: 0.92,
    employees: "450,000", headquarters: "Beijing, China",
    description: "JD.com operates China's largest direct-sales e-commerce platform with in-house logistics.",
    weeklyPercent: 4.5, ytdPercent: 22.8, yearPercent: 35.2,
  }),
  s({
    ticker: "BIDU", name: "Baidu Inc.", price: 108.52, changePercent: 1.95,
    marketCap: "$38B", sector: "China Tech", theme: "China / Asia",
    industry: "Search & AI", country: "China",
    pe: 14.2, forwardPe: 11.8, revenueGrowth: 3.8, beta: 0.88,
    employees: "45,800", headquarters: "Beijing, China",
    description: "Baidu operates China's largest search engine and develops AI and autonomous driving tech.",
    weeklyPercent: 3.8, ytdPercent: 18.2, yearPercent: 12.5,
  }),
  s({
    ticker: "PDD", name: "PDD Holdings", price: 132.45, changePercent: 4.15,
    marketCap: "$182B", sector: "China Tech", theme: "China / Asia",
    industry: "E-Commerce", country: "China",
    pe: 10.5, forwardPe: 8.8, revenueGrowth: 45.2, earningsGrowth: 82.5, beta: 1.15,
    employees: "17,400", headquarters: "Dublin, Ireland (ops in China)",
    description: "PDD operates Pinduoduo and Temu e-commerce platforms.",
    weeklyPercent: 8.2, ytdPercent: 35.8, yearPercent: 52.5,
  }),
  s({
    ticker: "TCEHY", name: "Tencent Holdings", price: 45.82, changePercent: 2.05,
    marketCap: "$432B", sector: "China Tech", theme: "China / Asia",
    industry: "Gaming & Social Media", country: "China",
    pe: 18.5, forwardPe: 15.8, evEbitda: 12.5, ps: 5.8, pb: 3.8,
    ebitMargin: 28.5, ebitdaMargin: 35.2, netMargin: 25.8, roe: 18.5, roic: 14.2,
    revenueGrowth: 10.2, earningsGrowth: 28.5, fcfGrowth: 18.2,
    beta: 0.72, employees: "105,400", headquarters: "Shenzhen, China",
    description: "Tencent operates WeChat, online gaming, and fintech services across Asia.",
    revenue: "$82.5B", ebit: "$23.5B", netIncome: "$21.3B", fcf: "$18.5B", eps: 2.48,
    dividendYield: 0.82, weeklyPercent: 3.5, ytdPercent: 22.5, yearPercent: 38.2,
    sparkline: [38, 39, 40, 41, 42, 43, 43.5, 44, 44.5, 45, 45.5, 45.8]
  }),
  s({
    ticker: "BYDDY", name: "BYD Co.", price: 68.52, changePercent: 2.31,
    marketCap: "$98B", sector: "China Tech", theme: "China / Asia",
    industry: "Electric Vehicles", country: "China",
    pe: 22.8, forwardPe: 18.5, revenueGrowth: 42.5, earningsGrowth: 80.2,
    beta: 0.92, employees: "703,900", headquarters: "Shenzhen, China",
    description: "BYD manufactures electric vehicles, batteries, and renewable energy solutions.",
    dividendYield: 0.45, weeklyPercent: 4.8, ytdPercent: 32.5, yearPercent: 72.8,
    sparkline: [52, 54, 56, 58, 60, 62, 63, 64, 65, 66, 67, 68.5]
  }),
  s({
    ticker: "SE", name: "Sea Limited", price: 85.42, changePercent: 2.52,
    marketCap: "$48B", sector: "China Tech", theme: "China / Asia",
    industry: "E-Commerce & Gaming", country: "Singapore",
    pe: 42.5, forwardPe: 22.8, revenueGrowth: 18.5, beta: 1.45,
    employees: "58,000", headquarters: "Singapore",
    description: "Sea Limited operates Shopee (e-commerce), Garena (gaming), and SeaMoney (fintech) across SE Asia.",
    weeklyPercent: 5.2, ytdPercent: 28.5, yearPercent: 52.1,
  }),

  // ═══════════════════════════════════════════
  // HEALTHCARE
  // ═══════════════════════════════════════════
  s({
    ticker: "NVO", name: "Novo Nordisk", price: 128.45, changePercent: -1.40,
    marketCap: "$572B", sector: "Healthcare", theme: "Healthcare",
    industry: "Pharmaceuticals", country: "Denmark",
    pe: 35.2, forwardPe: 28.5, evEbitda: 28.2, ps: 16.2, pb: 32.5,
    ebitMargin: 42.5, ebitdaMargin: 45.8, netMargin: 34.2, roe: 82.5, roic: 58.2,
    revenueGrowth: 31.5, earningsGrowth: 28.2, fcfGrowth: 22.1,
    beta: 0.78, employees: "63,400", headquarters: "Bagsværd, Denmark",
    description: "Novo Nordisk is a global leader in diabetes and obesity treatments.",
    revenue: "$33.7B", ebit: "$14.3B", netIncome: "$11.5B", fcf: "$9.8B", eps: 3.65,
    dividendYield: 1.12, weeklyPercent: -2.8, ytdPercent: -15.2, yearPercent: -8.5,
    sparkline: [145, 142, 140, 138, 135, 133, 132, 130, 129, 128, 129, 128]
  }),
  s({
    ticker: "UNH", name: "UnitedHealth Group", price: 528.92, changePercent: -0.80,
    marketCap: "$488B", sector: "Healthcare", theme: "Healthcare",
    industry: "Health Insurance", country: "US",
    pe: 22.5, forwardPe: 18.2, evEbitda: 14.8, ps: 1.3, pb: 5.8,
    ebitMargin: 8.5, ebitdaMargin: 10.2, netMargin: 5.8, roe: 25.2, roic: 12.5,
    revenueGrowth: 14.5, earningsGrowth: 12.2, fcfGrowth: 8.5,
    beta: 0.62, employees: "400,000", headquarters: "Minnetonka, MN",
    description: "UnitedHealth Group provides health insurance and healthcare services.",
    revenue: "$371.6B", ebit: "$31.6B", netIncome: "$21.5B", fcf: "$22.8B", eps: 23.48,
    dividendYield: 1.38, weeklyPercent: -1.5, ytdPercent: -5.2, yearPercent: 2.8,
    sparkline: [545, 542, 540, 538, 535, 533, 530, 532, 531, 529, 530, 528]
  }),
  s({
    ticker: "LLY", name: "Eli Lilly", price: 782.35, changePercent: 1.62,
    marketCap: "$743B", sector: "Healthcare", theme: "Healthcare",
    industry: "Pharmaceuticals", country: "US",
    pe: 118.5, forwardPe: 52.8, evEbitda: 72.5, ps: 21.8, pb: 58.2,
    revenueGrowth: 20.2, earningsGrowth: 35.8,
    beta: 0.42, employees: "43,000", headquarters: "Indianapolis, IN",
    description: "Eli Lilly develops pharmaceuticals in diabetes, oncology, and neuroscience.",
    revenue: "$34.1B", dividendYield: 0.65,
    weeklyPercent: 3.2, ytdPercent: 18.5, yearPercent: 65.2,
    sparkline: [600, 620, 640, 660, 680, 700, 720, 740, 755, 765, 775, 782]
  }),
  s({
    ticker: "TMDX", name: "TransMedics Group", price: 82.15, changePercent: 3.25,
    marketCap: "$2.8B", sector: "Healthcare", theme: "Healthcare",
    industry: "Medical Devices", country: "US",
    pe: 52.8, forwardPe: 32.5, revenueGrowth: 85.2, earningsGrowth: 225.8, beta: 1.65,
    employees: "1,200", headquarters: "Andover, MA",
    description: "TransMedics develops organ transplant technology including the OCS organ care system.",
    weeklyPercent: 6.8, ytdPercent: 42.5, yearPercent: 125.2,
  }),

  // ═══════════════════════════════════════════
  // CRYPTO / DIGITAL INFRASTRUCTURE
  // ═══════════════════════════════════════════
  s({
    ticker: "MSTR", name: "Strategy (MicroStrategy)", price: 1542.80, changePercent: 3.23,
    marketCap: "$32B", sector: "Crypto Exposure", theme: "Crypto / Digital Infrastructure",
    industry: "Bitcoin Treasury", country: "US",
    pe: -1, forwardPe: -1, beta: 2.85,
    employees: "1,530", headquarters: "Tysons, VA",
    description: "MicroStrategy (Strategy) is a Bitcoin treasury company and enterprise analytics software provider.",
    weeklyPercent: 8.5, ytdPercent: 52.8, yearPercent: 185.2,
    sparkline: [1200, 1250, 1300, 1350, 1400, 1420, 1450, 1480, 1500, 1520, 1535, 1542]
  }),
  s({
    ticker: "IREN", name: "IREN (ex-Iris Energy)", price: 12.85, changePercent: 5.07,
    marketCap: "$3.2B", sector: "Crypto Exposure", theme: "Crypto / Digital Infrastructure",
    industry: "Bitcoin Mining & AI Data Centers", country: "Australia",
    pe: -1, forwardPe: 42.5, revenueGrowth: 85.2, beta: 2.52,
    employees: "350", headquarters: "Sydney, Australia",
    description: "IREN operates Bitcoin mining and AI/HPC data center infrastructure using renewable energy.",
    weeklyPercent: 12.5, ytdPercent: 62.8, yearPercent: 145.2,
    sparkline: [8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.2, 12.5, 12.85]
  }),
  s({
    ticker: "CRWV", name: "CoreWeave", price: 42.85, changePercent: 4.52,
    marketCap: "$24B", sector: "Crypto Exposure", theme: "Crypto / Digital Infrastructure",
    industry: "GPU Cloud & AI Infrastructure", country: "US",
    pe: -1, forwardPe: -1, revenueGrowth: 425.2, beta: 2.85,
    employees: "1,200", headquarters: "Roseland, NJ",
    description: "CoreWeave provides GPU-accelerated cloud computing for AI, ML, and rendering workloads.",
    weeklyPercent: 8.5, ytdPercent: 0, yearPercent: 0,
  }),
  s({
    ticker: "NBIS", name: "Nebius Group", price: 38.52, changePercent: 3.85,
    marketCap: "$8.5B", sector: "Crypto Exposure", theme: "Crypto / Digital Infrastructure",
    industry: "AI Cloud Infrastructure", country: "Netherlands",
    pe: -1, forwardPe: -1, revenueGrowth: 85.2, beta: 2.42,
    employees: "1,800", headquarters: "Amsterdam, Netherlands",
    description: "Nebius Group (ex-Yandex NV) provides AI infrastructure and GPU cloud services in Europe.",
    weeklyPercent: 8.2, ytdPercent: 42.5, yearPercent: 0,
  }),
  s({
    ticker: "OKLO", name: "Oklo Inc.", price: 22.85, changePercent: 5.82,
    marketCap: "$4.2B", sector: "Energy", theme: "Crypto / Digital Infrastructure",
    industry: "Advanced Nuclear", country: "US",
    pe: -1, forwardPe: -1, beta: 3.15,
    employees: "120", headquarters: "Santa Clara, CA",
    description: "Oklo develops compact fast reactor technology for clean energy generation.",
    weeklyPercent: 15.2, ytdPercent: 85.2, yearPercent: 225.8,
  }),

  // ═══════════════════════════════════════════
  // PAYMENTS / CONSUMER
  // ═══════════════════════════════════════════
  s({
    ticker: "V", name: "Visa Inc.", price: 282.45, changePercent: 0.52,
    marketCap: "$582B", sector: "Payments", theme: "Payments / Consumer",
    industry: "Payment Networks", country: "US",
    pe: 32.5, forwardPe: 26.8, ebitMargin: 68.5, netMargin: 52.8, roe: 42.5,
    revenueGrowth: 10.2, earningsGrowth: 15.8, dividendYield: 0.72, beta: 0.92,
    employees: "30,300", headquarters: "San Francisco, CA",
    description: "Visa operates the world's largest electronic payments network.",
    weeklyPercent: 1.2, ytdPercent: 8.5, yearPercent: 18.2,
  }),
  s({
    ticker: "MA", name: "Mastercard Inc.", price: 468.52, changePercent: 0.65,
    marketCap: "$438B", sector: "Payments", theme: "Payments / Consumer",
    industry: "Payment Networks", country: "US",
    pe: 34.8, forwardPe: 28.2, ebitMargin: 58.5, netMargin: 45.2, roe: 185.2,
    revenueGrowth: 12.5, earningsGrowth: 18.2, dividendYield: 0.55, beta: 1.05,
    employees: "33,400", headquarters: "Purchase, NY",
    description: "Mastercard provides global payment technology and processing services.",
    weeklyPercent: 1.5, ytdPercent: 10.2, yearPercent: 22.5,
  }),
  s({
    ticker: "NFLX", name: "Netflix Inc.", price: 628.45, changePercent: 1.25,
    marketCap: "$272B", sector: "Consumer", theme: "Payments / Consumer",
    industry: "Streaming Entertainment", country: "US",
    pe: 42.5, forwardPe: 32.8, revenueGrowth: 15.8, earningsGrowth: 52.8, beta: 1.28,
    employees: "13,000", headquarters: "Los Gatos, CA",
    description: "Netflix is the world's leading streaming entertainment platform.",
    weeklyPercent: 2.8, ytdPercent: 18.5, yearPercent: 82.5,
  }),
  s({
    ticker: "TSLA", name: "Tesla Inc.", price: 175.21, changePercent: -2.14,
    marketCap: "$558B", sector: "EV and Mobility", theme: "Payments / Consumer",
    industry: "Electric Vehicles", country: "US",
    pe: 42.5, forwardPe: 58.2, evEbitda: 32.8, ps: 5.8, pb: 10.2,
    revenueGrowth: 2.5, earningsGrowth: -22.5,
    beta: 2.05, employees: "140,500", headquarters: "Austin, TX",
    description: "Tesla designs, manufactures, and sells electric vehicles and energy products.",
    revenue: "$96.8B", weeklyPercent: -5.2, ytdPercent: -18.5, yearPercent: -12.8,
    sparkline: [195, 192, 188, 185, 182, 180, 178, 176, 174, 175, 176, 175]
  }),
  s({
    ticker: "UBER", name: "Uber Technologies", price: 72.85, changePercent: 1.99,
    marketCap: "$150B", sector: "EV and Mobility", theme: "Payments / Consumer",
    industry: "Ride-Sharing & Delivery", country: "US",
    pe: 72.8, forwardPe: 28.5, revenueGrowth: 15.8, earningsGrowth: 182.5,
    beta: 1.42, employees: "30,800", headquarters: "San Francisco, CA",
    description: "Uber operates a global ride-sharing and food delivery platform.",
    revenue: "$37.3B", weeklyPercent: 3.8, ytdPercent: 22.5, yearPercent: 52.8,
    sparkline: [55, 58, 60, 62, 64, 66, 68, 69, 70, 71, 72, 72.8]
  }),
  s({
    ticker: "PYPL", name: "PayPal Holdings", price: 68.42, changePercent: 1.15,
    marketCap: "$72B", sector: "Payments", theme: "Payments / Consumer",
    industry: "Digital Payments", country: "US",
    pe: 18.2, forwardPe: 14.5, revenueGrowth: 8.5, earningsGrowth: 22.5,
    beta: 1.35, employees: "26,800", headquarters: "San Jose, CA",
    description: "PayPal provides digital payment and commerce solutions globally.",
    dividendYield: 0, weeklyPercent: 2.2, ytdPercent: 5.8, yearPercent: -8.5,
  }),
  // Apple — needed for watchlist even though mainly consumer
  s({
    ticker: "AAPL", name: "Apple Inc.", price: 189.84, changePercent: 1.42,
    marketCap: "$2.94T", sector: "Big Tech", theme: "Payments / Consumer",
    industry: "Consumer Electronics", country: "US",
    pe: 31.2, forwardPe: 28.5, evEbitda: 25.8, ps: 7.8, pb: 48.2,
    ebitMargin: 30.8, ebitdaMargin: 33.5, netMargin: 25.3, roe: 160.2, roic: 52.8,
    revenueGrowth: 8.1, earningsGrowth: 11.2,
    beta: 1.28, employees: "161,000", headquarters: "Cupertino, CA",
    description: "Apple designs, manufactures, and markets consumer electronics and software globally.",
    revenue: "$383.3B", eps: 6.42, dividendYield: 0.52,
    weeklyPercent: 2.5, ytdPercent: 12.8, yearPercent: 28.5,
    sparkline: [172, 175, 178, 180, 177, 182, 185, 183, 186, 188, 187, 189]
  }),

  // ═══════════════════════════════════════════
  // NORDICS / FINLAND
  // ═══════════════════════════════════════════
  s({
    ticker: "DETEC.HE", name: "Detection Technology", price: 18.42, changePercent: 1.77,
    marketCap: "$280M", sector: "Semiconductors", theme: "Nordics / Finland",
    industry: "X-ray Detectors", country: "Finland",
    pe: 32.5, forwardPe: 22.8, ebitMargin: 12.5, netMargin: 8.5, roe: 10.2,
    revenueGrowth: 15.2, earningsGrowth: 28.5,
    beta: 0.95, employees: "550", headquarters: "Oulu, Finland",
    description: "Detection Technology develops X-ray detector solutions for medical and security imaging.",
    revenue: "$98M", dividendYield: 1.85,
    weeklyPercent: 3.2, ytdPercent: 18.5, yearPercent: 32.8,
    sparkline: [15, 15.5, 16, 16.5, 17, 17.2, 17.5, 17.8, 18, 18.1, 18.3, 18.4]
  }),
  s({
    ticker: "CANATU.HE", name: "Canatu Oy", price: 2.85, changePercent: 2.89,
    marketCap: "$45M", sector: "Semiconductors", theme: "Nordics / Finland",
    industry: "Carbon Nanomaterials", country: "Finland",
    pe: -1, forwardPe: -1, revenueGrowth: 45.2, beta: 1.85,
    employees: "85", headquarters: "Helsinki, Finland",
    description: "Canatu develops carbon nanotube films for touch sensors and semiconductor applications.",
    weeklyPercent: 5.8, ytdPercent: 22.5, yearPercent: 45.2,
    sparkline: [2.2, 2.3, 2.4, 2.5, 2.5, 2.6, 2.7, 2.7, 2.8, 2.8, 2.85, 2.85]
  }),
  s({
    ticker: "QTCOM.HE", name: "Qt Group", price: 68.20, changePercent: 2.79,
    marketCap: "$1.7B", sector: "AI / Software", theme: "Nordics / Finland",
    industry: "Development Tools", country: "Finland",
    pe: 52.5, forwardPe: 38.2, ebitMargin: 18.5, netMargin: 14.2, roe: 15.8,
    revenueGrowth: 12.8, earningsGrowth: 22.5,
    beta: 1.15, employees: "780", headquarters: "Espoo, Finland",
    description: "Qt Group provides cross-platform software development tools.",
    revenue: "$178M", weeklyPercent: 5.2, ytdPercent: 28.5, yearPercent: 52.8,
    sparkline: [55, 57, 58, 60, 62, 63, 64, 65, 66, 67, 68, 68.2]
  }),
  s({
    ticker: "REG1V.HE", name: "Revenio Group", price: 28.45, changePercent: -1.45,
    marketCap: "$765M", sector: "Healthcare", theme: "Nordics / Finland",
    industry: "Medical Devices", country: "Finland",
    pe: 38.2, forwardPe: 28.5, ebitMargin: 28.5, netMargin: 22.1, roe: 32.5,
    revenueGrowth: 8.5, dividendYield: 1.42, beta: 0.72,
    employees: "350", headquarters: "Vantaa, Finland",
    description: "Revenio develops ophthalmic screening devices including the iCare tonometer.",
    weeklyPercent: -2.5, ytdPercent: -8.2, yearPercent: 5.8,
    sparkline: [30, 29.8, 29.5, 29.2, 29, 28.8, 28.5, 28.6, 28.5, 28.4, 28.5, 28.4]
  }),
  s({
    ticker: "TNOM.HE", name: "Talenom Oyj", price: 6.82, changePercent: 1.79,
    marketCap: "$310M", sector: "AI / Software", theme: "Nordics / Finland",
    industry: "Accounting & Fintech", country: "Finland",
    pe: 22.5, forwardPe: 18.2, revenueGrowth: 18.5, dividendYield: 2.85, beta: 0.82,
    employees: "1,200", headquarters: "Helsinki, Finland",
    description: "Talenom provides automated accounting and financial management services.",
    weeklyPercent: 3.2, ytdPercent: 12.5, yearPercent: 22.8,
    sparkline: [5.8, 5.9, 6.0, 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.75, 6.82]
  }),
  s({
    ticker: "INDERES.HE", name: "Inderes Oyj", price: 12.85, changePercent: 0.78,
    marketCap: "$95M", sector: "AI / Software", theme: "Nordics / Finland",
    industry: "Investment Research", country: "Finland",
    pe: 28.5, forwardPe: 22.1, revenueGrowth: 22.5, beta: 0.65,
    employees: "120", headquarters: "Helsinki, Finland",
    description: "Inderes provides equity research, IR services, and investment tools for Nordic investors.",
    weeklyPercent: 1.5, ytdPercent: 8.5, yearPercent: 18.2,
  }),
  s({
    ticker: "CAPMAN.HE", name: "CapMan Oyj", price: 2.95, changePercent: 1.38,
    marketCap: "$480M", sector: "Industrials", theme: "Nordics / Finland",
    industry: "Private Equity & Asset Management", country: "Finland",
    pe: 12.8, forwardPe: 10.5, dividendYield: 5.42, beta: 0.92,
    employees: "180", headquarters: "Helsinki, Finland",
    description: "CapMan is a Nordic private equity and real estate investment manager.",
    weeklyPercent: 2.5, ytdPercent: 5.8, yearPercent: 12.5,
  }),
  s({
    ticker: "NOHO.HE", name: "NoHo Partners", price: 8.52, changePercent: -0.82,
    marketCap: "$165M", sector: "Consumer", theme: "Nordics / Finland",
    industry: "Restaurant & Hospitality", country: "Finland",
    pe: 18.5, forwardPe: 12.8, revenueGrowth: 8.5, dividendYield: 2.25, beta: 1.15,
    employees: "2,800", headquarters: "Tampere, Finland",
    description: "NoHo Partners operates restaurants and entertainment venues across the Nordics.",
    weeklyPercent: -1.5, ytdPercent: -12.5, yearPercent: -22.8,
  }),
  s({
    ticker: "REMEDY.HE", name: "Remedy Entertainment", price: 18.25, changePercent: -2.42,
    marketCap: "$250M", sector: "Consumer", theme: "Nordics / Finland",
    industry: "Video Game Development", country: "Finland",
    pe: -1, forwardPe: 85.2, revenueGrowth: -15.2, beta: 1.42,
    employees: "380", headquarters: "Espoo, Finland",
    description: "Remedy Entertainment develops premium action games including Alan Wake and Control.",
    weeklyPercent: -5.8, ytdPercent: -18.5, yearPercent: -32.5,
  }),
  s({
    ticker: "KESKO.HE", name: "Kesko Oyj", price: 22.85, changePercent: 0.35,
    marketCap: "$8.5B", sector: "Consumer", theme: "Nordics / Finland",
    industry: "Retail & Grocery", country: "Finland",
    pe: 18.2, forwardPe: 16.5, dividendYield: 4.25, beta: 0.55,
    employees: "39,000", headquarters: "Helsinki, Finland",
    description: "Kesko operates K-Group grocery, building, and car trade stores in Finland and Scandinavia.",
    weeklyPercent: 0.5, ytdPercent: 2.8, yearPercent: 8.5,
  }),
  s({
    ticker: "VALMT.HE", name: "Valmet Oyj", price: 28.42, changePercent: 0.85,
    marketCap: "$4.2B", sector: "Industrials", theme: "Nordics / Finland",
    industry: "Process Technology", country: "Finland",
    pe: 15.8, forwardPe: 14.2, dividendYield: 3.82, beta: 0.82,
    employees: "19,000", headquarters: "Espoo, Finland",
    description: "Valmet develops process technologies and automation for pulp, paper, and energy industries.",
    weeklyPercent: 1.8, ytdPercent: 5.2, yearPercent: 12.8,
  }),
  s({
    ticker: "TIETO.HE", name: "TietoEVRY Oyj", price: 18.85, changePercent: -0.52,
    marketCap: "$2.2B", sector: "AI / Software", theme: "Nordics / Finland",
    industry: "IT Services", country: "Finland",
    pe: 14.5, forwardPe: 12.8, dividendYield: 5.85, beta: 0.72,
    employees: "24,000", headquarters: "Espoo, Finland",
    description: "TietoEVRY provides IT services, consulting, and digital solutions in the Nordics.",
    weeklyPercent: -0.8, ytdPercent: -5.2, yearPercent: -12.5,
  }),
  s({
    ticker: "SAMPO.HE", name: "Sampo Oyj", price: 42.15, changePercent: 0.42,
    marketCap: "$23B", sector: "Payments", theme: "Nordics / Finland",
    industry: "Insurance & Financial", country: "Finland",
    pe: 12.5, forwardPe: 11.2, dividendYield: 6.85, beta: 0.65,
    employees: "12,000", headquarters: "Helsinki, Finland",
    description: "Sampo is a Nordic insurance group with holdings in If P&C Insurance and Topdanmark.",
    weeklyPercent: 0.8, ytdPercent: 5.2, yearPercent: 15.8,
  }),
  s({
    ticker: "OMASP.HE", name: "Oma Säästöpankki", price: 14.82, changePercent: 0.68,
    marketCap: "$445M", sector: "Payments", theme: "Nordics / Finland",
    industry: "Banking", country: "Finland",
    pe: 8.5, forwardPe: 7.8, dividendYield: 8.52, beta: 0.45,
    employees: "420", headquarters: "Seinäjoki, Finland",
    description: "Oma Säästöpankki is a Finnish savings bank offering retail banking and mortgage services.",
    weeklyPercent: 1.2, ytdPercent: 8.5, yearPercent: 22.5,
  }),
  s({
    ticker: "AIFORIA.HE", name: "Aiforia Technologies", price: 1.42, changePercent: -5.33,
    marketCap: "$28M", sector: "Healthcare", theme: "Nordics / Finland",
    industry: "AI Pathology", country: "Finland",
    pe: -1, forwardPe: -1, revenueGrowth: 32.5, beta: 1.95,
    employees: "65", headquarters: "Helsinki, Finland",
    description: "Aiforia develops AI-powered pathology platforms for clinical diagnostics.",
    weeklyPercent: -8.5, ytdPercent: -32.5, yearPercent: -55.2,
    sparkline: [2.2, 2.1, 2.0, 1.9, 1.8, 1.7, 1.6, 1.55, 1.5, 1.48, 1.45, 1.42]
  }),
  s({
    ticker: "KAMUX.HE", name: "Kamux Oyj", price: 4.85, changePercent: -1.22,
    marketCap: "$215M", sector: "Consumer", theme: "Nordics / Finland",
    industry: "Used Car Retail", country: "Finland",
    pe: 22.5, forwardPe: 14.8, revenueGrowth: 5.2, dividendYield: 3.85, beta: 0.85,
    employees: "900", headquarters: "Hämeenlinna, Finland",
    description: "Kamux is a used car dealer operating across Finland, Sweden, and Germany.",
    weeklyPercent: -2.5, ytdPercent: -8.5, yearPercent: -18.2,
  }),
  s({
    ticker: "EASOR.HE", name: "Easor Oy", price: 0.85, changePercent: 2.41,
    marketCap: "$12M", sector: "Energy", theme: "Nordics / Finland",
    industry: "Geothermal Energy Tech", country: "Finland",
    pe: -1, forwardPe: -1, beta: 2.15,
    employees: "25", headquarters: "Espoo, Finland",
    description: "Easor develops deep geothermal heating technology for sustainable district heating.",
    weeklyPercent: 5.2, ytdPercent: 15.8, yearPercent: 28.5,
    sparkline: [0.72, 0.74, 0.76, 0.78, 0.80, 0.81, 0.82, 0.83, 0.84, 0.84, 0.85, 0.85]
  }),

  // ═══════════════════════════════════════════
  // MATERIALS / RESOURCES
  // ═══════════════════════════════════════════
  s({
    ticker: "OCO.V", name: "Oroco Resource Corp.", price: 0.42, changePercent: 5.00,
    marketCap: "$85M", sector: "Materials", theme: "Materials / Resources",
    industry: "Copper Exploration", country: "Canada",
    pe: -1, forwardPe: -1, beta: 1.85,
    employees: "15", headquarters: "Vancouver, Canada",
    description: "Oroco Resource is exploring the Santo Tomas copper-gold porphyry deposit in Mexico.",
    weeklyPercent: 8.5, ytdPercent: 25.2, yearPercent: 42.5,
  }),
  s({
    ticker: "GLO.TO", name: "Global Atomic Corp.", price: 2.15, changePercent: 3.62,
    marketCap: "$520M", sector: "Materials", theme: "Materials / Resources",
    industry: "Uranium Mining", country: "Canada",
    pe: -1, forwardPe: -1, beta: 2.25,
    employees: "120", headquarters: "Toronto, Canada",
    description: "Global Atomic is developing the DASA uranium mine in Niger, one of the world's highest-grade deposits.",
    weeklyPercent: 6.8, ytdPercent: 32.5, yearPercent: 85.2,
  }),
];

// ETFs
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
  assetType: "Stock" | "ETF" | "Crypto Exposure" | "Cash";
}


export const portfolioHoldings: PortfolioHolding[] = [
  { ticker: "CSPX", name: "iShares Core S&P 500 UCITS ETF", shares: 12, avgCost: 520.0, weight: 10.1, sector: "ETF", country: "US", assetType: "ETF" },
  { ticker: "TSM", name: "Taiwan Semiconductor ADR", shares: 20, avgCost: 98.50, weight: 9.4, sector: "Semiconductors", country: "Taiwan", assetType: "Stock" },
  { ticker: "ASML", name: "ASML Holding", shares: 8, avgCost: 680.0, weight: 9.3, sector: "Semiconductors", country: "Netherlands", assetType: "Stock" },
  { ticker: "MSTR", name: "Strategy / MicroStrategy", shares: 3, avgCost: 1200.0, weight: 7.8, sector: "Crypto Exposure", country: "US", assetType: "Crypto Exposure" },
  { ticker: "AMZN", name: "Amazon", shares: 22, avgCost: 145.0, weight: 7.4, sector: "Big Tech", country: "US", assetType: "Stock" },
  { ticker: "NVO", name: "Novo Nordisk", shares: 35, avgCost: 110.0, weight: 7.3, sector: "Healthcare", country: "Denmark", assetType: "Stock" },
  { ticker: "ADBE", name: "Adobe", shares: 6, avgCost: 420.0, weight: 6.2, sector: "Big Tech", country: "US", assetType: "Stock" },
  { ticker: "BABA", name: "Alibaba ADR", shares: 30, avgCost: 72.0, weight: 6.2, sector: "China Tech", country: "China", assetType: "Stock" },
  { ticker: "AVGO", name: "Broadcom", shares: 2, avgCost: 1400.0, weight: 4.5, sector: "Semiconductors", country: "US", assetType: "Stock" },
  { ticker: "CANATU.HE", name: "Canatu Oyj", shares: 800, avgCost: 2.20, weight: 3.1, sector: "Semiconductors", country: "Finland", assetType: "Stock" },
  { ticker: "DETEC.HE", name: "Detection Technology", shares: 120, avgCost: 14.50, weight: 3.1, sector: "Semiconductors", country: "Finland", assetType: "Stock" },
  { ticker: "NVDA", name: "NVIDIA", shares: 1, avgCost: 150.0, weight: 3.1, sector: "Semiconductors", country: "US", assetType: "Stock" },
  { ticker: "UNH", name: "UnitedHealth Group", shares: 4, avgCost: 480.0, weight: 3.0, sector: "Healthcare", country: "US", assetType: "Stock" },
  { ticker: "CASH", name: "Cash / Saldo", shares: 1, avgCost: 1.0, weight: 3.0, sector: "Cash", country: "-", assetType: "Cash" as any },
  { ticker: "QTCOM.HE", name: "Qt Group", shares: 30, avgCost: 52.0, weight: 2.7, sector: "AI / Software", country: "Finland", assetType: "Stock" },
  { ticker: "UBER", name: "Uber", shares: 25, avgCost: 48.0, weight: 2.6, sector: "EV and Mobility", country: "US", assetType: "Stock" },
  { ticker: "REG1V.HE", name: "Revenio Group", shares: 45, avgCost: 25.0, weight: 2.5, sector: "Healthcare", country: "Finland", assetType: "Stock" },
  { ticker: "QTUM", name: "iShares Quantum Computing ETF", shares: 40, avgCost: 32.0, weight: 2.5, sector: "ETF", country: "US", assetType: "ETF" },
  { ticker: "IREN", name: "IREN", shares: 80, avgCost: 8.50, weight: 2.1, sector: "Crypto Exposure", country: "Australia", assetType: "Stock" },
  { ticker: "TNOM.HE", name: "Talenom", shares: 150, avgCost: 5.50, weight: 2.0, sector: "AI / Software", country: "Finland", assetType: "Stock" },
  { ticker: "AIFORIA.HE", name: "Aiforia Technologies", shares: 400, avgCost: 1.80, weight: 1.3, sector: "Healthcare", country: "Finland", assetType: "Stock" },
  { ticker: "EASOR.HE", name: "Easor", shares: 500, avgCost: 0.65, weight: 1.0, sector: "Energy", country: "Finland", assetType: "Stock" },
];

// All unique themes for filtering
export const themeCategories: Record<string, string[]> = {};
allStocks.forEach(stock => {
  if (!themeCategories[stock.theme]) themeCategories[stock.theme] = [];
  if (!themeCategories[stock.theme].includes(stock.ticker)) {
    themeCategories[stock.theme].push(stock.ticker);
  }
});

export const sectorCategories: Record<string, string[]> = {};
allStocks.forEach(stock => {
  if (!sectorCategories[stock.sector]) sectorCategories[stock.sector] = [];
  if (!sectorCategories[stock.sector].includes(stock.ticker)) {
    sectorCategories[stock.sector].push(stock.ticker);
  }
});

// Geographies
export const geographyCategories: Record<string, string[]> = {};
allStocks.forEach(stock => {
  if (!geographyCategories[stock.country]) geographyCategories[stock.country] = [];
  if (!geographyCategories[stock.country].includes(stock.ticker)) {
    geographyCategories[stock.country].push(stock.ticker);
  }
});

// Portfolio tickers for "My Core Holdings"
export const coreHoldingTickers = portfolioHoldings.map(h => h.ticker);

export function getStockByTicker(ticker: string): StockData | undefined {
  return allStocks.find(s => s.ticker === ticker);
}

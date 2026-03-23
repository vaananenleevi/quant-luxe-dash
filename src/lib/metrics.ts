// Metric definitions with tooltips for financial literacy

export interface MetricInfo {
  key: string;
  label: string;
  shortLabel?: string;
  tooltip: string;
  format: "pct" | "num" | "str" | "ratio" | "currency";
  group: string;
  higherBetter: boolean;
}

export const metricDefinitions: MetricInfo[] = [
  // Profitability
  { key: "ebitMargin", label: "EBIT Margin (TTM)", shortLabel: "EBIT Margin", tooltip: "Earnings Before Interest & Taxes as % of revenue. Measures operating profitability excluding financing effects. Higher = more profitable core business.", format: "pct", group: "Profitability", higherBetter: true },
  { key: "ebitdaMargin", label: "EBITDA Margin (TTM)", shortLabel: "EBITDA Margin", tooltip: "Earnings Before Interest, Taxes, Depreciation & Amortization as % of revenue. A proxy for cash operating profitability.", format: "pct", group: "Profitability", higherBetter: true },
  { key: "netMargin", label: "Net Margin (TTM)", shortLabel: "Net Margin", tooltip: "Net Income ÷ Revenue. The percentage of revenue that becomes profit after all expenses. Higher = more profitable.", format: "pct", group: "Profitability", higherBetter: true },
  { key: "roe", label: "Return on Equity (TTM)", shortLabel: "ROE", tooltip: "Net Income ÷ Shareholders' Equity. Measures how efficiently a company uses equity to generate profit. >15% generally considered good.", format: "pct", group: "Profitability", higherBetter: true },
  { key: "roic", label: "Return on Invested Capital (TTM)", shortLabel: "ROIC", tooltip: "NOPAT ÷ Invested Capital. The most important profitability metric — measures return on ALL capital (debt + equity). >15% = excellent.", format: "pct", group: "Profitability", higherBetter: true },

  // Growth
  { key: "revenueGrowth", label: "Revenue Growth (YoY TTM)", shortLabel: "Rev. Growth", tooltip: "Year-over-year revenue growth using trailing 12 months. Shows how fast the business top line is growing.", format: "pct", group: "Growth", higherBetter: true },
  { key: "earningsGrowth", label: "Earnings Growth (YoY TTM)", shortLabel: "Earn. Growth", tooltip: "Year-over-year earnings growth using trailing 12 months. Shows bottom-line improvement.", format: "pct", group: "Growth", higherBetter: true },
  { key: "fcfGrowth", label: "FCF Growth (YoY TTM)", shortLabel: "FCF Growth", tooltip: "Year-over-year free cash flow growth. FCF = Operating Cash Flow − CapEx. Growing FCF signals improving cash generation.", format: "pct", group: "Growth", higherBetter: true },

  // Valuation
  { key: "pe", label: "P/E Ratio (TTM)", shortLabel: "P/E", tooltip: "Price ÷ Trailing 12-Month Earnings Per Share. How much investors pay per $1 of earnings. Lower may indicate undervaluation, but context matters.", format: "num", group: "Valuation", higherBetter: false },
  { key: "forwardPe", label: "Forward P/E (NTM Est.)", shortLabel: "Fwd P/E", tooltip: "Price ÷ Next 12-Month Estimated EPS. Based on analyst consensus estimates. Lower than TTM P/E suggests expected earnings growth.", format: "num", group: "Valuation", higherBetter: false },
  { key: "evEbitda", label: "EV/EBITDA (TTM)", shortLabel: "EV/EBITDA", tooltip: "Enterprise Value ÷ EBITDA. A debt-neutral valuation metric. Generally <10 = cheap, 10-15 = fair, >20 = expensive.", format: "num", group: "Valuation", higherBetter: false },
  { key: "ps", label: "Price/Sales (TTM)", shortLabel: "P/S", tooltip: "Market Cap ÷ Revenue. Useful for unprofitable companies. Lower = potentially cheaper relative to revenue.", format: "num", group: "Valuation", higherBetter: false },
  { key: "pb", label: "Price/Book", shortLabel: "P/B", tooltip: "Market Cap ÷ Book Value. Compares market price to accounting value. <1 may signal undervaluation (or distress).", format: "num", group: "Valuation", higherBetter: false },

  // Financial Strength
  { key: "debtEquity", label: "Debt/Equity", tooltip: "Total Debt ÷ Shareholders' Equity. Measures financial leverage. Lower = less risky balance sheet. >2 is generally high.", format: "ratio", group: "Financial Strength", higherBetter: false },
  { key: "netDebtEbitda", label: "Net Debt/EBITDA", tooltip: "Net Debt ÷ EBITDA. Measures years to pay off debt. <1 = very strong, 1-3 = healthy, >4 = overleveraged.", format: "ratio", group: "Financial Strength", higherBetter: false },
  { key: "currentRatio", label: "Current Ratio", tooltip: "Current Assets ÷ Current Liabilities. Measures short-term solvency. >1.5 = healthy, <1 = potential liquidity risk.", format: "ratio", group: "Financial Strength", higherBetter: true },

  // Efficiency
  { key: "assetTurnover", label: "Asset Turnover", tooltip: "Revenue ÷ Total Assets. Measures how efficiently assets generate revenue. Higher = more efficient.", format: "ratio", group: "Efficiency", higherBetter: true },
  { key: "operatingMargin", label: "Operating Margin (TTM)", shortLabel: "Op. Margin", tooltip: "Operating Income ÷ Revenue. Profitability from core operations before interest and taxes.", format: "pct", group: "Efficiency", higherBetter: true },

  // Shareholder Returns
  { key: "dividendYield", label: "Dividend Yield (TTM)", shortLabel: "Div. Yield", tooltip: "Annual Dividends Per Share ÷ Price. The cash return from dividends alone. >3% generally considered attractive for income.", format: "pct", group: "Shareholder Returns", higherBetter: true },
  { key: "buybackYield", label: "Buyback Yield", tooltip: "Value of shares repurchased over the past year as % of market cap. Represents indirect return to shareholders.", format: "pct", group: "Shareholder Returns", higherBetter: true },

  // Market
  { key: "marketCap", label: "Market Capitalization", shortLabel: "Market Cap", tooltip: "Share Price × Shares Outstanding. The total market value of the company.", format: "str", group: "Market", higherBetter: true },
  { key: "enterpriseValue", label: "Enterprise Value", shortLabel: "EV", tooltip: "Market Cap + Debt − Cash. The theoretical takeover price of the company. Used in EV-based valuation ratios.", format: "str", group: "Market", higherBetter: true },
  { key: "beta", label: "Beta (5Y Monthly)", shortLabel: "Beta", tooltip: "Measures stock volatility relative to the market. Beta > 1 = more volatile than market. Beta < 1 = less volatile.", format: "ratio", group: "Market", higherBetter: false },
];

export function getMetricInfo(key: string): MetricInfo | undefined {
  return metricDefinitions.find(m => m.key === key);
}

// ── Investment Insight Engine (rule-based) ──

export interface StockScore {
  growth: number;       // 0-100
  profitability: number;
  valuation: number;
  overall: number;
  conclusion: string;
  strengths: string[];
  risks: string[];
}

export function computeStockScore(stock: {
  roe: number; roic: number; netMargin: number; ebitMargin: number;
  revenueGrowth: number; earningsGrowth: number; fcfGrowth: number;
  pe: number; forwardPe: number; evEbitda: number; ps: number;
  debtEquity: number; currentRatio: number;
}): StockScore {
  const strengths: string[] = [];
  const risks: string[] = [];

  // ── Growth Score ──
  let growth = 50;
  if (stock.revenueGrowth > 25) { growth += 25; strengths.push("Strong revenue growth (>25% YoY)"); }
  else if (stock.revenueGrowth > 10) growth += 10;
  else if (stock.revenueGrowth < 0) { growth -= 20; risks.push("Declining revenue"); }
  if (stock.earningsGrowth > 30) growth += 15;
  else if (stock.earningsGrowth < 0) growth -= 15;
  if (stock.fcfGrowth > 20) growth += 10;
  growth = Math.max(0, Math.min(100, growth));

  // ── Profitability Score ──
  let profitability = 50;
  if (stock.roic > 20) { profitability += 25; strengths.push("Excellent ROIC (>20%)"); }
  else if (stock.roic > 12) profitability += 10;
  else if (stock.roic > 0 && stock.roic < 6) { profitability -= 15; risks.push("Low ROIC (<6%)"); }
  if (stock.roe > 25) profitability += 15;
  else if (stock.roe < 5 && stock.roe > 0) profitability -= 10;
  if (stock.netMargin > 20) { profitability += 10; strengths.push("High net margin (>20%)"); }
  else if (stock.netMargin < 5 && stock.netMargin > 0) risks.push("Thin margins (<5%)");
  profitability = Math.max(0, Math.min(100, profitability));

  // ── Valuation Score (inverted — lower valuations = higher score) ──
  let valuation = 50;
  const pe = stock.pe > 0 ? stock.pe : 999;
  const fpe = stock.forwardPe > 0 ? stock.forwardPe : 999;
  if (pe < 15) { valuation += 25; strengths.push("Attractive P/E (<15x)"); }
  else if (pe < 25) valuation += 10;
  else if (pe > 50) { valuation -= 20; risks.push("High P/E (>50x) — expensive"); }
  else if (pe > 35) { valuation -= 10; risks.push("Elevated P/E (>35x)"); }
  if (fpe < pe * 0.7) strengths.push("Expected earnings acceleration (Fwd P/E << TTM P/E)");
  if (stock.evEbitda > 0 && stock.evEbitda < 12) valuation += 10;
  else if (stock.evEbitda > 25) valuation -= 10;
  if (stock.debtEquity > 2) { risks.push("High leverage (D/E > 2x)"); valuation -= 5; }
  if (stock.currentRatio < 1) risks.push("Low liquidity (Current Ratio < 1)");
  if (stock.currentRatio > 2) strengths.push("Strong liquidity position");
  valuation = Math.max(0, Math.min(100, valuation));

  const overall = Math.round((growth * 0.35) + (profitability * 0.35) + (valuation * 0.30));

  // ── Conclusion ──
  let conclusion: string;
  if (overall >= 75 && valuation >= 50) conclusion = "High quality at a reasonable price — strong candidate";
  else if (overall >= 75 && valuation < 40) conclusion = "High quality but expensive — wait for better entry";
  else if (overall >= 60 && valuation >= 60) conclusion = "Solid quality and attractively valued";
  else if (overall >= 60) conclusion = "Good fundamentals, fair valuation";
  else if (valuation >= 70 && profitability < 40) conclusion = "Cheap but weak profitability — value trap risk";
  else if (growth >= 70 && profitability < 40) conclusion = "High growth but unproven profitability";
  else if (overall < 40) conclusion = "Weak fundamentals — higher risk";
  else conclusion = "Mixed signals — requires deeper analysis";

  return { growth, profitability, valuation, overall, conclusion, strengths, risks };
}

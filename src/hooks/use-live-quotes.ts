import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface LiveQuote {
  price: number;
  change: number;
  changePercent: number;
  previousClose: number;
  high: number;
  low: number;
  open: number;
  timestamp: number;
}

export interface LiveQuotesResult {
  quotes: Record<string, LiveQuote>;
  fetchedAt: string;
}

async function fetchLiveQuotes(tickers: string[]): Promise<LiveQuotesResult> {
  const { data, error } = await supabase.functions.invoke("stock-quotes", {
    body: { tickers },
  });

  if (error) throw new Error(error.message);
  return data as LiveQuotesResult;
}

export function useLiveQuotes(tickers: string[], enabled = true) {
  return useQuery({
    queryKey: ["live-quotes", ...tickers.slice(0, 30)],
    queryFn: () => fetchLiveQuotes(tickers.slice(0, 30)),
    enabled: enabled && tickers.length > 0,
    refetchInterval: 30_000, // refresh every 30s
    staleTime: 15_000,
    retry: 2,
  });
}

export function useLiveQuote(ticker: string, enabled = true) {
  const result = useLiveQuotes([ticker], enabled);
  return {
    ...result,
    quote: result.data?.quotes?.[ticker] as LiveQuote | undefined,
    fetchedAt: result.data?.fetchedAt,
  };
}

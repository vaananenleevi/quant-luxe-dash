import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const cache = new Map<string, { data: any; ts: number }>();
const CACHE_TTL = 15_000;

async function fetchQuote(ticker: string, apiKey: string): Promise<any> {
  const cached = cache.get(ticker);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return cached.data;
  }

  // Finnhub uses the symbol as-is (including BINANCE:BTCUSDT, OANDA:XAU_USD etc.)
  const url = `https://finnhub.io/api/v1/quote?symbol=${encodeURIComponent(ticker)}&token=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Finnhub API error [${res.status}]: ${text}`);
  }
  const data = await res.json();
  cache.set(ticker, { data, ts: Date.now() });
  return data;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const apiKey = Deno.env.get('FINNHUB_API_KEY');
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'FINNHUB_API_KEY not configured' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const { tickers } = await req.json();
    if (!Array.isArray(tickers) || tickers.length === 0) {
      return new Response(JSON.stringify({ error: 'tickers array required' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const batch = tickers.slice(0, 30);
    const results: Record<string, any> = {};
    const CHUNK_SIZE = 5; // smaller chunks to avoid 429s on free tier

    for (let i = 0; i < batch.length; i += CHUNK_SIZE) {
      const chunk = batch.slice(i, i + CHUNK_SIZE);
      const promises = chunk.map(async (ticker: string) => {
        try {
          const quote = await fetchQuote(ticker, apiKey);
          // Finnhub quote: c=current, d=change, dp=change%, pc=prev close, h=high, l=low, o=open
          results[ticker] = {
            price: quote.c,
            change: quote.d,
            changePercent: quote.dp,
            previousClose: quote.pc,
            high: quote.h,
            low: quote.l,
            open: quote.o,
            timestamp: quote.t,
          };
        } catch (e) {
          results[ticker] = { error: e.message };
        }
      });
      await Promise.all(promises);

      // Delay between chunks to respect rate limits
      if (i + CHUNK_SIZE < batch.length) {
        await new Promise(r => setTimeout(r, 300));
      }
    }

    return new Response(JSON.stringify({ quotes: results, fetchedAt: new Date().toISOString() }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

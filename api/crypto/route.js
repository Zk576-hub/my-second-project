import { fetchCoinGeckoMarket } from "@/lib/dataSources";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ids = (searchParams.get("ids") || "bitcoin").split(",");

  const result = await fetchCoinGeckoMarket(ids);
  return Response.json(result, { status: result.ok ? 200 : 502 });
}

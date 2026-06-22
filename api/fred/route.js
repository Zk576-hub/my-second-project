import { fetchFredSeries } from "@/lib/dataSources";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const series = searchParams.get("series");

  if (!series) {
    return Response.json({ ok: false, reason: "Missing ?series= param" }, { status: 400 });
  }

  const result = await fetchFredSeries(series);
  return Response.json(result, { status: result.ok ? 200 : 502 });
}

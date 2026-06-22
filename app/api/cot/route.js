import { fetchCotReport } from "@/lib/dataSources";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return Response.json(
      { ok: false, reason: "Missing ?code= param (CFTC contract market code)" },
      { status: 400 }
    );
  }

  const result = await fetchCotReport(code);
  return Response.json(result, { status: result.ok ? 200 : 502 });
}

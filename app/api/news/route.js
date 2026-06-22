import { fetchNewsHeadlines } from "@/lib/dataSources";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q) {
    return Response.json({ ok: false, reason: "Missing ?q= param" }, { status: 400 });
  }

  const result = await fetchNewsHeadlines(q);
  return Response.json(result, { status: result.ok ? 200 : 502 });
}

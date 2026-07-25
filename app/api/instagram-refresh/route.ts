import { refreshInstagramToken } from "@/lib/instagram";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newToken = await refreshInstagramToken();
    return NextResponse.json({
      success: true,
      tokenPreview: `${newToken.slice(0, 8)}...${newToken.slice(-8)}`,
    });
  } catch (error) {
    console.error("[instagram-refresh]", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}

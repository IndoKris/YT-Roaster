import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req: req as any, secret: process.env.NEXTAUTH_SECRET });

    if (!token || !(token as any).accessToken) {
      return NextResponse.json({ error: "Unauthorized or missing access token" }, { status: 401 });
    }

    const accessToken = (token as any).accessToken;

    // Fetch user's YouTube subscriptions and liked videos via YouTube Data API v3
    const res = await fetch("https://www.googleapis.com/youtube/v3/subscriptions?part=snippet&mine=true&maxResults=15", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!res.ok) {
      const errData = await res.json();
      return NextResponse.json({ error: "Failed to fetch YouTube data", details: errData }, { status: res.status });
    }

    const data = await res.json();

    const likedRes = await fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&myRating=like&maxResults=15", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const likedData = likedRes.ok ? await likedRes.json() : { items: [] };

    return NextResponse.json({
      subscriptions: data.items || [],
      likedVideos: likedData.items || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}
